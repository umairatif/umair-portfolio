import React from 'react';
import { services } from '../data/content.js';

export const Services = () => {
  return (
    <section id="services" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24 md:px-12">
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-main leading-tight mt-3">
            What I do
          </h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-4">
            Four areas that come up in nearly every project I've shipped — usually together,
            not separately.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-main/60 border border-border-main">
          {services.map((service) => (
            <article key={service.id} className="bg-bg-site p-7 md:p-9">
              <span className="block font-mono text-xs text-brand-primary font-semibold mb-4">
                {service.number}
              </span>
              <h3 className="font-heading font-bold text-text-main text-lg mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {service.body}
              </p>
              <ul className="flex flex-wrap gap-1.5" aria-label={`Technologies for ${service.title}`}>
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-2 py-1 text-[10px] font-mono font-medium bg-card-bg text-text-main border border-card-border rounded"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
