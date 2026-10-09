# Async Todos

## Re-create

Copy `02-simple-todos` and rename it to `04-async-todos`. Edit `package.json` and change the package name.

Install `json-server`:

```bash
npm install json-server@0.17.4
```

Add the following script to the `"scripts"`-section of package.json:

```json
"server": "json-server --watch data/db.json --port 3000 --delay 1500"
```

Create a `data`-folder in the root of your project and add a `db.json` file with the following content:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Make coffee",
      "completed": true
    },
    {
      "id": 2,
      "title": "Drink coffee",
      "completed": true
    },
    {
      "id": 3,
      "title": "Drink MOAR coffee",
      "completed": false
    }
  ]
}
```

## Run

Start **both** the React app and the json-server in separate terminals:

### Terminal 1 (React app)

```bash
npm run dev
```

### Terminal 2 (json-server)

```bash
npm run server
```
