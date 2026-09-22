import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowUpRight, ArrowUp } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons.jsx';
import { site, profiles, real, nav } from '../site.config.js';

export const Footer = () => {
  const github = real(profiles.github);
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [headlinePhrase, setHeadlinePhrase] = useState(0);
  const headlinePhrases = ['worth talking about?', 'ready to build?', 'built to scale?'];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFooterVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setHeadlinePhrase((currentPhrase) => (currentPhrase + 1) % headlinePhrases.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isFooterVisible, headlinePhrases.length]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <footer ref={footerRef} id="contact" className={`footer-root ${isFooterVisible ? 'footer-root--visible' : ''}`}>

        {/* ── CTA Strip ────────────────────────────────────────── */}
        <div className="footer-cta-strip">
          <div className="footer-inner">
            <div className="footer-cta-grid">
              <aside className="footer-directory">
                <Link to="/" className="footer-mark-link" aria-label="Umair Atif — home">
                  <span className="footer-brand-mark" aria-hidden="true">UA</span>
                  <span>UMAIR <b>ATIF</b></span>
                </Link>
                <span className="footer-intro-note">Full-stack product engineering</span>
                <nav className="footer-directory-nav" aria-label="Footer navigation">
                  {nav.map((item) =>
                    item.href.startsWith('/#') ? (
                      <Link key={item.label} to="/" state={{ scrollTo: item.href.slice(2) }}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link key={item.label} to={item.href}>{item.label}</Link>
                    )
                  )}
                </nav>
                <span className="footer-directory-caption">Available for select projects</span>
              </aside>

              <div className="footer-cta-left">
                <span className="footer-eyebrow">Get in touch</span>
                <h2 className="footer-headline">
                  <span className="footer-headline-line">
                    <span className="footer-headline-word">Have</span>{' '}
                    <span className="footer-headline-word">a</span>{' '}
                    <span className="footer-headline-word">project,</span>
                  </span>
                  <span className="footer-headline-line footer-headline-line--accent">
                    <em key={headlinePhrases[headlinePhrase]} className="footer-headline-rotating">
                      {headlinePhrases[headlinePhrase]}
                    </em>
                  </span>
                </h2>
                <p className="footer-sub">
                  Email is the most reliable way to reach me — I read and reply
                  to all of it myself. A short description of the problem and
                  your rough timeline is all I need.
                </p>
                <a href={`mailto:${site.email}`} className="footer-cta-btn" aria-label={`Send email to ${site.email}`}>
                  <span>{site.email}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>

              <div className="footer-contact-list footer-contact-list--wide">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="footer-contact-item"
                >
                  <span className="footer-contact-icon">
                    <Phone size={15} aria-hidden="true" />
                  </span>
                  <div className="footer-contact-copy">
                    <span className="footer-contact-label">WhatsApp</span>
                    <span className="footer-contact-value">{site.phoneDisplay}</span>
                  </div>
                  <ArrowUpRight className="footer-contact-arrow" size={16} aria-hidden="true" />
                </a>

                <div className="footer-contact-item footer-contact-item--static">
                  <span className="footer-contact-icon">
                    <MapPin size={15} aria-hidden="true" />
                  </span>
                  <div className="footer-contact-copy">
                    <span className="footer-contact-label">Location</span>
                    <span className="footer-contact-value">{site.locality}, {site.country}</span>
                  </div>
                </div>

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <GithubIcon size={15} aria-hidden="true" />
                    </span>
                    <div className="footer-contact-copy">
                      <span className="footer-contact-label">GitHub</span>
                      <span className="footer-contact-value">umairatif</span>
                    </div>
                    <ArrowUpRight className="footer-contact-arrow" size={16} aria-hidden="true" />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────── */}
        <div className="footer-bottom-bar">
          <div className="footer-inner footer-bottom-inner">
            <p className="footer-copy">
              © {year} {site.name}. All rights reserved.
            </p>
            <span className="footer-bottom-role">{site.role}</span>
          </div>
        </div>
      </footer>

      {/* Scroll to top FAB */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'scroll-top-btn--visible' : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </>
  );
};

export default Footer;

