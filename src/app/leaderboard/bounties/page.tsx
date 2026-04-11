import { fetchUniverseLeaderboard, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";

export default async function LeaderboardBountiesPage() {
  const supabase = await createClient();
  const data = await fetchUniverseLeaderboard(supabase, "one-piece", 5000);

  const processed = data.map(row => {
    // Extract number from string like "300,000,000 Berries"
    const value = parseInt(row.rank?.replace(/[^0-9]/g, "") ?? "0");
    return { ...row, bountyValue: value };
  }).sort((a, b) => b.bountyValue - a.bountyValue).slice(0, 50);

  const rows = processed;

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-16">
        <span className="font-mono text-yellow-500 text-xs tracking-[0.3em] uppercase">Grand Line Rankings</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4 tracking-tighter drop-shadow-2xl uppercase italic">
          Wanted List
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase font-mono tracking-widest leading-relaxed">
          The most dangerous pirates across the seas
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
          <p className="text-light-ash/30 font-mono text-sm uppercase tracking-widest">No pirates spotted yet...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {rows.map((row, i) => (
            <div
              key={row.id ?? i}
              className="flex items-center gap-6 px-6 py-5 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-transparent border border-white/5 hover:border-yellow-500/20 transition-all group"
            >
              <div className="w-12 text-center text-2xl font-heading font-black text-white/20 group-hover:text-yellow-500/40 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-heading font-bold text-white text-lg tracking-wide uppercase">{row.user_name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-bold tracking-widest">
                    {row.result_class.toUpperCase()}
                  </span>
                </div>
                <p className="text-light-ash/40 text-xs font-mono uppercase tracking-widest truncate">{row.outcome}</p>
              </div>

              <div className="text-right">
                <p className="text-yellow-500 font-heading font-black text-xl tracking-tighter">{row.rank}</p>
                <p className="text-[10px] text-light-ash/30 font-mono uppercase tracking-[0.2em]">Active Bounty</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}