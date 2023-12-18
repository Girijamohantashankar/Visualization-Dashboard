import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const VariableDisplay = ({ data }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    endYear: null,
    topics: [],
    sector: null,
    region: null,
    pest: null,
    source: null,
    swot: null,
  });

  const [filteredData, setFilteredData] = useState(data);

  const filterData = () => {
    let newData = data;
    if (selectedFilters.endYear) {
      newData = newData.filter(item => item.year === selectedFilters.endYear);
    }

    if (selectedFilters.topics.length > 0) {
      newData = newData.filter(item => selectedFilters.topics.includes(item.topics));
    }

    if (selectedFilters.sector) {
      newData = newData.filter(item => item.sector === selectedFilters.sector);
    }

    if (selectedFilters.region) {
      newData = newData.filter(item => item.region === selectedFilters.region);
    }
    setFilteredData(newData);
  };

  useEffect(() => {
    filterData();
  }, [selectedFilters, data]);

  const updateFilter = (filterName, value) => {
    setSelectedFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const chartData = {
    labels: filteredData.map(item => item.country),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map(item => item.intensity),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Likelihood',
        data: filteredData.map(item => item.likelihood),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Relevance',
        data: filteredData.map(item => item.relevance),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Variables</h2>
      <label>
        End Year:
        <input
          type="number"
          value={selectedFilters.endYear || ''}
          onChange={e => updateFilter('endYear', e.target.value)}
        />
      </label>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default VariableDisplay;
