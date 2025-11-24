import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSiteContent } from '../context/SiteContentContext.jsx';

const Contact = () => {
  const { content } = useSiteContent();
  const [formState, setFormState] = useState('idle'); // idle, sending, sent, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const contactInfo = content?.contact;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setFormState('sent');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">CONTACT</h2>
        
        <div style={{ maxWidth: '700px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--text-sm)',
                marginBottom: '0.5rem',
                opacity: 0.5,
                fontWeight: 500
              }}>
                Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--text-sm)',
                marginBottom: '0.5rem',
                opacity: 0.5,
                fontWeight: 500
              }}>
                Email
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--text-sm)',
                marginBottom: '0.5rem',
                opacity: 0.5,
                fontWeight: 500
              }}>
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </div>
            
            <button type="submit" style={{ fontSize: 'var(--text-lg)' }} disabled={formState === 'sending'}>
              {formState === 'idle' && 'Send it →'}
              {formState === 'sending' && 'Sending...'}
              {formState === 'sent' && 'Sent ✓'}
              {formState === 'error' && 'Error - Try again'}
            </button>
          </form>
          
          <div style={{ 
            marginTop: 'var(--spacing-md)',
            fontSize: 'var(--text-base)',
            opacity: 0.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {contactInfo?.email && <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {contactInfo?.socials?.instagram && (
                <a href={contactInfo.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              )}
              {contactInfo?.socials?.twitter && (
                <a href={contactInfo.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              )}
              {contactInfo?.socials?.linkedin && (
                <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
