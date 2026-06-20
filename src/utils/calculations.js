// ─── Carbon Footprint Calculator ────────────────────────────
// Extracted from CarbonCalculator.jsx for testability

export function calculateFootprint(values) {
  let housing = 0, transport = 0, diet = 0, lifestyle = 0;

  const housingBase = { apartment: 3200, house: 5500, 'large-house': 7800 };
  housing = (housingBase[values.housingType] || 4000) / values.householdSize;
  const elecMultiplier = { low: 0.7, average: 1.0, high: 1.4 };
  housing *= elecMultiplier[values.electricityUsage] || 1.0;

  const commuteFactors = { car: 0.21, hybrid: 0.12, ev: 0.05, transit: 0.06, bike: 0, walk: 0, remote: 0 };
  const dailyCommuteCO2 = (commuteFactors[values.commuteMode] || 0.21) * values.commuteDistance * 2;
  transport = dailyCommuteCO2 * 240;
  transport += values.flights * 800;

  const dietBase = { vegan: 1500, vegetarian: 2000, pescatarian: 2300, omnivore: 3300, 'heavy-meat': 4500 };
  diet = dietBase[values.dietType] || 3300;
  const wasteMultiplier = { low: 0.85, average: 1.0, high: 1.2 };
  diet *= wasteMultiplier[values.foodWaste] || 1.0;
  diet *= 1 - (values.localFood / 100) * 0.1;

  const shoppingFactors = { minimal: 400, moderate: 800, frequent: 1500 };
  lifestyle = shoppingFactors[values.shoppingFreq] || 800;
  lifestyle += values.streaming * 20;
  const recycleReduction = { always: 0.85, sometimes: 0.95, never: 1.0 };
  lifestyle *= recycleReduction[values.recycling] || 1.0;

  return {
    housing: Math.round(housing),
    transport: Math.round(transport),
    diet: Math.round(diet),
    lifestyle: Math.round(lifestyle),
    total: Math.round(housing + transport + diet + lifestyle),
  };
}

// ─── Impact Simulator ───────────────────────────────────────
// Extracted from ImpactSimulator.jsx for testability

export function calculateFromSliders({ meatMeals, milesDriven, thermostat, flights }) {
  const meatCO2 = meatMeals * 52 * 3.3;
  const drivingCO2 = milesDriven * 52 * 0.21;
  const baseHVAC = 2500;
  const thermostatCO2 = baseHVAC * (1 + (thermostat - 68) * 0.03);
  const flightsCO2 = flights * 800;

  return {
    meat: Math.round(meatCO2),
    driving: Math.round(drivingCO2),
    thermostat: Math.round(thermostatCO2),
    flights: Math.round(flightsCO2),
    total: Math.round(meatCO2 + drivingCO2 + thermostatCO2 + flightsCO2),
  };
}

// ─── Eco Personality Quiz Scoring ───────────────────────────
// Extracted from EcoPersonality.jsx for testability

export function calculateArchetype(allAnswers) {
  const scores = { optimizer: 0, minimalist: 0, advocate: 0, innovator: 0, naturalist: 0 };
  allAnswers.forEach((answerScores) => {
    Object.entries(answerScores).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
