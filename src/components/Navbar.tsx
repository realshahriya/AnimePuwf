import { Flame } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Universes", href: "/universes" },
    { label: "Trending", href: "/trending", hasPing: true },
    { label: "Leaderboards", href: "/leaderboard" }
  ];

  return (
    <nav className="w-full relative z-50 px-6 py-4 flex items-center justify-between border-b border-light-ash/10 bg-eclipse-black/80 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 group z-10">
        <div className="p-2 bg-puwf-fire rounded-lg group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)] transition-all">
          <Flame className="w-5 h-5 text-eclipse-black" />
        </div>
        <span className="font-heading font-bold text-xl tracking-wide text-light-ash hidden sm:block">
          AnimePuwf
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link, idx) => (
          <Link key={idx} href={link.href} className="text-sm font-medium text-light-ash/80 hover:text-puwf-fire transition-colors flex items-center gap-1.5 focus:outline-none">
            {link.label}
            {link.hasPing && (
              <span className="flex h-2 w-2 relative mt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-battle-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-battle-red"></span>
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 z-10">
        {/* Placeholder padding for symmetric flex layout against the logo */}
        <div className="w-8 h-8 rounded-full border border-light-ash/10 bg-light-ash/5 md:hidden"></div>
      </div>
    </nav>
  );
}
