"use client";

import React, { useState } from "react";
import MultimodalSimulator, {
  PlatformPreset,
} from "@/components/MultimodalSimulator";
import SubscriptionEngine from "@/components/SubscriptionEngine";
import HexMapVisualizer from "@/components/HexMapVisualizer";
import UnitEconomicsSheet from "@/components/UnitEconomicsSheet";
import CaseStudyPrdView from "@/components/CaseStudyPrdView";
import {
  Sliders,
  CreditCard,
  Map,
  BarChart2,
  FileText,
  Layers,
  Globe,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

type TabType = "copilot" | "saas" | "hexmap" | "pnl" | "prd";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("copilot");
  const [preset, setPreset] = useState<PlatformPreset>("superapp");

  const presetMeta: Record<
    PlatformPreset,
    { label: string; badge: string; companies: string; desc: string }
  > = {
    superapp: {
      label: "Super-App Architecture",
      badge: "Global Mobility + Delivery",
      companies: "Uber (Rides + Eats + Direct) • Grab • Bolt",
      desc: "Cross-dispatching Commuter Rides, Restaurant Food Batches, and B2B Express Parcels across a unified fleet supply pool.",
    },
    zerocomm: {
      label: "Zero-Commission SaaS",
      badge: "SaaS Pass + 0% Food Network",
      companies: "Rapido (Rides + Ownly Food) • Ola • Swiggy Fleet",
      desc: "Monetizing 2W/3W/4W fleets via Daily Subscription Passes while subsidizing driver pass fees through zero-commission restaurant delivery batches.",
    },
    opennet: {
      label: "Decentralized Open Grid",
      badge: "Open Mobility Protocol",
      companies: "ONDC Network • Namma Yatri • Beckn Protocol",
      desc: "Direct driver-to-consumer fare settlement paired with ₹0-upfront pay-as-you-go micro-passes and open retail logistics pooling.",
    },
  };

  const navItems: {
    id: TabType;
    label: string;
    sub: string;
    shortcut: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "copilot",
      label: "Multimodal Dispatch",
      sub: "24h Blending & Map HUD",
      shortcut: "⌘1",
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: "saas",
      label: "SaaS Pass Economics",
      sub: "Flex-Cap & Food Rebates",
      shortcut: "⌘2",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: "hexmap",
      label: "H3 Spatial Telemetry",
      sub: "Hex Liquidity & Switchback",
      shortcut: "⌘3",
      icon: <Map className="w-4 h-4" />,
    },
    {
      id: "pnl",
      label: "Executive P&L Sheet",
      sub: "INR / USD Unit Economics",
      shortcut: "⌘4",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: "prd",
      label: "Executive PRD & Research",
      sub: "Case Study & User Interviews",
      shortcut: "⌘5",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* Fixed Left Enterprise Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-slate-200/90 z-40 select-none">
        {/* Sidebar Brand Header */}
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm tracking-tight shadow-sm">
              OF
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-slate-900 leading-none">
                OmniFleet OS
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                v2.4 Enterprise
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
          <div>
            <div className="px-2.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Interactive Modules
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          isActive ? "text-white" : "text-slate-400"
                        }
                      >
                        {item.icon}
                      </span>
                      <div>
                        <div className="text-xs font-bold leading-snug">
                          {item.label}
                        </div>
                        <div
                          className={`text-[10px] leading-none mt-0.5 ${
                            isActive ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {item.sub}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {item.shortcut}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Target Platform Architecture Switcher inside Sidebar */}
          <div className="pt-4 border-t border-slate-100">
            <div className="px-2.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Platform Architecture</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </div>
            <div className="space-y-1.5 px-1">
              {(["superapp", "zerocomm", "opennet"] as PlatformPreset[]).map(
                (key) => {
                  const isSelected = preset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPreset(key)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-slate-50 border-slate-900/80 text-slate-900 shadow-sm"
                          : "bg-white border-slate-200/70 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">
                          {presetMeta[key].label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {presetMeta[key].companies}
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Author Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="text-xs font-bold text-slate-900">
            Abhinav Thakur
          </div>
          <div className="text-[11px] text-slate-500">
            Product Management Portfolio
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Sticky Top Telemetry Bar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-slate-400 hidden sm:inline">
              {presetMeta[preset].label}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
            <span className="font-bold text-slate-900">
              {navItems.find((i) => i.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs">
              <span className="text-slate-500">Target Fit:</span>
              <span className="font-semibold text-slate-800">
                {presetMeta[preset].companies}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs">
              <span className="text-emerald-800 font-medium hidden sm:inline">
                Simulated EBITDA Lift:
              </span>
              <span className="font-mono font-extrabold text-emerald-700">
                +₹222.4 Cr / yr
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Horizontal Navigation Strip (Visible only on <md screens) */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === item.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Workspace Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
          {activeTab === "copilot" && <MultimodalSimulator preset={preset} />}
          {activeTab === "saas" && <SubscriptionEngine />}
          {activeTab === "hexmap" && <HexMapVisualizer />}
          {activeTab === "pnl" && <UnitEconomicsSheet />}
          {activeTab === "prd" && <CaseStudyPrdView />}
        </main>
      </div>
    </div>
  );
}
