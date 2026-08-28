# Global Fire Airlines

**Taking the Fire to the Nations.**

Global Fire Airlines (GFA) is building a premium membership shuttle for Nigeria’s golden corridor — Lagos to Abuja. This repository powers the **founding-member brand site**: a place to understand the vision, explore membership tiers, and register interest before launch.

> **Important:** GFA is not yet licensed to operate scheduled air service and does **not** sell tickets. Forms on this site capture **interest only** — no payment, no booking, no commitment.

---

## Brand

| Element | Value |
|--------|--------|
| **Name** | Global Fire Airlines |
| **Short** | GFA |
| **Tagline** | Taking the Fire to the Nations |
| **Positioning** | Premium membership travel on the Lagos–Abuja corridor |
| **Stage** | Pre-launch · founding membership open |

### Palette

| Role | Hex | Usage |
|------|-----|--------|
| Navy | `#081c33` | Primary brand, headings, depth |
| Copper | `#b9783a` | Accents, CTAs, highlights |
| Gold | `#d7a45a` | Emphasis, eyebrows, premium cues |
| Ivory | `#f7f3ea` | Backgrounds, light surfaces |

### Typography

- **Manrope** — UI, headings, and body (legible at all sizes)
- **Cormorant Garamond** — selective serif accents where used

### Logo assets

Official lockups live in `public/brand/`:

- `full-lockup.png` — primary wordmark + mark (nav & footer)
- `mark.png` — icon only
- `wordmark.png` — text only

Source guidelines and originals: `Logos and brand guidelines/`

---

## What this site does

The public homepage tells the GFA story in clear sections:

1. **Hero** — founding membership invitation  
2. **Corridor** — the Lagos–Abuja pain and GFA’s answer  
3. **Founding benefits** — why join the list now  
4. **Membership** — tier structure (interest, not purchase)  
5. **Join** — founding / corporate / counsel interest forms  
6. **Experience** — design principles for the product  
7. **Precedent** — premium corridor proof points  
8. **Atmosphere** — visual direction  
9. **Transparency** — honest status on licensing and timelines  

A private advisor briefing is available at `/pitch` (password-protected, excluded from search indexing).

---

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Environment variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `PITCH_PASSWORD` | Yes (for `/pitch`) | Password for the private briefing deck |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Recommended | Apps Script web app URL — syncs leads to Google Sheets |
| `GOOGLE_SHEETS_SECRET` | With webhook | Shared secret; must match `SHEET_SECRET` in the Apps Script |
| `FORM_WEBHOOK_URL` | No | Legacy alias for `GOOGLE_SHEETS_WEBHOOK_URL` |

Leads are stored locally in `data/leads.json` and synced to separate Google Sheet tabs (**Flame**, **Ember Elite**, **Founding General**, **Corporate**, **Counsel**). See [docs/GOOGLE_SHEETS.md](docs/GOOGLE_SHEETS.md) for setup.

---

## Project structure

```
app/                 Next.js routes, layout, global styles
components/          UI: header, footer, home sections, forms
lib/                 Brand copy, pitch data, lead persistence, Sheets sync
scripts/             Google Apps Script for spreadsheet webhook
docs/                Setup guides (Google Sheets, etc.)
public/brand/        Official logo assets
public/media/        Placeholder photography (replace before launch)
data/leads.json      Interest form submissions (local dev)
```

---

## Honest disclosure

This site is a **brand and demand-validation** tool, not an airline booking platform. Copy and forms are written to:

- Avoid implying current operations or ticket sales  
- State clearly that GFA does not yet hold an Air Operator Certificate  
- Treat all registrations as founding interest, not confirmed travel  

Legal and regulatory milestones will be reflected in the Transparency section as they progress.

---

## License

Proprietary — Global Fire Airlines. All rights reserved.
