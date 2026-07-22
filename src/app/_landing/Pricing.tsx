import Link from "next/link";
import { cn } from "./cn";
import { SectionHeading, Reveal } from "./ui";

const TIERS = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "For solo operators getting started with affiliate tracking and basic automation.",
    highlight: false,
    features: [
      "Up to 50 affiliate links",
      "3 active funnels",
      "Basic revenue reporting",
      "Email sequence manager",
      "1,000 contacts",
      "Standard support",
    ],
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "$99",
    period: "/mo",
    desc: "For established affiliates who want deeper visibility and smarter automation.",
    highlight: true,
    badge: "Most popular",
    features: [
      "Unlimited affiliate links",
      "Unlimited funnels",
      "Live pipeline & revenue trends",
      "Full automation triggers",
      "10,000 contacts",
      "Revenue attribution by source",
      "Priority support",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$199",
    period: "/mo",
    desc: "For operators running multiple brands or high-volume affiliate programs.",
    highlight: false,
    features: [
      "Everything in Growth",
      "Multiple brand workspaces",
      "Advanced segmentation",
      "API access",
      "50,000 contacts",
      "Custom reporting",
      "Priority support + onboarding call",
    ],
    cta: "Get started",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink-950 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[640px] -translate-x-1/2 bg-gradient-to-r from-transparent via-money-400/25 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Simple pricing"
          title={<>Pay for what you use</>}
          sub="No hidden fees, no long-term contracts. Start free for 14 days — no credit card required."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 70}>
              <div className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7",
                tier.highlight
                  ? "lp-grad-border bg-ink-850 shadow-[0_20px_80px_-30px_rgba(124,58,237,0.5)]"
                  : "border-white/[0.07] bg-ink-900/60"
              )}>
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-violet-300">
                      {tier.badge.toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-1 text-sm font-semibold tracking-wide text-mist-400">{tier.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                      {tier.price}
                    </span>
                    <span className="mb-1 text-sm text-mist-500">{tier.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-mist-500">{tier.desc}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-mist-300">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-money-400" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up"
                  className={cn(
                    "block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all",
                    tier.highlight
                      ? "lp-btn-primary text-white"
                      : "lp-btn-ghost text-mist-200"
                  )}>
                  {tier.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-10 text-center text-sm text-mist-600">
            All plans include a 14-day free trial. No credit card required.
            Questions? <a href="#faq" className="text-violet-400 hover:underline">Check the FAQ.</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
