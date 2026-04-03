import Link from 'next/link';

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-[60vh] py-8 px-6">
      <div className="flex justify-center gap-10 border-b border-light-ash/10 pb-6 mb-10 mt-4 overflow-x-auto">
        <Link href="/leaderboard/global" className="text-light-ash/80 hover:text-puwf-fire font-heading font-bold text-2xl transition-colors whitespace-nowrap">
          Global Rankings
        </Link>
        <Link href="/leaderboard/bounties" className="text-light-ash/80 hover:text-puwf-fire font-heading font-bold text-2xl transition-colors whitespace-nowrap">
          Highest Bounties
        </Link>
        <Link href="/leaderboard/power" className="text-light-ash/80 hover:text-puwf-fire font-heading font-bold text-2xl transition-colors whitespace-nowrap">
          Top Power Levels
        </Link>
      </div>
      <div className="flex-grow w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
