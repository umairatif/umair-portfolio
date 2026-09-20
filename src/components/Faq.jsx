import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/content.js';

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-wrap work-section" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl font-heading font-black tracking-tight text-text-main mt-3">
            Questions people actually ask
          </h2>
        </div>

        <dl className="divide-y divide-border-main border-t border-b border-border-main">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.q}>
                <dt>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm md:text-base text-text-main">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-brand-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden m-0 ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default Faq;
