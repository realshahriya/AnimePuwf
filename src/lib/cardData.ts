/**
 * cardData.ts
 * 
 * Per-universe configuration for the poster/card generator engine.
 * The CardGenerator component is universal — it reads from this file only.
 * 
 * To add a new universe:
 *  1. Add its SVG to /public/resultcards/
 *  2. Add an entry here with svgFile, placeholders, and imageRect
 */

export interface PlaceholderMap {
  /** Key = string to find in SVG, Value = what to replace with */
  [svgToken: string]: (result: CardResult) => string;
}

export interface ImageRect {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
}

export interface UniverseCardConfig {
  /** Filename inside /public/resultcards/ */
  svgFile: string;
  /** Map of SVG placeholder tokens → dynamic value getters */
  placeholders: PlaceholderMap;
  /** Where to render the user portrait in the SVG coordinate space */
  imageRect?: ImageRect;
}

export interface CardResult {
  userName: string;
  resultClass: string;
  outcome: string;
  rank?: string;
  job?: string;
  hobby?: string;
  favCharacter?: string;
  userImage?: string;
}

// ─── Universe Configs ────────────────────────────────────────────────────────

const ONE_PIECE: UniverseCardConfig = {
  svgFile: "anime_puwf_one_piece_visible.svg",
  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ Devil Fruit Ability ]": (r) => r.outcome,
    "[ ?,???,???,??? ]": (r) => r.rank || "Unknown",
    "DEAD OR ALIVE": (r) => r.favCharacter ? `RIVAL TO ${r.favCharacter.toUpperCase()}` : "DEAD OR ALIVE",
  },
  imageRect: { x: 130, y: 178, w: 420, h: 310, rx: 4 },
};

const NARUTO: UniverseCardConfig = {
  svgFile: "anime_puwf_naruto_visible.svg",
  placeholders: {
    "[ User Name ]":    (r) => r.userName.toUpperCase(),
    "[ Name ]":         (r) => r.userName.toUpperCase(),
    "[ e.g. Copy Ninja ]": (r) => r.job ? `The ${r.job}`.toUpperCase() : "THE WANDERER",
    "[ Hidden Village ]":  () => "THE HIDDEN FORGE",
    "[ S / A / B / C ]":   (r) => r.rank || "A-Rank",
    "[ EXTREME ]":          () => "THREAT: HIGH",
    "[ Fire / Wind / Lightning / Earth / Water ]": (r) => r.resultClass.toUpperCase(),
    "[ Generated Ability Name ]": (r) => r.outcome,
    "[ Jutsu 1 ]": (r) => r.hobby ? `Master of ${r.hobby}` : "Shadow Clone Jutsu",
    "[ Jutsu 2 ]": () => "Style: Puwf Strike",
    "[ Jutsu 3 ]": (r) => r.favCharacter ? `Student of ${r.favCharacter}` : "Sealing Art: Artifact",
  },
  imageRect: { x: 104, y: 156, w: 180, h: 200, rx: 4 },
};

const DRAGON_BALL_Z: UniverseCardConfig = {
  svgFile: "anime_puwf_dbz_visible.svg",
  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ Power Level ]": (r) => r.rank || "OVER 9000",
    "[ Ability ]":     (r) => r.outcome,
    "[ Class ]":       (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]":  (r) => r.job ? r.job.toUpperCase() : "WARRIOR",
    "[ Hobby ]":       (r) => r.hobby ? r.hobby.toUpperCase() : "TRAINING",
  },
  imageRect: { x: 120, y: 140, w: 260, h: 300, rx: 8 },
};

const DEMON_SLAYER: UniverseCardConfig = {
  svgFile: "anime_puwf_demon_slayer_visible.svg",
  placeholders: {
    "[ User Name ]":     (r) => r.userName.toUpperCase(),
    "[ Name ]":          (r) => r.userName.toUpperCase(),
    "[ Breathing Style ]": (r) => r.outcome,
    "[ Rank ]":          (r) => r.rank || "Mizunoto",
    "[ Class ]":         (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]":    (r) => r.job ? r.job.toUpperCase() : "SLAYER",
    "[ Hobby ]":         (r) => r.hobby ? r.hobby.toUpperCase() : "SWORD TRAINING",
    "[ Fav Character ]": (r) => r.favCharacter ? r.favCharacter.toUpperCase() : "—",
  },
  imageRect: { x: 110, y: 160, w: 220, h: 260, rx: 6 },
};

const JUJUTSU_KAISEN: UniverseCardConfig = {
  svgFile: "anime_puwf_jjk_visible.svg",
  placeholders: {
    "[ User Name ]":  (r) => r.userName.toUpperCase(),
    "[ Name ]":       (r) => r.userName.toUpperCase(),
    "[ Technique ]":  (r) => r.outcome,
    "[ Grade ]":      (r) => r.rank || "Grade 3",
    "[ Class ]":      (r) => r.resultClass.toUpperCase(),
    "[ Occupation ]": (r) => r.job ? r.job.toUpperCase() : "SORCERER",
    "[ Hobby ]":      (r) => r.hobby ? r.hobby.toUpperCase() : "CURSED ENERGY TRAINING",
    "[ Fav Character ]": (r) => r.favCharacter ? r.favCharacter.toUpperCase() : "—",
  },
  imageRect: { x: 120, y: 150, w: 240, h: 280, rx: 6 },
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const CARD_DATA: Record<string, UniverseCardConfig> = {
  "one-piece":       ONE_PIECE,
  "naruto":          NARUTO,
  "dragon-ball-z":   DRAGON_BALL_Z,
  "demon-slayer":    DEMON_SLAYER,
  "jujutsu-kaisen":  JUJUTSU_KAISEN,
};

/** Returns config for a universe slug, falls back to One Piece */
export function getCardConfig(universeSlug: string): UniverseCardConfig {
  return CARD_DATA[universeSlug] || CARD_DATA["one-piece"];
}
