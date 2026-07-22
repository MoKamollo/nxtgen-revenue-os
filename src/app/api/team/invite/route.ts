import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, organizations } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const orgId = request.headers.get("x-tenant-id");
  const requestorRole = request.headers.get("x-user-role");
  if (!orgId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!["owner", "admin"].includes(requestorRole ?? "")) {
    return NextResponse.json({ error: "Only owners and admins can invite members" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, role = "member" } = body;
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const validRoles = ["admin", "manager", "member", "viewer"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check email not already in org
    const [existing] = await db.select({ id: users.id })
      .from(users)
      .where(and(eq(users.email, email.toLowerCase()), eq(users.organizationId, orgId)))
      .limit(1);
    if (existing) return NextResponse.json({ error: "A user with this email already exists in your team" }, { status: 409 });

    const [org] = await db.select({ name: organizations.name })
      .from(organizations).where(eq(organizations.id, orgId)).limit(1);

    const [newUser] = await db.insert(users).values({
      organizationId: orgId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
    }).returning();

    // Send invite email if Resend is configured
    const resendKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.EMAIL_FROM ?? "NxtGen Convert <noreply@nxtgen-stack.com>",
          to: email,
          subject: `You've been invited to ${org?.name ?? "NxtGen Convert"}`,
          html: `
            <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0a0f1e;color:#e2e8f0;border-radius:12px">
              <h2 style="font-size:20px;font-weight:700;margin-bottom:8px">You're invited!</h2>
              <p style="color:#94a3b8;font-size:14px;margin-bottom:24px">
                You've been added to <strong style="color:#e2e8f0">${org?.name ?? "NxtGen Convert"}</strong> as a <strong style="color:#e2e8f0">${role}</strong>.
              </p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://nxtgen-convert.vercel.app"}/login"
                style="display:inline-block;background:linear-gradient(135deg,#6366f1,#3b9eff);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
                Accept Invitation
              </a>
              <p style="color:#475569;font-size:12px;margin-top:24px">Sign in with your email: ${email}</p>
            </div>
          `,
        });
        emailSent = true;
      } catch { /* email failure doesn't block user creation */ }
    }

    return NextResponse.json({ data: newUser, emailSent }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to invite member" }, { status: 500 });
  }
}
