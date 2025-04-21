Aplikacja reactowa, polegająca na tworzeniu listy zadań. Zgodnie z instrukcjami aplikacja ta:

1 Ma funkcje dodawania,usuwania oraz edycji zadań

2 Wyświetla liste zadań

3 Daje możliwość przypisywania priorytetu zadania(zielony-niski priorytet, niebieski-normalny, czerwony-wysoki)

4 Posiada sekcje do filtrowania zadań, zależnie od tego czy są ukończone czy nie(jest też oczywiście możliwość wyświetlania obu)

5 Posiada sekcje do sortowania zadań zależnie od daty(od najnowszych), priorytetu(od najważniejszych po mniej ważne), oraz od nazwy (od a-z)

6 Posiada obrone przed atakami XSS za pomocą DOMPurify

7 Posiada zgodność z urządzeniami mobilnymi

8 Posiada testy jednostkowe oraz interfejsu


W przypadku testów, do testów jednostkowych użyłem jesta, a do testów interfejsu użyłem cypressa.

Aby uruchomić testy jednostkowe, wytarczy komenda npm test, do testów interfejsu należy natomiast natomiast najpierw uruchomić aplikacje poprzez npm start, następnie wpisać komendę npm run cypress:open w terminalu(Zalecam podzielić terminal, aby móc wpisać obie komendy) a następnie na interfejsie cypressa wybrać testy e2e, następnie przeglądarkę(oprócz electrona mogę potwierdzić ze wszystkie przeglądarki będą działały) oraz wybrać plik lista.spec.js
