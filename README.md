# 🌍 Terra: Carbon Footprint Awareness Platform

### Know Your Impact. Shape Your Future.

## 🚨 The Problem: Carbon Blindness
Most people want to live sustainably, but they suffer from **Carbon Blindness**. They don't know the actual carbon cost of their daily habits. Without accurate, personalized awareness, well-meaning actions are often misdirected. A generic "eco score" isn't enough to drive real behavior change.

## 💡 The Solution: Terra
Terra is a personal sustainability platform designed to bridge the gap between abstract climate data and daily habits. Built for **Prompt Wars Virtual – Challenge 3**, Terra focuses entirely on **Carbon Footprint Awareness and Behavior Change**. 

Rather than just displaying a generic metric, Terra helps users *understand* their footprint through deep personalization, real-time "what-if" simulations, and gamified habit building.

---

## ✨ Key Features (And How They Build Awareness)

| Feature | How it Solves the Problem |
|---|---|
| 🧮 **Carbon Footprint Calculator** | **Baseline Awareness:** Calculates a personalized footprint across housing, transport, diet, and lifestyle, benchmarking against global averages. |
| 📊 **Impact Simulator** | **Actionable Insights:** "What-if" sliders let users experiment with lifestyle changes (e.g., eating less meat) to see the projected annual CO₂ reduction in real-time. |
| 🔍 **Carbon Blind Spot Detector** | **Uncovering Hidden Impact:** Surfaces high-impact habits people usually underestimate, such as fast fashion or streaming habits. |
| 🧬 **Eco Personality Assessment** | **Personalized Context:** Scores users into archetypes, tailoring sustainability advice to their specific lifestyle. |
| 📚 **Sustainability Learning Hub** | Bite-sized, sourced tips organized by category |
| ✅ **Weekly Missions & Habit Tracker** | Streak-based habit building with a heatmap-style tracker |
| 🏆 **Eco Challenges & Badges** | Unlockable achievements that reward consistency |
| 🥇 **Community Leaderboard** | See how your progress compares to others |
| 📖 **Personalized Eco Story** | An auto-generated narrative summarizing your sustainability journey |
| 📈 **Live Progress Dashboard** | A real-time overview of score, streak, and weekly progress |

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Data Visualization:** Chart.js
- **State Management:** React Context / Zustand
- **Persistence:** LocalStorage
- **Deployment:** Netlify
- **Version Control:** Git & GitHub

---

## 🎯 What Makes Terra Different

- ✅ Every number is grounded in **real emissions data** — not arbitrary scores
- ✅ Personalized insight instead of generic advice
- ✅ Gamification designed for **long-term behavior change**, not just badges
- ✅ Built and designed to feel like a real product, not a templated dashboard

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/terra.git
cd terra
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📂 Project Structure

```
terra/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/         # Route-level modules (Dashboard, Assess, Learn, Act)
│   ├── context/        # Global state management
│   ├── data/            # Static content (tips, quiz questions, missions)
│   └── three/            # 3D/visual hero components
├── public/
└── package.json
```

---

## 💡 Key Learnings

Building Terra was as much a product design exercise as an engineering one — from architecting multi-module routing and state management, to iterating on the visual design system multiple times to land on something that felt premium rather than templated.

