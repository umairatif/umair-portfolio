import React from 'react';
import { Link } from 'react-router-dom';
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

        <div className="flex flex-col border-t border-border-main">
            {services.map((service) => (
            <Link
              to="/"
              state={{ scrollTo: 'contact' }}
              key={service.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-border-main hover:bg-black/2 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                <span className="font-mono text-xs md:text-sm text-brand-primary font-semibold whitespace-nowrap">
                  // {service.number}/
                </span>
                <div>
                  <h3 className="font-heading font-bold text-text-main text-xl md:text-2xl tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed md:max-w-xl">
                    {service.body}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
