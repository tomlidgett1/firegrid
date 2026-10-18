# Unsolved, high-willingness-to-pay problems in healthcare & life sciences (as of October 2026)

> **Research-constraint note for the report writer (read first):** 24 web searches were completed. After that the shared web-search budget ran out (limit hit across all agents), and every WebFetch call failed DNS resolution (ENOTFOUND on all domains, including cms.gov, ama-assn.org and ycombinator.com). So the **cited findings below come from search-result summaries, not from full-page reads**. Treat dollar figures as "reported by the cited page" and spot-check before publishing. Facts I hold from background knowledge but could **not** verify this session are kept out of Cited Findings. They appear only in Gaps, labeled **[UNVERIFIED BACKGROUND]**, sometimes with a known primary URL to check.

---

## Objective: which specific problems would buyers clearly pay to solve where no great solution exists? (candidate profiles + top-3 ranking)

### Takeaway
The best unsolved, paid-for problems are narrow, policy-driven back-office jobs in segments too small for Epic or Waystar. Three stand out: (1) long-term-care Medicaid applications and "Medicaid-pending" receivables for nursing homes and assisted living; (2) claims and statement reconciliation for Australia's new Support at Home in-home aged care program (launched Nov 2025 and visibly broken in 2026); (3) revenue integrity for independent clinical research sites, meaning unbilled sponsor invoiceables. Broad prior authorization, AI scribes, front-desk voice agents, dental insurance verification, home-care shift filling and (increasingly) credentialing are crowded with funded AI startups and should be avoided or entered only through a very narrow wedge.

### Cited Findings

#### C1. Long-term-care (LTC) Medicaid applications & "Medicaid pending" receivables (US nursing homes / assisted living / families)
- "Medicaid pending" is the status after an application is submitted but before approval or denial. The facility usually agrees to provide care on the expectation that Medicaid will reimburse retroactively from the application date, but reimbursement is **not guaranteed** — [ExaCare](https://www.exacare.com/article/medicaid-pending-nursing-homes); [DHC Law FAQ](https://www.dhclaw.com/faqs/nursing-home-costs-while-medicaid-application-is-pending.cfm); [Elder Needs Law (FL)](https://www.elderneedslaw.com/blog/what-does-medicaid-pending-mean-and-why-it-matters-in-a-florida-nursing-home)
- Facilities are not required to accept "Medicaid pending" residents, and some sources say most will not admit someone unless they are private-pay. That signals facilities see these accounts as a real financial risk — [caregivers.com forum](https://portal.prod.caregivers.com/questions/out-of-money-what-are-our-options-while-we-wait-for-medicaid-478438.htm); [Elder Needs Law](https://www.elderneedslaw.com/blog/what-does-medicaid-pending-mean-and-why-it-matters-in-a-florida-nursing-home)
- Outsourced vendors already sell Medicaid application processing to nursing homes. For example, Precision Medicaid tells facilities that outsourcing "will save your facility time, money, expense and difficulties" (no public prices) — [DHC Law / Precision Medicaid](https://www.dhclaw.com/reports/precision-medicaid.cfm); see also [ACN Newswire, "The value of outsourcing Medicaid applications"](https://www.acnnewswire.com/press-release/english/23613/the-value-of-outsourcing-medicaid-applications)
- WTP anecdote (family side): a caregiver forum post reports an elder-law attorney's office charging **$6,000** for a helper to navigate Medicaid paperwork. Another reply says nursing-home staff often help for free (anecdotal) — [caregivers.com NJ thread](https://portal.prod.caregivers.com/questions/who-can-we-get-to-help-us-with-the-medicaid-application-we-are-in-nj-494365.htm)
- Existing software is thin. NavigAid (built by Senior Planning Services, launched 2021) is a step-by-step online application tool covering only NY, NJ, PA, CT, RI and MA — [BusinessWire 2021](https://www.businesswire.com/news/home/20211013005113/en/NavigAid-Supports-Caregivers-Through-the-Medicaid-Application-Process). MedicaidSoft (Utah, founded June 2021) lists **one employee** and claims "software tools and AI" — [Gust](https://gust.com/companies/medicaidsoft/pitch_deck)
- An improperly submitted application can lead to delay or denial of coverage, which matters for families burning through savings. Example timing rule: Washington advises applying at least 45 days before coverage is needed, and nursing-home coverage starts the first day of the month of application — [WashingtonLawHelp](https://www.washingtonlawhelp.org/when-apply-medicaid-long-term-care)

#### C2. Australia "Support at Home" in-home aged care: claims, monthly statements & reconciliation (AU providers)
- In Aug 2026 the Department blamed provider software for ongoing problems with Support at Home monthly statements. Operators (e.g., WA provider Community Vision) blame the program design and the difficulty of reconciling figures with Services Australia — [The Weekly SOURCE, 10 Aug 2026](https://www.theweeklysource.com.au/department-blames-providers-for-home-care-statement-problems/)
- Providers "continue to experience problems putting claims through Services Australia, putting significant pressure on cash flows." The burden of fixing this falls on providers and software vendors. Silverchain cites system functionality, testing environments and payment processes — [The Weekly SOURCE, 31 Aug 2026](https://www.theweeklysource.com.au/support-at-home-claiming-problems-send-shocks-through-sector/)
- Enkindle Consulting's 2026 survey of 300+ providers found that more than half say their digital systems are not meeting their needs or do not exist. 55.6% said digital systems were not ready, and 42.4% reported integration problems with finance, payroll and rostering. The headline: Support at Home "leaves providers reliant on spreadsheets" — [The Weekly SOURCE / Enkindle](https://www.theweeklysource.com.au/enkindle-support-at-home-leaves-providers-reliant-on-spreadsheets/); [survey comments](https://www.theweeklysource.com.au/enkindle-survey-comments-reveal-inadequacy-of-support-at-home/)
- A Senate inquiry received hundreds of submissions. FOI documents show officials were warned about Integrated Assessment Tool problems almost as soon as the new Aged Care Act commenced — [The Weekly SOURCE, 24 Sep 2026](https://www.theweeklysource.com.au/does-the-government-have-a-clue-about-support-at-home/); [Inside Ageing](https://insideageing.com.au/support-at-home-under-pressure-as-providers-report-system-wide-strain/)
- The Department removed forward Support at Home targets (Sep 2026) — [The Weekly SOURCE, 2 Sep 2026](https://www.theweeklysource.com.au/department-of-health-disability-and-ageing-removes-forward-support-at-home-targets/). The rollout was still "down to the wire" with providers awaiting detail in late Nov 2025 — [The Weekly SOURCE, Nov 2025](https://www.theweeklysource.com.au/support-at-home-rollout-is-getting-down-to-the-wire-as-providers-await-detail)

#### C3. Independent clinical-research-site revenue integrity: unbilled sponsor "invoiceables" (US sites & site networks)
- Regeneris Medical audit: **>$50,000 never invoiced, nearly 10% of the site's total earnings**, including unbilled screen-fail procedures and under-billed screen-failure counts (vendor case study) — [CRIO case study](https://clinicalresearch.io/resources/regeneris-medical-crio-would-have-saved-50k-in-uninvoiced-revenue/); [PDF](https://clinicalresearch.io/wp-content/uploads/2025/04/regeneris-medical.pdf)
- Ascension Healthcare recovered **>$100,000** in unbilled sponsor revenue after finding gaps between allowed charges and amounts billed — [Advarra](https://www.advarra.com/?p=35095)
- Screening and screen-failure activity is described as "among the largest sources of unrecovered revenue" at a site. Sites now hire dedicated revenue-operations and revenue-integrity managers to reconcile contract terms, billable activity, invoices and recognized revenue every month (WTP signal: headcount) — [Prolerity Clinical Research job posting](https://career.io/job/manager-revenue-operations-marrero-prolerity-clinical-research-d39c01356ffd3351aaae4175aa9639ab); [Paylocity posting](https://recruiting.paylocity.com/Recruiting/Jobs/Details/4324856)
- Underpricing is a quiet cause: finance teams accept sponsor per-procedure rates unchecked, and no audit flags the shortfall — [Clinical Trial Vanguard, "The Billing Grid"](https://www.clinicaltrialvanguard.com/?p=32730)
- Vague budget terms for screen failures and unscheduled visits create leakage, and some sponsors defer screen-fail payment until trial end — [WCG, 10 tips (2022, older)](https://www.wcgclinical.com/wp-content/uploads/2022/03/10-tips-to-help-research-sites-recognize-earned-revenue.pdf)
- An outsourced service market exists. Clinical Research Billing partners with CRIO to retroactively invoice sponsors for missed billables, pitched as raising "site valuation" — [CRIO](https://clinicalresearch.io/resources/clinical-research-billing-partners-with-crio-to-unlock-hidden-revenue-and-increase-site-valuation/). SCRS publishes a Site Invoiceables Guide — [SCRS](https://myscrs.org/?p=18094)

#### C4. Payer automatic E/M downcoding appeals (US independent primary care & specialty practices)
- Per ASPR, Cigna's policy R49 took effect Oct 1, 2025. It automatically drops 99204, 99205, 99214, 99215, 99244 and 99245 by one level, and modifiers including -25 do not prevent it — [ASPR RCM](https://asprcmsolutions.com/insights/cigna-r49-em-downcoding-appeal-file-2026/)
- To dispute a downcode, physicians must file an appeal and submit supporting medical records **by fax**. Cigna did not specify the triggering algorithms — [AAFP FPM Nov 2025](https://www.aafp.org/pubs/fpm/issues/2025/1100/beyond-the-beltway.html)
- Sources conflict on status. AASM says Cigna agreed to pause the policy effective Oct 1, 2025 — [AASM](https://aasm.org/?p=49323). AAFP says the pause applied **in California** — [AAFP](https://www.aafp.org/fpm/2025/1100/beyond-the-beltway). ASPR says it took effect — [ASPR](https://asprcmsolutions.com/insights/cigna-r49-em-downcoding-appeal-file-2026/)
- On Mar 13, 2026 the Maryland Insurance Administration reportedly fined Cigna **$80,000** and ordered it to stop automatic downcoding without record review (single secondary source) — [ASPR](https://asprcmsolutions.com/insights/maryland-cigna-downcoding-order-2026/)
- Organized opposition: APMA [press release](https://www.apma.org/about-apma/news/news-releases/2025/apma-opposes-cigna-downcoding-policy/); AAAAI [letter, 18 Sep 2025](https://www.aaaai.org/Aaaai/media/Media-Library-PDFs/About/Advocacy/CIGNA_Downcoding_letter_18sep2025-IV.pdf); California Medical Association called it "unlawful and burdensome" — [CMA](https://www.cmadocs.org/newsroom/news/view/ArticleId/50953/CMA-urges-Cigna-to-withdraw-unlawful-and-burdensome-downcoding-policy)

#### C5. No Surprises Act IDR for small/independent out-of-network providers (US)
- 2025 saw **2,516,173** non-air-ambulance disputes, 145x the projected rate. Including air ambulance the total was **2,559,375** — [MoneyGeek analysis of CMS data](https://www.moneygeek.com/insurance/health/no-surprises-act-idr-disputes/)
- Providers won **88%** of disputes in H1 2025 (85% in 2024, 81% in 2023) — [Georgetown CHIR](https://chir.georgetown.edu/the-no-surprises-act-idr-process-an-early-look-at-2025-data/). In H2 2025 they won **85%** of 1.15M determinations — [MoneyGeek](https://www.moneygeek.com/insurance/health/no-surprises-act-idr-disputes/); [HFMA](https://www.hfma.org/payment-reimbursement-and-managed-care/no-surprises-act-idr-data-provider-wins/)
- Providers initiated 99.9% of disputes. Three organizations dominate resolved disputes: Radiology Partners (~30%), HaloMD (~27%) and TeamHealth (~20%), per one study — [Georgetown CHIR](https://chir.georgetown.edu/?p=11899); [Health Affairs Forefront](https://www.healthaffairs.org/content/forefront/no-surprises-act-idr-process-early-look-2025-data)
- About 430,000 disputes were outstanding in late June 2025, and two-thirds of determinations exceeded the 30-day requirement — [Georgetown CHIR](https://chir.georgetown.edu/the-no-surprises-act-idr-process-an-early-look-at-2025-data/)
- IDR costs have reportedly topped $22 billion, which is drawing employer and broker attention (policy-backlash risk) — [Insurance Business](https://www.insurancebusinessmag.com/us/news/benefits/no-surprises-act-idr-costs-top-22-billion-brokers-take-note-587584.aspx). A further Health Affairs piece from Mar 2026 — [Health Affairs](https://www.healthaffairs.org/do/10.1377/forefront.20260318.548269/full/)

#### C6. Independent pharmacy underwater reimbursement / MAC price appeals (US)
- After *Rutledge v. PCMA*, states can regulate PBM reimbursement without ERISA preemption. State MAC-transparency laws often include appeal mechanisms when reimbursement falls below acquisition cost (law-firm overview) — [Daeryun Law](https://www.daeryunlaw.com/ru/practices/detail/pharmacy-reimbursement)
- A 2026 podcast covers which states are enforcing "underwater payment" statutes and what to do when a PBM rejects an appeal. It is sponsored by Pharmacy Marketplace, which sells MAC-appeal software, so a partial solution exists — [PUTTcast](https://puttcast.riverside.com/e/reclaiming-pharmacy-revenue-state-level-pbm-enforcement-mac-appeals); [Pharmacy Marketplace MAC appeals](https://knowledge.pharmacymarketplace.com/knowledge/how-to-manage-mac-appeals-in-pharmacy-marketplace)
- Older context (2016): independents report repeated losses filling Medicare Part D prescriptions, paid below ingredient cost — [America's Pharmacist, Jul 2016](https://digitaleditions.sheridan.com/article/Up+Front/2516988/314877/article.html)

#### C7. Medical device regulatory submissions (510(k)/De Novo/SaMD) for small medtech
- Consultant rates run $150–$500/hr, or fixed fees of $15,000–$80,000 (vendor-sourced) — [Complizen](https://www.complizen.ai/post/complizen-vs-fda-510k-consultants-for-faster-clearance). SaMD/AI-enabled devices run $30,000–$70,000 over 8–14 months, excluding user fees and testing — [MedDeviceGuide](https://meddeviceguide.com/blog/how-much-does-510k-cost-guide); [hourly rates guide](https://meddeviceguide.com/blog/medical-device-regulatory-consulting-hourly-rates-region-guide)
- The FY2026 standard 510(k) user fee is **$26,067**, or **$6,517** with Small Business Determination (≤$100M revenue). A single 510(k) can total $30,000 to $500,000+ — [MedDeviceGuide](https://meddeviceguide.com/blog/how-much-does-510k-cost-guide)
- AI tools priced at $200–$2K/month claim to shift research work away from consultants (self-interested claim). Other sources stress that skilled regulatory oversight is still needed — [Complizen](https://www.complizen.ai/post/ai-tools-fda-510k-submissions); [IntuitionLabs](https://intuitionlabs.ai/articles/fda-ai-510k-submission-guidelines-best-practices)

#### C8. Medicare WISeR prior auth (traditional Medicare, 6 states) for pain/ortho/wound-care practices
- WISeR started Jan 1, 2026 and runs to Dec 31, 2031 in six states. It applies AI-assisted prior auth to selected Part B services: electrical nerve stimulator implants, steroid injections, knee arthroscopy for knee OA, and skin and tissue substitutes — [KFF](https://www.kff.org/medicare/examining-the-potential-impact-of-medicares-new-wiser-model/); [DLA Piper, Jan 2026](https://www.dlapiper.com/en-be/insights/publications/2026/01/cms-wiser-model); [APTA](https://www.apta.org/article/2025/07/22/cms-launches-voluntary-prior-authorization-model-for-traditional-medicare)
- Participants receive financial incentives tied to reduced utilization, which raises concern about more denials. CMS requires a licensed-clinician second opinion before AI-based denials, and a "gold carding" exemption may come — [KFF](https://www.kff.org/medicare/examining-the-potential-impact-of-medicares-new-wiser-model/); [DLA Piper](https://www.dlapiper.com/en-be/insights/publications/2026/01/cms-wiser-model)
- On Jun 9, 2026 the House Appropriations Committee adopted an amendment barring funds for WISeR (not final law). H.R. 6361 to block WISeR was introduced in Dec 2025 — [Nelson Mullins, 30 Jun 2026](https://www.nelsonmullins.com/insights/blogs/healthcare_essentials/federal-healthcare-policy-developments/is-the-wiser-prior-authorization-pilot-dead-or-alive); [NatLawReview](https://natlawreview.com/article/wiser-prior-authorization-pilot-dead-or-alive)

#### C9. ABA therapy authorizations & 6-month re-authorizations (US ABA providers)
- Reassessments with progress reports are due at 6-month intervals before more services are authorized (Kaiser guide, 2022). Other plans reauthorize every 6–12 months — [Kaiser Permanente](https://healthy.kaiserpermanente.org/content/dam/kporg/final/documents/community-providers/mas/2022/applied-behavioral-analysis-therapy-guide-mas-en.pdf); [Special Learning](https://special-learning.com/blog/does-insurance-cover-aba-therapy/)
- Hours disputes are common. In one example a BCBA recommends 35 hrs/week and the insurer approves 15–20, against BACB guidance of 25–40 hrs/week (advocacy source) — [CareRoute](https://www.careroute.ai/costs/aba-therapy-bill-how-to-lower). CE courses teach aligning goals with payer medical-necessity criteria — [Manhattan Psychology Group](https://www.manhattanpsychologygroup.com/events/optimizing-aba-treatment-plans-for-funding-approval/)
- Silna Health ($27M total, including a $22M Series A co-led by Accel and Bain Capital Ventures) already runs the full ABA authorization lifecycle, including concurrent reviews and re-authorizations — [Silna ABA page](https://www.silnahealth.com/aba-therapy/); [funding release](https://www.silicon.co.uk/press-release/silna-health-announces-27-million-in-funding-to-tackle-americas-prior-authorization-crisis)

#### C10. Provider credentialing & payer enrollment (small practices, behavioral health, groups)
- A 2026 industry report says 1 in 5 hospitals loses more than $1M a year to credentialing-related delays — [DirectShifts](https://www.directshifts.com/employer-resources/payer-enrollment-vs-credentialing-key-differences-every-healthcare-employer-must-understand-in-2026)
- Assured raised a $6M seed (First Round, Sep 2025) and a $19M Series A (Insight Partners, Jul 2026), $25M in total. It automates credentialing, payer enrollment, licensing, rosters and monitoring, and is an NCQA-certified CVO — [Techleap](https://finder.techleap.nl/news/feed/assured-secures-6m-to-expedite-credentialing); [yespress](https://yespress.io/assured)
- Arctic Health (YC Spring 2026 / P26, ~$500K) launched its credentialing platform in May 2026 — [yespress](https://yespress.io/arctic-health-yc-p26.md); [HealthcareDiscovery](https://healthcarediscovery.ai/companies/arctic-health/)

#### C11. Dental insurance eligibility & benefits verification (US dental practices/DSOs)
- Toothy AI (YC W25) builds AI agents that automate the dental insurance workflow, including insurance calls by voice AI — [YC](https://www.ycombinator.com/companies/toothy-ai)
- Verrific (founded 2019, ~$540K raised) offers both automated (VeriSmart) and outsourced verification — [CB Insights](https://www.cbinsights.com/company/verrific). RevenueWell sells AI agents that log into payer portals for eligibility and benefits — [RevenueWell](https://revenuewell.com/dental-insurance-verification). Offshore and hybrid outsourcers (e.g., Outsource Strategies International) sell "AI + human" verification — [OSI](https://www.outsourcestrategies.com/dental-insurance-verification-services-california/)

#### C12. Home-care agency open shifts / caregiver call-offs (US private-duty home care)
- Vali integrates with WellSky, CareSmartz360 and AxisCare and claims ~80% fewer open shifts in two weeks and ~20 hrs/week saved per scheduler (vendor claim) — [GetApp](https://www.getapp.com/all-software/a/vali/)
- Zingage ("500+ agencies") claims a 10-minute fill time for call-outs — [Zingage](https://www.zingage.com). Phoebe raised $9.5M and claims 75% of shifts filled in under 15 minutes. Its Right at Home Florida case went from 45+ minutes of sequential calls to under 15 minutes — [Phoebe](https://www.phoebe.work/); [case study](https://www.phoebe.work/customers/right-at-home-florida)

#### C13. Veterinary clinics (US/ANZ)
- PetDesk's 2026 report: appointments often run long, staff handle tasks outside their roles, and staffing costs are the top profitability concern. Nearly all practices see room to improve administrative time — [PetDesk](https://petdesk.com/state-of-veterinary-practice-management)
- Clinician's Brief 2026 survey (463 respondents, Mar 2026): profitability is the top priority — [Instinct blog](https://blog.instinct.vet/clinicians-brief/2026-veterinary-market-survey-results). Vetstoria NA report (400 responses, Dec 2025) — [Vetstoria](https://www.vetstoria.com/resources/the-state-of-veterinary-practice-management-report/)

### Inferences

**Per-candidate profiles (a–h).** "Cited" means it is supported above. Everything else is my inference or estimate. Market sizes are rough ranges built on [UNVERIFIED BACKGROUND] counts listed in Gaps.

**C1. LTC Medicaid applications & Medicaid-pending AR (nursing homes, assisted living, families). RANK #1**
- (a) Buyer: business-office managers and administrators at independent and small-chain nursing homes (also AL/memory care in states with Medicaid waivers). Secondary buyers: elder-law firms, and adult children of aging parents.
- (b) Pain: each Medicaid admission needs a long application with a multi-year financial look-back, documentation of assets and transfers, caseworker back-and-forth, and denials for missing documents. The facility provides months of care unpaid while the application is pending (cited), with a risk that it is never paid. This recurs with every long-stay Medicaid admission, so it is weekly for most facilities.
- (c) WTP evidence: an outsourced application-vendor market exists (cited: Precision Medicaid, ACN piece); families pay elder-law helpers around $6,000 (cited anecdote); facilities refuse pending residents rather than carry the risk (cited). Missing: hard fee schedules and aggregate pending-AR or write-off data (see Gaps).
- (d) Competitors: NavigAid covers only 6 states and is family-facing (cited); MedicaidSoft is a one-person shop (cited); ExaCare publishes on the topic and appears to sell SNF admissions software (scope unverified); elder-law attorneys and outsourcing vendors are human services. I found no strong, multi-state software for this.
- (e) Why unsolved: 50 sets of state rules, paper and portal submissions, and document-heavy financial review (bank statements, life-insurance cash values, annuities). This is exactly the unstructured-document work that LLMs now handle well, and it was uneconomic for SaaS before. **Possibly newly urgent:** if the OBBBA cut to retroactive Medicaid coverage is confirmed (see Gaps), facilities lose the cushion for late applications.
- (f) Market: about 15k US nursing homes [UNVERIFIED count] × $6k–$24k/yr is roughly $90M–$360M. Adding per-application fees for AL and families could reach $0.3B–$0.5B. It is modest but real, and the incumbent field is services, not software.
- (g) Feasibility: high. An MVP is document intake, a look-back analyzer (flagging transfers and gifts), and state-specific packet assembly for 2–3 states. Start with one state with a large SNF count. First customers are reachable through state nursing-home associations within 6–12 months.
- (h) Risks: unauthorized-practice-of-law issues if the product gives Medicaid planning advice (stay on "application preparation"); HIPAA and financial PII; state rule churn; an incumbent SNF EHR (PointClickCare) could bundle a feature; slow sales to small operators.

**C2. Australia Support at Home claims/statement reconciliation layer (non-US). RANK #2**
- (a) Buyer: finance and claims managers at Australian in-home aged care providers (ex-Home Care Packages providers now on Support at Home), especially small and mid-size providers.
- (b) Pain: claims rejected or delayed by Services Australia, monthly participant statements that do not reconcile, and staff rebuilding the numbers in spreadsheets (all cited). It happens monthly, with cash flow at stake (cited).
- (c) WTP evidence: cash-flow pressure (cited); >50% of 300+ surveyed providers say their systems fall short or are missing (cited); a Senate inquiry with hundreds of submissions (cited). Providers already pay for client-management software, so the line item exists. Missing: specific AUD figures for losses.
- (d) Competitors: incumbent AU care-management vendors. The Department blames provider software while providers blame government design (cited), so incumbents are not delivering. Specific vendor names were not retrieved (see Gaps).
- (e) Why unsolved: the program is new (Nov 2025), the rules keep changing, and integration with the government B2G system needs certification. A thin reconciliation, exception-triage and claim-resubmission layer over existing systems is newly feasible with LLMs that read rejection reasons and statements. The pain is fresh, so the gap is a timing window.
- (f) Market: AU-only, likely hundreds to roughly 1,000 providers [UNVERIFIED] × AUD 10k–60k/yr is about AUD 10M–60M. It could extend to NDIS providers, a much larger provider base with similar claim-reconciliation pain [UNVERIFIED].
- (g) Feasibility: medium. The first product could run on exported claim and remittance files plus statements, without direct B2G integration, and be sold as a "reconciliation co-pilot". Getting B2G certification later becomes a moat. A US team would need an AU partner or presence.
- (h) Risks: the government fixes its own systems; incumbents catch up within 12–18 months; a small TAM; Australian privacy obligations; sales concentrated in a small sector.

**C3. Clinical research site revenue integrity (invoiceables). RANK #3**
- (a) Buyer: owners and finance leads of independent research sites and small site networks, which are often PE-backed roll-ups.
- (b) Pain: protocol schedules of assessments, contract budgets and visit logs live in separate systems. Screen fails, unscheduled visits and procedure-level invoiceables go unbilled (cited). One case lost about 10% of earnings (cited). The work is a monthly reconciliation.
- (c) WTP evidence: dedicated revenue-integrity hires (cited); an outsourced billing-recovery service (Clinical Research Billing) partnered with CRIO (cited); recovered amounts of $50k to $100k+ per site (cited). A success-fee model (a percentage of recovered dollars) is a natural fit.
- (d) Competitors: CTMS and eSource vendors with finance modules (CRIO, Advarra, RealTime; Advarra and CRIO are cited) and services firms. These case studies come from those vendors, which suggests the leakage persists even with their tools. Budget-negotiation consultancies serve the pricing side.
- (e) Why unsolved: the contract budget (PDF), the protocol (PDF) and the CTMS data need semantic mapping. LLMs can now parse a CTA budget and a protocol's schedule of activities into billable line items and reconcile them against visit data automatically. Fragmented sites are too small for big CRO tooling.
- (f) Market: US independent sites [UNVERIFIED count; probably low thousands] × $6k–$30k/yr, or 15–25% of recovered revenue, is roughly $50M–$150M. Global expansion (EU, Australia, LatAm sites) is possible.
- (g) Feasibility: high. A retroactive audit using PDFs plus CTMS exports needs no integration. Sell "we find money or you pay nothing", then convert to a subscription. First customers within 3–6 months is plausible.
- (h) Risks: small TAM; CTMS incumbents adding features; sponsor pushback on retroactive invoices; low liability, little HIPAA exposure (mostly financial data, though visit logs can include PHI).

**C4. Payer auto-downcoding appeals (Cigna R49 and copycats). Honorable mention.**
- (a) Buyer: independent primary care, endocrinology, cardiology and other E/M-heavy practices, plus the billing companies that serve them.
- (b) Pain: level-4/5 visits are silently paid at one level lower, and recovery needs a fax appeal with records (cited). It is per-claim and recurring.
- (c) WTP: strong advocacy opposition and a state fine (cited) show the pain is salient. WTP is inferred from practices already paying RCM firms. No direct pricing evidence was found.
- (d) Competitors: general denial-management and RCM AI. I found no product dedicated to downcode detection and appeal.
- (e) Newly solvable: detect downcodes from ERA adjustment codes, have an LLM pull MDM and time evidence from the note, auto-build the appeal and fax it, and generate a state-DOI complaint.
- (f) Market: tens of thousands of practices [UNVERIFIED] × $100–$400/provider/month.
- (g) Feasibility: high, technically simple.
- (h) Risks: **the policy's existence is volatile** (paused in some places, fined in Maryland); a single-payer dependency; RCM incumbents can add the feature quickly; low defensibility.

**C5. IDR for small out-of-network providers. Honorable mention (high WTP, high regulatory risk).**
- (a) Buyer: small independent OON groups (emergency, anesthesia, neonatology, imaging, ASCs) not using the big three.
- (b) Pain: an eligibility, batching, offer and evidence workflow on each dispute, with weak federal portal tooling.
- (c) WTP: providers win 85–88% (cited), which makes each dispute valuable. Three entities hold about 77% of resolved disputes (cited), implying that smaller providers under-use IDR (inference).
- (d) HaloMD and similar firms operate as services, likely contingency-based (fee level unverified).
- (e) LLM agents can draft offers and evidence and check eligibility at scale.
- (f) Large dollars at stake (2.5M disputes; $22B+ in reported costs, cited).
- (g) Technically feasible.
- (h) **High policy and backlash risk** (IDR operations rule changes, legislative reform, payer litigation); reputational risk ("surprise-billing arbitrage"). Flag rather than recommend.

**C6. Independent pharmacy MAC appeals / underwater claims. Watch.** The pain is extreme, but buyers are cash-starved, Pharmacy Marketplace already automates MAC appeals (cited), and audit-defense services exist [UNVERIFIED: PAAS National]. A possible fresher wedge is reconciling Maximum Fair Price refunds for Medicare-negotiated drugs from 2026 [UNVERIFIED, see Gaps]. Feasibility is high, WTP is low to medium, and defensibility is low.

**C7. 510(k)/MDR submission drafting. Watch, getting crowded.** Consulting spend is high ($15k–$80k per submission, cited), but AI tools are already marketed at $200–$2K/month (cited). Buyers are risk-averse, so a tool still needs consultant-grade trust. The best wedge is probably a "consultant co-pilot" sold to regulatory consultancies, not to manufacturers. EU MDR legacy-device transition deadlines are a possible non-US driver [UNVERIFIED]. Liability: an incorrect submission causes delay but does not harm patients, so liability is moderate.

**C8. WISeR prior auth. Avoid as a standalone business.** The burden is real in six states (cited), but the program may be defunded (cited), and broad prior-auth AI is heavily funded (see KQ4).

**C9. ABA authorizations. Avoid.** Silna ($27M) covers the full lifecycle (cited). Practice-management incumbents also play here [UNVERIFIED: CentralReach]. A remaining wedge is BCBA treatment-plan writing tuned to medical-necessity criteria (cited CE demand), but that is a feature, not a company.

**C10. Credentialing & enrollment. Crowded at mid-market and up.** Assured ($25M) and YC P26 Arctic Health (cited), plus Medallion and others [UNVERIFIED]. The small-practice end is still served by human outsourcers and therapist platforms [UNVERIFIED: Headway/Alma bundle credentialing]. Avoid unless entering a niche (e.g., Medicaid MCO enrollment for home-care or ABA agencies).

**C11–C12. Dental verification, home-care shift fill. Avoid (crowded).** Multiple funded AI entrants each (cited).

**C13. Vet. No clear unsolved, paid-for niche surfaced.** Surveys point to staffing and admin time (cited), which AI scribes and phone agents already target [UNVERIFIED names]. More discovery is needed (see Gaps).

**Top-3 scoring (1–10; analyst judgment from the evidence above):**

| Rank | Problem | Pain | WTP evidence | Solution gap | Market size | Small-team feasibility | Defensibility | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | LTC Medicaid applications / Medicaid-pending AR (US SNF/AL + families) | 8 | 6 | 8 | 6 | 7 | 6 | Services-heavy incumbents; 50-state rule base is the moat; UPL risk |
| 2 | Support at Home claims/statement reconciliation (Australia) | 9 | 6 | 8 | 4 | 6 | 7 | Best-documented 2026 pain; time-limited window; B2G certification moat |
| 3 | Clinical-research-site invoiceable recovery (US first) | 7 | 7 | 6 | 4 | 9 | 5 | Success-fee wedge; fastest path to revenue; small TAM |
| HM | Payer auto-downcode appeals (Cigna R49) | 7 | 5 | 7 | 6 | 9 | 3 | Policy volatility |
| HM | IDR for small OON providers | 6 | 8 | 6 | 7 | 7 | 4 | Policy and backlash risk |

### Gaps
- **Tool failure:** web search (budget exhausted) and WebFetch (DNS failure on all domains) were both unavailable after 24 searches. No full-page verification was possible. Planned searches I could not run: AMA 2025 PA survey, CMS-0057-F fact sheet, other payers' downcoding policies, AI denial-appeal startups, SNF admissions AI startups, EU MDR AI tools, clinical-trial budget-negotiation AI, chiropractic/PT personal-injury lien collections, optometry vision-plan billing, UK/Canada opportunities.
- C1 (Medicaid LTC): no aggregate data on Medicaid-pending AR days, write-offs or denial rates; no vendor fee schedules. **[UNVERIFIED BACKGROUND]** The 2025 "One Big Beautiful Bill Act" reportedly cuts retroactive Medicaid coverage (to about 1 month for expansion adults and 2 months for others) starting in 2027, which would make late LTC applications costlier for facilities. Verify this before relying on it. **[UNVERIFIED BACKGROUND]** About 15,000 US nursing homes, with Medicaid the primary payer for most long-stay residents. ExaCare appears to be an AI startup in SNF admissions; its scope, funding and overlap with C1 are unverified and need checking, since it could be a direct competitor.
- C2 (AU): no list of incumbent Support at Home software vendors and their review complaints; no count of registered providers; no AUD loss figures. Most evidence comes from one trade outlet (The Weekly SOURCE) plus one consultancy survey. **[UNVERIFIED BACKGROUND]** The CHSP program is due to fold into Support at Home no earlier than 2027, which would expand the market.
- C3 (trials): no count of independent US research sites and no independent (non-vendor) leakage benchmark. All dollar figures are vendor case studies. I could not check for AI-native competitors in site finance (2024–2026).
- C4 (downcoding): Cigna R49's current status is disputed (paused vs. active vs. state-specific). I could not verify whether Aetna, UnitedHealthcare or others run similar automated E/M downcoding in 2026. I found no per-claim dollar-impact data.
- C5 (IDR): no data on the share of eligible small providers not filing; contingency fee levels at HaloMD and peers unverified; the status of the IDR operations rule was not checked.
- C6 (pharmacy): no 2026 primary data. **[UNVERIFIED BACKGROUND]** Medicare Drug Price Negotiation "Maximum Fair Price" took effect Jan 1, 2026 for the first 10 drugs, with pharmacies relying on manufacturer refunds through a Medicare Transaction Facilitator. That creates refund-reconciliation and cash-flow pain for independents and could be a new wedge, but it needs verification. Independent pharmacy count (around 18–19k, declining) and closure rates are unverified.
- Prior auth context: **[UNVERIFIED BACKGROUND]** Under CMS-0057-F, impacted payers (MA, Medicaid, CHIP, QHPs on FFEs; not ERISA employer plans) must meet 72-hour expedited and 7-day standard PA decision timeframes and give specific denial reasons from Jan 1, 2026, with Prior Authorization, Provider Access and Payer-to-Payer FHIR APIs due Jan 1, 2027. Check against https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f (not fetched). **[UNVERIFIED BACKGROUND]** The AMA 2024 PA survey reportedly found about 39 PAs per physician per week and about 13 hours/week of physician and staff time. The 2025 survey was not retrieved.
- **[UNVERIFIED BACKGROUND] Candidate not researched but likely strong:** OBBBA Medicaid work requirements and 6-month redeterminations for expansion adults (implementation around end-2026 to 2027) would create coverage churn for FQHCs, behavioral-health and SUD clinics. That suggests demand for continuous eligibility monitoring and re-enrollment or exemption-documentation tooling on the provider side. It needs verification of the dates and the vendor landscape.
- Veterinary, optometry, chiropractic/PI-lien billing, UK NHS/private practice, and Canada provincial billing: no usable evidence gathered this session.

---

## Which administrative or operational pains are still handled by humans with phones, fax and spreadsheets despite being expensive?

### Takeaway
Phones, fax and spreadsheets persist where payer or government rules are new, change often, or are state-specific: fax-based appeals for payer downcoding, Australian Support at Home claim reconciliation in spreadsheets, sequential phone calls to fill home-care shifts, insurance calls in dental, manual monthly reconciliation at research sites, and document-heavy Medicaid LTC applications.

### Cited Findings
- Cigna downcode disputes require filing an appeal and faxing supporting medical records — [AAFP FPM](https://www.aafp.org/pubs/fpm/issues/2025/1100/beyond-the-beltway.html)
- Support at Home "leaves providers reliant on spreadsheets." 55.6% say digital systems are not ready and 42.4% cite finance, payroll and rostering integration problems — [The Weekly SOURCE / Enkindle 2026](https://www.theweeklysource.com.au/enkindle-support-at-home-leaves-providers-reliant-on-spreadsheets/)
- Home-care call-outs were traditionally filled by sequential phone calls taking 45+ minutes per shift (Right at Home FL, before automation) — [Phoebe case study](https://www.phoebe.work/customers/right-at-home-florida)
- Dental insurance verification still involves phone calls to payers, which Toothy AI automates with voice AI — [YC](https://www.ycombinator.com/companies/toothy-ai). A PT clinic's benefit check took about 60 minutes before automation (Motion PT, Silna case) — [casestudies.com](https://www.casestudies.com/company/silna)
- Research sites employ revenue-operations managers to reconcile contract terms, billable activity, invoices and recognized revenue monthly — [Prolerity posting](https://career.io/job/manager-revenue-operations-marrero-prolerity-clinical-research-d39c01356ffd3351aaae4175aa9639ab)
- Medicaid LTC applications are error-prone, and an improper submission can cause delay or denial — [WashingtonLawHelp](https://www.washingtonlawhelp.org/when-apply-medicaid-long-term-care); [BusinessWire/NavigAid](https://www.businesswire.com/news/home/20211013005113/en/NavigAid-Supports-Caregivers-Through-the-Medicaid-Application-Process)

### Inferences
- The pattern is that phone and fax work survives where the counterparty (payer, government agency, sponsor) has no API and rules change often. Voice AI and computer-use agents now make these counterparties automatable without their cooperation, which is why dental verification and shift-fill got crowded quickly. The remaining open spots are workflows that also need deep domain rules (state Medicaid LTC, AU Support at Home, CTA budgets), not just a phone call.

### Gaps
- No quantified time studies (minutes per fax appeal, minutes per Medicaid application) were retrieved. Search was unavailable to find MGMA or CAQH Index figures. **[UNVERIFIED BACKGROUND]** The CAQH Index publishes the cost per manual vs. electronic transaction and would supply this.

---

## Where are buyers already paying outsourced services/agencies large fees for work that software could now do?

### Takeaway
Clear outsourced-spend pools exist in regulatory submissions ($15k–$80k per 510(k)), Medicaid application vendors and elder-law helpers (around $6k per family, anecdotal), IDR filing firms (HaloMD alone handles about 27% of resolved disputes), clinical-trial billing-recovery firms, offshore dental verification, and credentialing CVOs.

### Cited Findings
- 510(k) consulting runs $150–$500/hr or $15k–$80k fixed; SaMD $30k–$70k — [Complizen](https://www.complizen.ai/post/complizen-vs-fda-510k-consultants-for-faster-clearance); [MedDeviceGuide](https://meddeviceguide.com/blog/how-much-does-510k-cost-guide)
- An elder-law office reportedly charges $6,000 for a Medicaid paperwork helper (forum anecdote) — [caregivers.com](https://portal.prod.caregivers.com/questions/who-can-we-get-to-help-us-with-the-medicaid-application-we-are-in-nj-494365.htm). Precision Medicaid sells application outsourcing to nursing homes — [DHC Law](https://www.dhclaw.com/reports/precision-medicaid.cfm)
- HaloMD (about 27%), Radiology Partners (about 30%) and TeamHealth (about 20%) account for most resolved IDR disputes — [Georgetown CHIR](https://chir.georgetown.edu/?p=11899)
- Clinical Research Billing does retroactive sponsor invoicing in partnership with CRIO — [CRIO](https://clinicalresearch.io/resources/clinical-research-billing-partners-with-crio-to-unlock-hidden-revenue-and-increase-site-valuation/)
- Outsourced and hybrid dental verification: OSI, Verrific — [OSI](https://www.outsourcestrategies.com/dental-insurance-verification-services-california/); [CB Insights](https://www.cbinsights.com/company/verrific)
- Assured operates as an NCQA-certified CVO, a services-like credentialing model, and raised $25M in total — [yespress](https://yespress.io/assured)

### Inferences
- Services-to-software conversion is most attractive where a services fee is a percentage of recovered dollars (trial invoiceables, IDR, downcode appeals). There an AI-native company can undercut on price and still keep high margins, with outcome-based pricing that small buyers accept without a long sales cycle.

### Gaps
- Fee schedules for Medicaid application vendors, IDR contingency firms, clinical-trial billing-recovery firms and credentialing outsourcers (often quoted per payer per provider) were not retrieved.

---

## Which segments are ignored by enterprise vendors (Epic, Waystar, etc.) because they are too small, but collectively large?

### Takeaway
Segments that are too small or too idiosyncratic for enterprise RCM: independent nursing homes and assisted living (Medicaid LTC eligibility), independent research sites, small OON physician groups (IDR), independent pharmacies (PBM and MAC disputes), Australian in-home aged care providers, and small allied-health and ABA practices (served by Silna-type startups, not Epic or Waystar).

### Cited Findings
- Medicaid LTC application tooling consists of a one-person startup and a 6-state family tool — [Gust](https://gust.com/companies/medicaidsoft/pitch_deck); [BusinessWire](https://www.businesswire.com/news/home/20211013005113/en/NavigAid-Supports-Caregivers-Through-the-Medicaid-Application-Process)
- IDR use is concentrated in three large entities, about 77% of resolved disputes — [Georgetown CHIR](https://chir.georgetown.edu/?p=11899)
- More than half of Australian Support at Home providers say their systems do not meet their needs or do not exist — [The Weekly SOURCE](https://www.theweeklysource.com.au/enkindle-support-at-home-leaves-providers-reliant-on-spreadsheets/)
- Independent pharmacies rely on niche vendors (Pharmacy Marketplace) and state statutes for MAC appeals — [Pharmacy Marketplace](https://knowledge.pharmacymarketplace.com/knowledge/how-to-manage-mac-appeals-in-pharmacy-marketplace); [Daeryun Law](https://www.daeryunlaw.com/ru/practices/detail/pharmacy-reimbursement)
- Silna targets "specialty providers" (ABA, PT/OT/speech, behavioral health) rather than hospitals — [IntuitionLabs listing](https://www.intuitionlabs.ai/software/physical-occupational-therapy/insurance-verification-and-authorization/silna-health)

### Inferences
- The "too small for Epic or Waystar" segments that are still open tend to sit outside the professional-claims (837P) world: Medicaid eligibility for LTC, sponsor invoicing in research, government aged-care claiming outside the US, and PBM reimbursement. Within mainstream professional claims (PT, ABA, dental, behavioral health), funded AI startups now cover the small-practice segment.

### Gaps
- Counts of buyers per segment (independent research sites, AU home-care providers, independent pharmacies, nursing homes by ownership) could not be verified this session.

---

## Which areas are already crowded with AI startups (so should be avoided)?

### Takeaway
Avoid generic prior authorization (payer and provider side), ABA and therapy front-end RCM, credentialing (increasingly), dental insurance verification, and home-care shift filling, all of which have multiple funded 2024–2026 entrants. AI scribes and front-desk voice agents are also widely regarded as saturated, but that could not be verified this session.

### Cited Findings
- Prior auth: Ethermed $8.5M Series A, Apr 2026, claims 89% fully automated — [citybiz](https://www.citybiz.co/article/834663/ethermed-raises-8-5m-to-ease-healthcare-paperwork/); [The SaaS News](https://www.thesaasnews.com/news/ethermed-raises-8-5-million-series-a). Anterior $40M, Feb 2026, payer-side — [Axios Pro](https://www.axios.com/pro/health-tech-deals/2026/02/12/exclusive-anterior-raises-40m-for-health-plan-ai). GenHealth.ai $16.5M Series A, Sep 2026, Flare Capital, $30M total — [HME News](https://www.hmenews.com/tag/genhealth-ai). Humata Health $25M, date unconfirmed — [Coverager](https://coverager.com/prior-authorization-platform-humata-health-raises-25-million/)
- Specialty front-end RCM and prior auth: Silna Health $27M total (Accel, BCV) — [release](https://www.silicon.co.uk/press-release/silna-health-announces-27-million-in-funding-to-tackle-americas-prior-authorization-crisis)
- Credentialing: Assured ($25M total, Series A Jul 2026); Arctic Health (YC P26) — [yespress](https://yespress.io/assured); [yespress](https://yespress.io/arctic-health-yc-p26.md)
- Dental verification: Toothy AI (YC W25), Verrific, RevenueWell AI agents — [YC](https://www.ycombinator.com/companies/toothy-ai); [CB Insights](https://www.cbinsights.com/company/verrific); [RevenueWell](https://revenuewell.com/dental-insurance-verification)
- Home-care shift fill: Vali, Zingage (500+ agencies), Phoebe ($9.5M) — [GetApp](https://www.getapp.com/all-software/a/vali/); [Zingage](https://www.zingage.com); [Phoebe](https://www.phoebe.work/)
- Regulatory AI for 510(k) is already marketed at $200–$2K/month — [Complizen](https://www.complizen.ai/post/ai-tools-fda-510k-submissions)

### Inferences
- Any idea whose core is "an AI agent calls or logs into payer portals for a standard professional-claims task" (eligibility, benefits, prior auth, claim status) is now a crowded category. Differentiation would have to come from a vertical with unusual rules or from a non-payer counterparty such as state Medicaid offices, research sponsors or foreign governments.

### Gaps
- **[UNVERIFIED BACKGROUND, needs confirmation]** These categories are widely reported as crowded but were not verified this session: ambient AI scribes (e.g., Abridge, Ambience, Microsoft/Nuance DAX, Suki, Freed, Heidi, Nabla); veterinary scribes (e.g., ScribbleVet, Talkatoo, CoVet); AI front-desk and phone agents for practices (e.g., Assort Health, Hello Patient, Arini for dental); AI fax and referral intake (Tennr); hospital RCM AI (AKASA, Infinitus, Thoughtful AI, Adonis, SmarterDx); personal-injury medical chronologies (EvenUp, Supio); consumer bill and appeal tools (e.g., Claimable, Counterforce Health, Sheer Health). Verify current funding and status before the final report states them as fact.
