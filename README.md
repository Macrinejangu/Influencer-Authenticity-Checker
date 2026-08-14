# VERIFY.AI — Influencer Authenticity Checker

A front-end web app that checks whether a social media influencer's followers and engagement look genuine or inflated. Enter a handle and platform, get back a 0-100 authenticity score, a trust level, and the real metrics behind it.

**Live demo:** [influencer-authenticity-checker.vercel.app](https://influencer-authenticity-checker.vercel.app) *(confirm this matches your actual Vercel URL before submitting)*

Group 4 · SDF-TFR18M3

---

## What it does

- Search for a profile by handle and platform
- Get an authenticity score (0-100) with a trust level: High Trust, Uncertain, or Suspected Bot
- See the exact metrics the score is built from: engagement rate, 30-day and 90-day follower growth, posting activity, comment-to-like ratio, and account age
- Review your scan history
- View account details on a simple dashboard

## Why it looks the way it does

This project is intentionally **front-end only**. There's no back-end, no database, and no live calls to real social media APIs. Instead, it runs against a local mock dataset of 50 influencer profiles (`src/data/influencers.json`), with a real scoring engine (`src/utils/scoring.js`) that calculates an authenticity score from the data's actual signals, not hardcoded numbers.

This was a deliberate scope decision made after early documentation feedback, not a shortcut. It let the team focus on real UX, real scoring logic, and a genuinely working, deployed app within a tight timeline, rather than half-building a back-end.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React (Vite) |
| Routing | React Router |
| Styling | Plain CSS with design tokens (CSS variables), no framework |
| Data | Local JSON dataset, no external APIs |
| Deployment | Vercel, auto-deploys on merge to `main` |
| CI | GitHub Actions, runs lint on every pull request |

## Getting started

Requires Node 24 or higher (see `.nvmrc`).

```bash
git clone git@github.com:Macrinejangu/Influencer-Authenticity-Checker.git
cd Influencer-Authenticity-Checker
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

To check lint before opening a pull request:

```bash
npm run lint
```

## Project structure

```
src/
├── App.jsx                  # Routes for all 7 screens
├── index.css                 # Design tokens + global background
├── main.jsx                  # Entry point
├── components/                # Shared across every page
│   ├── Layout.jsx              # Wraps pages in Navbar + Footer + BottomNav
│   ├── Navbar.jsx               # Desktop top navigation
│   ├── Footer.jsx                # Site footer
│   └── BottomNav.jsx            # Mobile bottom tab navigation
├── data/
│   └── influencers.json        # Mock dataset, 50 profiles
├── utils/
│   ├── scoring.js               # Authenticity score calculation
│   ├── trustLabel.js            # Single source of truth for trust label wording/colors
│   └── formatTime.js            # Relative time formatting ("2h ago")
├── hooks/
│   ├── useProfiles.js           # Loads and analyzes all profiles
│   └── useScanHistory.js        # Tracks scan history in localStorage
└── pages/
    ├── Landing.jsx / .css
    ├── Search.jsx / .css
    ├── Loading.jsx / .css
    ├── Results.jsx / .css
    ├── Error.jsx / .css
    ├── History.jsx / .css
    └── Account.jsx / .css
```

## Design

Designed mobile-first in Figma, then extended to desktop breakpoints (1024px and up).

- **Colors:** Purple `#6B29D9` (primary), Pink `#ED4799` (accent), Gray `#8C8C99`, Yellow `#FAC726` (used sparingly)
- **Type:** Poppins for headings, Montserrat for body text
- **Style:** Dark, playful, a little "wow", built to feel like a modern consumer app rather than an enterprise dashboard

## Team & roles

| Role | Person |
|---|---|
| UI/UX & Design Lead, Scrum Master, Repo Owner | Macrine Jangu |
| Search, Landing & Loading | Enoch (Mungiria) |
| Results & Score Display | Clive Malcolm |
| Data Layer, Scoring Logic & State | Joe & Diana |

## Known limitations

- **No credits/quota system logic.** The Account screen displays a static credits balance, but the starting balance, renewal, and zero-balance behavior are intentionally unimplemented. The team made this call given the 3-day build window; it's flagged with a `// TODO` in `Account.jsx`.
- **No real backend.** Scan history is stored in the browser's `localStorage`, not a database, so it doesn't persist across devices or browsers.
- **No authentication.** The app currently uses one static mock user; there's no real login or multi-account support.
- **Mock data only.** Profiles are illustrative, not real social media accounts.

## Workflow

- Branch naming: `feature/`, `fix/`, `chore/`
- All changes go through a pull request with at least 1 approval before merging to `main`
- Task tracking: Trello (not GitHub Issues)