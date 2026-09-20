import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { nav, site } from '../site.config.js';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const closeMenu = () => setOpen(false);

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="brand" aria-label={`${site.name} — home`}>
          <span className="brand-mark" aria-hidden="true">UA</span>
          <span>UMAIR <b>ATIF</b></span>
        </Link>

        <div className="nav-links">
          {nav.map((item) => {
            const isSectionLink = item.href.startsWith('/#');
            const isActive = item.href === '/' ? pathname === '/' : pathname === item.href;
            if (isSectionLink) {
              // Section anchors only resolve correctly from the homepage;
              // from another route, send users home first, then to the anchor.
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

        {open && (
          <div className="mobile-menu" id="mobile-menu">
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
            <a href={isHome ? '#contact' : '/#contact'} onClick={closeMenu}>Let's talk</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
