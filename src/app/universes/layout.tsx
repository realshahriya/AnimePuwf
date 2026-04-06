import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';

export default function UniversesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-[60vh] pt-32 pb-8 px-6">
      <div className="flex justify-start gap-4 md:gap-8 border-b border-light-ash/10 pb-4 md:pb-6 mb-6 md:mb-8 mt-2 md:mt-4 overflow-x-auto scrollbar-none">
        {CATEGORIES.map(cat => (
          <Link 
            key={cat.slug} 
            href={`/universes/${cat.slug}`} 
            className="text-light-ash/80 hover:text-puwf-fire font-heading font-bold text-xl transition-colors whitespace-nowrap"
          >
            {cat.name}
          </Link>
        ))}
      </div>
      <div className="flex-grow w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
