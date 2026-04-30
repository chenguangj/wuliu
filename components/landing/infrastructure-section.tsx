"use client";

import { useEffect, useState, useRef } from "react";

// Token breakdown data for the horizontal bar chart
const tokenLayers = [
  {
    label: "Regulation Full-Text Injection",
    tokens: 190000,
    pct: 45,
    color: "#6b6560",
  },
  {
    label: "Multi-Route Regulation Comparison",
    tokens: 120000,
    pct: 29,
    color: "#9e9890",
  },
  {
    label: "Bilingual Document Generation + Validation",
    tokens: 80000,
    pct: 19,
    color: "#b8c9a0",
  },
  {
    label: "Sanctions + Counterparty Background Check",
    tokens: 30000,
    pct: 7,
    color: "#d0ccc5",
  },
];

const costLayers = [
  {
    tier: "Layer 1 — Real-time Shipment Processing",
    desc: "Elastic load, scales with shipment volume",
    monthly: "252M tokens",
    cost: "~$3,024/mo",
    note: "60 shipments/day × 420K tokens × 30 days",
    highlight: false,
  },
  {
    tier: "Layer 2 — Nightly Regulation Patrol",
    desc: "Fixed load, independent of shipment volume",
    monthly: "612M tokens",
    cost: "~$73,440/mo",
    note: "24 customs authorities × daily diff scan",
    highlight: true,
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f2f0ec]">
      <div className="border-y border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
            {/* Left: token breakdown bar chart */}
            <div
              className={`p-10 lg:p-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-5">
                — 420,000 Token Breakdown
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#1e1c1a] tracking-tight mb-3">
                Every layer is
                <br />
                non-compressible.
              </h2>
              <p className="text-sm text-[#6b6560] mb-10 leading-relaxed">
                The 200K context window is the compliance baseline. GPT-4o's
                128K window truncates regulation content — an unacceptable legal
                risk.
              </p>

              {/* Horizontal stacked bar */}
              <div className="mb-8">
                <div className="flex h-8 w-full overflow-hidden border border-[#d0ccc5]">
                  {tokenLayers.map((layer, i) => (
                    <div
                      key={i}
                      className="h-full transition-all duration-1000 flex items-center justify-center"
                      style={{
                        width: isVisible ? `${layer.pct}%` : "0%",
                        backgroundColor: layer.color,
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {tokenLayers.map((layer, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 shrink-0"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="text-sm text-[#6b6560]">
                        {layer.label}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#1e1c1a] shrink-0">
                      {layer.tokens.toLocaleString()} tk
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#d0ccc5] flex items-center justify-between">
                <span className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">
                  Total
                </span>
                <span className="font-mono text-xl font-bold text-[#1e1c1a]">
                  420,000 tokens
                </span>
              </div>
            </div>

            {/* Right: two-layer cost structure */}
            <div
              className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="border-b border-[#d0ccc5] px-8 py-4 flex items-center justify-between bg-[#faf9f7]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
                  Two-Layer Cost Structure
                </span>
                <span className="text-[11px] font-mono text-[#6b6560] uppercase tracking-widest">
                  $4 / 1M tokens
                </span>
              </div>

              {costLayers.map((layer, index) => (
                <div
                  key={index}
                  className={`border-b border-[#d0ccc5] p-8 ${layer.highlight ? "bg-[#faf9f7]" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide mb-1">
                        {layer.tier}
                      </div>
                      <div className="text-xs text-[#9e9890] font-mono">
                        {layer.desc}
                      </div>
                    </div>
                    {layer.highlight && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-[#1e1c1a] text-[#f0ede8] shrink-0 ml-4">
                        Core Moat
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="border border-[#d0ccc5] p-4 bg-[#f2f0ec]">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">
                        Monthly tokens
                      </div>
                      <div className="text-lg font-display font-bold text-[#1e1c1a]">
                        {layer.monthly}
                      </div>
                    </div>
                    <div className="border border-[#d0ccc5] p-4 bg-[#f2f0ec]">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">
                        Monthly cost
                      </div>
                      <div className="text-lg font-display font-bold text-[#1e1c1a]">
                        {layer.cost}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-[#9e9890] font-mono">
                    {layer.note}
                  </div>
                </div>
              ))}

              <div className="p-8 bg-[#faf9f7]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-3">
                  Key insight
                </div>
                <p className="text-sm text-[#6b6560] leading-relaxed border-l-2 border-[#d0ccc5] pl-4">
                  Even with zero shipments, the nightly patrol runs as
                  scheduled. This is the platform's core moat — rule library
                  quality directly determines compliance accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
