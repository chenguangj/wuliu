"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Document Upload & Context Injection",
    badge: "~190,000 tokens",
    description:
      "Customer uploads 4 documents: Commercial Invoice (wrong HS code 2707.10), Packing List (UN1294, IMDG Class 3), MSDS safety sheet, and Bill of Lading draft. System loads all relevant regulations as reasoning context.",
    code: `// Context injection ~190,000 tokens
ggxt.loadContext({
  documents: [
    "commercial_invoice.pdf",  // HS: 2707.10 ← ERROR
    "packing_list.pdf",        // UN1294, Class 3
    "msds_toluene.pdf",
    "bl_draft.pdf"             // Missing DG declaration
  ],
  regulations: [
    "IMDG_dangerous_goods",
    "saudi_customs_code",
    "hs_code_library",
    "ofac_un_sanctions",
    "jebel_ali_port_ops"
  ]
})`,
  },
  {
    number: "II",
    title: "Risk Issue Detection",
    badge: "Blocking issues flagged",
    description:
      "Issue 1 (Blocking): HS code 2707.10 (benzene) is wrong — correct is 2902.30.00 (toluene-dominant mixture). Detention probability >95%, potential 20% cargo value fine. Issue 2 (Blocking): DG declaration missing — IMO declaration, shipper statement, certificate required. Issue 3 (Confirm): Saudi import permit unconfirmed — 7–14 day lead time.",
    code: `// Risk analysis results
{
  issues: [
    {
      severity: "BLOCKING",
      type: "HS_CODE_ERROR",
      found: "2707.10",      // Benzene
      correct: "2902.30.00", // Toluene mixture
      risk: "Detention >95%, fine 20% cargo value"
    },
    {
      severity: "BLOCKING",
      type: "MISSING_DG_DOCS",
      required: ["IMO declaration",
        "shipper statement", "certificate"]
    },
    {
      severity: "CONFIRM",
      type: "IMPORT_PERMIT",
      note: "Saudi industrial solvent permit, 7-14d"
    }
  ],
  sanctions_check: "PASSED" // OFAC/UN/Saudi lists clear
}`,
  },
  {
    number: "III",
    title: "Route Decision + Bilingual Docs",
    badge: "~200,000 tokens",
    description:
      "Route A (Recommended): Direct Jebel Ali→Dammam, 28h, viable after document completion. Route B (Transit Oman): DG warehouse certification required, +$800 cost, not recommended. Route C (Air): Special DG approval 3 weeks, excluded. Auto-generates 5 bilingual documents.",
    code: `// Route compliance + doc generation
{
  recommended_route: {
    id: "A",
    path: "Jebel Ali → Dammam",
    transit_hours: 28,
    status: "VIABLE_AFTER_DOCS",
    required: ["IMO declaration", "MOIAT permit"]
  },
  generated_documents: [
    "invoice_corrected_hs_AR_EN.pdf",
    "imo_declaration_template.pdf",
    "shipper_statement_template.pdf",
    "issue_notice_to_client.pdf",
    "import_permit_guide.pdf"
  ],
  tokens_consumed: 420000,
  risk_avoided_usd: 74000
}`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-[#f2f0ec]"
    >
      <div className="border-y border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-3">
              — Live Case Study: Hazmat Export to Saudi Arabia
            </span>
            <h2
              className={`text-4xl lg:text-5xl font-display font-bold text-[#1e1c1a] tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              Toluene + Ethyl Acetate
              <br />
              <span className="text-[#9e9890]">Dubai → Riyadh · $62,000</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-10 h-10 border font-mono text-sm transition-all duration-200 ${activeStep === i ? "bg-[#1e1c1a] text-[#f0ede8] border-[#1e1c1a]" : "border-[#d0ccc5] text-[#9e9890] hover:border-[#1e1c1a] hover:text-[#1e1c1a]"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
          {/* Left: each step fixed height so total never changes regardless of active step */}
          <div>
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left border-b border-[#d0ccc5] transition-all duration-200 group ${activeStep === index ? "bg-[#faf9f7]" : "hover:bg-[#faf9f7]/60"}`}
              >
                <div className="flex items-stretch" style={{ height: "233px" }}>
                  <div
                    className={`w-16 flex items-center justify-center text-3xl font-display font-bold border-r border-[#d0ccc5] shrink-0 transition-colors ${activeStep === index ? "text-[#1e1c1a]" : "text-[#d0ccc5]"}`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 p-7 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3
                        className={`text-lg font-bold transition-colors ${activeStep === index ? "text-[#1e1c1a]" : "text-[#6b6560]"}`}
                      >
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#e8e5df] text-[#6b6560]">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[#9e9890] leading-relaxed line-clamp-5">
                      {step.description}
                    </p>
                    {activeStep === index && (
                      <div className="mt-3 h-0.5 bg-[#e8e5df] overflow-hidden">
                        <div
                          className="h-full bg-[#1e1c1a]"
                          style={{ animation: "progress 6s linear forwards" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: fixed height — tall enough for longest code block (Step II, 22 lines) */}
          <div
            className="bg-[#1e1c1a] flex flex-col"
            style={{ height: "750px" }}
          >
            <div className="px-6 py-3.5 border-b border-[#f0ede8]/10 flex items-center justify-between shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f0ede8]/15" />
                <div className="w-3 h-3 rounded-full bg-[#f0ede8]/15" />
                <div className="w-3 h-3 rounded-full bg-[#b8c9a0]/60" />
              </div>
              <span className="text-[11px] font-mono text-[#f0ede8]/30 uppercase tracking-widest">
                ggxt-compliance.ts
              </span>
            </div>
            <div className="flex-1 p-8 font-mono text-sm">
              <pre
                key={activeStep}
                className="text-[#f0ede8]/70 text-xs leading-relaxed"
                style={{
                  opacity: 0,
                  animation: "fadeInCode 0.35s ease forwards",
                }}
              >
                {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                  <div key={lineIndex} className="leading-loose">
                    <span className="text-[#f0ede8]/20 select-none w-8 inline-block">
                      {lineIndex + 1}
                    </span>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
            <div className="px-6 py-3.5 border-t border-[#f0ede8]/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
                <span className="text-[11px] font-mono text-[#f0ede8]/30 uppercase tracking-widest">
                  Processing
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#f0ede8]/30 uppercase tracking-widest">
                ~420,000 tokens total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="border-t border-[#d0ccc5] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#d0ccc5]">
          {[
            { v: "420K", l: "Tokens consumed" },
            { v: "3", l: "Issues detected" },
            { v: "5", l: "Documents generated" },
            { v: "$74K", l: "Risk avoided" },
          ].map((s) => (
            <div
              key={s.l}
              className="px-8 py-5 hover:bg-[#faf9f7] transition-colors"
            >
              <div className="text-2xl font-display font-bold text-[#1e1c1a]">
                {s.v}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#9e9890] mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fadeInCode {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
