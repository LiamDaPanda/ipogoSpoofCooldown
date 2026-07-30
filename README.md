# iPoGo Spoof Cooldown Calculator

A single-page app that calculates how long you need to wait after a
teleportation spoof in Pokémon GO before the soft ban lifts and you can
safely interact with the game again.

## Usage

Open `index.html` in any browser — no build step, no dependencies.

Two input modes:

- **Distance** — enter kilometres directly.
- **Coordinates** — enter two lat/lng pairs; distance is computed with the
  haversine formula.

The app shows the required cooldown, starts a live countdown, and persists
timer state to `localStorage` so you can close the tab and come back to it.

## Cooldown chart

The lookup table is the community-standard Pokémon GO distance-to-cooldown
chart used by every spoofing tool (iPoGo, PGSharp, etc.). See the collapsible
chart inside the app for the full breakdown.
