import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Helpers ────────────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Tier calculation based on eco score
function getTier(score) {
  if (score >= 80) return 'Eco Champion';
  if (score >= 60) return 'Eco Warrior';
  if (score >= 40) return 'Eco Explorer';
  if (score >= 20) return 'Eco Starter';
  return 'Eco Beginner';
}

// ─── Default state ──────────────────────────────────────────
const defaultState = {
  // User profile
  userName: 'Explorer',
  userAvatar: '🌱',
  greeting: getGreeting(),

  // Eco Score (0-100)
  ecoScore: 35,
  
  // Streak
  streak: 0,
  lastActiveDate: null,

  // Daily action log (today)
  todayActions: [],
  todayDate: todayStr(),
  todaySaved: 0, // kg CO2 saved today
  todayBreakdown: { transport: 0, diet: 0, energy: 0 },

  // Quiz
  quizCompleted: false,
  quizArchetype: null,
  quizAnswers: [],

  // Missions (array of completed mission IDs for this week)
  completedMissions: [],

  // Habits (object: date string → count of actions that day)
  habitLog: {},

  // Challenge badge progress (object: badge ID → current count)
  badgeProgress: {},
  unlockedBadges: [],

  // Carbon Calculator results
  calculatorResults: null,

  // Impact Simulator values
  simulatorValues: {
    meatMeals: 7,
    milesDriven: 100,
    thermostat: 72,
    flights: 2,
  },

  // Blind spots viewed
  blindSpotsViewed: false,

  // Total actions logged (all-time)
  totalActionsLogged: 0,
  totalCO2Saved: 0,

  // Action history (all-time, capped at 200 entries)
  actionHistory: [],
};

// ─── Store ──────────────────────────────────────────────────
const useStore = create(
  persist(
    (set, get) => ({
      ...defaultState,

      // ─── Daily Reset Logic ─────────────────────────────────
      /**
       * Called on app mount. Checks if the stored date matches today.
       * If not:
       *   1. If lastActiveDate === yesterday AND user logged actions → streak++
       *   2. Otherwise → streak = 0
       *   3. Reset today's data (actions, saved, breakdown)
       *   4. Update lastActiveDate to today
       */
      performDailyReset: () => {
        const today = todayStr();
        const state = get();

        if (state.todayDate === today) return; // Same day, no reset

        const yesterday = yesterdayStr();
        let newStreak = state.streak;

        if (state.lastActiveDate === yesterday && state.todayActions.length > 0) {
          newStreak = state.streak + 1;
        } else if (state.lastActiveDate !== today) {
          // Missed a day or no actions yesterday
          newStreak = state.todayActions.length > 0 ? state.streak + 1 : 0;
          // Edge case: if lastActiveDate is today, keep streak
          if (state.lastActiveDate === null) newStreak = 0;
        }

        set({
          todayDate: today,
          todayActions: [],
          todaySaved: 0,
          todayBreakdown: { transport: 0, diet: 0, energy: 0 },
          streak: newStreak,
          lastActiveDate: state.todayActions.length > 0 ? state.todayDate : state.lastActiveDate,
          completedMissions: [], // Reset weekly missions
          greeting: getGreeting(),
        });
      },

      // ─── Log Eco Action ────────────────────────────────────
      logAction: (actionType, saving, category) => {
        const state = get();
        const today = todayStr();
        const newAction = {
          type: actionType,
          saving,
          category,
          timestamp: new Date().toISOString(),
        };

        const newBreakdown = { ...state.todayBreakdown };
        newBreakdown[category] = parseFloat((newBreakdown[category] + saving).toFixed(2));

        const newHabitLog = { ...state.habitLog };
        newHabitLog[today] = (newHabitLog[today] || 0) + 1;

        const newHistory = [newAction, ...state.actionHistory].slice(0, 200);
        const newTotalSaved = parseFloat((state.totalCO2Saved + saving).toFixed(2));
        const newTotalActions = state.totalActionsLogged + 1;

        // Eco score: increases by 1-2 points per action, capped at 100
        const scoreGain = Math.min(2, saving);
        const newScore = Math.min(100, Math.round(state.ecoScore + scoreGain));

        set({
          todayActions: [...state.todayActions, newAction],
          todaySaved: parseFloat((state.todaySaved + saving).toFixed(2)),
          todayBreakdown: newBreakdown,
          habitLog: newHabitLog,
          actionHistory: newHistory,
          totalCO2Saved: newTotalSaved,
          totalActionsLogged: newTotalActions,
          lastActiveDate: today,
          ecoScore: newScore,
        });
      },

      // ─── Quiz ──────────────────────────────────────────────
      completeQuiz: (archetype, answers) => {
        set({
          quizCompleted: true,
          quizArchetype: archetype,
          quizAnswers: answers,
        });
      },
      resetQuiz: () => {
        set({
          quizCompleted: false,
          quizArchetype: null,
          quizAnswers: [],
        });
      },

      // ─── Missions ─────────────────────────────────────────
      completeMission: (missionId) => {
        const state = get();
        if (state.completedMissions.includes(missionId)) return;
        const scoreGain = 3;
        set({
          completedMissions: [...state.completedMissions, missionId],
          ecoScore: Math.min(100, state.ecoScore + scoreGain),
        });
      },

      // ─── Badges ────────────────────────────────────────────
      updateBadgeProgress: (badgeId, count) => {
        const state = get();
        set({
          badgeProgress: { ...state.badgeProgress, [badgeId]: count },
        });
      },
      unlockBadge: (badgeId) => {
        const state = get();
        if (state.unlockedBadges.includes(badgeId)) return;
        set({
          unlockedBadges: [...state.unlockedBadges, badgeId],
          ecoScore: Math.min(100, state.ecoScore + 5),
        });
      },

      // ─── Calculator ────────────────────────────────────────
      saveCalculatorResults: (results) => {
        set({ calculatorResults: results });
      },

      // ─── Simulator ────────────────────────────────────────
      updateSimulatorValues: (values) => {
        set({ simulatorValues: values });
      },

      // ─── Blind Spots ──────────────────────────────────────
      markBlindSpotsViewed: () => {
        set({ blindSpotsViewed: true });
      },

      // ─── Profile ───────────────────────────────────────────
      updateProfile: (name, avatar) => {
        set({ userName: name, userAvatar: avatar });
      },

      // ─── Reset All ─────────────────────────────────────────
      resetAll: () => {
        set({ ...defaultState, todayDate: todayStr(), greeting: getGreeting() });
      },

      // ─── Computed getters ──────────────────────────────────
      getTier: () => getTier(get().ecoScore),
      getGreeting: () => getGreeting(),
    }),
    {
      name: 'terra:state',
      // Safe deserialization: if localStorage is corrupted, fall back to defaults
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn('Terra: Failed to rehydrate state, using defaults');
          }
        };
      },
    }
  )
);

export default useStore;
export { getTier, getGreeting };
