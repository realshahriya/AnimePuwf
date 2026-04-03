"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ComingSoonCard({ delay = 0.5 }: { delay?: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay }}
        className="relative h-full min-h-[220px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-light-ash/20 rounded-2xl bg-light-ash/5 transition-all duration-300 backdrop-blur-sm opacity-50 hover:opacity-100 hover:border-light-ash/50 hover:bg-light-ash/10"
      >
        <Sparkles className="w-10 h-10 text-light-ash/60 mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-light-ash mb-2 font-heading tracking-wide text-center drop-shadow-md">More Universes Soon</h3>
        <p className="text-light-ash/60 text-sm flex-grow leading-relaxed text-center">Our Puwfmasters are actively expanding the Simulation Matrix.</p>
    </motion.div>
  );
}
