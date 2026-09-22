import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { useSeo } from '../lib/useSeo.js';
import { websiteSchema, breadcrumbSchema, projectListSchema } from '../lib/schema.js';

export const ProjectsIndex = () => {
  useSeo({
    title: 'Projects',
    description:
      'Case studies from Umair Atif, a full-stack developer: an AI code generation platform, a voice ordering agent, a video generation pipeline, and a semantic candidate search engine.',
    path: '/projects',
    jsonLd: [
      websiteSchema(),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]),
      projectListSchema(projects),
    ],
  });

  return (
    <main id="main">
      <nav aria-label="Breadcrumb" className="route-breadcrumb">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          <li><Link to="/" className="hover:text-brand-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text-main font-medium">Projects</li>
        </ol>
      </nav>

      <header className="section-wrap route-page-header pb-8">
        <p className="eyebrow">Case Studies</p>
        <h1 className="route-page-title">
          Projects I've designed, built and shipped
        </h1>
        <p className="route-page-intro">
          Five systems in production or recently shipped, each written up as problem,
          solution, architecture and outcome — not just a list of technologies.
        </p>
      </header>

      <section className="section-wrap route-page-content pt-0" aria-label="All projects">
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group border border-card-border bg-card-bg rounded-xl p-6 md:p-8 transition-all duration-250 hover:border-brand-primary/40"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1.5">
                    <p className="font-mono text-[10px] text-brand-primary font-semibold tracking-wider uppercase">
                      {project.kicker}
                    </p>
                    <span className="text-[10px] font-mono text-text-muted">· {project.year}</span>
                    <span className="text-[10px] font-mono text-text-muted">· {project.status}</span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-text-main">
                    {project.title}
                  </h2>
                </div>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="nav-cta inline-flex items-center gap-1.5 self-start"
                  >
                    Live site <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-5">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.flatMap((g) => g.items).slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded text-[10px] font-mono font-medium bg-bg-site text-text-main border border-border-main"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-primary group-hover:underline"
              >
                Read the full case study
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsIndex;
