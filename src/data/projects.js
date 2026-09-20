/**
 * Project case studies.
 *
 * Ground rules for anything added here:
 *  - No invented revenue, user counts, conversion rates or performance deltas.
 *  - `results` describes what was built and shipped, not business outcomes that
 *    cannot be checked.
 *  - Technical figures (token limits, service counts) are configuration facts,
 *    not marketing numbers.
 */

export const projects = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'vibecoder',
    title: 'VibeCoder',
    kicker: 'AI code generation platform',
    year: '2025',
    status: 'In production',
    live: 'https://oneorb.io/',
    featured: true,
    summary:
      'An AI platform that turns a written prompt into a working full-stack application — generated, executed in a sandbox, and deployed onto real AWS infrastructure without the user ever opening the console.',
    metaDescription:
      'Case study: building VibeCoder, an AI platform that generates full-stack applications from a prompt and deploys them to AWS. NestJS, Next.js, Claude via Bedrock, BullMQ, Terraform.',

    role:
      'Full-stack. I worked across the AI generation pipeline, the Terraform deployment system, the async job and real-time progress layer, Stripe billing and team management, and the creator console on the frontend.',

    problem: [
      'Most AI coding tools stop at the code. You get a file tree, you copy it out, and everything after that — installing dependencies, wiring a database, provisioning infrastructure, getting an actual URL — is still your problem. The gap between “here is some generated code” and “here is a running application” is where people give up.',
      'VibeCoder had to close that gap end to end: accept a prompt in plain English, generate a complete frontend and backend, run the result somewhere safe enough to verify it, and put it on live infrastructure the user never has to configure. Doing that in production meant solving long-running generation, untrusted code execution, per-project cloud provisioning, and metered billing at the same time.',
    ],

    solution: [
      'A prompt enters the NestJS API and immediately becomes a queued job rather than a blocked HTTP request. A worker calls Claude through AWS Bedrock to produce the application — React frontend and Node backend together, or a UI-only build when that is all that was asked for — and streams progress back to the Next.js console over a WebSocket, so the user watches files appear instead of staring at a spinner.',
      'Generated code is executed inside an E2B sandbox, which keeps untrusted output away from the platform itself while still letting the build run for real. Once it is verified, a Terraform pipeline provisions that project its own AWS footprint — S3, CloudFront, Lambda, API Gateway, Route 53 records and certificates — and hands back a working URL. Vercel and a plain GitHub push are supported as alternative targets for people who would rather take the code elsewhere.',
      'Around that core sits the part that makes it a product rather than a demo: Stripe subscriptions across four tiers, a credit model that meters generation, team provisioning with invitations and role-based access, and a configuration layer that keeps all of it honest.',
    ],

    architecture: [
      'NestJS owns the backend and is split by domain rather than by technical layer. BullMQ on Redis carries every long-running task, which keeps generation, deployment and email off the request path and makes retries a property of the system instead of something each caller reimplements. A Socket.IO gateway pushes job state to the frontend so the console reflects what the worker is actually doing.',
      'Configuration was deliberately centralised into fifteen domain-specific config services covering roughly sixty parameters, replacing direct `process.env` reads scattered through the codebase. Each service validates its own values at startup, so a missing credential fails immediately and loudly at boot rather than halfway through a user’s first deployment.',
      'The Next.js frontend is a creator console: a file explorer with syntax highlighting, resizable preview panes, a deployment workflow that targets AWS, Vercel or GitHub, and credit state rendered directly in the UI so users know what a generation will cost before they run it.',
    ],

    diagram: {
      caption: 'Prompt to deployed application — synchronous path solid, queued work dashed.',
      lanes: [
        { label: 'Client', nodes: [{ id: 'ui', label: 'Next.js console', sub: 'file tree · preview' }] },
        { label: 'API', nodes: [
          { id: 'api', label: 'NestJS API', sub: 'auth · config · billing' },
          { id: 'ws', label: 'Socket.IO gateway', sub: 'progress events' },
        ] },
        { label: 'Async', nodes: [{ id: 'queue', label: 'BullMQ · Redis', sub: 'retry · backoff' }] },
        { label: 'Generation', nodes: [
          { id: 'bedrock', label: 'Claude via Bedrock', sub: '150K token output', accent: true },
          { id: 'e2b', label: 'E2B sandbox', sub: 'untrusted execution' },
        ] },
        { label: 'Deploy', nodes: [
          { id: 'tf', label: 'Terraform', sub: 'per-project IaC', accent: true },
          { id: 'aws', label: 'S3 · CloudFront · Lambda', sub: 'API Gateway · Route 53' },
        ] },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'queue', dashed: true },
        { from: 'queue', to: 'bedrock', dashed: true },
        { from: 'bedrock', to: 'e2b' },
        { from: 'e2b', to: 'tf', dashed: true },
        { from: 'tf', to: 'aws' },
        { from: 'ws', to: 'ui', back: true, dashed: true },
        { from: 'queue', to: 'ws', back: true, dashed: true },
      ],
    },

    stack: [
      { group: 'Backend', items: ['NestJS', 'TypeScript', 'Socket.IO', 'JWT', 'Google OAuth2'] },
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'] },
      { group: 'AI', items: ['AWS Bedrock', 'Claude', 'E2B Sandboxes'] },
      { group: 'Data & queues', items: ['PostgreSQL', 'TypeORM', 'Redis', 'BullMQ'] },
      { group: 'Infrastructure', items: ['Terraform', 'AWS S3', 'CloudFront', 'Lambda', 'API Gateway', 'Route 53', 'Docker'] },
      { group: 'Commerce', items: ['Stripe', 'SendGrid'] },
    ],

    features: [
      'Prompt-to-application generation producing a React frontend and Node backend in one pass, with a UI-only mode for smaller jobs.',
      'Terraform pipeline that provisions an isolated AWS footprint per project, including DNS records and SSL certificates.',
      'Four deployment targets — AWS full-stack, AWS frontend-only, Vercel, and a direct GitHub repository push — with build detection and dependency installation handled automatically.',
      'Real-time creator console: file explorer, syntax highlighting, resizable preview panes, live generation progress.',
      'Stripe subscriptions across Starter, Standard, Pro and Team tiers with a credit-based consumption model and automatic credit resets.',
      'Team workspaces with SendGrid invitations, role-based access control, seat limits tied to plan, and shared projects.',
    ],

    challenges: [
      {
        title: 'A 150K-token generation does not fit in a request',
        body: 'Generating a complete application takes far longer than any sensible HTTP timeout, and the work has to survive a deploy, a worker restart or a dropped browser tab. Moving generation into BullMQ solved the durability half; the visibility half needed a WebSocket channel so the console could report which file the model was on rather than leaving the user guessing whether anything was happening.',
      },
      {
        title: 'Running code you did not write',
        body: 'The platform has to execute its own output to know whether it works, and that output is untrusted by definition. E2B sandboxes gave each generation an isolated environment with a real filesystem and package manager, so builds could genuinely run and fail without any path back into the platform.',
      },
      {
        title: 'Provisioning cloud infrastructure per user, repeatedly',
        body: 'Every project needs its own buckets, distribution, functions, gateway and DNS entries — created reliably, torn down cleanly, and never colliding with another user’s stack. Describing that footprint in Terraform instead of a sequence of SDK calls made each deployment reproducible and gave failed runs a coherent state to roll back to.',
      },
      {
        title: 'Sixty configuration values with nowhere to live',
        body: 'Credentials and tuning parameters for Bedrock, E2B, Stripe, SendGrid, Redis, Postgres and the AWS deployment targets had accumulated as direct environment reads throughout the codebase. A missing value surfaced as a confusing runtime error deep inside a job. Consolidating into fifteen validated config services moved those failures to application startup.',
      },
    ],

    decisions: [
      {
        title: 'Claude through AWS Bedrock rather than a direct API',
        body: 'The deployment side of the platform already lives in AWS. Calling the model through Bedrock kept credentials, IAM policy and network path inside one account and one permission model instead of maintaining a second, separate integration.',
      },
      {
        title: 'BullMQ instead of firing work off in the background',
        body: 'Generation and deployment are both expensive and both fail in ways worth retrying. A real queue gives retries, backoff and inspectable job state for free; an un-awaited promise gives none of that and loses the work on restart.',
      },
      {
        title: 'Terraform over imperative SDK calls',
        body: 'Infrastructure defined as state can be diffed, re-applied and destroyed. Infrastructure created by a script is only as reliable as that script’s error handling, and a half-failed run leaves orphaned resources nobody can account for.',
      },
      {
        title: 'Config services over environment variables at point of use',
        body: 'Typed access with startup validation turns a class of silent production failures into a boot-time error, and gives one place to look when a value needs to change.',
      },
    ],

    results: [
      'Runs in production at oneorb.io, generating and deploying full-stack applications from a single prompt.',
      'Deployment is fully automated across four targets — no manual AWS configuration is required from the user at any point.',
      'Sixty-plus configuration parameters are validated at startup, so misconfiguration fails at boot rather than mid-job.',
      'Long-running work is durable: generation and deployment survive restarts and retry on failure rather than silently disappearing.',
    ],

    lessons: [
      'The interesting engineering in an AI product is rarely the model call. It is everything that has to be reliable around it — queues, sandboxes, provisioning, and telling the user what is happening.',
      'Progress reporting is a feature, not polish. A three-minute job with visible state feels faster than a forty-second job that shows nothing.',
      'Centralising configuration is unglamorous and pays for itself the first time a credential is missing in production.',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'makropro',
    title: 'MakroPro',
    kicker: 'Reliability engineering on a live platform',
    year: '2025',
    status: 'In production',
    live: 'https://www.makro.pro/',
    featured: true,
    summary:
      'Backend reliability work on a multi-instance ECS platform: making scheduled jobs safe to run on more than one container, containing Redis failures, and fixing the query patterns behind production incidents.',
    metaDescription:
      'Case study: reliability and concurrency work on MakroPro, a NestJS microservices platform on AWS ECS — PostgreSQL advisory locks, circuit breakers, and CTE query optimisation.',

    role:
      'Backend contributor focused on reliability, concurrency safety and query performance on an existing production system.',

    problem: [
      'The platform runs as microservices across multiple ECS instances, with Strapi behind the content side. Horizontal scaling had introduced a category of bug that does not exist on a single box: every instance ran the same scheduled jobs, so banner rotations and timer updates fired once per container instead of once per schedule.',
      'Two other things made outages worse than they needed to be. Redis was treated as though it were always available, so when it was not, the failure propagated outward into HTTP requests that did not actually need it. And several large queries were expensive enough to become the proximate cause of downtime under load.',
    ],

    solution: [
      'Scheduled work was put behind PostgreSQL advisory locks. Before a job runs, the instance tries to take a named lock; if another instance already holds it, this one does nothing and moves on. The database was already the shared dependency every instance trusted, so it became the coordination point rather than introducing another moving part.',
      'Redis and outbound HTTP calls were wrapped in circuit breakers so a failing dependency degrades that one feature instead of cascading. During Redis unavailability, HTTP requests continued to be served rather than failing along with the cache.',
      'The worst queries were rewritten using common table expressions to give the planner a better shape to work with, and several edge cases that had been directly implicated in production downtime were fixed. Validation was tightened in Strapi so bad content could not reach the code that later choked on it.',
    ],

    architecture: [
      'NestJS microservices on AWS ECS behind CloudFront, with Strapi as the content platform and PostgreSQL and Redis as shared infrastructure. The reliability work sits at the seams: the lock layer that decides which instance may run a job, and the breaker layer between services and the dependencies they do not control.',
    ],

    diagram: {
      caption: 'Multi-instance scheduling: the database decides which container runs the job.',
      lanes: [
        { label: 'Edge', nodes: [{ id: 'cf', label: 'CloudFront', sub: 'CDN' }] },
        { label: 'Compute', nodes: [
          { id: 'ecs1', label: 'ECS instance A', sub: 'cron fires' },
          { id: 'ecs2', label: 'ECS instance B', sub: 'cron fires' },
        ] },
        { label: 'Coordination', nodes: [{ id: 'lock', label: 'Advisory lock', sub: 'one winner', accent: true }] },
        { label: 'Dependencies', nodes: [
          { id: 'pg', label: 'PostgreSQL', sub: 'CTE queries' },
          { id: 'redis', label: 'Redis', sub: 'behind breaker' },
        ] },
      ],
      edges: [
        { from: 'cf', to: 'ecs1' },
        { from: 'cf', to: 'ecs2' },
        { from: 'ecs1', to: 'lock', dashed: true },
        { from: 'ecs2', to: 'lock', dashed: true },
        { from: 'lock', to: 'pg' },
        { from: 'ecs1', to: 'redis', dashed: true },
      ],
    },

    stack: [
      { group: 'Services', items: ['NestJS', 'Microservices', 'Strapi'] },
      { group: 'Data', items: ['PostgreSQL', 'Redis'] },
      { group: 'Infrastructure', items: ['AWS ECS', 'CloudFront'] },
    ],

    features: [
      'PostgreSQL advisory locks guarding every scheduled job against duplicate execution across ECS instances.',
      'Automated banner rotation and timer updates running exactly once per schedule regardless of instance count.',
      'Circuit breakers isolating Redis and outbound HTTP dependencies from the request path.',
      'Large queries rewritten with CTEs, plus fixes for edge cases that had caused production downtime.',
      'Stricter validation in Strapi to stop malformed content reaching downstream consumers.',
    ],

    challenges: [
      {
        title: 'Cron jobs that were correct on one instance and wrong on four',
        body: 'Scheduling logic written for a single process silently becomes duplicate work when the service scales out — and it does not announce itself, it just produces rotations that fire several times. Advisory locks made "only one instance may run this" an explicit, enforced property rather than an assumption.',
      },
      {
        title: 'A cache outage taking down things that were not cached',
        body: 'Redis calls sat inline in paths that could have tolerated a miss. Without a breaker, connection timeouts stacked up and consumed request capacity, so an optional dependency produced a non-optional failure. Wrapping those calls contained the blast radius.',
      },
      {
        title: 'Queries that were fine until they were not',
        body: 'Some queries only became a problem at production data volumes and under concurrent load. Restructuring them with CTEs made the execution plans predictable rather than dependent on how much data happened to be in the table.',
      },
    ],

    decisions: [
      {
        title: 'Advisory locks rather than a distributed lock service',
        body: 'Every instance already depends on PostgreSQL, and advisory locks are released automatically when a session ends. Adding a separate lock service would have introduced a new dependency — and a new failure mode — to solve a problem the existing one already handles.',
      },
      {
        title: 'Circuit breakers rather than longer timeouts',
        body: 'Raising a timeout delays the failure; it does not contain it. A breaker lets the system notice that a dependency is down, stop asking, and keep serving everything that does not need it.',
      },
    ],

    results: [
      'Scheduled jobs run once per schedule across a multi-instance deployment instead of once per container.',
      'HTTP requests continued to be served during Redis unavailability, with no request downtime attributable to the cache.',
      'The query and edge-case fixes removed known causes of production downtime.',
    ],

    lessons: [
      'Horizontal scaling turns assumptions into bugs. Code that was correct on one instance is not automatically correct on four, and scheduled work is where that shows up first.',
      'Treat every dependency you do not own as something that will be unavailable at some point, and decide in advance what should happen when it is.',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-restaurant-agent',
    title: 'AI Restaurant Agent',
    kicker: 'Voice ordering automation',
    year: '2025',
    status: 'In production',
    live: 'https://agent.lingopal.ai/',
    featured: true,
    summary:
      'A voice agent that answers a restaurant’s phone, takes the order, and puts it into the systems the kitchen already uses — without staff retyping anything.',
    metaDescription:
      'Case study: an AI voice agent for restaurant phone orders, built with VAPI, Python and FastAPI, syncing orders into Stream Orders and KitchenHub in real time.',

    role:
      'Designed and built the agent system: the voice pipeline, the FastAPI backend that receives and stores structured orders, and the integrations that push them into existing restaurant tooling.',

    problem: [
      'Phone orders are still a large share of restaurant business, and they are almost entirely manual. Someone stops what they are doing, takes the call, writes the order down, then types it into a tablet. It is slow at the counter and it is worst exactly when the restaurant is busiest.',
      'Replacing that with an automated agent only helps if the order lands where staff already look. A system that takes calls perfectly but leaves orders in its own separate dashboard just adds a screen to check.',
    ],

    solution: [
      'VAPI handles the call itself — speech, turn-taking and extracting the order into a structured payload. That payload is posted to a FastAPI backend, which validates it, stores the customer and order records, and becomes the single place order state lives.',
      'From there the backend syncs outward: orders appear on the restaurant dashboard in real time, and are pushed into Stream Orders and KitchenHub so they arrive in the tools the kitchen is already working from. Customer details are captured and logged as part of the same flow rather than as a separate step.',
    ],

    architecture: [
      'A thin, deliberately boring pipeline. VAPI owns the conversation and hands off structured data; FastAPI owns validation, persistence and fan-out; the integrations are adapters at the edge. Keeping the backend as the single source of truth means an integration can fail and be retried without the order itself being lost.',
    ],

    diagram: {
      caption: 'Inbound call to kitchen ticket.',
      lanes: [
        { label: 'Caller', nodes: [{ id: 'phone', label: 'Inbound call', sub: 'customer' }] },
        { label: 'Voice', nodes: [{ id: 'vapi', label: 'VAPI agent', sub: 'structured payload', accent: true }] },
        { label: 'Backend', nodes: [{ id: 'api', label: 'FastAPI', sub: 'validate · persist' }] },
        { label: 'Destinations', nodes: [
          { id: 'dash', label: 'Dashboard', sub: 'real time' },
          { id: 'stream', label: 'Stream Orders', sub: 'integration' },
          { id: 'kh', label: 'KitchenHub', sub: 'integration' },
        ] },
      ],
      edges: [
        { from: 'phone', to: 'vapi' },
        { from: 'vapi', to: 'api' },
        { from: 'api', to: 'dash' },
        { from: 'api', to: 'stream', dashed: true },
        { from: 'api', to: 'kh', dashed: true },
      ],
    },

    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI'] },
      { group: 'Frontend', items: ['Next.js'] },
      { group: 'Voice', items: ['VAPI'] },
      { group: 'Integrations', items: ['Stream Orders', 'KitchenHub'] },
    ],

    features: [
      'Inbound phone ordering handled end to end by a voice agent.',
      'Structured order extraction posted to a backend that owns validation and persistence.',
      'Real-time order and customer sync to the restaurant dashboard.',
      'Integrations with Stream Orders and KitchenHub so orders arrive in existing workflows.',
      'Automatic customer record capture as part of the ordering flow.',
    ],

    challenges: [
      {
        title: 'Spoken orders are messy',
        body: 'People change their minds mid-sentence, describe items in their own words, and add instructions that do not map onto a menu field. Getting from that to a payload the kitchen can act on required the agent to confirm back what it heard rather than assuming a clean first pass.',
      },
      {
        title: 'Fitting into tools that already exist',
        body: 'The value of the system depends entirely on orders showing up where staff already look. Integrating with Stream Orders and KitchenHub was not a bonus feature — it was the difference between the agent saving work and creating it.',
      },
    ],

    decisions: [
      {
        title: 'The backend owns the order, not the voice provider',
        body: 'Storing the order in our own database before fanning out means an integration outage is a retry, not a lost order, and the restaurant dashboard never depends on a third party being reachable.',
      },
      {
        title: 'FastAPI for the service layer',
        body: 'The workload is I/O-bound webhook handling and integration calls. FastAPI’s async model fits that directly, and its request validation catches malformed payloads at the boundary.',
      },
    ],

    results: [
      'Inbound phone orders are captured and routed without staff transcribing them by hand.',
      'Orders and customer data reach the dashboard and the kitchen tooling as part of one automated flow.',
      'Running in production for restaurant ordering.',
    ],

    lessons: [
      'An automation is only as useful as its least integrated endpoint. The voice quality mattered less than whether the order reached the kitchen screen.',
      'With voice, confirmation beats confidence. Reading the order back catches the errors that a higher-accuracy model alone would not.',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'image2video-ai',
    title: 'Image2Video AI',
    kicker: 'Multi-model generation pipeline',
    year: '2025',
    status: 'In production',
    live: 'https://image2video.oneorb.ai/',
    featured: true,
    summary:
      'A platform that turns a still image — or a line of text — into video, by chaining several AI services together and making that chain survive the failures each one brings.',
    metaDescription:
      'Case study: Image2Video AI, a NestJS and React platform chaining OpenAI DALL·E, S3 and Kling AI through n8n to generate video, with retry and deduplication built in.',

    role:
      'Full-stack, focused on the generation pipeline, the integrations between services, secure image handling, and making external calls reliable.',

    problem: [
      'Generating a video is not one API call. A text prompt has to become an image, that image has to be stored somewhere addressable, and the video model has to be able to fetch it — each step a separate provider with its own latency, rate limits and failure behaviour.',
      'Chained like that, the weakest link defines the product. A single transient error anywhere in the sequence loses everything upstream of it, and users retrying a failed job can quietly double the cost of every one of those calls.',
    ],

    solution: [
      'The pipeline is explicit: text goes to DALL·E, the result is written to S3 and exposed through a signed URL, and n8n orchestrates the handoff to Kling AI for video generation. Because each stage produces a durable artifact, a failure later in the chain does not discard the work already paid for.',
      'External calls are wrapped in exponential backoff retry logic, and requests are deduplicated in memory so a user pressing the button twice does not trigger two generations. Video jobs are asynchronous, with the frontend polling for status, and the gallery supports filtering, pagination and public or private sharing.',
      'Uploads are checked by inspecting file magic numbers rather than trusting the extension or content-type header, and every object is stored under a user-scoped prefix with access granted through signed URLs.',
    ],

    architecture: [
      'A NestJS REST API with a React single-page frontend, PostgreSQL through TypeORM for persistence, and S3 for image storage. n8n sits between the API and Kling AI as the orchestration layer for video generation, which keeps a multi-step external workflow out of the application code. Both halves are containerised, with nginx serving the built frontend.',
    ],

    diagram: {
      caption: 'Text to video — each stage leaves a durable artifact behind.',
      lanes: [
        { label: 'Client', nodes: [{ id: 'spa', label: 'React SPA', sub: 'polls status' }] },
        { label: 'API', nodes: [{ id: 'api', label: 'NestJS', sub: 'retry · dedupe', accent: true }] },
        { label: 'Image', nodes: [
          { id: 'dalle', label: 'DALL·E', sub: 'text to image' },
          { id: 's3', label: 'AWS S3', sub: 'signed URL' },
        ] },
        { label: 'Video', nodes: [
          { id: 'n8n', label: 'n8n workflow', sub: 'orchestration' },
          { id: 'kling', label: 'Kling AI', sub: 'image to video', accent: true },
        ] },
        { label: 'Store', nodes: [{ id: 'pg', label: 'PostgreSQL', sub: 'job state' }] },
      ],
      edges: [
        { from: 'spa', to: 'api' },
        { from: 'api', to: 'dalle', dashed: true },
        { from: 'dalle', to: 's3' },
        { from: 's3', to: 'n8n', dashed: true },
        { from: 'n8n', to: 'kling', dashed: true },
        { from: 'api', to: 'pg' },
      ],
    },

    stack: [
      { group: 'Backend', items: ['NestJS', 'TypeScript', 'JWT', 'Google OAuth2'] },
      { group: 'Frontend', items: ['React', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Material-UI'] },
      { group: 'AI', items: ['OpenAI DALL·E', 'Kling AI', 'n8n'] },
      { group: 'Data', items: ['PostgreSQL', 'TypeORM', 'AWS S3'] },
      { group: 'Infrastructure', items: ['Docker', 'nginx'] },
    ],

    features: [
      'Image-to-video and text-to-video generation through a single pipeline.',
      'Exponential backoff retries and in-memory duplicate request prevention on every external call.',
      'Secure image handling: magic-number type detection, user-scoped S3 prefixes, signed URL access.',
      'Google OAuth2 and JWT authentication with protected routes across frontend and backend.',
      'Paginated gallery with image-type and date-range filtering, plus public or private sharing per video.',
      'Asynchronous generation with status polling so long jobs never block the interface.',
    ],

    challenges: [
      {
        title: 'Every provider fails differently',
        body: 'DALL·E, S3 and Kling AI each have their own rate limits, timeouts and error semantics. Handling them individually at each call site would have meant four inconsistent implementations, so retry with exponential backoff was applied as a shared pattern across the integration layer.',
      },
      {
        title: 'Duplicate requests are expensive here',
        body: 'Unlike a normal double-submit, a duplicated generation costs real money at two providers. Tracking in-flight requests and rejecting duplicates before they reach the pipeline was cheaper and simpler than reconciling and refunding afterwards.',
      },
      {
        title: 'Passing images between services safely',
        body: 'Kling AI needs to fetch the image, which means it has to be publicly addressable for a moment. Signed URLs with a short lifetime made the object reachable for exactly as long as the handoff required, without making the bucket public.',
      },
      {
        title: 'Integration details that only appear in production',
        body: 'n8n rejected request identifiers beyond a certain length, which surfaced as opaque failures rather than validation errors. Trimming identifiers to fit, and assigning users asynchronously with a retry, resolved a class of bug that was invisible locally.',
      },
    ],

    decisions: [
      {
        title: 'n8n as the orchestration layer',
        body: 'The video step is a multi-stage external workflow that changes more often than the application does. Keeping it in n8n meant that sequence could be adjusted without a backend deploy.',
      },
      {
        title: 'Magic numbers over content-type headers',
        body: 'The declared type of an upload is user input. Reading the actual file signature is the only check that reflects what was really sent.',
      },
      {
        title: 'Polling rather than websockets',
        body: 'Video generation is a minutes-long job with a handful of state changes. Polling was sufficient, and avoided maintaining a socket layer for a feature that did not need one.',
      },
    ],

    results: [
      'Runs in production at image2video.oneorb.ai with both generation modes available.',
      'Transient provider failures are absorbed by retries instead of surfacing as failed jobs.',
      'Duplicate generations are prevented before they reach paid external services.',
    ],

    lessons: [
      'When you chain external services, reliability is the product. The model quality is a given; what users experience is whether the chain held.',
      'Push volatile, multi-step external workflows out of application code. The parts that change weekly should not require a deploy.',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-talent-discovery',
    title: 'AI Talent Discovery Platform',
    kicker: 'Semantic search at scale',
    year: '2025',
    status: 'Shipped',
    live: null,
    featured: true,
    summary:
      'A recruitment platform where searching for candidates works in plain language instead of boolean keyword strings — backed by a search layer built to degrade gracefully rather than go down.',
    metaDescription:
      'Case study: an AI talent discovery platform using Mastra agents and GPT-4 for natural-language candidate search, with a dual OpenSearch and PostgreSQL backend.',

    role:
      'Full-stack, covering the AI search layer, the dual search backend, email outreach automation, and the credit-based subscription system.',

    problem: [
      'Recruiter search is still mostly boolean strings. You have to know that a "React developer" might be indexed as JavaScript, TypeScript, Next.js or front-end, and construct a query that covers all of it. Miss a synonym and you miss the candidate entirely.',
      'The platform needed to accept the query a recruiter would actually type — "senior backend engineer in Lahore who has worked with payments" — and turn that into something a search index can answer well. It also had to serve two audiences from one product: recruiters looking for candidates, and candidates looking for roles.',
    ],

    solution: [
      'Natural-language queries go to agents built on the Mastra framework with GPT-4 behind them. The agents pull out the technical skills implied by the query, expand them into related tags rather than matching only what was literally typed, and separate out constraints like location so they can be applied as filters instead of as text.',
      'Those structured queries run against OpenSearch, with multi-field matching, relevance scoring and result highlighting. A PostgreSQL path using JSONB tag matching exists alongside it, and the application routes to whichever backend is available — so a search cluster problem degrades the quality of results instead of taking search offline.',
      'Around search sits the rest of the product: project-based organisation so recruiters can group searches and shortlist within a context, bulk email outreach and sequences processed through a Bull queue, detailed candidate profiles with export, and a Stripe subscription model metering three separate credit types for search, contact and export.',
    ],

    architecture: [
      'NestJS and React, with TypeORM migrations and seeders managing schema and data. Mastra agents sit in front of the search layer as a query-understanding step, which keeps prompt logic out of the search code and lets the two evolve independently.',
      'The dual search backend is the structural decision. Both paths implement the same interface, so the calling code does not know or care which one answered, and the routing decision is made on infrastructure availability rather than being baked in at build time.',
      'Email is entirely asynchronous — Bull queues on Redis feeding SendGrid — because bulk outreach and sequence automation are exactly the kind of work that should never run inside a web request.',
    ],

    diagram: {
      caption: 'Natural-language query to ranked results, with a fallback path that keeps search alive.',
      lanes: [
        { label: 'Client', nodes: [{ id: 'ui', label: 'React app', sub: 'dual mode UI' }] },
        { label: 'API', nodes: [{ id: 'api', label: 'NestJS', sub: 'credits · access' }] },
        { label: 'Understanding', nodes: [{ id: 'agent', label: 'Mastra + GPT-4', sub: 'tag extraction', accent: true }] },
        { label: 'Search', nodes: [
          { id: 'os', label: 'OpenSearch', sub: 'primary', accent: true },
          { id: 'pg', label: 'PostgreSQL JSONB', sub: 'fallback' },
        ] },
        { label: 'Outreach', nodes: [
          { id: 'bull', label: 'Bull · Redis', sub: 'async' },
          { id: 'sg', label: 'SendGrid', sub: 'sequences' },
        ] },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'agent' },
        { from: 'agent', to: 'os' },
        { from: 'agent', to: 'pg', dashed: true },
        { from: 'api', to: 'bull', dashed: true },
        { from: 'bull', to: 'sg', dashed: true },
      ],
    },

    stack: [
      { group: 'Backend', items: ['NestJS', 'TypeScript', 'Socket.IO', 'JWT', 'Google OAuth2'] },
      { group: 'Frontend', items: ['React', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Radix UI', 'TipTap'] },
      { group: 'AI & search', items: ['Mastra Framework', 'OpenAI GPT-4', 'OpenSearch'] },
      { group: 'Data & queues', items: ['PostgreSQL', 'TypeORM', 'Redis', 'Bull Queue'] },
      { group: 'Platform', items: ['Stripe', 'SendGrid', 'AWS SES', 'Docker'] },
    ],

    features: [
      'Natural-language candidate search with contextual tag expansion and location filtering.',
      'Dual search backend — OpenSearch for full-text relevance, PostgreSQL JSONB as an automatic fallback.',
      'Dual-mode product serving both recruiter and job-seeker workflows with feature access control per mode.',
      'Project-based search organisation with saved histories, shortlisting and per-project analytics.',
      'Bulk email outreach and sequence automation processed asynchronously through Bull and SendGrid.',
      'Detailed candidate profiles covering experience, education, certifications and extracted skills, with PDF export.',
      'Stripe subscriptions metering three independent credit types for search, contact and export.',
    ],

    challenges: [
      {
        title: 'What a recruiter types is not what an index stores',
        body: 'A query for a "React developer" should reach people whose profiles say TypeScript, Next.js or front-end. Doing that with synonym lists gets stale immediately; using an agent to expand tags contextually meant the expansion reflected how the technologies actually relate rather than a hand-maintained mapping.',
      },
      {
        title: 'Search is the product, so search cannot be down',
        body: 'Making OpenSearch a hard dependency would mean a cluster problem is a total outage. Implementing a PostgreSQL path behind the same interface turned that into degraded relevance instead — worse results, but a working product.',
      },
      {
        title: 'Two products sharing one codebase',
        body: 'Recruiters and candidates need different navigation, different permissions and different data. Rather than forking the frontend, mode became a first-class concept driving both rendering and access control, which kept one codebase without the two experiences leaking into each other.',
      },
      {
        title: 'Metering three things that cost differently',
        body: 'A search, a contact reveal and a profile export have different costs and different abuse profiles, so a single credit balance would have been either too generous or too restrictive. Separate credit types tied to the subscription tier let each be priced on its own terms.',
      },
    ],

    decisions: [
      {
        title: 'An agent for query understanding, not for search itself',
        body: 'The model is used to interpret the query and stops there. Ranking stays with OpenSearch, which is deterministic, fast and debuggable — putting the model in the retrieval path would have made results impossible to reason about.',
      },
      {
        title: 'One interface, two search implementations',
        body: 'Because both backends satisfy the same contract, the fallback is an infrastructure concern rather than a branch in business logic, and the primary path can be swapped without touching callers.',
      },
      {
        title: 'Email through a queue, always',
        body: 'Bulk sends and sequences are slow, rate-limited and worth retrying. None of that belongs in a request the user is waiting on.',
      },
    ],

    results: [
      'Recruiters can search in plain language rather than constructing boolean queries.',
      'Search remains available through a fallback path when the primary index is not.',
      'Outreach, billing, profile management and export ship as one product rather than a search demo.',
    ],

    lessons: [
      'Use the model for the part that is genuinely ambiguous — understanding the question — and leave the deterministic parts to systems that can be measured.',
      'Designing the fallback at the same time as the primary path costs very little. Retrofitting one after an outage costs a great deal more.',
    ],
  },
];

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug) || null;
export const featuredProjects = projects.filter((p) => p.featured);
export const projectSlugs = projects.map((p) => p.slug);

export default projects;
