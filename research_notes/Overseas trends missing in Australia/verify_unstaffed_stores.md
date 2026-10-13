# Verification: Unstaffed and hybrid 24/7 micro-stores in Australia (adversarial presence check)

**Verification status: NOT COMPLETED. No live evidence could be gathered in this run (13 Oct 2026).**

- WebSearch: 4 calls attempted, 0 executed. Every call returned: "Web search was not performed: this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)." Other agents had used up the shared budget before this verifier's first query.
- WebFetch: 1 attempt, the maximum the brief allows: `https://en.wikipedia.org/wiki/Amazon_Go`. It failed with `getaddrinfo ENOTFOUND en.wikipedia.org`. DNS is blocked, as the brief warned.
- Per the tool's instruction, I made no workaround: no curl or wget to search engines, and no reader, proxy or archive services.
- I did not read other files in `research_notes/`.
- Everything below except the search log comes from the analyst's prior knowledge (training data to about mid-2026). None of it was checked in this session. Each item carries a recall-confidence label: **High** means near-certain general knowledge, **Medium** means a specific memory that is probably right but whose details may be wrong, and **Low** means a vague memory or a plausible lead only. The research rules say claims without a source go in the Gaps sections, so that is where they are.

**VERDICT: INCONCLUSIVE. Provisional lean: PARTIAL.** The proposing team's claim that this concept does "not yet exist in Australia in any form" has **not** been verified and must not be relied on. The decision rules only allow ABSENT after an exhaustive search, and no search ran.

**Confidence: 30% in the provisional PARTIAL label.** This is low because nothing was checked. The analyst's subjective prior, also unverified, is about 80% that a completed search would return PARTIAL or PRESENT rather than ABSENT. The reason is that several adjacent unstaffed formats almost certainly operate in Australia, and there are plausible leads for cashierless trials.

**Action required:** re-run the presence-check protocol using the query plan under Q1 > Gaps once search budget is available. The user can send a follow-up message to continue, or raise `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`.

---

## Q1. Is any unstaffed or hybrid-unstaffed grocery/convenience store or café operating in Australia today, or has one been trialled?

### Takeaway
This is unanswered: no evidence either way could be collected. From prior knowledge, several adjacent formats almost certainly operate in Australia:

- self-checkout in staffed supermarkets
- scan-and-go app trials
- 24/7 key-fob gyms
- vending machines
- farm-gate honesty stalls
- card-only unmanned fuel sites

There are also plausible but unconfirmed leads for cashierless venue stores, Korean-style self-service shops and honour-system shops in small towns. I could not confirm a single unstaffed grocery/convenience store or café open to the public.

### Cited Findings
- None. No search executed and the only fetch failed (see status above). No claim in this file rests on a source retrieved in this session.

### Inferences
- The adversarial standard is "conclude ABSENT only if an exhaustive search finds nothing". Zero searches ran, so ABSENT is not an available conclusion.
- Suppose the recalled app-checkout trials at Woolworths and 7-Eleven Australia are confirmed (see Q2 Gaps). They would count as a "retailer trial of cashierless formats", so at least PARTIAL. They would not be PRESENT, because the stores stayed staffed.
- Suppose a Just Walk Out, Zippin or AiFi deployment at an Australian venue (stadium, airport, campus) is confirmed. That would be a public, commercial deployment of the core technology: a strong PARTIAL, and arguably PRESENT for the "autonomous store" sub-concept. It would still not be the 24/7 neighbourhood or small-town use case.
- Three segments are the most likely to exist already, and they are cheap to start and often invisible to trade press, so a lack of press coverage is weak evidence of absence:
  1. 24/7 "vending stores" and smart-fridge walls in CBDs, campuses and apartment towers.
  2. Korean-community self-service shops (ice cream, snacks) in Sydney and Melbourne, mirroring the Korean boom.
  3. Honour-system unstaffed shops in small towns.
- Two segments are the least likely to exist:
  1. Retailer-run hybrids at Coles, Woolworths, ALDI or IGA that are staffed by day and unstaffed at night.
  2. Conversion-kit providers that let independent grocers go unstaffed after hours, like the Korean and Swedish models.

  If the rest of the concept turns out PARTIAL or PRESENT, these may be the parts that are actually open. This is unverified.

### Gaps

#### Search log (full list of queries run)
| # | Tool / mode | Query or URL | Result |
|---|---|---|---|
| 1 | WebSearch, standard | `unstaffed store Australia 24/7 self-service shop` | Not performed: shared per-turn budget (200) exhausted |
| 2 | WebSearch, standard | `AiFi autonomous store Australia` | Not performed: same reason |
| 3 | WebSearch, standard | `Amazon Just Walk Out Australia stadium` | Not performed: same reason |
| 4 | WebSearch, standard | `7-Eleven Australia cashierless store trial` | Not performed: same reason |
| 5 | WebFetch (single allowed attempt) | `https://en.wikipedia.org/wiki/Amazon_Go` | Failed: `getaddrinfo ENOTFOUND en.wikipedia.org` |

**Searches executed: 0** (budget for this task was about 35, with a hard cap of 38).

#### Query plan not yet executed (re-run in this order; about 80% are presence checks)
1. `unstaffed store Australia 24/7 self-service shop`
2. `AiFi autonomous store Australia`
3. `Amazon Just Walk Out Australia stadium`
4. `7-Eleven Australia cashierless store trial`
5. `Zippin checkout-free Australia`
6. `Woolworths checkout-free store trial`
7. `Coles cashierless store trial`
8. `ALDI Australia Shop&Go cashierless`
9. `IGA unstaffed after hours Metcash`
10. `service station unstaffed store Ampol EG BP Australia`
11. `unmanned convenience store Sydney`
12. `unmanned store Melbourne self-service`
13. `staffless shop regional town` (allowed_domains: abc.net.au)
14. `town without supermarket self-service shop` (abc.net.au)
15. `honesty store unstaffed general store Tasmania`
16. `unstaffed shop Western Australia Wheatbelt town`
17. `cashierless store university campus Australia`
18. `apartment building unstaffed convenience store Sydney`
19. `Korean unmanned ice cream shop Sydney Melbourne`
20. `unstaffed OR cashierless OR checkout-free` (insideretail.com.au)
21. `cashierless unattended retail` (retailworldmagazine.com.au)
22. `smart store autonomous retail startup` (startupdaily.net, smartcompany.com.au)
23. `unstaffed shop no staff Australia` (reddit.com, whirlpool.net.au, ozbargain.com.au)
24. `micro market smart fridge Australia` (adjacent)
25. `24/7 vending store Sydney Melbourne` (adjacent)
26. `unstaffed store New Zealand`
27. `computer vision checkout startup Australia New Zealand`
28. `Lifvs tegut teo Zabka Nano Australia`
29. `Trigo Standard AI Australia retailer`
30. `unattended retail after-hours conversion grocer Australia`
31. `Delaware North Just Walk Out Australia venue` (stadium caterers)
32. `WA Retail Trading Hours Act small retail shop definition` (regulation)
33. `retail crime Australia 2025 theft increase supermarket` (demand/risk)
34. `regional town lost supermarket Australia 2025` (demand)
35. `General Retail Industry Award penalty rates night shift pay guide` (regulation)

#### Unresolved leads (every lead in the brief is still open)
| Lead | Analyst prior (unverified) | What would settle it |
|---|---|---|
| Woolworths unstaffed, checkout-free or night-unstaffed trial | Recall a Scan&Go app trial c. 2018–19 in staffed stores (Medium). No unstaffed trial recalled. | Queries 6, 20 |
| Coles | Self-checkout widespread (High). No checkout-free trial recalled. | Queries 7, 20 |
| ALDI Australia | ALDI UK runs checkout-free "Shop&Go" stores using AiFi, with the first in Greenwich, London, c. 2022 (Medium). No Australian trial recalled. | Query 8 |
| IGA / Metcash independents | Nothing recalled. Independents are the most plausible adopters of after-hours kits. | Queries 9, 30 |
| 7-Eleven Australia | Recall an app-based "Mobile Checkout" / cashless-store trial in Melbourne c. 2018–19 (Low–Medium). Acquired by Seven & i Holdings c. 2024 (Medium). | Query 4 |
| Ampol / EG / BP / Viva Energy (Reddy Express, OTR) | 24/7 staffed convenience. Unmanned card-only fuel sites are common (High), but they sell fuel only. | Query 10 |
| AiFi, Standard AI, Zippin, Trigo, Amazon JWO in Australia | Vague memory of Amazon material listing Australia among Just Walk Out countries (Low). No specific Australian site recalled. | Queries 2, 3, 5, 29, 31 |
| Lifvs- or tegut-like rural stores | Nothing recalled. | Queries 14–16, 28 |
| Unstaffed shops in regional towns (WA, QLD, SA, Tas, country NSW) | Plausible honour-system or community shops (Low). | Queries 13–16 |
| University campus unstaffed stores | Smart fridges or micro-markets plausible (Low). | Query 17 |
| Apartment-tower unstaffed stores (Sydney, Melbourne) | Plausible in build-to-rent amenity spaces (Low). | Query 18 |
| Korean-style unstaffed ice-cream or snack shops | Korean self-photo studios operate unstaffed in Sydney and Melbourne (Low–Medium). Ice-cream shops unknown (Low). | Query 19 |
| Australian smart-store tech start-ups or conversion kits | Nothing specific recalled (Low). | Queries 22, 27, 30 |
| Failed or defunct Australian attempts | Unknown. | Queries 1, 11, 12, 20, 23 |
| New Zealand | Nothing specific recalled (Low). | Query 26 |

---

## Q2. What is the closest thing found, and how does it differ?

### Takeaway
Nothing could be confirmed in this session. From recall, the closest candidates are:

- app-based scan-and-go or "mobile checkout" trials in staffed stores (Woolworths, 7-Eleven Australia)
- possible checkout-free concession stores at venues (Just Walk Out and similar)
- truly unstaffed but narrow formats: vending and vending "stores", office smart fridges, farm-gate honesty stalls, and 24/7 key-fob gyms

None of these, as recalled, is a public, walk-in, 24/7 unstaffed grocery or convenience store with app, card or ID entry and a full grocery range.

### Cited Findings
- None retrieved (see status block).

### Inferences
Why each adjacent format would differ materially from the concept, if confirmed:

- **Scan-and-go or mobile checkout in staffed stores.** Removes the checkout queue but not the staff. There is no after-hours trading, no access control and no remote monitoring.
- **Checkout-free venue stores (stadiums, airports).** Same core technology, but these are ticketed or airside, open only during events or flights, and run by venue caterers. They are not neighbourhood, small-town or night-time trading.
- **Vending machines and multi-machine "vending stores".** Unstaffed and 24/7, but the range is limited, there is no walk-in browsing and no fresh-grocery depth. Closest on the job of "buy essentials at 3 am without staff".
- **Office, campus and hospital smart-fridge micro-markets.** Unstaffed and self-pay, but for closed audiences inside staffed buildings, with a narrow range. They are not open to the public.
- **Farm-gate honesty stalls.** Unstaffed and trust-based, but they sell the farmer's own produce, mostly for cash or PayID, with no access control, AI or exception handling.
- **24/7 key-fob gyms.** Not retail, but they show that unstaffed 24/7 access, remote CCTV monitoring and insurance work at scale in Australia. That is useful evidence of feasibility, not of the concept existing.
- **Card-only unmanned fuel sites.** Unstaffed and 24/7, but they sell fuel only.

### Gaps

#### Candidate entities from prior knowledge (UNVERIFIED; check each before use)
URLs are homepages given for identification only. None was fetched or checked in this session.

| Entity | URL | What it does (recalled) | Status / date (recalled) | Recall confidence | Same or different? |
|---|---|---|---|---|---|
| Woolworths Group: Scan&Go app; AI-monitored self-checkouts | https://www.woolworths.com.au | Shoppers scan items on their phone and pay via the app or an express lane; camera-monitored self-checkout | Trialled c. 2018–19; current status unknown | Medium | Adjacent. Staffed stores; not unstaffed or after-hours. |
| Coles Group: self-checkouts | https://www.coles.com.au | Self-checkout in staffed supermarkets | Widespread, ongoing | High (self-checkout); no unstaffed trial recalled | Adjacent |
| 7-Eleven Australia: "Mobile Checkout" / cashless-store trial | https://www.7eleven.com.au | App-based scan-and-pay to skip the counter | c. 2018–19 trial in Melbourne; owner Seven & i Holdings since c. 2024 | Low–Medium | If confirmed, a retailer trial of a cashierless format, so PARTIAL. Still staffed 24/7. |
| ALDI Australia (ALDI Süd group) | https://www.aldi.com.au | Group has checkout-free "Shop&Go" in the UK (AiFi) | No Australian trial recalled | Medium (UK) / Low (AU) | Lead only |
| Amazon Just Walk Out (licensed to venues) | https://www.justwalkout.com | Checkout-free tech for third-party stores, stadiums and airports | Possibly deployed in Australia; no site recalled | Low | If confirmed, PARTIAL/PRESENT for the cashierless-store sub-concept |
| Zippin / AiFi / Standard AI / Trigo | getzippin.com / aifi.com / standard.ai / trigoretail.com (unchecked) | Checkout-free computer-vision platforms | No Australian deployment recalled | Low | Lead only |
| Stadium caterers (e.g. Delaware North, Levy, Sodexo, Aramark) | n/a | Run checkout-free concession stores overseas | Australian deployment unknown | Low | Lead only |
| Anytime Fitness Australia (and other 24/7 key-fob gyms) | https://www.anytimefitness.com.au | 24/7 member access by fob, limited staffed hours | Ongoing, nationwide | High | Adjacent (named in the brief) |
| Farm-gate honesty stalls (e.g. Tasmania, peri-urban fringes) | n/a | Unstaffed produce stalls, honour payment | Ongoing, widespread | High | Adjacent (named in the brief) |
| Vending machines and 24/7 "vending stores" | n/a | Unstaffed snack, drink and meal machines; some multi-machine shopfronts | Vending ongoing (High); vending shopfronts (Low–Medium) | High / Low–Medium | Adjacent (named in the brief) |
| Office, campus and hospital smart-fridge micro-markets | n/a (operator names not reliably recalled) | Unstaffed self-pay fridges or kiosks in workplaces | Believed operating | Medium | Adjacent (named in the brief) |
| Card-only unmanned fuel sites | n/a | 24/7 unstaffed fuel sales | Common in regional areas and on freight routes | High | Adjacent: fuel only |
| Korean-style unstaffed self-photo studios (Sydney, Melbourne) | n/a | Unstaffed 24/7 photo booths in shopfronts | Believed operating since c. 2022–23 | Low–Medium | Adjacent: shows Korean unstaffed-shopfront culture has arrived; not grocery |
| Korean-style unstaffed ice-cream or snack shops | n/a | Unknown | Unknown | Low | If found, PRESENT |
| Auror (NZ-founded retail-crime platform) | https://www.auror.co (unchecked) | Retail-crime intelligence used by major Australian retailers | Believed operating | Medium | Adjacent: only the security layer |
| Imagr (Auckland computer-vision smart-trolley start-up) | n/a | Checkout-free trolley for staffed supermarkets | Believed trialled in NZ | Low | Adjacent |
| Click-and-collect lockers and Australia Post Parcel Lockers | n/a | 24/7 unstaffed pickup | Ongoing | High | Adjacent: pickup only, no browsing |

---

## Q3. What Australian facts matter for launch (trading hours, liquor and tobacco, night penalty rates, towns without supermarkets, retail crime)?

### Takeaway
None of these facts could be cited this session. From recall, the main points are:

- Most states either deregulate retail hours or exempt small and independent shops, which is favourable to small unstaffed formats.
- Liquor, tobacco and vapes almost certainly cannot be sold unattended.
- Award penalty rates make overnight staffing expensive. This is the core economic argument for night-time unstaffed hybrids.
- Rising retail theft means security and shrink assumptions should be conservative.

### Cited Findings
- None retrieved (see status block).

### Inferences
- The product range will exclude alcohol, tobacco and vapes. In Australian convenience retail, tobacco has historically been a large share of revenue. If that is confirmed, unstaffed stores carry less revenue per square metre than staffed rivals and must win on groceries, fresh food, ready meals and household basics.
- Under the trading-hours regimes that tie exemptions to the number of persons working, an independent operator with zero on-site staff would very likely qualify for the small-shop exemption. A chain-owned unstaffed store might not. That favours franchise or independent models, and conversion kits for independent grocers, in WA, SA and Queensland. This needs a legal check.
- Remote monitoring and AI exception handling must be designed for an environment of rising theft rather than Korea's low-shrink one. That raises cost per store and may narrow viable sites to controlled-access locations (apartment towers, campuses, workplaces, member-only small-town stores).

### Gaps

#### Five candidate facts to verify (recalled, unverified; each needs an official source)
1. **Trading hours (Medium recall).**
   - Victoria, Tasmania, the ACT and the NT are largely deregulated.
   - NSW restricts general trading only on a handful of days, such as Good Friday, Christmas Day and Anzac Day morning, with exemptions for small shops.
   - Victoria restricts a few holidays but exempts small shops.
   - WA, SA and Queensland still regulate hours for larger or chain shops but exempt small or independent ones: WA's "small retail shop", SA's "exempt shop", Queensland's "independent retail shop".
   - Verify against: Retail Trading Act 2008 (NSW), Shop Trading Reform Act 1996 (Vic), Retail Trading Hours Act 1987 (WA), Shop Trading Hours Act 1977 (SA), Trading (Allowable Hours) Act 1990 (Qld). Exact thresholds (persons working, floor area, ownership) are not stated here because they could not be verified.
2. **Liquor (Medium–High recall).** Packaged liquor must be sold from licensed premises with Responsible Service of Alcohol-trained staff supervising each sale, and unattended sale, including vending, is generally not allowed. An unstaffed store therefore cannot sell alcohol. Verify with each state's liquor regulator.
3. **Tobacco and vapes (Medium–High recall).**
   - Under Commonwealth reforms, legal retail vape supply has been limited to pharmacies since 1 July 2024.
   - States require tobacco retail licensing or notification and restrict tobacco vending machines to licensed venues or areas closed to minors.
   - An unstaffed store therefore cannot sell tobacco or vapes. Verify with the TGA and state health departments.
4. **Labour cost (Medium recall for the structure; percentages deliberately omitted).** The General Retail Industry Award 2020 (MA000004) adds evening, weekend, public-holiday and night or shift penalty rates, plus a 25% loading for casuals. That makes overnight staffing of small stores expensive. Verify with the current Fair Work Ombudsman pay guide.
5. **Retail crime and regional access (Low–Medium recall).**
   - Coles and Woolworths reported rising theft and staff abuse in 2023–24 and invested in body-worn cameras, AI-monitored self-checkouts and retail-crime platforms.
   - The ACCC's 2024–25 supermarkets inquiry highlighted weaker competition and access in regional and remote areas.
   - A specific, sourced count of towns that have lost their only supermarket was not available.
   - Verify with company results releases, ACCC final report, ABC regional reporting.
