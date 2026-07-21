"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from "recharts";
import { mockRevenueData, mockKPIs, mockTeamPerformance } from "@/lib/data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ArrowUpRight,
  Download,
  Calendar,
  BarChart3,
  Target,
} from "lucide-react";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string; dataKey: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-surface-700 bg-surface-900 p-3 shadow-xl min-w-44">
        <p className="text-xs font-semibold text-surface-300 mb-2">{label} 2025</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs mb-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-surface-400 capitalize">{p.name}</span>
            </div>
            <span className="font-semibold text-surface-100">
              {formatCurrency(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const mrrGrowthData = mockRevenueData.map((d, i) => ({
  ...d,
  growth: i === 0 ? 0 : Math.round(((d.mrr - mockRevenueData[i - 1].mrr) / mockRevenueData[i - 1].mrr) * 100 * 10) / 10,
}));

const cohortData = [
  { cohort: "Jan '25", m1: 100, m2: 87, m3: 79, m4: 73, m5: 68, m6: 65 },
  { cohort: "Feb '25", m1: 100, m2: 89, m3: 82, m4: 76, m5: 71 },
  { cohort: "Mar '25", m1: 100, m2: 91, m3: 84, m4: 78 },
  { cohort: "Apr '25", m1: 100, m2: 88, m3: 81 },
  { cohort: "May '25", m1: 100, m2: 90 },
  { cohort: "Jun '25", m1: 100 },
];

export default function RevenueAnalyticsPage() {
  const [period, setPeriod] = useState("12m");

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
              Revenue Analytics
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              Full revenue intelligence dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-surface-700 bg-surface-900 p-0.5">
              {["3m", "6m", "12m", "YTD", "All"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs transition-all",
                    period === p
                      ? "bg-surface-700 text-surface-100"
                      : "text-surface-500 hover:text-surface-300"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "MRR",
              value: formatCurrency(mockKPIs.mrr.value),
              change: mockKPIs.mrr.change,
              desc: "Monthly Recurring Revenue",
              color: "text-emerald-400",
              Icon: DollarSign,
            },
            {
              label: "ARR",
              value: formatCurrency(mockKPIs.arr.value),
              change: 6.9,
              desc: "Annual Recurring Revenue",
              color: "text-brand-400",
              Icon: TrendingUp,
            },
            {
              label: "Churn Rate",
              value: formatPercent(mockKPIs.churnRate.value),
              change: -0.4,
              desc: "Monthly customer churn",
              color: "text-amber-400",
              Icon: TrendingDown,
            },
            {
              label: "LTV",
              value: formatCurrency(mockKPIs.ltv.value),
              change: mockKPIs.ltv.change,
              desc: "Customer lifetime value",
              color: "text-violet-400",
              Icon: Target,
            },
          ].map((metric) => {
            const Icon = metric.Icon;
            const isPositive = metric.change > 0;
            return (
              <div key={metric.label} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <Icon size={14} className={metric.color} />
                </div>
                <p className="text-2xl font-bold text-surface-50">{metric.value}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={cn(
                    "text-xs font-semibold",
                    (metric.label === "Churn Rate" ? !isPositive : isPositive) ? "text-emerald-400" : "text-red-400"
                  )}>
                    {isPositive ? "↑" : "↓"} {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-surface-600">{metric.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MRR Growth Chart */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-200">MRR Breakdown</h3>
                <p className="text-xs text-surface-500 mt-0.5">New · Expansion · Churn</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                {[
                  { label: "New", color: "bg-emerald-500" },
                  { label: "Expansion", color: "bg-brand-500" },
                  { label: "Churned", color: "bg-red-500" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${l.color}`} />
                    <span className="text-surface-400">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mockRevenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="new" name="New" fill="#10b981" radius={[3, 3, 0, 0]} fillOpacity={0.8} />
                  <Bar dataKey="net" name="Net" fill="#6366f1" radius={[3, 3, 0, 0]} fillOpacity={0.8} />
                  <Line type="monotone" dataKey="mrr" name="MRR" stroke="#818cf8" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MRR Growth Rate */}
          <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-200">Monthly Growth</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mrrGrowthData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Growth"]}
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Bar dataKey="growth" radius={[3, 3, 0, 0]}>
                    {mrrGrowthData.map((entry, i) => (
                      <Cell key={i} fill={entry.growth >= 0 ? "#10b981" : "#ef4444"} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ARR Trajectory */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-200">ARR Trajectory</h3>
                <p className="text-xs text-surface-500 mt-0.5">Projected to reach $5.2M by Q4</p>
              </div>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRevenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(v) => [formatCurrency(Number(v)), "ARR"]}
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Area type="monotone" dataKey="arr" name="ARR" stroke="#8b5cf6" fill="url(#arrGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Team Performance */}
          <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-200">Team Revenue Performance</h3>
              <Button variant="ghost" size="sm">Details</Button>
            </div>
            <div className="space-y-3">
              {mockTeamPerformance.map((rep) => (
                <div key={rep.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-[9px] font-bold text-white">
                        {rep.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-surface-200">{rep.name}</span>
                        <span className="text-[10px] text-surface-600 ml-1.5">{rep.role}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-xs font-bold",
                        rep.quotaAttainment >= 100 ? "text-emerald-400" : "text-amber-400"
                      )}>
                        {rep.quotaAttainment}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-800">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        rep.quotaAttainment >= 100 ? "bg-emerald-500" :
                        rep.quotaAttainment >= 80 ? "bg-brand-500" : "bg-amber-500"
                      )}
                      style={{ width: `${Math.min(rep.quotaAttainment, 110)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-surface-600">
                      {formatCurrency(rep.revenue)}
                    </span>
                    <span className="text-[10px] text-surface-600">
                      Goal: {formatCurrency(rep.quota)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cohort Retention */}
        <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-200">Cohort Retention Analysis</h3>
              <p className="text-xs text-surface-500 mt-0.5">Revenue retention by monthly cohort</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="text-left text-[11px] font-semibold text-surface-500 uppercase tracking-wider pb-3 pr-4">
                    Cohort
                  </th>
                  {["M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
                    <th key={m} className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider pb-3 px-2">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800/40">
                {cohortData.map((row) => (
                  <tr key={row.cohort}>
                    <td className="text-left text-xs text-surface-400 py-2.5 pr-4">
                      {row.cohort}
                    </td>
                    {["m1", "m2", "m3", "m4", "m5", "m6"].map((key) => {
                      const val = row[key as keyof typeof row] as number | undefined;
                      if (!val) return <td key={key} className="py-2.5 px-2"><span className="text-surface-700">—</span></td>;
                      const intensity = val / 100;
                      return (
                        <td key={key} className="py-2.5 px-2">
                          <div
                            className="mx-auto flex h-8 w-14 items-center justify-center rounded-lg text-xs font-semibold text-white"
                            style={{
                              backgroundColor: `rgba(99, 102, 241, ${intensity * 0.9 + 0.1})`,
                            }}
                          >
                            {val}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
