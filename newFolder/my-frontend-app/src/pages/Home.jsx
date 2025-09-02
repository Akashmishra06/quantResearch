// Home.jsx
export default function Home() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '3rem 2rem',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1.5rem' }}>Welcome to QuantVerse</h1>

        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#cccccc' }}>
          We are a forward-thinking <strong>quantitative trading firm</strong> pioneering the next generation of data-driven, algorithm-powered trading systems. 
          Our strategies combine statistical models, machine learning, and real-time analytics to give our clients a superior edge in the market.
        </p>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>What We Offer</h2>
          <ul style={{ color: '#cccccc', paddingLeft: '1.5rem', listStyle: 'disc' }}>
            <li>Live-tested intraday and swing trading systems</li>
            <li>Custom backtesting frameworks with high-resolution data</li>
            <li>Automated hedging and risk management models</li>
            <li>Real-time IV & options analytics dashboards</li>
            <li>API-based infrastructure for scalable deployment</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Why Quantitative Trading?</h2>
          <p style={{ color: '#bbbbbb' }}>
            Quant trading removes human bias and emotion. With data at our core, we build strategies that are statistically validated, stress-tested, and adaptive. 
            In a world of uncertainty, we bring measurable, repeatable logic to every market decision.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.6rem' }}>Get Started</h2>
          <p style={{ color: '#cccccc' }}>
            Whether you're an investor, developer, or institution, explore our platform to discover the power of automation in finance. 
            Head to the <a href="/about" style={{ color: '#66ccff' }}>About</a> or <a href="/contact" style={{ color: '#66ccff' }}>Contact</a> pages to learn more.
          </p>
        </section>
      </div>
    </div>
  );
}
