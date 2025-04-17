import React from 'react';
import './styl.css';

export default function Sortowanie({ sortowanie, ustawSortowanie }) {
  return (
    <div className="sortowanie-container">
      <h3>Sortuj według:</h3>
      <select
        value={sortowanie}
        onChange={(e) => ustawSortowanie(e.target.value)}
        className="sortowanie-select"
      >
        <option value="data">Data (najnowsze)</option>
        <option value="priorytet">Priorytet</option>
        <option value="nazwa">Nazwa (A-Z)</option>
      </select>
    </div>
  );
}