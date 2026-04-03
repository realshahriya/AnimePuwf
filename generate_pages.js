const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'latest', title: 'Latest Quizzes' },
  { path: 'featured', title: 'Featured Generators' },
  { path: 'random', title: 'Random Surprise' },
  { path: 'trending', title: 'Trending Hub' },
  { path: 'trending/abilities', title: 'Top Abilities Today' },
  { path: 'trending/cards', title: 'Most Shared Cards' },
  { path: 'trending/bounties', title: 'Viral Bounties' },
  { path: 'leaderboard', title: 'Leaderboards' },
  { path: 'leaderboard/global', title: 'Global Rankings' },
  { path: 'leaderboard/bounties', title: 'Highest Bounties' },
  { path: 'leaderboard/power', title: 'Top Power Levels' },
];

const basePath = path.join(__dirname, 'src', 'app');

routes.forEach(route => {
  const dir = path.join(basePath, route.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  let componentName = route.path.split('/').map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, '')).join('');
  
  const content = `import React from 'react';\n\nexport default function ${componentName}Page() {\n  return (\n    <main className="w-full max-w-7xl mx-auto px-6 py-20 flex-grow text-light-ash text-center">\n      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-puwf-fire drop-shadow-md">${route.title}</h1>\n      <p className="text-light-ash/70 text-lg">Coming soon as we expand Anime Puwf!</p>\n    </main>\n  );\n}`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Dynamic Universe Route
const uniDir = path.join(basePath, '[universe]');
if (!fs.existsSync(uniDir)) fs.mkdirSync(uniDir, { recursive: true });
const uniPageContent = `export default function UniversePage({ params }: { params: { universe: string } }) {
  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-20 flex-grow text-light-ash flex flex-col items-center text-center">
      <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-puwf-fire capitalize drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
        {params.universe.replace(/-/g, ' ')}
      </h1>
      <p className="text-light-ash/80 text-xl max-w-2xl mb-12 leading-relaxed">
        Step into the puwf. Answer the following personality metrics truthfully to align your spiritual pressure and uncover your destined tier.
      </p>
      
      <div className="w-full max-w-md bg-eclipse-black border border-light-ash/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-light-ash/70 text-left">Enter Your Alias</label>
          <input 
            type="text" 
            placeholder="Ninja Name..." 
            className="w-full bg-eclipse-black border border-light-ash/20 rounded-lg py-3 px-4 text-light-ash focus:outline-none focus:border-puwf-fire transition-colors placeholder:text-light-ash/20"
          />
          <button className="mt-4 px-6 py-4 bg-puwf-fire text-eclipse-black font-bold uppercase tracking-wide rounded-lg hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,107,0,0.4)]">
            Commence Puwf
          </button>
        </div>
      </div>
    </main>
  );
}`;
fs.writeFileSync(path.join(uniDir, 'page.tsx'), uniPageContent);

const uniLayoutContent = `export default function UniverseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full flex-grow flex flex-col items-center">
      <div className="w-full bg-puwf-fire/5 border-b border-puwf-fire/20 py-1 text-center text-[10px] text-puwf-fire tracking-[0.2em] uppercase font-mono shadow-sm">
        Simulation Matrix Active
      </div>
      {children}
    </div>
  );
}`;
fs.writeFileSync(path.join(uniDir, 'layout.tsx'), uniLayoutContent);

console.log('✅ Generated all sub-route shells successfully.');
