import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  organizations, users, contacts, companies, pipelines, pipelineStages,
  deals, activities, tasks, campaigns, workflows, tickets, products, orders, revenueMetrics,
} from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool);

async function seed() {
  console.log("Seeding database...");

  // Organization
  const [org] = await db.insert(organizations).values({
    name: "NxtGen Demo Co",
    slug: "nxtgen-demo",
    industry: "Technology",
    size: "11-50",
    plan: "professional",
    website: "https://nxtgen-stack.com",
  }).returning();
  console.log("✓ Organization created:", org.id);

  // Users
  const [user1] = await db.insert(users).values({
    organizationId: org.id,
    email: "alex@nxtgendemo.com",
    name: "Alex Rivera",
    role: "owner",
    jobTitle: "Head of Revenue",
  }).returning();

  const [user2] = await db.insert(users).values({
    organizationId: org.id,
    email: "jordan@nxtgendemo.com",
    name: "Jordan Lee",
    role: "member",
    jobTitle: "Account Executive",
  }).returning();

  const [user3] = await db.insert(users).values({
    organizationId: org.id,
    email: "sam@nxtgendemo.com",
    name: "Sam Park",
    role: "member",
    jobTitle: "Account Executive",
  }).returning();
  console.log("✓ Users created");

  // Companies
  const [comp1] = await db.insert(companies).values({
    organizationId: org.id, name: "TechCorp Inc", domain: "techcorp.com",
    industry: "Software", size: "201-500", revenue: "12000000", ownerId: user1.id,
  }).returning();

  const [comp2] = await db.insert(companies).values({
    organizationId: org.id, name: "Innovate IO", domain: "innovate.io",
    industry: "SaaS", size: "11-50", revenue: "2500000", ownerId: user2.id,
  }).returning();

  const [comp3] = await db.insert(companies).values({
    organizationId: org.id, name: "ScaleX AI", domain: "scalex.ai",
    industry: "AI / ML", size: "51-200", revenue: "8000000", ownerId: user1.id,
  }).returning();

  const [comp4] = await db.insert(companies).values({
    organizationId: org.id, name: "BuildFast Co", domain: "buildfast.co",
    industry: "Dev Tools", size: "11-50", revenue: "1800000", ownerId: user3.id,
  }).returning();

  const [comp5] = await db.insert(companies).values({
    organizationId: org.id, name: "Global Ops", domain: "globalops.com",
    industry: "Operations", size: "501-1000", revenue: "45000000", ownerId: user2.id,
  }).returning();
  console.log("✓ Companies created");

  // Contacts
  const [c1] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "Sarah", lastName: "Johnson",
    email: "sarah@techcorp.com", phone: "+1 (555) 234-5678",
    status: "customer", companyId: comp1.id, jobTitle: "VP of Sales",
    score: 92, tags: ["vip", "enterprise"], source: "Website", ownerId: user1.id,
    lastContactedAt: new Date(Date.now() - 2 * 86400000),
  }).returning();

  const [c2] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "Marcus", lastName: "Williams",
    email: "marcus@innovate.io", phone: "+1 (555) 345-6789",
    status: "prospect", companyId: comp2.id, jobTitle: "CEO",
    score: 78, tags: ["hot-lead", "saas"], source: "LinkedIn", ownerId: user2.id,
    lastContactedAt: new Date(Date.now() - 5 * 86400000),
  }).returning();

  const [c3] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "Elena", lastName: "Petrov",
    email: "elena@globalops.com", phone: "+1 (555) 456-7890",
    status: "lead", companyId: comp5.id, jobTitle: "CTO",
    score: 65, tags: ["inbound"], source: "Webinar", ownerId: user2.id,
    lastContactedAt: new Date(Date.now() - 86400000),
  }).returning();

  const [c4] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "James", lastName: "Chen",
    email: "james@buildfast.co", phone: "+1 (555) 567-8901",
    status: "customer", companyId: comp4.id, jobTitle: "Founder",
    score: 88, tags: ["startup", "growth"], source: "Referral", ownerId: user3.id,
    lastContactedAt: new Date(Date.now() - 3 * 86400000),
  }).returning();

  const [c5] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "Priya", lastName: "Sharma",
    email: "priya@scalex.ai", phone: "+1 (555) 678-9012",
    status: "vip", companyId: comp3.id, jobTitle: "Head of Growth",
    score: 97, tags: ["vip", "ai", "enterprise"], source: "Partner", ownerId: user1.id,
    lastContactedAt: new Date(Date.now() - 86400000),
  }).returning();

  const [c6] = await db.insert(contacts).values({
    organizationId: org.id, firstName: "David", lastName: "Thompson",
    email: "david@nextstep.co", phone: "+1 (555) 789-0123",
    status: "prospect", jobTitle: "Director of Marketing",
    score: 71, tags: ["marketing"], source: "Paid Ads", ownerId: user2.id,
    lastContactedAt: new Date(Date.now() - 8 * 86400000),
  }).returning();
  console.log("✓ Contacts created");

  // Pipeline
  const [pipeline] = await db.insert(pipelines).values({
    organizationId: org.id, name: "Main Sales Pipeline", isDefault: true, currency: "USD",
  }).returning();

  const stages = await db.insert(pipelineStages).values([
    { pipelineId: pipeline.id, name: "Prospecting", order: 1, probability: 10, color: "#6366f1" },
    { pipelineId: pipeline.id, name: "Qualification", order: 2, probability: 25, color: "#8b5cf6" },
    { pipelineId: pipeline.id, name: "Proposal", order: 3, probability: 50, color: "#06b6d4" },
    { pipelineId: pipeline.id, name: "Negotiation", order: 4, probability: 75, color: "#10b981" },
    { pipelineId: pipeline.id, name: "Closed Won", order: 5, probability: 100, color: "#f59e0b" },
  ]).returning();
  console.log("✓ Pipeline created");

  // Deals
  await db.insert(deals).values([
    {
      organizationId: org.id, pipelineId: pipeline.id, stageId: stages[3].id,
      name: "Enterprise License - TechCorp", value: "84000", currency: "USD",
      stage: "negotiation", probability: 80, contactId: c1.id, companyId: comp1.id,
      ownerId: user1.id, tags: ["enterprise", "annual"],
      expectedCloseDate: new Date(Date.now() + 15 * 86400000),
    },
    {
      organizationId: org.id, pipelineId: pipeline.id, stageId: stages[2].id,
      name: "ScaleX Platform Expansion", value: "240000", currency: "USD",
      stage: "proposal", probability: 65, contactId: c5.id, companyId: comp3.id,
      ownerId: user2.id, tags: ["expansion", "ai"],
      expectedCloseDate: new Date(Date.now() + 30 * 86400000),
    },
    {
      organizationId: org.id, pipelineId: pipeline.id, stageId: stages[1].id,
      name: "Innovate IO Starter Package", value: "18000", currency: "USD",
      stage: "qualification", probability: 40, contactId: c2.id, companyId: comp2.id,
      ownerId: user3.id, tags: ["starter"],
      expectedCloseDate: new Date(Date.now() + 45 * 86400000),
    },
    {
      organizationId: org.id, pipelineId: pipeline.id, stageId: stages[4].id,
      name: "BuildFast Annual Renewal", value: "28800", currency: "USD",
      stage: "closed_won", probability: 100, contactId: c4.id, companyId: comp4.id,
      ownerId: user1.id, tags: ["renewal"], wonAt: new Date(Date.now() - 5 * 86400000),
      expectedCloseDate: new Date(Date.now() - 5 * 86400000),
    },
    {
      organizationId: org.id, pipelineId: pipeline.id, stageId: stages[0].id,
      name: "NextStep Marketing Suite", value: "36000", currency: "USD",
      stage: "prospecting", probability: 20, contactId: c6.id,
      ownerId: user2.id, tags: ["marketing"],
      expectedCloseDate: new Date(Date.now() + 60 * 86400000),
    },
  ]);
  console.log("✓ Deals created");

  // Activities
  await db.insert(activities).values([
    {
      organizationId: org.id, type: "email", subject: "Follow-up on enterprise proposal",
      contactId: c1.id, companyId: comp1.id, userId: user1.id,
      completedAt: new Date(Date.now() - 3600000), outcome: "Positive response, scheduling demo",
    },
    {
      organizationId: org.id, type: "call", subject: "Discovery call - 45 min",
      contactId: c2.id, companyId: comp2.id, userId: user2.id,
      completedAt: new Date(Date.now() - 3 * 3600000),
      outcome: "Qualified - moving to proposal stage", duration: 45,
    },
    {
      organizationId: org.id, type: "meeting", subject: "Quarterly business review",
      contactId: c5.id, companyId: comp3.id, userId: user1.id,
      scheduledAt: new Date(Date.now() + 86400000), duration: 60,
    },
    {
      organizationId: org.id, type: "note", subject: "Key decision maker identified",
      contactId: c6.id, userId: user3.id,
      completedAt: new Date(Date.now() - 5 * 3600000),
    },
    {
      organizationId: org.id, type: "email", subject: "Onboarding welcome sequence - Day 3",
      contactId: c4.id, companyId: comp4.id, userId: user1.id,
      completedAt: new Date(Date.now() - 2 * 3600000), outcome: "Opened and clicked CTA",
    },
  ]);
  console.log("✓ Activities created");

  // Tasks
  await db.insert(tasks).values([
    {
      organizationId: org.id, title: "Send proposal to TechCorp", status: "todo",
      priority: "high", assigneeId: user1.id, contactId: c1.id,
      dueDate: new Date(Date.now() + 2 * 86400000),
    },
    {
      organizationId: org.id, title: "Follow up with ScaleX on expansion pricing", status: "in_progress",
      priority: "high", assigneeId: user2.id, contactId: c5.id,
      dueDate: new Date(Date.now() + 86400000),
    },
    {
      organizationId: org.id, title: "Schedule onboarding for BuildFast", status: "completed",
      priority: "medium", assigneeId: user3.id, contactId: c4.id,
      completedAt: new Date(Date.now() - 86400000),
    },
    {
      organizationId: org.id, title: "Prepare Q4 pipeline report", status: "todo",
      priority: "medium", assigneeId: user1.id,
      dueDate: new Date(Date.now() + 5 * 86400000),
    },
  ]);
  console.log("✓ Tasks created");

  // Campaigns
  await db.insert(campaigns).values([
    {
      organizationId: org.id, name: "Q4 Product Launch Sequence", type: "email",
      status: "sending", subject: "Introducing the future of revenue intelligence",
      fromName: "Alex Rivera", fromEmail: "alex@nxtgendemo.com",
      sentAt: new Date(Date.now() - 2 * 3600000),
      stats: { sent: 12400, delivered: 12180, opened: 4872, clicked: 1463, bounced: 220, unsubscribed: 45, revenue: 84200 },
      createdById: user1.id,
    },
    {
      organizationId: org.id, name: "Customer Winback - 90 Day Churned", type: "email",
      status: "scheduled", subject: "We miss you — here's what's new",
      fromName: "Alex Rivera", fromEmail: "alex@nxtgendemo.com",
      scheduledAt: new Date(Date.now() + 2 * 86400000),
      stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, revenue: 0 },
      createdById: user1.id,
    },
    {
      organizationId: org.id, name: "Weekly Revenue Newsletter", type: "email",
      status: "sent", subject: "Your weekly growth report is ready",
      fromName: "NxtGen Demo", fromEmail: "hello@nxtgendemo.com",
      sentAt: new Date(Date.now() - 7 * 86400000),
      stats: { sent: 8920, delivered: 8741, opened: 3321, clicked: 892, bounced: 179, unsubscribed: 28, revenue: 21400 },
      createdById: user2.id,
    },
    {
      organizationId: org.id, name: "Black Friday SMS Blast", type: "sms",
      status: "draft", subject: "50% off — today only",
      stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, revenue: 0 },
      createdById: user1.id,
    },
  ]);
  console.log("✓ Campaigns created");

  // Workflows
  await db.insert(workflows).values([
    {
      organizationId: org.id, name: "New Lead Nurture Sequence", status: "active",
      trigger: { event: "contact.created" }, steps: [],
      enrolledCount: 1240, completedCount: 892, conversionRate: "28.4",
      createdById: user1.id,
    },
    {
      organizationId: org.id, name: "Trial to Paid Conversion", status: "active",
      trigger: { event: "trial.started" }, steps: [],
      enrolledCount: 340, completedCount: 98, conversionRate: "42.1",
      createdById: user1.id,
    },
    {
      organizationId: org.id, name: "Onboarding Milestone Tracker", status: "active",
      trigger: { event: "deal.closed_won" }, steps: [],
      enrolledCount: 78, completedCount: 56, conversionRate: "91.8",
      createdById: user2.id,
    },
    {
      organizationId: org.id, name: "Churn Prevention — At Risk Accounts", status: "paused",
      trigger: { event: "health_score.dropped", threshold: 40 }, steps: [],
      enrolledCount: 23, completedCount: 8, conversionRate: "34.8",
      createdById: user1.id,
    },
    {
      organizationId: org.id, name: "NPS Detractor Recovery", status: "active",
      trigger: { event: "nps.submitted", range: "0-6" }, steps: [],
      enrolledCount: 45, completedCount: 31, conversionRate: "68.9",
      createdById: user3.id,
    },
  ]);
  console.log("✓ Workflows created");

  // Tickets
  await db.insert(tickets).values([
    {
      organizationId: org.id, ticketNumber: "TKT-1042",
      subject: "API integration returning 401 errors",
      status: "in_progress", priority: "high",
      contactId: c1.id, assigneeId: user2.id, source: "Email",
      firstResponseAt: new Date(Date.now() - 3 * 3600000),
    },
    {
      organizationId: org.id, ticketNumber: "TKT-1041",
      subject: "Billing discrepancy on invoice #INV-2847",
      status: "open", priority: "medium",
      contactId: c4.id, source: "Chat",
    },
    {
      organizationId: org.id, ticketNumber: "TKT-1040",
      subject: "Feature request: bulk import for contacts",
      status: "waiting", priority: "low",
      contactId: c5.id, assigneeId: user1.id, source: "Portal",
      firstResponseAt: new Date(Date.now() - 1.8 * 86400000),
    },
    {
      organizationId: org.id, ticketNumber: "TKT-1039",
      subject: "Dashboard not loading — spinning indefinitely",
      status: "resolved", priority: "critical",
      contactId: c3.id, assigneeId: user2.id, source: "Email",
      firstResponseAt: new Date(Date.now() - 3 * 86400000 + 15 * 60000),
      resolvedAt: new Date(Date.now() - 2 * 86400000),
      satisfactionScore: 5,
    },
  ]);
  console.log("✓ Tickets created");

  // Products
  await db.insert(products).values([
    {
      organizationId: org.id, name: "Revenue OS Starter", type: "digital",
      price: "97", currency: "USD", recurring: true, interval: "month",
      description: "Perfect for small teams getting started",
      tags: ["starter"], isActive: true,
    },
    {
      organizationId: org.id, name: "Revenue OS Professional", type: "digital",
      price: "297", currency: "USD", recurring: true, interval: "month",
      description: "For growing businesses that need more power",
      tags: ["professional"], isActive: true,
    },
    {
      organizationId: org.id, name: "Revenue OS Enterprise", type: "digital",
      price: "997", currency: "USD", recurring: true, interval: "month",
      description: "Unlimited power for scaling enterprises",
      tags: ["enterprise"], isActive: true,
    },
  ]);
  console.log("✓ Products created");

  // Revenue metrics (last 12 months)
  const months = [
    { mrr: "124000", arr: "1488000", newRevenue: "18400", churnedRevenue: "3200", netRevenue: "15200", newCustomers: 12, churnedCustomers: 2, activeCustomers: 48 },
    { mrr: "138000", arr: "1656000", newRevenue: "22100", churnedRevenue: "8100", netRevenue: "14000", newCustomers: 15, churnedCustomers: 5, activeCustomers: 58 },
    { mrr: "151000", arr: "1812000", newRevenue: "19800", churnedRevenue: "6800", netRevenue: "13000", newCustomers: 13, churnedCustomers: 4, activeCustomers: 67 },
    { mrr: "163000", arr: "1956000", newRevenue: "24300", churnedRevenue: "12300", netRevenue: "12000", newCustomers: 16, churnedCustomers: 8, activeCustomers: 75 },
    { mrr: "178000", arr: "2136000", newRevenue: "28900", churnedRevenue: "13900", netRevenue: "15000", newCustomers: 19, churnedCustomers: 9, activeCustomers: 85 },
    { mrr: "196000", arr: "2352000", newRevenue: "31200", churnedRevenue: "13200", netRevenue: "18000", newCustomers: 21, churnedCustomers: 9, activeCustomers: 97 },
    { mrr: "214000", arr: "2568000", newRevenue: "33800", churnedRevenue: "15800", netRevenue: "18000", newCustomers: 22, churnedCustomers: 10, activeCustomers: 109 },
    { mrr: "228000", arr: "2736000", newRevenue: "29400", churnedRevenue: "15400", netRevenue: "14000", newCustomers: 20, churnedCustomers: 10, activeCustomers: 119 },
    { mrr: "243000", arr: "2916000", newRevenue: "35600", churnedRevenue: "20600", netRevenue: "15000", newCustomers: 24, churnedCustomers: 14, activeCustomers: 129 },
    { mrr: "261000", arr: "3132000", newRevenue: "38200", churnedRevenue: "20200", netRevenue: "18000", newCustomers: 25, churnedCustomers: 13, activeCustomers: 141 },
    { mrr: "279000", arr: "3348000", newRevenue: "41900", churnedRevenue: "23900", netRevenue: "18000", newCustomers: 28, churnedCustomers: 16, activeCustomers: 153 },
    { mrr: "298000", arr: "3576000", newRevenue: "44100", churnedRevenue: "25100", netRevenue: "19000", newCustomers: 29, churnedCustomers: 17, activeCustomers: 165 },
  ];

  const now = new Date();
  await db.insert(revenueMetrics).values(
    months.map((m, i) => ({
      organizationId: org.id,
      date: new Date(now.getFullYear(), now.getMonth() - 11 + i, 1),
      ...m,
    }))
  );
  console.log("✓ Revenue metrics created");

  console.log("\n✅ Seed complete! Organization ID:", org.id);
  console.log("   Copy this ID — it's your demo org:", org.id);
  await pool.end();
}

seed().catch((e) => { console.error(e); process.exit(1); });
