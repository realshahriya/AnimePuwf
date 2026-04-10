/**
 * types.ts — Shared card generator interfaces
 * Used by each universe data file and the CardGenerator engine.
 */

export interface CardResult {
  userName: string;
  resultClass: string;
  outcome: string;
  rank?: string;
  job?: string;
  hobby?: string;
  favCharacter?: string;
  userImage?: string;
  handle?: string;
  tier?: number;
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
  /** Map of SVG placeholder token → value getter */
  placeholders: Record<string, (r: CardResult) => string>;
  /** Where to render the user portrait inside the SVG coordinate space */
  imageRect?: ImageRect;
  /** Grouped outcomes by personality class (e.g., logia, uchiha) */
  outcomes: Record<string, string[]>;
  /** Common outcomes if no special class is assigned */
  basicOutcomes: string[];
  /** Generate a universe-specific rank based on progress tier (1-5) */
  generateRank: (tier: number) => string;
}
