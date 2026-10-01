# Övning inför lektion 3

Sätt upp en helt ny React-app `02-simple-todos` med hjälp av `npm create vite@latest 02-simple-todos -- --template react-ts`.

Rensa bort filer som inte behövs, töm `App.css` samt `App.tsx` på allt utom deklarationen.

## 1. Lista todos

I appen ska det finnas en lista på alla todos där man enkelt ser om de är avklarade eller ej. Varje todo ska kunna ha en titel och en flagga för om den är avklarad eller ej.

Någonstans på sidan ska man se hur många todos som är avklarade, samt det totala antalet todos. T.ex. "13 av 37 todos avklarade."

## 2. Lägg till en ny todo

Man ska kunna lägga till en todo genom ett input-fält och när man klickar på "Lägg till" så ska todo:n dyka upp i listan.

## 3. Växla avklarad/ej avklarad och ta bort todos

* När man klickar på en todo ska den växla mellan avklarad/ej avklarad.
* Man ska även kunna ta bort en todo.

Om det inte finns några todos kvar i listan så ska listan inte renderas och man istället får ett meddelande om att det inte finns några todos (💃🏼🪩🕺🥳).

## 4. TodoCounter

Flytta todo-räknaren till en egen komponent, `TodoCounter` som ska visa hur många todos som är avklarade vs. det totala antalet.

Skicka **inte** in hela listan med todos till `TodoCounter` utan skicka istället in två props, t.ex. `completed` och `total`.

## 5. AddTodoForm

Skapa komponenten `AddTodoForm` och flytta all logik + rendering för formuläret till den. När man skickar formuläret ska en ny todo läggas till (och input-fältet ska tömmas), precis som innan.

Skicka **inte** `setTodos` till formulär-komponenten!

Se video _3.3. Funktioner som props till komponenter_ för tips på hur man kan lösa det.
