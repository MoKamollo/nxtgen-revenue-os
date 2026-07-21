"use client";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  children,
  className,
  hover,
  glass,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-800 bg-surface-900/50",
        glass && "backdrop-blur-xl bg-surface-900/30",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:border-surface-700 hover:shadow-xl hover:shadow-black/20",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  subValue?: string;
  className?: string;
  colorClass?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
  subValue,
  className,
  colorClass = "text-brand-400",
}: MetricCardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <Card
      hover
      className={cn("metric-card group", className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-surface-500 uppercase tracking-wider truncate">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-surface-50 tracking-tight">
            {value}
          </p>
          {subValue && (
            <p className="mt-0.5 text-xs text-surface-500">{subValue}</p>
          )}
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center text-xs font-semibold",
                  isPositive && "text-emerald-400",
                  isNegative && "text-red-400",
                  !isPositive && !isNegative && "text-surface-400"
                )}
              >
                {isPositive ? "↑" : isNegative ? "↓" : "→"}{" "}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-surface-600">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-800/80 ring-1 ring-surface-700/50",
              colorClass
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between pb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-sm font-semibold text-surface-200", className)}>
      {children}
    </h3>
  );
}
