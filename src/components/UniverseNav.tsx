"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UniverseNav({ universeSlug, colorScheme }: { universeSlug: string, colorScheme: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Gateway", path: "" },
    { name: "Abilities", path: "/abilities" },
    { name: "Leaderboard", path: "/leaderboard" }
  ];

  const colorMap: Record<string, string> = {
    blue: "text-blue-400 border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    orange: "text-orange-400 border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    yellow: "text-yellow-400 border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
    purple: "text-purple-400 border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    red: "text-red-400 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
  };

  const activeColor = colorMap[colorScheme] || colorMap.blue;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mt-6 md:mt-8 flex justify-center">
      <nav className="flex space-x-1 bg-eclipse-black/40 backdrop-blur-xl rounded-2xl p-1.5 border border-light-ash/10 shadow-lg overflow-x-auto">
        {navItems.map((item) => {
          const fullPath = `/${universeSlug}${item.path}`;
          const isActive = pathname === fullPath;
          
          return (
            <Link 
              key={item.name} 
              href={fullPath}
              className={`px-5 md:px-8 py-2 md:py-2.5 text-sm rounded-xl font-heading font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${isActive ? activeColor + " border" : "text-light-ash/50 hover:text-white hover:bg-white/5 border border-transparent"}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
