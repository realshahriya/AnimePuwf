import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_one_piece_visible.svg",

  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ Devil Fruit Ability ]": (r) => r.outcome,
    "[ ?,???,???,??? ]": (r) => r.rank || "Unknown",
    "DEAD OR ALIVE": (r) =>
      r.favCharacter ? `RIVAL TO ${r.favCharacter.toUpperCase()}` : "DEAD OR ALIVE",
  },

  imageRect: { x: 130, y: 178, w: 420, h: 310, rx: 4 },
};

export default config;
