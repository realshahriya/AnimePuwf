"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";

interface AdBannerProps {
  type?: "leaderboard" | "square" | "mobile";
  className?: string;
}

const ADS = {
  leaderboard: { key: "88f3cbcab548e0f6bf4b7c338ce13984", width: 728, height: 90 },
  square:      { key: "1cdf68afed39325f413876e96d27c2d6", width: 300, height: 250 },
  mobile:      { key: "c5b9682a5b952f2b2df249fe4360301e", width: 320, height: 50  },
};

function injectAd(container: HTMLDivElement, key: string, width: number, height: number) {
  // Clear any previous content
  container.innerHTML = "";

  // 1. Set atOptions on window synchronously BEFORE the invoke script runs
  (window as unknown as Record<string, unknown>).atOptions = {
    key,
    format: "iframe",
    height,
    width,
    params: {},
  };

  // 2. Inject invoke script directly INTO the container div
  //    The ad network reads atOptions and writes the iframe as a sibling/child of this script
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
  // No async — must execute synchronously so atOptions is in scope
  container.appendChild(script);
}

export default function AdBanner({ type = "leaderboard", className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  const ad = ADS[type];

  let wrapperStyles = "w-full max-w-[728px] h-[90px]";
  if (type === "mobile") wrapperStyles = "w-full max-w-[320px] h-[50px] mx-auto";
  if (type === "square") wrapperStyles = "w-full h-full";

  useEffect(() => {
    if (!containerRef.current || injected.current) return;
    injected.current = true;
    injectAd(containerRef.current, ad.key, ad.width, ad.height);

    return () => {
      injected.current = false;
      if (containerRef.current) containerRef.current.innerHTML = "";
      delete (window as unknown as Record<string, unknown>).atOptions;
    };
  }, [ad.key, ad.width, ad.height]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl ${wrapperStyles} ${className}`}>
      {/* Advertisement label */}
      <div className="absolute top-0 right-0 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-bl-lg flex items-center gap-1 z-20">
        <span className="text-[10px] text-light-ash/30 uppercase tracking-widest font-semibold">Advertisement</span>
        <Info className="w-3 h-3 text-light-ash/20" />
      </div>

      {/* Ad injection target — iframe renders HERE */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      />

      {/* === Blending overlays (pointer-events-none) === */}

      {/* 1. Dark vignette ring */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-xl"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,12,0.75) 100%)" }}
      />
      {/* 2. Top & bottom edge fade */}
      <div className="absolute inset-x-0 top-0 h-4 z-10 pointer-events-none bg-gradient-to-b from-eclipse-black/60 to-transparent rounded-t-xl" />
      <div className="absolute inset-x-0 bottom-0 h-4 z-10 pointer-events-none bg-gradient-to-t from-eclipse-black/60 to-transparent rounded-b-xl" />
      {/* 3. Subtle dark tint */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-xl bg-eclipse-black/20" />
      {/* 4. Border glow */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-xl border border-light-ash/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
    </div>
  );
}
