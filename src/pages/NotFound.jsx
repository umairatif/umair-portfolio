import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../lib/useSeo.js';

export const NotFound = () => {
  useSeo({
    title: 'Page not found',
    description: 'This page does not exist. Return to the homepage or browse project case studies.',
    path: '/404',
  });

  return (
    <main id="main" className="section-wrap text-center py-32">
      <p className="font-mono text-sm text-brand-primary font-semibold mb-3">404</p>
      <h1 className="font-heading font-black text-3xl md:text-4xl text-text-main mb-4">
        This page doesn't exist
      </h1>
      <p className="text-text-muted max-w-md mx-auto mb-8">
        The link you followed may be broken, or the page may have moved.
      </p>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <Link to="/" className="button solid">Back to homepage <ArrowRight size={16} aria-hidden="true" /></Link>
        <Link to="/projects" className="text-link">View projects <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
};

export default NotFound;
