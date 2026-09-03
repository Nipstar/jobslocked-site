# JobsLocked — Marketing Plan v3
*Working doc for Andy & Ayse. Written to be followed by a human or executed step-by-step by Claude Code / Cowork. Companion docs: `jobslocked-brand-guidelines.md` (brand system) and `design-prompt-tier-pages.md` (page build brief).*

---

## 1. Positioning

**One-liner:** JobsLocked catches the enquiries UK trades already get — missed calls, WhatsApp, SMS — holds the conversation, and books the job straight into their calendar. Then it asks every customer for the review.

**Category:** lead *conversion*, not lead generation. We never promise leads, rankings, or ad results. PPC is explicitly out of scope. The pitch: "More jobs without spending a penny more on ads — we stop the leaks in what you already pay for."

**Hook (approved):** *"Never lose a job to a missed call again. We answer, hold the conversation, and book it straight into your calendar — while you're on the tools or at dinner with your family."*

**Tagline:** *"Jobs locked in. While you're on the tools."*

**Differentiators**
1. Outcome language, zero jargon (see brand guidelines banned list)
2. Radical honesty as a feature: "If it won't pay for itself in your business, we'll tell you straight"
3. Nothing to learn: everything lands on the owner's phone as a text
4. Closed loop: win the job (answering/booking) + win the review (post-job requests)
5. Proof over claims: prospects can test the assistant themselves on the demo line — no need to take our word for it

## 2. ICP & market

- **Launch niche:** electrical and HVAC businesses, UK. 1–10 staff, owner-operated, active on Checkatrade/word-of-mouth, weak or no website, visible missed-call pain.
- **Buyer:** the owner. 35–60, reads texts not emails, buys from people who talk straight. Decision driver: "what is this costing me?" not features.
- **Expansion niches (assets already trade-agnostic):** plumbers, landscapers, locksmiths, roofers, drainage.
- **List in hand:** ~600 scraped London HVAC/electrician businesses with Companies House director names. GAPLINE pipeline (Google Places scraping, pain scoring, GHL) is the engine for list build and outreach sequencing.
- **Pain signals come from public data, not from contacting the prospect first:** review count, review recency, star rating, and presence/absence of a website, scored by the GAPLINE Python script into excluded/verify/genuine tiers. We do not ring prospects to "prove" pain before outreach — see section 5.

## 3. Offer & pricing

| Tier | Name | Contents | Price |
|---|---|---|---|
| 1 | **Never Miss a Job** | Missed-call text-back; AI answering on WhatsApp/SMS 24/7; qualification (where/what/how urgent); calendar booking; text summary to owner | £XXX/mo + setup — TBC Friday |
| 2 | **Job + Reputation** *(most popular)* | Tier 1 + automated post-job review requests (direct Google link, one nudge, no gating); drafted review replies; monthly report (calls caught, jobs booked, reviews won) | £XXX/mo + setup — TBC Friday |
| 3 | **Full Foundation** | Tier 2 + one-page website (services, reviews, FAQs, map, LocalBusiness schema); domain + hosting + maintenance handled by us | £XXX/mo + build (deposit upfront) — TBC Friday |

**Commercial rules (agreed):** deposit upfront on builds; hosting/domains stay under our control; site disabled if hosting lapses; rolling monthly, no long contracts; existing websites get an honest fix-vs-rebuild quote. **Excluded from all tiers:** PPC, GBP posts, lead-gen promises, review gating.

**Sales tool:** ROI calculator — average job value × missed calls/month = monthly leak. Every sales call opens with the prospect's own numbers. (Ayse researching HVAC/electrical business metrics to power defaults.) Pricing should be set as a function of this leak calculation, not independently of it — set defaults first, then price against them.

## 4. Funnel & assets

**Funnel:** Cold outreach → tier landing page or demo line → book 15-min call (GHL calendar) → ROI calculator on the call → close on Tier 1 or 2 → upsell path 1→2→3.

**Assets — built ✅ / to build ⬜**
- ✅ Main landing page (trades-sales-page.html) — trade-agnostic master
- ✅ Tier 1/2/3 landing pages — squeeze-style, cold-traffic ready
- ✅ Brand guidelines + design/build prompt
- ⬜ Ayse's designed mockups (Wednesday) → final build on jobslocked.com
- ⬜ ROI calculator (embed on site + use live on calls; inputs: job value, missed calls/wk; output: monthly leak + payback framing)
- ⬜ GHL: pipeline, calendar, booking link wired to all CTAs
- ⬜ Demo line: a live JobsLocked number prospects can ring/text to experience the assistant directly — the primary proof mechanic across every outreach channel
- ⬜ Trade-specific page variants (find/replace eyebrow + chat scenario per niche) once outreach lists are segmented
- ⬜ Case study template (fill after first 2–3 clients: calls caught, jobs booked, review delta)

## 5. Channels (priority order)

1. **Cold email to the 600-list** — director-name personalised. Angle: the missed-call cost, backed by real, publicly-checkable detail about the prospect's own listing (review count, review recency, rating, no/weak website) — never a claim about a specific call or contact that didn't happen. 3-touch sequence:
   - (a) Pattern-interrupt: opens with one true, specific observation from the prospect's Google listing — proves we've actually looked at their business, not a mail-merge.
   - (b) ROI maths for their trade, using the calculator defaults.
   - (c) Breakup message + direct invite to ring or text the demo line themselves and see what a customer trying to reach them out-of-hours actually gets.
   All CTAs → tier 1 page, the demo line, or straight to the booking link.
2. **LinkedIn (Ayse-led)** — founder-voice posts documenting the build; DM outreach to trade business owners.
3. **Partnerships (later)** — trade suppliers, merchants, Checkatrade-adjacent communities; referral fee per closed client.

**Not doing:** paid ads (off-brand with our own pitch), SEO content play at launch (revisit once client results exist), unsolicited outbound calling to prospects (dropped by agreement — doesn't fit the honesty positioning, and the demo line does the same proof job by invitation rather than interruption), direct mail (dropped — Ayse wasn't sure the postage/print spend justified it at this stage; revisit once email is proven and there's a case-study-backed reason to spend on a slower, more expensive channel).

## 6. Metrics

- **Outreach:** delivery >95%, open >45%, reply >5%, call-booked rate per 100 sends, demo line engagement (calls/texts received, % converting to a booked call)
- **Sales:** show-up rate, close rate, average tier sold, time-to-close
- **Client success (retention drivers, feed the monthly report):** calls caught/mo, jobs booked/mo, reviews won/mo, review rating delta
- **North star (first 90 days):** 10 paying clients; **kill/pivot check:** if <2 clients from first 300 outreach contacts, revisit message or niche before scaling sends

## 7. Timeline

| When | What | Owner |
|---|---|---|
| Wed | Visual mockups from design prompt + brand doc | Ayse |
| Fri | Pricing set (fill £XXX everywhere); tier scope sign-off; domain/hosting live plan | Both |
| Wk 1 | Site live on jobslocked.com; GHL calendar + pipeline wired; demo line stood up | Andy |
| Wk 1–2 | ROI calculator built + embedded; 600-list cleaned, scored, segmented via GAPLINE (Places data + pain scoring) | Andy |
| Wk 2 | Email sequence written in brand voice; segment 1 sends begin | Andy |
| Wk 2–3 | First 100 sends → iterate on replies; LinkedIn cadence starts | Both |
| Wk 4+ | Scale sends; first case study drafted; revisit direct mail if a client result makes the spend easy to justify | Both |

## 8. Instructions for Claude Code / Cowork

When executing from this doc:

1. **Read `jobslocked-brand-guidelines.md` first** — voice, palette, type, and guardrails apply to every asset, email, and page produced.
2. **Never add:** PPC, GBP posts, lead-gen/ranking promises, review gating, long forms, stock photography, unsolicited outbound calling, or the words on the banned list.
3. **Placeholders:** £XXX prices and booking-link URLs are TBC — build everything to accept them via find/replace; do not invent prices.
4. **Landing pages:** extend from the four existing HTML masters rather than redesigning; keep everything trade-agnostic unless explicitly producing a niche variant.
5. **Outreach copy:** short, blunt, owner-to-owner. Every email must contain the prospect's cost-of-missed-calls maths or a real, publicly-checkable detail about their business — never a fabricated interaction (e.g. no implying a call was placed to them if one wasn't).
6. **Data work:** prospect scoring/segmentation follows the existing GAPLINE pipeline conventions (Python scoring script → CSV + Postgres) — scraping and scoring only, no outbound ring-out step.
7. Customer-facing materials never mention Antek Automation, The GEO Agency, or the JV structure.
