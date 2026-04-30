"use client";

import { useEffect, useState, useRef } from "react";

const countries = [
  { name: "UAE", category: "Hub · Jebel Ali" },
  { name: "Saudi Arabia", category: "MOIAT · Customs" },
  { name: "Egypt", category: "Cairo Customs" },
  { name: "Qatar", category: "Doha Port" },
  { name: "Kuwait", category: "KPA" },
  { name: "Bahrain", category: "Khalifa Bin Salman" },
  { name: "Oman", category: "Sohar Port" },
  { name: "Jordan", category: "Aqaba Customs" },
  { name: "Iraq", category: "Umm Qasr" },
  { name: "Lebanon", category: "Beirut Port" },
  { name: "Morocco", category: "Tanger Med" },
  { name: "Tunisia", category: "Rades Port" },
  { name: "Algeria", category: "Algiers Customs" },
  { name: "Libya", category: "Misrata Port" },
  { name: "Sudan", category: "Port Sudan" },
  { name: "Yemen", category: "Aden Port" },
  { name: "Syria", category: "Latakia Port" },
  { name: "Israel", category: "Ashdod Port" },
  { name: "Turkey", category: "Mersin Port" },
  { name: "Iran", category: "Bandar Abbas" },
  { name: "Pakistan", category: "Karachi Port" },
  { name: "Afghanistan", category: "Customs Authority" },
  { name: "Djibouti", category: "Doraleh Terminal" },
  { name: "Somalia", category: "Mogadishu Port" },
];

export function IntegrationsSection() {
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
    <section
      id="integrations"
      ref={sectionRef}
      className="relative bg-[#f2f0ec]"
    >
      <div className="border-y border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-3">
              — Coverage
            </span>
            <h2
              className={`text-3xl lg:text-4xl font-display font-bold text-[#1e1c1a] tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              UAE + 23 countries.
              <br />
              Daily regulation sync.
            </h2>
          </div>
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <p className="text-base text-[#6b6560] pl-5 border-l-2 border-[#d0ccc5]">
              24 customs authorities and port operators monitored nightly.
              Regulation diffs auto-detected and rule library updated before
              your next shipment.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-[#d0ccc5] overflow-hidden">
        <div className="flex marquee border-b border-[#d0ccc5]">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {countries.slice(0, 12).map((c) => (
                <div
                  key={`${c.name}-${setIndex}`}
                  className="shrink-0 px-7 py-5 border-r border-[#d0ccc5] hover:bg-[#faf9f7] transition-colors duration-150 cursor-default"
                >
                  <div className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">
                    {c.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest mt-0.5">
                    {c.category}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {countries.slice(12).map((c) => (
                <div
                  key={`${c.name}-rev-${setIndex}`}
                  className="shrink-0 px-7 py-5 border-r border-[#d0ccc5] hover:bg-[#faf9f7] transition-colors duration-150 cursor-default"
                >
                  <div className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">
                    {c.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest mt-0.5">
                    {c.category}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
