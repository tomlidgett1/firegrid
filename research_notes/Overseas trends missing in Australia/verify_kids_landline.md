# Verification: screen-free "landline for kids" in Australia (adversarial presence check)

**STATUS: NOT VERIFIED. No web evidence was gathered in this session.** Date of attempt: 13 October 2026.

- **Verdict: INCONCLUSIVE (not verified).** The protocol allows ABSENT only after an exhaustive search. Zero searches ran, so ABSENT cannot be claimed, and PRESENT and PARTIAL cannot be confirmed either.
- **Confidence in a verified verdict: 0%.** There is an unverified lean from background knowledge only (training data to about mid-2026, not checked this session): **PARTIAL**, at roughly 40% confidence. PRESENT is also plausible. **Do not use this lean to pass or fail the idea.**
- **Why:** each of the 3 WebSearch calls attempted returned "Web search was not performed: this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)". The single permitted WebFetch attempt (https://www.tincan.kids/faq) failed with `getaddrinfo ENOTFOUND www.tincan.kids`, consistent with the environment-wide DNS block noted in the brief. The tool instructed agents not to work around the limit (curl, wget, proxies, readers), so no workaround was attempted.
- **What is needed:** re-run this verification in a new turn with a fresh search budget, or raise `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`. A 35-query plan is below.

## Search log and re-run plan

### Takeaway
Searches executed: **0**. Attempted: 3 WebSearch calls (all refused by the shared budget limiter) and 1 WebFetch call (DNS failure).

### Cited Findings
- None. No search returned results.

### Queries attempted this session (full list)
| # | Tool | Query / URL | Result |
|---|---|---|---|
| 1 | WebSearch (standard) | `Tin Can kids landline Australia` | Not performed: shared per-turn budget (200) exhausted |
| 2 | WebSearch (standard) | `Tin Can phone international shipping outside US` | Not performed: budget exhausted |
| 3 | WebSearch (standard) | `"landline for kids" Australia` | Not performed: budget exhausted |
| 4 | WebFetch | https://www.tincan.kids/faq | Failed: `getaddrinfo ENOTFOUND` |

### Planned queries for a re-run (35, standard mode: 29 presence checks, 6 on Tin Can metrics, demand and regulation)
Overseas entrants (AU/NZ)
1. `Tin Can kids landline Australia`
2. `Tin Can phone international shipping`
3. `Tin Can phone New Zealand`
4. `kids landline UK wifi phone`
5. `Tin Can alternative kids landline`

Local equivalents
6. `"landline for kids" Australia`
7. `"kids landline" Australia startup`
8. `"kids home phone" approved contacts Australia`
9. `"screen-free phone" kids Australia`
10. `kids landline Sydney Melbourne Brisbane`
11. `retro wifi phone kids Australia`
12. `"Tin Can" phone Australian parents`

Australian media and databases (use allowed_domains)
13. `kids landline` with abc.net.au, smh.com.au, theage.com.au, news.com.au
14. `landline kids social media ban` with kidspot.com.au, mamamia.com.au
15. `kids phone startup social media ban` with startupdaily.net, smartcompany.com.au, afr.com
16. `kids landline founder Australia` with linkedin.com
17. `kids landline phone` with kickstarter.com (and a separate Indiegogo check)
18. `kids phone Australia` with crunchbase.com

Telcos
19. `Telstra home phone kids VoIP`
20. `Aussie Broadband Optus VoIP kids landline`

Phone-free childhood groups
21. `Heads Up Alliance landline`
22. `phone-free childhood Australia landline`
23. `Smartphone Free Childhood Australia landline`

Community
24. `kids landline` with reddit.com (r/AustralianParents, r/australia)
25. `kids landline` with ozbargain.com.au, whirlpool.net.au

Partial substitutes and failed attempts
26. `Spacetalk 2026 kids phone launch`
27. `Pinwheel Gabb Troomi Australia`
28. `Garmin Bounce Australia`
29. `kids landline Australia discontinued crowdfunding`

Tin Can metrics, demand and regulation
30. `Tin Can Greylock funding 2025`
31. `eSafety social media minimum age enforcement 2026`
32. `ACMA VoIP emergency call 000 obligations`
33. `Australian children mobile phone ownership statistics`
34. `parents support under-16 social media ban poll`
35. `state school mobile phone ban Australia`

## Can Australian parents buy a dedicated kids' approved-contacts landline from any Australian or overseas provider today?

### Takeaway
Unanswered: no evidence either way was gathered, and every lead in the brief is still open.

### Cited Findings
- None (0 searches executed).

### Inferences
- From background knowledge only (unverified): I know of no Australian business selling a dedicated Wi-Fi/VoIP kids' landline with an approved-contacts list and kid-to-kid calling, and I understood Tin Can to be US-focused. However, my knowledge ends around mid-2026, and the 10 Dec 2025 under-16 social media law makes a 2026 local entrant, importer or reseller plausible. Lack of knowledge is not evidence of absence.
- Adversarial point: do not record ABSENT for this idea until at least the re-run plan above has been executed.

### Gaps (unresolved leads)
- Does Tin Can ship to Australia/NZ, sell through Amazon AU or resellers, run an international waitlist, or have announced international plans? Its site is believed to be tincan.kids; the fetch was blocked.
- Have any Australian start-ups launched kids' phones or landlines after the ban? Sources to check: Startup Daily, SmartCompany, AFR, LinkedIn, Crunchbase.
- Do Heads Up Alliance, the 36 Months campaign, any Australian chapter of Smartphone Free Childhood, or similar groups recommend landlines, and which product?
- 2025–2026 Australian media stories on a "kids landline" revival (ABC, SMH/The Age, news.com.au, Kidspot, Mamamia).
- Do Telstra, Optus or Aussie Broadband market any VoIP or home phone product for kids?
- Australian Kickstarter/Indiegogo campaigns for kids' landlines.
- Failed or defunct Australian attempts.
- Reddit, OzBargain and Whirlpool discussion of parents importing Tin Can or improvising one (for example, a DECT handset on an NBN VoIP line with call-barring).

## What is the closest thing found, and how does it differ?

### Takeaway
Nothing was found by search. The candidates below come from background knowledge, are **unverified**, and are the first things to check on a re-run.

### Cited Findings
- None (0 searches executed).

### Inferences (unverified candidates and how each would likely compare)
| Candidate (unverified) | What it is believed to be | Likely assessment if confirmed |
|---|---|---|
| Spacetalk (Australian-founded, believed ASX-listed) | Kids' wearable phone/GPS smartwatch with parent-approved contacts, sold through Australian retail | Partial substitute. It does the "call only approved contacts, no social media" job, but it is a personal mobile wearable with a screen and location tracking, not a shared, social home landline. Under the brief's decision rules this alone could make the verdict at least PARTIAL. |
| Moochies (believed Australian) | Kids' smartwatch with calling and approved contacts | Partial substitute; same reasoning as Spacetalk |
| Garmin Bounce | Kids' LTE smartwatch with parent-approved contacts | Partial substitute; Australian availability unverified |
| Pinwheel, Gabb, Troomi, Bark Phone | US kid-safe phones/smartphones with approved contacts | Partial substitutes; believed US-focused; Australian availability unverified |
| NBN VoIP home phone services (Telstra, Optus, Aussie Broadband and others) plus cordless DECT handsets with call-blocking (for example Panasonic, VTech, Uniden) at JB Hi-Fi/Officeworks | General household phones | Weak substitute: not kid-targeted, and generally no kid-safe allow-list, kid-to-kid network or parent app. A reasonable parent would not see it as the same product, though a determined parent could improvise one. |

### Gaps
- Confirm each candidate's existence, current Australian availability, price/plan and approved-contact features.
- Look for anything closer than these, for example generic "kids Wi-Fi phone" listings on Amazon AU, eBay AU or Temu.

## What Australian facts matter for launch?

### Takeaway
Nothing was cited this session. The items below are background knowledge to confirm against primary sources (eSafety, ACMA, the Federal Register of Legislation, state education departments) before any use.

### Cited Findings
- None (0 searches executed).

### Inferences
- Product design question that needs ACMA confirmation. A closed device-to-device network (like Tin Can's kid-to-kid calling) may fall outside "standard telephone service" obligations. A service that calls ordinary phone numbers would likely bring carriage service provider obligations, including free access to the emergency call service (000/112/106).

### Gaps (background knowledge to verify; not facts for the report)
- Social Media Minimum Age: the Online Safety Amendment (Social Media Minimum Age) Act 2024 set 16 as the minimum age from 10 Dec 2025. Platforms must take "reasonable steps" and the eSafety Commissioner enforces. Civil penalties are believed to reach A$49.5M, and messaging, gaming and education services are believed to be largely exempt. Verify the covered-platform list and eSafety's post-launch compliance and enforcement figures.
- Phone-free schools: all states and territories are believed to restrict student mobile phone use in public schools. Verify dates and scope.
- Child phone ownership: Australian statistics (ACMA, eSafety, RCH National Child Health Poll) were not retrieved.
- Parent sentiment: polling on support for the under-16 law and on delaying smartphones was not retrieved.
- VoIP/telco regulation: verify ACMA rules for VoIP emergency calling (Telecommunications (Emergency Call Service) Determination) and carriage service provider duties (TIO membership, TCP Code, IPND). Also check for any tightening of 000 rules after the September 2025 Optus Triple Zero outage.

## Tin Can and other overseas exemplars: latest growth figures

### Takeaway
Not retrieved. The brief's claim (2025 venture rounds, including about US$12M led by Greylock, and repeated sell-outs) was not confirmed by this verifier.

### Cited Findings
- None (0 searches executed).

### Inferences
- None that can be drawn without sources.

### Gaps
- Tin Can funding rounds and dates, units shipped, waitlist size, pricing (device plus monthly plan), and any 2026 international expansion.
- Names and metrics of other US/UK/European kids' landline products: none were identified this session. One adjacent US screen-free voice device to check is Relay, a screenless "smart walkie-talkie" for kids (believed US-only; unverified).
