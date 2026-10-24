# Övning inför lektion 6

## 1. Flytta `AddTodoForm` till en egen sida

Skapa `CreateTodoPage` och inkludera `AddTodoForm` där istället för i `TodosPage`. Sökvägen (route:n) ska vara `/todos/create`. Länka till sidan i huvudmenyn.

Visa meddelande (`Alert`) om skapandet av todon lyckades (eller misslyckades).

## 2. Länka till den nya todo:ns sida

Lägg till en länk till den nyskapade todo:n i meddelandet (så klart bara om todo:n kunde skapas).

## 3. Toggla todons status

På den enskilda todons sida ska man kunna toggla todons status med en knapp.

## 4. Radera todo

På den enskilda todons sida ska man kunna radera todon.

Självklart ska man **direkt** efter raderingen bli skickad till listan över alla todos för todon finns ju inte längre ^^.

Kolla på `useNavigate()`-hooken från React Router: <https://reactrouter.com/start/declarative/navigating#usenavigate>.

## 5. 🚀 Sortera todos

Visa alla todos i alfabetisk ordning, grupperat efter status (om de är `completed` eller ej).

## 6. ☄️ Redigera todo

Skapa `EditTodoPage`-komponenten och lägg in ett formulär som blir ifyllt med todo:ns befintliga titel. När användaren klickar på Spara så ska todo:n uppdateras och man blir skickad till den enskilda todo:ns sida.

## 7. ☔️ Publicera väderappen

Testa även att publicera er väderapp från `05-weather` på Netlify enligt filmen om publicering.

Kontrollera att det går att söka på en ort och att vädret visas även i den publicerade appen. Prova också en ort som inte finns och kontrollera att felmeddelandet visas.

Ta med länken till er publicerade väderapp och eventuella frågor eller problem till livepasset.
