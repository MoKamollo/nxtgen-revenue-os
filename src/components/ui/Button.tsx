"use client";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "success"
  | "gradient";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  loading?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/20 hover:shadow-brand-500/30",
  secondary:
    "bg-surface-800 hover:bg-surface-700 text-surface-100 border border-surface-700 hover:border-surface-600",
  ghost: "hover:bg-surface-800/60 text-surface-400 hover:text-surface-200",
  outline:
    "border border-surface-700 hover:border-surface-600 text-surface-300 hover:text-surface-100 hover:bg-surface-800/40",
  danger:
    "bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40",
  success:
    "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20",
  gradient:
    "gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs gap-1",
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  lg: "h-10 px-4 text-sm gap-2",
  xl: "h-12 px-6 text-base gap-2.5",
};

const iconSizes: Record<ButtonSize, number> = {
  xs: 12,
  sm: 13,
  md: 15,
  lg: 16,
  xl: 18,
};

export function Button({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  loading,
  children,
  fullWidth,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-900",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <svg
          className="animate-spin"
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : Icon ? (
        <Icon size={iconSizes[size]} />
      ) : null}
      {children && <span>{children}</span>}
      {IconRight && !loading && <IconRight size={iconSizes[size]} />}
    </button>
  );
}

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "ghost",
  className,
  ...props
}: Omit<ButtonProps, "children" | "iconRight"> & { icon: LucideIcon }) {
  const btnSizes: Record<ButtonSize, string> = {
    xs: "h-6 w-6",
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-9 w-9",
    xl: "h-10 w-10",
  };

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        variants[variant],
        btnSizes[size],
        className
      )}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
}
