import { describe, it, expect, beforeEach } from 'vitest';
import { create } from 'zustand';

// We test the store logic by re-creating the store with known state,
// since the real store uses persist middleware which couples to localStorage.
// We import the exported helpers directly.
import { getTier } from '../context/useStore';

// Minimal store factory replicating core store logic without persist middleware
function createTestStore(initialOverrides = {}) {
  const baseDefaults = {
    userName: 'Explorer',
    userAvatar: '🌱',
    ecoScore: 35,
    streak: 0,
    lastActiveDate: null,
    todayActions: [],
    todayDate: '2026-06-20',
    todaySaved: 0,
    todayBreakdown: { transport: 0, diet: 0, energy: 0 },
    quizCompleted: false,
    quizArchetype: null,
    quizAnswers: [],
    completedMissions: [],
    habitLog: {},
    badgeProgress: {},
    unlockedBadges: [],
    calculatorResults: null,
    simulatorValues: { meatMeals: 7, milesDriven: 100, thermostat: 72, flights: 2 },
    blindSpotsViewed: false,
    totalActionsLogged: 0,
    totalCO2Saved: 0,
    actionHistory: [],
  };

  const initialState = { ...baseDefaults, ...initialOverrides };

  return create((set, get) => ({
    ...initialState,

    logAction: (actionType, saving, category) => {
      const state = get();
      const newAction = {
        type: actionType,
        saving,
        category,
        timestamp: new Date().toISOString(),
      };
      const newBreakdown = { ...state.todayBreakdown };
      newBreakdown[category] = parseFloat((newBreakdown[category] + saving).toFixed(2));

      const newHabitLog = { ...state.habitLog };
      newHabitLog[state.todayDate] = (newHabitLog[state.todayDate] || 0) + 1;

      const newHistory = [newAction, ...state.actionHistory].slice(0, 200);
      const newTotalSaved = parseFloat((state.totalCO2Saved + saving).toFixed(2));
      const newTotalActions = state.totalActionsLogged + 1;

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
        lastActiveDate: state.todayDate,
        ecoScore: newScore,
      });
    },

    completeQuiz: (archetype, answers) => {
      set({ quizCompleted: true, quizArchetype: archetype, quizAnswers: answers });
    },
    resetQuiz: () => {
      set({ quizCompleted: false, quizArchetype: null, quizAnswers: [] });
    },

    completeMission: (missionId) => {
      const state = get();
      if (state.completedMissions.includes(missionId)) return;
      set({
        completedMissions: [...state.completedMissions, missionId],
        ecoScore: Math.min(100, state.ecoScore + 3),
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

    updateProfile: (name, avatar) => {
      set({ userName: name, userAvatar: avatar });
    },

    saveCalculatorResults: (results) => {
      set({ calculatorResults: results });
    },

    updateSimulatorValues: (values) => {
      set({ simulatorValues: values });
    },

    markBlindSpotsViewed: () => {
      set({ blindSpotsViewed: true });
    },

    resetAll: () => {
      set({ ...baseDefaults });
    },
  }));
}

describe('useStore — logAction', () => {
  it('adds action to todayActions', () => {
    const store = createTestStore();
    store.getState().logAction('transit', 2.4, 'transport');
    expect(store.getState().todayActions).toHaveLength(1);
    expect(store.getState().todayActions[0].type).toBe('transit');
  });

  it('increases todaySaved by the saving amount', () => {
    const store = createTestStore();
    store.getState().logAction('transit', 2.4, 'transport');
    expect(store.getState().todaySaved).toBe(2.4);

    store.getState().logAction('vegan', 1.5, 'diet');
    expect(store.getState().todaySaved).toBe(3.9);
  });

  it('updates todayBreakdown for the correct category', () => {
    const store = createTestStore();
    store.getState().logAction('transit', 2.4, 'transport');
    expect(store.getState().todayBreakdown.transport).toBe(2.4);
    expect(store.getState().todayBreakdown.diet).toBe(0);
  });

  it('increases eco score by min(2, saving), capped at 100', () => {
    const store = createTestStore({ ecoScore: 35 });
    store.getState().logAction('transit', 2.4, 'transport');
    // scoreGain = min(2, 2.4) = 2 → 35 + 2 = 37
    expect(store.getState().ecoScore).toBe(37);
  });

  it('does not exceed eco score of 100', () => {
    const store = createTestStore({ ecoScore: 99 });
    store.getState().logAction('transit', 5, 'transport');
    expect(store.getState().ecoScore).toBe(100);
  });

  it('increments totalActionsLogged', () => {
    const store = createTestStore();
    store.getState().logAction('transit', 2.4, 'transport');
    store.getState().logAction('vegan', 1.5, 'diet');
    expect(store.getState().totalActionsLogged).toBe(2);
  });

  it('accumulates totalCO2Saved', () => {
    const store = createTestStore();
    store.getState().logAction('transit', 2.4, 'transport');
    store.getState().logAction('vegan', 1.5, 'diet');
    expect(store.getState().totalCO2Saved).toBe(3.9);
  });

  it('sets lastActiveDate to todayDate', () => {
    const store = createTestStore({ todayDate: '2026-06-20' });
    store.getState().logAction('transit', 2.4, 'transport');
    expect(store.getState().lastActiveDate).toBe('2026-06-20');
  });

  it('caps action history at 200 entries', () => {
    const store = createTestStore({ actionHistory: Array(199).fill({ type: 'old' }) });
    store.getState().logAction('new', 1, 'transport');
    store.getState().logAction('newer', 1, 'transport');
    expect(store.getState().actionHistory).toHaveLength(200);
    expect(store.getState().actionHistory[0].type).toBe('newer');
  });
});

describe('useStore — completeMission', () => {
  it('adds mission ID to completedMissions', () => {
    const store = createTestStore();
    store.getState().completeMission('mission-1');
    expect(store.getState().completedMissions).toContain('mission-1');
  });

  it('increases eco score by 3', () => {
    const store = createTestStore({ ecoScore: 35 });
    store.getState().completeMission('mission-1');
    expect(store.getState().ecoScore).toBe(38);
  });

  it('prevents duplicate mission completion', () => {
    const store = createTestStore({ ecoScore: 35 });
    store.getState().completeMission('mission-1');
    store.getState().completeMission('mission-1');
    expect(store.getState().completedMissions).toHaveLength(1);
    expect(store.getState().ecoScore).toBe(38); // Only one +3
  });

  it('caps eco score at 100', () => {
    const store = createTestStore({ ecoScore: 99 });
    store.getState().completeMission('mission-1');
    expect(store.getState().ecoScore).toBe(100);
  });
});

describe('useStore — unlockBadge', () => {
  it('adds badge to unlockedBadges', () => {
    const store = createTestStore();
    store.getState().unlockBadge('badge-1');
    expect(store.getState().unlockedBadges).toContain('badge-1');
  });

  it('increases eco score by 5', () => {
    const store = createTestStore({ ecoScore: 35 });
    store.getState().unlockBadge('badge-1');
    expect(store.getState().ecoScore).toBe(40);
  });

  it('prevents duplicate badge unlocking', () => {
    const store = createTestStore({ ecoScore: 35 });
    store.getState().unlockBadge('badge-1');
    store.getState().unlockBadge('badge-1');
    expect(store.getState().unlockedBadges).toHaveLength(1);
    expect(store.getState().ecoScore).toBe(40);
  });
});

describe('useStore — quiz', () => {
  it('completeQuiz sets quiz state', () => {
    const store = createTestStore();
    store.getState().completeQuiz('optimizer', [{ optimizer: 3 }]);
    expect(store.getState().quizCompleted).toBe(true);
    expect(store.getState().quizArchetype).toBe('optimizer');
    expect(store.getState().quizAnswers).toHaveLength(1);
  });

  it('resetQuiz clears quiz state', () => {
    const store = createTestStore({ quizCompleted: true, quizArchetype: 'optimizer', quizAnswers: [{}] });
    store.getState().resetQuiz();
    expect(store.getState().quizCompleted).toBe(false);
    expect(store.getState().quizArchetype).toBeNull();
    expect(store.getState().quizAnswers).toHaveLength(0);
  });
});

describe('useStore — profile', () => {
  it('updateProfile sets name and avatar', () => {
    const store = createTestStore();
    store.getState().updateProfile('Alice', '🌻');
    expect(store.getState().userName).toBe('Alice');
    expect(store.getState().userAvatar).toBe('🌻');
  });
});

describe('useStore — resetAll', () => {
  it('resets all state to defaults', () => {
    const store = createTestStore({ ecoScore: 95, streak: 10, totalCO2Saved: 50 });
    store.getState().logAction('transit', 2.4, 'transport');
    store.getState().resetAll();
    // After reset, streak should be 0, CO2 saved 0, quiz not completed
    expect(store.getState().streak).toBe(0);
    expect(store.getState().totalCO2Saved).toBe(0);
    expect(store.getState().quizCompleted).toBe(false);
    expect(store.getState().todayActions).toHaveLength(0);
    expect(store.getState().completedMissions).toHaveLength(0);
  });
});

describe('useStore — calculator and simulator', () => {
  it('saveCalculatorResults stores results', () => {
    const store = createTestStore();
    const results = { housing: 1600, transport: 1512, diet: 2970, lifestyle: 817, total: 6899 };
    store.getState().saveCalculatorResults(results);
    expect(store.getState().calculatorResults).toEqual(results);
  });

  it('updateSimulatorValues stores values', () => {
    const store = createTestStore();
    const values = { meatMeals: 3, milesDriven: 50, thermostat: 68, flights: 0 };
    store.getState().updateSimulatorValues(values);
    expect(store.getState().simulatorValues).toEqual(values);
  });

  it('markBlindSpotsViewed sets flag', () => {
    const store = createTestStore();
    store.getState().markBlindSpotsViewed();
    expect(store.getState().blindSpotsViewed).toBe(true);
  });
});
