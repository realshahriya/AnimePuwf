"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface UniverseCardProps {
  name: string;
  slug: string;
  colorScheme: "blue" | "orange" | "yellow" | "purple" | "red";
  description: string;
  delay?: number;
  bgUrl?: string; // Made optional to prevent breaks
}

export default function UniverseCard({ name, slug, colorScheme, description, delay = 0, bgUrl }: UniverseCardProps) {
  const colorMap = {
    blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", shadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]", hoverBorder: "hover:border-blue-500/50", glow: "to-blue-500/10" },
    orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-400", shadow: "hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]", hoverBorder: "hover:border-orange-500/50", glow: "to-orange-500/10" },
    yellow: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-400", shadow: "hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]", hoverBorder: "hover:border-yellow-500/50", glow: "to-yellow-500/10" },
    purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", shadow: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]", hoverBorder: "hover:border-purple-500/50", glow: "to-purple-500/10" },
    red: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-400", shadow: "hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]", hoverBorder: "hover:border-red-500/50", glow: "to-red-500/10" }
  };

  const colors = colorMap[colorScheme] || colorMap.blue;

  return (
    <Link href={`/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        whileTap={{ scale: 0.98 }}
        className={`relative h-[320px] flex flex-col p-6 rounded-2xl bg-eclipse-black/40 backdrop-blur-xl border ${colors.border} ${colors.hoverBorder} ${colors.shadow} shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden group`}
      >
        {bgUrl && (
          <Image
            src={bgUrl}
            alt={`${name} universe`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/60 via-transparent to-transparent z-0 group-hover:from-eclipse-black/40 transition-all duration-500" />
        
        <div className="relative z-10 flex flex-col h-full justify-end">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-auto border ${colors.border} ${colors.bg} backdrop-blur-md`}>
            <span className={`font-heading font-semibold text-xl ${colors.text}`}>
              {name.charAt(0)}
            </span>
          </div>
          
          <div className="p-4 rounded-xl bg-eclipse-black/30 backdrop-blur-md border border-light-ash/10 shadow-lg group-hover:bg-eclipse-black/50 group-hover:border-light-ash/20 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-1 font-heading tracking-wide drop-shadow-sm transition-colors">{name}</h3>
            <p className="text-light-ash/90 text-sm mb-3 line-clamp-2 leading-relaxed drop-shadow-sm">{description}</p>
            
            <div className={`flex items-center text-sm font-medium ${colors.text} drop-shadow-sm transition-colors mt-auto`}>
              <span>Enter Universe</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
