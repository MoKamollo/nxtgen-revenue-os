import { SectionHeading, Reveal } from "./ui";

const TESTIMONIALS = [
  {
    quote: "I finally know which email sequences are making me money and which are just noise. It changed how I plan my promotions.",
    name: "Rachel M.",
    role: "Affiliate marketer, 3 years in",
  },
  {
    quote: "The funnel breakdown is something I didn't know I was missing. Spotted a drop-off at my checkout page on day one.",
    name: "Daniel T.",
    role: "Course creator & affiliate",
  },
  {
    quote: "Honestly, I was skeptical. But having all my links, leads, and campaigns in one place removes a lot of mental overhead.",
    name: "Priya K.",
    role: "Email-first affiliate business",
  },
  {
    quote: "The automation triggers are simple but really useful. I set up a re-engagement sequence and it's running without me touching it.",
    name: "Marcus L.",
    role: "Solo operator, multiple niches",
  },
  {
    quote: "Clean UI, fast data. I use the live pipeline view every morning before I do anything else — it sets the tone for the day.",
    name: "Sofia B.",
    role: "Lead gen & SaaS affiliate",
  },
  {
    quote: "I moved from three separate tools to just this. Saves me time and I actually understand my numbers now.",
    name: "James O.",
    role: "Newsletter operator",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-ink-900 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-20 h-[350px] w-[350px] rounded-full bg-violet-600/8 blur-[90px]" />
        <div className="absolute bottom-10 left-0 h-[300px] w-[300px] rounded-full bg-money-500/6 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Early feedback"
          title={<>What early users are saying</>}
          sub="We're in early access. This is honest, unedited feedback from people who've been using the platform for the past few weeks."
        />

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60} className="mb-5 break-inside-avoid">
              <figure className="lp-card-lift h-full rounded-2xl border border-white/[0.07] bg-ink-850/60 p-6 backdrop-blur-sm">
                <blockquote className="mb-4 text-[15px] leading-relaxed text-mist-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/40 to-cobalt-500/40 text-sm font-semibold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-mist-500">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
