import { fetchGlobalLeaderboard, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";
import { UNIVERSES } from "@/lib/data";

const UNIVERSE_COLORS: Record<string, string> = {
  "one-piece":      "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  "naruto":         "text-orange-400 border-orange-400/30 bg-orange-400/10",
  "dragon-ball-z":  "text-blue-400  border-blue-400/30  bg-blue-400/10",
  "jujutsu-kaisen": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "demon-slayer":   "text-red-400   border-red-400/30   bg-red-400/10",
};

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

export default async function LeaderboardGlobalPage() {
  const supabase = await createClient();
  const rows = await fetchGlobalLeaderboard(supabase, 50);

  const universeName = (slug: string) =>
    UNIVERSES.find(u => u.slug === slug)?.name ?? slug;

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-puwf-fire/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-12">
        <span className="font-mono text-puwf-fire text-xs tracking-[0.3em] uppercase">Live Rankings</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mt-2 mb-3 tracking-tight">Global Leaderboard</h1>
        <p className="text-light-ash/40 text-sm max-w-lg mx-auto leading-relaxed">The elite artifacts forged across all reality anchors in the Anime matrix.</p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-24 text-light-ash/40 font-mono text-sm uppercase tracking-widest border border-dashed border-white/5 rounded-3xl">
          No entries yet — be the first to forge an artifact!
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {rows.map((row, i) => {
            const colorClass = UNIVERSE_COLORS[row.universe] ?? "text-light-ash border-light-ash/20 bg-light-ash/5";
            return (
              <div
                key={row.id ?? i}
                className="flex items-center gap-4 px-5 py-4 rounded-xl bg-eclipse-black/40 border border-light-ash/5 hover:border-light-ash/10 transition-all"
              >
                {/* Rank number */}
                <span className="w-8 text-center font-heading font-bold text-lg text-light-ash/30">
                  {RANK_MEDALS[i] ?? <span className="text-sm">#{i + 1}</span>}
                </span>

                {/* Universe badge */}
                <span className={`hidden sm:inline-flex px-2 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border ${colorClass} whitespace-nowrap`}>
                  {universeName(row.universe)}
                </span>

                {/* Name + outcome */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-white text-sm truncate">{row.user_name}</p>
                  <p className="text-light-ash/50 text-xs font-mono truncate">{row.outcome}</p>
                </div>

                {/* Rank */}
                <span className="text-puwf-fire font-mono text-xs text-right whitespace-nowrap">{row.rank}</span>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}