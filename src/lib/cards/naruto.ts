import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_naruto_visible.svg",

  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ e.g. Copy Ninja ]": (r) =>
      r.job ? `The ${r.job}`.toUpperCase() : "THE WANDERER",
    "[ Hidden Village ]": () => "THE HIDDEN FORGE",
    "[ S / A / B / C ]":  (r) => r.rank || "A-Rank",
    "[ EXTREME ]":         () => "THREAT: HIGH",
    "[ Fire / Wind / Lightning / Earth / Water ]": (r) =>
      r.resultClass.toUpperCase(),
    "[ Generated Ability Name ]": (r) => r.outcome,
    "[ Jutsu 1 ]": (r) =>
      r.hobby ? `Master of ${r.hobby}` : "Shadow Clone Jutsu",
    "[ Jutsu 2 ]": () => "Style: Puwf Strike",
    "[ Jutsu 3 ]": (r) =>
      r.favCharacter ? `Student of ${r.favCharacter}` : "Sealing Art: Artifact",
  },

  imageRect: { x: 104, y: 156, w: 180, h: 200, rx: 4 },
};

export default config;
