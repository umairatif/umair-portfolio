/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const TODO = (label) => `__TODO__${label}__`;
export const isTodo = (value) =>
  typeof value === 'string' && value.startsWith('__TODO__');

export const real = (value) => (isTodo(value) ? null : value);

// ── Deployment ───────────────────────────────────────────────────────────────

export const SITE_URL = 'https://umairatif.com';
export const SITE_URL_CONFIRMED = true;
export const pendingConfig = [];

// ── Identity ─────────────────────────────────────────────────────────────────

export const site = {
  url: SITE_URL,
  name: 'Umair Atif',
  role: 'Full Stack Developer (Product Scaler End-to-End)',
  tagline: 'Idea to MVP — Building Scalable Products with Real Impact',
  locality: 'Lahore',
  region: 'Punjab',
  country: 'Pakistan',
  countryCode: 'PK',
  email: 'umairatif1705@gmail.com',
  phoneE164: '+923069443620',
  phoneDisplay: '+92 306 944 3620',
  whatsapp: 'https://wa.me/923069443620',
  available: true,
  availabilityNote: 'Open for full-stack product development & MVP scaling projects',
};

// ── Real Company Collaborations & Partners ───────────────────────────────────

export const partners = [
  {
    name: 'Confiz Limited',
    role: 'IT & Software Engineering',
    note: 'Enterprise Tech Solutions & Services',
  },
  {
    name: 'FundedElite',
    role: 'Fintech & Trading Infrastructure',
    note: 'Proprietary Trading Systems',
  },
  {
    name: 'Fakeeh Care Group',
    role: 'Healthcare Systems & IT',
    note: 'HealthTech Platform Architecture',
  },
];

// ── Idea to MVP Execution Process ─────────────────────────────────────────────

export const mvpProcessSteps = [
  {
    step: '01',
    title: 'Idea Validation & Architecture',
    desc: 'Translating product vision into lean functional requirements, target user journeys, and robust system architecture.',
  },
  {
    step: '02',
    title: 'Rapid Prototyping & UX',
    desc: 'Building responsive, production-grade UI/UX systems focused on immediate user conversion and frictionless interactions.',
  },
  {
    step: '03',
    title: 'Full-Stack Engineering',
    desc: 'Developing scalable backend microservices, resilient APIs, and optimized databases built to handle initial scale.',
  },
  {
    step: '04',
    title: 'Launch & Iterative Scaling',
    desc: 'Deploying with automated CI/CD pipelines, analytics tracking, and continuous feature updates based on live telemetry.',
  },
];

// ── Testimonials & Impact ────────────────────────────────────────────────────

export const testimonials = [
  {
    quote:
      'Umair took our core requirements and delivered a complete end-to-end system ahead of timeline. His ability to own both product logic and infrastructure engineering made a huge impact.',
    author: 'Engineering Lead',
    company: 'Fintech Partner',
    impact: 'Accelerated product launch by 3 weeks',
  },
  {
    quote:
      'Working through complex technical workflows became effortless. The architecture delivered was clean, maintainable, and built for real scale from day one.',
    author: 'Operations Lead',
    company: 'Enterprise Tech Client',
    impact: '99.9% uptime across production services',
  },
  {
    quote:
      'Umair brought structure to a product that had outgrown its first version. We could ship with confidence because the system was designed for the next stage, not just the next deadline.',
    author: 'Product Director',
    company: 'SaaS Partner',
    impact: 'Scaled from pilot to production',
  },
  {
    quote:
      'The handover was unusually smooth. Every important decision was documented, the deployment path was repeatable, and our team knew how to keep improving the product after launch.',
    author: 'Founder',
    company: 'Technology Startup',
    impact: 'Faster releases with less operational risk',
  },
];

// ── Profiles ─────────────────────────────────────────────────────────────────

export const profiles = {
  github: 'https://github.com/umairatif',
};

export const sameAs = Object.values(profiles).filter((u) => !isTodo(u));

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQs', href: '/#faq' },
];

export default site;