import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projectBySlug, projects } from '../data/projects.js';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram.jsx';
import { useSeo } from '../lib/useSeo.js';
import { websiteSchema, breadcrumbSchema, projectSchema } from '../lib/schema.js';

function ProjectNav({ current }) {
  const idx = projects.findIndex((p) => p.slug === current.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return (
    <nav className="flex items-center justify-between gap-4 border-t border-border-main pt-8 mt-4" aria-label="More projects">
      <Link to={`/projects/${prev.slug}`} className="group max-w-[45%]">
        <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">← Previous</span>
        <span className="font-heading font-bold text-sm text-text-main group-hover:text-brand-primary transition-colors">{prev.title}</span>
      </Link>
      <Link to={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
        <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">Next →</span>
        <span className="font-heading font-bold text-sm text-text-main group-hover:text-brand-primary transition-colors">{next.title}</span>
      </Link>
    </nav>
  );
}

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectBySlug(slug);

  // Hooks must run unconditionally, before any early return.
  useSeo({
    title: project ? project.title : 'Project not found',
    description: project ? project.metaDescription : 'This project could not be found.',
    path: `/projects/${slug}`,
    type: 'article',
    jsonLd: project
      ? [
          websiteSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          projectSchema(project),
        ]
      : undefined,
  });

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <main id="main">
      <nav aria-label="Breadcrumb" className="route-breadcrumb">
        <ol className="flex items-center gap-2 list-none p-0 m-0 flex-wrap">
          <li><Link to="/" className="hover:text-brand-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/projects" className="hover:text-brand-primary">Projects</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text-main font-medium">{project.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="section-wrap route-page-header pb-10">
        <Link to="/projects" className="text-link mb-6 inline-flex">
          <ArrowLeft size={14} aria-hidden="true" /> All projects
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <p className="font-mono text-[11px] text-brand-primary font-semibold tracking-wider uppercase">
                {project.kicker}
              </p>
              <span className="text-[11px] font-mono text-text-muted">· {project.year}</span>
              <span className="text-[11px] font-mono text-text-muted">· {project.status}</span>
            </div>
            <h1 className="route-page-title route-page-title--detail">
              {project.title}
            </h1>
            <p className="route-page-intro route-page-intro--detail">
              {project.summary}
            </p>
          </div>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="button solid self-start shrink-0"
            >
              View live site <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <div className="section-wrap route-page-content pt-0 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main column */}
        <article className="lg:col-span-8 space-y-14">
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="font-heading font-bold text-xl text-text-main mb-4">The problem</h2>
            <div className="space-y-4 text-[15px] text-body-text leading-relaxed">
              {project.problem.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="font-heading font-bold text-xl text-text-main mb-4">The solution</h2>
            <div className="space-y-4 text-[15px] text-body-text leading-relaxed">
              {project.solution.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {project.diagram && (
            <section aria-labelledby="architecture-heading">
              <h2 id="architecture-heading" className="font-heading font-bold text-xl text-text-main mb-4">Architecture</h2>
              <div className="space-y-4 text-[15px] text-body-text leading-relaxed mb-6">
                {project.architecture.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <ArchitectureDiagram diagram={project.diagram} title={project.title} />
            </section>
          )}

          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="font-heading font-bold text-xl text-text-main mb-4">Key features</h2>
            <ul className="space-y-3 list-none p-0 m-0">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-body-text leading-relaxed">
                  <span className="text-brand-primary font-bold mt-0.5 shrink-0" aria-hidden="true">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="challenges-heading">
            <h2 id="challenges-heading" className="font-heading font-bold text-xl text-text-main mb-5">Challenges</h2>
            <div className="space-y-6">
              {project.challenges.map((c) => (
                <div key={c.title} className="border-l-2 border-border-main pl-5">
                  <h3 className="font-heading font-bold text-sm text-text-main mb-1.5">{c.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="decisions-heading">
            <h2 id="decisions-heading" className="font-heading font-bold text-xl text-text-main mb-5">Technical decisions</h2>
            <div className="space-y-6">
              {project.decisions.map((d) => (
                <div key={d.title} className="border-l-2 border-brand-primary/40 pl-5">
                  <h3 className="font-heading font-bold text-sm text-text-main mb-1.5">{d.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="results-heading" className="bg-card-bg border border-card-border rounded-xl p-6 md:p-8">
            <h2 id="results-heading" className="font-heading font-bold text-xl text-text-main mb-4">Result</h2>
            <ul className="space-y-3 list-none p-0 m-0">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-body-text leading-relaxed">
                  <span className="text-brand-primary font-bold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {project.lessons?.length > 0 && (
            <section aria-labelledby="lessons-heading">
              <h2 id="lessons-heading" className="font-heading font-bold text-xl text-text-main mb-4">Lessons learned</h2>
              <ul className="space-y-3 list-none p-0 m-0">
                {project.lessons.map((l, i) => (
                  <li key={i} className="text-sm text-text-muted leading-relaxed italic border-l-2 border-border-main pl-4">
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted mb-4">
                My role
              </h2>
              <p className="text-sm text-body-text leading-relaxed">{project.role}</p>
            </div>

            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted mb-4">
                Technology
              </h2>
              <div className="space-y-4">
                {project.stack.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-mono text-brand-primary font-semibold uppercase mb-1.5">{group.group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="px-2 py-1 rounded text-[10px] font-mono font-medium bg-bg-site text-text-main border border-border-main">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer noopener" className="button solid w-full justify-center">
                Visit live site <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </aside>
      </div>

      <div className="section-wrap route-page-content pt-0">
        <ProjectNav current={project} />
      </div>
    </main>
  );
};

export default ProjectDetail;
