import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { about } from '../data/content.js';

const stats = [
  { value: '4+', label: 'Years building' },
  { value: '100+', label: 'Products shipped' },
  { value: '100%', label: 'Remote delivery' },
];

export const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="about-section">
      <div className="about-inner">

        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="about-sidebar">

          {/* Stats */}
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/" state={{ scrollTo: 'contact' }} className="about-cta">
            Let's work together <ArrowUpRight size={15} aria-hidden="true" />
          </Link>

        </aside>

        {/* ── Main content ────────────────────────────────────── */}
        <div className="about-content">

          {/* Section label */}
          <div className="about-label-row">
            <span className="eyebrow">
              <i aria-hidden="true" />
              About
            </span>
          </div>

          <h2 id="about-heading" className="about-heading">
            Who I am and<br />what I actually build
          </h2>

          {/* Narrative */}
          <div className="about-narrative">
            {about.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              The impact is practical: helping teams turn uncertain ideas into
              products people can use, and making the systems behind those
              products reliable enough to grow with them.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;