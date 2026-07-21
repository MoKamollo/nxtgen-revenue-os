"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";
import { apiUrl } from "@/lib/org";
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Layers,
  BarChart3,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";

type Deal = {
  id: string; name: string; value: number; stage: string; probability: number;
  contact: string; company: string; owner: string; expectedCloseDate: string | null;
  tags: string[];
};

const KANBAN_STAGES = [
  { id: "prospecting", label: "Prospecting", color: "#94a3b8" },
  { id: "qualification", label: "Qualification", color: "#60a5fa" },
  { id: "proposal", label: "Proposal", color: "#818cf8" },
  { id: "negotiation", label: "Negotiation", color: "#fb923c" },
  { id: "closed_won", label: "Closed Won", color: "#34d399" },
  { id: "closed_lost", label: "Closed Lost", color: "#f87171" },
];

export default function DealsPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [allDeals, setAllDeals] = useState<Deal[]>([]);

  useEffect(() => {
    fetch(apiUrl("/api/deals"))
      .then((r) => r.json())
      .then((j) => setAllDeals(j.data ?? []));
  }, []);

  const getDealsForStage = (stage: string) =>
    allDeals.filter((d) => d.stage === stage);

  const totalPipelineValue = allDeals.reduce((sum, d) => sum + d.value, 0);
  const wonDeals = allDeals.filter((d) => d.stage === "closed_won");

  const pipelineData = KANBAN_STAGES.map((s) => {
    const stageDeals = getDealsForStage(s.id);
    return { stage: s.label, count: stageDeals.length, value: stageDeals.reduce((acc, d) => acc + d.value, 0), color: s.color };
  });

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
              Deals
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              {allDeals.length} deals · {formatCurrency(totalPipelineValue)} pipeline value
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={BarChart3}>
              Forecast
            </Button>
            <Button variant="gradient" size="sm" icon={Plus}>
              New Deal
            </Button>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {pipelineData.map((stage) => (
            <div
              key={stage.stage}
              className="rounded-xl border border-surface-800 bg-surface-900/50 p-3"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-[10px] text-surface-500 font-medium truncate">
                  {stage.stage}
                </span>
              </div>
              <p className="text-sm font-bold text-surface-100">
                {formatCurrency(stage.value)}
              </p>
              <p className="text-[11px] text-surface-500 mt-0.5">
                {stage.count} deals
              </p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 rounded-lg border border-surface-700 bg-surface-900 pl-9 pr-3 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
            />
          </div>
          <button className="flex items-center gap-1.5 h-8 rounded-lg border border-surface-700 bg-surface-900 px-3 text-xs text-surface-400 hover:text-surface-200 hover:border-surface-600 transition-all">
            <Filter size={13} />
            Filters
          </button>
          <div className="flex-1" />
          <div className="flex items-center rounded-lg border border-surface-700 bg-surface-900 p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "flex items-center gap-1.5 h-7 px-3 rounded-md text-xs transition-all",
                view === "kanban"
                  ? "bg-surface-700 text-surface-100"
                  : "text-surface-500 hover:text-surface-300"
              )}
            >
              <Layers size={12} /> Kanban
            </button>
            <button
              onClick={() => setView("table")}
              className={cn(
                "flex items-center gap-1.5 h-7 px-3 rounded-md text-xs transition-all",
                view === "table"
                  ? "bg-surface-700 text-surface-100"
                  : "text-surface-500 hover:text-surface-300"
              )}
            >
              <BarChart3 size={12} /> Table
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        {view === "kanban" && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {KANBAN_STAGES.map((stage) => {
              const deals = getDealsForStage(stage.id);
              const stageValue = deals.reduce((s, d) => s + d.value, 0);

              return (
                <div key={stage.id} className="w-64 shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="text-xs font-semibold text-surface-300">
                        {stage.label}
                      </span>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-800 text-[10px] text-surface-400">
                        {deals.length}
                      </span>
                    </div>
                    <span className="text-[11px] text-surface-500">
                      {stageValue > 0 ? formatCurrency(stageValue) : "—"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {deals.map((deal) => (
                      <div
                        key={deal.id}
                        className="rounded-xl border border-surface-800 bg-surface-900/70 p-3 cursor-pointer hover:border-surface-700 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-xs font-semibold text-surface-100 leading-tight flex-1 pr-2">
                            {deal.name}
                          </p>
                          <button className="opacity-0 group-hover:opacity-100 text-surface-600 hover:text-surface-300 transition-all">
                            <MoreHorizontal size={13} />
                          </button>
                        </div>

                        <p className="text-lg font-bold text-surface-50 mb-2">
                          {formatCurrency(deal.value)}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar name={deal.contact} size="xs" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-surface-400 truncate">
                              {deal.contact}
                            </p>
                            <p className="text-[10px] text-surface-600 truncate">
                              {deal.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  deal.probability >= 70
                                    ? "#10b981"
                                    : deal.probability >= 40
                                    ? "#f59e0b"
                                    : "#94a3b8",
                              }}
                            />
                            <span className="text-[11px] text-surface-500">
                              {deal.probability}%
                            </span>
                          </div>
                          {deal.expectedCloseDate && (
                            <div className="flex items-center gap-1 text-[10px] text-surface-600">
                              <Calendar size={10} />
                              {new Date(deal.expectedCloseDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-2 h-1 rounded-full bg-surface-800">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${deal.probability}%`,
                              backgroundColor: stage.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    <button className="w-full flex items-center justify-center gap-1.5 h-8 rounded-xl border border-dashed border-surface-800 text-xs text-surface-600 hover:text-surface-400 hover:border-surface-700 transition-all">
                      <Plus size={13} /> Add deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <Card padding="none">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-800">
                  {["Deal", "Value", "Stage", "Contact", "Owner", "Probability", "Close Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-surface-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800/60">
                {allDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-surface-800/30 cursor-pointer transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/10">
                          <TrendingUp size={12} className="text-brand-400" />
                        </div>
                        <span className="text-xs font-semibold text-surface-100">{deal.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-emerald-400">
                        {formatCurrency(deal.value)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={deal.stage} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={deal.contact} size="xs" />
                        <div>
                          <p className="text-xs text-surface-200">{deal.contact}</p>
                          <p className="text-[11px] text-surface-500">{deal.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-surface-400">{deal.owner}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-surface-800">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              deal.probability >= 70 ? "bg-emerald-500" :
                              deal.probability >= 40 ? "bg-amber-500" : "bg-surface-500"
                            )}
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <span className="text-xs text-surface-300">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-surface-400">
                        {deal.expectedCloseDate
                          ? new Date(deal.expectedCloseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="opacity-0 group-hover:opacity-100 text-surface-600 hover:text-surface-300 transition-all">
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
