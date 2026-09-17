import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniFleet AI | Multimodal Mobility & Hyperlocal Fleet OS",
  description:
    "Universal Product Management Portfolio Simulator: Cross-dispatching Commuter Rides, Zero-Commission Food Delivery, and B2B Parcels with Dynamic Subscription SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
