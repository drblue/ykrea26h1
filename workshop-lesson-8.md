# Workshop livepass 8

## 1. `useHackerNewsSearch` hook

Bryt ut logiken för att hämta nyheter från Hacker News API:et i en egen hook som heter `useHackerNewsSearch`.

## 2. Lägg till sökning på färskhet eller relevans

Spara valet i URL:en, börja på sida 1 vid byte av sökmetod.

Använd endpoints `http://hn.algolia.com/api/v1/search?query` och `http://hn.algolia.com/api/v1/search_by_date?query` för att hämta nyheter baserat på relevans eller färskhet.
