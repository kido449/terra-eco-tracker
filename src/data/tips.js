// Learning tips — categorized with source citations
const tips = [
  // WATER
  {
    id: 1,
    category: 'Water',
    title: 'Fix Leaky Faucets Immediately',
    tip: 'A faucet dripping once per second wastes over 3,000 gallons per year. Check all fixtures monthly and replace worn washers to stop silent water loss.',
    source: 'USGS Water Science School',
  },
  {
    id: 2,
    category: 'Water',
    title: 'Install Low-Flow Showerheads',
    tip: 'Low-flow showerheads use 2 gallons per minute instead of 5, saving a family of four up to 20,000 gallons annually without noticeably reducing pressure.',
    source: 'EPA WaterSense',
  },
  {
    id: 3,
    category: 'Water',
    title: 'Run Full Loads Only',
    tip: 'Running your dishwasher and washing machine only with full loads can save 3,400 gallons of water per year. Modern machines use the same water regardless of load size.',
    source: 'ENERGY STAR',
  },
  {
    id: 4,
    category: 'Water',
    title: 'Water Gardens in Early Morning',
    tip: 'Watering before 10 AM reduces evaporation by up to 30%. Use drip irrigation or soaker hoses to deliver water directly to plant roots.',
    source: 'National Wildlife Federation',
  },
  {
    id: 5,
    category: 'Water',
    title: 'Collect Rainwater',
    tip: 'A single rain barrel can collect 1,300 gallons of water during peak summer months, perfect for garden irrigation and reducing your water bill.',
    source: 'American Rainwater Catchment Systems Association',
  },

  // ENERGY
  {
    id: 6,
    category: 'Energy',
    title: 'Switch to LED Lighting',
    tip: 'Replace all incandescent bulbs with LEDs. They use 75% less energy, last 25x longer, and a full home switch saves roughly $225 per year on electricity.',
    source: 'U.S. Department of Energy',
  },
  {
    id: 7,
    category: 'Energy',
    title: 'Unplug Phantom Loads',
    tip: 'Electronics on standby (TVs, chargers, game consoles) consume 5–10% of household energy. Use smart power strips to eliminate phantom draw automatically.',
    source: 'Lawrence Berkeley National Laboratory',
  },
  {
    id: 8,
    category: 'Energy',
    title: 'Optimize Your Thermostat',
    tip: 'Setting your thermostat 2°F lower in winter and 2°F higher in summer saves approximately 2,000 pounds of CO₂ and $180 annually.',
    source: 'ENERGY STAR',
  },
  {
    id: 9,
    category: 'Energy',
    title: 'Seal Air Leaks',
    tip: 'Sealing gaps around windows, doors, and ducts can reduce heating/cooling costs by 15–30%. Use caulk, weatherstripping, or spray foam for quick fixes.',
    source: 'Energy.gov',
  },
  {
    id: 10,
    category: 'Energy',
    title: 'Air-Dry Your Clothes',
    tip: 'Clothes dryers account for 6% of residential electricity. Air-drying on a rack or line saves about 700 pounds of CO₂ per year per household.',
    source: 'Project Laundry List',
  },

  // TRANSPORT
  {
    id: 11,
    category: 'Transport',
    title: 'Bike Short Distances',
    tip: 'Half of all car trips in the U.S. are under 3 miles. Cycling these trips eliminates about 1.6 kg of CO₂ per trip and improves cardiovascular health.',
    source: 'European Cyclists Federation',
  },
  {
    id: 12,
    category: 'Transport',
    title: 'Use Public Transit',
    tip: 'A single person switching from a 20-mile car commute to public transit saves roughly 4,800 pounds of CO₂ per year — the equivalent of planting 50 trees.',
    source: 'American Public Transportation Association',
  },
  {
    id: 13,
    category: 'Transport',
    title: 'Carpool When Possible',
    tip: 'Sharing rides with just one other person cuts your per-trip emissions in half. Carpooling 3 days a week saves about 1 tonne of CO₂ annually.',
    source: 'EPA Green Vehicle Guide',
  },
  {
    id: 14,
    category: 'Transport',
    title: 'Maintain Tire Pressure',
    tip: 'Under-inflated tires reduce fuel efficiency by 3% per PSI drop. Checking monthly and keeping tires at recommended pressure saves 400 pounds of CO₂ per year.',
    source: 'FuelEconomy.gov',
  },
  {
    id: 15,
    category: 'Transport',
    title: 'Work Remotely When You Can',
    tip: 'Remote working just 2 days per week eliminates 40% of your commute emissions. That\'s roughly 0.8 tonnes of CO₂ saved annually for a 20-mile commute.',
    source: 'Global Workplace Analytics',
  },

  // DIET
  {
    id: 16,
    category: 'Diet',
    title: 'Eat More Plant-Based Meals',
    tip: 'Replacing beef with beans in just one meal per day cuts your diet-related emissions by 46%. A fully plant-based diet saves up to 1.5 tonnes CO₂ per year.',
    source: 'Oxford University, Science Journal 2023',
  },
  {
    id: 17,
    category: 'Diet',
    title: 'Reduce Food Waste',
    tip: 'The average household wastes 30% of purchased food. Plan meals, use leftovers creatively, and compost scraps to cut your food carbon footprint by a third.',
    source: 'USDA Economic Research Service',
  },
  {
    id: 18,
    category: 'Diet',
    title: 'Buy Local and Seasonal',
    tip: 'Imported produce travels an average of 1,500 miles. Buying local in-season food reduces transport emissions by up to 10% of your total food footprint.',
    source: 'Leopold Center for Sustainable Agriculture',
  },
  {
    id: 19,
    category: 'Diet',
    title: 'Choose Sustainable Seafood',
    tip: 'Bottom-trawled seafood has 3x the carbon footprint of line-caught. Look for MSC-certified labels and favor small, fast-growing species like sardines and mackerel.',
    source: 'Marine Stewardship Council',
  },
  {
    id: 20,
    category: 'Diet',
    title: 'Grow Your Own Herbs',
    tip: 'Store-bought herbs are often air-freighted and heavily packaged. A windowsill herb garden eliminates transport emissions and provides fresh flavor year-round.',
    source: 'RHS Sustainability Report',
  },

  // WASTE
  {
    id: 21,
    category: 'Waste',
    title: 'Start Composting',
    tip: 'Composting diverts 30% of household waste from landfills, where organic matter produces methane — a greenhouse gas 80x more potent than CO₂ over 20 years.',
    source: 'EPA Composting Guide',
  },
  {
    id: 22,
    category: 'Waste',
    title: 'Refuse Single-Use Plastics',
    tip: 'Carrying a reusable bag, bottle, and coffee cup eliminates roughly 500 single-use plastic items per person per year. Only 9% of plastic is ever recycled.',
    source: 'National Geographic, 2023',
  },
  {
    id: 23,
    category: 'Waste',
    title: 'Buy Secondhand First',
    tip: 'Purchasing used clothing, furniture, and electronics extends product life and avoids the 10–30 kg of CO₂ embedded in manufacturing a new item.',
    source: 'Ellen MacArthur Foundation',
  },
  {
    id: 24,
    category: 'Waste',
    title: 'Recycle Electronics Properly',
    tip: 'E-waste contains toxic heavy metals and valuable rare earth elements. Certified e-waste recyclers recover 95% of materials. Never put electronics in regular trash.',
    source: 'Basel Action Network',
  },
  {
    id: 25,
    category: 'Waste',
    title: 'Choose Minimal Packaging',
    tip: 'Packaging accounts for 30% of municipal waste. Opt for products with recyclable or minimal packaging, and buy in bulk to reduce per-unit packaging waste.',
    source: 'EPA Municipal Solid Waste Report',
  },
];

export default tips;
