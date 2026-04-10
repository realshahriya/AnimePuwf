"use client";

import { UNIVERSES } from "@/lib/data";
import { QUIZ_DATA } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import AdBanner from "@/components/AdBanner";
import React from "react";

export default function PuwfSharedPage({ params }: { params: Promise<{ universe: string, handle: string }> }) {
  const { universe: universeSlug, handle } = React.use(params);
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  
  if (!universe) return notFound();

  // If the path parameter matches our specific static pages, we shouldn't render the quiz.
  // NextJS should naturally handle priority (result/page.tsx beats [handle]/page.tsx)
  // but if needed we reject "result" here:
  if (handle === "result") return notFound();

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
        initialReferrer={handle}
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
