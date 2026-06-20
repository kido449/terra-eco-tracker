// Eco Personality Quiz — 8 questions with scoring toward archetypes
// Archetypes: optimizer, minimalist, advocate, innovator, naturalist

const quizQuestions = [
  {
    id: 1,
    question: 'When you hear about a new environmental problem, your first instinct is to:',
    options: [
      { text: 'Research the data and find the most efficient solution', scores: { optimizer: 3, innovator: 1 } },
      { text: 'Simplify — cut out the source of the problem entirely', scores: { minimalist: 3, naturalist: 1 } },
      { text: 'Talk about it with friends and rally people to act', scores: { advocate: 3, optimizer: 1 } },
      { text: 'Look for a technology or product that solves it', scores: { innovator: 3, optimizer: 1 } },
    ],
  },
  {
    id: 2,
    question: 'Your ideal weekend activity is:',
    options: [
      { text: 'Optimizing your home energy setup or meal prepping', scores: { optimizer: 3, minimalist: 1 } },
      { text: 'A hike or camping trip — no screens, no noise', scores: { naturalist: 3, minimalist: 1 } },
      { text: 'Volunteering at a local cleanup or community garden', scores: { advocate: 3, naturalist: 1 } },
      { text: 'Visiting a tech expo or testing out an EV', scores: { innovator: 3, optimizer: 1 } },
    ],
  },
  {
    id: 3,
    question: 'When shopping, you prioritize:',
    options: [
      { text: 'Best value per unit — I compare labels and lifecycle costs', scores: { optimizer: 3, innovator: 1 } },
      { text: 'Do I even need this? I buy as little as possible', scores: { minimalist: 3, naturalist: 1 } },
      { text: 'Ethical brands — fair trade, B-Corp certified, local', scores: { advocate: 3, minimalist: 1 } },
      { text: 'The latest sustainable innovation — even if pricier', scores: { innovator: 3, advocate: 1 } },
    ],
  },
  {
    id: 4,
    question: 'Your home style is best described as:',
    options: [
      { text: 'Smart and automated — thermostat schedules, energy monitors', scores: { optimizer: 3, innovator: 2 } },
      { text: 'Sparse and intentional — only things I truly need', scores: { minimalist: 3, naturalist: 1 } },
      { text: 'Cozy with secondhand finds and DIY touches', scores: { advocate: 2, naturalist: 2 } },
      { text: 'Full of plants, natural light, and organic materials', scores: { naturalist: 3, minimalist: 1 } },
    ],
  },
  {
    id: 5,
    question: 'If you could change one thing about how society handles sustainability:',
    options: [
      { text: 'Make carbon data transparent on every product', scores: { optimizer: 3, advocate: 1 } },
      { text: 'Shift culture away from consumerism entirely', scores: { minimalist: 3, advocate: 1 } },
      { text: 'Require sustainability education in every school', scores: { advocate: 3, naturalist: 1 } },
      { text: 'Invest massively in clean energy R&D', scores: { innovator: 3, optimizer: 1 } },
    ],
  },
  {
    id: 6,
    question: 'Your approach to food and diet:',
    options: [
      { text: 'Track macros, minimize waste, buy exactly what I need', scores: { optimizer: 3, minimalist: 1 } },
      { text: 'Simple meals, few ingredients, mostly plants', scores: { minimalist: 3, naturalist: 1 } },
      { text: 'Support farmers\' markets and food co-ops', scores: { advocate: 2, naturalist: 2 } },
      { text: 'Interested in lab-grown meat, vertical farms, food tech', scores: { innovator: 3, optimizer: 1 } },
    ],
  },
  {
    id: 7,
    question: 'When a friend says "recycling doesn\'t matter," you respond:',
    options: [
      { text: 'Show them the data — here\'s what 1 tonne of recycled aluminum actually saves', scores: { optimizer: 3, advocate: 1 } },
      { text: 'Agree partially — reducing consumption matters more than recycling', scores: { minimalist: 3, optimizer: 1 } },
      { text: 'Challenge them — collective action creates systemic pressure', scores: { advocate: 3, innovator: 1 } },
      { text: 'Talk about chemical recycling innovations and circular economy tech', scores: { innovator: 3, advocate: 1 } },
    ],
  },
  {
    id: 8,
    question: 'Your climate anxiety coping strategy:',
    options: [
      { text: 'Build spreadsheets tracking my personal carbon reductions', scores: { optimizer: 3, minimalist: 1 } },
      { text: 'Detach from news, simplify life, focus on what I control', scores: { minimalist: 3, naturalist: 1 } },
      { text: 'Join a climate group — solidarity helps', scores: { advocate: 3, naturalist: 1 } },
      { text: 'Read about breakthroughs — solutions are coming', scores: { innovator: 3, optimizer: 1 } },
    ],
  },
];

const archetypes = {
  optimizer: {
    name: 'The Optimizer',
    emoji: '📊',
    tagline: 'Data-driven impact maker',
    description: 'You believe in measuring what matters. Your approach to sustainability is systematic and evidence-based — you track your carbon footprint, compare product lifecycles, and find the highest-impact changes to make. You\'re the person who knows exactly how many kg of CO₂ each choice saves.',
    strengths: ['Analytical thinking', 'Consistent habits', 'Evidence-based decisions', 'Long-term planning'],
    growth: 'Remember that not everyone responds to data. Sometimes emotional storytelling and community connection drive more change than spreadsheets.',
    color: '#3b82f6',
  },
  minimalist: {
    name: 'The Minimalist',
    emoji: '🍃',
    tagline: 'Less is more, always',
    description: 'Your philosophy is simple: the most sustainable product is the one you don\'t buy. You\'ve mastered the art of intentional living — fewer possessions, less consumption, smaller footprint. You prove that sustainability doesn\'t require buying "green" products; it requires buying less.',
    strengths: ['Intentional living', 'Low consumption', 'Waste reduction', 'Inner contentment'],
    growth: 'Consider that some investments (solar panels, efficient appliances) have a net-positive environmental return even though they involve purchasing something new.',
    color: '#8b5cf6',
  },
  advocate: {
    name: 'The Advocate',
    emoji: '📢',
    tagline: 'Multiplying impact through community',
    description: 'You know that individual action matters, but systemic change is what moves the needle. You organize, educate, and inspire others. Your superpower is turning personal conviction into collective action — from neighborhood cleanups to contacting representatives.',
    strengths: ['Community building', 'Communication', 'Systemic thinking', 'Inspiring others'],
    growth: 'Make sure your own habits walk the talk. Personal credibility strengthens your advocacy enormously.',
    color: '#f59e0b',
  },
  innovator: {
    name: 'The Innovator',
    emoji: '🔬',
    tagline: 'Technology will save us — if we build it right',
    description: 'You\'re excited about the future. Clean energy breakthroughs, carbon capture, lab-grown proteins, circular economy platforms — you see technology as humanity\'s best lever for sustainability at scale. You\'re an early adopter and a pragmatic optimist.',
    strengths: ['Forward thinking', 'Early adoption', 'Problem solving', 'Scalable impact'],
    growth: 'Not all solutions need to be high-tech. Sometimes the simplest, lowest-tech approaches (walking, eating local) are the most effective and equitable.',
    color: '#06b6d4',
  },
  naturalist: {
    name: 'The Naturalist',
    emoji: '🌿',
    tagline: 'Connected to the living world',
    description: 'Your environmentalism comes from a deep love of nature. You hike, garden, forage, and observe. You understand ecosystems intuitively and feel the urgency of protecting biodiversity. For you, sustainability isn\'t about carbon math — it\'s about preserving the beauty of the natural world.',
    strengths: ['Nature connection', 'Biodiversity awareness', 'Patience', 'Holistic perspective'],
    growth: 'Complement your nature love with some data literacy. Understanding the numbers helps you advocate for the places and species you care about.',
    color: '#10b981',
  },
};

export { quizQuestions, archetypes };
