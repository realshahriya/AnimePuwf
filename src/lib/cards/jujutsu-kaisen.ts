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
};

export default config;
