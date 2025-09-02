import { useEffect, useRef } from 'react';

export default function TradingViewChart() {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'NASDAQ:AAPL',
          interval: '30',
          timezone: 'Asia/Kolkata',
          theme: 'dark',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: 'tradingview_container'
        });
      }
    };

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div style={{
      height: 'calc(100vh - 70px)', // assuming navbar height is ~70px
      width: '100%',
    }}>
      <div id="tradingview_container" style={{ height: '100%', width: '100%' }} ref={containerRef}></div>
    </div>
  );
}
