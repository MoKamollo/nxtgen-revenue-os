import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { organizations, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signSession, cookieHeader } from "@/lib/session";

const SPACE_VERIFY_TOKEN_URL = "https://space.nxtgen-stack.com/api/auth/verify-auto-token.php";

function spaceIdToUUID(id: string): string {
  const hex = id.replace(/^[a-z]+_/i, "").replace(/[^a-f0-9]/gi, "").padEnd(32, "0").slice(0, 32);
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
}

export async function GET(request: NextRequest) {
  const autoToken = request.nextUrl.searchParams.get("auto_token") ?? "";
  const fallback  = new URL("/login?verified=1", request.url);

  if (!autoToken) return NextResponse.redirect(fallback);

  try {
    const spaceRes = await fetch(SPACE_VERIFY_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auto_token: autoToken }),
    });

    if (!spaceRes.ok) return NextResponse.redirect(fallback);
    const spaceData = await spaceRes.json();
    const u = spaceData?.user;
    if (!u?.id || !u?.email || !u?.tenant_id) return NextResponse.redirect(fallback);

    const { id: userId, email, name, tenant_id: rawTenantId, role, plan } = u;
    const tenantId = rawTenantId.includes("-") ? rawTenantId : spaceIdToUUID(rawTenantId);

    // Auto-provision Convert org
    const existing = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.id, tenantId))
      .limit(1);

    if (existing.length === 0) {
      const existingUser = await db
        .select({ organizationId: users.organizationId })
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);

      if (existingUser.length > 0 && existingUser[0].organizationId) {
        // reuse existing org
      } else {
        await db.insert(organizations).values({
          id: tenantId,
          name: (name ?? email) + "'s Workspace",
          slug: rawTenantId,
          plan: "starter",
        });
      }
    }

    const token = await signSession({ userId, tenantId, email, name: name ?? email, role: role ?? "owner", plan: plan ?? "starter" });
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set("Set-Cookie", cookieHeader(token));
    return response;

  } catch (err) {
    console.error("[convert verified]", err);
    return NextResponse.redirect(fallback);
  }
}
