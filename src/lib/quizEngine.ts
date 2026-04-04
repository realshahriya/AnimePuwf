export interface PuwfResult {
  universe: string;
  resultClass: string; // e.g. "logia", "uchiha"
  outcome: string;     // e.g. "Aura-Aura Fruit", "Sharinga"
  rank?: string;       // e.g. "S-Rank", "100,000,000 B"
  job?: string;
  hobby?: string;
  favCharacter?: string;
  userImage?: string; // base64 encoded image
}

export const UNIVERSE_OUTCOMES: Record<string, Record<string, string[]>> = {
  "one-piece": {
    logia: [
      "Pika Pika no Mi (Light)", "Goro Goro no Mi (Lightning)", "Mera Mera no Mi (Fire)", "Hie Hie no Mi (Ice)", 
      "Magu Magu no Mi (Magma)", "Yami Yami no Mi (Darkness)", "Suna Suna no Mi (Sand)", "Moku Moku no Mi (Smoke)", 
      "Yuki Yuki no Mi (Snow)", "Gasu Gasu no Mi (Gas)", "Numa Numa no Mi (Swamp)", "Mori Mori no Mi (Woods)",
      "Blizzard Fruit", "Dough Fruit"
    ],
    paramecia: [
      "Gomu Gomu no Mi (Rubber)", "Ope Ope no Mi (Operation)", "Gura Gura no Mi (Quake)", "Hana Hana no Mi (Flower)",
      "Ito Ito no Mi (String)", "Doku Doku no Mi (Venom)", "Nikyu Nikyu no Mi (Paw)", "Horu Horu no Mi (Hormone)",
      "Kage Kage no Mi (Shadow)", "Mero Mero no Mi (Love)", "Soru Soru no Mi (Soul)", "Zushi Zushi no Mi (Gravity)",
      "Mochi Mochi no Mi (Mochi)", "Bari Bari no Mi (Barrier)", "Control Fruit", "Portal Fruit", "Sound Fruit", "Shadow Fruit"
    ],
    zoan: [
      "Tori Tori no Mi: Model Phoenix", "Hito Hito no Mi: Model Daibutsu (Buddha)", "Uo Uo no Mi: Model Seiryu (Dragon)", 
      "Neko Neko no Mi: Model Leopard", "Ryu Ryu no Mi: Model Pteranodon", "Ryu Ryu no Mi: Model Spinosaurus", 
      "Ryu Ryu no Mi: Model Brachiosaurus", "Inu Inu no Mi: Model Okuchi no Makami (Wolf)", "Inu Inu no Mi: Model Kyubi no Kitsune", 
      "Hebi Hebi no Mi: Model Yamata no Orochi", "Hito Hito no Mi: Model Nika", "T-Rex Fruit", "Mammoth Fruit", "Kitsune Fruit"
    ]
  },
  "naruto": {
    uzumaki: ["Nine-Tails Jinchuriki", "Adamantine Sealing Chains", "Sage Mode Mastery", "Rasengan Specialist"],
    uchiha: ["Mangekyo Sharingan", "Susano'o Manifestation", "Amaterasu Specialist", "Kotoamatsukami"],
    hyuga: ["Byakugan Mastery", "Eight Trigrams Sixty-Four Palms", "Gentle Fist Mastery", "Air Palm Specialist"]
  },
  "dragon-ball-z": {
    saiyan: ["Super Saiyan Blue", "Ultra Instinct", "Great Ape Transformation", "Galick Gun Mastery"],
    android: ["Infinite Energy Core", "Self-Destruction Mechanism", "Energy Absorption", "Photon Flash"],
    namekian: ["Regenerative Cells", "Namekian Fusion", "Special Beam Cannon", "Giant Form Mastery"]
  },
  "jujutsu-kaisen": {
    gojo: ["Limitless & Six Eyes", "Hollow Purple", "Infinity Barrier", "Unlimited Void"],
    zenin: ["Ten Shadows Technique", "Projection Sorcery", "Cursed Tool Mastery", "Heavenly Restriction"],
    kamo: ["Blood Manipulation", "Piercing Blood", "Flowing Red Scale", "Crimson Binding"]
  },
  "demon-slayer": {
    flame: ["Flame Breathing: Ninth Form - Rengoku", "Esoteric Art", "Blazing Universe", "Rising Scorching Sun"],
    thunder: ["Thunder Breathing: Seventh Form - Honoikazuchi no Kami", "Sixfold Dash", "God Speed", "Rice Spirit"],
    water: ["Water Breathing: Eleventh Form - Dead Calm", "Constant Flux", "Waterfall Basin", "Striking Tide"]
  }
};

export const UNIVERSE_BASIC_OUTCOMES: Record<string, string[]> = {
  "one-piece": ["Master Swordsman", "Advanced Armament Haki User", "Rokushiki Master", "Fish-Man Karate Practitioner", "Expert Sniper", "Skilled Navigator", "Shipwright Prodigy"],
  "naruto": ["Taijutsu Specialist", "Kenjutsu Master", "Standard Ninjutsu User", "Medical-nin", "Puppet Master", "Genjutsu Specialist", "Tracker Ninja"],
  "dragon-ball-z": ["Earthling Martial Artist", "Ki Control Expert", "Weapon Specialist", "Galactic Patrolman", "Crane School Disciple", "Turtle School Martial Artist"],
  "jujutsu-kaisen": ["Cursed Tool Wielder", "New Shadow Style User", "Basic Shikigami User", "Barrier Technique User", "Jujutsu High Auxiliary", "Window Manager"],
  "demon-slayer": ["Swordsmith", "Demon Slayer Corps Trainee", "Kakushi Member", "Standard Breathing User", "Wisteria Mansion Helper"]
};

/**
 * Calculates the final result based on points collected.
 * Picks the class with the highest score and a random outcome from that class.
 */
export function calculateResult(universeSlug: string, answers: Record<string, Record<string, number>>, job: string): PuwfResult {
  const totals: Record<string, number> = {};

  // Sum up all points
  Object.values(answers).forEach(points => {
    Object.entries(points).forEach(([type, value]) => {
      totals[type] = (totals[type] || 0) + value;
    });
  });

  // Find the winning class
  let winningClass = "";
  let maxScore = -1;

  Object.entries(totals).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      winningClass = type;
    }
  });

  // Default to first class if nothing matches
  const universeClasses = Object.keys(UNIVERSE_OUTCOMES[universeSlug] || {});
  if (!winningClass && universeClasses.length > 0) {
    winningClass = universeClasses[0];
  }

  const jobProfiles: Record<string, { specialChance: number, rankTier: number }> = {
    "Student": { specialChance: 0.05, rankTier: 1 },
    "Employed / Professional": { specialChance: 0.20, rankTier: 2 },
    "Freelancer / Creative": { specialChance: 0.30, rankTier: 3 },
    "Athlete / Fitness": { specialChance: 0.40, rankTier: 4 },
    "Entrepreneur / Business": { specialChance: 0.60, rankTier: 5 },
    "Other": { specialChance: 0.15, rankTier: 2 }
  };

  const profile = jobProfiles[job] || jobProfiles["Other"];
  const getsSpecial = Math.random() < profile.specialChance;

  let finalOutcome = "";
  let finalClass = getsSpecial ? winningClass : "Commoner / Human";

  if (getsSpecial) {
    // Pick a random outcome from the winning class
    const outcomes = UNIVERSE_OUTCOMES[universeSlug]?.[winningClass] || ["Mysterious Power"];
    finalOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
  } else {
    // Pick a generic outcome
    const basicOutcomes = UNIVERSE_BASIC_OUTCOMES[universeSlug] || ["Martial Artist"];
    finalOutcome = basicOutcomes[Math.floor(Math.random() * basicOutcomes.length)];
  }

  return {
    universe: universeSlug,
    resultClass: finalClass,
    outcome: finalOutcome,
    rank: generateRank(universeSlug, profile.rankTier)
  };
}

function generateRank(universe: string, tier: number): string {
  if (universe === "one-piece") {
    let bounty = 0;
    if (tier === 1) bounty = Math.floor(Math.random() * 50000);
    else if (tier === 2) bounty = Math.floor(Math.random() * 4950000) + 50000;
    else if (tier === 3) bounty = Math.floor(Math.random() * 45000000) + 5000000;
    else if (tier === 4) bounty = Math.floor(Math.random() * 250000000) + 50000000;
    else if (tier === 5) bounty = Math.floor(Math.random() * 700000000) + 300000000;
    return `${bounty.toLocaleString()} Berries`;
  }
  if (universe === "naruto") {
    const ranks = ["Academy Student", "Genin", "Chunin", "Jonin", "S-Rank Nuke-nin", "Kage-Level"];
    return ranks[tier] || "Genin";
  }
  if (universe === "dragon-ball-z") {
    let powerLevel = 0;
    if (tier === 1) powerLevel = Math.floor(Math.random() * 995) + 5;
    else if (tier === 2) powerLevel = Math.floor(Math.random() * 9000) + 1000;
    else if (tier === 3) powerLevel = Math.floor(Math.random() * 90000) + 10000;
    else if (tier === 4) powerLevel = Math.floor(Math.random() * 900000) + 100000;
    else if (tier === 5) powerLevel = Math.floor(Math.random() * 9000000) + 1000000;
    return `Power Level: ${powerLevel.toLocaleString()}`;
  }
  if (universe === "demon-slayer") {
    const ranks = ["Kakushi", "Mizunoto", "Kanoe", "Hinoto", "Tsuguko", "Hashira"];
    return ranks[tier] || "Mizunoto";
  }
  if (universe === "jujutsu-kaisen") {
    const ranks = ["Grade 4", "Grade 3", "Grade 2", "Grade 1", "Special Grade 1", "Special Grade"];
    return ranks[tier] || "Grade 3";
  }
  return "Special Grade";
}
