import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const UnofficialWorks = () => {
  const { content } = useSiteContent();
  const works = content?.works ?? [];

  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">UNOFFICIAL WORKS</h2>
        
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          maxWidth: '800px'
        }}>
          {works.length === 0 && <p style={{ opacity: 0.5 }}>Add club or side work entries from admin.</p>}
          {works.map((work, index) => (
            <div key={index}>
              <h3 style={{ 
                fontSize: 'var(--text-xl)',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                {work.title}
              </h3>
              <p style={{ 
                fontSize: 'var(--text-base)',
                opacity: 0.6,
                lineHeight: 1.7
              }}>
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnofficialWorks;
