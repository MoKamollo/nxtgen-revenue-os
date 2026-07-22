import { SectionHeading, Reveal } from "./ui";

type Val = boolean | "partial";
const ROWS: { feature: string; nxtgen: Val; spreadsheet: Val; generic: Val }[] = [
  { feature: "Affiliate link tracking", nxtgen: true, spreadsheet: false, generic: "partial" },
  { feature: "Live funnel visibility", nxtgen: true, spreadsheet: false, generic: false },
  { feature: "Email sequence management", nxtgen: true, spreadsheet: false, generic: "partial" },
  { feature: "Revenue attribution by source", nxtgen: true, spreadsheet: false, generic: false },
  { feature: "Automation triggers", nxtgen: true, spreadsheet: false, generic: "partial" },
  { feature: "Contact & subscriber CRM", nxtgen: true, spreadsheet: false, generic: true },
  { feature: "Built for affiliate marketers", nxtgen: true, spreadsheet: false, generic: false },
  { feature: "All-in-one (no duct tape)", nxtgen: true, spreadsheet: false, generic: false },
];

function Cell({ value }: { value: boolean | "partial" }) {
  if (value === true) return (
    <td className="py-3.5 text-center">
      <svg className="mx-auto h-5 w-5 text-money-400" viewBox="0 0 20 20" fill="currentColor" aria-label="Yes">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
      </svg>
    </td>
  );
  if (value === "partial") return (
    <td className="py-3.5 text-center">
      <svg className="mx-auto h-5 w-5 text-mist-500" viewBox="0 0 20 20" fill="currentColor" aria-label="Partial">
        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
      </svg>
    </td>
  );
  return (
    <td className="py-3.5 text-center">
      <svg className="mx-auto h-5 w-5 text-mist-700" viewBox="0 0 20 20" fill="currentColor" aria-label="No">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </td>
  );
}

export default function Comparison() {
  return (
    <section className="relative bg-ink-950 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[640px] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why NxtGen Convert"
          title={<>Everything you need,<br />nothing you don&apos;t</>}
          sub="Most tools either do too little or dump every feature imaginable on you. Convert is scoped for affiliate and email-driven businesses — and nothing else."
        />

        <Reveal delay={80} className="mt-14 overflow-hidden">
          <div className="lp-grad-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto bg-ink-900/80 backdrop-blur-sm">
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="py-4 pl-6 text-left text-xs font-medium tracking-wide text-mist-500">Feature</th>
                    <th className="py-4 text-center text-xs font-semibold tracking-wide text-violet-300">NxtGen Convert</th>
                    <th className="py-4 text-center text-xs font-medium tracking-wide text-mist-500">Spreadsheets</th>
                    <th className="py-4 pr-6 text-center text-xs font-medium tracking-wide text-mist-500">Generic CRM</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr key={row.feature}
                      className={i < ROWS.length - 1 ? "border-b border-white/[0.04]" : ""}>
                      <td className="py-3.5 pl-6 text-sm text-mist-300">{row.feature}</td>
                      <Cell value={row.nxtgen} />
                      <Cell value={row.spreadsheet} />
                      <Cell value={row.generic} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
