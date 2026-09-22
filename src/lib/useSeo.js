import { useEffect } from 'react';
import { site, SITE_URL } from '../site.config.js';

/**
 * Minimal, dependency-free document-head manager.
 *
 * We deliberately don't pull in react-helmet-async for a five-page site —
 * it's a real dependency with its own context provider for something that's
 * ~40 lines of direct DOM work. This runs synchronously on route change,
 * before paint, so crawlers and share metadata never show stale values.
 *
 * Tab-title ownership: this hook only manages meta/OG/JSON-LD. The browser
 * tab title lives in App.jsx, which flips the static "Portfolio" title to
 * the current page name on navigation.
 */

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * @param {Object} opts
 * @param {string} opts.title - Page title, WITHOUT the site suffix. Shown
 *   as-is in the tab after an in-app navigation; the site name is appended
 *   only to shared (OG/Twitter) metadata.
 * @param {string} opts.description - 150–160 char meta description.
 * @param {string} [opts.path] - Route path for canonical + og:url, e.g. '/projects/vibecoder'.
 * @param {string} [opts.image] - Absolute or root-relative OG image path.
 * @param {'website'|'article'} [opts.type]
 * @param {object|object[]} [opts.jsonLd] - Structured data object(s) for this page.
 */
export function useSeo({ title, description, path = '/', image = '/og-image.png', type = 'website', jsonLd }) {
  useEffect(() => {
    const shareTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;

    const canonical = `${SITE_URL}${path}`;
    const absImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    setMeta('name', 'description', description);
    setLink('canonical', canonical);

    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', shareTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', absImage);
    setMeta('property', 'og:site_name', site.name);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', canonical);
    setMeta('name', 'twitter:title', shareTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absImage);

    const items = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    // Clear any previously-set page-specific schema blocks (up to 6), then set current ones.
    for (let i = 0; i < 6; i++) setJsonLd(`ld-page-${i}`, null);
    items.forEach((data, i) => setJsonLd(`ld-page-${i}`, data));

    // Scroll to top on route change, unless navigating to a hash anchor.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [title, description, path, image, type, jsonLd]);
}

export default useSeo;
