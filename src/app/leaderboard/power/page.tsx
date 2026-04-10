import { fetchUniverseLeaderboard, type PuwfResultRow } from "@/lib/supabase";
import { createClient } from "@/lib/server";

export default async function LeaderboardPowerPage() {
  const supabase = await createClient();
  const data = await fetchUniverseLeaderboard(supabase, "dragon-ball-z", 50);

  const processed = data.map(row => {
    // Extract number from string like "Power Level: 9001"
    const value = parseInt(row.rank?.replace(/[^0-9]/g, "") ?? "0");
    return { ...row, powerValue: value };
  }).sort((a, b) => b.powerValue - a.powerValue);

  const rows = processed;

  return (
    <main className="w-full flex-grow text-light-ash">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
        <span className="font-mono text-blue-400 text-xs tracking-[0.4em] uppercase">Scouter Matrix V2.0</span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4 tracking-tight drop-shadow-2xl italic uppercase">
          Power Rankings
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm uppercase font-mono tracking-widest leading-relaxed">
          Measuring life energy signatures across the universe
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-blue-500/10 rounded-3xl bg-blue-500/5">
          <p className="text-light-ash/30 font-mono text-sm uppercase tracking-widest">No power signatures detected...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((row, i) => (
            <div
              key={row.id ?? i}
              className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-8 py-6 rounded-2xl bg-eclipse-black/40 border-l-4 border border-white/5 border-l-blue-500 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-heading font-black text-blue-500 italic w-8 underline underline-offset-8">
                  #{i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading font-extrabold text-white text-xl tracking-tight uppercase truncate">{row.user_name}</h3>
                  <div className="flex gap-2 items-center">
                   <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest font-bold">{row.result_class}</span>
                   <span className="w-1 h-1 bg-white/10 rounded-full" />
                   <p className="text-light-ash/40 text-[10px] font-mono uppercase tracking-widest truncate">{row.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="md:ml-auto flex items-end gap-2 text-right">
                <div className="flex flex-col">
                  <span className="text-[9px] text-blue-400 font-mono uppercase tracking-[0.3em] font-bold">Detected Level</span>
                  <p className="text-white font-heading font-black text-2xl tracking-tighter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    {row.powerValue.toLocaleString()}
                  </p>
                </div>
                {/* Visual bar using CSS variables/inline styles since we're on server */}
                <div className="w-1.5 h-10 bg-blue-500/20 rounded-full overflow-hidden self-center relative">
                   <div 
                    className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000"
                    style={{ height: `${(row.powerValue / rows[0].powerValue) * 100}%` }}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}