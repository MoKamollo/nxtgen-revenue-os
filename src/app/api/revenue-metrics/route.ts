import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { revenueMetrics } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const results = await db
      .select()
      .from(revenueMetrics)
      .where(eq(revenueMetrics.organizationId, orgId))
      .orderBy(desc(revenueMetrics.date));
    return NextResponse.json({ data: results, total: results.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch revenue metrics" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.date) return NextResponse.json({ error: "date is required" }, { status: 400 });

    const mrr = parseFloat(body.mrr ?? "0");
    const arr = body.arr ? parseFloat(body.arr) : mrr * 12;
    const newRevenue = parseFloat(body.newRevenue ?? "0");
    const churnedRevenue = parseFloat(body.churnedRevenue ?? "0");
    const expansionRevenue = parseFloat(body.expansionRevenue ?? "0");
    const netRevenue = newRevenue + expansionRevenue - churnedRevenue;

    const [entry] = await db
      .insert(revenueMetrics)
      .values({
        organizationId: orgId,
        date: new Date(body.date),
        mrr: String(mrr),
        arr: String(arr),
        newRevenue: String(newRevenue),
        expansionRevenue: String(expansionRevenue),
        churnedRevenue: String(churnedRevenue),
        netRevenue: String(netRevenue),
        newCustomers: parseInt(body.newCustomers ?? "0"),
        churnedCustomers: parseInt(body.churnedCustomers ?? "0"),
        activeCustomers: parseInt(body.activeCustomers ?? "0"),
      })
      .returning();

    return NextResponse.json({ data: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to log revenue metrics" }, { status: 500 });
  }
}
