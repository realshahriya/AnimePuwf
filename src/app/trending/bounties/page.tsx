import { fetchUniverseLeaderboard, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";

export default async function TrendingBountiesPage() {
  const supabase = await createClient();
  const data = await fetchUniverseLeaderboard(supabase, "one-piece", 50);

  // Sort by bounty value (highest first)
  const trending = [...data].sort((a, b) => {
    const valA = parseInt(a.rank?.replace(/[^0-9]/g, "") ?? "0");
    const valB = parseInt(b.rank?.replace(/[^0-9]/g, "") ?? "0");
    return valB - valA;
  }).slice(0, 10);

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-16">
        <span className="font-mono text-yellow-500 text-xs tracking-widest uppercase mb-3 block">Pirate Database</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
          Most Wanted Today
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase tracking-widest font-mono">
          Highest bounties issued in the last 24 hours
        </p>
      </div>

      {trending.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-eclipse-black/20">
          <p className="text-light-ash/30 font-mono text-sm uppercase tracking-widest">No active bounties reported...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.map((item, idx) => (
            <div
              key={item.id}
              className="group relative bg-eclipse-black/40 border border-light-ash/5 rounded-xl p-6 hover:border-yellow-500/30 transition-all overflow-hidden flex items-center gap-6"
            >
              <div className="text-3xl font-heading font-black text-white/10 group-hover:text-yellow-500/20 transition-colors">
                {idx + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg font-semibold text-white truncate group-hover:text-yellow-500 transition-colors">
                  {item.user_name}
                </h3>
                <p className="text-[10px] font-mono text-light-ash/40 uppercase tracking-widest">{item.outcome}</p>
              </div>

              <div className="text-right">
                <p className="text-yellow-500 font-heading font-semibold text-xl tracking-tighter">{item.rank}</p>
                <p className="text-[8px] text-light-ash/30 font-mono uppercase tracking-[0.3em] font-bold">New Issued</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}