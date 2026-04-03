import React from "react";
import Hero from "@/components/Hero";
import UniverseCard from "@/components/UniverseCard";
import AdBanner from "@/components/AdBanner";
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

      {/* Global Leaderboard Ad below Hero/Marquee */}
      <div className="w-full max-w-7xl px-6 mb-12 flex justify-center">
        <AdBanner type="leaderboard" />
      </div>
      
      <section className="w-full max-w-7xl px-6 relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {UNIVERSES.map((universe, idx) => {
            // Inject a Square Ad natively into the grid
            if (idx === 3) {
              return (
                <React.Fragment key="ad-fragment">
                  <div className="flex border border-dashed border-light-ash/10 rounded-2xl p-1">
                    <AdBanner type="square" className="h-full rounded-xl" />
                  </div>
                  <UniverseCard 
                    {...universe}
                    delay={0.1 * (idx + 1)}
                  />
                </React.Fragment>
              );
            }
            
            return (
              <UniverseCard 
                key={universe.slug}
                {...universe}
                delay={0.1 * (idx + 1)}
              />
            )
          })}
          <ComingSoonCard delay={0.6} />
        </div>
      </section>
      
      {/* Mobile Sticky Ad Example Container */}
      <div className="block md:hidden w-full px-4 mt-8 flex justify-center">
        <AdBanner type="mobile" />
      </div>
    </div>
  );
}
