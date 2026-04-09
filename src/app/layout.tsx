import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Anime Puwf | Discover Your Power",
  description: "A personality-powered anime ability generator.",
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-eclipse-black text-light-ash font-sans min-h-screen overflow-x-hidden flex flex-col relative`}>
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
