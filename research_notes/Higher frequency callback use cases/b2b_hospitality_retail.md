# Hospitality and retail venue operators as the buyer for a "text a number, the right human calls you within minutes" dispatch line (Australia, Melbourne focus, as of October 2026)

**Method note.** I used all 28 allotted web searches. I tried WebFetch once (vixxo.com) and it failed with a DNS error (`getaddrinfo ENOTFOUND`), so every finding below comes from search-result snippets and summaries, not full-page reads. Where a search summary gave figures without saying which result page they came from, I flag it. Labels used throughout:
- **[BK]** means background knowledge or my own assumption, not verified this session.
- **[INF]** means an inference from the cited findings.
- **(Older)** marks data dated before 2025.
- "Reused" marks facts taken from sibling notes in this repo, cited to their original sources.

This note builds on `business_power_users.md`, which ranked "hospitality venues: repairs and urgent services" #2 at 41/60. It does not repeat that note's findings: the Service Sphere $148.50 diagnostic fee and ~$375 average job, the Segafredo $140 service-centre fee, the 16.9k Victorian cafés and restaurants (2023), the staffing platforms, labour-hire licensing, or the general leakage analysis. It refers to them only where needed.

**Bottom line up front.**
- Hospitality is a credible business beachhead, and probably the best one *for this founder*. US platforms (86 Repairs, ResQ) have raised tens of millions of dollars building "one call for restaurant repairs", which shows the need, the frequency (about 1.5 critical-equipment failures per location per month in US chain data) and willingness to pay.
- No Australian equivalent serving 1–10-venue independents surfaced.
- Three things limit the opportunity:
  - Single-site independents have thin margins and high churn: 12% of cafés and restaurants closed in the year to July 2026.
  - The most frequent fault, the coffee machine, often already has a go-to technician through the roaster.
  - Landlords own some repairs under Victoria's Retail Leases Act.
- The founder's Lightspeed integration is a real advantage for distribution and onboarding (venue profile, ROI on downtime), but only a modest advantage for *detecting* failures.

---

## Q1. Frequency: how often do venues need urgent or non-routine repair help, and how often is the usual supplier unavailable?

### Takeaway
The only hard frequency data is from the US and covers chains:
- **86 Repairs (older, 2020):** operators reported a critical piece of equipment going down about **1.5 times a month per location**.
- **ServiceChannel (2025 benchmark):** **1M+ work orders across 16,441 quick-service locations** and **694k+ across 4,874 full-service locations** (2022–2024 data). That works out to roughly 20–60 work orders per QSR location and 47–142 per full-service location, depending on whether the totals are annual or three-year.

No Australian survey or insurer dataset surfaced. The best Australian signal is one Melbourne coffee-machine service company handling **40–50 jobs a day, rising to 80 at busy times**. I found no data at all on how often a venue's usual supplier is unavailable.

### Cited Findings
**US frequency benchmarks (vendor platforms, chain-skewed)**
- **86 Repairs "State of Repairs" (older, 1 Oct 2020):** a critical piece of equipment at a limited-service location breaks down about **one and a half times a month**. The survey polled 250 operators of limited-service brands as well as fine-dining locations. The trade headline reads "15 monthly", which is a formatting artefact of "1.5". — [QSRweb (2020)](https://www.qsrweb.com/news/restaurants-endure-at-least-15-monthly-equipment-issues/); [FastCasual (2020)](https://www.fastcasual.com/news/restaurants-endure-at-least-15-monthly-equipment-issues/)
- **86 Repairs 2021 data:** reach-in refrigerators were the second most common equipment type needing repair, and almost half of those repairs were because the unit was running too warm. — [FER (2021)](https://fermag.com/articles/top-10-types-of-equipment-issues-in-2021)
- **ServiceChannel Restaurant Facilities Benchmark 2025:**
  - QSR: over 1 million work orders across **16,441 QSR locations**, from **4,475 service providers**, using data from 2022 through 2024.
  - Full-service (FSR): over **694,000 work orders across 4,874 locations** over the same period.
  - FSRs spent **US$120,879** on repair, maintenance and capex, with an **average invoice of US$928** in 2024.
  - The report says brand standards, provider quality, geography, and asset intensity, age and condition all affect volume.
  - The full report is gated, so these definitions were not checked. — [ServiceChannel Benchmark Report 2025 (PDF)](https://servicechannel.com/wp-content/uploads/2025/02/ServiceChannel-Benchmark-Report-2025-R5-DIGITAL.pdf); [Bar & Restaurant](https://www.barandrestaurant.com/operations/new-report-empowers-operators-make-better-repair-maintenance-spending-decisions)
- **Intelligentics survey for Parts Town** (reported second-hand by trade outlets; the original was not retrieved):
  - Average critical-equipment downtime is about **six hours**, but **42%** of respondents reported downtime of **a day or more**.
  - **22%** of operators never consider the cost of downtime.
  - The average operator loses about **US$615 per day** when critical equipment fails.
  - The search summary did not tie each figure to a specific page. — [Facilitator (Aug/Sep 2024)](https://facilitator.mydigitalpublication.com/articles/streamlining-success); [FastCasual survey](https://www.fastcasual.com/articles/survey-restaurant-operators-are-optimistic-but-equipment-costs-squeeze-cash-flow/)

**Australian and Melbourne signals**
- One Melbourne coffee-machine servicing company says it receives about **40–50 servicing jobs a day in Melbourne, rising to 80 at busy times**. Its founder says a technician can be "the difference between the café being able to get up and operating again or potentially not serving coffee". The search summary attributed this to BeanScene's technician feature. — [BeanScene](https://www.beanscenemag.com.au/coffee-technicians-the-industrys-unsung-heroes/)
- **Coffee Machine Technologies** (Melbourne area) advertises **60+ technicians available around the clock**. — [HospitalityHub listing](https://hospitalityhub.com.au/coffee-machine-technologies/s/45799)
- The same provider says it can respond "often within a matter of hours and in time for peak service". It notes that weekends are the busiest trading period and that downtime "can quickly spiral into lost sales". This is the company's own marketing, and the search summary did not identify the exact page; it appeared alongside BeanScene results. — [BeanScene](https://www.beanscenemag.com.au/57483-2/)
- Planned coffee-machine servicing is recommended **every eight months for venues using more than 16 kg of coffee a week**, and yearly for lower volumes (a vendor recommendation). — [Mahalia Coffee](https://mahaliacoffee.com.au/blogs/news/commercial-coffee-machine-maintenance)
- (Older, 2021) Melbourne CBD café Cup of Truth crowdfunded the repair of its La Marzocco Strada after it broke. Customers pledged the money within two days. This shows how existential one equipment failure can be for a tiny venue. — [Good Food (2021)](https://www.goodfood.com.au/eat-out/news/completely-overwhelmed-loyal-customers-raise-funds-to-support-muchloved-melbourne-cafe-20210702-h1wvzy)

### Inferences
- **[INF] Applying the US benchmarks to an Australian independent:**
  - The 86 Repairs figure of about 18 critical failures a year comes from chain QSRs with a heavy equipment load (fryers, ice machines, walk-ins).
  - A Melbourne independent café has less kit: espresso machine, grinder, under-counter fridges, glass or dish washer, maybe a cool room.
  - A plausible range for **unplanned, urgent calls** is about **0.5–1.5 a month per café** and **1–3 a month per full-service restaurant or pub kitchen**, across coffee machine, refrigeration, warewasher, plumbing and drains, gas and cooking equipment, electrical, locks and glass, pest, POS and network, and exhaust.
  - This is an estimate built from the US data, not a measurement.
- **[INF] Reconciling the ServiceChannel numbers:** FSR spend of US$120,879 at an average invoice of US$928 implies about **130 invoices per location per year**. That is close to the 142-per-location reading of the 694k FSR work orders, which suggests the work-order totals may be annual rather than three-year. But spend includes capex, and US chain FSRs are large, so treat 47–142 a year as the range for big-chain full-service sites. Independent Australian venues would sit well below it.
- **[INF] Indirect evidence on supplier availability:**
  - 42% of US operators report downtime of a day or more.
  - The Melbourne coffee-tech firm's daily volume nearly doubles at peak.
  - Weekends are the busiest trading period while after-hours rates are 1.5–2x.
  - Together these suggest the "regular tech can't come today" scenario is common at peaks and weekends. The size of that share is unmeasured.
- **[INF] Retail stores (non-food) have materially lower repair frequency** than hospitality: no commercial kitchen, no refrigeration, no gas. Their urgent needs are mostly locks, glazing after break-ins, electrical, HVAC, and POS or network faults. In shopping centres, centre management handles much of the base building [BK]. **Food retail** (bakeries, delis, butchers, liquor stores and convenience stores with cool rooms) behaves more like hospitality. For this product, "retail" should mean food retail first.

### Gaps
- No Australian survey, industry-association data, or insurer data (machinery-breakdown or stock-spoilage claims) on breakdown frequency was found. Insurer data was not searched because of the budget.
- No data on the share of incidents where the usual supplier cannot attend in a useful time. This is the most important number for the product, and only discovery interviews or pilot data can supply it.
- The original Parts Town/Intelligentics report and the full ServiceChannel 2025 report (definitions, per-location annual counts, trade mix) were not retrieved.
- Retail repair frequency is not evidenced; it rests on [BK].

---

## Q2. What downtime costs, and what venues already spend on callouts and maintenance

### Takeaway
Australian callout pricing for commercial work is rarely published. The available anchors are:
- **Melbourne after-hours electrical call-outs:** about **A$300–450 on weekdays** and **A$400–500 on weekends and public holidays**.
- **Melbourne emergency plumbing visits:** **A$263–735** (residential guide, July 2026).
- **Coffee-machine maintenance:** **A$500–2,000 a year** in total.
- Commercial refrigeration firms say "enquire" rather than publish after-hours fees.

On lost revenue, broker listings put a typical café at about **A$15k–36k a week**. That makes a four-hour Saturday-morning coffee-machine outage plausibly worth **A$1,000–2,500 in lost sales** [INF]. The US benchmark is about US$615 a day lost per critical failure.

### Cited Findings
**Callout and repair pricing (Melbourne)**
- **After-hours electrical call-out:** one Melbourne contractor quotes about **$300–$450 for weekday after-hours** and about **$400–$500 on weekends and public holidays**. Electrical, not refrigeration, but a useful commercial-trade proxy. — [Approved Electrix](https://www.approvedelectrix.com.au/?p=14765)
- **Commercial refrigeration:**
  - Typical listing wording is "Please enquire about our After Hours call out fee". — [Oneflare: Modern Airconditioning & Mechanical](https://www.oneflare.com.au/b/modern-airconditioning-mechanical-services-pty-ltd)
  - One Melbourne fridge repairer that also covers commercial units advertises "No Call Out Fee", without saying whether that covers after-hours. — [Oneflare: The Fridge Man](https://cdn.oneflare.com.au/b/the-fridge-man)
  - Several firms advertise 24/7 emergency commercial refrigeration breakdown callouts across Melbourne, with no published fee. — [Notion-hosted Melbourne listing](https://near-trick-50b.notion.site/2a0c0588290b8025862ce9a739051061); [Yellow Pages East Melbourne](https://www.yellowpages.com.au/east-melbourne-vic-3002/refrigeration-domestic-retail)
- **Plumbing (residential guides, the only Melbourne data found):**
  - Emergency or after-hours visits cost **$263–$735**, against a typical call-out of **$63–$158** (dated July 2026).
  - A Box Hill example gives an emergency call-out fee of **$188–$330 plus $167–$262 an hour** after hours, plus parts.
  - After-hours work adds **50–100%**, or **1.5–2x** the standard hourly rate.
  - No commercial or restaurant-specific Melbourne rates surfaced.
  - — [What's The Damage: Melbourne](https://whatsthedamage.com.au/plumber-cost-melbourne/); [What's The Damage: Box Hill](https://whatsthedamage.com.au/plumber-cost-box-hill/); [What's The Damage: callout fees](https://whatsthedamage.com.au/homeowner-hub/plumber-callout-fee-australia/); [Yellow Pages plumbing cost guide 2026](https://www.yellowpages.com.au/articles/plumbers-gasfitters/australian-plumbing-cost-guide)
- **Dishwasher repair (residential, Airtasker Melbourne):** median about **$130**, range $75–$180, from 869 reviews. One customer complained about paying the full amount as a "call-out fee" when nothing was fixed. No commercial glasswasher pricing was found. — [Airtasker Melbourne dishwasher repair](https://www.airtasker.com/au/services/dishwasher-not-draining/melbourne-western-suburbs/)

**Maintenance contracts and planned spend**
- **Commercial coffee machines:** maintenance, parts and cleaning together cost an estimated **$500–$2,000 a year**, depending on usage and water filtration (retailer buyer's guide). — [HospitalityHub buyer's guide](https://www.hospitalityhub.com.au/commercial-coffee-machine-prices-in-australia-buyer-s-guide-for-caf-s-and-hospitality-venues/f/26412)
- **La Marzocco Australia:** a standard annual *in-home* service is about **A$500–600**, varying by location, machine, age and condition. This is a home-machine benchmark; commercial servicing would be at or above it. — [La Marzocco AU](https://au.lamarzoccohome.com/support/servicing/)
- **What preventative service covers:** inspections, cleaning, descaling and replacing worn parts. — [Dipacci](https://dipacci.com.au/blogs/news/coffee-machines-service)
- **Temperature sensors:** SafetyCulture's fridge sensor was listed at **$72** in an April 2023 overview, plus a "small monthly fee". This is the price point for automated fridge-failure alerts. — [SafetyCulture sensors overview (2023 PDF)](https://wp.care.safetyculture.com/wp-content/uploads/sites/2/2023/05/SC-Care-Sensors-Overview-P.pdf)

**Revenue at risk**
- **Australian café weekly turnover** (broker and seller listings; seller claims, not an official average):
  - Brisbane: $14,360.
  - Sutherland: $15,000.
  - Kings Langley: about $19–21k.
  - Randwick: $20,000.
  - North Shore Sydney: $27,800 (FY26).
  - A 120-seat corner café franchise: about $32.5k–36.5k. The listing headline says $32,500; the search summary said $36,500.
  - No ABS per-venue average was found.
  - — [bsale Brisbane](https://bsale.com.au/listing/excellent-profitability-brisbane-qld-679323); [bsale Sutherland](https://bsale.com.au/listing/cafe-and-coffee-shop--sutherland-nsw-563736); [bsale Kings Langley](https://bsale.com.au/listing/busy-cafe-60kgs-a-week-kings-langley-nsw-506697); [bsale Randwick](https://bsale.com.au/listing/cafe-for-sale--eastern-randwick-nsw-563740); [bsale North Shore](https://bsale.com.au/listing/thriving-north-shore-sydney-nsw-686321); [Business Sales](https://www.businesssales.com.au/business/thriving-corner-cafe-32500-weekly-turnover-for-fy-2025/)
- **US downtime cost benchmarks:**
  - Intelligentics/Parts Town: about **US$615 lost per day** when critical equipment fails, with average downtime of about 6 hours and 42% of cases lasting a day or more. — [Facilitator (2024)](https://facilitator.mydigitalpublication.com/articles/streamlining-success)
  - One survey found the **median US operator spends US$22,500 a year** on equipment maintenance and repair. — [FastCasual](https://www.fastcasual.com/articles/survey-restaurant-operators-are-optimistic-but-equipment-costs-squeeze-cash-flow/)
  - Vixxo, an FM vendor, estimates **US$500–2,000 an hour** of revenue impact when a primary cooking line is down at peak lunch (vendor marketing). — [Vixxo](https://www.vixxo.com/facilities-management-news/food-equipment-downtime-costs-what-qsr-facilities-directors-should-track)
  - QSR Soft gives a worked example of one day offline for an iced-dessert machine: about US$600 in sales and US$450 in gross margin. — [QSR Soft](https://www.qsrsoft.com/?p=1958)
  - The 86 Repairs CEO estimates US restaurants spend about **US$28 billion a year on R&M** and lose about **US$46 billion a year to equipment downtime** (company estimates). — [FER](https://fermag.com/articles/top-10-types-of-equipment-issues-in-2021); [Viam](https://www.viam.com/post/equipment-downtime-quick-service-restaurants)
  - Fexa, an FM software vendor, claims operators capture only **60–70 cents of value per R&M dollar** because of duplicate dispatches, inefficiency and reactive maintenance (vendor claim). — [Fexa](https://fexa.io/guide/state-of-ai-restaurant-facilities-management/)

### Inferences
- **[INF] Downtime cost for a Melbourne café:**
  - At about A$20k a week over 6–7 trading days of about 8–9 hours, average takings are about **A$300–420 an hour**, with mornings and weekends well above average.
  - Coffee is a large share of café sales and drives attached food purchases [BK].
  - So a 4-hour weekend-morning espresso outage plausibly costs **A$1,000–2,500 in lost sales**.
  - A cool-room failure overnight adds stock write-off, plausibly A$1k–10k depending on the venue [BK].
- **[INF] Spend envelope for a single café:**
  - Planned coffee maintenance: A$500–2,000 a year.
  - Plus 6–18 reactive callouts a year at roughly A$150–550 (business hours) to A$300–735+ (after hours).
  - That gives roughly **A$2k–10k a year on reactive repairs and maintenance**.
  - A full-service restaurant or pub kitchen is likely 2–4x that [BK].
  - All of these are well below the US chain benchmark of US$120k (FSR) but large enough to support a subscription of about A$50–150 a month if it demonstrably shortens downtime.
- **[INF] What a fast callback is worth:** the value is not a cheaper repair. It is (a) a shorter time to the *right* technician, often a remote diagnosis that fixes the fault or tells staff which part to swap, and (b) less management time spent ringing around. US platforms charge for exactly this, and 86 Repairs "troubleshoots and checks warranty status on every incident" (see Q3).

### Gaps
- No published Melbourne **commercial** refrigeration, coffee-tech after-hours, or commercial plumbing callout rates. Phone or email quote requests to 5–10 providers would close this gap cheaply.
- No Australian downtime-cost survey was found.
- No data on what Australian venues pay for bundled maintenance contracts (refrigeration PM contracts, kitchen exhaust cleaning, pest contracts). Pest and exhaust were not searched because of the budget.
- Café turnover figures are seller claims from NSW and QLD listings; no Melbourne-specific or ABS per-venue figure.

---

## Q3. Existing solutions in Australia and globally: what do 1–10-venue operators use, and what is unserved?

### Takeaway
The category is **proven in North America for chains**:
- **86 Repairs:** a managed repair-desk subscription that troubleshoots, checks warranty and dispatches vendors 24/7. It has raised US$15.2M in a Series A and about US$24M in total.
- **ResQ:** a work-order platform plus vendor marketplace, with a US$39M Series A in 2021.
- **ServiceChannel:** enterprise, quote-only, per-location pricing, aimed at 500+ location chains.

The products differ in what they assume:
- **CMMS tools** (MaintainX from free up to US$65 a user a month, UpKeep, Limble) and **multi-site hospitality FM tools** (Access Maintain Evo, Fixflo, LeanSite) all assume the operator already knows its vendors. They track work; they do not find a technician.
- **Australian "one call, all trades, 24/7" FM firms** (Programmed, Unified Services Australia, The Maintenance Boys) target larger commercial portfolios.
- **Airtasker Business Membership** (A$849 a year) is bid-based and not commercial-trade-grade.

No Australian AI-native or text-first repair dispatcher for independent venues surfaced. **Small operators appear to rely on Google, phone calls, their roaster's technician, the landlord, and a few regular trades.** That is the unserved gap.

### Cited Findings
**North American restaurant-specific platforms (closest analogues)**
- **86 Repairs (Chicago; CB Insights lists Grand Rapids):**
  - A subscription platform that "manages end-to-end equipment repair and maintenance for restaurants". — [SourceForge](https://sourceforge.net/software/product/86-Repairs/)
  - Its team "troubleshoots and checks warranty status on every incident" and handles vendor scheduling. — [CB Insights comparison](https://www.cbinsights.com/compare/86-repairs-vs-resq)
  - Offers "24/7/365 support for on-demand repair management, preventative maintenance programs" and R&M spend insights. — [QSR Magazine](https://www.qsrmagazine.com/news/86-repairs-raises-152-million-series-funding/)
  - Customers reach it by "a call or chat away", and it keeps "an inventory of all the assets in your store". — [86 Repairs help centre](https://intercom.help/86-repairs-customer-service/en/articles/8349256-best-practices-for-calling-in-a-new-service-request)
  - Funding: a **US$15.2M Series A** led by Storm Ventures, bringing the total to **US$24M**; an earlier US$5.3M extension took its seed to US$7.3M. VCBacked lists a US$2.0M round in February 2025, which conflicts with the other timelines. — [FER](https://www.fermag.com/articles/86-repairs-secures-15-2m-in-series-a-funding/); [Restaurant Business](https://www.restaurantbusinessonline.com/technology/automated-repairs-company-86-repairs-raises-another-53m); [VCBacked](https://www.vcbacked.co/company/86-repairs)
- **ResQ (Toronto):**
  - A "facility management platform that focuses on repair and maintenance operations for the hospitality sector", with work orders, asset tracking and "a network of trades vendors". — [CB Insights comparison](https://www.cbinsights.com/compare/86-repairs-vs-resq)
  - Described as "a marketplace for the restaurant-repair industry by connecting contractors and restaurant owners". — [The Logic](https://thelogic.co/briefing/resq-a-toronto-based-restaurant-repair-startup-raises-us39m-series-a/)
  - Funding: a **US$39M Series A** co-led by Tiger Global and Canvas (CB Insights dates it October 2021); The Logic reports US$53.3M over two years. — [BetaKit](https://betakit.com/?p=314107); [The Logic](https://thelogic.co/briefing/resq-a-toronto-based-restaurant-repair-startup-raises-us39m-series-a/)
  - ResQ has a Capterra Australia listing aimed at multi-location QSR and FSR brands. A listing does not prove it operates in Australia. — [Capterra AU](https://www.capterra.com.au/software/208352/resq)
- **ServiceChannel:**
  - Pricing is per location and quote-only. — [Facilio (a competitor)](https://facilio.com/blog/servicechannel-pricing/)
  - "Best for national retail chains managing 500+ locations". — [Softabase](https://softabase.com/en/software/maintenance/servicechannel)
  - (Older, 2023) It charges service providers **1.25% of approved pre-tax invoices, capped at US$3**. — [ServiceChannel help](https://servicechannel.atlassian.net/wiki/x/AYDCv)
- **No 2025–2026 AI-agent restaurant-repair dispatch launch or funding round surfaced** in two targeted searches. The results were vendor commentary about agentic maintenance (Fexa, Oxmaint). Absence of evidence, not proof. — [Fexa](https://fexa.io/guide/state-of-ai-restaurant-facilities-management/); [Oxmaint](https://www.oxmaint.com/blog/post/agentic-ai-maintenance-copilot-self-schedule-work-orders-2026); [Facilitator Dec 2025/Jan 2026](https://facilitator.mydigitalpublication.com/december-january-2026/page-38)
- **Operator openness to AI:** Toast's 2026 survey of 676 restaurants reportedly found **87% comfortable using AI** and **85% planning to use more**. This is reported second-hand by an AI vendor and is US-only. — [Ampcome](https://www.ampcome.com/post/ai-agents-for-restaurants)

**CMMS and FM software (track work but don't find a technician)**
- **MaintainX:** Basic free; Essential **US$20 a user a month** billed annually (US$25 monthly); Premium **US$65** annually (US$75 monthly); Enterprise custom. Requester accounts are free. — [Reliamag](https://reliamag.com/cmms/maintainx-vs-limble/); [Facilio](https://facilio.com/blog/maintainx-vs-limble/)
- **UpKeep:** sources conflict. One gives US$24–55 a user a month; another gives US$45–75, and US$95–130 at enterprise. — [Fabrico](https://www.fabrico.io/blog/upkeep-pricing-guide-2026-costs-plan-limits-hidden-fees/)
- **Limble:** mostly quote-based; about US$25–28 a user a month per third parties. — [Capterra comparison](https://capterra.com/compare/162600-179296/Limble-CMMS-vs-GetMaintainx)
- MaintainX's own guide tells multi-site restaurant operators to prioritise reporting on assets, costs, vendors and recurring failures. These tools assume the vendor list exists. — [MaintainX blog](https://www.getmaintainx.com/blog/best-restaurant-software-for-maintenance-management)
- **Access Maintain Evo (Access Group):** listed on GetApp Australia for multi-site venues, with AI that turns "reactive repairs into proactive management" and tracks contractor certifications. — [GetApp AU](https://www.getapp.com.au/software/2083623/access-maintain-evo)
- **Fixflo:** a "lighter alternative to enterprise CAFM" for multi-site hospitality operators (UK-centric). — [Fixflo](https://www.fixflo.com/hospitality-maintenance-software)
- **LeanSite:** an AI platform for organisations with about 3–50 sites, including restaurants. — [Software Advice AU](https://www.softwareadvice.com.au/software/562412/LeanSite)
- **FMClarity, Fixd and Jobber-style tools were not researched** because of the search budget (see Gaps).

**Australian "one call, all trades" FM providers (aimed at larger portfolios)**
- **Programmed:** hard FM with 24/7 services through in-house trades and subcontractors, across retail and commercial sites. — [Programmed](https://programmed.com.au/service/facility-management/integrated-services/hard-facility-management-2/)
- **Unified Services Australia (Pakenham, VIC):** a nationwide "one stop shop" offering 24/7 emergency response across HVAC, electrical, plumbing and more. — [ICN Gateway](https://gateway.icn.org.au/suppliers/1238146)
- **The Maintenance Boys (Sydney):** 24/7 commercial repairs, "services the needs of all businesses nationally". The search summary did not clearly attribute this to the linked page. — [a-leads profile](https://a-leads.co/company/2494478_0ce76531)
- **Just One Call (QLD):** 24-hour property and cleaning services, listed on Oneflare, which closed on 30 June 2026. — [Oneflare](https://oneflare.com.au/b/just-one-call)
- **Kitchen exhaust and grease-trap specialists:** e.g. Sydney Commercial Kitchens, serving restaurants, pubs, clubs, cafés and food courts. — [Sydney Commercial Kitchens](https://www.sydneycommercialkitchens.com.au/link)
- The search did not confirm that any of these offers a single 24/7 number for small cafés or retail tenancies.

**Equipment suppliers and roasters**
- **Five Senses:** its Melbourne wholesale programme is backed by "an experienced team of hospo and technical pros"; it does not say whether that support is free. — [Five Senses wholesale](https://fivesenses.com.au/wholesale-coffee)
- **Zest Specialty** (Melbourne and Sydney) provides "additional services to wholesale partners". — [Zest](https://www.zestcoffee.com.au/?p=3377)
- **Leaf Bean Machine** bundles "dedicated equipment support" with coffee supply (WA-centred). — [Leaf Bean Machine](https://www.leafbeanmachine.com.au/wholesale/)
- No Melbourne roaster was confirmed to offer *free* servicing to wholesale accounts.

**Marketplaces**
- **Airtasker Business Membership (Australia, confirmed):**
  - **A$849 a year inc GST**, giving $0 connection fees for the primary account plus up to 4 team seats, and priority support.
  - Without it, the connection fee is **15.95% of task value (minimum A$4.90, cap A$49.95)**.
  - This updates the sibling note, which could only confirm the US page. — [Airtasker Business Membership T&Cs](https://support.airtasker.com/hc/en-au/articles/61104692235033-Airtasker-Business-Membership-Terms-Conditions); [Airtasker connection fee](https://support.airtasker.com/hc/en-au/articles/360031769372)
- **hipages:** no dedicated commercial or business product surfaced. Its plans and lead pricing are covered in Q4. — [What's The Damage](https://whatsthedamage.com.au/tradies/hipages-cost/)

**Monitoring (an adjacent detection layer)**
- **SafetyCulture** (Australian) sells refrigeration monitoring with automated alerts "when food temperatures breach defined limits or when power outages or equipment failures occur", sent by email, push or SMS. — [SafetyCulture refrigeration monitoring](https://safetyculture.com/monitoring/refrigeration-monitoring); [SafetyCulture sensors overview (2023 PDF)](https://wp.care.safetyculture.com/wp-content/uploads/sites/2/2023/05/SC-Care-Sensors-Overview-P.pdf)

### Inferences
- **[INF] What 1–10-venue Australian operators do today:** none of the solutions found serves them with fast human dispatch.
  - **Coffee machine:** the roaster's technician or an independent coffee tech. This is the most "solved" category and has the highest leakage.
  - **Refrigeration, warewasher, cooking equipment:** a regular tech if they have one, otherwise Google and phone calls mid-service.
  - **Plumbing, electrical, locks, glass:** Google, word of mouth, or the landlord or agent for base-building issues.
  - **Pest and exhaust:** scheduled contracts.
  - **Software:** none, or a spreadsheet; CMMS seat pricing and set-up effort are overkill for a single café.
  - This is consistent with the absence of any SMB-focused Australian product in the searches, but it is not directly evidenced by a survey.
- **[INF] The proven US model is managed and phone-first, not self-serve software.** 86 Repairs' core is people who triage and dispatch, and it is reached by call or chat. That is exactly the proposed "text a number" mechanic. The AI agent replaces 86 Repairs' human desk, which is what could make the model work at Australian independent-venue price points.
- **[INF] Where the gap is largest:**
  1. **After-hours and weekend** failures, when the regular tech is unavailable.
  2. **Rare trades** a venue hasn't needed before (gas fitter, cool-room specialist, glazier, locksmith, exhaust).
  3. **Small groups of 2–10 venues** without an ops manager, where the owner is the dispatcher.
  4. **Triage**: knowing whether it's a $0 fix (a tripped switch or a blocked filter) or needs a tech.
- **[INF] The gap is smallest for routine coffee-machine servicing** (roaster-bundled) and for venues in shopping centres or managed buildings, where centre management dispatches.
- **[INF] The incumbents could enter.** 86 Repairs and ResQ are US-focused, but Australia is English-speaking with similar restaurant formats. Australia probably isn't a priority for them yet, but a well-funded entrant could follow. A local, independent-focused, text-first product has a window rather than a moat.

### Gaps
- **FMClarity, Fixd, Jobber, ServiceM8 and Tradify** (supply-side job tools) were not researched. "Fixd" could not be identified as an Australian restaurant product; this needs checking.
- No Australian survey of what small hospitality operators use for repairs.
- It was not confirmed whether ResQ, 86 Repairs or ServiceChannel have any Australian customers.
- Australian availability and pricing for Access Maintain Evo and LeanSite were not checked.
- Not confirmed whether any Melbourne roaster provides free or subsidised machine servicing to wholesale accounts. This matters a lot for leakage in the most frequent fault category.
- hipages commercial (if any) was not confirmed.

---

## Q4. What is a connection worth to providers (commercial refrigeration, coffee techs, plumbers, electricians)?

### Takeaway
There is no published Australian price for commercial-trade leads. The anchors are:
- **hipages:** subscriptions of **A$139–649 a month plus GST** with credit-priced leads reported **up to about A$200**, shared with up to three businesses. The sibling note gives an average of A$2,475 a year per tradie in FY26.
- **Bark:** about **US$/£1.80–2.30 a credit** at 3–20+ credits per lead, so roughly **US$5–46+ a lead** (no AUD prices found).
- **ServiceChannel:** at the enterprise end, providers pay only **1.25% of each invoice, capped at US$3**. Enterprise FM networks monetise operators, not providers.

Commercial tickets are larger than residential: about A$375 for an average coffee repair (sibling note) and US$928 for an average US FSR invoice. So an exclusive, pre-qualified commercial job is plausibly worth **A$30–80** to a provider [INF]. But specialist hospitality techs are often capacity-constrained, so provider fees should be secondary to the venue subscription.

### Cited Findings
- **hipages plans:**
  - Four plans at **$139, $249, $449 and $649 a month plus GST**, with 155–850 credits a month; these rose from $129/$229/$429/$599 in a July repricing.
  - Leads are reported to cost **up to about $200**, and one reviewer saw a lead's credit cost rise from about 42 to 75 in a year.
  - Contracts start with a six-month introductory term and then **auto-renew for twelve months**.
  - Each lead goes to **up to three businesses**. — [What's The Damage](https://whatsthedamage.com.au/tradies/hipages-cost/)
  - PricingSaaS also lists a $29 Essentials plan and a $2,049 Pro plan (conflicting tiers). — [PricingSaaS](https://pricingsaas.com/companies/hipagesgroup)
  - hipages H1 FY26 reported double-digit revenue and ARPU growth, with all tradies migrated to the new pricing plans. — [ASX announcement (Feb 2026)](https://announcements.asx.com.au/asxpdf/20260224/pdf/06wn9bmw8wbt28.pdf)
  - Reused: FY26 average subscription revenue of about A$2,475 per tradie across about 36.4k subscribers. — [Investing.com](https://www.investing.com/news/company-news/hipages-fy26-slides-cash-flow-surges-66-as-ai-platform-evolves-93CH-4872530)
- **Bark** (UK and US figures; no AUD found):
  - Credits cost about **$1.80–2.30** each, or **£1.80 + VAT** at list price, with discounted packs at about £1.20–1.50.
  - A lead costs **3 to 20+ credits** depending on trade and job size.
  - Credits bought from 1 November 2025 expire after three months.
  - Bark operates in Australia. — [SideHusl](https://sidehusl.com/bark/); [Ring4](https://ring4.com/blog/bark-thumbtack-lead-response-guide); [Whito (UK review)](https://whito.co.uk/?p=14042)
- **ServiceChannel provider fee** (older, 2023): **1.25% of the pre-tax amount of approved invoices, maximum US$3**. — [ServiceChannel help](https://servicechannel.atlassian.net/wiki/x/AYDCv)
- **Airtasker take rate:** the poster pays a connection fee of **15.95% of task value (A$4.90–49.95)**. Reused from the sibling note: Taskers also pay 12.5–20%. — [Airtasker connection fee](https://support.airtasker.com/hc/en-au/articles/360031769372)
- **Commercial ticket sizes:**
  - Average US FSR invoice: **US$928** (2024). — [ServiceChannel 2025 benchmark](https://servicechannel.com/wp-content/uploads/2025/02/ServiceChannel-Benchmark-Report-2025-R5-DIGITAL.pdf)
  - Melbourne after-hours electrical call-out alone: **$300–500**. — [Approved Electrix](https://www.approvedelectrix.com.au/?p=14765)
- **Capacity:** a Melbourne coffee-service firm runs 40–50 jobs a day, rising to 80 at peaks, which suggests demand already fills specialist technicians' days at busy times. — [BeanScene](https://www.beanscenemag.com.au/coffee-technicians-the-industrys-unsung-heroes/)

### Inferences
- **[INF] Provider willingness to pay depends on the trade:**
  - **Generalist trades** (plumbers, electricians, locksmiths, glaziers, pest) already buy residential leads on hipages, and commercial customers are more valuable because they repeat, pay invoices and generate after-hours premiums. An **exclusive, pre-qualified commercial job with a manager already on the phone** is plausibly worth **A$30–80**, above a shared hipages lead.
  - **Specialist hospitality techs** (coffee machine, commercial refrigeration, warewasher, cooking equipment) are scarcer and busy at peaks. Many will not pay per lead but will accept a modest fee (about 5–10% of the first invoice, or a flat A$20–40) for new venue relationships, especially off-peak.
- **[INF] Pricing structure:**
  - Charge providers only for **new** venue relationships, never for repeat jobs from the venue's saved vendors (as already proposed).
  - Make the venue subscription the main revenue line. US platforms monetise operators, not providers (ServiceChannel's provider fee is nominal), which supports subscription-first.
- **[INF] Expected provider fees per venue:** if a venue generates about 1 urgent request a month and 30–50% go to a *new* provider early on (falling as saved vendors build up), provider fees are about **A$10–40 per venue per month** in year one. That is meaningful, but less than the subscription.

### Gaps
- No Australian commercial-trade lead price was found: not from hipages (per-category credits unpublished), Bark (no AUD), or ServiceSeeking (not searched).
- No direct evidence on whether Melbourne commercial refrigeration or coffee techs pay for leads. Ten supply-side calls would settle it.
- Typical Melbourne commercial refrigeration ticket sizes were not found.

---

## Q5. Distribution: POS marketplaces, Ordermentum, associations, roasters and suppliers; is the Lightspeed integration a real advantage?

### Takeaway
The founder's best channels, in order:
1. **The existing Lightspeed relationship and integration.** Lightspeed claims **10,000+ venues** in ANZ, largely cafés, bars and restaurants, and its Restaurant platform has **95+ integration partners**. The visible partners are ordering, delivery and loyalty; **no maintenance or repair partner was observed**, so a "first in category" listing may be possible.
2. **Direct walk-in sales** on dense inner-Melbourne strips [BK].
3. **Coffee roasters and equipment suppliers**, as partners or as a white-label technician network.
4. **Ordermentum** (47,000+ venues, reused), as a partner or advertiser.
5. **AHA Vic** (1,000+ pubs and hotels; runs a supplier partnership programme).
6. The **Square AU marketplace**, whose observed restaurant apps are also ordering and delivery.

The Lightspeed integration is a genuine onboarding and ROI advantage: it can pull the venue profile and trading pattern, and quantify lost sales per outage. It is only a **weak detection signal**. A dead espresso machine shows up in POS data only after 20–40 minutes, and the manager already knows. Cool-room failures don't show up in sales at all; sensors such as SafetyCulture's detect those.

### Cited Findings
**Lightspeed**
- (Older, 2019) Lightspeed's acquisition of Kounta added **7,000+ locations across Australia and New Zealand**, mostly cafés, bars, restaurants and boutique hotels. — [Finextra (2019)](https://www.finextra.com/pressarticle/80329/lightspeed-pos-acquires-australia-based-kounta)
- Lightspeed now says it is "trusted by over **10,000 venues** across Australia and New Zealand". — [Lightspeed AU: Lightspeed vs Square](https://www.lightspeedhq.com/au/lightspeed-vs-square/)
- A trade article (undated) says it supports 10,000 bars and restaurants. — [Drinks Trade](https://drinkstrade.com.au/its-a-great-time-to-be-in-hospitality)
- The Lightspeed Restaurant App Store listing cites "over **95 integration partners**". — [App Store: Lightspeed Restaurant POS (K)](https://apps.apple.com/app/id1486190847)
- Observed K-Series integrations are all ordering, payments, delivery, loyalty or middleware: meandu (AU/NZ/UK/US), Deliverect, Storekit, 5loyalty, Patchworks, and Unified.to (API in beta). No maintenance or repair integration appeared. — [meandu](https://www.meandu.com/gb/integrations/lightspeed-k); [Deliverect](https://deliverect.com/de-de/integrations/lightspeed-pos-kseries); [Storekit](https://storekit.com/docs/guides/integrations/pos/lightspeed/overview); [5loyalty](https://www.lightspeedhq.com/uk/integrations/5loyalty/); [Unified.to](https://unified.to/integrations/lightspeedkseries.md)
- Example multi-venue customer: Traverse Alpine Group, **8 venues across VIC and NSW**. — [Lightspeed AU customer story](https://www.lightspeedhq.com/au/customers/traverse-alpine-group/)

**Square**
- Square AU App Marketplace restaurant apps observed: Uber Eats (listed April 2025, updated May 2026), Deliverect, Hubster, Otter and OpenTable. All are ordering, delivery or reservations; no maintenance category was observed. — [Square AU: Uber Eats](https://squareup.com/au/en/app-marketplace/app/ubereats); [Square AU: Otter](https://squareup.com/au/en/app-marketplace/app/otter); [Square AU: OpenTable](https://squareup.com/au/en/app-marketplace/app/opentable)
- (Older, 2019) Square for Restaurants launched in Australia, its first market outside the US, at A$129 a month at launch. — [ChannelNews (2019)](https://www.channelnews.com.au/square-for-restaurants-partnership-launched/)

**Ordermentum** (reused from sibling note `au_retail_hospitality_trades_agri.md`)
- Claims **47,000+ venues**. It is free for venues, with a paid Pro plan listed at about $200 a month. — [Ordermentum llms.txt](https://www.ordermentum.com/llms.txt); [Ordermentum pricing](https://ordermentum.com/pricing)

**Associations**
- **AHA (Vic)** advertises "access to **1000+ member pubs and hotels** across Victoria" through a supplier partnership programme. This is a marketing figure. — [AHA Vic partnership benefits](https://www.ahavic.com.au/partnership-benefits/); [AHA Vic who we are](https://ahavic.com.au/get-to-know-us/who-we-are)
- No membership count was found for **Restaurant & Catering Australia**. A University of Melbourne archive confirms the Restaurant and Catering Association of Victoria lineage only. — [UniMelb Archives](https://archives.library.unimelb.edu.au/nodes/view/60198)
- The Australian Retailers Association was not searched (budget).

**Roasters and equipment suppliers**
- Roasters run technical teams for wholesale accounts (Five Senses, Zest, Leaf Bean Machine). They are natural partners: they want their cafés' machines running because downtime cuts coffee volume [INF]. They are also the main incumbent for coffee-machine faults. — [Five Senses](https://fivesenses.com.au/wholesale-coffee); [Zest](https://www.zestcoffee.com.au/?p=3377); [Leaf Bean Machine](https://www.leafbeanmachine.com.au/wholesale/)

**Detection alternatives**
- SafetyCulture sensors alert on temperature breaches, power outages and equipment failures by SMS, push or email. Sensor-triggered dispatch ("your cool room is at 9°C; reply YES to get a refrigeration tech calling you") is a more direct trigger than POS data for refrigeration. — [SafetyCulture](https://safetyculture.com/monitoring/refrigeration-monitoring)

### Inferences
- **[INF] What the Lightspeed integration genuinely provides:**
  1. **Zero-friction onboarding:** venue name, address, trading hours, venue type and multi-venue structure come straight from the POS, so the AI agent's venue profile is pre-filled.
  2. **Quantified ROI:** after each incident, the product can report, for example, "your espresso machine was down from 7:40 to 10:15 Saturday; coffee sales were A$1,180 below your 8-week baseline; next time dispatch took 9 minutes". That makes renewals and price increases defensible.
  3. **Proactive prompts:** if coffee line items drop to near zero while food continues in a normally busy window, the agent can text "Coffee sales stopped 25 min ago; is the machine down? Reply 1 to get a tech". This is useful at multi-venue groups where the owner is off-site, but redundant for an on-site manager.
  4. **Benchmarking** downtime and repair spend across venues, much as 86 Repairs sells "data-driven insights on R&M spend".
  5. **A channel:** the founder's existing Lightspeed merchants are warm leads, and with no maintenance partner visible in the ecosystem, a listing could be "first in category" (marketplace listing terms not checked).
- **[INF] What it does not provide:**
  - Detection of non-sales-linked failures: cool room, drains, gas, locks, exhaust.
  - Any exclusivity. Square and other POS systems have public APIs [BK], and Lightspeed could restrict API use or launch its own partner programme.
- **[INF] Channel ranking for a solo founder in Melbourne:**
  1. **Existing Lightspeed customers plus walk-ins** in Fitzroy, Collingwood, Brunswick, Richmond, the CBD and South Yarra [BK]. Target 2–10-venue groups where the owner is the dispatcher.
  2. **Two or three roasters as design partners.** Offer to route non-coffee faults (refrigeration, plumbing, warewasher) for their wholesale cafés and to send coffee faults to the roaster's own tech first. This turns an incumbent into a channel.
  3. **AHA Vic partnership** for pubs (larger kitchens, more equipment, cool rooms, after-hours trading).
  4. **Lightspeed and Square marketplace listings** for inbound demand once the product works.
  5. **Ordermentum** for co-marketing later.

### Gaps
- Lightspeed AU marketplace listing requirements, revenue share and categories were not checked. Nor was which Lightspeed API (X-Series or K-Series) the founder's integration uses; this was also flagged in the sibling note.
- Square AU marketplace categories and partner terms were not checked.
- R&CA and ARA membership counts and partnership terms were not found.
- No evidence was found that roasters or suppliers have referred technicians to third-party dispatchers. Roaster appetite is untested.
- Lightspeed's AU active-venue count is a marketing claim ("10,000+"); no audited figure was found.

---

## Q6. Market size: how many venues, and what revenue at A$X per venue per month plus provider fees?

### Takeaway
- **Victoria:** about **26,156 cafés, restaurants and takeaway businesses** (June 2024, a Tourism Victoria count from Tourism Research Australia data). The sibling note gives about 16.9k cafés and restaurants excluding takeaway (2023).
- **Australia:** about **89,000** cafés, restaurants and takeaways (June 2025, provisional TRA fact sheet).
- **Retail:** **156,169 retail trade businesses** nationally (ABS 2024–25).
- **Pubs:** **1,000+ AHA Vic member pubs and hotels**.

At **A$99 a venue a month plus about A$25 a month in provider fees** [assumption], reaching 3% of Melbourne's sit-down venues is a roughly **A$0.5–0.6M ARR** business; 3% nationally is roughly **A$2–3M ARR** [INF]. That is a solid seed-stage or bootstrapped business, but not venture-scale on hospitality alone. Scale would need chains and franchises, food retail, other states, or the consumer side.

### Cited Findings
- **Victoria (June 2024):** "cafés, restaurants and takeaway food services made up 24% of all tourism businesses, or **26,156 businesses**", up 1.1% on June 2023. This is a state-government product built on TRA data, not a direct ABS count. — [Tourism Victoria: Tourism businesses in Victoria June 2024 (PDF)](https://tourism.vic.gov.au/__data/assets/pdf_file/0007/2377177/Tourism-businesses-in-Victoria-June-2024.pdf)
- **Australia (June 2025):** cafés, restaurants and takeaway food services, about **89,000 businesses**, were the largest tourism-characteristic industry. The document contains unresolved reviewer comments about swapped table columns, so treat it as provisional. — [TRA Tourism Businesses in Australia 2025 fact sheet](https://www.tra.gov.au/content/dam/austrade-assets/global/wip/tra/documents/tbia/tourism-businesses-in-australia-2025-fact-sheet.docx)
- **ABS Counts of Australian Businesses:**
  - Victoria added **19,581 businesses** in 2025–26, the second-largest state increase.
  - In the 2024–25 edition, Retail Trade fell 0.4% to **156,169 businesses**.
  - An ANZSIC 4511 (cafés and restaurants) count for Victoria was not retrieved from the data cube. — [ABS Counts of Australian Businesses, Jul 2022–Jun 2026](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/jul2022-jun2026)
- **Reused:** about 16,869 cafés and restaurants in Victoria (2023, Statista-based) and more than 55,700 nationally (FY2024). — [BeanScene](https://www.beanscenemag.com.au/abs-data-reveals-state-with-strongest-hospitality-sector); [BeanScene](https://www.beanscenemag.com.au/number-of-australian-cafes-grows-by-30-per-cent/)
- **AHA Vic:** 1,000+ member pubs and hotels. — [AHA Vic](https://www.ahavic.com.au/partnership-benefits/)
- **Lightspeed:** 10,000+ ANZ venues. — [Lightspeed AU](https://www.lightspeedhq.com/au/lightspeed-vs-square/)

### Inferences
- **[INF] Melbourne serviceable market:**
  - Of about 16.9k Victorian cafés and restaurants, roughly 75–80% are in Greater Melbourne [BK: Melbourne holds about three-quarters of Victoria's population], giving about **12.5–13.5k**.
  - Add pubs and bars, about 1–1.5k [BK, based on the AHA Vic membership].
  - Add food retail with refrigeration, perhaps 3–5k [BK].
  - Serviceable universe: about **17–20k Melbourne venues**.
  - The 2–10-venue group segment is perhaps 15–25% of venues [BK; no data found].
- **[INF] Revenue scenarios.** ARPU is the subscription plus about A$25 a month in provider fees.

| Scenario | Venues | Subscription (A$/venue/mo) | ARPU (A$/mo) | ARR |
|---|---|---|---|---|
| Melbourne pilot, year 1 | 100 | 79 | ~104 | ~A$125k |
| Melbourne, 3% of ~13k sit-down venues | ~390 | 99 | ~124 | ~A$580k |
| Melbourne, 5% incl. pubs and food retail (~18k) | ~900 | 99 | ~124 | ~A$1.34M |
| National, 3% of ~60k cafés/restaurants/pubs | ~1,800 | 99 | ~124 | ~A$2.7M |
| National, 3% at a premium tier (after-hours SLA, multi-site) | ~1,800 | 149 | ~174 | ~A$3.8M |

- **[INF] Churn drag:** with about 12% of cafés and restaurants closing each year (Q7), plus voluntary churn, a venue SaaS should plan for **25–40% annual logo churn** among single-site independents. Multi-venue groups churn less [BK]. Net revenue retention would rely on groups adding venues.
- **[INF] Comparison with the US:** 86 Repairs (about US$24M raised) and ResQ (US$39–53M raised) target a US market about 10x larger, and focus on chains. Australia alone supports a smaller company unless it expands to NZ, the UK (Lightspeed is strong in Europe [BK]) or adjacent verticals.

### Gaps
- No direct ABS ANZSIC 4511, 4520 (pubs, taverns and bars) or 4512 count for Greater Melbourne was retrieved.
- The share of Australian venues in 2–10-venue groups is unknown.
- No food-retail (bakery, deli, butcher, liquor) business counts were found.
- Willingness to pay at A$79–149 a month is untested.

---

## Q7. Risks: churn, margins, landlord responsibility, incumbent suppliers, 24/7 coverage

### Takeaway
The biggest risks are:
1. **Churn from closures:** 12.03% of cafés, restaurants and takeaways closed in the 12 months to July 2026, against 6.69% across all industries (reused).
2. **Leakage to the roaster's tech and regular trades** in the most frequent fault categories.
3. **Landlord responsibility.** Under section 52 of Victoria's Retail Leases Act 2003, landlords must maintain the structure, landlord-owned fixtures, and plant and equipment, and lease terms cannot override that. Some restaurant faults, such as a landlord-owned cool room or base-building plumbing, must go to the landlord.
4. **The 24/7 promise.** Peak need falls on weekends and evenings, exactly when supply is thinnest and after-hours rates are 1.5–2x.

The landlord rule is also a product feature: route each fault to the right party automatically.

### Cited Findings
**Churn and financial health (reused from sibling note `au_retail_hospitality_trades_agri.md`)**
- **12.03%** of cafés, restaurants and takeaways closed in the 12 months to July 2026, against 6.69% across all industries. **10.21%** were more than 60 days in arrears, and the trade payment default rate was **1.15%** against 0.31% nationally. — [CreditorWatch](https://creditorwatch.com.au/blog/one-in-eight-cafes-restaurants-closing); [IT Brief](https://itbrief.com.au/story/one-in-eight-australian-cafes-shut-as-pressures-mount)

**Landlord responsibilities (Victoria)**
- Repairs and maintenance are the landlord's responsibility under section 52 of the Retail Leases Act 2003. The landlord must keep "the structure of the premises, the fixtures in the premises, and the plant and equipment at the premises" in the condition they were in at the start of the lease, and "the Act will always override" any conflicting lease provisions. — [Victorian Small Business Commission](https://www.vsbc.vic.gov.au/who-we-help/retail-tenants-landlords/repairs-maintenance/)
- In *Cheng v Wang* [2019] VCAT 496, a restaurant tenant argued that section 52(2) required the landlord to maintain landlord-installed dishwashers, stoves, fridges and cool rooms despite the lease. The outcome was not shown in the snippets, and the search summary did not identify which page discussed the case. — [Sprintlaw: s52 explained](https://sprintlaw.com.au/articles/structural-repairs-under-retail-leases-section-52-explained-vic/); [Sprintlaw: commercial landlord responsibilities](https://sprintlaw.com.au/articles/commercial-landlord-responsibilities-in-victoria-for-business-owners-and-managers/)
- Landlords can recover non-section-52, non-capital, non-essential-safety-measure (ESM) maintenance costs if section 39 is followed (2015 VCAT advisory opinion). The Retail Leases Amendment Act 2020 then allowed ESM costs to be recovered if the lease says so. — [Maddocks](https://www.maddocks.com.au/insights/vcat-restricts-landlords-ability-recover-costs-tenants); [Corrs (2020)](https://corrs.com.au/insights/significant-changes-to-the-victorian-retail-leasing-framework-considerations-for-landlords)

**Incumbent suppliers and warranty**
- 86 Repairs "checks warranty status on every incident". Warranty routing is a core part of the job, and sending the wrong tech can waste money or void warranty [BK]. — [CB Insights comparison](https://www.cbinsights.com/compare/86-repairs-vs-resq)
- Roasters bundle technical support with wholesale coffee (Five Senses, Leaf Bean Machine). — [Five Senses](https://fivesenses.com.au/wholesale-coffee); [Leaf Bean Machine](https://www.leafbeanmachine.com.au/wholesale/)

**24/7 coverage and supply**
- Weekends are the busiest trading period, and downtime then "can quickly spiral into lost sales" (vendor claim). — [BeanScene](https://www.beanscenemag.com.au/57483-2/)
- After-hours rates are 1.5–2x standard, and Melbourne after-hours electrical call-outs cost $300–500. — [What's The Damage](https://whatsthedamage.com.au/homeowner-hub/plumber-callout-fee-australia/); [Approved Electrix](https://www.approvedelectrix.com.au/?p=14765)
- The Melbourne coffee-tech firm's volume rises from 40–50 to 80 jobs a day at peaks, a sign of capacity strain. — [BeanScene](https://www.beanscenemag.com.au/coffee-technicians-the-industrys-unsung-heroes/)
- 42% of US operators reported downtime of a day or more (parts, scheduling). — [Facilitator (2024)](https://facilitator.mydigitalpublication.com/articles/streamlining-success)

**Margins and costs**
- Reused: Restaurant & Catering Australia says costs are 30–50% above pre-COVID levels. — [YourLifeChoices](https://www.yourlifechoices.com.au/finance/your-favourite-cafe-is-vanishing-behind-australias-hospitality-squeeze/)

### Inferences
- **[INF] Churn mitigation:**
  - Sell to **multi-venue groups and pubs first**; they are more resilient [BK].
  - Bill monthly with no lock-in. Hospitality buyers resist contracts, as the sibling note's Jitjatjo evidence shows.
  - When a venue closes, keep its asset and vendor record so new owners of the same site inherit it. Equipment often transfers with the business sale [BK].
- **[INF] Landlord routing as a feature.** At onboarding, capture which equipment is landlord-owned (from the lease or condition report). When a fault comes in, the agent texts the landlord or agent with a timestamped written notice and dispatches a tenant-paid tech only if the landlord doesn't act. Small tenants struggle with this, and no tool found does it.
- **[INF] Leakage in coffee.** Don't fight the roaster. Route coffee faults to the roaster's tech first (the "saved supplier" step) and use the network only when that tech can't respond in the venue's tolerance window. Make money on refrigeration, warewashers, plumbing, electrical, gas, locks, glass and exhaust, where the long tail lives.
- **[INF] 24/7 commitment.** The 15-minute promise should be a **phone callback for triage**, not arrival on site. A remote triage call can resolve or narrow many faults (tripped breakers, blocked filters, error codes) [BK]. Offer business-hours and after-hours tiers, and recruit specialist techs explicitly for evening and weekend cover. For a solo founder, the AI agent handles intake and outreach overnight, but escalations, such as no tech found within 15 minutes, need a human on-call rota or an SLA credit.
- **[INF] Other risks:**
  - **Price sensitivity:** independents may see A$99 a month as "another subscription". Per-incident pricing (for example A$29–49 per dispatch) as a fallback tier could lower the barrier.
  - **Liability:** vetting licences (gas fitters, electricians, refrigerant handling licences [BK]) and insurance is essential. A botched gas job dispatched by the platform is a reputational and possibly legal risk.
  - **Platform risk:** dependence on Lightspeed API access.
  - **Fast followers:** roasters, equipment distributors or Ordermentum could add a "get help" button.

### Gaps
- *Cheng v Wang* outcome and current VCAT treatment of landlord-installed restaurant equipment were not confirmed. Legal check needed.
- No retail- or hospitality-specific Victorian data on how often lease disputes over repairs arise.
- Refrigerant handling licensing (ARCtick) and gas-fitter licence verification processes were not researched [BK].
- No churn data for Australian hospitality SaaS products (Ordermentum, Lightspeed, Deputy) was found.

---

## Q8. Verdict: are hospitality and retail venues the best business beachhead? (scores 1–10)

### Takeaway
**Hospitality, specifically 2–10-venue café, restaurant and pub groups in inner Melbourne, is the strongest business beachhead *for this founder*.**
- **Founder fit:** the Lightspeed integration, sales dashboards and hospitality relationships carry over directly.
- **Proven category:** 86 Repairs and ResQ prove phone- or chat-first repair dispatch for restaurants in North America.
- **Frequency:** about 1.5 critical-equipment failures per location per month in US chain data.
- **No local competitor:** no Australian AI- or text-first dispatcher for independents surfaced.

It is not unambiguously the best on raw economics. Short-stay co-hosts, ranked #1 in the sibling note, likely have more urgent needs per account. Single-site cafés have high churn (12% closures a year), price sensitivity, and a coffee-machine fault category already partly served by roasters.

**Non-food retail is a weak beachhead** (low repair frequency, centre management handles base building). **Food retail** is a reasonable extension.

Recommended positioning [INF]: **"86 Repairs for Australian independents, run by an AI dispatcher you text"**.
- Saved vendors first, network second.
- Landlord routing.
- Downtime-cost reporting from Lightspeed data.
- Priced at about A$79–149 per venue per month, plus a provider fee on new connections only.

### Cited Findings
Key anchors, all cited in Q1–Q7:
- 86 Repairs: 1.5 critical-equipment failures per location per month (older, 2020); managed 24/7 subscription; US$24M raised. — [QSRweb](https://www.qsrweb.com/news/restaurants-endure-at-least-15-monthly-equipment-issues/); [QSR Magazine](https://www.qsrmagazine.com/news/86-repairs-raises-152-million-series-funding/)
- ServiceChannel: 1M+ work orders across 16,441 QSR locations and 694k+ across 4,874 FSR locations; US$928 average FSR invoice. — [ServiceChannel 2025 benchmark](https://servicechannel.com/wp-content/uploads/2025/02/ServiceChannel-Benchmark-Report-2025-R5-DIGITAL.pdf)
- ResQ: US$39M Series A, restaurant repair marketplace. — [BetaKit](https://betakit.com/?p=314107)
- Melbourne after-hours call-outs of $300–500 (electrical) and $263–735 (plumbing emergencies); coffee maintenance of A$500–2,000 a year. — [Approved Electrix](https://www.approvedelectrix.com.au/?p=14765); [What's The Damage](https://whatsthedamage.com.au/plumber-cost-melbourne/); [HospitalityHub](https://www.hospitalityhub.com.au/commercial-coffee-machine-prices-in-australia-buyer-s-guide-for-caf-s-and-hospitality-venues/f/26412)
- Lightspeed: 10,000+ ANZ venues and 95+ integration partners, none observed in maintenance. — [Lightspeed AU](https://www.lightspeedhq.com/au/lightspeed-vs-square/); [App Store](https://apps.apple.com/app/id1486190847)
- Victoria: 26,156 cafés, restaurants and takeaways (2024); Australia: about 89,000 (2025, provisional). — [Tourism Victoria](https://tourism.vic.gov.au/__data/assets/pdf_file/0007/2377177/Tourism-businesses-in-Victoria-June-2024.pdf); [TRA](https://www.tra.gov.au/content/dam/austrade-assets/global/wip/tra/documents/tbia/tourism-businesses-in-australia-2025-fact-sheet.docx)
- 12.03% annual closure rate. — [CreditorWatch](https://creditorwatch.com.au/blog/one-in-eight-cafes-restaurants-closing)
- Section 52 landlord repair duty. — [VSBC](https://www.vsbc.vic.gov.au/who-we-help/retail-tenants-landlords/repairs-maintenance/)
- hipages leads up to about $200, shared with up to three businesses; ServiceChannel provider fee capped at US$3. — [What's The Damage](https://whatsthedamage.com.au/tradies/hipages-cost/); [ServiceChannel help](https://servicechannel.atlassian.net/wiki/x/AYDCv)

### Inferences
**Scores (1–10; higher is better on every row, so "Low leakage" 10 means the least leakage).** All scores are my judgement from the evidence above plus labelled [BK] assumptions. Treat them as directional.

| Criterion | Score | Rationale |
|---|---|---|
| Need frequency | **7** | US chain data: about 1.5 critical failures per location per month (86 Repairs) and 20–140 work orders per location per year (ServiceChannel). Independents have less equipment, so estimate 0.5–1.5 urgent calls a month per café and 1–3 per restaurant or pub. Multi-venue groups multiply this. Below short-stay co-hosts per account, above most other business segments. |
| Low leakage | **5** | The coffee machine (the most frequent fault) is often tied to the roaster's or a regular tech. Refrigeration and plumbing regulars form quickly. The long tail (gas, glass, locks, exhaust, warewasher), after-hours gaps and multi-venue groups resist leakage, and the "saved vendor first" design turns leakage into retention if the venue pays a subscription. |
| Willingness to pay (venue) | **6** | Venues already pay diagnostic fees ($148.50), after-hours call-outs ($300–735) and A$500–2,000 a year for coffee maintenance. Downtime costs plausibly A$1–2.5k per weekend-morning outage. US chains pay 86 Repairs and ResQ. But margins are thin, 12% close each year, and hospitality buyers resist lock-in subscriptions. |
| Provider lead value | **5** | Commercial tickets are large (about A$375 for an average coffee repair; US$928 for an average US FSR invoice), and generalist trades already pay hipages (leads up to about $200; A$2,475 a year on average). But specialist hospitality techs are capacity-constrained at peaks, and enterprise FM networks charge providers almost nothing (US$3 cap). Provider fees work as a secondary line. |
| Solution gap | **7** | No Australian text- or AI-first dispatcher for independents found. CMMS and FM tools assume known vendors; one-call FM firms target large portfolios; Airtasker is bid-based. The North American analogues target chains and don't operate visibly in Australia. The coffee-machine and routine-servicing gap is smaller. |
| Ease of reaching buyers | **7** | Dense inner-Melbourne strips allow walk-in sales. The founder's existing Lightspeed merchants are warm leads. Lightspeed has 10k+ ANZ venues with no visible maintenance partner, Ordermentum has 47k venues, AHA Vic has 1,000+ pubs, and roasters can act as channel partners. Downsides: owners are sold to constantly, and marketplace terms are unverified. |
| Founder fit | **8** | The Lightspeed integration gives instant venue profiles, downtime-cost ROI reporting and proactive "sales stopped" prompts. The founder knows hospitality data and buyers. The new capability needed is supply-side ops: recruiting and vetting commercial techs and covering after-hours. |
| Defensibility | **5** | Switching costs come from the per-venue asset register, vendor and warranty history, landlord routing, POS-linked downtime analytics and a vetted after-hours tech roster. But the tech barrier is low, roasters, Ordermentum or Lightspeed could add "get help", and 86 Repairs or ResQ could enter Australia. |
| **Total** | **50/80** | |

**Comparison with alternatives** [INF]:
- **Against short-stay co-hosts** (#1 in the sibling note, 44/60 on a different six-criterion scale):
  - Co-hosts likely have more urgent needs per account and lower closure risk.
  - Hospitality wins on founder fit (Lightspeed), proof of category (US analogues), a commercial-grade willingness-to-pay story (downtime equals lost revenue, measurable from POS), and channel leverage (POS marketplaces, roasters, AHA).
  - For *this* founder, hospitality is the better business beachhead. Co-hosts are a strong second segment that reuses the same residential trade supply.
- **Retail split:**
  - **Non-food retail:** low frequency (locks, glass, electrical, HVAC, POS and IT) and centre-managed base building. **Not a beachhead.** Possibly an add-on for Lightspeed X-Series retailers later.
  - **Food retail** (bakeries, delis, butchers, liquor and convenience stores with cool rooms): **a good extension.**

**Recommended beachhead and go-to-market** [INF]:
1. **Segment:** 2–10-venue café, restaurant and pub groups in inner Melbourne, ideally on Lightspeed K-Series or X-Series. The owner or ops lead is the dispatcher and is often off-site, which is where proactive POS prompts matter.
2. **Offer:**
   - "Text one number. Your own tech is tried first; if they can't call within 15 minutes, a vetted commercial tech will."
   - Landlord routing and written notices.
   - Asset and warranty register built from the conversation.
   - A monthly downtime report using Lightspeed sales.
   - Business-hours tier at about A$79 per venue per month; 24/7 tier at about A$129–149.
   - Provider fee of about A$30–60 on new commercial relationships only.
3. **Supply first:** recruit 3–5 techs per core category (refrigeration, coffee, warewasher, plumbing and drains, electrical, gas, locks and glass) across inner Melbourne, with explicit after-hours rosters.
4. **Partners:** 2–3 roasters as design partners, with coffee faults going to the roaster's tech first. AHA Vic for pubs.
5. **Kill or continue test (90 days):** 20 venues on a paid pilot. Measure:
   - Requests per venue per month: continue if ≥0.8.
   - Share going to the network rather than saved vendors: target ≥30%.
   - Median time to callback: target ≤15 minutes.
   - Conversion from free to paid: target ≥50% of pilots.

### Gaps
- No customer interviews validate the scores. The founder should run about 15 discovery calls with Melbourne venue owners (5 single-site cafés, 5 multi-venue groups, 5 pubs) to measure actual urgent incidents a month, the share their regular vendors can't handle in time, and willingness to pay at A$79–149.
- No supply-side validation: whether Melbourne refrigeration, coffee and warewasher techs will commit to 15-minute callbacks and pay per new venue.
- North American unit economics (86 Repairs or ResQ pricing per location, churn, gross margin) were not found. They would calibrate the Australian price point.
- Whether 86 Repairs, ResQ or ServiceChannel plan Australian entry is unknown.
