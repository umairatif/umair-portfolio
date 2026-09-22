import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProjectsIndex } from './pages/ProjectsIndex';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import Footer from './components/Footer';
import { projectBySlug } from './data/projects.js';

function ScrollToHash() {
  const { hash, pathname, state } = useLocation();

  useEffect(() => {
    const targetId = state?.scrollTo || hash.replace('#', '');
    if (!targetId) return undefined;

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', pathname);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [hash, pathname, state]);

  return null;
}

// Maps the current route to the browser-tab title. Only runs after the first
// in-app navigation, so a brand-new tab or a refresh keeps the static
// "Portfolio" title from index.html instead.
function titleForRoute(pathname) {
  if (pathname === '/') return 'Home';
  if (pathname === '/projects') return 'Projects';

  const projectPath = pathname.match(/^\/projects\/([^/]+)/);
  if (projectPath) {
    const project = projectBySlug(decodeURIComponent(projectPath[1]));
    return project ? project.title : 'Page not found';
  }

  return 'Page not found';
}

function App() {
  const location = useLocation();

  // Update the tab title on every client-side navigation. The ref guard keeps
  // React StrictMode's double-invoked effects from mistaking the initial
  // mount for a navigation.
  const lastKeyRef = useRef(location.key);
  useLayoutEffect(() => {
    if (lastKeyRef.current !== location.key) {
      document.title = titleForRoute(location.pathname);
      lastKeyRef.current = location.key;
    }
  }, [location]);

  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  
  return (
    <div className={`site-shell theme-${theme}`}>
      <ScrollToHash />
      <a
        href="/"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
