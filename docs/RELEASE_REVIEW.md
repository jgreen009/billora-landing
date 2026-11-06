# Release review

## Verdict

The cleaned landing page is ready for a Netlify build and deployment as an **interactive portfolio concept**. It is not a billing service. Actual Netlify-hosted verification remains outstanding because this task did not publish the site.

The primary action intentionally explores the on-page workflow. There is no signup, checkout, account integration, or collection of billing information.

## Code review and cleanup

- Removed 23 retired component/test/validation files after taking a recoverable source backup at `artifacts/before-cleanup-20261028.zip`.
- Split the former monolithic page into section components, shared controls, product artwork, copy/data, and a dedicated GSAP hook.
- Replaced the obsolete dark theme and legacy utility aliases with a small global foundation matching the current design.
- Removed unused form parsing helpers and retired playground constants. Existing money/fixture tests now cover the retained display calculations rather than removed forms.
- Removed the unused GSAP React wrapper; moved Jest's required `jest-util` peer dependency to development dependencies and aligned it with Jest 29.
- Removed starter SVGs, duplicate favicon sources, and the unused mono font. Generated a consistent local icon set and social image.
- Archived superseded reports in `docs/archive/`; they are historical references, not the release verdict.
- Ignored screenshots, test reports, and local audit/backup artifacts.
- Fixed motion preference behavior when browser storage is unavailable.
- Corrected NGN formatting to use minor units consistently with the other supported currencies.

## Design and usability review

The page now has a coherent editorial identity: ivory canvas, ink typography, cobalt actions, olive supporting artwork, and a dark sample workspace. Layouts alternate between centered introductions, side-by-side product storytelling, a feature grid, and document selection.

The substantive release fixes were stronger text contrast, a 9px minimum for miniature artwork labels, larger touch controls, correct heading structure, meaningful region labels, a working skip link, and deterministic menu focus behavior in WebKit. The sculpture caption has a solid backing so its contrast does not depend on the photograph.

The mobile layout exposes dashboard view controls and moves selected workflow previews into view. Calls to action have distinct destinations, template/workflow controls support arrow and endpoint keys, and reduced motion leaves the content readable. Essential copy remains rendered when JavaScript is disabled.

The page avoids fabricated testimonials, customer logos, revenue claims, or unsupported product promises. The sample nature of the project is clear without a lengthy warning section interrupting the story.

This is a professional design assessment, not evidence of audience preference. Before promoting it widely, ask several target viewers to identify the product, explain its benefit, and find the workflow and document styles without assistance. Use their feedback to refine the copy rather than adding decoration speculatively.

## Verification evidence

### Motion refinement — October 30, 2026

Desktop wheel scrolling now uses Lenis on the existing GSAP ticker: a 0.58 wheel multiplier, 0.065 interpolation, and a 220px cap per input event after multiplication. Internal links glide for 1.65 seconds while preserving URL hashes and keyboard destination focus. Keyboard input cancels pending wheel inertia. Touch input stays native; reduced motion disables smoothing and animation. Opening the menu pauses the scroller, and closing it resumes scrolling.

The opening sequence now staggers the logo, logo bars, navigation links, and header actions. Hero text and workspace entrances take longer, feature cards reveal in sequence, and workflow scenes have more desktop scroll space. Workflow and document preview changes also animate. All effects retain reduced-motion fallbacks and clean up their listeners and animation frames.

Validation: TypeScript, ESLint, 39 unit tests, and the production build pass. Targeted motion checks in Chromium, WebKit, and mobile Chrome passed (11 passed; 4 desktop-only checks skipped on touch). Additional menu-link and keyboard destination-focus checks passed in Chromium and WebKit. The desktop and mobile landing/release suites also passed (32 passed; 2 platform-inapplicable skips). Captured browser frames confirm that the navbar moves from its entrance position to its settled state. The performance observation below was repeated after the motion refinement.

| Area                        | Result                                                                                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ESLint                      | Passed, no errors or warnings                                                                                                                                                |
| TypeScript                  | Passed                                                                                                                                                                       |
| Unit tests                  | 39 passed across 4 suites; the reduced count reflects removal of tests for retired components/forms                                                                          |
| Production build            | Passed; landing page, 404, robots, and sitemap generated                                                                                                                     |
| Browser coverage            | Chromium, Firefox, WebKit, Pixel/Chrome emulation, and iPhone/WebKit emulation                                                                                               |
| Full browser matrix         | 82 passed, 4 platform-inapplicable skips, and 4 WebKit focus failures discovered                                                                                             |
| Focus fixes                 | All 10 targeted menu/skip-link checks passed across the 5 profiles after the fixes; the 4 earlier failures are resolved                                                      |
| Automated accessibility     | No violations in 37 tested states across the 5 profiles, using WCAG A/AA and best-practice rules                                                                             |
| Release routes              | Icons, social image, manifest, robots, sitemap, and custom 404 checked                                                                                                       |
| Release behavior            | Security headers, local anchor destinations, JavaScript-disabled readability, mobile menu, templates, workflow, dashboard tabs, motion persistence, and viewport fit checked |
| Production dependency audit | No known vulnerabilities reported                                                                                                                                            |

Accessibility results retain `incomplete` contrast checks, principally where backgrounds/overlaps require human interpretation. These are recorded in `artifacts/accessibility-*.json`. Automated results are not a claim of full WCAG conformance; a screen-reader session and real-device testing are still valuable.

## Mobile performance observation

Measured against a local production server with a cold/disabled cache, a 390 × 844 viewport, 150ms simulated latency, 1.6 Mbps download, and 4× CPU slowdown:

- Largest Contentful Paint: **1,428ms**.
- Cumulative Layout Shift: **0.00072**.
- Encoded first-view resource transfer: **247 KB** across 12 resources.

The repeatable measurement script is `scripts/measure-performance.mjs`; pass the running production URL as its argument. These are lab observations from this machine, not field Core Web Vitals. Lighthouse installation failed with an npm network reset, so no Lighthouse score is claimed.

## Netlify preparation

`netlify.toml` supplies the build command, `.next` publish directory, and Node version. Experimental cache/prefetch flags were removed because this page does not need them. Netlify supplies its maintained Next.js runtime automatically.

`site-origin.ts` resolves an explicit custom domain or Netlify's production/preview URL. Canonical metadata and sitemap use that origin. Preview contexts are marked noindex. No placeholder public domain is saved in source.

Added `X-Content-Type-Options`, frame protection, referrer policy, and a restrictive permissions policy for unused camera/microphone/location features. No external analytics, payment service, or font host is required.

Deploy through a Git-connected Netlify build or Netlify CLI with a build. Do not drag the `.next` directory into Netlify Drop as if this were a plain static export.

## Remaining checks after deployment

1. Confirm the real HTTPS homepage, custom domain/canonical URL, and sharing card.
2. Confirm image optimization, `/robots.txt`, `/sitemap.xml`, security headers, and custom 404 on Netlify.
3. Exercise the page on at least one actual iPhone and Android device, including reduced-motion settings and keyboard/screen-reader use where available.
4. Collect target-viewer feedback. Audience appeal cannot be established by a code or automated design review alone.

The audit also retains **7 low-severity development-only findings** through Jest/ts-jest's `deepmerge` dependency. They are not in the production dependency tree. npm suggested a breaking test-stack downgrade; it was not forced. Review them during a planned tooling upgrade. The full local report is `artifacts/dependency-audit.json`.

## Sources used for release decisions

- [Next.js production checklist](https://nextjs.org/docs/pages/guides/production-checklist)
- [Netlify Next.js runtime and deployment guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Deque color contrast guidance](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=webdriverjs)
- [Playwright accessibility testing scope](https://playwright.dev/java/docs/accessibility-testing)
