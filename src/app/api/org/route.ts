import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { organizations, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, orgId)).limit(1);
    if (!org) return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    const members = await db
      .select({ id: users.id, name: users.name, email: users.email, role: users.role, jobTitle: users.jobTitle, avatar: users.avatar, lastActiveAt: users.lastActiveAt })
      .from(users)
      .where(eq(users.organizationId, orgId));
    return NextResponse.json({ data: { ...org, members } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch organization" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};
    const allowed = ["name", "website", "industry", "size"] as const;
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    await db.update(organizations).set(updates).where(eq(organizations.id, orgId));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update organization" }, { status: 500 });
  }
}
