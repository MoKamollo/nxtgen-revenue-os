import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const { id } = await params;
  try {
    const body = await request.json();
    const allowed: Record<string, unknown> = {};
    if (body.name !== undefined) allowed.name = body.name;
    if (body.status !== undefined) allowed.status = body.status;
    if (body.subject !== undefined) allowed.subject = body.subject;
    if (body.fromName !== undefined) allowed.fromName = body.fromName;
    if (body.fromEmail !== undefined) allowed.fromEmail = body.fromEmail;
    if (body.scheduledAt !== undefined) allowed.scheduledAt = body.scheduledAt;
    if (body.sentAt !== undefined) allowed.sentAt = body.sentAt;
    if (body.stats !== undefined) allowed.stats = body.stats;

    const [updated] = await db
      .update(campaigns)
      .set({ ...allowed, updatedAt: new Date() })
      .where(and(eq(campaigns.id, id), eq(campaigns.organizationId, orgId)))
      .returning();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const { id } = await params;
  try {
    await db
      .delete(campaigns)
      .where(and(eq(campaigns.id, id), eq(campaigns.organizationId, orgId)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
  }
}
