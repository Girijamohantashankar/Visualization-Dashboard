import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import VariableDisplay from './VariableDisplay';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderCharts = () => {
    return ['intensity', 'relevance', 'likelihood'].map((category, index) => {
      const chartData = {
        labels: data.map(item => item.country),
        datasets: [
          {
            label: category.charAt(0).toUpperCase() + category.slice(1),
            data: data.map(item => item[category]),
            fill: false,
            borderColor: getRandomColor(),
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      };

      return (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <Line data={chartData} />
        </div>
      );
    });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>

      <VariableDisplay data={data} />
      {data.length > 0 && renderCharts()}
    </div>
  );
};

export default App;
