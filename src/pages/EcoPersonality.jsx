import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { quizQuestions, archetypes } from '../data/quiz';

export default function EcoPersonality() {
  const quizCompleted = useStore((s) => s.quizCompleted);
  const quizArchetype = useStore((s) => s.quizArchetype);
  const completeQuiz = useStore((s) => s.completeQuiz);
  const resetQuiz = useStore((s) => s.resetQuiz);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(quizCompleted);

  const totalQuestions = quizQuestions.length;

  const calculateArchetype = (allAnswers) => {
    const scores = { optimizer: 0, minimalist: 0, advocate: 0, innovator: 0, naturalist: 0 };
    allAnswers.forEach((answerScores) => {
      Object.entries(answerScores).forEach(([key, val]) => {
        scores[key] = (scores[key] || 0) + val;
      });
    });
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option.scores];
    setAnswers(newAnswers);

    if (currentQ + 1 < totalQuestions) {
      setCurrentQ(currentQ + 1);
    } else {
      const result = calculateArchetype(newAnswers);
      completeQuiz(result, newAnswers);
      setShowResults(true);
    }
  };

  const handleRetake = () => {
    resetQuiz();
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
  };

  const resultData = quizArchetype ? archetypes[quizArchetype] : null;

  if (showResults && resultData) {
    return (
      <div>
        <PageHeader title="Your Eco Personality" description="Your sustainability archetype has been revealed." />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl mx-auto"
        >
          <GlassCard className="text-center p-8 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-[var(--color-violet)]/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-[var(--color-violet)]/10 border border-white/5 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(139,92,246,0.2)]">
                <span className="text-5xl block filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{resultData.emoji}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-2 text-white">
                {resultData.name}
              </h2>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)] mb-6">{resultData.tagline}</p>
              <p className="text-sm text-[#a3a3a3] leading-relaxed mb-10 max-w-lg mx-auto">
                {resultData.description}
              </p>

              <div className="flex flex-col gap-3 mb-10">
                {resultData.strengths.map((s, i) => (
                  <div key={i} className="bg-[var(--color-dark)]/50 rounded-[16px] px-6 py-4 border border-white/5 text-sm font-bold text-white flex items-center gap-4 shadow-sm hover:border-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]">✓</div>
                    {s}
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-[var(--color-violet)]/20 bg-[var(--color-violet)]/5 p-6 text-left mb-10 shadow-[0_0_20px_-5px_rgba(139,92,246,0.1)]">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-violet)] mb-3">Growth Area</p>
                <p className="text-sm font-light text-white leading-relaxed">{resultData.growth}</p>
              </div>

              <button
                onClick={handleRetake}
                className="px-8 py-3 rounded-full border border-white/10 bg-transparent text-[12px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
              >
                Retake Quiz
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div>
      <PageHeader
        title="Eco Personality Quiz"
        description="Answer 8 questions to discover your sustainability archetype."
      />

      <div className="max-w-2xl mx-auto">
        <ProgressBar value={currentQ} max={totalQuestions} label={`Question ${currentQ + 1} of ${totalQuestions}`} className="mb-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <GlassCard className="p-8">
              <h2 className="text-2xl font-display text-white mb-8 leading-snug">
                {question.question}
              </h2>
              <div className="space-y-4">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left px-6 py-4 rounded-[16px] border border-white/5 bg-[var(--color-dark)] text-sm font-normal text-[#a3a3a3] hover:border-[var(--color-violet)]/40 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] shadow-sm hover:shadow-[0_0_15px_-3px_var(--color-violet)]"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
