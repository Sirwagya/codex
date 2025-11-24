import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Skills = () => {
  const { content } = useSiteContent();
  const skillGroups = content?.skillGroups ?? [];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">SKILLS</h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-md)',
          maxWidth: '900px'
        }}>
          {skillGroups.length === 0 && (
            <p style={{ opacity: 0.5 }}>Add skill groups in the admin panel.</p>
          )}
          {skillGroups.map((group, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                marginBottom: '1rem',
                opacity: 0.5
              }}>
                {group.category}:
              </div>
              <div style={{ 
                fontSize: 'var(--text-base)',
                lineHeight: 1.8,
                opacity: 0.8
              }}>
                {(group.skills ?? []).map((skill, idx) => (
                  <div key={idx}>{skill}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
