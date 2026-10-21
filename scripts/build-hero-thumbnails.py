#!/usr/bin/env python3
"""Build small, pre-blurred WebP images for the homepage screenshot background.

Run after refreshing Steam data: python scripts/build-hero-thumbnails.py
Requires Pillow: python -m pip install Pillow
"""

import argparse
import hashlib
import io
import json
import math
from pathlib import Path

try:
    from PIL import Image, ImageEnhance, ImageFilter, ImageOps
except ImportError:
    raise SystemExit("Install Pillow first: python -m pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "content" / "hero-media"


def local_image(shot):
    for value in (shot.get("thumbnail"), shot.get("full")):
        if not isinstance(value, str) or "://" in value:
            continue
        candidate = (ROOT / value).resolve()
        if candidate.is_relative_to(ROOT) and candidate.is_file():
            return candidate
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fraction", type=float, default=0.5,
                        help="Fraction of each game's screenshots to include (default: 0.5).")
    parser.add_argument("--width", type=int, default=320,
                        help="Output width; height uses a 16:9 ratio (default: 320).")
    parser.add_argument("--quality", type=int, default=55,
                        help="WebP quality from 1 to 95 (default: 55).")
    parser.add_argument("--blur", type=float, default=2.5,
                        help="Blur baked into the image, in pixels (default: 2.5).")
    args = parser.parse_args()
    if not 0 < args.fraction <= 1:
        parser.error("--fraction must be greater than 0 and no greater than 1")
    if not 64 <= args.width <= 1280:
        parser.error("--width must be between 64 and 1280")
    if not 1 <= args.quality <= 95 or not 0 <= args.blur <= 12:
        parser.error("Use --quality between 1 and 95 and --blur between 0 and 12")

    source = ROOT / "content" / "site.generated.json"
    if not source.is_file():
        raise SystemExit("Run node scripts/fetch-steam-assets.mjs first to download screenshots.")
    site = json.loads(source.read_text(encoding="utf-8-sig"))
    size = (args.width, round(args.width * 9 / 16))
    games = []
    generated = {}
    originals = set()
    available_count = 0
    selected_count = 0

    for section in site.get("sections", []):
        for game in section.get("items", []):
            if not game.get("steamAppId"):
                continue
            sources = list(dict.fromkeys(
                path for shot in game.get("media", {}).get("screenshots", [])
                if (path := local_image(shot)) is not None
            ))
            if not sources:
                continue
            available_count += len(sources)
            count = max(1, math.ceil(len(sources) * args.fraction))
            # Spread the selection across each gallery; reruns are reproducible.
            selected = [sources[index * len(sources) // count] for index in range(count)]
            images = []
            for path in selected:
                with Image.open(path) as original:
                    image = ImageOps.fit(ImageOps.exif_transpose(original).convert("RGB"),
                                         size, method=Image.Resampling.LANCZOS)
                image = ImageEnhance.Color(image).enhance(0.7)
                image = image.filter(ImageFilter.GaussianBlur(args.blur))
                encoded = io.BytesIO()
                image.save(encoded, format="WEBP", quality=args.quality, method=6)
                data = encoded.getvalue()
                name = f"hero-{hashlib.sha256(data).hexdigest()[:16]}.webp"
                generated[name] = data
                images.append(f"content/hero-media/{name}")
                originals.add(path)
                selected_count += 1
            games.append({"steamAppId": str(game["steamAppId"]),
                          "title": game.get("title", ""), "images": images})

    if not generated:
        raise SystemExit("No local screenshots found. Refresh Steam data before running this script.")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, data in generated.items():
        destination = OUTPUT / name
        if not destination.exists():
            destination.write_bytes(data)
    manifest = {"version": 1, "width": size[0], "height": size[1], "games": games}
    temporary = OUTPUT / "manifest.json.tmp"
    temporary.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    temporary.replace(OUTPUT / "manifest.json")

    # Remove only this generator's obsolete files, inside its own output folder.
    output_root = OUTPUT.resolve()
    for old in OUTPUT.glob("hero-*.webp"):
        if old.resolve().is_relative_to(output_root) and old.name not in generated:
            old.unlink()

    before = sum(path.stat().st_size for path in originals)
    after = sum(len(data) for data in generated.values())
    print(f"Selected {selected_count}/{available_count} screenshots across {len(games)} games.")
    print(f"Created {len(generated)} pre-blurred WebP images at {size[0]}x{size[1]}.")
    print(f"Selected source files: {before / 1024:.0f} KiB -> hero assets: {after / 1024:.0f} KiB "
          f"({100 * (1 - after / before):.1f}% smaller).")
    print("Wrote content/hero-media/manifest.json. Original screenshots are unchanged.")


if __name__ == "__main__":
    main()
