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
    logia: ["Pika Pika no Mi (Light)", "Goro Goro no Mi (Lightning)", "Mera Mera no Mi (Fire)", "Hie Hie no Mi (Ice)"],
    paramecia: ["Gomu Gomu no Mi (Rubber)", "Ope Ope no Mi (Operation)", "Gura Gura no Mi (Quake)", "Hana Hana no Mi (Flower)"],
    zoan: ["Tori Tori no Mi: Model Phoenix", "Hito Hito no Mi: Model Daibutsu", "Uo Uo no Mi: Model Seiryu", "Neko Neko no Mi: Model Leopard"]
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

/**
 * Calculates the final result based on points collected.
 * Picks the class with the highest score and a random outcome from that class.
 */
export function calculateResult(universeSlug: string, answers: Record<string, Record<string, number>>): PuwfResult {
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

  // Pick a random outcome from the winning class
  const outcomes = UNIVERSE_OUTCOMES[universeSlug]?.[winningClass] || ["Mysterious Power"];
  const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

  return {
    universe: universeSlug,
    resultClass: winningClass,
    outcome: randomOutcome,
    rank: generateRank(universeSlug, maxScore)
  };
}

function generateRank(universe: string, score: number): string {
  if (universe === "one-piece") {
    const bounty = (Math.floor(Math.random() * 900) + 100) * (score > 10 ? 1000000 : 100000);
    return `${bounty.toLocaleString()} Berries`;
  }
  if (universe === "naruto") {
    const ranks = ["Genin", "Chunin", "Jonin", "S-Rank Nuke-nin"];
    return ranks[Math.min(Math.floor(score / 3), ranks.length - 1)];
  }
  return "Special Grade";
}
