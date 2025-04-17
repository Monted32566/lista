import React from 'react';
import './styl.css';

export default function Filtry({ aktualnyFiltr, ustawFiltr }) {
  return (
    <div className="filtry-container">
      <h3>Filtruj zadania:</h3>
      <div className="przyciski-filtrow">
        <button
          onClick={() => ustawFiltr('wszystkie')}
          className={aktualnyFiltr === 'wszystkie' ? 'aktywny' : ''}
        >
          Wszystkie
        </button>
        <button
          onClick={() => ustawFiltr('aktywne')}
          className={aktualnyFiltr === 'aktywne' ? 'aktywny' : ''}
        >
          Aktywne
        </button>
        <button
          onClick={() => ustawFiltr('ukonczone')}
          className={aktualnyFiltr === 'ukonczone' ? 'aktywny' : ''}
        >
          Ukończone
        </button>
      </div>
    </div>
  );
}