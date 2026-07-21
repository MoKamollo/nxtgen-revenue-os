"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent, formatCurrency } from "@/lib/utils";
import { Plus, Megaphone, TrendingUp, Share2, FileText, BarChart3 } from "lucide-react";

const campaigns = [
  { id: "mc1", name: "Q4 Growth Sprint", type: "Multi-channel", status: "active", channels: ["Email", "SMS", "Social"], leads: 2847, conversions: 234, revenue: 184200, roas: 4.2 },
  { id: "mc2", name: "Product Launch — AI Suite", type: "Launch", status: "scheduled", channels: ["Email", "Paid Ads"], leads: 0, conversions: 0, revenue: 0, roas: 0 },
  { id: "mc3", name: "Black Friday 2025", type: "Promotional", status: "draft", channels: ["Email", "SMS", "Social", "Push"], leads: 0, conversions: 0, revenue: 0, roas: 0 },
  { id: "mc4", name: "Customer Referral Program", type: "Referral", status: "active", channels: ["Email", "In-app"], leads: 892, conversions: 124, revenue: 62400, roas: 8.1 },
];

const statusColors: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  scheduled: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  draft: "text-surface-400 bg-surface-800 border-surface-700",
  completed: "text-violet-400 bg-violet-500/10 border-violet-500/20",
};

export default function MarketingCampaignsPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">Marketing Campaigns</h1>
            <p className="text-sm text-surface-500 mt-0.5">Multi-channel campaign management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={BarChart3}>Attribution</Button>
            <Button variant="gradient" size="sm" icon={Plus}>New Campaign</Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Active Campaigns", value: "2", icon: Megaphone, color: "text-brand-400" },
            { label: "Total Leads (30d)", value: formatNumber(3739), icon: TrendingUp, color: "text-emerald-400" },
            { label: "Revenue Attributed", value: formatCurrency(246600), icon: TrendingUp, color: "text-amber-400" },
            { label: "Avg ROAS", value: "5.7x", icon: BarChart3, color: "text-violet-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className={stat.color} />
                  <span className="text-xs text-surface-500">{stat.label}</span>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4 hover:border-surface-700 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                  <Megaphone size={18} className="text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-surface-100">{campaign.name}</p>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${statusColors[campaign.status]}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-surface-500">{campaign.type}</span>
                    <span className="text-surface-700">·</span>
                    <div className="flex items-center gap-1">
                      {campaign.channels.map((ch) => (
                        <span key={ch} className="text-[10px] bg-surface-800 text-surface-400 rounded px-1.5 py-0.5">{ch}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {campaign.revenue > 0 && (
                  <div className="hidden lg:grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-xs font-bold text-surface-100">{formatNumber(campaign.leads)}</p>
                      <p className="text-[10px] text-surface-600">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-emerald-400">{campaign.conversions}</p>
                      <p className="text-[10px] text-surface-600">Converted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-amber-400">{formatCurrency(campaign.revenue)}</p>
                      <p className="text-[10px] text-surface-600">Revenue</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
