"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/org";
import { Plus, ChevronLeft, ChevronRight, Calendar, Video, Phone, Mail, MessageSquare, Loader2, CheckSquare } from "lucide-react";
import { useState, useEffect } from "react";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type CalEvent = {
  id: string; title: string; type: string;
  date: Date; time: string; source: "activity" | "task";
  color: string;
};

const TYPE_CONFIG: Record<string, { color: string; icon: typeof Mail }> = {
  meeting:   { color: "bg-violet-500/20 border-violet-500/30 text-violet-300",  icon: Calendar },
  call:      { color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300", icon: Phone },
  email:     { color: "bg-brand-500/20 border-brand-500/30 text-brand-300",     icon: Mail },
  video:     { color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",        icon: Video },
  sms:       { color: "bg-blue-500/20 border-blue-500/30 text-blue-300",        icon: MessageSquare },
  whatsapp:  { color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300", icon: MessageSquare },
  task:      { color: "bg-amber-500/20 border-amber-500/30 text-amber-300",     icon: CheckSquare },
  note:      { color: "bg-surface-700/40 border-surface-700 text-surface-400",  icon: Calendar },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode,    setViewMode]    = useState<"month" | "week">("month");
  const [events,      setEvents]      = useState<CalEvent[]>([]);
  const [loading,     setLoading]     = useState(true);

  const today = new Date();
  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    Promise.all([
      fetch(apiUrl("/api/activities")).then(r => r.json()),
      fetch(apiUrl("/api/tasks")).then(r => r.json()),
    ]).then(([actsRes, tasksRes]) => {
      const acts: CalEvent[] = (actsRes.data ?? [])
        .filter((a: { scheduledAt?: string | null }) => a.scheduledAt)
        .map((a: { id: string; subject: string; type: string; scheduledAt: string }) => {
          const d    = new Date(a.scheduledAt);
          const cfg  = TYPE_CONFIG[a.type] ?? TYPE_CONFIG.note;
          return {
            id:     `act-${a.id}`,
            title:  a.subject,
            type:   a.type,
            date:   d,
            time:   d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            source: "activity" as const,
            color:  cfg.color,
          };
        });

      const tks: CalEvent[] = (tasksRes.data ?? [])
        .filter((t: { dueDate?: string | null; status?: string }) => t.dueDate && t.status !== "completed")
        .map((t: { id: string; title: string; dueDate: string }) => {
          const d = new Date(t.dueDate);
          return {
            id:     `task-${t.id}`,
            title:  t.title,
            type:   "task",
            date:   d,
            time:   d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            source: "task" as const,
            color:  TYPE_CONFIG.task.color,
          };
        });

      setEvents([...acts, ...tks].sort((a, b) => a.date.getTime() - b.date.getTime()));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayEvents = events.filter(e => e.date.toDateString() === today.toDateString());
  const upcoming    = events.filter(e => e.date > today).slice(0, 4);

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
        {/* Calendar */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-surface-50">Calendar</h1>
              <div className="flex items-center rounded-lg border border-surface-700 bg-surface-900 p-0.5">
                {["month","week"].map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode as "month" | "week")}
                    className={cn("px-3 py-1 rounded-md text-xs capitalize transition-all", viewMode === mode ? "bg-surface-700 text-surface-100" : "text-surface-500 hover:text-surface-300")}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentDate(new Date(year, month - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                  <ChevronLeft size={15} />
                </button>
                <span className="text-sm font-semibold text-surface-200 w-36 text-center">{MONTHS[month]} {year}</span>
                <button onClick={() => setCurrentDate(new Date(year, month + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-500 hover:text-surface-300 hover:bg-surface-800 transition-all">
                  <ChevronRight size={15} />
                </button>
              </div>
              <button onClick={() => setCurrentDate(new Date())}
                className="h-7 px-3 rounded-lg border border-surface-700 text-xs text-surface-400 hover:text-surface-200 hover:border-surface-600 transition-all">
                Today
              </button>
              <Button variant="gradient" size="sm" icon={Plus}>New Event</Button>
            </div>
          </div>

          {/* Calendar Grid */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center"><Loader2 size={20} className="animate-spin text-surface-500" /></div>
          ) : (
            <div className="flex-1 rounded-xl border border-surface-800 bg-surface-900/50 overflow-hidden">
              <div className="grid grid-cols-7 border-b border-surface-800">
                {DAYS.map(day => (
                  <div key={day} className="px-2 py-2.5 text-center text-[11px] font-semibold text-surface-500 uppercase tracking-wider">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 h-[calc(100%-40px)]">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="border-r border-b border-surface-800/40 bg-surface-950/30" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day      = i + 1;
                  const date     = new Date(year, month, day);
                  const isToday  = date.toDateString() === today.toDateString();
                  const dayEvts  = events.filter(e => e.date.toDateString() === date.toDateString());
                  return (
                    <div key={day} className={cn("border-r border-b border-surface-800/40 p-1.5 cursor-pointer hover:bg-surface-800/30 transition-colors", isToday && "bg-brand-500/5")}>
                      <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium mb-1", isToday ? "bg-brand-500 text-white font-bold" : "text-surface-400")}>
                        {day}
                      </div>
                      {dayEvts.map(event => (
                        <div key={event.id} className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium border mb-0.5 truncate", event.color)}>
                          {event.time} {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-72 shrink-0 border-l border-surface-800 p-4 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold text-surface-200">Today</h3>
            <p className="text-xs text-surface-500 mt-0.5">{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-4"><Loader2 size={14} className="animate-spin text-surface-500" /></div>
          ) : todayEvents.length > 0 ? (
            <div className="space-y-2">
              {todayEvents.map(event => {
                const Icon = TYPE_CONFIG[event.type]?.icon ?? Calendar;
                return (
                  <div key={event.id} className={cn("rounded-xl border p-3", event.color)}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold">{event.time}</span>
                      <Icon size={12} className="opacity-70" />
                    </div>
                    <p className="text-xs font-semibold truncate">{event.title}</p>
                    <p className="text-[10px] opacity-70 capitalize mt-0.5">{event.source === "task" ? "Task due" : event.type}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar size={24} className="text-surface-700 mb-2" />
              <p className="text-xs text-surface-400">No events today</p>
              <p className="text-[11px] text-surface-600 mt-1">Schedule activities or set task due dates</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-surface-300 mb-3">Upcoming</h3>
            {upcoming.length === 0 ? (
              <p className="text-xs text-surface-600 text-center py-4">No upcoming events</p>
            ) : (
              <div className="space-y-2">
                {upcoming.map(event => {
                  const Icon = TYPE_CONFIG[event.type]?.icon ?? Calendar;
                  return (
                    <div key={event.id} className="flex items-center gap-2 rounded-lg border border-surface-800 p-2.5">
                      <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg shrink-0", event.color)}>
                        <Icon size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-surface-200 truncate">{event.title}</p>
                        <p className="text-[10px] text-surface-600">
                          {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {event.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
