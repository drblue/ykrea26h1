# Övning inför lektion 5 - Bygg en väderapp med React

Layouten är färdig. Bygg funktionaliteten ett steg i taget och behåll stilarna. Bara GET behövs.

## Starta

Öppna `boilerplate`. Kör `npm ci` och `npm run dev`.

Vädret som visas är statiska exempelvärden. Sökningen fungerar inte ännu.

## Skaffa en API-nyckel

1. [Skapa ett gratis OWM-konto](https://home.openweathermap.org/users/sign_up) och bekräfta din e-postadress.
2. Öppna [API keys](https://home.openweathermap.org/api_keys) och fyll i något lämpligt namn under "Create key". Tryck därefter på "Generate" och kopiera din nyckel.
3. Kopiera `.env.example` till `.env.local` i `boilerplate` och fyll i:

   ```dotenv
   VITE_OWM_APIKEY=din_api_nyckel
   ```

4. Starta om Vite. Läs nyckeln i servicen via `import.meta.env.VITE_OWM_APIKEY`.

⚠️ Tänk på att det kan ta upp till två timmar innan er nya nyckel blir aktiverad och kan användas ([OWM:s FAQ](https://openweathermap.org/faq)). Lägg inte nyckeln i källkoden.

## 1. Läs in ortnamnet

Lägg state i `SearchCity` och koppla sökfältets `value` och `onChange` till det.

**Testa:** Skriv, ändra och radera text.

## 2. Skicka sökningen till App

Hantera formulärets submit utan sidomladdning. Ändra knappen till `type="submit"` och skicka ortnamnet till `App` via en typad `onSearch`-prop.

Trimma namnet. Kräv minst tre tecken, både för knapp och Enter.

**Testa:** `ab` och blanksteg stoppas. `  Lund  ` skickas som `Lund`.

## 3. Hämta väder via en service

Skapa `src/services/OWMAPI.ts` med funktionen `getCurrentWeather(city)`. Gör GET-anropet med axios och returnera väderdatan. Anropa servicen från sökhandlern i `App`.

**Testa:** En sökning ger ett vädersvar. Att bara skriva gör inget anrop.

## 4. Visa väderdatan

Typa svarsfälten du använder. Spara svaret i state i `App` och skicka det via props till `CurrentWeather` och `WeatherCondition`.

Ersätt exempelvärdena med svarsdatan. Rendera `weather`-arrayen med stabila nycklar. Dölj rapporten innan första lyckade sökningen och ta bort exempeltiden tills steg 7.

**Testa:** Sök på två orter. Rapporten och ikonerna uppdateras.

## 5. Visa loading

Lägg loading-state i `App`. Visa `LoadingWeather` och dölj föregående rapport under hämtningen. Inaktivera formuläret så att nya anrop inte kan startas samtidigt.

Återställ loading i `finally`, även vid fel.

**Testa:** Spinnern visas under hämtningen och försvinner efteråt.

## 6. Hantera fel

Fånga fel från anropet och visa meddelandet i en Bootstrap `Alert`. Rensa tidigare fel när en ny sökning börjar. Vid fel ska ingen gammal rapport visas.

**Testa:** Sök på en påhittad ort och sedan `Lund`. Appen ska fungera efter felet.

## 7. Visa rapportens färskhet

Omvandla svarets `dt` från Unix-sekunder till ett datum. Visa det i rapportens befintliga `<time>`-element.

**Testa:** Tiden kommer från API-svaret, inte från söktillfället.

## Endpoint att använda

Övningen använder [**Current Weather Data**](https://openweathermap.org/api/current?collection=current_forecast) med ett enda API-anrop per sökning:

```text
GET https://api.openweathermap.org/data/2.5/weather
```

Skicka dessa frågeparametrar med axios `params`:

| Parameter | Värde |
| --- | --- |
| `q` | Ortnamnet, t.ex. `Lund` |
| `appid` | Din API-nyckel från `.env` |
| `units` | `metric` (°C och m/s) |

[Dokumentation för endpoint](https://openweathermap.org/current#name)

Väderikoner laddas som bilder från `https://openweathermap.org/img/wn/{icon}@2x.png`. Ersätt `{icon}` med svarets ikonkod. Det kräver varken API-nyckel eller axios. [Ikondokumentation](https://openweathermap.org/weather-conditions)

## Extra

- Visa ett valideringsmeddelande medan den trimmade texten har ett eller två tecken.
- Visa `day.svg` eller `night.svg` utifrån `dt` och ortens `sys.sunrise`/`sys.sunset`. Hantera saknade soltider.

## Klart?

Prova knapp, Enter, ogiltig sökning och mobilvy. Kör `npm run lint` och `npm run build`.
