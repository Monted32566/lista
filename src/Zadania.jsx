import { useState, useEffect } from 'react';

export default function Zadania() {
  const [zadania, ustawZadania] = useState(() => {
    const zapisane = localStorage.getItem('zadanie');
    return zapisane ? JSON.parse(zapisane) : [];
  });

  useEffect(() => {
    localStorage.setItem('zadanie', JSON.stringify(zadania));
  }, [zadania]);

  const dodajZadanie = (text, priority = 'normal') => {
    ustawZadania([...zadania, {
      id: Date.now(),
      text,
      completed: false,
      date: new Date(),
      priority: priority
    }]);
  };

  const usuńZadanie = (id) => {
    ustawZadania(zadania.filter(zadanie => zadanie.id !== id));
  };

  const edytujZadanie = (id, nowyText, nowyPriority) => {
    ustawZadania(zadania.map(zadanie => 
      zadanie.id === id ? { 
        ...zadanie, 
        text: nowyText,
        priority: nowyPriority || zadanie.priority
      } : zadanie
    ));
  };

  const toggleZadanie = (id) => {
    ustawZadania(zadania.map(zadanie =>
      zadanie.id === id ? { ...zadanie, completed: !zadanie.completed } : zadanie
    ));
  };

  const wyczyśćWszystko = () => {
    ustawZadania([]);
  };

  return { zadania, dodajZadanie, usuńZadanie, edytujZadanie, toggleZadanie, wyczyśćWszystko };
}