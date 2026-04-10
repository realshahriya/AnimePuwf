import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_jjk_visible.svg",

  placeholders: {
    "{{NAME}}":             (r) => r.userName.toUpperCase(),
    "{{GRADE}}":            (r) => {
      const grades = ["4", "4", "3", "2", "1", "SPEC"];
      return grades[r.tier || 1];
    },
    "{{STATUS}}":           (r) => (r.tier || 1) >= 4 ? "ACTIVE (ELITE)" : "ACTIVE",
    "{{AFFILIATION}}":      (r) => {
      if ((r.tier || 1) >= 4) return "TOKYO JUJUTSU HIGH";
      if ((r.tier || 1) === 3) return "KYOTO JJK HIGH";
      return "INDEPENDENT SORCERER";
    },
    "{{ENERGY_TYPE}}":       (r) => {
      const types = ["NEGATIVE", "POSITIVE", "REVERSE", "BLACK FLASH STAINED"];
      return types[(r.userName.length) % types.length];
    },
    "{{TECHNIQUE}}":        (r) => r.outcome.toUpperCase(),
    "{{EXTENSION}}":        (r) => {
      const extensions: Record<string, string> = {
        "Limitless": "Blue: Attraction",
        "Ten Shadows": "Rabbit Escape",
        "Ratio Technique": "Collapse",
        "Idle Transfiguration": "Polymorphic Soul",
        "Cursed Speech": "Sleep / Explode",
        "Comedian": "Reality Satire"
      };
      const base = Object.keys(extensions).find(k => r.outcome.includes(k));
      return (base ? extensions[base] : "Cursed Energy Burst").toUpperCase();
    },
    "{{MAXIMUM}}":          (r) => {
      const maximums: Record<string, string> = {
        "Limitless": "Purple: Hollow",
        "Ten Shadows": "Mahoraga Untamed",
        "Idle Transfiguration": "Instant Spirit Body",
        "Cursed Speech": "Command: DIE"
      };
      const base = Object.keys(maximums).find(k => r.outcome.includes(k));
      return (base ? maximums[base] : "Cursed Output Max").toUpperCase();
    },
    "{{DOMAIN}}":           (r) => {
      const domains: Record<string, string> = {
        "Limitless": "UNLIMITED VOID",
        "Ten Shadows": "CHIMERA SHADOW GARDEN",
        "Idle Transfiguration": "SELF-EMBODIMENT OF PERFECTION",
        "Ratio Technique": "7:3 SPATIAL DIVISION",
        "Comedian": "SOLO PERFORMANCE"
      };
      const base = Object.keys(domains).find(k => r.outcome.includes(k));
      return (base ? domains[base] : "UNNAMED BARRIER").toUpperCase();
    },
    "{{FILE_NO}}":          (r) => {
      const id = (r.userName.length * 789) % 10000;
      return id.toString().padStart(4, "0");
    },
    "{{CURSED_SEAL}}":      (r) => {
      const hex = (r.userName.length * 4321).toString(16).toUpperCase();
      return `0x${hex.slice(-4)}`;
    },
    // Grade Bar Logic
    "{{GR_4_OP}}":      (r) => (r.tier || 1) <= 1 ? "0.45" : "0.15",
    "{{GR_3_OP}}":      (r) => r.tier === 2 ? "0.45" : "0.15",
    "{{GR_2_OP}}":      (r) => r.tier === 3 ? "0.45" : "0.15",
    "{{GR_1_OP}}":      (r) => r.tier === 4 ? "0.45" : "0.15",
    "{{GR_SPEC_OP}}":   (r) => (r.tier || 1) >= 5 ? "0.45" : "0.15",
    // Text high-contrast
    "{{GR_4_TXT_OP}}":    (r) => (r.tier || 1) <= 1 ? "1.0" : "0.35",
    "{{GR_3_TXT_OP}}":    (r) => r.tier === 2 ? "1.0" : "0.35",
    "{{GR_2_TXT_OP}}":    (r) => r.tier === 3 ? "1.0" : "0.35",
    "{{GR_1_TXT_OP}}":    (r) => r.tier === 4 ? "1.0" : "0.35",
    "{{GR_SPEC_TXT_OP}}": (r) => (r.tier || 1) >= 5 ? "1.0" : "0.35",
  },

  imageRect: { x: 104, y: 124, w: 172, h: 210, rx: 4 },
  outcomes: {
    gojo: ["Limitless", "Six Eyes Perception", "Infinity User"],
    zenin: ["Ten Shadows Technique", "Projection Sorcery", "Heavenly Restriction"],
    nanami: ["Ratio Technique", "Overtime Binding Vow"],
    mahito: ["Idle Transfiguration", "Soul Perception"],
    inumaki: ["Cursed Speech", "Serpent & Fang Signature"]
  },
  basicOutcomes: ["Simple Domain Specialist", "Cursed Tool User", "New Shadow Style", "Shikigami Summoner", "Window Agent"],
  generateRank: (tier: number) => {
    const grades = ["Grade 4 Sorcerer", "Grade 3 Sorcerer", "Grade 2 Sorcerer", "Grade 1 Sorcerer", "Grade 1 Sorcerer", "Special Grade Sorcerer"];
    return grades[tier] || "Grade 2 Sorcerer";
  },
};

export default config;
