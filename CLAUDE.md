# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

Static marketing site for **JobsLocked** (jobslocked.com) — AI receptionist, booking and review service for **US contractors and home-service businesses**. A product of Antek Automation (UK-founded, serving US contractors).

No build step, no dependencies, no framework. Plain HTML + one CSS file + one JS file. Push to `main` → Plesk pulls into the docroot → live. Preview locally with `python3 -m http.server 8080` from the repo root.

## Files

```
index.html                    home
plans/<slug>/index.html       the three plan pages (never-miss-a-call, book-every-job, win-the-job-win-the-review)
cost/index.html               missed-call cost calculator landing page (outreach link)
book/index.html               booking page (CRM embed, eager)
privacy/ terms/               placeholders
404.html                      error page (wired via .htaccess)
assets/site.css               all styles, shared by every page
assets/site.js                booking modal, calculator, phone demo, dataLayer events
fonts/                        self-hosted Archivo + Inter (woff2)
robots.txt sitemap.xml llms.txt llms-full.txt
.htaccess                     404, redirects, security headers, caching, llms.txt mime
reference/                    original mockups, JV concept mockups, og.html template (404'd from the web)
logo/ logo.png og-default.png
jobslocked-marketing-plan.md  UK-era positioning/funnel doc. Pricing in it (£XXX) is superseded by the $ prices in the HTML.
```

## Editing rules

- **Copy lives in the HTML.** No content file, no components. Header, footer and the 6-item FAQ are duplicated on every content page (index, 3 plans, cost, privacy, terms) — change one, change all. Grep a phrase to find every copy.
- **Prices** appear in: plan page hero + glance + JSON-LD; home pricing cards + home JSON-LD offers; `llms.txt` / `llms-full.txt`; the calculator section's `data-price` / `data-plan` on home, each plan page and `/cost/`. Update all of them together.
- When `assets/site.css` or `assets/site.js` changes, bump the `?v=N` on their `<link>`/`<script>` tags in **all** pages (cached 30 days).
- When a page changes, bump its JSON-LD `dateModified` and its `<lastmod>` in `sitemap.xml`.
- FAQ text in the JSON-LD `FAQPage` must stay verbatim-identical to the visible `<details>` text.
- Booking: every CTA is `<a class="btn" href="/book/" data-book>`. `site.js` turns it into the modal; without JS it falls through to `/book/`.
- Reuse existing classes (`.wrap`, `.btn`, `.btn.ghost`, `section.dark`, `.muted`, `.pain`, `.steps`, `.floor`, `.tiers`, `.honest`, `.final`, `.log`, `.two`, `.day`, `.calc`, `.demo`, `.nosell`, `.when`) before adding CSS. New CSS goes in `site.css`, uses the `:root` tokens by name. No new hex codes in HTML.

## Guardrails (product/legal, not style)

- **No review gating.** Every customer gets the same direct Google review link. It appears in copy as a trust point.
- **No lead-gen, ranking or revenue guarantees.** The calculator is labelled illustrative.
- **The only CTA is booking a free 15-minute call** (or the phone number). No quote forms, no long forms.
- Never write "Ltd" or "Limited" next to Antek Automation.
- Trade-agnostic: no trade names in copy (no HVAC, mold, roofing, etc. as the audience). Job examples in mockups may be specific; the audience is "contractors".
- Banned words: leverage, revolutionize, seamless, solution, omnichannel, CRM, SEO, AI-powered (as a benefit), cutting-edge, game-changer. Never sell "AI chatbot" or "AI" as the benefit — sell the outcome (the call answered, the job booked).
- Spelling: US ("math", "color"). Known exception: existing copy uses "enquiry" throughout; keep it consistent within a page rather than mixing "inquiry" in.

## Design tokens (from `assets/site.css`)

- `--graphite #1B242C` (dark bands, header), `--ink #0F161B` (footer, text on amber), `--paper #F2F3F1` (page background, never pure white for the page), `--amber #FFB300` / `--amber-d` (CTAs and action only — one amber button per screen), `--red #D9432F` (lost money), `--muted`, `--line`, `--white` (cards).
- Headings: Archivo, condensed, weight 900. Body: Inter. One highlighted word/phrase per hero headline (`.hl`, amber on graphite). Amber text only on dark backgrounds.
- Layout: alternating graphite ↔ paper sections, `.wrap` at 1080px, mobile breakpoint 820px.
- The signature visual is the missed-call log (`.log`) in the home hero. Phone/chat mockups and bold type carry the design. No stock photography, no robot motifs.
- Animations must respect `prefers-reduced-motion` (the log rows and the phone demo already do).
