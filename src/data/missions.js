// Weekly missions — 7 actionable tasks with point values
const missions = [
  {
    id: 'mission-1',
    title: 'Meatless Monday',
    description: 'Go fully plant-based for all meals today. One meatless day saves approximately 3 kg of CO₂.',
    points: 15,
    category: 'Diet',
    icon: '🥗',
  },
  {
    id: 'mission-2',
    title: 'Walk or Bike Commute',
    description: 'Replace your car commute with walking or cycling at least once this week. Saves 2.4 kg CO₂ per trip.',
    points: 20,
    category: 'Transport',
    icon: '🚲',
  },
  {
    id: 'mission-3',
    title: 'Zero Food Waste Day',
    description: 'Plan meals carefully and use all perishables before they expire. Compost any unavoidable scraps.',
    points: 15,
    category: 'Diet',
    icon: '♻️',
  },
  {
    id: 'mission-4',
    title: 'Unplug All Phantom Loads',
    description: 'Identify and unplug at least 5 devices on standby (chargers, game consoles, TVs). Saves ~0.5 kg CO₂/day.',
    points: 10,
    category: 'Energy',
    icon: '🔌',
  },
  {
    id: 'mission-5',
    title: 'Take a 5-Minute Shower',
    description: 'Time your showers and keep them under 5 minutes all week. Saves approximately 25 gallons of water per shower.',
    points: 10,
    category: 'Water',
    icon: '🚿',
  },
  {
    id: 'mission-6',
    title: 'Carry Reusables All Day',
    description: 'Bring your own bag, water bottle, and coffee cup everywhere today. Refuse all single-use items.',
    points: 10,
    category: 'Waste',
    icon: '🧴',
  },
  {
    id: 'mission-7',
    title: 'Eco Knowledge Share',
    description: 'Share one sustainability fact or tip with a friend, family member, or on social media. Multiply your impact.',
    points: 20,
    category: 'Community',
    icon: '💬',
  },
];

export default missions;
