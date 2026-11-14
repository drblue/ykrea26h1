# Övning inför lektion 9 - Redigera en todo med React Query ✏️

Se video 9.1 och 9.2. Utgå från `09-react-query-todos` i `prep/lesson-9-2-end`. I videorna bygger vi om skapandet. Nu ska ni använda samma mönster för redigering.

## 1. Redigera

Hämta todon med `useTodo` i `EditTodoPage` och fyll i titeln i `TodoForm`. Använd `useMutation` med befintliga `updateTodo` och låt formuläret vänta på `mutateAsync`. Gå till detaljsidan efter lyckat sparande.

**Testa:** Stäng av API-servern efter att titeln har laddats och försök spara. Visa sparfelet vid formuläret och behåll texten. Starta servern och försök igen.

## 2. Uppdatera listan och detaljsidan

Använd `invalidateQueries` efter lyckat sparande. Hitta nycklarna för listan och den redigerade todon i `useTodos` och `useTodo`.

**Testa:** Besök listan och detaljsidan före redigeringen. Spara en ny titel och kontrollera att den visas på båda sidorna utan omladdning.

## 3. Visa Saving... under sparandet

I gemensamma `TodoForm`, använd `isPending` för att visa **Saving...** på knappen medan den är inaktiverad.

**Testa:** Skapa och redigera en todo. Kontrollera att båda sidorna visar **Saving...** medan sparandet pågår.

## Klart?

Kör `npm run lint` och `npm run build`. Ta med koden och dina frågor till livepasset.
