# Verification: Subcontractor SOPA Payment-Recovery Desk, Queensland and Victoria first (as of 18 October 2026)

Method note: I ran 30 web searches (the full budget). WebFetch failed with DNS errors, and curl through the agent proxy was refused (HTTP 403) for qbcc.qld.gov.au, thegoodbuilder.com.au, bpc.vic.gov.au, data.gov.au, fairtrading.nsw.gov.au and nsw.gov.au. Every finding below therefore comes from search-result summaries of the cited pages, not from reading the full documents. Many of those pages are vendor or law-firm marketing.

Anything marked **(background, not verified)** comes from my own knowledge, was not confirmed by a search this session, and appears only under Inferences or Gaps. Dollar figures are AUD.

This note builds on `au_property_construction_energy.md` and does not repeat it, so the following is not restated:
- Victoria's 15 April 2026 reforms
- the 3,472 construction insolvencies in FY2025–26
- the NSW Contractors Debts Act route
- the QBCC application fee tiers
- the existence of PayClaim, paymentclaims.ai, ClaimDone, Archdesk and Retention Track

---

## Q1. Adjudication volumes, outcomes, claim sizes and invalidity reasons by state

### Takeaway
The three eastern states together see about **1,900–2,000 adjudication applications a year**: QLD about 559, NSW about 940–1,060, Vic about 330–380.
- Volumes are rising in QLD and NSW.
- Only about 50–60% of applications reach a released determination.
- In QLD, 82 applications (about 15%) were invalid in FY2025–26, and **about three quarters of those were small progress claims under $56,729**. These are exactly the unadvised small subcontractors a deadline engine would protect.

The year question from the earlier note is now resolved: the 559 received, 477 valid and $1.94bn claimed are **FY2025–26** (year to 30 June 2026).

### Cited Findings
- **QLD FY2025–26 (year to 30 June 2026):** the QBCC Adjudication Registry received **559 applications**, of which **477 were valid** and **82 invalid**. The invalid ones claimed $14.1m.
  - 61 of the 82 invalid applications were progress payments under $56,728.80.
  - One invalid application above $1.24m accounted for $7.7m of the $14.1m.
  - The leading cause was failure to lodge within the timeframes in **s 79 of the BIF Act 2017**.
  - Sources: [The Good Builder](https://thegoodbuilder.com.au/14-1-million-in-queensland-adjudication-claims-ruled-invalid-missed-deadlines-topped-the-list/), citing the [QBCC Annual Report 2025–26](https://www.qbcc.qld.gov.au/sites/default/files/documents/publications-qbcc-annual-report-2025-2026.pdf). The primary table could not be opened. The search summary of the PDF showed only the contents page, including an "Adjudication" section.
- **QLD FY2024–25:** 324 valid applications claiming $516.7m (273 standard claims of $750k or less, 51 complex claims above that). — [Lawyers Weekly](https://www.lawyersweekly.com.au/sme-law/44981-adjudication-is-won-on-site-not-in-the-registry)
- **QLD deadline as the QBCC states it:** when a payment schedule is disputed, the application must be lodged within **30 business days** after the schedule is given. — [QBCC Apply for adjudication](https://www.qbcc.qld.gov.au/node/1366)
  - Vendor content contradicts this: PayClaim says applications are "typically 20 business days" after the schedule period ([PayClaim adjudication explainer](https://payclaim.com.au/adjudication-explained-australian-subcontractors/)), and ClaimDone says the window is "as little as 10 business days" ([ClaimDone](https://claimdone.com.au/subcontractor-wont-pay-australia-debt-recovery-construction/)).
- **QLD has no private nominating authorities.** RICS says it is an authorised nominating authority (ANA) "in Australia, except Queensland", and the Resolution Institute redirects Queensland applicants to the QBCC. — [RICS Australasia](https://www.rics.org/dispute-resolution-service/drs-services/non-uk-dispute-resolution-services/dispute-resolution-service-in-australasia/adjudication-in-australasia); [Resolution Institute](https://resolution.institute/Web/Web/General/Security-of-Payment-Applications.aspx)
- **NSW FY2023–24:** two sources disagree.
  - DLA Piper: **1,057** applications lodged, $745.2m claimed, 538 determinations released. It cites Victorian Building Authority statistics for the comparison. — [DLA Piper, Mar 2025](https://www.dlapiper.com/en/insights/publications/2025/03/victoria-s-security-of-payment-regime-set-for-extensive-reform)
  - Lexology (Oct 2024): **937** applications claiming $889.5m. — [Lexology](https://www.lexology.com/library/detail.aspx?g=8f4ed5db-1a18-457a-aaf4-6e3050b2201b)
- **NSW quarterly, from the government report:** Jan–Mar 2024 had 235 applications lodged in the quarter, 713 year to date, and 117 determinations released. — [NSW Q3 2024 report (PDF)](https://www.nsw.gov.au/sites/default/files/noindex/2025-07/building-and-construction-industry-payment-act-1999-q3-2024.pdf)
  - Building Commission NSW lists quarterly reports for July 2024–June 2025, July–December 2025 and January–March 2026, but none of their contents came up in search. — [NSW ANA page](https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/security-of-payment/authorised-nominating-authorities)
- **NSW earlier (older data):** FY2021–22 reached 678 applications year to date by June 2022 (174 in Apr–Jun). — [NSW Fair Trading Q2 2022 (PDF)](https://fairtrading.nsw.gov.au/__data/assets/pdf_file/0007/1099474/BUILDI_1_23082022.PDF); [Q1 2022 (PDF)](https://fairtrading.nsw.gov.au/__data/assets/pdf_file/0019/1086211/BUILDI_1.PDF)
- **Vic FY2023–24:** two sources disagree.
  - DLA Piper: **332** applications lodged, **$119.8m** claimed, 189 determinations. — [DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/03/victoria-s-security-of-payment-regime-set-for-extensive-reform)
  - Lexology: **384** applications, **$74.3m** claimed, 212 determinations. — [Lexology](https://www.lexology.com/library/detail.aspx?g=8f4ed5db-1a18-457a-aaf4-6e3050b2201b)
- **Vic older data:** FY2021–22 had 324 standard applications and 2 review applications. — [BPC 2021–22 statistics (PDF)](https://www.bpc.vic.gov.au/__data/assets/pdf_file/0030/24879/Adjudication-Activity-Statistics-2021-2022-Financial-Year.PDF)
- **Vic FY2024–25:** a 29-page BPC report and a per-application XLSX file exist, but I could not retrieve their numbers. The data includes application date, project postcode, claimed amount, payment-schedule details and the section of the Act relied on. — [BPC 2024–25 report (PDF)](https://www.bpc.vic.gov.au/_media/resource-hub/reports/adjudication-activity-statistics-20242025-fin-year.pdf); [Data Vic dataset](https://discover.data.vic.gov.au/en_AU/dataset/building-and-construction-industry-security-of-payment-adjudication-activity-data/resource/7246657a-2868-427d-863f-c89bed0bc179); [BPC data page](https://www.bpc.vic.gov.au/about-bpc/research-reports-and-data/data)
- **Success-rate data is scarce and old.** The SA Small Business Commissioner published results by ANA, listed as "Adjudicate Toady" (a typo for Adjudicate Today).
  - Undated period: 18 of 30 claims awarded, $16.7m of $36.9m claimed.
  - FY2014–15: 20 of 32 awarded, $2.49m of $15.8m claimed.
  - Source: [SASBC adjudication results](https://www.sasbc.sa.gov.au/security-of-payments/authorised-nominating-authorities/adjudication-results)

### Inferences
- **Determination rates.** Released determinations as a share of applications are about 51% in NSW (538 of 1,057), 55–57% in Vic, and about 61% in QLD (290 decisions against 477 valid, using the earlier note's figure).
  - Roughly 40–50% of applications therefore end without a determination: withdrawn, settled, invalid or out of time.
  - This fits the idea that lodging an application is itself leverage to settle. It favours pricing per recovered dollar over pricing per determination.
- **Average claim size is skewed by mega-claims, and the SME band is far smaller.** Average claim:

  | State and source | Average claim |
  |---|---|
  | NSW (DLA Piper) | ~$705k |
  | NSW (Lexology) | ~$949k |
  | Vic (DLA Piper) | ~$361k |
  | Vic (Lexology) | ~$194k |
  | QLD, excluding the 38 claims above $1.24m | ~$135k |

  The QLD invalid applications, leaving out the single $7.7m one, averaged about $79k. They cluster under $56.7k.
- **QLD's 15% invalidity rate (82 of 559) is the core pain number.** About three quarters of invalid filings are small claims, which points to unadvised small subbies. That supports a deadline and validity engine much more than an "adjudication-drafting AI".
- **Volume trend.**

  | State | Earlier | Later |
  |---|---|---|
  | QLD valid applications | 324 (FY25) | 477 (FY26), +47% |
  | NSW applications | ~678 (FY22) | ~940–1,060 (FY24) |
  | Vic applications | ~324 (FY22) | ~330–380 (FY24), flat |

  Victoria was historically small because "excluded amounts" (disputed variations, delay costs and the like) kept many claims out. The April 2026 reforms should lift Vic volumes, but no post-reform data exists yet.
- **National total.** QLD + NSW + Vic is about 1,850–2,000 applications a year. Adding WA, SA, Tas, ACT and NT gives roughly 2,200–2,500 a year **(background, not verified)**. The adjudication market is a few thousand matters a year, not tens of thousands.

### Gaps
- The QBCC 2025–26 adjudication tables (claimed versus awarded, withdrawal counts, claimant types) could not be opened.
- NSW figures for FY2024–25 and FY2025–26 were not retrieved, although the reports exist.
- The Vic FY2024–25 headline numbers were not retrieved (XLSX and PDF exist).
- No source reconciled the DLA Piper and Lexology figures for FY2023–24.
- There is no current claimant success rate or awarded-to-claimed ratio for QLD, NSW or Vic. The only success data is old SA data for one ANA.
- No split of claimant type (subcontractor vs head contractor vs consultant) was found for any state. The NSW quarterly reports do contain it.

---

## Q2. Who prepares adjudication applications today, what they charge, and whether non-lawyers or success fees are restricted

### Takeaway
Adjudication applications are prepared mostly by **construction law firms** that advertise "fixed fees" but do not publish prices, and by claimants themselves. I found no published claims-preparer price list.
- **ANA and adjudicator fees are the only published prices.** RICS fixed fees run from about $1,000 to $3,410 for claims up to $40k, and are hourly above that.
- Legal costs of preparing an application are generally **not recoverable** from the respondent, so the claimant bears them.
- The cheap claim tools explicitly **stop before adjudication**.
- I found no rule in any SOPA Act that bans non-lawyers from preparing applications or bans success fees, but nor did I find confirmation that they are allowed.
- The key legal constraint is professional-conduct law (background, not verified): Australian lawyers generally cannot charge percentage contingency fees. An outcome-priced desk would have to be a non-law business, with its own unauthorised-practice risk.

### Cited Findings
- **Construction law firms offer fixed-fee adjudication work but do not publish the numbers.**
  - Baker Merz says it charges "like any other subcontractor: fixed fees for a fixed scope". — [Baker Merz / construction.lawyer](https://construction.lawyer/australia/services/adjudication/adjudication-application/)
  - Another firm advertises "competitive fixed fees for preparing adjudication applications and adjudication responses". — [AR Building Law (subcontractors)](https://www.subcontractors.arbuildinglaw.com.au/construction-disputes-adjudication)
  - Gold Coast firm TDL describes adjudication as "comparatively quick and therefore comparatively cheap". — [TDL Law](https://tdllaw.com.au/construction-dispute-lawyers-gold-coast/)
  - Other Queensland firms marketing SOPA adjudication: [Odyssey Legal](https://www.odysseylegal.com.au/construction-payment-claims-queensland-adjudication-process-explained/), [Simpson Quinn](https://simpsonquinn.com.au/guide-to-adjudication-under-bif-act-queensland/), [QBM Lawyers](https://www.qbmlawyers.com.au/construction-lawyers-gold-coast/construction-contract-lawyers/), [Boss Lawyers](https://bosslawyers.com.au/service/building-construction-lawyers-brisbane/security-of-payment-lawyers-brisbane/).
  - In Sydney, Contracts Specialist (a law firm, contractsspecialist.com.au) lists "Letter of Demand, Payment Claim, Adjudication Application" as services, with no prices. — [Contracts Specialist](https://contractsspecialist.com.au/adjudication-sydney)
- **What law and legal-marketplace pages say about cost:**
  - "Adjudication fees are typically a few thousand dollars, subject to the complexity of the matter."
  - Legal costs are "generally not recoverable unless specifically provided for in the contract".
  - The losing party typically pays the adjudicator's fees.
  - "Many lawyers offer fixed fee arrangements... (for example, $400 for a letter of demand)".
  - The search summary did not say which of these two pages each quote came from. — [Odyssey Legal](https://www.odysseylegal.com.au/construction-payment-claims-queensland-adjudication-process-explained/); [Lawpath](https://lawpath.com.au/blog/adjudication)
  - Adjudicator fees estimated at **$1,000–$3,000 for claims under $100,000** (one Queensland firm's page). — summary of [Odyssey Legal](https://www.odysseylegal.com.au/construction-payment-claims-queensland-adjudication-process-explained/) / [Simpson Quinn](https://simpsonquinn.com.au/guide-to-adjudication-under-bif-act-queensland/)
  - Vendor estimates conflict. PayClaim gives total adjudication costs of "$1,500–$3,500" and an application fee of "AUD 200–500". Elsewhere vendor pages give "$3,000–$10,000 split". — [PayClaim](https://payclaim.com.au/adjudication-explained-australian-subcontractors/); [ClaimDone](https://claimdone.com.au/subcontractor-wont-pay-australia-debt-recovery-construction/)
- **QLD registry fee at the top end:** for claims over $1,236,206.95 the fee is 0.0794188% of the progress payment, capped at **$6,656.88**. This comes from a law-firm page citing the QBCC, and the page has garbled figures elsewhere. — [Odyssey Legal](https://www.odysseylegal.com.au/construction-payment-claims-queensland-adjudication-process-explained/)
- **RICS fixed-fee adjudication.** The fixed fee covers adjudicator and nominating-authority fees, GST and limited disbursements. It excludes conferences and inspections. Withdrawal attracts a $220 administration fee plus work done to date.
  - **Tasmania:** from $1,000 + GST for claims up to $5k, rising to $3,100 for claims of $20,001–$40,000 ($3,410 including GST and disbursements). — [RICS Tas schedule (PDF)](https://rics.org/content/dam/ricsglobal/documents/dispute-resolution-service/Adjudication-Application_Tasmania_April-2024.pdf); [RICS SA schedule (PDF)](https://rics.org/content/dam/ricsglobal/documents/dispute-resolution-service/Adjudication-Application_South-Australia_April-2024.pdf)
  - **Victoria:** a pro bono route for claims under $1,500, and hourly rates above $40,000. — [RICS Victoria schedule, July 2026 (PDF)](https://www.rics.org/content/dam/ricsglobal/documents/dispute-resolution-service/Adjudication-Application-Victoria-July-2026.pdf)
  - **WA and NT application fees:** $220 up to $200k, $330 up to $500k, $440 up to $1m, $660 above. — [RICS WA (PDF)](https://rics.org/content/dam/ricsglobal/documents/dispute-resolution-service/Adjudication-Application_Western-Australia_April-2024.pdf)
- **The cheap claim tools stop at the claim.**
  - PayClaim advertises flat one-off fees of $69, $79 or $149 per claim on different pages, with no subscription. It says it **does not handle adjudication, court enforcement or debt collection**. — [PayClaim Vic](https://payclaim.com.au/security-of-payment-vic/); [PayClaim adjudication explainer](https://payclaim.com.au/adjudication-explained-australian-subcontractors/)
  - ClaimDone sells a **$49** SOPA payment-claim draft and a **$197** tribunal application pack, plus QCAT/VCAT and show-cause packs. No adjudication-application product was found. — [ClaimDone](https://claimdone.com.au/subcontractor-payment-dispute-australia-demand-vs-sop/); [ClaimDone show-cause](https://claimdone.com.au/services/show-cause-response/); [ClaimDone QCAT fees](https://claimdone.com.au/qcat-fees-2026-minor-civil-dispute-queensland/)
- **Outcome-based ("no win, no fee") adjudication exists in the UK, not found in Australia.** In 2019, BWL Consulting, QS firm Govericks and Acasta European Insurance launched a no-win-no-fee construction-dispute service in which insurance covers legal and expert costs for adjudication. — [Construction Enquirer, Oct 2019](https://www.constructionenquirer.com/2019/10/16/no-win-no-fee-service-launched-for-construction-disputes/)
- **NZ:** the Adjudicators' Association of NZ (AANZ) offers a capped-fee scheme for simple Construction Contracts Act disputes (claims up to NZ$40k, limited documents). Lawyers committed to offering "commensurate fixed legal fee" adjudication claims. The article is undated. — [NZ Lawyer](https://www.thelawyermag.com/nz/news/general/aanz-helps-boost-access-to-justice-through-new-fixed-fee-scheme/430727)
- **Restrictions on non-lawyers:**
  - Searches found **no SOPA provision restricting claims preparers or contingency fees for adjudication applications**.
  - The Queensland Legal Services Commissioner does prosecute consultants for unlawful legal practice. The example found was a family-law consultancy convicted in Brisbane Magistrates Court, an analogy rather than an adjudication case. — [QLS Proctor](https://www.qlsproctor.com.au/?p=2778)

### Inferences
- **Price anchors a subbie sees today.**

  | Item | Price |
  |---|---|
  | Claim drafting | $49–$149 |
  | ANA/adjudicator fixed fees, small claims (≤$40k) | ~$1,000–$3,400 |
  | Adjudicator fees, claims under $100k | ~$1,000–$3,000 |
  | Lawyer preparation of an application | "a few thousand dollars" upward |

  My background estimate for lawyer preparation is $3k–$15k for a mid-size claim, and $20k+ for complex claims with expert QS evidence **(background, not verified)**. Because legal costs are not recoverable, a subbie with a $30–80k claim is often priced out of lawyers. That is the gap.
- **Legal-profession rules shape the business model (background, not verified):**
  - Under the Legal Profession Uniform Law (NSW, Vic, WA, s 183) and Queensland's Legal Profession Act 2007 (s 325), lawyers may not charge contingency fees calculated as a percentage of the amount recovered. The exception is Victorian class-action group costs orders.
  - Lawyers may charge conditional "no win, no fee" with an uplift capped at 25%.
  - Fee-sharing with non-lawyers is constrained.
  - So an outcome-priced desk with lawyer sign-off must be structured carefully:
    - the subbie pays the lawyer a fixed or conditional fee directly;
    - the platform charges for software, case management and data, possibly as a success fee;
    - the platform must not "engage in legal practice".
  - Whether a non-lawyer drafting adjudication submissions for reward is legal practice has not been tested in any case I found. It is a real but unquantified risk.
- **Claims consultants (QS/contract-administration firms) exist (background, not verified):** e.g. long-running Sydney claims-preparation consultancies, and QS firms that prepare variation and delay claims. None surfaced in search with public pricing. The named targets ("Building Claims Specialists", "Construction Claims Australia") could not be confirmed as active AU businesses.
- **ANAs as partners.** In NSW and Vic the claimant chooses the ANA, and ANAs compete for applications (Adjudicate Today charges no application fee; RICS offers fixed fees; per the earlier note and the RICS schedules). That makes them a natural referral or integration partner for a desk that generates applications. QLD has a single government registry, so there is no ANA channel there.

### Gaps
- **No published law-firm fixed-fee price for a SOPA adjudication application was found in any state.** The "$5k–$30k" range in the earlier note stays unverified.
- No AU claims-consultant price list or success-fee terms were found.
- Adjudicate Today and Master Builders (association adjudication/claims services) pricing was not checked this session.
- No SOPA-specific ruling or regulator guidance on whether non-lawyer preparation of adjudication applications is "legal practice" was found. Legal advice is needed before launch.
- Legal Profession Uniform Law s 183 and Qld LPA s 325 were not verified by search.

---

## Q3. Software competitor landscape: does anyone do the adjudication and enforcement end?

### Takeaway
Front-end claim tooling is crowded and cheap:
- PayClaim $69–149 per claim
- ClaimDone $49
- Payapps $65 per claim, or from $49 a month
- paymentclaims.ai (AI, AU+NZ)

**I found no software that drafts adjudication applications, rebuts payment schedules against case law, or manages enforcement (certificates, debt judgments, suspension notices).** The nearest is Retention Track's claim that it "helps prepare a claim or adjudication submission". The adjudication end is still lawyer-and-claimant work.

### Cited Findings
- **Payapps (subcontractor side):**
  - AU pay-as-you-go **$65 per claim** ex GST; monthly plans **from $49**.
  - First self-managed claim each month free.
  - NZ: NZ$50 per claim.
  - Its SOP material targets main contractors: automated reminders so they respond to claims in time and comply with state Acts.
  - Sources: [Payapps AU subcontractor pricing](https://www.payapps.com/pricing-subcontractors/); [Payapps NZ](https://payapps.com/nz/pricing-subcontractors/)
- **PayClaim:** flat $69, $79 or $149 per claim (varies by page). It does not handle adjudication or enforcement. Its content has errors, e.g. it says Tasmania "doesn't have its own Security of Payment legislation", although Tasmania has the *Building and Construction Industry Security of Payment Act 2009* (background, and the earlier note cites Tas adjudication rules). — [PayClaim Tas guide](https://payclaim.com.au/tasmanian-security-of-payment-act-a-tradies-plain-english-guide/); [PayClaim Vic](https://payclaim.com.au/security-of-payment-vic/)
- **ClaimDone:** $49 SOPA claim draft, $197 tribunal application pack, plus QCAT/VCAT defence and show-cause response packs. It is a general small-dispute document shop, not construction-specific adjudication. — [ClaimDone](https://claimdone.com.au/subcontractor-didnt-pay-me-australia/); [ClaimDone QCAT](https://claimdone.com.au/respond-to-qcat-application-queensland-2/)
- **AI search:** a search for AI adjudication-drafting tools in AU/NZ returned only nominating authorities and law-firm drafting guides. No AI adjudication product came up. — [RICS](https://rics.org/dispute-resolution-service/drs-services/dispute-resolution-service-in-australasia/adjudication-in-australasia); [PBL Legal drafting guide](https://pbl.legal/insights/approaching-adjudication-under-nsw-security-of-payment-legislation-how-to-draft-adjudication-application-for-construction-industry-payment-claims/)
- **paymentclaims.ai:** a domain-restricted search found no adjudication product or published pricing. The earlier note establishes AI claim drafting plus payment-schedule line matching for AU+NZ.
- **Retention Track:** no pricing surfaced; searches for its Xero App Store pricing returned only Xero's own plans. — see [Xero App Store listing](https://apps.xero.com/au/app/retention-track) (from the earlier note)

### Inferences
- **Products checked this session:**

  | Product | Price | Does adjudication or enforcement? |
  |---|---|---|
  | PayClaim | $69–149 per claim | No (states it) |
  | ClaimDone | $49 claim, $197 tribunal pack | No product found |
  | Payapps | $65 per claim, or from $49 a month (subbies); head-contractor portal | No; SOP features serve head contractors |
  | paymentclaims.ai | not found | Not found; claim + schedule matching only |
  | Retention Track | not found | "Helps prepare ... adjudication submission" (claimed) |

- **Products not checked this session (background, not verified):**
  - **Archdesk** and **Buildxact**: progress claims and estimating, no adjudication.
  - **simPRO, Tradify, Fergus and ServiceM8**: job management and invoicing for trades, no SOPA logic beyond invoice terms.
  - **HammerTech**: site safety and compliance.
  - **Procore and Aconex (Oracle)**: head-contractor or principal platforms; payment-claim workflows are configured by the head contractor. Their interests run against subbie adjudication.
  - **TenderBuilt**: content and tender tools.
  - None is known to do adjudication or enforcement.
- **What is defensible.** The open space is the matter-management layer:
  - deadline computation per Act and contract
  - schedule-versus-claim gap analysis
  - assembling the evidence bundle
  - application drafting with a lawyer or claims-preparer sign-off
  - adjudication certificate, debt judgment, and suspension or Contractors Debts Act notices

  Incumbents with a head-contractor customer base (Payapps, Procore, Aconex) have a conflict of interest that makes them unlikely to build it.
- **Fast-follower threat.** The cheap-document vendors (PayClaim, ClaimDone, paymentclaims.ai) are the likeliest fast followers. ClaimDone already sells a $197 "tribunal pack", the same pattern as an "adjudication pack". The thin, error-prone content of these sites suggests SEO-led micro-businesses that can add a product page quickly but are unlikely to carry liability for a lodged application.

### Gaps
- Pricing for paymentclaims.ai, Retention Track, Archdesk and TenderBuilt was not found.
- Procore, Aconex, Buildxact, simPRO, Tradify, Fergus, ServiceM8 and HammerTech were not checked for SOPA features (budget).
- NZ-specific AI or legal-tech for Construction Contracts Act adjudication was not found. NZ annual adjudication volumes were not found.
- No Whirlpool or Reddit AU threads were retrieved.

---

## Q4. Willingness to pay: association evidence, write-offs, insolvency and retention losses, lawyer cost against claim size

### Takeaway
The best new WTP evidence is a **2025 joint trade-association survey** led by Master Electricians Australia with plumbing, fire, HVAC and other associations:
- More than 60% of respondents had gone unpaid because of a contractor insolvency in the previous five years.
- 65% of those recovered nothing.
- 44% said retention was part of the loss.
- **35.5% did not know their rights or legal processes.**

This shows pain and an awareness gap, not a demonstrated willingness to pay for adjudication. Losses from insolvency cannot be recovered through adjudication anyway.

### Cited Findings
- **Joint survey** by Master Electricians Australia with MPAQ, NFIA, AMCA, FPAA, ACIF and ECA WA, covering electrical, fire, HVAC and plumbing contractors. The results file is dated July 2026. It is an advocacy survey with self-selected respondents.
  - Over 60% had been unpaid due to contractor insolvency in the past five years.
  - Of those, 65% received none of the money owed.
  - 44% said at least part of the shortfall was retention money.
  - 35.5% were not aware of their rights and legal processes.
  - The associations' releases frame the 65% figure as relating to retention.
  - Sources: [MEA survey results (PDF)](https://www.masterelectricians.com.au/wp-content/uploads/2026/07/MEA-Survey-Results-Doc.pdf); [survey instrument](https://www.surveymonkey.com/r/2Q6X628)
- **Queensland paused retention trust accounts in early 2025.** MEA opposed the pause and proposes a central authority to hold all retention funds, plus swapping bank guarantees for cash retention. — [MEA media release, Feb 2025](https://www.masterelectricians.com.au/2025/02/11/subcontractors-on-retention-accounts/)
  - The QBCC's own page covers only the simplification of trust-account rules from 1 July 2024:
    - a narrower "subcontractor beneficiary" (licensed contractors)
    - simpler record-keeping
    - no mandatory trust training
    - no auditor review report
  - Source: [QBCC, What's changed in the BIFOLA Act](https://www.qbcc.qld.gov.au/resources/news/whats-changed-bifola-act)
- **Victoria:** MEA welcomed the Vic Fairer Payments changes as the "first stage" of reforms, "more work yet to go". — [MEA, Sept 2025](https://www.masterelectricians.com.au/2025/09/12/vic-changes-to-better-protect-subcontractor-payments/)
- **What subbies already pay for claim documents:** $49–$149 one-off (ClaimDone, PayClaim) or $65 per claim on Payapps (cited in Q3). This is the only verified spend on SOPA tooling, and it is small.
- **Legal costs are generally not recoverable in adjudication.** — [Odyssey Legal](https://www.odysseylegal.com.au/construction-payment-claims-queensland-adjudication-process-explained/); [Lawpath](https://lawpath.com.au/blog/adjudication)

### Inferences
- **Two different pains are mixed together.** Respondents' biggest loss is head-contractor insolvency. Adjudication cannot fix that; at best, speed reduces exposure before collapse. The adjudication desk addresses the solvent-but-slow or underpaying head contractor.
  - The value proposition should be "get paid before they fall over": monitor claim-to-payment gaps per head contractor and escalate fast. "Recover after collapse" is not deliverable.
- **The awareness gap (35.5%) is a channel opportunity and a sales-cost warning.** Associations are already surveying members on SOP and lobbying, so they are a credible co-marketing channel. But a third of the market must be educated before it buys.
- **Retention in QLD is in flux.** The trust-account rollout paused in 2025, so a QLD retention-release module has a weaker statutory hook than Victoria's new performance-security release route. This argues for leading retention release in Vic and claims and adjudication in QLD.
- **Lawyer cost against claim size (partly background):**
  - For the small claims that dominate QLD invalidity (under $56.7k), "a few thousand dollars" of unrecoverable lawyer cost plus $1–3k of adjudicator fees takes 10–20% or more of the claim.
  - For the ~$135k QLD SME average, lawyer cost is plausibly 5–10% of the claim.
  - A software-plus-reviewer pack at $1.5–3.5k, or 3–6% of the recovery, is cheaper. But it competes with "do nothing" and with relationship risk.
  - The relationship risk is that subbies fear losing future work from the head contractor **(background, not verified; widely reported in SOP reviews)**.

### Gaps
- No subcontractor forum (Whirlpool, Reddit, Facebook group) commentary was retrieved.
- No HIA, Master Builders or NECA commentary on adjudication cost or WTP was retrieved.
- No national figure for retention money held was found. The "billions" figure is unverified.
- No measure of typical write-offs per trade business was found.
- ASIC 2025–26 creditor-loss detail (unsecured creditor shortfalls in construction administrations) was not searched. The earlier note covers insolvency counts only.

---

## Q5. Market size and the best wedge for this founder

### Takeaway
The **paid adjudication-preparation market is small**:
- About 2,000 applications a year nationally, and perhaps 900 in QLD and Vic.
- At $2–5k per matter, that is about **$4–10m a year nationally** even at 100% share.

A solo founder's realistic ceiling is **$0.3–1m a year in revenue within about three years**, combining a deadline-engine subscription with lawyer-signed adjudication packs. It is a viable bootstrapped business, not a large one.

The best wedge is specialty trades in QLD and Vic, sold through the associations that just ran the SOP survey, with an Xero-connected deadline engine as the entry product.

### Cited Findings
- **Business counts (ABS):**
  - Construction business counts grew **3.4%** in 2025–26.
  - Construction had **76,414 new business entries** in 2024–25, the most of any industry.
  - State-by-ANZSIC-class counts for 2024–25 were "to be published later" and were not retrieved.
  - Source: [ABS Counts of Australian Businesses](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release)
- **Adjudication volumes:** QLD 559 (FY26), NSW ~937–1,057 (FY24), Vic ~332–384 (FY24). Cited in Q1.
- **Price points available:** subbie claim tools $49–$149 (one-off) and $49 a month and up (Payapps); RICS fixed-fee adjudication about $1,000–$3,410 for claims up to $40k. Cited in Q2 and Q3.
- **Target associations already engaged on SOP:** MEA, MPAQ (Master Plumbers QLD), NFIA, AMCA, FPAA and ACIF jointly surveyed members. — [MEA survey](https://www.masterelectricians.com.au/wp-content/uploads/2026/07/MEA-Survey-Results-Doc.pdf)

### Inferences
- **Sizing.**

  | Layer | Basis | Estimate |
  |---|---|---|
  | Addressable adjudications | ~2,000/yr; take out mega-claims and head-contractor-vs-principal claims (background) | ~1,200–1,500 SME-subbie matters/yr nationally |
  | Same, QLD + Vic | | ~500–600/yr |
  | Fixed-fee revenue | 1,200–1,500 × $2.5–3.5k | ~$3–5m/yr national ceiling |
  | Optional success fee | 3–5% of recovered amounts (median recovery perhaps $30–60k) | ~$1–3k per matter |
  | Upstream subscription | deadline engine, schedule monitor, retention ledger at $49–99/month; 1,000 paying firms = 2–4% of an estimated 30–50k employing trade subcontractors in QLD+Vic (background) | ~$0.6–1.2m ARR |

  The employing-subcontractor base is far larger than the adjudication pool, so the subscription is where scale comes from. Adjudication packs supply the "outcome" proof and the margin.
- **Realistic three-year solo revenue:**
  - 50–100 adjudication packs a year: $150–400k
  - 300–800 subscribers: $200–800k
  - Total: **about $0.35–1.2m a year**
- **Best wedge (recommended):**
  - **Buyer:** specialty trade subcontractors with $2–20m turnover, 5–60 staff, an office manager or bookkeeper, and Xero or MYOB. Electrical, plumbing, fire and HVAC first, matching the survey associations.
  - **Projects:** commercial and multi-residential work for tier-2/3 builders.
  - **States:** QLD for claim and adjudication volume and the invalidity evidence. Vic for the new retention and performance-security release route, and for adjudication of variations and delay costs after April 2026.
  - **Scope v1, a "SOPA deadline engine":**
    - Xero/MYOB OAuth sync of invoices and progress claims.
    - Tag each claim as a SOPA claim, with the reference date, the respondent's schedule due date, and the adjudication window per Act and contract.
    - SMS/email escalation before each deadline.
    - A head-contractor payment-behaviour dashboard (days to pay, short-pay %).
    - AI comparison of the payment schedule against the claim, listing each withheld item and the reasons given. This matters more in Vic, where respondents can no longer raise new reasons at adjudication.
  - **Scope v2, the "adjudication pack":**
    - Evidence bundle plus an AI first draft of the submissions.
    - Review and sign-off by a partner construction lawyer at a fixed fee paid directly by the client.
    - Lodgement with the QBCC or the chosen ANA.
    - Post-determination certificate and debt-judgment steps.
  - **Scope v3:** Vic performance-security release applications, and retention-release reminders in both states.
  - **Pricing:**
    - $79–149 a month per entity, or about $990–1,490 a year through associations.
    - Adjudication pack: $1,500–3,500 fixed for claims under $150k (partner lawyer fee separate or bundled), with an optional 3–5% success component on the platform side only, subject to legal advice.
  - **Channels:**
    - Trade associations (MEA and MPAQ first, as member benefit or discount).
    - Xero App Store, where Retention Track shows trade/retention apps list there.
    - Trade bookkeepers and BAS agents who run several subbies' ledgers.
    - Partner construction law firms that want small matters triaged.
    - Vic ANAs as referral partners.
  - **First 10 customers:**
    - 3–5 QLD electrical or plumbing contractors from the MEA/MPAQ survey networks, offered a free deadline audit of their last 12 months of Xero claims ("which claims were valid SOPA claims, which deadlines you missed").
    - 2–3 trade bookkeepers, each bringing several subbies.
    - 2–3 Vic subbies holding retention or bank guarantees on completed jobs.
    - The deadline audit is a cheap, data-driven proof that suits the founder's sync, SQL and dashboard skills.

### Gaps
- No ABS state-by-ANZSIC count of construction trade-services businesses (employing vs non-employing) was retrieved. The "30–50k employing trade subcontractors in QLD+Vic" figure is my background estimate.
- No data on the split between subbie and head-contractor claimants.
- No AU benchmark for SaaS conversion through trade associations.
- No partner-lawyer fee quote.

---

## Q6. Kill criteria, verdict and re-score

### Takeaway
**Verdict: DOWNGRADE, but keep as a narrowed wedge.**
- The pain is confirmed and growing:
  - QLD 559 applications, 15% invalid (mostly small, deadline-missed claims)
  - NSW at roughly 1,000 a year
  - an awareness gap of a third of subbies
- The solution gap at the adjudication end is confirmed: no software found.
- But the outcome-priced adjudication desk is small (about 2,000 matters a year nationally), legally awkward (success fees, legal-practice risk, lawyer fee rules) and has weak verified WTP.

Build it as a **deadline-and-schedule engine with an optional lawyer-signed adjudication pack**, not as a per-outcome recovery desk. Re-score: **33/60** (down from 38).

### Cited Findings
- **Professional liability:** missed statutory deadlines are the leading cause of QLD invalidity (82 of 559). Any product touching deadlines carries the same failure mode. — [The Good Builder](https://thegoodbuilder.com.au/14-1-million-in-queensland-adjudication-claims-ruled-invalid-missed-deadlines-topped-the-list/)
- **Fragmentation:**
  - QLD uses a government registry; NSW and Vic use competing private ANAs. — [RICS](https://www.rics.org/dispute-resolution-service/drs-services/non-uk-dispute-resolution-services/dispute-resolution-service-in-australasia/adjudication-in-australasia)
  - Deadlines are stated inconsistently even by vendors (QLD 30 vs 20 vs 10 business days). — [QBCC](https://www.qbcc.qld.gov.au/node/1366); [PayClaim](https://payclaim.com.au/adjudication-explained-australian-subcontractors/); [ClaimDone](https://claimdone.com.au/subcontractor-wont-pay-australia-debt-recovery-construction/)
  - QLD trust-account rules were changed in July 2024, then retention trusts were paused in 2025. — [QBCC](https://www.qbcc.qld.gov.au/resources/news/whats-changed-bifola-act); [MEA](https://www.masterelectricians.com.au/2025/02/11/subcontractors-on-retention-accounts/)
- **Cycle:** QLD valid applications rose from 324 (FY25) to 477 (FY26), and NSW from ~678 (FY22) to ~940–1,057 (FY24). Demand is rising, not cyclically exposed so far. — [Lawyers Weekly](https://www.lawyersweekly.com.au/sme-law/44981-adjudication-is-won-on-site-not-in-the-registry); [DLA Piper](https://www.dlapiper.com/en/insights/publications/2025/03/victoria-s-security-of-payment-regime-set-for-extensive-reform)
- **Incumbents adding it:** ClaimDone already sells $197 tribunal packs, and Payapps' SOP features serve head contractors. — [ClaimDone](https://claimdone.com.au/qcat-fees-2026-minor-civil-dispute-queensland/); [Payapps](https://www.payapps.com/pricing-subcontractors/)
- **Lawyers' fixed fees:** advertised, but no prices are published. — [Baker Merz](https://construction.lawyer/australia/services/adjudication/adjudication-application/); [AR Building Law](https://www.subcontractors.arbuildinglaw.com.au/construction-disputes-adjudication)

### Inferences
**Kill-criteria check:**

| Kill criterion | Status | Reasoning |
|---|---|---|
| Professional liability | **Amber.** Manageable only with a lawyer in the loop, PI insurance and conservative deadline logic (alert on the earliest plausible deadline) | A missed deadline voids the claim. Liability sits with whoever owns the deadline. The engine must present deadlines as reminders, with the human signing off |
| Legal-practice / success-fee rules | **Amber-red.** Could kill the "per outcome" pricing, not the product | Lawyers likely cannot take a percentage of recovery (background). A non-lawyer platform drafting submissions for a success fee risks unauthorised practice. Legal advice is needed before launch |
| State fragmentation | **Amber** | Eight Acts, two lodgement models, and Vic just reformed (transitional conflict between Minter Ellison and Baker McKenzie per the earlier note). Starting in two states limits it |
| Housing-cycle exposure | **Green** | Volumes are rising and adjudication is counter-cyclical. Insolvencies cut the other way (unrecoverable losses) |
| Incumbents adding it | **Green-amber** | Head-contractor platforms are conflicted. Cheap-doc vendors may add "adjudication packs" but are unlikely to carry liability. The real competitor is the construction lawyer |
| Lawyers' fixed-fee packages | **Amber** | Prices unpublished. If firms productise sub-$3k packs (possibly AI-assisted), the pack's price edge shrinks. Partnering with lawyers turns them into a channel |
| Market size | **Red for the outcome desk alone** | ~2,000 matters a year nationally caps adjudication revenue at a few million dollars. A subscription base is needed |

**Re-score (1–10):**

| Criterion | Previous | New | Reason |
|---|---|---|---|
| Pain intensity | 9 | **8** | Confirmed (15% QLD invalidity; >60% of surveyed trades hit by insolvency non-payment). But the largest losses are insolvency, which adjudication cannot fix |
| WTP evidence | 7 | **5** | Verified spend is only $49–149 per claim. No verified price for adjudication preparation. 35.5% unaware of rights. Legal costs are unrecoverable, which cuts both ways |
| Solution gap | 5 | **7** | No software found doing schedule rebuttal, adjudication drafting or enforcement. PayClaim explicitly excludes it. Lawyers hold the end-stage work but publish no prices |
| Market size | 5 | **4** | ~2,000 applications a year nationally, ~900 in QLD+Vic. The subscription base is unverified (ABS state counts not retrieved) |
| Founder feasibility | 7 | **5** | The data and sync stack fits well. But it needs a lawyer partner, PI insurance, legal advice on the fee model, and Act-by-Act deadline rules |
| Defensibility | 5 | **4** | Deadline logic is copyable. The moat would come from a corpus of head-contractor payment behaviour and from association distribution, both unproven |
| **Total** | **38** | **33** | |

**Conditions to upgrade back to "keep":**
- Five or more QLD/Vic subbies pay for a deadline audit.
- One association agrees to co-market.
- A construction law firm agrees to fixed-fee sign-off at $1–2k per pack.
- Legal advice confirms a compliant fee structure.

**Kill condition:** legal advice says a non-lawyer platform cannot draft submissions or charge outcome-linked fees in QLD or Vic, and no law firm will partner at a price that keeps packs under ~$3.5k.

### Gaps
- No legal opinion or regulator guidance was found on non-lawyer adjudication preparation or success fees in QLD or Vic. This is the single most decision-relevant unknown.
- No post-April-2026 Vic adjudication volume data, so the effect of the reform is unproven.
- No primary QBCC table for outcomes (awarded vs claimed).
- No competitor pricing for paymentclaims.ai or Retention Track.
- NZ is a secondary note only:
  - AANZ capped fees exist for claims up to NZ$40k.
  - Payapps NZ charges NZ$50 per claim.
  - paymentclaims.ai and Retention Track cover NZ (per the earlier note).
  - NZ adjudication volumes and any NZ adjudication software were not found.
