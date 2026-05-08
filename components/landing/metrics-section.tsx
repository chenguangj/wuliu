"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const startTime = performance.now();
          const animate = (t: number) => {
            const p = Math.min((t - startTime) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setCount(parseFloat((e * end).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated, decimals]);

  return (
    <div
      ref={ref}
      className="text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#1e1c1a]"
    >
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </div>
  );
}

const metrics = [
  {
    value: 420,
    suffix: "K",
    label: "Tokens / Shipment",
    sub: "Single-ticket full reasoning cost",
    accent: "#d4e8c2",
  },
  {
    value: 23,
    suffix: "+1",
    label: "Countries Covered",
    sub: "UAE + 23 MENA nations, daily sync",
    accent: "#e8e5df",
  },
  {
    value: 1.2,
    suffix: "B",
    decimals: 1,
    label: "Tokens / Day",
    sub: "Nightly regulation patrol (fixed)",
    accent: "#d4e8c2",
  },
  {
    value: 60,
    suffix: "/day",
    label: "Shipments Processed",
    sub: "Real-time + batch, >$1M/mo potential",
    accent: "#e8e5df",
  },
];

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

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
    <section id="metrics" ref={sectionRef} className="relative bg-[#faf9f7]">
      <div className="border-y border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Platform Scale
            </span>
            <h2
              className={`text-3xl lg:text-4xl font-display font-bold text-[#1e1c1a] tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              The numbers behind
              <br />
              every compliant shipment.
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm border border-[#d0ccc5] px-4 py-2.5 bg-[#f2f0ec]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
            <span className="uppercase tracking-widest text-[11px] text-[#6b6560]">
              Live
            </span>
            <span className="text-[#d0ccc5]">|</span>
            <span className="text-[#6b6560]" suppressHydrationWarning>
              {time ? time.toLocaleTimeString() : "--:--:--"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#d0ccc5]">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`border-r last:border-r-0 border-[#d0ccc5] p-8 lg:p-10 transition-all duration-700 hover:bg-[#f2f0ec] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div
              className="w-5 h-5 mb-6 border border-[#d0ccc5]"
              style={{ backgroundColor: metric.accent }}
            />
            <AnimatedCounter
              end={metric.value}
              suffix={metric.suffix}
              decimals={metric.decimals ?? 0}
            />
            <div className="mt-2 text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">
              {metric.label}
            </div>
            <div className="mt-1 text-xs font-mono uppercase tracking-widest text-[#9e9890]">
              {metric.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
