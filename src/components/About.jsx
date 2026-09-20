import React from 'react';
import { Terminal } from 'lucide-react';
import { about, skills } from '../data/content.js';
import { site } from '../site.config.js';

export const About = () => {
  return (
    <section id="about" className="section-wrap" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Narrative */}
        <article className="lg:col-span-7 bg-card-bg rounded-3xl p-8 md:p-10 border border-card-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
              About
            </span>
            <Terminal className="w-4 h-4 text-text-muted" aria-hidden="true" />
          </div>
          <h2 id="about-heading" className="text-2xl md:text-3xl font-heading font-black tracking-tight text-text-main leading-tight mb-6">
            Who I am and what I actually build
          </h2>
          <div className="space-y-4 text-text-main text-sm md:text-[15px] leading-relaxed">
            {about.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="pt-6 mt-6 border-t border-card-border flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted font-medium">
            <span>{site.locality}, {site.country}</span>
            <span aria-hidden="true">·</span>
            <span>Remote-first</span>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="text-brand-primary font-bold hover:underline">Get in touch →</a>
          </div>
        </article>

        {/* Skills */}
        <div className="lg:col-span-5 bg-card-bg rounded-3xl p-8 border border-card-border shadow-sm flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase mb-1">
            Stack
          </span>
          <h3 className="font-heading font-bold text-lg text-text-main mb-5">
            Technologies I work with
          </h3>
          <dl className="space-y-4">
            {skills.map((group) => (
              <div key={group.group}>
                <dt className="text-[10px] font-bold tracking-[0.15em] text-text-muted uppercase mb-2 font-mono">
                  {group.group}
                </dt>
                <dd className="flex flex-wrap gap-1.5 m-0">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold border border-card-border bg-bg-site text-text-main"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
