# Workshop livepass 4

## Steg 1 - Radera en todo

När man klickar på "Delete" knappen på en todo så ska den raderas från vårt API (och todos hämtas om från API:et).

Detta gör ni genom att göra en `DELETE`-request med `axios.delete()` till `http://localhost:3000/todos/<id>` (t.ex. `http://localhost:3000/todos/3` för att radera todo med id `3`).

## Steg 2 - Uppdatera en todo

När man togglar en todo så ska `completed`-status vändas och todo:n uppdateras i vårt API (och todos hämtas om från API:et).

Detta gör ni genom att göra en `PATCH`-request med `axios.patch()` till `http://localhost:3000/todos/<id>` (t.ex. `http://localhost:3000/todos/3` för att uppdatera todo med id `3`).
