import { UNIVERSES } from "@/lib/data";
import { QUIZ_DATA } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";

export default async function PuwfEnginePage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = await params;
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  
  if (!universe) return notFound();

  const questions = QUIZ_DATA[universeSlug] || [];

  if (questions.length === 0) {
    return (
      <div className="w-full flex-grow flex items-center justify-center text-center px-6">
        <p className="text-light-ash/50 font-mono tracking-widest uppercase">
          Quiz matrix for this universe is currently down.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <QuizEngine 
        universeSlug={universeSlug} 
        questions={questions} 
        colorScheme={universe.colorScheme} 
      />
    </div>
  );
}
