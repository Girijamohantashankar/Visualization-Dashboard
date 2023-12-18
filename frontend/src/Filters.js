import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div>
      <h2>Filters</h2>
      <div>
        <label>End Year:</label>
        <input
          type="text"
          value={filters.endYear || ''}
          onChange={(e) => onFilterChange('endYear', e.target.value)}
        />
      </div>

      <div>
        <label>Topics:</label>
        <input
          type="text"
          value={filters.topics || ''}
          onChange={(e) => onFilterChange('topics', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
