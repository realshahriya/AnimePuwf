import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_demon_slayer_visible.svg",

  placeholders: {
    "{{NAME}}":       (r) => r.userName.toUpperCase(),
    "{{RANK}}":       (r) => r.rank?.toUpperCase() || "MIZUNOTO",
    "{{TYPE}}":       (r) => r.resultClass.toLowerCase().includes("demon") ? "DEMON" : "SLAYER",
    "{{TITLE}}":      (r) => {
      if (r.tier && r.tier >= 5) {
        return r.resultClass.toLowerCase().includes("demon") ? "UPPER MOON CANDIDATE" : `${r.outcome.split(" ")[0]} HASHIRA`;
      }
      return r.resultClass.toLowerCase().includes("demon") ? "BLOOD-STAINED THREAT" : "CORPS SWORDSMAN";
    },
    "{{STYLE}}":      (r) => r.outcome.toUpperCase(),
    "{{FORM}}":       (r) => {
      if (r.resultClass.toLowerCase().includes("demon")) return "—";
      const forms = ["I - First Move", "IV - Crimson Dawn", "VII - Piercing Light", "XI - Final Strike"];
      return forms[r.userName.length % forms.length].toUpperCase();
    },
    "{{BLOOD_ART}}":   (r) => {
      if (!r.resultClass.toLowerCase().includes("demon")) return "—";
      const arts = ["EYE OF THE ABYSS", "CRIMSON VINE ENTRAPMENT", "SHATTERED MIRROR REALM", "SOUL EATER"];
      return arts[r.userName.length % arts.length].toUpperCase();
    },
  },

  imageRect: { x: 140, y: 116, w: 148, h: 178, rx: 4 },
  outcomes: {
    sun: ["Sun Breathing", "Hinokami Kagura", "Dance of the Fire God"],
    moon: ["Moon Breathing", "Crescent Moon Blades", "Lunar Eclipse Style"],
    flame: ["Flame Breathing", "Purgatory Mastery", "Blazing Soul"],
    mist: ["Mist Breathing", "Hazy Clouds Style", "Eight-Layered Mist"],
    demon: ["Blood Demon Art: Cryokinesis", "Blood Demon Art: Shockwaves", "Blood Demon Art: Illusions"]
  },
  basicOutcomes: ["Water Breathing", "Thunder Breathing", "Wind Breathing", "Insect Breathing", "Flower Breathing"],
  generateRank: (tier: number) => {
    const ranks = ["Mizunoto", "Mizunoto", "Kanoe", "Hinoto", "Tsuguko", "Hashira"];
    return ranks[tier] || "Mizunoto";
  },
};

export default config;
