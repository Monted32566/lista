import React from 'react';
import './styl.css';

export default function Filtry({ aktualnyFiltr, ustawFiltr }) {
  return (
    <fieldset className="filtry-container">
      <div 
        role="group" 
        aria-labelledby="filter-group-label"
        className="przyciski-filtrow"
      >
        <h3 id="filter-group-label">Filtruj zadania:</h3>
        <div id="button-class-filtr">
        <button
          onClick={() => ustawFiltr('wszystkie')}
          className={aktualnyFiltr === 'wszystkie' ? 'aktywny' : ''}
          aria-pressed={aktualnyFiltr === 'wszystkie'}
        >
          Wszystkie
        </button>
        <button
          onClick={() => ustawFiltr('aktywne')}
          className={aktualnyFiltr === 'aktywne' ? 'aktywny' : ''}
          aria-pressed={aktualnyFiltr === 'aktywne'}
        >
          Aktywne
        </button>
        <button
          onClick={() => ustawFiltr('ukonczone')}
          className={aktualnyFiltr === 'ukonczone' ? 'aktywny' : ''}
          aria-pressed={aktualnyFiltr === 'ukonczone'}
        >
          Ukończone
        </button>
        </div>
      </div>
    </fieldset>
  );
}