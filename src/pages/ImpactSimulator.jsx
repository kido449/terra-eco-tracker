import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import AnimatedNumber from '../components/AnimatedNumber';
import { calculateFromSliders } from '../utils/calculations';
import { clampNumber } from '../utils/validation';

export default function ImpactSimulator() {
  const simulatorValues = useStore((s) => s.simulatorValues);
  const updateSimulatorValues = useStore((s) => s.updateSimulatorValues);

  const updateSlider = (key, val) => {
    updateSimulatorValues({ ...simulatorValues, [key]: val });
  };

  const results = useMemo(() => calculateFromSliders(simulatorValues), [simulatorValues]);

  const chartData = [
    { name: 'Meat/Diet', value: results.meat / 1000, color: 'var(--color-emerald)' },
    { name: 'Driving', value: results.driving / 1000, color: 'var(--color-cyan)' },
    { name: 'Heating/AC', value: results.thermostat / 1000, color: 'var(--color-violet)' },
    { name: 'Flights', value: results.flights / 1000, color: '#a3a3a3' },
  ];

  const usAverage = 16;
  const comparisonText = results.total / 1000 < usAverage
    ? `${((1 - results.total / 1000 / usAverage) * 100).toFixed(0)}% below US avg`
    : `${(((results.total / 1000 / usAverage) - 1) * 100).toFixed(0)}% above US avg`;

  return (
    <div>
      <PageHeader
        title="Impact Simulator"
        description="Adjust lifestyle sliders and see your projected annual CO₂ footprint update in real time."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.1} className="p-8">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-8">Adjust Your Lifestyle</h3>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <label htmlFor="meatMeals" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">Meat meals per week</label>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">{simulatorValues.meatMeals}</span>
              </div>
              <input id="meatMeals" type="range" min={0} max={21} value={simulatorValues.meatMeals}
                onChange={(e) => updateSlider('meatMeals', +e.target.value)} className="w-full accent-[var(--color-cyan)]" />
              <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-[#525252] mt-2">
                <span>0 (plant-based)</span><span>21 (3 daily)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label htmlFor="milesDriven" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">Miles driven per week</label>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">{simulatorValues.milesDriven}</span>
              </div>
              <input id="milesDriven" type="range" min={0} max={500} step={5} value={simulatorValues.milesDriven}
                onChange={(e) => updateSlider('milesDriven', +e.target.value)} className="w-full accent-[var(--color-cyan)]" />
              <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-[#525252] mt-2">
                <span>0 (car-free)</span><span>500</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label htmlFor="thermostat" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">Thermostat setting (°F)</label>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">{simulatorValues.thermostat}°F</span>
              </div>
              <input id="thermostat" type="range" min={60} max={80} value={simulatorValues.thermostat}
                onChange={(e) => updateSlider('thermostat', +e.target.value)} className="w-full accent-[var(--color-cyan)]" />
              <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-[#525252] mt-2">
                <span>60°F (cool)</span><span>80°F (warm)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label htmlFor="flights" className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">Round-trip flights per year</label>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">{simulatorValues.flights}</span>
              </div>
              <input id="flights" type="range" min={0} max={20} value={simulatorValues.flights}
                onChange={(e) => updateSlider('flights', +e.target.value)} className="w-full accent-[var(--color-cyan)]" />
              <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-[#525252] mt-2">
                <span>0</span><span>20</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          {/* IDE Block for Results Summary */}
          <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl">
            <div className="h-12 border-b border-white/5 flex items-center px-5 justify-between bg-[#111111]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-60" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">simulator-results.json</div>
              <div className="w-4 h-4"></div>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-[#a3a3a3]">
              <pre>
{`{`}
  <span className="text-[var(--color-violet)]">"projected_footprint"</span>: <span className="text-[var(--color-cyan)]">{(results.total / 1000).toFixed(1)}</span>, <span className="text-[#525252]">{"// tonnes CO₂/year"}</span>
  <span className="text-[var(--color-violet)]">"comparison"</span>: <span className={results.total / 1000 < usAverage ? "text-[var(--color-emerald)]" : "text-[#d97706]"}>"{comparisonText}"</span>
{`}`}
              </pre>
            </div>
          </div>

          <GlassCard delay={0.2} className="p-6">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Breakdown by Category</h3>
            <div role="img" aria-label="Bar chart showing breakdown of emissions: meat/diet, driving, heating/ac, and flights" className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#737373', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} unit="t" />
                <Tooltip
                  contentStyle={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12 }}
                  formatter={(val) => [`${val.toFixed(1)} tonnes CO₂`, '']}
                />
                <Bar dataKey="value" barSize={32} radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color})` }} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
