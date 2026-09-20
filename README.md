# Umair Atif — Portfolio

Personal site and project case studies for Umair Atif, full-stack developer.

## Stack

React 19, React Router 7, Tailwind CSS 4, Vite. No animation library — the
one entrance effect on the homepage is plain CSS, gated by
`prefers-reduced-motion`. No fake data: project write-ups, tech stacks and
results in `src/data/projects.js` describe real, shipped work.

## Structure

- `src/site.config.js` — the one place that holds the domain, contact info
  and profile links. Canonical URL is `https://umairatif.com`.
- `src/data/projects.js` — case study content (problem, solution,
  architecture, challenges, decisions, results) for every project.
- `src/data/content.js` — services, process, skills, FAQ and about copy.
- `src/lib/useSeo.js` — sets title/meta/canonical/OG/JSON-LD per route,
  without pulling in react-helmet.
- `src/lib/schema.js` — schema.org builders (Person, WebSite, FAQPage,
  CreativeWork, BreadcrumbList).
- `src/components/ArchitectureDiagram.jsx` — renders each project's real
  system diagram from its `diagram` data as inline SVG.
- `scripts/generate-seo-files.mjs` — regenerates `public/sitemap.xml` and
  `public/robots.txt` from the site config and project list; runs
  automatically before `vite build`.

## Before deploying

`SITE_URL` is `https://umairatif.com` and is used for canonical URLs, Open
Graph tags, the sitemap and robots.txt. GitHub is linked at
https://github.com/Umair-eng-dev. LinkedIn is not linked anywhere on the site.

```bash
npm install
npm run dev       # local dev server
npm run build     # regenerates sitemap/robots, then builds to dist/
npm run preview   # serve the production build locally
```

Static hosts need a full-page rewrite to `index.html` for client-side
routing to work on direct links like `/projects/vibecoder` — `public/_redirects`
(Netlify) and `vercel.json` (Vercel) are already set up for that.
