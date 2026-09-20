import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons.jsx';
import { site, profiles, real } from '../site.config.js';

// A one-shot entrance is a CSS `animation`, not a JS-driven library — it
// costs nothing at runtime and is switched off globally by the
// prefers-reduced-motion rule in index.css.
export const Hero = () => {
  const github = real(profiles.github);

  return (
    <section id="home" className="hero-section" aria-label="Introduction">
      <div className="hero-grid">
        <div className="hero-copy hero-enter hero-enter-1">
          <p className="eyebrow"><i aria-hidden="true" /> Hello, I'm</p>
          <h1>UMAIR <em>ATIF</em></h1>
          <p className="role">{site.role.toUpperCase()}</p>
          <span className="rule" aria-hidden="true" />
          <p className="intro">
            I build full-stack web products — backend, frontend and the AWS infrastructure
            they run on — with a recent focus on integrating AI models into real, shipped
            SaaS platforms.
          </p>
          <div className="hero-actions">
            <Link className="button solid" to="/projects">
              View case studies <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a className="text-link" href="#about">About me <span aria-hidden="true">↗</span></a>
          </div>
          {site.available && (
            <div className="availability">
              <span className="availability-dot" aria-hidden="true" />
              <div>
                <strong>Available for select projects</strong>
                <small>Based in {site.locality}, {site.country} · Working worldwide</small>
              </div>
            </div>
          )}

          <div className="social-rail" aria-label="Profile links">
            {github && (
              <a href={github} target="_blank" rel="noreferrer noopener" className="hero-github-btn">
                <GithubIcon size={16} aria-hidden="true" />
                <span>GitHub / <strong>Umair-eng-dev</strong></span>
              </a>
            )}
            <a href={`mailto:${site.email}`}>
              <Mail size={16} aria-hidden="true" /> Email
            </a>
          </div>
        </div>

        <div className="hero-visual hero-enter hero-enter-2">
          <div className="hero-portrait-frame">
            <div className="portrait-fallback">
              <span>UA</span>
              <small>FULL-STACK DEVELOPMENT</small>
            </div>
          </div>
          <div className="visual-card card-top">
            <span aria-hidden="true">01</span>
            <b>ARCHITECTURE</b>
            <small>Systems designed to fail gracefully.</small>
          </div>
          <div className="visual-card card-bottom">
            <span aria-hidden="true">02</span>
            <b>EXECUTION</b>
            <small>Shipped and running in production.</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
