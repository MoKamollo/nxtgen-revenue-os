"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./cn";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function Reveal({ children, delay = 0, y = 26, className, style }: {
  children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform", shown ? "opacity-100" : "opacity-0", className)}
      style={{ ...style, transitionDelay: `${delay}ms`, transform: shown ? "none" : `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub, center = true, className }: {
  eyebrow: string; title: ReactNode; sub?: ReactNode; center?: boolean; className?: string;
}) {
  return (
    <Reveal className={cn(center && "text-center", className)}>
      <p className={cn("lp-eyebrow mb-4 flex items-center gap-2.5", center && "justify-center")}>
        <span className="inline-block h-px w-6 bg-gradient-to-r from-transparent to-[#8b5cf6]" aria-hidden />
        {eyebrow}
        {center && <span className="inline-block h-px w-6 bg-gradient-to-l from-transparent to-[#8b5cf6]" aria-hidden />}
      </p>
      <h2 style={{ fontFamily: '"Bricolage Grotesque", "Instrument Sans", sans-serif' }}
        className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {sub && <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed text-mist-400", center && "mx-auto")}>{sub}</p>}
    </Reveal>
  );
}
