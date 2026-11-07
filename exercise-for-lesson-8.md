# Övning inför lektion 8 - Ge väderappen en vädercache 🌦️

Se video 8.2 och 8.3. Använd sedan React Query i er väderapp från lektion 5 (kursrepots version: `05-weather`).

Gör gärna en kopia för att kunna jämföra lösningarna, men det är inget krav.

Behåll layout, väderkomponenter och API-service. Bara GET behövs. All text i appen ska vara på engelska.

## 1. Låt React Query hantera väderdatan

Installera TanStack Query med `QueryClient`, `QueryClientProvider` och Devtools. Skapa `useCurrentWeather(city)` med befintlig API-service och en query key som ger varje stad en egen cachepost.

Låt queryn hantera väderdata, laddning och fel. Behåll det lokala state som behövs för inmatning och vald stad.

**Testa:** Sök på Stockholm och Göteborg. Kontrollera rätt rapport och separata queries i Devtools.

## 2. Sök vid submit

Sök med knapp eller Enter, aldrig vid appstart eller medan användaren skriver. Trimma ortnamnet och kräv minst tre tecken.

Styr hämtningen med `enabled`. Anpassa typen för `onSearch` om callbacken inte längre är asynkron.

**Testa:** Appstart och inmatning ger inga anrop. `ab` och blanksteg stoppas; `  Lund  ` fungerar.

## 3. Återvänd till tidigare väder

Lägg till tre stadsknappar som väljer och visar väder direkt. Använd samma hook och cache som formuläret.

Sätt `staleTime` till en minut och `gcTime` till fem minuter.

**Testa:** Välj Stockholm → Göteborg → Stockholm inom en minut. Kontrollera i Network/Devtools att Stockholm visas från cachen utan nytt anrop.

Prova tillfälligt kortare tider: byt stad och följ när den tidigare queryn blir inaktiv och tas bort. Återställ sedan tiderna.

## 4. Uppdatera vädret på begäran

Lägg till **Refresh weather** med `refetch`, även för färsk data. Visa knappen när en stad är vald och inaktivera den under hämtning.

**Testa:** Sök på Lund, skriv Malmö utan submit och tryck på Refresh weather. Lund ska uppdateras.

## 5. Visa rätt status

* **Före första sökningen:** Behåll **Search for a city to see the current weather.** Visa ingen laddning eller fel.
* **Hämtning utan cachad data:** Visa laddning, sedan rätt stads rapport eller ett begripligt fel. Visa inte föregående stads väder.
* **Uppdatering av visad stad:** Behåll rapporten och visa aktivitet med `isFetching` eller globalt med `useIsFetching`.

**Testa:** Sök på en påhittad ort och sedan Lund. Tryck på **Trigger Error** för Lunds query i Devtools: visa felet men behåll rapporten. Återställ felet och prova Refresh weather.

## Klart?

Prova knapp, Enter, snabbval, ogiltig sökning och mobilvy. Kör `npm run lint` och `npm run build`.

Ta med kod och frågor till livepasset. Fundera på:

* Varför behövs både lokal inmatning och vald stad?
* Varför ingår staden i query key?
* Hur skiljer sig `staleTime` och `gcTime`?
* Vad skiljer submit av samma stad från Refresh weather när datan är färsk?
