import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'linear-gradient(90deg, #0f0f0f, #1a1a1a)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
      fontFamily: 'Poppins, sans-serif',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      
      {/* Left: Logo */}
      <div style={{ fontSize: '1.2rem', fontWeight: '400', color: '#84d1c9' }}>
        quantResearch.com
      </div>

      {/* Center: Internal Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[
          { path: '/', label: 'Home' },
          { path: '/callPutChart', label: 'Call Put Chart' },
          { path: '/straddleChart', label: 'Straddle Chart' },
          { path: '/strangleChart', label: 'Strangle Chart' },
          { path: '/ivChart', label: 'IV Chart' },
          { path: '/about', label: 'About' },
          { path: '/contact', label: 'Contact' },
          { path: '/tradingview', label: 'TradingView Chart' } // <-- New Button for Internal Chart Page
        ].map((link, index) => (
          <Link
            key={index}
            to={link.path}
            style={{
              color: '#b0e0db',
              textDecoration: 'none',
              margin: '0 0.75rem',
              fontWeight: '400',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.target.style.backgroundColor = '#222';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={e => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#b0e0db';
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: External TradingView Chart Links */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[
          { name: 'NIFTY', url: 'https://www.tradingview.com/chart/SyqqPXJP/?symbol=NSE%3ANIFTY' },
          { name: 'BANKNIFTY', url: 'https://www.tradingview.com/chart/SyqqPXJP/?symbol=NSE%3ABANKNIFTY' },
          { name: 'SENSEX', url: 'https://www.tradingview.com/chart/SyqqPXJP/?symbol=BSE%3ASENSEX' }
        ].map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#b0e0db',
              textDecoration: 'none',
              marginLeft: '1rem',
              fontSize: '0.95rem'
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
