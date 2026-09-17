import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OmniFleet — Multimodal Fleet Recovery & SaaS Pass Engine",
  description:
    "Your fleet is bleeding out between 11 AM and 4 PM. We recover the dead miles via Zero-Commission Food & B2B Parcel chaining, and prove the EBITDA lift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#080C0A] text-[#ECE7DA] font-sans antialiased selection:bg-[#C8FF3D] selection:text-[#080C0A]">
        {children}
      </body>
    </html>
  );
}
