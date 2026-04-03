import Link from "next/link";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-light-ash/10 bg-eclipse-black/80 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-50">
          <Flame className="w-5 h-5 text-puwf-fire" />
          <span className="font-heading font-bold text-lg tracking-wide text-light-ash">
            AnimePuwf
          </span>
        </div>
        
        <p className="text-light-ash/40 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Anime Puwf. Built for the community.
        </p>

        <div className="flex gap-4 opacity-50">
          <Link href="/terms" className="text-light-ash hover:text-puwf-fire text-sm transition-colors">Terms</Link>
          <Link href="/privacy" className="text-light-ash hover:text-puwf-fire text-sm transition-colors">Privacy</Link>
          <Link href="/contact" className="text-light-ash hover:text-puwf-fire text-sm transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
