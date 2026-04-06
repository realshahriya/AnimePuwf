import { UNIVERSES } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import UniverseNav from "@/components/UniverseNav";
import AdBanner from "@/components/AdBanner";

export default async function UniverseLayout({ children, params }: { children: React.ReactNode, params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = await params;
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  
  if (!universe) return notFound();

  const colorMap: Record<string, string> = {
    blue: "border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    orange: "border-orange-500/30 text-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    yellow: "border-yellow-500/30 text-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.3)]",
    purple: "border-purple-500/30 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    red: "border-red-500/30 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
  };

  const styleData = colorMap[universe.colorScheme];

  return (
    <div className="relative w-full flex-grow flex flex-col">
      {/* Dynamic Universe Hero Header */}
      <div className="relative w-full h-[350px] border-b border-light-ash/10 flex flex-col justify-end pb-12 overflow-hidden">
        <Image
          src={universe.headerUrl}
          alt={universe.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 mix-blend-lighten z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black via-eclipse-black/80 to-transparent z-0" />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border bg-eclipse-black backdrop-blur-md ${styleData}`}>
              <span className="font-heading font-bold text-5xl">
                {universe.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
                {universe.name}
              </h1>
              <div className="flex gap-2">
                {universe.categorySlugs.map(slug => (
                  <span key={slug} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-light-ash/80 uppercase tracking-widest">
                    {slug}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Sub-Navigation */}
      <UniverseNav universeSlug={universe.slug} colorScheme={universe.colorScheme} />

      {/* Ad — leaderboard below nav, desktop */}
      <div className="hidden md:flex w-full justify-center px-6 pt-6">
        <AdBanner type="leaderboard" />
      </div>

      {/* Dynamic Page Content */}
      <main className="w-full flex-grow flex flex-col py-8">
        {children}
      </main>

      {/* Ad — mobile sticky bottom */}
      <div className="flex md:hidden w-full justify-center px-4 pb-6">
        <AdBanner type="mobile" />
      </div>
    </div>
  );
}