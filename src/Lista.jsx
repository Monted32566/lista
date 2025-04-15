import React, { useState } from 'react';
import Zadania from './Zadania.jsx';
import './styl.css';

export default function Lista() {
  const [noweZadanie, ustawNoweZadanie] = useState('');
  const [edytowaneId, ustawEdytowaneId] = useState(null);
  const [edytowanaTresc, ustawEdytowanąTresc] = useState('');
  const [priority, setPriority] = useState('normal');
  
  const { zadania, dodajZadanie, usuńZadanie, edytujZadanie, toggleZadanie, wyczyśćWszystko } = Zadania();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noweZadanie.trim() === '') return;
    dodajZadanie(noweZadanie, priority);
    ustawNoweZadanie('');
    setPriority('normal');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'low': return 'priority-low';
      default: return 'priority-normal';
    }
  };

  return (
    <div className="container">
      <div className="top-panel">
        <h1> Lista Zadań </h1>
        
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={noweZadanie}
            onChange={(e) => ustawNoweZadanie(e.target.value)}
            placeholder="Dodaj nowe zadanie..."
            aria-label="Wpisz treść zadania"
          />
          
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low"> Niski</option>
            <option value="normal"> Normalny</option>
            <option value="high"> Wysoki</option>
          </select>
          
          <button type="submit" aria-label="Dodaj zadanie">
            Dodaj
          </button>
        </form>

        <button onClick={wyczyśćWszystko} aria-label="Wyczyść wszystkie zadania">
          Wyczyść wszystko
        </button>
      </div>

      <div className="bottom-panel">
        <ul className="task-list">
          {zadania.map((item) => (
            <li key={item.id} className={`task-item ${item.completed ? 'completed' : ''} ${getPriorityColor(item.priority)}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleZadanie(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={item.completed ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'}
                  className="task-checkbox"
                />
                {edytowaneId === item.id ? (
                  <div className="edit-form">
                    <input
                      value={edytowanaTresc}
                      onChange={(e) => ustawEdytowanąTresc(e.target.value)}
                      aria-label="Edytuj zadanie"
                    />
                    <select
                      value={item.priority}
                      onChange={(e) => edytujZadanie(item.id, edytowanaTresc, e.target.value)}
                    >
                      <option value="low">Niski</option>
                      <option value="normal">Normalny</option>
                      <option value="high">Wysoki</option>
                    </select>
                    <button
                      onClick={() => {
                        edytujZadanie(item.id, edytowanaTresc, item.priority);
                        ustawEdytowaneId(null);
                      }}
                    >
                      Zapisz
                    </button>
                  </div>
                ) : (
                  <div className="task-details">
                    <span className={item.completed ? 'completed-text' : ''}>{item.text}</span>
                    <div className="task-meta">
                      <span className="task-date">{formatDate(item.date)}</span>
                      <span className={`task-priority ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'high'}
                        {item.priority === 'low'}
                        {item.priority === 'normal'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="task-actions">
                <button
                  onClick={() => {
                    ustawEdytowaneId(item.id);
                    ustawEdytowanąTresc(item.text);
                  }}
                  aria-label={`Edytuj zadanie: ${item.text}`}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => usuńZadanie(item.id)}
                  aria-label={`Usuń zadanie: ${item.text}`}
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}