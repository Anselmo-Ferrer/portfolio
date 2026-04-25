# Portfolio — Anselmo Ferrer

Personal portfolio site for Anselmo Ferrer, Full Stack Engineer.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- Custom CSS with design tokens (no UI framework)
- Fonts: Syne, Space Grotesk, JetBrains Mono via `next/font`
- Contact form via [Resend](https://resend.com) + Zod validation
- Deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_EMAIL=your@email.com
```

Without `RESEND_API_KEY`, the contact form logs submissions to the console (useful for development).

## Scripts

- `npm run dev` — dev server with hot reload
- `npm run build` — production build
- `npm start` — run production build locally
- `npm run lint` — lint check

## Project Structure

```
app/
├── layout.tsx          Root layout with fonts and metadata
├── page.tsx            Home page composition
├── globals.css         Design system and styles
└── api/contact/        Contact form endpoint (rate-limited)

components/
├── Cursor.tsx          Custom cursor
├── Nav.tsx             Navigation (with mobile menu)
├── Hero.tsx            Hero with typewriter effect
├── About.tsx           Stats, career, education, certifications
├── Projects.tsx        Drag-scroll project carousel
├── Skills.tsx          Skill groups
├── Contact.tsx         Contact form
├── FloatingCTA.tsx     Floating CTA card
├── Footer.tsx          Footer
└── ScrollReveal.tsx    Intersection observer for reveal animations
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). Set the env vars in the Vercel dashboard.
