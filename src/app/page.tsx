"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Terminal,
  Navigation,
  Layers,
  Zap,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Clock,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Building2,
  Route,
} from "lucide-react";

type PlatformPreset = "zerocomm" | "superapp" | "opennet";
type ArchTab = "trigger" | "scoring" | "webhook" | "switchback";

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<string>("leak");
  const [archTab, setArchTab] = useState<ArchTab>("trigger");
  const [copiedApi, setCopiedApi] = useState<boolean>(false);

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

  // Automatic Scroll-Spy to highlight active section in floating pill navbar
  useEffect(() => {
    const sectionIds = ["leak", "how-it-works", "copilot", "saas", "proof"];
    const handleScroll = () => {
      if (window.scrollY < 350) {
        setActiveNav("");
        return;
      }
      const scrollPos = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sectionIds[i]);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper with sticky header offset
  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 105;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
      brandTag: "Rapido 2W + Ownly Zero-Commission Food",
      dropZone: "Whitefield IT Park (Empty Wait: 26m)",
      chainTitle: "Rapido Captain + Ownly Food Chain",
      passBadge: "₹19 Daily Pass • 100% Rebated",
      hop1: {
        tag: "HOP 1 • OWNLY ZERO-COMM FOOD BATCH",
        title: "Meghana Biryani Hub → 2 Lunch Drops (3.1 km)",
        pay: 75,
        eta: "14 mins",
      },
      hop2: {
        tag: "HOP 2 • RAPIDO LOCAL B2B PARCEL",
        title: "Apollo Pharmacy Express → Indiranagar Clinic",
        pay: 45,
        eta: "9 mins",
      },
      hop3: {
        tag: "HOP 3 • PRE-MATCHED COMMUTER RIDE",
        title: "Indiranagar Metro → MG Road CBD Surge",
        pay: 65,
        eta: "12 mins",
      },
    },
    superapp: {
      brandTag: "Uber 4W + Uber Eats + Uber Direct",
      dropZone: "Outer Airport Tech Corridor (Empty Wait: 22m)",
      chainTitle: "Uber Driver + Eats + Direct Chain",
      passBadge: "Quest + Eats Surge Boost",
      hop1: {
        tag: "HOP 1 • UBER EATS PRIORITY BATCH",
        title: "Truffles Cloud Kitchen → 2 Corporate Drops",
        pay: 110,
        eta: "16 mins",
      },
      hop2: {
        tag: "HOP 2 • UBER DIRECT EXPRESS B2B",
        title: "Reliance Smart Dark Store → Downtown Retail",
        pay: 85,
        eta: "11 mins",
      },
      hop3: {
        tag: "HOP 3 • UBER GO / PREMIER COMMUTER",
        title: "Financial District → Central Railway Hub",
        pay: 165,
        eta: "18 mins",
      },
    },
    opennet: {
      brandTag: "ONDC / Namma Yatri Open Mobility Grid",
      dropZone: "Electronic City Phase II (Empty Wait: 28m)",
      chainTitle: "ONDC Open Grid 0%-Commission Chain",
      passBadge: "₹0 Upfront • Direct UPI Settlement",
      hop1: {
        tag: "HOP 1 • ONDC DIRECT RESTAURANT ORDER",
        title: "Empire Restaurant → HSR Layout Sector 2",
        pay: 70,
        eta: "15 mins",
      },
      hop2: {
        tag: "HOP 2 • ONDC HYPERLOCAL KIRANA DROP",
        title: "Organic Mandya Store → Koramangala 4th Block",
        pay: 50,
        eta: "10 mins",
      },
      hop3: {
        tag: "HOP 3 • NAMMA YATRI DIRECT AUTO RIDE",
        title: "Sony World Signal → Trinity Metro CBD",
        pay: 95,
        eta: "14 mins",
      },
    },
  };

  const activeHops = presetHopsData[preset];

  // Dynamic total chain pay based on enabled toggles
  const isFoodOn = coPilotActive && foodBatchEnabled;
  const isParcelOn = coPilotActive && b2bParcelEnabled;

  const dynamicChainPay =
    (isFoodOn ? activeHops.hop1.pay : 0) +
    (isParcelOn ? activeHops.hop2.pay : 0) +
    activeHops.hop3.pay;

  // Dynamic SVG path for the H3 Vector Map based on enabled hops
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
      label: "Off-Peak Trough Eliminated",
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

  // --- Calculations for Enterprise ROI Calculator (Dynamic with all sliders) ---
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

  // Sample Dispatch Webhook Payload
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(sampleApiJson);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = sampleApiJson;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedApi(true);
      setTimeout(() => setCopiedApi(false), 2000);
    } catch {
      setCopiedApi(true);
      setTimeout(() => setCopiedApi(false), 2000);
    }
  };

  const tickerItems = [
    {
      badge: "27.5% DEAD MILES",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      text: "Eliminated via directional suburban-to-CBD return chaining",
    },
    {
      badge: "11 AM – 4 PM SLUMP",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      text: "65% commuter drop filled by zero-commission lunch batches",
    },
    {
      badge: "₹0 UPFRONT PASS",
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      text: "Part-time driver opt-in jumps from 24% to 81%",
    },
    {
      badge: "100% REBATED",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      text: "₹8 merchant B2B tech fee credit per off-peak food drop",
    },
    {
      badge: "+₹222.4 CR EBITDA",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      text: "Verified via H3 Level-8 Hex-Time Switchback holdouts",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 relative selection:bg-indigo-500 selection:text-white">
      {/* FLOATING FAANG GLASS PILL NAVBAR (LINEAR / VERCEL / STRIPE STYLE) */}
      <header className="sticky top-0 z-50 pt-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#0B0F1C]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#06080F] rounded-[7px] flex items-center justify-center">
                <Navigation className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  OmniFleet
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  OS v2.4
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-400 font-mono">
                Multimodal Spatial Dispatch &amp; Pass Infrastructure
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            {[
              { id: "leak", label: "The Bottleneck" },
              { id: "how-it-works", label: "Architecture" },
              { id: "copilot", label: "Dispatch Console" },
              { id: "saas", label: "Pass Rebate Engine" },
              { id: "proof", label: "EBITDA Proof" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeNav === item.id
                    ? "bg-indigo-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection("proof")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition cursor-pointer"
            >
              ROI Calculator
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("copilot")}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Launch Console <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Quick-Jump Bar */}
        <div className="flex lg:hidden max-w-7xl mx-auto mt-2 rounded-xl bg-[#0B0F1C]/90 backdrop-blur-md border border-white/[0.06] items-center gap-3 px-4 py-2 overflow-x-auto text-[11px] font-mono whitespace-nowrap">
          {[
            { id: "leak", label: "01. Bottleneck" },
            { id: "how-it-works", label: "02. Architecture" },
            { id: "copilot", label: "03. Dispatch Console" },
            { id: "saas", label: "04. Pass Rebate" },
            { id: "proof", label: "05. EBITDA ROI" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${
                activeNav === item.id
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-slate-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* SECTION 1: FAANG ENTERPRISE HERO */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-dark">
        {/* Radial Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-[650px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] -z-10" />
        <div className="pointer-events-none absolute top-32 right-10 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-medium text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Multimodal Spatial Dispatch • Built for Uber, Rapido &amp; ONDC
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-extrabold tracking-[-0.035em] leading-[1.06] text-white">
              Eliminate the{" "}
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-indigo-400 bg-clip-text text-transparent">
                11 AM – 4 PM dead-mile trough
              </span>{" "}
              across your fleet.
            </h1>

            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              Mobility fleets lose{" "}
              <strong className="text-white font-semibold">
                27.5% of driven kilometers
              </strong>{" "}
              to empty suburban returns while driver hourly earnings collapse{" "}
              <strong className="text-white font-semibold">62% mid-day</strong>.
              OmniFleet intercepts outer-zone drops and chains{" "}
              <strong className="text-emerald-400 font-semibold">
                Zero-Commission Food Batches
              </strong>{" "}
              and{" "}
              <strong className="text-sky-400 font-semibold">
                B2B Express Parcels
              </strong>{" "}
              along a directional vector back to downtown commuter surge—while
              rebating the driver&apos;s daily SaaS subscription pass to{" "}
              <strong className="text-white font-semibold">₹0</strong>.
            </p>

            {/* Primary & Secondary FAANG CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection("copilot")}
                className="bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] flex items-center gap-2 transition-all cursor-pointer"
              >
                Open Live Dispatch Console <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("saas")}
                className="bg-[#111728] hover:bg-[#172036] text-slate-200 border border-white/10 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Explore ₹0-Upfront Pass Engine
              </button>
            </div>

            {/* Instant KPI Proof Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
                  +38.4%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Mid-Day Driver EPH Lift
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400 tracking-tight">
                  9.4%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Empty Dead-Mile Ratio (vs 27.5%)
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  {formatVal(totalAnnualCr)}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Annualized Net EBITDA Lift
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: macOS / Stripe-Style Interactive Telemetry Window (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0D1322]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
              {/* Window Chrome Bar */}
              <div className="px-4 py-3 bg-[#090D18] border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400">
                    omnifleet.cloud / cluster-blr-east
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE H3 STREAM
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Interactive Preset Pill Switcher Inside Hero */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    SELECT PLATFORM ARCHITECTURE PROFILE
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-[#070A12] p-1 rounded-xl border border-white/[0.06]">
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
                        className={`py-2 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          preset === tab.id
                            ? "bg-indigo-600 text-white shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Route Vector Summary */}
                <div className="p-4 rounded-xl bg-[#080B14] border border-white/[0.07] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      {activeHops.chainTitle}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      +₹{dynamicChainPay} Chain
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Intercepted at:{" "}
                    <strong className="text-amber-300">
                      {activeHops.dropZone}
                    </strong>
                  </div>

                  {/* 3-Step Visual Chain Progress */}
                  <div className="space-y-2 pt-1">
                    <div
                      className={`flex items-center justify-between text-xs bg-white/[0.02] px-3 py-2 rounded-lg border border-white/[0.05] ${
                        !isFoodOn ? "opacity-45" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        {activeHops.hop1.title.split("→")[0]}
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {isFoodOn ? `+₹${activeHops.hop1.pay}` : "OFF"}
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-between text-xs bg-white/[0.02] px-3 py-2 rounded-lg border border-white/[0.05] ${
                        !isParcelOn ? "opacity-45" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        {activeHops.hop2.title.split("→")[0]}
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {isParcelOn ? `+₹${activeHops.hop2.pay}` : "OFF"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-white/[0.02] px-3 py-2 rounded-lg border border-white/[0.05]">
                      <span className="flex items-center gap-2 text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        {activeHops.hop3.title.split("→")[0]}
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        +₹{activeHops.hop3.pay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Telemetry Footer */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      DAILY PASS STATUS
                    </div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      {activeHops.passBadge}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      COMMUTER PICKUP SLA
                    </div>
                    <div className="text-sm font-bold text-indigo-300 font-mono mt-0.5">
                      +9.4s (&lt;18s Guardrail)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SLEEK GLASSMORPHIC INFINITE TELEMETRY MARQUEE */}
      <div className="border-y border-white/[0.07] bg-[#090D18] py-3.5 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 text-xs font-medium whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span
                className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold border ${item.color}`}
              >
                {item.badge}
              </span>
              <span className="text-slate-300">{item.text}</span>
              <span className="text-slate-600 ml-3">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: "THE BOTTLENECK" — CRISP STRIPE / APPLE LIGHT-MODE BENTO SECTION (#F8FAFC) */}
      <section
        id="leak"
        className="bg-[#F8FAFC] text-slate-900 py-24 border-b border-slate-200/80 scroll-mt-20 bg-grid-light"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-mono font-semibold uppercase tracking-wider">
              01 • THE STRUCTURAL MARKETPLACE BOTTLENECK
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-950 leading-[1.1]">
              Why drivers churn between 11 AM &amp; 4 PM—and why flat passes fail
              part-timers.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Mobility platforms treat commuter ride-hailing, food delivery, and
              B2B parcels as isolated dispatch queues. That architectural silo
              creates three compounding unit-economic failures:
            </p>
          </div>

          {/* 3 Stripe-Grade Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
                    FAILURE MODE 01
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-600">
                    27.5% Empty KM
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  The Suburban Dead-Mile Trap
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A driver drops a morning commuter at an outer IT corridor
                  (Whitefield, Gachibowli, Cybercity) at 11:15 AM. With zero
                  inbound commuter demand, they wait 30+ minutes or burn ₹45 of
                  fuel riding 7.2 km empty back toward the city center.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>11:30 AM SUBURBAN DROP UTILIZATION</span>
                  <span className="text-rose-600 font-bold">38% Productive</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-indigo-600 h-full w-[38%]" />
                  <div className="bg-rose-500 h-full w-[62%]" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>■ Paid Trip (38%)</span>
                  <span className="text-rose-600">■ Empty Return / Idle (62%)</span>
                </div>
              </div>
            </div>

            {/* Bento 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    FAILURE MODE 02
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600">
                    76% Part-Timer Drop
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Upfront SaaS Pass Sunk-Cost Risk
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Zero-commission daily passes (₹19–₹29/day) work well for
                  12-hour full-timers. But part-time evening captains or
                  students completing 4–5 rides refuse to pay an upfront daily
                  fee when rain or traffic can wipe out their margin.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>PART-TIME PASS CONVERSION (&lt;6 RIDES)</span>
                  <span className="text-emerald-600 font-bold">
                    24% → 81% Lift
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-slate-500">Flat ₹29 Pass:</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full w-[24%]" />
                    </div>
                    <span className="text-slate-700 font-bold">24%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-indigo-600 font-semibold">
                      Flex-Cap ₹0:
                    </span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[81%]" />
                    </div>
                    <span className="text-indigo-600 font-bold">81%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200">
                    FAILURE MODE 03
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600">
                    3 Siloed Queues
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Multi-App Switching &amp; Supply Waste
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  At 12:30 PM, zero-commission restaurant partners (Ownly / Uber
                  Eats) face severe delivery fleet shortages while thousands of
                  ride captains sit idle 400 meters away because dispatchers
                  cannot chain food drops into ride return vectors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="text-[11px] font-mono text-slate-500 uppercase">
                  CROSS-VERTICAL LIQUIDITY MATCH
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <div className="text-slate-400 text-[10px]">NEW FLEET CAC</div>
                    <div className="font-bold text-emerald-600">₹0 (Re-used)</div>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <div className="text-slate-400 text-[10px]">BATCH SLA</div>
                    <div className="font-bold text-slate-900">24.2 mins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ground-Truth Field Telemetry Cohorts */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                  GROUND-TRUTH DRIVER &amp; MERCHANT TELEMETRY COHORTS
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">
                  Measured impact across 3 production fleet personas
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
                Verified via 15% H3 Hex-Time Switchback Holdout
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-amber-400">
                  COHORT A • FULL-TIME 2W CAPTAIN (10H SHIFT)
                </div>
                <p className="text-sm text-slate-300 italic">
                  &ldquo;After dropping a passenger in Whitefield at 11:30 AM,
                  getting 2 Meghana lunch drops + a pharmacy parcel on my exact
                  way back to Indiranagar saves ₹45 in empty petrol.&rdquo;
                </p>
                <div className="text-xs font-mono text-emerald-400 pt-1">
                  Mid-Day EPH: ₹68/hr → <strong>₹162/hr (+138%)</strong>
                </div>
              </div>

              <div className="space-y-2 md:border-l md:border-slate-800 md:pl-6">
                <div className="text-xs font-mono font-semibold text-sky-400">
                  COHORT B • PART-TIME EVENING RIDER (4H SHIFT)
                </div>
                <p className="text-sm text-slate-300 italic">
                  &ldquo;I never bought the ₹29 upfront daily pass because some
                  evenings I only take 4 rides. Paying ₹0 upfront and getting ₹8
                  off per food batch makes the pass risk-free.&rdquo;
                </p>
                <div className="text-xs font-mono text-emerald-400 pt-1">
                  7-Day Pass Retention: 48% → <strong>79% (+31 pts)</strong>
                </div>
              </div>

              <div className="space-y-2 md:border-l md:border-slate-800 md:pl-6">
                <div className="text-xs font-mono font-semibold text-emerald-400">
                  COHORT C • ZERO-COMMISSION RESTAURANT HUB
                </div>
                <p className="text-sm text-slate-300 italic">
                  &ldquo;We pay a flat ₹14 B2B tech fee instead of 28% aggregator
                  commissions, and OmniFleet taps idle ride captains sitting
                  300m away during the 12:30 PM lunch rush.&rdquo;
                </p>
                <div className="text-xs font-mono text-emerald-400 pt-1">
                  Merchant Cost per Order: 28% → <strong>6.4% Flat Fee</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: "HOW IT WORKS" — LINEAR-STYLE ARCHITECTURE + LIVE API CONSOLE */}
      <section
        id="how-it-works"
        className="bg-[#06080F] text-slate-100 py-24 border-b border-white/[0.08] scroll-mt-20 bg-grid-dark"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
              02 • SYSTEM ARCHITECTURE &amp; DISPATCH ENGINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
              Detect. Chain. Rebate. Verify.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              OmniFleet operates as a low-latency spatial middleware between
              your commuter ride-hailing matcher, zero-commission food order
              book, and driver subscription wallet.
            </p>
          </div>

          {/* 3 Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#0D1322] border border-white/[0.08] p-6 space-y-4 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-white">
                H3 Dead-Zone Detection
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When a driver completes a drop in an outer suburban H3 Level-8
                hexagon (`~0.74 km²`) between 11 AM and 4 PM, OmniFleet checks{" "}
                <code className="text-indigo-300 font-mono">
                  E[Wait_Commuter]
                </code>
                . If expected idle wait exceeds 12 minutes, cross-vertical
                chaining triggers automatically.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0D1322] border border-white/[0.08] p-6 space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-white">
                Cosine-Vector 3-Hop Routing
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Instead of random food dispatches, the solver filters nearby
                zero-commission restaurants and B2B parcels using a directional
                cosine constraint (<code className="text-emerald-300 font-mono">cos(θ) ≥ 0.65</code>)
                anchored toward downtown commuter surge hexes.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0D1322] border border-white/[0.08] p-6 space-y-4 hover:border-sky-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-xl font-bold text-white">
                Automated Pass Fee Rebate
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Each completed off-peak food or B2B parcel batch allocates ₹8
                from the ₹14 merchant B2B tech fee directly to rebate the
                driver&apos;s daily SaaS pass—making their daily ride pass 100%
                free after 3 off-peak drops.
              </p>
            </div>
          </div>

          {/* Interactive Developer & Mathematical Spec Console */}
          <div className="rounded-2xl bg-[#0B0F1C] border border-white/[0.09] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#080B14] border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400">
                <Terminal className="w-4 h-4" />
                DISPATCH ENGINE SPECIFICATION &amp; API INSPECTOR
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: "trigger", label: "1. H3 Trigger Logic" },
                    { id: "scoring", label: "2. Vector Scoring Math" },
                    { id: "webhook", label: "3. Dispatch Webhook JSON" },
                    { id: "switchback", label: "4. SLA Guardrails" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setArchTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                      archTab === tab.id
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]"
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
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="text-xl font-bold text-white">
                      Suburban H3 Level-8 Liquidity Interceptor
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Every 5 seconds, OmniFleet evaluates real-time supply-demand
                      imbalance across H3 Level-8 cells. When a driver drops a
                      commuter in a cell where{" "}
                      <code className="text-indigo-300 font-mono">
                        E[Wait_Commuter] &gt; 720s
                      </code>{" "}
                      and{" "}
                      <code className="text-emerald-300 font-mono">
                        Merchant_Batch_Queue &ge; 2
                      </code>
                      , the engine suppresses empty repositioning and dispatches
                      a multi-hop directional chain.
                    </p>
                  </div>
                  <div className="md:col-span-5 bg-[#06080F] border border-white/[0.08] rounded-xl p-4 font-mono text-xs space-y-2">
                    <div className="text-indigo-400 font-semibold">
                      // H3 INTERCEPT CONDITION
                    </div>
                    <div className="text-slate-300">
                      IF (h3_cell.wait_sec &gt; 720) AND (hour IN [11..16])
                    </div>
                    <div className="text-slate-300">
                      AND (commuter_surge_prob &lt; 0.18)
                    </div>
                    <div className="text-emerald-400 font-bold">
                      → DISPATCH: MULTIMODAL_VECTOR_CHAIN()
                    </div>
                  </div>
                </div>
              )}

              {archTab === "scoring" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="text-xl font-bold text-white">
                      Cosine-Similarity Directional Objective Function
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Drivers reject food orders that send them deeper into rural
                      peripheries. OmniFleet scores candidate chains using a
                      strict directional cosine filter (`cos(θ) ≥ 0.65`)
                      aligned with the vector from the suburban drop hex to the
                      nearest high-demand CBD commuter corridor.
                    </p>
                  </div>
                  <div className="md:col-span-5 bg-[#06080F] border border-white/[0.08] rounded-xl p-4 font-mono text-xs space-y-2">
                    <div className="text-emerald-400 font-semibold">
                      // CHAIN UTILITY SCORE
                    </div>
                    <div className="text-white">
                      Score(C) = 0.45·EPH_Lift + 0.30·cos(θ_CBD) -
                      0.15·Dead_Km + 0.10·Pass_Rebate
                    </div>
                    <div className="text-slate-400 text-[11px] pt-1">
                      Hard Constraint: First pickup ≤ 500m; sealed packages ≤
                      3.5 km (no bulky thermal trunk required).
                    </div>
                  </div>
                </div>
              )}

              {archTab === "webhook" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      POST /v1/dispatch/chain-offer • Live Payload Preview
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyApi}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedApi ? "Copied JSON!" : "Copy JSON Payload"}
                    </button>
                  </div>
                  <pre className="bg-[#06080F] border border-white/[0.08] rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {sampleApiJson}
                  </pre>
                </div>
              )}

              {archTab === "switchback" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#06080F] border border-white/[0.08] rounded-xl p-4 space-y-1.5">
                    <div className="font-mono font-bold text-indigo-400">
                      GUARDRAIL 01 • COMMUTER PICKUP SLA
                    </div>
                    <div className="font-bold text-white text-sm">
                      Max Pickup ETA Delta &lt; +18 sec
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      If passenger ride demand spikes inside an H3 hex,
                      cross-vertical food/parcel chaining throttles to 0% within
                      30 seconds to protect core ride reliability.
                    </p>
                  </div>
                  <div className="bg-[#06080F] border border-white/[0.08] rounded-xl p-4 space-y-1.5">
                    <div className="font-mono font-bold text-emerald-400">
                      GUARDRAIL 02 • SPILL-SAFE RADIUS
                    </div>
                    <div className="font-bold text-white text-sm">
                      Strict ≤ 3.5 km Neighborhood Drop
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      2W commuter bikes without rear thermal boxes are matched
                      exclusively to sealed, sub-3.5 km lunch and pharmacy
                      parcels.
                    </p>
                  </div>
                  <div className="bg-[#06080F] border border-white/[0.08] rounded-xl p-4 space-y-1.5">
                    <div className="font-mono font-bold text-sky-400">
                      GUARDRAIL 03 • CAUSAL EVALUATION
                    </div>
                    <div className="font-bold text-white text-sm">
                      H3 Cluster × 2-Hr Switchback
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Measured across paired suburban tech corridors (Whitefield
                      vs. Electronic City) in 2-hour switchback windows to
                      prevent network spillover bias.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "DISPATCH CONSOLE" — FLAGSHIP INTERACTIVE DISPATCH CONSOLE + DRIVER APP */}
      <section
        id="copilot"
        className="bg-[#090D18] text-slate-100 py-24 border-b border-white/[0.08] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                03 • INTERACTIVE MULTIMODAL DISPATCH CONSOLE
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
                Live Fleet &amp; Driver Co-Pilot Telemetry
              </h2>
              <p className="text-base text-slate-400 max-w-2xl">
                Switch between platform architectures, vehicle classes, and
                vertical pooling layers below to inspect real-time H3 route
                chaining and hourly earnings recovery:
              </p>
            </div>

            {/* Platform Preset Switcher */}
            <div className="bg-[#0D1322] p-1.5 rounded-xl border border-white/[0.08] flex flex-wrap gap-1.5 self-start">
              {(
                [
                  { id: "zerocomm", label: "Rapido (Rides + Ownly Food)" },
                  { id: "superapp", label: "Uber (Rides + Eats + Direct)" },
                  { id: "opennet", label: "ONDC Open Network" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetSwitch(p.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    preset === p.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Interactive Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Fleet Controls + 24-Hour SVG Earnings Curve */}
            <div className="lg:col-span-7 space-y-6">
              {/* Configuration Card */}
              <div className="bg-[#0D1322] border border-white/[0.08] rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Fleet &amp; Cross-Dispatch Configuration
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Active Profile:{" "}
                      <strong className="text-indigo-400">
                        {activeHops.brandTag}
                      </strong>
                    </p>
                  </div>

                  {/* Vehicle Segmented Pill */}
                  <div className="inline-flex p-1 bg-[#06080F] rounded-xl border border-white/[0.07]">
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
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          vehicle === v.id
                            ? "bg-indigo-600 text-white shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shift Duration Slider */}
                <div className="bg-[#06080F] border border-white/[0.07] rounded-xl p-4">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">
                      DRIVER DAILY SHIFT DURATION:
                    </span>
                    <strong className="text-indigo-400">
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

                {/* 3 Vertical Pooling Toggle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCoPilotActive(!coPilotActive)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      coPilotActive
                        ? "bg-indigo-500/10 border-indigo-500/50 text-white"
                        : "bg-[#06080F] border-white/[0.07] text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        H3 Return Routing
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          coPilotActive ? "bg-indigo-400" : "bg-slate-700"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      {coPilotActive
                        ? `Active (${deadMileRatio}% dead km)`
                        : "Off (27.5% dead km)"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!coPilotActive) setCoPilotActive(true);
                      setFoodBatchEnabled(!foodBatchEnabled);
                    }}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      foodBatchEnabled && coPilotActive
                        ? "bg-amber-500/10 border-amber-500/50 text-white"
                        : "bg-[#06080F] border-white/[0.07] text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        Zero-Comm Food
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          foodBatchEnabled && coPilotActive
                            ? "bg-amber-400"
                            : "bg-slate-700"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      {foodBatchEnabled && coPilotActive
                        ? `Active (+₹${foodBoost}/hr)`
                        : "Disabled"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!coPilotActive) setCoPilotActive(true);
                      setB2bParcelEnabled(!b2bParcelEnabled);
                    }}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      b2bParcelEnabled && coPilotActive
                        ? "bg-sky-500/10 border-sky-500/50 text-white"
                        : "bg-[#06080F] border-white/[0.07] text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        B2B Express Parcel
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          b2bParcelEnabled && coPilotActive
                            ? "bg-sky-400"
                            : "bg-slate-700"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      {b2bParcelEnabled && coPilotActive
                        ? `Active (+₹${parcelBoost}/hr)`
                        : "Disabled"}
                    </p>
                  </button>
                </div>

                {/* Live KPI Strip */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.07]">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">
                      NET DAILY TAKE-HOME
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5">
                      ₹{dailyNetTakeHome.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[11px] text-emerald-400/80 font-mono">
                      {dailyDelta >= 0
                        ? `+₹${dailyDelta} vs Holdout`
                        : "Siloed Mode"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">
                      HOURLY EARNINGS FLOOR
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-white mt-0.5">
                      ₹{effectiveHourly}/hr
                    </div>
                    <div className="text-[11px] text-indigo-300 font-mono">
                      {driverActionStatus === "accepted" && coPilotActive
                        ? "Mid-Day Slump Eliminated"
                        : "Slump Active"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">
                      EMPTY DEAD-MILE %
                    </div>
                    <div className="text-2xl font-extrabold font-mono text-amber-400 mt-0.5">
                      {deadMileRatio}%
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      {deadMileRatio < 15
                        ? "Optimal Vector Chain"
                        : "High Empty Waste"}
                    </div>
                  </div>
                </div>
              </div>

              {/* 24-Hour SVG Area Curve Card */}
              <div className="bg-[#0D1322] border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      24-Hour Hourly Earnings Curve: Siloed Holdout vs.
                      OmniFleet
                    </h3>
                    <p className="text-xs text-slate-400">
                      Hover over any daypart node to inspect exact hourly
                      recovery during 11 AM – 4 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
                      Siloed Holdout
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-3 h-2 bg-emerald-400 inline-block rounded-sm" />
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
                        id="emeraldAreaGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10B981"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366F1"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>

                    {[0.25, 0.5, 0.75].map((ratio, idx) => {
                      const y = Math.round(chartH - ratio * (chartH - 30) - 15);
                      const val = Math.round(ratio * maxChartY);
                      return (
                        <g key={idx}>
                          <line
                            x1="20"
                            y1={y}
                            x2={chartW - 20}
                            y2={y}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="1"
                          />
                          <text
                            x="18"
                            y={y - 4}
                            fontSize="9"
                            fill="#94A3B8"
                            fontFamily="monospace"
                          >
                            ₹{val}/h
                          </text>
                        </g>
                      );
                    })}

                    <path d={multiAreaPath} fill="url(#emeraldAreaGrad)" />
                    <polyline
                      fill="none"
                      stroke="#94A3B8"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      points={basePoints}
                    />
                    <polyline
                      fill="none"
                      stroke="#10B981"
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
                              stroke="#10B981"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            />
                          )}
                          <circle
                            cx={cx}
                            cy={cyBase}
                            r={isHovered ? 4 : 2.5}
                            fill="#94A3B8"
                          />
                          <circle
                            cx={cx}
                            cy={cyMulti}
                            r={isHovered ? 6 : 3.5}
                            fill="#10B981"
                            stroke="#06080F"
                            strokeWidth="1.5"
                          />
                          <text
                            x={cx}
                            y={chartH - 2}
                            textAnchor="middle"
                            fontSize="9.5"
                            fill={isHovered ? "#10B981" : "#94A3B8"}
                            fontWeight={isHovered ? "bold" : "normal"}
                            fontFamily="monospace"
                          >
                            {d.hour}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Hover Readout */}
                  <div className="mt-3 p-3.5 rounded-xl bg-[#06080F] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    {hoveredHour !== null ? (
                      <>
                        <div>
                          <span className="text-emerald-400 font-bold mr-2">
                            {chartData[hoveredHour].hour}
                          </span>
                          <span className="text-white">
                            {chartData[hoveredHour].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400">
                            Holdout: ₹{chartData[hoveredHour].baseVal}/hr
                          </span>
                          <span className="text-emerald-400 font-bold">
                            OmniFleet: ₹{chartData[hoveredHour].multiVal}/hr (+₹
                            {chartData[hoveredHour].multiVal -
                              chartData[hoveredHour].baseVal}
                            /hr)
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-slate-300">
                        ⚡ <strong>12:30 PM Lunch Trough Recovery:</strong>{" "}
                        Holdout fleets drop to ₹{chartData[3].baseVal}/hr, while
                        OmniFleet drivers earn{" "}
                        <strong className="text-emerald-400">
                          ₹{chartData[3].multiVal}/hr
                        </strong>{" "}
                        via directional food &amp; B2B batches.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Realistic Driver Mobile Co-Pilot HUD & H3 Vector Radar */}
            <div className="lg:col-span-5">
              <div className="bg-[#0D1322] border border-white/[0.1] rounded-[28px] p-4 sm:p-5 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] space-y-4">
                {/* Smartphone Status Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#06080F] border border-white/[0.06] text-[11px] font-mono">
                  <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    CAPTAIN CO-PILOT APP
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    {driverActionStatus === "accepted" && coPilotActive
                      ? "0.2 KM DEAD MILES"
                      : "7.2 KM DEAD MILES"}
                  </span>
                </div>

                {/* Animated Vector H3 Route Map */}
                <div className="relative h-52 rounded-2xl bg-[#06080F] border border-white/[0.08] overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 420 200"
                    fill="none"
                  >
                    <rect width="420" height="200" fill="#06080F" />
                    <g stroke="rgba(99,102,241,0.14)" strokeWidth="1.5">
                      <polygon points="60,20 100,20 120,55 100,90 60,90 40,55" />
                      <polygon points="160,20 200,20 220,55 200,90 160,90 140,55" />
                      <polygon points="260,20 300,20 320,55 300,90 260,90 240,55" />
                      <polygon points="110,105 150,105 170,140 150,175 110,175 90,140" />
                      <polygon points="210,105 250,105 270,140 250,175 210,175 190,140" />
                    </g>

                    {driverActionStatus === "accepted" && coPilotActive ? (
                      <>
                        <path
                          d={activeSvgRoutePath}
                          stroke="#10B981"
                          strokeWidth="3.5"
                          strokeDasharray="8 6"
                          className="animate-route-flow"
                        />
                        <circle
                          cx={isFoodOn ? "155" : isParcelOn ? "265" : "365"}
                          cy={isFoodOn ? "75" : isParcelOn ? "115" : "45"}
                          r="12"
                          fill="#10B981"
                          fillOpacity="0.25"
                        >
                          <animate
                            attributeName="r"
                            values="8;16;8"
                            dur="1.8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    ) : (
                      <path
                        d="M55 155 L 365 45"
                        stroke="#F43F5E"
                        strokeWidth="3"
                        strokeDasharray="5 5"
                      />
                    )}

                    <circle
                      cx="55"
                      cy="155"
                      r="6"
                      fill="#06080F"
                      stroke="#E2E8F0"
                      strokeWidth="2"
                    />
                    <circle
                      cx="155"
                      cy="75"
                      r="6"
                      fill={
                        foodBatchEnabled && coPilotActive
                          ? "#F59E0B"
                          : "#334155"
                      }
                      stroke="#06080F"
                      strokeWidth="2"
                    />
                    <circle
                      cx="265"
                      cy="115"
                      r="6"
                      fill={
                        b2bParcelEnabled && coPilotActive
                          ? "#38BDF8"
                          : "#334155"
                      }
                      stroke="#06080F"
                      strokeWidth="2"
                    />
                    <circle
                      cx="365"
                      cy="45"
                      r="7"
                      fill="#10B981"
                      stroke="#06080F"
                      strokeWidth="2"
                    />

                    <text
                      x="35"
                      y="175"
                      fontSize="9"
                      fill="#94A3B8"
                      fontFamily="monospace"
                    >
                      Drop Hex
                    </text>
                    <text
                      x="130"
                      y="62"
                      fontSize="9"
                      fill="#F59E0B"
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
                      fill="#10B981"
                      fontFamily="monospace"
                    >
                      CBD Surge
                    </text>
                  </svg>

                  <div className="absolute top-3 left-3 bg-[#0B0F1C]/95 border border-white/10 px-3 py-1 rounded-lg text-[11px] font-mono text-slate-200">
                    Drop Zone:{" "}
                    <strong className="text-amber-400">
                      {activeHops.dropZone}
                    </strong>
                  </div>

                  {sessionBonus > 0 && (
                    <div className="absolute bottom-3 right-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg font-mono text-xs font-extrabold shadow-lg">
                      Wallet Bonus: +₹{sessionBonus}
                    </div>
                  )}
                </div>

                {/* 3 Chained Hops Cards */}
                <div className="space-y-2.5 text-xs">
                  <div
                    className={`p-3.5 rounded-xl bg-[#06080F] border flex items-center justify-between transition ${
                      foodBatchEnabled && coPilotActive
                        ? "border-white/[0.08]"
                        : "border-white/[0.03] opacity-40"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 block">
                        {activeHops.hop1.tag} • {activeHops.hop1.eta}
                      </span>
                      <div className="font-semibold text-white mt-0.5">
                        {activeHops.hop1.title}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {foodBatchEnabled && coPilotActive
                        ? `+₹${activeHops.hop1.pay}`
                        : "OFF"}
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl bg-[#06080F] border flex items-center justify-between transition ${
                      b2bParcelEnabled && coPilotActive
                        ? "border-white/[0.08]"
                        : "border-white/[0.03] opacity-40"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-sky-400 block">
                        {activeHops.hop2.tag} • {activeHops.hop2.eta}
                      </span>
                      <div className="font-semibold text-white mt-0.5">
                        {activeHops.hop2.title}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {b2bParcelEnabled && coPilotActive
                        ? `+₹${activeHops.hop2.pay}`
                        : "OFF"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#06080F] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 block">
                        {activeHops.hop3.tag} • {activeHops.hop3.eta}
                      </span>
                      <div className="font-semibold text-white mt-0.5">
                        {activeHops.hop3.title}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      +₹{activeHops.hop3.pay}
                    </span>
                  </div>
                </div>

                {/* Driver Accept / Decline Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDriverActionStatus("accepted");
                      setCoPilotActive(true);
                      setSessionBonus((prev) => prev + dynamicChainPay);
                    }}
                    className={`py-3 px-4 rounded-xl font-bold text-xs transition cursor-pointer ${
                      driverActionStatus === "accepted"
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                        : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950"
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
                    className={`py-3 px-4 rounded-xl font-semibold text-xs transition cursor-pointer ${
                      driverActionStatus === "declined"
                        ? "bg-rose-500 text-white"
                        : "bg-[#06080F] border border-white/[0.08] text-slate-400 hover:text-white"
                    }`}
                  >
                    Decline (Wait Empty)
                  </button>
                </div>

                {driverActionStatus === "accepted" ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono flex items-center justify-between">
                    <span>
                      ✓ Active: Saved 7.2 empty km + credited ₹8 pass rebate.
                    </span>
                    {sessionBonus > 0 && (
                      <button
                        type="button"
                        onClick={() => setSessionBonus(0)}
                        className="underline text-[10px] ml-2 hover:text-white"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-mono">
                    ⚠️ Holdout State: 26 min idle wait or 7.2 km uncompensated
                    return trip.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: "PASS REBATE ENGINE" — STRIPE-STYLE CRISP LIGHT PRICING CONFIGURATOR */}
      <section
        id="saas"
        className="bg-[#F8FAFC] text-slate-900 py-24 border-b border-slate-200/80 scroll-mt-20 bg-grid-light"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-mono font-semibold uppercase tracking-wider">
              04 • SAAS PASS REBATE ENGINE • CROSS-VERTICAL SUBSIDY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-950 leading-[1.1]">
              Zero upfront risk for part-timers. 100% pass rebate when they
              deliver lunch.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Instead of forcing a flat ₹29 upfront daily pass fee that alienates
              evening part-timers, drivers pay{" "}
              <strong className="text-slate-900">
                ₹0 upfront (₹3/ride capped at ₹25)
              </strong>
              —and earn an{" "}
              <strong className="text-indigo-600">
                ₹8 instant pass rebate
              </strong>{" "}
              for every off-peak food or B2B parcel batch completed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Interactive Sliders Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Configure Driver Daily Volume
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Daily Commuter Rides Completed</span>
                    <span className="font-mono text-sm font-bold text-indigo-600">
                      {dailyRides} Rides
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={dailyRides}
                    onChange={(e) => setDailyRides(Number(e.target.value))}
                    className="w-full light-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Average Commuter Ride Fare</span>
                    <span className="font-mono text-sm font-bold text-slate-900">
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
                    className="w-full light-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-indigo-600 font-bold">
                      Off-Peak Food / Parcel Batches (12–4 PM)
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-600">
                      {offPeakFoodDrops} Batches (-₹{offPeakFoodDrops * 8} Rebate)
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
                    className="w-full light-slider"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1.5">
                <div className="font-bold text-indigo-950">
                  How the Cross-Vertical Subsidy Works:
                </div>
                <p className="text-indigo-900/80 leading-relaxed">
                  Each off-peak restaurant/parcel batch generates ₹14 in B2B
                  merchant tech fees. Sharing ₹8 of that to rebate the
                  driver&apos;s daily subscription pass makes their ride pass{" "}
                  <strong className="text-indigo-700">
                    {m3FinalFee === 0 ? "100% FREE" : `only ₹${m3FinalFee}`}
                  </strong>{" "}
                  while fulfilling mid-day delivery demand at zero fleet CAC.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: 3 Stripe-Style Pricing Tier Comparison Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                    Legacy Aggregator
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-3">
                    22% Take-Rate
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Platform deducts 22% commission from every trip.
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Gross Earnings:</span>
                      <span>₹{totalGross}</span>
                    </div>
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>22% Commission:</span>
                      <span>-₹{m1Commission}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5">
                    ₹{m1Net}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                    Standard SaaS Pass
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-3">
                    Flat ₹29 Pass
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Upfront daily pass fee required before first trip.
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Gross Earnings:</span>
                      <span>₹{totalGross}</span>
                    </div>
                    <div className="flex justify-between text-amber-600 font-bold">
                      <span>Upfront Pass Fee:</span>
                      <span>-₹{m2PassFee}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5">
                    ₹{m2Net}
                  </div>
                </div>
              </div>

              <div className="bg-[#0B0F1C] text-white rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-indigo-500/40 relative">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-indigo-600 text-white rounded-md">
                    OmniFleet Recommended
                  </span>
                  <h4 className="text-xl font-bold text-white mt-3">
                    Flex-Cap + Rebate
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    ₹0 upfront! ₹3/ride minus ₹8 per lunch food drop.
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Base Flex Fee:</span>
                      <span>₹{rawFlexFee}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>B2B Food Rebate:</span>
                      <span>-₹{foodPassRebate}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-white/10 pt-1.5">
                      <span>Net Pass Paid:</span>
                      <span>₹{m3FinalFee}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5">
                    ₹{m3Net}
                  </div>
                  <div className="text-[11px] font-mono text-indigo-300 mt-0.5">
                    +₹{m3Net - m1Net} saved vs Commission
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: "THE PROOF" — CFO & VP PRODUCT ENTERPRISE P&L SIMULATOR */}
      <section
        id="proof"
        className="bg-[#06080F] text-slate-100 py-24 scroll-mt-20 bg-grid-dark"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                05 • CFO &amp; VP PRODUCT P&amp;L UNIT ECONOMICS CALCULATOR
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
                Quantify annualized EBITDA lift at scale.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex p-1 rounded-xl bg-[#0D1322] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCurrencyMode("INR")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    currencyMode === "INR"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  ₹ INR Crores (India)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("USD")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    currencyMode === "USD"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  $ USD Millions (Global)
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-500 hover:text-slate-950 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export P&amp;L Sheet (.CSV)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#0D1322] border border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-xl">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">ACTIVE FLEET DAU:</span>
                  <strong className="text-indigo-400">
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
                  <span className="text-slate-400">CO-PILOT ADOPTION:</span>
                  <strong className="text-indigo-400">{adoptionPct}%</strong>
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
                  <span className="text-slate-400">
                    NET B2B TECH MARGIN / ORDER:
                  </span>
                  <strong className="text-emerald-400">
                    ₹{netMarginPerBatch} / batch
                  </strong>
                </div>
                <input
                  type="range"
                  min={6}
                  max={25}
                  value={netMarginPerBatch}
                  onChange={(e) => setNetMarginPerBatch(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-8 bg-[#0D1322] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#080B14] border-b border-white/[0.08] text-slate-400 uppercase">
                    <tr>
                      <th className="p-4">P&amp;L Unit Economics Line Item</th>
                      <th className="p-4">Siloed Holdout</th>
                      <th className="p-4">With OmniFleet Active</th>
                      <th className="p-4">Net Annualized Lift</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    <tr>
                      <td className="p-4 font-sans font-semibold text-white">
                        Off-Peak Food &amp; B2B Logistics Tech Margin
                      </td>
                      <td className="p-4 text-slate-400">₹0 Cr (Unutilized)</td>
                      <td className="p-4 text-white font-bold">
                        {formatVal(annualLogisticsCr)} / yr
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">
                        +{formatVal(annualLogisticsCr)} / yr
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-sans font-semibold text-white">
                        Retained Daily SaaS Pass Subscribers
                      </td>
                      <td className="p-4 text-slate-400">
                        {basePassDrivers.toLocaleString("en-IN")} DAU (
                        {basePassPct}%)
                      </td>
                      <td className="p-4 text-white font-bold">
                        {newPassDrivers.toLocaleString("en-IN")} DAU (
                        {newPassPct}%)
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">
                        +{formatVal(annualPassCr)} / yr
                      </td>
                    </tr>
                    <tr className="bg-indigo-500/10">
                      <td className="p-4 font-sans font-extrabold text-indigo-300">
                        TOTAL NET CONTRIBUTION MARGIN LIFT
                      </td>
                      <td className="p-4 text-slate-400">Holdout Baseline</td>
                      <td className="p-4 font-bold text-white">
                        Multimodal Fleet OS
                      </td>
                      <td className="p-4 text-lg font-extrabold text-emerald-400">
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

      {/* FAANG ENTERPRISE FOOTER */}
      <footer className="bg-[#04060B] text-slate-400 py-14 border-t border-white/[0.08] text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-white">OmniFleet OS</span>
            <span>
              • Multimodal Spatial Dispatch &amp; Zero-Commission Pass
              Infrastructure • Engineered by{" "}
              <strong className="text-white">Abhinav Thakur</strong>
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            H3 Spatial Routing API • Hex-Time Switchback Verified • Enterprise
            Fleet OS
          </div>
        </div>
      </footer>
    </div>
  );
}
