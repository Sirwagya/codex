import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import CustomCursor from '../components/CustomCursor';
import Hero from '../components/Hero';
import Academics from '../components/Academics';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import UnofficialWorks from '../components/UnofficialWorks';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const PortfolioPage = () => {
  const { content, loading, error } = useSiteContent();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const logoText = content?.branding?.logoText ?? 'Sirwagya';

  return (
    <>
      <CustomCursor />
      <nav>
        <div className="container">
          <div className="logo">{logoText}</div>
          <div className="nav-links">
            <a href="#academics">Academics</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </nav>

      {(loading || error) && (
        <div className={`content-status ${error ? 'error' : ''}`}>
          {loading && 'Syncing personalized copy…'}
          {!loading && error && 'Unable to load Supabase copy. Showing defaults.'}
        </div>
      )}

      <Hero />
      <Academics />
      <Skills />
      <Projects />
      <UnofficialWorks />
      {/* GitHub frequency section temporarily disabled */}
      <Contact />
      <Footer />
    </>
  );
};

export default PortfolioPage;
