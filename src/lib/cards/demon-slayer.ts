import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_demon_slayer_visible.svg",

  placeholders: {
    "[ User Name ]":       (r) => r.userName.toUpperCase(),
    "[ Name ]":            (r) => r.userName.toUpperCase(),
    "[ Breathing Style ]": (r) => r.outcome,
    "[ Rank ]":            (r) => r.rank || "Mizunoto",
    "[ Class ]":           (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]":      (r) => r.job ? r.job.toUpperCase() : "SLAYER",
    "[ Hobby ]":           (r) => r.hobby ? r.hobby.toUpperCase() : "SWORD TRAINING",
    "[ Fav Character ]":   (r) =>
      r.favCharacter ? r.favCharacter.toUpperCase() : "—",
  },

  imageRect: { x: 110, y: 160, w: 220, h: 260, rx: 6 },
  outcomes: {
    flame: ["Flame Breathing: Ninth Form - Rengoku", "Esoteric Art", "Blazing Universe", "Rising Scorching Sun"],
    thunder: ["Thunder Breathing: Seventh Form - Honoikazuchi no Kami", "Sixfold Dash", "God Speed", "Rice Spirit"],
    water: ["Water Breathing: Eleventh Form - Dead Calm", "Constant Flux", "Waterfall Basin", "Striking Tide"]
  },
  basicOutcomes: ["Swordsmith", "Demon Slayer Corps Trainee", "Kakushi Member", "Standard Breathing User", "Wisteria Mansion Helper"],
  generateRank: (tier: number) => {
    const ranks = ["Kakushi", "Mizunoto", "Kanoe", "Hinoto", "Tsuguko", "Hashira"];
    return ranks[tier] || "Mizunoto";
  },
};

export default config;
