"use client";

import { UNIVERSES } from "@/lib/data";
import { QUIZ_DATA } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import AdBanner from "@/components/AdBanner";
import React from "react";

export default function PuwfEnginePage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = React.use(params);
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  
  if (!universe) return notFound();

  const questions = QUIZ_DATA[universeSlug] || [];

  if (questions.length === 0) {
    return (
      <div className="w-full flex-grow flex items-center justify-center text-center px-6">
        <p className="text-light-ash/50 font-mono tracking-widest uppercase">
          Quiz matrix for this universe is currently down.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <QuizEngine 
        universeSlug={universeSlug} 
        questions={questions} 
        colorScheme={universe.colorScheme} 
      />

      {/* Leaderboard ad — desktop, below quiz */}
      <div className="hidden md:flex w-full justify-center px-6 pb-10">
        <AdBanner type="leaderboard" />
      </div>

      {/* Mobile ad — below quiz */}
      <div className="flex md:hidden w-full justify-center px-4 pb-8">
        <AdBanner type="mobile" />
      </div>
    </div>
  );
}
