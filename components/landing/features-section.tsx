"use client";

import { useEffect, useRef, useState } from "react";
import { FileSearch, Route, Languages, Moon } from "lucide-react";

const features = [
  {
    number: "01",
    icon: FileSearch,
    title: "Multi-Document Cross-Compliance",
    tokens: "~180,000 tk",
    description:
      "Cross-border compliance cannot rely on a single document. Commercial invoices, HS codes, cargo value, destination tariffs, OFAC/UN sanctions lists — all must be jointly reasoned within the same context window simultaneously. Cannot be split.",
    bg: "#faf9f7",
  },
  {
    number: "02",
    icon: Route,
    title: "Dynamic Route Compliance Decision",
    tokens: "~120,000 tk",
    description:
      "A single shipment typically has 3–5 route options (direct / transit). Each route is subject to different jurisdictions and transit rules. The system loads all route regulations simultaneously, weighs trade-offs, and outputs the optimal compliant route — not a simple table lookup.",
    bg: "#f2f0ec",
  },
  {
    number: "03",
    icon: Languages,
    title: "Arabic Bilingual Document Generation",
    tokens: "~80,000 tk",
    description:
      "MENA customs require original Arabic documents. The system generates Arabic/English bilingual invoices, packing lists, and import declarations, with terminology validation to prevent translation errors that cause clearance failures.",
    bg: "#faf9f7",
  },
  {
    number: "04",
    icon: Moon,
    title: "Nightly Regulation Diff Patrol",
    tokens: "~1.2B tk/day (fixed)",
    description:
      "24 customs authorities update regulations weekly. The system crawls original texts nightly, compares diffs, and auto-updates the rule library. This load is independent of daily shipment volume — it is the platform's core moat. Rule library quality directly determines compliance accuracy.",
    bg: "#f2f0ec",
  },
];

function FeatureVisual({ index }: { index: number }) {
  const visuals = [
    // Cross-compliance: overlapping document layers
    <svg key="cross" viewBox="0 0 160 120" className="w-full h-full">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={10 + i * 18}
          y={10 + i * 14}
          width="110"
          height="75"
          rx="2"
          fill="none"
          stroke="#1e1c1a"
          strokeWidth="1.5"
          opacity={0.1 + i * 0.08}
        >
          <animate
            attributeName="opacity"
            values={`${0.1 + i * 0.08};${0.25 + i * 0.08};${0.1 + i * 0.08}`}
            dur="3s"
            begin={`${i * 0.6}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`l${i}`}
          x="28"
          y={28 + i * 14}
          width={60 + (i % 2) * 20}
          height="6"
          rx="1"
          fill="#1e1c1a"
          opacity="0.12"
        >
          <animate
            attributeName="opacity"
            values="0.12;0.3;0.12"
            dur="2.5s"
            begin={`${i * 0.3}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>,
    // Route decision: branching paths
    <svg key="route" viewBox="0 0 160 120" className="w-full h-full">
      <circle cx="20" cy="60" r="6" fill="#1e1c1a" opacity="0.3" />
      <circle cx="140" cy="60" r="6" fill="#1e1c1a" opacity="0.3" />
      {[
        [60, 20],
        [60, 60],
        [60, 100],
      ].map(([x, y], i) => (
        <g key={i}>
          <line
            x1="26"
            y1="60"
            x2={x}
            y2={y}
            stroke="#1e1c1a"
            strokeWidth="1.5"
            opacity="0.15"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.4;0.15"
              dur="2.5s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
          <circle
            cx={x}
            cy={y}
            r="5"
            fill="none"
            stroke="#1e1c1a"
            strokeWidth="1.5"
            opacity={i === 1 ? 0.5 : 0.2}
          >
            <animate
              attributeName="opacity"
              values={`${i === 1 ? 0.5 : 0.2};${i === 1 ? 0.9 : 0.4};${i === 1 ? 0.5 : 0.2}`}
              dur="2.5s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
          <line
            x1={x + 5}
            y1={y}
            x2="134"
            y2="60"
            stroke="#1e1c1a"
            strokeWidth={i === 1 ? 2 : 1}
            opacity={i === 1 ? 0.4 : 0.1}
          >
            <animate
              attributeName="opacity"
              values={`${i === 1 ? 0.4 : 0.1};${i === 1 ? 0.7 : 0.2};${i === 1 ? 0.4 : 0.1}`}
              dur="2.5s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}
    </svg>,
    // Bilingual: two text columns
    <svg key="bilingual" viewBox="0 0 160 120" className="w-full h-full">
      <line
        x1="80"
        y1="0"
        x2="80"
        y2="120"
        stroke="#1e1c1a"
        strokeWidth="1"
        opacity="0.1"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="5"
            y={10 + i * 20}
            width={55 - (i % 3) * 10}
            height="8"
            rx="1"
            fill="#1e1c1a"
            opacity="0.1"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.25;0.1"
              dur="3s"
              begin={`${i * 0.25}s`}
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="88"
            y={10 + i * 20}
            width={55 - (i % 2) * 12}
            height="8"
            rx="1"
            fill="#1e1c1a"
            opacity="0.1"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.25;0.1"
              dur="3s"
              begin={`${i * 0.25 + 0.1}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      <text
        x="8"
        y="115"
        fontSize="9"
        fontFamily="monospace"
        fill="#1e1c1a"
        opacity="0.3"
      >
        EN
      </text>
      <text
        x="90"
        y="115"
        fontSize="9"
        fontFamily="monospace"
        fill="#1e1c1a"
        opacity="0.3"
      >
        عربي
      </text>
    </svg>,
    // Nightly patrol: clock + diff lines
    <svg key="night" viewBox="0 0 160 120" className="w-full h-full">
      <circle
        cx="80"
        cy="55"
        r="35"
        fill="none"
        stroke="#1e1c1a"
        strokeWidth="1.5"
        opacity="0.15"
      />
      <line
        x1="80"
        y1="55"
        x2="80"
        y2="28"
        stroke="#1e1c1a"
        strokeWidth="2"
        opacity="0.3"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 80 55"
          to="360 80 55"
          dur="6s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="80"
        y1="55"
        x2="100"
        y2="55"
        stroke="#1e1c1a"
        strokeWidth="1.5"
        opacity="0.25"
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="5"
          y={95 + i * 8}
          width={30 + i * 15}
          height="4"
          rx="1"
          fill="#1e1c1a"
          opacity="0.12"
        >
          <animate
            attributeName="opacity"
            values="0.12;0.35;0.12"
            dur="2s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>,
  ];
  return visuals[index] || visuals[0];
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`border-b border-[#d0ccc5] transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : isEven ? "opacity-0 -translate-x-10" : "opacity-0 translate-x-10"}`}
      style={{
        backgroundColor: feature.bg,
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div className="grid lg:grid-cols-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-1 flex items-center justify-center py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#d0ccc5]">
          <span className="text-4xl font-display font-bold text-[#d0ccc5]">
            {feature.number}
          </span>
        </div>
        <div className="lg:col-span-7 px-8 lg:px-12 py-10 lg:border-r border-[#d0ccc5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec]">
              <feature.icon className="w-4 h-4 text-[#6b6560]" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
              {feature.title}
            </h3>
          </div>
          <div className="mb-4">
            <span className="inline-block px-2.5 py-1 bg-[#1e1c1a] text-[#f0ede8] text-[11px] font-mono uppercase tracking-widest">
              {feature.tokens}
            </span>
          </div>
          <p className="text-base text-[#6b6560] leading-relaxed">
            {feature.description}
          </p>
        </div>
        <div className="lg:col-span-4 flex items-center justify-center p-10 bg-[#f2f0ec] min-h-[160px]">
          <div className="w-40 h-28 text-[#1e1c1a]">
            <FeatureVisual index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
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

  return (
    <section id="features" ref={sectionRef} className="relative bg-[#faf9f7]">
      <div className="border-y border-[#d0ccc5] bg-[#f2f0ec]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-3">
              — Why 420K Tokens Per Shipment
            </span>
            <h2
              className={`text-4xl lg:text-5xl font-display font-bold text-[#1e1c1a] tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              Every token is
              <br />
              <span className="text-[#9e9890]">non-compressible.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-[#d0ccc5] flex items-center justify-center bg-[#faf9f7]">
              <span className="text-xl font-display font-bold text-[#1e1c1a]">
                4
              </span>
            </div>
            <span className="text-sm font-mono text-[#9e9890] uppercase tracking-widest">
              Core compliance steps
            </span>
          </div>
        </div>
      </div>
      <div>
        {features.map((feature, index) => (
          <FeatureCard key={feature.number} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
