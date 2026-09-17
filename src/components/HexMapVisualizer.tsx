"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Layers, ArrowRight, Activity } from "lucide-react";

interface HexZone {
  id: string;
  name: string;
  type: "Tech Park" | "Restaurant Hub" | "CBD Core" | "Suburban Residential";
  passengerDemand: "Low" | "Medium" | "High";
  foodParcelSupply: "High" | "Very High" | "Medium";
  avgWaitRidesOnly: number; // mins
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 7 Cols: Interactive Hexagonal Cluster Grid */}
      <div className="lg:col-span-7 bg-gray-900/90 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              H3 Spatial Index: Dead-Mile & Multimodal Liquidity Map
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Click any H3 Hex Cluster to inspect off-peak supply/demand imbalance and Co-Pilot routing logic.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-gray-950 border border-gray-800 text-indigo-300">
            Resolution: H3 Level-8
          </span>
        </div>

        {/* Hex Grid Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {HEX_ZONES.map((hex) => {
            const isSelected = selectedHex.id === hex.id;
            return (
              <button
                key={hex.id}
                onClick={() => setSelectedHex(hex)}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-indigo-950/50 border-indigo-500 shadow-lg"
                    : "bg-gray-950/80 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">
                    {hex.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      hex.passengerDemand === "Low"
                        ? "bg-red-500/15 text-red-400"
                        : hex.passengerDemand === "Medium"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    Passenger Demand: {hex.passengerDemand}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{hex.name}</h3>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-800/80 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">
                      Rides-Only Wait Time
                    </span>
                    <span className="font-bold text-red-400">
                      {hex.avgWaitRidesOnly} mins idle
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">
                      Food/Parcel Liquidity
                    </span>
                    <span className="font-bold text-emerald-400">
                      {hex.foodParcelSupply}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-300 flex items-center justify-between">
          <span>
            💡 <strong>Algorithm Rule:</strong> Trigger Multimodal Chain when{" "}
            <code className="text-indigo-400">E[Wait_Passenger] &gt; 12 mins</code> AND{" "}
            <code className="text-amber-400">Food_Parcel_Density &gt; 0.6</code>
          </span>
        </div>
      </div>

      {/* Right 5 Cols: Selected Hex Telemetry & Action Inspector */}
      <div className="lg:col-span-5 bg-gray-900/90 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                SELECTED HEX TELEMETRY
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                {selectedHex.name}
              </h3>
            </div>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-xs text-gray-400">Empty Dead-Mile Risk</div>
              <div className="text-lg font-bold text-red-400 mt-0.5">
                {selectedHex.deadMileRiskKm} km
              </div>
              <div className="text-[10px] text-gray-400">
                If driver returns empty to city center
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-xs text-gray-400">Co-Pilot Net Hourly Lift</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                +₹{selectedHex.netHourlyBoost}/hr
              </div>
              <div className="text-[10px] text-gray-400">
                Via directional parcel/food chaining
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-2">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              ⚡ Automated Co-Pilot Dispatch Chain
            </div>
            <p className="text-xs text-white leading-relaxed font-medium">
              {selectedHex.recommendedChain}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-400 space-y-1.5">
          <div className="font-bold text-gray-200">
            Switchback Experiment Design Note:
          </div>
          <p className="leading-relaxed">
            To measure true causal lift without network interference (SUTVA), randomize this H3 Hex Cluster into <strong>2-Hour Treatment vs Control Switchback Windows</strong> during 11 AM – 4 PM.
          </p>
        </div>
      </div>
    </div>
  );
}
