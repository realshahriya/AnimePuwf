"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [imageScanned, setImageScanned] = useState(false);
  const [userPersonality, setUserPersonality] = useState<Record<string, number> | null>(null);
  
  const [step, setStep] = useState(0); // 0: Name/Job, 1: Hobby/Fav, 2: Personality, 3: Image
  const [isComputing, setIsComputing] = useState(false);
  
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJobDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setIsImageProcessing(true);
      setImageScanned(false);
      setUserImage("");
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate scan delay for effect
        setTimeout(() => {
          setUserImage(reader.result as string);
          setIsImageProcessing(false);
          setImageScanned(true);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      finishAndCompute();
    }
  };

  const finishAndCompute = () => {
    setIsComputing(true);
    
    // We only have one personality question now, mock the answers object
    const finalAnswers = {
      "personality": userPersonality || questions[0].options[0].points
    };
    
    const result = calculateResult(universeSlug, finalAnswers, userJob);
    
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

  const progressPercent = ((step) / 4) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
      <div className="w-full h-2 bg-eclipse-black/50 rounded-full mb-12 overflow-hidden border border-light-ash/10">
        <div className={`h-full transition-all duration-500 ease-out ${activeColor}`} style={{ width: `${progressPercent}%` }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Identity Matrix</h2>
            <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">Establish your base parameters</p>
            
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="YOUR NAME"
              className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center uppercase mb-4"
            />
            <div className="relative w-full mb-8" ref={dropdownRef}>
              <div
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none hover:border-puwf-fire/50 transition-all text-center uppercase cursor-pointer flex justify-between items-center"
              >
                <span className={`flex-1 ${!userJob ? "text-light-ash/50" : ""}`}>
                  {userJob || "SELECT YOUR PROFESSION"}
                </span>
                <span className={`text-light-ash/50 text-xs transition-transform duration-300 ${isJobDropdownOpen ? "rotate-180" : ""}`}>▼</span>
              </div>
              <AnimatePresence>
                {isJobDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full mt-2 bg-eclipse-black border border-light-ash/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl"
                  >
                    {["Student", "Employed / Professional", "Freelancer / Creative", "Athlete / Fitness", "Entrepreneur / Business", "Other"].map((job) => (
                      <div
                        key={job}
                        onClick={() => {
                          setUserJob(job);
                          setIsJobDropdownOpen(false);
                        }}
                        className={`px-6 py-4 text-center font-heading tracking-widest text-sm uppercase cursor-pointer transition-all ${userJob === job ? activeColor : "text-light-ash/80 hover:bg-light-ash/10 hover:text-white"}`}
                      >
                        {job}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleNext}
              disabled={!userName.trim() || !userJob}
              className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${(userName.trim() && userJob) ? activeColor + " cursor-pointer" : "bg-light-ash/5 text-light-ash/20 cursor-not-allowed"}`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
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
              onClick={handleNext}
              className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${activeColor}`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Personality Test</h2>
            <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">How would you describe your core nature?</p>
            
            <div className="w-full flex flex-col gap-4 max-w-md mx-auto mb-8">
              {questions[0]?.options.map((option, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    setUserPersonality(option.points);
                    handleNext();
                  }} 
                  className="w-full text-left px-6 py-5 rounded-xl bg-eclipse-black/40 border border-light-ash/10 hover:border-light-ash/50 hover:bg-eclipse-black/80 transition-all font-medium text-light-ash text-lg shadow-lg group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${activeColor}`} />
                  <span className="relative z-10">{option.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Provide Portrait</h2>
            <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">For your identification card</p>
            
            <div 
              className={`w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden relative mb-4 transition-all duration-300 ${
                isImageProcessing ? "border-puwf-fire/60 bg-puwf-fire/5" :
                imageScanned ? "border-green-500/60 bg-green-500/5" :
                "border-light-ash/20 hover:border-puwf-fire/50 cursor-pointer"
              }`}
              onClick={() => !isImageProcessing && fileInputRef.current?.click()}
            >
              {/* Processing State */}
              {isImageProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-eclipse-black/60 backdrop-blur-sm z-10"
                >
                  {/* Scanning line animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-puwf-fire/70"
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                    style={{ boxShadow: "0 0 12px 2px rgba(255,107,0,0.6)" }}
                  />
                  <div className="w-14 h-14 border-4 border-light-ash/10 border-t-puwf-fire rounded-full animate-spin mb-4" />
                  <span className="font-mono text-puwf-fire text-xs tracking-[0.3em] uppercase animate-pulse">Scanning Matrix...</span>
                </motion.div>
              )}

              {/* Success overlay flash */}
              {imageScanned && userImage && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute inset-0 bg-green-500/20 z-20 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* Image preview */}
              {userImage ? (
                <Image src={userImage} alt="User Portrait" fill style={{ objectFit: "cover" }} />
              ) : !isImageProcessing ? (
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-10 h-10 text-light-ash/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-4m0 0V8m0 4H8m4 0h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-light-ash/40 font-heading tracking-widest uppercase text-sm text-center">Tap to Upload Portrait<br/><span className="text-xs opacity-60">(Optional)</span></span>
                </div>
              ) : null}

              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>

            {/* Re-upload hint after image selected */}
            {userImage && !isImageProcessing && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-light-ash/40 text-xs font-mono tracking-widest uppercase mb-6 cursor-pointer hover:text-puwf-fire transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                ↑ Tap to change portrait
              </motion.p>
            )}
            {!userImage && <div className="mb-6" />}

            <button
              onClick={finishAndCompute}
              disabled={isImageProcessing}
              className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl ${
                isImageProcessing ? "bg-light-ash/5 text-light-ash/20 cursor-not-allowed" : activeColor
              }`}
            >
              {isImageProcessing ? "Processing..." : "Generate Poster"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
