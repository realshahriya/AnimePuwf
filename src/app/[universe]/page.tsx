"use client";

import { UNIVERSES } from "@/lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function UniversePage({ params }: { params: Promise<{ universe: string }> }) {
  const router = useRouter();
  const [alias, setAlias] = useState("");
  
  const { universe: universeSlug } = React.use(params);
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  
  const colorMap: Record<string, string> = {
    blue: "focus:border-blue-500 bg-blue-500 hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-eclipse-black",
    orange: "focus:border-orange-500 bg-orange-500 hover:bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] text-eclipse-black",
    yellow: "focus:border-yellow-500 bg-yellow-500 hover:bg-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] text-eclipse-black",
    purple: "focus:border-purple-500 bg-purple-500 hover:bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white",
    red: "focus:border-red-500 bg-red-500 hover:bg-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-white"
  };

  const cStyle = universe ? colorMap[universe.colorScheme] : colorMap.blue;

  const handleCommence = () => {
    if (!alias.trim()) return;
    router.push(`/${universeSlug}/puwf`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
      <p className="text-light-ash/80 text-xl max-w-2xl mb-12 leading-relaxed mt-4">
        Step into the puwf. Answer the following personality metrics truthfully to align your matrix and uncover your destined ability.
      </p>
      
      <div className="w-full max-w-md bg-eclipse-black/40 border border-light-ash/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-light-ash/70 text-left uppercase tracking-widest font-mono">Enter Identifier</label>
          <input 
            type="text" 
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Your Alias..." 
            className="w-full bg-eclipse-black/80 border border-light-ash/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-light-ash/50 transition-colors placeholder:text-light-ash/20 font-mono"
            onKeyDown={(e) => e.key === 'Enter' && handleCommence()}
          />
          <button 
            onClick={handleCommence}
            disabled={!alias.trim()}
            className={`mt-4 px-6 py-4 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 font-heading disabled:opacity-50 disabled:cursor-not-allowed ${cStyle}`}
          >
            Commence Puwf
          </button>
        </div>
      </div>
    </div>
  );
}