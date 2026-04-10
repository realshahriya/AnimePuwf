"use client";

import { useEffect, useState } from "react";
import { UNIVERSES } from "@/lib/data";
import { use } from "react";
import CardGenerator from "@/components/CardGenerator";
import AdBanner from "@/components/AdBanner";
import type { CardResult } from "@/lib/cards";
import { motion } from "framer-motion";

type ResultState = CardResult;

export default function PuwfResultPage({ params }: { params: Promise<{ universe: string }> }) {
  const { universe: universeSlug } = use(params);
  const universe = UNIVERSES.find(u => u.slug === universeSlug);
  const [result, setResult] = useState<ResultState | null>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem("puwf_result");
    if (savedResult) {
      const parsed = JSON.parse(savedResult);
      if (parsed) {
        setTimeout(() => setResult(parsed), 0);
      }
    }
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  if (!result) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-light-ash/20 border-t-puwf-fire rounded-full animate-spin mb-6"></div>
        <p className="text-light-ash/50 font-mono tracking-widest uppercase animate-pulse">Syncing matrix...</p>
      </div>
    );
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : `https://animepuwf.com/${universeSlug}/puwf`;
  const shareText = `I got ${result.outcome} in the ${universe?.name ?? universeSlug} universe on Anime Puwf! 🔥 Find out your power ↓`;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${pageUrl}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: "Anime Puwf — My Result", text: shareText, url: pageUrl });
    } catch {
      // user cancelled or unsupported — silently ignore
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = pageUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-12 text-light-ash flex flex-col items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-12"
      >
        <span className="font-mono text-puwf-fire text-sm tracking-[0.3em] uppercase mb-4 block">Process Complete</span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-xl">
          Artifact Forged
        </h1>
        <p className="text-light-ash/40 max-w-lg mx-auto text-sm leading-relaxed">
          Your unique identity within the {universe?.name} universe has been extracted and encoded into this digital relic.
        </p>
      </motion.div>

      <CardGenerator result={result} universeSlug={universeSlug} />

      {/* Ad — square below card, desktop */}
      <div className="hidden md:flex w-full justify-center mt-10">
        <AdBanner type="leaderboard" />
      </div>
      {/* Ad — mobile below card */}
      <div className="flex md:hidden w-full justify-center mt-6">
        <AdBanner type="mobile" />
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-20 opacity-70 md:opacity-50 hover:opacity-100 transition-opacity">
        <div className="p-5 md:p-8 rounded-2xl bg-eclipse-black/40 border border-light-ash/5 backdrop-blur-md">
          <h3 className="font-heading text-xl font-semibold text-white mb-4">Metadata Analysis</h3>
          <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Class</span>
              <span className="text-puwf-fire">{result.resultClass}</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Signature</span>
              <span className="text-white">{result.outcome}</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-light-ash/40">Authority</span>
              <span className="text-white">{result.rank}</span>
            </li>
          </ul>
        </div>

        <div className="p-5 md:p-8 rounded-2xl bg-eclipse-black/40 border border-light-ash/5 backdrop-blur-md flex flex-col justify-center">
          <h3 className="font-heading text-xl font-semibold text-white mb-2">Sharing Protocol</h3>
          <p className="text-light-ash/60 text-sm mb-6 leading-relaxed">
            These artifacts are meant to be displayed. Challenge others and prove your dominance.
          </p>

          {/* Primary share row */}
          <div className="flex gap-3 mb-3">
            <button
              id="share-twitter"
              onClick={handleTwitterShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 border border-white/5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
            >
              {/* X / Twitter logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.396 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
              Twitter / X
            </button>
            <button
              id="share-whatsapp"
              onClick={handleWhatsAppShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 border border-white/5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
            >
              {/* WhatsApp logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </button>
          </div>

          {/* Secondary row — native share (mobile) + copy link */}
          <div className="flex gap-3">
            {canNativeShare && (
              <button
                id="share-native"
                onClick={handleNativeShare}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-puwf-fire/10 hover:bg-puwf-fire/20 border border-puwf-fire/20 rounded-lg text-xs font-bold tracking-widest uppercase transition-all text-puwf-fire"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
            )}
            <button
              id="share-copy"
              onClick={handleCopyLink}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                copied
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 hover:bg-white/10 border-white/5 text-light-ash"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
