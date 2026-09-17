"use client";

import React, { useState } from "react";
import { Calculator, DollarSign, TrendingUp, FileText } from "lucide-react";

export default function UnitEconomicsSheet() {
  const [fleetDau, setFleetDau] = useState<number>(450000);
  const [adoptionPct, setAdoptionPct] = useState<number>(38);
  const [dailyFoodParcelBatches, setDailyFoodParcelBatches] = useState<number>(3);
  const [netMarginPerBatch, setNetMarginPerBatch] = useState<number>(14);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD">("INR");

  // Calculations
  const activeCopilotDrivers = fleetDau * (adoptionPct / 100);
  const dailyLogisticsMarginInr =
    activeCopilotDrivers * dailyFoodParcelBatches * netMarginPerBatch;
  const annualLogisticsCr = (dailyLogisticsMarginInr * 365) / 10000000;

  // Subscription Pass Lift (+14% absolute pass renewal lift @ avg ₹18 pass fee)
  const basePassDrivers = Math.round(fleetDau * 0.62);
  const newPassDrivers = Math.round(fleetDau * 0.76);
  const deltaPassDrivers = newPassDrivers - basePassDrivers;
  const annualPassCr = (deltaPassDrivers * 18 * 365) / 10000000;

  const totalAnnualCr = annualLogisticsCr + annualPassCr;
  const totalAnnualUsdM = totalAnnualCr * 1.18; // Approx conversion to $M for global comparability

  const formatVal = (valCr: number) => {
    if (currencyMode === "INR") {
      return `₹${valCr.toFixed(1)} Cr / yr`;
    }
    return `$${(valCr * 1.18).toFixed(1)}M / yr`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Executive Unit Economics & Annualized P&L Impact Simulator
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Interactive financial model demonstrating marketplace contribution margin lift for VP Product / CFO reviews.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrencyMode("INR")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                currencyMode === "INR"
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-gray-950 border-gray-800 text-gray-400"
              }`}
            >
              ₹ INR Crores (India Market)
            </button>
            <button
              onClick={() => setCurrencyMode("USD")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                currencyMode === "USD"
                  ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                  : "bg-gray-950 border-gray-800 text-gray-400"
              }`}
            >
              $ USD Millions (Global Uber/Grab)
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 rounded-2xl bg-gray-950 border border-gray-800">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Active Fleet DAU:{" "}
              <strong className="text-white">
                {fleetDau.toLocaleString("en-IN")}
              </strong>
            </label>
            <input
              type="range"
              min={100000}
              max={1000000}
              step={50000}
              value={fleetDau}
              onChange={(e) => setFleetDau(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Co-Pilot Adoption Rate:{" "}
              <strong className="text-white">{adoptionPct}%</strong>
            </label>
            <input
              type="range"
              min={10}
              max={80}
              step={2}
              value={adoptionPct}
              onChange={(e) => setAdoptionPct(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Off-Peak Food/Parcel Batches:{" "}
              <strong className="text-white">
                {dailyFoodParcelBatches} / day
              </strong>
            </label>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={dailyFoodParcelBatches}
              onChange={(e) => setDailyFoodParcelBatches(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Net Platform Tech Margin:{" "}
              <strong className="text-white">₹{netMarginPerBatch} / order</strong>
            </label>
            <input
              type="range"
              min={6}
              max={25}
              step={1}
              value={netMarginPerBatch}
              onChange={(e) => setNetMarginPerBatch(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* 3 Hero Financial Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
            <div className="text-xs text-gray-400">
              Incremental Zero-Comm Food & B2B Margin
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {formatVal(annualLogisticsCr)}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Generated during 11 AM – 5 PM off-peak window
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
            <div className="text-xs text-gray-400">
              Incremental SaaS Subscription Pass Lift
            </div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">
              {formatVal(annualPassCr)}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              +{deltaPassDrivers.toLocaleString("en-IN")} daily paid passes retained
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/70">
            <div className="text-xs font-bold text-emerald-300">
              Total Annualized Contribution Margin Lift
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {formatVal(totalAnnualCr)}
            </div>
            <div className="text-[11px] text-emerald-300/90 mt-1">
              Combined bottom-line EBITDA impact
            </div>
          </div>
        </div>

        {/* Detailed P&L Table */}
        <div className="overflow-x-auto border border-gray-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase">
              <tr>
                <th className="p-3.5">Marketplace Unit Economics Metric</th>
                <th className="p-3.5">Baseline (Siloed Fleet)</th>
                <th className="p-3.5">With OmniFleet Co-Pilot + Flex Pass</th>
                <th className="p-3.5">Net Strategic Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="p-3.5 font-semibold text-white">
                  Daily Active Paid SaaS Pass Drivers
                </td>
                <td className="p-3.5 text-gray-300">
                  {basePassDrivers.toLocaleString("en-IN")} (62% DAU)
                </td>
                <td className="p-3.5 font-bold text-white">
                  {newPassDrivers.toLocaleString("en-IN")} (76% DAU)
                </td>
                <td className="p-3.5 text-emerald-400 font-bold">
                  +{deltaPassDrivers.toLocaleString("en-IN")} Daily Subscribers
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-white">
                  Off-Peak Fleet Utilization (11 AM – 5 PM)
                </td>
                <td className="p-3.5 text-gray-300">29.5% active time</td>
                <td className="p-3.5 font-bold text-white">78.4% active time</td>
                <td className="p-3.5 text-emerald-400 font-bold">
                  +48.9% Utilization Gain
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-white">
                  Empty Return-Trip Dead-Mile Ratio
                </td>
                <td className="p-3.5 text-gray-300">27.2% of driven km</td>
                <td className="p-3.5 font-bold text-white">10.4% of driven km</td>
                <td className="p-3.5 text-emerald-400 font-bold">
                  -16.8% Empty Fuel Waste
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-white">
                  Driver Monthly Net Take-Home Pay
                </td>
                <td className="p-3.5 text-gray-300">₹25,200 / month</td>
                <td className="p-3.5 font-bold text-white">₹31,450 / month</td>
                <td className="p-3.5 text-emerald-400 font-bold">
                  +₹6,250 / mo (+24.8% Income Lift)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
