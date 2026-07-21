"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/org";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

const PipelineTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ payload: { stage: string; count: number; value: number; color: string } }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-surface-700 bg-surface-900 p-3 shadow-xl min-w-36">
        <p className="text-xs font-semibold text-surface-200 mb-2">{data.stage}</p>
        <div className="space-y-1">
          <div className="flex justify-between gap-4 text-xs">
            <span className="text-surface-500">Deals</span>
            <span className="font-semibold text-surface-100">{data.count}</span>
          </div>
          <div className="flex justify-between gap-4 text-xs">
            <span className="text-surface-500">Value</span>
            <span className="font-semibold text-surface-100">{formatCurrency(data.value)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function PipelineChart() {
  const [pipelineData, setPipelineData] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl("/api/analytics", { type: "overview" }))
      .then((r) => r.json())
      .then((j) => setPipelineData(j.data?.pipeline ?? []));
  }, []);

  const total = pipelineData.reduce((s: number, d: any) => s + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline by Stage</CardTitle>
        <span className="text-xs text-surface-500">
          {formatCurrency(total)} total
        </span>
      </CardHeader>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pipelineData}
            margin={{ top: 4, right: 0, left: -24, bottom: 0 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<PipelineTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {pipelineData.map((entry: any, i: number) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

const ChannelTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number }; value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-surface-700 bg-surface-900 p-3 shadow-xl">
        <p className="text-xs font-semibold text-surface-200">
          {payload[0].payload.name}
        </p>
        <p className="text-sm font-bold text-surface-100 mt-0.5">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const channelData = [
  { name: "Organic Search", value: 34, color: "#6366f1" },
  { name: "Paid Ads", value: 28, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#06b6d4" },
  { name: "Social", value: 11, color: "#10b981" },
  { name: "Email", value: 9, color: "#f59e0b" },
];

const conversionFunnel = [
  { stage: "Visitors", count: 48420 },
  { stage: "Leads", count: 9284 },
  { stage: "MQLs", count: 3142 },
  { stage: "SQLs", count: 892 },
  { stage: "Opportunities", count: 346 },
  { stage: "Customers", count: 124 },
];

export function TrafficSourcesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
      </CardHeader>
      <div className="flex items-center gap-4">
        <div className="h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {channelData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<ChannelTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {channelData.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="flex-1 text-xs text-surface-400">{item.name}</span>
              <span className="text-xs font-semibold text-surface-200">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function ConversionFunnelChart() {
  const total = conversionFunnel[0].count;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <span className="text-xs text-surface-500">Last 30 days</span>
      </CardHeader>
      <div className="space-y-2">
        {conversionFunnel.map((stage, i) => {
          const pct = Math.round((stage.count / total) * 100);
          const colors = [
            "bg-brand-500",
            "bg-violet-500",
            "bg-cyan-500",
            "bg-emerald-500",
            "bg-amber-500",
            "bg-rose-500",
          ];
          return (
            <div key={stage.stage} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-surface-400">{stage.stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-surface-200">
                    {formatNumber(stage.count)}
                  </span>
                  <span className="text-[10px] text-surface-600">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-surface-800">
                <div
                  className={`h-full rounded-full transition-all ${colors[i]}`}
                  style={{ width: `${pct}%`, opacity: 1 - i * 0.08 + 0.08 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
