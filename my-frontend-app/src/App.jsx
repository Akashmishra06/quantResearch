import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CallPutChart from './pages/CallPutChart';
import StraddleChart from './pages/StraddleChart';
import StrangleChart from './pages/StrangleChart';
import IvChart from './pages/IvChart';
import TradingViewChart from './pages/TradingViewChart';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/callPutChart" element={<CallPutChart />} />
        <Route path="/straddleChart" element={<StraddleChart />} />
        <Route path="/strangleChart" element={<StrangleChart />} />
        <Route path="/ivChart" element={<IvChart />} />
        <Route path="/tradingview" element={<TradingViewChart />} />
      </Routes>
    </Router>
  );
}

export default App;
