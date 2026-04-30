"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const CHECKS = [
  { label: "Loading shipment documents...", done: false },
  { label: "Cross-referencing HS codes...", done: false },
  { label: "Checking OFAC / UN sanctions list...", done: false },
  { label: "Validating Saudi customs regulations...", done: false },
  { label: "✓ Compliance review complete — 3 issues found", done: true },
];

// Live compliance check visual — all rows pre-rendered at fixed height,
// visibility toggled via opacity/transform so layout never shifts.
function ComplianceVisual() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const play = () => {
      setVisible(0);
      CHECKS.forEach((_, i) => {
        setTimeout(() => setVisible(i + 1), (i + 1) * 900);
      });
    };
    play();
    const loopId = setInterval(play, CHECKS.length * 900 + 2000);
    return () => clearInterval(loopId);
  }, []);

  return (
    <div className="border border-[#d0ccc5] bg-[#faf9f7] font-mono text-sm overflow-hidden">
      <div className="bg-[#f2f0ec] border-b border-[#d0ccc5] px-5 py-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-[#9e9890]">
          ggxt — compliance engine
        </span>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#d0ccc5]" />
          <span className="w-3 h-3 rounded-full bg-[#d0ccc5]" />
          <span className="w-3 h-3 rounded-full bg-[#b8c9a0]" />
        </div>
      </div>
      {/* Fixed height — rows always occupy space, only opacity/position animates */}
      <div className="p-6">
        <div className="text-xs font-mono text-[#9e9890] mb-4 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
          Processing: Toluene export · Dubai → Riyadh
        </div>
        <div className="space-y-3">
          {CHECKS.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? "translateY(0)" : "translateY(6px)",
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 flex-none ${c.done ? "bg-[#b8c9a0]" : "bg-[#d0ccc5]"}`}
              />
              <span
                className={
                  c.done ? "text-[#1e1c1a] font-bold" : "text-[#6b6560]"
                }
              >
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#d0ccc5] grid grid-cols-3 divide-x divide-[#d0ccc5]">
        {[
          { v: "420K", l: "Tokens / Shipment" },
          { v: "~4.2s", l: "Processing" },
          { v: "3", l: "Issues Found" },
        ].map((s) => (
          <div key={s.l} className="px-4 py-3 text-center bg-[#f2f0ec]">
            <div className="text-base font-display font-bold text-[#1e1c1a]">
              {s.v}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mt-0.5">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeoDecoration() {
  return (
    <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block opacity-20">
      <div className="relative w-56 h-56">
        <div className="absolute inset-0 border border-[#1e1c1a] geo-spin" />
        <div
          className="absolute inset-10 border border-[#1e1c1a]"
          style={{ animation: "geoSpin 10s linear infinite reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#1e1c1a]" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[6.75rem] bg-[#faf9f7]">
      <GeoDecoration />
      <div className="absolute left-0 top-[6.75rem] bottom-0 w-px bg-[#d0ccc5]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Label */}
        <div
          className={`mb-10 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
            <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
              Dubai · MENA
            </span>
            <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
              Cross-Border Freight Compliance Platform
            </span>
          </span>
        </div>

        {/* Headline */}
        <div className="mb-12 overflow-hidden">
          <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a]">
            <span
              className={`block transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            >
              Legal reasoning
            </span>
            <span
              className={`block transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            >
              for every{" "}
              <span className="relative inline-block">
                <span
                  className="absolute inset-x-0 bottom-1 h-[30%] bg-[#d4e8c2] -z-10"
                  aria-hidden="true"
                />
                <span className="relative z-10">shipment.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Body + CTA */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-lg text-[#6b6560] leading-relaxed max-w-lg mb-10 pl-5 border-l-2 border-[#d0ccc5]">
              GGXT provides complete legal-text reasoning compliance review for
              every cargo shipment across UAE + 23 MENA countries — not a simple
              database lookup. Eliminate detention, fines, and shipping delays
              caused by complex, multilingual cross-border regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1e1c1a] text-[#f0ede8] font-mono uppercase tracking-widest text-sm hover:bg-[#3a3835] transition-colors duration-150 group"
              >
                See Live Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono uppercase tracking-widest text-sm border border-[#d0ccc5] text-[#6b6560] hover:border-[#1e1c1a] hover:text-[#1e1c1a] transition-colors duration-150"
              >
                View Pricing
              </a>
            </div>
            <p className="mt-5 text-xs font-mono text-[#9e9890] uppercase tracking-widest">
              Arabic + English bilingual documents · Daily regulation sync
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <ComplianceVisual />
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        className={`border-t border-[#d0ccc5] transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#d0ccc5]">
          {[
            {
              value: "420K",
              label: "Tokens / Shipment",
              sub: "Single-ticket full reasoning",
            },
            {
              value: "UAE+23",
              label: "Countries Covered",
              sub: "Daily auto-sync",
            },
            {
              value: "1.2B",
              label: "Tokens / Day",
              sub: "Nightly regulation patrol",
            },
            {
              value: "~60",
              label: "Shipments / Day",
              sub: "Real-time + batch processing",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-8 py-5 hover:bg-[#f2f0ec] transition-colors duration-150"
            >
              <div className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#1e1c1a] mt-0.5">
                {stat.label}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#9e9890] mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
