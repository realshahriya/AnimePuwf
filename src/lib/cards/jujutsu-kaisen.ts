import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_jjk_visible.svg",

  placeholders: {
    "[ User Name ]":  (r) => r.userName.toUpperCase(),
    "[ Name ]":       (r) => r.userName.toUpperCase(),
    "[ Technique ]":  (r) => r.outcome,
    "[ Grade ]":      (r) => r.rank || "Grade 3",
    "[ Class ]":      (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]": (r) => r.job ? r.job.toUpperCase() : "SORCERER",
    "[ Hobby ]":      (r) => r.hobby ? r.hobby.toUpperCase() : "CURSED ENERGY TRAINING",
    "[ Fav Character ]": (r) =>
      r.favCharacter ? r.favCharacter.toUpperCase() : "—",
  },

  imageRect: { x: 120, y: 150, w: 240, h: 280, rx: 6 },
  outcomes: {
    gojo: ["Limitless & Six Eyes", "Hollow Purple", "Infinity Barrier", "Unlimited Void"],
    zenin: ["Ten Shadows Technique", "Projection Sorcery", "Cursed Tool Mastery", "Heavenly Restriction"],
    kamo: ["Blood Manipulation", "Piercing Blood", "Flowing Red Scale", "Crimson Binding"]
  },
  basicOutcomes: ["Cursed Tool Wielder", "New Shadow Style User", "Basic Shikigami User", "Barrier Technique User", "Jujutsu High Auxiliary", "Window Manager"],
  generateRank: (tier: number) => {
    const ranks = ["Grade 4", "Grade 3", "Grade 2", "Grade 1", "Special Grade 1", "Special Grade"];
    return ranks[tier] || "Grade 3";
  },
};

export default config;
