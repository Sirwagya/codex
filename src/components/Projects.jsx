import React, { useEffect, useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Projects = () => {
  const { content } = useSiteContent();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const featuredProject = content?.featuredProject;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Sirwagya/repos?sort=updated&per_page=2');
        if (!response.ok) throw new Error('API limit reached');
        const data = await response.json();
        setRepos(data.filter(repo => !repo.fork));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">PROJECTS</h2>
        
        {/* Featured Project */}
        {featuredProject ? (
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            

            <div style={{ maxWidth: '800px' }}>
              <h3
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 500,
                  marginBottom: '1rem',
                }}
              >
                {featuredProject.name}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  opacity: 0.6,
                  marginBottom: 'var(--spacing-xs)',
                  lineHeight: 1.7,
                }}
              >
                {featuredProject.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  fontSize: 'var(--text-base)',
                }}
              >
                {featuredProject.liveUrl && <a href={featuredProject.liveUrl}>Live Demo →</a>}
                {featuredProject.githubUrl && <a href={featuredProject.githubUrl}>GitHub →</a>}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ opacity: 0.5 }}>Add a featured project from the admin page.</p>
        )}

        {/* Other Projects */}
        {!loading && !error && repos.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            {repos.map((repo, index) => (
              <div key={index} style={{ maxWidth: '800px' }}>
                <h3 style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }}>
                  {repo.name}
                </h3>
                <p style={{ 
                  fontSize: 'var(--text-base)',
                  opacity: 0.6,
                  marginBottom: '1rem',
                  lineHeight: 1.7
                }}>
                  {repo.description || 'No description provided.'}
                </p>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontSize: 'var(--text-base)' }}
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p style={{ opacity: 0.5, fontSize: 'var(--text-base)' }}>
            Unable to load projects. <a href="https://github.com/Sirwagya" target="_blank" rel="noopener noreferrer">View GitHub →</a>
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
