"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "./cn";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-500",
      scrolled
        ? "border-b border-white/[0.07] bg-ink-950/90 backdrop-blur-xl shadow-[0_1px_24px_-8px_rgba(0,0,0,0.6)]"
        : "bg-transparent"
    )}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none">
          <div style={{ width: 110, height: 22, overflow: "hidden" }}>
            <img src="/nxg-logo-dark.svg" alt="NxtGen" style={{ height: 22, width: "auto" }} />
          </div>
          <span className="text-xs font-semibold tracking-widest text-violet-300 uppercase">
            Convert
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm text-mist-400 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login"
            className="text-sm text-mist-300 transition-colors hover:text-white">
            Sign in
          </Link>
          <Link href="/sign-up"
            className="lp-btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white">
            Start free
          </Link>
        </div>

        <button type="button" aria-label="Toggle menu" aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden">
          <span className={cn("h-0.5 w-5 rounded-full bg-mist-300 transition-all", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-5 rounded-full bg-mist-300 transition-all", open && "opacity-0")} />
          <span className={cn("h-0.5 w-5 rounded-full bg-mist-300 transition-all", open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink-950/95 px-5 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-mist-300 hover:bg-white/5 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
            <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm text-mist-300 hover:bg-white/5 hover:text-white">
              Sign in
            </Link>
            <Link href="/sign-up"
              className="lp-btn-primary rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white">
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
