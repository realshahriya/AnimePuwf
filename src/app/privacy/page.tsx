export default function PrivacyPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-6 pt-32 pb-20 flex-grow text-light-ash">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-puwf-fire">Privacy Policy</h1>
      <div className="space-y-8 text-light-ash/80 leading-relaxed text-sm">
        <p className="italic">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">1. Information We Collect</h2>
          <p>Anime Puwf is designed to function with minimal user data. We do not require account creation to generate digital ability cards.</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-light-ash/70">
            <li><strong>Voluntarily Provided Information:</strong> Any names or aliases inputted during the quiz process to render upon your customizable generated cards.</li>
            <li><strong>Automated Analytics Data:</strong> IP Addresses, browser types, interaction metadata, and referring websites. This data is fully anonymized and used strictly for diagnosing server health and optimizing user interfaces.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">2. How We Use Your Information</h2>
          <p>The minimal data we process is used explicitly to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-light-ash/70">
            <li>Provide, operate, and maintain our Platform infrastructure.</li>
            <li>Render personalized, downloadable digital artifacts (e.g., Anime Puwf Cards).</li>
            <li>Detect and prevent fraudulent activities or scraping bots targeting our generator.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">3. Third-Party Advertising & Cookies</h2>
          <p>To keep the Anime Puwf servers running, we display advertisements via third-party vendors (such as Google AdSense). These third-party vendors may use cookies to serve ads based on your prior visits to our Platform or other websites.</p>
          <p className="mt-2">You may opt out of personalized advertising by visiting the respective ad network's privacy portal (e.g., Google's Ads Settings) or by utilizing browser-level Ad-Blockers. We unequivocally do not sell or lease your direct personal data to third-party data brokers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">4. Data Retention & Security</h2>
          <p>We implement commercially reasonable security measures designed to protect your information. Quiz inputs are processed dynamically in-memory or on the client-side, and are not persistently stored in our databases unless specifically requested (e.g., if you choose to publish your card to a public leaderboard in future features).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">5. GDPR & CCPA Compliance</h2>
          <p>Depending on your geographic residency, you may have specific statutory rights regarding your personal data, including the right to request access, correction, deletion, or exportation of your data. To exercise any of these privacy rights, please submit a formal request via our designated contact channel.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">6. Contact Us</h2>
          <p>If you have any legal inquiries regarding this Privacy Policy or our usage of cookies, please contact our Data Protection Officer at: <a href="mailto:support@animepuwf.live" className="text-puwf-fire hover:underline">support@animepuwf.live</a>.</p>
        </section>
      </div>
    </main>
  );
}
