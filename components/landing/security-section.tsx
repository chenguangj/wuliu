"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Brain, Languages, AlertTriangle } from "lucide-react";

const techAdvantages = [
  {
    icon: Brain,
    title: "200K Context Window = Compliance Baseline",
    description:
      "Cross-validation must complete simultaneously within the context window. GPT-4o's 128K window truncates regulation content, causing compliance misses — an unacceptable legal risk.",
  },
  {
    icon: Shield,
    title: "Zero Hallucination = Client Trust Foundation",
    description:
      "Compliance scenarios cannot tolerate fabricated regulation clauses. Claude's stability under high load is the core selection criterion. Every cited regulation is traceable to source text.",
  },
  {
    icon: Languages,
    title: "Arabic Source Text Understanding",
    description:
      "MENA regulations are predominantly in Arabic. Claude's Arabic comprehension and generation quality leads the field, preventing translation errors that cause clearance failures.",
  },
  {
    icon: AlertTriangle,
    title: "Legal Reasoning, Not Database Lookup",
    description:
      "Traditional compliance tools query static databases. GGXT performs full legal-text reasoning — understanding regulatory intent, edge cases, and cross-jurisdictional conflicts in real time.",
  },
];

const certifications = [
  "OFAC Compliant",
  "UN Sanctions",
  "IMDG Certified",
  "ISO 27001",
  "SOC 2",
];

export function SecuritySection() {
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
    <section id="security" ref={sectionRef} className="relative bg-[#faf9f7]">
      <div className="border-y border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
            <div
              className={`p-10 lg:p-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-5">
                — Why Claude Is Irreplaceable
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#1e1c1a] tracking-tight mb-6">
                Three technical reasons
                <br />
                <span className="text-[#9e9890]">
                  no other model qualifies.
                </span>
              </h2>
              <p className="text-base text-[#6b6560] leading-relaxed mb-10">
                GGXT is built on Claude exclusively. The selection is not a
                preference — it is a technical requirement driven by compliance
                accuracy, context capacity, and Arabic language fidelity.
              </p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span
                    key={cert}
                    className={`px-3 py-1.5 border border-[#d0ccc5] text-[11px] font-mono uppercase tracking-widest text-[#6b6560] bg-[#f2f0ec] hover:bg-[#e8e5df] transition-colors cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                    style={{
                      transitionDelay: `${index * 50 + 200}ms`,
                      transition: "all 0.5s",
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {techAdvantages.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-5 p-7 border-b last:border-b-0 border-[#d0ccc5] hover:bg-[#f2f0ec] transition-all duration-500 group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec] group-hover:bg-[#1e1c1a] group-hover:border-[#1e1c1a] transition-colors duration-200">
                    <feature.icon className="w-4 h-4 text-[#6b6560] group-hover:text-[#f0ede8] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1e1c1a] mb-1 uppercase tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#9e9890] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
