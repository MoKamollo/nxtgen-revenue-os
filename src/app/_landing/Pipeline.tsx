"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./ui";

const FLOW = "M 14,52 C 40,64 46,66 62,74 C 120,102 170,124 234,150 C 300,177 350,197 402,222 C 438,239 470,262 500,286 C 514,297 530,304 548,310";
const STAGES = [
  { x: 62, y: 74, label: "CLICKS", ly: 108, vy: 127 },
  { x: 234, y: 150, label: "LEADS", ly: 184, vy: 203 },
  { x: 402, y: 222, label: "NURTURE", ly: 256, vy: 275 },
] as const;
type Chip = { id: number; amt: number };
const DOTS = [
  { begin: "0s", dur: "7.2s", green: false }, { begin: "-1.2s", dur: "6.6s", green: false },
  { begin: "-2.5s", dur: "7.8s", green: false }, { begin: "-3.7s", dur: "6.9s", green: true },
  { begin: "-4.6s", dur: "7.4s", green: false }, { begin: "-5.8s", dur: "7s", green: false },
  { begin: "-6.5s", dur: "6.4s", green: false },
];

export default function Pipeline() {
  const reduced = useReducedMotion();
  const [clicks, setClicks] = useState(1284);
  const [leads, setLeads] = useState(312);
  const [nurture, setNurture] = useState(138);
  const [sales, setSales] = useState(47);
  const [mrr, setMrr] = useState(128_940);
  const [today, setToday] = useState(412);
  const [mrrShown, setMrrShown] = useState(128_940);
  const [chips, setChips] = useState<Chip[]>([]);
  const shownRef = useRef(128_940);

  useEffect(() => {
    if (reduced) return;
    const t1 = window.setInterval(() => setClicks((c) => c + 1 + Math.floor(Math.random() * 3)), 900);
    const t2 = window.setInterval(() => {
      setLeads((l) => l + (Math.random() < 0.25 ? 2 : 1));
      if (Math.random() < 0.6) setNurture((n) => n + 1);
    }, 3400);
    const t3 = window.setInterval(() => {
      const amt = 49 + Math.floor(Math.random() * 141);
      setSales((s) => s + 1); setMrr((m) => m + amt); setToday((t) => t + amt);
      const id = Date.now();
      setChips((cs) => [...cs.slice(-2), { id, amt }]);
      window.setTimeout(() => setChips((cs) => cs.filter((c) => c.id !== id)), 1800);
    }, 5600);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, [reduced]);

  useEffect(() => {
    const from = shownRef.current; const to = mrr;
    if (from === to) return;
    let raf = 0; const t0 = performance.now(); const dur = reduced ? 1 : 700;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (to - from) * e); shownRef.current = v; setMrrShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [mrr, reduced]);

  return (
    <div className="lp-grad-border relative rounded-2xl shadow-[0_40px_120px_-30px_rgba(124,58,237,0.45)]">
      <div className="rounded-2xl bg-ink-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-money-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-money-400" />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-money-300">LIVE</span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-mist-500">TRAFFIC → REVENUE</span>
          </div>
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-mist-600 sm:block">TODAY · ALL FUNNELS</span>
        </div>
        <div className="relative">
          <svg viewBox="0 0 640 400" className="block h-auto w-full" role="img"
            aria-label="Live pipeline: clicks flowing through lead, nurture and sale stages into a growing MRR counter">
            <defs>
              <linearGradient id="flowStroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="640" y2="0">
                <stop offset="0" stopColor="#38bdf8" stopOpacity="0.75" /><stop offset="0.45" stopColor="#8b5cf6" stopOpacity="0.75" />
                <stop offset="0.8" stopColor="#34d399" stopOpacity="0.85" /><stop offset="1" stopColor="#34d399" />
              </linearGradient>
              <radialGradient id="dotCore"><stop offset="0" stopColor="#ffffff" /><stop offset="0.45" stopColor="#7dd3fc" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0" /></radialGradient>
              <radialGradient id="dotCoreGreen"><stop offset="0" stopColor="#ffffff" /><stop offset="0.45" stopColor="#6ee7b7" /><stop offset="1" stopColor="#34d399" stopOpacity="0" /></radialGradient>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34d399" stopOpacity="0.35" /><stop offset="1" stopColor="#34d399" stopOpacity="0" /></linearGradient>
              <linearGradient id="tileStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34d399" stopOpacity="0.7" /><stop offset="1" stopColor="#10b981" stopOpacity="0.25" /></linearGradient>
              <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {Array.from({ length: 11 }).map((_, i) => <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="400" stroke="#8b5cf6" strokeOpacity="0.04" />)}
            {Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 64} x2="640" y2={i * 64} stroke="#8b5cf6" strokeOpacity="0.04" />)}
            <text x="14" y="38" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="#6a7194">TRAFFIC IN ▸</text>
            <path d={FLOW} fill="none" stroke="url(#flowStroke)" strokeWidth="7" strokeOpacity="0.16" strokeLinecap="round" filter="url(#softGlow)" />
            <path d={FLOW} fill="none" stroke="url(#flowStroke)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
            <path d={FLOW} fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" strokeDasharray="3 17" className="animate-[dash-flow_1.3s_linear_infinite]" />
            {!reduced && DOTS.map((d, i) => (
              <g key={i}>
                <circle r="8" fill={d.green ? "url(#dotCoreGreen)" : "url(#dotCore)"} opacity="0.5">
                  <animateMotion path={FLOW} dur={d.dur} begin={d.begin} repeatCount="indefinite" />
                </circle>
                <circle r={d.green ? 4.5 : 3.8} fill={d.green ? "#34d399" : "#bae6fd"} filter="url(#softGlow)">
                  <animateMotion path={FLOW} dur={d.dur} begin={d.begin} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            <text x="132" y="102" fontFamily="monospace" fontSize="10" fill="#8f97b5">24.3%</text>
            <text x="306" y="178" fontFamily="monospace" fontSize="10" fill="#8f97b5">61.8%</text>
            <text x="438" y="246" fontFamily="monospace" fontSize="10" fill="#8f97b5">15.1%</text>
            {STAGES.map((s, i) => (
              <g key={s.label}>
                <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="#8b5cf6" strokeOpacity="0.5" className="animate-[ring-pulse_2.6s_ease-out_infinite]" style={{ animationDelay: `${i * 0.8}s` }} />
                <circle cx={s.x} cy={s.y} r="9" fill="#0b0e20" stroke="url(#flowStroke)" strokeWidth="1.5" />
                <circle cx={s.x} cy={s.y} r="3.2" fill={i === 0 ? "#38bdf8" : "#a78bfa"} filter="url(#softGlow)" />
                <text x={s.x} y={s.ly} textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2.5" fill="#6a7194">{s.label}</text>
              </g>
            ))}
            <circle cx="500" cy="286" r="9" fill="none" stroke="#34d399" strokeOpacity="0.6" className="animate-[ring-pulse_2.6s_ease-out_infinite]" style={{ animationDelay: "0.4s" }} />
            <circle cx="500" cy="286" r="9" fill="#0b0e20" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="500" cy="286" r="3.2" fill="#34d399" filter="url(#softGlow)" />
            <text x="556" y="256" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2.5" fill="#6ee7b7">SALE</text>
            <g>
              <rect x="452" y="300" width="176" height="92" rx="16" fill="#07130f" fillOpacity="0.9" stroke="url(#tileStroke)" strokeWidth="1.2" />
              <path d="M 460,384 L 460,372 L 480,366 L 500,368 L 520,356 L 540,359 L 560,347 L 580,351 L 600,339 L 620,330 L 620,384 Z" fill="url(#sparkFill)" />
              <path d="M 460,372 L 480,366 L 500,368 L 520,356 L 540,359 L 560,347 L 580,351 L 600,339 L 620,330" fill="none" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
              <circle cx="620" cy="330" r="3" fill="#6ee7b7" filter="url(#softGlow)" />
              <text x="468" y="323" fontFamily="monospace" fontSize="9" letterSpacing="2.5" fill="#6ee7b7" fillOpacity="0.85">LIVE MRR</text>
              <text x="468" y="354" fontFamily="monospace" fontSize="22" fontWeight="600" fill="#a7f3d0">{`$${mrrShown.toLocaleString()}`}</text>
              <text x="468" y="372" fontFamily="monospace" fontSize="10" fill="#34d399">{`+$${today.toLocaleString()} today`}</text>
            </g>
            <text x={STAGES[0].x} y={STAGES[0].vy} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="600" fill="#eef0fa">{clicks.toLocaleString()}</text>
            <text x={STAGES[1].x} y={STAGES[1].vy} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="600" fill="#eef0fa">{leads.toLocaleString()}</text>
            <text x={STAGES[2].x} y={STAGES[2].vy} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="600" fill="#eef0fa">{nurture.toLocaleString()}</text>
            <text x="556" y="275" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="600" fill="#6ee7b7">{sales}</text>
          </svg>
          {chips.map((c) => (
            <span key={c.id} className="animate-[chip-up_1.7s_cubic-bezier(0.22,1,0.36,1)_both] pointer-events-none absolute rounded-full border border-money-400/40 bg-money-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-money-300 backdrop-blur-sm"
              style={{ left: "78%", top: "64%" }}>
              +${c.amt}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/5 px-5 py-3 font-mono text-[11px] tracking-wider text-mist-500">
          <span>CVR <span className="text-money-300">3.66%</span></span>
          <span className="text-mist-600">·</span>
          <span>EPC <span className="text-money-300">$1.84</span></span>
          <span className="text-mist-600">·</span>
          <span>REFUNDS <span className="text-mist-300">0.4%</span></span>
        </div>
      </div>
    </div>
  );
}
