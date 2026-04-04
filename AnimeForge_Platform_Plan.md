# 🔥 Anime Puwf — Platform Building Plan
**Domain:** animepuwf.world  
**Concept:** A personality-powered anime ability generator where users discover their power, ability, or bounty based on their favourite anime universe — with shareable cards to spread the experience.

---

## 🎯 Project Overview

Anime Puwf is an interactive web platform where anime fans:
1. Select their favourite anime universe (One Piece, Naruto, DBZ, Jujutsu Kaisen, Demon Slayer, etc.)
2. Fill in personal details (name, hobbies, personality traits, etc.)
3. Receive a uniquely generated power, ability, or rank based on their answers
4. Download or share a custom-designed card/poster to social media

---

## 🗂️ Phase Breakdown

### Phase 1 — Foundation (Weeks 1–3)
**Goal:** Set up the project structure, tech stack, and basic architecture.

**Tasks:**
- Finalise tech stack (see below)
- Set up GitHub repository with branching strategy
- Configure domain (animepuwf.live) and hosting (Vercel / Netlify recommended)
- Design system setup: colour palette, fonts, component library
- Create basic home/hub page with anime universe selection UI
- Set up database schema for storing user results (optional at this stage)

**Deliverables:**
- Live staging environment
- Home page with anime selection cards
- Design system documented

---

### Phase 2 — Core Engine (Weeks 4–7)
**Goal:** Build the quiz/questionnaire engine and power generation logic.

**Tasks:**
- Design questions for each anime universe (5–10 questions per universe)
- Build question flow UI (animated, engaging, mobile-friendly)
- Build the generation algorithm (rule-based or AI-assisted)
  - One Piece: Assign Devil Fruit ability + Bounty amount
  - Naruto: Assign Kekkei Genkai / Chakra nature / Rank
  - Dragon Ball Z: Assign power level + Saiyan/Human/Namekian race
  - Jujutsu Kaisen: Assign Cursed Technique + Grade
  - Demon Slayer: Assign Breathing Style + Demon Slayer Corps rank
- Build result display page per universe

**Deliverables:**
- Working quiz flow for at least 2 universes
- Result page with generated ability/power

---

### Phase 3 — Card Generator (Weeks 8–10)
**Goal:** Build the shareable card/poster feature.

**Tasks:**
- Design card templates for each anime universe (unique aesthetic per universe)
- Build card generator using HTML Canvas or a library like `html2canvas` or `konva.js`
- Dynamically populate: user name, ability name, power level, rank, artwork/icon
- Add download button (PNG/JPG export)
- Generate unique shareable link for each result
- Add Open Graph meta tags so the card previews when link is shared on social media

**Deliverables:**
- Fully designed, downloadable card per universe
- Shareable link with social media preview

---

### Phase 4 — Social & Virality (Weeks 11–12)
**Goal:** Drive organic sharing and user return.

**Tasks:**
- One-click share to Instagram, Twitter/X, WhatsApp, TikTok
- "Challenge a friend" feature — invite friends via link to compare powers
- Optional: leaderboard of rarest abilities / highest bounties
- SEO optimisation for landing pages
- Analytics setup (Google Analytics / Plausible)

**Deliverables:**
- Share buttons live and tested
- Friend challenge flow working
- Analytics dashboard active

---

### Phase 5 — Polish & Launch (Weeks 13–14)
**Goal:** QA, performance, and public launch.

**Tasks:**
- Cross-browser and mobile testing
- Performance audit (Lighthouse)
- Loading animations and micro-interactions
- Add remaining anime universes (if not already done)
- Soft launch with community seeding (Reddit anime subs, Discord servers)
- Collect early feedback and iterate

**Deliverables:**
- Public launch at animepuwf.live
- All major anime universes live

---

## 🛠️ Recommended Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js (React) | Fast, SEO-friendly, easy deployment |
| Styling | Tailwind CSS | Rapid, consistent styling |
| Card Generator | html2canvas / Konva.js | Client-side card image generation |
| Backend (optional) | Node.js + Express or Next.js API routes | Handles result storage & link generation |
| Database (optional) | Supabase (PostgreSQL) | Easy setup, free tier available |
| Hosting | Vercel | Seamless Next.js deployment |
| Analytics | Plausible or Google Analytics | Track share rates, universes, drop-offs |
| Version Control | GitHub | Team collaboration |

---

## 🌐 Platform Architecture

```
animepuwf.live
│
├── /                    → Main Hub (Select your anime universe)
├── /one-piece           → One Piece Quiz + Result + Card
├── /naruto              → Naruto Quiz + Result + Card
├── /dragon-ball-z       → DBZ Quiz + Result + Card
├── /jujutsu-kaisen      → JJK Quiz + Result + Card
├── /demon-slayer        → Demon Slayer Quiz + Result + Card
│
├── /result/[id]         → Shareable result page (unique per user)
└── /about               → About the platform
```

---

## 🎨 Design Principles

- **Each universe has its own visual identity** — One Piece feels pirate-y and adventurous, Naruto feels earthy and bold, DBZ feels explosive and dramatic, etc.
- **Mobile-first design** — most sharing happens on mobile
- **Fast load times** — keep card generation client-side where possible
- **Anime-authentic typography and colour palettes** — fans will notice the care

---

## 📊 Key Metrics to Track

| Metric | Why It Matters |
|---|---|
| Cards generated per day | Core engagement |
| Share rate (cards shared / cards generated) | Virality indicator |
| Friend clicks on shared links | Referral traffic |
| Most popular anime universe | Content prioritisation |
| Quiz completion rate | UX quality |

---

## 🚀 Team Role Suggestions

| Role | Responsibilities |
|---|---|
| Frontend Developer | UI, quiz flow, card generator, animations |
| Backend Developer | API routes, shareable links, database |
| Designer | Card templates, design system, per-universe aesthetics |
| Content Lead | Writing questions, ability names, lore accuracy |
| Marketing / Community | Social seeding, Reddit/Discord outreach |

---

## 📅 High-Level Timeline

| Phase | Duration | Target Completion |
|---|---|---|
| Phase 1 — Foundation | 3 weeks | Week 3 |
| Phase 2 — Core Engine | 4 weeks | Week 7 |
| Phase 3 — Card Generator | 3 weeks | Week 10 |
| Phase 4 — Social & Virality | 2 weeks | Week 12 |
| Phase 5 — Launch | 2 weeks | Week 14 |

**Total estimated timeline: ~3.5 months from kickoff**

---

## 💡 Future Ideas (Post-Launch)

- **User accounts** — save and revisit your results
- **Power comparisons** — see how you stack up against friends
- **New universe drops** — seasonal additions (e.g. Attack on Titan, My Hero Academia)
- **AI-powered ability generation** — use Claude or GPT to generate truly unique, personalised abilities
- **Merch integration** — let users order their bounty poster as a physical print

---

*Built with passion for the anime community. Puwfd at animepuwf.live 🔥*
