import Link from 'next/link';

export default function TrendingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-[60vh] py-8 px-6">
      <div className="flex items-center gap-8 border-b border-light-ash/10 pb-6 mb-8 mt-4 overflow-x-auto">
        <Link href="/trending/abilities" className="text-light-ash hover:text-puwf-fire font-heading font-bold text-xl transition-colors whitespace-nowrap">
          Top Abilities
        </Link>
        <Link href="/trending/cards" className="text-light-ash hover:text-puwf-fire font-heading font-bold text-xl transition-colors whitespace-nowrap">
          Shared Cards
        </Link>
        <Link href="/trending/bounties" className="text-light-ash hover:text-puwf-fire font-heading font-bold text-xl transition-colors whitespace-nowrap">
          Viral Bounties
        </Link>
      </div>
      <div className="flex-grow w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
