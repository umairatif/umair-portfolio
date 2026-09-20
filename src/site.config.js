/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything that is environment- or identity-specific lives here so it is
 *  never duplicated across components, metadata, structured data or sitemap.
 *
 *  ⚠  Profile URLs that are still placeholders (marked TODO below) are omitted
 *     from the page and from schema.org `sameAs` rather than shipping a broken
 *     link. `npm run build` prints a warning listing any that are still unset.
 */

/** Sentinel for values that still need a real answer. */
export const TODO = (label) => `__TODO__${label}__`;
export const isTodo = (value) =>
  typeof value === 'string' && value.startsWith('__TODO__');

/** Returns the value, or null when it is still a placeholder. */
export const real = (value) => (isTodo(value) ? null : value);

// ── Deployment ───────────────────────────────────────────────────────────────

/**
 * Canonical origin this site is served from — no trailing slash.
 * Used for <link rel="canonical">, og:url, sitemap.xml and robots.txt.
 */
export const SITE_URL = 'https://umairatif.com';
export const SITE_URL_CONFIRMED = true;

// ── Identity ─────────────────────────────────────────────────────────────────

export const site = {
  url: SITE_URL,
  name: 'Umair Atif',
  role: 'Full-Stack Developer',
  // Used as the <title> suffix and in structured data.
  tagline: 'Full-Stack Developer',
  locality: 'Lahore',
  region: 'Punjab',
  country: 'Pakistan',
  countryCode: 'PK',
  email: 'umairatif1705@gmail.com',
  phoneE164: '+923069443620',
  phoneDisplay: '+92 306 944 3620',
  whatsapp: 'https://wa.me/923069443620',
  // Shown in the hero + contact section. Set to false when not taking work.
  available: true,
  availabilityNote: 'Open to full-time roles and selected freelance projects',
};

// ── Profiles (schema.org sameAs) ─────────────────────────────────────────────

/**
 * Fill in a real GitHub URL when you want the GitHub link rendered and
 * included in schema.org `sameAs`. LinkedIn is intentionally not linked.
 */
export const profiles = {
  github: 'https://github.com/Umair-eng-dev',
};

/** Only the profile URLs that are actually filled in. */
export const sameAs = Object.values(profiles).filter((u) => !isTodo(u));

/** Reported by the build script so unset values are impossible to miss. */
export const pendingConfig = [
  !SITE_URL_CONFIRMED &&
    `SITE_URL is still the default (${SITE_URL}) — set it to the real domain and flip SITE_URL_CONFIRMED to true.`,
  isTodo(profiles.github) && 'profiles.github is unset — the GitHub link is hidden and omitted from sameAs.',
].filter(Boolean);

// ── Navigation ───────────────────────────────────────────────────────────────

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
];

export default site;
