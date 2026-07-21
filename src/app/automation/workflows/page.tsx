"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { mockWorkflows } from "@/lib/data";
import { formatPercent, timeAgo, cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Zap,
  MoreHorizontal,
  Play,
  Pause,
  Copy,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Bot,
  Sparkles,
  ChevronRight,
  GitBranch,
  Clock,
  Target,
} from "lucide-react";
import { useState } from "react";

const WORKFLOW_TEMPLATES = [
  {
    name: "Lead Nurture Sequence",
    desc: "Automatically nurture new leads with personalized email sequences",
    steps: 7,
    category: "Lead Generation",
    color: "from-brand-500 to-violet-500",
    icon: Users,
  },
  {
    name: "Trial → Paid Conversion",
    desc: "Convert trial users to paying customers with targeted touchpoints",
    steps: 12,
    category: "Revenue",
    color: "from-emerald-500 to-cyan-500",
    icon: Target,
  },
  {
    name: "Churn Prevention",
    desc: "Detect at-risk accounts and trigger proactive outreach",
    steps: 5,
    category: "Retention",
    color: "from-amber-500 to-orange-500",
    icon: Zap,
  },
  {
    name: "Onboarding Journey",
    desc: "Guide new customers through activation milestones",
    steps: 9,
    category: "Customer Success",
    color: "from-violet-500 to-pink-500",
    icon: CheckCircle2,
  },
];

export default function WorkflowsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = mockWorkflows.filter((w) => {
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" ||
      (activeTab === "active" && w.status === "active") ||
      (activeTab === "paused" && w.status === "paused");
    return matchSearch && matchTab;
  });

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
                Automation
              </h1>
              <div className="flex items-center gap-1 rounded-full bg-violet-500/15 border border-violet-500/25 px-2 py-0.5">
                <Bot size={11} className="text-violet-400" />
                <span className="text-[10px] font-semibold text-violet-400">AI Powered</span>
              </div>
            </div>
            <p className="text-sm text-surface-500 mt-0.5">
              {mockWorkflows.filter(w => w.status === "active").length} active workflows · 1,726 contacts enrolled
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Sparkles}>
              AI Generate
            </Button>
            <Button variant="gradient" size="sm" icon={Plus}>
              New Workflow
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Active Workflows", value: mockWorkflows.filter(w => w.status === "active").length, icon: Zap, color: "text-brand-400", bg: "bg-brand-500/10" },
            { label: "Contacts Enrolled", value: "1,726", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Completions", value: "1,085", icon: CheckCircle2, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Avg Conversion", value: "38.4%", icon: Target, color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${stat.bg}`}>
                    <Icon size={14} className={stat.color} />
                  </div>
                  <span className="text-xs text-surface-500">{stat.label}</span>
                </div>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 rounded-lg border border-surface-700 bg-surface-900 pl-9 pr-3 text-xs text-surface-200 placeholder:text-surface-600 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="flex items-center rounded-lg border border-surface-700 bg-surface-900 p-0.5">
            {["all", "active", "paused"].map((tab) => (
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
        </div>

        {/* Workflows */}
        <div className="space-y-3">
          {filtered.map((wf) => (
            <div
              key={wf.id}
              className="rounded-xl border border-surface-800 bg-surface-900/50 hover:border-surface-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Status indicator */}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  wf.status === "active" ? "bg-emerald-500/15" : "bg-surface-800"
                )}>
                  <Zap size={18} className={wf.status === "active" ? "text-emerald-400" : "text-surface-500"} />
                </div>

                {/* Name & Trigger */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-surface-100">{wf.name}</p>
                    <StatusBadge status={wf.status} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Zap size={11} className="text-surface-600" />
                    <span className="text-xs text-surface-500">{wf.trigger}</span>
                    <span className="text-surface-700">·</span>
                    <GitBranch size={11} className="text-surface-600" />
                    <span className="text-xs text-surface-500">{wf.steps} steps</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="hidden lg:grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <p className="text-sm font-bold text-surface-100">
                      {wf.enrolledCount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-surface-600 mt-0.5">Enrolled</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-emerald-400">
                      {wf.completedCount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-surface-600 mt-0.5">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-brand-400">
                      {formatPercent(wf.conversionRate)}
                    </p>
                    <p className="text-[10px] text-surface-600 mt-0.5">Conversion</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="hidden xl:block w-32">
                  <div className="flex items-center justify-between text-[10px] text-surface-500 mb-1">
                    <span>Active</span>
                    <span>{wf.enrolledCount - wf.completedCount}</span>
                  </div>
                  <Progress
                    value={wf.completedCount}
                    max={wf.enrolledCount}
                    color={wf.conversionRate >= 70 ? "green" : wf.conversionRate >= 40 ? "brand" : "amber"}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 ml-2">
                  <button className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg transition-all",
                    wf.status === "active"
                      ? "text-amber-400 hover:bg-amber-500/10"
                      : "text-emerald-400 hover:bg-emerald-500/10"
                  )}>
                    {wf.status === "active" ? <Pause size={13} /> : <Play size={13} />}
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                    <Copy size={13} />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                    <BarChart3 size={13} />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                    <MoreHorizontal size={14} />
                  </button>
                  <ChevronRight size={14} className="text-surface-700 group-hover:text-surface-500 transition-colors ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Template Library */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-surface-200">Workflow Templates</h2>
              <Badge variant="purple" size="sm">
                <Sparkles size={10} className="mr-0.5" />
                AI-generated
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              Browse library →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {WORKFLOW_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.name}
                  className="rounded-xl border border-surface-800 bg-surface-900/50 p-4 cursor-pointer hover:border-surface-700 transition-all group"
                >
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center mb-3`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <p className="text-xs font-semibold text-surface-100">{template.name}</p>
                  <p className="text-[11px] text-surface-500 mt-1 leading-relaxed">{template.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-surface-600">{template.steps} steps</span>
                    <span className="text-[10px] bg-surface-800 text-surface-400 rounded px-1.5 py-0.5">
                      {template.category}
                    </span>
                  </div>
                  <button className="mt-3 w-full flex items-center justify-center gap-1.5 h-7 rounded-lg border border-dashed border-surface-700 text-xs text-surface-500 hover:border-brand-500/40 hover:text-brand-400 transition-all group-hover:border-brand-500/40 group-hover:text-brand-400">
                    <Plus size={12} /> Use template
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
