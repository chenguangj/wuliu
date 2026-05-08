"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FileSearch, AlertTriangle, CheckCircle, Clock, ArrowRight, Shield } from "lucide-react";

const issues = [
  {
    severity: "BLOCKING",
    code: "HS_CODE_MISMATCH",
    title: "HS Code Error Detected",
    found: "2707.10 (Benzene)",
    corrected: "2902.30.00 (Toluene mixture)",
    risk: "Detention probability >95%, fine up to 20% cargo value",
    country: "Saudi Arabia",
  },
  {
    severity: "BLOCKING",
    code: "MISSING_DG_DECLARATION",
    title: "Dangerous Goods Declaration Missing",
    found: "No IMO declaration attached",
    corrected: "IMO declaration + shipper statement + certificate required",
    risk: "Port entry refused at Dammam",
    country: "Saudi Arabia",
  },
  {
    severity: "WARNING",
    code: "IMPORT_PERMIT_UNCONFIRMED",
    title: "Import Permit Status Unconfirmed",
    found: "Saudi industrial solvent permit not attached",
    corrected: "MOIAT permit required — 7–14 day lead time",
    risk: "Clearance delay if permit not pre-obtained",
    country: "Saudi Arabia",
  },
  {
    severity: "PASS",
    code: "SANCTIONS_CLEAR",
    title: "Sanctions Screening Passed",
    found: "Counterparty checked against OFAC, UN, Saudi lists",
    corrected: "No matches found",
    risk: "Clear",
    country: "All jurisdictions",
  },
];

const checkSteps = [
  { label: "Document parsing & OCR extraction", tokens: "~8,000 tk", done: true },
  { label: "HS code classification & cross-reference", tokens: "~45,000 tk", done: true },
  { label: "OFAC / UN / bilateral sanctions screening", tokens: "~30,000 tk", done: true },
  { label: "Destination country import regulation check", tokens: "~62,000 tk", done: true },
  { label: "Dangerous goods IMDG compliance", tokens: "~35,000 tk", done: true },
  { label: "Import permit & license verification", tokens: "~20,000 tk", done: false },
];

const regulationSources = [
  { country: "UAE", authority: "Federal Customs Authority", lastSync: "2026-05-07 02:14 GST", status: "current" },
  { country: "Saudi Arabia", authority: "ZATCA / GAZT", lastSync: "2026-05-07 02:31 GST", status: "current" },
  { country: "Egypt", authority: "Egyptian Customs Authority", lastSync: "2026-05-07 03:05 GST", status: "current" },
  { country: "Qatar", authority: "General Authority of Customs", lastSync: "2026-05-07 02:58 GST", status: "current" },
  { country: "Kuwait", authority: "Kuwait Ports Authority", lastSync: "2026-05-07 03:12 GST", status: "current" },
  { country: "Oman", authority: "Royal Oman Police — Customs", lastSync: "2026-05-07 02:47 GST", status: "updated" },
];

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    BLOCKING: "bg-[#1e1c1a] text-[#f0ede8]",
    WARNING: "bg-[#e8e5df] text-[#6b6560]",
    PASS: "bg-[#d4e8c2] text-[#1e1c1a]",
  };
  return (
    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 ${map[severity] ?? "bg-[#e8e5df] text-[#6b6560]"}`}>
      {severity}
    </span>
  );
}

export default function CompliancePage() {
  const [activeIssue, setActiveIssue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#faf9f7]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[6.75rem] border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div
            className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
              <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
                Module 01
              </span>
              <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                Cross-Compliance Review
              </span>
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                className={`text-[clamp(2.4rem,6vw,5.5rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Multi-document
                <br />
                <span className="text-[#9e9890]">legal reasoning.</span>
              </h1>
              <p
                className={`text-lg text-[#6b6560] leading-relaxed max-w-lg pl-5 border-l-2 border-[#d0ccc5] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                Upload your commercial invoice, packing list, MSDS, and bill of lading.
                GGXT injects the full regulation text for all destination countries into
                a single 200K context window and reasons across every document simultaneously —
                catching HS code errors, sanctions exposure, and missing permits before
                your cargo reaches the port.
              </p>
            </div>
            <div
              className={`grid grid-cols-2 gap-px bg-[#d0ccc5] border border-[#d0ccc5] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              {[
                { v: "~180K", l: "Tokens per review", s: "Cross-compliance layer" },
                { v: "<4s", l: "Processing time", s: "Full legal reasoning" },
                { v: "24", l: "Jurisdictions", s: "Simultaneous check" },
                { v: "0", l: "Database lookups", s: "Pure text reasoning" },
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

      {/* Live check walkthrough */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
                — Live Review Walkthrough
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
                Toluene export · Dubai → Riyadh · $62,000
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] border border-[#d0ccc5] px-4 py-2.5 bg-[#faf9f7] uppercase tracking-widest text-[#6b6560]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
              Processing
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
            {/* Check steps */}
            <div className="divide-y divide-[#d0ccc5]">
              {checkSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-5 px-8 py-5 hover:bg-[#f2f0ec] transition-colors">
                  <div className={`w-5 h-5 flex items-center justify-center shrink-0 border ${step.done ? "bg-[#d4e8c2] border-[#b8c9a0]" : "border-[#d0ccc5] bg-[#f2f0ec]"}`}>
                    {step.done && <CheckCircle className="w-3 h-3 text-[#1e1c1a]" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${step.done ? "text-[#1e1c1a] font-medium" : "text-[#9e9890]"}`}>
                      {step.label}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest shrink-0">
                    {step.tokens}
                  </span>
                </div>
              ))}
              <div className="px-8 py-5 bg-[#f2f0ec] flex items-center justify-between">
                <span className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">Total consumed</span>
                <span className="font-mono font-bold text-[#1e1c1a]">~180,000 tokens</span>
              </div>
            </div>

            {/* Issues panel */}
            <div className="divide-y divide-[#d0ccc5]">
              {issues.map((issue, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIssue(i)}
                  className={`w-full text-left px-8 py-6 transition-colors ${activeIssue === i ? "bg-[#f2f0ec]" : "hover:bg-[#f2f0ec]/60"}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">{issue.title}</span>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  {activeIssue === i && (
                    <div className="mt-3 space-y-2 text-sm text-[#6b6560]">
                      <div className="flex gap-2">
                        <span className="font-mono text-[#9e9890] uppercase tracking-widest text-[11px] w-20 shrink-0 pt-0.5">Found</span>
                        <span>{issue.found}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-mono text-[#9e9890] uppercase tracking-widest text-[11px] w-20 shrink-0 pt-0.5">Action</span>
                        <span>{issue.corrected}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-mono text-[#9e9890] uppercase tracking-widest text-[11px] w-20 shrink-0 pt-0.5">Risk</span>
                        <span className={issue.severity === "BLOCKING" ? "text-[#1e1c1a] font-medium" : ""}>{issue.risk}</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulation source status */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Regulation Source Status
            </span>
            <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
              Nightly patrol — last run 02:14 GST
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d0ccc5] border-b border-[#d0ccc5]">
            {regulationSources.map((src, i) => (
              <div key={i} className="px-8 py-6 hover:bg-[#f2f0ec] transition-colors border-b md:border-b-0 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">{src.country}</span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 ${src.status === "updated" ? "bg-[#d4e8c2] text-[#1e1c1a]" : "bg-[#e8e5df] text-[#6b6560]"}`}>
                    {src.status === "updated" ? "Updated" : "Current"}
                  </span>
                </div>
                <div className="text-sm text-[#6b6560] mb-1">{src.authority}</div>
                <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest">
                  Synced {src.lastSync}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Why Long Context Matters
            </span>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
              Cross-compliance cannot be split.
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d0ccc5] border-b border-[#d0ccc5]">
            {[
              {
                icon: FileSearch,
                title: "All documents in one window",
                body: "Commercial invoice, packing list, MSDS, and bill of lading are loaded simultaneously. Cross-document inconsistencies — like a cargo description that contradicts the HS code — are caught because the model sees everything at once.",
              },
              {
                icon: Shield,
                title: "Full regulation text, not summaries",
                body: "GGXT injects the complete legal text of applicable customs codes, not a summarized database entry. This allows the model to reason about edge cases, exceptions, and cross-jurisdictional conflicts that a lookup table would miss.",
              },
              {
                icon: AlertTriangle,
                title: "Blocking issues surface first",
                body: "Issues are ranked by severity. Blocking issues — those that will cause detention, refusal, or fines — are surfaced immediately with specific corrective actions, so your team knows exactly what to fix before booking.",
              },
            ].map((item, i) => (
              <div key={i} className="p-10 hover:bg-[#f2f0ec] transition-colors group">
                <div className="w-10 h-10 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec] mb-6 group-hover:bg-[#1e1c1a] group-hover:border-[#1e1c1a] transition-colors">
                  <item.icon className="w-4 h-4 text-[#6b6560] group-hover:text-[#f0ede8] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-[#1e1c1a] uppercase tracking-wide mb-3">{item.title}</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e1c1a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#f0ede8] mb-3">
              Ready to run your first compliance check?
            </h2>
            <p className="text-[#f0ede8]/50 font-mono text-sm uppercase tracking-widest">
              Upload your documents — results in under 4 seconds.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f0ede8] text-[#1e1c1a] font-mono uppercase tracking-widest text-sm hover:bg-white transition-colors group"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/routing"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#f0ede8]/20 text-[#f0ede8]/60 font-mono uppercase tracking-widest text-sm hover:border-[#f0ede8]/60 hover:text-[#f0ede8] transition-colors"
            >
              Route Decision →
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
