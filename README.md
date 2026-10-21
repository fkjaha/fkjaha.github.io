# Fkjaha Games site

Preview locally: `python -m http.server 8000 --bind 127.0.0.1`, then open http://127.0.0.1:8000.

After updating Steam data, rebuild the homepage's lightweight screenshot background:

```powershell
node scripts/fetch-steam-assets.mjs
python scripts/build-hero-thumbnails.py
```

The second command selects roughly half of each game's screenshots, creates 320x180
pre-blurred WebP copies, and writes `content/hero-media/manifest.json`. It leaves the
original screenshots intact. The homepage loads at most 12 of these images on desktop
or 8 on mobile, shuffled each visit. Commit `content/hero-media/` with the site.

Requires Pillow (`python -m pip install Pillow`, once). Optional tuning:
`python scripts/build-hero-thumbnails.py --fraction 0.5 --width 320 --quality 55`.
