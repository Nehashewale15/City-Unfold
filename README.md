# CityShift — Explore Freely. Adapt Instantly.

> **Hackathon 2026 Submission**  
> **Problem Statement:** City Life: Exploring, Experiencing & Navigating the Chaos We Call Home  
> **Focus City:** Pune, Maharashtra  
> **Core Innovation:** Autonomous **Smart Plan B Engine** for Real-Time Outing Rescheduling  

---

## 🌟 Executive Summary

City life is an adventure filled with hidden food spots, historical landmarks, sudden weather disruptions, and notorious traffic gridlocks. Most urban travel tools merely list static tourist attractions—leaving users stranded when sudden rain pours or roads jam.

**CityShift** changes the paradigm with its **Smart Plan B Engine**: when conditions change, the platform autonomously recalculates itineraries using deterministic logic, factoring in weather resilience (indoor vs. outdoor), transit corridors, price sensitivity, and accessibility.

---

## 🚀 Key Features

### 1. ⚡ The Smart Plan B Engine ("What if my plan changes?")
- **Interactive Disruption Simulation Console**: Test scenarios on-demand:
  - 🌧️ **Sudden Heavy Rain**: Detects outdoor fort treks or open walking strips (e.g., Sinhagad Fort, Saras Baug) and swaps them with weather-proof indoor cultural havens (e.g., Raja Dinkar Kelkar Museum, Joshi's Railway Museum) with 100% dry index ratings.
  - 🚗 **Heavy Traffic Gridlock**: Identifies distant bottleneck corridors (e.g., Sinhagad Ghat or Hinjawadi flyover) and substitutes them with central transit-connected spots near Pune Metro stations, saving 45+ minutes.
  - 🚪 **Destination Closed / Unavailable**: Automatically selects the highest-rated category counterpart in the same neighborhood.
  - 💰 **Budget Exceeded Crunch**: Replaces high-ticket dining or luxury experiences with iconic Pune budget staples (FC Road Food Trail, Pataleshwar Cave Temple ₹0 entry), recalculating savings instantly.
- **Side-by-Side Plan Comparison**: Displays **Plan A (Disrupted)** vs. **Plan B (Adaptive)**, detailing:
  - Clear explanation of *why* the alternative fits
  - Cost delta (saved or added ₹)
  - Travel time & dry shelter trade-offs
  - One-click **"Apply Revised Plan B Outing"** that immediately updates the active itinerary.

### 2. 🗺️ Explore Pune & Interactive Leaflet Map
- **15 Curated Pune Hubs**: Shaniwar Wada, Aga Khan Palace, Pataleshwar Caves, FC Road Food Trail, Vohuman Cafe, Sinhagad Fort, Phoenix Marketcity, Koregaon Park Cafe Lane, Joshi's Miniature Railway Museum, Saras Baug, Dagdusheth Ganpati, Camp Burger Walk, Zostel Pune, and JW Marriott.
- **Search & Multi-Filters**: Instant keyword search, category filters, "Weather-Proof Indoor Only" toggle, and "Budget-Friendly (≤ ₹100)" filter.
- **Dual Presentation**: Responsive card grid with ratings, safety chip, and accessibility notes + Interactive OpenStreetMap Leaflet integration with color-coded custom markers.
- **Place Detail Modal**: Deep dive into footfall context, lighting scores, wheelchair/ramp accessibility, and transit directions.

### 3. ⚖️ Multi-Place Trade-off Matrix (Compare)
- Compare up to 4 places side-by-side across:
  - Affordability (Cost/person & price tier)
  - Rating & Review Depth
  - Weather Resilience & Rain Safety
  - Accessibility & Inclusivity
  - Honest Safety Advisories (Crowd density, lighting, vigilance nuances)
  - Cleanliness Ratings
  - Commute Effort (Metro proximity, auto transit times)

### 4. 📢 City Signals & Citizen Reports
- Live-style feed of Pune urban alerts categorized by severity:
  - Weather warnings (Monsoon runoff in Western Ghats)
  - Traffic choke points (Sancheti Hospital Underpass)
  - Civic works (FC Road pedestrian walkways)
  - Crowd surges (Budhwar Peth festival rush)
  - Cleanliness drives (Pataleshwar Courtyard)
- **Interactive Demo Submission Form**: Judges can submit a simulated citizen observation, which is immediately tagged as demonstration data and added to the live feed.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS Design System (Custom modern dark slate palette, glassmorphism, responsive grid, Outfit & Inter typography)
- **Mapping**: Leaflet + OpenStreetMap (No proprietary API keys required)
- **Icons**: Lucide React
- **Logic**: 100% Deterministic Frontend Recommendation Engine (Reliable, fast, zero cloud latency)
- **Persistence**: Browser `localStorage` for itinerary, budget preferences, and comparison state

---

## 🏃 Running Locally

```bash
# 1. Clone the repository
git clone <repo-url>
cd Promptwars_2026

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 🧪 Demo Journey for Judges

1. **Step 1 - Explore**: Search for "Museum" or click "Weather-Proof Indoor Only" to filter sheltered spots.
2. **Step 2 - Inspect**: Click the eye icon on **Raja Dinkar Kelkar Museum** or **Aga Khan Palace** to inspect accessibility and safety context.
3. **Step 3 - Itinerary**: Click the **Smart Plan B Engine** tab. Notice the preloaded outing (Sinhagad Fort + FC Road + Shaniwar Wada) or customize your own.
4. **Step 4 - Trigger Disruption**: Under "Interactive Disruption Simulation Console", click **"Sudden Heavy Rain"**.
5. **Step 5 - Review Plan B**: See how outdoor Sinhagad Fort is flagged and replaced with Raja Dinkar Kelkar Museum. Note the cost savings and weather fit score.
6. **Step 6 - Apply Plan B**: Click **"Apply Revised Plan B Outing"** and see your itinerary update seamlessly.
7. **Step 7 - Compare**: Switch to the **Compare** tab to view side-by-side trade-offs between historic and modern venues.
8. **Step 8 - City Signals**: Visit **City Signals** and click **"Submit Simulated Report"** to test community feedback.

---

## 🛡️ Hackathon Transparency & Compliance

- **Demo Simulation Notice**: All weather alerts, traffic signals, and incident advisories are explicitly marked with demo tags. No mock real-time APIs are fabricated.
- **Safety Disclaimer**: Safety scores describe verifiable lighting, crowd density, and footfall notes rather than unsupported claims of absolute safety.
- **Zero Secrets**: No API keys or sensitive environment variables are embedded in the codebase.
