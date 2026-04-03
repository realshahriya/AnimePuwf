export default function ContactPage() {
  return (
    <main className="w-full max-w-2xl mx-auto px-6 py-20 flex-grow text-light-ash flex flex-col items-center text-center">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-puwf-fire">Contact Us</h1>
      <p className="text-light-ash/80 text-lg mb-12">
        Have a bug to report, a new universe suggestion, or a business inquiry? Send us a raven or an email!
      </p>

      <div className="w-full bg-eclipse-black border border-light-ash/10 rounded-2xl p-8 shadow-xl">
        <form className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-sm font-medium mb-2 text-light-ash/70">Your Email</label>
            <input 
              type="email" 
              placeholder="ninja@hiddenleaf.com" 
              className="w-full bg-eclipse-black border border-light-ash/20 rounded-lg py-3 px-4 text-light-ash focus:outline-none focus:border-puwf-fire transition-colors placeholder:text-light-ash/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-light-ash/70">Message</label>
            <textarea 
              rows={5}
              placeholder="Your jutsu is broken..." 
              className="w-full bg-eclipse-black border border-light-ash/20 rounded-lg py-3 px-4 text-light-ash focus:outline-none focus:border-puwf-fire transition-colors placeholder:text-light-ash/20"
            />
          </div>
          <button 
            type="button" 
            className="w-full bg-puwf-fire text-eclipse-black font-bold py-3 rounded-lg hover:bg-puwf-fire/90 transition-colors shadow-[0_0_15px_rgba(255,107,0,0.3)] mt-2"
          >
            Send Message
          </button>
        </form>
      </div>

      <p className="mt-10 text-light-ash/50 text-sm">
        Or email directly: <a href="mailto:support@animepuwf.live" className="text-puwf-fire hover:underline">support@animepuwf.live</a>
      </p>
    </main>
  );
}
