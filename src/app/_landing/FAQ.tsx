"use client";
import { useState } from "react";
import { cn } from "./cn";
import { SectionHeading, Reveal } from "./ui";

const ITEMS = [
  {
    q: "What exactly does NxtGen Convert do?",
    a: "It's a revenue operations dashboard built specifically for affiliate and email marketers. You connect your affiliate links, plug in your email sequences, and get a unified view of clicks, leads, conversions, and revenue — all in one place instead of spread across three or four tools.",
  },
  {
    q: "Do I need to switch away from my current email platform?",
    a: "No. NxtGen Convert works alongside whatever you're using for email — it's not an email sending tool, it's a visibility and tracking layer. You keep your existing setup and Connect gives you the reporting and automation triggers on top.",
  },
  {
    q: "How do I get my data in?",
    a: "You can import contacts and history via CSV. For ongoing data, you add your affiliate link IDs and the platform tracks activity through its built-in tracking layer. Deeper integrations with major platforms are on the roadmap.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. All data is encrypted in transit and at rest. We don't sell or share your data with third parties. You own your data and can export it at any time.",
  },
  {
    q: 'What does "early access" mean?',
    a: "The core platform is live and you can use it today. Early access means we're still actively building — some features are in progress and we may occasionally push updates that change things. In exchange, early access pricing is lower and your feedback directly shapes what we build next.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, always. There are no long-term contracts. Cancel from your account settings and you won't be charged again. You can export your data before you go.",
  },
  {
    q: "What if I outgrow my plan?",
    a: "You can upgrade anytime from your account settings. The switch takes effect immediately and you're only charged the difference for the remainder of your billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan comes with a 14-day free trial, no credit card required. You get full access to all features in your chosen plan from day one.",
  },
];

function Item({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className={cn("rounded-xl border transition-colors", open ? "border-violet-500/25 bg-violet-500/5" : "border-white/[0.06] bg-ink-900/50")}>
        <button type="button" onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
          aria-expanded={open}>
          <span className="text-sm font-medium text-white">{q}</span>
          <svg className={cn("mt-0.5 h-4 w-4 flex-shrink-0 text-mist-500 transition-transform", open && "rotate-45")}
            viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-mist-400 animate-[rise_0.3s_ease-out]">
            {a}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-ink-900 py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Questions"
          title={<>Frequently asked</>}
        />
        <div className="mt-12 space-y-3">
          {ITEMS.map((item, i) => (
            <Item key={item.q} q={item.q} a={item.a} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
