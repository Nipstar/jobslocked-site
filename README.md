# jobslocked.com

Static site for JobsLocked — AI receptionist, booking and review service for US contractors. No build step: plain HTML + one CSS file + one JS file. Push to GitHub, Plesk pulls, done.

## Layout

```
index.html                          home
plans/<slug>/index.html             the three plan pages
cost/index.html                     missed-call cost calculator landing page (outreach link)
book/index.html                     booking page (CRM embed, eager)
privacy/ terms/                     placeholders — TODO bodies, text to come
404.html                            error page (wired via .htaccess)
assets/site.css                     all styles (shared across every page)
assets/site.js                      booking modal, cost calculator, phone demo, dataLayer events
fonts/                              self-hosted Archivo + Inter (woff2)
robots.txt sitemap.xml llms.txt llms-full.txt
.htaccess                           404, `/call` redirect, security headers, caching, llms.txt mime
reference/                          original mockups + og.html template (blocked from web)
logo.png og-default.png             schema logo / social share image
```

## Editing

- **Copy lives in the HTML.** Header, footer and the 6-item FAQ are duplicated on every page — when you change one of those blocks, change it on **all pages** (index, 3 plan pages, book, privacy, terms). Grep for a phrase to find every copy.
- Plan prices/minutes appear in: the plan page hero + glance block + JSON-LD, the home pricing cards + home JSON-LD offers, the calculator section's `data-price` / `data-plan` (home, each plan page, `/cost/`), and `llms.txt` / `llms-full.txt`. Update all of them together.
- When you edit `assets/site.css` or `assets/site.js`, bump the `?v=N` query on their <link>/<script> tags in ALL pages — they are cached 30 days and repeat visitors keep the old file otherwise.
- When you edit a page, bump its `dateModified` in the JSON-LD and its `<lastmod>` in `sitemap.xml`.
- FAQ text in the JSON-LD `FAQPage` must stay verbatim-identical to the visible `<details>` text.
- OG image: regenerate by opening `reference/og.html` in a browser at 1200×630 and screenshotting to `og-default.png`.
- Tier 3 JSON-LD has a second Offer for the one-time site build with `price: "0"` — TODO: set the real number when priced.

## First deploy

1. **Create the GitHub repo and push** (run these yourself, fill in the account):
   ```sh
   git remote add origin git@github.com:<you>/jobslocked.git
   git push -u origin main
   # or: gh repo create <you>/jobslocked --private --source . --push
   ```
2. **Plesk → Websites & Domains → jobslocked.com → Git**: add repository, paste the repo URL (use the deploy key Plesk generates — add it to GitHub → repo → Settings → Deploy keys), set **deployment path to the docroot (httpdocs)**, deployment mode "Automatic". Copy the Plesk webhook URL into GitHub → repo → Settings → Webhooks so pushes deploy instantly.
3. **Plesk hosting settings**: this repo ships an `.htaccess`, which works in the default nginx-proxy-to-Apache mode. If you enable "Serve static files directly by nginx", the headers/caching in `.htaccess` stop applying to static files — mirror them in *Apache & nginx Settings → Additional nginx directives* instead.
4. **Cloudflare**: DNS A record for `jobslocked.com` → VPS IP, proxied (orange cloud). CNAME `www` → `jobslocked.com`, proxied. Add a **Redirect Rule**: `www.jobslocked.com/*` → `https://jobslocked.com/$1`, 301. SSL/TLS mode: Full (strict) with a Plesk Let's Encrypt cert on the domain (issue it in Plesk → SSL/TLS Certificates; use the DNS or HTTP challenge — with Cloudflare proxied, HTTP challenge works once DNS points at the VPS).
5. Push. Check live: `curl -I https://jobslocked.com/` (headers), `https://jobslocked.com/nope` (404 page), `https://jobslocked.com/llms.txt` (text/plain).

## Day to day

Edit HTML → commit → push → Plesk auto-pulls. After a deploy, purge Cloudflare cache (Caching → Purge Everything) or wait out the short HTML TTL.

## QA notes (last run 2026-08-31)

- Lighthouse (mobile, local): 100 / 100 / 100 / 100 on `/` and `/plans/book-every-job/`.
- axe: zero violations on all 8 pages.
- JSON-LD parses on every page; validate rich results at https://search.google.com/test/rich-results after go-live.
- Booking modal: opens from any `[data-book]`, lazy-loads the CRM embed on first open, Esc/backdrop/button close, focus returns to trigger. Without JS the buttons fall through to `/book/`.
