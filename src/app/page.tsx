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

      <section className="w-full max-w-7xl px-6 relative z-10 flex flex-col items-center">
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
