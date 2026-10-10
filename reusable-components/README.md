# Reusable React Components Dashboard

A responsive React + Vite demo featuring five reusable components: `Header`, `Footer`, `Card`, `Form`, and `Button`.

## Features

- Reusable components driven by props
- Dynamic project and user cards
- Controlled form inputs with React state
- Add User form can be shown or hidden
- Responsive CSS grid and mobile layout
- Stable IDs for rendered lists
- No backend required

## Run locally

Make sure Node.js and npm are installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
reusable-components/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    └── components/
        ├── Header.jsx
        ├── Footer.jsx
        ├── Card.jsx
        ├── Form.jsx
        └── Button.jsx
```

## Note

New users are kept in React state only and are lost when the page is refreshed. Add local storage or a backend API if you need persistence.
