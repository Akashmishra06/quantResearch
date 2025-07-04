import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function CallPutChart() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState({
    call: true,
    put: true
  });

  useEffect(() => {
    fetch('http://localhost:5000//api/csv-data/chart')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data.filter(row => row.datetime));
          }
        });
      });
  }, []);

  const handleLegendClick = (e) => {
    const key = e.dataKey;
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#121212',
      color: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: '600',
        color: '#00FFFF'
      }}>
        📊 Call vs Put Premiums
      </h2>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="callGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00bfff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00bfff" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="putGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00ff88" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="datetime"
            tick={{ fontSize: 12, fill: '#bbb' }}
            tickLine={{ stroke: '#555' }}
            axisLine={{ stroke: '#555' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#bbb' }}
            tickLine={{ stroke: '#555' }}
            axisLine={{ stroke: '#555' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#00ffff' }}
          />
          <Legend
            wrapperStyle={{ color: '#ccc' }}
            onClick={handleLegendClick}
            formatter={(value) => {
              return (
                <span style={{ color: visibility[value] ? '#fff' : '#555', cursor: 'pointer' }}>
                  {value.charAt(0).toUpperCase() + value.slice(1) + ' Premium'}
                </span>
              );
            }}
          />

          <Line
            type="monotone"
            dataKey="call"
            stroke="url(#callGradient)"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#00bfff', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 6 }}
            name="call"
            hide={!visibility.call}
          />
          <Line
            type="monotone"
            dataKey="put"
            stroke="url(#putGradient)"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#00ff88', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 6 }}
            name="put"
            hide={!visibility.put}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
