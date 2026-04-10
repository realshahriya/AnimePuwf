import PageSubNav from "@/components/PageSubNav";

export default function TrendingLayout({ children }: { children: React.ReactNode }) {
  const trendingLinks = [
    { label: "Top Abilities", href: "/trending/abilities" },
    { label: "Shared Cards", href: "/trending/cards" },
    { label: "Viral Bounties", href: "/trending/bounties" }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen pt-24 md:pt-32">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col flex-grow">
        <PageSubNav links={trendingLinks} />
        
        <div className="flex-grow w-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
