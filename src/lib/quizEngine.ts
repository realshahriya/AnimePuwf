import { getCardConfig } from "./cards";

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

/**
 * Calculates the final result based on points collected.
 * Picks the class with the highest score and a random outcome from that class.
 */
export function calculateResult(universeSlug: string, answers: Record<string, Record<string, number>>, job: string): PuwfResult {
  const config = getCardConfig(universeSlug);
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
  const universeClasses = Object.keys(config.outcomes || {});
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
    const outcomes = config.outcomes?.[winningClass] || ["Mysterious Power"];
    finalOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
  } else {
    // Pick a generic outcome
    const basicOutcomes = config.basicOutcomes || ["Martial Artist"];
    finalOutcome = basicOutcomes[Math.floor(Math.random() * basicOutcomes.length)];
  }

  return {
    universe: universeSlug,
    resultClass: finalClass,
    outcome: finalOutcome,
    rank: config.generateRank(profile.rankTier)
  };
}
