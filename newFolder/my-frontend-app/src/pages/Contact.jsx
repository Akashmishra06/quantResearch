import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent! Thank you.');
    setForm({ name: '', email: '', message: '' });
  };

  const chatbotData = {
    'How do I open a trading account?': 'To open a trading account, go to our homepage and click "Sign Up". Complete your KYC and you’re good to go.',
    'What is options trading?': 'Options trading involves contracts that give you the right to buy or sell an asset at a certain price before a certain date.',
    'Do you provide technical support?': 'Yes, our team offers technical support 24/7 via email and during business hours via phone.',
    'Can I use your service from outside India?': 'Absolutely! Our platform supports traders globally.',
    'What are the charges for using your platform?': 'Our basic account is free. Premium features come with a monthly subscription — visit the Pricing page for more.',
    'Can I withdraw my funds anytime?': 'Yes, you can initiate fund withdrawals anytime and they’ll be processed within 24 business hours.'
  };

  const handleQuestionChange = (e) => {
    const question = e.target.value;
    setSelectedQuestion(question);
    setAnswer(chatbotData[question] || '');
  };

  return (
    <div style={{
      backgroundColor: '#0d0d0d',
      color: '#f0f0f0',
      minHeight: '100vh',
      padding: '3rem 2rem',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#aaaaaa' }}>
          Questions, suggestions or feedback? Our team is here for you — any time.
        </p>

        {/* Contact Details and Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Info</h2>
            <p>Email: <a href="mailto:support@yourdomain.com" style={{ color: '#66ccff' }}>support@yourdomain.com</a></p>
            <p>Phone: <a href="tel:+911234567890" style={{ color: '#66ccff' }}>+91 12345 67890</a></p>
            <p>Office: 101 Tech Towers, Innovation Street, Bengaluru</p>
            <p>Hours: Mon–Fri, 9 AM – 7 PM IST</p>
            <p>Support: 24/7 via email and chatbot</p>
          </div>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)'
          }}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              value={form.message}
              onChange={handleChange}
              required
              style={{ ...inputStyle, minHeight: '120px' }}
            />
            <button type="submit" style={buttonStyle}>
              Send Message
            </button>
          </form>
        </div>

        {/* Chatbot Simulator */}
        <div style={{
          backgroundColor: '#1f1f1f',
          borderRadius: '10px',
          padding: '2rem',
          marginTop: '3rem',
          boxShadow: '0 0 10px rgba(255,255,255,0.08)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>AI Assistant (Predefined Q&A)</h2>
          <select value={selectedQuestion} onChange={handleQuestionChange} style={{
            ...inputStyle,
            fontSize: '1rem',
            marginBottom: '1rem'
          }}>
            <option value="">Select a question...</option>
            {Object.keys(chatbotData).map((q, idx) => (
              <option key={idx} value={q}>{q}</option>
            ))}
          </select>
          {answer && (
            <div style={{
              backgroundColor: '#262626',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #66ccff',
              color: '#cccccc'
            }}>
              {answer}
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Visit Us</h2>
          <iframe
            title="Office Location"
            width="100%"
            height="350"
            frameBorder="0"
            style={{ border: 0, borderRadius: '10px', boxShadow: '0 0 10px rgba(255,255,255,0.08)' }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.612484000999!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7c7a2fc40ec0!2sYour%20Office!5e0!3m2!1sen!2sin!4v0000000000000"
          ></iframe>
        </div>

        {/* Social Links */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Follow Us</h2>
          <p>
            <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noreferrer" style={linkStyle}>LinkedIn</a> |{' '}
            <a href="https://twitter.com/yourcompany" target="_blank" rel="noreferrer" style={linkStyle}>Twitter</a> |{' '}
            <a href="https://instagram.com/yourcompany" target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a>
          </p>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '3rem', paddingBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>FAQs</h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {Object.entries(chatbotData).map(([q, a], i) => (
              <li key={i} style={{ marginBottom: '1rem' }}>
                <strong>{q}</strong><br /><span style={{ color: '#bbb' }}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: '#1f1f1f',
  color: '#fff',
  padding: '0.8rem',
  fontSize: '1rem',
  border: '1px solid #333',
  borderRadius: '6px'
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '0.9rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: '0.3s ease',
  boxShadow: '0 4px 12px rgba(0,123,255,0.2)'
};

const linkStyle = {
  color: '#66ccff',
  textDecoration: 'none',
  fontWeight: 'bold'
};
