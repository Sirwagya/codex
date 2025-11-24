import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext.jsx';
import { defaultContent } from '../data/defaultContent.js';
import '../components/Admin/styles.css';

const AdminPage = () => {
  const { content, loading, saveContent } = useSiteContent();
  const [draft, setDraft] = useState(content);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const sectionTemplates = useMemo(
    () => ({
      academics: { year: '', title: '', description: '' },
      skillGroups: { category: '', skills: [] },
      works: { title: '', description: '' },
    }),
    []
  );

  const handleHeroChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleBrandingChange = (value) => {
    setDraft((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        logoText: value,
      },
    }));
  };

  const handleFeaturedProjectChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      featuredProject: {
        ...prev.featuredProject,
        [field]: value,
      },
    }));
  };

  const handleContactChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleSocialChange = (network, value) => {
    setDraft((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: {
          ...prev.contact?.socials,
          [network]: value,
        },
      },
    }));
  };

  const handleFooterChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        [field]: value,
      },
    }));
  };

  const handleGithubUsernameChange = (value) => {
    const username = value.trim();
    setDraft((prev) => ({
      ...prev,
      github: {
        ...(prev.github ?? {}),
        username,
      },
    }));
  };

  const handleGithubChartChange = (value) => {
    setDraft((prev) => ({
      ...prev,
      github: {
        ...(prev.github ?? {}),
        chartUrl: value.trim(),
      },
    }));
  };

  const handleListItemChange = (section, index, field, value) => {
    setDraft((prev) => {
      const list = [...(prev[section] ?? [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [section]: list };
    });
  };

  const handleSkillListChange = (index, value) => {
    const parsed = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    setDraft((prev) => {
      const list = [...(prev.skillGroups ?? [])];
      list[index] = { ...list[index], skills: parsed };
      return { ...prev, skillGroups: list };
    });
  };

  const addListItem = (section) => {
    const template = sectionTemplates[section];
    const freshEntry = template ? JSON.parse(JSON.stringify(template)) : {};

    setDraft((prev) => ({
      ...prev,
      [section]: [...(prev[section] ?? []), freshEntry],
    }));
  };

  const removeListItem = (section, index) => {
    setDraft((prev) => {
      const list = [...(prev[section] ?? [])];
      list.splice(index, 1);
      return { ...prev, [section]: list };
    });
  };

  const resetDraft = () => {
    setDraft(defaultContent);
    setStatus({ type: 'info', message: 'Reverted to default copy locally. Save to persist.' });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await saveContent(draft);
      setStatus({ type: 'success', message: 'Saved to Supabase. Live site updated.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message ?? 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  const infoBanner = loading ? 'Loading content from Supabase…' : status?.message;

  // Simple local auth (NOT secure for production; use Supabase Auth instead)
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('adminAuth') === 'true');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser === 'Sirwagya' && loginPass === 'Sirwagya@2101') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthed(true);
      setLoginError(null);
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return (
      <div className="admin-page">
        <div className="container" style={{ maxWidth: '520px' }}>
          <div className="admin-header" style={{ padding: '40px 0 24px' }}>
            <div>
              <p className="breadcrumb">/ admin</p>
              <h1>Admin Login</h1>
              <p style={{ opacity: 0.5 }}>Enter your credentials to manage site content.</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="admin-card" style={{ gap: '20px' }}>
            <label className="admin-label">
              Username
              <input
                autoComplete="username"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Username"
              />
            </label>
            <label className="admin-label">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Password"
              />
            </label>
            {loginError && (
              <div className="content-status error" style={{ margin: 0 }}>
                {loginError}
              </div>
            )}
            <button type="submit" style={{ border: '1px solid var(--admin-border)', padding: '12px 20px', borderRadius: '999px' }}>
              Login →
            </button>
            <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>
              This simple login uses hardcoded credentials and localStorage. For real security, integrate Supabase Auth.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="breadcrumb">/ admin</p>
            <h1>Site control room</h1>
            <p>Create a new vibe, hit save, and the main site updates instantly.</p>
          </div>
          <Link to="/" className="text-link">← Back to site</Link>
          <button type="button" onClick={handleLogout} style={{ border: '1px solid var(--admin-border)', padding: '10px 16px', borderRadius: '999px', fontSize: '0.85rem' }}>Logout</button>
        </div>

        {(loading || status) && (
          <div className={`content-status ${status?.type === 'error' ? 'error' : ''}`}>
            {loading ? 'Loading content from Supabase…' : infoBanner}
          </div>
        )}

        {!loading && (
          <div className="admin-grid">
            <section className="admin-card">
              <h2>Branding</h2>
              <label className="admin-label">
                Logo text
                <input
                  type="text"
                  value={draft?.branding?.logoText ?? ''}
                  onChange={(e) => handleBrandingChange(e.target.value)}
                />
              </label>
            </section>

            <section className="admin-card">
              <h2>Hero</h2>
              <label className="admin-label">
                Title
                <input value={draft?.hero?.title ?? ''} onChange={(e) => handleHeroChange('title', e.target.value)} />
              </label>
              <label className="admin-label">
                Subtitle
                <input value={draft?.hero?.subtitle ?? ''} onChange={(e) => handleHeroChange('subtitle', e.target.value)} />
              </label>
              <label className="admin-label">
                Bio
                <textarea value={draft?.hero?.bio ?? ''} onChange={(e) => handleHeroChange('bio', e.target.value)} />
              </label>
            </section>

            <section className="admin-card">
              <h2>Academics</h2>
              {draft?.academics?.map((entry, index) => (
                <div key={`academics-${index}`} className="admin-list-block">
                  <div className="admin-list-header">
                    <strong>Entry {index + 1}</strong>
                    <button type="button" onClick={() => removeListItem('academics', index)}>
                      Delete
                    </button>
                  </div>
                  <label className="admin-label">
                    Year
                    <input value={entry.year} onChange={(e) => handleListItemChange('academics', index, 'year', e.target.value)} />
                  </label>
                  <label className="admin-label">
                    Title
                    <input value={entry.title} onChange={(e) => handleListItemChange('academics', index, 'title', e.target.value)} />
                  </label>
                  <label className="admin-label">
                    Description
                    <textarea
                      value={entry.description}
                      onChange={(e) => handleListItemChange('academics', index, 'description', e.target.value)}
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addListItem('academics')}>
                + Add academic entry
              </button>
            </section>

            <section className="admin-card">
              <h2>Skills</h2>
              {draft?.skillGroups?.map((group, index) => (
                <div key={`skills-${index}`} className="admin-list-block">
                  <div className="admin-list-header">
                    <strong>Group {index + 1}</strong>
                    <button type="button" onClick={() => removeListItem('skillGroups', index)}>
                      Delete
                    </button>
                  </div>
                  <label className="admin-label">
                    Category
                    <input value={group.category} onChange={(e) => handleListItemChange('skillGroups', index, 'category', e.target.value)} />
                  </label>
                  <label className="admin-label">
                    Skills (comma separated)
                    <textarea
                      value={group.skills?.join(', ') ?? ''}
                      onChange={(e) => handleSkillListChange(index, e.target.value)}
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addListItem('skillGroups')}>
                + Add skill group
              </button>
            </section>

            <section className="admin-card">
              <h2>Unofficial works</h2>
              {draft?.works?.map((work, index) => (
                <div key={`works-${index}`} className="admin-list-block">
                  <div className="admin-list-header">
                    <strong>Entry {index + 1}</strong>
                    <button type="button" onClick={() => removeListItem('works', index)}>
                      Delete
                    </button>
                  </div>
                  <label className="admin-label">
                    Title
                    <input value={work.title} onChange={(e) => handleListItemChange('works', index, 'title', e.target.value)} />
                  </label>
                  <label className="admin-label">
                    Description
                    <textarea
                      value={work.description}
                      onChange={(e) => handleListItemChange('works', index, 'description', e.target.value)}
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addListItem('works')}>
                + Add work entry
              </button>
            </section>

            <section className="admin-card">
              <h2>Featured project</h2>
              <label className="admin-label">
                Name
                <input
                  value={draft?.featuredProject?.name ?? ''}
                  onChange={(e) => handleFeaturedProjectChange('name', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Description
                <textarea
                  value={draft?.featuredProject?.description ?? ''}
                  onChange={(e) => handleFeaturedProjectChange('description', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Live URL
                <input
                  value={draft?.featuredProject?.liveUrl ?? ''}
                  onChange={(e) => handleFeaturedProjectChange('liveUrl', e.target.value)}
                />
              </label>
              <label className="admin-label">
                GitHub URL
                <input
                  value={draft?.featuredProject?.githubUrl ?? ''}
                  onChange={(e) => handleFeaturedProjectChange('githubUrl', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Image URL
                <input
                  value={draft?.featuredProject?.image ?? ''}
                  onChange={(e) => handleFeaturedProjectChange('image', e.target.value)}
                />
              </label>
            </section>

            <section className="admin-card">
              <h2>Contact info</h2>
              <label className="admin-label">
                Email
                <input value={draft?.contact?.email ?? ''} onChange={(e) => handleContactChange('email', e.target.value)} />
              </label>
              <label className="admin-label">
                LinkedIn URL
                <input
                  value={draft?.contact?.socials?.linkedin ?? ''}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Twitter URL
                <input
                  value={draft?.contact?.socials?.twitter ?? ''}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Instagram URL
                <input
                  value={draft?.contact?.socials?.instagram ?? ''}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                />
              </label>
            </section>

            <section className="admin-card">
              <h2>GitHub contributions</h2>
              <label className="admin-label">
                Username
                <input
                  value={draft?.github?.username ?? ''}
                  onChange={(e) => handleGithubUsernameChange(e.target.value)}
                  placeholder="Your GitHub username"
                />
              </label>
              <label className="admin-label">
                Custom chart URL (optional)
                <input
                  value={draft?.github?.chartUrl ?? ''}
                  onChange={(e) => handleGithubChartChange(e.target.value)}
                  placeholder={draft?.github?.username ? `https://ghchart.rshah.org/${draft.github.username}` : 'https://ghchart.rshah.org/<username>'}
                />
              </label>
              <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                Leave chart URL empty to auto-generate from the username.
              </p>
            </section>

            <section className="admin-card">
              <h2>Footer</h2>
              <label className="admin-label">
                Copyright line
                <input
                  value={draft?.footer?.copyright ?? ''}
                  onChange={(e) => handleFooterChange('copyright', e.target.value)}
                />
              </label>
              <label className="admin-label">
                Location
                <input value={draft?.footer?.location ?? ''} onChange={(e) => handleFooterChange('location', e.target.value)} />
              </label>
            </section>
          </div>
        )}

        <div className="admin-actions">
          <button type="button" onClick={resetDraft} disabled={saving}>
            Reset to defaults
          </button>
          <button type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save to Supabase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
