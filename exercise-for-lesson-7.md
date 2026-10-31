# Övning inför lektion 7

Se video 7.1a och 7.1b och bygg vidare på `07-hackernews` ifrån den här branch:en (`prep/lesson-7-exercise`).

Sökning, previous/next och sidnummer i URL:en fungerar redan. Nu ska ni vidareutveckla appen.

## 1. Välj antal träffar per sida

Lägg till ett val där användaren kan välja att visa 10, 20 eller 50 träffar per sida. Använd 20 som standard.

Spara valet i URL:en som `hitsPerPage`, t.ex. `/search?query=react&page=1&hitsPerPage=10`. Läs värdet därifrån och skicka det vidare till API-servicen och API:et med parametern `hitsPerPage`.

När man ändrar antalet träffar ska sökordet behållas och sidan återställas till 1. _Previous_/_next_ och en ny sökning ska behålla valt antal träffar.

Precis som med `page` kan användaren skriva vad som helst i adressfältet. Saknas värdet eller är det något annat än 10, 20 eller 50 ska appen använda 20.

**Testa:** Byt antal träffar från sida 2. Kontrollera att ni hamnar på sida 1 och att sidräknaren uppdateras. Ladda om och prova bakåt/framåt. Valet i formuläret ska följa URL:en.

## 2. Pagination

Flytta pagineringsknapparna och sidräknaren till en egen komponent, `Pagination`.

Komponenten ska få aktuell sida, totalt antal sidor och callbacks för sidbyte via typade props. **Skicka inte in `setSearchParams` eller state-setters!** Komponenten ska inte heller behöva känna till sökordet eller API-servicen.

Använd samma komponent både ovanför och under resultatlistan. Båda ska styra och visa samma sida.

**Testa:** Byt sida med den övre respektive undre pagineringen. Previous ska vara inaktiverad på första sidan och next på sista sidan.

## 3. Rensa sökningen

Lägg till en knapp som rensar sökordet från URL:en, tömmer sökfältet och tar bort resultat och felmeddelanden. Återställ sidnumret till 1 men behåll valt antal träffar per sida.

Ingen API-sökning ska göras med ett tomt sökord.

**Testa:** Rensa efter en lyckad sökning och efter ett fel. Sök igen efteråt. Prova även att rensa medan en hämtning pågår: gamla resultat ska inte dyka upp igen.

## 4. Låt sökfältet följa URL:en

Öppnar man en direktlänk med ett sökord ska det också stå i sökfältet. Samma sak gäller när man använder webbläsarens bakåt- och framåtknappar.

Man ska fortfarande kunna skriva ett nytt sökord utan att varje tangenttryckning startar en sökning. Sökningen sker först när formuläret skickas.

**Testa:** Sök på `react`, sedan `typescript`. Gå bakåt och framåt. Kontrollera både sökfältet, URL:en och resultatet.

## 5. Förbered dig på Context

Se YouTube-filmen om `useContext` som hör till veckans material. Vi implementerar ett gemensamt tema tillsammans på livepasset; ni behöver inte bygga Context eller lagring i `localStorage` i förväg.

Fundera på:

* Vilket problem kan Context lösa jämfört med att skicka props genom flera komponentled?
* Vad gör en provider och vad gör `useContext`?
* Vilka värden i sökappen passar i URL:en, i lokalt state respektive i ett gemensamt context?

## Klart?

Prova knapp och Enter, tomma resultat, direktlänk och mobilvy. Kör `npm run lint` och `npm run build`.

Ta med koden och dina frågor till livepasset. Var beredd att förklara hur ett val av sidstorlek går från formuläret via URL:en till API:et och tillbaka till resultatlistan.
