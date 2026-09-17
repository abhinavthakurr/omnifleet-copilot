"use client";

import React, { useState } from "react";
import {
  Zap,
  Utensils,
  Package,
  Navigation,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Smartphone,
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

  // Dynamic Calculations based on Vehicle, City, and Toggles
  const baseHourlyMap = { "2w": 105, "3w": 148, "4w": 215 };
  const baseHourly =
    baseHourlyMap[vehicle] * (cityTier === "metro" ? 1.12 : 0.92);

  // Boost from Zero-Commission Food (Lunch/Dinner) & B2B Parcels (Off-peak return routes)
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
      label: "Afternoon Slump (B2B & Dark Store Restock)",
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
      label: "Dinner & Late-Night Return Trip Batching",
      rideShare: 45,
      foodShare: coPilotActive && foodBatchEnabled ? 45 : 0,
      parcelShare: coPilotActive && b2bParcelEnabled ? 10 : 0,
      baseEarn: Math.round(baseHourly * 0.88),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 7 Cols: Controls & Hourly Blending Analytics */}
      <div className="lg:col-span-7 space-y-6">
        {/* Control Card */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold flex items-center gap-2 text-white">
              <Zap className="w-4 h-4 text-amber-400" />
              Multimodal Dispatch & Fleet Blending Controls
            </h2>
            <span className="text-xs text-gray-400">
              Real-time Marketplace Liquidity Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                Fleet Vehicle Class
              </label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value as any)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="2w">2-Wheeler (Bike Taxi / Scooter)</option>
                <option value="3w">3-Wheeler (Auto / Tuk-Tuk)</option>
                <option value="4w">4-Wheeler (Mini / Sedan Cab)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                Market Geography
              </label>
              <select
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as any)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="metro">Tier-1 Metro (Dense IT Corridors)</option>
                <option value="tier2">Tier-2 Emerging Smart Cities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                Shift Hours: <strong className="text-white">{shiftHours} hrs</strong>
              </label>
              <input
                type="range"
                min={4}
                max={14}
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Verticals Toggle Pills */}
          <div className="pt-4 border-t border-gray-800/80">
            <div className="text-xs font-medium text-gray-400 mb-2.5">
              Active Cross-Dispatch Verticals (Click to toggle supply pooling):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => setCoPilotActive(!coPilotActive)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  coPilotActive
                    ? "bg-indigo-600/15 border-indigo-500 text-white"
                    : "bg-gray-950 border-gray-800 text-gray-400"
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    AI Co-Pilot Engine
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    Directional return chaining
                  </div>
                </div>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    coPilotActive ? "bg-emerald-400" : "bg-gray-600"
                  }`}
                />
              </button>

              <button
                onClick={() => setFoodBatchEnabled(!foodBatchEnabled)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  foodBatchEnabled && coPilotActive
                    ? "bg-amber-500/15 border-amber-500/80 text-white"
                    : "bg-gray-950 border-gray-800 text-gray-400"
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    Zero-Comm Food Batch
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    Lunch (12-3) & Dinner (8-11)
                  </div>
                </div>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    foodBatchEnabled && coPilotActive
                      ? "bg-amber-400"
                      : "bg-gray-600"
                  }`}
                />
              </button>

              <button
                onClick={() => setB2bParcelEnabled(!b2bParcelEnabled)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition ${
                  b2bParcelEnabled && coPilotActive
                    ? "bg-emerald-500/15 border-emerald-500/80 text-white"
                    : "bg-gray-950 border-gray-800 text-gray-400"
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                    Hyperlocal B2B Parcel
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    Off-peak & dead-mile filler
                  </div>
                </div>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    b2bParcelEnabled && coPilotActive
                      ? "bg-emerald-400"
                      : "bg-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Key Marketplace KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-400">Net Driver Take-Home</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">
              ₹{dailyNetTakeHome.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-medium mt-0.5">
              {dailyDelta >= 0 ? `+₹${dailyDelta} vs Rides-Only` : "Baseline"}
            </div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-400">Hourly Earnings Floor</div>
            <div className="text-xl font-extrabold text-white mt-1">
              ₹{effectiveHourly}/hr
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Eliminates mid-day dip
            </div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-400">Empty Dead-Mile %</div>
            <div className="text-xl font-extrabold text-amber-400 mt-1">
              {deadMileRatio}%
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
              {(27.5 - deadMileRatio).toFixed(1)}% fuel waste saved
            </div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4">
            <div className="text-xs text-gray-400">Off-Peak Utilization</div>
            <div className="text-xl font-extrabold text-indigo-400 mt-1">
              {offPeakUtil}%
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              11 AM – 5 PM active time
            </div>
          </div>
        </div>

        {/* Hourly Multimodal Utilization Breakdown */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                24-Hour Fleet Utilization & Revenue Stack by Daypart
              </h3>
              <p className="text-xs text-gray-400">
                How Zero-Commission Food (Ownly / Eats model) & B2B Parcels fill the 11 AM – 5 PM passenger trough
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                Passenger
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
                Zero-Comm Food
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                B2B Parcel
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            {hourlyTimeline.map((slot, idx) => {
              const slotHourly = Math.round(
                slot.baseEarn *
                  (1 +
                    (slot.foodShare * 0.006 + slot.parcelShare * 0.005))
              );
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-gray-400 mr-2">
                        {slot.time}
                      </span>
                      <span className="font-semibold text-gray-200">
                        {slot.label}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-400">
                      ₹{slotHourly}/hr
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-950 rounded-full overflow-hidden flex border border-gray-800">
                    <div
                      style={{ width: `${slot.rideShare}%` }}
                      className="bg-blue-500 h-full transition-all duration-300"
                      title={`Passenger Rides: ${slot.rideShare}%`}
                    />
                    <div
                      style={{ width: `${slot.foodShare}%` }}
                      className="bg-amber-500 h-full transition-all duration-300"
                      title={`Zero-Commission Food Delivery: ${slot.foodShare}%`}
                    />
                    <div
                      style={{ width: `${slot.parcelShare}%` }}
                      className="bg-emerald-500 h-full transition-all duration-300"
                      title={`B2B Hyperlocal Parcel: ${slot.parcelShare}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Interactive Driver App Mobile Preview */}
      <div className="lg:col-span-5">
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 sticky top-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-400" />
              Driver Co-Pilot Mobile UX
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              LIVE INTERACTIVE DISPATCH
            </span>
          </div>

          {/* Mobile Phone Frame */}
          <div className="border-4 border-gray-800 rounded-[28px] p-4 bg-gray-950 text-white shadow-2xl space-y-3.5">
            {/* Phone Top Bar */}
            <div className="flex justify-between items-center text-[11px] text-gray-400 border-b border-gray-800/80 pb-2.5">
              <span className="font-extrabold text-white tracking-wide">
                OMNIFLEET <span className="text-indigo-400">PRO</span>
              </span>
              <span>12:40 PM • Lunch Transition</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                0% Comm Pass
              </span>
            </div>

            {/* Current Context Alert */}
            <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Completed Commuter Drop
                </span>
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Outer IT Park Zone
                </span>
              </div>
              <div className="text-sm font-bold mt-0.5">
                Tech Park Phase II (Suburban Hub)
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Direct passenger return pings are low (24 min wait). Co-Pilot has constructed a <strong>Zero-Dead-Mile Multimodal Chain</strong>:
              </p>
            </div>

            {/* Co-Pilot Chain Card */}
            <div className="bg-gradient-to-br from-indigo-950/70 via-gray-900 to-gray-900 border-2 border-indigo-500/80 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-300 flex items-center gap-1">
                  ⚡ 3-HOP RETURN ROUTE CHAIN
                </span>
                <span className="text-xs font-extrabold bg-emerald-400 text-gray-950 px-2 py-0.5 rounded-md">
                  ₹185 Net Guaranteed
                </span>
              </div>

              {/* Hop 1: Zero-Commission Food Delivery */}
              <div className="bg-gray-950/90 p-2.5 rounded-xl border border-gray-800/90 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center gap-1">
                    <Utensils className="w-2.5 h-2.5" /> HOP 1 • ZERO-COMM FOOD BATCH
                  </span>
                  <span className="text-emerald-400 font-bold text-xs">+₹75</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  Meghana Biryani Hub → 2 Drops along Main Road
                </div>
                <div className="text-[11px] text-gray-400">
                  0% Merchant Commission • Direct ₹75 delivery fee paid to you • 3.1 km directional route
                </div>
              </div>

              {/* Hop 2: B2B Pharmacy Parcel */}
              <div className="bg-gray-950/90 p-2.5 rounded-xl border border-gray-800/90 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                    <Package className="w-2.5 h-2.5" /> HOP 2 • EXPRESS B2B PARCEL
                  </span>
                  <span className="text-emerald-400 font-bold text-xs">+₹45</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  Apollo Dark Store → City Center Clinic
                </div>
                <div className="text-[11px] text-gray-400">
                  Zero wait time (Barcode pre-scanned) • 2.4 km en route to CBD
                </div>
              </div>

              {/* Hop 3: Pre-Matched Commuter */}
              <div className="bg-gray-950/90 p-2.5 rounded-xl border border-gray-800/90 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] flex items-center gap-1">
                    <Navigation className="w-2.5 h-2.5" /> HOP 3 • COMMUTER RIDE
                  </span>
                  <span className="text-emerald-400 font-bold text-xs">+₹65</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  City Center Metro → Downtown Commercial Hub
                </div>
                <div className="text-[11px] text-gray-400">
                  High-demand surge zone reached • 0.1 km dead miles!
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setDriverActionStatus("accepted")}
                  className="py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
                >
                  Accept Smart Chain
                </button>
                <button
                  onClick={() => setDriverActionStatus("declined")}
                  className="py-2.5 rounded-xl font-medium text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
                >
                  Wait for Passenger Only
                </button>
              </div>
            </div>

            {/* Interactive Feedback Toast */}
            {driverActionStatus === "accepted" && (
              <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Chain Activated!</strong> Navigating 150m to Meghana Biryani Hub. You saved <strong>7.2 empty km</strong> and locked in ₹185/hr during off-peak lunch!
                </div>
              </div>
            )}

            {driverActionStatus === "declined" && (
              <div className="p-3 rounded-xl bg-red-950/90 border border-red-500/60 text-red-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Rides-Only Mode:</strong> You remain in a low-demand suburban hex. Estimated wait for a direct commuter is 26 mins or 7.2 km empty ride back.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
