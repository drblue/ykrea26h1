# Övning inför lektion 10 - Testa fler todofall 🧪

Se video 10.1 och 10.2. Fortsätt i `10-testing-library` från `prep/lesson-10-2-end`. Där finns redan tester för noll todos, titelvalidering och lyckat sparande via klick. Nu ska ni testa vad användaren ser när det finns todos och när sparandet misslyckas.

Kör `npm install` och sedan `npm test` i `10-testing-library`.

## 1. En todo eller flera?

Lägg till två tester i `TodoCounter.test.tsx`. Kontrollera att räknaren visar `1 of 1 todo completed.` när den enda todon är klar och `1 of 3 todos completed.` när en av tre är klar.

## 2. Behåll titeln när sparandet misslyckas

Lägg till ett test i `TodoForm.test.tsx`. Använd `vi.fn().mockRejectedValue(...)` för `onSave`. Skriv en giltig titel och klicka på **Save**. Kontrollera att `onSave` anropas med titeln och att texten är kvar och knappen går att använda igen när sparförsöket är över.

**Tips:** Använd `waitFor` för att vänta på att knappen blir aktiv igen. Kontrollera sedan vad som står kvar i fältet.

## 🌟 Extra - Medan sparandet pågår

Testa att knappen visar **Saving** och är inaktiverad medan `onSave` väntar på svar. Låt mocken returnera en promise som testet själv kan avsluta.

## Klart?

Kör `npm run test:once`. Ta med testerna och dina frågor till livepasset.
