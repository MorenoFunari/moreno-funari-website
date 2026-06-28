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

## Pagina eBook V1

The `/ebook` route presents "Un passo possibile" with dedicated sections in `src/components/sections/ebook` and repeated content in `src/config/ebook.ts`.

- Structure: hero, useful moments, contents, usage modes, author note, ecosystem, boundaries, FAQ and closing CTA.
- Visual: the hero uses `public/images/ebook/un-passo-possibile-cover.webp` with `next/image`.
- Download: `src/config/ebook.ts` centralizes the PDF availability and CTA behavior.
- Fallback: when the PDF is missing, the primary CTA points to `/contatti` instead of a broken document link.
- Ecosystem: the page links to the app and coaching without treating either as mandatory.
- FAQ: questions use native `<details>` and `<summary>` elements.
- V1: no email capture or newsletter flow is included.

## Pagina Contatti V1

The `/contatti` route uses dedicated sections in `src/components/sections/contact` and shared contact data in `src/config/contact.ts`.

- Contact: the V1 offers email and Instagram only, with no form and no additional data collection.
- First step: the first message is without commitment, and practical details are clarified before any possible meeting.
- FAQ: questions use native `<details>` and `<summary>` elements.
- Boundaries: the page clarifies that coaching does not replace urgent or clinical professional support.

## Motore blog MDX

Local blog content lives in `content/blog` and is rendered through `next-mdx-remote/rsc` with frontmatter parsed by `gray-matter`.

- Frontmatter: title, description, publishedAt, optional updatedAt, category, tags, required draft, featured, and optional paired coverImage/coverAlt.
- Static generation: `/blog/[slug]` uses local files, `generateStaticParams`, `generateMetadata`, and 404s for missing or unpublished slugs.
- Drafts: `draft: true` and future-dated posts are available only during local development; production excludes them from generated article pages and from the sitemap.
- SEO: article metadata includes canonical URL, Open Graph article fields, Twitter card data, and noindex robots for local draft previews.
- Sitemap: `src/app/sitemap.ts` includes public routes and published blog posts only.
- MDX components: native markdown elements are mapped to accessible styled components, with `Callout` and `ReflectionPrompt` available directly in article files.
- Editorial guide: see `content/blog/README.md`.

## Categorie blog

Blog categories are defined in `src/config/blog-categories.ts` and currently use five editorial buckets: Consapevolezza, Fiducia e azione, Pressione e lavoro, Sport e mentalità, and Vita quotidiana.

- Each MDX article must set exactly one required `category` slug.
- Frontmatter validation fails the build when the slug is missing, empty or outside the configured taxonomy.
- Visible labels are kept separate from stable slugs, so UI copy can evolve without changing content identifiers.
- Full editorial usage notes live in `content/blog/README.md`.

## Pagina Blog V1

The `/blog` page is powered by the local MDX blog engine and shows only published articles.

- Layout: text-first hero, one main article, an optional grid for remaining articles, editorial categories and resource links.
- Empty state: when there are no published posts, the page shows a curated editorial state instead of placeholders.
- Publishing rules: drafts and future-dated posts are excluded from the page.
- Resources: the page links to the eBook, Un Passo Possibile AI and coaching with equal weight.
- V1: no filters, search, pagination, newsletter or comments.

## SEO Foundation

The canonical domain is `https://morenofunari.it`, centralized through `src/config/site.ts` and `src/config/seo.ts`.

- Metadata: shared helpers generate page titles, descriptions, canonical URLs, Open Graph and Twitter cards.
- Social image: `/opengraph-image` and `/twitter-image` are generated locally with no remote assets.
- Robots: `/robots.txt` allows public crawling and points to the canonical sitemap.
- Sitemap: `/sitemap.xml` includes public pages and published blog articles only.
- Noindex: legal pages use `noindex, follow`; the eBook PDF stays downloadable but gets `X-Robots-Tag: noindex, follow`.
- JSON-LD: homepage uses `WebSite` and `Person`, `/chi-sono` uses `ProfilePage`, and articles use `BlogPosting`.
- Search Console and Analytics are documented separately because they depend on operational configuration outside the static SEO foundation.

## Google Search Console

Google Search Console uses a Domain property for `morenofunari.it`, verified manually through a DNS TXT record on Porkbun.

- Sitemap: `https://morenofunari.it/sitemap.xml`.
- Verification tokens and DNS record values are not stored in the repository.
- Full operational notes live in `docs/search-console.md`.

## Analytics

Analytics uses Google Analytics 4 with the public Measurement ID configured through environment variables.

- Consent Mode: Basic, with the Google tag blocked before consent.
- Preference: users can accept, refuse or later change analytics from the footer.
- Page views: automatic through GA4 Enhanced Measurement, with no manual `page_view` events.
- Production: `NEXT_PUBLIC_GA_ENABLED` must stay `false` until Issue #19 updates the legal pages.
- Full implementation notes live in `docs/analytics.md`.

## Privacy e cookie

The site includes public Privacy Policy and Cookie Policy pages, both linked from the footer and kept `noindex, follow`.

- GA4 is blocked before consent and can be accepted, refused or revoked.
- The analytics preference can be changed from the footer.
- The cookie and storage inventory lives in `docs/privacy-and-cookies.md`.
- The legal documentation must be reviewed whenever services, providers or data flows change.

## Checks

```bash
npm run lint
npm run build
```
