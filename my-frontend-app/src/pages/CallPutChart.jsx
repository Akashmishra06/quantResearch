import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SYMBOLS = ['NIFTY', 'BANKNIFTY', 'SENSEX'];

export default function CallPutChart() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState({ data_call: true, data_put: true });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');
  const [yDomain, setYDomain] = useState(['auto', 'auto']);

  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const computeNiceYDomain = (values) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.05;
    const roundTo = max > 1000 ? 20 : 10;
    const niceMin = Math.floor((min - padding) / roundTo) * roundTo;
    const niceMax = Math.ceil((max + padding) / roundTo) * roundTo;
    return [niceMin, niceMax];
  };

  const fetchChartData = (date, symbol) => {
    let url = 'http://localhost:5001/api/csv-data/chart';
    if (date && symbol) {
      const formattedDate = formatDateLocal(date);
      url = `http://localhost:5001/api/csv-data/historical?date=${formattedDate}&symbol=${symbol}`;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('CSV not found');
        return res.text();
      })
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const filtered = result.data.filter(row =>
              row.datetime &&
              typeof row.data_call === 'number' &&
              typeof row.data_put === 'number'
            );

            setData(filtered);

            if (filtered.length) {
              const values = filtered.flatMap(d => [d.data_call, d.data_put]);
              const [niceMin, niceMax] = computeNiceYDomain(values);
              setYDomain([niceMin, niceMax]);
            } else {
              setYDomain(['auto', 'auto']);
            }
          }
        });
      })
      .catch(() => {
        setData([]);
        setYDomain(['auto', 'auto']);
      });
  };

  useEffect(() => {
    fetchChartData(null, null);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedSymbol) {
      fetchChartData(selectedDate, selectedSymbol);
    }
  }, [selectedDate, selectedSymbol]);

  const handleLegendClick = (e) => {
    const key = e.dataKey;
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const accentColor = '#1abc9c';

  return (
    <div style={{
      padding: '2rem 1rem',
      backgroundColor: '#121212',
      color: '#fff',
      borderRadius: 12,
      boxShadow: `0 0 20px ${accentColor}33`,
      fontFamily: "'Poppins', sans-serif",
      width: '100vw',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontWeight: 600,
        color: accentColor,
        userSelect: 'none',
        fontSize: '1.8rem',
      }}>
        📊 Call vs Put Premiums
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <label htmlFor="symbol-select" style={{ marginRight: 8, fontWeight: 600, color: accentColor }}>Symbol:</label>
          <select
            id="symbol-select"
            value={selectedSymbol}
            onChange={e => setSelectedSymbol(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: `1.5px solid ${accentColor}`,
              backgroundColor: '#1e1e1e',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              minWidth: 120,
              outline: 'none',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {SYMBOLS.map(sym => (
              <option key={sym} value={sym}>{sym}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date-picker" style={{ marginRight: 8, fontWeight: 600, color: accentColor }}>Date:</label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Pick a date"
            popperPlacement="bottom-start"
            wrapperClassName="date-picker-wrapper"
            className="custom-datepicker-input"
            calendarClassName="custom-datepicker-calendar"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#2d2d2d" />

          <XAxis
            dataKey="datetime"
            tickFormatter={(value) => {
              const date = new Date(value);
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              return `${hours}:${minutes}`;
            }}
            tick={{ fontSize: 13, fill: '#ccc', fontWeight: 500 }}
            tickLine={{ stroke: '#555' }}
            axisLine={{ stroke: '#555' }}
            interval={data.length > 60 ? Math.floor(data.length / 8) : 0}
            minTickGap={50}
            height={50}
          />

          <YAxis
            domain={yDomain}
            tick={{ fontSize: 14, fill: '#ccc', fontWeight: 600 }}
            tickLine={{ stroke: '#555' }}
            axisLine={{ stroke: '#555' }}
            tickFormatter={val => val.toFixed(0)}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              border: `1px solid #333`,
              borderRadius: 10,
              fontSize: 14,
              color: '#fff',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: accentColor }}
            cursor={{ stroke: accentColor, strokeWidth: 2 }}
          />

          <Legend
            wrapperStyle={{ color: '#ccc' }}
            onClick={handleLegendClick}
            formatter={(value) => (
              <span style={{
                color: visibility[value] ? '#fff' : '#555',
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                {value === 'data_call' ? 'Call' : 'Put'} Premium
              </span>
            )}
          />

          <Line
            type="monotone"
            dataKey="data_call"
            stroke="#00bfff"
            strokeWidth={2}
            dot={{ r: 1.2, stroke: '#00bfff', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 3 }}
            name="data_call"
            hide={!visibility.data_call}
          />
          <Line
            type="monotone"
            dataKey="data_put"
            stroke="#00ff88"
            strokeWidth={2}
            dot={{ r: 1.2, stroke: '#00ff88', strokeWidth: 2, fill: '#121212' }}
            activeDot={{ r: 3 }}
            name="data_put"
            hide={!visibility.data_put}
          />
        </LineChart>
      </ResponsiveContainer>

      <style>{`
        .custom-datepicker-input {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1.5px solid ${accentColor};
          background-color: #1e1e1e;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          min-width: 130px;
          outline: none;
          transition: all 0.2s ease-in-out;
        }
        .custom-datepicker-input:focus {
          border-color: ${accentColor};
          box-shadow: 0 0 6px ${accentColor}55;
        }
        .custom-datepicker-calendar {
          background-color: #1e1e1e;
          border: 1.5px solid ${accentColor};
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
        }
        .react-datepicker__header {
          background-color: #121212;
          border-bottom: 1px solid ${accentColor};
        }
        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker-year-header {
          color: ${accentColor};
          font-weight: 700;
        }
        .react-datepicker__day-name,
        .react-datepicker__day,
        .react-datepicker__time-name {
          color: #ddd;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: ${accentColor} !important;
          color: #121212 !important;
          font-weight: 700;
        }
        .react-datepicker__day:hover {
          background-color: rgb(77, 68, 57);
          color: #121212;
        }
        .react-datepicker__triangle {
          border-bottom-color: ${accentColor} !important;
        }
      `}</style>
    </div>
  );
}
