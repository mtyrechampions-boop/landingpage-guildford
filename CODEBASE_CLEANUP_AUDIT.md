# Mobile Tyre Champions – Codebase Cleanup Audit Report

**Date**: 25 November 2026  
**Auditor**: Antigravity Assistant  
**Repository**: `mtyrechampions-boop/landingpage-guildford`  
**Current Root Homepage**: Guildford Borough Mobile Tyre Fitting (`/`)

---

## Executive Summary

Following the migration of the Mobile Tyre Champions root homepage (`/`) to the Guildford Landing Page, an exhaustive audit of the repository was conducted. The project was originally prototyped using **Vite + React Router DOM** and subsequently transitioned to **Next.js App Router (v16.2.6)**.

The audit identified:
- **Dead Framework Artifacts**: Leftover Vite entry files (`index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`) and Vite dependencies.
- **Obsolete View Components**: 14 unrouted SPA views in `src/views/` that were superseded by Next.js dynamic routing (`src/app/services/[slug]/page.js`, `src/app/booking/page.js`).
- **Orphaned Assets**: 27 unreferenced images in `src/assets/` (2.3 MB) that were replaced by `/public/images/`.
- **Duplicate Media**: A 52.1 MB exact duplicate video (`public/mtc video {landscape }.mp4`) of `public/mtc-hero-video.mp4`.
- **Unused Dependencies**: 7 packages in `package.json` (`react-router-dom`, `@react-google-maps/api`, `react-leaflet`, `@tailwindcss/vite`, `@vitejs/plugin-react`, `vite`, `eslint-plugin-react-refresh`).

All core Guildford homepage sections, Camberley landing routes, booking and availability systems, legal policies, and automated tests remain intact and operational.

---

## Complete Audit Categorisation

### Category A – Safe to Delete (Verified Completely Unused)

These files have zero runtime, build-time, or framework references.

| File Path | Type | Original Purpose | Findings & Justification | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| `index.html` | HTML | Vite HTML entry point | Next.js uses `src/app/layout.js` to render the DOM document. Not loaded by Next.js. | None |
| `vite.config.js` | Config | Vite bundler config | Project build pipeline is powered entirely by Next.js (`next build`). | None |
| `src/main.jsx` | JS | Vite React mount point | Renders `<App />` into `#root`. Dead file in Next.js App Router. | None |
| `src/App.jsx` | JSX | React Router SPA root | Imports non-existent `./pages/*`. Dead file superseded by `src/app/layout.js` & `page.js`. | None |
| `src/App.css` | CSS | Vite root styling | Only imported by dead `src/App.jsx`. | None |
| `src/index.css` | CSS | Vite global styles | Only imported by dead `src/main.jsx`. Active styles are in `src/app/globals.css`. | None |
| `LOCATION_BOOKING_EXAMPLES.jsx` | JSX | Example code | Documentation snippet using `import.meta.env.VITE_*`. Never imported. | None |
| `src/api/appointmentService.examples.jsx` | JSX | Example code | Example component code and test mocks. Never imported. | None |
| `src/assets/` (27 files) | Assets | Old Vite asset bundle | 27 static images and SVGs (`react.svg`, `vite.svg`, `IMAGES MOBILE TYRE CREW_/*`). 0 imports in codebase; all active images live in `/public/images/`. (Saves 2.3 MB). | None |
| `scratch/download_all_partners.js` | Script | Scratch utility | One-off SVG downloader. | None |
| `scratch/download_logos.js` | Script | Scratch utility | One-off logo downloader. | None |
| `scratch/download_remaining.js` | Script | Scratch utility | One-off asset downloader. | None |
| `scratch/fix_all_white_svgs.js` | Script | Scratch utility | One-off SVG color fixer. | None |
| `scratch/fix_svg_dimensions.js` | Script | Scratch utility | One-off SVG dimension normaliser. | None |
| `scratch/fix_svg_fills.js` | Script | Scratch utility | One-off SVG fill fixer. | None |
| `scratch/validate_svgs.js` | Script | Scratch utility | One-off SVG validation tool. | None |
| `scratch/audit_dependency_graph.js` | Script | Audit helper | Temporary script created for this audit. | None |
| `task.md` | Doc | Scratch notes | Local working notes. | None |

---

### Category B – Duplicate Files (Consolidation Required)

| File Path | Type | Purpose | Findings & Consolidation Plan | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| `public/mtc video {landscape }.mp4` | Video (52.1 MB) | Hero background video | Exact byte-for-byte duplicate of `public/mtc-hero-video.mp4` (52,160,529 bytes). Contains illegal/problematic URI characters (`{landscape }`). Code strictly references `/mtc-hero-video.mp4`. Remove this duplicate copy to save 52.1 MB. | None |

---

### Category C – Legacy Files (Superseded Implementations)

These files are remnants from the pre-Next.js implementation. They are not referenced by any active route or test.

| File Path | Type | Original Purpose | Replacement / Reason Superseded | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| `src/views/AboutPage.jsx` | View | About page component | No `/about` route exists in Next.js App Router. Unreferenced. | Very Low |
| `src/views/BookingPage.jsx` | View | Old booking page | Broken (imports nonexistent `../components/LeafletMap`). Completely superseded by `src/components/booking/BookingView.jsx` rendered at `/booking`. | Very Low |
| `src/views/ContactPage.jsx` | View | Contact page component | No `/contact` route in Next.js App Router; contact is handled in-page via phone/WhatsApp and quote modals. | Very Low |
| `src/views/EmergencyTyreFitting.jsx` | View | Service page | Superseded by dynamic App Router route `src/app/services/[slug]/page.js`. | Very Low |
| `src/views/LocationSEOPage.jsx` | View | Location SEO template | Superseded by Guildford homepage (`/`) and Camberley landing page (`/landing`). | Very Low |
| `src/views/LocationsPage.jsx` | View | Regional locations view | Superseded by interactive corridor map and coverage directories. | Very Low |
| `src/views/LockingWheelNutRemoval.jsx` | View | Service page | Superseded by dynamic App Router route `src/app/services/[slug]/page.js`. | Very Low |
| `src/views/MobileTyreFitting.jsx` | View | Service page | Superseded by dynamic App Router route `src/app/services/[slug]/page.js`. | Very Low |
| `src/views/NotFoundPage.jsx` | View | 404 view | Superseded by Next.js App Router standard 404 handling. | Very Low |
| `src/views/PunctureRepair.jsx` | View | Service page | Superseded by dynamic App Router route `src/app/services/[slug]/page.js`. | Very Low |
| `src/views/ServiceDetail.jsx` | View | Service detail view | Superseded by `src/components/services/ServicePageView.jsx`. | Very Low |
| `src/views/ServicesPage.jsx` | View | Services directory | Superseded by dynamic service routes. | Very Low |
| `src/views/TrailerTyreFitting.jsx` | View | Service page | Superseded by dynamic App Router route `src/app/services/[slug]/page.js`. | Very Low |
| `src/views/TyreFinderPage.jsx` | View | Tyre lookup view | Superseded by interactive postcode availability and booking flow. | Very Low |
| `src/data/locationSeoData.js` | Data | SEO copy dictionary | Only imported by `src/views/LocationSEOPage.jsx`. Not used by active pages. | Very Low |
| `src/data/servicesData.js` | Data | Service definitions | Only imported by `src/views/ServiceDetail.jsx`. Active services use `src/data/servicePages.js`. | Very Low |

---

### Category D – Required Files (Must Remain Intact)

These files support active production features and must not be touched or deleted:

1. **Active Routes**:
   - `src/app/page.js` (Canonical Guildford Homepage)
   - `src/app/layout.js`, `src/app/globals.css`
   - `src/app/api/appointments/route.js`, `src/app/api/availability/route.js`
   - `src/app/availability/page.js`
   - `src/app/booking/page.js`
   - `src/app/cookies/page.js`, `src/app/privacy/page.js`, `src/app/terms/page.js`
   - `src/app/emergency-mobile-tyre-fitting-surrey-hampshire/page.js`, `src/app/landing/page.js`, `src/app/landing-page/page.js`
   - `src/app/guildford/page.js`, `src/app/mobile-tyre-fitting-guildford/page.js` (308 Redirects)
   - `src/app/services/[slug]/page.js`
   - `src/app/thank-you/page.js`
2. **Active Policy Views**:
   - `src/views/CookiePolicyPage.jsx` (Imported by `src/app/cookies/page.js`)
   - `src/views/PrivacyPolicyPage.jsx` (Imported by `src/app/privacy/page.js`)
   - `src/views/TermsAndConditionsPage.jsx` (Imported by `src/app/terms/page.js`)
3. **Guildford Components** (`src/components/landing/guildford/*`):
   - `GuildfordHero.jsx`, `GuildfordPostcodeChecker.jsx`, `GuildfordWhyGarage.jsx`, `GuildfordHowItWorks.jsx`, `GuildfordCoverage.jsx`, `GuildfordCorridorsMap.jsx`, `GuildfordCorridors.jsx`, `GuildfordReviews.jsx`, `GuildfordQuoteForm.jsx`, `GuildfordFAQ.jsx`, `GuildfordFinalCTA.jsx`, `GuildfordFooter.jsx`
4. **Shared & Camberley Components** (`src/components/landing/*`):
   - `LandingHeader.jsx`, `LandingTrustBar.jsx`, `LandingHero.jsx`, `LandingPostcodeChecker.jsx`, `LandingWhyGarage.jsx`, `LandingHowItWorks.jsx`, `LandingCoverage.jsx`, `LandingCorridorsMap.jsx`, `LandingCorridors.jsx`, `LandingReviews.jsx`, `LandingQuoteForm.jsx`, `LandingFAQ.jsx`, `LandingFinalCTA.jsx`, `LandingFooter.jsx`, `LandingMobileStickyBar.jsx`, `LandingWhatsAppFloat.jsx`, `PostcodeAvailabilityForm.jsx`
5. **Booking, Shell & Services Components**:
   - `src/components/availability/AvailabilityView.jsx`
   - `src/components/booking/BookingView.jsx`, `src/components/booking/PostcodeMap.jsx`
   - `src/components/CookieConsent.jsx`
   - `src/components/layout/PageShell.jsx`, `src/components/layout/container.js`
   - `src/components/services/ServicePageView.jsx`
   - `src/components/thank-you/ThankYouView.jsx`
6. **Active Data & Logic Libraries**:
   - `src/data/guildfordCoverage.js`, `src/data/guildfordFaqs.js`, `src/data/landingNav.js`, `src/data/locations.js`, `src/data/mtcNavigation.js`, `src/data/servicePages.js`
   - `src/lib/appointmentHandler.js`, `src/lib/booking.js`, `src/lib/coverage.js`, `src/lib/googleMapsLoader.js`, `src/lib/postcode.js`, `src/lib/postcodeLookup.js`, `src/lib/siteText.js`
   - `src/api/appointmentService.js`
7. **Automated Tests**:
   - `tests/booking-flow.test.mjs`, `tests/guildford-coverage.test.mjs`
8. **Configuration**:
   - `next.config.mjs`, `next-sitemap.config.js`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `tailwind.config.js`, `eslint.config.js`, `jsconfig.json`, `vercel.json`, `.gitignore`, `.env`, `.env.example`, `README.md`

---

### Category E – Uncertain Files (Preserved / Do Not Delete)

In accordance with strict safety instructions, these files are preserved and not deleted:

| File Path | Type | Description | Preservation Reason |
| :--- | :--- | :--- | :--- |
| `src/services/googleReviews.ts` | TS | Google Business Reviews fetcher from Strapi | May be referenced by backend cron jobs or external synchronization scripts. |
| `compress_images.py` | Python | Image compression utility | Useful operational tool for optimizing new incoming marketing assets. |
| `generate_qr.js` | JS | QR code generator | Generates the official site QR code (`public/images/mtc-website-qr.svg`). |
| `public/blogs-images/` (32 files) | Assets | Blog illustrations | May be indexed on Google Image Search or referenced by external articles. |
| `public/recent-fittings/` (17 files) | Assets | Completed customer tyre job photos | Real customer work photographic portfolio; preserved for marketing reuse. |
| `public/llms.txt` | TXT | LLM manifest | Crawl guidance for AI agents. |
| `public/google372638a4bf1bd72f.html` | HTML | Google Search Console verification | Required for domain ownership verification. |
| `public/.htaccess`, `public/_redirects` | Config | Server routing rules | Apache / CDN redirection rules. |

---

## Dependency Classification (`package.json`)

| Dependency | Classification | Status & Usage |
| :--- | :--- | :--- |
| `next` | **Required** | Next.js App Router core framework |
| `react`, `react-dom` | **Required** | React 19 core library |
| `lucide-react` | **Required** | SVG Icon library used across all UI components |
| `leaflet` | **Required** | Map rendering engine in `PostcodeMap.jsx` |
| `next-sitemap` | **Required** | Production XML sitemap and robots.txt generator |
| `@tailwindcss/postcss` | **Required** | Tailwind CSS v4 PostCSS plugin |
| `postcss` | **Required** | PostCSS engine |
| `tailwindcss` | **Required** | Tailwind styling |
| `autoprefixer` | **Required** | CSS vendor prefixer |
| `sharp` | **Required** | Next.js high-performance image optimization |
| `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `globals` | **Required** | Code quality & static analysis |
| `qrcode` | **Development-only** | Used by `generate_qr.js` to create site QR code |
| `react-router-dom` | **Safe to Remove** | Only imported in dead `src/App.jsx`. Zero usage in Next.js. |
| `@react-google-maps/api` | **Safe to Remove** | Not imported anywhere; map loads via `src/lib/googleMapsLoader.js`. |
| `react-leaflet` | **Safe to Remove** | Not imported anywhere; maps use vanilla `leaflet` directly. |
| `@tailwindcss/vite` | **Safe to Remove** | Vite-only plugin, only used in dead `vite.config.js`. |
| `@vitejs/plugin-react` | **Safe to Remove** | Vite-only plugin, only used in dead `vite.config.js`. |
| `vite` | **Safe to Remove** | Vite CLI, not used in any `package.json` scripts. |
| `eslint-plugin-react-refresh` | **Safe to Remove** | Vite React HMR linter plugin, obsolete in Next.js. |
