import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_naruto_visible.svg",

  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ e.g. Copy Ninja ]": (r) =>
      r.job ? `THE ${r.job.toUpperCase()}` : "THE WANDERER",
    "[ Hidden Village ]": () => "THE HIDDEN FORGE",
    "[ S / A / B / C ]":  (r) => r.rank || "A-RANK",
    "[ EXTREME ]": (r) => {
      const rank = r.rank || "";
      if (rank.includes("Kage") || rank.includes("S-Rank")) return "THREAT: EXTREME";
      if (rank.includes("Jonin")) return "THREAT: HIGH";
      if (rank.includes("Chunin")) return "THREAT: SIGNIFICANT";
      if (rank.includes("Genin")) return "THREAT: MODERATE";
      return "THREAT: LOW";
    },
    "[ Fire / Wind / Lightning / Earth / Water ]": (r) => {
      // Weighted pool based on Naruto lore rarity
      // weight = relative frequency (higher = more common)
      const NATURES: [string, number][] = [
        // ── Basic (common) ──────────────────────────────
        ["FIRE RELEASE",      50],
        ["WIND RELEASE",      50],
        ["LIGHTNING RELEASE", 50],
        ["EARTH RELEASE",     50],
        ["WATER RELEASE",     50],
        // ── Kekkei Genkai – Rare ────────────────────────
        ["ICE RELEASE",        8],
        ["LAVA RELEASE",       8],
        ["STORM RELEASE",      6],
        ["BOIL RELEASE",       5],
        ["EXPLOSION RELEASE",  5],
        ["SCORCH RELEASE",     4],
        ["MAGNET RELEASE",     4],
        ["CRYSTAL RELEASE",    3],
        ["STEEL RELEASE",      3],
        // ── Kekkei Tōta / Legendary – Mythical ─────────
        ["WOOD RELEASE",       1],   // Hashirama only
        ["PARTICLE STYLE",     1],   // Ōnoki only
        ["YIN-YANG RELEASE",   1],   // Hagoromo / Six Paths
      ];

      // Clan overrides take priority (lore-accurate)
      const userClass = r.resultClass.toLowerCase();
      if (userClass === "uchiha") return "FIRE RELEASE";
      if (userClass === "uzumaki") return "WIND RELEASE";
      if (userClass === "hyuga")   return "WATER RELEASE";

      // Seeded roll from name hash — deterministic per user
      const seed = r.userName.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0) * 31, 0);
      const totalWeight = NATURES.reduce((s, [, w]) => s + w, 0);
      let roll = seed % totalWeight;

      for (const [name, weight] of NATURES) {
        if (roll < weight) return name;
        roll -= weight;
      }

      return "FIRE RELEASE"; // fallback
    },
    "[ Generated Ability Name ]": (r) => r.outcome.toUpperCase(),
    "[ Jutsu 1 ]": (r) => getNinjaJutsu(r, 0),
    "[ Jutsu 2 ]": (r) => getNinjaJutsu(r, 1),
    "[ Jutsu 3 ]": (r) => getNinjaJutsu(r, 2),
    "[ Kage Signature ]": () => "THE PUWF KAGE",
  },

  imageRect: { x: 104, y: 156, w: 180, h: 200, rx: 4 },
  outcomes: {
    uzumaki: ["Nine-Tails Jinchuriki", "Adamantine Sealing Chains", "Sage Mode Mastery", "Rasengan Specialist"],
    uchiha: ["Mangekyo Sharingan", "Susano'o Manifestation", "Amaterasu Specialist", "Kotoamatsukami"],
    hyuga: ["Byakugan Mastery", "Eight Trigrams Sixty-Four Palms", "Gentle Fist Mastery", "Air Palm Specialist"]
  },
  basicOutcomes: ["Taijutsu Specialist", "Kenjutsu Master", "Standard Ninjutsu User", "Medical-nin", "Puppet Master", "Genjutsu Specialist", "Tracker Ninja"],
  generateRank: (tier: number) => {
    const ranks = ["Academy Student", "Genin", "Chunin", "Jonin", "S-Rank Nuke-nin", "Kage-Level"];
    return ranks[tier] || "Genin";
  },
};

const OFFICIAL_JUTSU: Record<string, string[]> = {
  uzumaki: [
    "RASENGAN", "MULTI SHADOW CLONE JUTSU", "REAPER DEATH SEAL",
    "WIND STYLE: RASENSHURIKEN", "FLYING RAIJIN", "UZUMAKI BARRAGE"
  ],
  uchiha: [
    "CHIDORI", "FIRE STYLE: FIREBALL JUTSU", "AMATERASU",
    "SUSANO'O INTERMEDIATE", "IZANAGI", "KOTOAMATSUKAMI"
  ],
  hyuga: [
    "8 TRIGRAMS 64 PALMS", "EIGHT TRIGRAMS PALM ROTATION",
    "GENTLE FIST: AIR PALM", "VACUUM PALM", "MOUNTAIN CRUSHER"
  ],
  basic: [
    "SUBSTITUTION JUTSU", "BODY FLICKER TECHNIQUE", "GREAT FIREBALL",
    "WATER DRAGON BULLET", "EARTH STYLE: MUD WALL", "PHOENIX FLOWER JUTSU"
  ]
};

function getNinjaJutsu(r: any, index: number): string {
  const pool = OFFICIAL_JUTSU[r.resultClass.toLowerCase()] || OFFICIAL_JUTSU.basic;
  // Use a predictable but "random" selection based on name hash if possible, 
  // or just offset based on index.
  const jutsuIndex = (r.userName.length + index) % pool.length;
  return pool[jutsuIndex];
}

export default config;
