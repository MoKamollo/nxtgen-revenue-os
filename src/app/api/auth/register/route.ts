import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signSession, cookieHeader } from "@/lib/session";

const SPACE_REGISTER_URL = "https://space.nxtgen-stack.com/api/auth/register.php";
const SPACE_LOGIN_URL    = "https://space.nxtgen-stack.com/api/auth/login.php";

const toUUID = (hex: string) =>
  `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }

    // Register on Space
    const regRes = await fetch(SPACE_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const regData = await regRes.json();

    if (!regRes.ok) {
      return NextResponse.json({ error: regData.error ?? "Registration failed." }, { status: 400 });
    }

    // Auto-login to get session data
    const loginRes = await fetch(SPACE_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok || !loginData.user) {
      return NextResponse.json({ error: "Account created. Please sign in." }, { status: 200 });
    }

    const { id: userId, tenant_id: rawTenantId, role, plan } = loginData.user;
    const tenantId = rawTenantId.includes("-") ? rawTenantId : toUUID(rawTenantId);

    // Auto-create org in Convert DB
    const existing = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.id, tenantId))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(organizations).values({
        id: tenantId,
        name: name + "'s Workspace",
        slug: rawTenantId,
        plan: "starter",
      });
    }

    const token = await signSession({ userId, tenantId, email, name, role, plan });
    const response = NextResponse.json({ ok: true, redirect: "/dashboard" });
    response.headers.set("Set-Cookie", cookieHeader(token));
    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
