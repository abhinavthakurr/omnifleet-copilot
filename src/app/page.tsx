"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Sliders,
  Navigation,
  BookOpen,
} from "lucide-react";

type MainView = "product" | "prd";
type PlatformPreset = "zerocomm" | "superapp" | "opennet";
type ArchTab = "trigger" | "scoring" | "webhook" | "switchback";

export default function HomePage() {
  const [mainView, setMainView] = useState<MainView>("product");
  const [activePrdSection, setActivePrdSection] = useState<string>("summary");
  const [archTab, setArchTab] = useState<ArchTab>("trigger");
  const [copiedApi, setCopiedApi] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Interactive State for Live Dispatch Console
  const [preset, setPreset] = useState<PlatformPreset>("zerocomm");
  const [vehicle, setVehicle] = useState<"2w" | "3w" | "4w">("2w");
  const [shiftHours, setShiftHours] = useState<number>(10);
  const [coPilotActive, setCoPilotActive] = useState<boolean>(true);
  const [foodBatchEnabled, setFoodBatchEnabled] = useState<boolean>(true);
  const [b2bParcelEnabled, setB2bParcelEnabled] = useState<boolean>(true);
  const [driverActionStatus, setDriverActionStatus] = useState<
    "accepted" | "declined"
  >("accepted");
  const [sessionBonus, setSessionBonus] = useState<number>(0);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Interactive State for SaaS Pass Engine
  const [dailyRides, setDailyRides] = useState<number>(5);
  const [avgRideFare, setAvgRideFare] = useState<number>(95);
  const [offPeakFoodDrops, setOffPeakFoodDrops] = useState<number>(3);

  // Interactive State for Enterprise ROI Calculator
  const [fleetDau, setFleetDau] = useState<number>(450000);
  const [adoptionPct, setAdoptionPct] = useState<number>(38);
  const [netMarginPerBatch, setNetMarginPerBatch] = useState<number>(14);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD">("INR");

  // Smooth scroll helper for Product sections
  const scrollToSection = (sectionId: string) => {
    if (mainView !== "product") {
      setMainView("product");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }, 60);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Smooth scroll helper for PRD sections
  const scrollToPrdSection = (id: string) => {
    setActivePrdSection(id);
    const el = document.getElementById(`prd-${id}`);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Handle Platform Preset Switching
  const handlePresetSwitch = (newPreset: PlatformPreset) => {
    setPreset(newPreset);
    if (newPreset === "zerocomm") {
      setVehicle("2w");
      setAvgRideFare(85);
      setOffPeakFoodDrops(3);
    } else if (newPreset === "superapp") {
      setVehicle("4w");
      setAvgRideFare(180);
      setOffPeakFoodDrops(4);
    } else {
      setVehicle("3w");
      setAvgRideFare(120);
      setOffPeakFoodDrops(3);
    }
  };

  // --- Platform-Specific Route Hops Data ---
  const presetHopsData: Record<
    PlatformPreset,
    {
      brandTag: string;
      dropZone: string;
      chainTitle: string;
      passBadge: string;
      hop1: { tag: string; title: string; pay: number; eta: string };
      hop2: { tag: string; title: string; pay: number; eta: string };
      hop3: { tag: string; title: string; pay: number; eta: string };
    }
  > = {
    zerocomm: {
      brandTag: "Rapido (2W/3W Rides + Ownly 0%-Comm Food)",
      dropZone: "Whitefield IT Corridor (Baseline Wait: 26m)",
      chainTitle: "2W Captain + Ownly Lunch Chain",
      passBadge: "₹19 Daily Pass (100% Rebated)",
      hop1: {
        tag: "Hop 1 • Zero-Commission Food Batch",
        title: "Meghana Biryani Hub → 2 Lunch Drops (3.1 km)",
        pay: 75,
        eta: "14 mins",
      },
      hop2: {
        tag: "Hop 2 • Hyperlocal B2B Parcel",
        title: "Apollo Pharmacy Express → Indiranagar Clinic",
        pay: 45,
        eta: "9 mins",
      },
      hop3: {
        tag: "Hop 3 • Pre-Matched Commuter Ride",
        title: "Indiranagar Metro → MG Road CBD Surge",
        pay: 65,
        eta: "12 mins",
      },
    },
    superapp: {
      brandTag: "Uber (Rides + Uber Eats + Uber Direct)",
      dropZone: "Outer Airport Tech Park (Baseline Wait: 22m)",
      chainTitle: "4W Driver + Eats + Direct Chain",
      passBadge: "Quest + Eats Priority Boost",
      hop1: {
        tag: "Hop 1 • Priority Cloud Kitchen Batch",
        title: "Truffles Cloud Kitchen → 2 Corporate Drops",
        pay: 110,
        eta: "16 mins",
      },
      hop2: {
        tag: "Hop 2 • Express Retail Restock",
        title: "Reliance Smart Dark Store → Downtown Retail",
        pay: 85,
        eta: "11 mins",
      },
      hop3: {
        tag: "Hop 3 • Commuter Surge Dispatch",
        title: "Financial District → Central Railway Hub",
        pay: 165,
        eta: "18 mins",
      },
    },
    opennet: {
      brandTag: "ONDC / Namma Yatri Open Mobility Grid",
      dropZone: "Electronic City Phase II (Baseline Wait: 28m)",
      chainTitle: "Open Grid 0%-Commission Chain",
      passBadge: "₹0 Upfront • Direct UPI Settlement",
      hop1: {
        tag: "Hop 1 • Direct Restaurant Order",
        title: "Empire Restaurant → HSR Layout Sector 2",
        pay: 70,
        eta: "15 mins",
      },
      hop2: {
        tag: "Hop 2 • Hyperlocal Retail Parcel",
        title: "Organic Mandya Store → Koramangala 4th Block",
        pay: 50,
        eta: "10 mins",
      },
      hop3: {
        tag: "Hop 3 • Direct Auto Commuter Ride",
        title: "Sony World Signal → Trinity Metro CBD",
        pay: 95,
        eta: "14 mins",
      },
    },
  };

  const activeHops = presetHopsData[preset];

  const isFoodOn = coPilotActive && foodBatchEnabled;
  const isParcelOn = coPilotActive && b2bParcelEnabled;

  const dynamicChainPay =
    (isFoodOn ? activeHops.hop1.pay : 0) +
    (isParcelOn ? activeHops.hop2.pay : 0) +
    activeHops.hop3.pay;

  const activeSvgRoutePath =
    isFoodOn && isParcelOn
      ? "M55 155 C 95 155, 115 75, 155 75 C 195 75, 225 115, 265 115 C 305 115, 330 45, 365 45"
      : isFoodOn && !isParcelOn
      ? "M55 155 C 95 155, 115 75, 155 75 C 225 75, 295 45, 365 45"
      : !isFoodOn && isParcelOn
      ? "M55 155 C 125 155, 195 115, 265 115 C 310 115, 335 45, 365 45"
      : "M55 155 L 365 45";

  // --- Dynamic Calculations for Live Dispatch Console ---
  const baseHourlyMap = { "2w": 105, "3w": 152, "4w": 225 };
  const presetMult =
    preset === "superapp" ? 1.15 : preset === "opennet" ? 1.05 : 1.0;
  const baseHourly = Math.round(baseHourlyMap[vehicle] * presetMult);

  const foodBoost = isFoodOn ? Math.round(baseHourly * 0.22) : 0;
  const parcelBoost = isParcelOn ? Math.round(baseHourly * 0.16) : 0;

  const effectiveHourly =
    driverActionStatus === "accepted"
      ? baseHourly + foodBoost + parcelBoost
      : Math.round(baseHourly * 0.78);

  const dailyNetTakeHome = effectiveHourly * shiftHours + sessionBonus;
  const baselineTakeHome = baseHourly * shiftHours;
  const dailyDelta = dailyNetTakeHome - baselineTakeHome;

  const deadMileRatio =
    driverActionStatus === "accepted" && coPilotActive
      ? isParcelOn && isFoodOn
        ? 9.4
        : isFoodOn || isParcelOn
        ? 14.2
        : 21.0
      : 27.5;

  // 10-point hourly curve for SVG Area Chart
  const chartData = [
    { hour: "08:00", base: 155, multi: 165, label: "Morning Commute Rush" },
    { hour: "09:30", base: 175, multi: 188, label: "Peak Office Commute" },
    { hour: "11:00", base: 115, multi: 156, label: "Mid-Morning Transition" },
    {
      hour: "12:30",
      base: 72,
      multi: 174,
      label: "Lunch Zero-Comm Food Surge",
    },
    {
      hour: "14:00",
      base: 65,
      multi: 160,
      label: "Off-Peak Trough Recovery",
    },
    {
      hour: "15:30",
      base: 68,
      multi: 152,
      label: "B2B Dark Store Restock",
    },
    { hour: "17:00", base: 135, multi: 176, label: "Pre-Evening Commute" },
    { hour: "18:30", base: 185, multi: 204, label: "Evening Rush Peak" },
    { hour: "20:00", base: 140, multi: 182, label: "Dinner Batching Start" },
    {
      hour: "21:30",
      base: 95,
      multi: 166,
      label: "Late-Night Food + Return",
    },
  ].map((pt) => {
    const scale =
      (vehicle === "4w" ? 1.75 : vehicle === "3w" ? 1.32 : 1.0) * presetMult;
    const bVal = Math.round(pt.base * scale);
    const activeFactor =
      driverActionStatus === "accepted" && coPilotActive
        ? (foodBatchEnabled ? 0.58 : 0) + (b2bParcelEnabled ? 0.42 : 0)
        : 0.1;
    const mVal = Math.round(
      bVal + (pt.multi - pt.base) * scale * activeFactor
    );
    return { ...pt, baseVal: bVal, multiVal: mVal };
  });

  const maxChartY = Math.max(...chartData.map((d) => d.multiVal)) * 1.15;
  const chartW = 640;
  const chartH = 185;
  const getX = (i: number) =>
    Math.round((i / (chartData.length - 1)) * (chartW - 40) + 20);
  const getY = (val: number) =>
    Math.round(chartH - (val / maxChartY) * (chartH - 30) - 15);
  const basePoints = chartData
    .map((d, i) => `${getX(i)},${getY(d.baseVal)}`)
    .join(" ");
  const multiPoints = chartData
    .map((d, i) => `${getX(i)},${getY(d.multiVal)}`)
    .join(" ");
  const multiAreaPath = `M ${getX(0)},${chartH - 15} L ${chartData
    .map((d, i) => `${getX(i)},${getY(d.multiVal)}`)
    .join(" L ")} L ${getX(chartData.length - 1)},${chartH - 15} Z`;

  // --- Calculations for SaaS Pass Engine ---
  const rideGross = dailyRides * avgRideFare;
  const foodGross = offPeakFoodDrops * 65;
  const totalGross = rideGross + foodGross;
  const m1Commission = Math.round(totalGross * 0.22);
  const m1Net = totalGross - m1Commission;
  const m2PassFee = 29;
  const m2Net = totalGross - m2PassFee;
  const rawFlexFee = Math.min(25, dailyRides * 3);
  const foodPassRebate = Math.min(rawFlexFee, offPeakFoodDrops * 8);
  const m3FinalFee = Math.max(0, rawFlexFee - foodPassRebate);
  const m3Net = totalGross - m3FinalFee;

  // --- Calculations for Enterprise ROI Calculator ---
  const activeCopilotDrivers = fleetDau * (adoptionPct / 100);
  const dailyLogisticsMarginInr =
    activeCopilotDrivers * offPeakFoodDrops * netMarginPerBatch;
  const annualLogisticsCr = (dailyLogisticsMarginInr * 365) / 10000000;
  const basePassPct = 62;
  const newPassPct = Math.min(
    92,
    Math.round(basePassPct + (adoptionPct / 38) * 14)
  );
  const basePassDrivers = Math.round(fleetDau * (basePassPct / 100));
  const newPassDrivers = Math.round(fleetDau * (newPassPct / 100));
  const deltaPassDrivers = newPassDrivers - basePassDrivers;
  const annualPassCr = (deltaPassDrivers * 18 * 365) / 10000000;
  const totalAnnualCr = annualLogisticsCr + annualPassCr;

  const formatVal = (valCr: number) =>
    currencyMode === "INR"
      ? `₹${valCr.toFixed(1)} Cr`
      : `$${(valCr * 1.18).toFixed(1)}M`;

  // Export Executive P&L CSV
  const handleExportCsv = () => {
    const rows = [
      ["OmniFleet Enterprise P&L Unit Economics Report"],
      ["Active Fleet DAU", fleetDau.toString()],
      ["Co-Pilot Adoption Rate (%)", `${adoptionPct}%`],
      ["Net B2B Tech Margin per Batch (INR)", `Rs ${netMarginPerBatch}`],
      ["Off-Peak Batches per Driver", offPeakFoodDrops.toString()],
      [],
      [
        "P&L Line Item",
        "Siloed Holdout",
        "With OmniFleet Active",
        "Annualized Net Lift",
      ],
      [
        "Off-Peak Food & B2B Logistics Tech Margin",
        "0",
        formatVal(annualLogisticsCr),
        `+${formatVal(annualLogisticsCr)}`,
      ],
      [
        "Retained Daily SaaS Pass Subscribers",
        `${basePassDrivers} DAU (${basePassPct}%)`,
        `${newPassDrivers} DAU (${newPassPct}%)`,
        `+${formatVal(annualPassCr)}`,
      ],
      [
        "TOTAL NET CONTRIBUTION MARGIN LIFT",
        "Holdout Baseline",
        "Multimodal Fleet OS",
        `+${formatVal(totalAnnualCr)}`,
      ],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `omnifleet_pnl_${fleetDau}_dau_${currencyMode.toLowerCase()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleApiJson = `{
  "dispatch_id": "dsp_h3_88618924bffffff",
  "corridor_preset": "${preset.toUpperCase()}",
  "driver_state": {
    "vehicle_type": "${vehicle.toUpperCase()}",
    "drop_hex": "88618924bffffff",
    "expected_commuter_wait_sec": 1560,
    "active_pass_tier": "FLEX_CAP_ZERO_UPFRONT"
  },
  "chained_vector_route": [
    { "hop": 1, "vertical": "FOOD_ZERO_COMM", "enabled": ${isFoodOn}, "pay_inr": ${
    isFoodOn ? activeHops.hop1.pay : 0
  }, "pass_rebate_inr": ${isFoodOn ? 8 : 0} },
    { "hop": 2, "vertical": "B2B_EXPRESS_PARCEL", "enabled": ${isParcelOn}, "pay_inr": ${
    isParcelOn ? activeHops.hop2.pay : 0
  }, "pass_rebate_inr": ${isParcelOn ? 8 : 0} },
    { "hop": 3, "vertical": "COMMUTER_SURGE_RIDE", "enabled": true, "pay_inr": ${
      activeHops.hop3.pay
    }, "pass_rebate_inr": 0 }
  ],
  "total_chain_payout_inr": ${dynamicChainPay},
  "net_dead_miles_saved_km": ${deadMileRatio < 15 ? 7.2 : 3.4},
  "commuter_eta_sla_delta_sec": 9.4
}`;

  const handleCopyApi = () => {
    try {
      navigator.clipboard.writeText(sampleApiJson);
    } catch {}
    setCopiedApi(true);
    setTimeout(() => setCopiedApi(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      {/* CLEAN INSTITUTIONAL TOP HEADER (UBER / STRIPE / LINEAR LIGHT STYLE) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              type="button"
              onClick={() => {
                setMainView("product");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 cursor-pointer text-left min-w-0"
            >
              <div className="w-7 h-7 shrink-0 rounded-md bg-zinc-950 flex items-center justify-center text-white font-bold text-xs">
                OF
              </div>
              <div className="min-w-0">
                <span className="font-bold text-base tracking-tight text-zinc-950">
                  OmniFleet
                </span>
                <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-zinc-500 border border-zinc-200 px-1.5 py-0.5 rounded bg-zinc-50">
                  v2.4
                </span>
              </div>
            </button>

            {/* Primary Mode Switcher (Interactive Product vs. Product Description PRD) */}
            <div className="inline-flex shrink-0 p-1 rounded-lg bg-zinc-100 border border-zinc-200/80">
              <button
                type="button"
                onClick={() => {
                  setMainView("product");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  mainView === "product"
                    ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/60"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Interactive Platform</span>
                <span className="sm:hidden">Platform</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMainView("prd");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  mainView === "prd"
                    ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/60"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">
                  Product Description (PRD)
                </span>
                <span className="sm:hidden">PRD</span>
              </button>
            </div>
          </div>

          {/* Section Links (when in Product View) */}
          {mainView === "product" ? (
            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-zinc-600">
              <button
                type="button"
                onClick={() => scrollToSection("leak")}
                className="hover:text-zinc-950 transition cursor-pointer"
              >
                Problem &amp; Data
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="hover:text-zinc-950 transition cursor-pointer"
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("copilot")}
                className="hover:text-zinc-950 transition cursor-pointer"
              >
                Dispatch Console
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("saas")}
                className="hover:text-zinc-950 transition cursor-pointer"
              >
                Pass Rebate Model
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("proof")}
                className="hover:text-zinc-950 transition cursor-pointer"
              >
                P&amp;L Calculator
              </button>
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span>Author: Abhinav Thakur</span>
              <span>•</span>
              <span>Document: PRD-2026-OF</span>
            </div>
          )}

          {/* Right CTA — the mode switcher already covers this on phones. */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {mainView === "product" ? (
              <button
                type="button"
                onClick={() => {
                  setMainView("prd");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                Read Product Spec
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMainView("product");
                  setTimeout(() => scrollToSection("copilot"), 50);
                }}
                className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                Open Live Console <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          VIEW 2: DEDICATED PRODUCT DESCRIPTION & EXECUTIVE PRD DOCUMENT VIEW
         ===================================================================== */}
      {mainView === "prd" && (
        <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Sticky Sidebar Table of Contents (3 Cols) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  PRODUCT SPECIFICATION
                </div>
                <div className="text-sm font-bold text-zinc-950 mt-1">
                  OmniFleet Dispatch &amp; Pass OS
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  By Abhinav Thakur
                </div>
              </div>

              <nav className="space-y-1 text-xs border-t border-zinc-200 pt-4">
                {[
                  { id: "summary", label: "1. Executive Summary" },
                  { id: "problem", label: "2. Problem & Market Data" },
                  { id: "personas", label: "3. User Research & Personas" },
                  { id: "architecture", label: "4. Spatial Routing Math" },
                  { id: "pricing", label: "5. Flex-Cap Pass Economics" },
                  { id: "metrics", label: "6. Metrics & SLA Guardrails" },
                  { id: "pitch", label: "7. Resume & Interview Brief" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToPrdSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${
                      activePrdSection === item.id
                        ? "bg-zinc-900 text-white font-semibold"
                        : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-950"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-zinc-200 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMainView("product");
                    setTimeout(() => scrollToSection("copilot"), 50);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-white border border-zinc-300 text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Test Interactive Console <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </aside>

            {/* Right Document Body (9 Cols) */}
            <div className="lg:col-span-9 space-y-12">
              {/* Document Header Banner */}
              <div className="border-b border-zinc-200 pb-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold">
                    PRD / TECHNICAL SPECIFICATION
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Applicable Platforms: Uber, Rapido, Ola, ONDC / Namma Yatri,
                    Grab
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                  OmniFleet: Multimodal Return-Vector Dispatch &amp;
                  Zero-Upfront Subscription Pass Infrastructure
                </h1>
                <p className="text-base text-zinc-600 leading-relaxed">
                  An end-to-end product specification addressing the two largest
                  unit-economic leaks in high-frequency mobility: the{" "}
                  <strong className="text-zinc-950">
                    11 AM – 4 PM mid-day fleet utilization collapse (27.5% empty
                    dead miles)
                  </strong>{" "}
                  and{" "}
                  <strong className="text-zinc-950">
                    part-time driver dropout under flat upfront daily SaaS
                    subscription passes
                  </strong>
                  .
                </p>

                {/* Key Outcome Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="text-[11px] font-mono text-zinc-500">
                      MID-DAY EPH LIFT
                    </div>
                    <div className="text-2xl font-bold font-mono text-zinc-950 mt-1">
                      +38.4%
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      ₹72/hr → ₹174/hr lunch floor
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="text-[11px] font-mono text-zinc-500">
                      EMPTY DEAD MILES
                    </div>
                    <div className="text-2xl font-bold font-mono text-zinc-950 mt-1">
                      9.4%
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Down from 27.5% baseline
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="text-[11px] font-mono text-zinc-500">
                      PART-TIME PASS OPT-IN
                    </div>
                    <div className="text-2xl font-bold font-mono text-zinc-950 mt-1">
                      81.0%
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Up from 24% flat-pass baseline
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <div className="text-[11px] font-mono text-zinc-500">
                      ANNUAL EBITDA LIFT
                    </div>
                    <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                      +₹222.4 Cr
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Across 450k active fleet DAU
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 1: Executive Summary */}
              <section id="prd-summary" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  1. Executive Summary &amp; Strategic Context
                </h2>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Mobility platforms in India and emerging markets (
                  <strong className="text-zinc-950">
                    Rapido, Uber, Ola, Namma Yatri / ONDC
                  </strong>
                  ) are undergoing two structural business model transitions:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700 leading-relaxed pl-1">
                  <li>
                    <strong className="text-zinc-950">
                      Transition from Take-Rate Commissions to Daily SaaS
                      Subscription Passes:
                    </strong>{" "}
                    To prevent driver multi-homing and compete with open-network
                    protocols, platforms charge a flat daily access pass
                    (₹19–₹29/day) allowing drivers to keep 100% of passenger
                    fares.
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Expansion into Zero-Commission Restaurant Delivery &amp;
                      Hyperlocal Parcel Logistics:
                    </strong>{" "}
                    Platforms are onboarding neighborhood restaurants onto
                    zero-commission B2B delivery models (e.g., Rapido{" "}
                    <em>Ownly</em>, Uber <em>Eats / Direct</em>, ONDC retail
                    nodes) where merchants pay a flat B2B tech &amp; fulfillment
                    fee rather than a 28% aggregator cut.
                  </li>
                </ol>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Despite owning both supply and demand across these verticals,
                  platforms currently operate them in{" "}
                  <strong className="text-zinc-950">
                    isolated dispatch silos
                  </strong>
                  . OmniFleet bridges this gap by turning empty suburban
                  ride drops between 11 AM and 4 PM into directional 3-hop
                  return chains—and using a share of the merchant B2B tech fee
                  to rebate the driver&apos;s daily SaaS subscription pass.
                </p>
              </section>

              {/* Section 2: Problem & Market Data */}
              <section id="prd-problem" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  2. Problem Discovery &amp; Marketplace Bottlenecks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <div className="text-xs font-mono font-bold text-zinc-950">
                      BOTTLENECK 01 • SPATIAL ASYMMETRY
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">
                      27.5% Suburban Dead-Mile Return
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Morning commuter demand flows one-way from residential
                      zones into outer IT parks (Whitefield, Gachibowli,
                      Electronic City). After 11:00 AM, outbound commuter demand
                      from those parks drops 65%, forcing drivers to wait 26+
                      minutes or ride 7.2 km empty back toward the CBD.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <div className="text-xs font-mono font-bold text-zinc-950">
                      BOTTLENECK 02 • PRICING FRICTION
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">
                      76% Part-Timer Pass Rejection
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      42% of urban 2W/3W supply consists of part-time evening or
                      student drivers completing 4–5 trips/day. Charging a flat
                      ₹29 upfront pass before their first ride creates high
                      sunk-cost anxiety, causing 76% of part-timers to skip pass
                      purchase or go offline.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <div className="text-xs font-mono font-bold text-zinc-950">
                      BOTTLENECK 03 • SILOED FLEETS
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">
                      12:30 PM Lunch Fleet Deficit
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Zero-commission restaurant partners experience peak order
                      volume between 12:00 PM and 2:30 PM—the exact window when
                      commuter ride drivers sit idle 400m away because ride and
                      delivery dispatchers do not share spatial state.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Ground-Truth User Research */}
              <section id="prd-personas" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  3. Ground-Truth User Research &amp; Personas
                </h2>
                <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-mono uppercase">
                      <tr>
                        <th className="p-3.5">Cohort / Persona</th>
                        <th className="p-3.5">Daily Pattern</th>
                        <th className="p-3.5">Core Pain Point Observed</th>
                        <th className="p-3.5">OmniFleet Value Proposition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="p-3.5 font-semibold text-zinc-950">
                          Full-Time 2W/3W Captain
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          10–12 hrs/day, 16–20 trips
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          Loses ₹45/day in empty petrol returning from outer IT
                          parks between 11:30 AM and 3:30 PM; EPH drops to
                          ₹68/hr.
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-emerald-700">
                          Directional 3-hop chain lifts mid-day EPH to ₹162/hr.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-zinc-950">
                          Part-Time Evening Rider
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          3.5–5 hrs/day, 4–6 trips
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          Refuses to pay ₹29 upfront pass fee because unexpected
                          rain or low demand makes flat passes unprofitable.
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-emerald-700">
                          ₹0 upfront (₹3/ride cap) + ₹8 rebate per food batch.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-zinc-950">
                          Zero-Comm Restaurant Partner
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          120–300 lunch orders/day
                        </td>
                        <td className="p-3.5 text-zinc-600">
                          High lunch delivery delays (40+ min ETA) due to
                          dedicated food rider shortage at 12:30 PM.
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-emerald-700">
                          24.2 min batch SLA via idle ride captains within 500m.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: System Architecture & Spatial Routing Math */}
              <section id="prd-architecture" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  4. System Architecture &amp; Spatial Routing Formulation
                </h2>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  OmniFleet executes a 3-stage decision pipeline whenever a
                  driver completes a commuter drop in an H3 Level-8 hexagon
                  (
                  <code className="font-mono text-xs bg-zinc-100 border border-zinc-200 rounded px-1 py-0.5">
                    ~0.74 km²
                  </code>
                  ):
                </p>
                <div className="p-5 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-xs space-y-2">
                  <div className="text-zinc-400">
                    // Multi-Hop Candidate Utility Objective Function
                  </div>
                  <div className="text-white font-semibold text-sm">
                    Score(Chain_i) = 0.45 · EPH_Lift(Chain_i) + 0.30 ·
                    cos(θ_CBD) - 0.15 · Dead_Miles_Km + 0.10 · Pass_Rebate_INR
                  </div>
                  <div className="text-zinc-400 pt-2">
                    Subject to Hard Operational Constraints:
                  </div>
                  <div>
                    1. Expected Commuter Queue Wait: E[Wait_Commuter] &gt; 720
                    seconds
                  </div>
                  <div>
                    2. Directional Cosine Alignment: cos(θ_CBD) &ge; 0.65
                    (strictly toward high-liquidity surge hex)
                  </div>
                  <div>
                    3. First-Mile Merchant Pickup Detour: &le; 500 meters from
                    passenger drop coordinate
                  </div>
                  <div>
                    4. Package Form Factor (2W): Sealed sub-3.5 km batches
                    requiring zero bulky rear thermal box
                  </div>
                </div>
              </section>

              {/* Section 5: Flex-Cap Pass Economics */}
              <section id="prd-pricing" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  5. Cross-Vertical SaaS Pass Rebate Mechanics
                </h2>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Instead of charging a flat ₹29 upfront fee, OmniFleet
                  introduces the{" "}
                  <strong className="text-zinc-950">Flex-Cap Pass</strong>:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                  <li>
                    <strong>₹0 Upfront Entry:</strong> Drivers start their shift
                    at ₹0 upfront cost, accruing a micro-fee of{" "}
                    <strong>₹3 per completed commuter ride</strong>, hard-capped
                    at <strong>₹25/day</strong>.
                  </li>
                  <li>
                    <strong>₹8 Instant Pass Rebate per Off-Peak Batch:</strong>{" "}
                    Each zero-commission restaurant or B2B parcel batch pays the
                    platform a flat <strong>₹14 B2B merchant tech fee</strong>.
                    OmniFleet allocates <strong>₹8</strong> directly as a credit
                    against the driver&apos;s accrued daily pass fee and retains{" "}
                    <strong>₹6</strong> as net platform contribution margin.
                  </li>
                  <li>
                    <strong>100% Free Ride Pass After 3 Drops:</strong> A driver
                    who completes 3 off-peak food/parcel drops earns{" "}
                    <code>3 × ₹8 = ₹24</code> in rebates—reducing their daily
                    pass cost to virtually <strong>₹0</strong>.
                  </li>
                </ul>
              </section>

              {/* Section 6: North Star Metrics & Guardrails */}
              <section id="prd-metrics" className="space-y-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-zinc-950 border-b border-zinc-200 pb-2">
                  6. North Star Metrics, SLA Guardrails &amp; Switchback
                  Evaluation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                    <div className="font-mono font-bold text-zinc-950">
                      PRIMARY SUCCESS METRICS
                    </div>
                    <p className="text-zinc-600">
                      • <strong>Mid-Day Driver EPH (11 AM–4 PM):</strong>{" "}
                      +38.4% blended shift increase.
                    </p>
                    <p className="text-zinc-600">
                      • <strong>Empty Dead-Mile Ratio:</strong> Reduced from
                      27.5% to 9.4%.
                    </p>
                    <p className="text-zinc-600">
                      • <strong>7-Day SaaS Pass Renewal Rate:</strong> Lifted
                      from 62% to 76% (+14 pts).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                    <div className="font-mono font-bold text-zinc-950">
                      COUNTER-METRICS &amp; SLA CIRCUIT BREAKERS
                    </div>
                    <p className="text-zinc-600">
                      • <strong>Commuter Pickup ETA Delta:</strong> Must remain{" "}
                      <code>&lt; +18 seconds</code> vs holdout. Auto-throttles
                      food chaining to 0% if commuter surge exceeds 1.2x.
                    </p>
                    <p className="text-zinc-600">
                      • <strong>Causal Validation:</strong> H3 Level-7 spatial
                      cluster × 2-hour switchback holdout design.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7: Copy-Ready Resume & Interview Summary */}
              <section id="prd-pitch" className="space-y-4 scroll-mt-24">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-2">
                  <h2 className="text-xl font-bold text-zinc-950">
                    7. Resume &amp; Interview Executive Summary
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      const summaryText = `OmniFleet — Multimodal Spatial Dispatch & Zero-Commission Fleet Recovery OS (Product Management Project by Abhinav Thakur)
• Problem: Ride-hailing fleets (Uber, Rapido, ONDC) lose 27.5% of driven km to empty dead miles after suburban drops, while driver hourly earnings drop 62% during the 11 AM–4 PM off-peak trough and part-time drivers (<6 rides/day) churn due to flat upfront daily SaaS pass fees (₹19–₹29).
• Solution: Designed an H3 Level-8 spatial dispatch engine that chains Zero-Commission Restaurant Batches (Ownly / Uber Eats) and B2B Express Parcels along a cosine-filtered directional vector (cos θ >= 0.65) back toward downtown commuter surge, paired with a ₹0-Upfront Flex-Cap Pass (₹3/ride capped at ₹25 minus ₹8 B2B merchant tech fee rebate per off-peak batch).
• Quantified Impact: Lifts mid-day driver EPH by +38.4%, cuts empty dead miles from 27.5% to 9.4%, boosts part-time pass opt-in from 24% to 81%, and generates +₹222.4 Cr ($262M) in annualized net EBITDA lift across 450k fleet DAU.`;
                      try {
                        navigator.clipboard.writeText(summaryText);
                      } catch {}
                      setCopiedPitch(true);
                      setTimeout(() => setCopiedPitch(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedPitch ? "Copied!" : "Copy Summary Bullet Points"}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <p>
                    <strong className="text-zinc-950">
                      • Problem Discovery:
                    </strong>{" "}
                    Ride-hailing fleets (Uber, Rapido, ONDC) lose{" "}
                    <strong>27.5% of driven kilometers</strong> to empty dead
                    miles after suburban drops, while driver hourly earnings
                    drop <strong>62% between 11 AM and 4 PM</strong> and
                    part-time drivers (&lt;6 rides/day) reject flat upfront
                    daily SaaS subscription passes (₹19–₹29).
                  </p>
                  <p>
                    <strong className="text-zinc-950">
                      • Product Architecture:
                    </strong>{" "}
                    Built an H3 Level-8 spatial dispatch engine that chains{" "}
                    <strong>Zero-Commission Restaurant Batches</strong> and{" "}
                    <strong>B2B Express Parcels</strong> along a cosine-filtered
                    directional vector (<code>cos θ &ge; 0.65</code>) back
                    toward downtown commuter surge, paired with a{" "}
                    <strong>₹0-Upfront Flex-Cap Pass</strong> (₹3/ride capped at
                    ₹25 minus ₹8 B2B merchant tech fee rebate per off-peak
                    batch).
                  </p>
                  <p>
                    <strong className="text-zinc-950">
                      • Business Impact:
                    </strong>{" "}
                    Increases blended driver EPH by <strong>+38.4%</strong>,
                    reduces empty dead miles from{" "}
                    <strong>27.5% to 9.4%</strong>, lifts part-time pass
                    conversion from <strong>24% to 81%</strong>, and unlocks{" "}
                    <strong>+₹222.4 Cr ($262.4M)</strong> in annualized net
                    EBITDA across 450,000 active fleet drivers.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          VIEW 1: CLEAN DAYLIGHT-FIRST ENTERPRISE PLATFORM & DISPATCH CONSOLE
         ===================================================================== */}
      {mainView === "product" && (
        <main>
          {/* SECTION 1: CLEAN EXECUTIVE HERO */}
          <section className="py-16 md:py-24 border-b border-zinc-200 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Hero Copy (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700">
                  <span>MULTIMODAL DISPATCH &amp; PASS INFRASTRUCTURE</span>
                  <span>•</span>
                  <span className="font-semibold text-zinc-950">
                    UBER / RAPIDO / ONDC
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.03em] leading-[1.08] text-zinc-950">
                  Recover the 11 AM – 4 PM dead-mile trough across your fleet.
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
                  Mobility fleets lose{" "}
                  <strong className="text-zinc-950 font-semibold">
                    27.5% of driven kilometers
                  </strong>{" "}
                  to empty returns after suburban drops, while mid-day driver
                  earnings fall{" "}
                  <strong className="text-zinc-950 font-semibold">62%</strong>.
                  OmniFleet intercepts outer-corridor drops and chains{" "}
                  <strong className="text-zinc-950 font-semibold">
                    Zero-Commission Restaurant Batches
                  </strong>{" "}
                  and{" "}
                  <strong className="text-zinc-950 font-semibold">
                    B2B Express Parcels
                  </strong>{" "}
                  along a directional vector back to downtown commuter
                  demand—while rebating the driver&apos;s daily subscription
                  pass to <strong className="text-zinc-950">₹0</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection("copilot")}
                    className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition cursor-pointer"
                  >
                    Open Dispatch Console <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMainView("prd");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-semibold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-zinc-600" />
                    View Product Description (PRD)
                  </button>
                </div>

                {/* Clean Institutional Metrics Strip */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-950 tabular-nums">
                      +38.4%
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Mid-Day Driver EPH Lift
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-950 tabular-nums">
                      9.4%
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Empty Dead-Mile Ratio (vs 27.5%)
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700 tabular-nums">
                      {formatVal(totalAnnualCr)}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Annualized Net EBITDA Lift
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Hero Summary Card (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3.5">
                    <div>
                      <div className="text-xs font-mono font-semibold text-zinc-900">
                        LIVE ROUTE CHAIN TELEMETRY
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        Cluster: Bengaluru East (H3 Res-8)
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Active Holdout Verified
                    </span>
                  </div>

                  {/* Platform Switcher inside Hero Card */}
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase mb-1.5">
                      Platform Architecture Preset
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-zinc-200/70 p-1 rounded-lg">
                      {(
                        [
                          { id: "zerocomm", label: "Rapido + Ownly" },
                          { id: "superapp", label: "Uber + Eats" },
                          { id: "opennet", label: "ONDC Grid" },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => handlePresetSwitch(tab.id)}
                          className={`py-1.5 px-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                            preset === tab.id
                              ? "bg-white text-zinc-950 shadow-sm"
                              : "text-zinc-600 hover:text-zinc-950"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active 3-Hop Chain Summary */}
                  <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-950">
                        {activeHops.chainTitle}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        +₹{dynamicChainPay} Chain
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">
                      Drop Zone: {activeHops.dropZone}
                    </div>

                    <div className="space-y-2 pt-1">
                      <div
                        className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200/80 ${
                          !isFoodOn ? "opacity-40" : ""
                        }`}
                      >
                        <span className="font-medium text-zinc-800">
                          1. {activeHops.hop1.title.split("→")[0]}
                        </span>
                        <span className="font-mono font-semibold text-zinc-950">
                          {isFoodOn ? `+₹${activeHops.hop1.pay}` : "OFF"}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200/80 ${
                          !isParcelOn ? "opacity-40" : ""
                        }`}
                      >
                        <span className="font-medium text-zinc-800">
                          2. {activeHops.hop2.title.split("→")[0]}
                        </span>
                        <span className="font-mono font-semibold text-zinc-950">
                          {isParcelOn ? `+₹${activeHops.hop2.pay}` : "OFF"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200/80">
                        <span className="font-medium text-zinc-800">
                          3. {activeHops.hop3.title.split("→")[0]}
                        </span>
                        <span className="font-mono font-semibold text-zinc-950">
                          +₹{activeHops.hop3.pay}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white border border-zinc-200">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        SUBSCRIPTION PASS
                      </div>
                      <div className="font-semibold text-zinc-950 mt-0.5">
                        {activeHops.passBadge}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-zinc-200">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        COMMUTER ETA GUARDRAIL
                      </div>
                      <div className="font-semibold text-zinc-950 font-mono mt-0.5">
                        +9.4s (&lt;18s SLA)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THE MARKETPLACE BOTTLENECK */}
          <section
            id="leak"
            className="py-20 bg-zinc-50 border-b border-zinc-200 scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                  01 • PROBLEM DIAGNOSIS &amp; FIELD DATA
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                  Why drivers churn between 11 AM &amp; 4 PM—and why flat passes
                  alienate part-time supply.
                </h2>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Operating commuter rides, food delivery, and B2B parcels in
                  disconnected dispatch queues creates three compounding
                  unit-economic failures:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-zinc-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-zinc-500">
                      BOTTLENECK 01
                    </span>
                    <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      27.5% Empty KM
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">
                    Suburban Return Dead-Miles
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    A driver drops a morning commuter at an outer tech park
                    (Whitefield, Gachibowli) at 11:15 AM. With zero outbound
                    commuter demand, they wait 30+ minutes or burn ₹45 of fuel
                    riding 7.2 km empty back toward the city center.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-zinc-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-zinc-500">
                      BOTTLENECK 02
                    </span>
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      76% Part-Timer Drop
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">
                    Upfront Subscription Sunk-Cost Risk
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Zero-commission daily passes (₹19–₹29/day) work well for
                    full-time 12-hour drivers. But part-time evening drivers
                    completing 4–5 rides refuse to pay an upfront fee when rain
                    or traffic can wipe out their net take-home pay.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-zinc-200 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-zinc-500">
                      BOTTLENECK 03
                    </span>
                    <span className="font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                      3 Siloed Queues
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">
                    Unmatched Mid-Day Lunch Peak
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    At 12:30 PM, zero-commission restaurant partners (Ownly /
                    Uber Eats) face acute delivery fleet shortages while
                    hundreds of ride captains sit idle 400m away because ride
                    dispatchers cannot chain food drops into return routes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SYSTEM ARCHITECTURE & API SPECIFICATION */}
          <section
            id="how-it-works"
            className="py-20 bg-white border-b border-zinc-200 scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                  02 • SYSTEM ARCHITECTURE &amp; ROUTING ENGINE
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                  Detect. Chain. Rebate. Verify.
                </h2>
                <p className="text-base text-zinc-600 leading-relaxed">
                  OmniFleet sits as a spatial routing and ledger middleware
                  between your commuter ride matcher, zero-commission restaurant
                  order book, and driver pass wallet.
                </p>
              </div>

              {/* Interactive Specification Console */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden">
                <div className="px-6 py-4 bg-white border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono font-semibold text-zinc-900">
                    TECHNICAL SPECIFICATION &amp; PAYLOAD INSPECTOR
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(
                      [
                        { id: "trigger", label: "1. H3 Trigger Condition" },
                        { id: "scoring", label: "2. Vector Scoring Formula" },
                        { id: "webhook", label: "3. Dispatch Webhook JSON" },
                        { id: "switchback", label: "4. SLA Guardrails" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setArchTab(tab.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition cursor-pointer ${
                          archTab === tab.id
                            ? "bg-zinc-950 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 border border-zinc-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {archTab === "trigger" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 space-y-2">
                        <h4 className="text-lg font-bold text-zinc-950">
                          Suburban H3 Level-8 Dead-Zone Interceptor
                        </h4>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          Every 5 seconds, OmniFleet evaluates real-time supply
                          and demand across H3 Level-8 cells (
                          <code className="font-mono text-zinc-950 font-semibold">
                            ~0.74 km²
                          </code>
                          ). When
                          a driver drops a passenger in a cell where{" "}
                          <code className="font-mono text-zinc-950 font-semibold">
                            E[Wait_Commuter] &gt; 720s
                          </code>{" "}
                          between 11:00 and 16:00, the engine suppresses empty
                          repositioning and constructs a 3-hop return chain.
                        </p>
                      </div>
                      <div className="md:col-span-5 bg-zinc-950 text-zinc-100 rounded-lg p-4 font-mono text-xs space-y-1.5">
                        <div className="text-zinc-400">
                          // H3 INTERCEPT CONDITION
                        </div>
                        <div>
                          IF (h3_cell.wait_sec &gt; 720) AND (hour IN [11..16])
                        </div>
                        <div>AND (commuter_surge_prob &lt; 0.18)</div>
                        <div className="text-emerald-400 font-semibold">
                          → TRIGGER: MULTIMODAL_VECTOR_CHAIN()
                        </div>
                      </div>
                    </div>
                  )}

                  {archTab === "scoring" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 space-y-2">
                        <h4 className="text-lg font-bold text-zinc-950">
                          Cosine-Similarity Directional Objective Function
                        </h4>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          Candidate food and parcel hops are filtered using a
                          directional cosine constraint (
                          <code className="font-mono text-zinc-950 font-semibold">
                            cos(θ_CBD) &ge; 0.65
                          </code>
                          ) anchored toward the nearest high-demand downtown
                          commuter surge corridor.
                        </p>
                      </div>
                      <div className="md:col-span-5 bg-zinc-950 text-zinc-100 rounded-lg p-4 font-mono text-xs space-y-1.5">
                        <div className="text-zinc-400">
                          // CHAIN UTILITY SCORE
                        </div>
                        <div>
                          Score(C) = 0.45·EPH_Lift + 0.30·cos(θ_CBD) -
                          0.15·Dead_Km + 0.10·Pass_Rebate
                        </div>
                      </div>
                    </div>
                  )}

                  {archTab === "webhook" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500">
                          POST /v1/dispatch/chain-offer
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyApi}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-950 text-white text-xs font-mono cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedApi ? "Copied!" : "Copy Payload"}
                        </button>
                      </div>
                      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                        {sampleApiJson}
                      </pre>
                    </div>
                  )}

                  {archTab === "switchback" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1">
                        <div className="font-mono font-bold text-zinc-950">
                          GUARDRAIL 01 • COMMUTER SLA
                        </div>
                        <p className="text-zinc-600">
                          Commuter pickup ETA delta must remain{" "}
                          <strong>&lt; +18 seconds</strong>. Cross-dispatch
                          throttles to 0% if ride surge exceeds 1.2x.
                        </p>
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1">
                        <div className="font-mono font-bold text-zinc-950">
                          GUARDRAIL 02 • SPILL-SAFE RADIUS
                        </div>
                        <p className="text-zinc-600">
                          2W commuter bikes without rear thermal trunks are
                          matched exclusively to sealed batches{" "}
                          <strong>&le; 3.5 km</strong>.
                        </p>
                      </div>
                      <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-1">
                        <div className="font-mono font-bold text-zinc-950">
                          GUARDRAIL 03 • SWITCHBACK DESIGN
                        </div>
                        <p className="text-zinc-600">
                          Evaluated across paired suburban corridors in{" "}
                          <strong>2-hour H3 switchback blocks</strong> to
                          prevent network interference.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: INTERACTIVE MULTIMODAL DISPATCH CONSOLE */}
          <section
            id="copilot"
            className="py-20 bg-zinc-50 border-b border-zinc-200 scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    03 • INTERACTIVE DISPATCH CONSOLE
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                    Fleet &amp; Driver Return-Chain Telemetry
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 max-w-2xl">
                    Configure platform architecture, vehicle type, shift hours,
                    and vertical pooling below to inspect real-time route
                    chaining and hourly earnings impact:
                  </p>
                </div>

                {/* Platform Switcher */}
                <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 border border-zinc-300/80 self-start">
                  {(
                    [
                      { id: "zerocomm", label: "Rapido (Rides + Ownly)" },
                      { id: "superapp", label: "Uber (Rides + Eats)" },
                      { id: "opennet", label: "ONDC Open Network" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSwitch(p.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        preset === p.id
                          ? "bg-white text-zinc-950 shadow-sm"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Cols: Controls + 24-Hr Chart */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-950">
                          Fleet Configuration
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Active Profile: <strong>{activeHops.brandTag}</strong>
                        </p>
                      </div>

                      <div className="inline-flex p-1 bg-zinc-100 rounded-lg border border-zinc-200">
                        {(
                          [
                            { id: "2w", label: "2W Bike" },
                            { id: "3w", label: "3W Auto" },
                            { id: "4w", label: "4W Cab" },
                          ] as const
                        ).map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setVehicle(v.id)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                              vehicle === v.id
                                ? "bg-zinc-950 text-white"
                                : "text-zinc-600 hover:text-zinc-950"
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shift Duration Slider */}
                    <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                      <div className="flex justify-between text-xs font-mono mb-2">
                        <span className="text-zinc-600">
                          DRIVER SHIFT DURATION:
                        </span>
                        <strong className="text-zinc-950">
                          {shiftHours} Hours / Day (
                          {shiftHours <= 5
                            ? "Part-Time Cohort"
                            : "Full-Time Cohort"}
                          )
                        </strong>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={12}
                        step={1}
                        value={shiftHours}
                        onChange={(e) => setShiftHours(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* 3 Toggle Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setCoPilotActive(!coPilotActive)}
                        className={`p-3.5 rounded-lg border text-left transition cursor-pointer ${
                          coPilotActive
                            ? "bg-zinc-950 border-zinc-950 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">
                            H3 Return Routing
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              coPilotActive ? "bg-emerald-400" : "bg-zinc-300"
                            }`}
                          />
                        </div>
                        <p className="text-[11px] opacity-80 mt-1 font-mono">
                          {coPilotActive
                            ? `On (${deadMileRatio}% dead km)`
                            : "Off (27.5% dead km)"}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!coPilotActive) setCoPilotActive(true);
                          setFoodBatchEnabled(!foodBatchEnabled);
                        }}
                        className={`p-3.5 rounded-lg border text-left transition cursor-pointer ${
                          isFoodOn
                            ? "bg-zinc-950 border-zinc-950 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">
                            Zero-Comm Food
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isFoodOn ? "bg-emerald-400" : "bg-zinc-300"
                            }`}
                          />
                        </div>
                        <p className="text-[11px] opacity-80 mt-1 font-mono">
                          {isFoodOn ? `On (+₹${foodBoost}/hr)` : "Disabled"}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!coPilotActive) setCoPilotActive(true);
                          setB2bParcelEnabled(!b2bParcelEnabled);
                        }}
                        className={`p-3.5 rounded-lg border text-left transition cursor-pointer ${
                          isParcelOn
                            ? "bg-zinc-950 border-zinc-950 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">
                            B2B Express Parcel
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isParcelOn ? "bg-emerald-400" : "bg-zinc-300"
                            }`}
                          />
                        </div>
                        <p className="text-[11px] opacity-80 mt-1 font-mono">
                          {isParcelOn ? `On (+₹${parcelBoost}/hr)` : "Disabled"}
                        </p>
                      </button>
                    </div>

                    {/* KPI Readout Strip */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200">
                      <div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          NET DAILY TAKE-HOME
                        </div>
                        <div className="text-2xl font-bold font-mono text-zinc-950 mt-0.5 tabular-nums">
                          ₹{dailyNetTakeHome.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-mono font-medium">
                          {dailyDelta >= 0
                            ? `+₹${dailyDelta} vs Holdout`
                            : "Siloed Mode"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          BLENDED HOURLY RATE
                        </div>
                        <div className="text-2xl font-bold font-mono text-zinc-950 mt-0.5 tabular-nums">
                          ₹{effectiveHourly}/hr
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          {driverActionStatus === "accepted" && coPilotActive
                            ? "Mid-Day Trough Recovered"
                            : "Baseline Queue"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          EMPTY DEAD-MILE %
                        </div>
                        <div className="text-2xl font-bold font-mono text-zinc-950 mt-0.5 tabular-nums">
                          {deadMileRatio}%
                        </div>
                        <div className="text-[11px] text-emerald-700 font-mono font-medium">
                          {deadMileRatio < 15
                            ? "Optimal Vector Chain"
                            : "High Empty Return"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 24-Hour SVG Earnings Curve Card */}
                  <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-950">
                          24-Hour Hourly Earnings Curve (Siloed Holdout vs.
                          OmniFleet)
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Hover over any daypart node to inspect 11 AM – 4 PM
                          earnings recovery
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="flex items-center gap-1.5 text-zinc-500">
                          <span className="w-3 h-0.5 border-t border-dashed border-zinc-400 inline-block" />
                          Holdout Baseline
                        </span>
                        <span className="flex items-center gap-1.5 text-zinc-950 font-semibold">
                          <span className="w-3 h-2 bg-zinc-950 inline-block rounded-sm" />
                          OmniFleet Active
                        </span>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <svg
                        viewBox={`0 0 ${chartW} ${chartH}`}
                        className="w-full h-48 overflow-visible"
                      >
                        <defs>
                          <linearGradient
                            id="cleanAreaGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#18181B"
                              stopOpacity="0.12"
                            />
                            <stop
                              offset="100%"
                              stopColor="#18181B"
                              stopOpacity="0.0"
                            />
                          </linearGradient>
                        </defs>

                        {[0.25, 0.5, 0.75].map((ratio, idx) => {
                          const y = Math.round(
                            chartH - ratio * (chartH - 30) - 15
                          );
                          const val = Math.round(ratio * maxChartY);
                          return (
                            <g key={idx}>
                              <line
                                x1="20"
                                y1={y}
                                x2={chartW - 20}
                                y2={y}
                                stroke="#E4E4E7"
                                strokeWidth="1"
                              />
                              <text
                                x="18"
                                y={y - 4}
                                fontSize="9"
                                fill="#71717A"
                                fontFamily="monospace"
                              >
                                ₹{val}/h
                              </text>
                            </g>
                          );
                        })}

                        <path d={multiAreaPath} fill="url(#cleanAreaGrad)" />
                        <polyline
                          fill="none"
                          stroke="#A1A1AA"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                          points={basePoints}
                        />
                        <polyline
                          fill="none"
                          stroke="#09090B"
                          strokeWidth="2.5"
                          points={multiPoints}
                        />

                        {chartData.map((d, i) => {
                          const cx = getX(i);
                          const cyMulti = getY(d.multiVal);
                          const cyBase = getY(d.baseVal);
                          const isHovered = hoveredHour === i;
                          return (
                            <g
                              key={i}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredHour(i)}
                              onMouseLeave={() => setHoveredHour(null)}
                            >
                              {isHovered && (
                                <line
                                  x1={cx}
                                  y1={10}
                                  x2={cx}
                                  y2={chartH - 15}
                                  stroke="#09090B"
                                  strokeWidth="1"
                                  strokeDasharray="2 2"
                                />
                              )}
                              <circle
                                cx={cx}
                                cy={cyBase}
                                r={isHovered ? 4 : 2.5}
                                fill="#A1A1AA"
                              />
                              <circle
                                cx={cx}
                                cy={cyMulti}
                                r={isHovered ? 5.5 : 3.5}
                                fill="#09090B"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                              />
                              <text
                                x={cx}
                                y={chartH - 2}
                                textAnchor="middle"
                                fontSize="9.5"
                                fill={isHovered ? "#09090B" : "#71717A"}
                                fontWeight={isHovered ? "bold" : "normal"}
                                fontFamily="monospace"
                              >
                                {d.hour}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                        {hoveredHour !== null ? (
                          <>
                            <div>
                              <span className="font-bold text-zinc-950 mr-2">
                                {chartData[hoveredHour].hour}
                              </span>
                              <span className="text-zinc-600">
                                {chartData[hoveredHour].label}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-zinc-500">
                                Holdout: ₹{chartData[hoveredHour].baseVal}/hr
                              </span>
                              <span className="text-emerald-700 font-bold">
                                OmniFleet: ₹{chartData[hoveredHour].multiVal}/hr
                                (+₹
                                {chartData[hoveredHour].multiVal -
                                  chartData[hoveredHour].baseVal}
                                /hr)
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-zinc-600">
                            <strong>12:30 PM Mid-Day Trough Recovery:</strong>{" "}
                            Holdout baseline drops to ₹{chartData[3].baseVal}
                            /hr, while OmniFleet maintains{" "}
                            <strong className="text-zinc-950">
                              ₹{chartData[3].multiVal}/hr
                            </strong>{" "}
                            via directional food &amp; B2B batches.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Driver Dispatch Card & Vector Route Map */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
                      <div>
                        <span className="text-xs font-mono font-bold text-zinc-950 block">
                          DRIVER CO-PILOT ROUTE DISPATCH
                        </span>
                        <span className="text-xs text-zinc-500">
                          {activeHops.passBadge}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-white border border-zinc-200 text-zinc-800">
                        {driverActionStatus === "accepted" && coPilotActive
                          ? "0.2 km Dead Miles"
                          : "7.2 km Dead Miles"}
                      </span>
                    </div>

                    {/* Clean Vector Map */}
                    <div className="relative h-52 bg-zinc-950 border-b border-zinc-200">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 420 200"
                        fill="none"
                      >
                        <rect width="420" height="200" fill="#09090B" />
                        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.2">
                          <polygon points="60,20 100,20 120,55 100,90 60,90 40,55" />
                          <polygon points="160,20 200,20 220,55 200,90 160,90 140,55" />
                          <polygon points="260,20 300,20 320,55 300,90 260,90 240,55" />
                          <polygon points="110,105 150,105 170,140 150,175 110,175 90,140" />
                          <polygon points="210,105 250,105 270,140 250,175 210,175 190,140" />
                        </g>

                        {driverActionStatus === "accepted" && coPilotActive ? (
                          <path
                            d={activeSvgRoutePath}
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeDasharray="7 5"
                            className="animate-route-flow"
                          />
                        ) : (
                          <path
                            d="M55 155 L 365 45"
                            stroke="#EF4444"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                          />
                        )}

                        <circle
                          cx="55"
                          cy="155"
                          r="5.5"
                          fill="#FFFFFF"
                          stroke="#09090B"
                          strokeWidth="2"
                        />
                        <circle
                          cx="155"
                          cy="75"
                          r="5.5"
                          fill={isFoodOn ? "#F59E0B" : "#52525B"}
                          stroke="#09090B"
                          strokeWidth="2"
                        />
                        <circle
                          cx="265"
                          cy="115"
                          r="5.5"
                          fill={isParcelOn ? "#38BDF8" : "#52525B"}
                          stroke="#09090B"
                          strokeWidth="2"
                        />
                        <circle
                          cx="365"
                          cy="45"
                          r="6.5"
                          fill="#10B981"
                          stroke="#09090B"
                          strokeWidth="2"
                        />

                        <text
                          x="35"
                          y="175"
                          fontSize="9"
                          fill="#A1A1AA"
                          fontFamily="monospace"
                        >
                          Drop Hex
                        </text>
                        <text
                          x="130"
                          y="62"
                          fontSize="9"
                          fill="#FBBF24"
                          fontFamily="monospace"
                        >
                          Hop 1: Food
                        </text>
                        <text
                          x="240"
                          y="134"
                          fontSize="9"
                          fill="#38BDF8"
                          fontFamily="monospace"
                        >
                          Hop 2: B2B
                        </text>
                        <text
                          x="325"
                          y="32"
                          fontSize="9"
                          fill="#34D399"
                          fontFamily="monospace"
                        >
                          CBD Surge
                        </text>
                      </svg>

                      <div className="absolute top-3 left-3 bg-zinc-900/95 border border-zinc-700 px-2.5 py-1 rounded text-[11px] font-mono text-zinc-200">
                        {activeHops.dropZone}
                      </div>

                      {sessionBonus > 0 && (
                        <div className="absolute bottom-3 right-3 bg-white text-zinc-950 px-2.5 py-1 rounded font-mono text-xs font-bold shadow">
                          Session Wallet: +₹{sessionBonus}
                        </div>
                      )}
                    </div>

                    {/* 3 Route Hops List */}
                    <div className="p-5 space-y-4">
                      <div className="space-y-2.5 text-xs">
                        <div
                          className={`p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between ${
                            !isFoodOn ? "opacity-40" : ""
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold text-zinc-500 block">
                              {activeHops.hop1.tag} ({activeHops.hop1.eta})
                            </span>
                            <div className="font-semibold text-zinc-950 mt-0.5">
                              {activeHops.hop1.title}
                            </div>
                          </div>
                          <span className="font-mono font-bold text-zinc-950 text-sm">
                            {isFoodOn ? `+₹${activeHops.hop1.pay}` : "OFF"}
                          </span>
                        </div>

                        <div
                          className={`p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between ${
                            !isParcelOn ? "opacity-40" : ""
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-mono font-semibold text-zinc-500 block">
                              {activeHops.hop2.tag} ({activeHops.hop2.eta})
                            </span>
                            <div className="font-semibold text-zinc-950 mt-0.5">
                              {activeHops.hop2.title}
                            </div>
                          </div>
                          <span className="font-mono font-bold text-zinc-950 text-sm">
                            {isParcelOn ? `+₹${activeHops.hop2.pay}` : "OFF"}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-semibold text-zinc-500 block">
                              {activeHops.hop3.tag} ({activeHops.hop3.eta})
                            </span>
                            <div className="font-semibold text-zinc-950 mt-0.5">
                              {activeHops.hop3.title}
                            </div>
                          </div>
                          <span className="font-mono font-bold text-zinc-950 text-sm">
                            +₹{activeHops.hop3.pay}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setDriverActionStatus("accepted");
                            setCoPilotActive(true);
                            setSessionBonus((prev) => prev + dynamicChainPay);
                          }}
                          className={`py-2.5 px-4 rounded-lg font-semibold text-xs transition cursor-pointer ${
                            driverActionStatus === "accepted"
                              ? "bg-zinc-950 text-white"
                              : "bg-zinc-100 text-zinc-900 border border-zinc-300 hover:bg-zinc-950 hover:text-white"
                          }`}
                        >
                          Accept Chain (+₹{dynamicChainPay})
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDriverActionStatus("declined");
                            setSessionBonus(0);
                          }}
                          className={`py-2.5 px-4 rounded-lg font-semibold text-xs transition cursor-pointer ${
                            driverActionStatus === "declined"
                              ? "bg-red-600 text-white"
                              : "bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950"
                          }`}
                        >
                          Decline (Empty Return)
                        </button>
                      </div>

                      {driverActionStatus === "accepted" ? (
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono flex items-center justify-between">
                          <span>
                            Route Active: 7.2 empty km saved + ₹8 pass rebate
                            applied.
                          </span>
                          {sessionBonus > 0 && (
                            <button
                              type="button"
                              onClick={() => setSessionBonus(0)}
                              className="underline text-[10px] ml-2"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 font-mono">
                          Holdout State: 26 min empty wait or 7.2 km uncompensated
                          return.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: SAAS PASS REBATE ENGINE */}
          <section
            id="saas"
            className="py-20 bg-white border-b border-zinc-200 scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                  04 • SUBSCRIPTION PASS ECONOMICS
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                  Zero upfront risk for part-timers. 100% pass rebate when they
                  deliver lunch.
                </h2>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Drivers pay{" "}
                  <strong className="text-zinc-950">
                    ₹0 upfront (₹3/ride capped at ₹25)
                  </strong>{" "}
                  and earn an{" "}
                  <strong className="text-zinc-950">
                    ₹8 instant pass rebate
                  </strong>{" "}
                  for every off-peak food or B2B parcel batch completed (funded
                  by merchant B2B tech fees).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-5">
                  <h3 className="text-sm font-bold text-zinc-950 border-b border-zinc-200 pb-3">
                    Driver Daily Volume Parameters
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1.5">
                        <span>Daily Commuter Rides</span>
                        <span className="font-mono font-bold text-zinc-950">
                          {dailyRides} Rides
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={dailyRides}
                        onChange={(e) => setDailyRides(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1.5">
                        <span>Average Commuter Fare</span>
                        <span className="font-mono font-bold text-zinc-950">
                          ₹{avgRideFare}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={220}
                        step={5}
                        value={avgRideFare}
                        onChange={(e) => setAvgRideFare(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1.5">
                        <span>Off-Peak Food / Parcel Batches (12–4 PM)</span>
                        <span className="font-mono font-bold text-emerald-700">
                          {offPeakFoodDrops} Batches (-₹{offPeakFoodDrops * 8}{" "}
                          Rebate)
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={6}
                        value={offPeakFoodDrops}
                        onChange={(e) =>
                          setOffPeakFoodDrops(Number(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                        Legacy Model
                      </span>
                      <h4 className="text-lg font-bold text-zinc-950 mt-2.5">
                        22% Commission
                      </h4>
                      <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-zinc-600">
                          <span>Gross Fare:</span>
                          <span>₹{totalGross}</span>
                        </div>
                        <div className="flex justify-between text-red-700 font-semibold">
                          <span>Platform Cut:</span>
                          <span>-₹{m1Commission}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-100">
                      <div className="text-[10px] font-mono uppercase text-zinc-500">
                        Driver Net Take-Home
                      </div>
                      <div className="text-2xl font-bold font-mono text-zinc-950 mt-0.5">
                        ₹{m1Net}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                        Standard Pass
                      </span>
                      <h4 className="text-lg font-bold text-zinc-950 mt-2.5">
                        Flat ₹29 Pass
                      </h4>
                      <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-zinc-600">
                          <span>Gross Fare:</span>
                          <span>₹{totalGross}</span>
                        </div>
                        <div className="flex justify-between text-zinc-800 font-semibold">
                          <span>Upfront Pass:</span>
                          <span>-₹{m2PassFee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-100">
                      <div className="text-[10px] font-mono uppercase text-zinc-500">
                        Driver Net Take-Home
                      </div>
                      <div className="text-2xl font-bold font-mono text-zinc-950 mt-0.5">
                        ₹{m2Net}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950 text-white rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                        OmniFleet Model
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2.5">
                        Flex-Cap + Rebate
                      </h4>
                      <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Base Flex Fee:</span>
                          <span>₹{rawFlexFee}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>Food Rebate:</span>
                          <span>-₹{foodPassRebate}</span>
                        </div>
                        <div className="flex justify-between text-white font-bold border-t border-zinc-800 pt-1">
                          <span>Net Pass Paid:</span>
                          <span>₹{m3FinalFee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-3 border-t border-zinc-800">
                      <div className="text-[10px] font-mono uppercase text-zinc-400">
                        Driver Net Take-Home
                      </div>
                      <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                        ₹{m3Net}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        +₹{m3Net - m1Net} vs Commission
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: ENTERPRISE P&L & EBITDA CALCULATOR */}
          <section id="proof" className="py-20 bg-zinc-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    05 • EXECUTIVE P&amp;L UNIT ECONOMICS MODEL
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                    Annualized EBITDA impact across your fleet.
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex p-1 rounded-lg bg-zinc-200/80 border border-zinc-300/80">
                    <button
                      type="button"
                      onClick={() => setCurrencyMode("INR")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition cursor-pointer ${
                        currencyMode === "INR"
                          ? "bg-white text-zinc-950 shadow-sm"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      ₹ INR Crores
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrencyMode("USD")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition cursor-pointer ${
                        currencyMode === "USD"
                          ? "bg-white text-zinc-950 shadow-sm"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      $ USD Millions
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono font-semibold transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export P&amp;L (.CSV)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-xl p-6 space-y-5 shadow-sm">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-600">ACTIVE FLEET DAU:</span>
                      <strong className="text-zinc-950">
                        {fleetDau.toLocaleString("en-IN")} Drivers
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={50000}
                      value={fleetDau}
                      onChange={(e) => setFleetDau(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-600">CO-PILOT ADOPTION:</span>
                      <strong className="text-zinc-950">{adoptionPct}%</strong>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      step={2}
                      value={adoptionPct}
                      onChange={(e) => setAdoptionPct(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-600">
                        NET B2B TECH MARGIN / ORDER:
                      </span>
                      <strong className="text-zinc-950">
                        ₹{netMarginPerBatch} / batch
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={25}
                      value={netMarginPerBatch}
                      onChange={(e) =>
                        setNetMarginPerBatch(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase">
                        <tr>
                          <th className="p-4">P&amp;L Line Item</th>
                          <th className="p-4">Siloed Holdout</th>
                          <th className="p-4">With OmniFleet</th>
                          <th className="p-4">Net Annualized Lift</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        <tr>
                          <td className="p-4 font-sans font-semibold text-zinc-950">
                            Off-Peak Food &amp; B2B Logistics Tech Margin
                          </td>
                          <td className="p-4 text-zinc-500">
                            ₹0 Cr (Unutilized)
                          </td>
                          <td className="p-4 text-zinc-950 font-bold">
                            {formatVal(annualLogisticsCr)} / yr
                          </td>
                          <td className="p-4 text-emerald-700 font-bold">
                            +{formatVal(annualLogisticsCr)} / yr
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 font-sans font-semibold text-zinc-950">
                            Retained Daily SaaS Pass Subscribers
                          </td>
                          <td className="p-4 text-zinc-500">
                            {basePassDrivers.toLocaleString("en-IN")} DAU (
                            {basePassPct}%)
                          </td>
                          <td className="p-4 text-zinc-950 font-bold">
                            {newPassDrivers.toLocaleString("en-IN")} DAU (
                            {newPassPct}%)
                          </td>
                          <td className="p-4 text-emerald-700 font-bold">
                            +{formatVal(annualPassCr)} / yr
                          </td>
                        </tr>
                        <tr className="bg-zinc-950 text-white">
                          <td className="p-4 font-sans font-bold">
                            TOTAL NET CONTRIBUTION MARGIN LIFT
                          </td>
                          <td className="p-4 text-zinc-400">Holdout Baseline</td>
                          <td className="p-4 font-semibold">
                            Multimodal Fleet OS
                          </td>
                          <td className="p-4 text-base font-bold text-emerald-400">
                            +{formatVal(totalAnnualCr)} / yr
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* CLEAN INSTITUTIONAL FOOTER */}
      <footer className="bg-white text-zinc-500 py-12 border-t border-zinc-200 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-zinc-950 flex items-center justify-center text-white font-bold text-[10px]">
              OF
            </div>
            <span className="font-bold text-zinc-950">OmniFleet</span>
            <span>
              • Multimodal Spatial Dispatch &amp; Subscription Pass
              Infrastructure • By{" "}
              <strong className="text-zinc-950">Abhinav Thakur</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setMainView("prd");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="underline hover:text-zinc-950 cursor-pointer"
            >
              Product Specification (PRD)
            </button>
            <span>•</span>
            <span className="font-mono text-[11px]">
              H3 Spatial Routing • Switchback Verified
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
