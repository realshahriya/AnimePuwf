import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center text-center pt-32 md:pt-48 pb-20 md:pb-40 px-4 relative overflow-hidden">

      {/* Background Graphic Engine */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Anime Puwf Core"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 mix-blend-lighten"
        />
        {/* Heavy fade gradients to seamlessly blend the image into the page's global dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black via-eclipse-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-eclipse-black via-transparent to-eclipse-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-puwf-fire/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Front Hero Text Content */}
      <div className="relative z-10 flex flex-col items-center max-w-7xl">
        {/* CTA/Alert -> Battle Red */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aura-gold/10 text-aura-gold text-sm font-semibold mb-12 border border-aura-gold/30 shadow-[0_0_20px_rgba(255,214,0,0.2)] backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aura-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-aura-gold"></span>
          </span>
          V1.01 Early Access LiveV1.0 Early Access Live
        </div>

        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-white mb-8 drop-shadow-2xl">
          Discover Your Inner <br className="hidden md:block" />
          {/* Brand => Puwf Fire / Aura Gold */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-puwf-fire via-orange-500 to-aura-gold drop-shadow-[0_0_30px_rgba(255,107,0,0.5)]">
            Anime Power
          </span>
        </h1>

        {/* Body text => Light Ash */}
        <p className="text-light-ash/90 text-lg md:text-2xl max-w-3xl mb-12 leading-relaxed drop-shadow-md px-2 opacity-80">
          Select your favorite universe, take the personality puwf test, and unveil your unique ability and bounty. Claim your digital ID card and share it with the world.
        </p>
      </div>
    </section>
  );
}
