import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Shared
import Layout from './components/Layout';

// Overview
import Dashboard from './pages/Dashboard';

// Assess
import Assess from './pages/Assess';
import EcoPersonality from './pages/EcoPersonality';
import BlindSpotDetector from './pages/BlindSpotDetector';
import MyEcoStory from './pages/MyEcoStory';
import CarbonCalculator from './pages/CarbonCalculator';

// Learn
import Learn from './pages/Learn';
import LearningHub from './pages/LearningHub';
import ImpactSimulator from './pages/ImpactSimulator';
import Leaderboard from './pages/Leaderboard';
import NewsInsights from './pages/NewsInsights';

// Act
import Act from './pages/Act';
import WeeklyMissions from './pages/WeeklyMissions';
import HabitTracker from './pages/HabitTracker';
import EcoChallenges from './pages/EcoChallenges';
import CarbonOffsetMarketplace from './pages/CarbonOffsetMarketplace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          {/* Assess */}
          <Route path="/assess" element={<Assess />} />
          <Route path="/assess/personality" element={<EcoPersonality />} />
          <Route path="/assess/blindspots" element={<BlindSpotDetector />} />
          <Route path="/assess/story" element={<MyEcoStory />} />
          <Route path="/assess/calculator" element={<CarbonCalculator />} />

          {/* Learn */}
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/hub" element={<LearningHub />} />
          <Route path="/learn/simulator" element={<ImpactSimulator />} />
          <Route path="/learn/leaderboard" element={<Leaderboard />} />
          <Route path="/learn/news" element={<NewsInsights />} />

          {/* Act */}
          <Route path="/act" element={<Act />} />
          <Route path="/act/missions" element={<WeeklyMissions />} />
          <Route path="/act/habits" element={<HabitTracker />} />
          <Route path="/act/challenges" element={<EcoChallenges />} />
          <Route path="/act/offsets" element={<CarbonOffsetMarketplace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
