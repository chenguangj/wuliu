"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const contactReasons = [
  "Request a live compliance demo",
  "API integration inquiry",
  "Enterprise / white-label pricing",
  "Coverage question (specific country)",
  "Partnership or reseller inquiry",
  "Other",
];

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(contactReasons[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#faf9f7]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[6.75rem] border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
              <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
                Dubai · MENA
              </span>
              <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                GGXT Express Cargo L.L.C
              </span>
            </span>
          </div>
          <h1 className={`text-[clamp(2.4rem,6vw,5.5rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Talk to the
            <br />
            <span className="text-[#9e9890]">compliance team.</span>
          </h1>
          <p className={`text-lg text-[#6b6560] leading-relaxed max-w-xl pl-5 border-l-2 border-[#d0ccc5] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Request a live demo with your own cargo data, ask about API integration,
            or discuss enterprise pricing. We'll run a real compliance check on your
            next shipment and show you exactly what we find.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">

            {/* Form */}
            <div className="p-10 lg:p-14">
              {submitted ? (
                <div className="flex flex-col items-start gap-6 py-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#d4e8c2] border border-[#b8c9a0]">
                    <CheckCircle className="w-6 h-6 text-[#1e1c1a]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-[#1e1c1a] mb-2">
                      Message received.
                    </h2>
                    <p className="text-[#6b6560] leading-relaxed">
                      We'll be in touch within one business day. If your inquiry is
                      urgent, email us directly at{" "}
                      <a href="mailto:business@ggxtonline.com" className="text-[#1e1c1a] underline underline-offset-2">
                        business@ggxtonline.com
                      </a>
                      .
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] hover:text-[#1e1c1a] transition-colors"
                  >
                    ← Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                      Reason for contact
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => setSelected(reason)}
                          className={`text-left px-4 py-3 border text-[11px] font-mono uppercase tracking-widest transition-colors ${selected === reason ? "bg-[#1e1c1a] text-[#f0ede8] border-[#1e1c1a]" : "border-[#d0ccc5] text-[#6b6560] hover:border-[#1e1c1a] hover:text-[#1e1c1a]"}`}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmed Al-Rashidi"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please fill in this field")}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        className="w-full border border-[#d0ccc5] bg-[#faf9f7] px-4 py-3 text-sm font-mono text-[#1e1c1a] placeholder-[#9e9890] focus:outline-none focus:border-[#1e1c1a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Gulf Chemical Trading"
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please fill in this field")}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        className="w-full border border-[#d0ccc5] bg-[#faf9f7] px-4 py-3 text-sm font-mono text-[#1e1c1a] placeholder-[#9e9890] focus:outline-none focus:border-[#1e1c1a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ahmed@gulfchemical.ae"
                      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please enter a valid email address")}
                      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                      className="w-full border border-[#d0ccc5] bg-[#faf9f7] px-4 py-3 text-sm font-mono text-[#1e1c1a] placeholder-[#9e9890] focus:outline-none focus:border-[#1e1c1a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                      Monthly shipment volume (approx.)
                    </label>
                    <select className="w-full border border-[#d0ccc5] bg-[#faf9f7] px-4 py-3 text-sm font-mono text-[#1e1c1a] focus:outline-none focus:border-[#1e1c1a] appearance-none">
                      <option>1–20 shipments / month</option>
                      <option>20–100 shipments / month</option>
                      <option>100–500 shipments / month</option>
                      <option>500+ shipments / month</option>
                      <option>Platform / API integration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your shipment routes, cargo types, or specific compliance challenges..."
                      className="w-full border border-[#d0ccc5] bg-[#faf9f7] px-4 py-3 text-sm font-mono text-[#1e1c1a] placeholder-[#9e9890] focus:outline-none focus:border-[#1e1c1a] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1e1c1a] text-[#f0ede8] font-mono uppercase tracking-widest text-sm hover:bg-[#3a3835] transition-colors group"
                  >
                    Send message
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div className="divide-y divide-[#d0ccc5]">
              <div className="p-10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-5">
                  Direct contact
                </div>
                <div className="space-y-4">
                  <a
                    href="mailto:business@ggxtonline.com"
                    className="flex items-center gap-3 text-sm text-[#1e1c1a] hover:text-[#6b6560] transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec] group-hover:bg-[#1e1c1a] group-hover:border-[#1e1c1a] transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#6b6560] group-hover:text-[#f0ede8] transition-colors" />
                    </div>
                    business@ggxtonline.com
                  </a>
                  <div className="flex items-start gap-3 text-sm text-[#6b6560]">
                    <div className="w-8 h-8 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec] shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6b6560]" />
                    </div>
                    <span>
                Office No. 36-708, Owned by Sheikha Mona Ahmed Bin Ali Al Thani,
                      Al Rigga, Dubai, United Arab Emirates
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6b6560]">
                    <div className="w-8 h-8 flex items-center justify-center border border-[#d0ccc5] bg-[#f2f0ec] shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#6b6560]" />
                    </div>
                    Sun–Thu 09:00–18:00 GST
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-5">
                  What happens after you submit
                </div>
                <div className="space-y-4">
                  {[
                    { step: "01", text: "We review your inquiry and shipment profile within 1 business day." },
                    { step: "02", text: "We schedule a 30-minute live demo using your actual cargo data." },
                    { step: "03", text: "We run a real compliance check and walk you through the results." },
                    { step: "04", text: "You receive a proposal tailored to your shipment volume and routes." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="text-2xl font-display font-bold text-[#d0ccc5] shrink-0 leading-none mt-0.5">
                        {item.step}
                      </span>
                      <p className="text-sm text-[#6b6560] leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-[#f2f0ec]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-4">
                  Typical demo result
                </div>
                <div className="grid grid-cols-3 gap-px bg-[#d0ccc5] border border-[#d0ccc5]">
                  {[
                    { v: "3", l: "Issues found" },
                    { v: "$74K", l: "Risk avoided" },
                    { v: "<4s", l: "Processing time" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#faf9f7] p-4 text-center">
                      <div className="text-2xl font-display font-bold text-[#1e1c1a]">{s.v}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9e9890] mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-mono text-[#9e9890] mt-3 uppercase tracking-widest">
                  Based on Toluene export case study · Dubai → Riyadh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
