import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('access_key', '7c3bbfa0-a611-4ab3-ab54-26e91d98a846');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container contact-page">
      <div className="contact-wrapper">
        <div className="contact-header">
          <h1 className="contact-title">Let's Connect</h1>
          <p className="contact-subtitle">Have a question or want to collaborate? I'd love to hear from you!</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              placeholder="Tell me about your project, question, or opportunity..."
              value={formData.message}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="6"
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status && (
            <div className={`status-message ${status.includes('successfully') ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
        </form>


      </div>
    </div>
  );
}
