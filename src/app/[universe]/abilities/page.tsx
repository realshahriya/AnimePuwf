import { UNIVERSES } from "@/lib/data";

export default async function AbilitiesPage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = await params;
  const universe = UNIVERSES.find(u => u.slug === universeSlug);

  return (
    <main className="w-full max-w-5xl mx-auto px-6 text-light-ash flex flex-col">
      <h2 className="font-heading text-3xl font-bold text-white mb-6">Unlockable Abilities</h2>
      <div className="w-full border border-dashed border-light-ash/20 rounded-2xl p-24 flex items-center justify-center bg-eclipse-black/40 backdrop-blur-md">
        <p className="font-mono text-light-ash/50 tracking-widest uppercase text-sm">Ability Database Syncing...</p>
      </div>
    </main>
  );
}
