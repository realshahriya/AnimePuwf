"use client";

import { motion } from "framer-motion";
import { GiKatana, GiLightningTrio, GiPirateSkull, GiThirdEye, GiWhirlwind, GiDragonHead } from "react-icons/gi";

export default function Marquee() {
  const hooks = [
    { text: "Discover your Bankai", Icon: GiKatana },
    { text: "Uncover your Nen Type", Icon: GiLightningTrio },
    { text: "Claim your Bounty", Icon: GiPirateSkull },
    { text: "Master your Cursed Technique", Icon: GiThirdEye },
    { text: "Find your Breathing Style", Icon: GiWhirlwind },
    { text: "Calculate your Power Level", Icon: GiDragonHead }
  ];

  // Triplicate the array for seamless infinite looping without gaps
  const duplicatedHooks = [...hooks, ...hooks, ...hooks];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-eclipse-black/40 backdrop-blur-md border-y border-puwf-fire/20 py-3 relative flex items-center selection:bg-transparent shadow-[0_0_30px_rgba(255,107,0,0.05)]">
      {/* Gradient masks for fade out at screen edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-eclipse-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-eclipse-black to-transparent z-10" />
      
      <motion.div 
        className="flex gap-12 sm:gap-24 pl-12 sm:pl-24"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          ease: "linear", 
          duration: 35, 
          repeat: Infinity
        }}
        // Hovering pauses the marquee
        whileHover={{ animationPlayState: "paused" }} 
      >
        {duplicatedHooks.map((hook, index) => {
          const Icon = hook.Icon;
          return (
            <span key={index} className="flex items-center gap-3 text-light-ash/80 font-heading tracking-wide uppercase text-sm sm:text-base font-semibold shrink-0 cursor-default">
              <Icon className="w-5 h-5 text-puwf-fire" />
              {hook.text}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
