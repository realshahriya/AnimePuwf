import { fetchTrendingAbilities, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";
import { UNIVERSES } from "@/lib/data";

interface AggregatedAbility {
  outcome: string;
  universe: string;
  count: number;
}

const UNIVERSE_COLORS: Record<string, string> = {
  "one-piece":      "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  "naruto":         "text-orange-400 border-orange-400/20 bg-orange-400/5",
  "dragon-ball-z":  "text-blue-400  border-blue-400/20  bg-blue-400/5",
  "jujutsu-kaisen": "text-purple-400 border-purple-400/20 bg-purple-400/5",
  "demon-slayer":   "text-red-400   border-red-400/20   bg-red-400/5",
};

export default async function TrendingAbilitiesPage() {
  const supabase = await createClient();
  const data = await fetchTrendingAbilities(supabase, 100);

  const counts: Record<string, { universe: string; count: number }> = {};
  data.forEach(row => {
    if (!counts[row.outcome]) {
      counts[row.outcome] = { universe: row.universe, count: 0 };
    }
    counts[row.outcome].count++;
  });

  const trending = Object.entries(counts)
    .map(([outcome, meta]) => ({
      outcome,
      universe: meta.universe,
      count: meta.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  const universeName = (slug: string) =>
    UNIVERSES.find(u => u.slug === slug)?.name ?? slug;

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-puwf-fire/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-16">
        <span className="font-mono text-puwf-fire text-xs tracking-widest uppercase mb-3 block">Real-time Matrix</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
          Trending Abilities
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase tracking-widest font-mono">
          The most forged outcomes in the last 24 hours
        </p>
      </div>

      {trending.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-light-ash/10 rounded-3xl bg-eclipse-black/20">
          <p className="text-light-ash/30 font-mono text-sm uppercase tracking-widest">Collecting initial data points...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((item, idx) => {
            const colorClass = UNIVERSE_COLORS[item.universe] || "border-light-ash/20 text-light-ash/60";
            return (
              <div
                key={item.outcome}
                className="group relative bg-eclipse-black/40 border border-light-ash/5 rounded-2xl p-6 hover:border-puwf-fire/30 transition-all duration-500 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase border ${colorClass}`}>
                    {universeName(item.universe)}
                  </span>
                  <span className="text-puwf-fire/40 font-mono text-xs font-bold">#{idx + 1}</span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-puwf-fire transition-colors h-14 line-clamp-2">
                  {item.outcome}
                </h3>
                
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 h-full bg-puwf-fire/50"
                      style={{ width: `${(item.count / trending[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-light-ash/40 whitespace-nowrap uppercase tracking-tighter">
                    {item.count} Fragments
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}