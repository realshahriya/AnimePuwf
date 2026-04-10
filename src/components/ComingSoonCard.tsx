"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ComingSoonCard({ delay = 0.5 }: { delay?: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay }}
        className="relative h-[320px] flex flex-col items-center justify-center p-6 rounded-2xl bg-eclipse-black/20 backdrop-blur-md border-2 border-dashed border-light-ash/10 transition-all duration-500 overflow-hidden group hover:border-light-ash/30 hover:bg-eclipse-black/40 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-light-ash/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Sparkles className="w-12 h-12 text-light-ash/40 mb-6 group-hover:text-light-ash/80 group-hover:animate-pulse transition-colors duration-500" />
          <h3 className="text-2xl font-bold text-light-ash/60 mb-2 font-heading tracking-wide drop-shadow-md group-hover:text-light-ash transition-colors duration-500">More Universes Soon</h3>
          <p className="text-light-ash/40 text-sm leading-relaxed max-w-[200px] group-hover:text-light-ash/60 transition-colors duration-500">Our Puwfmasters are actively expanding the Simulation Matrix.</p>
        </div>
    </motion.div>
  );
}
