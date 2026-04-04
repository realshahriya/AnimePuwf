"use client";

import { UNIVERSES } from "@/lib/data";
import { useRouter } from "next/navigation";
import React from "react";

export default function UniversePage({ params }: { params: Promise<{ universe: string }> }) {
  const router = useRouter();
  
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

  const handleGetPoster = () => {
    router.push(`/${universeSlug}/puwf`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
      <button 
        onClick={handleGetPoster}
        className={`mt-4 px-6 py-4 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 font-heading ${cStyle}`}
      >
        Get Your Poster
      </button>
    </div>
  );
}