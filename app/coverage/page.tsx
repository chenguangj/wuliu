"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ArrowRight, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const countries = [
  { name: "UAE", nameAr: "الإمارات", hub: true, authority: "Federal Customs Authority", port: "Jebel Ali Port", lastSync: "02:14", status: "current", hsCount: "8,400+", notes: "Primary hub. All DG classes. 24h processing." },
  { name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", hub: false, authority: "ZATCA / GAZT", port: "King Abdulaziz Port, Dammam", lastSync: "02:31", status: "current", hsCount: "9,200+", notes: "MOIAT permits required for industrial chemicals." },
  { name: "Egypt", nameAr: "مصر", hub: false, authority: "Egyptian Customs Authority", port: "Alexandria / Cairo", lastSync: "03:05", status: "current", hsCount: "7,800+", notes: "Dual-window system. Pre-clearance recommended." },
  { name: "Qatar", nameAr: "قطر", hub: false, authority: "General Authority of Customs", port: "Hamad Port, Doha", lastSync: "02:58", status: "current", hsCount: "6,900+", notes: "GCC unified tariff applies." },
  { name: "Kuwait", nameAr: "الكويت", hub: false, authority: "Kuwait Ports Authority", port: "Shuwaikh Port", lastSync: "03:12", status: "current", hsCount: "6,700+", notes: "Import ban list updated quarterly." },
  { name: "Bahrain", nameAr: "البحرين", hub: false, authority: "Customs Affairs", port: "Khalifa Bin Salman Port", lastSync: "02:47", status: "current", hsCount: "6,500+", notes: "GCC unified tariff. Fast clearance." },
  { name: "Oman", nameAr: "عُمان", hub: false, authority: "Royal Oman Police — Customs", port: "Sohar Port", lastSync: "02:47", status: "updated", hsCount: "7,100+", notes: "DG transit rules updated May 2026." },
  { name: "Jordan", nameAr: "الأردن", hub: false, authority: "Jordan Customs", port: "Aqaba Container Terminal", lastSync: "03:22", status: "current", hsCount: "6,300+", notes: "Free zone at Aqaba. Reduced tariffs." },
  { name: "Iraq", nameAr: "العراق", hub: false, authority: "General Commission of Customs", port: "Umm Qasr Port", lastSync: "03:45", status: "current", hsCount: "5,900+", notes: "Extended processing times. Pre-approval advised." },
  { name: "Lebanon", nameAr: "لبنان", hub: false, authority: "Lebanese Customs", port: "Beirut Port", lastSync: "04:01", status: "current", hsCount: "5,600+", notes: "Port capacity constraints. Allow extra lead time." },
  { name: "Morocco", nameAr: "المغرب", hub: false, authority: "Administration des Douanes", port: "Tanger Med", lastSync: "01:30", status: "current", hsCount: "7,400+", notes: "EU-adjacent. Tanger Med is major transshipment hub." },
  { name: "Tunisia", nameAr: "تونس", hub: false, authority: "Douane Tunisienne", port: "Rades Port", lastSync: "01:45", status: "current", hsCount: "6,800+", notes: "GAFTA member. Preferential rates apply." },
  { name: "Algeria", nameAr: "الجزائر", hub: false, authority: "Direction Générale des Douanes", port: "Algiers Port", lastSync: "01:55", status: "current", hsCount: "6,200+", notes: "Import license required for many categories." },
  { name: "Libya", nameAr: "ليبيا", hub: false, authority: "Libyan Customs Authority", port: "Misrata Port", lastSync: "04:20", status: "current", hsCount: "4,800+", notes: "Dual authority structure. Verify destination authority." },
  { name: "Sudan", nameAr: "السودان", hub: false, authority: "Sudan Customs Service", port: "Port Sudan", lastSync: "04:35", status: "current", hsCount: "4,500+", notes: "Sanctions monitoring active. Pre-clearance required." },
  { name: "Yemen", nameAr: "اليمن", hub: false, authority: "Yemen Customs Authority", port: "Aden Port", lastSync: "05:00", status: "current", hsCount: "3,900+", notes: "Restricted access. Humanitarian cargo priority." },
  { name: "Syria", nameAr: "سوريا", hub: false, authority: "Syrian Customs", port: "Latakia Port", lastSync: "04:50", status: "current", hsCount: "4,100+", notes: "Sanctions screening mandatory. Restricted goods list." },
  { name: "Israel", nameAr: "إسرائيل", hub: false, authority: "Israel Tax Authority — Customs", port: "Ashdod Port", lastSync: "01:10", status: "current", hsCount: "8,100+", notes: "Advanced customs system. Electronic pre-declaration." },
  { name: "Turkey", nameAr: "تركيا", hub: false, authority: "Turkish Customs Administration", port: "Mersin Port", lastSync: "00:55", status: "current", hsCount: "9,000+", notes: "EU Customs Union. High volume transshipment." },
  { name: "Iran", nameAr: "إيران", hub: false, authority: "Islamic Republic of Iran Customs", port: "Bandar Abbas", lastSync: "03:30", status: "current", hsCount: "7,600+", notes: "Comprehensive sanctions screening required." },
  { name: "Pakistan", nameAr: "باكستان", hub: false, authority: "Pakistan Customs", port: "Karachi Port", lastSync: "05:15", status: "current", hsCount: "7,200+", notes: "WeBOC electronic system. Pre-arrival declaration." },
  { name: "Afghanistan", nameAr: "أفغانستان", hub: false, authority: "Afghanistan Customs Department", port: "Kabul / Hairatan", lastSync: "05:30", status: "current", hsCount: "3,200+", notes: "Restricted categories. Humanitarian exemptions apply." },
  { name: "Djibouti", nameAr: "جيبوتي", hub: false, authority: "Office des Ports et Rades", port: "Doraleh Container Terminal", lastSync: "02:00", status: "current", hsCount: "4,600+", notes: "Strategic transshipment hub for East Africa." },
  { name: "Somalia", nameAr: "الصومال", hub: false, authority: "Somali Revenue Authority", port: "Mogadishu Port", lastSync: "05:45", status: "current", hsCount: "2,800+", notes: "Limited customs infrastructure. Verify on case basis." },
];

const patrolStats = [
  { v: "24", l: "Authorities monitored", s: "Nightly diff scan" },
  { v: "1.2B", l: "Tokens / day", s: "Fixed patrol cost" },
  { v: "02:00", l: "GST patrol start", s: "Off-peak window" },
  { v: "<6h", l: "Alert lead time", s: "Before booking deadline" },
];

const recentUpdates = [
  { country: "Oman", date: "2026-05-07", type: "DG Transit Rules", summary: "Class 3 flammable liquids now require pre-notification 48h before Sohar transit. New form OCA-DG-2026 required.", impact: "HIGH" },
  { country: "Saudi Arabia", date: "2026-05-03", type: "HS Code Reclassification", summary: "ZATCA reclassified 47 chemical HS codes under Chapter 29. Toluene sub-categories affected.", impact: "HIGH" },
  { country: "Egypt", date: "2026-04-28", type: "Pre-clearance Mandate", summary: "Electronic pre-clearance now mandatory for all chemical imports above $10,000 USD.", impact: "MEDIUM" },
  { country: "Kuwait", date: "2026-04-21", type: "Import Ban Update", summary: "Q2 2026 import ban list published. 12 new HS codes added to restricted category.", impact: "MEDIUM" },
  { country: "Turkey", date: "2026-04-15", type: "Tariff Schedule Update", summary: "Annual tariff schedule revision. 340 HS codes with rate changes effective May 1, 2026.", impact: "LOW" },
];

export default function CoveragePage() {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeCountry, setActiveCountry] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr.includes(search) ||
      c.authority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-[#faf9f7]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[6.75rem] border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
              <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
                Module 04
              </span>
              <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                Regulation Coverage
              </span>
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className={`text-[clamp(2.4rem,6vw,5.5rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                UAE + 23 countries.
                <br />
                <span className="text-[#9e9890]">Nightly sync.</span>
              </h1>
              <p className={`text-lg text-[#6b6560] leading-relaxed max-w-lg pl-5 border-l-2 border-[#d0ccc5] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                24 customs authorities and port operators are monitored every night.
                Regulation diffs are auto-detected, the rule library is updated, and
                webhook alerts are dispatched before your next booking window opens.
                The patrol runs whether you ship 0 or 60 shipments that day.
              </p>
            </div>
            <div className={`grid grid-cols-2 gap-px bg-[#d0ccc5] border border-[#d0ccc5] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {patrolStats.map((s) => (
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

      {/* Country directory */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
                — Country Directory
              </span>
              <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
                {filtered.length} of {countries.length} countries
              </h2>
            </div>
            <input
              type="text"
              placeholder="Search country or authority..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#d0ccc5] bg-[#faf9f7] px-4 py-2.5 text-sm font-mono text-[#1e1c1a] placeholder-[#9e9890] focus:outline-none focus:border-[#1e1c1a] w-full sm:w-72"
            />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
          {/* Header row */}
          <div className="hidden lg:grid grid-cols-12 px-8 py-3 border-b border-[#d0ccc5] text-[10px] font-mono uppercase tracking-widest text-[#9e9890]">
            <span className="col-span-2">Country</span>
            <span className="col-span-3">Authority</span>
            <span className="col-span-2">Main Port</span>
            <span className="col-span-2">HS Codes</span>
            <span className="col-span-2">Last Sync (GST)</span>
            <span className="col-span-1">Status</span>
          </div>

          {filtered.map((country, i) => (
            <div key={country.name}>
              <button
                type="button"
                onClick={() => setActiveCountry(activeCountry === i ? null : i)}
                className={`w-full text-left border-b border-[#d0ccc5] transition-colors ${activeCountry === i ? "bg-[#f2f0ec]" : "hover:bg-[#f2f0ec]/60"}`}
              >
                <div className="grid grid-cols-2 lg:grid-cols-12 px-8 py-5 gap-2 lg:gap-0 items-center">
                  <div className="col-span-1 lg:col-span-2">
                    <div className="flex items-center gap-2">
                      {country.hub && (
                        <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-[#1e1c1a] text-[#f0ede8]">Hub</span>
                      )}
                      <span className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">{country.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#9e9890] mt-0.5" dir="rtl">{country.nameAr}</div>
                  </div>
                  <div className="col-span-1 lg:col-span-3 text-sm text-[#6b6560] hidden lg:block">{country.authority}</div>
                  <div className="col-span-1 lg:col-span-2 text-sm text-[#6b6560] hidden lg:block">{country.port}</div>
                  <div className="col-span-1 lg:col-span-2 font-mono text-sm text-[#1e1c1a] hidden lg:block">{country.hsCount}</div>
                  <div className="col-span-1 lg:col-span-2 font-mono text-sm text-[#6b6560] hidden lg:flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#9e9890]" />
                    {country.lastSync}
                  </div>
                  <div className="col-span-1 lg:col-span-1">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 ${country.status === "updated" ? "bg-[#d4e8c2] text-[#1e1c1a]" : "bg-[#e8e5df] text-[#6b6560]"}`}>
                      {country.status === "updated" ? "Updated" : "Current"}
                    </span>
                  </div>
                </div>
              </button>
              {activeCountry === i && (
                <div className="px-8 py-5 bg-[#f2f0ec] border-b border-[#d0ccc5]">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">Authority</div>
                      <div className="text-sm text-[#1e1c1a]">{country.authority}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">Main Port</div>
                      <div className="text-sm text-[#1e1c1a]">{country.port}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">HS Codes Covered</div>
                      <div className="text-sm font-mono font-bold text-[#1e1c1a]">{country.hsCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mb-1">Notes</div>
                      <div className="text-sm text-[#6b6560]">{country.notes}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recent regulation updates */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
                — Recent Regulation Updates
              </span>
              <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
                Caught by nightly patrol.
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] border border-[#d0ccc5] px-4 py-2.5 bg-[#faf9f7] uppercase tracking-widest text-[#6b6560]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0] animate-pulse" />
              Live feed
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
          <div className="grid grid-cols-4 px-8 py-3 border-b border-[#d0ccc5] text-[10px] font-mono uppercase tracking-widest text-[#9e9890]">
            <span>Country</span>
            <span>Type</span>
            <span className="col-span-1">Summary</span>
            <span className="text-right">Impact</span>
          </div>
          {recentUpdates.map((update, i) => (
            <div key={i} className="grid grid-cols-4 px-8 py-5 border-b border-[#d0ccc5] hover:bg-[#f2f0ec] transition-colors items-start gap-4">
              <div>
                <div className="text-sm font-bold text-[#1e1c1a] uppercase tracking-wide">{update.country}</div>
                <div className="text-[11px] font-mono text-[#9e9890] mt-0.5">{update.date}</div>
              </div>
              <div className="text-sm text-[#6b6560]">{update.type}</div>
              <div className="text-sm text-[#6b6560] leading-relaxed">{update.summary}</div>
              <div className="text-right">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 ${update.impact === "HIGH" ? "bg-[#1e1c1a] text-[#f0ede8]" : update.impact === "MEDIUM" ? "bg-[#e8e5df] text-[#6b6560]" : "bg-[#f2f0ec] text-[#9e9890]"}`}>
                  {update.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patrol mechanics */}
      <section className="border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d0ccc5] border-b border-[#d0ccc5]">
            {[
              {
                icon: Clock,
                title: "Nightly off-peak window",
                body: "The patrol runs at 02:00 GST every night — off-peak for both UAE and European time zones. All 24 authorities are crawled, diffs computed, and the rule library updated before the Dubai business day begins.",
              },
              {
                icon: AlertTriangle,
                title: "Diff-based detection",
                body: "GGXT does not re-read entire regulation texts nightly. It computes diffs against the previous version, focusing token consumption on changed sections. This keeps the nightly patrol at a fixed 1.2B tokens regardless of regulation volume.",
              },
              {
                icon: CheckCircle,
                title: "Webhook alerts before booking",
                body: "When a regulation change affects HS codes or import rules relevant to your pending shipments, a webhook fires immediately. You receive the alert with enough lead time to adjust documents before your booking deadline.",
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
              Never miss a regulation change again.
            </h2>
            <p className="text-[#f0ede8]/50 font-mono text-sm uppercase tracking-widest">
              24 authorities · Nightly patrol · Webhook alerts · UAE + 23 countries.
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
              href="/#pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#f0ede8]/20 text-[#f0ede8]/60 font-mono uppercase tracking-widest text-sm hover:border-[#f0ede8]/60 hover:text-[#f0ede8] transition-colors"
            >
              View Pricing →
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
