export type Category = {
  name: string;
  slug: string;
};

export const CATEGORIES: Category[] = [
  { name: "All Universes", slug: "all" },
  { name: "Shounen", slug: "shounen" },
  { name: "Supernatural", slug: "supernatural" },
  { name: "Sci-Fi", slug: "scifi" },
  { name: "Adventure", slug: "adventure" }
];

export type Universe = {
  name: string;
  slug: string;
  colorScheme: "blue" | "orange" | "yellow" | "purple" | "red";
  description: string;
  categorySlugs: string[];
  bgUrl: string;
  headerUrl: string;
};

export const UNIVERSES: Universe[] = [
  {
    name: "One Piece",
    slug: "one-piece",
    colorScheme: "blue",
    description: "Sail the Grand Line. Discover your Devil Fruit power and find out your starting bounty.",
    categorySlugs: ["shounen", "adventure"],
    bgUrl: "/banners/one-piece.png",
    headerUrl: "/headers/one-piece.png"
  },
  {
    name: "Naruto",
    slug: "naruto",
    colorScheme: "orange",
    description: "Channel your chakra. Uncover your hidden jutsu and find your place among the shinobi ranks.",
    categorySlugs: ["shounen", "adventure"],
    bgUrl: "/banners/naruto.png",
    headerUrl: "/headers/naruto.png"
  },
  {
    name: "Dragon Ball Z",
    slug: "dragon-ball-z",
    colorScheme: "yellow",
    description: "Charge your ki. Reveal your true power level and saiyan potential.",
    categorySlugs: ["shounen", "scifi"],
    bgUrl: "/banners/dragon-ball-z.png",
    headerUrl: "/headers/dragon-ball-z.png"
  },
  {
    name: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    colorScheme: "purple",
    description: "Master cursed energy. Awaken your innate cursed technique and determine your sorcerer grade.",
    categorySlugs: ["shounen", "supernatural"],
    bgUrl: "/banners/jujutsu-kaisen.png",
    headerUrl: "/headers/jujutsu-kaisen.png"
  },
  {
    name: "Demon Slayer",
    slug: "demon-slayer",
    colorScheme: "red",
    description: "Breathe with focus. Learn your breathing style and join the Demon Slayer Corps.",
    categorySlugs: ["shounen", "supernatural", "adventure"],
    bgUrl: "/banners/demon-slayer.png",
    headerUrl: "/headers/demon-slayer.png"
  }
];
