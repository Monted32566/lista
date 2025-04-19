import React from 'react';
import './styl.css';

export default function Sortowanie({ sortowanie, ustawSortowanie }) {
  return (
    <div className="sortowanie-container">
      <label htmlFor="sort-select" id="sort-label">
        <h3>Sortuj według:</h3>
      </label>
      <select
        id="sort-select"
        value={sortowanie}
        onChange={(e) => ustawSortowanie(e.target.value)}
        className="sortowanie-select"
        aria-labelledby="sort-label"
      >
        <option value="data">Data (najnowsze)</option>
        <option value="priorytet">Priorytet</option>
        <option value="nazwa">Nazwa (A-Z)</option>
      </select>
    </div>
  );
}