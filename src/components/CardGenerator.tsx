"use client";

import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";
import { getCardConfig } from "@/lib/cards";
import type { CardResult } from "@/lib/cards";

interface CardGeneratorProps {
  result: CardResult;
  universeSlug: string;
}

export default function CardGenerator({ result, universeSlug }: CardGeneratorProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCard = async () => {
      setLoading(true);
      setError(false);

      // 1. Get universe-specific config from data file
      const config = getCardConfig(universeSlug);

      try {
        // 2. Fetch the SVG template
        const res = await fetch(`/resultcards/${config.svgFile}`);
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);
        let svg = await res.text();

        // 3. Apply all placeholder replacements from the data file
        for (const [token, getValue] of Object.entries(config.placeholders)) {
          const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          svg = svg.replace(new RegExp(escaped, "g"), getValue(result));
        }

        // 4. Inject user portrait if provided and imageRect is defined
        if (result.userImage && config.imageRect) {
          svg = injectPortrait(svg, result.userImage, config.imageRect);
        }

        setSvgContent(svg);
      } catch (err) {
        console.error("[CardGenerator] Failed to load card:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [universeSlug, result]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `puwf-${universeSlug}-${result.userName.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("[CardGenerator] Download failed:", err);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-20">
        <RefreshCw className="w-8 h-8 animate-spin text-puwf-fire" />
        <span className="font-mono text-light-ash/40 text-xs tracking-[0.3em] uppercase animate-pulse">
          Forging artifact...
        </span>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !svgContent) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-20 text-center">
        <span className="text-light-ash/40 font-mono text-sm uppercase tracking-widest">
          Failed to forge artifact. Template not found.
        </span>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl border border-light-ash/10 text-light-ash/60 text-sm hover:border-puwf-fire/40 hover:text-puwf-fire transition-all font-mono"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Card ───────────────────────────────────────────────────────────────────
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[500px] shadow-2xl rounded-lg overflow-hidden border border-light-ash/10 bg-eclipse-black"
        ref={cardRef}
      >
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="w-full h-auto block"
        />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10 w-full max-w-sm sm:w-auto">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-puwf-fire hover:bg-puwf-fire/80 text-white rounded-xl font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-puwf-fire/20"
        >
          <Download size={20} />
          Save Artifact
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-eclipse-black border border-light-ash/10 hover:border-light-ash/30 text-light-ash rounded-xl font-bold tracking-widest uppercase transition-all"
        >
          <RefreshCw size={20} />
          Retake
        </button>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function injectPortrait(
  svg: string,
  base64Img: string,
  rect: { x: number; y: number; w: number; h: number; rx?: number }
): string {
  const clipId = "puwf-portrait-clip";
  const injection = `
    <defs>
      <clipPath id="${clipId}">
        <rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${rect.rx ?? 0}" />
      </clipPath>
    </defs>
    <image
      x="${rect.x}"
      y="${rect.y}"
      width="${rect.w}"
      height="${rect.h}"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#${clipId})"
      href="${base64Img}"
    />
  `;
  // Insert just before the closing </svg>
  return svg.replace(/<\/svg>\s*$/, `${injection}</svg>`);
}
