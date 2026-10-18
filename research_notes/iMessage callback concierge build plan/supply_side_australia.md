# Supply Side in Australia for a Text-a-Number "Get Someone to Call Me" Concierge (as of October 2026)

Research method note: 30 web searches (the full budget) were run on 18 Oct 2026. WebFetch failed with DNS errors (ENOTFOUND) on both attempts (ASX announcements and developers.google.com), so all findings come from search-result summaries, not full-page reads. Search summaries can mangle details, so anything numeric that will drive a decision should be checked against the primary page. "Cited Findings" contains only items backed by a search result. Items from background knowledge are kept apart under **Gaps → Unverified background knowledge** and need checking before anyone relies on them.

---

## 1. Data sources for finding and contacting providers (and legality of outreach)

### Takeaway
No source hands you a clean, licensed list of verified tradie mobile numbers you can store and market to. Google Places (New) is the best discovery layer, but you may store only `place_id` indefinitely, so pull phone numbers live at request time and do not build a Google-derived database. ABN Lookup (free) and the NSW Fair Trading Trades API (free tier) are the legitimate verification layers. The legally durable asset is a **first-party, opted-in provider roster**: the provider gives you their own mobile and consent. Cold B2B outreach to published business contacts is generally lawful in Australia if it is relevant to their trade and carries identification and an opt-out. Telemarketing rules still apply to voice calls.

### Cited Findings

**Google Places API (New): terms and caching**
- Google's Places policies say the place ID is exempt from caching restrictions and can be stored indefinitely. Other Places API content must not be pre-fetched, cached or stored beyond the listed exceptions. — [Google Places policies](https://developers.google.com/maps/documentation/places/web-service/policies?authuser=6)
- The June 2026 Google Maps Platform Service Specific Terms permit caching `place_id` values from Places, Directions, Geolocation and Routes APIs. — [Maps service terms 2026-06-10 (archive)](https://cloud.google.com/archive/maps-platform/terms/maps-service-terms-20260610)
- A third-party blog (it says it was verified against Google pages in Aug 2026) says lat/lng may be cached for up to 30 days, and that display names, addresses, ratings and photos have no caching exception. The 30-day figure could not be confirmed in the official Places policy text; it appears in older Directions/Roads terms. — [openplacesapi.com](https://openplacesapi.com/blog/can-you-store-places-api-results)
- The legacy Places API can no longer be enabled on new projects, so new builds must use Places API (New). — [openplacesapi.com pricing blog](https://openplacesapi.com/blog/google-places-api-pricing)

**Google Places API (New): pricing (since 1 March 2025)**
- On 1 March 2025 Google replaced the $200 monthly credit with free monthly caps per SKU: 10,000 calls for Essentials, 5,000 for Pro and 1,000 for Enterprise. Caps reset monthly. — [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing?hl=en_US)
- Example prices (USD per 1,000, first tier): Place Details Essentials $5.00 (10k free); Text Search Pro and Nearby Search Pro $32.00 (5k free); Place Details Enterprise $20.00; Text Search Enterprise $35.00. Text Search Essentials (IDs only) is unlimited. Requesting ratings moves a call to the Enterprise tier, and requesting reviews moves it to Enterprise + Atmosphere. — [Google pricing (cn mirror)](https://developers.google.cn/maps/billing-and-pricing/pricing?hl=en); [openplacesapi.com](https://openplacesapi.com/blog/google-places-api-pricing). Sources list slightly different figures for some SKUs, so confirm on Google's live pricing page.
- Note on SKUs: the phone number field (`nationalPhoneNumber`/`internationalPhoneNumber`) sits in the Enterprise field mask under Places (New) per Google's field-tiering. This was not directly confirmed in this session, so see Gaps.

**ABN Lookup (Australian Business Register)**
- Access to the ABN Lookup web services is free of charge. You register, accept the web services agreement, and receive an authentication GUID by email. — [ABR web services](https://abr.business.gov.au/Tools/WebServices); [ABR registration guide](https://abr.business.gov.au/Documentation/UserGuideWebRegistration.aspx)
- Name-search methods exist in SOAP and simple HTTP GET/POST forms, and the latest can filter to active ABNs. — [ABR web service methods](https://abr.business.gov.au/Documentation/WebServiceMethods)
- Third-party sources say the free service returns entity/business names, ABN status, state and postcode, but not phone numbers, directors or full addresses. — [Apify ABN actor (secondary)](https://apify.com/au_actorfactory/abn-lookup-enricher); [companydata.com (secondary)](https://companydata.com/abn-lookup-api/)

**State licence registers**
- **NSW:** api.nsw offers a "Trades API" covering publicly available licensing information, including whether a tradesperson is authorised for a given type of work and whether a licence is valid. The free/trial tier is capped at 2,500 calls a month and 5 calls a minute. The product page was last updated in March 2020, so check its current status. — [api.nsw Trades API](https://api.nsw.gov.au/Product/Index/25)
- The NSW Trades dataset on data.nsw.gov.au is published by API NSW with no specified licence, so its reuse terms are unclear. — [data.nsw Trades dataset](https://data.nsw.gov.au/data/dataset/4-trades)
- In 2022 NSW announced an enhanced public register for checking tradie licences, plus digital-licence QR verification. — [NSW announcement 2022](https://online.nsw.liberal.org.au/Shared-Content/News/2022/Service-NSW-making-it-easier-to-check-your-tradie)
- **Victoria:** The regulator now operates as the Building and Plumbing Commission (BPC), formerly the VBA. Its public search tool finds practitioners by name, business name, registration or licence number, location or type of work, and shows current status and conditions. A separate Prosecution and Disciplinary Register exists. — [BPC find and check a practitioner](https://www.bpc.vic.gov.au/find-and-check-a-practitioner)
- The BPC Building Practitioner Register is also published as an open dataset on the Victorian data portal. — [DataVic BPC register](https://discover.data.vic.gov.au/dataset/bpc-building-practitioner-register); [data.gov.au mirror](https://www.data.gov.au/data/dataset/vba-building-practitioner-register)
- **Queensland (QBCC):** no search results covered the QBCC licence search or any API. See Gaps.

**Directories and marketplaces as sources**
- Yellow Pages, TrueLocal, Whereis, Thryv Data and Thryv Australia are cross-linked sister sites. White Pages listings carry "© 2026 Thryv Australia Pty Ltd", which confirms the entity was operating in 2026. No information was found on data licensing. — [White Pages listing footer](https://www.whitepages.com.au/hobbies-australia-10470127/10470126B)
- **Oneflare closed on 30 June 2026.** Its website and app now redirect to Airtasker, auto-renewals were turned off from 1 June 2026, and the brand was retired so the group can focus on Airtasker. — [Oneflare help: closing](https://help.oneflare.com.au/hc/en-au/articles/58074479988377-Oneflare-is-closing-here-s-what-you-need-to-know); [Oneflare help: billing](https://help.oneflare.com.au/hc/en-au/articles/58534654842265-Oneflare-is-closing-here-s-what-you-need-to-know)

**Legality of outreach (Spam Act, Do Not Call Register, Telemarketing Standard)**
- Under the Spam Act, consent to commercial electronic messages (email and SMS) can be *inferred* from conspicuous publication only if (1) the address is publicly accessible, (2) the message relates directly to the recipient's role or business, and (3) there is no statement rejecting unsolicited commercial messages. Publication alone is not enough. — [ClickSend summary of ACMA rules](https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2); [Mondaq](https://www.mondaq.com/australia/consumer-law/996226/spamming-and-the-spam-act)
- With conspicuous publication there must be a strong link between what is promoted and the recipient's line of business. All messages sent on inferred consent must still meet the identify and unsubscribe conditions. — [emaillistvalidation.com (secondary)](https://emaillistvalidation.com/blog/conspicuously-published-address-rule-australian-spam-act/); [ClickSend](https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2)
- Business phone numbers are not eligible for the Do Not Call Register. A number used for both personal and business calls qualifies only if it is *mainly* personal. — [DNCR register legislation](https://www.donotcall.gov.au/Industry/Industry-Overview/Register-legislation); [Sprintlaw](https://sprintlaw.com.au/articles/do-not-call-register-australia-businesses-need-to-know/)
- The Telecommunications (Telemarketing and Research Calls) Industry Standard 2017 sets minimum requirements for all telemarketing calls to Australian numbers, whether or not the call is exempt from the DNCR. No result addressed AI-generated voice calls specifically. — [DNCR industry guide](https://www.donotcall.gov.au/media/1212/dncr-industry-guide.pdf)

### Inferences
- **Recommended data architecture:** Use Places (New) Text Search to discover candidates, and cache only `place_id`. At request time, call Place Details live for the phone number and website, then dial or SMS. Do not persist Google's phone numbers in your own provider table. Once a provider answers and opts in, record *their own* first-party details and consent. That record is yours and is not Google content.
- **Cost is trivial at MVP scale.** Suppose each request runs one Text Search (Pro, ~$0.032) plus five Place Details calls carrying phone fields (Enterprise, ~$0.02 each). That is roughly US$0.13 per request before free tiers. 1,000 requests a month costs about US$130 at most, and the free caps absorb much of it.
- **Verified mobiles:** none of the data sources provides "verified mobile" as a field. Google returns whatever number the business lists, often a mobile for sole traders (unverified). ABR returns no phone numbers. State registers return licence status, not phone numbers. Verification of a mobile only happens when the provider answers or replies and opts in, so treat the first successful two-way contact as the verification event.
- Cold outreach to a plumber offering a plumbing job lead clearly passes the Spam Act's "relates to their role" test. The weaker spots are (a) SMS to sole-trader mobiles that may be mainly personal and on the DNCR (the DNCR covers voice calls, not SMS), and (b) Telemarketing Standard calling-hours rules for AI voice calls (see background knowledge below). Moving providers to express opt-in fast removes most of this risk.
- Oneflare's shutdown means a cohort of providers (strong in cleaning, gardening, pest control, handyman, removals, photography and other non-licensed services) lost a lead channel in mid-2026. They are a ready-made acquisition pool, and the Oneflare-to-Airtasker redirect will not suit every quote-based business.

### Gaps
- QBCC (Queensland) licence search and API availability, and Energy Safe Victoria's electrician register: not covered by any search result.
- Apple Maps (Apple Maps Server API / MapKit search) terms, quotas and caching: no search was spent on it. Not verified.
- hipages, Airtasker, Bark and ServiceSeeking terms on scraping or re-contacting their listed providers: not searched. Assume their ToS prohibit scraping. Visiting a public profile and then phoning the business's own published number is a different act from scraping.
- Facebook groups as a source: no data found. Meta's terms prohibit automated scraping (background knowledge).
- Thryv/Yellow Pages data licensing (e.g., whether "Thryv Data" sells listing data): unknown.
- Whether the NSW Trades API is still live and on the same quotas in Oct 2026: the page is dated March 2020.
- **Unverified background knowledge (confirm before relying):**
  - The Telemarketing Standard 2017 restricts calling hours, as I recall to weekdays 9am–8pm and Saturdays 9am–5pm, with no calls on Sundays or national public holidays unless the recipient consents. It also requires caller identification and calling-line ID. If an AI call to a non-opted-in business counts as a "telemarketing call" (offering a service, i.e. a lead), then evening and Sunday urgent-job calls to cold providers could breach it. Opted-in providers who have consented to after-hours job alerts are the clean path.
  - ACMA's SMS Sender ID Register (legislated 2024) may now require alphanumeric sender IDs to be registered. Check status before sending branded SMS.
  - The Privacy Act small-business exemption (<$3m turnover) likely covers a solo founder today, but consumer phone numbers and job details should be handled as if the APPs apply, given pending reform tranches.
  - Google Maps Platform general terms prohibit using Maps content to create or augment a business-listing database. Storing scraped phone numbers in a CRM is the main compliance risk.

---

## 2. Existing lead marketplaces: economics, complaints, and what would make tradies switch

### Takeaway
The incumbent model is "subscription plus credits, lead shared with up to three businesses, lock-in contract". hipages has ~36.4k paying businesses at ~$2,475 a year each, which works out to roughly $30–35 per homeowner–tradie connection. Jim's charges franchisees about $9–$27.50 per lead on top of monthly fees. Pay-per-lead challengers start around $25. The loudest tradie complaints are shared leads, slow or unfair allocation, low-intent or fake leads, rising credit prices and lock-in or auto-renew billing. A new channel wins by being exclusive, pay-only-when-connected, pre-qualified and contract-free.

### Cited Findings

**hipages (ASX: HPG) — FY26 results, released 24 Aug 2026**
- Total revenue up 9% to $90.6m. EBITDA up 17% to $22.9m (25.3% margin). Pro-forma NPAT $6.1m; statutory NPAT $15.0m including an $8.9m deferred-tax benefit. FCF $9.4m (up 66%), closing cash $34.2m. — [InvestSMART summary of HPG FY26 announcement](https://www.investsmart.com.au/investment-tools/shares/asx-price-sensitive-announcements/asx-hpg/2492495); [ASX FY26 release PDF](https://announcements.asx.com.au/asxpdf/20260824/pdf/0733gw0czqcdyv.pdf)
- 36.4k subscription businesses (up ~9–10%). Subscription ARPU up 9% to $2,475, apparently annualised. Business–household connections reported as "fell 4% to 2.7m". — [InvestSMART](https://www.investsmart.com.au/investment-tools/shares/asx-price-sensitive-announcements/asx-hpg/2492495). **Conflict:** the FY25 results reported 2.7m connections, flat on FY24 ([ASX FY25 PDF](https://announcements.asx.com.au/asxpdf/20250822/pdf/06n5s617jxwy2l.pdf)), so "−4% to 2.7m" implies rounding (e.g. ~2.8m to ~2.65m). Check the primary deck. InvestSMART flags its summaries as autogenerated.
- FY26: hipages acquired a majority stake in VIZ Insurance (a move into insurance) and began an on-market buy-back of up to 10%. FY27 guidance is 9–11% revenue growth. — [InvestSMART](https://www.investsmart.com.au/investment-tools/shares/asx-price-sensitive-announcements/asx-hpg/2492495); [Quartr H2 FY26](https://quartr.com/events/hipages-group-holdings-limited-hpg-h2-2026_FY4ypueI)
- Tradiecore is hipages' SaaS platform. "Smart Quotes" (AI) was released in FY26. — [ASX H1 FY26 PDF](https://announcements.asx.com.au/asxpdf/20260224/pdf/06wn9bmw8wbt28.pdf)
- Earlier (FY24): jobs posted fell 6% to 1.3m while connections grew 3% to a record 2.7m. Connections can rise while jobs fall because each job connects to multiple tradies. — [Business News Australia](https://direct.businessnewsaustralia.com/articles/hipages-turns-a-profit-as-tradies-spend-more-to-vie-for-work-in-uncertain-times.html)
- In older hipages data (dated, likely around 2020–21), a homeowner posted a job every 20 seconds on average. — [The Leader](https://www.theleader.com.au/story/5980417/hire-a-tradie-you-can-trust/)

**hipages pricing (tradie side)**
- hipages raised plan prices in July 2026: Starter $139, Advanced $249, Premium $449, Platinum $649 a month plus GST (previously $129/$229/$429/$599). Monthly credit allowances are reported as 155/310/595/850. — [whatsthedamage.com.au](https://whatsthedamage.com.au/tradies/hipages-cost/); [PricingSaaS diff 2026-W28](https://pricingsaas.com/companies/hipagesgroup/diffs/2026W28). **Conflict:** PricingSaaS shows Platinum at 810 credits, unchanged.
- Credit cost per lead varies by trade, location, job size and demand. One reviewer saw a lead's cost rise from ~42 to ~75 credits in a year. — [whatsthedamage.com.au](https://whatsthedamage.com.au/tradies/is-hipages-worth-it/)
- Each lead goes to up to three businesses. Contracts run a 6-month introductory term, then 12-month auto-renewals, and mid-term cancellation can trigger remaining fees. — [whatsthedamage.com.au](https://whatsthedamage.com.au/tradies/hipages-cost/). Note that whatsthedamage is a competing pay-per-lead service. Its own leads start "from $25 per lead with no subscription". — [WTD FAQ](https://whatsthedamage.com.au/faq/)
- In a public reply, hipages says the platform connects homeowners with "up to three businesses in most cases" and that reports of 6–7 tradies contacting one customer are uncommon. — [Trustpilot hipages reviews](https://ch.trustpilot.com/review/hipages.com.au?page=6)
- The ACCC said hipages admitted it likely engaged in misleading or deceptive conduct from Oct 2018 to Jan 2022 by failing to adequately disclose auto-renewal and early-termination-fee terms, and hipages gave an enforceable undertaking. — [ACCC media release](https://www.accc.gov.au/media-release/tradie-platform-hipages-rectifies-subscription-trap-issues)

**hipages complaints (tradie side)**
- Trustpilot reviewers allege delayed lead delivery, with customers already hired by the time they called; unfair lead allocation; ongoing billing despite complaints; "very low quality" leads; and leads "often not genuine". — [Trustpilot hipages (pages 3–9)](https://ch.trustpilot.com/review/hipages.com.au?page=6); [ProductReview hipages](https://www.productreview.com.au/listings/home-improvement-pages)

**Oneflare (Airtasker-owned), now closed**
- Before closing, Oneflare used "Dynamic Pricing": lead cost varied by category, location, demand and job size or complexity. Credit plans ran from 110 to 5,000 credits, with month-to-month or 3/6/12-month terms. — [Oneflare: How are leads priced](https://help.oneflare.com.au/hc/en-au/articles/12994962165529-How-are-leads-priced); [Oneflare credit plans](https://help.oneflare.com.au/hc/en-au/articles/47483859076889-What-Are-Credit-Plans-on-Oneflare)
- In 2019, leads started at $6 each and subscriptions at $49 a month (dated). — [Building Connection 2019](https://buildingconnection.com.au/wp-content/uploads/flipbooks/BC-Spring-2019/html/files/assets/basic-html/page-54.html)
- The platform closed on 30 June 2026 and redirects to Airtasker. — [Oneflare help](https://help.oneflare.com.au/hc/en-au/articles/58074479988377-Oneflare-is-closing-here-s-what-you-need-to-know)

**Airtasker (ASX: ART) — FY26 results, released 26 Aug 2026**
- Group revenue up 9.9% to $57.8m. Airtasker marketplaces excluding Oneflare up 15.5% to $52.0m. Gross marketplace volume up 14.9% to $239.8m. Net profit attributable $1.2m, against a $31.6m loss in FY25. US revenue up ~150% and UK up ~55%. Over 10,000 paid members by 30 June 2026. — [Staffing Industry Analysts](https://www.staffingindustry.com/news/global-daily-news/airtaskers-international-markets-drive-full-year-revenue-growth); [FilingReader](https://filingreader.com/news-wire/sydney/2026-08-26/airtasker-delivers-full-year-profit-and-marketplace-growth); [ASX FY26 PDF via Webull](https://bulletin.webull.com/qbd/announcement/20260826/499500381/09acc31376e150e92d7a425d9f6e2ba9.pdf)
- Airtasker marketing claims "over 38,000 tasks posted each week" (average May 2025 to May 2026). — [Oneflare/Airtasker site banner](https://www.oneflare.com.au/)
- Fees in Australia: the poster pays a connection fee of 15.95% of task value (min $4.90, cap $49.95, incl. GST), waived for members. The Tasker pays a tiered service fee of 12.5%–20%. — [Airtasker support: connection fee](https://support.airtasker.com/hc/en-au/articles/360031769372); [thewearify comparison](https://thewearify.com/airtasker-vs-taskrabbit/)

**Bark**
- Credit-based pricing: one guide cites ~$1.80 per credit (possibly not the AU price), with leads costing 3 to 20+ credits. Another says most leads cost $20–$70 to unlock. An Australian reviewer reported AU$156 a month for 5 leads (~$30 per lead). — [sidehusl.com](https://sidehusl.com/bark/); [Hook Agency](https://hookagency.com/blog/bark-reviews-contractors/); [Trustpilot Bark AU](https://au.trustpilot.com/review/bark.com?page=5)
- In late 2025 Bark moved to a "Marketplace" subscription model, which brought a surge of complaints about paid credits expiring and automatic charges. ProductReview rates Bark 3.2/5 from 676 reviews, with "Rates and fees" at 1.5. Credits are refunded generally only for invalid contact details. — [ProductReview Bark](https://www.productreview.com.au/listings/barkcom); [HelloPeter Bark review](https://www.hellopeter.com/barkcom/reviews/warning-to-service-providers-understand-what-you-are-paying-for-on-barkcom-6430647)

**Jim's Group (closest analogue: central number routing to franchisees)**
- A franchisee gets first right of refusal on jobs in its territory. A "Franchise Management System" works out which franchisee is taking work in an area at that moment. — [Jim Penman answers franchise questions](https://jims.net/jim-penman-answers-jims-franchise-questions/)
- Fees are a base monthly fee (average ~$750 a month in most divisions; ~$2,000 in lead-heavy divisions such as antennas, skip bins and trees) plus a per-lead fee of ~$9–$18. Jim's Electrical quotes $27.50 per lead. Jim's says lead fees discourage franchisees from ignoring clients, and it allows 15% "drop-off" for uncontactable clients. A contracts division charges ~10–15% of turnover on large contract jobs. — [Jim's franchise FAQs](https://jims.net/jims-franchise-faqs-answered/); [Jim's Electrical: better leads](https://jims.net/jims-electrical-franchise-better-leads/); [Jim's FAQ](https://jims.net/faq/). These are Jim's own promotional claims.

**ServiceSeeking**
- In 2019 it described itself as the only membership-fee-based portal in the sector (dated). — [Building Connection 2019](https://buildingconnection.com.au/wp-content/uploads/flipbooks/BC-Spring-2019/html/files/assets/basic-html/page-52.html)
- The Federal Court ordered ServiceSeeking to pay $600,000 in penalties over ~17,000 automatically published business reviews (2020). — [Flying Solo](https://www.flyingsolo.com.au/?p=1034281) (attribution to this specific URL is from search-summary context)

**AI entrants (2025–2026)**
- Chime Labs (Sydney, ex-Google founders) raised a $900k pre-seed for an AI voice receptionist that fields tradie calls, qualifies leads and books jobs. Lead generation is planned. — [Forbes Australia](https://www.forbes.com.au/news/innovation/this-ex-google-duo-just-raised-900k-to-build-an-ai-receptionist-for-aussie-tradies/)
- Other AU AI receptionists for tradies include TransferToAI (from A$99 a month, books into ServiceM8), VOCPhone, CallCatch and Service Magnet (listed in the National AI Centre directory). — [TransferToAI on Product Hunt](https://www.producthunt.com/products/transfertoai-australia-ai-receptionist); [VOCPhone](https://vocphone.com/blog/best-phone-system-for-tradies-australia-2026); [NAIC AI directory: Service Magnet](https://aidirectory.industry.gov.au/organisation/service-magnet)
- No Australian consumer-side "text a number, an agent gets a tradie to call you" competitor surfaced in searches. — [search, SmartCompany AI tag](https://www.smartcompany.com.au/tag/artificial-intelligence)

### Inferences
- **Implied incumbent lead value:** hipages ARPU of $2,475 a year across ~2.7m connections and 36.4k subscribers works out to ~74 connections per subscriber a year (~6 a month) and **~$33 per connection**. Revenue / connections gives the same answer ($90.6m / 2.7m ≈ $34). Jim's charges $9–$27.50 per lead plus ~$750 a month. Pay-per-lead challengers (WTD, Bark) charge ~$20–$70. So **$15–$40 per genuinely connected, exclusive call** is a defensible price band for trades. It undercuts hipages on an exclusive-lead basis, since a hipages lead is shared three ways.
- Airtasker's average task value is far smaller than hipages' renovation jobs, and Airtasker takes a percentage (12.5–20% plus 15.95%) rather than a lead fee. For "hang a poster today" jobs, the comparable is a ~$10–$20 take on a $60–$150 job, not a $30 lead fee.
- **What would make tradies switch** (inferred from the complaint patterns above): (1) the lead is exclusive or first-refusal, Jim's-style, not shared three ways; (2) they pay only when they actually connect with the customer, ideally verified by a bridged or tracked call; (3) job details come pre-qualified (suburb, photos, time window, budget signal, "customer is ready to talk now"); (4) no subscription, no auto-renew, no termination fee (the ACCC action makes this a credible pitch); (5) credits are refunded automatically when the customer does not pick up.
- hipages' FY26 pattern (revenue up, subscribers up, ARPU up 9%, connections flat to down) suggests tradies pay more per connection than before. That is the price-pressure gap a pay-on-connect entrant can exploit.
- hipages buying VIZ Insurance and shipping AI Smart Quotes shows the incumbent moving toward tradie SaaS and insurance, not toward real-time "callback in 15 minutes" consumer UX.

### Gaps
- ServiceSeeking 2026 pricing and current operating status: not found.
- Service.com.au business model and 2026 status: no search budget left. Not verified.
- hipages per-category credit prices in dollars: hipages does not publish them, and only anecdotal credit counts were found.
- hipages FY26 jobs-posted figure and exact connections number: the primary PDF could not be fetched.
- Bark's Australian per-credit price in 2026: unconfirmed.
- Direct Reddit or Whirlpool tradie threads on lead marketplaces: searches returned Trustpilot and ProductReview instead.
- **Unverified background knowledge:** Jim's central booking number is 131 546 (13 15 46). hipages was formerly branded HomeImprovementPages (the ProductReview listing slug "home-improvement-pages" is consistent with this).

---

## 3. Provider behaviour: responsiveness, channels, seasons, small jobs, AI calls

### Takeaway
Tradies are chronically hard to reach. Vendor and small tests show 10–60% of calls go unanswered, and an OpenAI/CommBank-reported survey found 45% of construction SMBs lost work through slow responses. Many tradies avoid small jobs because travel and setup costs are fixed. A fast-callback product will therefore succeed with *business types whose model is answering the phone* (emergency, 24/7 and small-job specialists), not with busy general tradies. AI receptionists are spreading fast among tradies, so your AI calls will increasingly reach *another AI*, and tradies are getting used to AI on the phone.

### Cited Findings
- In September 2026 reporting on OpenAI-commissioned research (with CommBank) covering 1,000+ Australian SMB owners, 45% of construction respondents said they had lost potential work because of slow response times. — [Dynamic Business](https://dynamicbusiness.com/article/commbank-and-openai-are-betting-ai-can-fix-the-tradie-admin-problem)
- The founder of AIssie (an AI receptionist vendor) says he called 180 Australian tradies during business hours as a genuine customer and 60% of calls went unanswered. The sample is small, the method self-reported, and the source has a vendor interest. — [Product Hunt / vendor posts](https://www.producthunt.com/posts/1215531) (attribution approximate; from search-summary)
- AIIMS Group, a Sydney agency, analysed 207,000+ inbound calls across 858 client businesses and found roughly 1 in 10 went unanswered. It is not trade-specific. — [Dynamic Business](https://dynamicbusiness.com/topics/news/that-missed-call-wasnt-nothing-it-was-a-customer-and-probably-a-sale.html)
- VOCPhone, a vendor, claims missed calls cost tradies ~$342k a year and that ~55% of voicemail callers never leave a message. No primary source is given. — [VOCPhone](https://vocphone.com/blog/missed-calls-costing-tradies-after-hours-fix-australia)
- International data: Invoca classified 44% of 70m tracked calls as missed. A UK study of 142 small businesses found 47% missed the initial call, while firms using a call-answering service answered 85%. — [JustCall stats roundup](https://justcall.io/blog/missed-call-statistics.html); [Alliance Virtual Offices](https://www.alliancevirtualoffices.com/virtual-office-blog/shocking-research-finds-small-businesses-miss-almost-half-of-incoming-calls/)
- 41% of UK adults say they have been "ghosted" by a tradesperson after asking for a quote. — [HomeServe UK](https://www.homeserve.co.uk/living/?p=9043)
- Older AU survey (PickAQuote, 1,222 people): 90% got at least two quotes before hiring, and tradespeople were "usually 58 minutes late". — [Dynamic Business](https://dynamicbusiness.com.au/general/reputation-trumps-price-when-hiring-tradesmen-2582011.html)
- **Small jobs:** tradespeople say travel, loading and unloading cost the same for small jobs as for big ones, so small jobs often aren't worth it. Some simply don't answer rather than turn a caller down. — [UK Business Forums](https://www.ukbusinessforums.co.uk/goto/post?id=1667762)
- A January 2026 Sydney Reddit post: most companies contacted "either don't reply or want to treat it like a full renovation", and "it's getting harder to get trades to show up unless it's a massive job". Replies suggested hipages or Airtasker. — [Reddit snapshot (Jan 2026)](https://reddit.sentinel-team.org/posts/1q6srce/snapshots/2026-01-10T03%3A30%3A23.83381Z)
- A small-jobs niche exists: an Ipswich handyman's listing says "all the property maintenance jobs that are too small for tradies I can help". — [Oneflare listing](https://cdn.oneflare.com.au/b/out-of-the-box-handyman)
- **AI on the phone:** AI receptionists for AU tradies now answer calls 24/7 "with a genuine Australian accent", capture job details and book into ServiceM8. VOCPhone texts the tradie the customer's name, address and need, and routes emergencies to the owner's mobile. — [TransferToAI](https://www.producthunt.com/products/transfertoai-australia-ai-receptionist); [VOCPhone](https://vocphone.com/blog/best-phone-system-for-tradies-australia-2026)
- Chime Labs estimates ~270,000 missed tradie calls a day, based on its own assumptions (5 calls a day, 18% missed). — [Forbes Australia](https://www.forbes.com.au/news/innovation/this-ex-google-duo-just-raised-900k-to-build-an-ai-receptionist-for-aussie-tradies/)
- Jim's builds in 15% "drop-off" for uncontactable clients, which shows that even a managed network loses a share of leads on the *consumer* side. — [Jim's FAQs](https://jims.net/jims-franchise-faqs-answered/)

### Inferences
- **Channel design:** a live AI voice call during working hours will often go unanswered (tradie on the tools) or hit an AI receptionist. Fire **SMS first** with a one-tap "Call them now" or "Claim job" link that carries the job summary, and run the voice call in parallel or as a fallback. SMS is read between jobs; voice is missed on site. When the call reaches an AI receptionist, pass a crisp structured brief (name, suburb, job, urgency, callback number), which those systems are built to capture and text to the owner.
- **Speed target:** "called back within 15 minutes" is realistic only with a *pre-opted-in* roster of providers who have agreed to that standard. Cold-dialing Google results in real time will mostly fail to reach someone within 15 minutes, given 10–60% non-answer rates and the time a tradie needs to call back. Plan to blast 3–5 providers in parallel and offer exclusivity to the first to claim.
- **Small jobs:** route "hang a poster", "assemble flat-pack" and "mount TV" requests to handymen and Airtasker-style odd-job providers, not licensed tradies. Bundling or "add-on while you're here" framing helps, as does presenting jobs with a clear minimum call-out fee.
- **Reaction to AI calls:** no direct evidence was found of how AU tradies react to *inbound* AI calls offering jobs. The spread of AI receptionists suggests rising tolerance, especially when the call is short, clearly a real customer job, and offers a free or exclusive lead. A "real customer is waiting right now" framing beats anything resembling telemarketing.

### Gaps
- No Australian primary data on tradie callback times for marketplace leads (e.g. hipages median response time).
- No direct evidence of tradies' attitudes to AI outbound calls or automated job texts.
- Busy-season data: not searched.
- How tradies qualify leads (budget questions, photos, suburb filters): no sourced data, only inference.
- **Unverified background knowledge:**
  - Peak AU trade demand runs into the pre-Christmas rush (Oct–Dec, i.e. right now), with a quiet period from late Dec to mid-Jan when many sole traders shut down for 2–3 weeks. Summer storms drive roofing, gutter and electrical emergencies. Air-conditioning peaks in summer. End-of-lease cleaning and removals peak at month-end and around university semesters.
  - Sole-trader tradies prefer SMS and phone over email and apps. Many run on ServiceM8, Tradify or Fergus job-management software.
  - Tradies commonly pre-qualify by suburb (travel radius), job size and "is the customer just shopping for quotes?"

---

## 4. Category selection: which 2–4 categories to launch with

### Takeaway
To prove "someone called me within 15 minutes", launch with categories whose providers *already run on answering the phone fast* and where customers have same-day urgency. Those are **emergency plumbing (incl. blocked drains and hot water), locksmiths, and handyman/odd jobs** (the hero "hang a poster by 3pm" use case). **Bond/end-of-lease cleaning or rubbish removal** is a fourth, supply-hungry category, with providers displaced by Oneflare's closure. High-value non-trade categories (mortgage, insurance, legal, real estate) pay the most per lead but carry real regulatory constraints. Mortgage broking is the most workable of them, and should come later.

### Cited Findings
- hipages' most in-demand trades (older data): handymen, plumbers, electricians, fencers, painters, cleaners, builders, concreters, tilers, carpenters. — [The Leader](https://www.theleader.com.au/story/5980417/hire-a-tradie-you-can-trust/)
- **Licensing thresholds for handyman work:** NSW requires a licence for residential building work of $5,000 or more (incl. GST, labour and materials). Electrical, plumbing and gasfitting need a licence at any value. "Handymen do not need a licence to operate – except in NSW." — [BizCover](https://www.bizcover.com.au/blog/handyman-licence-nsw/); [Upcover](https://www.upcover.com/blog/what-can-a-handyman-do-without-a-licence-in-australia)
- Queensland's threshold is reported as $3,300 incl. materials (the lowest), and SA and WA as $20,000. One source says $3,000 for QLD (conflict). Victoria is reported as $10,000 from a single commercial source, unconfirmed against the regulator. — [Upcover](https://www.upcover.com/blog/what-licenses-does-a-handyman-need-in-australia); [Airtasker handyman licence guide](https://www.airtasker.com/au/guides/tasker-handyman-licence/)
- **Lead prices as category signals:** Jim's lead-heavy divisions (antennas, skip bins, trees) pay ~$2,000 a month versus ~$750 average, and Jim's Electrical charges $27.50 per lead. — [Jim's FAQs](https://jims.net/jims-franchise-faqs-answered/); [Jim's Electrical](https://jims.net/jims-electrical-franchise-better-leads/)
- Lead cost rises with job size, complexity, location and demand (Oneflare, hipages). — [Oneflare](https://help.oneflare.com.au/hc/en-au/articles/12994962165529-How-are-leads-priced); [whatsthedamage](https://whatsthedamage.com.au/tradies/is-hipages-worth-it/)
- Consumers and tradies both rate electricians as the most trustworthy trade (hipages Tradie Trust Index, date unclear). — [Electrical Connection](https://electricalconnection.com.au/?p=30040)

**Non-trade, regulated categories**
- **Mortgage broking:** a broker must have a referral agreement with referrers who are not credit representatives or licensees, keep a register of referrers, and disclose referral processes to clients. A referrer that only passes on a contact, without suggesting a product or lender, is generally not giving credit assistance. Referrers must not give credit advice or influence product choice, and benefits must be disclosed with consumer consent. — [Sprintlaw](https://sprintlaw.com.au/articles/mortgage-broker-referral-agreements/); [MFAA via The Adviser](https://www.theadviser.com.au/compliance/48507-mfaa-calls-for-careful-targeting-in-any-referrer-reforms)
- Broker referral programs require the referrer to get the customer's written consent before passing on details, and prohibit charging the customer a fee for the referral. — [Bridgit broker T&Cs](https://www.bridgit.com.au/broker-terms-and-conditions); [Unloan referrer guide](https://support.referrals.unloan.com.au/en/articles/9073793-inform-give-disclose-your-guide-to-responsible-referring)
- **Lead-generation crackdown (financial services, 2026):** On 7 Apr 2026 Treasury released a consultation on curbing lead generation, prompted by the Shield and First Guardian collapses (~$1.1bn from ~11,000 investors). Proposals include requiring lead generators to hold an AFS licence or be supervised by licensees, extending anti-hawking rules, changing remuneration, and limiting the personal-advice cold-call exemption to existing clients. ASIC began reviewing advice licensees that use lead generators on 18 Feb 2026. Consultations closed around 22 May 2026, and no final legislation was found. — [Allens](https://www.allens.com.au/insights-news/insights/2026/04/curbing-lead-generation-activity/); [King & Wood Mallesons](https://www.mallesons.com/au/en/insights/latest-thinking/treasurys-post-shield-and-first-guardian-reforms-key-implications-for-superannuation-trustees.html); [Law Council submission](https://lawcouncil.au/resources/submissions/curbing-lead-generation-activity); [HSF Kramer submission](https://www.hsfkramer.com/notes/fsraustralia/2026-posts/hsf-kramer-submission-treasury-consultation-on-curbing-lead-generation-activity); [Money Magazine](https://www.moneymag.com.au/super-cold-calling-banned-after-aussies-lose-1-billion)

### Inferences — candidate category scorecard
All ratings below are **estimates** synthesised from the cited patterns plus background knowledge. Job-value and lead-value ranges are background estimates, not sourced figures; treat them as hypotheses to test.

| Category | Demand frequency | Same-day urgency | Provider callback speed | Typical job value (est.) | Lead value to provider (est.) | Supply density SYD/MEL/BNE | Licensing / safety | 15-min demo fit |
|---|---|---|---|---|---|---|---|---|
| Emergency plumbing / blocked drains / hot water | High | Very high | High (24/7 operators answer) | $200–$800; hot water $1.5k–$3k | High ($30–$80) | Very dense | Licensed (verifiable) | **Excellent** |
| Locksmith (lockouts, rekey) | Medium | Very high | Very high (emergency model) | $120–$350 | Medium–High | Dense | NSW security licence (bg) | **Excellent** |
| Handyman / odd jobs (poster, TV mount, flat-pack) | Very high | Medium–High | Medium (small-job specialists yes, tradies no) | $80–$400 | Low ($10–$25) | Very dense (incl. Airtasker taskers) | Low; NSW ≥$5k needs licence | **Good, hero use case** |
| Electrician (power out, faults) | High | High | Medium (busy, in short supply) | $150–$600 | High ($27.50 Jim's) | Dense | Licensed; high safety risk | Good, but supply less hungry |
| End-of-lease / regular cleaning | Very high | Medium (deadline-driven) | High (lead-hungry, many small operators) | $250–$700 bond clean | Medium | Very dense; Oneflare-displaced | Unlicensed; in-home trust | Good supply test |
| Rubbish removal / skip bins | High | Medium–High | High | $150–$600 | Medium–High (Jim's "lead-heavy") | Dense | Low; dumping compliance | Good |
| Removalists | Medium (seasonal) | Low–Medium (booked days ahead) | High (sales-led) | $500–$3,000 | High | Dense | Low; damage/insurance risk | Medium |
| Pest control | Medium | Medium | Medium–High | $150–$400 | Medium | Dense | Licensed (state) | Medium |
| Gardening / lawn mowing | Very high (recurring) | Low | Medium | $60–$200 | Low | Very dense (Jim's) | Low | Low (not urgent) |
| Painting | Medium | Low | Low (quote-driven, busy) | $1k–$10k+ | Medium–High | Dense | NSW licence above threshold | Poor for 15-min demo |
| Air-con / HVAC repair | Seasonal (summer) | High in heatwave | Medium | $200–$1,500 | High | Dense | Licensed (refrigerant + electrical) | Seasonal |
| Appliance repair | Medium | Medium | Medium | $150–$400 | Medium | Moderate | Electrical risk | Medium |
| Mobile mechanic / car services | Medium | Medium–High (breakdown) | Medium | $150–$800 | Medium | Moderate | Low–Medium | Medium |
| Mortgage broker | Low per person, very high value | Low–Medium | **Very high** (brokers call back in minutes) | Loan commission $2k–$6k+ upfront | **Very high** ($50–$300+) | Very dense | NCCP referrer rules; lead-gen reform | Excellent callback, regulatory care |
| Insurance (general / life) | Low | Medium (claims, new car) | High | Commission-based | High | Dense | AFSL / general advice / anti-hawking | Risky |
| Legal (PI, family, conveyancing) | Low | Medium | Medium | High | High | Dense | Referral-fee and claim-farming bans (bg) | Avoid at launch |
| Real estate (appraisal) | Low | Low | Very high | Very high | Very high | Dense | Rebate disclosure (bg) | Later |

- **Best 2–4 launch categories:** (1) **Emergency plumbing / blocked drains / hot water**: highest urgency, 24/7 operators, verifiable licences, and they pay real money. (2) **Locksmiths**: the lockout is the purest "call me now" moment, and providers expect instant calls. (3) **Handyman / odd jobs**: the brand-defining "hang a poster by 3pm" use case, with very high frequency and low licensing friction. (4, optional) **End-of-lease cleaning or rubbish removal**: lead-hungry supply, fast phone quoting, and Oneflare-displaced providers to recruit. Hold electricians as the next add: urgent, but supply is busier and less hungry.
- **Avoid at launch:** painting, renovation and building (slow quote cycles, low urgency), anything legal, and insurance. Mortgage broking is the best *monetisation* category: brokers pay well and call back fast. It needs a written referral agreement, customer consent, no product suggestions, and monitoring of the Treasury lead-generator reforms. Pilot it as a separate track once the trades proof exists.

### Gaps
- No sourced per-category lead prices in dollars (hipages and Oneflare don't publish them).
- No sourced supply counts per city (e.g. number of plumbers or locksmiths in Sydney). ABS business counts were not searched.
- No sourced data on demand frequency by category.
- **Unverified background knowledge:**
  - NSW requires locksmiths to hold a security licence (class 2D master locksmith or similar), checkable through Service NSW. Victoria and Queensland have no specific locksmith licence.
  - Pest controllers need state licences (e.g. NSW EPA pest management licence).
  - Legal: claim farming (personal injury and CTP) is banned in NSW and Queensland. Personal-injury advertising is restricted under state legal profession laws. Paying lawyers' referral fees for PI matters is high-risk.
  - Insurance: the s992A Corporations Act anti-hawking regime (reformed 2021) and general-advice rules apply. A purely factual introduction may be OK, but anything resembling a product recommendation needs an AFSL or authorised-representative status.
  - Real estate: NSW agents must disclose rebates and referral fees.
  - In NSW, home warranty insurance is required for residential building work over $20k, which signals that big building jobs are out of scope.

---

## 5. Trust and safety: verification, reviews, bad providers, liability

### Takeaway
Incumbents do light-touch vetting (licence and ABN checks, a "verified" badge) and generally **don't insure the job**. hipages explicitly extends no insurance, while Airtasker provides third-party liability cover for its taskers with exclusions, faulty workmanship among them. A new concierge can match them cheaply with automated ABN plus state-register checks, a collected public-liability certificate, and a strike system. It must avoid fake or auto-published reviews, which cost ServiceSeeking $600k, and position itself clearly as an introducer.

### Cited Findings
- hipages uses a "Trust and Quality" team that screens businesses by phone, checks licences and ABNs, and applies a "Verified" icon. Licence numbers appear on profiles (2019). hipages does not extend insurance to users, so consumers must check the business's own insurance. — [CHOICE](https://accounts.choice.com.au/?p=762140); [CHOICE find-a-tradie websites](https://www.choice.com.au/shopping/shopping-for-services/services/articles/find-a-tradie-websites); [The Interiors Addict](https://theinteriorsaddict.com/?p=4462)
- A Trustpilot reviewer alleges a loss caused by a hipages profile with no real licence verification (single unverified account). hipages says account suspensions and bans "are never taken lightly and are not issued as retaliation". — [Trustpilot hipages](https://ch.trustpilot.com/review/hipages.com.au?page=9)
- Airtasker insurance is third-party liability cover for registered Taskers, covering injury or property damage they cause to others during non-excluded tasks. It excludes the Tasker's own injury or property, criminal, malicious or intentional acts, and faulty workmanship. Non-registered workers are not covered, an excluded-activities list applies, and the Tasker pays the excess. — [Airtasker support: insurance](https://support.airtasker.com/hc/en-au/articles/23363113132057-What-do-I-need-to-know-about-Airtasker-s-Insurance-Coverage); [Airtasker insurance page](https://www.airtasker.com/au/insurance/)
- Public liability insurance covers third-party injury and property damage caused by a contractor. Certificates should be current for the duration of the works. — [BHG Australia](https://www.bhg.com.au/5-things-you-need-to-know-before-hiring-a-tradie); [Domain](https://www.domain.com.au/news/nine-tips-for-hiring-reliable-tradespeople-20160120-gm8tgw/)
- Victoria's BPC shows licence status and conditions and keeps a Prosecution and Disciplinary Register (not exhaustive). — [BPC](https://www.bpc.vic.gov.au/find-and-check-a-practitioner)
- NSW's Trades API checks whether a licence is valid and covers a given work type. — [api.nsw Trades API](https://api.nsw.gov.au/Product/Index/25)
- NSW Fair Trading disclaims liability for losses from inaccurate or incomplete API information. — [api.nsw Conveyancer API](https://api.nsw.gov.au/Product/Index/17)
- ServiceSeeking was penalised $600k over ~17,000 automatically published reviews. — [Flying Solo](https://www.flyingsolo.com.au/?p=1034281)
- hipages gave the ACCC an enforceable undertaking over auto-renewal and termination-fee disclosure. — [ACCC](https://www.accc.gov.au/media-release/tradie-platform-hipages-rectifies-subscription-trap-issues)
- hipages acquired a majority stake in VIZ Insurance in FY26, a sign that insurance is becoming part of the incumbent's tradie offer. — [InvestSMART](https://www.investsmart.com.au/investment-tools/shares/asx-price-sensitive-announcements/asx-hpg/2492495)

### Inferences
- **Minimum viable verification stack (cheap, mostly automated):** (1) ABN active, with the name matching the business (ABR, free). (2) Licence valid for the work type: NSW Trades API, the Victorian BPC register (open data plus search), and the QBCC search, run manually where there's no API. (3) Public-liability certificate collected as a photo at onboarding, with expiry tracked. (4) Mobile verified by two-way contact. (5) Show the provider's Google rating live at request time with attribution, but don't store it.
- **Licensed vs unlicensed routing:** for plumbing, electrical and gas, route only to providers whose licence check passes. For handyman jobs in NSW, flag any job likely to exceed $5k. Never route electrical sub-jobs (e.g. "install a light") to handymen.
- **Bad providers:** keep a response-time and outcome score. Text the customer after each connection ("Did X call you? Did they turn up?") and use the answers for auto-demotion or a three-strike removal. Never publish auto-generated reviews (the ServiceSeeking precedent).
- **Liability:** position the service as an *introduction* (like hipages), with the provider contracting directly with the customer. Disclose clearly that the concierge does not perform or insure the work. Consider later partnering with an insurer (Airtasker-style third-party liability) as a differentiator.
- **Contract terms with providers:** no lock-in, no auto-renew. This is a selling point, and it avoids the ACCC "subscription trap" risk.

### Gaps
- No search on the platform's own liability under the Australian Consumer Law, or on unfair-contract-terms exposure in provider agreements.
- No data on police and background checks for in-home providers in AU marketplaces.
- **Unverified background knowledge:**
  - ACL consumer guarantees (due care and skill) apply to the concierge's own matching service and cannot be fully excluded.
  - Since Nov 2023 the unfair contract terms regime carries penalties and covers standard-form contracts with small businesses, i.e. the provider T&Cs.
  - Airtasker offers ID verification badges.
  - Energy Safe Victoria licenses VIC electricians, separately from BPC.

---

## 6. Recommended launch categories and city, and a supply-acquisition plan for the first 200 providers

### Takeaway
Launch in **Sydney**, concentrated in 3–4 dense, high-income, iPhone-heavy areas (e.g. Inner West, Eastern Suburbs, Lower North Shore, CBD fringe), with **emergency plumbing, locksmiths and handyman/odd jobs**, and optionally **end-of-lease cleaning**. Recruit ~200 opted-in providers, about 50 per category, through human-led outreach, with a "free exclusive leads, pay only when connected, no contract" offer. Verify each one with ABN and NSW licence APIs.

### Cited Findings (supporting the choice)
- NSW offers a machine-readable licence-check API (Trades API, free tier 2,500 calls a month), which makes automated verification easiest in Sydney. — [api.nsw Trades API](https://api.nsw.gov.au/Product/Index/25)
- Victoria's BPC register is open data and searchable, a strong second-city option. — [DataVic BPC register](https://discover.data.vic.gov.au/dataset/bpc-building-practitioner-register)
- Oneflare closed on 30 June 2026, displacing its paying providers (who had used credit plans of 110–5,000 credits). — [Oneflare help](https://help.oneflare.com.au/hc/en-au/articles/58074479988377-Oneflare-is-closing-here-s-what-you-need-to-know); [Oneflare credit plans](https://help.oneflare.com.au/hc/en-au/articles/47483859076889-What-Are-Credit-Plans-on-Oneflare)
- hipages raised plan prices in July 2026 and keeps 6-month and 12-month lock-ins, so tradies have a live grievance. — [whatsthedamage](https://whatsthedamage.com.au/tradies/hipages-cost/); [PricingSaaS](https://pricingsaas.com/companies/hipagesgroup/diffs/2026W28)
- Pay-per-lead price anchors: Jim's $9–$18 (Electrical $27.50), WTD from $25, Bark ~$20–$70, implied hipages ~$33 per connection (derived). — [Jim's](https://jims.net/jims-franchise-faqs-answered/); [WTD](https://whatsthedamage.com.au/faq/); [Hook Agency](https://hookagency.com/blog/bark-reviews-contractors/)
- Spam Act inferred consent covers relevant B2B messages to conspicuously published addresses, provided they include identification and an unsubscribe. — [ClickSend](https://help.clicksend.com/article/koy07xgcjj-australian-spam-regulations-v2)

### Inferences — the plan

**Why Sydney.** It is the largest metro, and job values and lead values are highest there. It has the best automated licence verification (NSW Trades API covers plumbers and electricians in one place), and it is the core market for hipages and Airtasker, so price and lock-in grievances are concentrated there. The trade-off is that the NSW handyman licence threshold of $5k means handyman jobs need a size check. Melbourne is the fallback, or the founder's home city if different: the in-person hustle matters more than the marginal market differences.

**Liquidity math, illustrative.** To make "called within 15 minutes" reliable, each category × zone needs roughly 8–12 opted-in providers who have committed to a 15-minute response, because only some will be free at any moment. 4 zones × 3–4 categories × ~12 gives ~150–200 providers. That matches the 200 target and suggests going deep in a few zones rather than covering all of Sydney.

**Week 0–1: build the target list (no stored Google data).**
1. For each category × suburb cluster, run Places (New) Text Search, e.g. "emergency plumber Marrickville" or "locksmith Bondi Junction". Keep only `place_id`s in a prospect queue.
2. When working a prospect, fetch Place Details live to get the phone and website. Check the business on ABN Lookup (active ABN, matching name) and the NSW Trades API (licence for plumbers; NSW security licence for locksmiths, checked manually).
3. Supplement with displaced-Oneflare cleaners and handymen, providers advertising in local community Facebook groups (manual, no scraping), and Airtasker handymen who promote their own business names and numbers off-platform (contact via their own website or number, not via Airtasker messaging).

**Week 1–4: human-led outreach (founder calls, then SMS and email).**
- Make the first contact a **human phone call within telemarketing hours**, with a 30-second pitch: "I run a new service where customers text us and we get a local tradie to call them within 15 minutes. Leads are exclusive to you (first to claim), you pay nothing for your first 10 connected jobs, then $X only when you actually speak to the customer. No subscription, no contract. Can I text you jobs in [suburbs]?"
- Capture **express consent** on the call: "Yes, text and call me with jobs, including after hours." Record it, then send a confirmation SMS with an opt-out. This converts each provider from inferred to express consent and removes most Spam Act and Telemarketing Standard risk for later AI calls and texts.
- Follow up non-answers with a Spam-Act-compliant SMS or email to the published business contact, identifying the sender, with an unsubscribe option, and relevant to their trade.
- **"Live lead" acquisition (Wizard-of-Oz):** when a real consumer request arrives for a category or zone with thin supply, the founder (or the AI, during calling hours) contacts unrecruited providers with that specific job. A real job is the strongest pitch possible. Expect the conversion rate on this to be far higher than on cold pitches (not measured).

**Offer design (pricing hypotheses to test).**
- First 10 connected jobs free, then a pay-per-connection fee of **~$15 for handyman and cleaning, ~$25–$40 for locksmith and plumbing**. This is anchored below hipages' implied ~$33 shared-lead cost and in line with Jim's and WTD.
- "Connected" means the provider's call to the customer is verified (bridged or tracked number, or customer confirmation). Charges are refunded automatically if the customer doesn't answer.
- Exclusive, first-to-claim routing with a 5–10-minute claim window, then cascade to the next provider.
- Pre-qualified brief: suburb, job description, photos, time window, and whether the customer is ready to talk now.

**Supply quality and retention.**
- Onboard with an ABN check, licence check, PL certificate photo and a test text.
- Score each provider on claim time, callback time, and customer-confirmed outcome. Rank routing by score. Demote or remove after 3 no-shows or customer complaints.
- Send a weekly SMS summary to each provider ("You got 4 jobs, earned ~$X, paid $Y"), the reverse of the hipages complaint about paying with no visibility.
- Keep a WhatsApp or SMS broadcast group per category for "urgent job in X, who's free?" during the pilot.

**Targets.** In weeks 1–2, recruit 60 providers (20 plumbers, 15 locksmiths, 25 handymen) in 2 zones and run founder-generated test requests to measure time-to-callback. In weeks 3–6, scale to 200 across 4 zones, with cleaning or rubbish removal as the fourth category. Success metric: median time-to-callback under 15 minutes and over 80% of requests receiving a callback within 30 minutes during 7am–7pm.

### Gaps
- No empirical data on provider conversion rates for cold outreach, or on willingness to pay per connected call. Both must be tested.
- No sourced per-zone supply counts for Sydney.
- The founder's home city is unknown, and could override Sydney for in-person execution reasons.
- The Telemarketing Standard calling-hours specifics and their applicability to job-alert calls to opted-in providers are background knowledge. Confirm with ACMA guidance or a lawyer before running after-hours AI calls.
