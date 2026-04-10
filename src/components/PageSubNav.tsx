"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SubNavLink {
  label: string;
  href: string;
}

interface PageSubNavProps {
  links: SubNavLink[];
  justify?: "start" | "center" | "end";
}

export default function PageSubNav({ links, justify = "center" }: PageSubNavProps) {
  const pathname = usePathname();

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <nav className={`w-full flex ${justifyClasses[justify]} mt-10 mb-14 px-4 overflow-x-auto no-scrollbar`}>
      <div className="flex bg-white/5 backdrop-blur-md border border-white/5 p-1.5 rounded-2xl md:rounded-3xl gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-heading font-semibold uppercase tracking-wider transition-colors z-10 whitespace-nowrap ${
                isActive ? "text-white" : "text-light-ash/40 hover:text-light-ash/70"
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 bg-puwf-fire/10 border border-puwf-fire/20 rounded-xl md:rounded-2xl -z-10 shadow-[0_0_20px_rgba(255,107,0,0.1)]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
