import { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';

const sanitizeTask = (task) => ({
  ...task,
  text: DOMPurify.sanitize(task.text),
  priority: ['low', 'normal', 'high'].includes(task.priority) 
    ? task.priority 
    : 'normal'
});

export default function Zadania() {
  const [zadania, ustawZadania] = useState(() => {
    try {
      const zapisane = localStorage.getItem('zadanie');
      return zapisane 
        ? JSON.parse(zapisane).map(sanitizeTask) 
        : [];
    } catch {
      return [];
    }
  });

  const [filtr, ustawFiltr] = useState('wszystkie');
  const [sortowanie, ustawSortowanie] = useState('data');

  useEffect(() => {
    localStorage.setItem('zadanie', JSON.stringify(zadania));
  }, [zadania]);

  const dodajZadanie = (text, priority = 'normal') => {
    const cleanText = DOMPurify.sanitize(text);
    ustawZadania(prev => [
      ...prev,
      {
        id: Date.now(),
        text: cleanText,
        completed: false,
        date: new Date().toISOString(),
        priority: ['low', 'normal', 'high'].includes(priority) 
          ? priority 
          : 'normal'
      }
    ]);
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


  const przefiltrowaneIPosortowaneZadania = useMemo(() => {
    const przefiltrowane = zadania.filter(zadanie => {
      if (filtr === 'ukonczone') return zadanie.completed;
      if (filtr === 'aktywne') return !zadanie.completed;
      return true;
    });
  
    return [...przefiltrowane].sort((a, b) => {
      switch(sortowanie) {
        case 'priorytet': 
          return { high: 3, normal: 2, low: 1 }[b.priority] - { high: 3, normal: 2, low: 1 }[a.priority];
        case 'nazwa': return a.text.localeCompare(b.text);
        default: return new Date(b.date) - new Date(a.date);
      }
    });
  }, [zadania, filtr, sortowanie]);

  const wyczyśćWszystko = () => {
    ustawZadania([]);
  };
  
  return { 
    zadania: przefiltrowaneIPosortowaneZadania,
    dodajZadanie, 
    usuńZadanie, 
    edytujZadanie, 
    toggleZadanie, 
    filtr,
    ustawFiltr,
    sortowanie,
    ustawSortowanie,
    wyczyśćWszystko
  };
}