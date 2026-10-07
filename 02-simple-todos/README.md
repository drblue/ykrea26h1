# Simple Todos

## Re-create

```bash
npm create vite@latest 02-simple-todos -- --template react-ts
npm i -D bootstrap
npm i -D -E sass@1.77.6
npm i react-bootstrap
```

Remove all files that are not needed, like `App.css` and `main.scss` as well as the images in the `assets` folder. Empty `App.css` and `App.tsx` of everything except the declaration.

Update `App.tsx` to import bootstrap and the main scss file:

```tsx
import './assets/scss/App.scss';
```
