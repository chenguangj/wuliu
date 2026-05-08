"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const COMPLIANCE_STEPS = [
  "Uploading shipment documents...",
  "Injecting MENA regulation context...",
  "Cross-referencing HS codes...",
  "Checking OFAC / UN sanctions...",
  "Evaluating 3 route options...",
  "Generating Arabic bilingual docs...",
  "✓ Compliance review complete — $74K risk avoided",
];

function ComplianceVisual() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const show = () => {
      setVisibleLines([]);
      COMPLIANCE_STEPS.forEach((_, i) => {
        setTimeout(() => setVisibleLines((prev) => [...prev, i]), i * 700);
      });
    };
    show();
    const id = setInterval(show, COMPLIANCE_STEPS.length * 700 + 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-[#d0ccc5] bg-[#faf9f7] font-mono text-sm w-full">
      <div className="border-b border-[#d0ccc5] px-5 py-3 flex items-center justify-between bg-[#f2f0ec]">
        <span className="text-[11px] uppercase tracking-widest text-[#9e9890]">
          ggxt — compliance engine
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
      </div>
      <div className="p-6 space-y-3">
        {COMPLIANCE_STEPS.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${visibleLines.includes(i) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === COMPLIANCE_STEPS.length - 1 ? "bg-[#b8c9a0]" : "bg-[#d0ccc5]"}`}
            />
            <span
              className={
                i === COMPLIANCE_STEPS.length - 1
                  ? "text-[#1e1c1a] font-bold"
                  : "text-[#9e9890]"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f2f0ec] border-y border-[#d0ccc5]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
          <div
            className={`p-10 lg:p-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="flex gap-2 mb-10">
              <div className="w-6 h-6 bg-[#1e1c1a]" />
              <div className="w-6 h-6 border border-[#d0ccc5]" />
              <div className="w-6 h-6 border border-[#d0ccc5]" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-8 leading-[0.92] text-[#1e1c1a]">
              Stop losing shipments
              <br />
              to compliance gaps.
            </h2>
            <p className="text-lg text-[#6b6560] mb-10 leading-relaxed max-w-lg pl-5 border-l-2 border-[#d0ccc5]">
              Every detained shipment costs more than a month of GGXT. Request a
              demo with your own cargo data — we'll run a live compliance check
              and show you exactly what we find.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1e1c1a] text-[#f0ede8] font-mono uppercase tracking-widest text-sm hover:bg-[#3a3835] transition-colors duration-150 group"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono uppercase tracking-widest text-sm border border-[#d0ccc5] text-[#6b6560] hover:border-[#1e1c1a] hover:text-[#1e1c1a] transition-colors duration-150"
              >
                View Pricing
              </a>
            </div>

            <p className="mt-5 text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
              Al Rigga, Dubai · UAE + 23 countries · business@ggxtonline.com
            </p>
          </div>

          <div
            className={`p-10 lg:p-16 flex items-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <ComplianceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
