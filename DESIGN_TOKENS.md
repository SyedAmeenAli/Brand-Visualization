# DESIGN_TOKENS

All tokens live in `src/styles/tokens.css` as CSS variables and are exposed to Tailwind in `tailwind.config.ts`. Colours are stored as space-separated RGB (`130 92 63`) so Tailwind can apply alpha (`bg-brand/10`). Nothing in the components hard-codes a brand colour.

## Colour

Brand (measured from the master artwork): **Mocha** `#825C3F`, **Ivory** `#ECE3D7`, **Deep Mocha** `#674830`.

Semantic tokens (Figma S09-F11 light / S09-F12 dark, proposed):

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` background/primary | #F7F4EF | #211E1B |
| `--bg-2` background/secondary | #ECE3D7 | #2B2622 |
| `--surface` | #FFFFFF | #302B26 |
| `--elevated` | #FFFFFF | #3A332D |
| `--text` | #2D2823 | #F4EEE6 |
| `--text-2` | #655C52 | #C8BCAD |
| `--text-3` | #81776C | #A99C8C |
| `--border` | #C9BFB2 | #615548 |
| `--border-soft` | #E1DAD0 | #443B32 |
| `--brand` | #825C3F | #825C3F |
| `--success` | #3E6E51 | #A4C6AD |
| `--warning` | #956620 | #D8B67C |
| `--error` | #A0443F | #E0AAA4 |
| `--info` | #4F6980 | #A4BDD1 |
| `--disabled` | #A69E94 | #786C60 |

Additional: `--accent` is mocha used **as text**: Deep Mocha on light, `text/secondary` on dark (Figma: “Mocha is a CTA fill, not weak dark-mode body text”). `--logo-a/b/c/k` recolour the master paths (`k` = counter shapes that take the surface colour).

Scopes: `:root[data-theme='dark']` and `[data-band='dark']` apply the dark set; `[data-band='ivory']` sets the Figma ivory surface; `[data-force='light']` forces the light set inside dark sections (theme preview).

## Type (Figma S10-F10)

| Role | Size / line | Weight | Family |
| --- | --- | --- | --- |
| DisplayLarge `.t-display-lg` | 72 / 84 | 400 | Fraunces |
| Display `.t-display` | 56 / 64 | 400 | Fraunces |
| H1 `.t-h1` | 40 / 48 | 600 | Fraunces |
| H2 `.t-h2` | 32 / 40 | 600 | Fraunces |
| H3 `.t-h3` | 24 / 32 | 600 | Plus Jakarta Sans |
| H4 `.t-h4` | 20 / 28 | 600 | Plus Jakarta Sans |
| BodyLarge `.t-body-lg` | 18 / 28 | 400 | Plus Jakarta Sans |
| Body `.t-body` | 16 / 24 | 400 | Plus Jakarta Sans |
| BodySmall `.t-body-sm` | 14 / 20 | 400 | Plus Jakarta Sans |
| LabelLarge `.t-label-lg` | 16 / 24 | 500 | Plus Jakarta Sans |
| Label `.t-label` | 14 / 20 | 500 | Plus Jakarta Sans |
| Caption `.t-caption` | 12 / 18 | 400 | Plus Jakarta Sans |

Display roles are fluid below desktop (`clamp`), desktop values are exact. Arabic uses IBM Plex Sans Arabic (`--font-arabic`). Only the weights in use are loaded (Fraunces 400/600, Plus Jakarta 400/500/600, Plex Arabic 400/500/600).

## Spacing, radius, elevation, motion

- Spacing `--space-1…11` = 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 px (Figma S14-F10)
- Radius `--radius-none…hero` = 0, 4, 8, 12, 16, 20, 24 px (S15)
- Elevation `--elev-1/2/3` = Y2/blur8/6%, Y6/blur20/9%, Y12/blur32/12% (S16-F10, proposed; stronger alpha in dark)
- Motion `--motion-fast/standard/emphasis` = 120 / 220 / 360 ms; `--ease-standard` `cubic-bezier(0.2, 0, 0, 1)`, `--ease-enter` `(0, 0, 0.58, 1)`, `--ease-exit` `(0.42, 0, 1, 1)`, `--ease-emphasis` `(0.42, 0, 0.58, 1)` (S17, proposed)

## Layout and glass

`--gutter` clamp(20px, 5vw, 80px), `--maxw` 1560 px, 12-column grid. Glass (`.glass`, navigation only): tint = `--glass-tint` at `--glass-alpha`, 22 px blur + 1.5 saturation, 1 px edge, `--elev-2` shadow, solid fallback when `backdrop-filter` is unsupported. Over dark bands the dock switches to the dark token set automatically.

The typed copies of these values used for display (colour swatches, spacing bars, motion readouts) are in `src/content/data.ts`.
