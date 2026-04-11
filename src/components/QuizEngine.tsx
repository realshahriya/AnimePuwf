"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/lib/quizData";
import { useRouter } from "next/navigation";
import { calculateResult } from "@/lib/quizEngine";
import { getRandomTrivia, TriviaQuestion } from "@/lib/triviaData";
import { fetchByHandle, PuwfResultRow, uploadUserImage, rewardBounty } from "@/lib/supabase";
import { createClient } from "@/lib/client";

interface QuizEngineProps {
  universeSlug: string;
  questions: QuizQuestion[];
  colorScheme: string;
  initialReferrer?: string | null;
}

const TOTAL_STEPS = 3; // steps 0-2 (Identity, Knowledge, Portrait)

export default function QuizEngine({ universeSlug, questions, colorScheme, initialReferrer }: QuizEngineProps) {
  const [userName, setUserName] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userHandle, setUserHandle] = useState("");        // X / Telegram handle
  const [userFavCharacter, setUserFavCharacter] = useState("");
  const [userImage, setUserImage] = useState<string>("");
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [imageScanned, setImageScanned] = useState(false);
  const [userPersonality, setUserPersonality] = useState<Record<string, number> | null>(null);
  const [previousUserImage, setPreviousUserImage] = useState<string>("");
  const [usePreviousImage, setUsePreviousImage] = useState(false);
  const [referrerHandle, setReferrerHandle] = useState<string | null>(initialReferrer || null);

  // Previous result lookup
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [previousResult, setPreviousResult] = useState<PuwfResultRow | null>(null);
  const [showPreviousPrompt, setShowPreviousPrompt] = useState(false);

  // Trivia state
  const triviaQuestions = useMemo(() => getRandomTrivia(universeSlug, 3), [universeSlug]);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaSelected, setTriviaSelected] = useState<number | null>(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [triviaScore, setTriviaScore] = useState(0);

  const [step, setStep] = useState(0);
  const [isComputing, setIsComputing] = useState(false);

  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJobDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colorMap: Record<string, string> = {
    blue:   "bg-blue-500 hover:bg-blue-400 border-blue-500 text-eclipse-black",
    orange: "bg-orange-500 hover:bg-orange-400 border-orange-500 text-eclipse-black",
    yellow: "bg-yellow-500 hover:bg-yellow-400 border-yellow-500 text-eclipse-black",
    purple: "bg-purple-500 hover:bg-purple-400 border-purple-500 text-white",
    red:    "bg-red-500 hover:bg-red-400 border-red-500 text-white",
  };
  const activeColor = colorMap[colorScheme] || colorMap.blue;

  const accentText: Record<string, string> = {
    blue: "text-blue-400", orange: "text-orange-400", yellow: "text-yellow-400",
    purple: "text-purple-400", red: "text-red-400",
  };
  const accentBorder: Record<string, string> = {
    blue: "border-blue-400", orange: "border-orange-400", yellow: "border-yellow-400",
    purple: "border-purple-400", red: "border-red-400",
  };
  const accent = accentText[colorScheme] || accentText.orange;
  const accentB = accentBorder[colorScheme] || accentBorder.orange;

  // ─── Image upload ─────────────────────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageProcessing(true);
    setImageScanned(false);
    setUserImage("");

    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX_SIZE = 800;
      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) { height = Math.round((height * MAX_SIZE) / width); width = MAX_SIZE; }
        else { width = Math.round((width * MAX_SIZE) / height); height = MAX_SIZE; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { setIsImageProcessing(false); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL("image/jpeg", 0.80);
      setUserImage(compressed);
      setIsImageProcessing(false);
      setImageScanned(true);
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); setIsImageProcessing(false); };
    img.src = objectUrl;
  };

  // ─── Trivia answer handler ─────────────────────────────────────────────────
  const handleTriviaAnswer = (selectedIdx: number, q: TriviaQuestion) => {
    if (triviaAnswered) return;
    setTriviaSelected(selectedIdx);
    setTriviaAnswered(true);
    if (selectedIdx === q.correct) {
      setTriviaScore(s => s + 1);
    }
  };

  const handleNextTrivia = () => {
    if (triviaIndex < triviaQuestions.length - 1) {
      setTriviaIndex(i => i + 1);
      setTriviaSelected(null);
      setTriviaAnswered(false);
    } else {
      // All trivia done — go to image upload
      setStep(2);
    }
  };

  // ─── Navigation ───────────────────────────────────────────────────────────
  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  // ─── Step 0: look up handle in Supabase before advancing ─────────────────
  const handleInitialContinue = async () => {
    // Basic validation
    if (!userName.trim() || !userJob) return;

    // If handle is provided, lookup previous session. Otherwise, proceed directly.
    const cleanHandle = userHandle.trim().replace(/^@/, "");
    
    if (cleanHandle) {
      setIsLookingUp(true);
      const supabase = createClient();
      const prev = await fetchByHandle(supabase, cleanHandle, universeSlug);
      setIsLookingUp(false);

      if (prev) {
        setPreviousResult(prev);
        if (prev.user_image) setPreviousUserImage(prev.user_image);
        setShowPreviousPrompt(true);
        return; // Wait for user decision in modal
      }
    }
    
    // No previous result or no handle provided
    setStep(1);
  };

  // ─── Compute result ───────────────────────────────────────────────────────
  const finishAndCompute = async () => {
    setIsComputing(true);
    const cleanHandle = userHandle.trim().replace(/^@/, "");
    const supabase = createClient();
    
    // 1. Handle Image Storage (Transition from base64 to Storage URL)
    let finalImageUrl = usePreviousImage ? previousUserImage : userImage;

    // If new image uploaded and we have a handle, upload to bucket
    if (!usePreviousImage && userImage && cleanHandle) {
      const uploadedUrl = await uploadUserImage(supabase, cleanHandle, userImage);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    // Trigger bounty background process if a referrer was tracked
    if (referrerHandle && cleanHandle && referrerHandle.toLowerCase() !== cleanHandle.toLowerCase()) {
      rewardBounty(supabase, referrerHandle).catch(console.error);
    }

    const finalAnswers = { personality: userPersonality || questions[0].options[0].points };
    const result = calculateResult(universeSlug, finalAnswers, userJob);

    localStorage.setItem("puwf_result", JSON.stringify({
      ...result,
      userName: userName || "Mysterious Warrior",
      job: userJob || "Wanderer",
      handle: cleanHandle || undefined,
      favCharacter: userFavCharacter || "Unknown",
      userImage: finalImageUrl,
      triviaScore,
      triviaTotal: triviaQuestions.length,
      tier: result.tier,
    }));

    setTimeout(() => { router.push(`/${universeSlug}/puwf/result${cleanHandle ? `/${cleanHandle}` : ''}`); }, 2000);
  };

  // ─── Load previous result from Supabase ───────────────────────────────────
  const loadPreviousResult = () => {
    if (!previousResult) return;
    localStorage.setItem("puwf_result", JSON.stringify({
      universe: previousResult.universe,
      resultClass: previousResult.result_class,
      outcome: previousResult.outcome,
      rank: previousResult.rank,
      userName: previousResult.user_name,
      handle: previousResult.handle,
      triviaScore: previousResult.trivia_score,
      triviaTotal: previousResult.trivia_total,
      favCharacter: userFavCharacter,
      userImage: previousResult.user_image || "",
      tier: previousResult.tier,
    }));
    const cleanResultHandle = previousResult.handle?.replace(/^@/, "");
    router.push(`/${universeSlug}/puwf/result${cleanResultHandle ? `/${cleanResultHandle}` : ''}`);
  };

  // ─── Computing overlay ────────────────────────────────────────────────────
  if (isComputing) {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center min-h-[40vh]">
        <div className="w-16 h-16 border-4 border-light-ash/20 border-t-puwf-fire rounded-full animate-spin mb-6" />
        <h2 className="font-heading text-2xl font-semibold text-white tracking-widest uppercase animate-pulse">Calculating Matrix...</h2>
        <p className="text-light-ash/50 mt-2 font-mono">Securing Matrix Connection & Records</p>
      </div>
    );
  }

  // Progress bar: step 1 subdivides into trivia sub-progress
  const progressPercent = step < 1
    ? (step / (TOTAL_STEPS - 1)) * 100
    : step === 1
      ? ((1 + triviaIndex / triviaQuestions.length) / (TOTAL_STEPS - 1)) * 100
      : (step / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 pt-32 pb-20 flex flex-col items-center text-center">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-eclipse-black/50 rounded-full mb-10 overflow-hidden border border-light-ash/10">
        <div className={`h-full transition-all duration-500 ease-out ${activeColor}`} style={{ width: `${progressPercent}%` }} />
      </div>

      <AnimatePresence mode="wait">

        {/* ── STEP 0: Identity Matrix ─────────────────────────────────────── */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
            <p className={`font-mono text-xs tracking-[0.3em] uppercase mb-2 ${accent}`}>Step 1 of 3</p>
            <h2 className="font-heading text-3xl font-semibold text-white mb-3">Identity Matrix</h2>
            <p className="text-light-ash/60 mb-8 font-mono text-sm uppercase tracking-widest">Establish your base parameters</p>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="YOUR NAME"
              className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center mb-4"
            />
            
            <div className="relative w-full mb-4" ref={dropdownRef}>
              <div
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest hover:border-puwf-fire/50 transition-all text-center uppercase cursor-pointer flex justify-between items-center"
              >
                <span className={`flex-1 ${!userJob ? "text-light-ash/50" : ""}`}>{userJob || "SELECT YOUR PROFESSION"}</span>
                <span className={`text-light-ash/50 text-xs transition-transform duration-300 ${isJobDropdownOpen ? "rotate-180" : ""}`}>▼</span>
              </div>
              <AnimatePresence>
                {isJobDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full mt-2 bg-eclipse-black border border-light-ash/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl"
                  >
                    {["Student", "Employed / Professional", "Freelancer / Creative", "Athlete / Fitness", "Entrepreneur / Business", "Other"].map((job) => (
                      <div
                         key={job}
                        onClick={() => { setUserJob(job); setIsJobDropdownOpen(false); }}
                        className={`px-6 py-4 text-center font-heading tracking-widest text-sm uppercase cursor-pointer transition-all ${userJob === job ? activeColor : "text-light-ash/80 hover:bg-light-ash/10 hover:text-white"}`}
                      >{job}</div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* X / Telegram handle — used as persistent user ID */}
            <div className="relative w-full mb-2 mt-4">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-light-ash/30 font-heading text-lg select-none">@</span>
              <input
                type="text"
                value={userHandle}
                onChange={(e) => setUserHandle(e.target.value.replace(/^@+/, ""))}
                placeholder="Telegram / X username"
                className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl pl-10 pr-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center"
              />
            </div>
            
            <input
              type="text" 
              value={userFavCharacter} 
              onChange={(e) => setUserFavCharacter(e.target.value)} 
              placeholder="favorite character from this anime"
              className="w-full bg-eclipse-black/40 border border-light-ash/10 rounded-xl px-6 py-4 text-white font-heading tracking-widest focus:outline-none focus:border-puwf-fire/50 transition-all text-center mb-8 mt-2"
            />

            <button
              onClick={handleInitialContinue}
              disabled={isLookingUp || !userName.trim() || !userJob}
              className={`w-full py-4 rounded-xl font-semibold tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${
                isLookingUp
                  ? "bg-light-ash/5 text-light-ash/30 cursor-wait"
                  : (!userName.trim() || !userJob)
                  ? "bg-light-ash/5 text-light-ash/20 cursor-not-allowed"
                  : activeColor
              }`}
            >
              {isLookingUp ? (
                <><div className="w-5 h-5 border-2 border-light-ash/20 border-t-white rounded-full animate-spin" /> Retrieving Data...​</>
              ) : "Continue"}
            </button>
          </motion.div>
        )}

        {/* ── STEP 1: Knowledge Test (trivia) ─────────────────────────────── */}
        {step === 1 && (() => {
          const q = triviaQuestions[triviaIndex];
          return (
            <motion.div key={`trivia-${triviaIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-lg">
              <p className={`font-mono text-xs tracking-[0.3em] uppercase mb-2 ${accent}`}>Step 2 of 3 · Knowledge Test</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                Question {triviaIndex + 1} <span className="text-light-ash/30">/ {triviaQuestions.length}</span>
              </h2>
              <p className="text-light-ash/50 mb-8 font-mono text-xs uppercase tracking-widest">
                Universe Knowledge · Score: {triviaScore}/{triviaIndex + (triviaAnswered ? 1 : 0)}
              </p>

              <div className={`p-5 md:p-6 rounded-2xl border mb-6 text-left ${accentB} bg-eclipse-black/40`}>
                <p className="text-white font-heading text-lg md:text-xl leading-relaxed">{q.question}</p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {q.options.map((opt, idx) => {
                  let btnStyle = "border-light-ash/10 text-light-ash/80 hover:border-light-ash/40 hover:bg-eclipse-black/60";
                  if (triviaAnswered) {
                    if (idx === q.correct) btnStyle = "border-green-500 bg-green-500/10 text-green-400";
                    else if (idx === triviaSelected) btnStyle = "border-red-500 bg-red-500/10 text-red-400";
                    else btnStyle = "border-light-ash/5 text-light-ash/30 opacity-50";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTriviaAnswer(idx, q)}
                      disabled={triviaAnswered}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-medium text-base relative overflow-hidden ${btnStyle} ${!triviaAnswered ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <span className="font-mono text-xs mr-3 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              <AnimatePresence>
                {triviaAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }}
                    className={`rounded-xl px-5 py-4 mb-6 text-left text-sm leading-relaxed ${triviaSelected === q.correct ? "bg-green-500/10 border border-green-500/20 text-green-300" : "bg-red-500/10 border border-red-500/20 text-red-300"}`}
                  >
                    <span className="font-bold mr-2">{triviaSelected === q.correct ? "✓ Correct!" : "✗ Wrong!"}</span>
                    {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {triviaAnswered && (
                <button
                  onClick={handleNextTrivia}
                  className={`w-full py-4 rounded-xl font-semibold tracking-widest uppercase transition-all shadow-xl ${activeColor}`}
                >
                  {triviaIndex < triviaQuestions.length - 1 ? "Next Question →" : "View Results"}
                </button>
              )}
            </motion.div>
          );
        })()}

        {/* ── STEP 2: Provide Portrait ─────────────────────────────────────── */}
        {step === 2 && (
          <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
            <p className={`font-mono text-xs tracking-[0.3em] uppercase mb-2 ${accent}`}>Step 3 of 3</p>
            <h2 className="font-heading text-3xl font-semibold text-white mb-2">Provide Portrait</h2>

            {/* Trivia score recap */}
            <div className="mb-6 px-4 py-2 rounded-xl bg-eclipse-black/40 border border-light-ash/10 inline-block">
              <span className="font-mono text-xs text-light-ash/50 uppercase tracking-widest">Knowledge Score: </span>
              <span className={`font-heading font-bold text-lg ${accent}`}>{triviaScore}/{triviaQuestions.length}</span>
              <span className="font-mono text-xs text-light-ash/30 ml-2">
                {triviaScore === triviaQuestions.length ? "· Perfect! Rank Boosted 🔥" :
                 triviaScore >= 2 ? "· Good Knowledge" : "· Keep Learning"}
              </span>
            </div>

            <p className="text-light-ash/60 mb-6 font-mono text-sm uppercase tracking-widest">For your identification card</p>

            <div
              className={`w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden relative mb-4 transition-all duration-300 ${
                isImageProcessing ? "border-puwf-fire/60 bg-puwf-fire/5" :
                imageScanned      ? "border-green-500/60 bg-green-500/5" :
                                   "border-light-ash/20 hover:border-puwf-fire/50 cursor-pointer"
              }`}
              onClick={() => !isImageProcessing && fileInputRef.current?.click()}
            >
              {isImageProcessing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-eclipse-black/60 backdrop-blur-sm z-10"
                >
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

              {imageScanned && userImage && (
                <motion.div
                  initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute inset-0 bg-green-500/20 z-20 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {usePreviousImage && previousUserImage ? (
                <Image src={previousUserImage} alt="Previous Identity" fill style={{ objectFit: "cover" }} />
              ) : userImage ? (
                <Image src={userImage} alt="User Portrait" fill style={{ objectFit: "cover" }} />
              ) : !isImageProcessing ? (
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-10 h-10 text-light-ash/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-4m0 0V8m0 4H8m4 0h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-light-ash/40 font-heading tracking-widest uppercase text-sm text-center">
                    Tap to Upload Portrait<br /><span className="text-xs opacity-60">(Optional)</span>
                  </span>
                </div>
              ) : null}

              <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => { handleImageUpload(e); setUsePreviousImage(false); }} className="hidden" />
            </div>

            {/* Reuse toggle if previous image exists */}
            {previousUserImage && (
              <div className="flex flex-col gap-3 mb-6 w-full">
                <button
                  onClick={() => { setUsePreviousImage(!usePreviousImage); if (!usePreviousImage) setImageScanned(true); }}
                  className={`w-full py-3 rounded-xl border font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    usePreviousImage 
                      ? "border-puwf-fire bg-puwf-fire/10 text-puwf-fire" 
                      : "border-light-ash/10 text-light-ash/40 hover:border-light-ash/30"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {usePreviousImage ? "Using Previous Identity photo" : "Reuse Previous identity photo"}
                </button>
              </div>
            )}

            {(userImage || (usePreviousImage && previousUserImage)) && !isImageProcessing && (
              <motion.p
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-light-ash/40 text-xs font-mono tracking-widest uppercase mb-6 cursor-pointer hover:text-puwf-fire transition-colors"
                onClick={() => { fileInputRef.current?.click(); }}
              >↑ Tap to change portrait</motion.p>
            )}
            {!(userImage || (usePreviousImage && previousUserImage)) && <div className="mb-6" />}

            <button
              onClick={finishAndCompute}
              disabled={isImageProcessing}
              className={`w-full py-4 rounded-xl font-semibold tracking-widest uppercase transition-all shadow-xl ${isImageProcessing ? "bg-light-ash/5 text-light-ash/20 cursor-not-allowed" : activeColor}`}
            >
              {isImageProcessing ? "Processing..." : "Generate Poster"}
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Load Previous Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showPreviousPrompt && previousResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-eclipse-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm bg-eclipse-black border border-light-ash/10 rounded-2xl p-8 text-center shadow-2xl"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${activeColor}`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
              </div>

              <p className={`font-mono text-xs tracking-[0.3em] uppercase mb-2 ${accent}`}>
                Previous Session Found
              </p>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Welcome back, {previousResult.user_name}!
              </h3>
              <p className="text-light-ash/50 text-sm font-mono mb-2">
                @{previousResult.handle} · {previousResult.universe}
              </p>
              <div className={`inline-block px-4 py-1.5 rounded-lg text-sm font-mono mb-6 border ${accentB} ${accent} bg-eclipse-black/40`}>
                {previousResult.outcome}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={loadPreviousResult}
                  className={`w-full py-3.5 rounded-xl font-bold tracking-widest uppercase text-sm transition-all shadow-lg ${activeColor}`}
                >
                  ↩ Load Previous Poster
                </button>
                <button
                  onClick={() => { setShowPreviousPrompt(false); setPreviousResult(null); setStep(1); }}
                  className="w-full py-3.5 rounded-xl font-bold tracking-widest uppercase text-sm border border-light-ash/10 text-light-ash/60 hover:border-light-ash/30 hover:text-white transition-all"
                >
                  Start Fresh Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
