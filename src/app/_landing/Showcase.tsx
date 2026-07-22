"use client";
import { useState } from "react";
import { cn } from "./cn";
import { SectionHeading, Reveal } from "./ui";

const TABS = [
  {
    id: "pipeline",
    label: "Live Pipeline",
    desc: "Watch clicks move through your funnel in real time. Each stage updates live so you know exactly what's converting — and what isn't.",
    preview: (
      <div className="space-y-3 p-1">
        {[
          { stage: "Clicks", count: "1,284", bar: "w-full", color: "bg-azure-400" },
          { stage: "Email opens", count: "742", bar: "w-[58%]", color: "bg-violet-400" },
          { stage: "Link clicks", count: "312", bar: "w-[24%]", color: "bg-cobalt-400" },
          { stage: "Purchases", count: "47", bar: "w-[4%]", color: "bg-money-400" },
        ].map((s) => (
          <div key={s.stage} className="space-y-1">
            <div className="flex justify-between text-xs text-mist-400">
              <span>{s.stage}</span><span className="text-white">{s.count}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className={cn("h-full rounded-full transition-all duration-700", s.bar, s.color)} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "revenue",
    label: "Revenue Trends",
    desc: "Daily and monthly revenue broken down by source — affiliate, email, organic. Instantly see which channel is pulling its weight.",
    preview: (
      <div className="flex h-28 items-end gap-1.5 px-2">
        {[22, 35, 28, 48, 31, 55, 42, 62, 44, 71, 58, 80, 65, 88].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className={cn("w-full rounded-t-sm transition-all", i === 13 ? "bg-money-400" : "bg-violet-500/50")}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "contacts",
    label: "Contact View",
    desc: "Every subscriber in context — their origin, tags, purchase history, and where they sit in your funnel. No more digging through exports.",
    preview: (
      <div className="space-y-2 text-xs">
        {[
          { name: "Alex R.", tag: "Customer", ltv: "$349", status: "bg-money-400" },
          { name: "Maya S.", tag: "Lead", ltv: "$0", status: "bg-cobalt-400" },
          { name: "Jordan K.", tag: "Prospect", ltv: "$99", status: "bg-violet-400" },
          { name: "Sam P.", tag: "Customer", ltv: "$198", status: "bg-money-400" },
        ].map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 px-3 py-2">
            <div className="flex items-center gap-2.5">
              <span className={cn("h-2 w-2 rounded-full", c.status)} />
              <span className="text-mist-200">{c.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] text-mist-500">{c.tag}</span>
              <span className="text-money-300">{c.ltv}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    desc: "Set it once. When a subscriber clicks, buys, or goes quiet — the right thing happens automatically without you lifting a finger.",
    preview: (
      <div className="space-y-2 text-xs">
        {[
          { trigger: "Purchase made", action: "Send welcome sequence", active: true },
          { trigger: "Link clicked 3×", action: "Tag as hot lead", active: true },
          { trigger: "No open in 14 days", action: "Re-engagement email", active: false },
          { trigger: "Refund requested", action: "Alert + pause sequence", active: true },
        ].map((a) => (
          <div key={a.trigger} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/3 px-3 py-2.5">
            <span className={cn("mt-0.5 h-2 w-2 flex-shrink-0 rounded-full", a.active ? "bg-money-400" : "bg-mist-600")} />
            <div>
              <div className="text-mist-200">{a.trigger}</div>
              <div className="mt-0.5 text-mist-500">→ {a.action}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Showcase() {
  const [active, setActive] = useState("pipeline");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="how-it-works" className="relative bg-ink-900 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-cobalt-500/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="See it in action"
          title={<>Built for how affiliate businesses actually work</>}
          sub="Four core views that cover the full cycle — from traffic in to revenue out."
        />

        <Reveal delay={80} className="mt-14">
          <div className="lp-grad-border overflow-hidden rounded-2xl">
            <div className="bg-ink-900">
              <div className="flex overflow-x-auto border-b border-white/[0.06] px-4">
                {TABS.map((t) => (
                  <button key={t.id} onClick={() => setActive(t.id)} type="button"
                    className={cn(
                      "flex-shrink-0 border-b-2 px-4 py-3.5 font-mono text-[11px] tracking-widest transition-colors",
                      t.id === active
                        ? "border-violet-400 text-violet-300"
                        : "border-transparent text-mist-500 hover:text-mist-300"
                    )}>
                    {t.label.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-white/[0.06] p-7 md:border-b-0 md:border-r">
                  <p className="text-base leading-relaxed text-mist-300">{tab.desc}</p>
                </div>
                <div className="p-7">
                  <div className="rounded-xl border border-white/[0.06] bg-ink-850/60 p-4">
                    {tab.preview}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
