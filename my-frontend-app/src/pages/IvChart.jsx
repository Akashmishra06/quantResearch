import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function CallPutIVChart() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState({
    iv_call_percent: true,
    iv_put_percent: true
  });

  useEffect(() => {
    const fetchCSV = () => {
      fetch('http://localhost:5000//api/csv-data/iv')
        .then(res => res.text())
        .then(csv => {
          Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            complete: result => {
              const filtered = result.data.filter(row => row.datetime);
              setData(filtered);
            }
          });
        });
    };

    fetchCSV();
    const interval = setInterval(fetchCSV, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLegendClick = (e) => {
    const key = e.dataKey;
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const latest = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#121212',
      color: '#fff',
      fontFamily: 'Poppins, sans-serif',
      borderRadius: '1rem',
      boxShadow: '0 0 20px rgba(0,255,255,0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#00FFFF',
        marginBottom: '1rem',
        fontWeight: '600'
      }}>
        📈 IV Percentage Chart (Call vs Put)
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="datetime" tick={{ fontSize: 12, fill: '#bbb' }} />
          <YAxis
            label={{ value: 'IV %', angle: -90, position: 'insideLeft', fill: '#ccc' }}
            tick={{ fontSize: 12, fill: '#bbb' }}
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
          />
          <Legend
            wrapperStyle={{ color: '#ccc' }}
            onClick={handleLegendClick}
            formatter={(value) => (
              <span style={{
                color: visibility[value] ? '#fff' : '#555',
                cursor: 'pointer'
              }}>
                {value === 'iv_call_percent' ? 'CALL_PERCENT IV (%)' : 'PUT_PERCENT IV (%)'}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="iv_call_percent"
            stroke="#00bfff"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#00bfff', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 5 }}
            hide={!visibility.iv_call_percent}
          />
          <Line
            type="monotone"
            dataKey="iv_put_percent"
            stroke="#00ff88"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#00ff88', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 5 }}
            hide={!visibility.iv_put_percent}
          />
        </LineChart>
      </ResponsiveContainer>

      {latest && (
        <div
          style={{
            backgroundColor: '#1c1c1c',
            padding: '1.5rem',
            borderRadius: '12px',
            marginTop: '1.5rem',
            boxShadow: '0 0 10px rgba(0,255,255,0.1)'
          }}
        >
          <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>📋 Latest IV Data</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'center',
            color: '#fff'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #444' }}>
                <th style={cellStyle}>DateTime</th>
                <th style={cellStyle}>Spot</th>
                <th style={cellStyle}>Strike</th>
                <th style={cellStyle}>Put</th>
                <th style={cellStyle}>Call</th>
                <th style={cellStyle}>Put IV %</th>
                <th style={cellStyle}>Call IV %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>{latest.datetime}</td>
                <td style={cellStyle}>{latest.spot_price}</td>
                <td style={cellStyle}>{latest.strikePrice}</td>
                <td style={cellStyle}>{latest.Data_put}</td>
                <td style={cellStyle}>{latest.Data_call}</td>
                <td style={cellStyle}>{latest.iv_put_percent}</td>
                <td style={cellStyle}>{latest.iv_call_percent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const cellStyle = {
  padding: '8px 12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
