"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  Utensils,
  Package,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Layers,
  Users,
  Calculator,
} from "lucide-react";

type PlatformPreset = "superapp" | "zerocomm" | "opennet";

export default function HomePage() {
  // Interactive State for Multimodal Co-Pilot Simulator
  const [preset, setPreset] = useState<PlatformPreset>("zerocomm");
  const [vehicle, setVehicle] = useState<"2w" | "3w" | "4w">("2w");
  const [shiftHours, setShiftHours] = useState<number>(10);
  const [coPilotActive, setCoPilotActive] = useState<boolean>(true);
  const [foodBatchEnabled, setFoodBatchEnabled] = useState<boolean>(true);
  const [b2bParcelEnabled, setB2bParcelEnabled] = useState<boolean>(true);
  const [driverActionStatus, setDriverActionStatus] = useState<
    "idle" | "accepted" | "declined"
  >("idle");
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Interactive State for SaaS Pass Engine
  const [dailyRides, setDailyRides] = useState<number>(5);
  const [avgRideFare, setAvgRideFare] = useState<number>(95);
  const [offPeakFoodDrops, setOffPeakFoodDrops] = useState<number>(3);

  // Interactive State for Executive P&L Calculator
  const [fleetDau, setFleetDau] = useState<number>(450000);
  const [adoptionPct, setAdoptionPct] = useState<number>(38);
  const [netMarginPerBatch, setNetMarginPerBatch] = useState<number>(14);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD">("INR");

  // --- Calculations for Co-Pilot Simulator ---
  const baseHourlyMap = { "2w": 105, "3w": 148, "4w": 215 };
  const baseHourly = baseHourlyMap[vehicle] * 1.12;
  const foodBoost = coPilotActive && foodBatchEnabled ? baseHourly * 0.18 : 0;
  const parcelBoost = coPilotActive && b2bParcelEnabled ? baseHourly * 0.14 : 0;
  const effectiveHourly = Math.round(baseHourly + foodBoost + parcelBoost);
  const dailyNetTakeHome = Math.round(effectiveHourly * shiftHours);
  const baselineTakeHome = Math.round(baseHourly * shiftHours);
  const dailyDelta = dailyNetTakeHome - baselineTakeHome;
  const deadMileRatio = coPilotActive
    ? b2bParcelEnabled && foodBatchEnabled
      ? 9.4
      : 14.2
    : 27.5;

  // 10-point hourly curve for SVG Area Chart
  const chartData = [
    { hour: "08:00", base: 155, multi: 165, label: "Morning Commute Rush" },
    { hour: "09:30", base: 175, multi: 185, label: "Peak Office Commute" },
    { hour: "11:00", base: 115, multi: 152, label: "Mid-Morning Transition" },
    { hour: "12:30", base: 72, multi: 168, label: "Lunch Zero-Comm Food Surge" },
    { hour: "14:00", base: 65, multi: 154, label: "Off-Peak Trough Eliminated" },
    { hour: "15:30", base: 68, multi: 148, label: "B2B Dark Store Restock" },
    { hour: "17:00", base: 135, multi: 172, label: "Pre-Evening Commute" },
    { hour: "18:30", base: 185, multi: 198, label: "Evening Rush Peak" },
    { hour: "20:00", base: 140, multi: 178, label: "Dinner Batching Start" },
    { hour: "21:30", base: 95, multi: 162, label: "Late-Night Food + Return" },
  ].map((pt) => {
    const scale = vehicle === "4w" ? 1.8 : vehicle === "3w" ? 1.3 : 1.0;
    const bVal = Math.round(pt.base * scale);
    const mBoost =
      (coPilotActive && foodBatchEnabled ? 0.55 : 0) +
      (coPilotActive && b2bParcelEnabled ? 0.45 : 0);
    const mVal = Math.round(bVal + (pt.multi - pt.base) * scale * mBoost);
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

  // --- Calculations for Executive P&L Sheet ---
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

  return (
    <div className="min-h-screen bg-[#080C0A] text-[#ECE7DA] selection:bg-[#C8FF3D] selection:text-[#080C0A]">
      {/* TOP MINIMAL EDITORIAL NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#080C0A]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-[#C8FF3D] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#080C0A]" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#ECE7DA]">
              OmniFleet
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#ECE7DA]/70">
            <a href="#leak" className="hover:text-[#C8FF3D] transition-colors">
              The leak
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#C8FF3D] transition-colors"
            >
              How it works
            </a>
            <a
              href="#copilot"
              className="hover:text-[#C8FF3D] transition-colors"
            >
              Live Co-Pilot
            </a>
            <a href="#saas" className="hover:text-[#C8FF3D] transition-colors">
              SaaS Pass Engine
            </a>
            <a href="#proof" className="hover:text-[#C8FF3D] transition-colors">
              The proof (P&L)
            </a>
          </nav>

          <a
            href="#copilot"
            className="bg-[#C8FF3D] text-[#080C0A] text-xs font-bold px-4 py-2.5 rounded hover:bg-[#d6ff66] transition-colors"
          >
            Test Simulator →
          </a>
        </div>
      </header>

      {/* SECTION 1: HERO (TRUELIFT OBSIDIAN DARK STYLE) */}
      <section className="relative overflow-hidden pt-14 pb-24 md:py-24">
        {/* Subtle radial ambient glow */}
        <div
          className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px]"
          style={{ background: "#C8FF3D" }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
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
              into directional return routes—and proves the net EBITDA lift.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#copilot"
                className="bg-[#C8FF3D] text-[#080C0A] font-bold text-sm px-6 py-3.5 rounded flex items-center gap-2 hover:bg-[#d6ff66] transition"
              >
                Explore Interactive Co-Pilot <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#proof"
                className="border border-white/20 text-[#ECE7DA] font-semibold text-sm px-6 py-3.5 rounded hover:bg-white/5 transition"
              >
                View ₹222 Cr P&amp;L Model
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#ECE7DA]/70">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Fits Uber
                (Rides + Eats + Direct)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Fits Rapido
                (Rides + Ownly Zero-Comm Food)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C8FF3D]" /> Fits ONDC /
                Namma Yatri
              </span>
            </div>
          </div>

          {/* Right Hero Card: TrueLift Live Recovery Proof Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#233029] pb-4 text-xs font-mono">
                <span className="text-[#ECE7DA]/60 tracking-wider">
                  OMNIFLEET.OS / FLEET RECOVERY
                </span>
                <span className="flex items-center gap-1.5 text-[#C8FF3D] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C8FF3D] animate-pulse" />
                  LIVE MODEL
                </span>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#ECE7DA]/60">
                  NET ANNUAL CONTRIBUTION MARGIN LIFT • 450K FLEET DAU
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#C8FF3D] tracking-tight mt-1">
                  {formatVal(totalAnnualCr)}
                </div>
                <div className="text-xs text-[#ECE7DA]/70 mt-1.5">
                  142,000 daily dead-mile suburban drops converted into
                  revenue-generating return chains
                </div>
              </div>

              {/* 7-Bar Visual Histogram (TrueLift signature visual) */}
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
                Illustrated: Net incremental contribution margin from off-peak
                B2B/food tech fees + retained daily subscription passes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HIGH-CONTRAST CHARTREUSE LIME TICKER BANNER */}
      <div className="bg-[#C8FF3D] text-[#080C0A] py-3.5 border-y border-black overflow-x-auto">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-8 text-xs sm:text-sm font-bold whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="bg-[#080C0A] text-[#C8FF3D] px-2 py-0.5 font-mono text-xs">
              27.5%
            </span>
            <span>empty dead miles after suburban drops</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="bg-[#080C0A] text-[#C8FF3D] px-2 py-0.5 font-mono text-xs">
              11 AM – 4 PM
            </span>
            <span>commuter demand drops by 65%</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="bg-[#080C0A] text-[#C8FF3D] px-2 py-0.5 font-mono text-xs">
              ₹0 Upfront
            </span>
            <span>Flex-Cap pass eliminates part-timer friction</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="bg-[#080C0A] text-[#C8FF3D] px-2 py-0.5 font-mono text-xs">
              100% Free Pass
            </span>
            <span>after completing 3 off-peak food drops</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: "THE LEAK" — WARM EDITORIAL CREAM SECTION (#ECE7DA) */}
      <section id="leak" className="bg-[#ECE7DA] text-[#080C0A] py-24">
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

          {/* 3 Numbered Editorial Rows (TrueLift signature layout) */}
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
        </div>
      </section>

      {/* SECTION 4: "HOW IT WORKS & LIVE CO-PILOT SIMULATOR" (#080C0A OBSIDIAN DARK) */}
      <section
        id="how-it-works"
        className="bg-[#080C0A] text-[#ECE7DA] py-24 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF3D]">
                HOW IT WORKS • INTERACTIVE CO-PILOT
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#ECE7DA]">
                Detect. Chain. Rebate. Prove.
              </h2>
              <p className="text-base text-[#ECE7DA]/70 max-w-2xl">
                When a driver completes a drop in a low-liquidity H3 hexagon,
                OmniFleet automatically chains directional food &amp; B2B parcel
                hops—guaranteeing ₹155+/hr across all dayparts.
              </p>
            </div>

            {/* Universal Platform Preset Switcher */}
            <div className="bg-[#101613] p-1.5 rounded-xl border border-[#233029] flex gap-1.5 self-start">
              {(
                [
                  { id: "zerocomm", label: "Rapido (Rides + Ownly Food)" },
                  { id: "superapp", label: "Uber (Rides + Eats + Direct)" },
                  { id: "opennet", label: "ONDC Open Network" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                    preset === p.id
                      ? "bg-[#C8FF3D] text-[#080C0A]"
                      : "text-[#ECE7DA]/70 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Co-Pilot Workspace (id="copilot") */}
          <div
            id="copilot"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left 7 Cols: Controls + 24-Hour Area Curve */}
            <div className="lg:col-span-7 space-y-6">
              {/* Control Bar */}
              <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#233029] pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      1. Configure Fleet &amp; Cross-Dispatch Pooling
                    </h3>
                    <p className="text-xs text-[#ECE7DA]/60 mt-0.5">
                      Toggle vertical pooling to observe live impact on dead
                      miles &amp; mid-day earnings
                    </p>
                  </div>

                  {/* Vehicle Segmented Pill */}
                  <div className="inline-flex p-1 bg-[#080C0A] rounded-lg border border-[#233029]">
                    {(
                      [
                        { id: "2w", label: "2W Bike" },
                        { id: "3w", label: "3W Auto" },
                        { id: "4w", label: "4W Cab" },
                      ] as const
                    ).map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVehicle(v.id)}
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
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

                {/* 3 Vertical Pooling Toggle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setCoPilotActive(!coPilotActive)}
                    className={`p-4 rounded-xl border text-left transition ${
                      coPilotActive
                        ? "bg-[#16201B] border-[#C8FF3D] text-white"
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
                      Eliminates empty return km
                    </p>
                  </button>

                  <button
                    onClick={() => setFoodBatchEnabled(!foodBatchEnabled)}
                    className={`p-4 rounded-xl border text-left transition ${
                      foodBatchEnabled && coPilotActive
                        ? "bg-[#16201B] border-[#FF5C35] text-white"
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
                      Ownly / Eats 12–3 PM batching
                    </p>
                  </button>

                  <button
                    onClick={() => setB2bParcelEnabled(!b2bParcelEnabled)}
                    className={`p-4 rounded-xl border text-left transition ${
                      b2bParcelEnabled && coPilotActive
                        ? "bg-[#16201B] border-[#38BDF8] text-white"
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
                      Pharmacy &amp; dark store drops
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
                      +₹{dailyDelta} vs Rides-Only
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
                      Mid-day slump solved
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
                      Down from 27.5%
                    </div>
                  </div>
                </div>
              </div>

              {/* 24-Hour SVG Area Curve Card */}
              <div className="bg-[#101613] border border-[#233029] rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      24-Hour Hourly Earnings Curve: Siloed Rides vs. OmniFleet
                    </h3>
                    <p className="text-xs text-[#ECE7DA]/60">
                      Hover over any daypart node to inspect exact hourly
                      recovery during 11 AM – 4 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#ECE7DA]/60">
                      <span className="w-3 h-0.5 border-t border-dashed border-[#ECE7DA]/60 inline-block" />
                      Siloed Rides
                    </span>
                    <span className="flex items-center gap-1.5 text-[#C8FF3D] font-bold">
                      <span className="w-3 h-2 bg-[#C8FF3D] inline-block rounded-sm" />
                      OmniFleet Multimodal
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
                            Rides-Only: ₹{chartData[hoveredHour].baseVal}/hr
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
                        ⚡ <strong>12:30 PM Lunch Slump Proof:</strong> Siloed
                        rides drop to ₹72/hr, while OmniFleet drivers earn{" "}
                        <strong className="text-[#C8FF3D]">₹168/hr</strong> via
                        directional food &amp; B2B batches.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive H3 Map HUD & Driver Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#101613] border border-[#233029] rounded-xl overflow-hidden shadow-2xl">
                <div className="px-5 py-4 border-b border-[#233029] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C8FF3D] uppercase block">
                      LIVE DRIVER CO-PILOT HUD
                    </span>
                    <span className="text-xs text-[#ECE7DA]/60">
                      H3 Level-8 Directional Return-Route Chaining
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#C8FF3D]/15 text-[#C8FF3D] border border-[#C8FF3D]/30">
                    0.2 KM DEAD MILES
                  </span>
                </div>

                {/* Vector H3 Route Map */}
                <div className="relative h-52 bg-[#080C0A] border-b border-[#233029]">
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
                    <path
                      d="M55 155 C 95 155, 115 75, 155 75 C 195 75, 225 115, 265 115 C 305 115, 330 45, 365 45"
                      stroke="#C8FF3D"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                    />
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
                      fill="#FF5C35"
                      stroke="#080C0A"
                      strokeWidth="2"
                    />
                    <circle
                      cx="265"
                      cy="115"
                      r="6"
                      fill="#38BDF8"
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
                  </svg>
                  <div className="absolute top-3 left-3 bg-[#101613]/90 border border-[#233029] px-3 py-1 rounded text-[11px] font-mono text-[#ECE7DA]/80">
                    Drop Zone: <strong className="text-[#FF5C35]">Outer IT Park (Wait: 26m)</strong>
                  </div>
                </div>

                {/* 3 Route Hops Breakdown */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-[#080C0A] border border-[#233029] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#FF5C35] block">
                          HOP 1 • ZERO-COMM RESTAURANT BATCH
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          Meghana Foods → 2 Neighborhood Drops (3.1 km)
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        +₹75
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#080C0A] border border-[#233029] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#38BDF8] block">
                          HOP 2 • B2B EXPRESS DARK STORE
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          Apollo Pharmacy Express → City Clinic (2.4 km)
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        +₹45
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#080C0A] border border-[#233029] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#C8FF3D] block">
                          HOP 3 • PRE-MATCHED COMMUTER
                        </span>
                        <div className="font-bold text-white mt-0.5">
                          Ring Road Metro → Downtown CBD Core
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#C8FF3D] text-sm">
                        +₹65
                      </span>
                    </div>
                  </div>

                  {/* Interactive Dispatch Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => setDriverActionStatus("accepted")}
                      className="py-3 px-4 rounded font-bold text-xs bg-[#C8FF3D] text-[#080C0A] hover:bg-[#d6ff66] transition"
                    >
                      Accept 3-Hop Chain (₹185)
                    </button>
                    <button
                      onClick={() => setDriverActionStatus("declined")}
                      className="py-3 px-4 rounded font-semibold text-xs bg-[#080C0A] border border-[#233029] text-[#ECE7DA]/70 hover:text-white transition"
                    >
                      Wait for Ride Only
                    </button>
                  </div>

                  {driverActionStatus === "accepted" && (
                    <div className="p-3 rounded bg-[#16201B] border border-[#C8FF3D]/50 text-xs text-[#C8FF3D] font-mono">
                      ✓ Chain Active! Saved 7.2 empty km and earned ₹8 toward
                      today&apos;s SaaS pass rebate.
                    </div>
                  )}
                  {driverActionStatus === "declined" && (
                    <div className="p-3 rounded bg-[#2a1215] border border-[#FF5C35]/50 text-xs text-[#FF5C35] font-mono">
                      ⚠️ Siloed Queue: Remaining in low-demand suburban hex
                      (Est. 26 min idle wait).
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "THE SAAS PASS ENGINE" — WARM EDITORIAL CREAM SECTION (#ECE7DA) */}
      <section id="saas" className="bg-[#ECE7DA] text-[#080C0A] py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5C35]">
              DYNAMIC SAAS PASS &amp; CROSS-VERTICAL REBATES
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
                Simulate Driver Daily Activity
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
                  Why the CFO &amp; Marketplace PM Both Win:
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
                    OmniFleet Innovation
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

      {/* SECTION 6: "THE PROOF (EXECUTIVE P&L MODEL)" — OBSIDIAN DARK SECTION */}
      <section
        id="proof"
        className="bg-[#080C0A] text-[#ECE7DA] py-24 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF3D]">
                THE PROOF • CFO UNIT ECONOMICS SHEET
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Prove the EBITDA lift across your fleet.
              </h2>
            </div>

            <div className="inline-flex p-1 rounded-lg bg-[#101613] border border-[#233029]">
              <button
                onClick={() => setCurrencyMode("INR")}
                className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition ${
                  currencyMode === "INR"
                    ? "bg-[#C8FF3D] text-[#080C0A]"
                    : "text-[#ECE7DA]/70"
                }`}
              >
                ₹ INR Crores (India)
              </button>
              <button
                onClick={() => setCurrencyMode("USD")}
                className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition ${
                  currencyMode === "USD"
                    ? "bg-[#C8FF3D] text-[#080C0A]"
                    : "text-[#ECE7DA]/70"
                }`}
              >
                $ USD Millions (Global)
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
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#080C0A] border-b border-[#233029] text-[#ECE7DA]/60 uppercase">
                  <tr>
                    <th className="p-4">P&amp;L Unit Economics Line Item</th>
                    <th className="p-4">Siloed Baseline</th>
                    <th className="p-4">With OmniFleet Co-Pilot</th>
                    <th className="p-4">Net Annualized Lift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#233029]">
                  <tr>
                    <td className="p-4 font-sans font-bold text-white">
                      Off-Peak Food &amp; B2B Logistics Tech Margin
                    </td>
                    <td className="p-4 text-[#ECE7DA]/60">₹0 Cr (Unutilized)</td>
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
                    <td className="p-4 text-[#ECE7DA]/60">Baseline EBITDA</td>
                    <td className="p-4 font-bold text-white">
                      Blended Super-App Fleet
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
      </section>

      {/* FOOTER: GROUND-TRUTH FIELD RESEARCH & SWITCHBACK METHODOLOGY */}
      <footer className="bg-[#050806] text-[#ECE7DA]/60 py-16 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-[#C8FF3D]" />
            <span className="font-serif text-base font-bold text-white">
              OmniFleet
            </span>
            <span>
              • Product Management Case Study &amp; Interactive Simulator by{" "}
              <strong className="text-white">Abhinav Thakur</strong>
            </span>
          </div>
          <div className="font-mono text-[11px]">
            Built with Next.js 14 • H3 Spatial Index • Switchback Experimentation Ready
          </div>
        </div>
      </footer>
    </div>
  );
}
