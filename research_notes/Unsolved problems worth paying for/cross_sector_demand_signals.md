# Cross-Sector Demand Signals: Unsolved Problems People and Businesses Would Pay For (as of 18 October 2026)

> **How this was researched, and its limits (read first).** I used a signal-first method: regulatory forcing functions, VC requests, founder and forum signals, and a primary-data scan of the YC company directory. Three constraints shaped these notes:
> 1. **Web search budget ran out partway through.** The 200-searches-per-turn budget is shared by all parallel researchers, and it was used up after about 15 of my queries. Direct page fetches (WebFetch/curl) were also blocked for every host I tried: ycombinator.com, hn.algolia.com, reddit.com, bls.gov. So I could not pull Reddit threads, job-board counts, BLS tables, Acquire.com listings or startup post-mortems directly.
> 2. **Primary dataset used instead.** I cloned the public `yc-oss/api` mirror of the YC company directory (6,306 companies, snapshot committed 2026-10-18; [yc-oss/api](https://github.com/yc-oss/api)) and keyword-scanned one-liners, descriptions and tags. This measured (a) how crowded each candidate problem is among 2024–2026 YC companies (about 1,982 companies in batches Winter 2024 to Summer 2027) and (b) which attempts are already marked Inactive. Keyword counts are upper bounds, because regex matching gives false positives. Company-level claims below were checked by reading each company's YC description.
> 3. **Unverified leads.** Anything I know only from background knowledge (training data to mid-2026) is kept out of Cited Findings. It is listed under **Gaps → "Unverified leads"** for the writer or a follow-up pass to check.
>
> Scope note: healthcare, finance/legal, SMB/trades, property/energy, industrial/logistics, consumer life admin and knowledge work are covered by other researchers. These notes stress government and public sector, public benefits, nonprofits, education, and cross-cutting regulatory deadlines. They also look at the "AI-native outcome firm" model across all of these.

---

## Which problems show up repeatedly across different signal types? (candidate list, top-5 ranking, traps)

### Takeaway
The strongest multi-signal problems outside the standard sectors sit where **a legal deadline meets a chronically understaffed public or semi-public back office**:
- accessibility remediation of public-entity content (ADA Title II, April 2027 and April 2028)
- Medicaid work-requirement compliance (from 1 Jan 2027)
- public-records (FOIA) fulfillment
- local-government permitting
- the EU and US-state wave of reporting mandates: packaging EPR, the Cyber Resilience Act, pay transparency and e-invoicing

Several of these have **zero or near-zero 2024–2026 YC companies** despite hard deadlines. The most crowded areas look attractive on forums but are heavily funded: SMB voice agents, AR/collections, insurance operations, freight brokerage, and fintech compliance copilots.

### Cited Findings

#### Cross-cutting signals (apply to several candidates)
- **YC's Fall 2026 RFS** has 13 requests under the theme "AI is moving into the physical world" ([superframeworks](https://superframeworks.com/articles/yc-fall-2026-rfs-indie-hacker-plays); [explainx](https://explainx.ai/blog/yc-requests-for-startups-fall-2026)).
  - Requests include "AI-Native Compliance Infrastructure" (written by Daivik Goel), "A Cloud for Small Software", "Self-Maintaining APIs", "Multiplayer AI", "AI for the Aging Population", "Compute at Sea", and a defense request from Army Secretary Daniel Driscoll. That is the first RFS written by a sitting US official ([YC RFS page](https://www.ycombinator.com/rfs); [superframeworks](https://superframeworks.com/articles/yc-fall-2026-rfs-indie-hacker-plays)).
  - Superframeworks estimates about 10 of the 13 are software-first. It names five a tiny team could ship: A Cloud for Small Software, Self-Maintaining APIs, Multiplayer AI, AI-Native Compliance Infrastructure, and the software slice of AI for the Aging Population ([superframeworks](https://superframeworks.com/articles/yc-fall-2026-rfs-indie-hacker-plays)).
- **The YC compliance request** says "Financial compliance is still stitched together with spreadsheets, siloed tools, and expensive headcount." It asks for a unified obligations and controls register, automated regulatory monitoring, anomaly detection and tamper-evident audit trails ([modelence summary](https://modelence.com/yc-rfs-fall-2026/ai-native-compliance-infrastructure); [YC RFS](https://www.ycombinator.com/rfs)).
- **YC Summer 2026 RFS** covered 15 categories, including AI, hardware, defense, agriculture and space; the hard-tech and physical-AI tilt continues ([yespress](https://yespress.io/y-combinator.md); [Round Funded](https://www.roundfunded.com/blogs/yc-summer-2026-request-for-startups-15-categories)).
- **HN, "What do you still do manually in 2026 that should be automated?"** The author's criteria were tasks done 5+ times a week, with no good tool found, that the poster would pay $10–20/month for. Replies cite workflow tools that break often or need more setup than the task itself ([Ask HN](https://news.ycombinator.com/item?id=48045237)).
- **HN, unpaid invoices:** a founder describes chasing overdue invoices as "manual, awkward" with no good system. Small businesses fall back on QuickBooks/Xero auto-reminders or manual WhatsApp messages ([Ask HN](https://news.ycombinator.com/item?id=47638685)).
- **HN, willingness to pay:** companies will pay about $5/month for a small web tool that saves time. Individuals are "much less willing". One commenter notes AI will probably build most of the things you'd charge a tiny fee for ([Ask HN](https://news.ycombinator.com/item?id=44019193)).
- **Upwork In-Demand Skills 2026 (published 4 Feb 2026):**
  - Skills that explicitly reference AI grew 109% YoY. AI video generation grew 329%, AI integration 178%, and AI data annotation and labeling 154%.
  - Full stack development, **general virtual assistance**, data analytics and graphic design "remained consistently strong year over year" ([Upwork press release](https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work)).
- **HFS "Services-as-Software" thesis:**
  - The global BPO market is projected at $725B by 2035 under a Services-as-Software scenario, versus $786B on the conventional path. The $61B gap is work shifting from FTE billing to outcome contracts.
  - "Three in four" enterprise leaders expect to shift to SaS models.
  - Legacy procurement habits, fragmented systems and vendor credibility gaps slow adoption more than technology does ([HFS Research](https://www.hfsresearch.com/research/bpo-services-as-software-turning/); [Outsource Accelerator](https://news.outsourceaccelerator.com/bpo-services-as-software/)).
  - HFS sells this framing, so treat it as advocacy-adjacent.
- **Outcome-pricing benchmarks:** Intercom Fin $0.99 per resolved conversation; Zendesk $1.50 per automated resolution (committed) or $2.00 (pay-as-you-go); Salesforce Agentforce $2 per conversation ([Monetizely](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models); [Pickaxe](https://pickaxe.co/post/ai-agent-pricing-models)).
- **BPO consolidation in 2025:** Capgemini acquired WNS for $3.3B, TELUS took TELUS Digital private, and Blackstone took TaskUs private. Workato frames these as moves from labor arbitrage toward AI-powered, outcome-priced operations ([Workato](https://www.workato.com/the-connector/bpo-agentic-ai/)).
- **YC "AI-native services firm" trend** (keyword scan, manually checked): companies that sell the service itself rather than software rose from 2 (2024 batches) to 4 (2025) to **13 (2026)** ([yc-oss/api dataset](https://github.com/yc-oss/api)). Examples:
  - [Last Accounting Company](https://www.ycombinator.com/companies/last-accounting-company) (S26): "full-stack AI accounting firm… agents handle everything and a certified accountant signs off".
  - [Rex](https://www.ycombinator.com/companies/rex-inc) (S26): AI-native BPO for order-to-cash, "a $60B outsourced function".
  - [Zomma](https://www.ycombinator.com/companies/zomma) (S26): an AI BPO handling KYC reviews, transaction alerts and disputes "on the same screens human analysts use".
  - [Alchemize](https://www.ycombinator.com/companies/alchemize) (Sp26): AI-native customs brokerages.
  - [Fernstone](https://www.ycombinator.com/companies/fernstone) (F25): an AI-native insurance brokerage managing risk for 500+ businesses.
  - [Billow AI Labs](https://www.ycombinator.com/companies/billow-ai-labs), [Balance](https://www.ycombinator.com/companies/getbalance), [Moritz](https://www.ycombinator.com/companies/moritz), [Vector Legal](https://www.ycombinator.com/companies/vector-legal) and [Blueshoe](https://www.ycombinator.com/companies/blueshoe).

#### Candidate problems (16), with evidence
Format for each: (a) buyer, (b) problem and frequency, (c) demand signals, (d) existing solutions, (e) why now, (f) market size, (g) small-team feasibility, (h) risks. "YC scan" means the yc-oss dataset described above.

**C1. Accessibility remediation of public-entity digital content (documents, PDFs, video, apps) under ADA Title II, sold per document or per page. Geography: US (EU analogue unverified).**
- (a) ADA coordinators, clerks, web/IT managers and communications staff at US state and local governments, special districts, public school districts, community colleges, public universities and transit agencies. All are Title II public entities.
- (b) Every public-facing web page, mobile app, and third-party-managed piece of content must meet **WCAG 2.1 Level AA**, subject to five narrow exceptions ([Illinois Lawyer Now](https://www.illinoislawyernow.com/2026/04/doj-extends-title-ii-ada-web-content-accessibility-compliance-deadlines/); [Jackson Lewis](https://www.jacksonlewis.com/index%2Ephp/node/32560)). The work is a continuous flow (agendas, minutes, forms, budgets, meeting video) on top of a legacy backlog.
- (c) **Forced demand.** On 20 April 2026 DOJ published an interim final rule moving the deadlines:
  - Entities serving 50,000+ people: from April 2026 to **26 April 2027**.
  - Entities under 50,000 and special district governments: **26 April 2028** ([Illinois Lawyer Now](https://www.illinoislawyernow.com/2026/04/doj-extends-title-ii-ada-web-content-accessibility-compliance-deadlines/); [UNC School of Government](https://canons.sog.unc.edu/2026/01/understanding-the-new-ada-web-accessibility-requirements-for-state-and-local-governments/); [JD Supra](https://www.jdsupra.com/legalnews/doj-extends-public-entities-compliance-7695347/)).
  - A separate **HHS rule had a May 2026 compliance date**; whether HHS will extend it "remains to be seen" ([Jackson Lewis](https://www.jacksonlewis.com/index%2Ephp/node/32560)).
  - Benefits brokers and law firms are publishing compliance guides, a sign of professional-services demand ([HUB International](https://www.hubinternational.com/en-us/hub-resources/absence-management-bulletins/2026/04/ada-title-ii-web-and-mobile-application-accessibility-rule/)).
  - **YC scan: zero 2024–2026 YC companies focused on digital accessibility compliance or remediation.** The nearest is [Aucert](https://www.ycombinator.com/companies/aucert) (F26), AI agents that test mobile apps ([yc-oss/api](https://github.com/yc-oss/api)).
- (d) Overlay widgets and manual remediation shops exist; see Gaps for unverified names and critiques.
- (e) Hard dates in 2027 and 2028, plus vision LLMs that can now generate alt text, reading order and tags at low per-page cost.
- (f) Not verified; see Gaps for counts of governments and districts.
- (g) High. The MVP takes a PDF or Word document in and returns a tagged PDF or HTML plus a conformance report. Sell per page, or as an annual subscription per entity, through municipal leagues and state purchasing cooperatives.
- (h) The deadlines already slipped once, and the rule could be weakened again. There is liability for missed defects. CMS vendors may bundle remediation. Public budgets are tight.

**C2. Public-records (FOIA and state open-records) request fulfillment for local agencies, sold per request. Geography: US (UK FOI and Australian FOI analogues).**
- (a) City and county clerks, records officers, police records units and school-district counsel.
- (b) Searching email and documents for responsive records, deduplicating, redacting, and drafting response letters under statutory deadlines.
- (c) [GovGuard](https://www.ycombinator.com/companies/govguard) (YC Spring 2026) says public records teams "spend hours searching for responsive records and applying redactions." It says many offices "still redact sensitive information line by line with a sharpie", that local governments "spend billions processing these requests", and that a city that misses a legal deadline "can be sued." [Bluedoor](https://www.ycombinator.com/companies/bluedoor) (YC S24, team of 1) also automates fulfillment. Two YC teams in two years, both tiny, suggests an early market ([yc-oss/api](https://github.com/yc-oss/api)).
- (d) Request-portal incumbents exist (names unverified; see Gaps). They manage intake and workflow rather than doing the search and redaction.
- (e) LLM document review and redaction, plus litigation exposure over missed deadlines.
- (f) Not verified.
- (g) Medium-high. Start with email and PDF redaction on uploaded corpora, priced per request or per page. Integrations with Microsoft 365 or Google Workspace are needed later.
- (h) Data-access and security approvals, liability for an over- or under-redacted release, and government sales cycles. Police video redaction is a separate, incumbent-heavy problem.

**C3. Local-government permitting intake and plan review (government side). Geography: US.**
- (a) Building departments, permit technicians and plan reviewers.
- (b) A high-volume flow of applications and plan sets reviewed against code.
- (c) Founder and traction signals from YC companies:
  - [Verdant](https://www.ycombinator.com/companies/verdant) (S26) calls permitting "the highest-volume workflow in local government that requires judgment". It claims "200+ applications" processed and "0 to 4 paid deployments across 4 states with an average close time of 4 weeks."
  - [Permitify](https://www.ycombinator.com/companies/permitify) (W25) says building departments are "understaffed and overworked" and "usually the only profitable/self-sustaining branch of a local government."
  - [EffiGov](https://www.ycombinator.com/companies/effigov) (S25) runs AI 311 call operators that handle "everything from permit applications to animal control."
  - [PermitPortal](https://www.ycombinator.com/companies/permitportal) (F24) describes itself as an "AI Operating System for Pre-construction"; its YC description mentions permitting.
- (d) At least 4 YC teams in 2024–2026, plus applicant-side tools (unverified).
- (e) Housing-supply politics and building-department staffing shortages.
- (f) Not verified.
- (g) Medium. Verdant's 4-week close claim suggests small-dollar local-government deals can move fast.
- (h) **Getting crowded.** Code variation by jurisdiction, and liability for plan approvals.

**C4. Medicaid work-requirement and six-month redetermination compliance: helping eligible people keep coverage. Sell to managed care organizations (MCOs), health centers, hospitals and counties, per retained member. Geography: US.**
- (a) Medicaid MCOs, federally qualified health centers (FQHCs), safety-net hospitals and county human-services agencies. State agencies buy system changes through large vendors.
- (b) Enrollees in expansion states must document work, community engagement or exemptions. Coverage is renewed every six months.
- (c) **Forced demand:**
  - The One Big Beautiful Bill Act (OBBBA) was signed 4 July 2025.
  - About 41–43 expansion and partial-expansion states, sources differ, must start by **1 January 2027**. Nebraska started first on 1 May 2026; Montana targets 1 July 2026 and Iowa 1 December 2026.
  - States had to send enrollee notices by **31 August 2026**, a timeline described as "incredibly tight."
  - CMS issued preliminary guidance in December 2025 and announced vendor pledges.
  - States must verify compliance using "reliable information available to the State" such as payroll data.
  - HHS can grant good-faith extensions to **31 December 2028**.
  - A lawsuit challenges the interim final rule's medical-frailty provisions.
  - Sources: [TechTarget](https://www.techtarget.com/healthcarepayers/news/366642528/How-are-states-preparing-for-Medicaid-work-requirements); [McDermott+](https://www.mcdermottplus.com/blog/regs-eggs/ready-set-go-implementation-of-medicaid-work-requirements-is-on-its-way/); [CHCS](https://www.chcs.org/resource/a-summary-of-national-medicaid-work-requirements/); [Ballotpedia](https://news.ballotpedia.org/2026/01/23/mandatory-medicaid-work-requirements-are-coming-what-do-they-look-like-now/); [Medicaid Work Navigator timeline](https://www.medicaidworknavigator.com/timeline/).
  - The Urban Institute published projections of reduced expansion enrollment under the work requirements and six-month redeterminations ([Urban Institute, Mar 2026](https://www.urban.org/sites/default/files/2026-03/Projected%20Reductions%20in%20Medicaid%20Expansion%20Enrollment%20Under%20OBBBA%E2%80%99s%20Work%20Requirements%20and%20Six-Month%20Redeterminations_325.pdf)).
  - CBPP assessed the state vendor landscape ([CBPP](https://www.cbpp.org/research/health/assessing-the-medicaid-work-requirement-vendor-landscape)). Advocates warn of "administrative disenrollment" of eligible people.
- (d) Large state IT vendors handle the state side. Navigation vendors exist, such as [Activate Care](https://www.activatecare.com/hubfs/Activate%20Care%20Work%20Requirements%20FAQs%20(1).pdf) and independent sites like Medicaid Work Navigator. **YC scan: no 2024–2026 YC company targets work-requirement compliance.** [Cova](https://www.ycombinator.com/companies/cova) (S26) is caregiving finance, which is adjacent.
- (e) A new federal mandate with a 2027 start.
- (f) Not quantified here; enrollment figures are in the Urban Institute PDF.
- (g) Medium. The MVP is outreach, exemption documentation and payroll-data matching, plus submission help per state. Sell to MCOs on outcome pricing per member retained.
- (h) Policy reversal or extensions, 40+ different state implementations, HIPAA, ethical sensitivity, and overlap with the healthcare researcher. States may automate verification from existing data, which would shrink the need.

**C5. EU Pay Transparency Directive compliance for mid-market, multi-country employers. Geography: EU.**
- (a) HR, reward and payroll leads at employers with 150–1,000+ staff across several EU states.
- (b) Information requests from workers, annual notices, gender pay-gap reporting and joint pay assessments.
- (c) The transposition deadline was **7 June 2026**, and only about four of 27 member states met it; tallies differ by source. Employers with 250+ staff, and those with 150–249, file first reports by **7 June 2027** on 2026 data ([Lewis Silkin](https://www.lewissilkin.com/insights/2026/07/01/eu-pay-transparency-directive-2026-employer-compliance); [Ravio](https://ravio.com/blog/everything-you-need-to-know-about-the-eu-pay-transparency-directive); [Pave](https://www.pave.com/blog-posts/eu-pay-transparency-directive)).
  - **Syndio's July 2026 survey of 101 enterprises:** 78% had not yet issued an annual notice to workers. 39% of organizations in countries that had already transposed had received worker requests by July ([HR Brew](https://www.hr-brew.com/stories/eu-pay-transparency-directive-survey); [Syndio](https://synd.io/blog/eu-pay-transparency-directive-readiness-survey/)). Syndio sells pay-equity software.
  - Commentary notes that guidance stops at the HRIS, while for shift-based workforces the reportable gap is partly built in the scheduling layer (overtime, shift premiums) ([WorkAxle](https://www.workaxle.com/blog/eu-pay-transparency-directive-2026)). WorkAxle sells scheduling software, so this is opinion.
- (d) Syndio, Ravio, Pave and WorkAxle are all marketing to this. **YC scan: zero 2024–2026 YC pay-transparency companies.**
- (e) The 2027 reporting deadline, plus requests already arriving.
- (f) Not verified.
- (g) Medium. It needs payroll and HRIS integrations and job-architecture work. Uneven national laws make the rules engine valuable.
- (h) Vendors are moving fast, transposition is fragmented and possibly diluted, and HRIS and payroll suites may bundle this.

**C6. EU e-invoicing mandates for micro and small businesses and non-EU sellers. Geography: BE, PL, FR, DE, then EU-wide.**
- (a) Small businesses, their accountants, and foreign sellers invoicing EU businesses.
- (b) Every B2B invoice must use a structured format (Peppol or a national platform).
- (c) The timeline ([OriginStamp](https://originstamp.com/en/blog/reader/eu-e-invoicing-mandates-timeline-2026-2030); [Invoice Navigator](https://www.invoicenavigator.eu/answers/eu-e-invoicing-mandate-timeline); [Finbite](https://finbite.eu/en/e-invoicing-mandates-europe-2026/)):
  - **Belgium:** Peppol B2B mandatory 1 January 2026.
  - **Poland (KSeF):** large taxpayers 1 February 2026, most others 1 April 2026, micro businesses 1 January 2027, penalties waived through end-2026.
  - **France:** all businesses must receive from 1 September 2026, large and mid-size must issue then, and smaller firms issue from September 2027. One source says 2028 for micro businesses.
  - **Germany:** receiving required since 1 January 2025; issuing from 1 January 2027 for turnover above €800k and from 1 January 2028 for everyone else.
  - EU-wide ViDA targets 2030.
- (d) Many incumbents (unverified names). **YC scan: no 2024–2026 YC e-invoicing company.**
- (e) Hard national dates.
- (f) Large by count of businesses, but low revenue per user.
- (g) Medium-low. Certification (for example French platform accreditation) and incumbent accounting suites raise the bar.
- (h) **Likely commoditized.** Government portals and accounting suites absorb most of it. The opening is narrow: cross-border non-EU sellers, or the "AI reads PDF invoices and converts them" bridge.

**C7. Packaging EPR (US states) and EU PPWR data and reporting for small and mid-size consumer brands and e-commerce sellers. Geography: US (OR, CO, CA, MN, MD, WA, ME) and EU.**
- (a) Ops and compliance leads at food, beauty and household brands and Amazon or Shopify sellers.
- (b) Building packaging data by component, weight and material for each SKU and state, filing annual supply reports, and paying fees.
- (c) Seven states have packaging EPR laws. Six required reports by **31 May 2026** ([Faegre Drinker](https://www.faegredrinker.com/en/insights/publications/2026/5/extended-producer-responsibility-six-state-reports-due-may-31); [FoodNavigator-USA](https://www.foodnavigator-usa.com/Article/2026/04/15/epr-packaging-deadline-may-31-what-cpgs-must-know/)).
  - Oregon DEQ published a **non-compliance list on 10 April 2026**.
  - 2026 is Colorado's first year of mandatory fees, and a lawsuit was filed in March 2026.
  - California finalized its SB 54 regulations on 1 May 2026, with a source-reduction plan reported as due 1 August 2026 ([O'Melveny](https://www.omm.com/insights/alerts-publications/2026-plastics-epr-packaging-rules-update-what-sb-54-sb-343-state-reporting-deadlines-prc-laws-the-eu-ppwr-mean-for-producers-retailers/); [Environmental Law & Policy](https://www.environmentallawandpolicy.com/2026/06/packaging-epr-hits-full-swing-key-milestones-across-california-maryland-and-beyond/)).
  - Each state sets its own covered materials, fees and rules, although Circular Action Alliance is the shared producer responsibility organization in most states ([Trayak](https://trayak.com/state-by-state-overview-2026-epr-regulations/)).
  - In the EU, PPWR applies from mid-2026, including a PFAS ban in food-contact packaging from August 2026 ([RegDossier](https://regdossier.eu/eu-compliance-deadlines/); [Adherent](https://www.adherent.com/guides/eu-countdown-of-top-12-compliance-deadlines/)).
- (d) Trayak and Certivo publish EPR guides, a sign of vendor activity. **YC scan: zero 2024–2026 YC EPR or packaging-compliance companies.** The one related prior YC company, [GreenTally](https://www.ycombinator.com/companies/greentally) (S23, carbon tracking), is Inactive.
- (e) Fees are now live and enforcement lists are public.
- (f) Not verified.
- (g) Medium-high. LLMs can extract packaging specs from supplier documents and photos into per-state reports. Sell per SKU or per state filing.
- (h) Litigation and injunctions (a February 2026 preliminary injunction in Oregon covers some trade-association members), rule churn, and possible overlap with the industrial researcher.

**C8. EU Cyber Resilience Act vulnerability reporting and technical documentation for small makers of connected products and software. Geography: EU market, global manufacturers.**
- (a) Small and mid-size hardware, IoT and software makers selling into the EU.
- (b) Exploited-vulnerability and incident reporting, SBOMs, vulnerability handling, and conformity documentation.
- (c) Reporting obligations started **11 September 2026** through ENISA's single reporting platform: an early warning within 24 hours, then notification within 72 hours. The main obligations apply from **11 December 2027** ([Bright Defense](https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/); [SureCloud](https://www.surecloud.com/blog-hub/eu-cyber-resilience-act-timeline); [HLC](https://www.hlc.com/en/publications/eu-cyber-resilience-act-getting-ready-for-cra-compliance-in-2026)).
- (d) GRC and product-security vendors are positioning. **YC scan: zero 2024–2026 YC companies on SBOM or CRA compliance.** The two older YC software-supply-chain companies were acquired.
- (e) Reporting is already live, and the full regime arrives in December 2027.
- (f) Not verified.
- (g) Medium. It needs security expertise; the MVP is SBOM generation, vulnerability triage and ENISA report drafting.
- (h) Enterprise GRC vendors expanding downmarket, and standards (harmonized standards, notified bodies) still settling.

**C9. Australia AML/CTF "Tranche 2" turnkey programs for small accounting, law and real-estate firms. Geography: AU.**
- (a) Principals and practice managers at small firms that newly provide designated services.
- (b) Enrolment, risk assessment, an AML/CTF program, customer due diligence including beneficial owners, threshold and suspicious-matter reporting, and record keeping.
- (c) Obligations began **1 July 2026**, with enrolment by 29 July 2026. AUSTRAC treated the start date as binding ([Accurium](https://www.accurium.com.au/blog/2026/09/aml-ctf-tranche-2-since-1-july-what-accountants-and-smsf-advisers-need-to-do-now-2/); [Legl](https://legl.com/articles/thirty-days-to-tranche-2-austracs-final-expectations-and-the-conduct-rule-changes-landing-on-1-july); [Cascade](https://cascade.lu/resources/tranche-2-australia-guide/)).
  - Common gaps: screening only the direct client and missing beneficial owners, manual checks that are hard to evidence, and undocumented risk decisions ([Cascade](https://cascade.lu/resources/tranche-2-australia-guide/)).
  - AUSTRAC published free Program Starter Kits for small businesses in these sectors ([Cascade](https://cascade.lu/resources/tranche-2-australia-guide/)).
- (d) Legl, Class, Accurium, Nexiant and Moody's are all active ([Class](https://www.class.com.au/news/aml-ctf-tranche-2-readiness-whats-changing-and-whats-next/); [Nexiant](https://nexiant.ai/resources/blogs/tranche-2-aml-reforms-australia/); [Moody's](https://www.moodys.com/web/en/us/kyc/sectors/corporates/tranche-2-reforms.html)).
- (e) A new regime that is now enforced.
- (f) Cost figures were not found.
- (g) Medium-high for an AU-focused team.
- (h) **Already competitive**, free AUSTRAC kits lower the floor, and overlap with the finance and legal researcher.

**C10. Product regulatory compliance for cross-border consumer brands (labels, formulations, documentation). Geography: EU and US.**
- (c) Two recent YC entrants: [Complir](https://www.ycombinator.com/companies/complir) (Sp26, team 13, "Vanta for physical products": AI agents that keep a catalogue "audit-ready" in every market) and [MarkIt](https://www.ycombinator.com/companies/markit) (F25: reviews formulations, packaging and documents against local rules, starting with cosmetics and food entering the US). The EU Forced Labour Regulation applies from 14 December 2027; the first ESPR delegated act is due Q4 2026; textiles EPR transposition is due 17 June 2027 ([Sustalium](https://sustalium.com/blog/compliance-deadline-calendar-2026-2027/); [Adherent](https://www.adherent.com/guides/eu-countdown-of-top-12-compliance-deadlines/)).
- (g) Medium. (h) An emerging category with funded entrants.

**C11. Affordable-housing income certification and recertification (Low-Income Housing Tax Credit, project-based rental assistance, vouchers). Geography: US.**
- (c) [Tire Swing](https://www.ycombinator.com/companies/tire-swing) (F26) manages "the resident certification and recertification process end-to-end" and positions itself as "a drop-in replacement for third-party consultants and auditors." This is a classic consultant-replacement, outcome-sold niche.
- (h) May overlap with the property researcher; only one data point here.

**C12. Order-to-cash and AR collections, from SMB invoice chasing to enterprise O2C.**
- (c) HN pain thread ([Ask HN](https://news.ycombinator.com/item?id=47638685)). [Rex](https://www.ycombinator.com/companies/rex-inc) calls O2C a "$60B outsourced function" because exceptions "do not follow clean rules."
- (d) **YC scan: 40 keyword hits in 2024–2026 batches (20 under a stricter regex).** QuickBooks and Xero have built-in reminders.
- (h) **Crowded.** See Traps.

**C13. AI-native accounting and bookkeeping firms for SMBs, sold as the service.**
- (c) In 2026 alone YC funded [Last Accounting Company](https://www.ycombinator.com/companies/last-accounting-company), [Balance](https://www.ycombinator.com/companies/getbalance) and [Billow](https://www.ycombinator.com/companies/billow-ai-labs). The keyword scan also shows 20 recent AP, bookkeeping or accounting hits.
- (h) Crowded at the top. A niche wedge such as one vertical or one country's tax regime may still work. Overlaps the finance researcher.

**C14. Brittle workflow automations and "self-maintaining" integrations.**
- (c) HN 2026 replies complain that automations "break often or need more setup than the task itself" ([Ask HN](https://news.ycombinator.com/item?id=48045237)). YC's Fall 2026 RFS includes "Self-Maintaining APIs" ([superframeworks](https://superframeworks.com/articles/yc-fall-2026-rfs-indie-hacker-plays)).
- (d) iPaaS tools and agent builders; recent YC examples include [Kaizen](https://www.ycombinator.com/companies/kaizen) (Sp25, "Automate anything on the web") and [Nexus](https://www.ycombinator.com/companies/gpt) (F25, agents for non-technical teams).
- (h) Horizontal, with frontier labs and iPaaS incumbents competing. Stated willingness to pay ($10–20/month) is low.

**C15. Government contract discovery and bid writing for small suppliers (non-defense, local government, UK/AU/EU).**
- (c) Recent YC activity is concentrated in defense and federal: [Usul](https://www.ycombinator.com/companies/usul) (S24), [Candor](https://www.ycombinator.com/companies/candor) (W25: agents that "surface opportunities" and "actively pursue them" for defense and deeptech), [Archon](https://www.ycombinator.com/companies/archon) (W25, FedRAMP in 6 months instead of 16, saving about $1M per company) and [Capto](https://www.ycombinator.com/companies/capto) (S26). On the buyer side, [Hazel](https://www.ycombinator.com/companies/hazel-2) (W24) automates government procurement, including proposal evaluation.
- (g) Medium. (h) General RFP-response software is crowded (see Gaps). The gap claim for the SMB local-government tender niche is unverified.

**C16. Nonprofit grant writing, post-award reporting and finance.**
- (c) **YC scan: no 2024–2026 YC company does nonprofit grant writing or reporting.** [Givefront](https://www.ycombinator.com/companies/givefront) (W24, nonprofit financial management with "built-in compliance") is the only nonprofit back-office company. Grant-seeking YC activity is for companies chasing government money (Candor, Usul).
- I could not retrieve demand signals (forum posts, grant-writer pay, hours spent on reporting); see Gaps. This is a hypothesis for a VC-ignored niche, not a verified candidate.

#### YC graveyard signals relevant to these niches
Statuses are as recorded in the YC directory; reasons for failure are not given.
- [Caucus](https://www.ycombinator.com/companies/caucus) (Spring 2025, "AI CRM for Government") is already **Inactive**.
- [Halolife](https://www.ycombinator.com/companies/halolife) (S15, burial and cremation planning platform): Inactive.
- [Monthli](https://www.ycombinator.com/companies/monthli) (W16, marketplace for homeowner associations): Inactive.
- [GreenTally](https://www.ycombinator.com/companies/greentally) (S23, affordable carbon tracking): Inactive.
- [Line.Build](https://www.ycombinator.com/companies/line-build) (S23, energy-efficiency incentives and financing): Inactive ([yc-oss/api](https://github.com/yc-oss/api)).

#### Crowding check: keyword-hit counts in 2024–2026 YC batches
These are upper bounds; the regexes pick up false positives.

| Theme | 2024–26 YC hits | Read |
|---|---|---|
| Trades / field service | 49 | Crowded |
| Insurance ops / claims / brokerage | 47 | Crowded |
| SMB voice agents / receptionist / phone | 47 | Crowded |
| AR / collections | 40 (20 strict) | Crowded |
| Freight brokerage | 32 | Crowded |
| AP / bookkeeping / accounting | 20 | Crowded |
| Prior auth / RCM | 17 | Crowded |
| Dental/vet admin | 13 | Moderately crowded |
| Permitting (true hits ~4–5) | 12 | Getting crowded |
| Customs / trade (true hits ~5) | 11 | Getting crowded |
| AML/KYC (true hits ~6) | 11 | Crowded with non-YC incumbents too |
| Fintech compliance / GRC | 9 | Crowded; YC explicitly requested it |
| Healthcare credentialing | 6 | Moderate |
| Public records / FOIA | 2 true | Early |
| Accessibility compliance | 0 | Open |
| E-invoicing | 0 true | Open in YC, crowded with incumbents |
| Packaging EPR | 0 | Open |
| Pay transparency | 0 | Open in YC, non-YC vendors active |
| CRA / SBOM | 0 | Open |
| Unclaimed property / escheatment | 0 | Open (signals unverified) |
| Association management | 0 true | Open (signals unverified) |
| Special education / IEP admin | 0 | Open (signals unverified) |
| Public-meeting minutes / agendas | 0 recent | Open (signals unverified) |
| Child care admin | 0 recent | Open (signals unverified) |

Source: [yc-oss/api dataset](https://github.com/yc-oss/api), my keyword scan.

### Inferences

**Top 5 ranking.** Scores are 1–10 and are my judgment from the cited evidence; unverified elements lower confidence.

| Rank | Problem | Pain | WTP evidence | Solution gap | Market size | Small-team feasibility | Defensibility | Total /60 |
|---|---|---|---|---|---|---|---|---|
| 1 | **C1 Public-entity accessibility remediation, per document** (US; EU analogue) | 8 | 7 | 8 | 6 | 9 | 5 | **43** |
| 2 | **C4 Medicaid work-requirement and redetermination navigation sold to MCOs/providers per retained member** (US) | 9 | 7 | 7 | 7 | 5 | 6 | **41** |
| 3 | **C2 Public-records request fulfillment for local agencies** (US; UK/AU FOI) | 8 | 6 | 7 | 5 | 7 | 6 | **39** |
| 4 | **C7 Packaging EPR / PPWR data and reporting for SMB consumer brands** (US states; EU) | 7 | 6 | 7 | 5 | 7 | 6 | **38** |
| 5 | **C8 Cyber Resilience Act reporting and documentation for small connected-product makers** (EU market) | 6 | 6 | 7 | 6 | 6 | 6 | **37** |

Honorable mentions: C5 EU Pay Transparency (about 34: real deadline, but several vendors are already active) and C11 affordable-housing certification (consultant replacement, but only one signal).

Why each made the list:
- **C1 ranks first** because it combines a hard legal deadline (2027 and 2028), a buyer with a statutory obligation and no in-house skill, low technical risk for a small team, natural per-unit pricing, and zero recent YC competition.
  - Its main weaknesses are political risk (the deadline has already slipped once) and low defensibility, since remediation can be commoditized.
  - A defensible wedge would be a remediation-as-a-service agent embedded in the clerk's agenda and minutes workflow, rather than a one-off backlog cleanup.
- **C4** has the highest pain: people lose coverage, and MCOs and providers lose revenue (an inference from capitation economics, not cited). Its date is fixed by statute.
  - Feasibility is lower because of 40+ state variants, HIPAA, and a sensitive policy area.
  - Coordinate with the healthcare researcher to avoid double counting.
- **C2**: founders' own descriptions (sharpie redaction, lawsuits over deadlines) show acute pain. Two tiny YC teams suggest the market is early, not saturated.
- **C7 and C8** are forced-demand reporting regimes with **no 2024–2026 YC company** and mostly consultancy or enterprise-GRC supply. They are good candidates for profitable, VC-ignored businesses.

Problems that recur across three or more signal types:
- **Public-sector back-office work** (permits, FOIA, 311, procurement, affordable-housing certification) has YC founder narratives, a YC traction claim (Verdant's 4-week close), and statutory deadlines. This contradicts the "government never buys from startups" belief for **narrow, single-workflow** products. The failure of Caucus, a horizontal "AI CRM for Government", fits the pattern that horizontal government tools struggle.
- **Compliance reporting mandates** (EPR, CRA, pay transparency, e-invoicing, AML Tranche 2) combine regulatory forcing with vendor marketing surges. Many dates are 2026–2027, so demand is live now.
- **Consultant and BPO replacement sold as an outcome** is supported by the HFS thesis, published outcome pricing, YC's 2026 wave of AI-native firms, and Upwork's continued strength in virtual-assistant demand.

**Traps:** problems that look attractive but are crowded or have failed.
1. **SMB AI voice receptionists and phone agents.** About 47 keyword hits in 2024–2026 YC batches, and per-resolution pricing is already set near $1–2 by large incumbents (Intercom, Zendesk, Salesforce). Little differentiation is left.
2. **SMB invoice chasing and AR collections.** The HN pain is real, but about 40 YC hits, built-in QuickBooks/Xero reminders and low willingness to pay make it a trap unless narrowly verticalized.
3. **Fintech compliance copilots.** YC explicitly requested this, so expect a pile-up. Existing YC entrants include Cardamon, Sphinx, ComplyDo, Probo, Socratix, TovenAI and Zomma, on top of an established vendor base.
4. **Horizontal government platforms** ("AI OS for cities", government CRM). Caucus (Sp25) is already Inactive. Winning entrants lead with a single high-volume workflow (Verdant: permitting; GovGuard: FOIA).
5. **Generic AI virtual assistants or "AI employees" for individuals or tiny businesses.** VA demand on Upwork is strong, but individuals pay little and frontier-lab assistants commoditize the tooling ([Ask HN](https://news.ycombinator.com/item?id=44019193)).
6. **Customs and tariff classification AI.** The 2025 tariff upheaval created demand, but YC alone funded about 5 real entrants in 2024–2026 (Trava, Tarifflo, Alchemize, Forge, Pax).
7. **Insurance operations, freight brokerage, and prior auth/RCM.** Each has 17–47 YC hits in 2024–2026.
8. **E-invoicing for SMBs.** The forced demand is real, but national portals, certified platforms and accounting suites will absorb most of it. Margins look thin.
9. **Overlay-style accessibility widgets.** This is the trap inside the C1 opportunity: compliance-by-script products have attracted regulatory and legal criticism (details in Gaps). Real remediation of the content itself is the opportunity.
10. **Consumer-paid benefits navigation.** The consumer side of C4 has no payer. Sell to MCOs, providers or counties instead. A nonprofit benefits-navigation precedent is listed in Gaps.

### Gaps
- **Forum signals are thin.** Reddit and HN Algolia could not be queried, so I have no verbatim "I would pay for" quotes from r/smallbusiness, r/Entrepreneur, r/govtech, r/nonprofit, r/k12sysadmin or IndieHackers. The three HN threads cited are the only forum evidence.
- **No job-posting counts.** I could not retrieve counts from Indeed, LinkedIn or Upwork for roles such as "permit technician", "public records officer", "accessibility specialist", "grant writer" or "eligibility specialist", and no BLS figures either. See the next key question.
- **No market sizes.** TAM figures for C1–C16 were not verified: counts of US local governments, school districts and EPR-obligated producers, CRA-affected manufacturers, and so on.
- **Startup post-mortems and Acquire.com listings** were not retrievable.
- **Non-YC competitors** were not checked systematically, so "zero YC companies" does not mean no competition. Candidates to check: accessibility (Level Access, AudioEye, accessiBe, CommonLook, Equidox, Adobe), FOIA (GovQA/Granicus, NextRequest/CivicPlus, JustFOIA), RFP response (Loopio, Responsive, Arphie, AutoRFP, Inventive AI), grants (Instrumentl, Grantable, Submittable, Fluxx, Candid), EPR (Lorax EPI and other Circular Action Alliance-adjacent tools), CRA/SBOM (Finite State, Cybellum, ONEKEY), and e-invoicing (Pagero/Thomson Reuters, Sovos, Avalara, Storecove). These names come from background knowledge and are unverified.
- **Unverified leads to check:**
  - The FTC settlement with accessiBe over overlay claims (believed January 2025, about $1M).
  - The closure of nonprofit Benefits Data Trust (believed 2024), relevant to the consumer benefits-navigation trap.
  - Typical PDF remediation pricing per page.

## Which repetitive human roles are being hired at scale today that AI agents could now perform end-to-end, sold as an outcome (per-task/per-result pricing) rather than as software?

### Takeaway
The clearest evidence is YC's 2026 cohort of "AI-native firms" that **sell the job, not the tool**. That cohort grew from 2 (2024) to 4 (2025) to 13 (2026) by keyword scan. Alongside it, published per-resolution prices of about $1–2, and HFS's projection of a $61B shift from FTE billing to outcome contracts by 2035, show the model is becoming standard. Outside the crowded accounting, legal and support roles, the least contested roles to replace on an outcome basis are **public-sector clerical roles**: public records officers, permit technicians and plan reviewers, 311 operators, eligibility and recertification specialists, and document accessibility remediators. Also open are **compliance-reporting consultants** for EPR, CRA, pay transparency and affordable housing.

### Cited Findings
- **YC 2024–2026 companies that replace specific roles or outsourced functions and sell the service** ([yc-oss/api](https://github.com/yc-oss/api)):
  - **Accountants and bookkeepers:** [Last Accounting Company](https://www.ycombinator.com/companies/last-accounting-company) (S26: agents do the work, a certified accountant signs off; replaces "both outsourced accountants and legacy accounting" software), [Balance](https://www.ycombinator.com/companies/getbalance) (W26: agents "do the work of an in-house finance hire"), [Billow AI Labs](https://www.ycombinator.com/companies/billow-ai-labs) (S26).
  - **O2C and AR clerks (outsourced):** [Rex](https://www.ycombinator.com/companies/rex-inc) (S26) says O2C is "a $60B outsourced function because the work is too messy for traditional automation."
  - **KYC, AML and dispute analysts:** [Zomma](https://www.ycombinator.com/companies/zomma) (S26: computer-use agents that "onboard like humans and scale like compute"), [Sphinx](https://www.ycombinator.com/companies/sphinx) (F24: agents "make AML decisions").
  - **Customs brokers:** [Alchemize](https://www.ycombinator.com/companies/alchemize) (Sp26), [Forge](https://www.ycombinator.com/companies/forge) (W24, AI-native freight forwarder and customs broker).
  - **Insurance brokers:** [Fernstone](https://www.ycombinator.com/companies/fernstone) (F25, 500+ business clients).
  - **Lawyers, often consumer and startup work:** [Moritz](https://www.ycombinator.com/companies/moritz), [Vector Legal](https://www.ycombinator.com/companies/vector-legal), [Blueshoe](https://www.ycombinator.com/companies/blueshoe), [LegalOS](https://www.ycombinator.com/companies/legalos) (immigration).
  - **Public records officers:** [GovGuard](https://www.ycombinator.com/companies/govguard), [Bluedoor](https://www.ycombinator.com/companies/bluedoor).
  - **Permit technicians and plan reviewers:** [Verdant](https://www.ycombinator.com/companies/verdant), [Permitify](https://www.ycombinator.com/companies/permitify) (claims to let reviewers "10x their productivity covering the labor shortage").
  - **311 and municipal call takers:** [EffiGov](https://www.ycombinator.com/companies/effigov).
  - **Government procurement officers:** [Hazel](https://www.ycombinator.com/companies/hazel-2), covering requirements generation, market research, solicitation drafting and proposal evaluation.
  - **Affordable-housing compliance consultants and auditors:** [Tire Swing](https://www.ycombinator.com/companies/tire-swing).
  - **Police report writing:** [Code Four](https://www.ycombinator.com/companies/code-four) (Sp25), [Reconero](https://www.ycombinator.com/companies/reconero) (F26).
  - **Healthcare credentialing and provider enrollment staff:** [Arctic Health](https://www.ycombinator.com/companies/arctic-health) (Sp26), [Simplex](https://www.ycombinator.com/companies/simplex) (S24), [Harbera](https://www.ycombinator.com/companies/harbera) (W25).
  - **Medical records retrieval staff:** [Codes Health](https://www.ycombinator.com/companies/codes-health) (S24, team 35).
- **Price anchors for outcome pricing:** $0.99 per resolved conversation (Intercom Fin); $1.50–$2.00 per automated resolution (Zendesk); $2 per conversation (Salesforce Agentforce) ([Monetizely](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models)).
- **Adoption barriers:** legacy procurement habits, fragmented systems and vendor credibility gaps slow the shift to outcome contracts more than technology does ([HFS](https://www.hfsresearch.com/research/bpo-services-as-software-turning/)). Pricing-model overviews: [Pickaxe](https://pickaxe.co/post/ai-agent-pricing-models); [Monetizely](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models).
- **Market framing:** under a Services-as-Software scenario, about $61B of BPO spend shifts from FTE billing to outcome contracts by 2035 ([HFS](https://www.hfsresearch.com/research/bpo-services-as-software-turning/)). 2025 consolidation (Capgemini–WNS at $3.3B, TaskUs, TELUS Digital) was framed as a pivot to AI-powered, outcome-priced operations ([Workato](https://www.workato.com/the-connector/bpo-agentic-ai/)).
- **Freelance demand for general virtual assistance stayed "consistently strong" on Upwork in 2026,** alongside fast growth in AI-related skills ([Upwork](https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work)).

### Inferences
- **The best outcome units are discrete, countable and legally defined**, because the buyer already thinks in units. Examples:
  - a fulfilled public-records request
  - a remediated (WCAG-conformant) document page
  - a recertified affordable-housing household
  - a filed state EPR report
  - a member retained through a Medicaid redetermination
  - a CRA vulnerability report submitted to ENISA

  Accounting, legal and customer support, where YC money is concentrating, have less clear units and much more competition.
- **Public-sector roles are under-contested.** Of the roughly 1,982 companies in 2024–2026 YC batches, only a handful target specific local-government clerical workflows (permits, FOIA, 311, procurement). The Verdant traction claim suggests buying friction is lower than assumed for small-ticket, single-workflow tools. This is one company's self-report.
- **Hybrid "agent plus licensed human sign-off"** (Last Accounting Company, Fernstone) is the emerging template where professional licensing or liability applies. It likely transfers to accessibility conformance sign-off, affordable-housing certification and FOIA legal review.

### Gaps
- **No job-posting or labor statistics were retrieved.** Indeed, LinkedIn and BLS were not reachable and the search budget ran out. The report should not cite headcounts for these roles until verified. Roles to quantify:
  - BLS OES categories: bookkeeping/accounting/auditing clerks, billing and posting clerks, data entry keyers, insurance claims and policy processing clerks, eligibility interviewers for government programs, court/municipal/license clerks, procurement clerks, paralegals, compliance officers, medical records specialists.
  - Indeed or LinkedIn counts for "permit technician", "public records specialist", "FOIA officer", "accessibility specialist / 508 remediation", "grant writer / grants manager", "LIHTC compliance specialist", "EPR / packaging compliance analyst".
- **No Fiverr category data and no BPO task-mix breakdown** (which back-office tasks are most outsourced) were found.
- **Pricing realities** for government per-request or per-page services are unverified, as are procurement thresholds under which a clerk can buy without RFP.

## Which forced-demand regulatory deadlines in 2025–2028 have the least mature tooling?

### Takeaway
Among deadlines verified in this session, tooling looks **least mature**, judged by zero 2024–2026 YC entrants plus consultancy- or law-firm-led supply, for:
- **ADA Title II public-entity accessibility** (26 April 2027 and 26 April 2028)
- **US state packaging EPR** (annual reports, fees live from 2026; California SB 54 regulations finalized May 2026)
- **EU Cyber Resilience Act** (reporting from 11 September 2026; full application 11 December 2027)
- **Medicaid work requirements** on the provider and MCO side (1 January 2027)
- **EU Pay Transparency** (first reports June 2027), where non-YC vendors are active

**E-invoicing** (BE, PL, FR, DE in 2026–2028) and **Australia AML/CTF Tranche 2** (1 July 2026) are forced but already well served or quickly filling.

### Cited Findings
**Deadline calendar (verified this session):**

| Deadline | Who it hits | Date(s) | Tooling maturity signal |
|---|---|---|---|
| ADA Title II web and mobile accessibility, WCAG 2.1 AA | US state and local governments, special districts, public schools and colleges | 26 Apr 2027 (≥50k population); 26 Apr 2028 (<50k and special districts), after the DOJ interim final rule of 20 Apr 2026 ([Illinois Lawyer Now](https://www.illinoislawyernow.com/2026/04/doj-extends-title-ii-ada-web-content-accessibility-compliance-deadlines/); [UNC SOG](https://canons.sog.unc.edu/2026/01/understanding-the-new-ada-web-accessibility-requirements-for-state-and-local-governments/)) | 0 YC 2024–26 entrants ([yc-oss/api](https://github.com/yc-oss/api)) |
| HHS accessibility rule | HHS-funded recipients | May 2026 date; extension unclear ([Jackson Lewis](https://www.jacksonlewis.com/index%2Ephp/node/32560)) | Same as above |
| Medicaid work requirements (OBBBA) | ~41–43 expansion states; enrollees; MCOs and providers indirectly | 1 Jan 2027 (Nebraska 1 May 2026; Montana 1 Jul 2026; Iowa 1 Dec 2026); notices by 31 Aug 2026; extensions possible to 31 Dec 2028 ([McDermott+](https://www.mcdermottplus.com/blog/regs-eggs/ready-set-go-implementation-of-medicaid-work-requirements-is-on-its-way/); [Ballotpedia](https://news.ballotpedia.org/2026/01/23/mandatory-medicaid-work-requirements-are-coming-what-do-they-look-like-now/); [Medicaid Work Navigator](https://www.medicaidworknavigator.com/timeline/)) | State side: large IT vendors ([CBPP](https://www.cbpp.org/research/health/assessing-the-medicaid-work-requirement-vendor-landscape)). Enrollee and provider side: few products; 0 YC |
| EU Cyber Resilience Act | Makers of products with digital elements selling in the EU | Reporting 11 Sep 2026 (24h early warning, 72h notification via ENISA); main obligations 11 Dec 2027 ([Bright Defense](https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/); [SureCloud](https://www.surecloud.com/blog-hub/eu-cyber-resilience-act-timeline)) | 0 YC 2024–26; GRC vendors repositioning |
| EU Pay Transparency Directive | EU employers (reporting 150+ first) | Transposition 7 Jun 2026 (about 4 of 27 on time); first reports 7 Jun 2027 ([Lewis Silkin](https://www.lewissilkin.com/insights/2026/07/01/eu-pay-transparency-directive-2026-employer-compliance); [HR Brew](https://www.hr-brew.com/stories/eu-pay-transparency-directive-survey)) | 0 YC; Syndio, Ravio, Pave active |
| EU PPWR | Packaging producers and importers in the EU | Applies mid-2026; PFAS ban in food-contact packaging Aug 2026; recyclability targets 2030 ([RegDossier](https://regdossier.eu/eu-compliance-deadlines/)) | 0 YC |
| US packaging EPR (OR, CO, CA, MN, MD, WA, ME) | Brand owners and importers | Six-state reports due 31 May 2026; Oregon non-compliance list 10 Apr 2026; Colorado first fees in 2026; CA SB 54 regulations 1 May 2026 ([Faegre Drinker](https://www.faegredrinker.com/en/insights/publications/2026/5/extended-producer-responsibility-six-state-reports-due-may-31); [O'Melveny](https://www.omm.com/insights/alerts-publications/2026-plastics-epr-packaging-rules-update-what-sb-54-sb-343-state-reporting-deadlines-prc-laws-the-eu-ppwr-mean-for-producers-retailers/)) | 0 YC; the one prior YC carbon tool, GreenTally, is Inactive |
| EU Forced Labour Regulation | Companies placing products on the EU market | 14 Dec 2027 ([Sustalium](https://sustalium.com/blog/compliance-deadline-calendar-2026-2027/)) | Not assessed |
| ESPR (first delegated act) and textiles EPR | Product makers; textile producers | Q4 2026; transposition by 17 Jun 2027 ([Adherent](https://www.adherent.com/guides/eu-countdown-of-top-12-compliance-deadlines/)) | Complir and MarkIt (YC) emerging |
| E-invoicing: BE / PL / FR / DE | All VAT-registered B2B businesses | BE 1 Jan 2026; PL 1 Feb and 1 Apr 2026 (micro 1 Jan 2027); FR 1 Sep 2026 (receive all; large/mid issue), smaller firms issue Sep 2027; DE issuing 1 Jan 2027 (>€800k) and 1 Jan 2028; ViDA 2030 ([OriginStamp](https://originstamp.com/en/blog/reader/eu-e-invoicing-mandates-timeline-2026-2030); [Invoice Navigator](https://www.invoicenavigator.eu/answers/eu-e-invoicing-mandate-timeline)) | Mature incumbents; low gap |
| Australia AML/CTF Tranche 2 | Lawyers, accountants, real-estate agents, dealers in precious metals (AU) | Obligations from 1 Jul 2026; enrolment by 29 Jul 2026 ([Accurium](https://www.accurium.com.au/blog/2026/09/aml-ctf-tranche-2-since-1-july-what-accountants-and-smsf-advisers-need-to-do-now-2/); [Legl](https://legl.com/articles/thirty-days-to-tranche-2-austracs-final-expectations-and-the-conduct-rule-changes-landing-on-1-july)) | Several vendors plus free AUSTRAC starter kits |

- Sources disagree on several dates: France's small-business issuing date (2027 vs 2028), CRA milestone descriptions, pay-transparency transposition counts, and EPR report due dates (31 March vs 31 May vs 1 June). Verify against official sources ([RegDossier](https://regdossier.eu/eu-compliance-deadlines/); [Trayak](https://trayak.com/state-by-state-overview-2026-epr-regulations/); [Finbite](https://finbite.eu/en/e-invoicing-mandates-europe-2026/)).

### Inferences
- **Least mature tooling, ranked:**
  1. ADA Title II public-entity content remediation
  2. Packaging EPR data for small and mid-size brands
  3. CRA for small makers of connected products
  4. Medicaid work-requirement navigation on the provider and MCO side
  5. EU Pay Transparency for the multi-country mid-market

  Each combines a dated obligation, no recent YC entrant, and supply dominated by law firms, consultancies or enterprise-GRC vendors.
- **Timing nuance.** Several deadlines (France e-invoicing, Tranche 2, CRA reporting, EPR May reports) **have just passed as of October 2026**. Demand is shifting from "readiness projects" to "ongoing operations and remediation of failures", which favors subscriptions and per-filing services over one-off consulting. Deadlines still ahead (ADA Title II April 2027 and 2028; Medicaid January 2027; Pay Transparency reports June 2027; CRA December 2027; Germany e-invoicing 2027 and 2028) are the best "sell before the cliff" windows.
- **Political-risk pattern.** US federal deadlines have slipped (ADA Title II by one year) or face litigation (Medicaid frailty provisions, Colorado EPR). EU dates also slip (pay-transparency transposition). Products should deliver value even if a date moves; for example, accessibility also cuts lawsuit risk and helps residents.

### Gaps
**Unverified leads (background knowledge; check before the report uses them):**
- **EU Deforestation Regulation:** believed postponed again in December 2025 to 30 Dec 2026 for large operators and 30 Jun 2027 for micro and small.
- **EU AI Act:** high-risk obligations originally 2 Aug 2026, with the Digital Omnibus proposing a delay to about December 2027.
- **European Accessibility Act:** applied from 28 Jun 2025.
- **US FDA FSMA 204 food traceability:** believed extended to 20 Jul 2028.
- **US CMMC phase 1:** believed effective 10 Nov 2025.
- **NACHA fraud-monitoring rules:** 2026 phases.
- **UK:** "failure to prevent fraud" offence (believed 1 Sep 2025); Making Tax Digital for Income Tax (believed from 6 Apr 2026).
- **Australia:** Payday Super (believed 1 Jul 2026).
- **US CMS:** interoperability and prior-auth API requirements (believed January 2027).
- **California:** SB 253/SB 261 climate disclosures (2026).
- **US EPA:** TSCA PFAS reporting window (believed delayed to 2026–27).
- **US FinCEN:** residential real-estate reporting rule (believed delayed to 2026).
- **US ADA Title III / private-sector web accessibility litigation volumes.**

Other gaps:
- Whether HHS extended its May 2026 accessibility deadline.
- France's actual September 2026 go-live experience.
- AUSTRAC's count of newly regulated entities.

## Which niche markets are ignored by VCs because they're "too small" but would make an excellent profitable business ($1–20M ARR)?

### Takeaway
Using absence from YC's 2024–2026 batches as a proxy for VC neglect, the clearest "boring but forced" niches are:
- public-entity document accessibility remediation
- packaging EPR reporting for small brands
- pay-transparency compliance for EU mid-market employers
- CRA compliance for small connected-product makers
- affordable-housing certification (one YC entrant)
- public-records fulfillment (two tiny YC entrants)

A second tier has no recent YC activity but needs demand verification: nonprofit grant reporting, association management, special-education (IEP) paperwork, public-meeting minutes and agendas, unclaimed-property (escheatment) compliance, and child-care and youth-sports administration. These buyers are fixed-budget institutions with mandates, low churn and few vendors. That profile fits $1–20M ARR bootstrapped or lightly funded businesses, not venture-scale ones.

### Cited Findings
- **YC 2024–2026 batches (about 1,982 companies) contain zero companies in the categories below**, by keyword scan with manual review ([yc-oss/api](https://github.com/yc-oss/api)):
  - digital accessibility compliance
  - pay transparency or pay equity
  - e-invoicing
  - packaging EPR
  - CRA/SBOM compliance
  - unclaimed property or escheatment
  - association or membership-organization management
  - special education or IEP administration
  - public-meeting minutes or agendas
  - child-care administration
  - nonprofit grant writing or reporting
- **Nearby niches that do have entrants, each with at most a handful:**
  - [Givefront](https://www.ycombinator.com/companies/givefront) (W24, nonprofit finance)
  - [Tire Swing](https://www.ycombinator.com/companies/tire-swing) (F26, affordable-housing compliance)
  - [GovGuard](https://www.ycombinator.com/companies/govguard) and [Bluedoor](https://www.ycombinator.com/companies/bluedoor) (FOIA)
  - [Scout](https://www.ycombinator.com/companies/scout-4) (W25, AI student information system for K-12)
  - [Sunset](https://www.ycombinator.com/companies/sunset) (F24, "Find and move money after a death") and [Elayne](https://www.ycombinator.com/companies/elayne) (S24, estate settlement), both consumer death admin
  - [Particularity](https://www.ycombinator.com/companies/particularity) (F26, case sourcing for government consumer-protection regulators)
- **Earlier YC attempts in adjacent "boring" niches are Inactive:** [Halolife](https://www.ycombinator.com/companies/halolife) (funeral planning), [Monthli](https://www.ycombinator.com/companies/monthli) (HOA marketplace), [Caucus](https://www.ycombinator.com/companies/caucus) (government CRM), [GreenTally](https://www.ycombinator.com/companies/greentally) (SMB carbon tracking).
- **Willingness to pay for small tools is real for businesses and weak for individuals.** "If a web tool saves me and my team at work a bit of time for $5/month, yes"; individuals are "much less willing" ([Ask HN](https://news.ycombinator.com/item?id=44019193)).
- **YC's own RFS points to a "Cloud for Small Software"** ([superframeworks](https://superframeworks.com/articles/yc-fall-2026-rfs-indie-hacker-plays)). YC is acknowledging a growing class of small, AI-built software businesses.
- **Verdant's claimed 4-week average close across 4 states** suggests some local-government niches are reachable without long RFP cycles ([Verdant YC profile](https://www.ycombinator.com/companies/verdant)).

### Inferences
- **What makes these niches good $1–20M ARR businesses:**
  - The buyer has a legal obligation and a budget line (clerks, ADA coordinators, compliance managers).
  - Unit economics allow per-document, per-filing or per-entity pricing.
  - Switching costs build up once a vendor holds the institution's records or filing history.
  - VC funds skip them because the total US market for, say, public-entity remediation or small-brand EPR filings looks like low hundreds of millions, not tens of billions. That market-size judgment is an unverified inference.
- **Failure patterns to avoid,** from the Inactive YC companies: consumer-paid "planning" products (Halolife), two-sided marketplaces in fragmented associations (Monthli), horizontal tools for government (Caucus), and voluntary-compliance products with no mandate (GreenTally's SMB carbon tracking before mandates bit). The common thread is **no forced buyer**. The candidates ranked above all have one.
- **Geography:**
  - US: ADA Title II, FOIA, permitting, Medicaid, EPR, affordable housing.
  - EU: CRA, Pay Transparency, PPWR, e-invoicing.
  - Australia: AML/CTF Tranche 2.
  - UK and Canada: not evidenced in this session.

  A small team should pick one jurisdiction's rulebook first; rule-specific knowledge is the moat.

### Gaps
- **No marketplace or listing data** was retrievable: Acquire.com listings, r/microsaas and r/SaaS revenue posts, Tiny Seed portfolio, MicroAcquire multiples. That leaves no outside check on which boring niches already support profitable small SaaS.
- **Demand evidence is missing for the second-tier niches:** nonprofit grant reporting hours, association-management software complaints, IEP paperwork time, public-meeting minute-taking costs, unclaimed-property audit penalties, and child-care subsidy billing and licensing paperwork. Treat these as hypotheses.
- **Non-YC competitors** (bootstrapped vertical SaaS, PE-backed incumbents in association management, church management and funeral-home software) were not checked. Zero YC presence may reflect incumbent saturation, not an open gap.
- **UK and Canada forcing functions** were not covered in this session because the search budget ran out.
