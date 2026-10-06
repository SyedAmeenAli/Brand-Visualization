# SOURCE_MAP

Maps every part of the site back to its source. Format: **Figma / FigJam source → website section → asset → component → token**.

## Sources

| Source | What it is | How it was read |
| --- | --- | --- |
| Figma file `XOpkWnLPrW1DXwRdnMuLLK` (Final-Aqarati) | Brand Foundation, steps 01–22 | Page structure and the 01 Logo page through the Figma MCP; the exported PDFs of every frame (`Desktop/Final Figma Aqarati`) for exact vectors, text, fills and imagery (Figma MCP view-seat call limit was reached) |
| FigJam `S8IvNvBgdbu4JwxBwaEQOc` (Aqarati-Architecture) | Product principles, IA, verification states, journeys, roles | Read through the Figma MCP |
| Brief | Hero statement, section order, navigation model | The user's build prompt |

The 895-screen PDF set and the old `aqarati-app` assets are **not** used.

## Mapping

| Figma step / frame | Website section | Asset | Component | Tokens |
| --- | --- | --- | --- | --- |
| 01 LOGO / Master logo (node 5:752, `01 — Master logo.pdf`) | Hero, Identity master, Final, Footer, favicon, OG | `src/lib/logo-paths.ts` (68 vector paths copied from the PDF drawing commands, never redrawn), `public/brand/aqarati-master*.svg`, `src/app/icon.png`, `public/og.png` | `BrandLogo`, `BrandSymbol` | `--logo-a/b/c/k` |
| 02 LOGO CONSTRUCTION (13 frames) | Identity 02.1 | `public/plates/con-*.webp` (frames 01–08, 10) | `PlateExplorer` | – |
| 02 construction measurements (apex x 219.603 / y 12.484, left 97.454, right 334.458, wave top 164.963, baseline 259.847) | Hero guide lines | measurements only | `Hero` | – |
| 03 CLEAR SPACE (12 frames, PROPOSED) | Identity 02.2 | `public/plates/cs-*.webp`; X = 60.620 px in the 660 × 726 reference (= 40.413 in the 440 × 484 master); artwork bounds 428.982 × 456.304 from the construction summary | `ClearSpaceDemo`, `PlateExplorer` | – |
| 04 MINIMUM SIZE (16 frames, PROPOSED, no locked value) | Identity 02.3 | `public/plates/ms-*.webp`; tagline text 12.601 px and symbol 349.141 px in the 484-high master drive the live readouts | `MinimumSizeDemo`, `PlateExplorer` | – |
| 05 LOGO VARIANTS (14 frames, PROPOSED) | Identity 02.4 | `public/plates/var-*.webp`; Primary, Symbol, Monochrome and Reverse are the master paths recoloured through tokens | `LogoVariants`, `PlateExplorer` | `--logo-*`, `data-tone` |
| 06 ARABIC TYPOGRAPHY (10 frames) | Typography 03.2 | Copy strings (عقارك يبدأ من هنا, price and room formats, mixed example) | `ArabicSpecimen` | `--font-arabic` |
| 07 ENGLISH TYPOGRAPHY (9 frames) | Typography | Fraunces + Plus Jakarta Sans, sample copy | `TypeSpecimen` | `--font-display`, `--font-sans` |
| 08 BRAND COLOUR (10 frames) | Colour | Mocha #825C3F, Ivory #ECE3D7, Deep Mocha #674830 (measured); neutrals #F7F4EF #FFFFFF #2D2823 #655C52 #C9BFB2 (proposed) | `ColorGallery` | `--brand`, `--ivory`, `--brand-deep`, `--bg`, `--text*`, `--border` |
| 09 UI COLOUR (S09-F11, S09-F12) | Colour 04.1, all theming | 15 light + 15 dark tokens read from the swatch fills | `ThemePreview`, `ColorGallery`, `tokens.css` | `--bg … --disabled` |
| 10 TYPE SCALE (S10-F10) | Typography 03.1 | 12 roles: size / line height / weight / family | `TypeScale`, `.t-*` classes | `.t-display-lg … .t-caption` |
| 11 PHOTOGRAPHY (S11, 8 frames) | Essence, Visual language 05.1, Product, Applications | `public/photo/*.webp` extracted from the PDFs; credit list `PHOTO_CREDITS` (P01–P28) | `PhotographyGallery`, `Photo`, `Lightbox` | – |
| 12 ICONOGRAPHY (S12) | Visual language 05.2 | `public/plates/icons-*.webp`; 24 × 24, 1.75 px, sizes 16 / 20 / 24 / 28 / 32 | `PlateExplorer` | – |
| 13 ILLUSTRATION (S13) | Visual language 05.3 | `public/plates/illus-*.webp` | `PlateExplorer` | – |
| 14 SPACING (S14-F10) | Visual language 06 | space.1–space.11 = 4 … 80 px | `SpacingVisualizer` | `--space-1…11` |
| 15 CORNER RADIUS (S15-F01) | Visual language 07 | none 0, sm 4, md 8, lg 12, xl 16, xxl 20, hero 24 | `RadiusVisualizer` | `--radius-*` |
| 16 ELEVATION (S16-F10, PROPOSED) | Visual language 07.1 | none; Y2 blur8 6%; Y6 blur20 9%; Y12 blur32 12% | `ElevationDemo` | `--elev-1…3` |
| 17 MOTION (S17-F02, S17-F03, PROPOSED) | Visual language 08 | fast 120 / standard 220 / emphasis 360 ms; four cubic-bezier curves | `MotionDemo` | `--motion-*`, `--ease-*` |
| 18 LIGHT THEME (S18-F02…F08) | Product 09.1, 09.2, Verification | `public/screens/s18-*.webp` | `ScreenShowcase`, `DeviceFrame`, `ProfessionalExpression`, `VerificationStates` | light tokens |
| 19 DARK THEME (S19-F02…F04) | Product 09.4 | `public/screens/s19-*.webp` (S19-F05 omitted: contains a portrait) | `ScreenShowcase` | dark tokens |
| 20 APP ICON (S20-F04…F10) | Applications 10.1 | `public/plates/appicon-*.webp` | `PlateExplorer` | – |
| 21 SPLASH (S21-F02…F04, F10) | Applications 10.2 | `public/screens/s21-*.webp` | `SplashStudy` | – |
| 22 BRAND USAGE (S22-F02…F12) | Usage | `public/usage/*.webp` — 59 slices cut per section from the pages | `Usage` (`TopicSlices`, `MasterRules`) | – |
| FigJam 01 Brand Foundation | Essence copy, colour names | principles text | `Essence` | – |
| FigJam 02 Product Foundation | Essence five questions, Verification lead | “Trust before participation”, five questions, Authentication vs Verification | `Essence`, `ProductStudies` | – |
| FigJam 03 Information Architecture | Product nav, verification states | Bottom navigation: **Home / Explore / Activity / Account, four tabs only** (FigJam, “Exact”). The product demo follows this. | `ProductNavDemo`, `VerificationStates` | – |
| FigJam 04 Journey Map | Product 09.3 | DISCOVER → … → RETURN, role list, six sign-up paths | `Journeys` | – |

## Conflicts between the two sources

- **Bottom navigation.** FigJam (product architecture) specifies four tabs: Home, Explore, Activity, Account. The Figma Light/Dark Theme study screens draw a five-tab bar: Home, Discover, Map, Viewings, Profile. The site's navigation demo follows FigJam (architecture wins for product structure); the Figma screens are shown unaltered and the difference is flagged here for the team to resolve.

## What is NOT from Figma (flagged honestly)

- **Hero statement** “Trusted by design. Defined by place.” and the closing line come from the brief. “Quietly distinctive. Consistently trusted.” is from Figma step 22 Master Rules.
- **Arabic copy** is written for this site and needs a native review. The Figma Arabic typeface is still *pending decision* among Noto Sans Arabic, Cairo, Tajawal and Almarai; the brief names **IBM Plex Sans Arabic**, which is what the site uses.
- **Applications 10.3 (web header, letterhead, social profile)** are illustrative compositions of approved assets (real logo, symbol, tokens, photography). Figma has no such frames. They are labelled as illustrative on the page.
- **Product navigation demo** and **property expression** compose Figma tokens and copy; the real Figma screens are shown beside them.
- **Maintenance / viewing flows** use the step names from the brief and the Figma motion frames; Figma has no dedicated maintenance or viewing screens in the files provided.
- **Statuses**: construction is *measured*; clear space, minimum size, variants, iconography, illustration, elevation, motion, app icon and splash are *PROPOSED / requires review* in Figma and are labelled that way on the site. No minimum size is claimed.
- Photo-to-credit pairing: the credit list (P01–P28) is shown as a whole, because the PDF does not bind each embedded photo to a label in machine-readable form.

## Regenerating assets

Assets were produced with PyMuPDF from the exported PDFs: logo paths from the drawing commands of `01 — Master logo.pdf`; plates, screens and usage slices as cropped renders; photos as the embedded originals re-encoded to WebP (max 1800 px).

## Changes after review

- Site split into pages (home + 7 chapters). Photography now includes 9 further images from the same Figma-credited set; the reading-room photo was mis-mapped to a kitchen file and is corrected.
- Launch screens (Applications 10.2) are now composed live from the exact master symbol and Figma surface tokens, replacing the flat exported frames.
- Display type sizes on the web are tuned smaller than the Figma 72/56/40/32 roles; the exact Figma sizes remain shown in the Typography scale.
