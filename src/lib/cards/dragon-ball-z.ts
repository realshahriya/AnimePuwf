import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_dbz_visible.svg",

  placeholders: {
    "[ User Name ]":   (r) => r.userName.toUpperCase(),
    "[ Name ]":        (r) => r.userName.toUpperCase(),
    "[ Power Level ]": (r) => r.rank || "OVER 9000",
    "[ Ability ]":     (r) => r.outcome,
    "[ Class ]":       (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]":  (r) => r.job ? r.job.toUpperCase() : "WARRIOR",
    "[ Hobby ]":       (r) => r.hobby ? r.hobby.toUpperCase() : "TRAINING",
    "[ Fav Character ]": (r) =>
      r.favCharacter ? r.favCharacter.toUpperCase() : "—",
  },

  imageRect: { x: 120, y: 140, w: 260, h: 300, rx: 8 },
};

export default config;
