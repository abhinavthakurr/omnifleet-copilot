"use client";

import React, { useState } from "react";
import {
  Utensils,
  Package,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export type PlatformPreset = "superapp" | "zerocomm" | "opennet";

interface Props {
  preset: PlatformPreset;
}

export default function MultimodalSimulator({ preset }: Props) {
  const [vehicle, setVehicle] = useState<"2w" | "3w" | "4w">("2w");
  const [cityTier, setCityTier] = useState<"metro" | "tier2">("metro");
  const [shiftHours, setShiftHours] = useState<number>(10);
  const [coPilotActive, setCoPilotActive] = useState<boolean>(true);
  const [foodBatchEnabled, setFoodBatchEnabled] = useState<boolean>(true);
  const [b2bParcelEnabled, setB2bParcelEnabled] = useState<boolean>(true);
  const [driverActionStatus, setDriverActionStatus] = useState<
    "idle" | "accepted" | "declined"
  >("idle");
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Calculations
  const baseHourlyMap = { "2w": 105, "3w": 148, "4w": 215 };
  const baseHourly =
    baseHourlyMap[vehicle] * (cityTier === "metro" ? 1.12 : 0.92);

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

  const offPeakUtil = coPilotActive
    ? foodBatchEnabled && b2bParcelEnabled
      ? 84
      : 62
    : 31;

  // 12-point hourly curve from 08:00 to 22:00 for SVG Area Chart
  const chartData = [
    { hour: "08:00", base: 155, multi: 165, label: "Morning Rush" },
    { hour: "09:30", base: 175, multi: 185, label: "Peak Commute" },
    { hour: "11:00", base: 115, multi: 152, label: "Mid-Morning Transition" },
    { hour: "12:30", base: 72, multi: 168, label: "Lunch Food Batch Surge" },
    { hour: "14:00", base: 65, multi: 154, label: "Off-Peak Slump Eliminated" },
    { hour: "15:30", base: 68, multi: 148, label: "B2B Dark Store Restock" },
    { hour: "17:00", base: 135, multi: 172, label: "Pre-Evening Commute" },
    { hour: "18:30", base: 185, multi: 198, label: "Evening Rush Peak" },
    { hour: "20:00", base: 140, multi: 178, label: "Dinner Batching Start" },
    { hour: "21:30", base: 95, multi: 162, label: "Late-Night Food + Return" },
  ].map((pt) => {
    const scale = (vehicle === "4w" ? 1.8 : vehicle === "3w" ? 1.3 : 1.0) *
      (cityTier === "metro" ? 1.08 : 0.9);
    const bVal = Math.round(pt.base * scale);
    const mBoost =
      (coPilotActive && foodBatchEnabled ? 0.55 : 0) +
      (coPilotActive && b2bParcelEnabled ? 0.45 : 0);
    const mVal = Math.round(
      bVal + (pt.multi - pt.base) * scale * mBoost
    );
    return { ...pt, baseVal: bVal, multiVal: mVal };
  });

  const maxChartY = Math.max(...chartData.map((d) => d.multiVal)) * 1.15;

  // Generate SVG path coordinates (width 640, height 180)
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

  return (
    <div className="space-y-6">
      {/* Top 4 FAANG-Style Metric Cards with Hairline Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Net Driver Take-Home
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              +{Math.round((dailyDelta / baselineTakeHome) * 100)}% Lift
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
              ₹{dailyNetTakeHome.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              / {shiftHours}h shift
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Rides-Only Baseline:</span>
            <span className="font-mono font-semibold text-slate-700">
              ₹{baselineTakeHome.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Hourly Earnings Floor
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
              Guaranteed
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
              ₹{effectiveHourly}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ hour</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>11 AM – 4 PM Trough:</span>
            <span className="font-semibold text-emerald-700">Eliminated</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Empty Dead-Mile Ratio
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              -{(27.5 - deadMileRatio).toFixed(1)}% Empty Km
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
              {deadMileRatio}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              of driven km
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Siloed Fleet Baseline:</span>
            <span className="font-mono font-semibold text-red-600">27.5%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Off-Peak Utilization
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
              11 AM – 5 PM
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
              {offPeakUtil}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              active time
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Idle Wait Reduction:</span>
            <span className="font-semibold text-emerald-700">-68% Wait</span>
          </div>
        </div>
      </div>

      {/* Main Split Console: Left = Telemetry & Area Chart (7 cols), Right = Live Map & Driver HUD (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Custom Segmented Controls Card (ZERO Native Selects) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Marketplace Supply & Cross-Dispatch Configuration
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure fleet vehicle class, city density, and active supply pooling verticals
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Shift: {shiftHours} Hours
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Custom Segmented Pill: Vehicle Class */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Fleet Vehicle Class
                </label>
                <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
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
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        vehicle === v.id
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Segmented Pill: City Cluster */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Market Geography
                </label>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
                  {(
                    [
                      { id: "metro", label: "Tier-1 Metro Hub" },
                      { id: "tier2", label: "Tier-2 Smart City" },
                    ] as const
                  ).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCityTier(c.id)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        cityTier === c.id
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shift Hours Precision Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Daily Active Shift Length
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {shiftHours} Hours / day
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={14}
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>4h (Part-Time Student)</span>
                <span>8h (Standard Shift)</span>
                <span>14h (Full-Time Power Driver)</span>
              </div>
            </div>

            {/* 3-Vertical Supply Pooling Cards */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2.5">
                Multimodal Supply Pooling (Click to toggle vertical integration):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setCoPilotActive(!coPilotActive)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    coPilotActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">1. Co-Pilot Dispatch</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        coPilotActive ? "bg-emerald-400" : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] mt-1 leading-snug ${
                      coPilotActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    Directional return chaining
                  </p>
                </button>

                <button
                  onClick={() => setFoodBatchEnabled(!foodBatchEnabled)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    foodBatchEnabled && coPilotActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">2. Zero-Comm Food</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        foodBatchEnabled && coPilotActive
                          ? "bg-amber-400"
                          : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] mt-1 leading-snug ${
                      foodBatchEnabled && coPilotActive
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    Ownly / Eats lunch & dinner
                  </p>
                </button>

                <button
                  onClick={() => setB2bParcelEnabled(!b2bParcelEnabled)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    b2bParcelEnabled && coPilotActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">3. B2B Express</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        b2bParcelEnabled && coPilotActive
                          ? "bg-teal-400"
                          : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] mt-1 leading-snug ${
                      b2bParcelEnabled && coPilotActive
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    Dark stores & pharmacy drops
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive SVG Area Chart: 24-Hour Fleet Revenue Trajectory */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Hourly Earnings Trajectory: Siloed Rides vs. OmniFleet Multimodal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hover over any daypart node to inspect how Zero-Commission Food & B2B Parcels bridge the 11 AM – 5 PM trough
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-0.5 bg-slate-400 inline-block border-t border-dashed border-slate-400" />
                  Rides-Only Baseline
                </span>
                <span className="flex items-center gap-1.5 text-slate-900">
                  <span className="w-3 h-2 rounded-sm bg-slate-900 inline-block" />
                  OmniFleet Multimodal
                </span>
              </div>
            </div>

            {/* SVG Chart Canvas */}
            <div className="relative pt-2">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-48 overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="multiAreaGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0F172A" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
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
                        stroke="#F1F5F9"
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

                {/* Multimodal Filled Area */}
                <path d={multiAreaPath} fill="url(#multiAreaGrad)" />

                {/* Baseline Dashed Line (Siloed Rides Only) */}
                <polyline
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  points={basePoints}
                />

                {/* Multimodal Solid Line */}
                <polyline
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  points={multiPoints}
                />

                {/* Interactive Data Points */}
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
                      {/* Hover Vertical Guideline */}
                      {isHovered && (
                        <line
                          x1={cx}
                          y1={10}
                          x2={cx}
                          y2={chartH - 15}
                          stroke="#CBD5E1"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Baseline Point */}
                      <circle
                        cx={cx}
                        cy={cyBase}
                        r={isHovered ? 4 : 2.5}
                        fill="#94A3B8"
                      />

                      {/* Multimodal Point */}
                      <circle
                        cx={cx}
                        cy={cyMulti}
                        r={isHovered ? 5.5 : 3.5}
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />

                      {/* X-Axis Hour Label */}
                      <text
                        x={cx}
                        y={chartH - 2}
                        textAnchor="middle"
                        fontSize="9.5"
                        fill={isHovered ? "#0F172A" : "#64748B"}
                        fontWeight={isHovered ? "bold" : "normal"}
                        fontFamily="monospace"
                      >
                        {d.hour}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Hover Inspector Banner */}
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                {hoveredHour !== null ? (
                  <>
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">
                        {chartData[hoveredHour].hour}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {chartData[hoveredHour].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-slate-500">
                        Rides-Only:{" "}
                        <strong>₹{chartData[hoveredHour].baseVal}/hr</strong>
                      </span>
                      <span className="text-emerald-700 font-bold">
                        OmniFleet: ₹{chartData[hoveredHour].multiVal}/hr (+₹
                        {chartData[hoveredHour].multiVal -
                          chartData[hoveredHour].baseVal}
                        /hr)
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-slate-600 font-medium">
                      💡 <strong>Mid-Day Trough Analysis (12:30 – 15:30):</strong>{" "}
                      Rides-only earnings drop to ₹65–₹72/hr, whereas OmniFleet maintains{" "}
                      <strong className="text-slate-900">₹154–₹168/hr</strong> via neighborhood food & B2B parcel batches.
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Split-Screen Interactive Map Console & Driver HUD (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden sticky top-24">
            {/* Console Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                  Live Spatial Dispatch HUD
                </span>
                <span className="text-[11px] text-slate-500">
                  H3 Level-8 Return-Route Chain Optimization
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE MATCH
              </span>
            </div>

            {/* Interactive Vector Map Canvas */}
            <div className="relative h-56 bg-[#0F172A] overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 420 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dark Slate Map Base */}
                <rect width="420" height="220" fill="#0F172A" />

                {/* Subtle H3 Hexagonal Grid Overlay */}
                <g stroke="#1E293B" strokeWidth="1" opacity="0.8">
                  <polygon points="60,20 100,20 120,55 100,90 60,90 40,55" />
                  <polygon points="160,20 200,20 220,55 200,90 160,90 140,55" />
                  <polygon points="260,20 300,20 320,55 300,90 260,90 240,55" />
                  <polygon points="110,105 150,105 170,140 150,175 110,175 90,140" />
                  <polygon points="210,105 250,105 270,140 250,175 210,175 190,140" />
                  <polygon points="310,105 350,105 370,140 350,175 310,175 290,140" />
                </g>

                {/* Highway & Arterial Roads */}
                <path
                  d="M0 160 Q 140 150, 240 110 T 420 40"
                  stroke="#1E293B"
                  strokeWidth="12"
                />
                <path
                  d="M0 160 Q 140 150, 240 110 T 420 40"
                  stroke="#334155"
                  strokeWidth="2"
                />

                {/* Animated Multi-Hop Route Polyline */}
                <path
                  d="M55 165 C 95 165, 115 85, 155 85 C 195 85, 225 125, 265 125 C 305 125, 330 55, 365 55"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />

                {/* Node 0: Current Suburban Drop Point */}
                <circle
                  cx="55"
                  cy="165"
                  r="7"
                  fill="#0F172A"
                  stroke="#F8FAFC"
                  strokeWidth="2.5"
                />
                <text
                  x="55"
                  y="185"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  IT Park Drop
                </text>

                {/* Hop 1: Zero-Comm Restaurant Pickup */}
                <circle
                  cx="155"
                  cy="85"
                  r="7"
                  fill="#EA580C"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <rect
                  x="115"
                  y="56"
                  width="80"
                  height="18"
                  rx="4"
                  fill="#0F172A"
                  stroke="#EA580C"
                  strokeWidth="1"
                />
                <text
                  x="155"
                  y="68"
                  textAnchor="middle"
                  fill="#FDBA74"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Hop 1: +₹75 Food
                </text>

                {/* Hop 2: Express B2B Dark Store */}
                <circle
                  cx="265"
                  cy="125"
                  r="7"
                  fill="#0D9488"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <rect
                  x="225"
                  y="138"
                  width="80"
                  height="18"
                  rx="4"
                  fill="#0F172A"
                  stroke="#0D9488"
                  strokeWidth="1"
                />
                <text
                  x="265"
                  y="150"
                  textAnchor="middle"
                  fill="#5EEAD4"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Hop 2: +₹45 B2B
                </text>

                {/* Hop 3: High-Surge CBD Commuter */}
                <circle
                  cx="365"
                  cy="55"
                  r="8"
                  fill="#0284C7"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <rect
                  x="315"
                  y="25"
                  width="90"
                  height="18"
                  rx="4"
                  fill="#0F172A"
                  stroke="#38BDF8"
                  strokeWidth="1"
                />
                <text
                  x="360"
                  y="37"
                  textAnchor="middle"
                  fill="#7DD3FC"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Hop 3: +₹65 Ride
                </text>
              </svg>

              {/* Top Floating Map Telemetry Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 text-[11px] text-white flex items-center gap-2">
                <span className="text-slate-400">Zone:</span>
                <span className="font-mono font-bold text-amber-400">
                  H3-8861a (Low Return Liquidity)
                </span>
              </div>
            </div>

            {/* Clean Editorial Dispatch Sheet */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Recommended Directional Chain
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">
                    3-Hop Return to Downtown CBD
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    ₹185 Guaranteed
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1 font-mono">
                    Saved 7.2 empty km
                  </span>
                </div>
              </div>

              {/* 3 Structured Route Steps */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Zero-Commission Restaurant Batch
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Meghana Foods • 2 Lunch Drops (3.1 km en route)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ₹75
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Apollo Dark Store Express Parcel
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Pre-scanned B2B Medical Drop (2.4 km en route)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ₹45
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Pre-Matched Commuter Passenger
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Ring Road Metro → Downtown Commercial Core
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ₹65
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setDriverActionStatus("accepted")}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
                >
                  Accept Smart Chain
                </button>
                <button
                  onClick={() => setDriverActionStatus("declined")}
                  className="py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  Wait for Direct Ride
                </button>
              </div>

              {/* Status Feedback */}
              {driverActionStatus === "accepted" && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Chain Dispatched:</strong> Navigating 150m to Meghana Foods. You eliminated <strong>7.2 empty dead km</strong> and earned ₹8 toward today&apos;s SaaS pass rebate.
                  </div>
                </div>
              )}

              {driverActionStatus === "declined" && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Siloed Queue:</strong> Remaining in low-demand suburban hex. Expected wait for a direct commuter ride is 24 mins.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
