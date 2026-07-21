"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { mockAIInsights, mockContacts, mockKPIs } from "@/lib/data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import {
  Bot,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Brain,
  Target,
  Users,
  DollarSign,
  ChevronRight,
  RefreshCcw,
  Star,
  BarChart3,
  MessageSquare,
  Play,
  Settings,
} from "lucide-react";
import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const radarData = [
  { metric: "Engagement", value: 82 },
  { metric: "Product Fit", value: 91 },
  { metric: "Budget Align", value: 67 },
  { metric: "Decision Power", value: 78 },
  { metric: "Timeline", value: 85 },
  { metric: "Churn Risk", value: 94 },
];

const scatterData = mockContacts.map((c) => ({
  x: c.score,
  y: c.revenue > 0 ? c.revenue / 1000 : Math.random() * 50,
  name: `${c.firstName} ${c.lastName}`,
  status: c.status,
}));

const AI_TASKS = [
  {
    id: "task1",
    title: "Draft follow-up email for Sarah Johnson",
    type: "email",
    status: "ready",
    confidence: 94,
    impact: "High",
    desc: "AI has drafted a personalized follow-up based on the enterprise proposal discussion",
  },
  {
    id: "task2",
    title: "Create churn prevention workflow for ScaleX AI",
    type: "automation",
    status: "ready",
    confidence: 87,
    impact: "Critical",
    desc: "Launch 5-step intervention workflow targeting declining health scores",
  },
  {
    id: "task3",
    title: "Generate Q4 expansion proposal for BuildFast Co",
    type: "proposal",
    status: "ready",
    confidence: 91,
    impact: "Medium",
    desc: "Professional upgrade proposal with ROI analysis and comparison",
  },
  {
    id: "task4",
    title: "Segment high-LTV prospects for personalized campaign",
    type: "segment",
    status: "processing",
    confidence: 78,
    impact: "Medium",
    desc: "AI is analyzing behavioral patterns to create precision audience segment",
  },
];

export default function AIInsightsPage() {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-brand-500">
                <Brain size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-surface-50 tracking-tight">
                  AI Intelligence Center
                </h1>
                <p className="text-sm text-surface-500 mt-0.5">
                  Autonomous insights powered by your revenue data
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">AI Engine Active</span>
            </div>
            <Button
              variant="gradient"
              size="sm"
              icon={RefreshCcw}
              loading={isAnalyzing}
              onClick={triggerAnalysis}
            >
              Run Analysis
            </Button>
          </div>
        </div>

        {/* AI Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Predictions Made", value: "2,847", sub: "Last 30 days", color: "text-brand-400", bg: "bg-brand-500/10", icon: Brain },
            { label: "Accuracy Rate", value: "91.4%", sub: "Validated outcomes", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Target },
            { label: "Revenue Protected", value: "$342K", sub: "Churn prevented", color: "text-amber-400", bg: "bg-amber-500/10", icon: DollarSign },
            { label: "Opportunities Found", value: "47", sub: "This month", color: "text-violet-400", bg: "bg-violet-500/10", icon: Sparkles },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-xl border border-surface-800 ${stat.bg} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={15} className={stat.color} />
                  <span className="text-xs text-surface-400">{stat.label}</span>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-surface-600 mt-0.5">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-5">
          {/* AI Action Queue */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-surface-200">
                  AI Action Queue
                </h2>
                <Badge variant="purple" size="sm">
                  {AI_TASKS.filter(t => t.status === "ready").length} ready
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>

            {AI_TASKS.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-surface-800 bg-surface-900/50 p-4 hover:border-surface-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    task.status === "ready" ? "bg-brand-500/15" : "bg-amber-500/15"
                  )}>
                    {task.type === "email" && <MessageSquare size={15} className={task.status === "ready" ? "text-brand-400" : "text-amber-400"} />}
                    {task.type === "automation" && <Zap size={15} className={task.status === "ready" ? "text-brand-400" : "text-amber-400"} />}
                    {task.type === "proposal" && <BarChart3 size={15} className={task.status === "ready" ? "text-brand-400" : "text-amber-400"} />}
                    {task.type === "segment" && <Users size={15} className={task.status === "ready" ? "text-brand-400" : "text-amber-400"} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold text-surface-100">{task.title}</p>
                      <Badge
                        variant={task.impact === "Critical" ? "danger" : task.impact === "High" ? "warning" : "info"}
                        size="sm"
                      >
                        {task.impact}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-surface-500 leading-relaxed">{task.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">{task.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {task.status === "ready" ? (
                      <Button variant="gradient" size="sm" icon={Play}>
                        Execute
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5">
                        <RefreshCcw size={11} className="text-amber-400 animate-spin" />
                        <span className="text-xs text-amber-400">Processing</span>
                      </div>
                    )}
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-600 hover:text-surface-300 hover:bg-surface-800 transition-all">
                      <Settings size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lead Scoring Panel */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-surface-200 mb-3">
                AI Lead Scoring
              </h2>

              {/* Select contact */}
              <div className="space-y-2 mb-4">
                {mockContacts.slice(0, 4).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={cn(
                      "w-full flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all",
                      selectedContact.id === contact.id
                        ? "border-brand-500/40 bg-brand-500/8"
                        : "border-surface-800 bg-surface-900/50 hover:border-surface-700"
                    )}
                  >
                    <Avatar name={`${contact.firstName} ${contact.lastName}`} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-surface-100 truncate">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-[10px] text-surface-500 truncate">{contact.company}</p>
                    </div>
                    <div className={cn(
                      "flex h-7 w-8 items-center justify-center rounded-lg text-xs font-bold",
                      contact.score >= 85 ? "bg-emerald-500/15 text-emerald-400" :
                      contact.score >= 70 ? "bg-brand-500/15 text-brand-400" :
                      "bg-amber-500/15 text-amber-400"
                    )}>
                      {contact.score}
                    </div>
                  </button>
                ))}
              </div>

              {/* Radar chart for selected contact */}
              <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
                <p className="text-xs font-semibold text-surface-200 mb-1">
                  {selectedContact.firstName} {selectedContact.lastName}
                </p>
                <p className="text-[10px] text-surface-500 mb-3">
                  Lead quality breakdown
                </p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#1e293b" />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: "#64748b", fontSize: 9 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.2}
                        strokeWidth={1.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {radarData.map((item) => (
                    <div key={item.metric} className="flex items-center justify-between">
                      <span className="text-[10px] text-surface-500">{item.metric}</span>
                      <span className="text-[10px] font-semibold text-surface-300">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="grid grid-cols-2 gap-5">
          {/* Churn Prediction */}
          <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-200">Churn Predictions</h3>
                <p className="text-xs text-surface-500 mt-0.5">Next 90 days</p>
              </div>
              <Badge variant="danger" size="sm">3 at risk</Badge>
            </div>
            <div className="space-y-2">
              {[
                { name: "Priya Sharma", company: "ScaleX AI", risk: 78, arr: 120000, score: 41 },
                { name: "David Thompson", company: "NextStep Co", risk: 45, arr: 36000, score: 62 },
                { name: "Elena Petrov", company: "Global Ops", risk: 32, arr: 48000, score: 71 },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-lg border border-surface-800 p-3">
                  <Avatar name={item.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-surface-100">{item.name}</p>
                    <p className="text-[10px] text-surface-500">{item.company} · {formatCurrency(item.arr)} ARR</p>
                    <div className="mt-1.5 h-1 rounded-full bg-surface-800">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.risk >= 70 ? "bg-red-500" :
                          item.risk >= 40 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${item.risk}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn(
                      "text-sm font-bold",
                      item.risk >= 70 ? "text-red-400" :
                      item.risk >= 40 ? "text-amber-400" : "text-emerald-400"
                    )}>
                      {item.risk}%
                    </p>
                    <p className="text-[10px] text-surface-500">churn risk</p>
                  </div>
                  <Button variant="outline" size="xs">
                    Intervene
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Expansion Opportunities */}
          <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-200">Expansion Opportunities</h3>
                <p className="text-xs text-surface-500 mt-0.5">AI-identified upsell signals</p>
              </div>
              <Badge variant="success" size="sm">$186K potential</Badge>
            </div>
            <div className="space-y-2">
              {[
                { name: "James Chen", company: "BuildFast Co", opportunity: "Pro Plan Upgrade", value: 10800, probability: 82 },
                { name: "Sarah Johnson", company: "TechCorp Inc", opportunity: "Add-on: AI Module", value: 24000, probability: 71 },
                { name: "Priya Sharma", company: "ScaleX AI", opportunity: "Enterprise Tier", value: 60000, probability: 68 },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-lg border border-surface-800 p-3">
                  <Avatar name={item.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-surface-100">{item.name}</p>
                    <p className="text-[10px] text-surface-500">{item.opportunity}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        +{formatCurrency(item.value)} ARR
                      </span>
                      <span className="text-[10px] text-surface-600">
                        · {item.probability}% probability
                      </span>
                    </div>
                  </div>
                  <Button variant="success" size="xs">
                    Create proposal
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scatter plot */}
        <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-200">Contact Intelligence Map</h3>
              <p className="text-xs text-surface-500 mt-0.5">AI Score vs Revenue contribution</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="AI Score"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "AI Score", position: "insideBottom", offset: -5, fill: "#475569", fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Revenue (K)"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}K`}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3", stroke: "#334155" }}
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                  formatter={(v, n, p) => [
                    n === "x" ? `Score: ${v}` : `$${v}K`,
                    p.payload.name
                  ]}
                />
                <Scatter data={scatterData} fill="#6366f1">
                  {scatterData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.status === "vip" ? "#a78bfa" :
                        entry.status === "customer" ? "#10b981" :
                        entry.status === "prospect" ? "#60a5fa" : "#64748b"
                      }
                      fillOpacity={0.8}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 justify-center">
            {[
              { label: "VIP", color: "bg-violet-400" },
              { label: "Customer", color: "bg-emerald-500" },
              { label: "Prospect", color: "bg-blue-400" },
              { label: "Lead", color: "bg-surface-500" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${l.color}`} />
                <span className="text-xs text-surface-500">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
