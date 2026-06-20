import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import AnimatedNumber from '../components/AnimatedNumber';
import { calculateFootprint } from '../utils/calculations';
import { clampNumber } from '../utils/validation';

const steps = [
  { id: 'housing', label: 'Housing', icon: '🏠' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'diet', label: 'Diet', icon: '🍽️' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '🛍️' },
];

const defaultValues = {
  housingType: 'apartment',
  householdSize: 2,
  electricityUsage: 'average',
  commuteMode: 'car',
  commuteDistance: 15,
  flights: 2,
  dietType: 'omnivore',
  foodWaste: 'average',
  localFood: 30,
  shoppingFreq: 'moderate',
  streaming: 3,
  recycling: 'sometimes',
};

function ProgressBar({ value, max, label, className }) {
  return (
    <div className={className}>
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#737373] mb-2">
        <span>{label}</span>
        <span>{Math.round(((value + 1) / max) * 100)}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full bg-[var(--color-cyan)]" initial={{ width: 0 }} animate={{ width: `${((value + 1) / max) * 100}%` }} />
      </div>
    </div>
  );
}
ProgressBar.propTypes = { value: PropTypes.number, max: PropTypes.number, label: PropTypes.string, className: PropTypes.string };

export default function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(defaultValues);
  const [showResults, setShowResults] = useState(false);
  const saveCalculatorResults = useStore((s) => s.saveCalculatorResults);

  const updateValue = (key, val) => setValues({ ...values, [key]: val });

  const results = useMemo(() => calculateFootprint(values), [values]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveCalculatorResults(results);
      setShowResults(true);
    }
  };

  const chartData = [
    { name: 'Housing', value: results.housing, color: 'var(--color-violet)' },
    { name: 'Transport', value: results.transport, color: 'var(--color-cyan)' },
    { name: 'Diet', value: results.diet, color: 'var(--color-emerald)' },
    { name: 'Lifestyle', value: results.lifestyle, color: '#a3a3a3' },
  ];

  const comparisonData = [
    { name: 'You', value: results.total / 1000, color: 'var(--color-cyan)' },
    { name: 'US Avg', value: 16, color: '#525252' },
    { name: 'World Avg', value: 4.7, color: '#737373' },
    { name: 'Target', value: 4, color: 'var(--color-emerald)' },
  ];

  if (showResults) {
    return (
      <div>
        <PageHeader title="Your Carbon Footprint" description="Here's your estimated annual carbon footprint breakdown." />
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl"
          >
            <div className="h-12 border-b border-white/5 flex items-center px-5 justify-between bg-[#111111]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-60" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">carbon-breakdown.json</div>
              <button className="text-[#737373] hover:text-white transition-colors focus-visible:outline-none" onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-[#a3a3a3]">
              <pre>
{`{`}
  <span className="text-[var(--color-violet)]">"total_footprint"</span>: <span className="text-[var(--color-cyan)]">{(results.total / 1000).toFixed(1)}</span>, <span className="text-[#525252]">{"// tonnes CO₂/year"}</span>
  <span className="text-[var(--color-violet)]">"breakdown_kg"</span>: {`{`}
    <span className="text-[var(--color-violet)]">"housing"</span>: <span className="text-[var(--color-cyan)]">{results.housing}</span>,
    <span className="text-[var(--color-violet)]">"transport"</span>: <span className="text-[var(--color-cyan)]">{results.transport}</span>,
    <span className="text-[var(--color-violet)]">"diet"</span>: <span className="text-[var(--color-cyan)]">{results.diet}</span>,
    <span className="text-[var(--color-violet)]">"lifestyle"</span>: <span className="text-[var(--color-cyan)]">{results.lifestyle}</span>
  {`}`}
{`}`}
              </pre>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard delay={0.1} className="hover:-translate-y-2 hover:border-[var(--color-violet)]/30 hover:shadow-[0_0_30px_-10px_var(--color-violet)]">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Category Breakdown</h3>
              <div role="img" aria-label="Bar chart showing breakdown of emissions: housing, transport, diet, lifestyle" className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.1)" horizontal={true} />
                  <XAxis type="number" tick={{ fill: '#737373', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12 }}
                    formatter={(val) => [`${val.toLocaleString()} kg CO₂`, '']}
                  />
                  <Bar dataKey="value" barSize={16} radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color})` }} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard delay={0.15} className="hover:-translate-y-2 hover:border-[var(--color-cyan)]/30 hover:shadow-[0_0_30px_-10px_var(--color-cyan)]">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">How You Compare</h3>
              <div role="img" aria-label="Bar chart showing your footprint compared to global average and target" className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#737373', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12 }}
                    formatter={(val) => [`${val} tonnes CO₂`, '']}
                  />
                  <Bar dataKey="value" barSize={32} radius={[8, 8, 0, 0]}>
                    {comparisonData.map((entry, i) => <Cell key={i} fill={entry.color} style={{ filter: entry.name === 'You' || entry.name === 'Target' ? `drop-shadow(0 0 8px ${entry.color})` : 'none' }} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => { setShowResults(false); setCurrentStep(0); }}
              className="font-mono text-[10px] uppercase tracking-widest font-bold px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
            >
              Recalculate
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepContent = [
    <HousingStep key="housing" values={values} updateValue={updateValue} />,
    <TransportStep key="transport" values={values} updateValue={updateValue} />,
    <DietStep key="diet" values={values} updateValue={updateValue} />,
    <LifestyleStep key="lifestyle" values={values} updateValue={updateValue} />
  ];

  return (
    <div>
      <PageHeader title="Carbon Calculator" description="Estimate your annual carbon footprint in 4 steps." />

      <div className="max-w-2xl mx-auto">
        <ProgressBar value={currentStep} max={4} label={`Step ${currentStep + 1} of 4: ${steps[currentStep].label}`} className="mb-8" />
        
        <GlassCard className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {stepContent[currentStep]}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`font-mono text-[10px] uppercase tracking-widest font-bold px-6 py-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${currentStep === 0 ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/5'}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="font-mono text-[10px] uppercase tracking-widest font-bold px-8 py-2 rounded-full border border-[var(--color-cyan)]/50 bg-[var(--color-cyan)]/10 text-white hover:bg-[var(--color-cyan)]/20 hover:border-[var(--color-cyan)] transition-all shadow-[0_0_15px_-3px_var(--color-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
            >
              {currentStep === 3 ? 'Calculate' : 'Next'}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// --- Sub-components ---

function HousingStep({ values, updateValue }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Housing Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['apartment', 'Apartment'], ['house', 'House'], ['large-house', 'Large House']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('housingType', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.housingType === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="householdSize" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Household Size: <span className="text-white">{values.householdSize}</span></label>
        <input id="householdSize" type="range" min={1} max={6} value={values.householdSize} onChange={(e) => updateValue('householdSize', +e.target.value)}
          className="w-full accent-[var(--color-cyan)]" />
      </div>
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Electricity Usage</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['low', 'Low'], ['average', 'Average'], ['high', 'High']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('electricityUsage', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.electricityUsage === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
HousingStep.propTypes = { values: PropTypes.object.isRequired, updateValue: PropTypes.func.isRequired };

function TransportStep({ values, updateValue }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Primary Commute Mode</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[['car', '🚗 Car'], ['hybrid', '🔋 Hybrid'], ['ev', '⚡ EV'], ['transit', '🚌 Transit'], ['bike', '🚲 Bike'], ['remote', '🏠 Remote']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('commuteMode', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.commuteMode === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              <span className={values.commuteMode !== val ? 'grayscale opacity-60' : ''}>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="commuteDistance" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">One-Way Commute: <span className="text-white">{values.commuteDistance} miles</span></label>
        <input id="commuteDistance" type="range" min={0} max={60} value={values.commuteDistance} onChange={(e) => updateValue('commuteDistance', +e.target.value)}
          className="w-full accent-[var(--color-cyan)]" />
      </div>
      <div>
        <label htmlFor="flights" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Round-Trip Flights Per Year: <span className="text-white">{values.flights}</span></label>
        <input id="flights" type="range" min={0} max={20} value={values.flights} onChange={(e) => updateValue('flights', +e.target.value)}
          className="w-full accent-[var(--color-cyan)]" />
      </div>
    </div>
  );
}
TransportStep.propTypes = { values: PropTypes.object.isRequired, updateValue: PropTypes.func.isRequired };

function DietStep({ values, updateValue }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Diet Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[['vegan', '🌱 Vegan'], ['vegetarian', '🥗 Vegetarian'], ['pescatarian', '🐟 Pescatarian'], ['omnivore', '🍖 Omnivore'], ['heavy-meat', '🥩 Heavy Meat']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('dietType', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.dietType === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              <span className={values.dietType !== val ? 'grayscale opacity-60' : ''}>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Food Waste Level</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['low', 'Low'], ['average', 'Average'], ['high', 'High']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('foodWaste', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.foodWaste === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="localFood" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Locally Sourced Food: <span className="text-white">{values.localFood}%</span></label>
        <input id="localFood" type="range" min={0} max={100} value={values.localFood} onChange={(e) => updateValue('localFood', +e.target.value)}
          className="w-full accent-[var(--color-cyan)]" />
      </div>
    </div>
  );
}
DietStep.propTypes = { values: PropTypes.object.isRequired, updateValue: PropTypes.func.isRequired };

function LifestyleStep({ values, updateValue }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Shopping Frequency</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['minimal', 'Minimal'], ['moderate', 'Moderate'], ['frequent', 'Frequent']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('shoppingFreq', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.shoppingFreq === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="streaming" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Daily Streaming: <span className="text-white">{values.streaming} hours</span></label>
        <input id="streaming" type="range" min={0} max={10} value={values.streaming} onChange={(e) => updateValue('streaming', +e.target.value)}
          className="w-full accent-[var(--color-cyan)]" />
      </div>
      <div>
        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Recycling Habits</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[['always', 'Always'], ['sometimes', 'Sometimes'], ['never', 'Never']].map(([val, label]) => (
            <button key={val} onClick={() => updateValue('recycling', val)}
              className={`p-4 rounded-[16px] border text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${values.recycling === val ? 'border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]' : 'border-white/10 bg-[var(--color-dark)] text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
LifestyleStep.propTypes = { values: PropTypes.object.isRequired, updateValue: PropTypes.func.isRequired };
