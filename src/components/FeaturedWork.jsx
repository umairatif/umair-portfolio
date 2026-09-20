import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/projects.js';

export const FeaturedWork = () => {
  return (
    <section id="projects" className="section-wrap work-section" aria-labelledby="work-heading">
      <div className="section-head">
        <div>
          <p className="eyebrow">Case Studies</p>
          <h2 id="work-heading">Selected work</h2>
        </div>
        <Link to="/projects" className="text-link">
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            className="group bg-card-bg border border-card-border rounded-xl p-6 flex flex-col transition-all duration-250 hover:border-brand-primary/40 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-mono text-[10px] text-brand-primary font-semibold tracking-wider uppercase mb-1.5">
                  {project.kicker}
                </p>
                <h3 className="font-heading font-bold text-xl text-text-main">
                  {project.title}
                </h3>
              </div>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="shrink-0 text-text-muted hover:text-brand-primary transition-colors"
                  aria-label={`Open live demo of ${project.title} (opens in new tab)`}
                  title="Live demo"
                >
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>

            <p className="text-[13px] text-text-muted leading-relaxed mb-5 flex-1">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.slice(0, 2).flatMap((g) => g.items).slice(0, 5).map((tech) => (
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
              Read the case study
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
