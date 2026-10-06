# AQARATI — Brand Experience

An interactive brand book for AQARATI (عقاراتي): a home page plus seven chapter pages (`/identity`, `/typography`, `/colour`, `/visual-language`, `/product`, `/applications`, `/usage`) that walk through the identity, typography, colour, visual language, product expression, applications and brand usage, built from the approved Figma Brand Foundation and the FigJam product architecture.

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 3 · Framer Motion. No UI kit, no analytics, no tracking.

## Run

```bash
npm install
npm run dev        # http://localhost:3210
npm run build      # production build (types + lint run as part of it)
npm start          # serve the production build on :3210
npm run typecheck  # tsc --noEmit
```

Set `NEXT_PUBLIC_SITE_URL` for correct Open Graph URLs in production.

## Structure

```
src/
  app/                 layout (fonts, metadata, JSON-LD), page.tsx, icon / apple-icon / favicon
  components/
    brand/             BrandLogo, BrandSymbol, LogoVariants, ClearSpaceDemo, MinimumSizeDemo
    navigation/        FloatingGlassNav (the only glass element)
    sections/          Hero, Essence, Identity, Typography, Colour, VisualLanguage, Product, Applications, Usage, Final (+Footer)
    gallery/           Photo, PhotographyGallery, PlateExplorer, Lightbox
    typography/        TypeSpecimen, TypeScale, ArabicSpecimen
    color/             ColorGallery, ThemePreview
    mockups/           DeviceFrame, ScreenShowcase, ProductStudies
    motion/            Reveal / MaskLine / ClipReveal, MotionDemo, PointerHalo
    ui/                Segmented (accessible tabs)
  content/             data.ts (structured content), copy.ts (EN + AR strings), plates.json, usage.json
  lib/                 i18n, theme, scroll spy, analytics hooks, colour maths, logo-paths (generated)
  styles/              tokens.css (design tokens), globals.css
public/
  brand/               master logo SVGs
  plates/              source frames cropped from Figma (construction, clear space, size, variants, icons, illustration, app icon)
  screens/             product screens (light, dark, splash)
  usage/               Figma step 22 do / don't slices
  photo/               editorial photography with credits in src/content/data.ts
```

Companion docs: [`SOURCE_MAP.md`](SOURCE_MAP.md) (Figma → section → asset → component → token, plus what is *not* from Figma) and [`DESIGN_TOKENS.md`](DESIGN_TOKENS.md).

## How things work

- **Brand assets.** The logo is the approved master vector: its 68 path shapes were copied from the Figma export (`src/lib/logo-paths.ts`) and are only recoloured through CSS variables. Nothing is redrawn or typeset. Plates, screens and usage slices are renders of the Figma frames.
- **Themes.** `data-theme="light|dark"` on `<html>` swaps the token set; an inline script applies the saved or system theme before paint. Sections also carry a `data-band` (`ivory`, `dark`) for deliberate rhythm. Dark is a designed palette, not an inversion. Theme and language persist in `localStorage`.
- **Language.** English and Arabic live in one document (`src/content/copy.ts`, `{en, ar}` pairs). Switching sets `lang`/`dir` on `<html>`, mirrors layout through logical properties, and keeps the chapter under the viewport pinned. Arabic uses IBM Plex Sans Arabic. Arabic copy needs a native review before launch.
- **Navigation.** A floating glass dock at the bottom centre: it minimises while scrolling down and restores on scroll up, hover or keyboard focus; items are mouse-draggable with momentum and touch-swipeable; the active chapter is centred and marked with `aria-current`; the tint follows the band behind it. Each item is a page link (active page marked `aria-current="page"`); every chapter page has an in-page index of its numbered sub-chapters and a link to the next chapter.
- **Motion.** Native scrolling only. Durations and curves come from the Figma motion tokens (120 / 220 / 360 ms, `cubic-bezier(0.2, 0, 0, 1)`). `prefers-reduced-motion` removes movement and reveals and the pointer ring; state changes still work.
- **Accessibility.** Semantic landmarks and one `h1`, visible focus, skip link, `aria-current` / `aria-pressed` / `aria-expanded`, keyboard-operable tabs, lightbox (Esc, arrows, focus trap and restore), 44 px minimum touch targets, status shown by text as well as colour.
- **Analytics hooks.** `section_view`, `theme_change`, `language_change`, `logo_variant_select`, `colour_select` (plus `photo_open`, `plate_select`) dispatch a `aqarati:event` CustomEvent and call `window.aqaratiAnalytics.track` if you define it. Nothing is sent by default.

## Status of the brand rules shown

Per the Figma source, only the construction measurements and the three brand colours are *measured from the artwork*. Clear space, minimum size, variants, iconography, illustration, elevation, motion, app icon and splash are **proposed / requires review**, and the site says so. No minimum logo size is claimed.

## Open items

- Native Arabic review of all Arabic copy; final Arabic typeface decision in Figma.
- Resolve the bottom-navigation difference between FigJam (4 tabs) and the Figma study screens (5 tabs).
- Brand approval of the proposed clear-space / minimum-size / variant rules.
- Set `NEXT_PUBLIC_SITE_URL`; add production analytics only if wanted (hooks are in place).
