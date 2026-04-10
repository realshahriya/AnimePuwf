import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_dbz_visible.svg",

  placeholders: {
    "{{NAME}}":           (r) => r.userName.toUpperCase(),
    "{{RACE}}":           (r) => {
      const raceMap: Record<string, string> = {
        saiyan: "SAIYAN",
        android: "ANDROID",
        namekian: "NAMEKIAN",
      };
      return raceMap[r.resultClass.toLowerCase()] || "EARTHLING";
    },
    "{{ALLEGIANCE}}":     (r) => {
      return r.resultClass.toLowerCase() === "android" ? "VILLAIN" : "Z FIGHTER";
    },
    "{{POWER_LEVEL}}":    (r) => {
      const num = parseInt(r.rank?.replace(/[^0-9]/g, "") || "9001");
      return num.toLocaleString();
    },
    "{{TRANSFORMATION}}": (r) => {
      if (r.outcome.includes("Ultra")) return "ULTRA INSTINCT";
      if (r.outcome.includes("Super Saiyan")) return "SUPER SAIYAN";
      return "BASE FORM";
    },
    "{{MOVE}}":           (r) => r.outcome.toUpperCase(),
    "{{WINS}}":           (r) => {
      const wins = (r.userName.length * 7) % 99;
      return wins.toString().padStart(2, "0");
    },
    "{{LOSSES}}":         (r) => {
      const losses = (r.userName.length * 3) % 20;
      return losses.toString().padStart(2, "0");
    },
    "{{KI_TYPE}}":        (r) => {
      return r.resultClass.toLowerCase() === "saiyan" ? "GOD" : "PURE";
    },
    "{{SCAN_ID}}":        (r) => {
      const id = (r.userName.length * 1234) % 9999;
      return id.toString().padStart(4, "0");
    },
    "{{UNIT}}":           (r) => {
      const unit = (r.userName.length * 5678) % 9999;
      return unit.toString().padStart(4, "0");
    },
    // Threat Assessment Box Opacities (Tier 1-5)
    "{{TH_WEAK_OP}}":   (r) => (r.tier || 1) <= 1 ? "0.45" : "0.15",
    "{{TH_AVG_OP}}":    (r) => r.tier === 2 ? "0.45" : "0.15",
    "{{TH_STRONG_OP}}": (r) => r.tier === 3 ? "0.45" : "0.15",
    "{{TH_ELITE_OP}}":  (r) => r.tier === 4 ? "0.45" : "0.15",
    "{{TH_GOD_OP}}":    (r) => (r.tier || 1) >= 5 ? "0.45" : "0.15",
    // Threat Assessment Text Opacities (High contrast for active tier)
    "{{TH_WEAK_TXT_OP}}":   (r) => (r.tier || 1) <= 1 ? "1.0" : "0.35",
    "{{TH_AVG_TXT_OP}}":    (r) => r.tier === 2 ? "1.0" : "0.35",
    "{{TH_STRONG_TXT_OP}}": (r) => r.tier === 3 ? "1.0" : "0.35",
    "{{TH_ELITE_TXT_OP}}":  (r) => r.tier === 4 ? "1.0" : "0.35",
    "{{TH_GOD_TXT_OP}}":    (r) => (r.tier || 1) >= 5 ? "1.0" : "0.35",
  },

  imageRect: { x: 104, y: 108, w: 180, h: 200, rx: 4 },
  
  outcomes: {
    saiyan: [
      "Super Saiyan Blue Kaioken", 
      "Ultra Instinct (Sign)", 
      "Super Saiyan 4 Unleashed", 
      "Primal Saiyan Rage",
      "Legendary Super Saiyan",
      "God Bind Mastery"
    ],
    android: [
      "Infinite Energy Core", 
      "Photon Flash Devastation", 
      "Energy Absorption Matrix", 
      "Hell Flash Cannon",
      "Nanomachine Regeneration",
      "Perfect Form Evolution"
    ],
    namekian: [
      "Orange Namekian Awakening", 
      "Giant Form Dominance", 
      "Special Beam Cannon Mastery", 
      "Namekian Soul Fusion",
      "Dragon Clan Mysticism",
      "Evil Containment Wave"
    ]
  },
  basicOutcomes: [
    "Crane School Martial Artist", 
    "Turtle School Disciple", 
    "Galactic Patrol Recruit", 
    "Kai Way Mastery",
    "Mafuba Seal Specialist",
    "Ki Control Expert"
  ],
  generateRank: (tier: number) => {
    let powerLevel = 0;
    if (tier === 1) powerLevel = Math.floor(Math.random() * 500) + 10;
    if (tier === 2) powerLevel = Math.floor(Math.random() * 5000) + 1000;
    if (tier === 3) powerLevel = Math.floor(Math.random() * 50000) + 10000;
    if (tier === 4) powerLevel = Math.floor(Math.random() * 500000) + 100000;
    if (tier === 5) powerLevel = Math.floor(Math.random() * 50000000) + 10000000;
    return `Level ${powerLevel.toLocaleString()}`;
  },
};

export default config;
