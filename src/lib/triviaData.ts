/**
 * triviaData.ts
 * 
 * Per-universe trivia question pools.
 * QuizEngine picks N random questions from these during the Knowledge Test step.
 * 
 * Each question has a correct answer index and an explanation shown after answering.
 */

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // index of correct option
  explanation: string; // shown after user answers
}

// ─── One Piece ────────────────────────────────────────────────────────────────
const ONE_PIECE_TRIVIA: TriviaQuestion[] = [
  {
    id: "op1",
    question: "What is the name of Luffy's signature attack?",
    options: ["Gum-Gum Pistol", "Diable Jambe", "Shishi Sonson", "Kenbunshoku Haki"],
    correct: 0,
    explanation: "Gomu Gomu no Pistol — Luffy stretches his fist and rockets it into enemies like a bullet."
  },
  {
    id: "op2",
    question: "Which sea does the Grand Line divide?",
    options: ["North and South Blue", "East and West Blue", "All Four Blues", "Red Line and New World"],
    correct: 2,
    explanation: "The Grand Line cuts through all four seas: East Blue, West Blue, North Blue, and South Blue."
  },
  {
    id: "op3",
    question: "What is the rarest and most powerful type of Haki?",
    options: ["Armament Haki", "Observation Haki", "Conqueror's Haki", "Supreme King Haki"],
    correct: 2,
    explanation: "Haoshoku (Conqueror's) Haki — only 1 in a million people are born with it."
  },
  {
    id: "op4",
    question: "Who is the World's Greatest Swordsman in One Piece?",
    options: ["Zoro Roronoa", "Dracule Mihawk", "Silvers Rayleigh", "Shanks"],
    correct: 1,
    explanation: "Dracule Mihawk holds the title — Zoro's ultimate goal is to surpass him."
  },
  {
    id: "op5",
    question: "What Devil Fruit did Portgas D. Ace eat?",
    options: ["Mera Mera no Mi", "Hie Hie no Mi", "Goro Goro no Mi", "Magu Magu no Mi"],
    correct: 0,
    explanation: "Mera Mera no Mi (Flame-Flame Fruit) — later inherited by Sabo."
  },
  {
    id: "op6",
    question: "What is the bounty amount considered legendary in the Grand Line era?",
    options: ["100 Million Berries", "500 Million Berries", "1 Billion Berries", "4 Billion Berries"],
    correct: 2,
    explanation: "1 Billion Berries — earning a 1B+ bounty marks you as a true Emperor-tier threat."
  },
  {
    id: "op7",
    question: "Which island is considered the 'Last Island' of the Grand Line?",
    options: ["Marineford", "Whole Cake Island", "Laugh Tale", "Wano Country"],
    correct: 2,
    explanation: "Laugh Tale — where Gol D. Roger left the One Piece treasure, only reached by those who read the Poneglyphs."
  },
];

// ─── Naruto ───────────────────────────────────────────────────────────────────
const NARUTO_TRIVIA: TriviaQuestion[] = [
  {
    id: "na1",
    question: "What tailed beast is sealed inside Naruto Uzumaki?",
    options: ["Eight-Tails", "Nine-Tails", "Three-Tails", "One-Tail"],
    correct: 1,
    explanation: "Kurama, the Nine-Tailed Fox — sealed inside Naruto at birth by his father Minato."
  },
  {
    id: "na2",
    question: "Which eye technique is exclusive to the Uchiha clan?",
    options: ["Byakugan", "Rinnegan", "Sharingan", "Jogan"],
    correct: 2,
    explanation: "The Sharingan — a dojutsu that awakens through strong emotion in Uchiha clan members."
  },
  {
    id: "na3",
    question: "What is the name of the village hidden in the leaves?",
    options: ["Sunagakure", "Kumogakure", "Konohagakure", "Kirigakure"],
    correct: 2,
    explanation: "Konohagakure no Sato — the Hidden Leaf Village, Naruto's home."
  },
  {
    id: "na4",
    question: "Which character is known as 'The Copy Ninja'?",
    options: ["Itachi Uchiha", "Kakashi Hatake", "Minato Namikaze", "Obito Uchiha"],
    correct: 1,
    explanation: "Kakashi Hatake — he copied over 1000 jutsu using his Sharingan gifted by Obito."
  },
  {
    id: "na5",
    question: "What is Naruto's signature jutsu?",
    options: ["Chidori", "Rasengan", "Shadow Clone Jutsu", "Eight Gates"],
    correct: 1,
    explanation: "The Rasengan — created by his father Minato, perfected and evolved by Naruto."
  },
  {
    id: "na6",
    question: "Which organization hunts Jinchuriki for their tailed beasts?",
    options: ["Anbu Black Ops", "Akatsuki", "The Seven Swordsmen", "Root"],
    correct: 1,
    explanation: "Akatsuki — led by Pain/Nagato, aiming to capture all nine tailed beasts."
  },
  {
    id: "na7",
    question: "What is the final stage of the Sharingan evolution?",
    options: ["Mangekyo Sharingan", "Eternal Mangekyo", "Rinnegan", "Rinne Sharingan"],
    correct: 3,
    explanation: "The Rinne Sharingan — possessed by the Sage of Six Paths and Kaguya, the ultimate ocular jutsu."
  },
];

// ─── Dragon Ball Z ────────────────────────────────────────────────────────────
const DBZ_TRIVIA: TriviaQuestion[] = [
  {
    id: "dbz1",
    question: "What is Goku's Saiyan birth name?",
    options: ["Bardock", "Raditz", "Kakarot", "Turles"],
    correct: 2,
    explanation: "Kakarot — Goku's Saiyan name given at birth on Planet Vegeta."
  },
  {
    id: "dbz2",
    question: "What does the Dragon Balls wish require in Dragon Ball Z?",
    options: ["One wish per ball", "One wish total", "Three wishes", "Seven wishes"],
    correct: 2,
    explanation: "Shenron grants one wish per summoning in DBZ, but Porunga (Namekian dragon) grants three."
  },
  {
    id: "dbz3",
    question: "What is the name of Vegeta's signature energy blast?",
    options: ["Kamehameha", "Final Flash", "Galick Gun", "Big Bang Attack"],
    correct: 2,
    explanation: "Galick Gun — Vegeta's signature blast, first used against Goku during the Saiyan Saga."
  },
  {
    id: "dbz4",
    question: "Which transformation did Gohan unlock fighting Cell?",
    options: ["Super Saiyan 2", "Super Saiyan 3", "Super Saiyan Blue", "Ultra Instinct"],
    correct: 0,
    explanation: "Super Saiyan 2 — Gohan was the first character ever to achieve SSJ2, powered by rage."
  },
  {
    id: "dbz5",
    question: "What is the power level of a regular Saiyan soldier?",
    options: ["Under 1,000", "Around 5,000", "Over 10,000", "Around 8,000"],
    correct: 0,
    explanation: "Regular Saiyan soldiers had power levels below 1,000. Raditz had 1,200 — considered average."
  },
  {
    id: "dbz6",
    question: "Who trained Goku and Krillin at the Kame House?",
    options: ["Kami", "Roshi", "King Kai", "Popo"],
    correct: 1,
    explanation: "Master Roshi (Kame Sennin) — the Turtle Hermit who first taught Goku the Kamehameha."
  },
];

// ─── Demon Slayer ─────────────────────────────────────────────────────────────
const DEMON_SLAYER_TRIVIA: TriviaQuestion[] = [
  {
    id: "ds1",
    question: "What is the name of Tanjiro's signature breathing style?",
    options: ["Flame Breathing", "Water Breathing", "Sun Breathing", "Thunder Breathing"],
    correct: 1,
    explanation: "Water Breathing — taught by Sakonji Urokodaki, later Tanjiro awakens the original Hinokami Kagura (Sun Breathing)."
  },
  {
    id: "ds2",
    question: "Who is the Flame Hashira at the start of the series?",
    options: ["Kyojuro Rengoku", "Shinjuro Rengoku", "Mitsuri Kanroji", "Akaza"],
    correct: 0,
    explanation: "Kyojuro Rengoku — the passionate Flame Hashira who dies protecting passengers on the Mugen Train."
  },
  {
    id: "ds3",
    question: "What is the highest rank in the Twelve Kizuki demon hierarchy?",
    options: ["Upper Moon One", "Lower Moon Six", "Upper Moon Three", "Muzan's Guard"],
    correct: 0,
    explanation: "Upper Moon One — Kokushibo, a former Demon Slayer and twin of Yoriichi Tsugikuni."
  },
  {
    id: "ds4",
    question: "What ore is used to forge Demon Slayer swords?",
    options: ["Iron Sand", "Scarlet Crimson Iron Sand", "Wisteria Steel", "Tamahagane"],
    correct: 1,
    explanation: "Scarlet Crimson Iron Sand and Scarlet Crimson Ore — mined by Swordsmith Village artisans."
  },
  {
    id: "ds5",
    question: "What is Zenitsu's one mastered Thunder Breathing technique?",
    options: ["Third Form", "First Form: Thunderclap and Flash", "Seventh Form: Flaming Thunder God", "Second Form"],
    correct: 1,
    explanation: "First Form: Thunderclap and Flash — Zenitsu can only use this one form but at god-speed, enhanced by variants."
  },
  {
    id: "ds6",
    question: "What kills demons instantly in Demon Slayer?",
    options: ["Sunlight or decapitation by Nichirin blade", "Water attacks only", "Poison", "Wisteria flowers alone"],
    correct: 0,
    explanation: "Sunlight or decapitation with a Nichirin blade — wisteria weakens but doesn't kill."
  },
];

// ─── Jujutsu Kaisen ───────────────────────────────────────────────────────────
const JJK_TRIVIA: TriviaQuestion[] = [
  {
    id: "jjk1",
    question: "What cursed spirit did Yuji Itadori consume to gain power?",
    options: ["Hanami", "Jogo", "Ryomen Sukuna", "Mahito"],
    correct: 2,
    explanation: "Ryomen Sukuna — the King of Curses, sealed in 20 fingers across history."
  },
  {
    id: "jjk2",
    question: "What is Gojo Satoru's most powerful domain expansion?",
    options: ["Coffin of the Iron Mountain", "Self-Embodiment of Perfection", "Unlimited Void", "Chimera Shadow Garden"],
    correct: 2,
    explanation: "Unlimited Void — traps enemies inside infinite information overload, paralyzing the brain."
  },
  {
    id: "jjk3",
    question: "Which school do sorcerers attend to develop their cursed techniques?",
    options: ["Tokyo Prefectural Jujutsu High School", "Gojo Academy", "Kyoto Curse School", "Culling Council"],
    correct: 0,
    explanation: "Tokyo Jujutsu High — one of two jujutsu schools in Japan, led by Principal Yaga."
  },
  {
    id: "jjk4",
    question: "What grade is the highest in the Jujutsu sorcerer ranking system?",
    options: ["Grade 1", "Special Grade 1", "Special Grade", "Grade S"],
    correct: 2,
    explanation: "Special Grade — reserved for the most dangerous sorcerers like Gojo and Yuta, or cursed spirits."
  },
  {
    id: "jjk5",
    question: "What technique does Megumi Fushiguro primarily use?",
    options: ["Blood Manipulation", "Ten Shadows Technique", "Projection Sorcery", "Body Repel"],
    correct: 1,
    explanation: "Ten Shadows Technique — summons divine shikigami through shadow, inherited from the Zenin clan."
  },
  {
    id: "jjk6",
    question: "What is the name of Yuji Itadori's school before jujutsu training?",
    options: ["Sendai High", "Sugisawa Municipal High School", "Kyoto High", "Jujutsu High"],
    correct: 1,
    explanation: "Sugisawa Municipal High School No. 3 — where Yuji broke shot-put records before his life changed."
  },
];

// ─── Registry ─────────────────────────────────────────────────────────────────

export const TRIVIA_DATA: Record<string, TriviaQuestion[]> = {
  "one-piece":      ONE_PIECE_TRIVIA,
  "naruto":         NARUTO_TRIVIA,
  "dragon-ball-z":  DBZ_TRIVIA,
  "demon-slayer":   DEMON_SLAYER_TRIVIA,
  "jujutsu-kaisen": JJK_TRIVIA,
};

/**
 * Returns N randomly selected trivia questions for a universe.
 * Shuffles the pool so every run is different.
 */
export function getRandomTrivia(universeSlug: string, count = 3): TriviaQuestion[] {
  const pool = TRIVIA_DATA[universeSlug] ?? ONE_PIECE_TRIVIA;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
