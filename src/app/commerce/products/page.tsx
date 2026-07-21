"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockProducts } from "@/lib/data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import {
  Plus,
  Search,
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  MoreHorizontal,
  Package,
  Star,
  RefreshCcw,
  ExternalLink,
  Copy,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueByProduct = [
  { month: "Jul", starter: 42000, professional: 124000, enterprise: 280000 },
  { month: "Aug", starter: 48000, professional: 138000, enterprise: 298000 },
  { month: "Sep", starter: 52000, professional: 149000, enterprise: 312000 },
  { month: "Oct", starter: 56000, professional: 162000, enterprise: 334000 },
  { month: "Nov", starter: 61000, professional: 178000, enterprise: 351000 },
  { month: "Dec", starter: 67000, professional: 192000, enterprise: 380000 },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = mockProducts.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
              Products & Pricing
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              {mockProducts.length} products · 3,495 active subscriptions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={BarChart3}>
              Revenue report
            </Button>
            <Button variant="gradient" size="sm" icon={Plus}>
              New Product
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total MRR", value: "$298.4K", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Active Subscriptions", value: "3,495", icon: Users, color: "text-brand-400", bg: "bg-brand-500/10" },
            { label: "Avg Revenue / User", value: "$85.40", icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10" },
            { label: "Renewal Rate", value: "94.2%", icon: RefreshCcw, color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-xl border border-surface-800 ${stat.bg} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className={stat.color} />
                  <span className="text-xs text-surface-400">{stat.label}</span>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue by Product Chart */}
        <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-200">Revenue by Product</h3>
              <p className="text-xs text-surface-500 mt-0.5">Last 6 months breakdown</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { label: "Starter", color: "bg-brand-500" },
                { label: "Professional", color: "bg-violet-500" },
                { label: "Enterprise", color: "bg-emerald-500" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${l.color}`} />
                  <span className="text-surface-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByProduct} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#94a3b8" }}
                  formatter={(v) => [formatCurrency(Number(v))]}
                />
                <Bar dataKey="starter" name="Starter" fill="#6366f1" radius={[0, 0, 0, 0]} stackId="a" />
                <Bar dataKey="professional" name="Professional" fill="#8b5cf6" stackId="a" />
                <Bar dataKey="enterprise" name="Enterprise" fill="#10b981" radius={[3, 3, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 rounded-lg border border-surface-700 bg-surface-900 pl-9 pr-3 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map((product, idx) => {
              const gradients = [
                "from-brand-500 to-violet-600",
                "from-violet-500 to-pink-600",
                "from-emerald-500 to-cyan-600",
              ];
              const gradient = gradients[idx % gradients.length];

              return (
                <div
                  key={product.id}
                  className="rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden hover:border-surface-700 transition-all group"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${gradient} p-5`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <Package size={20} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {product.isActive ? (
                          <Badge variant="success" size="sm" dot>Active</Badge>
                        ) : (
                          <Badge variant="ghost" size="sm">Inactive</Badge>
                        )}
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <p className="text-sm text-white/70 mt-1">{product.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-black text-white">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-white/60 text-sm">/{product.interval}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg bg-surface-800/60 p-3">
                        <p className="text-xs text-surface-500">Subscriptions</p>
                        <p className="text-lg font-bold text-surface-100 mt-0.5">
                          {formatNumber(product.activeSubscriptions)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-800/60 p-3">
                        <p className="text-xs text-surface-500">Total Revenue</p>
                        <p className="text-lg font-bold text-emerald-400 mt-0.5">
                          {formatCurrency(product.totalRevenue)}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15">
                            <Star size={9} className="text-emerald-400" />
                          </div>
                          <span className="text-xs text-surface-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* MRR from this product */}
                    <div className="rounded-lg border border-surface-800 p-3 mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-surface-500">Monthly Revenue</span>
                        <span className="text-xs font-bold text-emerald-400">
                          {formatCurrency(product.price * product.activeSubscriptions)}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-800">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${(product.price * product.activeSubscriptions / 298400) * 100}%`
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-surface-600 mt-1">
                        {Math.round((product.price * product.activeSubscriptions / 298400) * 100)}% of total MRR
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" fullWidth icon={ExternalLink}>
                        View Page
                      </Button>
                      <Button variant="ghost" size="sm" icon={Copy} />
                      <Button variant="ghost" size="sm" icon={ArrowUpRight} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
