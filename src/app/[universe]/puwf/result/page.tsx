"use client";

import { useEffect, useState } from "react";
import { UNIVERSES } from "@/lib/data";
import { use } from "react";
import CardGenerator from "@/components/CardGenerator";
import AdBanner from "@/components/AdBanner";
import type { CardResult } from "@/lib/cards";
import { motion } from "framer-motion";

type ResultState = CardResult;

export default function PuwfResultPage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = use(params);
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  const [result, setResult] = useState<ResultState | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("puwf_result");
    if (savedResult) {
      const parsed = JSON.parse(savedResult);
      if (parsed) {
        setTimeout(() => setResult(parsed), 0);
      }
    }
  }, []);  

  if (!result) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-light-ash/20 border-t-puwf-fire rounded-full animate-spin mb-6"></div>
        <p className="text-light-ash/50 font-mono tracking-widest uppercase animate-pulse">Syncing matrix...</p>
      </div>
    );
  }

  return (
    <main className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-12 text-light-ash flex flex-col items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-12"
      >
        <span className="font-mono text-puwf-fire text-sm tracking-[0.3em] uppercase mb-4 block">Process Complete</span>
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl">
          Artifact Forged
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm leading-relaxed">
          Your unique identity within the {universe?.name} universe has been extracted and encoded into this digital relic.
        </p>
      </motion.div>

      <CardGenerator result={result} universeSlug={universeSlug} />

      {/* Ad — square below card, desktop */}
      <div className="hidden md:flex w-full justify-center mt-10">
        <AdBanner type="leaderboard" />
      </div>
      {/* Ad — mobile below card */}
      <div className="flex md:hidden w-full justify-center mt-6">
        <AdBanner type="mobile" />
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-20 opacity-70 md:opacity-50 hover:opacity-100 transition-opacity">
        <div className="p-5 md:p-8 rounded-2xl bg-eclipse-black/40 border border-light-ash/5 backdrop-blur-md">
          <h3 className="font-heading text-xl font-bold text-white mb-4">Metadata Analysis</h3>
          <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Class</span>
              <span className="text-puwf-fire">{result.resultClass}</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Signature</span>
              <span className="text-white">{result.outcome}</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Authority</span>
              <span className="text-white">{result.rank}</span>
            </li>
          </ul>
        </div>

        <div className="p-5 md:p-8 rounded-2xl bg-eclipse-black/40 border border-light-ash/5 backdrop-blur-md flex flex-col justify-center">
          <h3 className="font-heading text-xl font-bold text-white mb-4">Sharing Protocol</h3>
          <p className="text-light-ash/60 text-sm mb-6 leading-relaxed">
            These artifacts are meant to be displayed. Share your result to challenge others or display your dominance.
          </p>
          <div className="flex gap-4">
            <button className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold tracking-widest uppercase transition-all">
              Twitter / X
            </button>
            <button className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold tracking-widest uppercase transition-all">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
