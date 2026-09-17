"use client";

import React, { useState } from "react";
import { CreditCard, Check, ShieldAlert, Sparkles } from "lucide-react";

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
  const foodGross = offPeakFoodDrops * 65;
  const totalGross = rideGross + foodGross;

  // Model 1: Traditional 22% Platform Commission
  const m1Commission = Math.round(totalGross * 0.22);
  const m1Net = totalGross - m1Commission;

  // Model 2: Standard Flat Daily SaaS Pass (₹29 upfront)
  const m2PassFee = 29;
  const m2Net = totalGross - m2PassFee;
  const m2TakeRate = ((m2PassFee / totalGross) * 100).toFixed(1);

  // Model 3: Proposed "Flex-Cap + Food Rebate SaaS Pass"
  const rawFlexFee = Math.min(25, dailyRides * 3);
  const foodPassRebate = Math.min(rawFlexFee, offPeakFoodDrops * 8);
  const m3FinalFee = Math.max(0, rawFlexFee - foodPassRebate);
  const m3Net = totalGross - m3FinalFee;
  const m3TakeRate = ((m3FinalFee / totalGross) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Driver Cohort & Parameter Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Driver Cohort & Monetization Inputs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate how zero-upfront Flex-Cap passes eliminate sunk-cost churn for part-time drivers
            </p>
          </div>

          {/* Persona Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Driver Persona
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "parttime", label: "Part-Timer", sub: "4–6 rides/day" },
                  { id: "hybrid", label: "Rides + Food", sub: "Balanced" },
                  { id: "fulltime", label: "Full-Time Pro", sub: "14+ rides/day" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    driverPersona === p.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      driverPersona === p.id ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {p.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Daily Commuter Rides
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {dailyRides} Trips
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={22}
                value={dailyRides}
                onChange={(e) => setDailyRides(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Avg Commuter Fare
                </span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{avgRideFare}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={250}
                step={5}
                value={avgRideFare}
                onChange={(e) => setAvgRideFare(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  Off-Peak Food / B2B Batches (12–4 PM)
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {offPeakFoodDrops} Batches (-₹{offPeakFoodDrops * 8} Rebate)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={8}
                value={offPeakFoodDrops}
                onChange={(e) => setOffPeakFoodDrops(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">
              Cross-Vertical Subsidy Mechanics
            </div>
            <p className="text-slate-600 leading-relaxed">
              Each off-peak restaurant/parcel batch generates ₹14 in B2B buyer tech fees. Sharing ₹8 of that as a <strong>Daily Pass Rebate</strong> makes the driver&apos;s subscription <strong>{m3FinalFee === 0 ? "100% FREE" : `₹${m3FinalFee}`}</strong>—guaranteeing off-peak delivery fleet supply at zero CAC.
            </p>
          </div>
        </div>

        {/* Right 7 Cols: 3-Column Pricing Architecture Comparison */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Legacy Commission */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 text-slate-600">
                  Legacy Industry Cut
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2.5">
                  22% Take-Rate Cut
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Percentage commission deducted from every trip fare.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gross Earnings</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ₹{totalGross}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Platform Cut (22%)</span>
                    <span className="font-mono font-bold">-₹{m1Commission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Effective Take Rate</span>
                    <span className="font-mono">22.0%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">Driver Net Take-Home</div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 mt-0.5">
                  ₹{m1Net}
                </div>
                <div className="text-[11px] text-red-600 font-medium mt-1">
                  High driver multi-homing
                </div>
              </div>
            </div>

            {/* Column 2: Flat Unlimited Pass */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 text-slate-600">
                  Standard SaaS Pass
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2.5">
                  Flat ₹29 Daily Pass
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upfront flat fee for 24-hour unlimited 0% commission rides.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gross Earnings</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ₹{totalGross}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Upfront Daily Fee</span>
                    <span className="font-mono font-bold">-₹{m2PassFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Effective Take Rate</span>
                    <span className="font-mono">{m2TakeRate}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">Driver Net Take-Home</div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 mt-0.5">
                  ₹{m2Net}
                </div>
                <div className="text-[11px] text-amber-700 font-medium mt-1">
                  {dailyRides < 6
                    ? "Upfront friction for part-timers"
                    : "Optimal for full-time drivers"}
                </div>
              </div>
            </div>

            {/* Column 3: Recommended Flex-Cap + Food Rebate */}
            <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between shadow-md">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-emerald-500 text-slate-950">
                  Recommended Architecture
                </span>
                <h3 className="text-base font-extrabold text-white mt-2.5">
                  Flex-Cap + Rebate
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  ₹0 upfront! ₹3/ride capped at ₹25, minus ₹8 per off-peak food batch.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gross Earnings</span>
                    <span className="font-mono font-semibold text-white">
                      ₹{totalGross}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Base Flex Fee</span>
                    <span className="font-mono">₹{rawFlexFee}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Food/Parcel Rebate</span>
                    <span className="font-mono">-₹{foodPassRebate}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-1">
                    <span>Net Pass Fee</span>
                    <span className="font-mono">₹{m3FinalFee}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400">Driver Net Take-Home</div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-emerald-400 mt-0.5">
                  ₹{m3Net}
                </div>
                <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                  +₹{m3Net - m1Net} saved vs Commission
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Matrix Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Cross-Platform Applicability Matrix (Interview Talking Points)
              </h4>
            </div>
            <div className="divide-y divide-slate-200 text-xs">
              <div className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-3 font-bold text-slate-900">
                  Uber (Rides + Eats + Direct)
                </div>
                <div className="sm:col-span-9 text-slate-600">
                  Replaces cash-burning Driver Quest bonuses by using high-margin Uber Direct B2B & Eats lunch deliveries to subsidize driver subscription fees.
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-3 font-bold text-slate-900">
                  Rapido (Rides + Ownly Food)
                </div>
                <div className="sm:col-span-9 text-slate-600">
                  Accelerates Captain adoption for zero-commission food delivery (Ownly) by making daily Auto/Bike SaaS passes free after 3 lunch food drops.
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-3 font-bold text-slate-900">
                  ONDC / Namma Yatri
                </div>
                <div className="sm:col-span-9 text-slate-600">
                  Eliminates upfront pass drop-off among part-time evening drivers via ₹0 upfront micro-deductions while pooling open-network retail deliveries.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
