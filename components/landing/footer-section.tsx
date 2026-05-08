"use client";

import { Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Compliance Review", href: "/compliance" },
    { name: "Route Decision", href: "/routing" },
    { name: "Document Generation", href: "/documents" },
    { name: "Coverage Map", href: "/coverage" },
    { name: "Pricing", href: "/#pricing" },
  ],
  Developers: [
    { name: "API Integration", href: "/#developers" },
    { name: "Token Breakdown", href: "/#features" },
    { name: "Case Study", href: "/#how-it-works" },
    { name: "Platform Metrics", href: "/#metrics" },
  ],
  Resources: [
    { name: "Customer Results", href: "/#testimonials" },
    { name: "Infrastructure", href: "/#infrastructure" },
    { name: "Country Directory", href: "/coverage" },
    { name: "Why Claude", href: "/#security" },
  ],
  Company: [
    { name: "Contact Us", href: "/contact" },
    { name: "Request Demo", href: "/#how-it-works" },
    { name: "Careers", href: "/#metrics", badge: "Hiring" },
    { name: "business@ggxtonline.com", href: "mailto:business@ggxtonline.com" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative bg-[#1e1c1a] text-[#f0ede8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-7 border-b border-[#f0ede8]/10">
          <div className="col-span-2 p-10 border-b md:border-b-0 md:border-r border-[#f0ede8]/10">
            <a href="/" className="inline-flex items-center gap-0 mb-6">
              <span className="text-xl font-display font-bold">GG</span>
              <span className="bg-[#f0ede8] text-[#1e1c1a] text-xl font-display font-bold px-1.5 py-0.5 ml-0.5">
                XT
              </span>
            </a>
            <p className="text-sm text-[#f0ede8]/50 leading-relaxed mb-4 max-w-xs">
              Comprehensive logistics services including general warehousing, sea cargo transportation, cargo packaging and customs brokerage for import and export businesses.
            </p>
            <p className="text-xs font-mono text-[#f0ede8]/30 uppercase tracking-widest mb-2">
              Dubai · MENA Cross-Border Freight Compliance
            </p>
            <p className="text-xs font-mono text-[#f0ede8]/30 mb-2 leading-relaxed">
              Office No. 36-708, Owned by Sheikha Mona Ahmed Bin Ali Al Thani,<br />
              Al Rigga, Dubai, United Arab Emirates
            </p>
            <a
              href="mailto:business@ggxtonline.com"
              className="text-xs font-mono text-[#f0ede8]/40 hover:text-[#f0ede8] transition-colors mb-8 inline-flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3" />
              business@ggxtonline.com
            </a>
            <div className="flex gap-0 border border-[#f0ede8]/10">
              {[
                { name: "LinkedIn", href: "https://linkedin.com" },
                { name: "Twitter", href: "https://twitter.com" },
                { name: "GitHub", href: "https://github.com" },
              ].map((item, i) => (
                <div
                  key={item.name}
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#f0ede8]/40 hover:text-[#f0ede8] hover:bg-[#f0ede8]/5 transition-colors duration-150 flex items-center gap-1 ${i < 2 ? "border-r border-[#f0ede8]/10" : ""}`}
                >
                  {item.name}
                </div>
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
            © 2026 GGXT EXPRESS CARGO L.L.C · business@ggxtonline.com
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
