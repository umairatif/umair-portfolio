# Umair Atif — Portfolio

Personal portfolio and project case studies for **Umair Atif**, a full-stack
developer in Lahore, Pakistan building AI-integrated SaaS products, backend
systems and AWS infrastructure.

**Live site:** https://umairatif.com

## Highlights

- **Light & dark themes** — the palette lives in CSS custom properties
  (`:root` / `:root[data-theme='dark']`) mapped into Tailwind v4 `@theme`
  tokens, with the user's choice persisted to `localStorage`. Every blue CTA
  shares the same brand styling as the "Let's talk" button in dark mode.
- **Fully responsive** — the navbar condenses below `1040px` and switches to
  a hamburger menu below `900px`; the footer drops its contact cards from
  three columns to two below `1100px` and stacks below `900px`. Nothing
  overlaps at any window size.
- **Accessible by default** — skip link, visible `:focus-visible` outlines,
  `aria` labels, and all entrance animations gated by
  `prefers-reduced-motion`.
- **SEO built in** — per-route titles, meta, canonical, Open Graph and
  JSON-LD, plus a generated `sitemap.xml` and `robots.txt`.

## Stack

React 19, React Router 7, Tailwind CSS 4, Vite 8. Icons via `lucide-react`.

No animation library — entrance effects are plain CSS. Fonts (Syne, Manrope,
DM Mono) are self-hosted, so the site makes no third-party requests.

No fake data: project write-ups, tech stacks, testimonials and results in
`src/data/projects.js` and `src/site.config.js` describe real, shipped work.

## Getting started

```bash
npm install
npm run dev             # local dev server
npm run build           # regenerates sitemap/robots, then builds to dist/
npm run preview         # serve the production build locally
npm run lint            # oxlint
npm run seo:generate    # regenerate sitemap.xml + robots.txt on demand
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Runs the `prebuild` SEO step, then `vite build` |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run lint` | oxlint (React rules of hooks + export rules) |
| `npm run seo:generate` | Regenerates `public/sitemap.xml` + `public/robots.txt` |

## Structure

```
src/
  main.jsx                    App entry — creates the root, BrowserRouter
  App.jsx                     Routes, theme state, page transitions
  App.css                     Page-transition animation
  index.css                   All styles, design tokens and the theme system
  site.config.js              Site identity, contact info, GitHub profile,
                              navigation, partners, MVP process, testimonials
  data/
    projects.js               Case study content for every project
    content.js                Services, principles, about copy, FAQ
  lib/
    useSeo.js                 Per-route title/meta/canonical/OG/JSON-LD
    schema.js                 schema.org builders (Person, WebSite, FAQPage)
  components/
    Navbar.jsx                Fixed nav — desktop links + mobile menu drawer
    Hero.jsx                  Intro, availability, social rail
    About.jsx                 Stats + narrative + "Let's work together" CTA
    FeaturedWork.jsx          Selected case-study cards
    Services.jsx              Four service areas
    Process.jsx               How I work
    Testimonials.jsx          Client testimonials (from site.config.js)
    Faq.jsx                   FAQ accordion (from content.js)
    Footer.jsx                Contact CTA, contact cards, bottom bar, scroll-top
    ArchitectureDiagram.jsx   Renders each project's real diagram as inline SVG
    icons/BrandIcons.jsx      GitHub (and other brand) icons
  pages/
    Home.jsx                  Landing page (/)
    ProjectsIndex.jsx         All case studies (/projects)
    ProjectDetail.jsx         Single case study (/projects/:slug)
    NotFound.jsx              Fallback 404
scripts/
  generate-seo-files.mjs      Builds sitemap.xml + robots.txt from config + projects
```

## Configuration & content

The site is data-driven from three files:

- `src/site.config.js` — the single source of truth for the domain, contact
  details (email, WhatsApp), GitHub profile, navigation, partners, MVP
  process steps and testimonials. Canonical URL is `https://umairatif.com`.
- `src/data/projects.js` — problem, solution, architecture, challenges,
  decisions and results for every case study.
- `src/data/content.js` — services, principles, about copy and FAQ.

GitHub is linked at https://github.com/umairatif.

## Theming

Design tokens live in `src/index.css`:

- `:root` defines the light palette; `:root[data-theme='dark']` the dark one
  (backgrounds, text, border, brand blue, ink surfaces).
- Tailwind v4 `@theme` maps those tokens to utilities such as
  `bg-bg-site`, `text-text-main` and `text-brand-primary`.
- `App.jsx` toggles `data-theme` on `<html>` and a `theme-dark` class on the
  shell, and persists the choice to `localStorage`.

## Deployment

- **Hostinger (Apache)** — `public/.htaccess` sets the correct MIME types
  (JS, CSS, woff2, SVG), disables caching for `index.html`, and rewrites
  every non-file path to the SPA entry.
- **Vercel** — `vercel.json` rewrites all routes to `/index.html`.
- **Netlify** — `public/_redirects` sends all routes to `/index.html`.

`vite.config.js` uses `base: './'` so assets are served from relative paths.

## Work in progress

`src/components/IdeaToMvp.jsx` and `src/components/Partners.jsx` are empty
placeholders not yet wired into `Home` — the data they will consume
(`mvpProcessSteps`, `partners`) is already defined in `src/site.config.js`.
