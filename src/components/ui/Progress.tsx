"use client";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: "brand" | "green" | "amber" | "red" | "cyan";
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const colors = {
  brand: "bg-brand-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
};

const sizes = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
};

export function Progress({
  value,
  max = 100,
  className,
  color = "brand",
  size = "sm",
  showLabel,
  label,
  animated,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-surface-400">{label}</span>}
          {showLabel && (
            <span className="text-xs font-medium text-surface-300">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-surface-800", sizes[size])}>
        <div
          className={cn(
            "rounded-full transition-all duration-700 ease-out",
            colors[color],
            sizes[size],
            animated && "animate-pulse"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function QuotaBar({
  value,
  quota,
  label,
}: {
  value: number;
  quota: number;
  label?: string;
}) {
  const pct = Math.min(100, (value / quota) * 100);
  const color =
    pct >= 100 ? "green" : pct >= 75 ? "brand" : pct >= 50 ? "amber" : "red";

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-surface-500">{label}</span>
          <span className="text-xs font-semibold text-surface-200">
            {Math.round(pct)}%
          </span>
        </div>
      )}
      <Progress value={pct} color={color} />
    </div>
  );
}
