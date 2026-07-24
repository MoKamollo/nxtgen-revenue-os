import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { workflows } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const results = await db.select().from(workflows).where(eq(workflows.organizationId, orgId));
    return NextResponse.json({ data: results, total: results.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  const userId = request.headers.get("x-user-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const body = await request.json();
    const [workflow] = await db.insert(workflows).values({
      organizationId: orgId,
      name: body.name,
      description: body.description,
      status: "draft",
      trigger: body.trigger || { event: "manual" },
      steps: body.steps || [],
    }).returning();
    return NextResponse.json({ data: workflow }, { status: 201 });
  } catch (err) {
    console.error("[workflows POST]", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
