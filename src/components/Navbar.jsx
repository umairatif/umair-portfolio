import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { nav, site } from '../site.config.js';

export const Navbar = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState(isHome ? 'home' : '');
  const [isDarkSurface, setIsDarkSurface] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('contact');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsDarkSurface(entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const sectionIds = ['home', 'about', 'projects', 'services', 'process', 'testimonials', 'faq'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const navbarOffset = 120;
      let currentSection = 'home';

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= navbarOffset) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    const frameId = requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isHome]);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;

    window.addEventListener('scroll', closeMenu, { passive: true, once: true });
    return () => window.removeEventListener('scroll', closeMenu);
  }, [open]);

  return (
    <header className={`nav-wrap ${isDarkSurface ? 'nav-wrap--dark' : ''}`}>
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="brand" aria-label={`${site.name} — home`} onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">UA</span>
          <span>UMAIR <b>ATIF</b></span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {nav.map((item) => {
            const isSectionLink = item.href.startsWith('/#');
            const sectionId = isSectionLink ? item.href.slice(2) : null;
            const isActive = sectionId
              ? isHome && activeSection === sectionId
              : item.href === '/'
                ? isHome && activeSection === 'home'
                : item.href === '/projects'
                  ? isHome ? activeSection === 'projects' : pathname === item.href
                  : pathname === item.href;

            if (isSectionLink) {
              return (
                <Link key={item.label} to="/" state={{ scrollTo: sectionId }} className={isActive ? 'active' : ''}>
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'active' : ''}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
        </button>

        {/* Desktop CTA */}
        {isHome ? (
          <Link className="nav-cta" to="/" state={{ scrollTo: 'contact' }} aria-label="Let's talk about your project">
            Let's talk <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        ) : (
          <Link className="nav-cta" to="/" state={{ scrollTo: 'contact' }} aria-label="Let's talk about your project">
            Let's talk <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        )}
      </nav>

      {/* Floating Menu Toggle Button (Rendered outside .nav container) */}
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* Mobile Flyout Drawer */}
      <div
        className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`}
        id="mobile-menu"
        aria-hidden={!open}
      >
        {nav.map((item) => {
          const isSectionLink = item.href.startsWith('/#');
          const sectionId = isSectionLink ? item.href.slice(2) : null;
          const isActive = sectionId
            ? isHome && activeSection === sectionId
            : item.href === '/'
              ? isHome && activeSection === 'home'
              : item.href === '/projects'
                ? isHome ? activeSection === 'projects' : pathname === item.href
                : pathname === item.href;
          if (isSectionLink) {
            return (
              <Link key={item.label} to="/" state={{ scrollTo: sectionId }} onClick={closeMenu} className={isActive ? 'active' : ''}>
                {item.label}
              </Link>
            );
          }
          return (
            <Link key={item.label} to={item.href} onClick={closeMenu} className={isActive ? 'active' : ''}>
              {item.label}
            </Link>
          );
        })}
        {isHome ? (
          <Link to="/" state={{ scrollTo: 'contact' }} onClick={closeMenu} className="mobile-cta">
            Let's talk
          </Link>
        ) : (
          <Link to="/" state={{ scrollTo: 'contact' }} onClick={closeMenu} className="mobile-cta">
            Let's talk
          </Link>
        )}

        <button
          type="button"
          className="mobile-theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
          <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;