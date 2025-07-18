// About.jsx
export default function About() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '3rem 2rem',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1.5rem' }}>About Us</h1>

        <section style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#cccccc' }}>
            We are a cutting-edge <strong>Quantitative Trading Firm</strong> driven by data, algorithms, and innovation. Our mission is to build automated trading systems that capitalize on statistical inefficiencies and real-time market opportunities.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>What is Trading?</h2>
          <p style={{ color: '#bbbbbb' }}>
            Trading involves buying and selling financial instruments such as stocks, options, futures, and currencies with the aim of making a profit. It can be discretionary (manual) or systematic (algorithm-driven). Quantitative trading relies heavily on mathematical models and automation.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>What is Options Trading?</h2>
          <p style={{ color: '#bbbbbb' }}>
            Options are derivative contracts that give the buyer the right, but not the obligation, to buy or sell an underlying asset at a specified price before a certain date. We develop strategies using calls, puts, spreads, and volatility-based systems to hedge or speculate efficiently.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Our Technology</h2>
          <ul style={{ paddingLeft: '1.5rem', color: '#cccccc', listStyle: 'disc' }}>
            <li>Custom-built backtesting engines</li>
            <li>Real-time data ingestion from NSE, BSE, Crypto</li>
            <li>Latency-optimized execution with Python + C++</li>
            <li>Cloud-native deployments with autoscaling</li>
            <li>ML-enhanced signal detection and anomaly monitoring</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Our Vision</h2>
          <p style={{ color: '#bbbbbb' }}>
            To lead the Indian quant space by delivering robust, transparent, and intelligent trading solutions that adapt to changing market dynamics.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Meet the Team</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#1f1f1f', borderRadius: '10px', padding: '1rem', flex: '1 1 280px' }}>
              <h3>Akash Mishra</h3>
              <h3>Aditya Tiwari</h3>
              <h3>Manjeet Jii</h3>
              <h3>Alind Gupta</h3>
              <h3>Simardeep Singh</h3>
              <h3>Aniket Singh</h3>
              <h3>Lakshay</h3>
              <p style={{ color: '#999' }}>Founder & Quant Architect</p>
              <p>Specializes in IV modeling, algo execution, and F&O hedging.</p>
            </div>
            <div style={{ backgroundColor: '#1f1f1f', borderRadius: '10px', padding: '1rem', flex: '1 1 280px' }}>
              <h3>Quant Bot</h3>
              <p style={{ color: '#999' }}>AI-Powered Trade Engine</p>
              <p>Operates 24/7 scanning strategies and executing trades autonomously.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Why Choose Us?</h2>
          <ul style={{ paddingLeft: '1.5rem', color: '#cccccc', listStyle: 'disc' }}>
            <li>Fully automated, scalable infrastructure</li>
            <li>Custom alpha-generating strategies</li>
            <li>Risk-first portfolio design</li>
            <li>Live dashboards and reporting tools</li>
            <li>Secure architecture with version-controlled deployment</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.6rem' }}>Let’s Connect</h2>
          <p style={{ color: '#cccccc' }}>
            Looking to collaborate or invest in our research? <a href="/contact" style={{ color: '#66ccff' }}>Get in touch</a> — we'd love to hear from you.
          </p>
        </section>
      </div>
    </div>
  );
}
