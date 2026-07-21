"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { mockTickets } from "@/lib/data";
import { timeAgo, cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Filter,
  HeadphonesIcon,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  ChevronRight,
  Star,
  Zap,
  Users,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

const priorityConfig = {
  low: { label: "Low", color: "text-surface-500", dot: "bg-surface-500" },
  medium: { label: "Medium", color: "text-blue-400", dot: "bg-blue-400" },
  high: { label: "High", color: "text-amber-400", dot: "bg-amber-400" },
  critical: { label: "Critical", color: "text-red-400", dot: "bg-red-400 animate-pulse" },
};

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = mockTickets.filter((t) => {
    const matchSearch = !search ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" ||
      (activeTab === "open" && (t.status === "open" || t.status === "in_progress")) ||
      (activeTab === "waiting" && t.status === "waiting") ||
      (activeTab === "resolved" && (t.status === "resolved" || t.status === "closed"));
    return matchSearch && matchTab;
  });

  const stats = {
    open: mockTickets.filter(t => t.status === "open").length,
    inProgress: mockTickets.filter(t => t.status === "in_progress").length,
    waiting: mockTickets.filter(t => t.status === "waiting").length,
    resolved: mockTickets.filter(t => t.status === "resolved").length,
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
              Support Tickets
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              {stats.open + stats.inProgress} open · Avg response time: 18m
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Zap}>
              AI Suggestions
            </Button>
            <Button variant="gradient" size="sm" icon={Plus}>
              New Ticket
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Open", value: stats.open, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "Waiting", value: stats.waiting, icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Resolved Today", value: stats.resolved, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-xl border ${stat.border} ${stat.bg} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-surface-400">{stat.label}</span>
                  <Icon size={14} className={stat.color} />
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* SLA & Performance */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "First Response SLA", value: "94.2%", desc: "Within 1 hour", trend: "up" },
            { label: "Resolution SLA", value: "87.8%", desc: "Within 24 hours", trend: "up" },
            { label: "CSAT Score", value: "4.7/5", desc: "Last 30 days", trend: "up" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
              <p className="text-xs text-surface-500">{metric.label}</p>
              <p className="text-2xl font-bold text-surface-50 mt-1">{metric.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown size={11} className="text-emerald-400 rotate-180" />
                <span className="text-xs text-emerald-400">{metric.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 rounded-lg border border-surface-700 bg-surface-900 pl-9 pr-3 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="flex items-center rounded-lg border border-surface-700 bg-surface-900 p-0.5">
            {["all", "open", "waiting", "resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs capitalize transition-all",
                  activeTab === tab
                    ? "bg-surface-700 text-surface-100"
                    : "text-surface-500 hover:text-surface-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 h-8 rounded-lg border border-surface-700 bg-surface-900 px-3 text-xs text-surface-400 hover:text-surface-200 hover:border-surface-600 transition-all">
            <Filter size={13} />
            Filter
          </button>
        </div>

        {/* Ticket List */}
        <Card padding="none">
          <div className="divide-y divide-surface-800/60">
            {filtered.map((ticket) => {
              const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig];

              return (
                <div
                  key={ticket.id}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-surface-800/30 cursor-pointer group transition-colors"
                >
                  {/* Priority indicator */}
                  <div className={`h-2 w-2 rounded-full shrink-0 ${priority.dot}`} />

                  {/* Ticket Number */}
                  <span className="text-xs font-mono text-surface-500 shrink-0 w-20">
                    {ticket.ticketNumber}
                  </span>

                  {/* Subject */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-100 truncate">
                      {ticket.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-surface-500">{ticket.contact}</span>
                      {ticket.company && (
                        <>
                          <span className="text-surface-700">·</span>
                          <span className="text-xs text-surface-600">{ticket.company}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status & Priority */}
                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <StatusBadge status={ticket.status} />
                    <Badge
                      variant={
                        ticket.priority === "critical" ? "danger" :
                        ticket.priority === "high" ? "warning" :
                        ticket.priority === "medium" ? "info" : "ghost"
                      }
                      size="sm"
                    >
                      {priority.label}
                    </Badge>
                  </div>

                  {/* Assignee */}
                  <div className="hidden lg:flex items-center gap-2 shrink-0 w-32">
                    {ticket.assignee ? (
                      <>
                        <Avatar name={ticket.assignee} size="xs" />
                        <span className="text-xs text-surface-400 truncate">
                          {ticket.assignee}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-surface-600 italic">Unassigned</span>
                    )}
                  </div>

                  {/* First Response */}
                  <div className="hidden xl:block shrink-0 w-28">
                    {ticket.firstResponseAt ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle size={11} />
                        <span>{timeAgo(ticket.firstResponseAt)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-red-400 animate-pulse">
                        <Clock size={11} />
                        <span>No response</span>
                      </div>
                    )}
                  </div>

                  {/* Satisfaction */}
                  <div className="hidden xl:flex items-center gap-0.5 shrink-0 w-16">
                    {ticket.satisfactionScore ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < ticket.satisfactionScore! ? "text-amber-400 fill-amber-400" : "text-surface-700"}
                        />
                      ))
                    ) : (
                      <span className="text-xs text-surface-600 italic">—</span>
                    )}
                  </div>

                  {/* Created */}
                  <span className="text-xs text-surface-600 shrink-0 w-16 text-right">
                    {timeAgo(ticket.createdAt)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex h-6 w-6 items-center justify-center rounded-md text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                      <MoreHorizontal size={13} />
                    </button>
                    <ChevronRight size={13} className="text-surface-600" />
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <HeadphonesIcon size={40} className="text-surface-700 mb-3" />
              <p className="text-sm font-semibold text-surface-300">No tickets found</p>
              <p className="text-xs text-surface-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
