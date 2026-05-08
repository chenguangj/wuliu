"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Languages, FileText, ArrowRight, Download, CheckCircle } from "lucide-react";

const documentTypes = [
  {
    id: "invoice",
    name: "Corrected Commercial Invoice",
    nameAr: "الفاتورة التجارية المصححة",
    description: "Auto-corrected HS code, updated cargo description, dual-language layout compliant with Saudi customs requirements.",
    fields: ["Exporter / المُصدِّر", "Consignee / المُرسَل إليه", "HS Code / رمز النظام المنسق", "Cargo Description / وصف البضاعة", "Value USD / القيمة بالدولار", "Country of Origin / بلد المنشأ"],
    status: "generated",
    pages: 2,
  },
  {
    id: "packing",
    name: "Bilingual Packing List",
    nameAr: "قائمة التعبئة ثنائية اللغة",
    description: "Item-level packing details with Arabic translations validated against ZATCA terminology standards.",
    fields: ["Package Count / عدد الطرود", "Gross Weight / الوزن الإجمالي", "Net Weight / الوزن الصافي", "Dimensions / الأبعاد", "UN Number / رقم الأمم المتحدة", "IMDG Class / فئة IMDG"],
    status: "generated",
    pages: 3,
  },
  {
    id: "imo",
    name: "IMO Dangerous Goods Declaration",
    nameAr: "إعلان البضائع الخطرة IMO",
    description: "IMDG-compliant DG declaration for Class 3 flammable liquids, required for sea freight booking at Jebel Ali.",
    fields: ["UN Number / رقم الأمم المتحدة", "Proper Shipping Name / الاسم الصحيح للشحن", "Hazard Class / فئة الخطر", "Packing Group / مجموعة التعبئة", "Emergency Contact / جهة الاتصال الطارئة"],
    status: "generated",
    pages: 1,
  },
  {
    id: "shipper",
    name: "Shipper's Declaration",
    nameAr: "إعلان الشاحن",
    description: "Shipper certification statement for dangerous goods, required alongside IMO declaration for DG cargo.",
    fields: ["Shipper Name / اسم الشاحن", "Cargo Description / وصف البضاعة", "Certification Statement / بيان الشهادة", "Signature Block / كتلة التوقيع"],
    status: "generated",
    pages: 1,
  },
  {
    id: "permit_guide",
    name: "MOIAT Import Permit Guide",
    nameAr: "دليل تصريح الاستيراد MOIAT",
    description: "Step-by-step guide for obtaining the Saudi Ministry of Industry & Advanced Technology import permit for industrial solvents.",
    fields: ["Application Portal / بوابة التقديم", "Required Documents / المستندات المطلوبة", "Processing Timeline / الجدول الزمني", "Fee Schedule / جدول الرسوم"],
    status: "generated",
    pages: 4,
  },
];

const bilingualSamples = [
  {
    field: "Cargo Description",
    en: "Toluene and Ethyl Acetate mixture, flammable liquid, UN1294, IMDG Class 3, Packing Group II",
    ar: "خليط من التولوين وخلات الإيثيل، سائل قابل للاشتعال، UN1294، فئة IMDG 3، مجموعة التعبئة II",
  },
  {
    field: "HS Code Classification",
    en: "2902.30.00 — Toluene (corrected from 2707.10)",
    ar: "2902.30.00 — التولوين (مصحح من 2707.10)",
  },
  {
    field: "Country of Origin",
    en: "United Arab Emirates",
    ar: "الإمارات العربية المتحدة",
  },
  {
    field: "Port of Loading",
    en: "Jebel Ali Port, Dubai, UAE",
    ar: "ميناء جبل علي، دبي، الإمارات العربية المتحدة",
  },
  {
    field: "Port of Discharge",
    en: "King Abdulaziz Port, Dammam, Kingdom of Saudi Arabia",
    ar: "ميناء الملك عبدالعزيز، الدمام، المملكة العربية السعودية",
  },
];

const validationChecks = [
  { check: "Arabic terminology matches ZATCA approved glossary", passed: true },
  { check: "HS code consistent across all documents", passed: true },
  { check: "Cargo description matches MSDS chemical name", passed: true },
  { check: "UN number matches IMDG dangerous goods list", passed: true },
  { check: "Consignee name matches import permit application", passed: true },
  { check: "All mandatory Arabic fields populated", passed: true },
  { check: "Document cross-reference numbers consistent", passed: true },
];

export default function DocumentsPage() {
  const [activeDoc, setActiveDoc] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const doc = documentTypes[activeDoc];

  return (
    <main className="relative min-h-screen bg-[#faf9f7]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[6.75rem] border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-0 border border-[#d0ccc5] overflow-hidden">
              <span className="bg-[#1e1c1a] text-[#f0ede8] px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest">
                Module 03
              </span>
              <span className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                Bilingual Document Generation
              </span>
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className={`text-[clamp(2.4rem,6vw,5.5rem)] font-display leading-[0.92] tracking-tight text-[#1e1c1a] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                Arabic + English.
                <br />
                <span className="text-[#9e9890]">Customs-ready.</span>
              </h1>
              <p className={`text-lg text-[#6b6560] leading-relaxed max-w-lg pl-5 border-l-2 border-[#d0ccc5] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                MENA customs authorities require original Arabic documents. GGXT
                auto-generates bilingual invoices, packing lists, and import declarations
                with terminology validated against ZATCA's approved glossary — preventing
                the translation errors that cause clearance failures.
              </p>
            </div>
            <div className={`grid grid-cols-2 gap-px bg-[#d0ccc5] border border-[#d0ccc5] transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {[
                { v: "~80K", l: "Tokens per batch", s: "Document generation layer" },
                { v: "5", l: "Documents generated", s: "Per shipment" },
                { v: "24", l: "Countries supported", s: "Local terminology" },
                { v: "0", l: "Translation errors", s: "ZATCA glossary validated" },
              ].map((s) => (
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

      {/* Document browser */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
                — Generated Documents · Toluene Export · Dubai → Riyadh
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e1c1a]">
                5 documents auto-generated.
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] border border-[#d0ccc5] px-4 py-2.5 bg-[#faf9f7] uppercase tracking-widest text-[#6b6560]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8c9a0]" />
              All ready
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#d0ccc5]">
            {/* Doc list */}
            <div className="divide-y divide-[#d0ccc5]">
              {documentTypes.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDoc(i)}
                  className={`w-full text-left px-6 py-5 transition-colors ${activeDoc === i ? "bg-[#f2f0ec]" : "hover:bg-[#f2f0ec]/60"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className={`text-sm font-bold uppercase tracking-wide ${activeDoc === i ? "text-[#1e1c1a]" : "text-[#6b6560]"}`}>
                      {d.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#9e9890] shrink-0">{d.pages}p</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#9e9890] text-right" dir="rtl">
                    {d.nameAr}
                  </div>
                </button>
              ))}
            </div>

            {/* Doc detail */}
            <div className="lg:col-span-2 p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-[#1e1c1a] mb-1">{doc.name}</h3>
                  <div className="text-base font-display text-[#9e9890]" dir="rtl">{doc.nameAr}</div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#d0ccc5] text-[11px] font-mono uppercase tracking-widest text-[#6b6560] hover:border-[#1e1c1a] hover:text-[#1e1c1a] transition-colors shrink-0">
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </div>

              <p className="text-sm text-[#6b6560] leading-relaxed mb-8 pl-4 border-l-2 border-[#d0ccc5]">
                {doc.description}
              </p>

              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] mb-3">
                  Fields included
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doc.fields.map((field, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#6b6560]">
                      <div className="w-1.5 h-1.5 bg-[#b8c9a0] shrink-0" />
                      {field}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#d0ccc5] bg-[#f2f0ec] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#b8c9a0]" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#6b6560]">
                    ZATCA terminology validated
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#9e9890] uppercase tracking-widest">
                  {doc.pages} page{doc.pages > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual sample */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Bilingual Field Preview
            </span>
            <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
              English ↔ Arabic, field by field.
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-b border-[#d0ccc5]">
          <div className="grid grid-cols-3 px-8 py-3 border-b border-[#d0ccc5] text-[10px] font-mono uppercase tracking-widest text-[#9e9890]">
            <span>Field</span>
            <span>English</span>
            <span className="text-right">Arabic / عربي</span>
          </div>
          {bilingualSamples.map((sample, i) => (
            <div key={i} className="grid grid-cols-3 px-8 py-5 border-b border-[#d0ccc5] hover:bg-[#f2f0ec] transition-colors items-start gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890]">{sample.field}</span>
              <span className="text-sm text-[#6b6560] leading-relaxed">{sample.en}</span>
              <span className="text-sm text-[#6b6560] leading-relaxed text-right" dir="rtl">{sample.ar}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Validation checks */}
      <section className="border-b border-[#d0ccc5]">
        <div className="border-b border-[#d0ccc5] bg-[#f2f0ec]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e9890] block mb-2">
              — Post-Generation Validation
            </span>
            <h2 className="text-2xl font-display font-bold text-[#1e1c1a]">
              7 cross-document checks. All passed.
            </h2>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
          <div className="divide-y divide-[#d0ccc5] border-b border-[#d0ccc5]">
            {validationChecks.map((check, i) => (
              <div key={i} className="flex items-center gap-5 px-8 py-5 hover:bg-[#f2f0ec] transition-colors">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 bg-[#d4e8c2] border border-[#b8c9a0]">
                  <CheckCircle className="w-3 h-3 text-[#1e1c1a]" />
                </div>
                <span className="text-sm text-[#1e1c1a]">{check.check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Arabic matters */}
      <section className="border-b border-[#d0ccc5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d0ccc5] border-b border-[#d0ccc5]">
            {[
              {
                icon: Languages,
                title: "Arabic source text reasoning",
                body: "MENA customs regulations are predominantly written in Arabic. GGXT reads and reasons from the original Arabic legal text — not a translated summary — ensuring terminology accuracy that prevents clearance rejections.",
              },
              {
                icon: FileText,
                title: "ZATCA-approved terminology",
                body: "Saudi customs (ZATCA) maintains an approved Arabic terminology glossary for trade documents. GGXT validates every generated field against this glossary, catching translation errors before submission.",
              },
              {
                icon: CheckCircle,
                title: "Cross-document consistency",
                body: "The same cargo description, HS code, and party names must appear identically across all documents. GGXT generates all 5 documents in a single pass, guaranteeing consistency that manual translation cannot.",
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
              Generate your bilingual document set.
            </h2>
            <p className="text-[#f0ede8]/50 font-mono text-sm uppercase tracking-widest">
              5 documents · Arabic + English · ZATCA validated · Ready in seconds.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f0ede8] text-[#1e1c1a] font-mono uppercase tracking-widest text-sm hover:bg-white transition-colors group"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/coverage"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#f0ede8]/20 text-[#f0ede8]/60 font-mono uppercase tracking-widest text-sm hover:border-[#f0ede8]/60 hover:text-[#f0ede8] transition-colors"
            >
              Coverage Map →
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
