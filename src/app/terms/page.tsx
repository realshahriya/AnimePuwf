export default function TermsPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-6 pt-32 pb-20 flex-grow text-light-ash">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-puwf-fire">Terms of Service</h1>
      <div className="space-y-8 text-light-ash/80 leading-relaxed text-sm">
        <p className="italic">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">1. Acceptance of Terms</h2>
          <p>By accessing, browsing, or using Anime Puwf (&quot;the Platform&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you must immediately cease use of the Platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">2. Intellectual Property & Fair Use Disclaimer</h2>
          <p>Anime Puwf is an independent, unofficial fan-made project developed for entertainment purposes only. The platform utilizes algorithmic generation mapping personality traits to fictional abilities based on popular anime tropes.</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-light-ash/70">
            <li>We do not claim ownership, copyright, or trademark rights over any specific anime titles, characters, or established fictional universes (e.g., One Piece, Naruto, Bleach, etc.).</li>
            <li>All references to established intellectual properties fall under the doctrine of <strong>Fair Use</strong> (17 U.S.C. § 107) for purposes such as commentary, parody, and transformative fan-engagement.</li>
            <li>If you are a copyright holder and believe your work has been utilized outside the bounds of Fair Use, please contact us immediately for prompt resolution.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">3. Limitation of Liability</h2>
          <p className="uppercase font-mono text-xs text-light-ash/60 mb-2">To the maximum extent permitted by applicable law:</p>
          <p>Anime Puwf, ITS CREATORS, DEVELOPERS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-light-ash/70">
            <li>(a) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM;</li>
            <li>(b) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM;</li>
            <li>(c) ANY UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">4. User Generated Content & Conduct</h2>
          <p>By generating customized digital &quot;Cards&quot;, &quot;Bounties&quot;, or &quot;Ranks&quot;, you agree that you will not input usernames, texts, or prompts that are illegal, hateful, defamatory, or violate the rights of others. We reserve the right to ban users or block specific inputs at our sole discretion without prior warning.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">5. Governing Law & Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the creators operate, without regard to its conflict of law provisions. Any dispute arising from these Terms or the Platform shall be resolved through binding arbitration, rather than in court. <strong>You agree to waive any right to participate in a class-action lawsuit.</strong></p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-3 text-light-ash">6. Modifications to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Platform dictates your acceptance of the revised Terms.</p>
        </section>
      </div>
    </main>
  );
}
