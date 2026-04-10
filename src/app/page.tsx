import React from "react";
import Hero from "@/components/Hero";
import UniverseCard from "@/components/UniverseCard";
import Marquee from "@/components/Marquee";
import ComingSoonCard from "@/components/ComingSoonCard";
import { UNIVERSES } from "@/lib/data";

export default function Home() {
  return (
    <div className="w-full flex-grow flex flex-col items-center pb-24">
      <Hero />
      
      {/* Full width marquee hook */}
      <div className="w-full mb-10">
        <Marquee />
      </div>

      {/* Google Ads will go here */}

      <section className="w-full max-w-7xl px-6 relative z-10 flex flex-col items-center mt-12">
        <div className="text-center mb-16 relative w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-puwf-fire/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <span className="font-mono text-puwf-fire text-xs tracking-[0.3em] uppercase">Matrix Selection</span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mt-2 mb-4 tracking-tighter drop-shadow-2xl uppercase">
            Reality Anchors
          </h2>
          <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase font-mono tracking-widest leading-relaxed">
            Choose a universe to begin your forging process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {UNIVERSES.map((universe, idx) => (
            <UniverseCard 
              key={universe.slug}
              {...universe}
              delay={0.1 * (idx + 1)}
            />
          ))}
          <ComingSoonCard delay={0.6} />
        </div>
      </section>
    </div>
  );
}
