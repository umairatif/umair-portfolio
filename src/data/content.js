/**
 * Site copy that is reused across components and structured data.
 * Everything here is written to be true and checkable — the skills list is
 * derived from technologies that actually appear in the case studies.
 */

// ── What I do ────────────────────────────────────────────────────────────────

export const services = [
  {
    id: 'product',
    number: '01',
    title: 'Full-stack product development',
    body:
      'Taking a product from an empty repository to something running in production — database schema, API, interface, deployment. I work best when I own the whole path, because most of the difficult decisions sit at the seams between those layers.',
    tags: ['NestJS', 'Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'ai',
    number: '02',
    title: 'AI and LLM integration',
    body:
      'Putting language models into products where they earn their place. The model call is the easy part; the work is queueing long generations, handling partial failures, sandboxing anything the model produces, and keeping costs visible to the user.',
    tags: ['AWS Bedrock', 'Claude', 'OpenAI GPT-4', 'Mastra', 'n8n', 'E2B'],
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend and API architecture',
    body:
      'Service design, data modelling and the async plumbing underneath — queues, workers, webhooks, real-time channels. I care about what happens when a dependency is unavailable, because that is the state users remember.',
    tags: ['REST', 'WebSockets', 'BullMQ', 'Redis', 'TypeORM', 'OpenSearch'],
  },
  {
    id: 'infra',
    number: '04',
    title: 'Cloud infrastructure and DevOps',
    body:
      'AWS infrastructure described in Terraform, containerised services, and deployment pipelines that can be re-run without fear. Infrastructure you can diff is infrastructure you can fix at two in the morning.',
    tags: ['AWS', 'Terraform', 'Docker', 'ECS', 'CloudFront', 'nginx'],
  },
];

// ── How I work ───────────────────────────────────────────────────────────────

export const principles = [
  {
    title: 'Make the failure modes explicit',
    body:
      'Every dependency you do not own will be unavailable at some point. Circuit breakers, retries with backoff and defined degraded states are not extras — they decide whether one service being down is an inconvenience or an outage.',
  },
  {
    title: 'Long work belongs in a queue',
    body:
      'If a job can take minutes, it should not live in an HTTP request. Queues give retries, inspectable state and survival across restarts. A fire-and-forget promise gives none of those and loses the work on deploy.',
  },
  {
    title: 'Configuration belongs in one place',
    body:
      'Reading environment variables at the point of use scatters failure across the codebase. Validating configuration at startup turns a confusing production error into a boot-time one that names the missing value.',
  },
  {
    title: 'Design the fallback alongside the primary path',
    body:
      'Deciding what happens when the search cluster is unreachable costs almost nothing while you are building it. Retrofitting that decision after an incident costs considerably more.',
  },
  {
    title: 'Scaling out turns assumptions into bugs',
    body:
      'Code that is correct on one instance is not automatically correct on four. Scheduled jobs, in-memory state and locking are where that surfaces first, and they need to be handled deliberately.',
  },
];

export const process = [
  {
    number: '01',
    title: 'Understand the real constraint',
    body:
      'Before any code, what actually limits this system — a third-party rate limit, a data volume, a deadline, an existing tool the team will not replace? Most architecture decisions follow from that answer.',
  },
  {
    number: '02',
    title: 'Decide the shape',
    body:
      'Where state lives, what runs synchronously, what gets queued, and what happens when each external call fails. This is the part worth arguing about, and it is much cheaper to change now than later.',
  },
  {
    number: '03',
    title: 'Build in working slices',
    body:
      'One thin path through the whole stack first, then depth. It surfaces integration problems in week one instead of week six, and there is always something running to look at.',
  },
  {
    number: '04',
    title: 'Harden, document, hand over',
    body:
      'Validation at the boundaries, sensible logging, configuration that fails loudly, and a README that means someone else can run it. Work that only I can deploy is not finished.',
  },
];

// ── Skills (every entry appears in at least one case study) ──────────────────

export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { group: 'Backend', items: ['NestJS', 'Node.js', 'FastAPI', 'REST APIs', 'WebSockets', 'Socket.IO'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Radix UI'] },
  { group: 'Data', items: ['PostgreSQL', 'TypeORM', 'Redis', 'OpenSearch', 'Strapi'] },
  { group: 'AI & LLM', items: ['AWS Bedrock', 'Claude', 'OpenAI GPT-4', 'DALL·E', 'Mastra', 'n8n', 'E2B', 'VAPI'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Terraform', 'Docker', 'ECS', 'Lambda', 'CloudFront', 'S3', 'nginx'] },
  { group: 'Platform', items: ['Stripe', 'SendGrid', 'BullMQ', 'Google OAuth2', 'JWT'] },
];

/** Flat list used for the Person schema `knowsAbout` field. */
export const expertise = [
  'Full-stack web development',
  'React and TypeScript development',
  'Backend development',
  'API development',
  'Database architecture',
  'AI and LLM integration',
  'Cloud infrastructure',
  'DevOps',
  'SaaS development',
  'UI implementation',
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
// Questions are phrased the way people actually search for them; answers are
// short enough to be quoted directly and specific enough to be useful.

export const faq = [
  {
    q: 'What does Umair specialise in?',
    a: 'Full-stack product engineering — I build the backend, the frontend and the infrastructure that runs them. Recently most of my work has been AI-heavy SaaS products: a code generation platform, a voice ordering agent, a video generation pipeline and a semantic candidate search engine.',
  },
  {
    q: 'What technologies does Umair use?',
    a: 'Mainly TypeScript with NestJS on the backend and React or Next.js on the frontend, PostgreSQL for data, Redis with BullMQ for queues, and AWS with Terraform for infrastructure. For AI work I use Claude through AWS Bedrock, OpenAI models, and orchestration tools like n8n and Mastra. I also write Python with FastAPI when that fits the job better.',
  },
  {
    q: 'Does Umair build custom web applications from scratch?',
    a: 'Yes. Most of the projects in my portfolio started as an empty repository — schema, API, interface, deployment pipeline and billing included. I also join existing systems, which is what the MakroPro work was: reliability and concurrency fixes on a platform already running in production.',
  },
  {
    q: 'Can Umair integrate AI into an existing product?',
    a: 'Yes, and it is usually a better first step than rebuilding. The integration work is queueing long-running generations, handling provider failures with retries and fallbacks, sandboxing anything the model produces, and metering usage so costs stay predictable. I have done this with Claude via Bedrock, GPT-4, DALL·E and Kling AI.',
  },
  {
    q: 'What is Umair’s development process?',
    a: 'Understand the real constraint first, then decide the architecture — where state lives, what gets queued, what happens when each external call fails. After that I build one thin path through the whole stack before adding depth, so integration problems appear early rather than near the deadline.',
  },
  {
    q: 'Where is Umair based, and does he work remotely?',
    a: 'I am based in Lahore, Pakistan and work remotely with teams in other time zones. My recent projects have all been delivered that way.',
  },
  {
    q: 'How can someone work with Umair?',
    a: 'Email umairatif1705@gmail.com or message +92 306 944 3620 on WhatsApp. A short description of the problem, the stack you are on, and your rough timeline is enough for me to tell you whether I am a good fit.',
  },
];

// ── About ────────────────────────────────────────────────────────────────────

export const about = {
  intro: [
    'I am a full-stack developer in Lahore, Pakistan. I build web products end to end — the database schema, the API, the interface, and the AWS infrastructure they run on — and I am most useful on projects where those layers have to be designed together rather than handed between people.',
    'Most of my recent work has been AI-heavy SaaS: a platform that generates and deploys full-stack applications from a prompt, a voice agent that takes restaurant orders over the phone, a pipeline that chains several models together to produce video, and a recruitment engine that understands plain-language search. What those have in common is not the models. It is everything around them — queues, sandboxes, retries, provisioning and billing — which is where the actual engineering lives.',
    'Before that, and alongside it, I have done reliability work on systems already in production: making scheduled jobs safe across multiple containers, containing cache failures so they do not become outages, and rewriting the queries behind real incidents. That work shaped how I build new things.',
  ],
};

export default { services, principles, process, skills, expertise, faq, about };
