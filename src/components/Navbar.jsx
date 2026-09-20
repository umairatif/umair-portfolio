import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons.jsx';
import { nav, site, profiles, real } from '../site.config.js';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const github = real(profiles.github);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="brand" onClick={closeMenu} aria-label={`${site.name} — home`}>
          <span className="brand-mark" aria-hidden="true">UA</span>
          <span>UMAIR <b>ATIF</b></span>
        </Link>

        <div className="nav-links">
          {nav.map((item) => {
            const isSectionLink = item.href.startsWith('/#');
            const isActive = item.href === '/' ? pathname === '/' : pathname === item.href;
            if (isSectionLink) {
              return (
                <a key={item.label} href={isHome ? item.href.slice(1) : item.href}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} to={item.href} aria-current={isActive ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          {github && (
            <a
              className="nav-github"
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile — Umair-eng-dev"
            >
              <GithubIcon size={15} aria-hidden="true" />
              <span>Umair-eng-dev</span>
            </a>
          )}

          <a className="nav-cta" href={isHome ? '#contact' : '/#contact'}>
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu">
          {nav.map((item) => {
            const isSectionLink = item.href.startsWith('/#');
            if (isSectionLink) {
              return (
                <a key={item.label} href={isHome ? item.href.slice(1) : item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} to={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            );
          })}

          {github && (
            <a
              className="mobile-github-btn"
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              onClick={closeMenu}
            >
              <GithubIcon size={16} aria-hidden="true" />
              <span>Umair-eng-dev</span>
            </a>
          )}

          <a href={isHome ? '#contact' : '/#contact'} className="mobile-cta-btn" onClick={closeMenu}>
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

