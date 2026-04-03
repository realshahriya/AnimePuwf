import React from "react";
import { UNIVERSES, CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import UniverseCard from "@/components/UniverseCard";
import ComingSoonCard from "@/components/ComingSoonCard";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Validate category
  const activeCategory = CATEGORIES.find(c => c.slug === category);
  if (!activeCategory) return notFound();

  // Filter universes
  const filteredUniverses = category === "all" 
    ? UNIVERSES 
    : UNIVERSES.filter(u => u.categorySlugs.includes(category));

  return (
    <section className="w-full flex flex-col items-center pb-24">
      <h1 className="font-heading text-4xl font-bold mb-10 text-forge-fire">Select Your Realm</h1>
      
      {filteredUniverses.length === 0 ? (
         <div className="text-light-ash/50 text-xl py-20 flex flex-col items-center">
            <span className="text-4xl mb-4">🌀</span>
            <p>No realms found in this dimension yet...</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredUniverses.map((universe, idx) => (
            <UniverseCard 
              key={universe.slug}
              {...universe}
              delay={0.1 * (idx + 1)}
            />
          ))}
          <ComingSoonCard delay={(filteredUniverses.length * 0.1) + 0.1} />
        </div>
      )}
    </section>
  );
}
