"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For freight forwarders getting started",
    price: { monthly: 2980, annual: 2480 },
    features: [
      "Up to 20 shipments / month",
      "UAE + 5 countries coverage",
      "Standard compliance review",
      "English documents only",
      "Email support",
      "API access (basic)",
    ],
    cta: "Start trial",
    highlight: false,
  },
  {
    name: "Professional",
    description: "For active freight operations",
    price: { monthly: 9800, annual: 8200 },
    features: [
      "Up to 100 shipments / month",
      "UAE + 23 countries full coverage",
      "Full legal reasoning review",
      "Arabic + English bilingual docs",
      "Nightly regulation patrol",
      "Webhook regulation alerts",
      "Priority support",
      "Full API access",
    ],
    cta: "Start trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "For platforms and large operations",
    price: { monthly: null, annual: null },
    features: [
      "Unlimited shipments",
      "Custom country coverage",
      "White-label compliance reports",
      "TMS / ERP integration",
      "Dedicated compliance team",
      "SLA guarantee",
      "Custom regulation monitoring",
      "Volume token pricing",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative bg-[#faf9f7]">
      <div className="border-y border-[#d0ccc5] bg-[#f2f0ec]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-3">
              — Pricing
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#1e1c1a] tracking-tight">
              Priced per shipment.
              <br />
              <span className="text-[#9e9890]">Scaled for your volume.</span>
            </h2>
          </div>
          <div className="flex items-center gap-0 border border-[#d0ccc5] self-start lg:self-end bg-[#faf9f7]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 text-[11px] font-mono uppercase tracking-widest transition-colors duration-150 ${!isAnnual ? "bg-[#1e1c1a] text-[#f0ede8]" : "text-[#9e9890] hover:text-[#6b6560]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 text-[11px] font-mono uppercase tracking-widest transition-colors duration-150 flex items-center gap-2 ${isAnnual ? "bg-[#1e1c1a] text-[#f0ede8]" : "text-[#9e9890] hover:text-[#6b6560]"}`}
            >
              Annual
              {isAnnual && (
                <span className="text-[9px] bg-[#d4e8c2] text-[#1e1c1a] px-1.5 py-0.5 font-bold">
                  −17%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d0ccc5]">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`flex flex-col ${plan.highlight ? "bg-[#f2f0ec]" : "bg-[#faf9f7]"}`}
            >
              <div className="p-8 border-b border-[#d0ccc5]">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {plan.highlight && (
                    <span className="bg-[#d4e8c2] text-[#1e1c1a] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                      Recommended
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1e1c1a] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#9e9890] font-mono">
                  {plan.description}
                </p>
              </div>

              <div className="p-8 border-b border-[#d0ccc5]">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-bold text-[#1e1c1a]">
                      $
                      {(isAnnual
                        ? plan.price.annual
                        : plan.price.monthly
                      )?.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#9e9890] font-mono">
                      /month
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-display font-bold text-[#1e1c1a]">
                    Custom
                  </span>
                )}
              </div>

              <div className="flex-1 p-8">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 bg-[#d4e8c2] border border-[#b8c9a0]">
                        <Check className="w-2.5 h-2.5 text-[#1e1c1a]" />
                      </div>
                      <span className="text-sm text-[#6b6560]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 border-t border-[#d0ccc5]">
                <a
                  href="#"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 text-[11px] font-mono uppercase tracking-widest border transition-colors duration-150 ${plan.highlight ? "bg-[#1e1c1a] text-[#f0ede8] border-[#1e1c1a] hover:bg-[#3a3835]" : "border-[#d0ccc5] text-[#6b6560] hover:border-[#1e1c1a] hover:text-[#1e1c1a]"}`}
                >
                  {plan.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Token cost breakdown table */}
      <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] px-6 lg:px-12 py-3.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
            Token cost breakdown (at $4 / 1M tokens)
          </span>
        </div>
        <div className="divide-y divide-[#d0ccc5]">
          <div className="grid grid-cols-4 px-6 lg:px-12 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9e9890]">
            <span>Layer</span>
            <span>Monthly volume</span>
            <span>Token count</span>
            <span>Est. cost</span>
          </div>
          {[
            {
              tier: "Real-time (60 ships/day)",
              monthly: "~60 shipments/day",
              tokens: "252M tokens/mo",
              price: "~$3,024/mo",
            },
            {
              tier: "Nightly patrol (fixed)",
              monthly: "24 authorities",
              tokens: "612M tokens/mo",
              price: "~$73,440/mo",
            },
            {
              tier: "Total platform",
              monthly: "Combined",
              tokens: "864M tokens/mo",
              price: "~$76,464/mo",
            },
          ].map((row) => (
            <div
              key={row.tier}
              className="grid grid-cols-4 px-6 lg:px-12 py-4 text-sm hover:bg-[#f2f0ec] transition-colors duration-150"
            >
              <span className="font-bold text-[#1e1c1a] text-xs uppercase tracking-wide">
                {row.tier}
              </span>
              <span className="text-[#6b6560]">{row.monthly}</span>
              <span className="font-mono text-[#6b6560]">{row.tokens}</span>
              <span className="font-mono font-bold text-[#1e1c1a]">
                {row.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
