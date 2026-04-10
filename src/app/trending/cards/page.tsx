import { fetchGlobalLeaderboard, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";
import { UNIVERSES } from "@/lib/data";
import Link from "next/link";

interface UniverseTrend {
  slug: string;
  name: string;
  count: number;
  latestOutcome: string;
}

const UNIVERSE_COLORS: Record<string, string> = {
  "one-piece":      "from-yellow-500/20 to-transparent border-yellow-500/30 text-yellow-500",
  "naruto":         "from-orange-500/20 to-transparent border-orange-500/30 text-orange-500",
  "dragon-ball-z":  "from-blue-500/20 to-transparent border-blue-500/30 text-blue-500",
  "jujutsu-kaisen": "from-purple-500/20 to-transparent border-purple-500/30 text-purple-500",
  "demon-slayer":   "from-red-500/20 to-transparent border-red-500/30 text-red-500",
};

export default async function TrendingCardsPage() {
  const supabase = await createClient();
  const data = await fetchGlobalLeaderboard(supabase, 100);

  const counts: Record<string, { count: number; latest: string }> = {};
  data.forEach(row => {
    if (!counts[row.universe]) {
      counts[row.universe] = { count: 0, latest: row.outcome };
    }
    counts[row.universe].count++;
  });

  const trends = UNIVERSES.map(u => ({
    slug: u.slug,
    name: u.name,
    count: counts[u.slug]?.count ?? 0,
    latestOutcome: counts[u.slug]?.latest ?? "No activity yet"
  })).sort((a, b) => b.count - a.count);

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-puwf-fire/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-16">
        <span className="font-mono text-puwf-fire text-xs tracking-widest uppercase mb-3 block">Forge Activity</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
          Popular Universes
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase tracking-widest font-mono">
          Most active reality anchors by total fragments forged
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trends.map((trend, idx) => (
          <div key={trend.slug}>
            <Link 
              href={`/${trend.slug}/puwf`}
              className={`group block relative bg-gradient-to-br ${UNIVERSE_COLORS[trend.slug] || "from-white/5 to-transparent border-white/10"} border rounded-3xl p-8 hover:scale-[1.02] transition-all duration-500 overflow-hidden shadow-2xl`}
            >
              <div className="absolute top-0 right-0 p-6 text-white/5 font-heading text-6xl font-black italic select-none">
                #{idx + 1}
              </div>

              <h3 className="font-heading text-2xl font-semibold text-white mb-2">{trend.name}</h3>
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-light-ash/40 uppercase tracking-widest">Live Activity</span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-light-ash/40 uppercase tracking-widest">Forged Fragments</span>
                    <span className="text-white font-heading font-semibold">{trend.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                    <div 
                      className={`absolute left-0 h-full ${trend.slug === 'naruto' ? 'bg-orange-500' : 'bg-puwf-fire'}`}
                      style={{ width: `${(trend.count / (trends[0].count || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-light-ash/40 uppercase tracking-widest block mb-1">Latest Extraction</span>
                  <p className="text-white/80 font-mono text-xs truncate max-w-[200px] italic">
                    "{trend.latestOutcome}"
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-puwf-fire font-semibold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">Enter Reality →</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}