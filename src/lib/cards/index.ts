/**
 * index.ts — Universe card config registry
 * 
 * Add new universes here as you create their data files.
 * The CardGenerator engine imports ONLY from here.
 */

import type { UniverseCardConfig } from "./types";
import onePiece      from "./one-piece";
import naruto        from "./naruto";
import dragonBallZ   from "./dragon-ball-z";
import demonSlayer   from "./demon-slayer";
import jujutsuKaisen from "./jujutsu-kaisen";

export type { UniverseCardConfig, CardResult, ImageRect } from "./types";

const REGISTRY: Record<string, UniverseCardConfig> = {
  "one-piece":      onePiece,
  "naruto":         naruto,
  "dragon-ball-z":  dragonBallZ,
  "demon-slayer":   demonSlayer,
  "jujutsu-kaisen": jujutsuKaisen,
};

/** Returns the card config for a universe slug. Defaults to One Piece. */
export function getCardConfig(slug: string): UniverseCardConfig {
  return REGISTRY[slug] ?? onePiece;
}
