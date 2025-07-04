import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function StrangleChart() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/csv-data/chart')
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

  const toggleVisibility = () => setVisible(prev => !prev);

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#121212',
      color: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(255, 174, 0, 0.2)',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: '600',
        color: '#ffaa00'
      }}>
        📊 Strangle Premium Over Time
      </h2>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
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
            itemStyle={{ color: '#ffaa00' }}
          />
          <Legend
            wrapperStyle={{ color: '#ccc' }}
            onClick={toggleVisibility}
            formatter={() => (
              <span style={{ color: visible ? '#fff' : '#555', cursor: 'pointer' }}>
                Strangle Premium
              </span>
            )}
          />

          <Line
            type="linear"
            dataKey="strangle"
            stroke="#ffaa00"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#ffaa00', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 5 }}
            name="Strangle"
            hide={!visible}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
