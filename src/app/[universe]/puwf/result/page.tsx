import { UNIVERSES } from "@/lib/data";

export default async function PuwfResultPage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = await params;
  const universe = UNIVERSES.find(u => u.slug === universeSlug);

  return (
    <main className="w-full max-w-5xl mx-auto px-6 text-light-ash flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="font-heading text-4xl font-bold text-white mb-6">Puwf Evaluation Complete</h2>
      <div className="w-full max-w-sm border border-dashed border-light-ash/20 rounded-2xl p-12 flex flex-col items-center justify-center bg-eclipse-black/40 backdrop-blur-md">
        <p className="font-mono text-puwf-fire tracking-widest uppercase text-sm mb-4">Generating Digital Artifact ID</p>
        <p className="text-light-ash/50 text-sm text-center">Result mathematics and card generation will occur here in Phase 3.</p>
      </div>
    </main>
  );
}
