import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OmniFleet — Multimodal Dispatch & Zero-Commission Fleet Recovery OS",
  description:
    "Enterprise spatial dispatch and cross-vertical SaaS pass infrastructure for ride-hailing, zero-commission food delivery, and B2B express logistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#06080F] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
