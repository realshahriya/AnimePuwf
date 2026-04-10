"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Universes", href: "/universes" },
    { label: "Trending", href: "/trending", hasPing: true },
    { label: "Leaderboards", href: "/leaderboard" }
  ];

  return (
    <>
      <nav className="w-[95%] max-w-6xl mx-auto fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-3 flex items-center justify-between border border-light-ash/10 bg-eclipse-black/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <Link href="/" className="flex items-center group z-10 mr-4">
          <Image
            src="/anime_puwf_emblem_bgless.svg"
            alt="Anime Puwf Logo"
            width={150}
            height={60}
            priority
            loading="eager"
            draggable={false}
            className="h-10 md:h-14 w-auto group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.4)] transition-all select-none pointer-events-none"
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden z-10 w-9 h-9 flex items-center justify-center rounded-xl border border-light-ash/10 bg-light-ash/5 text-light-ash/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40 bg-eclipse-black/95 backdrop-blur-xl border border-light-ash/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-light-ash/80 hover:text-puwf-fire hover:bg-white/5 transition-all border-b border-light-ash/5 last:border-0 font-heading font-semibold tracking-widest uppercase text-sm"
              >
                <span>{link.label}</span>
                {link.hasPing && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-battle-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-battle-red"></span>
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
