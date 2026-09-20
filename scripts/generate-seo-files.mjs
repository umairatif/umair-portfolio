#!/usr/bin/env node
/**
 * Generates public/robots.txt and public/sitemap.xml from src/site.config.js
 * and src/data/projects.js, so both stay in sync with the real route list
 * and the real domain instead of being hand-maintained separately.
 *
 * Runs automatically before `vite build` (see package.json "prebuild") and
 * can be run on demand with `npm run seo:generate`.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { SITE_URL, SITE_URL_CONFIRMED, pendingConfig } from '../src/site.config.js';
import { projects } from '../src/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'monthly' },
];

const projectRoutes = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  priority: '0.8',
  changefreq: 'yearly',
}));

const allRoutes = [...staticRoutes, ...projectRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `# ${SITE_URL}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log(`✓ Generated sitemap.xml with ${allRoutes.length} URLs and robots.txt (SITE_URL: ${SITE_URL})`);

if (!SITE_URL_CONFIRMED || pendingConfig.length) {
  console.warn('\n⚠ site.config.js has unresolved placeholders — the build will still succeed, but fix these before launch:');
  if (!SITE_URL_CONFIRMED) {
    console.warn(`  - SITE_URL is a guess (${SITE_URL}), not yet confirmed. Sitemap/robots/canonical/og:url all use it.`);
  }
  pendingConfig.forEach((p) => console.warn(`  - ${p}`));
  console.warn('');
}
