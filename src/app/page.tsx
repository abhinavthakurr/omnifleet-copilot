"use client";

import React, { useState } from "react";
import MultimodalSimulator, {
  PlatformPreset,
} from "@/components/MultimodalSimulator";
import SubscriptionEngine from "@/components/SubscriptionEngine";
import HexMapVisualizer from "@/components/HexMapVisualizer";
import UnitEconomicsSheet from "@/components/UnitEconomicsSheet";
import {
  Sliders,
  CreditCard,
  Map,
  BarChart2,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<
    "copilot" | "saas" | "hexmap" | "pnl"
  >("copilot");
  const [preset, setPreset] = useState<PlatformPreset>("superapp");

  const presetMeta: Record<
    PlatformPreset,
    { label: string; scope: string; description: string }
  > = {
    superapp: {
      label: "Super-App Mode",
      scope: "Uber (Rides + Eats + Direct) • Grab • Bolt",
      description:
        "Cross-dispatching commuter rides, restaurant delivery batches, and B2B express logistics across a unified driver supply pool.",
    },
    zerocomm: {
      label: "Zero-Commission SaaS",
      scope: "Rapido (Rides + Ownly Food) • Ola • Swiggy/Zomato Fleet",
      description:
        "Monetizing 2W/3W/4W fleets via daily SaaS passes while subsidizing driver pass fees through zero-commission restaurant delivery batches.",
    },
    opennet: {
      label: "Open Network Grid",
      scope: "ONDC Protocol • Namma Yatri • Beckn Mobility",
      description:
        "Direct driver-to-consumer fare settlement paired with ₹0-upfront pay-as-you-go micro-passes and open retail logistics pooling.",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Enterprise Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter">
              OF
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold tracking-tight text-slate-900">
                OmniFleet OS
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 font-medium hidden sm:inline">
                Multimodal Dispatch & SaaS Pass Simulator
              </span>
            </div>
          </div>

          {/* Segmented Control for Platform Architecture */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 hidden md:inline">
              Architecture Preset:
            </span>
            <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200/80">
              {(["superapp", "zerocomm", "opennet"] as PlatformPreset[]).map(
                (key) => (
                  <button
                    key={key}
                    onClick={() => setPreset(key)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      preset === key
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {presetMeta[key].label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Executive Context & Sub-Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Target Ecosystem Fit:</span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {presetMeta[preset].scope}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Multimodal Fleet Utilization & Dynamic Subscription Engine
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                {presetMeta[preset].description}
              </p>
            </div>

            <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-4">
              <div>
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Simulated Annual Impact
                </div>
                <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                  +₹222.4 Cr{" "}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +$26.2M EBITDA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Enterprise Underline Tabs */}
          <nav className="flex gap-8 -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("copilot")}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "copilot"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Sliders className="w-4 h-4" />
              1. Multimodal Co-Pilot & Dispatch
            </button>

            <button
              onClick={() => setActiveTab("saas")}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "saas"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              2. Dynamic SaaS Pass & Food Rebates
            </button>

            <button
              onClick={() => setActiveTab("hexmap")}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "hexmap"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Map className="w-4 h-4" />
              3. H3 Spatial Liquidity & Switchback Map
            </button>

            <button
              onClick={() => setActiveTab("pnl")}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "pnl"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              4. Executive Unit Economics & P&L Sheet
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === "copilot" && <MultimodalSimulator preset={preset} />}
        {activeTab === "saas" && <SubscriptionEngine />}
        {activeTab === "hexmap" && <HexMapVisualizer />}
        {activeTab === "pnl" && <UnitEconomicsSheet />}
      </main>
    </div>
  );
}
