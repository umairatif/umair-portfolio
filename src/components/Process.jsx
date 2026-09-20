import React from 'react';
import { process, principles } from '../data/content.js';

export const Process = () => {
  return (
    <section id="process" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14">
        {/* Left: how I work, step by step */}
        <div className="lg:col-span-7">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
            Process
          </span>
          <h2 className="text-3xl font-heading font-black tracking-tight text-text-main mt-3 mb-4">
            How I approach a project
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-lg mb-10">
            Roughly the same shape whether it's a greenfield product or reliability work
            on something already live.
          </p>

          <ol className="relative pl-9 border-l border-border-main space-y-9 list-none">
            {process.map((step) => (
              <li key={step.number} className="relative">
                <span
                  className="absolute -left-[45px] top-0 w-7 h-7 rounded-full border border-border-main bg-bg-site flex items-center justify-center font-mono text-[10px] font-bold text-brand-primary"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-sm tracking-wide text-text-main mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: engineering principles */}
        <div className="lg:col-span-5">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
            Principles
          </span>
          <h3 className="font-heading font-bold text-lg text-text-main mt-3 mb-6">
            A few things I've learned to insist on
          </h3>
          <div className="space-y-5">
            {principles.map((p) => (
              <div key={p.title} className="pb-5 border-b border-border-main/70 last:border-0 last:pb-0">
                <h4 className="font-heading font-bold text-[13px] text-text-main mb-1.5">
                  {p.title}
                </h4>
                <p className="text-[12.5px] text-text-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
