"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";

export default function UnitEconomicsSheet() {
  const [fleetDau, setFleetDau] = useState<number>(450000);
  const [adoptionPct, setAdoptionPct] = useState<number>(38);
  const [dailyFoodParcelBatches, setDailyFoodParcelBatches] =
    useState<number>(3);
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

  const formatVal = (valCr: number) => {
    if (currencyMode === "INR") {
      return `₹${valCr.toFixed(1)} Cr / yr`;
    }
    return `$${(valCr * 1.18).toFixed(1)}M / yr`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-slate-700" />
              Executive Unit Economics & Annualized P&L Sheet
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive bottom-line contribution margin model for VP Product / CFO reviews
            </p>
          </div>

          <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200">
            <button
              onClick={() => setCurrencyMode("INR")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currencyMode === "INR"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ₹ INR Crores (India)
            </button>
            <button
              onClick={() => setCurrencyMode("USD")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currencyMode === "USD"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              $ USD Millions (Global)
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Active Fleet DAU
              </span>
              <span className="font-mono font-bold text-slate-900">
                {fleetDau.toLocaleString("en-IN")}
              </span>
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
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Co-Pilot Adoption
              </span>
              <span className="font-mono font-bold text-slate-900">
                {adoptionPct}%
              </span>
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
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Off-Peak Batches / Day
              </span>
              <span className="font-mono font-bold text-slate-900">
                {dailyFoodParcelBatches}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={dailyFoodParcelBatches}
              onChange={(e) => setDailyFoodParcelBatches(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Net Margin / Batch
              </span>
              <span className="font-mono font-bold text-slate-900">
                ₹{netMarginPerBatch}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={25}
              step={1}
              value={netMarginPerBatch}
              onChange={(e) => setNetMarginPerBatch(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 3 Executive Financial KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-medium text-slate-500">
              Incremental Off-Peak Food & B2B Margin
            </div>
            <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 mt-1">
              {formatVal(annualLogisticsCr)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Monetized during 11:00 – 17:00 window
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-medium text-slate-500">
              Incremental SaaS Pass Renewal Lift
            </div>
            <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 mt-1">
              {formatVal(annualPassCr)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              +{deltaPassDrivers.toLocaleString("en-IN")} daily paid subscribers
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white shadow-md">
            <div className="text-xs font-medium text-slate-300">
              Total Net Contribution Margin Lift
            </div>
            <div className="text-2xl font-extrabold font-mono tabular-nums text-emerald-400 mt-1">
              {formatVal(totalAnnualCr)}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Combined marketplace + SaaS bottom line
            </div>
          </div>
        </div>

        {/* Clean P&L Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-3.5 font-semibold">Marketplace Line Item</th>
                <th className="p-3.5 font-semibold">Baseline (Siloed Fleet)</th>
                <th className="p-3.5 font-semibold">With OmniFleet Co-Pilot</th>
                <th className="p-3.5 font-semibold">Net Strategic Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  Daily Active Paid Pass Drivers
                </td>
                <td className="p-3.5 font-mono text-slate-600">
                  {basePassDrivers.toLocaleString("en-IN")} (62% DAU)
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-900">
                  {newPassDrivers.toLocaleString("en-IN")} (76% DAU)
                </td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">
                  +{deltaPassDrivers.toLocaleString("en-IN")} Daily Passes
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  Off-Peak Fleet Utilization (11 AM – 5 PM)
                </td>
                <td className="p-3.5 font-mono text-slate-600">29.5% active</td>
                <td className="p-3.5 font-mono font-bold text-slate-900">
                  78.4% active
                </td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">
                  +48.9% Fleet Efficiency
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  Empty Return-Trip Dead-Mile Ratio
                </td>
                <td className="p-3.5 font-mono text-slate-600">27.2% driven km</td>
                <td className="p-3.5 font-mono font-bold text-slate-900">
                  10.4% driven km
                </td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">
                  -16.8% Empty Fuel Saved
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">
                  Driver Monthly Net Income (Full-Time)
                </td>
                <td className="p-3.5 font-mono text-slate-600">₹25,200 / mo</td>
                <td className="p-3.5 font-mono font-bold text-slate-900">
                  ₹31,450 / mo
                </td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">
                  +₹6,250 / mo (+24.8% Lift)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
