"use client";

import React, { useState } from "react";
import { Shield, Award, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export default function SubscriptionEngine() {
  const [driverPersona, setDriverPersona] = useState<
    "fulltime" | "parttime" | "hybrid"
  >("parttime");
  const [dailyRides, setDailyRides] = useState<number>(5);
  const [avgRideFare, setAvgRideFare] = useState<number>(95);
  const [offPeakFoodDrops, setOffPeakFoodDrops] = useState<number>(3);

  const handlePersonaChange = (p: "fulltime" | "parttime" | "hybrid") => {
    setDriverPersona(p);
    if (p === "fulltime") {
      setDailyRides(15);
      setAvgRideFare(110);
      setOffPeakFoodDrops(1);
    } else if (p === "parttime") {
      setDailyRides(5);
      setAvgRideFare(95);
      setOffPeakFoodDrops(3);
    } else {
      setDailyRides(9);
      setAvgRideFare(100);
      setOffPeakFoodDrops(4);
    }
  };

  const rideGross = dailyRides * avgRideFare;
  const foodGross = offPeakFoodDrops * 65; // ₹65 avg delivery payout per zero-comm food batch
  const totalGross = rideGross + foodGross;

  // Model 1: Traditional 22% Platform Commission
  const m1Commission = Math.round(totalGross * 0.22);
  const m1Net = totalGross - m1Commission;

  // Model 2: Standard Flat Daily SaaS Pass (₹29 upfront)
  const m2PassFee = 29;
  const m2Net = totalGross - m2PassFee;
  const m2TakeRate = ((m2PassFee / totalGross) * 100).toFixed(1);

  // Model 3: Proposed "Flex-Cap + Food Rebate SaaS Pass"
  // Base fee is ₹3/ride auto-capped at ₹25.
  // PLUS: Every off-peak food/parcel drop gives a ₹8 pass rebate (funded by merchant B2B tech fee)!
  const rawFlexFee = Math.min(25, dailyRides * 3);
  const foodPassRebate = Math.min(rawFlexFee, offPeakFoodDrops * 8);
  const m3FinalFee = Math.max(0, rawFlexFee - foodPassRebate);
  const m3Net = totalGross - m3FinalFee;
  const m3TakeRate = ((m3FinalFee / totalGross) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Driver Behavior & Cross-Vertical Sliders */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Dynamic SaaS Pass & Cross-Subsidy Configurator
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Test how zero-upfront micro-passes and off-peak food delivery rebates maximize driver retention across Uber, Rapido & ONDC models.
              </p>
            </div>

            {/* Persona Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Select Driver Cohort Persona
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handlePersonaChange("parttime")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    driverPersona === "parttime"
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  }`}
                >
                  <div className="font-bold">Evening Part-Timer</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    4–6 rides/day
                  </div>
                </button>
                <button
                  onClick={() => handlePersonaChange("hybrid")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    driverPersona === "hybrid"
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  }`}
                >
                  <div className="font-bold">Rides + Food Hybrid</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    Balanced 3-vertical
                  </div>
                </button>
                <button
                  onClick={() => handlePersonaChange("fulltime")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    driverPersona === "fulltime"
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  }`}
                >
                  <div className="font-bold">Full-Time Pro</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    14+ rides/day
                  </div>
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Daily Commuter Rides:</span>
                  <strong className="text-white">{dailyRides} Rides</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={22}
                  value={dailyRides}
                  onChange={(e) => setDailyRides(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Avg Commuter Fare:</span>
                  <strong className="text-white">₹{avgRideFare}</strong>
                </div>
                <input
                  type="range"
                  min={50}
                  max={250}
                  step={5}
                  value={avgRideFare}
                  onChange={(e) => setAvgRideFare(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-300 font-medium">
                    Off-Peak Food / Parcel Batches (12–4 PM):
                  </span>
                  <strong className="text-amber-400">
                    {offPeakFoodDrops} Batches (+₹{offPeakFoodDrops * 8} Pass Rebate)
                  </strong>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={offPeakFoodDrops}
                  onChange={(e) => setOffPeakFoodDrops(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Strategic Takeaway Box */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5">
              <div className="font-bold text-indigo-300">
                🎯 Cross-Vertical Synergy (Why Super-Apps Win)
              </div>
              <p className="text-gray-300 leading-relaxed">
                When a driver completes <strong>{offPeakFoodDrops} off-peak food/parcel drops</strong>, the platform earns ₹{offPeakFoodDrops * 14} in merchant/buyer tech fees. Using ₹{foodPassRebate} of that to rebate the driver&apos;s daily pass fee makes their subscription <strong>{m3FinalFee === 0 ? "100% FREE" : `only ₹${m3FinalFee}`}</strong>—solving food delivery fleet shortages without spending a rupee on driver incentives!
              </p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: 3-Way Monetization Architecture Comparison */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Legacy % Commission */}
            <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-500/10 text-red-400 border border-red-500/20">
                  Legacy Model
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  22% Take-Rate Cut
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Traditional ad-valorem cut on every passenger and delivery trip.
                </p>

                <div className="mt-4 pt-3 border-t border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gross Earnings:</span>
                    <span className="font-semibold">₹{totalGross}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Platform Cut (22%):</span>
                    <span className="font-bold">-₹{m1Commission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Effective Take Rate:</span>
                    <span>22.0%</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-800">
                <div className="text-xs text-gray-400">Driver Net Take-Home</div>
                <div className="text-xl font-extrabold text-white mt-0.5">
                  ₹{m1Net}
                </div>
                <div className="text-[11px] text-red-400 mt-1">
                  Drivers resent high commission on long trips
                </div>
              </div>
            </div>

            {/* Column 2: Flat Daily SaaS Pass */}
            <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Standard SaaS Pass
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  Flat ₹29 Daily Pass
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Upfront daily fee for unlimited 0%-commission rides.
                </p>

                <div className="mt-4 pt-3 border-t border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gross Earnings:</span>
                    <span className="font-semibold">₹{totalGross}</span>
                  </div>
                  <div className="flex justify-between text-blue-400">
                    <span>Upfront Daily Pass:</span>
                    <span className="font-bold">-₹{m2PassFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Effective Take Rate:</span>
                    <span>{m2TakeRate}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-800">
                <div className="text-xs text-gray-400">Driver Net Take-Home</div>
                <div className="text-xl font-extrabold text-white mt-0.5">
                  ₹{m2Net}
                </div>
                <div className="text-[11px] text-amber-400 mt-1">
                  {dailyRides < 6
                    ? "⚠️ High upfront friction for part-timers"
                    : "✅ Great for full-time commuters"}
                </div>
              </div>
            </div>

            {/* Column 3: Flex-Cap + Food Rebate Pass */}
            <div className="bg-gray-900 border-2 border-indigo-500 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500 text-white">
                  RECOMMENDED PM ENGINE
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  Flex-Cap + Food Rebate
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  ₹0 upfront! ₹3/ride capped at ₹25, minus ₹8 rebate per off-peak food batch.
                </p>

                <div className="mt-4 pt-3 border-t border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gross Earnings:</span>
                    <span className="font-semibold">₹{totalGross}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Base Flex Fee:</span>
                    <span>₹{rawFlexFee}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Food/Parcel Rebate:</span>
                    <span>-₹{foodPassRebate}</span>
                  </div>
                  <div className="flex justify-between text-indigo-300 font-bold border-t border-gray-800/80 pt-1">
                    <span>Net Pass Paid:</span>
                    <span>₹{m3FinalFee}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-800">
                <div className="text-xs text-gray-400">Driver Net Take-Home</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                  ₹{m3Net}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1">
                  +₹{m3Net - m1Net} saved vs Legacy Commission!
                </div>
              </div>
            </div>
          </div>

          {/* Why This Matters for Uber / Rapido / ONDC Table */}
          <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Platform-Specific Strategic Fit (How to Pitch This in PM Interviews)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
                <div className="font-bold text-indigo-400 mb-1">
                  For Uber (Rides + Eats + Direct)
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Replaces expensive driver Quest bonuses by cross-subsidizing Rides pass fees using high-margin Uber Direct B2B & Eats lunch deliveries.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
                <div className="font-bold text-amber-400 mb-1">
                  For Rapido (Rides + Ownly Food)
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Accelerates Captain adoption for zero-commission food delivery (Ownly) by making daily Auto/Bike SaaS passes free when Captains do 3 lunch food drops.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
                <div className="font-bold text-emerald-400 mb-1">
                  For ONDC / Namma Yatri
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Solves part-time driver pass drop-off via ₹0 upfront pay-as-you-go micro-deductions while pooling open-network retail deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
