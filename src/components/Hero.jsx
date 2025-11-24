import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Hero = () => {
  const { content } = useSiteContent();
  const hero = content?.hero;

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">{hero?.title ?? 'SIRWAGYA'}</h1>
            <p className="hero-subtitle">{hero?.subtitle ?? 'Jack of all trades, a polymath.'}</p>
            <p className="hero-bio">{hero?.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
