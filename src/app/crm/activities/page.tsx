"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { mockActivities } from "@/lib/data";
import { timeAgo, cn } from "@/lib/utils";
import { Plus, Mail, Phone, Calendar, FileText, MessageSquare, Clock, CheckCircle } from "lucide-react";

const typeConfig = {
  email: { icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10", label: "Email" },
  call: { icon: Phone, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Call" },
  meeting: { icon: Calendar, color: "text-violet-400", bg: "bg-violet-500/10", label: "Meeting" },
  note: { icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10", label: "Note" },
  sms: { icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-500/10", label: "SMS" },
};

export default function ActivitiesPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">Activities</h1>
            <p className="text-sm text-surface-500 mt-0.5">All interactions and touchpoints</p>
          </div>
          <Button variant="gradient" size="sm" icon={Plus}>Log Activity</Button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {Object.entries(typeConfig).map(([key, conf]) => {
            const Icon = conf.icon;
            return (
              <div key={key} className={`rounded-xl border border-surface-800 ${conf.bg} p-4 cursor-pointer hover:border-surface-700 transition-all`}>
                <Icon size={20} className={conf.color} />
                <p className="text-sm font-bold text-surface-100 mt-2">
                  {mockActivities.filter(a => a.type === key).length}
                </p>
                <p className="text-xs text-surface-500">{conf.label}s</p>
              </div>
            );
          })}
        </div>

        <Card padding="none">
          <div className="divide-y divide-surface-800/60">
            {mockActivities.map((activity) => {
              const conf = typeConfig[activity.type as keyof typeof typeConfig] || typeConfig.note;
              const Icon = conf.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 px-4 py-4 hover:bg-surface-800/30 cursor-pointer transition-colors group">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${conf.bg}`}>
                    <Icon size={16} className={conf.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-100">{activity.subject}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Avatar name={activity.contact} size="xs" />
                      <span className="text-xs text-surface-400">{activity.contact}</span>
                      <span className="text-surface-700">·</span>
                      <span className="text-xs text-surface-500">{activity.company}</span>
                    </div>
                    {activity.outcome && (
                      <p className="text-xs text-surface-500 mt-1">{activity.outcome}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-surface-600">
                      {activity.scheduledAt ? (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock size={11} /> Scheduled
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle size={11} /> {timeAgo(activity.completedAt!)}
                        </span>
                      )}
                    </span>
                    <p className="text-[11px] text-surface-600 mt-0.5">{activity.user}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
