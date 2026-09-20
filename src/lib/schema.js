import { site, SITE_URL, sameAs } from '../site.config.js';
import { expertise } from '../data/content.js';

/**
 * Schema.org JSON-LD builders. Kept factual and minimal — no invented
 * awards, ratings or aggregate data. `sameAs` only includes profile URLs
 * that have actually been filled in (see site.config.js).
 */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.name,
    jobTitle: site.role,
    description: `${site.name} is a full-stack developer based in ${site.locality}, ${site.country}, building AI-integrated SaaS products, backend systems and cloud infrastructure.`,
    url: SITE_URL,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    knowsAbout: expertise,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${site.name} — ${site.tagline}`,
    description: `Portfolio and case studies from ${site.name}, a full-stack developer working across React, TypeScript, backend systems, AI integration and cloud infrastructure.`,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

export function faqSchema(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name, path }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function projectSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/projects/${project.slug}#work`,
    name: project.title,
    description: project.metaDescription,
    url: `${SITE_URL}/projects/${project.slug}`,
    creator: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
    dateCreated: project.year,
    keywords: project.stack.flatMap((g) => g.items).join(', '),
    ...(project.live ? { sameAs: [project.live] } : {}),
  };
}

export function projectListSchema(projects) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/projects#collection`,
    name: `Projects — ${site.name}`,
    url: `${SITE_URL}/projects`,
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
    })),
  };
}
