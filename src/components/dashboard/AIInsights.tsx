"use client";
import { mockAIInsights } from "@/lib/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import {
  Bot,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const typeConfig = {
  opportunity: {
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "success" as const,
    label: "Opportunity",
  },
  churn: {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    badge: "danger" as const,
    label: "Churn Risk",
  },
  expansion: {
    icon: ArrowUpRight,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
    badge: "info" as const,
    label: "Expansion",
  },
  campaign: {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "warning" as const,
    label: "Campaign",
  },
};

export function AIInsightsPanel() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = mockAIInsights.filter((i) => !dismissed.includes(i.id));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/15">
            <Sparkles size={14} className="text-brand-400" />
          </div>
          <CardTitle>AI Intelligence</CardTitle>
          <Badge variant="purple" size="sm">
            {visible.length} active
          </Badge>
        </div>
        <Button variant="ghost" size="sm">
          View all insights
        </Button>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {visible.map((insight) => {
          const config = typeConfig[insight.type as keyof typeof typeConfig];
          const Icon = config.icon;

          return (
            <div
              key={insight.id}
              className={cn(
                "relative rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01]",
                config.bg,
                config.border
              )}
            >
              <button
                onClick={() => setDismissed((d) => [...d, insight.id])}
                className="absolute top-3 right-3 text-surface-600 hover:text-surface-400 transition-colors"
              >
                <X size={13} />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    config.bg
                  )}
                >
                  <Icon size={14} className={config.color} />
                </div>
                <Badge variant={config.badge} size="sm">
                  {config.label}
                </Badge>
                {insight.priority === "high" && (
                  <Badge variant="danger" size="sm">
                    High
                  </Badge>
                )}
              </div>

              <h4 className="text-xs font-semibold text-surface-100 leading-tight mb-2">
                {insight.title}
              </h4>
              <p className="text-[11px] text-surface-400 leading-relaxed mb-3 line-clamp-3">
                {insight.body}
              </p>

              {insight.contact && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Avatar name={insight.contact} size="xs" />
                  <span className="text-[11px] text-surface-400">
                    {insight.contact}
                  </span>
                </div>
              )}

              {insight.impact && (
                <div className="text-xs font-semibold text-emerald-400 mb-3">
                  {insight.impact}
                </div>
              )}

              <button
                className={cn(
                  "w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all",
                  config.bg,
                  config.color,
                  "hover:opacity-80"
                )}
              >
                <Bot size={12} />
                {insight.action}
              </button>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="col-span-4 flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-3">
              <Sparkles size={20} className="text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-surface-200">All clear!</p>
            <p className="text-xs text-surface-500 mt-1">
              No active AI insights at this time
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
