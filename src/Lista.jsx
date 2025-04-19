import React, { useState, useEffect } from 'react';
import Zadania from './Zadania.jsx';
import './styl.css';
import Filtry from './Filtry.jsx';
import Sortowanie from './Sortowanie.jsx';
import DOMPurify from 'dompurify';

export default function Lista() {
  const [noweZadanie, ustawNoweZadanie] = useState('');
  const [edytowaneId, ustawEdytowaneId] = useState(null);
  const [edytowanaTresc, ustawEdytowanąTresc] = useState('');
  const [priority, setPriority] = useState('normal');
  const [notification, setNotification] = useState('');
  
  const { 
    zadania, 
    dodajZadanie, 
    usuńZadanie, 
    edytujZadanie, 
    toggleZadanie, 
    wyczyśćWszystko, 
    filtr, 
    ustawFiltr, 
    sortowanie, 
    ustawSortowanie 
  } = Zadania();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noweZadanie.trim()) return;
    
    const cleanText = DOMPurify.sanitize(noweZadanie);
    dodajZadanie(cleanText, priority);
    ustawNoweZadanie('');
    setPriority('normal');
    setNotification(`Dodano zadanie: ${cleanText}`);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  return (
    <div className="container">
      <div 
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {notification}
      </div>

      <div className="top-panel">
        <h1 id="main-heading">Lista Zadań</h1>
        
        <form 
          onSubmit={handleSubmit} 
          className="form"
          aria-labelledby="main-heading"
        >
          <label htmlFor="new-task-input" className="sr-only">
            Wpisz treść nowego zadania
          </label>
          <input
            id="new-task-input"
            type="text"
            value={noweZadanie}
            onChange={(e) => ustawNoweZadanie(e.target.value)}
            placeholder="Dodaj nowe zadanie..."
            aria-required="true"
          />
          
          <label htmlFor="priority-select" className="sr-only">
            Wybierz priorytet
          </label>
          <select 
            id="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Niski</option>
            <option value="normal">Normalny</option>
            <option value="high">Wysoki</option>
          </select>
          
          <button type="submit" aria-label="Dodaj zadanie">
            Dodaj
          </button>
        </form>

        <div className="kontrole">
          <Filtry aktualnyFiltr={filtr} ustawFiltr={ustawFiltr} />
          <Sortowanie sortowanie={sortowanie} ustawSortowanie={ustawSortowanie} />
        </div>
        
        <button 
          onClick={() => {
            wyczyśćWszystko();
            setNotification('Wyczyszczono wszystkie zadania');
          }}
          aria-label="Wyczyść wszystkie zadania"
        >
          Wyczyść wszystko
        </button>
      </div>

      <div className="bottom-panel">
        <ul 
          className="task-list"
          role="list"
          aria-label="Lista zadań"
        >
          {zadania.map((item) => (
            <li 
              key={item.id} 
              className={`task-item ${item.completed ? 'completed' : ''} priority-${item.priority}`}
              role="listitem"
              aria-current={edytowaneId === item.id ? "true" : undefined}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  id={`task-${item.id}-checkbox`}
                  checked={item.completed}
                  onChange={() => {
                    toggleZadanie(item.id);
                    setNotification(
                      `Zadanie "${item.text}" oznaczone jako ${item.completed ? 'nieukończone' : 'ukończone'}`
                    );
                  }}
                  aria-labelledby={`task-${item.id}-label`}
                />
                
                {edytowaneId === item.id ? (
                  <div className="edit-form">
                    <label htmlFor={`edit-${item.id}`} className="sr-only">
                      Edytuj zadanie
                    </label>
                    <input
                      id={`edit-${item.id}`}
                      value={edytowanaTresc}
                      onChange={(e) => ustawEdytowanąTresc(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        const cleanText = DOMPurify.sanitize(edytowanaTresc);
                        edytujZadanie(item.id, cleanText, item.priority);
                        ustawEdytowaneId(null);
                        setNotification(`Zaktualizowano zadanie: ${cleanText}`);
                      }}
                    >
                      Zapisz
                    </button>
                  </div>
                ) : (
                  <div className="task-details">
                    <span 
                      id={`task-${item.id}-label`}
                      className={item.completed ? 'completed-text' : ''}
                    >
                      {item.text}
                    </span>
                    <div className="task-meta">
                      <span className="task-date">{formatDate(item.date)}</span>
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
                  onClick={() => {
                    usuńZadanie(item.id);
                    setNotification(`Usunięto zadanie: ${item.text}`);
                  }}
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
