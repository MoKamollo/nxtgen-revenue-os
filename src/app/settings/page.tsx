"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/org";
import {
  User, Building2, Shield, Bell, Key, Plug, CreditCard,
  Palette, Code, Users, Check, Zap, Mail, MessageSquare,
  Calendar, Database, Webhook, Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";

type OrgMember = {
  id: string; name: string; email: string; role: string;
  jobTitle: string | null; avatar: string | null; lastActiveAt: string | null;
};

type OrgData = {
  id: string; name: string; slug: string; website: string | null;
  industry: string | null; size: string | null; plan: string;
  members: OrgMember[];
};

type UserData = {
  tenantId: string; role: string | null;
  org: { id: string; name: string; plan: string } | null;
  user: { id: string; name: string; email: string; jobTitle: string | null; avatar: string | null } | null;
};

const SETTINGS_SECTIONS = [
  { id: "profile",       label: "Profile",       icon: User },
  { id: "organization",  label: "Organization",  icon: Building2 },
  { id: "team",          label: "Team Members",  icon: Users },
  { id: "billing",       label: "Billing & Plans", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security",      label: "Security",      icon: Shield },
  { id: "api",           label: "API & Webhooks", icon: Code },
  { id: "integrations",  label: "Integrations",  icon: Plug },
  { id: "appearance",    label: "Appearance",    icon: Palette },
];

const INTEGRATIONS = [
  { name: "Gmail",            icon: Mail,         connected: true,  category: "Email" },
  { name: "Outlook",          icon: Mail,         connected: false, category: "Email" },
  { name: "Slack",            icon: MessageSquare,connected: true,  category: "Communication" },
  { name: "Google Calendar",  icon: Calendar,     connected: true,  category: "Calendar" },
  { name: "Stripe",           icon: CreditCard,   connected: true,  category: "Payments" },
  { name: "Zapier",           icon: Zap,          connected: false, category: "Automation" },
  { name: "PostgreSQL",       icon: Database,     connected: true,  category: "Database" },
  { name: "Webhooks",         icon: Webhook,      connected: false, category: "Developer" },
];

const PLAN_LABELS: Record<string, { name: string; color: string }> = {
  starter:      { name: "Starter",      color: "text-surface-300" },
  professional: { name: "Professional", color: "text-brand-400" },
  enterprise:   { name: "Enterprise",   color: "text-violet-400" },
  unlimited:    { name: "Unlimited",    color: "text-emerald-400" },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrg, setLoadingOrg] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [orgData, setOrgData] = useState<OrgData | null>(null);

  const [profileForm, setProfileForm] = useState({ name: "", email: "", jobTitle: "", phone: "", timezone: "America/New_York" });
  const [orgForm, setOrgForm] = useState({ name: "", website: "", industry: "", size: "" });

  useEffect(() => {
    fetch(apiUrl("/api/users/me"))
      .then(r => r.json())
      .then(data => {
        setUserData(data);
        if (data.user) {
          setProfileForm({
            name:     data.user.name     ?? "",
            email:    data.user.email    ?? "",
            jobTitle: data.user.jobTitle ?? "",
            phone:    data.user.phone    ?? "",
            timezone: data.user.timezone ?? "America/New_York",
          });
        }
        setLoadingUser(false);
      })
      .catch(() => setLoadingUser(false));
  }, []);

  useEffect(() => {
    if (activeSection === "organization" || activeSection === "team" || activeSection === "billing") {
      if (orgData) return;
      setLoadingOrg(true);
      fetch(apiUrl("/api/org"))
        .then(r => r.json())
        .then(j => {
          setOrgData(j.data);
          setOrgForm({
            name:     j.data.name     ?? "",
            website:  j.data.website  ?? "",
            industry: j.data.industry ?? "",
            size:     j.data.size     ?? "",
          });
          setLoadingOrg(false);
        })
        .catch(() => setLoadingOrg(false));
    }
  }, [activeSection, orgData]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(apiUrl("/api/users/me"), {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: profileForm.name, jobTitle: profileForm.jobTitle, phone: profileForm.phone, timezone: profileForm.timezone }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function saveOrg(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(apiUrl("/api/org"), {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: orgForm.name, website: orgForm.website, industry: orgForm.industry, size: orgForm.size }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const planInfo = PLAN_LABELS[orgData?.plan ?? userData?.org?.plan ?? "starter"] ?? PLAN_LABELS.starter;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
        {/* Settings Nav */}
        <aside className="w-56 shrink-0 border-r border-surface-800 p-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-wider px-2 mb-2">Settings</p>
          {SETTINGS_SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={cn("w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all", activeSection === section.id ? "bg-brand-500/10 text-brand-400 font-medium" : "text-surface-500 hover:text-surface-300 hover:bg-surface-800/40")}>
                <Icon size={14} className="shrink-0" />
                {section.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6 space-y-6">

            {/* Profile */}
            {activeSection === "profile" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Profile Settings</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Update your personal information</p>
                </div>

                {loadingUser ? (
                  <div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-surface-500" /></div>
                ) : (
                  <form onSubmit={saveProfile}>
                    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar name={profileForm.name || "User"} size="2xl" />
                        <div>
                          <Button type="button" variant="outline" size="sm">Change photo</Button>
                          <p className="text-xs text-surface-500 mt-1">JPG, GIF or PNG. Max 2MB.</p>
                        </div>
                      </div>
                      <Input label="Full Name" value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} />
                      <Input label="Email Address" type="email" value={profileForm.email} readOnly className="opacity-60 cursor-not-allowed" />
                      <Input label="Job Title" value={profileForm.jobTitle} onChange={e => setProfileForm(f => ({ ...f, jobTitle: e.target.value }))} placeholder="e.g. Head of Revenue" />
                      <Input label="Phone Number" type="tel" value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (555) 000-0000" />
                      <Select label="Timezone" value={profileForm.timezone} onChange={e => setProfileForm(f => ({ ...f, timezone: e.target.value }))}
                        options={[
                          { value: "America/New_York",    label: "Eastern Time (ET)" },
                          { value: "America/Chicago",     label: "Central Time (CT)" },
                          { value: "America/Denver",      label: "Mountain Time (MT)" },
                          { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                          { value: "Europe/London",       label: "London (GMT)" },
                          { value: "Europe/Paris",        label: "Paris (CET)" },
                        ]} />
                    </div>
                    <div className="mt-4">
                      <Button type="submit" variant="gradient" loading={saving} icon={saved ? Check : undefined}>
                        {saved ? "Saved!" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Organization */}
            {activeSection === "organization" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Organization</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Manage your workspace settings</p>
                </div>

                {loadingOrg ? (
                  <div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-surface-500" /></div>
                ) : (
                  <form onSubmit={saveOrg}>
                    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-brand">
                          <span className="text-white font-black text-lg">
                            {(orgForm.name || "O").charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <Button type="button" variant="outline" size="sm">Upload logo</Button>
                      </div>
                      <Input label="Organization Name" value={orgForm.name} onChange={e => setOrgForm(f => ({ ...f, name: e.target.value }))} />
                      <Input label="Website" type="url" value={orgForm.website} onChange={e => setOrgForm(f => ({ ...f, website: e.target.value }))} placeholder="https://yourcompany.com" />
                      <div className="grid grid-cols-2 gap-4">
                        <Select label="Industry" value={orgForm.industry} onChange={e => setOrgForm(f => ({ ...f, industry: e.target.value }))}
                          options={[
                            { value: "",             label: "Select industry" },
                            { value: "technology",   label: "Technology" },
                            { value: "saas",         label: "SaaS" },
                            { value: "ecommerce",    label: "E-Commerce" },
                            { value: "finance",      label: "Finance" },
                            { value: "healthcare",   label: "Healthcare" },
                            { value: "other",        label: "Other" },
                          ]} />
                        <Select label="Company Size" value={orgForm.size} onChange={e => setOrgForm(f => ({ ...f, size: e.target.value }))}
                          options={[
                            { value: "",       label: "Select size" },
                            { value: "1-10",   label: "1-10 employees" },
                            { value: "11-50",  label: "11-50 employees" },
                            { value: "51-200", label: "51-200 employees" },
                            { value: "201-500",label: "201-500 employees" },
                            { value: "500+",   label: "500+ employees" },
                          ]} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button type="submit" variant="gradient" loading={saving} icon={saved ? Check : undefined}>
                        {saved ? "Saved!" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Team */}
            {activeSection === "team" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-surface-50">Team Members</h2>
                    <p className="text-sm text-surface-500 mt-0.5">Manage access and permissions</p>
                  </div>
                  <Button variant="gradient" size="sm" icon={Users}>Invite Member</Button>
                </div>

                {loadingOrg ? (
                  <div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-surface-500" /></div>
                ) : !orgData?.members?.length ? (
                  <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-8 flex flex-col items-center justify-center gap-2 text-center">
                    <Users size={24} className="text-surface-600" />
                    <p className="text-sm text-surface-400">No team members yet</p>
                    <p className="text-xs text-surface-600">Invite your team to get started</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden">
                    <div className="divide-y divide-surface-800/60">
                      {orgData.members.map(member => (
                        <div key={member.id} className="flex items-center gap-3 px-4 py-3.5">
                          <Avatar name={member.name} size="md" status="online" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-surface-100">{member.name}</p>
                            <p className="text-xs text-surface-500">{member.jobTitle ?? member.email}</p>
                          </div>
                          <Badge variant={member.role === "owner" || member.role === "admin" ? "purple" : "ghost"} size="sm">
                            {member.role === "owner" ? "Owner" : member.role === "admin" ? "Admin" : "Member"}
                          </Badge>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Billing */}
            {activeSection === "billing" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Billing & Plans</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Manage your subscription</p>
                </div>

                {loadingOrg ? (
                  <div className="flex items-center justify-center py-8"><Loader2 size={20} className="animate-spin text-surface-500" /></div>
                ) : (
                  <>
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold ${planInfo.color}`}>{planInfo.name} Plan</p>
                            <Badge variant="success" size="sm" dot>Active</Badge>
                          </div>
                          <p className="text-xs text-surface-400 mt-0.5">
                            Contact our team to change plans or get pricing
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Change Plan</Button>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                          { label: "Members", used: orgData?.members?.length ?? "—", limit: "Unlimited" },
                          { label: "Contacts", used: "—", limit: "Unlimited" },
                          { label: "Emails/month", used: "—", limit: "Unlimited" },
                        ].map(usage => (
                          <div key={usage.label} className="rounded-lg bg-surface-900/60 p-3">
                            <p className="text-xs text-surface-500">{usage.label}</p>
                            <p className="text-sm font-bold text-surface-100 mt-0.5">{usage.used}</p>
                            <p className="text-[11px] text-emerald-400">{usage.limit}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
                      <h3 className="text-sm font-semibold text-surface-200 mb-3">Payment Method</h3>
                      <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
                        <CreditCard size={20} className="text-surface-600" />
                        <p className="text-xs text-surface-500">Billing is managed via your account portal</p>
                        <Button variant="outline" size="sm">Open Billing Portal</Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Integrations */}
            {activeSection === "integrations" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Integrations</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Connect your tools and services</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {INTEGRATIONS.map(integration => {
                    const Icon = integration.icon;
                    return (
                      <div key={integration.name} className={cn("rounded-xl border p-4 flex items-center gap-3 transition-all hover:border-surface-600", integration.connected ? "border-emerald-500/20 bg-emerald-500/5" : "border-surface-800 bg-surface-900/50")}>
                        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", integration.connected ? "bg-emerald-500/15" : "bg-surface-800")}>
                          <Icon size={16} className={integration.connected ? "text-emerald-400" : "text-surface-500"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-surface-200">{integration.name}</p>
                          <p className="text-[11px] text-surface-500">{integration.category}</p>
                        </div>
                        {integration.connected ? (
                          <Badge variant="success" size="sm" dot>Connected</Badge>
                        ) : (
                          <Button variant="outline" size="xs">Connect</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* API */}
            {activeSection === "api" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">API & Webhooks</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Manage API keys and webhook endpoints</p>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-surface-200">API Keys</h3>
                  <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                    <Key size={20} className="text-surface-600" />
                    <p className="text-xs text-surface-400">API key management is coming soon</p>
                  </div>
                  <Button variant="outline" size="sm" icon={Key}>Generate new key</Button>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-surface-200">Webhooks</h3>
                  <input type="url" placeholder="https://your-app.com/webhooks/nxtgen"
                    className="w-full h-9 rounded-lg border border-surface-700 bg-surface-800 px-3 text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:border-brand-500" />
                  <div className="grid grid-cols-2 gap-2">
                    {["contact.created","deal.won","deal.lost","campaign.sent","ticket.resolved","payment.received"].map(event => (
                      <label key={event} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-surface-600 bg-surface-800 accent-brand-500" defaultChecked />
                        <span className="font-mono text-[11px] text-surface-400">{event}</span>
                      </label>
                    ))}
                  </div>
                  <Button variant="gradient" size="sm" icon={Webhook}>Save webhook</Button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Security</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Protect your account</p>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-surface-200">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-surface-200">Authenticator App</p>
                      <p className="text-xs text-surface-500">Use Google Authenticator or similar</p>
                    </div>
                    <Badge variant="success" size="sm" dot>Enabled</Badge>
                  </div>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-surface-200">Change Password</h3>
                  <input type="password" placeholder="Current Password" className="w-full h-9 rounded-lg border border-surface-700 bg-surface-800 px-3 text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:border-brand-500" />
                  <input type="password" placeholder="New Password" className="w-full h-9 rounded-lg border border-surface-700 bg-surface-800 px-3 text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:border-brand-500" />
                  <input type="password" placeholder="Confirm New Password" className="w-full h-9 rounded-lg border border-surface-700 bg-surface-800 px-3 text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:border-brand-500" />
                  <Button variant="gradient" size="sm">Update Password</Button>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
                  <h3 className="text-sm font-semibold text-surface-200 mb-3">Active Sessions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-surface-800 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-surface-200">Current Session</p>
                        <p className="text-[11px] text-surface-500">Active now</p>
                      </div>
                      <Badge variant="success" size="sm">Current</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications placeholder */}
            {activeSection === "notifications" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Notifications</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Control when and how you are notified</p>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-8 flex flex-col items-center justify-center gap-2 text-center">
                  <Bell size={24} className="text-surface-600" />
                  <p className="text-sm text-surface-400">Notification preferences coming soon</p>
                </div>
              </div>
            )}

            {/* Appearance placeholder */}
            {activeSection === "appearance" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Appearance</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Customize how NxtGen looks</p>
                </div>
                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-8 flex flex-col items-center justify-center gap-2 text-center">
                  <Palette size={24} className="text-surface-600" />
                  <p className="text-sm text-surface-400">Theme customization coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
