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
  outcomes: {
    saiyan: ["Super Saiyan Blue", "Ultra Instinct", "Great Ape Transformation", "Galick Gun Mastery"],
    android: ["Infinite Energy Core", "Self-Destruction Mechanism", "Energy Absorption", "Photon Flash"],
    namekian: ["Regenerative Cells", "Namekian Fusion", "Special Beam Cannon", "Giant Form Mastery"]
  },
  basicOutcomes: ["Earthling Martial Artist", "Ki Control Expert", "Weapon Specialist", "Galactic Patrolman", "Crane School Disciple", "Turtle School Martial Artist"],
  generateRank: (tier: number) => {
    let powerLevel = 0;
    if (tier === 1) powerLevel = Math.floor(Math.random() * 995) + 5;
    else if (tier === 2) powerLevel = Math.floor(Math.random() * 9000) + 1000;
    else if (tier === 3) powerLevel = Math.floor(Math.random() * 90000) + 10000;
    else if (tier === 4) powerLevel = Math.floor(Math.random() * 900000) + 100000;
    else if (tier === 5) powerLevel = Math.floor(Math.random() * 9000000) + 1000000;
    return `Power Level: ${powerLevel.toLocaleString()}`;
  },
};

export default config;
