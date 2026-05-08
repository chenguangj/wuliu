"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Compliance", href: "/compliance" },
  { name: "Route Decision", href: "/routing" },
  { name: "Documents", href: "/documents" },
  { name: "Coverage", href: "/coverage" },
  // { name: "Pricing", href: "/#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = mounted && isScrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Thin ticker */}
      <div className="bg-[#1e1c1a] text-[#f0ede8] overflow-hidden h-7 flex items-center">
        <div
          className="flex gap-0 ticker whitespace-nowrap text-[11px] font-mono uppercase tracking-widest"
          aria-hidden="true"
        >
          {/* 4 identical sets — ensures seamless loop on any screen width */}
          {[0, 1, 2, 3].map((setIdx) => (
            <span key={setIdx} className="flex shrink-0">
              <span className="px-8 border-r border-[#f0ede8]/10">
                ✦ GGXT Express Cargo L.L.C
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                General Warehousing · Sea Cargo
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                Cargo Packaging · Customs Brokerage
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                Import &amp; Export Agency
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                Dubai · UAE + 23 MENA Countries
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                Al Rigga, Dubai, United Arab Emirates
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                business@ggxtonline.com
              </span>
              <span className="px-8 border-r border-[#f0ede8]/10">
                One-Stop Logistics Services
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`border-b transition-all duration-300 ${scrolled ? "bg-[#faf9f7]/95 backdrop-blur-sm border-[#d0ccc5]" : "bg-[#faf9f7] border-[#d0ccc5]"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-0">
            <span className="text-xl font-display font-bold tracking-tight text-[#1e1c1a]">
              GG
            </span>
            <span className="bg-[#1e1c1a] text-[#f0ede8] text-xl font-display font-bold px-1.5 py-0.5 ml-0.5">
              XT
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-mono text-[#6b6560] hover:text-[#1e1c1a] hover:bg-[#f2f0ec] transition-colors duration-150 uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* <a
              href="#"
              className="px-4 py-2 text-sm font-mono text-[#6b6560] hover:text-[#1e1c1a] transition-colors uppercase tracking-widest"
            >
              Sign in
            </a> */}
            <a
              href="/contact"
              className="px-5 py-2 text-sm font-mono bg-[#1e1c1a] text-[#f0ede8] hover:bg-[#3a3835] transition-colors uppercase tracking-widest"
            >
              Contact Us →
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border border-[#d0ccc5]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {mounted && (
        <div
          className={`md:hidden fixed inset-0 bg-[#faf9f7] z-40 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ top: "6.75rem" }}
        >
          <div className="border-t border-[#d0ccc5]">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-8 py-5 text-xl font-display border-b border-[#e8e5df] hover:bg-[#f2f0ec] transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-sm font-mono text-[#9e9890]">
                  0{i + 1}
                </span>
              </a>
            ))}
            <div className="p-8 flex gap-3">
              {/* <a
                href="#"
                className="flex-1 py-3 text-center font-mono text-sm uppercase tracking-widest border border-[#d0ccc5] hover:bg-[#f2f0ec] transition-colors"
              >
                Sign in
              </a> */}
              <a
                href="/contact"
                className="flex-1 py-3 text-center font-mono text-sm uppercase tracking-widest bg-[#1e1c1a] text-[#f0ede8] hover:bg-[#3a3835] transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
