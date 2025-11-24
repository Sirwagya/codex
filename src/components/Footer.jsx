import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Footer = () => {
  const { content } = useSiteContent();
  const footer = content?.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--text-sm)',
          opacity: 0.5
        }}>
          <div>
            {footer?.copyright ?? '© 2025 Sirwagya'}
          </div>
          <div>
            {footer?.location ?? 'Pune, Maharashtra'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
