import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Academics = () => {
  const { content } = useSiteContent();
  const academics = content?.academics ?? [];

  return (
    <section id="academics">
      <div className="container">
        <h2 className="section-title">ACADEMICS</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {academics.length === 0 && (
            <p style={{ opacity: 0.5 }}>Add your academic history from the admin panel.</p>
          )}
          {academics.map((item, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: 'var(--text-base)',
                opacity: 0.5,
                marginBottom: '0.5rem',
                fontWeight: 500
              }}>
                {item.year}
              </div>
              <div style={{ 
                fontSize: 'var(--text-xl)',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                {item.title}
              </div>
              <div style={{ 
                fontSize: 'var(--text-base)',
                opacity: 0.6,
                maxWidth: '600px'
              }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Academics;
