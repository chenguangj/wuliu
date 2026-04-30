"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Why 420K Tokens", href: "#features" },
    { name: "Case Study", href: "#how-it-works" },
    { name: "Token Breakdown", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Changelog", href: "#" },
  ],
  Coverage: [
    { name: "UAE (Hub)", href: "#" },
    { name: "Saudi Arabia", href: "#" },
    { name: "Egypt & North Africa", href: "#" },
    { name: "Gulf States", href: "#" },
    { name: "Full Country List", href: "#integrations" },
  ],
  Developers: [
    { name: "API Reference", href: "#developers" },
    { name: "SDK", href: "#developers" },
    { name: "Webhook Docs", href: "#" },
    { name: "System Status", href: "#" },
  ],
  Company: [
    { name: "About GGXT", href: "#" },
    { name: "Dubai Office", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative bg-[#1e1c1a] text-[#f0ede8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 border-b border-[#f0ede8]/10">
          <div className="col-span-2 p-10 border-b md:border-b-0 md:border-r border-[#f0ede8]/10">
            <a href="#" className="inline-flex items-center gap-0 mb-6">
              <span className="text-xl font-display font-bold">GG</span>
              <span className="bg-[#f0ede8] text-[#1e1c1a] text-xl font-display font-bold px-1.5 py-0.5 ml-0.5">
                XT
              </span>
            </a>
            <p className="text-sm text-[#f0ede8]/50 leading-relaxed mb-4 max-w-xs">
              Legal reasoning compliance for every MENA shipment. UAE + 23
              countries. Arabic + English. Daily regulation sync.
            </p>
            <p className="text-xs font-mono text-[#f0ede8]/30 uppercase tracking-widest mb-8">
              Dubai · MENA Cross-Border Freight Compliance
            </p>
            <div className="flex gap-0 border border-[#f0ede8]/10">
              {["LinkedIn", "Twitter", "GitHub"].map((name, i) => (
                <a
                  key={name}
                  href="#"
                  className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#f0ede8]/40 hover:text-[#f0ede8] hover:bg-[#f0ede8]/5 transition-colors duration-150 flex items-center gap-1 ${i < 2 ? "border-r border-[#f0ede8]/10" : ""}`}
                >
                  {name}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <div
              key={title}
              className={`p-8 ${colIdx < Object.keys(footerLinks).length - 1 ? "border-r border-[#f0ede8]/10" : ""}`}
            >
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-[#f0ede8]/30 mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[#f0ede8]/50 hover:text-[#f0ede8] transition-colors inline-flex items-center gap-2"
                    >
                      {link.name}
                      {"badge" in link && link.badge && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#d4e8c2] text-[#1e1c1a] font-mono uppercase tracking-widest">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#f0ede8]/25">
            © 2025 GGXT. All rights reserved. Dubai, UAE.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#f0ede8]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0]" />
            All systems operational · Nightly patrol running
          </div>
        </div>
      </div>
    </footer>
  );
}
