"use client";

import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import { PuwfResult } from "@/lib/quizEngine";
import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";

interface CardGeneratorProps {
  result: PuwfResult & { userName: string; job?: string; hobby?: string; favCharacter?: string; userImage?: string };
  universeSlug: string;
}

export default function CardGenerator({ result, universeSlug }: CardGeneratorProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const fileName = getSvgFileName(universeSlug);
        const response = await fetch(`/resultcards/${fileName}`);
        let text = await response.text();

        text = replacePlaceholders(text, result, universeSlug);
        
        if (result.userImage) {
          text = injectUserImage(text, result.userImage, universeSlug);
        }

        setSvgContent(text);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load SVG:", error);
        setLoading(false);
      }
    };

    loadSvg();
  }, [universeSlug, result]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `puwf-${universeSlug}-${result.userName.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-20">
        <RefreshCw className="w-8 h-8 animate-spin text-puwf-fire" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px] shadow-2xl rounded-lg overflow-hidden border border-light-ash/10 bg-eclipse-black"
        ref={cardRef}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: svgContent }} 
          className="w-full h-auto block"
        />
      </motion.div>

      <div className="flex gap-4 mt-10">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-4 bg-puwf-fire hover:bg-puwf-fire/80 text-white rounded-xl font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-puwf-fire/20"
        >
          <Download size={20} />
          Save Artifact
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-8 py-4 bg-eclipse-black border border-light-ash/10 hover:border-light-ash/30 text-light-ash rounded-xl font-bold tracking-widest uppercase transition-all"
        >
          <RefreshCw size={20} />
          Retake
        </button>
      </div>
    </div>
  );
}

function getSvgFileName(slug: string): string {
  const map: Record<string, string> = {
    "one-piece": "anime_puwf_bounty_poster_skeleton.svg",
    "naruto": "anime_puwf_bingo_book_skeleton.svg",
    "dragon-ball-z": "anime_puwf_dbz_scouter_skeleton.svg",
    "demon-slayer": "anime_puwf_demon_slayer_corps_record.svg",
    "jujutsu-kaisen": "anime_puwf_jjk_sorcerer_file.svg"
  };
  return map[slug] || "anime_puwf_bounty_poster_skeleton.svg";
}

function replacePlaceholders(svg: string, result: PuwfResult & { userName: string; job?: string; hobby?: string; favCharacter?: string }, slug: string): string {
  let processed = svg;
  
  const formattedJob = result.job ? `The ${result.job}`.toUpperCase() : "THE WANDERER";
  const formattedHobby = result.hobby ? `Master of ${result.hobby}` : "Unknown Jutsu";

  // Global replacements
  processed = processed.replace(/\[ User Name \]/g, result.userName.toUpperCase());
  processed = processed.replace(/\[ Name \]/g, result.userName.toUpperCase());

  // Universe specific
  if (slug === "one-piece") {
    processed = processed.replace(/\[ Devil Fruit Ability \]/g, result.outcome);
    processed = processed.replace(/\[ \?,\?\?\?,\?\?\?,\?\?\? \]/g, result.rank || "Unknown");
    // Maybe replace some generic text with their fav character connection if available
    if (result.favCharacter) {
       processed = processed.replace(/DEAD OR ALIVE/, `RIVAL TO ${result.favCharacter.toUpperCase()}`);
    }
  } else if (slug === "naruto") {
    processed = processed.replace(/\[ e\.g\. Copy Ninja \]/g, formattedJob);
    processed = processed.replace(/\[ Hidden Village \]/g, "The Hidden Forge");
    processed = processed.replace(/\[ S \/ A \/ B \/ C \]/g, result.rank || "A-Rank");
    processed = processed.replace(/\[ EXTREME \]/g, "THREAT: HIGH");
    processed = processed.replace(/\[ Fire \/ Wind \/ Lightning \/ Earth \/ Water \]/g, result.resultClass.toUpperCase());
    processed = processed.replace(/\[ Generated Ability Name \]/g, result.outcome);
    processed = processed.replace(/\[ Jutsu 1 \]/g, formattedHobby);
    processed = processed.replace(/\[ Jutsu 2 \]/g, "Style: Puwf Strike");
    if (result.favCharacter) {
      processed = processed.replace(/\[ Jutsu 3 \]/g, `Student of ${result.favCharacter}`);
    } else {
      processed = processed.replace(/\[ Jutsu 3 \]/g, "Sealing Art: Artifact");
    }
  }

  return processed;
}

function injectUserImage(svg: string, base64Img: string, slug: string): string {
  // Define where the image should go based on the template
  let rect = { x: 0, y: 0, w: 0, h: 0, rx: 0 };
  
  if (slug === "one-piece") {
    rect = { x: 130, y: 178, w: 420, h: 310, rx: 4 };
  } else if (slug === "naruto") {
    rect = { x: 104, y: 156, w: 180, h: 200, rx: 4 };
  } else {
    return svg; // Defaults if templates aren't ready
  }

  const imageTag = `
    <defs>
      <clipPath id="user-photo-clip">
        <rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${rect.rx}" />
      </clipPath>
    </defs>
    <image 
      x="${rect.x}" 
      y="${rect.y}" 
      width="${rect.w}" 
      height="${rect.h}" 
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#user-photo-clip)" 
      href="${base64Img}" 
    />
  `;

  // Insert just before the closing </svg> tag
  return svg.replace(/<\/svg>\s*$/, `${imageTag}</svg>`);
}
