import { Reveal, SectionHeading } from "./ui";

const MODULES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M3 6h16M3 11h10M3 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M19.5 17.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    color: "from-azure-400/20 to-cobalt-500/10 border-azure-400/20",
    iconColor: "text-azure-400",
    title: "Link Tracker",
    desc: "One place for every affiliate link. See clicks, earnings, and conversion rates across all your programs — updated in real time.",
    tags: ["Click tracking", "EPC reporting", "UTM support"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M4 17L8 12L12 14L17 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="17" r="1.5" fill="currentColor" /><circle cx="8" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="14" r="1.5" fill="currentColor" /><circle cx="17" cy="8" r="1.5" fill="currentColor" />
      </svg>
    ),
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/20",
    iconColor: "text-violet-400",
    title: "Funnel Visibility",
    desc: "See exactly where visitors drop off — from first click to final checkout. Pinpoint leaks and fix them before they cost you.",
    tags: ["Stage breakdown", "Drop-off analysis", "Multi-step funnels"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="12" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="12" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    color: "from-money-400/20 to-money-500/10 border-money-400/20",
    iconColor: "text-money-400",
    title: "Campaign Manager",
    desc: "Organize your email sequences, lead magnets, and promotions in one view. Know which campaigns are actually driving revenue.",
    tags: ["Email sequences", "Lead magnets", "Revenue attribution"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
    color: "from-cobalt-400/20 to-cobalt-500/10 border-cobalt-400/20",
    iconColor: "text-cobalt-400",
    title: "Automation Triggers",
    desc: "Set up actions that run automatically — tag a subscriber, send a follow-up, or flag a deal — based on real-time events in your pipeline.",
    tags: ["Event triggers", "Auto-tagging", "Follow-up sequences"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7v4l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "from-violet-400/20 to-azure-400/10 border-violet-400/20",
    iconColor: "text-violet-300",
    title: "Revenue Intelligence",
    desc: "Spot trends before they become problems. Daily and weekly breakdowns help you understand what's growing and what needs attention.",
    tags: ["Daily reports", "Trend detection", "MRR & LTV tracking"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M4 7h14M4 11h14M4 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="10" cy="15" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "from-money-300/20 to-azure-500/10 border-money-300/20",
    iconColor: "text-money-300",
    title: "Contact & CRM",
    desc: "See every subscriber and customer in context — their history, tags, lifetime value, and where they are in your funnel right now.",
    tags: ["Lead scoring", "Lifetime value", "Activity timeline"],
  },
];

export default function Modules() {
  return (
    <section id="features" className="relative bg-ink-950 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[640px] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Everything in one place"
          title={<>Six modules. One revenue OS.</>}
          sub="Instead of juggling six different tools, you get one clean dashboard where every piece of your revenue engine talks to each other."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 55}>
              <div className={`lp-card-lift h-full rounded-2xl border bg-gradient-to-br p-6 ${m.color}`}>
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-current/10 bg-current/5 ${m.iconColor}`}>
                  {m.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{m.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-mist-400">{m.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/8 bg-white/4 px-2 py-0.5 font-mono text-[10px] tracking-wide text-mist-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
