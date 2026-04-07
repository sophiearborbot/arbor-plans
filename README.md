# Arbor Family Plans

Trip planning hub for the Arbor family — backpacking, diving, international travel, and beach weekends.

**Live site:** https://sophiearborbot.github.io/arbor-plans/

## Trips

| Trip | Dates | Status | Page |
|------|-------|--------|------|
| [Spring Break Backpacking](https://sophiearborbot.github.io/arbor-plans/spring_break_camping.html) | Apr 9–12, 2026 | Planning | Linville Gorge (NC) + 4 ranked backup options |
| [North Myrtle Beach](https://sophiearborbot.github.io/arbor-plans/nmb_spring_2026.html) | Apr 3–6, 2026 | Active | Cherry Grove Beach, family weekend |
| [Belize Diving](https://sophiearborbot.github.io/arbor-plans/belize_2026.html) | Apr 29–May 6, 2026 | Planning | Ambergris Caye → Placencia, Great Blue Hole, whale sharks |
| [Europe 2026](https://sophiearborbot.github.io/arbor-plans/europe_2026_map.html) | Jun 12–28, 2026 | Planning | AMS → Belgium → Paris, then family route TBD |
| [Japan](https://sophiearborbot.github.io/arbor-plans/japan_may_2026.html) | Apr 28–May 6, 2026 | Deferred | Tokyo → Hakone → Kyoto (moved to 2027) |

## How It Works

This is a static site hosted on GitHub Pages — no build step, no dependencies. Each trip is a self-contained HTML file with inline CSS and JS.

- **`index.html`** — Main dashboard, renders trip cards from `trips-manifest.json` with family member filtering
- **`trips-manifest.json`** — Central data for all trips (dates, status, participants, links)
- **Per-trip HTML files** — Detail pages with itineraries, interactive Leaflet maps, and price tracking charts
- **`scrapbook.html`** + **`scrapbook/`** — Post-trip scrapbook builder with photos and map pins

### Adding a New Trip

1. Add an entry to `trips-manifest.json`
2. Create a detail HTML page
3. Push to `main` — GitHub Pages deploys automatically
