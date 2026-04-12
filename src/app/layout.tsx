import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});
const barlowCondensed = Barlow_Condensed({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Anime Puwf | Discover Your Power",
  description: "A personality-powered anime ability generator.",
  keywords: [
    "animepuwf",
    "AnimePuwf",
    "animepuwf.xyz",
    "animepuwf.io",
    "animepuwf.com",
    "Anime Forge",
    "Anime Forge Power Generator",
    "Anime Forge Ability Generator",
    "Anime Forge Personality Test",
    "Anime Forge Quiz",
    "Anime Forge Power",
    "Anime Forge Ability",
    "Anime Forge Personality",
    "Anime Puwf",
    "Anime Power Generator",
    "Anime Ability Generator",
    "Anime Personality Test",
    "Anime Quiz",
    "Anime Power",
    "Anime Ability",
    "Anime Personality",
    "Anime Power Generator",
    "Anime Ability Generator",
    "Anime Personality Generator",
    "Anime Power Test",
    "anime",
    "anime power generator",
    "anime ability generator",
    "anime personality test",
    "anime quiz",
    "demon slayer breath style",
    "jujutsu kaisen cursed technique",
    "one piece devil fruit",
    "hunter x hunter nen type",
    "naruto chakra nature",
    "superpower generator",
    "otaku",
    "weeb"
  ],
  icons: {
    icon: [
      { url: "/anime_puwf_icon_only.svg", type: "image/svg+xml" },
      { url: "/anime_puwf_icon_only.png", type: "image/png" },
    ],
    shortcut: "/anime_puwf_icon_only.ico",
    apple: "/anime_puwf_icon_only.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${barlowCondensed.variable} font-sans`}>
      <body className="antialiased bg-eclipse-black text-light-ash min-h-screen overflow-x-hidden flex flex-col relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-puwf-fire/15 via-eclipse-black to-eclipse-black"></div>
        <Navbar />
        <div className="relative z-10 flex-grow flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
      <SpeedInsights/>
    </html>
  );
}
