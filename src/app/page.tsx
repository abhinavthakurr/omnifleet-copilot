"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Terminal,
  Activity,
  ShieldAlert,
  Layers,
  Sparkles,
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

  // Automatic Scroll-Spy to highlight the active section in the sticky navbar
  useEffect(() => {
    const sectionIds = ["leak", "how-it-works", "copilot", "saas", "proof"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper with exact sticky header offset (64px)
  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 64;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
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
      dropZone: string;
      chainTitle: string;
      passBadge: string;
      hop1: { tag: string; title: string; pay: number };
      hop2: { tag: string; title: string; pay: number };
      hop3: { tag: string; title: string; pay: number };
    }
  > = {
    zerocomm: {
      dropZone: "Whitefield IT Park (Wait: 26m)",
      chainTitle: "Rapido Captain + Ownly Food Chain",
      passBadge: "₹19 Daily Pass (100% Rebated)",
      hop1: {
        tag: "HOP 1 • OWNLY ZERO-COMM FOOD BATCH",
        title: "Meghana Biryani Hub → 2 Lunch Drops (3.1 km)",
        pay: 75,
      },
      hop2: {
        tag: "HOP 2 • RAPIDO LOCAL B2B PARCEL",
        title: "Apollo Pharmacy Express → Indiranagar Clinic",
        pay: 45,
      },
      hop3: {
        tag: "HOP 3 • PRE-MATCHED COMMUTER RIDE",
        title: "Indiranagar Metro → MG Road CBD Surge",
        pay: 65,
      },
    },
    superapp: {
      dropZone: "Outer Airport Tech Corridor (Wait: 22m)",
      chainTitle: "Uber Driver + Eats + Direct Chain",
      passBadge: "Quest + Eats Surge Boost",
      hop1: {
        tag: "HOP 1 • UBER EATS PRIORITY BATCH",
        title: "Truffles Cloud Kitchen → 2 Corporate Drops",
        pay: 110,
      },
      hop2: {
        tag: "HOP 2 • UBER DIRECT EXPRESS B2B",
        title: "Reliance Smart Dark Store → Downtown Retail",
        pay: 85,
      },
      hop3: {
        tag: "HOP 3 • UBER GO / PREMIER COMMUTER",
        title: "Financial District → Central Railway Hub",
        pay: 165,
      },
    },
    opennet: {
      dropZone: "Electronic City Phase II (Wait: 28m)",
      chainTitle: "ONDC Open Grid 0%-Commission Chain",
      passBadge: "₹0 Upfront • Direct UPI Settlement",
      hop1: {
        tag: "HOP 1 • ONDC DIRECT RESTAURANT ORDER",
        title: "Empire Restaurant → HSR Layout Sector 2",
        pay: 70,
      },
      hop2: {
        tag: "HOP 2 • ONDC HYPERLOCAL KIRANA DROP",
        title: "Organic Mandya Store → Koramangala 4th Block",
        pay: 50,
      },
      hop3: {
        tag: "HOP 3 • NAMMA YATRI DIRECT AUTO RIDE",
        title: "Sony World Signal → Trinity Metro CBD",
        pay: 95,
      },
    },
  };

  const activeHops = presetHopsData[preset];

  // Dynamic total chain pay based on enabled toggles
  const dynamicChainPay =
    (coPilotActive && foodBatchEnabled ? activeHops.hop1.pay : 0) +
    (coPilotActive && b2bParcelEnabled ? activeHops.hop2.pay : 0) +
    activeHops.hop3.pay;

  // --- Dynamic Calculations for Live Dispatch Console ---
  const baseHourlyMap = { "2w": 105, "3w": 152, "4w": 225 };
  const presetMult =
    preset === "superapp" ? 1.15 : preset === "opennet" ? 1.05 : 1.0;
  const baseHourly = Math.round(baseHourlyMap[vehicle] * presetMult);

  const foodBoost =
    coPilotActive && foodBatchEnabled ? Math.round(baseHourly * 0.22) : 0;
  const parcelBoost =
    coPilotActive && b2bParcelEnabled ? Math.round(baseHourly * 0.16) : 0;

  const effectiveHourly =
    driverActionStatus === "accepted"
      ? baseHourly + foodBoost + parcelBoost
      : Math.round(baseHourly * 0.78);

  const dailyNetTakeHome = effectiveHourly * shiftHours + sessionBonus;
  const baselineTakeHome = baseHourly * shiftHours;
  const dailyDelta = dailyNetTakeHome - baselineTakeHome;

  const deadMileRatio =
    driverActionStatus === "accepted" && coPilotActive
      ? b2bParcelEnabled && foodBatchEnabled
        ? 9.4
        : foodBatchEnabled || b2bParcelEnabled
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
  const chartH = 180;
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
  const basePassDrivers = Math.round(fleetDau * 0.62);
  const newPassDrivers = Math.round(fleetDau * 0.76);
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
        `${basePassDrivers} DAU (62%)`,
        `${newPassDrivers} DAU (76%)`,
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
    { "hop": 1, "vertical": "FOOD_ZERO_COMM", "pay_inr": ${activeHops.hop1.pay}, "pass_rebate_inr": 8 },
    { "hop": 2, "vertical": "B2B_EXPRESS_PARCEL", "pay_inr": ${activeHops.hop2.pay}, "pass_rebate_inr": 8 },
    { "hop": 3, "vertical": "COMMUTER_SURGE_RIDE", "pay_inr": ${activeHops.hop3.pay}, "pass_rebate_inr": 0 }
  ],
  "net_dead_miles_saved_km": 7.2,
  "commuter_eta_sla_delta_sec": 9.4
}`;

  const handleCopyApi = () => {
    navigator.clipboard.writeText(sampleApiJson);
    setCopiedApi(true);
    setTimeout(() => setCopiedApi(false), 2000);
  };

  // Ticker items array for smooth infinite loop
  const tickerItems = [
    { badge: "27.5%", text: "empty dead miles after suburban drops" },
    { badge: "11 AM – 4 PM", text: "commuter demand drops by 65%" },
    {
      badge: "₹0 Upfront",
      text: "Flex-Cap pass eliminates part-timer friction",
    },
    {
      badge: "100% Free Pass",
      text: "after completing 3 off-peak food drops",
    },
    {
      badge: "+₹222.4 Cr",
      text: "annualized net EBITDA lift across 450k DAU",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080C0A] text-[#ECE7DA] selection:bg-[#C8FF3D] selection:text-[#080C0A] relative">
      {/* TOP MINIMAL ENTERPRISE NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#080C0A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-5 h-5 bg-[#C8FF3D] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#080C0A]" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#ECE7DA]">
              OmniFleet
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#ECE7DA]/70">
            {[
              { id: "leak", label: "The leak" },
              { id: "how-it-works", label: "How it works" },
              { id: "copilot", label: "Dispatch Console" },
              { id: "saas", label: "Pass Rebate Engine" },
              { id: "proof", label: "The proof" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition-colors py-1 border-b-2 ${
                  activeNav === item.id
                    ? "text-[#C8FF3D] font-bold border-[#C8FF3D]"
                    : "border-transparent hover:text-[#C8FF3D]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("copilot")}
            className="bg-[#C8FF3D] text-[#080C0A] text-xs font-bold px-4 py-2.5 rounded hover:bg-[#d6ff66] transition-colors cursor-pointer"
          >
            Deploy on Your Fleet →
          </button>
        </div>

        {/* Mobile Quick-Jump Subbar */}
        <div className="flex md:hidden items-center gap-4 px-5 py-2 overflow-x-auto border-t border-white/5 text-[11px] font-mono whitespace-nowrap">
          {[
            { id: "leak", label: "01. The Leak" },
            { id: "how-it-works", label: "02. Architecture" },
            { id: "copilot", label: "03. Dispatch Console" },
            { id: "saas", label: "04. Pass Engine" },
            { id: "proof", label: "05. EBITDA Proof" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer ${
                activeNav === item.id
                  ? "text-[#C8FF3D] font-bold underline underline-offset-4"
                  : "text-[#ECE7DA]/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative pt-14 pb-24 md:py-24 z-10">
        <div
          className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] -z-10"
          style={{ background: "#C8FF3D" }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-7 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono tracking-wider uppercase text-[#ECE7DA]/80">
              <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
              MULTIMODAL DISPATCH • ZERO-COMMISSION SAAS • UBER / RAPIDO / ONDC
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] font-bold leading-[1.03] tracking-tight text-[#ECE7DA]">
              Your fleet is{" "}
              <span className="italic text-[#FF5C35] font-normal">
                bleeding out
              </span>{" "}
              between 11 AM &amp; 4 PM. We recover it, and prove it.
            </h1>

            <p className="text-base sm:text-lg text-[#ECE7DA]/75 leading-relaxed max-w-2xl">
              Mobility platforms lose{" "}
              <strong className="text-white font-semibold">
                27.5% of driven kilometers
              </strong>{" "}
              to empty dead miles after suburban drops, while driver hourly
              earnings collapse by{" "}
              <strong className="text-white font-semibold">62% mid-day</strong>.
              As platforms transition to{" "}
              <strong className="text-white font-semibold">
                Daily SaaS Subscription Passes
              </strong>
              , part-time drivers churn rather than pay upfront fees. OmniFleet
              wins them back by chaining{" "}
              <strong className="text-[#C8FF3D] font-semibold">
                Zero-Commission Restaurant Batches
              </strong>{" "}
              and{" "}
              <strong className="text-[#C8FF3D] font-semibold">
                B2B Express Parcels
              </strong>{" "}
              into directional return routes—and proves the net EBITDA lift
              against a holdout.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection("copilot")}
                className="bg-[#C8FF3D] text-[#080C0A] font-bold text-sm px-6 py-3.5 rounded flex items-center gap-2 hover:bg-[#d6ff66] transition cursor-pointer"
              >
                Launch Live Dispatch Console <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("proof")}
                className="border border-white/20 text-[#ECE7DA] font-semibold text-sm px-6 py-3.5 rounded hover:bg-white/5 transition cursor-pointer"
              >
                Calculate Enterprise ROI
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#ECE7DA]/70">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Plug-and-play
                H3 API integration
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Zero upfront
                driver pass friction
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Verified via
                Hex-Time Switchback holdouts
              </span>
            </div>
          </div>

          {/* Right Hero Card: Live Recovery Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 relative z-20">
            <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#233029] pb-4 text-xs font-mono">
                <span className="text-[#ECE7DA]/60 tracking-wider">
                  OMNIFLEET.OS / FLEET RECOVERY
                </span>
                <span className="flex items-center gap-1.5 text-[#C8FF3D] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C8FF3D] animate-pulse" />
                  LIVE TELEMETRY
                </span>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#ECE7DA]/60">
                  RECOVERED CONTRIBUTION MARGIN •{" "}
                  {(fleetDau / 1000).toFixed(0)}K FLEET DAU
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#C8FF3D] tracking-tight mt-1">
                  {formatVal(totalAnnualCr)}
                </div>
                <div className="text-xs text-[#ECE7DA]/70 mt-1.5">
                  142,000 daily dead-mile suburban drops converted into
                  revenue-generating return chains
                </div>
              </div>

              {/* 7-Bar Visual Histogram */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-[#ECE7DA]/60">
                  <span>MID-DAY HOURLY EARNINGS RECOVERY</span>
                  <span className="text-[#C8FF3D]">+120% Floor Lift</span>
                </div>
                <div className="grid grid-cols-7 gap-2 items-end h-24 pt-4 px-2 bg-[#080C0A]/60 rounded-lg border border-[#233029]">
                  {[35, 42, 38, 52, 60, 74, 95].map((h, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 h-full justify-end"
                    >
                      <div
                        style={{ height: `${h}%` }}
                        className={`w-full rounded-t transition-all duration-500 ${
                          idx === 6
                            ? "bg-[#C8FF3D] shadow-[0_0_12px_rgba(200,255,61,0.4)]"
                            : "bg-[#233029] hover:bg-[#34463C]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Split Metrics Box */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#233029]">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#ECE7DA]/60">
                    EMPTY DEAD MILES
                  </div>
                  <div className="text-xl font-bold font-mono text-[#FF5C35] mt-0.5">
                    -18.1% saved
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#ECE7DA]/60">
                    PASS RENEWAL LIFT
                  </div>
                  <div className="text-xl font-bold font-mono text-[#C8FF3D] mt-0.5">
                    +14.0 pts
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#ECE7DA]/50 font-mono leading-relaxed">
                Real-time production telemetry measured against a 15% H3
                hex-time switchback holdout cluster.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INFINITE MOVING CHARTREUSE LIME MARQUEE TICKER BANNER */}
      <div className="bg-[#C8FF3D] text-[#080C0A] py-3.5 border-y-2 border-black overflow-hidden relative z-20 select-none">
        <div className="animate-marquee flex items-center gap-10 text-xs sm:text-sm font-bold whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="bg-[#080C0A] text-[#C8FF3D] px-2.5 py-0.5 font-mono text-xs rounded-sm">
                {item.badge}
              </span>
              <span>{item.text}</span>
              <span className="text-[#080C0A]/40 font-black ml-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: "THE LEAK" — WARM EDITORIAL CREAM SECTION (#ECE7DA) */}
      <section
        id="leak"
        className="bg-[#ECE7DA] text-[#080C0A] py-24 relative z-20 scroll-mt-16"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5C35]">
              THE LEAK
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#080C0A] max-w-2xl leading-[1.08]">
              Most driver churn isn&apos;t multi-homing. It&apos;s mid-day unit
              economics that quietly collapsed.
            </h2>
            <p className="text-base text-[#080C0A]/70 max-w-xl leading-relaxed">
              Driver supply walks out silently between 11 AM and 4 PM, and
              forcing a flat upfront subscription pass can&apos;t fix an empty
              return trip.
            </p>
          </div>

          {/* 3 Numbered Editorial Rows */}
          <div className="divide-y divide-[#080C0A]/15 border-t border-b border-[#080C0A]/15">
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2 font-serif text-3xl font-bold text-[#FF5C35]">
                01
              </div>
              <div className="md:col-span-4 font-serif text-xl font-bold text-[#080C0A]">
                The suburban dead-mile trap
              </div>
              <div className="md:col-span-6 text-sm text-[#080C0A]/75 leading-relaxed">
                A driver drops a morning commuter in an outer IT park (e.g.,
                Whitefield or Gachibowli) at 11:15 AM. With zero return commuter
                demand, they either sit idle for 35 minutes or burn ₹45 of fuel
                driving 7 km back empty toward the city center.
              </div>
            </div>

            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2 font-serif text-3xl font-bold text-[#FF5C35]">
                02
              </div>
              <div className="md:col-span-4 font-serif text-xl font-bold text-[#080C0A]">
                Upfront SaaS pass sunk-cost friction
              </div>
              <div className="md:col-span-6 text-sm text-[#080C0A]/75 leading-relaxed">
                Zero-commission daily passes (₹19–₹29) work great for full-time
                12-hour drivers. But part-time evening drivers or students doing
                only 4 rides refuse to pay upfront when unexpected rain or low
                demand can wipe out their net take-home pay.
              </div>
            </div>

            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2 font-serif text-3xl font-bold text-[#FF5C35]">
                03
              </div>
              <div className="md:col-span-4 font-serif text-xl font-bold text-[#080C0A]">
                Siloed fleets &amp; battery drain
              </div>
              <div className="md:col-span-6 text-sm text-[#080C0A]/75 leading-relaxed">
                Passenger rides, zero-commission food delivery (like Rapido
                Ownly or Uber Eats), and B2B express parcels operate in separate
                dispatch silos. Drivers juggle 3 apps simultaneously, draining
                phone battery and breaking platform retention streaks.
              </div>
            </div>
          </div>

          {/* Field Benchmark Cohort Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="bg-white border border-[#080C0A]/15 rounded-xl p-5 space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase text-[#FF5C35]">
                COHORT A • OUTER IT CORRIDOR 2W
              </div>
              <div className="font-serif text-lg font-bold text-[#080C0A]">
                &ldquo;After 11:30 AM in Whitefield, we wait 30 mins or ride
                empty to Indiranagar.&rdquo;
              </div>
              <p className="text-xs text-[#080C0A]/70 font-mono pt-1">
                Siloed Mid-Day EPH: <strong>₹68/hr</strong> → OmniFleet:{" "}
                <strong className="text-[#080C0A]">₹162/hr</strong>
              </p>
            </div>

            <div className="bg-white border border-[#080C0A]/15 rounded-xl p-5 space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase text-[#FF5C35]">
                COHORT B • PART-TIME EVENING CAPTAIN
              </div>
              <div className="font-serif text-lg font-bold text-[#080C0A]">
                &ldquo;Paying ₹29 upfront when I only do 4 rides after college
                is too risky.&rdquo;
              </div>
              <p className="text-xs text-[#080C0A]/70 font-mono pt-1">
                Upfront Pass Opt-In: <strong>24%</strong> → Flex-Cap Opt-In:{" "}
                <strong className="text-[#080C0A]">81%</strong>
              </p>
            </div>

            <div className="bg-white border border-[#080C0A]/15 rounded-xl p-5 space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase text-[#FF5C35]">
                COHORT C • ZERO-COMM RESTAURANT PARTNER
              </div>
              <div className="font-serif text-lg font-bold text-[#080C0A]">
                &ldquo;Lunch orders spike at 12:30 PM right when idle ride
                captains sit 400m away.&rdquo;
              </div>
              <p className="text-xs text-[#080C0A]/70 font-mono pt-1">
                Batch Fulfillment SLA: <strong>24.2 mins</strong> (Zero new
                fleet CAC)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: "HOW IT WORKS" — DEDICATED 3-PILLAR SYSTEM ARCHITECTURE + ENGINE SPEC */}
      <section
        id="how-it-works"
        className="bg-[#080C0A] text-[#ECE7DA] py-24 border-t border-white/10 relative z-20 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF3D]">
              HOW IT WORKS • SYSTEM ARCHITECTURE
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#ECE7DA]">
              Detect. Chain. Rebate. Prove.
            </h2>
            <p className="text-base text-[#ECE7DA]/70 leading-relaxed">
              OmniFleet sits as an intelligent spatial dispatch &amp; pricing
              layer between your commuter rides, zero-commission restaurant
              network, and B2B express logistics pool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#C8FF3D]/15 border border-[#C8FF3D]/30 flex items-center justify-center text-[#C8FF3D] font-mono font-bold">
                01
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                H3 Liquidity Detection
              </h3>
              <p className="text-xs text-[#ECE7DA]/70 leading-relaxed">
                The moment a driver completes a commuter drop in an outer
                suburban H3 Level-8 hexagon between 11 AM and 4 PM, OmniFleet
                evaluates <code className="text-[#C8FF3D]">E[Wait_Commuter]</code>
                . If expected wait exceeds 12 minutes, dead-mile intervention
                triggers automatically.
              </p>
            </div>

            <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF5C35]/15 border border-[#FF5C35]/30 flex items-center justify-center text-[#FF5C35] font-mono font-bold">
                02
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Directional 3-Hop Chaining
              </h3>
              <p className="text-xs text-[#ECE7DA]/70 leading-relaxed">
                Instead of dispatching random orders, the engine queries
                zero-commission restaurants and B2B dark stores within 500m and
                constructs a strict directional vector chain leading back toward
                high-demand downtown commuter surge corridors.
              </p>
            </div>

            <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] font-mono font-bold">
                03
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                B2B Pass Fee Rebate
              </h3>
              <p className="text-xs text-[#ECE7DA]/70 leading-relaxed">
                Every off-peak food or B2B parcel hop completed automatically
                credits ₹8 from the merchant B2B tech fee directly toward the
                driver&apos;s daily SaaS subscription pass—making their ride pass
                100% free after 3 lunch drops.
              </p>
            </div>
          </div>

          {/* Interactive Technical Spec & Dispatch API Inspector */}
          <div className="bg-[#101613] border border-[#233029] rounded-xl overflow-hidden">
            <div className="border-b border-[#233029] px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-[#0c120f]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C8FF3D]">
                <Terminal className="w-4 h-4" />
                UNDER THE HOOD • DISPATCH ENGINE &amp; GUARDRAIL SPECIFICATION
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: "trigger", label: "1. H3 Trigger Logic" },
                    { id: "scoring", label: "2. Vector Scoring Formula" },
                    { id: "webhook", label: "3. Dispatch JSON API" },
                    { id: "switchback", label: "4. Switchback SLA Guardrails" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setArchTab(tab.id)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition cursor-pointer ${
                      archTab === tab.id
                        ? "bg-[#C8FF3D] text-[#080C0A]"
                        : "bg-[#080C0A] text-[#ECE7DA]/70 hover:text-white border border-[#233029]"
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
                    <h4 className="font-serif text-2xl font-bold text-white">
                      Suburban H3 Level-8 Dead-Zone Interceptor
                    </h4>
                    <p className="text-xs text-[#ECE7DA]/75 leading-relaxed">
                      Every 5 seconds, OmniFleet computes the real-time ratio of
                      idle drivers to incoming commuter ride requests across
                      each H3 Level-8 cell (`~0.74 km²`). When a driver finishes
                      a drop in a cell where{" "}
                      <code className="text-[#C8FF3D]">
                        E[Wait_Commuter] &gt; 720s
                      </code>{" "}
                      and{" "}
                      <code className="text-[#C8FF3D]">
                        Adjacent_Merchant_Orders &ge; 2
                      </code>
                      , the driver app suppresses the dead-mile return prompt
                      and injects a pre-bundled 3-hop return chain.
                    </p>
                  </div>
                  <div className="md:col-span-5 bg-[#080C0A] border border-[#233029] rounded-lg p-4 font-mono text-xs space-y-2">
                    <div className="text-[#C8FF3D] font-bold">
                      // H3 INTERCEPT CONDITION
                    </div>
                    <div className="text-[#ECE7DA]/80">
                      IF (h3_cell.wait_sec &gt; 720) AND (time IN [11:00..16:00])
                    </div>
                    <div className="text-[#ECE7DA]/80">
                      AND (commuter_surge_prob &lt; 0.18)
                    </div>
                    <div className="text-[#FF5C35] font-bold">
                      → TRIGGER: MULTIMODAL_VECTOR_CHAIN()
                    </div>
                  </div>
                </div>
              )}

              {archTab === "scoring" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="font-serif text-2xl font-bold text-white">
                      Directional Cosine-Similarity Route Optimization
                    </h4>
                    <p className="text-xs text-[#ECE7DA]/75 leading-relaxed">
                      Drivers hate food batches that push them deeper into low-demand
                      peripheries. OmniFleet scores candidate chains using a
                      directional cosine filter (`cos(θ) ≥ 0.65`) anchored
                      strictly toward the nearest high-liquidity CBD commuter
                      hex or the driver&apos;s registered home corridor.
                    </p>
                  </div>
                  <div className="md:col-span-5 bg-[#080C0A] border border-[#233029] rounded-lg p-4 font-mono text-xs space-y-2">
                    <div className="text-[#C8FF3D] font-bold">
                      // CHAIN UTILITY FUNCTION
                    </div>
                    <div className="text-white">
                      Score(C) = 0.45·EPH_Lift + 0.30·cos(θ_CBD) -
                      0.15·Dead_Km + 0.10·Pass_Rebate
                    </div>
                    <div className="text-[#ECE7DA]/60 text-[11px] pt-1">
                      Constraint: Max pickup detour ≤ 500m; Thermal bag NOT
                      required for sealed ≤3.5km batches.
                    </div>
                  </div>
                </div>
              )}

              {archTab === "webhook" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#ECE7DA]/70">
                      POST /v1/dispatch/chain-offer • Live Payload Preview
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyApi}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#16201B] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-mono hover:bg-[#C8FF3D] hover:text-[#080C0A] transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedApi ? "Copied Payload!" : "Copy JSON Payload"}
                    </button>
                  </div>
                  <pre className="bg-[#080C0A] border border-[#233029] rounded-lg p-4 text-xs font-mono text-[#C8FF3D] overflow-x-auto leading-relaxed">
                    {sampleApiJson}
                  </pre>
                </div>
              )}

              {archTab === "switchback" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#080C0A] border border-[#233029] rounded-lg p-4 space-y-1.5">
                    <div className="font-mono font-bold text-[#C8FF3D]">
                      GUARDRAIL 01 • COMMUTER ETA SLA
                    </div>
                    <div className="font-bold text-white text-sm">
                      Max Pickup ETA Delta &lt; +18 sec
                    </div>
                    <p className="text-[#ECE7DA]/70">
                      If commuter ride demand spikes unexpectedly inside a hex,
                      food/parcel cross-dispatch throttles to 0% within 30
                      seconds to protect core ride-hailing reliability.
                    </p>
                  </div>
                  <div className="bg-[#080C0A] border border-[#233029] rounded-lg p-4 space-y-1.5">
                    <div className="font-mono font-bold text-[#FF5C35]">
                      GUARDRAIL 02 • FOOD BATCH RADIUS
                    </div>
                    <div className="font-bold text-white text-sm">
                      Strict ≤ 3.5 km Sub-25m Drop
                    </div>
                    <p className="text-[#ECE7DA]/70">
                      2W commuter bikes without bulky thermal boxes are only
                      assigned sealed, spill-proof neighborhood lunch batches
                      under 3.5 km.
                    </p>
                  </div>
                  <div className="bg-[#080C0A] border border-[#233029] rounded-lg p-4 space-y-1.5">
                    <div className="font-mono font-bold text-[#38BDF8]">
                      GUARDRAIL 03 • CAUSAL ATTRIBUTION
                    </div>
                    <div className="font-bold text-white text-sm">
                      H3 Cluster × 2-Hr Switchback
                    </div>
                    <p className="text-[#ECE7DA]/70">
                      Evaluated across paired suburban IT corridors (Whitefield
                      vs. Electronic City) in 2-hour switchback windows to
                      eliminate network interference bias.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "DISPATCH CONSOLE" — DEDICATED INTERACTIVE LIVE DISPATCH CONSOLE */}
      <section
        id="copilot"
        className="bg-[#0c120f] text-[#ECE7DA] py-24 border-t border-white/10 relative z-20 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF3D]">
                LIVE DISPATCH CONSOLE • REAL-TIME TELEMETRY
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Interactive Multimodal Dispatch Console
              </h2>
              <p className="text-base text-[#ECE7DA]/70 max-w-2xl">
                Switch between network architectures, vehicle classes, and shift
                hours below to inspect real-time H3 route chaining and hourly
                earnings recovery:
              </p>
            </div>

            {/* Network Architecture Switcher */}
            <div className="bg-[#101613] p-1.5 rounded-xl border border-[#233029] flex flex-wrap gap-1.5 self-start relative z-30">
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
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    preset === p.id
                      ? "bg-[#C8FF3D] text-[#080C0A] shadow-md scale-[1.02]"
                      : "text-[#ECE7DA]/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
            {/* Left 7 Cols: Controls + 24-Hour Area Curve */}
            <div className="lg:col-span-7 space-y-6">
              {/* Control Bar */}
              <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#233029] pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      1. Fleet &amp; Cross-Dispatch Configuration
                    </h3>
                    <p className="text-xs text-[#ECE7DA]/60 mt-0.5">
                      Active Pipeline:{" "}
                      <strong className="text-[#C8FF3D]">
                        {activeHops.chainTitle}
                      </strong>
                    </p>
                  </div>

                  {/* Vehicle Segmented Pill */}
                  <div className="inline-flex p-1 bg-[#080C0A] rounded-lg border border-[#233029] relative z-30">
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
                        className={`px-3.5 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                          vehicle === v.id
                            ? "bg-[#C8FF3D] text-[#080C0A]"
                            : "text-[#ECE7DA]/60 hover:text-white"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shift Hours Slider */}
                <div className="bg-[#080C0A] border border-[#233029] rounded-lg p-3.5">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#ECE7DA]/70">
                      ACTIVE DRIVER SHIFT DURATION:
                    </span>
                    <strong className="text-[#C8FF3D]">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-30">
                  <button
                    type="button"
                    onClick={() => setCoPilotActive(!coPilotActive)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      coPilotActive
                        ? "bg-[#16201B] border-[#C8FF3D] text-white shadow-sm"
                        : "bg-[#080C0A] border-[#233029] text-[#ECE7DA]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        H3 Return Routing
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          coPilotActive ? "bg-[#C8FF3D]" : "bg-white/20"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-[#ECE7DA]/60 mt-1">
                      {coPilotActive
                        ? `Active (${deadMileRatio}% dead km)`
                        : "Disabled (27.5% dead km)"}
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
                        ? "bg-[#16201B] border-[#FF5C35] text-white shadow-sm"
                        : "bg-[#080C0A] border-[#233029] text-[#ECE7DA]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        Zero-Comm Food
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          foodBatchEnabled && coPilotActive
                            ? "bg-[#FF5C35]"
                            : "bg-white/20"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-[#ECE7DA]/60 mt-1">
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
                        ? "bg-[#16201B] border-[#38BDF8] text-white shadow-sm"
                        : "bg-[#080C0A] border-[#233029] text-[#ECE7DA]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        B2B Express Parcel
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          b2bParcelEnabled && coPilotActive
                            ? "bg-[#38BDF8]"
                            : "bg-white/20"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-[#ECE7DA]/60 mt-1">
                      {b2bParcelEnabled && coPilotActive
                        ? `Active (+₹${parcelBoost}/hr)`
                        : "Disabled"}
                    </p>
                  </button>
                </div>

                {/* Live KPI Strip */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#233029]">
                  <div>
                    <div className="text-[11px] font-mono text-[#ECE7DA]/60">
                      NET DAILY TAKE-HOME
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#C8FF3D] mt-0.5">
                      ₹{dailyNetTakeHome.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[11px] text-[#C8FF3D]/80 font-mono">
                      {dailyDelta >= 0
                        ? `+₹${dailyDelta} vs Holdout`
                        : "Siloed Mode"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#ECE7DA]/60">
                      HOURLY EARNINGS FLOOR
                    </div>
                    <div className="text-2xl font-bold font-mono text-white mt-0.5">
                      ₹{effectiveHourly}/hr
                    </div>
                    <div className="text-[11px] text-[#ECE7DA]/60 font-mono">
                      {driverActionStatus === "accepted" && coPilotActive
                        ? "Slump Eliminated"
                        : "Idle Slump Active"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#ECE7DA]/60">
                      EMPTY DEAD-MILE %
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#FF5C35] mt-0.5">
                      {deadMileRatio}%
                    </div>
                    <div className="text-[11px] text-[#C8FF3D] font-mono">
                      {deadMileRatio < 15
                        ? "Optimal Return Chain"
                        : "High Empty Waste"}
                    </div>
                  </div>
                </div>
              </div>

              {/* 24-Hour SVG Area Curve Card */}
              <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      24-Hour Hourly Earnings Curve: Siloed Holdout vs.
                      OmniFleet
                    </h3>
                    <p className="text-xs text-[#ECE7DA]/60">
                      Hover over any daypart node to inspect exact hourly
                      recovery during 11 AM – 4 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#ECE7DA]/60">
                      <span className="w-3 h-0.5 border-t border-dashed border-[#ECE7DA]/60 inline-block" />
                      Siloed Holdout
                    </span>
                    <span className="flex items-center gap-1.5 text-[#C8FF3D] font-bold">
                      <span className="w-3 h-2 bg-[#C8FF3D] inline-block rounded-sm" />
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
                        id="limeAreaGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#C8FF3D"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#C8FF3D"
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
                            stroke="#233029"
                            strokeWidth="1"
                          />
                          <text
                            x="18"
                            y={y - 4}
                            fontSize="9"
                            fill="#ECE7DA"
                            opacity="0.4"
                            fontFamily="monospace"
                          >
                            ₹{val}/h
                          </text>
                        </g>
                      );
                    })}

                    <path d={multiAreaPath} fill="url(#limeAreaGrad)" />
                    <polyline
                      fill="none"
                      stroke="#ECE7DA"
                      strokeOpacity="0.4"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      points={basePoints}
                    />
                    <polyline
                      fill="none"
                      stroke="#C8FF3D"
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
                              stroke="#C8FF3D"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            />
                          )}
                          <circle
                            cx={cx}
                            cy={cyBase}
                            r={isHovered ? 4 : 2.5}
                            fill="#ECE7DA"
                            fillOpacity="0.5"
                          />
                          <circle
                            cx={cx}
                            cy={cyMulti}
                            r={isHovered ? 6 : 3.5}
                            fill="#C8FF3D"
                            stroke="#080C0A"
                            strokeWidth="1.5"
                          />
                          <text
                            x={cx}
                            y={chartH - 2}
                            textAnchor="middle"
                            fontSize="9.5"
                            fill={isHovered ? "#C8FF3D" : "#ECE7DA"}
                            opacity={isHovered ? "1" : "0.6"}
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
                  <div className="mt-3 p-3 rounded-lg bg-[#080C0A] border border-[#233029] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    {hoveredHour !== null ? (
                      <>
                        <div>
                          <span className="text-[#C8FF3D] font-bold mr-2">
                            {chartData[hoveredHour].hour}
                          </span>
                          <span className="text-white">
                            {chartData[hoveredHour].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#ECE7DA]/60">
                            Holdout: ₹{chartData[hoveredHour].baseVal}/hr
                          </span>
                          <span className="text-[#C8FF3D] font-bold">
                            OmniFleet: ₹{chartData[hoveredHour].multiVal}/hr (+₹
                            {chartData[hoveredHour].multiVal -
                              chartData[hoveredHour].baseVal}
                            /hr)
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-[#ECE7DA]/70">
                        ⚡ <strong>12:30 PM Lunch Slump Recovery:</strong>{" "}
                        Holdout fleets drop to ₹{chartData[3].baseVal}/hr, while
                        OmniFleet drivers earn{" "}
                        <strong className="text-[#C8FF3D]">
                          ₹{chartData[3].multiVal}/hr
                        </strong>{" "}
                        via directional food &amp; B2B batches.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live H3 Map HUD & Driver Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#101613] border border-[#233029] rounded-xl overflow-hidden shadow-2xl">
                <div className="px-5 py-4 border-b border-[#233029] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C8FF3D] uppercase block">
                      LIVE DRIVER CO-PILOT HUD
                    </span>
                    <span className="text-xs text-[#ECE7DA]/60">
                      {activeHops.passBadge}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#C8FF3D]/15 text-[#C8FF3D] border border-[#C8FF3D]/30">
                    {driverActionStatus === "accepted" && coPilotActive
                      ? "0.2 KM DEAD MILES"
                      : "7.2 KM DEAD MILES"}
                  </span>
                </div>

                {/* Animated Vector H3 Route Map */}
                <div className="relative h-56 bg-[#080C0A] border-b border-[#233029]">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 420 200"
                    fill="none"
                  >
                    <rect width="420" height="200" fill="#080C0A" />
                    <g stroke="#16201B" strokeWidth="1.5">
                      <polygon points="60,20 100,20 120,55 100,90 60,90 40,55" />
                      <polygon points="160,20 200,20 220,55 200,90 160,90 140,55" />
                      <polygon points="260,20 300,20 320,55 300,90 260,90 240,55" />
                      <polygon points="110,105 150,105 170,140 150,175 110,175 90,140" />
                      <polygon points="210,105 250,105 270,140 250,175 210,175 190,140" />
                    </g>

                    {driverActionStatus === "accepted" && coPilotActive ? (
                      <>
                        <path
                          d="M55 155 C 95 155, 115 75, 155 75 C 195 75, 225 115, 265 115 C 305 115, 330 45, 365 45"
                          stroke="#C8FF3D"
                          strokeWidth="3.5"
                          strokeDasharray="8 6"
                          className="animate-route-flow"
                        />
                        <circle
                          cx="155"
                          cy="75"
                          r="12"
                          fill="#C8FF3D"
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
                        stroke="#FF5C35"
                        strokeWidth="3"
                        strokeDasharray="5 5"
                      />
                    )}

                    <circle
                      cx="55"
                      cy="155"
                      r="6"
                      fill="#080C0A"
                      stroke="#ECE7DA"
                      strokeWidth="2"
                    />
                    <circle
                      cx="155"
                      cy="75"
                      r="6"
                      fill={
                        foodBatchEnabled && coPilotActive
                          ? "#FF5C35"
                          : "#334155"
                      }
                      stroke="#080C0A"
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
                      stroke="#080C0A"
                      strokeWidth="2"
                    />
                    <circle
                      cx="365"
                      cy="45"
                      r="7"
                      fill="#C8FF3D"
                      stroke="#080C0A"
                      strokeWidth="2"
                    />

                    {/* Map Node Labels */}
                    <text
                      x="35"
                      y="175"
                      fontSize="9"
                      fill="#ECE7DA"
                      fontFamily="monospace"
                    >
                      Drop Hex
                    </text>
                    <text
                      x="130"
                      y="62"
                      fontSize="9"
                      fill="#FF5C35"
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
                      fill="#C8FF3D"
                      fontFamily="monospace"
                    >
                      CBD Surge
                    </text>
                  </svg>

                  <div className="absolute top-3 left-3 bg-[#101613]/95 border border-[#233029] px-3 py-1 rounded text-[11px] font-mono text-[#ECE7DA]/90">
                    Drop Zone:{" "}
                    <strong className="text-[#FF5C35]">
                      {activeHops.dropZone}
                    </strong>
                  </div>

                  {sessionBonus > 0 && (
                    <div className="absolute bottom-3 right-3 bg-[#C8FF3D] text-[#080C0A] px-3 py-1 rounded font-mono text-xs font-extrabold shadow-lg">
                      Driver Wallet: +₹{sessionBonus}
                    </div>
                  )}
                </div>

                {/* 3 Route Hops Breakdown */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2.5 text-xs">
                    <div
                      className={`p-3 rounded-lg bg-[#080C0A] border flex items-center justify-between transition ${
                        foodBatchEnabled && coPilotActive
                          ? "border-[#233029]"
                          : "border-[#233029]/40 opacity-45"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#FF5C35] block">
                          {activeHops.hop1.tag}
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          {activeHops.hop1.title}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        {foodBatchEnabled && coPilotActive
                          ? `+₹${activeHops.hop1.pay}`
                          : "OFF"}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-lg bg-[#080C0A] border flex items-center justify-between transition ${
                        b2bParcelEnabled && coPilotActive
                          ? "border-[#233029]"
                          : "border-[#233029]/40 opacity-45"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#38BDF8] block">
                          {activeHops.hop2.tag}
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          {activeHops.hop2.title}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        {b2bParcelEnabled && coPilotActive
                          ? `+₹${activeHops.hop2.pay}`
                          : "OFF"}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#080C0A] border border-[#233029] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#C8FF3D] block">
                          {activeHops.hop3.tag}
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          {activeHops.hop3.title}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        +₹{activeHops.hop3.pay}
                      </span>
                    </div>
                  </div>

                  {/* Dispatch Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1 relative z-30">
                    <button
                      type="button"
                      onClick={() => {
                        setDriverActionStatus("accepted");
                        setCoPilotActive(true);
                        setSessionBonus((prev) => prev + dynamicChainPay);
                      }}
                      className={`py-3 px-4 rounded font-bold text-xs transition cursor-pointer ${
                        driverActionStatus === "accepted"
                          ? "bg-[#C8FF3D] text-[#080C0A] shadow-md"
                          : "bg-[#16201B] text-[#C8FF3D] border border-[#C8FF3D]/40 hover:bg-[#C8FF3D] hover:text-[#080C0A]"
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
                      className={`py-3 px-4 rounded font-semibold text-xs transition cursor-pointer ${
                        driverActionStatus === "declined"
                          ? "bg-[#FF5C35] text-white"
                          : "bg-[#080C0A] border border-[#233029] text-[#ECE7DA]/70 hover:text-white"
                      }`}
                    >
                      Decline (Wait for Ride)
                    </button>
                  </div>

                  {driverActionStatus === "accepted" ? (
                    <div className="p-3 rounded bg-[#16201B] border border-[#C8FF3D]/50 text-xs text-[#C8FF3D] font-mono flex items-center justify-between">
                      <span>
                        ✓ Dispatch Active: Saved 7.2 empty km + earned ₹8 pass
                        rebate.
                      </span>
                      {sessionBonus > 0 && (
                        <button
                          type="button"
                          onClick={() => setSessionBonus(0)}
                          className="underline text-[10px] ml-2 hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded bg-[#2a1215] border border-[#FF5C35]/50 text-xs text-[#FF5C35] font-mono">
                      ⚠️ Holdout Queue: Remaining in low-demand suburban hex (26
                      min empty wait or 7.2 km dead return).
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: "PASS REBATE ENGINE" — WARM EDITORIAL CREAM SECTION (#ECE7DA) */}
      <section
        id="saas"
        className="bg-[#ECE7DA] text-[#080C0A] py-24 relative z-20 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5C35]">
              PASS REBATE ENGINE • CROSS-VERTICAL SUBSIDY
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#080C0A] leading-[1.08]">
              Zero upfront risk for part-timers. 100% pass rebate when they
              deliver lunch.
            </h2>
            <p className="text-base text-[#080C0A]/75 leading-relaxed">
              Instead of charging a flat ₹29 upfront daily pass fee that scares
              away evening part-timers, drivers pay{" "}
              <strong>₹0 upfront (₹3/ride capped at ₹25)</strong>—and earn an{" "}
              <strong>₹8 instant pass rebate</strong> for every off-peak food or
              B2B parcel batch completed (funded by merchant B2B tech fees).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Sliders on Warm Cream */}
            <div className="lg:col-span-5 bg-white border border-[#080C0A]/15 rounded-xl p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#080C0A] border-b border-[#080C0A]/10 pb-3">
                Configure Driver Daily Volume
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Daily Commuter Trips</span>
                    <span className="font-mono text-sm">{dailyRides} Rides</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={dailyRides}
                    onChange={(e) => setDailyRides(Number(e.target.value))}
                    className="w-full cream-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Avg Commuter Fare</span>
                    <span className="font-mono text-sm">₹{avgRideFare}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={220}
                    step={5}
                    value={avgRideFare}
                    onChange={(e) => setAvgRideFare(Number(e.target.value))}
                    className="w-full cream-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#FF5C35]">
                      Off-Peak Food / Parcel Batches (12–4 PM)
                    </span>
                    <span className="font-mono text-sm font-bold text-[#FF5C35]">
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
                    className="w-full cream-slider"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#ECE7DA]/60 border border-[#080C0A]/15 text-xs space-y-1">
                <div className="font-bold text-[#080C0A]">
                  Cross-Vertical Subsidy Economics:
                </div>
                <p className="text-[#080C0A]/75 leading-relaxed">
                  Each food/parcel batch earns the platform ₹14 in B2B merchant
                  tech fees. Sharing ₹8 of that to rebate the driver&apos;s pass
                  makes their daily ride pass{" "}
                  <strong>
                    {m3FinalFee === 0 ? "100% FREE" : `only ₹${m3FinalFee}`}
                  </strong>{" "}
                  while solving mid-day delivery fleet shortages at zero CAC.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: 3 Pricing Model Comparison Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#080C0A]/15 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#080C0A]/10 rounded">
                    Legacy Model
                  </span>
                  <h4 className="font-serif text-xl font-bold mt-2">
                    22% Commission
                  </h4>
                  <p className="text-xs text-[#080C0A]/60 mt-1">
                    Platform deducts 22% from every ride fare.
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#080C0A]/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span>Gross Fare:</span>
                      <span>₹{totalGross}</span>
                    </div>
                    <div className="flex justify-between text-[#FF5C35] font-bold">
                      <span>Platform Cut:</span>
                      <span>-₹{m1Commission}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#080C0A]/10">
                  <div className="text-[10px] font-mono uppercase text-[#080C0A]/60">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-bold font-mono mt-0.5">
                    ₹{m1Net}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#080C0A]/15 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#080C0A]/10 rounded">
                    Current SaaS Pass
                  </span>
                  <h4 className="font-serif text-xl font-bold mt-2">
                    Flat ₹29 Pass
                  </h4>
                  <p className="text-xs text-[#080C0A]/60 mt-1">
                    Upfront daily fee for unlimited 0%-comm rides.
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#080C0A]/10 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span>Gross Fare:</span>
                      <span>₹{totalGross}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Upfront Pass:</span>
                      <span>-₹{m2PassFee}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#080C0A]/10">
                  <div className="text-[10px] font-mono uppercase text-[#080C0A]/60">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-bold font-mono mt-0.5">
                    ₹{m2Net}
                  </div>
                </div>
              </div>

              <div className="bg-[#080C0A] text-[#ECE7DA] rounded-xl p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#C8FF3D] text-[#080C0A] rounded">
                    OmniFleet Engine
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mt-2">
                    Flex-Cap + Rebate
                  </h4>
                  <p className="text-xs text-[#ECE7DA]/70 mt-1">
                    ₹0 upfront! ₹3/ride minus ₹8 per lunch food drop.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/15 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span>Base Flex Fee:</span>
                      <span>₹{rawFlexFee}</span>
                    </div>
                    <div className="flex justify-between text-[#C8FF3D] font-bold">
                      <span>Food Rebate:</span>
                      <span>-₹{foodPassRebate}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-white/10 pt-1">
                      <span>Net Pass Paid:</span>
                      <span>₹{m3FinalFee}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-white/15">
                  <div className="text-[10px] font-mono uppercase text-[#ECE7DA]/60">
                    Driver Net Take-Home
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#C8FF3D] mt-0.5">
                    ₹{m3Net}
                  </div>
                  <div className="text-[11px] font-mono text-[#C8FF3D] mt-0.5">
                    +₹{m3Net - m1Net} saved vs Commission
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: "THE PROOF (ENTERPRISE ROI CALCULATOR)" — OBSIDIAN DARK SECTION */}
      <section
        id="proof"
        className="bg-[#080C0A] text-[#ECE7DA] py-24 border-t border-white/10 relative z-20 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF3D]">
                THE PROOF • ENTERPRISE ROI &amp; EBITDA CALCULATOR
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Prove the EBITDA lift across your fleet.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex p-1 rounded-lg bg-[#101613] border border-[#233029] relative z-30">
                <button
                  type="button"
                  onClick={() => setCurrencyMode("INR")}
                  className={`px-3.5 py-1.5 rounded text-xs font-bold font-mono transition cursor-pointer ${
                    currencyMode === "INR"
                      ? "bg-[#C8FF3D] text-[#080C0A]"
                      : "text-[#ECE7DA]/70 hover:text-white"
                  }`}
                >
                  ₹ INR Crores (India)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("USD")}
                  className={`px-3.5 py-1.5 rounded text-xs font-bold font-mono transition cursor-pointer ${
                    currencyMode === "USD"
                      ? "bg-[#C8FF3D] text-[#080C0A]"
                      : "text-[#ECE7DA]/70 hover:text-white"
                  }`}
                >
                  $ USD Millions (Global)
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#16201B] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-mono font-bold hover:bg-[#C8FF3D] hover:text-[#080C0A] transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export P&amp;L Sheet (.CSV)
              </button>
            </div>
          </div>

          {/* Sliders + Output Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span>ACTIVE FLEET DAU:</span>
                  <strong className="text-[#C8FF3D]">
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
                  <span>CO-PILOT ADOPTION RATE:</span>
                  <strong className="text-[#C8FF3D]">{adoptionPct}%</strong>
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
                  <span>NET B2B TECH MARGIN / ORDER:</span>
                  <strong className="text-[#C8FF3D]">
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

            <div className="lg:col-span-8 bg-[#101613] border border-[#233029] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#080C0A] border-b border-[#233029] text-[#ECE7DA]/60 uppercase">
                    <tr>
                      <th className="p-4">P&amp;L Unit Economics Line Item</th>
                      <th className="p-4">Siloed Holdout</th>
                      <th className="p-4">With OmniFleet Active</th>
                      <th className="p-4">Net Annualized Lift</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#233029]">
                    <tr>
                      <td className="p-4 font-sans font-bold text-white">
                        Off-Peak Food &amp; B2B Logistics Tech Margin
                      </td>
                      <td className="p-4 text-[#ECE7DA]/60">
                        ₹0 Cr (Unutilized)
                      </td>
                      <td className="p-4 text-white font-bold">
                        {formatVal(annualLogisticsCr)} / yr
                      </td>
                      <td className="p-4 text-[#C8FF3D] font-bold">
                        +{formatVal(annualLogisticsCr)} / yr
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-sans font-bold text-white">
                        Retained Daily SaaS Pass Subscribers
                      </td>
                      <td className="p-4 text-[#ECE7DA]/60">
                        {basePassDrivers.toLocaleString("en-IN")} DAU (62%)
                      </td>
                      <td className="p-4 text-white font-bold">
                        {newPassDrivers.toLocaleString("en-IN")} DAU (76%)
                      </td>
                      <td className="p-4 text-[#C8FF3D] font-bold">
                        +{formatVal(annualPassCr)} / yr
                      </td>
                    </tr>
                    <tr className="bg-[#16201B]">
                      <td className="p-4 font-sans font-extrabold text-[#C8FF3D]">
                        TOTAL NET CONTRIBUTION MARGIN LIFT
                      </td>
                      <td className="p-4 text-[#ECE7DA]/60">Holdout Baseline</td>
                      <td className="p-4 font-bold text-white">
                        Multimodal Fleet OS
                      </td>
                      <td className="p-4 text-lg font-extrabold text-[#C8FF3D]">
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

      {/* ENTERPRISE FOOTER */}
      <footer className="bg-[#050806] text-[#ECE7DA]/60 py-16 border-t border-white/10 text-xs relative z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-[#C8FF3D]" />
            <span className="font-serif text-base font-bold text-white">
              OmniFleet
            </span>
            <span>
              • Multimodal Dispatch &amp; Fleet Recovery Infrastructure •
              Engineered by <strong className="text-white">Abhinav Thakur</strong>
            </span>
          </div>
          <div className="font-mono text-[11px]">
            H3 Spatial Routing API • Real-Time Switchback Telemetry • Enterprise
            Fleet OS
          </div>
        </div>
      </footer>
    </div>
  );
}
