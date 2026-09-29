# Links Vault

React + TypeScript app for saving, searching and managing favorite links
(ReactTS Task 2). Built from the Figma "Links Vault – MVP Design".

- Add / view / edit / delete links (title, URL, description, optional tags)
- Search by title, URL, description or tag, plus an "All Tags" dropdown filter
- Data persists in `localStorage`; first visit shows sample bookmarks
- Toast notifications, delete confirmation, responsive (320 / 480 / 768 / 1024 / 1200px)
- Plain CSS only

## Run

```bash
npm install
npm run dev
npm run build
```

## Host (GitHub Pages)

1. Push the project to a GitHub repo (branch `main`).
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push.

Netlify / Vercel also work: build command `npm run build`, output directory `dist`.

## Submitted by Boitshepo
