"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Building2,
  Globe,
  Users,
  TrendingUp,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const companies = [
  { id: "co1", name: "TechCorp Inc", domain: "techcorp.com", industry: "Technology", size: "201-500", employees: 340, revenue: 48000, contacts: 4, status: "customer", healthScore: 92 },
  { id: "co2", name: "Innovate IO", domain: "innovate.io", industry: "SaaS", size: "11-50", employees: 28, revenue: 0, contacts: 2, status: "prospect", healthScore: 71 },
  { id: "co3", name: "ScaleX AI", domain: "scalex.ai", industry: "AI/ML", size: "51-200", employees: 120, revenue: 120000, contacts: 5, status: "vip", healthScore: 41 },
  { id: "co4", name: "BuildFast Co", domain: "buildfast.co", industry: "Developer Tools", size: "1-10", employees: 8, revenue: 24000, contacts: 3, status: "customer", healthScore: 85 },
  { id: "co5", name: "NextStep Co", domain: "nextstep.co", industry: "Marketing", size: "11-50", employees: 35, revenue: 0, contacts: 1, status: "lead", healthScore: 63 },
  { id: "co6", name: "Global Ops", domain: "globalops.com", industry: "Operations", size: "201-500", employees: 280, revenue: 0, contacts: 2, status: "lead", healthScore: 78 },
];

const statusColors: Record<string, string> = {
  customer: "text-emerald-400 bg-emerald-500/10",
  prospect: "text-blue-400 bg-blue-500/10",
  vip: "text-violet-400 bg-violet-500/10",
  lead: "text-surface-400 bg-surface-800",
};

export default function CompaniesPage() {
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">Companies</h1>
            <p className="text-sm text-surface-500 mt-0.5">{companies.length} companies</p>
          </div>
          <Button variant="gradient" size="sm" icon={Plus}>Add Company</Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 rounded-lg border border-surface-700 bg-surface-900 pl-9 pr-3 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <Card key={company.id} hover className="cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-violet-500/20 border border-brand-500/20">
                    <Building2 size={18} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-surface-100">{company.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Globe size={10} className="text-surface-600" />
                      <span className="text-[11px] text-surface-500">{company.domain}</span>
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-surface-600 hover:text-surface-300 transition-all">
                  <MoreHorizontal size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-surface-800/60 p-2">
                  <p className="text-[10px] text-surface-500">Employees</p>
                  <p className="text-xs font-bold text-surface-200 mt-0.5">{company.employees}</p>
                </div>
                <div className="rounded-lg bg-surface-800/60 p-2">
                  <p className="text-[10px] text-surface-500">Revenue</p>
                  <p className={cn("text-xs font-bold mt-0.5", company.revenue > 0 ? "text-emerald-400" : "text-surface-500")}>
                    {company.revenue > 0 ? formatCurrency(company.revenue) : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Users size={11} className="text-surface-600" />
                  <span className="text-[11px] text-surface-500">{company.contacts} contacts</span>
                  <span className="text-surface-700">·</span>
                  <span className="text-[11px] text-surface-500">{company.industry}</span>
                </div>
                <div className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", statusColors[company.status])}>
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-surface-600">Health Score</span>
                  <span className={cn(
                    "font-semibold",
                    company.healthScore >= 80 ? "text-emerald-400" :
                    company.healthScore >= 60 ? "text-amber-400" : "text-red-400"
                  )}>
                    {company.healthScore}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-surface-800">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      company.healthScore >= 80 ? "bg-emerald-500" :
                      company.healthScore >= 60 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${company.healthScore}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
