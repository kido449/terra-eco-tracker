import { motion } from 'framer-motion';

export default function HorizontalSelector({ options, activeOption, onChange }) {
  // options should be an array of objects: { id: string, label: string, icon: string | node }

  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
      {options.map((opt) => {
        const isActive = activeOption === opt.id;
        
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`snap-center shrink-0 flex items-center relative overflow-hidden transition-colors ${
              isActive 
                ? 'w-[160px] h-14 bg-[var(--color-charcoal)] rounded-full px-2 shadow-md' 
                : 'w-14 h-14 bg-white rounded-[16px] border border-[var(--color-graygreen)]/30 justify-center hover:bg-white/80'
            }`}
            layout
          >
            {isActive ? (
              <>
                <motion.div 
                  layoutId="activeCircle"
                  className="w-10 h-10 rounded-full bg-[var(--color-red)] flex items-center justify-center shrink-0 z-10 shadow-sm"
                >
                  <span className="text-white text-lg">{opt.icon}</span>
                </motion.div>
                <span className="text-white font-black text-sm ml-3 truncate pr-2 relative z-10">{opt.label}</span>
              </>
            ) : (
              <span className="text-[var(--color-charcoal)] text-xl opacity-60 grayscale">{opt.icon}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
