# Fkjaha Games site

A static, data-driven portfolio site with a sharper, more editorial visual style.

## Files

- `index.html` — page shell
- `styles.css` — layout and visual system
- `app.js` — renders the site from JSON
- `content/site.json` — editable source content
- `scripts/fetch-steam-assets.mjs` — optional build-time Steam media downloader

## How to run

Open `index.html` through a local server or deploy it to GitHub Pages.

For local development, any static server works:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Steam asset pipeline

1. Put your Steam app IDs into `content/site.json`.
2. Run:

```bash
node scripts/fetch-steam-assets.mjs
```

3. The script creates `content/site.generated.json` and downloads screenshots and trailers into `content/steam-media/`.
4. `app.js` loads `content/site.generated.json` first, then falls back to `content/site.json`.

## Content model

Each game can include:
- `title`
- `type`
- `description`
- `steamAppId`
- `media.poster`
- `media.video`
- `links[]`

The layout does not depend on the specific number of projects, so you can add or remove entries without changing the structure.
