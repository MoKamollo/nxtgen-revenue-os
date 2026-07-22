import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  const requestorRole = request.headers.get("x-user-role");
  const requestorId = request.headers.get("x-user-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!["owner", "admin"].includes(requestorRole ?? "")) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const validRoles = ["admin", "manager", "member", "viewer"];
    if (!validRoles.includes(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const [updated] = await db.update(users)
      .set({ role: body.role, updatedAt: new Date() })
      .where(and(eq(users.id, id), eq(users.organizationId, orgId)))
      .returning();

    if (!updated) return NextResponse.json({ error: "Member not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  const requestorRole = request.headers.get("x-user-role");
  const requestorId = request.headers.get("x-user-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!["owner", "admin"].includes(requestorRole ?? "")) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const { id } = await params;
  if (id === requestorId) {
    return NextResponse.json({ error: "You cannot remove yourself" }, { status: 400 });
  }

  try {
    // Cannot remove the org owner
    const [target] = await db.select({ role: users.role })
      .from(users).where(and(eq(users.id, id), eq(users.organizationId, orgId))).limit(1);
    if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });
    if (target.role === "owner") return NextResponse.json({ error: "Cannot remove the org owner" }, { status: 400 });

    await db.delete(users).where(and(eq(users.id, id), eq(users.organizationId, orgId)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to remove member" }, { status: 500 });
  }
}
