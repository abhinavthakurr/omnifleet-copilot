"use client";

import React, { useState } from "react";
import { Layers, Activity, ArrowRight, CheckCircle2 } from "lucide-react";

interface HexZone {
  id: string;
  name: string;
  type: "Tech Park" | "Restaurant Hub" | "CBD Core" | "Suburban Residential";
  passengerDemand: "Low" | "Medium" | "High";
  foodParcelSupply: "High" | "Very High" | "Medium";
  avgWaitRidesOnly: number;
  deadMileRiskKm: number;
  recommendedChain: string;
  netHourlyBoost: number;
}

const HEX_ZONES: HexZone[] = [
  {
    id: "H3-8861a",
    name: "Outer IT Tech Park (Suburban Drop Zone)",
    type: "Tech Park",
    passengerDemand: "Low",
    foodParcelSupply: "High",
    avgWaitRidesOnly: 28,
    deadMileRiskKm: 6.8,
    recommendedChain:
      "Pickup Cloud Kitchen Lunch Batch (0.3 km) → Drop at Inner Ring Road → Pre-match Commuter Ride",
    netHourlyBoost: 62,
  },
  {
    id: "H3-8861b",
    name: "High-Density Food & D2C Dark Store Cluster",
    type: "Restaurant Hub",
    passengerDemand: "Medium",
    foodParcelSupply: "Very High",
    avgWaitRidesOnly: 14,
    deadMileRiskKm: 3.4,
    recommendedChain:
      "Batch 2 Zero-Commission Restaurant Orders (2.1 km) → Earn ₹16 Pass Rebate + ₹85 Delivery Fee",
    netHourlyBoost: 54,
  },
  {
    id: "H3-8861c",
    name: "Outer Residential Gated Communities",
    type: "Suburban Residential",
    passengerDemand: "Low",
    foodParcelSupply: "High",
    avgWaitRidesOnly: 32,
    deadMileRiskKm: 7.5,
    recommendedChain:
      "Pickup Pharmacy B2B Express Parcel (0.4 km) heading toward Metro Station → Commuter Match",
    netHourlyBoost: 68,
  },
  {
    id: "H3-8861d",
    name: "Central Business District (Metro Hub)",
    type: "CBD Core",
    passengerDemand: "High",
    foodParcelSupply: "Medium",
    avgWaitRidesOnly: 4,
    deadMileRiskKm: 0.8,
    recommendedChain:
      "Direct High-Surge Commuter Passenger Rides (No parcel intervention needed)",
    netHourlyBoost: 15,
  },
];

export default function HexMapVisualizer() {
  const [selectedHex, setSelectedHex] = useState<HexZone>(HEX_ZONES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Cols: Interactive H3 Hex Grid */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              H3 Spatial Index: Dead-Mile & Liquidity Clusters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an H3 Level-8 hexagon to inspect off-peak supply/demand imbalance and Co-Pilot dispatch rules
            </p>
          </div>
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
            H3 Res-8
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HEX_ZONES.map((hex) => {
            const isSelected = selectedHex.id === hex.id;
            return (
              <button
                key={hex.id}
                onClick={() => setSelectedHex(hex)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                    : "bg-slate-50/80 border-slate-200 text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {hex.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      isSelected
                        ? "bg-slate-800 text-white"
                        : hex.passengerDemand === "Low"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : hex.passengerDemand === "Medium"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    Demand: {hex.passengerDemand}
                  </span>
                </div>

                <h3 className="text-sm font-bold">{hex.name}</h3>

                <div
                  className={`grid grid-cols-2 gap-2 mt-3 pt-3 border-t text-xs ${
                    isSelected ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                  <div>
                    <span
                      className={`block text-[10px] ${
                        isSelected ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Rides-Only Idle Wait
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        isSelected ? "text-amber-400" : "text-red-600"
                      }`}
                    >
                      {hex.avgWaitRidesOnly} mins
                    </span>
                  </div>
                  <div>
                    <span
                      className={`block text-[10px] ${
                        isSelected ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Food/Parcel Density
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        isSelected ? "text-emerald-400" : "text-emerald-700"
                      }`}
                    >
                      {hex.foodParcelSupply}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <strong>Dispatch Trigger Condition:</strong> Activate directional food/parcel chaining when{" "}
          <code className="font-mono font-bold text-slate-900">
            E[Wait_Passenger] &gt; 12 mins
          </code>{" "}
          and local dark-store/restaurant order density exceeds{" "}
          <code className="font-mono font-bold text-slate-900">0.6 orders/hex</code>.
        </div>
      </div>

      {/* Right 5 Cols: Selected Hex Inspector & Switchback Plan */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-slate-500 uppercase">
              Selected Hex Telemetry
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              {selectedHex.name}
            </h3>
          </div>
          <Activity className="w-5 h-5 text-slate-700" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">Empty Dead-Mile Risk</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
              {selectedHex.deadMileRiskKm} km
            </div>
            <div className="text-[11px] text-red-600 font-medium mt-0.5">
              Uncompensated return distance
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">Co-Pilot Hourly Lift</div>
            <div className="text-xl font-extrabold font-mono text-emerald-700 mt-1">
              +₹{selectedHex.netHourlyBoost}/hr
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Net driver take-home gain
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Automated Directional Chain
          </div>
          <p className="text-xs leading-relaxed font-medium text-slate-100">
            {selectedHex.recommendedChain}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5">
          <div className="font-bold text-slate-900">
            Causal Inference & Switchback Experimentation
          </div>
          <p className="text-slate-600 leading-relaxed">
            Because two-sided mobility marketplaces suffer from network spillover (SUTVA violation), this H3 cluster is evaluated using <strong>2-hour time-space switchback blocks</strong> during 11:00 – 16:00 rather than naive driver-level A/B splits.
          </p>
        </div>
      </div>
    </div>
  );
}
