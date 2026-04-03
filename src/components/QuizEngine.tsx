"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/quizData";
import { useRouter } from "next/navigation";

interface QuizEngineProps {
  universeSlug: string;
  questions: QuizQuestion[];
  colorScheme: string;
}

export default function QuizEngine({ universeSlug, questions, colorScheme }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [isComputing, setIsComputing] = useState(false);
  const router = useRouter();

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-400 border-blue-500 text-eclipse-black",
    orange: "bg-orange-500 hover:bg-orange-400 border-orange-500 text-eclipse-black",
    yellow: "bg-yellow-500 hover:bg-yellow-400 border-yellow-500 text-eclipse-black",
    purple: "bg-purple-500 hover:bg-purple-400 border-purple-500 text-white",
    red: "bg-red-500 hover:bg-red-400 border-red-500 text-white"
  };
  const activeColor = colorMap[colorScheme] || colorMap.blue;

  const handleSelect = (points: Record<string, number>) => {
    // Merge points dynamically
    const currentQId = questions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [currentQId]: points }));

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      setIsComputing(true);
      // In Phase 3, we would execute complex math here and push parameters
      setTimeout(() => {
        router.push(`/${universeSlug}/puwf/result`);
      }, 1500);
    }
  };

  if (isComputing) {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center min-h-[40vh]">
        <div className="w-16 h-16 border-4 border-light-ash/20 border-t-puwf-fire rounded-full animate-spin mb-6"></div>
        <h2 className="font-heading text-2xl font-bold text-white tracking-widest uppercase animate-pulse">Calculating Matrix...</h2>
        <p className="text-light-ash/50 mt-2 font-mono">Forging your definitive artifact</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-eclipse-black/50 rounded-full mb-12 overflow-hidden border border-light-ash/10">
        <div 
          className={`h-full transition-all duration-500 ease-out ${activeColor}`} 
          style={{ width: `${progressPercent}%` }} 
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full text-center flex flex-col items-center"
        >
          <span className="font-mono text-puwf-fire text-sm tracking-widest uppercase mb-4 block">
            Query 0{currentIndex + 1}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
            {currentQ.text}
          </h2>

          <div className="w-full flex flex-col gap-4">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.points)}
                className="w-full text-left px-6 py-5 rounded-xl bg-eclipse-black/40 border border-light-ash/10 hover:border-light-ash/50 hover:bg-eclipse-black/80 transition-all font-medium text-light-ash text-lg shadow-lg group relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${activeColor}`} />
                <span className="relative z-10">{option.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
