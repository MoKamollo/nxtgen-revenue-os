import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const SCORE_FIELDS = ["email","phone","jobTitle","source","status"] as const;

function calcScore(data: { email?: string; phone?: string; jobTitle?: string; source?: string; status?: string }): number {
  const statusBase: Record<string, number> = { vip: 90, customer: 70, prospect: 45, lead: 25, churned: 10 };
  const sourceBonus: Record<string, number> = { referral: 15, organic: 10, event: 8, paid_ads: 5, cold_outreach: 2, other: 3 };
  let score = statusBase[data.status ?? "lead"] ?? 25;
  if (data.email) score += 10;
  if (data.phone) score += 5;
  if (data.jobTitle) score += 5;
  score += sourceBonus[data.source ?? ""] ?? 0;
  return Math.min(score, 100);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const allowed = ["firstName","lastName","email","phone","status","jobTitle","source","score","tags","companyId","ownerId","lastContactedAt"] as const;
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  // Recalculate score when any score-affecting field is being updated
  const touchesScore = SCORE_FIELDS.some(f => body[f] !== undefined);
  if (touchesScore && body.score === undefined) {
    const [current] = await db
      .select({ email: contacts.email, phone: contacts.phone, jobTitle: contacts.jobTitle, source: contacts.source, status: contacts.status })
      .from(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.organizationId, orgId)))
      .limit(1);
    if (current) {
      const merged = {
        email:    body.email    ?? current.email    ?? undefined,
        phone:    body.phone    ?? current.phone    ?? undefined,
        jobTitle: body.jobTitle ?? current.jobTitle ?? undefined,
        source:   body.source   ?? current.source   ?? undefined,
        status:   body.status   ?? current.status   ?? undefined,
      };
      updates.score = calcScore(merged);
    }
  }

  updates.updatedAt = new Date();

  await db.update(contacts).set(updates).where(and(eq(contacts.id, id), eq(contacts.organizationId, orgId)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  await db.delete(contacts).where(and(eq(contacts.id, id), eq(contacts.organizationId, orgId)));
  return NextResponse.json({ ok: true });
}
