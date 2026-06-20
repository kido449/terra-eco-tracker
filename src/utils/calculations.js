// ─── Carbon Footprint Calculator ────────────────────────────
// Extracted from CarbonCalculator.jsx for testability

/**
 * calculateFootprint
 * Calculates the user's estimated annual carbon footprint in kg CO2.
 * 
 * WHY these specific numbers?
 * - Housing: Baseline uses national averages for different house sizes. Electricity multipliers reflect general grid intensity differences.
 * - Transport: 0.21 kg CO2/mile is a rough average for standard gas-powered cars. Hybrid/EV numbers account for grid emissions. Flights use an average 800 kg per round trip (e.g., cross-country US).
 * - Diet: 3300 kg represents an average omnivore footprint. Vegans see ~50% reduction (1500 kg) due to the absence of high-impact ruminant meat (beef/lamb).
 * - Lifestyle: A baseline of 800 kg covers basic consumption. Streaming adds ~20 kg per hour per year based on data center + network + device energy.
 * 
 * @param {Object} values - The input values from the calculator form.
 * @returns {Object} A breakdown of the footprint categories and the total.
 */
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

/**
 * calculateFromSliders
 * Recalculates projected carbon footprint based on real-time simulator slider changes.
 * 
 * WHY these formulas?
 * - Meat: 3.3 kg CO2 per meal * 52 weeks represents a standard beef-heavy meal replacement.
 * - Driving: 0.21 kg CO2 per mile * 52 weeks calculates direct tailpipe emissions.
 * - Thermostat: A 3% energy increase per degree Fahrenheit difference from the baseline (68F) is a standard HVAC rule of thumb.
 * 
 * @param {Object} sliders - The simulator slider values.
 * @returns {Object} A breakdown of projected emissions based on the sliders.
 */
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

/**
 * calculateArchetype
 * Determines the user's Eco Personality based on quiz responses.
 * 
 * WHY this approach?
 * The quiz uses a weighted scoring system rather than a simple 1-to-1 mapping. Each answer awards points to one or more 
 * personality traits (e.g., optimizer, naturalist). The archetype with the highest total points becomes the user's result, 
 * allowing for nuanced personality mapping instead of rigid categorization.
 * 
 * @param {Array<Object>} allAnswers - An array of score mappings from the user's chosen options.
 * @returns {string} The ID of the winning archetype.
 */
export function calculateArchetype(allAnswers) {
  const scores = { optimizer: 0, minimalist: 0, advocate: 0, innovator: 0, naturalist: 0 };
  allAnswers.forEach((answerScores) => {
    Object.entries(answerScores).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
