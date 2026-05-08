"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Submit",
    code: `import { GGXT } from '@ggxt/sdk'

const client = new GGXT({
  apiKey: process.env.GGXT_API_KEY
})

// Submit shipment for compliance review
const result = await client.compliance.check({
  origin: "Jebel Ali, UAE",
  destination: "Dammam, Saudi Arabia",
  cargo: {
    description: "Toluene + Ethyl Acetate mixture",
    hsCode: "2707.10",       // Will be auto-corrected
    value_usd: 62000,
    un_number: "UN1294",
    imdg_class: "3"
  },
  documents: [invoicePdf, packingListPdf, msdsPdf]
})`,
  },
  {
    label: "Result",
    code: `// Compliance review result
{
  status: "ISSUES_FOUND",
  tokens_consumed: 420000,
  processing_ms: 4200,
  issues: [
    {
      severity: "BLOCKING",
      code: "HS_CODE_MISMATCH",
      found: "2707.10",
      corrected: "2902.30.00",
      risk: "Detention >95%"
    },
    {
      severity: "BLOCKING",
      code: "MISSING_DG_DECLARATION"
    }
  ],
  recommended_route: "Jebel Ali → Dammam (direct)",
  documents_generated: 5,
  risk_avoided_usd: 74000
}`,
  },
  {
    label: "Webhook",
    code: `// Receive real-time compliance updates
ggxt.webhooks.on('regulation.updated', (event) => {
  console.log('Regulation changed:', event.country)
  console.log('Affected HS codes:', event.hs_codes)
  console.log('Effective date:', event.effective_date)
  
  // Auto-recheck pending shipments
  await ggxt.compliance.recheckPending({
    affected_countries: [event.country]
  })
})

// Nightly patrol summary
ggxt.webhooks.on('patrol.complete', (summary) => {
  console.log('Diffs found:', summary.changes_count)
  console.log('Rule library updated:', summary.updated_at)
})`,
  },
];

const features = [
  {
    title: "200K context window",
    description: "Full regulation text in every request.",
  },
  {
    title: "Arabic + English output",
    description: "Bilingual documents auto-generated.",
  },
  {
    title: "Webhook regulation alerts",
    description: "Real-time rule library change notifications.",
  },
  {
    title: "Batch processing",
    description: "Submit multiple shipments simultaneously.",
  },
];

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <>
      <section
        id="developers"
        ref={sectionRef}
        className="relative bg-[#f2f0ec]"
      >
        <div className="border-y border-[#d0ccc5]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-3">
              — API Integration
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2
                className={`text-3xl lg:text-4xl font-display font-bold text-[#1e1c1a] tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                Embed compliance into
                <br />
                <span className="text-[#9e9890]">your freight platform.</span>
              </h2>
              <div className="grid grid-cols-2 gap-px bg-[#d0ccc5] border border-[#d0ccc5] max-w-xs">
                {features.map((f) => (
                  <div key={f.title} className="p-4 bg-[#faf9f7]">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-[#1e1c1a] mb-1">
                      {f.title}
                    </div>
                    <div className="text-[11px] text-[#9e9890]">
                      {f.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center border-b border-[#d0ccc5]">
              {codeExamples.map((example, idx) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-7 py-4 text-[11px] font-mono uppercase tracking-widest border-r border-[#d0ccc5] transition-colors duration-150 ${activeTab === idx ? "bg-[#1e1c1a] text-[#f0ede8]" : "text-[#6b6560] hover:bg-[#e8e5df]"}`}
                >
                  {example.label}
                </button>
              ))}
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleCopy}
                className="px-5 py-4 border-l border-[#d0ccc5] text-[#9e9890] hover:text-[#1e1c1a] hover:bg-[#e8e5df] transition-colors duration-150"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
              {/* Fixed height = longest tab (Result, 22 lines × ~22px/line + padding) */}
              <div
                className="bg-[#1e1c1a] p-10 font-mono text-sm"
                style={{ height: "560px" }}
              >
                <pre
                  key={activeTab}
                  className="text-[#f0ede8]/75 text-xs"
                  style={{
                    opacity: 0,
                    animation: "fadeInCode 0.35s ease forwards",
                  }}
                >
                  {codeExamples[activeTab].code
                    .split("\n")
                    .map((line, lineIndex) => (
                      <div key={lineIndex} className="leading-loose">
                        <span className="text-[#f0ede8]/20 select-none w-8 inline-block">
                          {lineIndex + 1}
                        </span>
                        {line}
                      </div>
                    ))}
                </pre>
              </div>

              <div
                className="p-10 bg-[#faf9f7] flex flex-col justify-between gap-8"
                style={{ height: "560px", overflow: "hidden" }}
              >
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-4">
                    Resources
                  </div>
                  <div className="border border-[#d0ccc5]">
                    {[
                      { label: "API Documentation", arrow: "→", href: "/compliance" },
                      { label: "HS Code Reference", arrow: "→", href: "/routing" },
                      { label: "MENA Regulation Index", arrow: "↗", href: "/coverage" },
                      { label: "Request Demo Access", arrow: "→", href: "/contact" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0 border-[#d0ccc5] hover:bg-[#f2f0ec] transition-colors duration-150 group"
                      >
                        <span className="text-sm font-mono text-[#6b6560] group-hover:text-[#1e1c1a] uppercase tracking-widest">
                          {link.label}
                        </span>
                        <span className="text-[#9e9890] group-hover:text-[#1e1c1a]">
                          {link.arrow}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="border border-[#d0ccc5] p-5 bg-[#f2f0ec]">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                    Average response time
                  </div>
                  <div className="text-4xl font-display font-bold text-[#1e1c1a]">
                    ~4.2s
                  </div>
                  <div className="text-[11px] font-mono text-[#9e9890] mt-1">
                    per shipment · 420K tokens · full reasoning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
      @keyframes fadeInCode {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    </>
  );
}
