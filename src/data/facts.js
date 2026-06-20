// Daily eco facts — category-tagged with sources
const facts = [
  {
    id: 1,
    category: 'Energy',
    fact: 'Switching to LED bulbs uses 75% less energy and lasts 25 times longer than incandescent lighting.',
    source: 'U.S. Department of Energy',
  },
  {
    id: 2,
    category: 'Transport',
    fact: 'A single transatlantic round-trip flight generates about 1.6 tonnes of CO₂ — nearly half the annual target for a sustainable lifestyle.',
    source: 'ICCT, 2023',
  },
  {
    id: 3,
    category: 'Diet',
    fact: 'Producing 1 kg of beef requires approximately 15,400 liters of water and generates 27 kg of CO₂ equivalent.',
    source: 'Water Footprint Network',
  },
  {
    id: 4,
    category: 'Waste',
    fact: 'The average American generates 4.4 pounds of trash per day — about 1,600 pounds per year.',
    source: 'EPA, 2022',
  },
  {
    id: 5,
    category: 'Water',
    fact: 'Fixing a single leaky faucet can save over 3,000 gallons of water per year — enough for 180 showers.',
    source: 'USGS Water Science',
  },
  {
    id: 6,
    category: 'Energy',
    fact: 'Phantom power from plugged-in electronics costs U.S. households an estimated $19 billion annually.',
    source: 'NRDC Standby Power Study',
  },
  {
    id: 7,
    category: 'Transport',
    fact: 'Cycling instead of driving for short trips (under 5 miles) can reduce your transport emissions by up to 75%.',
    source: 'European Cyclists Federation',
  },
  {
    id: 8,
    category: 'Diet',
    fact: 'If food waste were a country, it would be the third-largest greenhouse gas emitter after China and the United States.',
    source: 'FAO, United Nations',
  },
  {
    id: 9,
    category: 'Energy',
    fact: 'A programmable thermostat can save approximately 10% on heating and cooling bills annually — about 1 tonne of CO₂.',
    source: 'ENERGY STAR',
  },
  {
    id: 10,
    category: 'Waste',
    fact: 'Recycling one aluminum can saves enough energy to run a TV for three hours.',
    source: 'Aluminum Association',
  },
  {
    id: 11,
    category: 'Transport',
    fact: 'Public transit produces 45% less CO₂ per passenger mile than a single-occupancy vehicle.',
    source: 'American Public Transportation Association',
  },
  {
    id: 12,
    category: 'Water',
    fact: 'Shortening your shower by just 2 minutes can save up to 1,750 gallons of water per year.',
    source: 'EPA WaterSense',
  },
  {
    id: 13,
    category: 'Diet',
    fact: 'A plant-based diet has roughly 50% lower carbon emissions than a meat-heavy diet — saving up to 1.5 tonnes CO₂ per year.',
    source: 'Oxford University, 2023',
  },
  {
    id: 14,
    category: 'Energy',
    fact: 'Solar panels on an average U.S. home offset about 3–4 tonnes of CO₂ annually — equivalent to planting 100 trees each year.',
    source: 'SEIA',
  },
  {
    id: 15,
    category: 'Waste',
    fact: 'Composting food scraps can divert 30% of household waste from landfills and reduce methane emissions.',
    source: 'EPA Composting Guide',
  },
  {
    id: 16,
    category: 'Transport',
    fact: 'Electric vehicles produce 50–70% fewer lifecycle emissions than conventional cars, even accounting for battery production.',
    source: 'Bloomberg NEF, 2023',
  },
  {
    id: 17,
    category: 'Water',
    fact: 'The fashion industry uses about 79 trillion liters of water annually — enough to fill 32 million Olympic swimming pools.',
    source: 'UN Environment Programme',
  },
  {
    id: 18,
    category: 'Energy',
    fact: 'Wind energy now provides over 10% of U.S. electricity, avoiding 336 million tonnes of CO₂ emissions since 2000.',
    source: 'AWEA, 2023',
  },
  {
    id: 19,
    category: 'Diet',
    fact: 'Growing your own herbs and vegetables, even on a balcony, eliminates packaging, transport, and refrigeration emissions.',
    source: 'RHS Sustainability Report',
  },
  {
    id: 20,
    category: 'Waste',
    fact: 'Fast fashion produces 92 million tonnes of textile waste annually. Buying secondhand can reduce your fashion footprint by 82%.',
    source: 'Ellen MacArthur Foundation',
  },
  {
    id: 21,
    category: 'Energy',
    fact: 'Air-drying clothes instead of using a dryer can save approximately 2,400 pounds of CO₂ over the dryer\'s lifetime.',
    source: 'Project Laundry List',
  },
  {
    id: 22,
    category: 'Transport',
    fact: 'Telecommuting just two days a week can reduce your annual commute emissions by 40% — about 0.8 tonnes of CO₂.',
    source: 'Global Workplace Analytics',
  },
];

export default facts;
