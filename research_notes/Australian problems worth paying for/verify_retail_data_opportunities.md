# Verifying two retail and hospitality data opportunities: (1) post-surcharge-ban card-cost and repricing tool, (2) consented multi-merchant POS data for franchisors, buying groups and brands (as of 18 October 2026)

How this was researched:
- I used all 30 of my web searches. WebFetch failed with DNS errors on all four attempts (thenewdaily, myzeller, commbank and startmerchantservices), so **every cited finding below comes from search-result summaries, not full-page reads.** Exact wording and numbers should be spot-checked before anyone quotes them externally.
- Labels: **[BK]** marks background knowledge that I did not verify here, and **[INF]** marks my own inference.
- I do not repeat what the two earlier sweeps already established: the RBA cap levels, the A$910m saving estimate, small merchants paying about three times more, Lightspeed Payments lock-in, Naranga's weak integrations, Lightspeed Pulse, Loaded, Tenzo, Franpos, and the Alloy portal point.

---

## Q1. Opportunity 1: what has actually happened since 1 October 2026 (RBA mechanics, acquirer repricing, merchant reaction, Amex)?

### Takeaway
The ban is in force. Some of the "did my provider pass on the cut" question has already been answered in public:
- **Big banks cut flat rates.** Westpac went from 1.20% to 0.79% and CommBank from 1.10% to 0.99%.
- **Stripe made a token cut**, from 1.70% to 1.65%.
- **Square, Zeller and Tyro published no rate change.**
- **Amex voluntarily stopped surcharging** as well.

Merchant reaction so far is modest. About 17% of tracked cafes raised prices straight after 1 October, typically by 50c on a flat white. The first acquirer benchmarks (due 30 October 2026) cover the *pre-reform* quarter.

### Cited Findings
**RBA mechanics and timing**
- The first merchant-fee publications from large acquirers are due **30 October 2026**, covering **1 July–30 September 2026**. After that they are published quarterly, within 30 days of quarter end — [RBA Conclusions Paper, ch. 8](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/impact-and-implementation.html); [NAB merchant support](https://www.nab.com.au/business/payments-and-merchants/merchant-support-centre/rba-surcharging-changes).
- The obligation applies only to acquirers that process **more than A$10bn of card transactions a year** in Australia and have direct merchant relationships. Data is split by merchant size and card type. The RBA also runs its own quarterly collection that splits interchange, scheme fees and acquirer margin — [RBA Conclusions Paper, ch. 8](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/impact-and-implementation.html).
- Older context (2021 RBA paper): average cost of acceptance was about 1.5% for merchants with under A$100k in annual card transactions, and about 0.9% for A$100k–A$1m — [RBA Conclusions Paper, ch. 8](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/impact-and-implementation.html) (as summarised by search).
- Older context (RBA, March 2023): weighted-average merchant service fee (MSF) was 0.89% for credit and 0.21% for debit — [Dynamic Business / COSBOA](https://dynamicbusiness.com.au/topics/news/australia-is-not-the-worst-country-for-merchant-fees-but-its-not-the-best-either-cosboa.html).
- The ban works through card-network rules and merchant contracts, not a new ACCC prohibition — [Sprintlaw](https://sprintlaw.com.au/articles/card-surcharge-rules-2026/); [LegalVision](https://legalvision.com.au/2026-ban-credit-card-surcharges/).
- **Still legal:** weekend and public-holiday surcharges, and booking or service fees — [creditcard.com.au](https://www.creditcard.com.au/credit-card-surcharge-ban/); [IT Brief](https://itbrief.com.au/story/australia-bans-card-payment-surcharges-on-major-networks).
- The ACCC says merchants may build card costs into prices but must not mislead customers about the reasons for price rises. It also says disguising a surcharge as another fee is likely to be misleading — [Sprintlaw](https://sprintlaw.com.au/articles/card-surcharge-rules-2026/); [LegalVision](https://legalvision.com.au/2026-ban-credit-card-surcharges/); [ChannelNews](https://www.channelnews.com.au/businesses-slammed-for-inflated-card-fees-accc-cracks-down/).

**How acquirers repriced**

| Provider | What changed | Sources |
|---|---|---|
| **Westpac** | Flat rate for EFTPOS terminals and PayWay fell from **1.20% to 0.79%** from 1 Oct 2026, for eligible new and existing customers. Westpac calls it "the lowest in market among the major banks and merchant acquirers" and estimates a typical small business saves about **A$80 a month**. Terminal rental starts at A$24.75 a month. | [Westpac media release, 24 Sep 2026](https://www.westpac.com.au/about-westpac/media/media-releases/2026/24-september/); [SmartCompany](https://smartcompany.com.au/finance/westpac-cuts-merchant-fees-in-race-to-october-1-surcharge-ban) |
| **CommBank** | Single Rate Per Transaction fell from **1.10% to 0.99%** from 1 Oct 2026. It applies automatically to existing eligible customers on Smart Mini, Smart and Smart Integrated. Interchange Plus and Interchange Plus Plus (IC+/IC++) customers adjust automatically to the new caps. Sources disagree on whether Amex is inside the 0.99% (it is "subject to approval"). | [CommBank newsroom, Aug 2026](https://www.commbank.com.au/articles/newsroom/2026/08/commbank-reduces-fee-card-surcharging.html); [CommBank SRPT page](https://www.commbank.com.au/business/payments/eftpos-terminals/fees/single-rate-per-transaction.html); [SmartCompany](https://www.smartcompany.com.au/finance/cba-lowers-merchant-fees-ease-small-business-pressure-surcharge-ban/) |
| **Stripe** | Standard domestic rate fell from **1.70% to 1.65%** (+30c online; in-person 1.7% + 10c went to 1.65% + 10c). | [Prospa](https://www.prospa.com/blog/the-surcharge-ban-is-in-heres-how-card-costs-supplier-bills-and-rewards-are-shifting); [Merchant Compare](https://merchantcompare.com.au/articles/merchant-fees-after-surcharge-ban) |
| **Square, Zeller, Tyro** | **No merchant rate change** on 1 Oct 2026. Each announced only that surcharging would be switched off, a "feature change rather than a rate change". Square argued that scheme fees and provider margins are not capped. | [Merchant Compare](https://merchantcompare.com.au/articles/merchant-fees-after-surcharge-ban); [Prospa](https://www.prospa.com/blog/the-surcharge-ban-is-in-heres-how-card-costs-supplier-bills-and-rewards-are-shifting) |
| **Square (current rates)** | 1.6% card-present for sellers signed up on or after 30 May 2024. 1.9% on Reader and Tap to Pay for older sellers. 2.2% online. | [Square AU help](https://squareup.com/help/au/en/article/5068) |
| **Zeller (current rates)** | 1.4% in person, or 1.2% with Zeller's own POS and terminal. | [QwikPay](https://qwikpay.com.au/resources/compare/stripe-merchant-fees) |
| **Tyro** | Removes Tyro-managed surcharging on eftpos, Mastercard, Visa *and* Amex automatically. Any cost reduction "will depend on your individual circumstances". The reforms do not affect Tyro's financial guidance. | [Tyro, 31 Mar 2026](https://www.tyro.com/?p=49232); [Motley Fool](https://www.fool.com.au/2026/03/31/this-asx-payments-stock-jumped-after-a-key-rba-decision/) |
| **NAB, ANZ, Lightspeed Payments AU, Adyen** | No rate-change announcements found (see Gaps). | — |

Other evidence on pass-through:
- **Stripe's own wording** (quoted on a user forum): it is "passing through all of the savings… based on our actual mix of card types processed, rounded to the nearest 0.05%" — [Australian Frequent Flyer forum](https://www.australianfrequentflyer.com.au/community/posts/3030525/). This is a forum quote, not a primary source.
- **Rate cuts are uneven.** A forum commenter says interchange cuts range from 0bp (commercial cards, Amex) to 50bp (consumer credit). They also say third-party platforms are "choosing not to lower their fees" — [Australian Frequent Flyer forum](https://www.australianfrequentflyer.com.au/community/posts/3030525/).
- **Lightspeed help centre:**
  - Its pages still describe the surcharge rule as "must not exceed the processing rate… never exceed 3%" — [Lightspeed X-Series support](https://x-series-support.lightspeedhq.com/hc/articles/29764612166811).
  - A separate Lightspeed note says fees are now charged on order value only, not on surcharges. Its region is unclear — [Lightspeed O-Series support](https://o-series-support.lightspeedhq.com/hc/en-us/articles/31329244568091-Update-to-Lightspeed-Payment-Fees).

**Amex (sources conflict)**
- An Amex spokesperson said American Express "will align with these changes from 1 October 2026". Amex is closed-loop and outside the RBA's legal scope — [Flighthacks](https://flighthacks.com.au/american-express-will-end-surcharges/); [OrbitRemit](https://blog.orbitremit.com/what-is-credit-card-surcharge-australia/).
- ASBFEO and processor guidance (Worldpay, eWay) list Amex as covered — [ASBFEO](https://asbfeo.gov.au/resources-tools-centre/card-surcharging-ban); [Worldpay](https://platforms.worldpay.com/en/?p=2137).
- Zeller's material also lists Amex — [Zeller](https://www.myzeller.com/au/support/prepare-your-business-for-the-end-of-surcharging).
- The Mondaq and OrbitRemit pieces suggest businesses may still legally surcharge Amex.
- **Net position:** Amex surcharging has ended in practice through Amex's own commercial commitment, not through regulation.

**How merchants reacted**
- A price database tracking more than 1,500 cafes found **17% raised prices immediately after 1 October**. The typical rise was about **50c on a flat white**, and the average flat white is now **A$5.16**. The source cautions that "a rise after 1 October isn't necessarily because of the surcharge rules" — [The New Daily, 7 Oct 2026](https://www.thenewdaily.com.au/themoneyedition/cost-of-living/2026/10/07/price-of-coffee-jumps-50c-in-some-cafes-after-card-surcharge-ban).
- The RBA expected any resulting price rises "to be negligible" — [The New Daily](https://www.thenewdaily.com.au/themoneyedition/cost-of-living/2026/10/07/price-of-coffee-jumps-50c-in-some-cafes-after-card-surcharge-ban).
- A Canberra cafe owner said folding card costs into base prices penalises cash buyers — [Canberra Times](https://www.canberratimes.com.au/story/9306403/small-businesses-speak-out-ahead-of-credit-card-surcharge-ban/?src=rss%2F).
- The Australian Restaurant & Cafe Association (ARCA) CEO said venues that always passed fees on will now absorb them, and "most will likely raise menu prices" — [Toast AU blog](https://pos.toasttab.com/au/blog/on-the-line/credit-card-processing-fees).
- Before the ban, the Australian Hotels Association asked for debit and credit MSFs to be separated. Pubs pay about A$1 per A$100 versus about 1c for supermarkets (as reported) — [AHA submission](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2025-07/submissions/pdf/australian-hotels-association.pdf); [PubTIC](https://pubtic.com.au/card-surcharge-ban-under-debate/).
- Consumers paid an estimated A$1.6bn a year in surcharges, and the credit interchange cap falls from 0.8% to 0.3% — [UTS](https://www.uts.edu.au/news/2026/04/banning-card-surcharges-will-make-paying-simpler-but-not-necessarily-cheaper).
- Headline only, body not read: "Card surcharge ban will take time to work through: bank" — [Canberra Times / ACM](https://www.canberratimes.com.au/story/9361283/card-surcharge-ban-will-take-time-to-work-through-bank/).

### Inferences
- **[INF] The "did my provider pass on the cut" question is mostly answerable from public rate tables for flat-rate merchants**, who are the target segment:
  - Big-bank flat-rate customers got cuts of 11–41bp.
  - Stripe customers got 5bp.
  - Square, Zeller and Tyro flat-rate customers got nothing.
  - IC+/IC++ customers got the cut automatically.

  A merchant only needs to know their provider and plan. That is a one-line answer, not a recurring audit.
- **[INF] The real arbitrage is switching, and the gap is large.** For a cafe with A$600k of card turnover a year:

  | Provider | Annual card fees |
  |---|---|
  | Square (1.6%) | about A$9.6k |
  | Zeller (1.4%) | about A$8.4k |
  | CommBank (0.99%) | about A$5.9k |
  | Westpac (0.79% plus about A$300 a year terminal rental) | about A$5.0k |

  The free comparison sites (Q2) already surface this. The binding constraint is POS integration (which terminals a merchant's POS supports), not information.
- **[INF] The first acquirer benchmark (30 Oct 2026) covers July–September 2026, before the cut.** It will show old prices, so the first post-reform benchmark lands around 30 January 2027. Enhanced statements follow on 1 April 2027. The window in which a third-party tool has an information edge is therefore about October 2026 to April 2027, roughly six months.
- **[INF] Merchant repricing so far is small and intuitive** (17% of cafes, about 50c on a coffee). That weakens the case that merchants need software to decide which prices to raise.
- **[INF] Weekend and public-holiday surcharges remain legal**, which gives hospitality a non-software recovery lever. ACCC "misleading reasons" risk also limits how aggressively a repricing tool can market "pass the ban on to customers".

### Gaps
- No NAB, ANZ, Lightspeed Payments AU, Adyen, Smartpay or Windcave rate announcements were found. Lightspeed Payments AU matters most for this founder.
- The cafe price database behind The New Daily's 17% figure is not named in the snippet.
- I could not read the Westpac release in full, so the "eligible customers" definition is unconfirmed.
- I could not verify which acquirers clear the A$10bn threshold. **[BK]** Likely the big four, Tyro, Square, Stripe and Adyen; possibly Zeller.
- No AU Reddit or Whirlpool merchant threads surfaced: one search returned only RBA submissions.

---

## Q2. Opportunity 1: who competes, what do they charge, and will the RBA benchmarks and April 2027 statements remove the need?

### Takeaway
The niche the earlier sweep thought was empty is not empty:
- A free comparison site (Merchant Compare) already publishes "which banks cut fees" and a surcharge calculator.
- An Australian payments consultancy (Payments Consulting Network / Merchant Advisory) runs association-backed fee-comparison programs, with liquor-retail pilots showing 34–42% savings.
- US-style brokers work on 50/50 savings contingency.
- Industry associations (Queensland Hotels Association (QHA), Retail Drinks Australia, Australian Retailers Association (ARA)) promote fee reviews.

No SMB fee-audit SaaS price point was found in Australia. The benchmarks plus April 2027 statements will remove most of the remaining information gap within about six months.

### Cited Findings
**Merchant Compare (merchantcompare.com.au)** — [Merchant Compare](https://merchantcompare.com.au/articles/merchant-fees-after-surcharge-ban); [calculator](https://merchantcompare.com.au/compare/credit-card-surcharge-calculator)
- Free comparison content: "Which Banks Cut Merchant Fees? (Oct 2026)".
- A "Credit Card Surcharge Calculator: What the 2026 Ban Will Cost You".

**Payments Consulting Network**
- An Australian advisory firm operating since 2013. Its comparison service, Merchant Pricing Hub, is now **Merchant Advisory** — [IQPC profile](https://www.iqpc.com/events-customershow/mediapartners/payments-consulting-network); [ARA](https://retail.org.au/news-and-insights/new-website-to-test-banks-on-merchant-fees).
- The comparison site does not take introduction fees from acquirers. Its business case rests on generating advisory work for the parent firm — [ARA](https://retail.org.au/news-and-insights/new-website-to-test-banks-on-merchant-fees); [COSBOA](https://www.cosboa.org.au/post/australian-sme-payments-summit-wrap-up-and-recording).
- Claimed savings (vendor claims) — [COSBOA summit](https://www.cosboa.org.au/post/australian-sme-payments-summit-wrap-up-and-recording); [Dynamic Business](https://dynamicbusiness.com.au/topics/news/australia-is-not-the-worst-country-for-merchant-fees-but-its-not-the-best-either-cosboa.html):
  - 5–10% by changing plan with the same bank;
  - 20–30% by comparing providers;
  - 20–40% with expert advice.
- **Retail Drinks Australia program:** independent liquor store fees run A$5k–A$25k+ a year. The pilot found an average saving of **42% (A$4,244)** with the best alternative provider, and a later pilot found **33.75% (A$3,785)**. These figures are from 2021–23 — [BankingDay](https://bankingday.com/liquor-retailers-slash-merchan-fees-with-comparison-service); [The Shout / National Liquor News](https://theshout.com.au/national-liquor-news/?p=6286).

**Other competitors and channels**
- **Associations:** QHA ran "Could your business save thousands in merchant EFTPOS fees?" — [QHA](https://qha.org.au/?p=6197).
- **US contingency model:** brokers review 3–6 months of statements, typically split savings 50/50, monitor monthly, and charge nothing if they find no savings — [Merchant Cost Consulting (US)](https://merchantcostconsulting.com/credit-card-processing-consultant-how-it-works).
- **Free vendor content** (all acquirer or POS marketing, i.e. free substitutes) — [Thriday](https://www.thriday.com.au/blog-posts/how-to-reduce-eftpos-fees-and-payment-costs); [Lightspeed AU blog](https://www.lightspeedhq.com/au/blog/understanding-and-avoiding-merchant-service-fees/); [Telstra](https://www.telstra.com.au/smarter-business/business-operations/introduction-to-eftpos); [Venue Smart](https://venuesmart.co/lower-interchange-fees-are-coming/); [Prospa](https://www.prospa.com/blog/the-surcharge-ban-is-in-heres-how-card-costs-supplier-bills-and-rewards-are-shifting); [AusBanking explainer](https://www.ausbanking.org.au/surcharging/).
- **Switching inertia:** a Canstar study found almost two in three merchants believe they could get a better deal, but fewer than one in four switch. The search summary did not tie this to one URL among [Dynamic Business](https://dynamicbusiness.com.au/featured/dont-let-your-business-give-you-an-eftpos-hangover-this-new-year.html) and [Telstra](https://www.telstra.com.au/smarter-business/business-operations/introduction-to-eftpos), so attribution is unconfirmed.
- **What the benchmarks and statements will provide:** large-acquirer fee data by merchant size and card type, quarterly from 30 Oct 2026, plus the RBA's own split of interchange, scheme fees and margin — [RBA Conclusions Paper, ch. 8](https://www.rba.gov.au/payments-and-infrastructure/review-of-retail-payments-regulation/2026-03/conclusions-paper/impact-and-implementation.html). Enhanced merchant statements begin 1 April 2027 (Tyro's summary of "extra disclosure requirements for large acquirers") — [Tyro](https://www.tyro.com/?p=49232).

### Inferences
- **[INF] The only demonstrated WTP is contingency or advisory work** (Merchant Advisory, US brokers) and association member benefits, not SaaS subscriptions. The economics:
  - About A$3.8–4.2k saved per liquor store at 25–50% contingency gives **A$1–2k once per merchant**.
  - That is a services or lead-generation business, not recurring software.
- **[INF] Will benchmarks and statements remove the need? Mostly yes, by mid-2027.**
  - Benchmarks by size and card type, plus statements that itemise cost by card type, let a merchant or their bookkeeper compare their own rate in minutes.
  - What remains is the *action* (switching is constrained by POS integration and inertia) and *pricing decisions*. Neither has shown WTP.
- **[INF] The founder's POS data is not the scarce input for a fee audit.** The scarce inputs are:
  - the acquirer statement or plan;
  - which terminals the merchant's POS integrates with;
  - an acquirer referral relationship.

  Per prior notes, Lightspeed AU merchants are largely locked to Lightspeed Payments or Tyro, so the switching lever is weakest for exactly the founder's installed base.
- **[INF] Acquirers have strong incentives to win switchers with their own calculators and repricing offers.** Westpac's 0.79% is a land-grab, which compresses any independent auditor's margin.

### Gaps
- No Australian SMB fee-audit SaaS (subscription) product or price was found. The absence is consistent across three searches, but it is not proof.
- I could not confirm whether Merchant Advisory or Merchant Compare are still active, what they charge, or their 2026 traffic.
- Whether Lightspeed AU will expose card-scheme or debit/credit splits in POS payment records, so that effective rate by card type could be modelled without the statement, is unknown. **[BK]** Typically only the tender name is stored.
- I found no direct merchant quotes from October 2026 complaining that their provider did not pass on the cut.

---

## Q3. Opportunity 1: price points, buyer counts, wedge, channel, first 10 customers, kill criteria, founder head start, and verdict

### Takeaway
**Kill as a standalone product.** At most, keep a free "surcharge-recovery and card-cost check" as a lead magnet or feature inside a broader Lightspeed app. Whether provider X cut fees is already public, the only proven WTP is contingency brokerage, the information gap closes by April 2027, and the founder's asset covers only the least-valued piece (item-level repricing).

### Cited Findings
- **Price points found:**
  - Contingency brokerage: 50/50 savings split (US) — [Merchant Cost Consulting](https://merchantcostconsulting.com/credit-card-processing-consultant-how-it-works).
  - Australian comparison: free to merchants, monetised through advisory — [ARA](https://retail.org.au/news-and-insights/new-website-to-test-banks-on-merchant-fees).
  - Typical savings per liquor store: A$3.8–4.2k a year — [BankingDay](https://bankingday.com/liquor-retailers-slash-merchan-fees-with-comparison-service).
  - Westpac's typical small-business saving: about A$80 a month — [Westpac](https://www.westpac.com.au/about-westpac/media/media-releases/2026/24-september/).
- **Cafe repricing scale:** 17% of more than 1,500 tracked cafes, typically +50c — [The New Daily](https://www.thenewdaily.com.au/themoneyedition/cost-of-living/2026/10/07/price-of-coffee-jumps-50c-in-some-cafes-after-card-surcharge-ban).

### Inferences
- **[INF] Price points:**
  - SaaS: A$19–49 a month is the plausible ceiling for a monitoring tool, with high churn after the one-off decision.
  - A contingency at 25–33% of first-year savings yields about A$500–2,000 once per merchant.
  - Neither is evidenced by an Australian SaaS precedent.
- **[INF] Buyers:** about 266k retail and hospitality businesses (prior notes, ABS). The relevant subset is surcharging merchants on flat-rate plans with providers that did not cut (Square, Zeller, Tyro, possibly Lightspeed Payments). This is a large count but a low, one-off ARPU.
- **[INF] Best wedge, if pursued at all:** a free Lightspeed-marketplace add-on. It would:
  - pull card turnover by tender from POS;
  - ask for the provider and plan;
  - show the public rate comparison and the dollar gap;
  - simulate item-level price rises that recover the lost surcharge (the founder-fit piece).

  Monetise through referral to Merchant Advisory or brokers, or as an acquisition funnel for the founder's other product. Do not build statement parsing.
- **[INF] First 10 "customers"** would be partners, not merchants:
  1. Payments Consulting Network / Merchant Advisory, for data-for-referral.
  2. Retail Drinks Australia, QHA and ARCA, which have run fee programs.
  3. Two or three Lightspeed-focused bookkeepers.
- **[INF] Kill criteria** (already largely met):
  1. Of 30 Lightspeed or Square merchants shown a free report, fewer than 5 would pay A$29+ a month after seeing the result.
  2. Acquirers or POS vendors ship equivalent calculators. Merchant Compare already has one.
  3. Lightspeed Payments AU cuts its rate, removing the "not passed on" story for the founder's base.
- **[INF] Founder head start: small.**
  - The asset supplies card turnover and item-level sales for repricing simulation.
  - It does not supply the statement, acquirer pricing, POS–terminal compatibility or switching relationships, which are where the value and WTP sit.
- **Re-score (1–10):**

  | Criterion | Score | Reason |
  |---|---|---|
  | Pain | 6 | Real, but cushioned by bank cuts and small, intuitive price rises |
  | WTP evidence | 3 | Contingency and associations only; no SaaS |
  | Solution gap | 3 | Free comparison sites, broker programs, acquirer cuts, benchmarks, 2027 statements |
  | Market size | 5 | Many merchants, one-off ARPU |
  | Founder feasibility | 6 | Repricing piece only |
  | Defensibility | 2 | — |
  | **Total** | **25/60 (4.2/10)** | Down from 37/60 (regulation sweep) and 5.7 (retail sweep) |

  **Verdict: KILL as a standalone product.** Fold a free version into another product as a top-of-funnel feature.

### Gaps
- I did not test whether Lightspeed's AU app marketplace would list a tool that recommends switching away from Lightspeed Payments. **[INF]** Likely a policy conflict.
- **[BK, unverified]** NZ also legislated an in-store surcharge ban, but its status, date and acquirer reactions were not checked.

---

## Q4. Opportunity 2: who serves franchisors and buying groups with cross-store POS data in Australia today, at what price, and how many buyers exist?

### Takeaway
The earlier sweep's premise that "POS vendors only report within one merchant account" is **wrong for Square and Lightspeed R-Series**, and partly wrong for Australian single-POS franchise systems:
- Square now has a **Multi-Account Suite** with organisation reporting across separate Square accounts (US terms dated 17 Aug 2026, applying from 8 Oct 2026).
- Lightspeed Retail markets franchise HQ access and "segment reports across multiple retail accounts".
- Retail Express (Maropost, AU) runs 100+-store franchise networks.
- Vertical POS vendors and wholesalers already aggregate independents: Retail Edge in jewellery, and Metcash's SSA in grocery, liquor and hardware.

The residual gap is **mixed-POS networks** (buying groups, loose licensee networks) and **Lightspeed X-Series networks, if X-Series lacks multi-account HQ**, which is unverified. No AUD prices are published by any franchise-software vendor.

### Cited Findings
**Square**
- **Multi-Account Suite:** "organization tools for sellers whose operations span multiple Square accounts under one organization". The owner account links member accounts and manages access. Its terms are dated 17 August 2026 and apply to all sellers on 8 October 2026 (US terms) — [Square legal (US)](https://squareup.com/us/en/legal/general/franchise).
- Square's franchise page lists organisation reporting, centralised permissions and corporate menu controls — [Square franchises](https://squareup.com/us/en/point-of-sale/restaurants/franchises).
- An AU version of the franchise legal page exists — [Square legal (AU)](https://squareup.com/au/en/legal/general/franchise).
- The legacy "Square for Franchises" links franchisee accounts into one franchise account with shared customer, loyalty and gift-card data — [Square legal](https://squareup.com/legal/general/franchise).
- Domo for Square (2019) offered consolidated reporting across multiple Square accounts via the Square App Marketplace — [Nasdaq/Domo](https://www.nasdaq.com/press-release/announcing-domo-for-square-a-new-application-to-help-merchants-with-multiple-square).
- A developer forum thread notes that franchises where each location has its own merchant account need separate OAuth connections in third-party apps — [Square developer forum](https://developer.squareup.com/forums/t/supporting-franchise-merchants-in-a-white-labeled-app-multi-merchant-multi-location-setup/23649).

**Lightspeed**
- Lightspeed Retail franchise offering: full admin for corporate HQ, limited access for franchisees, and "HQ can view segment reports for multiple retail accounts in one place" (Canadian Franchise Association listing) — [CFA supplier directory](https://cfa.ca/supplier-directory/listing/lightspeed).
- Case studies:
  - Your CBD Store (Sunmed): 180+ Lightspeed stores, comparing performance across franchises — [Lightspeed](https://lightspeedhq.com/customers/your-cbd-store).
  - Fast-Fix (US): over 150 locations, using Lightspeed Accounting's dashboard to compile data from every store — [Lightspeed AU site](https://www.lightspeedhq.com/au/customers/fast-fix-jewelry-and-watch-repairs/).
- Lightspeed AU markets to hospitality franchise groups against Redcat — [Lightspeed vs Redcat](https://www.lightspeedhq.com/au/lightspeed-vs-redcat/).

**Retail Express (Maropost, AU)**
- A franchise POS that maintains "information flow" between head franchisor and franchisees — [Retail Express blog](https://retailexpress.com.au/blog/franchise-pos-and-stock-control-software-can-be-a-boon-to-franchise-businesses).
- A testimonial cites a single customer view across 100+ franchise stores (Forty Winks) — [Retail Express demo page](https://retailexpress.com.au/pos/book-a-demo).
- It offers a BI layer plus a Phocas integration — [Retail Express/Phocas](https://retailexpress.com.au/pos-integrations/marketing-analytics/phocas).

**Vertical aggregators and wholesaler-owned POS**
- **Retail Edge Consultants** (AU, founded 2005 by jewellers):
  - "The Edge" POS in **400+ jewellery businesses**.
  - Benchmarking across "hundreds of Australian stores".
  - Works with buying groups. Listed in Zeller's partner hub.
  - Source: [Zeller partner hub](https://www.myzeller.com/au/partner-hub/retail-edge-consultants).
- **Edge Retail Academy** (US): its Edge Pulse aggregates sales and inventory from **1,100+ stores**. Vendors subscribe to aggregated sell-through and need each retailer's approval for product-level data — [The Retail Jeweler](https://www.theretailjeweler.com/new-noteworthy/2019/08/09/edge-retail-academy-aggregates-data-from-over-1100-stores.html); [Edge brochure](https://devuser.edgeuser.com/Portals/0/Documents/Edge_Retail_Academy_Brochure.pdf). Its link to Retail Edge Consultants is unconfirmed.
- **Metcash** acquired SSA, a POS provider to independent grocery, liquor, hardware, fuel and convenience retailers — [RetailBiz](https://retailbiz.com.au/?p=15094). Attribution comes from the search summary; the article was not read.

**Buying groups**
- Leading Edge Group is described as Australia's largest retail buying group. It changed its operating model to "provide a wider range of support to members" — [Wikipedia](https://en.wikipedia.org/wiki/Leading_Edge_Group); [The Music Network](https://themusicnetwork.com/?p=48642).
- Jewellery: in 2010, three buying groups covered 860 stores, 32% of 2,699 independents (old data) — [Jeweller Magazine](https://jewellermagazine.com/Article/13684/2023-Buying-Groups-Report-Numbers-Rule-the-Jewellery-Universe).
- Hardware: Natbuild and Hardware & Building Traders — [trade.gov](https://www.trade.gov/index.php/market-intelligence/australia-tools-and-equipment).

**Franchise-software prices**
- **Naranga:** "Pricing is per location – further information is available on inquiry". The listing names only Canada and the US as available countries — [Software Advice AU](https://www.softwareadvice.com.au/software/90907/naranga-franchise).
- **FranConnect:** "Contact vendor for pricing"; "trusted by 1,500+ franchise and multi-location brands" — [Capterra AU](https://www.capterra.com.au/software/79205/franconnect-franchise-software).

**Buyer counts**
- 2023 FCA report: an estimated **1,267 franchise systems and 94,000+ units**, based on a June 2023 survey of 65 brands, so not directly comparable with Griffith's series — [franchise.co.nz](https://franchise.co.nz/articles/3684-the-state-of-franchising-in-australia). Attribution is from the search summary.
- Griffith's 2014 survey: **1,160 systems** — [Business Franchise Australia](https://businessfranchiseaustralia.com.au/news/franchising-australia-2014-survey-released-griffith-universitys-asia-pacific-centre).
- 2008: about 1,100 — [APH](https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Corporations_and_Financial_Services/Completed_inquiries/2008-10/franchising/report/c03).
- No 2025 Griffith figure was found.

### Inferences
- **[INF] Most franchise systems mandate one POS**, so their HQ reporting comes from the POS vendor: Square Multi-Account, Lightspeed R-Series franchise, Retail Express, and **[BK]** Redcat, H&L and Bepoz in hospitality. That removes the biggest assumed segment.
- **[INF] The remaining buyers:**
  - (a) franchise or licensee networks on a POS **without** native multi-account HQ, with Lightspeed X-Series the key unknown;
  - (b) buying groups and co-ops whose members run mixed POS;
  - (c) brands selling to independents.
- **[INF] Buyer count is small.** Of about 1,270 franchise systems, a large share are food or services (**[BK]**). Retail networks with separately owned POS accounts on a POS lacking HQ federation might be 5–15%, about 60–190 networks.
- **[INF] AU revenue ceiling** at A$10–20k a year each: about **A$0.6–3.8m ARR**, plus perhaps a few dozen buying groups. Scale would need NA, UK or EU Lightspeed networks.
- **[INF] Vertical incumbents occupy the most data-hungry buying-group verticals:** jewellery (Retail Edge, 400+ stores) and grocery, liquor and hardware (Metcash/SSA). The best remaining verticals are those where Lightspeed X-Series or Shopify POS is common, such as fashion, gift and homewares, bikes, outdoor and toys (**[BK]**).

### Gaps
- **Critical, unverified:** whether Lightspeed **X-Series** (ex-Vend) offers multi-account franchise HQ reporting in AU/NZ. The CFA listing likely refers to R-Series. **[BK]** X-Series supports multi-outlet within one account; cross-account support is unknown.
- Whether Square's Multi-Account Suite is live in AU (only the US terms were seen; an AU franchise legal page exists).
- No AUD price for any franchise reporting tool; Naranga's AU availability is doubtful.
- The number of AU buying groups and their members' POS mix.
- No direct franchisor or buying-group complaints (forums, trade press) were found within budget.

---

## Q5. Opportunity 2: do Lightspeed's API terms allow a third-party app to aggregate separately owned merchants' data with consent, and are there marketplace precedents?

### Takeaway
Probably yes, with caveats:
- X-Series add-ons "registered independently by developers… can be connected to multiple retailers", each with the retailer's express consent through Lightspeed's interface.
- Precedents exist for showing one merchant's Lightspeed data to a different company: Quivers (brands see retailer inventory, launched on Lightspeed), Orderchamp, and Lightspeed's own NuORDER brand network.

The licence's "extend the functionality of Lightspeed's products" wording, and the agreement revised on 20 May 2025, need a legal read before building a franchisor or brand-facing data product. Lightspeed itself is the biggest platform risk because NuORDER is building brand-side sell-through.

### Cited Findings
**API licence and consent model**
- X-Series docs distinguish **Personal Tokens** (one retailer's own account) from **Add-ons**, which are "registered independently by Developers, and can be connected to multiple retailers". Features "are only accessible with retailers' consent" — [Lightspeed X-Series API intro](https://x-series-api.lightspeedhq.com/docs/introduction).
- The legacy Vend API licence (via vendhq.com/terms) — [vendhq.com/terms](https://www.vendhq.com/terms):
  - grants a "worldwide, non-exclusive, non-sublicensable, non-transferable and revocable" licence;
  - says developers may use the API "only to create applications which extend the functionality of Lightspeed's products and services";
  - requires the merchant to "expressly consent… through Lightspeed's interface".
- The Lightspeed API License Agreement was updated, effective **20 May 2025**, so the vendhq text may be outdated — [TOS Tracker](https://tostracker.app/document/vend-pos).

**Partner program**
- There is an integration-partner track. Approved partners appear in the App Marketplace, there is no fee to apply, and commercial terms vary by partner type — [Partnerfleet directory](https://partner-program-directory.partnerfleet.io/partners/lightspeed-integration-partners-program); [Lightspeed AU partners](https://lightspeedhq.com.au/partners).
- The Lightspeed eCom App Market pitches "over 150k paying merchants" — [Lightspeed eCom](https://lightspeedhq.com/ecom/app-market-partners).
- No developer revenue-share figure was found.

**Precedents for cross-company data flows on Lightspeed**
- **Quivers:** brands sync inventory from *their retailers'* POS into the brand's e-commerce, starting with a Lightspeed integration — [SalesTechStar](https://salestechstar.com/sales-marketing/quivers-launches-new-point-of-sale-inventory-sync-that-lets-brands-offer-advanced-fulfillment-options-based-on-accurate-inventory-data-from-external-retailers/).
- **Orderchamp:** a wholesale marketplace with Lightspeed (UK) POS sync — [Lightspeed UK integrations](https://www.lightspeedhq.com/uk/integrations/orderchamp/).
- **Lightspeed B2B / NuORDER:**
  - The 2022 launch promised brands "direct insight into sell-through data across retailers in the Lightspeed ecosystem" — [Bicycle Retailer](https://bicycleretailer.com/announcements/2022/06/12/lightspeed-launches-groundbreaking-b2b-network-connect-brands-and-retailers); [Lightspeed B2B launch](https://www.lightspeedhq.com/news/lightspeed-b2b-launch/).
  - The 2025 PO Sync sends Lightspeed Insights retailer forecasts to NuORDER suppliers. The network covers 4,000+ brands and 100,000+ retailers — [Lightspeed IR, 2025](https://investors.lightspeedhq.com/English/newsroom/news-details/2025/Lightspeed-Commerce-Revolutionizes-Inventory-Replenishment-Ordering-as-Part-of-Lightspeed-NuORDER/default.aspx); [Lightspeed news](https://www.lightspeedhq.com/news/lightspeed-commerce-revolutionizes-inventory-replenishment-ordering-as-part-of-lightspeed-nuorder/).
  - Lightspeed sells a B2B wholesale platform with POS–NuORDER two-way sync — [Lightspeed B2B wholesale](https://www.lightspeedhq.com/pos/retail/b2b-wholesale-platform/).

### Inferences
- **[INF]** A multi-retailer add-on with per-retailer consent is the standard Lightspeed model, and the founder's OAuth integration presumably already uses it. Showing retailer A's data to franchisor or brand B has precedent (Quivers, NuORDER). Retailer consent should therefore be the gating requirement, not a prohibition.
- **[INF] The "extend Lightspeed's functionality" clause** and any data-resale or benchmarking restrictions in the May 2025 agreement could bar *selling aggregated data to brands*, as opposed to providing it to a franchisor the retailer belongs to. Treat brand-paid data products as higher legal risk than franchisor tools.
- **[INF] Lightspeed is both platform and competitor.** It has explicitly targeted brand sell-through (NuORDER) and franchise HQ reporting (R-Series), so the founder's most defensible position is mixed-POS (Lightspeed + Shopify + Square) networks, where no single POS vendor can be the aggregator.

### Gaps
- I could not read the current Lightspeed API License Agreement (post May 2025) or the X-Series add-on listing criteria. WebFetch was down.
- Whether NuORDER's brand sell-through sharing operates in AU, and whether retailers opt in or out, is unknown.
- API rate limits for multi-retailer add-ons and K-Series and R-Series equivalents were not checked.

---

## Q6. Opportunity 2: consignment and stockist sell-through for wholesale brands — pain evidence and existing tools

### Takeaway
There is pain, but most of it is described by vendors. Practitioners say brands without their own retail must rely on emailed sell-out files. Lightspeed is "not built for consignment".

The tools are crowded or bundling:
- consignment POS replacements (SimpleConsign, ConsignR, Ricochet, Trace);
- Shopify payout apps (PuppetVendors);
- brand-retailer data-sharing apps (Impulso, Quivers);
- Lightspeed's own NuORDER.

No Lightspeed X-Series consignment add-on serving AU was found again, and no AU WTP evidence was found.

### Cited Findings
- Without their own retail channel, brands must rely on retailer-shared sales reports, EDI extracts and weekly or monthly sell-out files, because shipments do not show consumer sales — [click2buy](https://click2buy.com/en/without-e-commerce-here-is-how-i-really-measure-my-in-store-sales.md).
- Daasity separates wholesale data (sales to retailers) from POS data (final consumer sale) and ingests retailer-portal data — [Daasity](https://help.daasity.com/analysis-and-playbooks/retail-analytics-resources/retail-pos-and-wholesale-101).
- **Impulso** (Shopify app) shares real-time data between brand and retailers to improve in-season sell-through. It had no reviews — [Shopify App Store](https://apps.shopify.com/impulso-integration?locale=pl).
- Lightspeed "assumes the store owns all inventory" and does not split revenue with consignors (a vendor comparison) — [SimpleConsign](https://www.simpleconsign.com/blog/lightspeed-vs-consignment-software).
- **ConsignR** is listed on Capterra AU: it tracks and disburses vendor payouts and integrates with Shopify POS — [Capterra AU](https://www.capterra.com.au/software/1063439/consignr).
- **PuppetVendors** automates consignor payouts on Shopify, with per-vendor, product, SKU and category commission rules — [PuppetVendors](https://puppetvendors.com/automate-consignor-payouts-shopify).
- Edge Pulse shows a precedent of vendors paying for retailer-consented sell-through in one vertical (US jewellery) — [The Retail Jeweler](https://www.theretailjeweler.com/new-noteworthy/2019/08/09/edge-retail-academy-aggregates-data-from-over-1100-stores.html).

### Inferences
- **[INF] Consignment on Lightspeed X-Series is a real feature gap,** but the market is small and low-ARPU. Merchants with real consignment volume switch to consignment POS or Shopify plus a payout app.
- **[INF] Brand-side stockist sell-through has precedent WTP** in the US (Edge Pulse vendors, Alloy and Quivers customers). In AU it faces two problems:
  - a cold-start problem, because a brand needs most of its stockists connected;
  - NuORDER bundling inside the Lightspeed ecosystem.

  The best version is **brand-sponsored**: the brand pays, and stockists get a free auto-reorder or consignment statement in exchange for consent.

### Gaps
- No count of AU wholesale brands selling to 50+ independent stockists, and no AU consignment-retailer count.
- No AUD price points for ConsignR, PuppetVendors, Impulso or Quivers were captured.
- I found no AU brand or retailer quotes about sell-through pain.

---

## Q7. Opportunity 2: price points, wedge, channel, first 10 customers, kill criteria, founder head start, and verdict

### Takeaway
**Downgrade.** It is still the better of the two ideas, and the only one where the founder's asset is a real (if modest) head start, but the solution gap is much smaller than the retail sweep assumed:
- Square Multi-Account Suite, Lightspeed R-Series franchise HQ, Retail Express, Retail Edge and Metcash/SSA cover most single-POS networks and two big buying-group verticals.
- NuORDER targets brand sell-through.

Keep only as a **narrow 60–90-day test**: Lightspeed X-Series and mixed-POS franchise, licensee and buying-group networks in AU/NZ fashion, gift, homewares, bike, outdoor and toy retail. Make it conditional on confirming X-Series has no cross-account HQ reporting.

### Cited Findings
- No AUD prices: Naranga is per-location on inquiry and FranConnect is "contact vendor" — [Software Advice AU](https://www.softwareadvice.com.au/software/90907/naranga-franchise); [Capterra AU](https://www.capterra.com.au/software/79205/franconnect-franchise-software).
- Buyer pool: about 1,267 franchise systems (FCA 2023 estimate) — [franchise.co.nz](https://franchise.co.nz/articles/3684-the-state-of-franchising-in-australia). Named buying groups include Leading Edge Group — [Wikipedia](https://en.wikipedia.org/wiki/Leading_Edge_Group).
- Native competitors: [Square Multi-Account Suite](https://squareup.com/us/en/legal/general/franchise); [Lightspeed franchise HQ (CFA)](https://cfa.ca/supplier-directory/listing/lightspeed); [Retail Express](https://retailexpress.com.au/blog/franchise-pos-and-stock-control-software-can-be-a-boon-to-franchise-businesses); [Retail Edge](https://www.myzeller.com/au/partner-hub/retail-edge-consultants); [Lightspeed NuORDER](https://www.lightspeedhq.com/news/lightspeed-b2b-launch/).
- Platform model: multi-retailer add-ons with retailer consent — [Lightspeed X-Series API](https://x-series-api.lightspeedhq.com/docs/introduction).

### Inferences
- **[INF] Price points (no AU comparables found):**
  - Network roll-up and royalty reporting at **A$25–50 per store per month**. A 30-store network pays A$750–1,500 a month, or A$9–18k a year.
  - Buying groups at A$500–2,000 a month flat.
  - The brand sell-through add-on at A$200–1,000 a month per brand, with stockists free.
- **[INF] Best wedge:** "Franchise and licensee royalty plus network sales roll-up for Lightspeed X-Series networks, with Shopify POS second."
  - Royalties are a recurring, money-linked monthly task. The earlier sweep found franchisors still using spreadsheets and email, though that evidence came from a vendor.
  - It uses the existing connector directly.
  - Only after it is live, add buying-group and brand sell-through views.
  - Avoid Square-only networks (native Multi-Account Suite), jewellery (Retail Edge) and grocery, liquor and hardware (Metcash/SSA).
- **[INF] Channels:**
  - the Lightspeed AU/NZ integration-partner listing and Lightspeed AU account managers, who handle franchise prospects that R-Series or X-Series HQ features don't fit;
  - the FCA supplier directory;
  - franchise accountants (Bentleys-type firms, per prior notes);
  - buying-group head offices in X-Series-heavy verticals.
- **[INF] First 10 customers:**
  - Build a list from Lightspeed AU/NZ customer stories and the FCA member directory, filtered to retail brands with 10–100 independently owned outlets and no mandated enterprise POS.
  - Approach 3–5 buying groups in gift, homewares, fashion, bike or toy retail. Leading Edge Group is a named target, but its members' POS mix is unknown.
  - Approach 2–3 AU wholesale brands with 50+ Lightspeed or Shopify stockists for a sponsored sell-through pilot.
  - I deliberately do not name specific franchisors, because none was verified as an X-Series network.
- **[INF] Kill criteria:**
  1. Lightspeed confirms X-Series (or an AU rollout of R-Series franchise HQ) supports cross-account franchise reporting.
  2. Fewer than 25 AU/NZ networks with 10+ separately owned X-Series or Shopify-POS stores can be identified.
  3. Fewer than 3 paid pilots at ≥A$500 a month within 90 days. This keeps the retail sweep's criterion.
  4. A legal read of the May 2025 Lightspeed API licence prohibits sharing a merchant's data with its franchisor or with brands, even with consent.
  5. More than half of prospects already run a mandated single POS with native HQ reporting.
- **[INF] Founder head start: real but measured in months, not years.**
  - A working, resumable, item-level Lightspeed OAuth sync plus SQL, pivots and dashboards is the hardest *engineering* piece of a consented roll-up for Lightspeed networks.
  - But it covers one POS family, and buying groups need Square, Shopify and vertical POS connectors.
  - Native HQ features now exist at Square and Lightspeed R-Series.
  - The real moat would be a consent network across many retailers, which does not exist yet.
- **Re-score (1–10):**

  | Criterion | Score | Reason |
  |---|---|---|
  | Pain | 5 | Vendor-asserted spreadsheet royalty pain; no first-hand complaints found |
  | WTP evidence | 4 | FranConnect has 1,500+ brands; Edge Pulse vendors pay; no AUD prices |
  | Solution gap | 4 | Down from 7: native multi-account at Square and Lightspeed R-Series, Retail Express, vertical aggregators, NuORDER |
  | Market size | 3 | AU ceiling about A$1–4m ARR |
  | Founder feasibility | 7 | — |
  | Defensibility | 5 | A consent network is sticky, but there is platform risk from Lightspeed |
  | **Total** | **28/60 (4.7/10)** | Down from 6.0/10 in the retail sweep |

  **Verdict: DOWNGRADE.** Keep only as a cheap, time-boxed validation of the X-Series and mixed-POS franchise/licensee wedge. Do not rank it as the lead idea without answers on X-Series multi-account and the API licence.

### Gaps
- The X-Series multi-account HQ question and the current API licence are the two decisive unknowns. Both need a direct read of Lightspeed docs or a call with Lightspeed's partner team.
- No AU franchisor or buying-group interviews or quotes were found, and no AUD WTP data.
- I could not size AU franchise systems by POS vendor or by retail versus food share.
- **[BK, unverified]** NZ: Vend began in NZ, so X-Series penetration may be higher there. NZ franchise system counts were not checked.
