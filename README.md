# OmniFleet AI: Multimodal Driver Co-Pilot & Dynamic SaaS Pass Engine

> **Product Management Portfolio Case Study & Interactive Next.js Simulator**  
> **Applicable Platforms:** Uber (Rides + Eats + Direct) • Rapido (Rides + Ownly Zero-Commission Food + Parcel) • Ola • ONDC / Namma Yatri • Grab • Bolt

---

## 🎯 The Core Industry Problem

Modern mobility and delivery super-apps face three structural unit-economics bottlenecks:
1. **The Off-Peak Fleet Utilization Trough (11:00 AM – 4:30 PM):** Commuter ride-hailing demand drops by **~65% mid-day**, causing driver hourly earnings to plummet below subsistence levels and triggering multi-homing (switching between Uber, Rapido, Swiggy, Zomato, Porter).
2. **High Return-Trip Dead-Mile Ratios (~27% Empty Km):** Dropping a commuter in a suburban IT park or residential cluster leaves drivers stranded without return passenger demand.
3. **Upfront Subscription SaaS Friction:** As platforms transition from legacy 20–25% commissions to **Zero-Commission Daily SaaS Passes**, part-time drivers (<6 rides/day) refuse to pay flat upfront daily pass fees due to weather and demand uncertainty.

---

## 💡 The Solution: 3-Vertical Multimodal Blending & Cross-Subsidized SaaS

**OmniFleet AI** introduces two tightly integrated product innovations:

### 1. Multimodal Driver Co-Pilot (Rides + Zero-Commission Food + B2B Parcels)
Instead of treating Passenger Rides, Food Delivery (e.g., *Uber Eats* / *Rapido Ownly Zero-Commission Food* / *ONDC Food*), and B2B Express Parcels (*Uber Direct* / *Local Parcel*) as siloed fleets, OmniFleet's H3 Spatial Dispatch Engine dynamically chains **directional return hops**:
- **Hop 1 (Lunch/Dinner Slump):** Zero-commission neighborhood restaurant batch (0% restaurant commission; flat customer delivery + tech fee paid directly to driver).
- **Hop 2 (Afternoon Off-Peak):** Express pharmacy / dark-store B2B parcel heading toward high-demand commuter zones.
- **Hop 3 (Commuter Surge):** Pre-matched passenger ride at the destination hex—cutting dead miles from **27.2% down to 9.4%**.

### 2. Flex-Cap Micro-Pass with Cross-Vertical Food Rebates
Eliminates upfront sunk-cost friction for part-time drivers:
- **₹0 Upfront Pay-As-You-Go:** ₹3 per completed passenger trip, **auto-capped at ₹25/day** (unlimited free rides after trip #8).
- **Cross-Vertical Pass Rebate:** Every off-peak food or B2B parcel batch completed between 11 AM and 4 PM grants an **₹8 instant rebate** toward the driver's daily pass fee (funded by the merchant B2B tech fee). Completing 3 lunch deliveries makes the driver's daily ride pass **100% FREE**.

---

## 🚀 Interactive Modules Included in This Next.js App

1. **⚡ Module 1: Multimodal Co-Pilot & 24-Hour Fleet Utilization Simulator** (`src/components/MultimodalSimulator.tsx`)
   - Interactive controls for Vehicle Class (2W Bike, 3W Auto, 4W Cab), City Tier, Shift Hours, and 3-Vertical Supply Pooling toggles.
   - Live interactive **Driver Co-Pilot Mobile App UX** showing a 3-hop return route chain.
2. **💳 Module 2: Dynamic SaaS Pass & Food Rebate Configurator** (`src/components/SubscriptionEngine.tsx`)
   - Side-by-side unit economics comparison of **Legacy 22% Commission** vs **Flat ₹29 Daily Pass** vs **Flex-Cap + Food Rebate Pass**.
3. **🗺️ Module 3: H3 Spatial Index & Dead-Mile Liquidity Visualizer** (`src/components/HexMapVisualizer.tsx`)
   - Clickable H3 Level-8 Hexagonal map showing real-time supply/demand imbalances and Switchback Experiment design.
4. **📊 Module 4: Executive Unit Economics & Annualized P&L Sheet** (`src/components/UnitEconomicsSheet.tsx`)
   - Dynamic financial calculator modeling **₹220+ Cr / $26M+ annualized net contribution margin lift** across INR and USD modes.

---

## 🛠️ Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
