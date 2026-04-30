"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "We had a shipment detained at Dammam for a wrong HS code. After switching to GGXT, we haven't had a single detention in 8 months. The system caught 3 errors in our first submission alone.",
    author: "Ahmed Al-Rashidi",
    role: "Head of Logistics",
    company: "Gulf Chemical Trading",
    metric: "0",
    metricLabel: "detentions in 8 months",
  },
  {
    quote:
      "The Arabic bilingual documents are a game changer. Saudi customs used to reject our paperwork for translation issues. GGXT generates compliant Arabic originals automatically.",
    author: "Sarah Müller",
    role: "Compliance Director",
    company: "EuroMENA Freight",
    metric: "100%",
    metricLabel: "first-pass clearance rate",
  },
  {
    quote:
      "We integrated the API into our TMS in two days. Now every shipment gets a compliance check before booking. The webhook alerts for regulation changes are invaluable.",
    author: "Khalid Ibrahim",
    role: "CTO",
    company: "Falcon Logistics Platform",
    metric: "2 days",
    metricLabel: "API integration time",
  },
  {
    quote:
      "The nightly regulation patrol caught a Saudi customs update that would have blocked our entire DG shipment queue. We got the alert 6 hours before our booking deadline.",
    author: "James Thornton",
    role: "VP Operations",
    company: "Atlas Global Freight",
    metric: "$340K",
    metricLabel: "shipment delay cost avoided",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 250);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section className="relative bg-[#faf9f7] border-y border-[#d0ccc5]">
      <div className="border-b border-[#d0ccc5] flex items-center justify-between px-6 lg:px-12 py-4 max-w-[1400px] mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
          — Customer Results
        </span>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 border-b border-[#d0ccc5]">
          <div className="lg:col-span-3 bg-[#f2f0ec] flex flex-col items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-[#d0ccc5]">
            <div
              className={`text-center transition-all duration-250 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            >
              <div className="text-5xl font-display font-bold text-[#1e1c1a]">
                {active.metric}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mt-2">
                {active.metricLabel}
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 p-10 lg:p-14">
            <blockquote
              className={`transition-all duration-250 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
            >
              <p className="text-xl lg:text-2xl font-display leading-snug tracking-tight text-[#1e1c1a] mb-8">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e8e5df] border border-[#d0ccc5] flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-[#1e1c1a]">
                    {active.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-[#1e1c1a] text-sm uppercase tracking-wide">
                    {active.author}
                  </div>
                  <div className="text-sm text-[#9e9890] font-mono">
                    {active.role}, {active.company}
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-[#d0ccc5]">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveIndex(idx);
                  setIsAnimating(false);
                }, 250);
              }}
              className={`py-4 px-5 text-left border-r last:border-r-0 border-[#d0ccc5] transition-colors duration-150 ${idx === activeIndex ? "bg-[#f2f0ec]" : "hover:bg-[#f2f0ec]/60"}`}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">
                {t.company}
              </div>
              <div className="text-xs font-bold text-[#1e1c1a] uppercase tracking-wide truncate">
                {t.author}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-b border-[#d0ccc5]">
        <div className="flex marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex shrink-0">
              {[
                "Gulf Chemical Trading",
                "EuroMENA Freight",
                "Falcon Logistics",
                "Atlas Global Freight",
                "Jebel Ali Shipping",
                "MENA Cargo Solutions",
                "Dubai Freight Hub",
                "Arabian Logistics",
              ].map((company) => (
                <span
                  key={`${setIdx}-${company}`}
                  className="px-8 py-4 font-display text-lg font-bold text-[#d0ccc5] whitespace-nowrap border-r border-[#d0ccc5] hover:text-[#1e1c1a] hover:bg-[#f2f0ec] transition-colors duration-150 cursor-default"
                >
                  {company}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
