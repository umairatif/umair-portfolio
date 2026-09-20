import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { FeaturedWork } from '../components/FeaturedWork';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Faq } from '../components/Faq';
import { useSeo } from '../lib/useSeo.js';
import { personSchema, websiteSchema, faqSchema } from '../lib/schema.js';
import { faq } from '../data/content.js';

export const Home = () => {
  useSeo({
    title: null, // homepage uses the bare site title, set inside useSeo
    description:
      "Umair Atif is a full-stack developer in Lahore, Pakistan building AI-integrated SaaS products, backend systems and cloud infrastructure with React, NestJS and AWS.",
    path: '/',
    jsonLd: [personSchema(), websiteSchema(), faqSchema(faq)],
  });

  return (
    <main id="main">
      <Hero />
      <About />
      <FeaturedWork />
      <Services />
      <Process />
      <Faq />
    </main>
  );
};

export default Home;
