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
    id: "q1",
    text: "When you start a new personal project, what is your first move?",
    options: [
      { text: "Dive in headfirst and figure it out as I go.", points: { type1: 3, type3: 1 } },
      { text: "Spend days researching and planning every detail.", points: { type2: 3, type1: 1 } },
      { text: "Gather a group of peers to brainstorm ideas together.", points: { type3: 3, type2: 1 } }
    ]
  },
  {
    id: "q2",
    text: "In a high-pressure situation, which of these best describes you?",
    options: [
      { text: "The person who takes command and makes the big calls.", points: { type1: 3, type2: 1 } },
      { text: "The one who stays cool, calm, and analyzes the threat.", points: { type2: 3, type3: 1 } },
      { text: "The one who steps in to support others and ensure everyone's safety.", points: { type3: 3, type1: 1 } }
    ]
  },
  {
    id: "q3",
    text: "What motivates you most when you're working toward a goal?",
    options: [
      { text: "Achieving mastery and becoming the absolute best.", points: { type1: 3, type2: 1 } },
      { text: "Understanding the underlying rules and core systems.", points: { type2: 3, type3: 1 } },
      { text: "Feeling like I'm part of something bigger than myself.", points: { type3: 3, type1: 1 } }
    ]
  },
  {
    id: "q4",
    text: "When facing a difficult confrontation, how do you handle it?",
    options: [
      { text: "Direct confrontation; speak my truth immediately.", points: { type1: 3, type3: 1 } },
      { text: "Strategic negotiation; find a win-win or a tactical exit.", points: { type2: 3, type1: 1 } },
      { text: "Patience and redirection; wait for the right moment.", points: { type3: 3, type2: 1 } }
    ]
  },
  {
    id: "q5",
    text: "Which environment do you feel most comfortable in?",
    options: [
      { text: "A fast-paced, high-energy world of constant motion.", points: { type1: 3, type2: 1 } },
      { text: "A quiet, well-organized space where I can focus deeply.", points: { type2: 3, type3: 1 } },
      { text: "A thriving natural or collaborative setting with deep roots.", points: { type3: 3, type1: 1 } }
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
