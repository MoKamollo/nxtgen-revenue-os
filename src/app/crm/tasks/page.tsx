"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { Plus, CheckSquare, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

const tasks = [
  { id: "t1", title: "Follow up with Sarah Johnson re: proposal", priority: "high", status: "todo", assignee: "Alex Rivera", dueDate: "Today", contact: "Sarah Johnson", dealValue: 84000 },
  { id: "t2", title: "Send onboarding materials to James Chen", priority: "medium", status: "in_progress", assignee: "Jordan Lee", dueDate: "Tomorrow", contact: "James Chen" },
  { id: "t3", title: "Schedule Q4 QBR with ScaleX AI", priority: "high", status: "todo", assignee: "Alex Rivera", dueDate: "Dec 15", contact: "Priya Sharma", dealValue: 120000 },
  { id: "t4", title: "Review and approve Q4 campaign copy", priority: "medium", status: "completed", assignee: "Sam Park", dueDate: "Dec 10" },
  { id: "t5", title: "Update product pricing page", priority: "low", status: "todo", assignee: "Maya Thompson", dueDate: "Dec 20" },
  { id: "t6", title: "Prepare enterprise demo for Innovate IO", priority: "urgent", status: "in_progress", assignee: "Jordan Lee", dueDate: "Today", contact: "Marcus Williams" },
];

const priorityConfig: Record<string, { label: string; color: string; dot: string }> = {
  urgent: { label: "Urgent", color: "text-red-400", dot: "bg-red-400" },
  high: { label: "High", color: "text-amber-400", dot: "bg-amber-400" },
  medium: { label: "Medium", color: "text-blue-400", dot: "bg-blue-500" },
  low: { label: "Low", color: "text-surface-500", dot: "bg-surface-500" },
};

export default function TasksPage() {
  const todo = tasks.filter(t => t.status === "todo" || t.status === "in_progress");
  const done = tasks.filter(t => t.status === "completed");

  return (
    <AppLayout>
      <div className="p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-50 tracking-tight">Tasks</h1>
            <p className="text-sm text-surface-500 mt-0.5">{todo.length} open · {done.length} completed today</p>
          </div>
          <Button variant="gradient" size="sm" icon={Plus}>New Task</Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Open", value: tasks.filter(t => t.status === "todo").length, icon: CheckSquare, color: "text-brand-400" },
            { label: "In Progress", value: tasks.filter(t => t.status === "in_progress").length, icon: Clock, color: "text-amber-400" },
            { label: "Completed", value: tasks.filter(t => t.status === "completed").length, icon: CheckCircle2, color: "text-emerald-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-xs text-surface-500">{stat.label}</span>
                </div>
                <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        <Card padding="none">
          <div className="px-4 py-3 border-b border-surface-800">
            <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Active Tasks</p>
          </div>
          <div className="divide-y divide-surface-800/50">
            {todo.map((task) => {
              const priority = priorityConfig[task.priority];
              return (
                <div key={task.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-800/30 cursor-pointer group transition-colors">
                  <button className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-surface-600 hover:border-brand-500 transition-colors">
                    {task.status === "completed" && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-100">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {task.contact && <span className="text-xs text-surface-500">{task.contact}</span>}
                      {task.dealValue && (
                        <>
                          <span className="text-surface-700">·</span>
                          <span className="text-xs text-emerald-400">${(task.dealValue / 1000).toFixed(0)}K deal</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`flex items-center gap-1 text-[11px] ${priority.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
                      {priority.label}
                    </div>
                    <span className="text-xs text-surface-500">{task.dueDate}</span>
                    <Avatar name={task.assignee} size="xs" />
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              );
            })}
          </div>
          {done.length > 0 && (
            <>
              <div className="px-4 py-3 border-t border-b border-surface-800">
                <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Completed</p>
              </div>
              <div className="divide-y divide-surface-800/50 opacity-60">
                {done.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 px-4 py-3.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <p className="text-sm text-surface-400 line-through">{task.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
