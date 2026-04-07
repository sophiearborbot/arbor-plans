# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Arbor Family Plans** is a personal trip-planning hub for the Arbor family (Sophie, Sage, Tafline, Asher, Verity). It is a **static site** — no build step, no framework, no package manager. All pages are standalone HTML files served directly (likely via GitHub Pages or similar static host).

## Architecture

- **`index.html`** — Main dashboard. Renders trip cards from `trips-manifest.json` with JS filtering by family member. Dark theme, card-based timeline layout.
- **`trips-manifest.json`** — Central data source for all trips. Each entry has metadata (dates, status, who, colors) and a `planPage` link to its detail page. **Add new trips here first.**
- **Per-trip detail pages** — Self-contained HTML files (e.g., `belize_2026.html`, `europe_2026_map.html`). Each has its own inline CSS/JS, and may use Leaflet maps and Chart.js.
- **`belize_mode.js`** — Only external JS file. Contains map spot data and `setTripMode()` for the Belize page's multi-view tabs (Dive/Chill/Tafline). Extracted to bypass CDN HTML caching.
- **`prices.json` / `belize_prices.json`** — Flight price tracking data used by chart widgets in detail pages.
- **`scrapbook.html`** + **`scrapbook/`** — Scrapbook builder UI. JSON files in `scrapbook/` hold per-trip scrapbook data (photos, memories, map pins).

## Key Patterns

- **All-in-one HTML files**: Each trip page bundles its own styles, markup, and scripts inline. No shared CSS/JS framework — changes to one page don't affect others.
- **Leaflet maps**: Used in Belize, Europe, NMB, and scrapbook pages. Loaded from CDN (`unpkg.com/leaflet@1.9.4`). Map spots are defined as `{ll, label, color}` arrays.
- **Chart.js**: Used for flight price charts. Loaded from CDN.
- **Dark/light mode**: Belize page has a toggle. Uses CSS custom properties on `body.light-mode`.
- **LocalStorage persistence**: Used for tab state (`belizeTripMode`), checkbox state, and scrapbook data.
- **No real data fabrication**: Flight price charts must use only real tracked data from JSON files (see commit `092eeae`).

## Conventions

- Commit messages use conventional-ish prefixes: `feat:`, `fix:`.
- Trip status values in manifest: `active`, `planning`, `deferred`.
- Color-coded family member system: Sage=green, Tafline=red, Asher=yellow, Verity=pink, Family=cyan.
- GPS coordinates in map spot arrays use `[lat, lng]` format.
