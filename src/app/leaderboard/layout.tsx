import PageSubNav from "@/components/PageSubNav";

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  const leaderboardLinks = [
    { label: "Global Rankings", href: "/leaderboard/global" },
    { label: "Highest Bounties", href: "/leaderboard/bounties" },
    { label: "Top Power Levels", href: "/leaderboard/power" }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen pt-24 md:pt-32">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col flex-grow">
        <PageSubNav links={leaderboardLinks} />
        
        <div className="flex-grow w-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
