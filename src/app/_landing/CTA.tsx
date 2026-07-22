import Link from "next/link";
import { Reveal } from "./ui";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt-500/8 blur-[100px]" />
        <div className="lp-grid-lines absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="lp-eyebrow mb-4 flex items-center justify-center gap-2.5">
            <span className="inline-block h-px w-6 bg-gradient-to-r from-transparent to-violet-500/70" aria-hidden />
            Early access · Now open
            <span className="inline-block h-px w-6 bg-gradient-to-l from-transparent to-violet-500/70" aria-hidden />
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 style={{ fontFamily: '"Bricolage Grotesque", "Instrument Sans", sans-serif' }}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Ready to see your{" "}
            <span className="lp-text-grad-money">whole revenue picture</span>
            {" "}in one place?
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-mist-400">
            Start your free trial today. No credit card, no setup fees. You'll have your first funnel
            tracked in under 10 minutes.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/sign-up"
              className="lp-btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white">
              Start free — 14 days
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/login"
              className="lp-btn-ghost inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium text-mist-200">
              Sign in
            </Link>
          </div>
          <p className="mt-3 text-xs text-mist-600">No credit card required · Cancel anytime</p>
        </Reveal>
      </div>
    </section>
  );
}
