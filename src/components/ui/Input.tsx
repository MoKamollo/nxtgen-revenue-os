"use client";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  onIconRightClick?: () => void;
}

export function Input({
  label,
  error,
  hint,
  icon: Icon,
  iconRight: IconRight,
  onIconRightClick,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-surface-400 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none">
            <Icon size={15} />
          </div>
        )}
        <input
          id={inputId}
          {...props}
          className={cn(
            "w-full rounded-lg border bg-surface-900 text-sm text-surface-100 placeholder:text-surface-600",
            "transition-all duration-150",
            "border-surface-700 hover:border-surface-600",
            "focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "h-9 px-3",
            Icon && "pl-9",
            IconRight && "pr-9",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
        />
        {IconRight && (
          <button
            type="button"
            onClick={onIconRightClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
          >
            <IconRight size={15} />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-surface-500">{hint}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-surface-400 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={inputId}
        {...props}
        className={cn(
          "w-full rounded-lg border bg-surface-900 text-sm text-surface-100",
          "border-surface-700 hover:border-surface-600",
          "focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40",
          "h-9 px-3",
          "appearance-none cursor-pointer",
          error && "border-red-500/60",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-surface-400 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={cn(
          "w-full rounded-lg border bg-surface-900 text-sm text-surface-100 placeholder:text-surface-600",
          "border-surface-700 hover:border-surface-600",
          "focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40",
          "px-3 py-2 resize-none",
          error && "border-red-500/60",
          className
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-surface-500">{hint}</p>}
    </div>
  );
}
