"use client";

import React, { useState } from "react";
import {
  Utensils,
  Package,
  Navigation,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  Fuel,
  TrendingUp,
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

  const hourlyTimeline = [
    {
      time: "08:00 – 11:00",
      label: "Morning Commute Rush",
      rideShare: 88,
      foodShare: coPilotActive && foodBatchEnabled ? 12 : 0,
      parcelShare: 0,
      baseEarn: Math.round(baseHourly * 1.35),
    },
    {
      time: "11:00 – 14:30",
      label: "Lunch Window (Zero-Comm Food Surge)",
      rideShare: 35,
      foodShare: coPilotActive && foodBatchEnabled ? 55 : 0,
      parcelShare: coPilotActive && b2bParcelEnabled ? 10 : 0,
      baseEarn: Math.round(baseHourly * 0.65),
    },
    {
      time: "14:30 – 17:00",
      label: "Afternoon Trough (B2B Express & Dark Stores)",
      rideShare: 30,
      foodShare: coPilotActive && foodBatchEnabled ? 15 : 0,
      parcelShare: coPilotActive && b2bParcelEnabled ? 55 : 0,
      baseEarn: Math.round(baseHourly * 0.58),
    },
    {
      time: "17:00 – 20:30",
      label: "Evening Office Commute Peak",
      rideShare: 85,
      foodShare: coPilotActive && foodBatchEnabled ? 10 : 0,
      parcelShare: coPilotActive && b2bParcelEnabled ? 5 : 0,
      baseEarn: Math.round(baseHourly * 1.42),
    },
    {
      time: "20:30 – 23:00",
      label: "Dinner & Late-Night Return Batching",
      rideShare: 45,
      foodShare: coPilotActive && foodBatchEnabled ? 45 : 0,
      parcelShare: coPilotActive && b2bParcelEnabled ? 10 : 0,
      baseEarn: Math.round(baseHourly * 0.88),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Cols: Analytical Controls & 24-Hour Stack */}
      <div className="lg:col-span-7 space-y-6">
        {/* Executive KPI Strip */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="p-4">
            <div className="text-xs font-medium text-slate-500">
              Net Driver Take-Home
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
              ₹{dailyNetTakeHome.toLocaleString("en-IN")}
            </div>
            <div className="mt-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {dailyDelta >= 0 ? `+₹${dailyDelta} vs Rides-Only` : "Baseline"}
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs font-medium text-slate-500">
              Hourly Earnings Floor
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
              ₹{effectiveHourly}
              <span className="text-sm font-normal text-slate-500">/hr</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Eliminates 11 AM–4 PM trough
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs font-medium text-slate-500">
              Empty Dead-Mile Ratio
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
              {deadMileRatio}%
            </div>
            <div className="mt-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              -{(27.5 - deadMileRatio).toFixed(1)}% empty km
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs font-medium text-slate-500">
              Off-Peak Utilization
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
              {offPeakUtil}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Active time (11 AM – 5 PM)
            </div>
          </div>
        </div>

        {/* Simulation Control Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              Fleet & Marketplace Parameters
            </h2>
            <span className="text-xs text-slate-500">
              Interactive Supply-Side Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vehicle Category
              </label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
              >
                <option value="2w">2-Wheeler (Bike / Scooter)</option>
                <option value="3w">3-Wheeler (Auto Rickshaw)</option>
                <option value="4w">4-Wheeler (Mini / Sedan Cab)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                City Density Cluster
              </label>
              <select
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
              >
                <option value="metro">Tier-1 Metro (IT Corridors)</option>
                <option value="tier2">Tier-2 Emerging Smart Cities</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Shift Duration
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {shiftHours} hrs
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={14}
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full mt-1.5"
              />
            </div>
          </div>

          {/* 3-Vertical Supply Pooling Toggles */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-700 mb-2.5">
              Active Cross-Dispatch Supply Pooling (Toggle to test isolation vs multimodal):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCoPilotActive(!coPilotActive)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  coPilotActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Co-Pilot Routing</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      coPilotActive ? "bg-emerald-400" : "bg-slate-300"
                    }`}
                  />
                </div>
                <div
                  className={`text-[11px] mt-1 ${
                    coPilotActive ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Directional return chaining
                </div>
              </button>

              <button
                onClick={() => setFoodBatchEnabled(!foodBatchEnabled)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  foodBatchEnabled && coPilotActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Zero-Comm Food</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      foodBatchEnabled && coPilotActive
                        ? "bg-orange-400"
                        : "bg-slate-300"
                    }`}
                  />
                </div>
                <div
                  className={`text-[11px] mt-1 ${
                    foodBatchEnabled && coPilotActive
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  Lunch (12–3) & Dinner (8–11)
                </div>
              </button>

              <button
                onClick={() => setB2bParcelEnabled(!b2bParcelEnabled)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  b2bParcelEnabled && coPilotActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">B2B Express Parcel</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      b2bParcelEnabled && coPilotActive
                        ? "bg-teal-400"
                        : "bg-slate-300"
                    }`}
                  />
                </div>
                <div
                  className={`text-[11px] mt-1 ${
                    b2bParcelEnabled && coPilotActive
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  Afternoon dead-mile filler
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 24-Hour Fleet Utilization & Revenue Stack */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Daypart Utilization & Hourly Revenue Stack
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cross-dispatching eliminates the 11:00 – 17:00 commuter trough via restaurant & dark-store batches
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-600 inline-block" />
                Commuter Rides
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 inline-block" />
                Zero-Comm Food
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-600 inline-block" />
                B2B Parcel
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {hourlyTimeline.map((slot, idx) => {
              const slotHourly = Math.round(
                slot.baseEarn *
                  (1 + slot.foodShare * 0.006 + slot.parcelShare * 0.005)
              );
              return (
                <div key={idx} className="py-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-medium text-slate-500 w-24">
                        {slot.time}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {slot.label}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      ₹{slotHourly}/hr
                    </span>
                  </div>

                  {/* Clean Segmented Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${slot.rideShare}%` }}
                      className="bg-sky-600 h-full transition-all duration-300"
                      title={`Commuter Rides: ${slot.rideShare}%`}
                    />
                    <div
                      style={{ width: `${slot.foodShare}%` }}
                      className="bg-orange-500 h-full transition-all duration-300"
                      title={`Zero-Commission Food: ${slot.foodShare}%`}
                    />
                    <div
                      style={{ width: `${slot.parcelShare}%` }}
                      className="bg-teal-600 h-full transition-all duration-300"
                      title={`B2B Express Parcel: ${slot.parcelShare}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Realistic iPhone 15 Pro Driver App Preview */}
      <div className="lg:col-span-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Driver Co-Pilot Interface
              </span>
              <span className="text-[11px] text-slate-500">
                Interactive 3-Hop Directional Return Chain
              </span>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded bg-slate-900 text-white">
              Live Simulation
            </span>
          </div>

          {/* Sleek iPhone Frame */}
          <div className="mx-auto max-w-[340px] rounded-[36px] border-[8px] border-slate-900 bg-slate-900 shadow-xl overflow-hidden">
            {/* iOS Status Bar */}
            <div className="bg-slate-900 text-white px-5 py-2 flex items-center justify-between text-[11px] font-medium">
              <span>12:42</span>
              <div className="w-16 h-3.5 bg-black rounded-full" />
              <span className="font-mono text-[10px] text-emerald-400">
                ONLINE
              </span>
            </div>

            {/* Simulated Vector Navigation Map Header */}
            <div className="relative h-36 bg-slate-800 overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 340 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background road grid */}
                <rect width="340" height="140" fill="#1E293B" />
                <path
                  d="M0 30H340M0 85H340M0 120H340M60 0V140M170 0V140M280 0V140"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Route Polyline (Tech Park -> Food Hub -> Pharmacy -> Metro CBD) */}
                <path
                  d="M45 110 C 80 110, 105 55, 135 55 C 165 55, 200 75, 230 75 C 260 75, 280 35, 305 35"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />
                {/* Waypoint 1: Start */}
                <circle cx="45" cy="110" r="6" fill="#0F172A" stroke="#F8FAFC" strokeWidth="2" />
                {/* Waypoint 2: Food Pickup */}
                <circle cx="135" cy="55" r="6" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
                {/* Waypoint 3: B2B Parcel */}
                <circle cx="230" cy="75" r="6" fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />
                {/* Waypoint 4: CBD Commuter */}
                <circle cx="305" cy="35" r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Map Floating Pill */}
              <div className="absolute top-2.5 left-3 right-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-slate-700 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-300">
                  Outer Tech Park Zone
                </span>
                <span className="font-mono font-bold text-amber-400">
                  Wait: 24m (Rides Only)
                </span>
              </div>
            </div>

            {/* Clean Editorial Bottom Sheet */}
            <div className="bg-white text-slate-900 p-4 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Co-Pilot Directional Chain
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    3-Hop Return to City Center
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    ₹185 Net
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    0.2 km dead miles
                  </span>
                </div>
              </div>

              {/* 3 Route Hops List */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-orange-100 text-orange-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Zero-Comm Restaurant Batch
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Meghana Foods → 2 Lunch Drops (3.1 km)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₹75
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-teal-100 text-teal-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Apollo Dark Store Express
                      </div>
                      <div className="text-[11px] text-slate-500">
                        B2B Medical Parcel en route (2.4 km)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₹45
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-sky-100 text-sky-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">
                        Pre-Matched Commuter Ride
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Ring Road Metro → Downtown CBD
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₹65
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setDriverActionStatus("accepted")}
                  className="py-2.5 px-3 rounded-lg font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
                >
                  Accept Chain
                </button>
                <button
                  onClick={() => setDriverActionStatus("declined")}
                  className="py-2.5 px-3 rounded-lg font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  Decline (Wait)
                </button>
              </div>

              {/* Clean Status Banner */}
              {driverActionStatus === "accepted" && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Route Locked:</strong> Navigating 150m to Meghana Foods. Saved <strong>7.2 empty km</strong> and guaranteed ₹185/hr.
                  </div>
                </div>
              )}

              {driverActionStatus === "declined" && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Standard Queue:</strong> Waiting in suburban low-demand hex (Est. wait 24 mins or 7.2 km empty ride back).
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
