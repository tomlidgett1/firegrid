# Australian professional-services and financial-services problems worth paying for (as of 18 October 2026)

Method note: I ran 22 web searches, the full budget. WebFetch failed with a DNS error (ENOTFOUND for accountantsdaily.com.au), so every finding comes from search-result summaries and snippets, not full pages. Vendor claims come from vendor pages and are marked as such. Facts from my own background knowledge are labelled **[Background, unverified]** and kept out of "Cited Findings". Data older than 2026 is dated. Some search summaries merged several articles, so where I could not tell which listed article holds a figure, I cite the two or three likely sources together and say so.

---

## Q1. Where do Australian professional firms burn non-billable hours on repetitive admin against a counterparty with no API (ATO, lenders, insurers, courts, Home Affairs, AFCA)?

### Takeaway
The best-evidenced no-API sink in 2026 is the ATO. Tax agents cannot see all client debt in one report. GIC and penalty remission requests moved on 22 January 2026 to PDF forms sent through "practice mail", and replies now take 50+ days. Xero users are publicly asking for a consolidated "Total ATO Debt" report that does not exist. The second is lender and aggregator commission data. Remittance files follow no standard format, so brokers rebuild trail and clawback ledgers by hand. Home Affairs (ImmiAccount) and court forms are also no-API sinks, but local vendors already serve them.

### Cited Findings
**ATO (tax agents and accountants)**
- From 22 January 2026, agents must lodge remission requests for general interest charge (GIC), shortfall interest charge (SIC) and failure-to-lodge (FTL) penalties on new standard ATO forms, sent via "practice mail" in Online services for agents (OSfA). Phone requests are limited to amounts over A$2,500, and those are escalated to a dedicated team instead of being decided on the call. — [ATO tax professionals newsroom](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/tax-professionals-newsroom/changes-to-interest-and-ftl-penalty-remission-requests); [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)
- Agents told the Tax Ombudsman they had waited more than 50 days for remission decisions. One agent said the old phone process cleared "four or five remissions in an afternoon". Agents also reported a significant backlog in the portal that they do not expect to clear until the ATO adds resources. — [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)
- The Commissioner called longer waits the "trade-off" for more consistent GIC decisions. — [Accountants Daily](https://www.accountantsdaily.com.au/tax-compliance/22861-longer-wait-times-the-trade-off-for-more-consistent-gic-decisions-says-commissioner)
- The ATO granted 76% of more than 125,000 remission requests in the past financial year. The IPA described "widespread discontent" with how the ATO handles GIC remissions, including inconsistent outcomes. (The search summary merged two articles, so the exact attribution is unconfirmed.) — [Public Accountant](https://publicaccountant.com.au/features/ato-tax-gic-interest-reform/); [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)
- The Tax Ombudsman published a GIC-remission implementation plan with the ATO. Several items are listed as in progress, with some due in later FY27 quarters. — [Tax Ombudsman implementation plan (PDF)](https://taxombudsman.gov.au/wp-content/uploads/2026/06/Implementation-plan-GIC-remission-published.pdf)
- The ATO said it would likely grant remission for natural disasters, theft, domestic violence, the unforeseen collapse of a major debtor, bereavement and ill health. It would likely refuse remission for a general economic downturn or where money went into business expansion. — [Accountants Daily, ATO case studies](https://www.accountantsdaily.com.au/tax-compliance/22077-who-gets-a-gic-remission-ato-releases-case-studies-to-clarify-relief-provisions); [SmartCompany](https://www.smartcompany.com.au/tax/ato-remission-details-general-interest-charge-gic/)
- **No cross-client debt view:** a practitioner on Xero's product-ideas forum wrote: "I am not aware of a report we can generate through the ATO portal which tells us ALL the debt which is owed by our clients, across all their accounts, Tax, GST, Super etc. Yes there is an integrated debt report we can run, but it only shows the ICA debt." A client with only an income-tax debt means logging into each client one by one. — [Xero Product Ideas, "Total ATO Debt" report](https://productideas.xero.com/forums/967133-reports-tax/suggestions/51365269-au-tax-integrate-live-ato-client-account-balance)
- A second Xero idea asks for live ATO data (account balances and payment-plan status) in the Xero Tax Manager dashboard. It was "under review", not shipped, when captured. The same thread says "some software providers" already offer such dashboards but names none. — [Xero Product Ideas, Tax Manager live ATO data](https://productideas.xero.com/forums/967124-projects-tracking/suggestions/51675454-tax-manager-live-ato-data-in-dashboard-ato-acco)
- An ATO Community thread (October 2025) confirms that the running balance report covers only income tax and integrated client account (ICA) debts. An ATO moderator explains that Director Penalty Notices go to directors personally and so do not appear on the company's running balance account or ICA. — [ATO Community](https://community.ato.gov.au/s/question/a0JRF000003xv29/p00401175)
- OSfA has per-client account views with downloadable transactions, a client account running balance report, and a BAS agent report with activity-statement balances. — [ATO OSfA user guide, reports](https://www.ato.gov.au/tax-and-super-professionals/digital-services/in-detail/online-services-for-agents-user-guide/reports-and-forms/reports)
- The Tax Ombudsman is reviewing OSfA. Consultation with agents "highlighted several issues and concerns with OSfA". — [Tax Ombudsman quarterly newsletter, March 2026 (PDF)](https://www.theioi.org/downloads/2081j/Tax%20Ombudsman%20-%20Quarterly%20newsletter%20-%20March%202026%20-%20EN.pdf)
- An advisory commentary on the ATO's 2026–27 corporate plan says the plan stresses payment performance and counter-fraud. It also says the ATO is "placing the burden of security squarely on the shoulders of registered tax agents". This is secondary commentary. — [Learnformula](https://accounting-cpd-au.learnformula.com/latest-intelligence/the-enforcement-era-decoding-the-atos-2026-27-corporate-plan-and-what-it-means-for-your-firm)
- AccountKit's help page describes importing ATO lodgment lists to compare against a client list. That covers lodgment status only, not debt balances. — [AccountKit help](https://support.account-kit.com/hc/en-us/articles/360000128374-ATO-Lodgement-Statistics)

**Lenders and aggregators (mortgage brokers)**
- "There is no industry standard for aggregator remittance files." Formats vary by aggregator and sometimes by report type. For example, Finsure combines upfront and trail in one statement, and LMG's remittance includes other brokerages' data, which brokers must filter out. This is vendor content. — [Sandlabs, lender remittance processing guide](https://sandlabs.com.au/blog/lender-remittance-processing-mortgage-brokers)
- Connective's legal counsel says it is not enough to act in the client's best interests. Brokers "must be able to demonstrate it clearly and convincingly in your file notes and BID commentary". — [Connective wiki, BID](https://wiki.connective.com.au/en/articles/555-compliance-best-interests-duty-bid)

**Home Affairs (migration agents)**
- Officio markets auto-filling of ImmiAccount forms for registered migration agents. This is a partner page, so treat it as a vendor claim. — [Migration Alliance / Officio](https://migrationalliance.com.au/migration-services/sponser/336/officio-migration-alliance-smarter-practice-management-for-rmas.html)

**Courts (family law)**
- Smokeball updated family law forms, including the Financial Statement and questionnaire, on 12 June 2025 for the 2025 reforms. Legal practice software already absorbs court-form change. — [Smokeball](https://www.smokeball.com.au/blog/key-changes-to-family-law-forms)

### Inferences
- The ATO is the richest no-API counterparty for a small founder because the failures are specific and documented: no all-debt view across clients, DPN exposure missing from company accounts, PDF remission forms via practice mail, and 50+ day waits with no tracker. Each one is repetitive work a tool can take over.
- **[Background, unverified]** Live programmatic access to ATO account data is generally limited to registered Digital Service Providers (DSPs) that meet the ATO's DSP Operational Framework. A realistic first version would ingest the OSfA reports agents already download, or exported practice-system data, and only later apply for DSP access.
- Lender commission data is already in brokers' hands (remittance files). The pain is format heterogeneity, not access. That suits a founder who has built sync, SQL and pivot tooling.
- I found nothing on AFCA portal friction or insurer claims-portal friction for brokers within budget (see Gaps).

### Gaps
- No verified list of practice systems that do show live ATO debt across clients. The Xero thread says "some providers" do, but names none. Products to check by hand **[Background, unverified]**: LodgeiT, GovReports, Xero Tax and XPM, MYOB Practice/AE, CCH iFirm, Reckon APS/HandiTax, FYI, Karbon, BGL CAS 360.
- No data on how many hours a firm spends per remission request or on ATO debt chasing. No Seek job ads were reviewed ("ATO debt", "tax debt specialist") because of the search budget.
- Nothing found on AFCA portal workflows, insurer claims-portal friction for insurance brokers, or Commonwealth Courts Portal friction.

---

## Q2. Which 2025–2026 regulatory changes created new workload with immature tooling?

### Takeaway
Changes with confirmed new workload in 2025–26:
- **Division 296**: passed 10 March 2026, applies from 1 July 2026, taxes realised earnings, with a whole-of-fund CGT-reset election that needs 30 June 2026 valuations.
- **ATO remission process**: new forms from 22 January 2026.
- **GIC non-deductibility**: from 1 July 2025 **[Background, unverified]**.
- **CSLR**: FY27 advice levy of A$190.3m, plus Shield/First Guardian claims of up to about A$1bn.
- **ASIC IDR public dashboard**: launched March 2026.
- **ASIC best-interests-duty review of brokers**: findings released 2026.
- **Family law amendments**: in force from 10 June 2025.
- **BNPL credit licensing**: from 10 June 2025.
- **Payday Super**: from 1 July 2026.
- **Tranche 2 AML/CTF**: from 1 July 2026, and already crowded.

Tooling looks least mature around ATO debt and remission and around Div 296 per-fund election triage. Broker and adviser documents (BID file notes, SoAs) already have several AI vendors.

### Cited Findings
**Division 296 (redesigned)**
- The revised Div 296 Bill passed both Houses on 10 March 2026. Regulations, including how an individual's share of taxable earnings is worked out, were still outstanding at that point. — [MLC](https://cloud.ecomm.mlc.com.au/div-296-passed); [Bentleys](https://www.bentleys.com.au/resources/division-296-tax-tax-changes-shaping-2026/)
- The first assessment uses the 30 June 2027 balance alone. Later years use the higher of the opening and closing balance. — [Bentleys](https://www.bentleys.com.au/resources/division-296-tax-tax-changes-shaping-2026/)
- The tax applies to realised earnings only, not unrealised gains. — [Bomamarketing summary](https://public2.bomamarketing.com/email/LLdb); [BDO](https://www.bdo.com.au/en-au/insights/superannuation/division-296-tax-changes-what-you-need-to-know)
- The A$3m and A$10m thresholds are indexed and assessed per individual, not on the fund's total. — [Kelly Partners](https://www.kellypartners.com.au/blog/division-296-superannuation-changes)
- **CGT-reset election:** trustees can reset all fund CGT assets to their 30 June 2026 market value, for Div 296 purposes only. The election covers the whole fund (not asset by asset), is irrevocable, and must be lodged by the due date of the 2026–27 fund return. The ordinary CGT cost base is unchanged, so funds must keep two sets of cost-base records. Any SMSF can elect, whether or not a member is over A$3m. — [FS Super](https://www.fssuper.com.au/article/valuations-for-division-296-and-smsfs); [SMS Magazine, "To adjust or not adjust"](https://smsmagazine.com.au/features/to-adjust-or-not-adjust/); [SuperGuide CGT](https://www.superguide.com.au/superannuation-topics/capital-gains-tax-cgt)
- Valuation evidence is the main pressure point, especially for unlisted assets. Weak 30 June 2026 valuation evidence could lead to a qualified audit or a contravention report. One source said the ATO-approved election form had not yet been released. — [FS Super](https://www.fssuper.com.au/article/valuations-for-division-296-and-smsfs); [SMS Magazine](https://smsmagazine.com.au/features/to-adjust-or-not-adjust/)
- A property valuation firm describes a one-off spike in demand for valuations as at 30 June 2026. This is a vendor with an interest. — [SMSF Property Valuations](https://smsfpropertyvaluations.com.au/?p=4178)

**ATO GIC/penalty remission (see Q1)**
- New forms through OSfA practice mail from 22 January 2026, waits of 50+ days, and more than 125,000 requests a year. — [ATO newsroom](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/tax-professionals-newsroom/changes-to-interest-and-ftl-penalty-remission-requests); [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)

**CSLR, Shield and First Guardian**
- The revised FY27 CSLR levy estimate (July 2026) rose by A$60.7m from the November 2025 estimate. The total is reported as A$198.1m by SMS Magazine and A$191.8m by ifa, so the sources conflict. The advice subsector's share is A$190.3m. — [SMS Magazine](https://smsmagazine.com.au/news/2026/07/02/cslr-levy-jumps-by-another-60-million/); [ifa](https://www.ifa.com.au/cslr-revises-fy27-levy-up-to-200m/); [Professional Planner](https://www.professionalplanner.com.au/2026/07/industry-calls-for-new-funding-streams-as-fy27-cslr-advice-levy-hits-190-3-million/)
- The revision added an allowance for Shield and First Guardian. SMS Magazine says A$30.2m. ifa says about A$38m of Shield/First Guardian claims, including AFCA fees, are expected over the next 12 months, excluding InterPrac. The November 2025 estimate left these collapses out. — [SMS Magazine](https://smsmagazine.com.au/news/2026/07/02/cslr-levy-jumps-by-another-60-million/); [ifa](https://www.ifa.com.au/cslr-revises-fy27-levy-up-to-200m/)
- AFCA has received 3,429 complaints related to Shield and First Guardian, more than 1,200 of them against InterPrac. The actuary warned that if every affected investor became CSLR-eligible, total scheme costs could approach A$1bn. (The summary merged sources, so attribution is unconfirmed.) — [ifa](https://www.ifa.com.au/cslr-revises-fy27-levy-up-to-200m/); [The Adviser](https://www.theadviser.com.au/broker/48629-cslr-levy-jumps-60-7m-after-revision); [ifa, "Shield, First Guardian continue to dominate AFCA complaints"](https://www.ifa.com.au/shield-first-guardian-continue-to-dominate-afca-complaints)
- Dixon Advisory makes up about 46% of advice-related CSLR costs for FY27. The A$170.3m above the A$20m subsector cap may not be collected until June 2027 or later, and CSLR pays compensation only once levies are collected. The FAAA says advisers should pay no more than the A$20m cap. — [ifa](https://www.ifa.com.au/cslr-revises-fy27-levy-up-to-200m/); [Professional Planner](https://www.professionalplanner.com.au/2026/07/industry-calls-for-new-funding-streams-as-fy27-cslr-advice-levy-hits-190-3-million/)
- CSLR expected Shield and First Guardian payouts in FY27 (October 2025 article). — [Professional Planner](https://www.professionalplanner.com.au/2025/10/cslr-expects-shield-first-guardian-payouts-in-fy27/)

**AFCA and IDR (RG 271)**
- AFCA logged a record 119,949 complaints in 2025–26 (preliminary), the third straight year above 100,000. By area:
  - Banking and finance: 66,971 (+23%)
  - General insurance: 36,022
  - Superannuation: 8,755 (+42%)
  - Investments and advice: 6,542 (+56%)
  - Hardship complaints rose 17%, credit reporting 22% and rejected insurance claims 47%. AFCA resolved 43% before formal decision-making. — [Region](https://region.com.au/record-complaint-numbers-against-financial-sector/986894/); [Savings.com.au](https://www.savings.com.au/news/banking-credit-card-and-insurance-disputes-drive-record-afca-complaints); [Banking Day](https://www.bankingday.com/afca-complaints-top-100000-for-a-record-third-consecutive-year)
- NIBA reports insurance-broker complaints were under 1% of AFCA complaints. — [NIBA](https://niba.com.au/news/afca-complaints-hit-record-high-but-broker-complaints-less-than-1)
- ASIC launched an IDR dashboard in March 2026 that publishes complaints data for each AFS licensee. ASIC is pressing on under-reporting: any expression of dissatisfaction that meets the RG 271 definition must be captured, however minor and however quickly resolved. — [Adviser Voice, September 2026](https://www.adviservoice.com.au/2026/09/cpd-think-your-clients-arent-complaining-asic-might-disagree/)
- IDR response deadline: 30 days for standard complaints received from 5 October 2021. — [Mondaq](https://mondaq.com/australia/financial-services/1223630/complaints-handling-requirements-1-year-of-the-new-regime)

**Mortgage broker best-interests duty (BID)**
- ASIC's review of best-interests duties and complaints handling covered 13 Australian credit licensees across eight large aggregator groups. It began with information-gathering in mid-2025, and the findings were released in 2026. — [The Adviser, findings](https://www.theadviser.com.au/compliance/49006-asic-releases-best-interest-review-findings); [The Adviser, timing](https://www.theadviser.com.au/compliance/48707-asic-to-release-best-interests-duty-report-by-q4); [MPA](https://www.mpamag.com/au/news/general/care-urged-as-asic-sharpens-scrutiny-on-brokers/565458)

**Family law (Family Law Amendment Act 2024)**
- The property and disclosure changes commenced on 10 June 2025 and apply to new and existing proceedings unless a final hearing has started. The financial disclosure duty moved from the Rules into the Act, and practitioners must make parties aware of it. Courts must consider the economic effect of family violence in property matters. — [FCFCOA](https://www.fcfcoa.gov.au/news-and-media-centre/fla-changes/fla2024); [LexisNexis](https://www.lexisnexis.com/blogs/en-au/insights/navigating-the-2025-changes-to-the-family-law-act-comprehensive-insights-and-strategic-takeaways-for-lawyers); [Coutts](https://couttslegal.com.au/blog/changes-to-family-law-separating-2025/)

**BNPL credit licensing**
- BNPL providers must have held an Australian credit licence and met National Credit Act obligations from 10 June 2025. ASIC RG 281 (8 May 2025) covers low-cost credit contracts, including modified responsible lending (a written election plus an unsuitability assessment policy) and fee caps of A$200 in the first period and A$125 after that. — [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/a6cfa71f/bnpl-compliance-countdown); [Baker McKenzie](https://insightplus.bakermckenzie.com/bm/banking-finance_1/asia-pacific-bnpl-if-it-looks-like-credit-acts-like-credit-regulate-it); [Mondaq](https://webiis08.mondaq.com/australia/consumer-credit/1634474/bnpl-low-cost-credit-contract-providers)

**Payday Super (firm-workflow context only)**
- From 1 July 2026, super must be paid with each pay run, and the ATO's free Small Business Superannuation Clearing House closed. — [ATO SBSCH](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/how-to-pay-super/small-business-superannuation-clearing-house); [Kelly Partners](https://www.kellypartners.com.au/blog/payday-super-a-new-payroll-reality)

### Inferences
- **[Background, unverified]** GIC and SIC stopped being tax-deductible for income years starting on or after 1 July 2025. With GIC at roughly 11% a year, the after-tax cost of carried ATO debt has risen, which should increase both the number of remission requests and pressure on firms to manage client ATO debt.
- The Div 296 CGT-reset election creates a decision for every SMSF, because any fund can elect. Doing it well needs per-fund, per-asset 30 June 2026 values, unrealised gain or loss positions and member balance projections. That is a batch analytics job across a firm's whole SMSF client book: one-off spiky work with a hard deadline at the 2026–27 return.
- The ASIC IDR dashboard (March 2026) turns complaint under-capture into a visible risk for small AFS licensees. AFCA hardship complaints rose 17%, which pressures lenders and BNPL firms. Both are real, but neither shows evidence of an unserved tooling gap.
- The CSLR Shield/First Guardian liability (up to about A$1bn) is money flowing. The payers, though, are the levy-paying adviser population, and the claim process runs through AFCA and CSLR, so there is no clear software buyer.

### Gaps
- I could not confirm whether the Div 296 regulations and the ATO-approved CGT-reset election form had been released by October 2026.
- **Delivering Better Financial Outcomes (DBFO)** tranche 2 status as of October 2026 was not searched (budget). This covers the "new class of adviser" and changes to SoA/RoA requirements.
- **[Background, unverified]** The Skills in Demand visa commenced 7 December 2024. Its workload effect on migration agents was not researched.
- The specific findings in ASIC's 2026 BID review report were not available in the search results.

---

## Q3. Which areas are already crowded with local vendors?

### Takeaway
Crowded or bundled areas:
- Tranche 2 AML/CTF (28+ vendors).
- Generic accounting-practice workflow and document chasing.
- AI-drafted Statements and Records of Advice (AdviceDocs, Decimal, AdviserLogic, Padua and others).
- AI BID file notes for brokers.
- Broker repricing and retention (Sherlok).
- Migration practice software (Officio, Agentcis, Migration Manager).
- Conveyancing (PEXA, InfoTrack).
- Enterprise complaints software (Civica, 6clicks, CompliSpace).

Offshore labour is a real substitute for any admin tool sold to accounting firms. Broker trail-book and commission tooling is thinner than expected but not empty (TrailAI, HumbleTech Commissions).

### Cited Findings
- **Tranche 2 AML/CTF:** CompareAML lists 28 vetted providers (May 2026) priced from A$0 to A$2,500+ a month. Channels are locked by InfoTrack, CA ANZ, CPA Australia, REIA and PEXA (from the prior verification note). — [CompareAML](https://www.compareaml.com.au/compare); prior note: /home/user/firegrid/research_notes/Unsolved problems worth paying for/verify_australia_forced_demand.md
- **SoA/RoA automation:**
  - AdviceDocs is on the federal government's AI Directory as an Australian platform using AI to draft SoAs, RoAs and portfolio reports in firms' own templates. — [Department of Industry AI Directory](https://aidirectory.industry.gov.au/organisation/advicedocs-technologies-pty-ltd)
  - Decimal promoted automated SoAs of about three pages (article date unknown). — [ifa](https://ifa.com.au/news/13850-decimal-brings-automated-soas-into-limelight)
  - Morningstar AdviserLogic is an end-to-end advice platform. — [Morningstar](https://www.morningstar.com/en-au/business/products/adviserlogic)
- **Broker BID file notes:** Team400 "BrokerAI" markets AI-generated compliant file notes, recommendation documents and audit trails, with broker sign-off. Its "95% compliance accuracy" claim has no stated method. — [Team400 BrokerAI](https://team400.ai/ai-for-mortgage-broking); [Team400 blog, Feb 2026](https://team400.ai/blog/2026-02-ai-compliance-mortgage-brokers)
- **Broker repricing and retention:**
  - Sherlok reads a broker's trail book, scores retention risk per loan, and can negotiate repricing digitally with the current lender. It soft-launched in March 2021 and has reported more than A$1m in client interest savings. — [Sherlok](https://sherlok.com.au); [The Adviser](https://www.theadviser.com.au/breaking-news/41658-new-repricing-and-refi-tool-launches-for-brokers); [The Adviser, A$1m milestone](https://www.theadviser.com.au/breaking-news/41821-sherlok-celebrates-1m-milestone)
  - Sherlok expected repricing volumes to outpace refinancing. — [The Adviser](https://theadviser.com.au/tech/45576-repricing-volumes-expected-to-outpace-refinancing-sherlok)
- **Broker trail and commission tooling** (vendor case studies from Sandlabs, a development studio):
  - TrailAI reads aggregator statements and reports book balance, lender concentration, missing commissions, refinance candidates, run-off and loan grading, across "42+ lenders, 10+ aggregator platforms".
  - HumbleTech Commissions is a multi-aggregator (24+) commission platform with ABA payment files, claiming "90%+ automation".
  - Sandlabs puts the cost of a custom commission-platform MVP at A$30–60k.
  - — [Sandlabs TrailAI](https://sandlabs.com.au/work/trailai); [Sandlabs HumbleTech](https://sandlabs.com.au/work/humbletech); [Sandlabs software guide](https://sandlabs.com.au/blog/mortgage-broker-software-guide)
- **Migration practice software:**
  - Officio is cloud practice management for registered migration agents, with ImmiAccount auto-fill. — [Migration Alliance / Officio](https://migrationalliance.com.au/migration-services/sponser/336/officio-migration-alliance-smarter-practice-management-for-rmas.html)
  - Agentcis is CRM and practice software for visa agencies, with a small PeerSpot mindshare (0.9%). — [PeerSpot](https://origin.peerspot.com/vendors/agentcis)
- **Complaints/IDR software:** Civica markets RG 271-specific workflows. 6clicks and CompliSpace publish RG 271 content and tools. — [Civica](https://www.civica.com/en-au/product-pages/case-management-software/civica-complaints-management/sectors/financial-services-complaints-management-software/financial-complaints-management-software-for-rg-271/); [6clicks](https://6clicks.com/resources/blog/financial-services-rg-271); [CompliSpace](https://www.complispace.com.au/resources/have-you-been-recording-your-complaints-information-new-idr-reporting-requirements-take-effect-soon)
- **Family law forms:** Smokeball updated its forms for the 2025 reforms. — [Smokeball](https://www.smokeball.com.au/blog/key-changes-to-family-law-forms)
- **Offshore labour as a substitute:**
  - ConnectOS State of Offshoring report (September 2026): 214 organisations, 98% headquartered in Australia, not only accounting. 33% reported lower service quality because of hiring difficulty and 32% lost customers. Six in ten said critical onshore roles took 30–60 days to fill before they turned to offshore staff. — [CMOtech Asia](https://cmotech.asia/story/australian-firms-lose-work-amid-skilled-staff-shortages)
  - An outsourcing provider says "thirty per cent of accounting firms [are] using outsourcing to some degree … 70 per cent are looking to do more". This is a vendor claim. — [Accountants Daily](https://www.accountantsdaily.com.au/business/21058-accounting-firms-turn-to-offshoring-amid-worker-shortages); [Public Accountant](https://publicaccountant.com.au/news/accounting-talent-shortage-looms-offshoring-takes-off/)
  - More than 300 Australian organisations employ about 44,000 Filipino professionals (Philippine ambassador, via an outsourcing publisher; promotional). Vendors claim up to 70% cost savings. — [Outsource Accelerator](https://www.outsourceaccelerator.com/?p=165701); [ConnectOS guide](https://connectos.co/?p=9244)
- **Accounting-firm AI agents** are crowded globally (Basis at US$1.15B), as noted in the prior research round. — prior note: /home/user/firegrid/research_notes/Unsolved problems worth paying for/finance_legal_compliance.md

### Inferences
- **[Background, unverified]** Other incumbents that would bundle or block an entrant:
  - Tax-time document chasing and client portals: FYI, Karbon, Content Snare, Ignition, Suralink, XPM/Xero Tax, MYOB Practice, CCH iFirm.
  - SMSF administration: BGL Simple Fund 360, Class.
  - Advice platforms: Xplan (Iress), Midwinter/AdviceOS, Padua.
  - Mortgage broker CRMs and aggregator platforms: Salestrekker, Connective Mercury, AFG Flex, Finsure Infynity. Quickli handles lender policy and servicing.
  - Insurance broker systems: Sunrise/Winbeat, Broking Pro, Insight.
  - Legal practice management: LEAP, Smokeball, Actionstep.
  - Conveyancing: PEXA, InfoTrack.
- Offshore staff (Philippines and India) already absorb repetitive work at accounting and broking firms. An admin tool must either beat about A$10–15/hour offshore labour **[Background, unverified]** or make offshore staff more productive (sell to the firm and its outsourcer).
- The "money flowing" areas that are not crowded on the evidence are ATO debt and remission management (no named product found) and Div 296 per-fund election triage (no named product found, but BGL and Class are likely to bundle).

### Gaps
- No independent reviews or price lists for TrailAI, HumbleTech, Sherlok, AdviceDocs, Decimal or Team400.
- Not checked: whether MFAA, FBAA, CA ANZ, CPA Australia, IPA, FAAA or SMSF Association have partner deals for any of the top-3 problem areas. These need to be checked by hand on each body's partner page.

---

## Q4. Candidate problems (11), each with buyer, pain, willingness to pay, competitors, gap, market size, feasibility and risks

### Takeaway
Eleven concrete candidates were profiled. Three stand out for this founder on gap plus fit: (C1) ATO client-debt visibility and GIC/penalty remission workflow for tax practices; (C2) mortgage broker trail-book, clawback and commission reconciliation across aggregators; (C3) Div 296 CGT-reset and valuation-evidence triage across a firm's SMSF client book. The rest are crowded, are bundled by incumbents, or have a buyer the founder cannot reach.

### Cited Findings

#### C1. Tax practices: ATO client-debt visibility plus GIC/FTL remission request workflow
- (a) **Who:** small and mid-size Australian tax and BAS practices (registered tax and BAS agents) with SME clients carrying ATO debt.
- (b) **Pain and frequency:**
  - No single report shows all ATO debt across a firm's clients; the ICA report covers only ICA debt. — [Xero Product Ideas](https://productideas.xero.com/forums/967133-reports-tax/suggestions/51365269-au-tax-integrate-live-ato-client-account-balance)
  - DPNs do not appear on company accounts. — [ATO Community](https://community.ato.gov.au/s/question/a0JRF000003xv29/p00401175)
  - Since 22 January 2026, remission requests are lodged as forms via practice mail, with waits of 50+ days and a backlog. — [ATO](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/tax-professionals-newsroom/changes-to-interest-and-ftl-penalty-remission-requests); [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)
  - Frequency: more than 125,000 remission requests a year nationally. — [Public Accountant](https://publicaccountant.com.au/features/ato-tax-gic-interest-reform/)
- (c) **Willingness to pay:**
  - 76% of requests are granted, so the remitted interest and penalties are real money for clients. — [Public Accountant](https://publicaccountant.com.au/features/ato-tax-gic-interest-reform/)
  - Practitioners are publicly asking Xero to build this. — [Xero Product Ideas](https://productideas.xero.com/forums/967124-projects-tracking/suggestions/51675454-tax-manager-live-ato-data-in-dashboard-ato-acco)
  - The IPA is publicly unhappy with remission handling. — [Accountants Daily](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms)
  - No AUD price anchors for an equivalent tool were found.
- (d) **Competitors:**
  - Two searches found no named product offering cross-client ATO debt monitoring or remission-form automation. — [search summaries citing Xero ideas and ATO guidance]
  - The Xero thread says "some software providers" offer live ATO dashboards. — [Xero Product Ideas](https://productideas.xero.com/forums/967124-projects-tracking/suggestions/51675454-tax-manager-live-ato-data-in-dashboard-ato-acco)
  - AccountKit covers lodgment lists only. — [AccountKit](https://support.account-kit.com/hc/en-us/articles/360000128374-ATO-Lodgement-Statistics)
- (e) **Why unsolved, why now:**
  - The ATO only standardised the remission form in January 2026. — [ATO](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/tax-professionals-newsroom/changes-to-interest-and-ftl-penalty-remission-requests)
  - Ombudsman reviews of remission and OSfA are ongoing. — [Tax Ombudsman plan](https://taxombudsman.gov.au/wp-content/uploads/2026/06/Implementation-plan-GIC-remission-published.pdf); [Tax Ombudsman newsletter](https://www.theioi.org/downloads/2081j/Tax%20Ombudsman%20-%20Quarterly%20newsletter%20-%20March%202026%20-%20EN.pdf)
- (f)–(h): see Inferences.

#### C2. Mortgage brokers: trail-book, clawback and commission reconciliation across aggregators
- (a) **Who:** solo brokers and small brokerages (1–20 brokers) under aggregators such as Connective, AFG, LMG, Finsure, Specialist Finance Group and others.
- (b) **Pain and frequency:**
  - Monthly remittance reconciliation across non-standard aggregator file formats. — [Sandlabs](https://sandlabs.com.au/blog/lender-remittance-processing-mortgage-brokers)
  - Clawbacks on loans discharged within the 1–2 year clawback window. — [Sandlabs software guide](https://sandlabs.com.au/blog/mortgage-broker-software-guide)
- (c) **Willingness to pay (money already flowing):**
  - Median gross clawbacks per broker rose 16.5% in 2025. On a matched sample of five aggregator groups, the median rose from about A$9,820 (2024) to A$11,442 (2025). This was the first industry-level measure, in the MFAA State of the Industry 2026 report, analysed by Cotality using nine aggregators' data. — [The Adviser](https://www.theadviser.com.au/broker/48994-broker-clawback-costs-rise-in-first-industry-level-measure); [MPA](https://www.mpamag.com/au/specialty/education/mfaas-state-of-mortgage-and-finance-broking-clawbacks-consolidation-and-commercial-growth/591179); [Broker News](https://www.brokernews.com.au/news/breaking-news/mfaa-report-lifts-the-lid-on-broking-broker-income-commercial-clawbacks-and-more-290064.aspx)
  - Brokers settled A$495.55bn across 838,815 residential loans in calendar 2025 (+23.5% by value) and wrote 81.6% of new home loans in the June 2026 quarter. — [Broker News](https://www.brokernews.com.au/news/breaking-news/mfaa-report-lifts-the-lid-on-broking-broker-income-commercial-clawbacks-and-more-290064.aspx)
  - Trail runs at about 0.15–0.20% a year of outstanding balance (vendor figure). — [Sandlabs](https://sandlabs.com.au/blog/mortgage-broker-software-guide)
  - Broker surveys report stress, with clawbacks "biting". — [Broker News](https://www.brokernews.com.au/news/breaking-news/broker-satisfaction-high-but-stress-and-clawbacks-bite-288226.aspx)
- (d) **Competitors:**
  - TrailAI and HumbleTech Commissions (Sandlabs case studies). — [TrailAI](https://sandlabs.com.au/work/trailai); [HumbleTech](https://sandlabs.com.au/work/humbletech)
  - Sherlok for repricing and retention. — [Sherlok](https://sherlok.com.au)
  - Spreadsheet templates. — [MangoApps](https://www.mangoapps.com/templates/forms/broker-commission-reconciliation-worksheet)
- (e) **Why now:** clawback costs were measured industry-wide for the first time in 2026. A brokerage CEO argued that "no trail should mean no clawbacks". A submission to the Productivity Commission's financial-system inquiry called clawbacks a disincentive to consumer switching. — [The Adviser](https://www.theadviser.com.au/breaking-news/38426-no-trail-should-mean-no-clawbacks-urges-brokerage-ceo); [PC submission subdr070 (PDF)](https://assets.pc.gov.au/__data/assets/pdf_file/0014/226130/subdr070-financial-system.pdf)
- (f)–(h): see Inferences.

#### C3. SMSF accountants and administrators: Div 296 CGT-reset election and 30 June 2026 valuation-evidence triage
- (a) **Who:** accounting firms with SMSF books, SMSF administrators, and SMSF auditors who must test 30 June 2026 values.
- (b) **Pain:** an irrevocable whole-fund election available to every SMSF, with dual cost-base records and valuation scrutiny. It must be decided by the 2026–27 return due date. — [FS Super](https://www.fssuper.com.au/article/valuations-for-division-296-and-smsfs); [SMS Magazine](https://smsmagazine.com.au/features/to-adjust-or-not-adjust/)
- (c) **Willingness to pay:**
  - A valuation provider reports a demand spike. — [SMSF Property Valuations](https://smsfpropertyvaluations.com.au/?p=4178)
  - Advisory firms (Bentleys, BDO, Kelly Partners, Findex, Moore, HLB, DBA Lawyers) are all publishing Div 296 guidance, which signals billable advisory work. — [Findex](https://www.findex.com.au/insights/article/major-division-296-update-common-sense-prevails-but-questions-remain); [DBA Lawyers](https://www.dbalawyers.com.au/announcements/division-296-revised-3m-super-tax/); [HLB](https://hlb.com.au/smsfs-and-the-division-296-tax-changes/)
- (d)–(h): see Inferences.

#### C4. SMSF audit capacity (auditor shortage, independence)
- (a) **Who:** SMSF auditors and the accounting firms that must use external auditors.
- (b) **Pain:**
  - Auditor numbers fell from 7,073 (2014) to 3,882 at 30 June 2025 (ASIC REP 825). Another write-up says 3,382, so the sources conflict. Numbers fell to about 3,762 by February 2026 (SMSF Association conference). — [SMSF Adviser](https://www.smsfadviser.com/smsf-auditor-numbers-continue-to-dwindle); [SMSF Adviser (3,382 figure)](https://www.smsfadviser.com/smsf-auditor-numbers-continue-to-dwindle-2); [SMS Magazine](https://smsmagazine.com.au/news/2026/03/02/auditor-number-drop-was-expected/)
  - Only 37 of 52 auditor applications were approved in the latest year. — [SMS Magazine](https://smsmagazine.com.au/news/2025/11/11/auditor-replacement-rate-low/)
  - Independence rules forced firms into external audit arrangements, and very low fees raise independence concerns. — [SMSF Adviser](https://www.smsfadviser.com/smsf-auditor-numbers-continue-to-dwindle)
- (d) **Counterpoint:** ASIC calls the drop expected attrition of inactive auditors. — [SMS Magazine](https://smsmagazine.com.au/news/2026/03/02/auditor-number-drop-was-expected/); [ifa](https://www.ifa.com.au/asic-predicts-drop-in-auditor-numbers)

#### C5. Financial advisers: cost of producing SoAs and RoAs
- (a) **Who:** about 15,000 Australian advisers in small licensees **[Background, unverified count]**.
- (b)/(c) **Pain and willingness to pay (dated data):**
  - Padua data showed initial advice fees per document rising from A$2,859 to A$3,315 and ongoing fees from A$3,656 to A$4,865 (FY21 to FY22). — [Professional Planner, 2022](https://www.professionalplanner.com.au/2022/10/unsurprisingly-advice-fees-are-still-rising/); [ifa](https://www.ifa.com.au/advice-fees-jump-by-40-in-5-years)
  - Adviser numbers fell 43% from 27,929 (end 2018) to 15,908 (6 October 2022). Search summary; exact article attribution unconfirmed. — [ifa](https://www.ifa.com.au/advice-fees-far-exceed-current-rate-of-inflation); [Money Management](https://www.moneymanagement.com.au/comment/39290)
- (d) **Competitors:** AdviceDocs, Decimal, AdviserLogic. — see Q3. Trust in AI for financial guidance is 33% versus 56% for advisers (TAL/McCrindle, September 2026). — [Insurance Business](https://www.insurancebusinessmag.com/au/news/technology/ai-enters-financial-decisions-as-australians-still-turn-to-human-advice-590107.aspx)

#### C6. CSLR, Shield and First Guardian complaint and claim handling
- (a) **Who:** small AFS licensees and their PI insurers facing AFCA complaints, claimant law firms, and the advisers paying the levy.
- (b)/(c) **Scale:** 3,429 AFCA complaints, a FY27 advice levy of A$190.3m, and possible scheme costs approaching A$1bn. — [ifa](https://www.ifa.com.au/cslr-revises-fy27-levy-up-to-200m/); [Professional Planner](https://www.professionalplanner.com.au/2026/07/industry-calls-for-new-funding-streams-as-fy27-cslr-advice-levy-hits-190-3-million/)

#### C7. Mortgage broker BID file notes and aggregator-audit evidence
- (a)/(b): see Q2. ASIC reviewed 13 ACLs across eight aggregator groups, and aggregators demand "clear and convincing" BID notes. — [The Adviser](https://www.theadviser.com.au/compliance/49006-asic-releases-best-interest-review-findings); [Connective](https://wiki.connective.com.au/en/articles/555-compliance-best-interests-duty-bid)
- (d) **Competitors:** Team400 BrokerAI, plus aggregator-provided templates. — [Team400](https://team400.ai/ai-for-mortgage-broking)

#### C8. IDR/RG 271 complaint capture and reporting for small AFS licensees and credit licensees
- (b) ASIC's public IDR dashboard (March 2026) and its under-reporting push. — [Adviser Voice](https://www.adviservoice.com.au/2026/09/cpd-think-your-clients-arent-complaining-asic-might-disagree/)
- (d) Civica, 6clicks, CompliSpace. — see Q3.

#### C9. Family law property disclosure bundles after the 10 June 2025 amendments
- (b) The disclosure duty is now statutory and lawyers must explain it. Economic effect of family violence is now a property factor. — [FCFCOA](https://www.fcfcoa.gov.au/news-and-media-centre/fla-changes/fla2024); [LexisNexis](https://www.lexisnexis.com/blogs/en-au/insights/navigating-the-2025-changes-to-the-family-law-act-comprehensive-insights-and-strategic-takeaways-for-lawyers)
- (d) Smokeball already updated its forms. — [Smokeball](https://www.smokeball.com.au/blog/key-changes-to-family-law-forms)

#### C10. Migration agents: ImmiAccount form filling and case management
- (a) 5,081 registered migration agents at 30 June 2024, down from 7,402 in 2018. 1,706 lawyers were removed from the register in March 2021. — [OMARA activity report Jan–Jun 2024 (PDF)](https://www.mara.gov.au/notices-reports-subsite/Files/maar_jan_june_2024.pdf); [OMARA 2018 (PDF)](https://www.mara.gov.au/notices-reports-subsite/Files/maar-jan-jun-2018.pdf)
- (d) Officio (ImmiAccount auto-fill) and Agentcis. — see Q3.

#### C11. Hardship and collections workflow for BNPL providers and small lenders
- (b) AFCA hardship complaints rose 17% in 2025–26. BNPL is now under credit licensing and RG 281. — [Region](https://region.com.au/record-complaint-numbers-against-financial-sector/986894/); [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/a6cfa71f/bnpl-compliance-countdown)

### Inferences

**C1. ATO client-debt and remission workflow (ranked #1; details)**
- (f) **Market size:**
  - **[Background, unverified]** The TPB register holds about 45,000–47,000 registered tax agents and about 9,000–10,000 BAS agents. I estimate this is about 12,000–15,000 distinct practices.
  - At A$100–400 a month per practice, scaled by client count, 3,000–5,000 adopting practices give about A$4–24m ARR.
  - NZ has a parallel problem with IRD agent debt, but different systems; it is a secondary market only.
- (g) **Feasibility: moderate to high for this founder.**
  - v1 needs no ATO API. Agents upload the OSfA reports they can already download: client account running balance report, ICA debt report, BAS agent report, plus per-client transaction CSVs.
  - The tool builds a cross-client debt register: aged debt, GIC accrual estimates (now after-tax cost), payment-plan status and DPN-risk flags for companies with overdue PAYGW, GST or SG.
  - It produces pre-filled ATO remission forms, with an AI-drafted "circumstances" narrative mapped to the ATO's published acceptance criteria.
  - It tracks each request sent via practice mail against the 50+ day wait.
  - This matches the founder's ingest, SQL, pivot, dashboard and OpenAI skills.
  - Channel: the IPA (its members are small practices and it is vocal on GIC), practitioners commenting on the Xero product-ideas threads (directly reachable), accountant Facebook and LinkedIn groups, and Accountants Daily coverage.
  - First paying customers in 3–6 months is plausible because each request has a dollar value (remitted GIC) the firm can bill.
- (h) **Risks:**
  - The ATO or Xero could ship a consolidated debt report. The Ombudsman is reviewing OSfA and the Xero idea is "under review".
  - Live data needs DSP accreditation and security obligations **[Background, unverified]**.
  - ATO discretion and narrow criteria cap the remission win rate.
  - Practice-management incumbents (XPM, MYOB Practice, CCH, FYI, Karbon) could bundle it.
  - Agents' data-security obligations make browser scraping of OSfA unacceptable. Do not build a scraper.
- **Competitor hunt still owed:** two searches found no named product. The lesson from the last round says this is not proof, so hand-check LodgeiT, GovReports, FYI, Karbon, XPM/Xero Tax, MYOB Practice, CCH iFirm, APS/HandiTax and BGL CAS 360. Also check whether offshore outsourcers (for example ConnectOS clients) already handle ATO-debt admin.

**C2. Broker trail-book, clawback and commission reconciliation (ranked #2; details)**
- (f) **Market size:**
  - MFAA membership was 16,172 (2025). — [Broker News](https://premium.brokernews.com.au/au-2025-businessupdate-mfaa-powers-forward-sets-2026-agenda)
  - **[Background, unverified]** About 19,000–20,000 active brokers in total.
  - At A$50–150 per broker per month, about A$11–36m TAM. Realistic serviceable share is small brokerages that do not use the aggregator's own reporting.
  - NZ has commission and clawback models too **[Background, unverified]**. The UK is larger but different.
- (g) **Feasibility: high technical fit.** It is file ingestion of non-standard remittance statements (the founder's sync and parsing experience), loan-level reconciliation (SQL), and clawback-exposure and run-off dashboards (dashboard builder). The value is concrete: missed commissions recovered, clawback exposure forecast by month, and retention lists for loans inside the clawback window. Channel: brokerage owners via Australian Broker, The Adviser and Broker News, MFAA and FBAA events, and aggregator marketplaces (partner deals unknown).
- (h) **Risks:**
  - Aggregators control the data relationship and could improve their own reporting, a classic bundling risk.
  - TrailAI, HumbleTech and Sherlok already exist.
  - If the PC or MFAA lobbying shortens the clawback window, the pain shrinks.
  - Small brokers are price-sensitive.

**C3. Div 296 CGT-reset and valuation-evidence triage (ranked #3; details)**
- (f) **Market size:**
  - **[Background, unverified]** About 650,000 SMSFs and several thousand firms with SMSF books.
  - At A$20–80 per fund for election modelling plus an evidence pack, 5–10% penetration is roughly A$0.7–5m, mostly one-off in 2026–28, plus a small recurring tail for dual cost-base tracking.
  - No NZ equivalent.
- (g) **Feasibility: moderate.**
  - Pull fund and asset data from BGL or Class exports (or APIs **[Background, unverified]**) and run a batch "elect or not" model per fund: unrealised gain or loss at 30 June 2026 and members near A$3m or A$10m.
  - Flag assets without supportable valuation evidence.
  - Produce a per-fund decision memo for the accountant to sign off.
  - Channel: SMSF Association, SMSF Adviser and SMS Magazine readership, and SMSF administrators.
- (h) **Risks:**
  - It is deadline-tied, which the last round found weaker.
  - BGL and Class are highly likely to bundle the election and dual cost base.
  - Regulations and the ATO form were still outstanding as of the March 2026 sources.
  - Super modelling for individuals can stray into financial-product advice, a licensing concern for the accountant **[Background, unverified]**.

**C4–C11 (not in the top 3, with reasons)**
- **C4 SMSF audit capacity:**
  - Real decline, but ASIC frames it as attrition and fees are very low.
  - Incumbents such as BGL and Class, plus offshore audit-support firms **[Background, unverified]**, dominate.
  - Willingness to pay is weak given the low audit fees.
  - It could become a channel for C3 (auditors testing 30 June 2026 values).
- **C5 SoA/RoA production:** crowded with AI drafting tools (AdviceDocs, Decimal, AdviserLogic, Padua, Xplan, Midwinter), so the solution gap is small. Licensing and liability are significant.
- **C6 CSLR, Shield and First Guardian:** the most money flowing of all (up to about A$1bn), but there is no clear software buyer. Complaints run through AFCA and CSLR for free, and claimant firms are law firms. Feasibility is low, with high liability and reputational exposure.
- **C7 BID file notes:** aggregator-mediated and already targeted by AI vendors. The ASIC review increases demand but channels sit with aggregators.
- **C8 IDR/RG 271:**
  - The new public-dashboard trigger is real.
  - Small licensees get few complaints and aggregators or licensees provide registers **[Background, unverified]**.
  - Enterprise vendors exist.
  - Willingness to pay is low for small firms. It may be a feature, not a product.
- **C9 Family law disclosure:**
  - The pain (assembling disclosure bundles and asset pools) is real but served by LEAP, Smokeball and Actionstep plus manual paralegal work.
  - Liability is high, so it is a poor first market for a non-lawyer founder.
- **C10 Migration:** a small (about 5,000 agents) and shrinking buyer base, already served by Officio, Agentcis and Migration Manager. Avoid.
- **C11 Hardship/collections:** buyers are licensed lenders with long procurement cycles and compliance demands. Possible later, but not a 6–12 month win.
- **Not researched within budget:**
  - Insurance broker renewals and claims advocacy. **[Background, unverified]** Incumbent broker systems (Sunrise/Winbeat, Broking Pro, Insight) are entrenched, and NIBA notes broker complaints are under 1% of AFCA volume.
  - Wills and estates/probate, personal injury, conveyancing (PEXA/InfoTrack dominance **[Background, unverified]**), tax-time document chasing (crowded: FYI, Karbon, Content Snare, Ignition **[Background, unverified]**).

### Gaps
- No AUD price list was found for any direct competitor in C1–C3 (TrailAI, HumbleTech, Sherlok pricing not surfaced).
- No Seek job-ad evidence (for example "commission reconciliation officer – mortgage broking" or "ATO debt specialist") was collected.
- No 2026 counts verified for registered tax agents (TPB), SMSFs (ATO), advisers or brokers. Background figures are used above and labelled.
- DBFO tranche 2, the Skills in Demand workload, insurance broking, probate and personal injury were not researched within budget.

---

## Q5. Top 3 ranking with 1–10 scores

### Takeaway
1. **ATO client-debt visibility and remission workflow** for tax practices (total 35/60).
2. **Mortgage broker trail-book, clawback and commission reconciliation** (33/60).
3. **Div 296 CGT-reset and valuation-evidence triage** for SMSF books (30/60).

#1 has the clearest documented gap: practitioners are publicly asking Xero for it, and no named product turned up. It is tied to money already flowing (remitted GIC and penalties, after-tax ATO debt) and to a January 2026 process change. #2 has the strongest money-flowing evidence (A$11,442 median clawbacks per broker) and the best technical fit, but known competitors and aggregator gatekeeping. #3 is a large but one-off, deadline-tied workload that BGL and Class are likely to bundle.

### Cited Findings
- #1 evidence: [Xero Product Ideas, Total ATO Debt](https://productideas.xero.com/forums/967133-reports-tax/suggestions/51365269-au-tax-integrate-live-ato-client-account-balance); [ATO remission form change](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/tax-professionals-newsroom/changes-to-interest-and-ftl-penalty-remission-requests); [Accountants Daily, 50+ day delays](https://www.accountantsdaily.com.au/regulation/22224-tax-agents-air-frustrations-about-delays-with-new-gic-remission-forms); [Public Accountant, 125,000+ requests, 76% granted](https://publicaccountant.com.au/features/ato-tax-gic-interest-reform/); [ATO Community, DPNs not on company accounts](https://community.ato.gov.au/s/question/a0JRF000003xv29/p00401175)
- #2 evidence: [The Adviser, clawback median A$11,442](https://www.theadviser.com.au/broker/48994-broker-clawback-costs-rise-in-first-industry-level-measure); [Sandlabs, no standard remittance format](https://sandlabs.com.au/blog/lender-remittance-processing-mortgage-brokers); [TrailAI](https://sandlabs.com.au/work/trailai); [HumbleTech](https://sandlabs.com.au/work/humbletech); [Sherlok](https://sherlok.com.au)
- #3 evidence: [FS Super](https://www.fssuper.com.au/article/valuations-for-division-296-and-smsfs); [SMS Magazine](https://smsmagazine.com.au/features/to-adjust-or-not-adjust/); [MLC, passed 10 March 2026](https://cloud.ecomm.mlc.com.au/div-296-passed)

### Inferences

| Rank | Candidate | Pain | WTP evidence | Solution gap | Market size | Founder feasibility | Defensibility | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | C1 ATO client-debt + GIC/FTL remission workflow (tax practices) | 7 | 5 | 7 | 6 | 6 | 4 | 35 |
| 2 | C2 Broker trail-book, clawback and commission reconciliation | 6 | 6 | 4 | 6 | 7 | 4 | 33 |
| 3 | C3 Div 296 CGT-reset + valuation-evidence triage (SMSF books) | 6 | 5 | 4 | 6 | 6 | 3 | 30 |
| – | C8 IDR/RG 271 capture for small licensees | 4 | 3 | 4 | 5 | 7 | 3 | 26 |
| – | C6 CSLR/Shield/First Guardian claims | 8 | 6 | 5 | 6 | 2 | 4 | 31 (wrong buyer for founder) |
| – | C5 SoA/RoA drafting | 7 | 6 | 2 | 6 | 5 | 2 | 28 |

**Score reasoning:**
- **C1:**
  - Pain is 7: documented frustration, 50+ day waits, DPN blind spots.
  - WTP is 5: indirect, through remitted GIC and penalties and billable remission work, with no price anchors found.
  - Gap is 7: no named competitor, but an unnamed "some providers" exist.
  - Feasibility is 6: no API is needed for v1, but DSP accreditation is needed for live data.
  - Defensibility is 4: the ATO, Xero or other practice-management incumbents could close the gap.
- **C2:**
  - WTP is 6: clawbacks are hard dollars.
  - Gap is 4: TrailAI, HumbleTech, Sherlok and aggregator CRMs exist.
  - Feasibility is 7: data parsing and dashboards are the founder's strength.
  - Defensibility is 4: aggregators own the relationship.
- **C3:**
  - Gap is 4 because BGL and Class bundling is likely.
  - Defensibility is 3 because the job is one-off and deadline-tied.
- **C6** scores high on pain and money but 2 on feasibility. Do not pursue as a first product.

**Kill criteria and next checks:**
- **C1:**
  - Kill if a hand-check finds that a major practice-management tool (XPM/Xero Tax, MYOB Practice, CCH iFirm, FYI or Karbon) or LodgeiT/GovReports already shows live all-debt views across clients.
  - Kill if fewer than 3 of 10 interviewed practices with SME debt books would pay at least A$100 a month.
  - Kill if the ATO announces a consolidated agent debt report in its OSfA roadmap.
- **C2:**
  - Kill if 2 or more large aggregators already give brokers clawback-exposure forecasts and missing-commission alerts natively.
  - Kill if TrailAI or HumbleTech pricing is at or below A$50 a broker per month with good reviews.
- **C3:**
  - Kill if BGL or Class release a CGT-reset election module with batch modelling before about Q1 2027.
  - Kill if the regulations or ATO form shift the decision to a simple default.
- **Combined option:** C1 and C3 share a buyer (accounting firms) and a data shape (per-client ATO and fund data, batch analytics, AI-drafted memos and forms). A firm-level "client exposure console" could start with ATO debt and remission and add a Div 296 module for SMSF books. This is an inference to test in interviews.

### Gaps
- Scores are judgement based on search evidence, with no buyer interviews and no competitor pricing.
- The C1 competitor hunt is incomplete: "some software providers" with live ATO dashboards are unnamed, which is the biggest single uncertainty in this ranking.
- Not checked: professional-body partner deals (IPA, CA ANZ, CPA Australia, MFAA, FBAA, SMSF Association) for ATO-debt, clawback or Div 296 tools.
