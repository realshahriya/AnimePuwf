import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Universes", href: "/universes" },
    { label: "Trending", href: "/trending", hasPing: true },
    { label: "Leaderboards", href: "/leaderboard" }
  ];

  return (
    <nav className="w-[95%] max-w-6xl mx-auto fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex items-center justify-between border border-light-ash/10 bg-eclipse-black/80 backdrop-blur-lg rounded-2xl shadow-2xl">
      <Link href="/" className="flex items-center group z-10 mr-4">
        <Image 
          src="/anime_puwf_emblem_bgless.svg" 
          alt="Anime Puwf Logo" 
          width={150}
          height={60}
          priority
          draggable={false}
          className="h-14 w-auto group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.4)] transition-all select-none pointer-events-none"
        />
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
