import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Vibes = () => {
  const { content } = useSiteContent();
  const github = content?.github;
  const username = github?.username?.trim();
  const fallbackUrl = username ? `https://ghchart.rshah.org/${username}` : "";
  const chartUrl = (github?.chartUrl || '').trim() || fallbackUrl;

  return (
    <section id="vibes">
      <div className="container">
        <h2 className="section-title">GITHUB FREQUENCY</h2>
        
        <div style={{ 
          maxWidth: '600px',
          padding: 'var(--spacing-md) 0'
        }}>
          {chartUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href={username ? `https://github.com/${username}` : 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                <img
                  src={chartUrl}
                  alt={username ? `${username}'s GitHub contribution graph` : 'GitHub contribution graph'}
                  style={{ width: '100%', borderRadius: '12px', background: '#111' }}
                  loading="lazy"
                />
              </a>
              <span style={{ fontSize: 'var(--text-sm)', opacity: 0.5 }}>
                Contribution heatmap powered by ghchart.rshah.org.
              </span>
            </div>
          ) : (
            <p style={{ opacity: 0.5 }}>
              Add your GitHub username inside the admin page to show your contribution heatmap.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Vibes;
