# Fieldnotes — React Blog Layout

A responsive blog homepage built with React and Vite. Blog posts are loaded from a local JSON file and can be searched, filtered by category, and sorted by date.

## Features
- Responsive editorial-style layout for desktop, tablet, and mobile
- Reusable `PostCard` component
- JSON-driven post data (`src/data/posts.json`)
- Live search across title, excerpt, category, and author
- Category filters generated from the data
- Newest-first and oldest-first sorting
- Empty state with a clear-filters action
- Accessible labels and reduced-motion support

## Run locally

Install Node.js (LTS), then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Add a post

Edit `src/data/posts.json` and add an object using this shape:

```json
{
  "id": 7,
  "title": "Your post title",
  "excerpt": "A short summary of the post.",
  "category": "Design",
  "author": "Your Name",
  "date": "2026-10-01",
  "readTime": "4 min read",
  "image": "https://example.com/image.jpg",
  "featured": false
}
```

Use a unique numeric `id`. Categories are automatically added to the filter tabs. Images in the sample use remote Unsplash URLs, so an internet connection is needed to load them.
