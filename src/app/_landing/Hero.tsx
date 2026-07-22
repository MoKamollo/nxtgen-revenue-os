import Link from "next/link";
import Pipeline from "./Pipeline";
import { Reveal } from "./ui";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink-950 pb-24 pt-32 sm:pt-40">
      {/* Background ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute -right-20 top-60 h-[500px] w-[500px] rounded-full bg-cobalt-500/10 blur-[120px]" />
        <div className="lp-grid-lines absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-money-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-money-400" />
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-violet-300">
                  EARLY ACCESS · NOW OPEN
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 style={{ fontFamily: '"Bricolage Grotesque", "Instrument Sans", sans-serif' }}
                className="text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Turn traffic into{" "}
                <span className="lp-text-grad-money">recurring revenue</span>
                {" "}— without the chaos.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist-400">
                NxtGen Convert connects your affiliate links, funnels, and email sequences in one place.
                Track what's converting, spot what's leaking, and act on it — all from a single dashboard.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/sign-up"
                  className="lp-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white">
                  Get early access
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/login"
                  className="lp-btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium text-mist-200">
                  Sign in
                </Link>
              </div>
              <p className="mt-3 text-xs text-mist-600">No credit card required · Cancel anytime</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.06] pt-8">
                {[
                  { label: "All-in-one dashboard", icon: "◈" },
                  { label: "Works with your existing tools", icon: "⟳" },
                  { label: "Real-time reporting", icon: "◎" },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-2 text-sm text-mist-400">
                    <span className="text-money-400">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Pipeline widget */}
          <Reveal delay={80} className="w-full">
            <Pipeline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
