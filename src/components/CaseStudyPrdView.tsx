"use client";

import React from "react";
import {
  FileText,
  Users,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  GitBranch,
  Layers,
} from "lucide-react";

export default function CaseStudyPrdView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero Executive Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-white">
            Product Requirements Document (PRD)
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
            Author: Abhinav Thakur
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Target Roles: PM — Marketplace, Supply Growth & Monetization
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Solving Off-Peak Fleet Idle Time, Dead Miles & Subscription Pass Churn via Multimodal Blending
        </h1>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          A universal marketplace & monetization architecture designed for hyperlocal mobility platforms (**Uber**, **Rapido**, **Ola**, **Grab**, and **ONDC / Namma Yatri**). Demonstrates how cross-dispatching a single driver fleet across **Commuter Rides**, **Zero-Commission Food Delivery**, and **B2B Express Parcels** unlocks **+₹222.4 Cr ($26.2M)** in annualized net contribution margin.
        </p>
      </div>

      {/* Section 1: Ground-Truth User Research */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              1. Ground-Truth User Research Synthesis (Field Interviews, N = 10)
            </h2>
            <p className="text-xs text-slate-500">
              Direct field observations with full-time and part-time 2W/3W/4W drivers across Tier-1 IT corridors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Ramesh K. • Full-Time Auto
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                10 hrs/day
              </span>
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &ldquo;Morning 8–11 AM is great. But after dropping an IT commuter in Whitefield at 11:30 AM, I wait 35 mins empty or burn ₹45 of CNG driving back empty to Indiranagar.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-800">
              Core Bottleneck: 27.5% Dead-Mile Ratio
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Syed M. • Student Bike Captain
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                4 hrs/day (Evening)
              </span>
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &ldquo;I ride between 5 PM and 9 PM after college. Paying a flat ₹19–₹29 upfront daily pass fee feels risky because if it rains at 6 PM or I only get 3 rides, I lose money.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-800">
              Core Bottleneck: Upfront Sunk-Cost Pass Friction
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Manjunath S. • Multi-App Driver
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                11 hrs/day
              </span>
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &ldquo;Between 12 PM and 4 PM passenger rides dry up. I switch on food delivery apps, but juggling 3 different apps drains my phone battery and breaks my incentive streaks.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-800">
              Core Bottleneck: Mid-Day Multi-Homing Churn
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: System Architecture & Algorithmic Dispatch */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              2. Multimodal Dispatch & Cross-Vertical Pass Rebate Architecture
            </h2>
            <p className="text-xs text-slate-500">
              How H3 spatial liquidity scoring and zero-commission food delivery reinforce each other
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-slate-700" />
              A. H3 Directional Return Chaining
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a driver completes a commuter drop in an outer suburban hex (e.g., H3 Level-8 Tech Park zone) between 11:00 AM and 4:30 PM, the dispatch engine evaluates expected idle wait time (<code className="font-mono text-slate-900">E[Wait_Passenger]</code>). If wait time exceeds 12 minutes, Co-Pilot queries the local **Zero-Commission Restaurant Pool** (inspired by Rapido *Ownly* / *Uber Eats* batching) and **B2B Dark Stores** within 500m to construct a multi-hop directional chain back toward high-demand commuter corridors.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-700" />
              B. Zero-Upfront Flex-Cap & Food Rebate Flywheel
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of charging a flat ₹29 upfront daily pass fee, drivers opt into a **₹0-Upfront Flex-Cap Pass** (₹3 per ride, auto-capped at ₹25/day). Crucially, every off-peak food or B2B parcel batch completed grants an **₹8 instant pass rebate** funded by the merchant B2B tech fee. Completing 3 lunch deliveries makes the driver&apos;s daily ride pass **100% FREE**, solving mid-day delivery fleet shortages at zero customer acquisition cost.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Causal Inference & Switchback Testing */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              3. Experimentation Strategy: Hex-Time Switchback Design
            </h2>
            <p className="text-xs text-slate-500">
              Eliminating network spillover and SUTVA violations in two-sided marketplaces
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          In hyperlocal marketplaces, naive user-level or driver-level A/B splits suffer from severe **Stable Unit Treatment Value Assumption (SUTVA) violations**—if Treatment Driver A accepts a food batch, Control Driver B receives the commuter ping, artificially inflating Control metrics.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900 mb-1">Unit of Randomization</div>
            <p className="text-slate-600">
              H3 Level-7 Macro-Hex Clusters $\times$ 2-Hour Daypart Windows (11:00–13:00, 13:00–15:00, 15:00–17:00).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900 mb-1">Primary Success Metric</div>
            <p className="text-slate-600">
              Net Fleet Hourly Earnings Floor (INR/hr) and Fleet Dead-Mile Ratio (%) per active cluster window.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900 mb-1">Guardrail SLA Metric</div>
            <p className="text-slate-600">
              Commuter Search-to-Pickup ETA must not degrade by &gt;15 seconds during unexpected mid-day weather surges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
