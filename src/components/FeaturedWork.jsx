import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/projects.js';

export const FeaturedWork = () => {
  return (
    <section id="projects" className="section-wrap work-section featured-work-section" aria-labelledby="work-heading">
      <div className="featured-work-head">
        <div className="featured-work-heading">
          <span className="eyebrow">
            <i aria-hidden="true" />
            Case studies
          </span>
          <h2 id="work-heading">Selected work</h2>
          <p>A few products and systems built from first constraint to production.</p>
        </div>
        <Link to="/projects" className="featured-work-all">
          View all projects <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <div className="featured-work-grid">
        {featuredProjects.map((project, index) => (
          <article
            key={project.slug}
            className="featured-project-card"
          >
            <div className="featured-project-topline">
              <span className="featured-project-number">0{index + 1}</span>
              <span className="featured-project-status">{project.status} · {project.year}</span>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="featured-project-live"
                  aria-label={`Open live demo of ${project.title} (opens in new tab)`}
                  title="Live demo"
                >
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="featured-project-body">
              <p className="featured-project-kicker">
                  {project.kicker}
              </p>
              <h3>{project.title}</h3>
              <p className="featured-project-summary">{project.summary}</p>
            </div>

            <div className="featured-project-stack">
              {project.stack.slice(0, 2).flatMap((g) => g.items).slice(0, 5).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <Link to={`/projects/${project.slug}`} className="featured-project-link">
              Read the case study <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
