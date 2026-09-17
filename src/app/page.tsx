"use client";

import React, { useState } from "react";
import MultimodalSimulator, {
  PlatformPreset,
} from "@/components/MultimodalSimulator";
import SubscriptionEngine from "@/components/SubscriptionEngine";
import HexMapVisualizer from "@/components/HexMapVisualizer";
import UnitEconomicsSheet from "@/components/UnitEconomicsSheet";
import {
  Zap,
  Layers,
  CreditCard,
  BarChart3,
  Globe2,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<
    "copilot" | "saas" | "hexmap" | "pnl"
  >("copilot");
  const [preset, setPreset] = useState<PlatformPreset>("superapp");

  const presetDescriptions: Record<
    PlatformPreset,
    { title: string; subtitle: string; badge: string }
  > = {
    superapp: {
      title: "Global Mobility + Food Super-App Architecture",
      subtitle:
        "Cross-dispatching Commuter Rides, Food Delivery (Eats/Ownly model), and B2B Express Parcels under a unified driver supply pool.",
      badge: "Fits: Uber (Rides + Eats + Direct) • Grab • Bolt",
    },
    zerocomm: {
      title: "Zero-Commission SaaS Subscription & Low-Take Food Network",
      subtitle:
        "Monetizing 2W/3W/4W fleets via Daily Subscription Passes while subsidizing driver pass fees through zero-commission restaurant delivery batches.",
      badge: "Fits: Rapido (Rides + Ownly Food) • Ola • Swiggy/Zomato Fleet",
    },
    opennet: {
      title: "Decentralized Open Mobility & Logistics Grid",
      subtitle:
        "Direct driver-to-consumer fare settlement paired with ₹0-upfront pay-as-you-go micro-passes and open retail logistics pooling.",
      badge: "Fits: ONDC Network • Namma Yatri • Beckn Protocol",
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Executive Header */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-gray-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider rounded-full bg-indigo-500 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> PM Portfolio Case Study
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {presetDescriptions[preset].badge}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              OmniFleet AI: Multimodal Driver Co-Pilot & SaaS Pass Engine
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
              {presetDescriptions[preset].subtitle}
            </p>
          </div>

          {/* Universal Platform Architecture Preset Switcher */}
          <div className="bg-gray-950 p-2 rounded-2xl border border-gray-800 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1.5 flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-indigo-400" /> Select Target Platform Mode:
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setPreset("superapp")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  preset === "superapp"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Super-App
              </button>
              <button
                onClick={() => setPreset("zerocomm")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  preset === "zerocomm"
                    ? "bg-amber-500 text-gray-950 shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Zero-Comm SaaS
              </button>
              <button
                onClick={() => setPreset("opennet")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  preset === "opennet"
                    ? "bg-emerald-500 text-gray-950 shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Open Network
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setActiveTab("copilot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "copilot"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-950 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            1. Multimodal Co-Pilot & Food/Parcel Blending
          </button>

          <button
            onClick={() => setActiveTab("saas")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "saas"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-950 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            2. Dynamic SaaS Pass & Food Rebate Engine
          </button>

          <button
            onClick={() => setActiveTab("hexmap")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "hexmap"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-950 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3. H3 Spatial Hex Map & Dead-Mile Dispatch
          </button>

          <button
            onClick={() => setActiveTab("pnl")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "pnl"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-950 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            4. Executive Unit Economics & P&L Sheet
          </button>
        </div>
      </div>

      {/* Active Tab Content */}
      <div>
        {activeTab === "copilot" && <MultimodalSimulator preset={preset} />}
        {activeTab === "saas" && <SubscriptionEngine />}
        {activeTab === "hexmap" && <HexMapVisualizer />}
        {activeTab === "pnl" && <UnitEconomicsSheet />}
      </div>
    </main>
  );
}
