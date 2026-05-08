import React from "react";
import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "GGXT Express Cargo L.L.C — MENA Freight & Logistics",
  description:
    "GGXT Express Cargo L.L.C provides comprehensive logistics services including general warehousing, sea cargo transportation, professional cargo packaging and customs brokerage for import and export businesses across UAE and 23 MENA countries. Based in Al Rigga, Dubai, UAE.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
