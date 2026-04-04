"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/quizData";
import { useRouter } from "next/navigation";
import { calculateResult } from "@/lib/quizEngine";

interface QuizEngineProps {
  universeSlug: string;
  questions: QuizQuestion[];
  colorScheme: string;
}

export default function QuizEngine({ universeSlug, questions, colorScheme }: QuizEngineProps) {
  const [userName, setUserName] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userHobby, setUserHobby] = useState("");
  const [userFavCharacter, setUserFavCharacter] = useState("");
  const [userImage, setUserImage] = useState<string>("");
  
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Name/Job, 1: Hobby/Fav, 2: Image
  const [hasStarted, setHasStarted] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [isComputing, setIsComputing] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-400 border-blue-500 text-eclipse-black",
    orange: "bg-orange-500 hover:bg-orange-400 border-orange-500 text-eclipse-black",
    yellow: "bg-yellow-500 hover:bg-yellow-400 border-yellow-500 text-eclipse-black",
    purple: "bg-purple-500 hover:bg-purple-400 border-purple-500 text-white",
    red: "bg-red-500 hover:bg-red-400 border-red-500 text-white"
  };
  const activeColor = colorMap[colorScheme] || colorMap.blue;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (points: Record<string, number>) => {
    const currentQId = questions[currentIndex].id;
    const newAnswers = { ...answers, [currentQId]: points };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      setIsComputing(true);
      
      const result = calculateResult(universeSlug, newAnswers);
      
      localStorage.setItem("puwf_result", JSON.stringify({
        ...result,
        userName: userName || "Mysterious Warrior",
        job: userJob || "Wanderer",
        hobby: userHobby || "Training",
        favCharacter: userFavCharacter || "Unknown",
        userImage: userImage
      }));

      setTimeout(() => {
        router.push(`/${universeSlug}/puwf/result`);
      }, 2000);
    }
  };

  const handleNextOnboarding = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(prev => prev + 1);
    } else {
      setHasStarted(true);
    }
  };

  if (!hasStarted) {
    return (
      <div className="w-full max-w-md mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {onboardingStep === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <h2 className="font-heading text-3xl font-bold text-white mb-4">Identity Matrix</h2>
              <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">Establish your base parameters</p>
              
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="YOUR NAME"
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center uppercase mb-4"
              />
              <input
                type="text"
                value={userJob}
                onChange={(e) => setUserJob(e.target.value)}
                placeholder="WHAT DO YOU DO FOR A LIVING?"
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center uppercase mb-8"
              />

              <button
                onClick={handleNextOnboarding}
                disabled={!userName.trim()}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${userName.trim() ? activeColor + " cursor-pointer" : "bg-light-ash/5 text-light-ash/20 cursor-not-allowed"}`}
              >
                Continue
              </button>
            </motion.div>
          )}

          {onboardingStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <h2 className="font-heading text-3xl font-bold text-white mb-4">Personal Details</h2>
              <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">Refining your profile</p>
              
              <input
                type="text"
                value={userHobby}
                onChange={(e) => setUserHobby(e.target.value)}
                placeholder="HOBBY / PASSION"
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center uppercase mb-4"
              />
              <input
                type="text"
                value={userFavCharacter}
                onChange={(e) => setUserFavCharacter(e.target.value)}
                placeholder="FAV. CHARACTER FROM THIS VERSE"
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center uppercase mb-8"
              />

              <button
                onClick={handleNextOnboarding}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${activeColor}`}
              >
                Continue
              </button>
            </motion.div>
          )}

          {onboardingStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <h2 className="font-heading text-3xl font-bold text-white mb-4">Provide Portrait</h2>
              <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">For your identification card</p>
              
              <div 
                className="w-full h-48 border-2 border-dashed border-light-ash/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-puwf-fire/50 overflow-hidden relative mb-8"
                onClick={() => fileInputRef.current?.click()}
              >
                {userImage ? (
                  <img src={userImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-light-ash/40 font-heading tracking-widest uppercase">Tap to Upload Image<br/>(Optional)</span>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </div>

              <button
                onClick={handleNextOnboarding}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${activeColor}`}
              >
                Commence Query
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
    <div className="w-full max-w-2xl mx-auto px-6 pt-32 pb-12 flex flex-col items-center">
      <div className="w-full h-2 bg-eclipse-black/50 rounded-full mb-12 overflow-hidden border border-light-ash/10">
        <div className={`h-full transition-all duration-500 ease-out ${activeColor}`} style={{ width: `${progressPercent}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full text-center flex flex-col items-center">
          <span className="font-mono text-puwf-fire text-sm tracking-widest uppercase mb-4 block">Query 0{currentIndex + 1}</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">{currentQ.text}</h2>
          <div className="w-full flex flex-col gap-4">
            {currentQ.options.map((option, idx) => (
              <button key={idx} onClick={() => handleSelect(option.points)} className="w-full text-left px-6 py-5 rounded-xl bg-eclipse-black/40 border border-light-ash/10 hover:border-light-ash/50 hover:bg-eclipse-black/80 transition-all font-medium text-light-ash text-lg shadow-lg group relative overflow-hidden">
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
