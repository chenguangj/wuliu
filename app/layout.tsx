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
  title: "GGXT — MENA Freight Compliance Platform",
  description:
    "Legal reasoning compliance review for every cross-border shipment across UAE + 23 MENA countries. Not a database lookup — full AI legal text reasoning. Arabic + English bilingual documents.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
