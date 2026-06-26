# Moreno Funari Website

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design System V1

The visual system follows a "professional but human" direction: warm, clear, credible, and intentionally far from motivational-guru styling.

- Fonts: Manrope for body/UI and Lora for headings via `next/font/google`.
- Palette: warm ivory backgrounds, warm white surfaces, petrol blue primary tones, sage/yellow-green accents, and warm grays for secondary text and borders.
- Tokens: global design tokens live in `src/styles/tokens.css` and are imported by `src/app/globals.css`.
- UI components: `Container`, `ButtonLink`, `Eyebrow`, `SectionHeading`, and `SurfaceCard` live in `src/components/ui`.
- Styling: CSS Modules for component/page styles, with global CSS limited to reset, typography, accessibility, and document-level behavior.

## Layout globale

Header, footer and the global shell live in `src/components/layout`. Navigation, legal links and contact URLs are configured in `src/config/site.ts`.

- Desktop: sticky header with brand, main navigation and the `Inizia da qui` CTA.
- Mobile: accessible menu button, dropdown panel, Escape closing and body scroll lock while open.
- Accessibility: `SiteShell` adds the `Salta al contenuto` skip link pointing to `#main-content`.
- Footer: navigation, app link, email, Instagram and legal links are all driven by `siteConfig`.

## Checks

```bash
npm run lint
npm run build
```
