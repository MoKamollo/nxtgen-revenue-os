"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { mockOrganization, mockUser, mockTeamPerformance } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Shield,
  Bell,
  Key,
  Plug,
  CreditCard,
  Globe,
  Palette,
  Code,
  Users,
  ChevronRight,
  Check,
  Zap,
  Mail,
  MessageSquare,
  Calendar,
  Database,
  Webhook,
} from "lucide-react";
import { useState } from "react";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "team", label: "Team Members", icon: Users },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API & Webhooks", icon: Code },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const INTEGRATIONS = [
  { name: "Gmail", icon: Mail, connected: true, category: "Email" },
  { name: "Outlook", icon: Mail, connected: false, category: "Email" },
  { name: "Slack", icon: MessageSquare, connected: true, category: "Communication" },
  { name: "Google Calendar", icon: Calendar, connected: true, category: "Calendar" },
  { name: "Stripe", icon: CreditCard, connected: true, category: "Payments" },
  { name: "Zapier", icon: Zap, connected: false, category: "Automation" },
  { name: "PostgreSQL", icon: Database, connected: true, category: "Database" },
  { name: "Webhooks", icon: Webhook, connected: false, category: "Developer" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
        {/* Settings Nav */}
        <aside className="w-56 shrink-0 border-r border-surface-800 p-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-surface-600 uppercase tracking-wider px-2 mb-2">
            Settings
          </p>
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all",
                  activeSection === section.id
                    ? "bg-brand-500/10 text-brand-400 font-medium"
                    : "text-surface-500 hover:text-surface-300 hover:bg-surface-800/40"
                )}
              >
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

                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar name={mockUser.name} size="2xl" />
                    <div>
                      <Button variant="outline" size="sm">Change photo</Button>
                      <p className="text-xs text-surface-500 mt-1">JPG, GIF or PNG. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Alex" />
                    <Input label="Last Name" defaultValue="Rivera" />
                  </div>
                  <Input label="Email Address" type="email" defaultValue={mockUser.email} />
                  <Input label="Job Title" defaultValue={mockUser.jobTitle || "Head of Revenue"} />
                  <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                  <Select
                    label="Timezone"
                    defaultValue="America/New_York"
                    options={[
                      { value: "America/New_York", label: "Eastern Time (ET)" },
                      { value: "America/Chicago", label: "Central Time (CT)" },
                      { value: "America/Denver", label: "Mountain Time (MT)" },
                      { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                      { value: "Europe/London", label: "London (GMT)" },
                      { value: "Europe/Paris", label: "Paris (CET)" },
                    ]}
                  />
                </div>

                <Button variant="gradient" onClick={handleSave} icon={saved ? Check : undefined}>
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            )}

            {/* Organization */}
            {activeSection === "organization" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Organization</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Manage your workspace settings</p>
                </div>

                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-brand">
                      <span className="text-white font-black text-lg">AC</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Upload logo</Button>
                    </div>
                  </div>
                  <Input label="Organization Name" defaultValue={mockOrganization.name} />
                  <Input label="Website" defaultValue="https://acme.com" type="url" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Industry"
                      defaultValue="technology"
                      options={[
                        { value: "technology", label: "Technology" },
                        { value: "saas", label: "SaaS" },
                        { value: "ecommerce", label: "E-Commerce" },
                        { value: "finance", label: "Finance" },
                        { value: "healthcare", label: "Healthcare" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                    <Select
                      label="Company Size"
                      defaultValue="51-200"
                      options={[
                        { value: "1-10", label: "1-10 employees" },
                        { value: "11-50", label: "11-50 employees" },
                        { value: "51-200", label: "51-200 employees" },
                        { value: "201-500", label: "201-500 employees" },
                        { value: "500+", label: "500+ employees" },
                      ]}
                    />
                  </div>
                </div>

                <Button variant="gradient" onClick={handleSave}>Save Changes</Button>
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
                  <Button variant="gradient" size="sm" icon={Users}>
                    Invite Member
                  </Button>
                </div>

                <div className="rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden">
                  <div className="divide-y divide-surface-800/60">
                    {mockTeamPerformance.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 px-4 py-3.5">
                        <Avatar name={member.name} size="md" status="online" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-surface-100">{member.name}</p>
                          <p className="text-xs text-surface-500">{member.role}</p>
                        </div>
                        <Badge variant={member.id === "u1" ? "purple" : "ghost"} size="sm">
                          {member.id === "u1" ? "Admin" : "Member"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeSection === "billing" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-surface-50">Billing & Plans</h2>
                  <p className="text-sm text-surface-500 mt-0.5">Manage your subscription</p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-surface-100">Enterprise Plan</p>
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </div>
                      <p className="text-xs text-surface-400 mt-0.5">
                        $997/month · Renews Dec 31, 2025
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "Users", used: 14, limit: "Unlimited" },
                      { label: "Contacts", used: "48.3K", limit: "Unlimited" },
                      { label: "Emails/month", used: "21.3K", limit: "Unlimited" },
                    ].map((usage) => (
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
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-14 items-center justify-center rounded-lg border border-surface-700 bg-surface-800">
                      <CreditCard size={18} className="text-surface-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-surface-200">Visa ending in 4242</p>
                      <p className="text-xs text-surface-500">Expires 12/2026</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">Update</Button>
                  </div>
                </div>
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
                  {INTEGRATIONS.map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div
                        key={integration.name}
                        className={cn(
                          "rounded-xl border p-4 flex items-center gap-3 transition-all hover:border-surface-600",
                          integration.connected
                            ? "border-emerald-500/20 bg-emerald-500/5"
                            : "border-surface-800 bg-surface-900/50"
                        )}
                      >
                        <div className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg",
                          integration.connected ? "bg-emerald-500/15" : "bg-surface-800"
                        )}>
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
                  <div className="space-y-3">
                    {[
                      { name: "Production Key", key: "nxg_prod_•••••••••••••••••••••••••••8f3a", created: "Oct 1, 2025", lastUsed: "2h ago" },
                      { name: "Development Key", key: "nxg_dev_•••••••••••••••••••••••••••2c1b", created: "Aug 15, 2025", lastUsed: "3d ago" },
                    ].map((apiKey) => (
                      <div key={apiKey.name} className="flex items-center gap-3 rounded-lg border border-surface-800 p-3">
                        <Key size={15} className="text-surface-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-surface-200">{apiKey.name}</p>
                          <p className="font-mono text-[11px] text-surface-500 truncate">{apiKey.key}</p>
                          <p className="text-[10px] text-surface-600 mt-0.5">
                            Created {apiKey.created} · Last used {apiKey.lastUsed}
                          </p>
                        </div>
                        <Button variant="outline" size="xs">Rotate</Button>
                        <Button variant="danger" size="xs">Revoke</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" icon={Key}>
                    Generate new key
                  </Button>
                </div>

                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-surface-200">Webhooks</h3>
                  <Input label="Endpoint URL" placeholder="https://your-app.com/webhooks/nxtgen" />
                  <div className="grid grid-cols-2 gap-2">
                    {["contact.created", "deal.won", "deal.lost", "campaign.sent", "ticket.resolved", "payment.received"].map((event) => (
                      <label key={event} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-surface-600 bg-surface-800 accent-brand-500" defaultChecked />
                        <span className="font-mono text-[11px] text-surface-400">{event}</span>
                      </label>
                    ))}
                  </div>
                  <Button variant="gradient" size="sm" icon={Webhook}>
                    Save webhook
                  </Button>
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
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="••••••••" />
                  <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                  <Button variant="gradient" size="sm">Update Password</Button>
                </div>

                <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
                  <h3 className="text-sm font-semibold text-surface-200 mb-3">Active Sessions</h3>
                  <div className="space-y-2">
                    {[
                      { device: "MacBook Pro · Chrome", location: "New York, US", current: true, time: "Now" },
                      { device: "iPhone 15 · Safari", location: "New York, US", current: false, time: "2h ago" },
                    ].map((session) => (
                      <div key={session.device} className="flex items-center justify-between rounded-lg border border-surface-800 px-3 py-2.5">
                        <div>
                          <p className="text-xs font-medium text-surface-200">{session.device}</p>
                          <p className="text-[11px] text-surface-500">{session.location} · {session.time}</p>
                        </div>
                        {session.current ? (
                          <Badge variant="success" size="sm">Current</Badge>
                        ) : (
                          <Button variant="danger" size="xs">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
