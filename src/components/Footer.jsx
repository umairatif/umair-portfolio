import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons.jsx';
import { site, profiles, real, nav } from '../site.config.js';

export const Footer = () => {
  const github = real(profiles.github);
  const year = new Date().getFullYear();
  const isHome = useLocation().pathname === '/';

  return (
    <footer id="contact" className="w-full pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* CTA + contact block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-ink-line">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
              Get in touch
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-main leading-tight mt-3 mb-5">
              Have a project, or a role, worth talking about?
            </h2>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-xl">
              Email is the most reliable way to reach me — I read and reply to all of it myself.
              A short description of the problem and your rough timeline is all I need to tell
              you whether I'm a good fit.
            </p>
          </div>

          <address className="lg:col-span-5 not-italic space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 text-sm font-semibold text-text-main hover:text-ink-blue transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-brand-primary shrink-0">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>{site.email}</span>
            </a>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 text-sm font-semibold text-text-main hover:text-ink-blue transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-brand-primary shrink-0">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>{site.phoneDisplay} — WhatsApp</span>
            </a>

            <div className="flex items-center gap-4 text-sm font-semibold text-text-main">
              <span className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-brand-primary shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>{site.locality}, {site.country}</span>
            </div>

            <div className="flex items-center gap-3 pt-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-card-bg border border-ink-line flex items-center justify-center text-ink-muted hover:text-text-main hover:border-brand-primary transition-all"
                  aria-label="Umair Atif on GitHub (opens in new tab)"
                >
                  <GithubIcon size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </address>
        </div>

        {/* Nav + brand */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b border-ink-line">
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-primary text-white font-heading font-black text-sm flex items-center justify-center" aria-hidden="true">
                UA
              </span>
              <span className="font-heading font-extrabold text-base tracking-wider text-text-main">
                UMAIR <span className="text-brand-primary">ATIF</span>
              </span>
            </Link>
            <p className="text-[13px] text-ink-muted leading-relaxed max-w-xs">
              Full-stack developer building AI-integrated web products, backend systems and
              cloud infrastructure.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-1">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-ink-muted uppercase mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm text-ink-muted list-none p-0 m-0">
              {nav.map((item) =>
                item.href.startsWith('/#') ? (
                  <li key={item.label}>
                    <a href={isHome ? item.href.slice(1) : item.href} className="hover:text-text-main transition-colors">{item.label}</a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link to={item.href} className="hover:text-text-main transition-colors">{item.label}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="md:col-span-1">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-ink-muted uppercase mb-4">
              Case studies
            </h3>
            <ul className="space-y-2.5 text-sm text-ink-muted list-none p-0 m-0">
              <li><Link to="/projects/vibecoder" className="hover:text-text-main transition-colors">VibeCoder</Link></li>
              <li><Link to="/projects/ai-talent-discovery" className="hover:text-text-main transition-colors">AI Talent Discovery</Link></li>
              <li><Link to="/projects/image2video-ai" className="hover:text-text-main transition-colors">Image2Video AI</Link></li>
              <li><Link to="/projects" className="text-brand-primary font-semibold inline-flex items-center gap-1 hover:underline">All projects <ArrowUpRight className="w-3 h-3" aria-hidden="true" /></Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[12px] text-ink-muted gap-3 pt-8">
          <p className="m-0">© {year} {site.name}. Built with React, Tailwind CSS and Vite.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
