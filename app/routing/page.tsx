"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Route, ArrowRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const routes = [
  {
    id: "A",
    name: "Jebel Ali → Dammam (Direct)",
    mode: "Sea Freight",
    transit: "28h",
    cost: "$1,240",
    status: "RECOMMENDED",
    compliance: "VIABLE",
    notes: "Requires IMO declaration + MOIAT permit before booking. All other docs clear.",
    legs: ["Jebel Ali Port, UAE", "King Abdulaziz Port, Dammam, KSA"],
    regulations: ["UAE FCA Export", "IMDG Class 3", "ZATCA Import", "MOIAT Permit"],
  },
  {
    id: "B",
    name: "Jebel Ali → Sohar → Dammam",
    mode: "Sea Freight (Transit Oman)",
    transit: "52h",
    cost: "$2,040",
    status: "NOT_RECOMMENDED",
    compliance: "CONDITIONAL",
    notes: "Oman transit requires DG warehouse certification at Sohar. +$800 surcharge. Not recommended.",
    legs: ["Jebel Ali Port, UAE", "Sohar Port, Oman (transit)", "King Abdulaziz Port, Dammam, KSA"],
    regulations: ["UAE FCA Export", "Oman DG Transit", "IMDG Class 3", "ZATCA Import"],
  },
  {
    id: "C",
    name: "Dubai → Riyadh (Air Freight)",
    mode: "Air Cargo",
    transit: "6h",
    cost: "$8,900",
    status: "EXCLUDED",
    compliance: "BLOCKED",
    notes: "IATA DGR Class 3 flammable liquid requires special air DG approval — 3-week lead time. Excluded.",
    legs: ["Dubai International Airport", "King Khalid International Airport, Riyadh"],
    regulations: ["IATA DGR Class 3", "GCAA Special Approval", "ZATCA Air Import"],
  },
];

const comparisonMatrix = [
  { criterion: "Compliance status", a: "Viable (docs pending)", b: "Conditional", c: "Blocked" },
  { criterion: "Transit time", a: "28 hours", b: "52 hours", c: "6 hours" },
  { criterion: "Freight cost", a: "$1,240", b: "$2,040", c: "$8,900" },
  { criterion: "DG surcharge", a: "None", b: "+$800", c: "N/A" },
  { criterion: "Permit lead time", a: "7–14 days (MOIAT)", b: "14–21 days", c: "~3 weeks" },
  { criterion: "Risk level", a: "Low (after docs)", b: "Medium", c: "High" },
  { criterion: "Recommended", a: "✓ Yes", b: "✗ No", c: "✗ No" },
];

const regulationTokens = [
  { route: "Route A", country: "UAE", regulation: "FCA Export Regulations", tokens: "38,000 tk" },
  { route: "Route A", country: "Saudi Arabia", regulation: "ZATCA Customs Code + MOIAT", tokens: "52,000 tk" },
  { route: "Route A", country: "International", regulation: "IMDG Code Class 3", tokens: "18,000 tk" },
  { route: "Route B", country: "Oman", regulation: "Royal Oman Police DG Transit", tokens: "24,000 tk" },
  { route: "Route C", country: "International", regulation: "IATA DGR + GCAA Special", tokens: "28,000 tk" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    RECOMMENDED: "bg-[#d4e8c2] text-[#1e1c1a]",
    NOT_RECOMMENDED: "bg-[#e8e5df] text-[#6b6560]",
    EXCLUDED: "bg-[#1e1c1a] text-[#f0ede8]",
    VIABLE: "bg-[#d4e8c2] text-[#1e1c1a]",
    CONDITIONAL: "bg-[#e8e5df] text-[#6b6560]",
    BLOCKED: "bg-[#1e1c1a] text-[#f0ede8]",
  };
  return (
    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 ${map[status] ?? "bg-[#e8e5df] text-[#6b6560]"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function RoutingPage() {
  const [activeRoute, setActiveRoute] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const route = routes[activeRoute];

  return (
    <main className="relative min-h-screen bg-[#faf9f7]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[6.75rem] border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
              <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
                Module 02
              </span>
              <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                Dynamic Route Decision
              </span>
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className={`text-[clamp(2.4rem,6vw,5.5rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                Compliance-optimal
                <br />
                <span className="text-[#9e9890]">route selection.</span>
              </h1>
              <p className={`text-lg text-[#6b6560] leading-relaxed max-w-lg pl-5 border-l-2 border-[#d0ccc5] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                A single shipment typically has 3–5 viable route options, each governed by
                different jurisdictions and transit rules. GGXT loads all applicable
                regulations simultaneously and outputs the route that is both compliant
                and cost-optimal — not a simple distance calculation.
              </p>
            </div>
            <div className={`grid grid-cols-2 gap-px bg-[#d0ccc5] border border-[#d0ccc5] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {[
                { v: "~120K", l: "Tokens per decision", s: "Route comparison layer" },
                { v: "3–5", l: "Routes evaluated", s: "Per shipment" },
                { v: "24", l: "Jurisdictions loaded", s: "Parallel regulation check" },
                { v: "1", l: "Optimal route output", s: "Compliance + cost ranked" },
              ].map((s) => (
                <div key={s.l} className="bg-[#faf9f7] p-6">
                  <div className="text-3xl font-display font-bold text-[#1e1c1a]">{s.v}</div>
                  <div className="text-sm font-bold text-[#1e1c1a] mt-1 uppercase tracking-wide">{s.l}</div>
                  <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest mt-0.5">{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Route selector */}
      <section id="analysis" className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
                — Route Analysis · Toluene Export · Dubai → Riyadh
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
                3 routes evaluated. 1 recommended.
              </h2>
            </div>
            <div className="flex gap-0 border border-[#d0ccc5]">
              {routes.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRoute(i)}
                  className={`px-6 py-3 text-[11px] font-mono uppercase tracking-widest border-r last:border-r-0 border-[#d0ccc5] transition-colors ${activeRoute === i ? "bg-[#1e1c1a] text-[#f0ede8]" : "text-[#9e9890] hover:text-[#1e1c1a] hover:bg-[#e8e5df]"}`}
                >
                  Route {r.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
            {/* Route detail */}
            <div className="p-10">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">
                    Route {route.id}
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#1e1c1a]">{route.name}</h3>
                  <div className="text-sm text-[#6b6560] font-mono mt-1">{route.mode}</div>
                </div>
                <StatusBadge status={route.status} />
              </div>

              {/* Route legs */}
              <div className="mb-8">
                {route.legs.map((leg, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0 mt-1">
                      <div className={`w-3 h-3 border-2 ${i === 0 || i === route.legs.length - 1 ? "border-[#1e1c1a] bg-[#1e1c1a]" : "border-[#9e9890]"}`} />
                      {i < route.legs.length - 1 && (
                        <div className="w-px h-8 bg-[#d0ccc5] my-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className={`text-sm ${i === 0 || i === route.legs.length - 1 ? "font-bold text-[#1e1c1a]" : "text-[#6b6560]"}`}>
                        {leg}
                      </div>
                      {i < route.legs.length - 1 && (
                        <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest mt-0.5">
                          {i === 0 ? "Origin" : "Transit"}
                        </div>
                      )}
                      {i === route.legs.length - 1 && (
                        <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest mt-0.5">Destination</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-[#d0ccc5] border border-[#d0ccc5] mb-6">
                {[
                  { l: "Transit", v: route.transit },
                  { l: "Cost", v: route.cost },
                  { l: "Compliance", v: route.compliance },
                ].map((s) => (
                  <div key={s.l} className="bg-[#f2f0ec] p-4 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">{s.l}</div>
                    <div className="text-base font-display font-bold text-[#1e1c1a]">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className={`p-4 border-l-2 text-sm leading-relaxed ${route.status === "RECOMMENDED" ? "border-[#b8c9a0] bg-[#d4e8c2]/20 text-[#1e1c1a]" : route.status === "EXCLUDED" ? "border-[#1e1c1a] bg-[#e8e5df] text-[#6b6560]" : "border-[#d0ccc5] bg-[#f2f0ec] text-[#6b6560]"}`}>
                {route.notes}
              </div>
            </div>

            {/* Regulations loaded */}
            <div className="divide-y divide-[#d0ccc5]">
              <div className="px-8 py-5 bg-[#f2f0ec]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
                  Regulations loaded for this route
                </span>
              </div>
              {route.regulations.map((reg, i) => (
                <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-[#f2f0ec] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#1e1c1a]" />
                    <span className="text-sm text-[#1e1c1a] font-medium">{reg}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-[#b8c9a0]" />
                </div>
              ))}
              <div className="px-8 py-5 bg-[#f2f0ec] flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
                  Tokens consumed (this route)
                </span>
                <span className="font-mono font-bold text-[#1e1c1a] text-sm">~40,000 tk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section id="matrix" className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Full Comparison Matrix
            </span>
            <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
              All routes side by side.
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto overflow-x-auto">
          <table className="w-full border-b border-[#d0ccc5]">
            <thead>
              <tr className="border-b border-[#d0ccc5]">
                <th className="text-left px-8 py-4 text-[10px] font-mono uppercase tracking-widest text-[#9e9890] w-1/4">Criterion</th>
                {routes.map((r) => (
                  <th key={r.id} className="text-left px-8 py-4 text-[10px] font-mono uppercase tracking-widest text-[#9e9890] border-l border-[#d0ccc5]">
                    Route {r.id}
                    {r.status === "RECOMMENDED" && (
                      <span className="ml-2 text-[9px] bg-[#d4e8c2] text-[#1e1c1a] px-1.5 py-0.5 font-bold">★</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, i) => (
                <tr key={i} className="border-b border-[#d0ccc5] hover:bg-[#f2f0ec] transition-colors">
                  <td className="px-8 py-4 text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">{row.criterion}</td>
                  <td className="px-8 py-4 text-sm text-[#6b6560] border-l border-[#d0ccc5]">{row.a}</td>
                  <td className="px-8 py-4 text-sm text-[#6b6560] border-l border-[#d0ccc5]">{row.b}</td>
                  <td className="px-8 py-4 text-sm text-[#6b6560] border-l border-[#d0ccc5]">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Token breakdown per route */}
      <section id="tokens" className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Token Consumption Breakdown
            </span>
            <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
              ~120,000 tokens to evaluate all 3 routes.
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
          <div className="divide-y divide-[#d0ccc5] border-b border-[#d0ccc5]">
            <div className="grid grid-cols-4 px-8 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9e9890]">
              <span>Route</span>
              <span>Country</span>
              <span>Regulation loaded</span>
              <span>Tokens</span>
            </div>
            {regulationTokens.map((row, i) => (
              <div key={i} className="grid grid-cols-4 px-8 py-4 text-sm hover:bg-[#f2f0ec] transition-colors">
                <span className="font-bold text-[#1e1c1a] uppercase tracking-wide">{row.route}</span>
                <span className="text-[#6b6560]">{row.country}</span>
                <span className="text-[#6b6560]">{row.regulation}</span>
                <span className="font-mono font-bold text-[#1e1c1a]">{row.tokens}</span>
              </div>
            ))}
            <div className="grid grid-cols-4 px-8 py-4 bg-[#f2f0ec]">
              <span className="font-bold text-[#1e1c1a] uppercase tracking-wide col-span-3">Total (route decision layer)</span>
              <span className="font-mono font-bold text-[#1e1c1a]">~120,000 tk</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e1c1a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#f0ede8] mb-3">
              Get the optimal route for your next shipment.
            </h2>
            <p className="text-[#f0ede8]/50 font-mono text-sm uppercase tracking-widest">
              Compliance + cost ranked · All jurisdictions loaded · Output in seconds.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f0ede8] text-[#1e1c1a] font-mono uppercase tracking-widest text-sm hover:bg-white transition-colors group"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/documents"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#f0ede8]/20 text-[#f0ede8]/60 font-mono uppercase tracking-widest text-sm hover:border-[#f0ede8]/60 hover:text-[#f0ede8] transition-colors"
            >
              Document Generation →
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
