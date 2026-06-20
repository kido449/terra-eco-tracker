import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import offsets from '../data/offsets';

export default function CarbonOffsetMarketplace() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Map arbitrary colors to our palette
  const getPaletteColor = (colorStr) => {
    if (colorStr.includes('emerald') || colorStr.includes('green')) return 'var(--color-emerald)';
    if (colorStr.includes('blue') || colorStr.includes('teal')) return 'var(--color-cyan)';
    if (colorStr.includes('yellow') || colorStr.includes('amber')) return '#f59e0b';
    return 'var(--color-violet)';
  };

  return (
    <div>
      <PageHeader
        title="Offset Marketplace"
        description="Explore verified projects around the world to offset your remaining carbon footprint."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {offsets.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="bg-[#080808]/80 backdrop-blur-xl rounded-[24px] border border-white/5 flex flex-col group relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[var(--color-cyan)]/30 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300"
          >
            <div
              className="absolute top-0 right-0 px-4 py-2 rounded-bl-[16px] font-mono text-[10px] font-bold uppercase tracking-widest z-10 border-b border-l border-white/10"
              style={{ backgroundColor: `${getPaletteColor(project.typeBadgeColor)}20`, color: getPaletteColor(project.typeBadgeColor) }}
            >
              {project.type}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-display text-white mb-2 pr-20 leading-tight">{project.title}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-6 flex items-center gap-2">
                <span className="grayscale opacity-40">📍</span> {project.location}
              </p>

              <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="space-y-3 mb-8">
                {project.impact.slice(0, 2).map((imp, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-normal text-[#a3a3a3]">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] flex items-center justify-center shrink-0 text-[10px] shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]">✓</div>
                    <span>{imp}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-2xl font-bold text-white tabular-nums tracking-tight">${project.pricePerTonne}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mt-1">per tonne</p>
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-6 py-2 rounded-full border border-white/10 bg-transparent text-[12px] font-bold uppercase tracking-widest text-white hover:border-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
                >
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="w-full max-w-xl bg-[#080808] rounded-[32px] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              >
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: getPaletteColor(selectedProject.typeBadgeColor), boxShadow: `0 0 20px ${getPaletteColor(selectedProject.typeBadgeColor)}` }}
                />
                
                <div className="p-8 sm:p-10">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <h2 id="modal-title" className="text-3xl sm:text-4xl font-display text-white mb-3 tracking-tight leading-none">{selectedProject.title}</h2>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#737373] flex items-center gap-2">
                        <span className="grayscale opacity-40">📍</span> {selectedProject.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close details"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a3a3a3] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-[#a3a3a3] leading-relaxed mb-8">{selectedProject.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[var(--color-dark)]/50 rounded-[16px] border border-white/5 p-6 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mb-2">Price</p>
                      <p className="text-3xl font-bold text-white">${selectedProject.pricePerTonne}<span className="text-sm font-normal text-[#525252]">/t</span></p>
                    </div>
                    <div className="bg-[var(--color-dark)]/50 rounded-[16px] border border-white/5 p-6 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mb-2">Standard</p>
                      <p className="text-sm font-bold text-white mt-2">{selectedProject.verifier}</p>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest border border-[var(--color-emerald)]/30 text-[var(--color-emerald)] rounded-full px-3 py-1 inline-block mt-3 bg-[var(--color-emerald)]/10 shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]">Verified</span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-4">Project Impact</h4>
                    <div className="space-y-3">
                      {selectedProject.impact.map((imp, idx) => (
                        <div key={idx} className="flex items-start gap-4 text-sm text-[#a3a3a3] bg-[var(--color-dark)]/50 rounded-[16px] border border-white/5 px-5 py-4 shadow-sm hover:border-white/10 transition-colors">
                          <div className="w-5 h-5 rounded-full bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] flex items-center justify-center shrink-0 text-[10px] shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]">✓</div>
                          <span>{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] hover:opacity-90 text-white font-bold text-[12px] uppercase tracking-widest shadow-[0_0_20px_-5px_var(--color-cyan)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Purchase Offset Allocation
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
