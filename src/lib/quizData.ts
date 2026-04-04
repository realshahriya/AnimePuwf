export interface AnswerOption {
  text: string;
  points: Record<string, number>; // Maps to specific class/ability results mathematically
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: AnswerOption[];
}

/**
 * Universal Real-Life Personality Questions
 * 1 -> Dominant / High Impact / Logia / Saiyan / Uzumaki (The Powerhouse)
 * 2 -> Analytical / Strategic / Paramecia / Uchiha / Gojo (The Tactician)
 * 3 -> Resilient / Adaptive / Zoan / Namekian / Zenin (The Survivor/Support)
 */

const PERSONALITY_QUESTIONS: QuizQuestion[] = [
  {
    id: "personality",
    text: "Which of these best describes your core personality?",
    options: [
      { text: "Bold, passionate, and always charging forward.", points: { type1: 5 } },
      { text: "Calm, analytical, and highly strategic.", points: { type2: 5 } },
      { text: "Loyal, adaptable, and deeply protective of others.", points: { type3: 5 } }
    ]
  }
];

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  "one-piece": PERSONALITY_QUESTIONS.map(q => ({
    ...q,
    options: q.options.map(o => ({
      ...o,
      points: {
        logia: o.points.type1 || 0,
        paramecia: o.points.type2 || 0,
        zoan: o.points.type3 || 0
      }
    }))
  })),
  "naruto": PERSONALITY_QUESTIONS.map(q => ({
    ...q,
    options: q.options.map(o => ({
      ...o,
      points: {
        uzumaki: o.points.type1 || 0,
        uchiha: o.points.type2 || 0,
        hyuga: o.points.type3 || 0
      }
    }))
  })),
  "dragon-ball-z": PERSONALITY_QUESTIONS.map(q => ({
    ...q,
    options: q.options.map(o => ({
      ...o,
      points: {
        saiyan: o.points.type1 || 0,
        android: o.points.type2 || 0,
        namekian: o.points.type3 || 0
      }
    }))
  })),
  "jujutsu-kaisen": PERSONALITY_QUESTIONS.map(q => ({
    ...q,
    options: q.options.map(o => ({
      ...o,
      points: {
        gojo: o.points.type1 || 0,
        zenin: o.points.type2 || 0,
        kamo: o.points.type3 || 0
      }
    }))
  })),
  "demon-slayer": PERSONALITY_QUESTIONS.map(q => ({
    ...q,
    options: q.options.map(o => ({
      ...o,
      points: {
        flame: o.points.type1 || 0,
        thunder: o.points.type2 || 0,
        water: o.points.type3 || 0
      }
    }))
  }))
};
