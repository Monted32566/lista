import React, {useState, useEffect} from "react";

function Lista() {
    const [zadania, ustawZadania] = useState(() => {
        const zapisaneZadania = localStorage.getItem('zadanie');
        return zapisaneZadania ? JSON.parse(zapisaneZadania) : [];
    });
    const [noweZadanie, ustawNoweZadanie] = useState("");
    const [edytowaneId, ustawEdytowaneId] = useState(null);
    const [edytowanaTresc, ustawEdytowanąTresc] = useState("");
    
    useEffect(() => {
        localStorage.setItem('zadanie', JSON.stringify(zadania));
    }, [zadania]);


    function zmianyInput(event) {
        ustawNoweZadanie(event.target.value);
    }

    function dodajZadanie() {
        if (noweZadanie.trim() !== "") {
            ustawZadania([...zadania, { 
                id: Date.now(),
                text: noweZadanie, 
                completed: false,
                date: new Date() 
            }]);
            ustawNoweZadanie("");
        }
    }

    function usuńZadanie(id) {
        const updatedTasks = zadania.filter(zadanie => zadanie.id !== id);
        ustawZadania(updatedTasks);
    }
    
    function rozpoczęcieEdycjiZadania(id, aktualnaTreść) {
        ustawEdytowaneId(id);
        ustawEdytowanąTresc(aktualnaTreść);
    }

    const edycjaZadania = (id) => {
        ustawZadania(zadania.map(item =>
            item.id === id ? { ...item, text: edytowanaTresc } : item
        ));
        ustawEdytowaneId(null);
    };
    
    return (
        <div>
            <h1>Lista Zadań</h1>
            <h3>Podaj nazwe zadania</h3>
            <input type="text" value={noweZadanie} onChange={zmianyInput}/> 
            <button className="dodaj" onClick={dodajZadanie} aria-label="Dodaj zadanie">Dodaj</button>
            <ul className='lista' role="list">
                {zadania.map((item) => (
                    <li key={item.id}>
                        {edytowaneId === item.id ? (
                            <>
                                <input value={edytowanaTresc} onChange={(e) => ustawEdytowanąTresc(e.target.value)} />
                                <button onClick={() => edycjaZadania(item.id)}>Zapisz</button>
                            </>
                        ) : (
                            <>
                                {item.text}
                                <button onClick={() => rozpoczęcieEdycjiZadania(item.id, item.text)}>Edytuj</button>
                                <button onClick={() => usuńZadanie(item.id)}>Usuń</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lista;