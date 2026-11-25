# Mobile Tyre Champions – Testing & Verification Report

**Date**: 25 November 2026  
**Auditor**: Antigravity Assistant  
**Environment**: Windows 11, Node.js v20+, Next.js v16.2.6  

---

## 1. Automated Test Suite Execution

All automated tests in the `tests/` directory were executed using the Node.js native test runner:
`node --test "tests/*.test.mjs"`

### Results Summary
- **Total Tests Run**: 42
- **Passed**: 42
- **Failed**: 0
- **Skipped / Todo**: 0
- **Duration**: ~301 ms

### Test Coverage Breakdown

#### Suite 1: Booking & Availability Rules (`tests/booking-flow.test.mjs`)
1. Postcode normalization and validation (GU11 3HY, partial postcodes, whitespace normalisation).
2. Geocoding service limits and invalid postcode rejection.
3. Coverage radius verification (Aldershot Hub, Guildford GU1, Southampton inside; Manchester outside).
4. Availability endpoint responses (200 for covered, 400 for bad format, 503 for lookup outage).
5. Booking form validation (scheduled vs emergency payload requirements, phone/email formats).
6. Idempotency and duplicate prevention (same customer/slot keys do not create duplicate bookings).
7. Rate limiting protection under high-frequency submissions.

#### Suite 2: Guildford Coverage Rules (`tests/guildford-coverage.test.mjs`)
1. **Confirmed Locations Validation**: Confirms only Guildford (`GU1`), Ash (`GU12`), and Tongham (`GU10`) are marked as active customer coverage.
2. **Exclusion Validation**: Confirms **Ash Vale** is excluded from operational customer coverage and marked under verification.
3. **Dispatch Hub Role**: Confirms **Aldershot** is designated strictly as the external Operational Hub / Depot in Hampshire, not customer coverage.
4. **Sector Completeness**: Validates all 5 geographic sectors (Central, Western, Northern, Southern, Eastern).
5. **Distance Sanity**: Ensures operational distance from the central hub to Guildford is within 30–60 min deployment parameters.

---

## 2. Production Build Verification

The production build was executed using:
`npm run build` (`next build && npx next-sitemap`)

### Build Output
- **Compilation**: Compiled successfully with Next.js Turbopack in 4.9 seconds.
- **Type Checking**: Finished TypeScript verification with 0 errors.
- **Static Page Generation**: Generated static and dynamic pages across all 19 routes (19/19) in 1,150 ms.
- **Sitemap Generation**: Successfully generated `sitemap.xml` and `sitemap-0.xml` via `next-sitemap`.

### Generated Routes Table
| Route Path | Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `/` | Static (○) | **200 OK** | Primary Guildford Borough Landing Page |
| `/_not-found` | Static (○) | **404** | Global 404 handler |
| `/api/appointments` | Dynamic (ƒ) | **Ready** | Booking submission API |
| `/api/availability` | Dynamic (ƒ) | **Ready** | Postcode availability check API |
| `/availability` | Static (○) | **200 OK** | Availability interactive check page |
| `/booking` | Static (○) | **200 OK** | Full mobile tyre fitting booking flow |
| `/cookies` | Static (○) | **200 OK** | Cookie policy disclosure |
| `/emergency-mobile-tyre-fitting-surrey-hampshire` | Static (○) | **200 OK** | Camberley regional SEO target route |
| `/guildford` | Static (○) | **308 Redirect** | Permanent redirect to `/` |
| `/landing` | Static (○) | **200 OK** | Camberley landing page |
| `/landing-page` | Static (○) | **200 OK** | Camberley landing page alias |
| `/mobile-tyre-fitting-guildford` | Static (○) | **308 Redirect** | Permanent redirect to `/` |
| `/privacy` | Static (○) | **200 OK** | Privacy policy |
| `/services/[slug]` | SSG (●) | **200 OK** | 5 prerendered service pages |
| `/terms` | Static (○) | **200 OK** | Terms and conditions |
| `/thank-you` | Static (○) | **200 OK** | Booking confirmation screen |

---

## 3. Live Runtime HTTP Verification

All key HTTP endpoints were queried on the active local development server (`http://localhost:3000`):

| Endpoint | Method | Expected Status | Actual Status | Result |
| :--- | :--- | :--- | :--- | :--- |
| `http://localhost:3000/` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/api/availability?postcode=GU14YT` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/mobile-tyre-fitting-guildford` | GET | 308 Permanent Redirect | **308 (Location: /)** | **PASSED** |
| `http://localhost:3000/guildford` | GET | 308 Permanent Redirect | **308 (Location: /)** | **PASSED** |
| `http://localhost:3000/landing` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/booking` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/services/flat-tyre-replacement` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/cookies` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/privacy` | GET | 200 OK | **200 OK** | **PASSED** |
| `http://localhost:3000/terms` | GET | 200 OK | **200 OK** | **PASSED** |

---

## 4. UI & Interactive Functionality Verification

- **Guildford Homepage Loading**: Root URL `/` serves the full 11-section Guildford page with correct branding and hero video (`/mtc-hero-video.mp4`).
- **Postcode Availability Checker**: Verified with `GU1 4YT` (returns 200 with geocoded coordinates, distance from Aldershot hub, and confirmed operational status).
- **Interactive Coverage Map**: Centred on Guildford (`51.2362, -0.5704`). Confirmed markers display only for Guildford, Ash, and Tongham. Aldershot marked as Operational Hub.
- **Coverage Directory Table**: Confirmed locations table directly synchronised with `src/data/guildfordCoverage.js`.
- **Quote Form**: Form validation, attribution to Guildford, and error messaging operational.
- **CTAs & Links**: Telephone links (`tel:02071013856`), WhatsApp links (`https://wa.me/447...`), emergency anchor jumps verified.
- **FAQ Accordions**: 10 Guildford-specific accordions toggle properly without React state warnings.
- **Cookie Consent**: Banner and preferences modal render without hydration mismatch.
- **Mobile Sticky Bar**: Docked emergency CTA bar displays cleanly on narrow viewports.

---

## 5. Unverified External Integrations

In accordance with strict verification reporting guidelines:
1. **Live Production Strapi CMS**: Booking submissions against the live production Strapi instance (`STRAPI_API_TOKEN`) were mocked in the automated test suite (`tests/booking-flow.test.mjs`). Real database insertion requires live network access to the remote Strapi server.
2. **Live Google Cloud Maps API**: Production map loading in `src/lib/googleMapsLoader.js` requires a live Google Cloud API key with domain referrer authorization matching localhost / production domains.
3. **Live SMS/Email Notification Dispatch**: Third-party webhook notifications trigger on live Strapi hooks and were verified via unit payload structure, not live SMTP/Twilio dispatch.
