# Moreno Funari Website

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design System V1

The visual system follows a "professional but human" direction: warm, clear, credible, and intentionally far from motivational-guru styling.

- Fonts: Rubik is the single typeface for body, UI, navigation, buttons, labels and headings via `next/font/google`.
- Palette V1.1: warm ivory backgrounds, warm white surfaces, petrol blue as the primary color, sage green as a limited accent, and warm grays for secondary text and borders.
- Tokens: global design tokens live in `src/styles/tokens.css` and are imported by `src/app/globals.css`.
- Type scale: body uses 400, UI text uses 500, buttons and headings use 600, and 700 is reserved for limited emphasis.
- Microcopy: labels stay at least `0.875rem`, uppercase is limited, and tracking stays modest for a modern, soft, professional feel.
- UI components: `Container`, `ButtonLink`, `Eyebrow`, `SectionHeading`, and `SurfaceCard` live in `src/components/ui`.
- Styling: CSS Modules for component/page styles, with global CSS limited to reset, typography, accessibility, and document-level behavior.

## Layout globale

Header, footer and the global shell live in `src/components/layout`. Navigation, legal links and contact URLs are configured in `src/config/site.ts`.

- Desktop: sticky header with brand, main navigation and the `Inizia da qui` CTA.
- Mobile: accessible menu button, dropdown panel, Escape closing and body scroll lock while open.
- Accessibility: `SiteShell` adds the `Salta al contenuto` skip link pointing to `#main-content`.
- Footer: navigation, app link, email, Instagram and legal links are all driven by `siteConfig`.

## Homepage V1

Homepage sections live in `src/components/sections/home`, with repeated content in `src/config/home.ts`.

- Sections: hero, recognition, start paths, approach, resources, about preview, blog preview and closing CTA.
- Main path: leggere, riflettere, confrontarsi.
- Visual assets: homepage portraits, eBook cover and app preview use local real assets with `next/image`.
- Blog previews are planned content only and do not link to article slugs yet.

## Pagina Chi sono V1

The `/chi-sono` route is a narrative profile page built from dedicated sections in `src/components/sections/about` and repeated lists in `src/config/about.ts`.

- Structure: hero, real-life work, sport, coaching choice, working principles, transparency, credentials and closing CTA.
- Visual: the hero uses `public/images/moreno/moreno-about-outdoor.webp` with `next/image`.
- Focus: the `#come-lavoro` section explains the coaching principles without presenting them as a fixed method.
- Responsibility: training and coaching boundaries are shown in balanced blocks.
- CTAs: the page points to `/coaching` and `/contatti`.

## Pagina Coaching V1

The `/coaching` route is a text-first page built from dedicated sections in `src/components/sections/coaching` and repeated content in `src/config/coaching.ts`.

- Structure: hero, useful situations, definition, process, expectations, first contact, boundaries, FAQ and closing CTA.
- Path: the content moves from situation to clarity to a sustainable first step.
- FAQ: questions use native `<details>` and `<summary>` elements.
- Boundaries: the page clarifies that coaching is not psychotherapy or healthcare support.
- Open decisions: price, duration, mode, location and availability are intentionally not published yet.
- CTA: the main conversion path points to `/contatti`.

## Checks

```bash
npm run lint
npm run build
```
