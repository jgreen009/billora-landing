# Billora

A responsive, editorial landing page for an independent billing product concept. Next.js 16, React 19, TypeScript, Tailwind CSS 4, and GSAP ScrollTrigger. The primary action explores the on-page workflow; this is not a live billing account.

## Development and checks

Use Node.js 22 or newer (Netlify is configured for Node 22).

```sh
npm ci
npm run dev
```

```sh
npm run check       # lint, TypeScript, unit tests, production build
npm run test:e2e    # Chromium, Firefox, WebKit, and phone emulations
npm run test:a11y   # axe checks across the interactive states
```

Install test browsers once with `npx playwright install`. Browser tests can use an already running production server by setting `PLAYWRIGHT_BASE_URL`. Without it, Playwright builds and starts the site on port 3000, or reuses a local server outside CI.

## Deploy to Netlify

Use a Git-connected Netlify project (or Netlify CLI with a build), rather than dragging the `.next` directory into Netlify Drop. This project uses the Next.js image/runtime integration.

1. Put this source project in your Git repository and import it into Netlify.
2. The included `netlify.toml` sets build command `npm run build`, publish directory `.next`, and Node.js 22.
3. Netlify detects Next.js and applies its maintained runtime automatically. No adapter pin is required.
4. Netlify's `URL` / `DEPLOY_PRIME_URL` supply the metadata and sitemap origin. An optional `NEXT_PUBLIC_SITE_URL` overrides it for a custom domain. Rebuild after changing the domain.
5. After publishing, verify the actual HTTPS page, mobile menu, workflow, image loading, social preview, `/robots.txt`, `/sitemap.xml`, and custom 404.

Preview deployments are marked noindex. The primary button always stays within this portfolio demo, as intended.

[Official Next.js on Netlify guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).

## Source layout

- `BilloraLanding.tsx`: page composition, navigation, and workflow selection.
- `Hero.tsx`, `FeatureGrid.tsx`, `DocumentShowcase.tsx`, `FAQ.tsx`: current page sections.
- `ProductVisuals.tsx`: native document, chart, and sample dashboard artwork.
- `Controls.tsx`: brand, calls to action, and keyboard selection helpers.
- `content.ts`, `demo-data.ts`: editorial copy and canonical display data.
- `billora.css`: responsive design, reduced-motion fallbacks, and interactions.
- `src/lib/motion/`: shared preference, scoped GSAP lifecycle, and Lenis desktop scrolling on the shared GSAP ticker.
- `src/lib/site-origin.ts`: explicit-domain and Netlify origin resolution.
- `src/app/fonts/`: self-hosted Geist with its SIL Open Font License.
- `e2e/`: flow, release-route, keyboard, layout, and accessibility checks.

The retired implementation has been removed. Earlier design reports are historical references in `docs/archive/`. Local screenshots, audit JSON, and the pre-cleanup source backup live in ignored `artifacts/`.

## Demo boundaries

All clients, documents, payments, and chart activity are fictional. No billing information is collected, payment processed, or invoice emailed. No signup, analytics, or remote font service is used. Only the motion preference is stored; if storage is blocked, it works for the current visit. OS reduced-motion preferences take precedence. Currency symbols illustrate formats; no exchange conversion is performed.

The shared fixture produces a $6,300 subtotal, $630 discount, $453.60 tax, $6,123.60 total, $2,000 recorded payment, and $4,123.60 remaining balance.

## Assets

`public/images/billora-sculpture.webp` is a Higgsfield / Recraft V4.1 generation, optimized to 1400px wide and about 76 KB. One generation was submitted at a quoted cost of **8 credits** within the authorized **70-credit cap**. No further credits were used during cleanup.

Generation ID: `53dc0182-c248-454a-9fa5-3eb582716db8`. The still depicts an ivory paper ribbon with a cobalt blue interior, soft sunlight, and no text or logo. Icons and the social card are native vector designs rendered to local assets.

## Review limits

Automated checks support release decisions but are not a guarantee of accessibility conformance, real-device performance, or audience preference. See `docs/RELEASE_REVIEW.md` for the measured results, retained development-only dependency findings, and final hosted checks.
