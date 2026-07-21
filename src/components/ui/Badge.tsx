"use client";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "outline"
  | "ghost";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-800 text-surface-300 border-surface-700",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/15 text-red-400 border-red-500/20",
  info: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  purple: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  outline: "bg-transparent text-surface-300 border-surface-600",
  ghost: "bg-surface-800/50 text-surface-400 border-transparent",
};

const sizes = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2 py-0.5",
  lg: "text-sm px-2.5 py-1",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-surface-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
  purple: "bg-violet-400",
  outline: "bg-surface-400",
  ghost: "bg-surface-400",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  dot,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; variant: BadgeVariant }> = {
    lead: { label: "Lead", variant: "ghost" },
    prospect: { label: "Prospect", variant: "info" },
    customer: { label: "Customer", variant: "success" },
    vip: { label: "VIP", variant: "purple" },
    churned: { label: "Churned", variant: "danger" },
    draft: { label: "Draft", variant: "ghost" },
    scheduled: { label: "Scheduled", variant: "info" },
    sending: { label: "Sending", variant: "warning" },
    sent: { label: "Sent", variant: "success" },
    paused: { label: "Paused", variant: "warning" },
    cancelled: { label: "Cancelled", variant: "danger" },
    active: { label: "Active", variant: "success" },
    archived: { label: "Archived", variant: "ghost" },
    open: { label: "Open", variant: "info" },
    in_progress: { label: "In Progress", variant: "warning" },
    waiting: { label: "Waiting", variant: "ghost" },
    resolved: { label: "Resolved", variant: "success" },
    closed: { label: "Closed", variant: "ghost" },
    todo: { label: "To Do", variant: "ghost" },
    completed: { label: "Completed", variant: "success" },
    prospecting: { label: "Prospecting", variant: "ghost" },
    qualification: { label: "Qualification", variant: "info" },
    proposal: { label: "Proposal", variant: "info" },
    negotiation: { label: "Negotiation", variant: "warning" },
    closed_won: { label: "Closed Won", variant: "success" },
    closed_lost: { label: "Closed Lost", variant: "danger" },
  };

  const item = config[status] ?? { label: status, variant: "default" as BadgeVariant };

  return (
    <Badge variant={item.variant} dot>
      {item.label}
    </Badge>
  );
}
