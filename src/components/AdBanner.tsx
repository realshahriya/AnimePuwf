import { Info } from "lucide-react";

interface AdBannerProps {
  type?: "leaderboard" | "square" | "mobile";
  className?: string;
}

export default function AdBanner({ type = "leaderboard", className = "" }: AdBannerProps) {
  // Determine dimensions based on type
  const isLeaderboard = type === "leaderboard";
  const isMobile = type === "mobile";
  const isSquare = type === "square";

  let styles = "w-full max-w-[728px] h-[90px]"; // default leaderboard
  if (isMobile) styles = "w-full max-w-[320px] h-[50px] mx-auto";
  if (isSquare) styles = "w-full aspect-square md:aspect-auto md:min-h-[250px]";

  return (
    <div className={`relative flex flex-col items-center justify-center bg-eclipse-black border border-light-ash/10 rounded-lg overflow-hidden group ${styles} ${className}`}>
      {/* Ad Label */}
      <div className="absolute top-0 right-0 bg-light-ash/10 px-2 py-0.5 rounded-bl-lg flex items-center gap-1 z-10 transition-colors group-hover:bg-light-ash/20">
        <span className="text-[10px] text-light-ash/50 uppercase tracking-widest font-semibold">Advertisement</span>
        <Info className="w-3 h-3 text-light-ash/40" />
      </div>
      
      {/* Subtle Visual Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-puwf-fire/5 to-transparent opacity-50"></div>
      
      <div className="z-10 text-center px-4">
        <span className="text-light-ash/30 font-medium text-sm">Ad Placeholder</span>
        {isLeaderboard && <p className="text-light-ash/20 text-xs mt-1 font-mono">728 x 90</p>}
        {isSquare && <p className="text-light-ash/20 text-xs mt-1 font-mono">Square format</p>}
      </div>
    </div>
  );
}
