# Billora Landing Page — Redesign Plan

**Based on**: Evidence-based audit (see `BILLORA_LANDING_PAGE_AUDIT.md`)  
**Goal**: Replace guesswork with a precise, buildable plan for a premium, dark, animated SaaS landing page

---

## 1. Design Concept: "Precise billing. Fluid presentation."

A carefully art-directed software product experience: deep graphite surfaces, moving indigo/violet light, controlled depth, crisp application frames, readable financial information, and fluid choreography.

**Mood**: Professional, calm, precise, modern, approachable, trustworthy — like useful business software, not a bank, crypto product, or AI assistant.

**Avoid**: Stock office photography, decorative robots, glowing spheres, particle systems, identical icon cards, abrupt light/dark alternation.

---

## 2. Revised Page Structure

| Order | Section | Anchor | Purpose | Background |
|-------|---------|--------|---------|------------|
| 1 | Navigation | — | Billora wordmark; Product, Workflow, Features, Showcase, FAQ; primary CTA; motion toggle | `bg-midnight/95` backdrop-blur |
| 2 | Hero | `#hero` | "Great work deserves better billing." Supporting copy. Large workspace artwork. Ambient gradients. | `bg-canvas` (default) |
| 3 | Audience Strip | `#audience` | One concise statement for freelancers, consultants, agencies, small service businesses | `bg-canvas` |
| 4 | Product Workflow | `#workflow` | Quote → Invoice → Payment → Overview visual story. Normal flow + sticky stage (desktop). | `bg-canvas` |
| 5 | Feature Showcase | `#features` | 5 meaningful product scenes: Client records, Payment visibility, Document design, Calculations, Overview | `bg-canvas` |
| 6 | Document Showcase | `#showcase` | Read-only template tabs (Minimal/Modern/Professional). No editor. | `bg-canvas` |
| 7 | FAQ + Product Note | `#faq` | Practical answers; explain separate browser-local app accurately | `bg-canvas` |
| 8 | Final CTA | `#cta` | "Your work is professional. Your billing should be too." Document stack motif. | `bg-canvas` + gradient |
| 9 | Footer | — | Links, motion toggle, sample data notice | `bg-dark-surface` |

**Removed**: Invoice Playground (mini-app), Demo notice as separate heavy section (merged into FAQ/Product Note), artificial pin-based scroll tracks.

---

## 3. Color System (Tailwind CSS v4 `@theme`)

```css
@theme {
  /* Canvas & Surfaces */
  --color-canvas: #070A12;           /* Default page background */
  --color-canvas-elevated: #0D1220;  /* Subtle section separation */
  --color-panel: #121A2B;            /* Cards, feature surfaces */
  --color-panel-raised: #182237;     /* Selected layers, depth */
  --color-document: #FFFFFF;         /* Invoice/quote paper */

  /* Brand */
  --color-indigo: #4F46E5;           /* Primary actions, brand identity */
  --color-indigo-highlight: #818CF8; /* Dark-surface accents */
  --color-violet: #7C3AED;           /* Restrained ambient gradients */
  --color-cyan: #38BDF8;             /* Small secondary details only */

  /* Dark-theme Text */
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #A8B3C7;

  /* Light App Context (for product artwork interiors) */
  --color-app-bg: #F6F7F9;
  --color-app-text: #171717;
  --color-app-text-muted: #6B7280;
  --color-app-border: #E5E7EB;

  /* Semantic Status (always with text labels) */
  --color-success-text: #15803D;
  --color-success-bg: #DCFCE7;
  --color-warning-text: #92400E;
  --color-warning-bg: #FEF3C7;
  --color-error-text: #B91C1C;
  --color-error-bg: #FEE2E2;
}
```

**Contrast Verification Required**: Test all foreground/background pairings at implementation time. Do not assume palette guarantees compliance.

---

## 4. Typography

| Element | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Hero Headline | `clamp(48px, 8vw, 88px)` / 72-88px | 40-52px | 2 lines max; no forced clipping |
| Section Headline | 40-56px | 30-38px | |
| Body Copy | 17-18px | 16px | Comfortable line height (1.6-1.7) |
| UI Labels (in artwork) | 13-14px | 13-14px | Never smaller; readable at render size |
| Financial Figures | Tabular, 16-24px | Tabular, 14-18px | `font-variant-numeric: tabular-nums` |
| Document IDs / Technical | Monospace, 12-13px | Monospace, 12-13px | Restrained mono face |

**Font Stack**: Geist (via `next/font/google`) → Inter → system-ui fallback. Monospace: Geist Mono → JetBrains Mono → monospace.

---

## 5. Spacing & Layout

- **Content Width**: ~1200-1280px max
- **Side Padding**: 24px mobile, 32px tablet, 48px desktop
- **Section Spacing**: Desktop 88-128px, Mobile 56-80px (not mandatory empty height)
- **Spacing Scale**: 4/8px base rhythm
- **Border Radius**: 8-12px cards, 16-24px major panels sparingly
- **Depth**: Thin borders (1px, 10-15% opacity), subtle shadows, no heavy glassmorphism

---

## 6. Asset Specifications

### 6.1 Hero Workspace (`HeroProductStage`)

| Property | Value |
|----------|-------|
| **Purpose** | Central hero artwork — readable invoice crop + compact balance panel + smaller quote/payment layer |
| **Component** | `HeroProductStage` (refactored) |
| **Aspect Ratio** | ~4:3 |
| **Desktop** | Large, central, layered with purposeful overlap |
| **Mobile** | Single focal crop, stacked vertically |
| **Motion** | Entrance stagger (0.9-1.3s); 3-layer parallax (bg 20px, main 35px, fg 60px); pointer tilt ±1.5° (fine pointer only) |
| **Accessible Description** | "Billora product interface showing an invoice with line items, a quote card marked Accepted, a manual payment record, and a remaining balance panel — all using the same sample project data" |

**Visual Composition**:
- Main invoice (white paper, indigo header) — centered, largest
- Quote card (dark panel, top-right) — smaller, shows QT-0018, Accepted
- Payment card (dark panel, bottom-left) — shows $2,000 recorded, Bank transfer, 25 Sep 2026
- Balance card (dark panel, bottom-right) — shows $4,123.60 outstanding, Partial badge
- Consistent gutters, aligned numbers, restrained chrome

### 6.2 Quote→Invoice Transition (`ProductWorkflow` Step 2)

| Property | Value |
|----------|-------|
| **Purpose** | Visual explanation of conversion — quote reconfigures into invoice while client details and 3 line items remain visually connected |
| **Component** | `ProductWorkflow` step 2 visual |
| **Aspect Ratio** | ~16:9 |
| **Desktop** | Side-by-side morph with connector |
| **Mobile** | Stacked, tap/keyboard to advance |
| **Motion** | Scroll-linked morph (opacity, scale, y); connector line draws |
| **Reduced Fallback** | Static side-by-side (desktop) / stacked cards (mobile) |

### 6.3 Payment Overview (`ProductWorkflow` Step 3 / `FeatureGrid`)

| Property | Value |
|----------|-------|
| **Purpose** | One coherent invoice total, recorded payment, remaining balance, Partial badge |
| **Component** | Designed balance visualization (not animated counters) |
| **Aspect Ratio** | ~1:1 |
| **Motion** | Scroll-triggered number reveal (reduced: static) |
| **Visual** | Total $6,123.60 → Recorded $2,000.00 → Balance $4,123.60 with Partial badge |

### 6.4 Client Directory (`FeatureGrid` — Clients)

| Property | Value |
|----------|-------|
| **Purpose** | Cropped directory with 2-3 fictional businesses |
| **Component** | `FeatureGrid` → Client scene |
| **Aspect Ratio** | ~3:1 |
| **Visual** | Restrained avatar marks, aligned billing info, document counts |
| **No** | Real customer logos, avatar piles |

### 6.5 Document Templates (`DocumentShowcase`)

| Property | Value |
|----------|-------|
| **Purpose** | 2-3 clearly distinct template previews |
| **Component** | `DocumentShowcase` (new) |
| **Aspect Ratio** | ~3:4 each |
| **Desktop** | 3 tabs horizontal, keyboard accessible |
| **Mobile** | 3 tabs vertical |
| **Motion** | Tab switch transition (150ms ease-out) — no auto-carousel |
| **Templates** | Minimal (monochrome, whitespace), Modern (indigo accent, strong header), Professional (structured header, ruled table) |
| **No** | Editing, PDF export, form inputs |

---

## 7. Consistent Sample Story

**Single fixture used across all visuals**:

```
Issuer: Billora Studio (billing@billorastudio.example)
Client: Atlas Creative — Sarah Miller (accounts@atlascreative.example)
Project: Website redesign

Quote: QT-0018 (issued 2026-09-18, expires 2026-10-02)
Invoice: INV-0032 (issued 2026-09-22, Net 14, due 2026-10-06)

Line Items:
  Website design:        1 × $2,500.00 = $2,500.00
  Frontend development: 40 ×    $75.00 = $3,000.00
  CMS integration:        1 ×   $800.00 =   $800.00

Subtotal:                            $6,300.00
Discount (10%):                       -$630.00
Taxable amount:                       $5,670.00
Illustrative tax (8%):                 $453.60
Total:                                $6,123.60

Payment recorded (2026-09-25):        $2,000.00 (Bank transfer, Manual)
Balance remaining:                    $4,123.60
Status: Partial (NOT Paid)
```

**Rules**:
- All visuals derive from this fixture
- No editable calculations
- Never call partially paid invoice "Paid"
- Never imply payment was processed online
- Tax is illustrative, not jurisdiction-specific advice

---

## 8. Motion Map

| Scene | Target | Trigger | Properties | Range | Duration/Easing | Owner | Breakpoint | Reduced Fallback |
|-------|--------|---------|------------|-------|-----------------|-------|------------|------------------|
| **Ambient Gradients** | 2-3 gradient layers | Time (loop) | `translate`, `rotate`, `scale` | ±15%, ±5° | 20-30s linear loop | `Hero` | All | Static gradients |
| **Hero Entrance** | Headline lines, body, CTA, workspace, fg layer | Mount | `y`, `opacity` | 100%→0, 0→1 | 0.9-1.3s stagger, power3.out | `Hero` | All | Instant |
| **Hero Parallax** | `.parallax-bg`, `.parallax-main`, `.parallax-fg`, `.perspective-stage` | Scroll (hero viewport) | `y`, `rotateX/Y` | bg: 20px, main: 35px, fg: 60px, rot: ±4° | Scrub 1:1 | `Hero` | Desktop only | Static |
| **Pointer Tilt** | Workspace wrapper | Mousemove (fine pointer) | `rotateX`, `rotateY` | ±1.5° | 0.3s ease-out | `Hero` | Desktop, fine pointer | Disabled |
| **Workflow Transitions** | Quote, Invoice, Payment, Overview cards | Scroll (workflow section) | `opacity`, `scale`, `y`, connector | 0-1 per step | 0.5s per transition | `ProductWorkflow` | Desktop only | Stacked static cards |
| **Feature Entrance** | Each feature card | Scroll (viewport entry) | `y`, `opacity` | 30px→0, 0→1 | 0.5s stagger | `FeatureGrid` | All | Instant |
| **Template Tab Switch** | Preview panels | Click/keyboard | `opacity`, `x` | 0→1, 20px→0 | 150ms ease-out | `DocumentShowcase` | All | Instant |
| **Closing CTA Reveal** | Document stack + gradient | Scroll (viewport entry) | `y`, `opacity` | 40px→0, 0→1 | 0.8s | `FinalCTA` | All | Static |

### Lifecycle Rules
- All GSAP work wrapped in `gsap.context()` with proper cleanup
- `gsap.matchMedia()` for desktop-only and reduced-motion variants
- No per-frame React state updates for pointer/parallax
- Ambient animations pause on `visibilitychange` hidden
- **Animation failure must not leave content at `opacity: 0` or retain meaningless scroll space**

---

## 9. Accessibility & Responsive Behavior

### Reduced Motion
- Respect OS `prefers-reduced-motion` from first render
- Persistent site-level "Reduce motion" toggle (stored in `localStorage`)
- Effective reduced motion = OS preference OR site toggle
- Removes: parallax, tilt, large scene movement, count-up effects, smooth scroll
- Preserves: all content, interactive controls, information hierarchy

### Keyboard & Focus
- All menus, tabs, links, accordions work by keyboard
- Visible focus rings (2px indigo, 2px offset)
- Skip-to-content link in layout
- Decorative artwork: `aria-hidden`, provide accessible summary
- No fake tab stops on illustrative UI controls

### Mobile
- Simplify product compositions — one focal scene
- Remove overlapping floating panels that obscure content
- No horizontal scrolling
- Stacked workflow cards, vertical template tabs
- Test: 390×844, 360×800, short landscape (e.g., 844×390)

### Breakpoints
| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | < 640px | Stacked hero; vertical tabs; single workflow column; stacked features |
| Tablet | 640-1023px | Side-by-side hero; 2-col features; sticky stage if space |
| Desktop | ≥ 1024px | Full 3-layer parallax; sticky workflow stage; 3-col features; pointer tilt |
| Large Desktop | ≥ 1440px | Max content width 1280px; expanded hero artwork |

---

## 10. Routing, CTA & Scope Boundaries

### External App URL Configuration
```bash
# Next.js
NEXT_PUBLIC_BILLORA_APP_URL=https://app.billora.example

# Vite (if applicable)
VITE_BILLORA_APP_URL=https://app.billora.example
```

### CTA Behavior

| App URL Configured | Header/Hero Primary CTA | Hero Secondary | Workflow/Showcase CTA |
|--------------------|------------------------|----------------|----------------------|
| **Valid URL** | "Open Billora" → external URL | "See the workflow" → `#workflow` | "Open the full app" → external URL |
| **Missing/Invalid** | "Explore the product" → `#workflow` | "See the workflow" → `#workflow` | "Back to the workflow" → `#workflow` |

### Scope Boundaries (Must Appear in Copy)
- "Record a payment" ≠ "Process a payment"
- "Mark accepted" ≠ "Client signed electronically"
- "Download PDF" ≠ "Billora emailed the client"
- "Browser-local" ≠ "Encrypted backup / cloud sync / guaranteed offline"
- "Paid" = recorded invoice balance, not verified receipt of funds
- External app link = navigation only, not integration
- **No**: Fake Login/Signup, payment links, newsletter, `/dashboard` links, invented testimonials

---

## 11. Implementation Phases

### Phase 1: Structural Repair (Week 1)
| Task | File | Details |
|------|------|---------|
| 1.1 Fix Hero parallax targets | `Hero.tsx` | Add `.parallax-main` wrapper or retune to refs; eliminate string selector warning |
| 1.2 Remove BillingWorkflow pin | `BillingWorkflow.tsx` | Delete `pin: true`, `pinSpacing: true`; replace with `gsap.matchMedia()` sticky stage |
| 1.3 Verify GSAP cleanup | `Hero.tsx`, `HeroProductStage.tsx`, new `ProductWorkflow.tsx` | All `gsap.context` revert on unmount; no stale triggers on resize |

### Phase 2: Demo Retirement (Week 1-2)
| Task | File | Details |
|------|------|---------|
| 2.1 Delete InvoicePlayground | `InvoicePlayground.tsx` | Remove component, `#demo` anchor, all imports |
| 2.2 Remove unused deps | `package.json` | `@hookform/resolvers`, `zod`, `react-hook-form`, `@react-pdf/renderer` |
| 2.3 Create DocumentShowcase | `DocumentShowcase.tsx` (new) | 3 read-only template tabs; keyboard nav; no form/PDF |

### Phase 3: Visual Foundation (Week 2)
| Task | File | Details |
|------|------|---------|
| 3.1 Update globals.css | `globals.css` | New `@theme` tokens; `body { @apply bg-canvas text-text-primary }` |
| 3.2 Unify section backgrounds | All marketing components | Replace `bg-white`, `bg-light-section` with `bg-canvas`/`bg-panel` |
| 3.4 Add ambient gradients | `Hero.tsx` | 2-3 absolute gradient layers with slow CSS/GSAP drift |
| 3.5 Enlarge Hero artwork | `HeroProductStage.tsx` | Increase size; improve visual hierarchy; consistent sample data |

### Phase 4: Product Artwork (Week 2-3)
| Task | File | Details |
|------|------|---------|
| 4.1 Build ProductWorkflow | `ProductWorkflow.tsx` (new) | Normal-flow; 4 visual states; sticky stage desktop only |
| 4.2 Refactor FeatureGrid | `FeatureGrid.tsx` | Dark theme; replace CalculationDemo; consistent sample story |
| 4.3 Build DocumentShowcase | `DocumentShowcase.tsx` | 3 template tabs; keyboard accessible; no PDF gen |
| 4.4 Update copy | All components | Honest CTA labels; updated FAQ; consistent sample story |

### Phase 5: Motion & Polish (Week 3)
| Task | File | Details |
|------|------|---------|
| 5.1 Implement motion map | All animated components | Entrance, parallax, tilt, workflow, feature entrances, tab switches |
| 5.2 Add matchMedia variants | Animated components | Desktop-only, reduced-motion, cleanup on condition change |
| 5.3 Accessibility QA | All | Focus, ARIA, reduced-motion toggle, keyboard nav |
| 5.4 Responsive QA | All | Test at 1440, 1280, 1024, 768, 390, 360px; short landscape |
| 5.5 Performance QA | All | Profile frames; pause ambient on hidden; limit layer sizes |

---

## 12. Risks & Dependencies

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| GSAP `matchMedia` cleanup issues | Medium | High | Test resize/orientation/condition changes thoroughly; use single context per component |
| Ambient gradient performance | Low | Medium | Limit layer size; use `will-change: transform` sparingly; pause on hidden |
| Sample data consistency | Low | High | Single fixture file; all visuals import from it |
| Dependency removal breaks hidden usage | Low | Medium | `grep -r` for each dep before removal |
| Mobile workflow UX | Medium | Medium | Test early with real device; fallback to stacked cards |
| Font loading flicker | Low | Low | `display: swap`; preconnect in layout |

---

## 13. Acceptance Criteria (Post-Rebuild)

| Criterion | Verification Method |
|-----------|---------------------|
| No GSAP target warnings | DevTools console clean on load, scroll, resize |
| No dead scroll regions | Page height ≈ sum of section heights; no pin spacer > 100px |
| Ambient motion visible | Gradient layers drift on load (desktop, motion enabled) |
| Hero parallax works | 3 layers move at different rates on scroll (desktop) |
| Pointer tilt works | Workspace tilts ±1.5° on mousemove (desktop, fine pointer) |
| Workflow transitions visible | Quote→Invoice→Payment→Overview changes on scroll (desktop) |
| Reduced motion = static but complete | All content visible; no animation; no empty space |
| No malformed editable demos | No form inputs in `#showcase`; no PDF generation UI |
| Consistent sample figures | All visuals show $6,123.60 total, $4,123.60 balance |
| No broken links | All anchors resolve; external CTA respects config |
| Mobile: no horizontal overflow | `overflow-x: hidden` on body; no content > viewport |
| Mobile: readable artwork | Invoice preview text ≥ 13px; no shrunk desktop mockup |
| Build passes | `npm run build` → success |
| TypeScript clean | `npm run typecheck` → no errors |
| Lint clean | `npm run lint` → 0 errors (warnings acceptable) |

---

## 14. File-Level Change Summary

### New Files
- `src/components/marketing/ProductWorkflow.tsx` — Replaces BillingWorkflow
- `src/components/marketing/DocumentShowcase.tsx` — Replaces InvoicePlayground
- `src/lib/sample-story.ts` — Single fixture export (optional, for consistency)

### Modified Files
- `src/app/page.tsx` — New section order
- `src/app/globals.css` — New `@theme`, dark canvas default
- `src/components/marketing/Hero.tsx` — Fix parallax, add ambient gradients, `.parallax-main`
- `src/components/marketing/HeroProductStage.tsx` — Enlarge, consistent sample data
- `src/components/marketing/FeatureGrid.tsx` — Dark theme, new visuals
- `src/components/marketing/MarketingHeader.tsx` — Updated CTA routing
- `src/components/marketing/FinalCTA.tsx` — Updated copy, dark theme
- `src/components/marketing/FAQ.tsx` — Dark theme, updated answers
- `src/components/marketing/DemoNotice.tsx` — Updated copy
- `src/components/marketing/AudienceStrip.tsx` — Dark theme tweaks
- `package.json` — Remove 4 deps

### Deleted Files
- `src/components/marketing/InvoicePlayground.tsx`
- `src/components/marketing/BillingWorkflow.tsx` (replaced by ProductWorkflow)

---

## 15. Quick Reference: Component → Motion Map

| Component | Animations Owned |
|-----------|------------------|
| `Hero` | Ambient gradients (loop), entrance stagger, 3-layer parallax, pointer tilt |
| `HeroProductStage` | Card entrance stagger (delayed) |
| `ProductWorkflow` | Step transitions (opacity/scale/y), connector draw, sticky stage position |
| `FeatureGrid` | Card entrance stagger (viewport-triggered) |
| `DocumentShowcase` | Tab panel cross-fade (150ms) |
| `FinalCTA` | Document stack reveal, localized gradient drift |
| `MarketingHeader` | Scroll-aware background opacity (CSS) |

**No other component owns animations**. Decorative hover/focus transitions remain in CSS.