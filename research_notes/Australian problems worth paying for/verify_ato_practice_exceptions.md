# Verification: Payday Super exception desk (C1, employment/payroll) and ATO debt plus GIC/penalty remission desk (C1, professional services). Should they be one "ATO exceptions desk for practices"?

Scope and method: this round used 30 web searches; every WebFetch and curl attempt failed (DNS failure or proxy 403). All findings below therefore come from search-result summaries and snippets, not full-page reads. Treat exact figures as "per search summary" unless an ATO or vendor page is named. The round does not repeat what the two sector notes established, which are `au_employment_payroll_compliance.md` (Q1 and C1) and `au_professional_services_finance.md` (Q1 and C1). Date context: 18 October 2026.

Labels used:
- **[Verified]**: from a search result tied to a named source.
- **[Background, unverified]**: from the researcher's prior knowledge.
- **[Inference]**: reasoning from the cited findings.

---

## Q1. What are bookkeepers and employers reporting since Payday Super started on 1 July 2026? Rejection and late-payment rates, the ATO's compliance stance, and transitional relief.

### Takeaway
There are still no post-launch numbers. No ATO, ICB, ABSIA or IPA figure on late or rejected Payday Super contributions surfaced for July to October 2026. The evidence of pain is qualitative:
- funds failing member verification in month one;
- a MYOB community thread titled "Payday super payment returned";
- Xero users complaining that bounce alerts reach only one authoriser, so accountants managing many organisations have to keep "refreshing the Super Payments screen".

The ATO's finalised year-one approach (PCG 2026/1) explicitly softens enforcement until 30 June 2027 for employers who fix errors promptly. That lowers urgency for a paid monitoring tool in the first year.

### Cited Findings
**ATO stance and transitional relief**
- **PCG 2026/1:** the ATO's first-year compliance guideline was finalised on 28 January 2026. — [Clayton Utz FAQ (June 2026)](https://www.claytonutz.com/insights/2026/june/payday-super-frequently-asked-questions); [SMSF Adviser on PCG 2026/1](https://www.smsfadviser.com/payday-super-atos-practical-compliance-guideline-pcg-2026-1/)
- **Risk tiers:** for 1 July 2026 to 30 June 2027 the ATO assesses employers as low, medium or high risk.
  - Employers who pay in full, on time and to the right fund face no risk assessment.
  - A missed run that is corrected within 28 days after the end of the quarter is treated as medium risk.
  - Repeated late payments raise the risk of compliance action.
  - Enforcement targets employers not trying to move to more frequent contributions, or not paying super at all.
  - — [ATO: getting it right in the first year](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/missed-or-late-payday-super-payments/getting-it-right-compliance-in-the-first-year-of-payday-super); [Grant Thornton client alert](https://www.grantthornton.com.au/insights/client-alerts/payday-super--ato-finalises-first-year-compliance-approach)
- **Voluntary disclosure statements:** these are optional and can reduce the final SGC, especially if lodged early. — [ATO first-year page, per search summary](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/missed-or-late-payday-super-payments/getting-it-right-compliance-in-the-first-year-of-payday-super)
- **Conflict on late payments:**
  - One search summary of the ATO first-year guidance says late payment offsets "are no longer available from 1 July 2026" and that "paying late before an ATO SG charge assessment will not reduce the charge". — [ATO first-year page, per summary](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/missed-or-late-payday-super-payments/getting-it-right-compliance-in-the-first-year-of-payday-super)
  - This contradicts the prior note, which cites the ATO's payment-deadlines page as saying a late contribution can reduce the SGC. — [ATO payment deadlines](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-on-payday/payment-deadlines-for-payday-super)
  - **[Background, unverified]** The law removed the late-payment-offset *election*, but late contributions made before assessment still reduce the shortfall. The search summary probably over-generalised. This matters for any SGC estimator and must be checked against the ATO page before building.
- **How the ATO checks compliance:** it uses STP data and fund-reported contribution data to check whether super was paid in full and on time. — [ATO: how we check Payday Super compliance](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/missed-or-late-payday-super-payments/how-we-check-payday-super-compliance)
- **Contested point:** Grant Thornton flags open issues, including possible inadvertent breaches of the concessional contribution cap during the transition. — [Grant Thornton](https://www.grantthornton.com.au/insights/client-alerts/payday-super--ato-finalises-first-year-compliance-approach)

**What the field is reporting (qualitative)**
- **Fund verification failures:** Financial Standard reported "very understandable teething issues" in the first month. Three of the top 10 funds by member-verification (MVR) volume were not validating MVRs during the measured period. — [Financial Standard](https://www.financialstandard.com.au/news/super-funds-show-unpreparedness-on-payday-super-179813649)
- **Rejection timing:** a rejecting fund now has 3 business days to return a contribution (previously 20). The employer must still fix and resubmit inside the original 7-business-day window. — [CFS employer page](https://www.cfs.com.au/employer/paydaysuper); [Cbus employer page](https://www.cbussuper.com.au/employers/payday-super)
- **Common causes:** wrong member number, changed fund, mismatched fund details, wrong USI. "Processed" in payroll does not mean the fund has received the money. — [Future Accounting](https://www.futureaccounting.org/post/payday-super-7-day-rule-employers)
- **Identity, not payment:** Orion X argues most failures are identity failures, because money that arrives without a matching member is treated as not arrived. What Orion X sells could not be verified (fetch failed). — [Orion X blog](https://orionx.com.au/blog/payday-super-rejected-contributions)
- **Returned funds before launch:** Employment Hero data cited by Super Review found 63% of businesses named "returned funds due to errors" as a frustration with processing. — [Super Review](https://www.superreview.com.au/three-months-to-go-are-funds-ready-for-payday-super/)
- **Practitioner pain inside Xero (strongest direct evidence for the bookkeeper buyer):**
  - A product idea asks that payroll advisers, not only the single super authoriser, receive super email notifications. It says it is "not practicable to be constantly refreshing the Super Payments screen to check for any bounces, particularly for Accountants who manage multiple organisations in Xero." — [Xero Product Ideas: payroll advisors to receive super notifications](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/51033448-au-payroll-payroll-advisors-to-receive-superannu)
  - Users also complain that only one nominated authoriser can approve super. Xero said multi-authorisation was "actively being worked on for release next quarter"; no evidence it shipped. — [Xero Product Ideas: multiple auto super authorisers](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/46199650-au-payroll-set-up-multiple-auto-super-authoriser?page=2)
- **MYOB community:** a thread titled "Payday super payment returned" exists; its content was not retrieved. — [MYOB community](https://community.myob.com/discussions/staffing_and_payroll/payday-super-payment-returned/916354)
- **Bookkeeper bodies:** the only ICB statement found is pre-launch. Matthew Addison: "I am yet to see any explanation from the superfunds as to how they are going to deal with so much more data, so many more rejected transactions and information requiring checking and at what cost." — [Accountants Daily (ICB)](https://www.accountantsdaily.com.au/super/20406-payday-super-to-require-major-overhaul-of-super-system-and-processes-warns-icb-2)
- **Readiness survey:** an ACCI survey, cited by vendor PaySauce, found only 50% of businesses prepared before launch. — [PaySauce blog](https://www.paysauce.com/au/blog/payday-super-is-coming.-this-is-the-moment-for-bookkeepers-and-accountants)

### Inferences
- **Pain is real but deferred for a paid tool.** The year-one PCG plus "fix promptly" leniency means bookkeepers are absorbing exceptions manually in FY27. The financial stick (ATO-raised SGC with uplift and GIC) bites mainly from FY28. Payday Super urgency is therefore lower today than the sector note assumed.
- **The Xero "constantly refreshing" complaint is a notification problem, not a reconciliation problem.** Xero can fix it with a settings change: notify additional users, or show an at-risk view (see Q3). That narrows the third-party gap.

### Gaps
- No ATO data on late or rejected contribution rates since 1 July 2026, and no SGC assessments-issued figures.
- No ICB, ABSIA or IPA post-launch member survey (one ICB April 2026 eBrief was referenced but its content was not retrieved).
- No Whirlpool or Reddit threads were captured.
- No Accountants Daily post-launch Payday Super practitioner article was surfaced.
- Not found: when the ATO will begin issuing Payday Super SGC assessments in volume.

---

## Q2. Data access (decisive): can a third party see contribution status, fund acceptance or SuperStream return/error messages for a bookkeeper's clients across Xero, MYOB, Employment Hero/HeroClear/KeyPay, QuickBooks, Beam, Wrkr, Ozedi or other gateways?

### Takeaway
**No public route was found.** No vendor in scope documents an API or bulk export that exposes per-contribution fund acceptance, return or error status to third-party apps. SuperStream error messages (CTER and member registration outcome) go back over ebMS3 to the *sending* gateway or clearing house only. A third party can see them only if that clearing house surfaces them.

What *is* reachable is pay-run super liabilities and employee fund details through payroll APIs **[partly background]**, plus bank-feed debits and refunds through accounting APIs. That supports pre-submission data checks and a "money left / money came back" proxy. It does not support true "reconcile to fund acceptance". The sector note's own kill criterion ("fund-acceptance or CTER data cannot be obtained via API or file import from at least two of Xero Auto Super, Employment Hero/HeroClear or Beam") is **met on current evidence**.

### Cited Findings
**Xero Auto Super**
- Debits the client's nominated bank account and distributes to funds through the SuperChoice clearing house.
- Batch status is shown in the UI. For example, approved batches show as "Approved, pending processing".
- — [Xero superannuation page](https://www.xero.com/au/accounting-software/payroll/superannuation/); [Trinity Group guide](https://trinitygroup.com.au/post/process-automatic-superannuation-payments/)
- A post-launch Xero product update says Xero added "a new auto super overview page, where you can identify and pay outstanding super liabilities, with better visibility of at risk super payments and notifications". It does not say the page spans multiple organisations. — [Xero Product Ideas thread, Xero staff update](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/46199650-au-payroll-set-up-multiple-auto-super-authoriser?page=4)
- The idea "Xero HQ – Report on all client automatic superannuation batches" was moved to "Gaining Support", so no all-client super batch report exists in Xero HQ. — [Xero Product Ideas](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46609939-xero-hq-report-on-all-client-automatic-superannu)
- Searches surfaced no public Xero API documentation for super payment or batch status. — [search summary; Xero developer docs not retrievable]

**Employment Hero / HeroClear (KeyPay lineage)**
- After submission the UI shows batch number, total, submitted date and funding method. — [EH: batch super processing with HeroClear](https://help.employmenthero.com/hc/en-au/articles/17426619221903-Batch-superannuation-processing-with-HeroClear)
- Raw back-end batch data can be viewed in the UI only in certain statuses: awaiting payment, awaiting clearance, reconciled, sent to fund. — [EH: view back-end super batch data](https://help.employmenthero.com/hc/en-au/articles/17426658559631-How-do-I-view-the-back-end-super-batch-data-on-Payroll-classic)
- No super-batch-status API endpoint was found. A third-party connector lists only "Get superannuation detail", which is employee super details. — [Celigo: supported Employment Hero APIs](https://docs.celigo.com/hc/en-us/articles/27592644847899-Supported-Employment-Hero-APIs)
- EH documents that a fund returns a CTER when it cannot allocate a payment, and notes the 3-business-day allocate-or-return rule under SuperStream v3 from 1 July 2026. — [EH help](https://help.employmenthero.com/hc/en-au/articles/17426640983823)

**Beam (owned by Australian Retirement Trust)**
- Integrates with payroll vendors (Aurion, Tanda, Payroo, foundU, Microkeeper, Reckon) through partner APIs.
- Partners advertise pre-submission validation: Microkeeper cites built-in checks for ABNs, USIs and contribution details; Tanda alerts users to errors before submission.
- Partners advertise notifications to "track your contributions every step of the way" (Payroo).
- No public employer or third-party status/export API was found.
- — [Aurion–Beam](https://www.aurion.com/aurion-beam-integration/); [Microkeeper–Beam](https://info.microkeeper.com.au/integrations/beam-super-clearing); [Tanda–Beam](https://www.tanda.com.au/integrations-partners/beam); [Tanda help](https://help.tanda.co/en/articles/8338840-pay-super-with-beam); [Payroo–Beam](https://support.payroo.com.au/en/articles/5113168-beam-payroo-integration)

**Wrkr**
- Bookkeeper multi-client portal; each client sits in its own environment.
- No API documentation, API pricing or access terms were found.
- — [Wrkr bookkeepers](https://wrkr.com.au/bookkeepers-payday-super/); [Wrkr bookkeeper client setup](https://www.wrkr.com.au/resources/bookkeeper-client-setup)

**MYOB PaySuper**
- Built into MYOB Business payroll (Payroll > Super payments), with payroll reports for tracking super paid.
- No multi-client bookkeeper dashboard or API status access was found.
- — [MYOB Payday Super support hub](https://www.myob.com/au/support/myob-business/payday-super-support-hub)

**Ozedi**
- Used as Reckon's SuperStream channel; no third-party status API was found. — [Reckon Ozedi SuperStream](https://www.reckon.com/au/accounting-software/payroll/ozedi-superstream)

**SuperStream itself**
- Contributions v3 includes the Contribution Transaction Error Response (CTER) and Member Registration Outcome Response in a "Better Error Code Management" phase delivered over four weeks in May–June 2026.
- Conformance testing is mandatory for any solution generating SuperStream Contributions v3.0 XBRL, "including gateways and clearing houses".
- CTER messages are sent and received over ebMS between participants.
- — [ATO Conformance Implementation Guide Contributions v3](https://softwaredevelopers.ato.gov.au/sites/default/files/2025-12/Conformance_Implementation_Guide_Contributions_V3_FINAL.pdf); [Conformance Testing Guide v3](https://softwaredevelopers.ato.gov.au/sites/default/files/2025-10/Conformance_Testing_Guide_Contributions_V3_FINAL.pdf); [Contributions User Guide v3.0, 26 June 2026](https://softwaredevelopers.ato.gov.au/sites/default/files/2026-06/Contributions_User_Guide_v3.0-0.4_26_June_2026.pdf)
- Error code examples: Class publishes codes such as SUPER.GEN.GEN.21 (member cannot be matched, e.g. a TFN, DOB or surname mismatch). — [Class: SuperStream error messages](https://support.class.com.au/hc/en-au/articles/13614775408143-SuperStream-Error-Messages)

**ATO-side visibility**
- Employees can see "View employer contributions" (fund-reported) against "View superannuation contributions" (employer-reported) in ATO online services. — [ATO Payday Super toolkit: employees](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super-resources/payday-super-communication-toolkit/employees); [FairWork Mate guide](https://fairworkmate.com.au/blog/how-to-check-employer-paying-super)
- No employer- or agent-facing ATO view comparing STP liability with fund receipts was found.

**Xero API cost (relevant to any per-client Xero connection)**
- From 2 March 2026 Xero replaced the 15% App Store revenue share with five tiers (Starter, Core, Plus, Advanced, Enterprise) priced by connected organisations and monthly data egress.
- Third-party figures:
  - Plus: about 1,000 connections and 50 GB.
  - Advanced: about US$895 (≈A$1,445) a month for 10,000 connections and 250 GB.
  - Overage: about A$2.40 per extra GB.
  - Some endpoints (e.g. Journals) are gated to Advanced.
- Accountants Daily headlined it "All-you-can-eat Xero data buffet comes to abrupt end".
- — [Xero developer pricing](https://developer.xero.com/pricing); [Apideck Radar](https://radar.apideck.com/blog/xero-api-pricing-and-the-app-partner-program); [Truto](https://truto.one/blog/xero-api-pricing-changes-2026-costs-tiers-and-how-to-minimize-egress/); [Apideck developers](https://developers.apideck.com/apis/accounting/xero/overview); [Accountants Daily](https://www.accountantsdaily.com.au/technology/21986-all-you-can-eat-xero-data-buffet-comes-to-abrupt-end)

### Inferences
- **What a third party can build without a clearing-house partnership:**
  1. Pre-submission member-data validation, using employee fund details from payroll APIs. This targets the >90% data-error cause, but Beam partners, Tanda, Microkeeper and HeroClear already validate at source.
  2. A per-pay-run deadline board (7 business days, state public holidays).
  3. A bank-feed proxy: the clearing-house debit left; a refund came back for clearing houses that refund to the employer.
  4. An SGC estimator.
- None of these can prove *fund receipt date*, which is the actual compliance test. Only the clearing house, the fund and the ATO see that.
- **[Background, unverified]** The Xero Payroll AU API (v1) exposes employees, pay runs, payslips with super lines, super funds and settings, but no super payment or batch-status resource. MYOB's public API likewise exposes super fund setup and payroll categories but not PaySuper transaction status. Neither could be confirmed because developer docs were unreachable.
- **The only realistic path to true acceptance data is a partnership** with a payroll-agnostic clearing house (Wrkr, Beam, SuperChoice or Ozedi) to receive per-client status or CTER feeds. That is a business-development dependency a solo founder cannot control. It also makes the clearing house, not the founder, the natural owner of the product.
- **Xero connection fees are small per client** (about A$0.14 a connection a month at Advanced, by the third-party figures). That is not a killer, but it adds tiering friction and an app-certification step.

### Gaps
- Developer documentation for Xero Payroll AU, MYOB, KeyPay/EH, Wrkr, Beam, SuperChoice, ClickSuper and Ozedi could not be fetched. API absence is inferred from search results, not proven.
- Whether any clearing house offers a CSV/CTER export a bookkeeper could upload (the file-import fallback) is unconfirmed.
- Not found: whether the ATO gives employers or registered agents an STP-versus-fund-receipt mismatch view or alert.

---

## Q3. Who else is in the Payday Super monitoring market (opportunity 1), and what do they charge?

### Takeaway
The cross-platform gap still exists in the narrow sense: no single tool reads Xero, MYOB, EH and QBO and shows fund acceptance. But it is being squeezed from three sides:
1. **Platforms** are adding at-risk views and multi-client payroll dashboards (Xero's auto super overview and Payroll Manager).
2. **Payroll-agnostic clearing houses** (Wrkr) already give bookkeepers one login with timelines across all clients, for A$5–79 per client a month. A bookkeeper who wants one pane can standardise on Wrkr.
3. **Pre-submission validation** is built into Beam and HeroClear partner flows.

The genuinely open slot (cross-platform *acceptance* reconciliation) is blocked by data access (Q2), not by competition.

### Cited Findings
- **Wrkr:**
  - Priced per client ABN per month by employee tier, from A$5 (1–2 employees) to A$79 (100–200 employees), ex GST. The "from $5.50/month" figure is the A$5 tier including GST.
  - One bookkeeper login, not tied to any client's business.
  - Creates, submits and tracks contributions across client entities.
  - — [Wrkr pricing for bookkeepers](https://www.wrkr.com.au/payday-super-bookkeepers); [Wrkr bookkeepers](https://wrkr.com.au/bookkeepers-payday-super/)
- **Xero:**
  - Marketing says Payroll Manager gives accountants and bookkeepers "a single dashboard to view and manage all their payroll clients", showing which pay runs are due and where issues are flagged. Whether super status is included is unconfirmed (vendor claim). — [Xero accountant guide: choosing payroll software](https://www.xero.com/au/accountant-bookkeeper-guides/how-to-choose-the-right-payroll-software/)
  - Per-organisation "auto super overview" with at-risk visibility (Q2). — [Xero Product Ideas staff update](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/46199650-au-payroll-set-up-multiple-auto-super-authoriser?page=4)
  - The all-client super batch report in Xero HQ is still only an idea at "Gaining Support". — [Xero Product Ideas](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46609939-xero-hq-report-on-all-client-automatic-superannu)
- **MYOB PaySuper:** included in any MYOB subscription with payroll; no multi-client view found. — [MYOB support hub](https://www.myob.com/au/support/myob-business/payday-super-support-hub)
- **Beam:** payroll partners advertise real-time validation and contribution tracking; Reckon includes Beam in all Reckon Payroll plans. — [Microkeeper](https://info.microkeeper.com.au/integrations/beam-super-clearing); [Tanda](https://www.tanda.com.au/integrations-partners/beam); [Payroo](https://support.payroo.com.au/en/articles/5113168-beam-payroo-integration)
- **Content-led "reconcile Payday Super in Xero and MYOB" guides:** these exist (vendor SEO), which shows the reconciliation job is recognised. — [Invoice Data Extraction blog](https://invoicedataextraction.com/blog/reconcile-payday-super-contributions-australia-xero-myob); [StackPick](https://stackpick.com.au/payday-super-accounting-software-australia/)
- **Practice-management tools (Karbon, FYI, XPM):** no Payday Super or super-status monitoring feature surfaced. Karbon's surfaced integrations, for example QuickBooks Online Accountant, sync client details only. — [Karbon QBOA integration help](https://help.karbonhq.com/en/articles/10542382-quickbooks-online-accountants-overview); [XPM review 2026](https://getuku.com/articles/xero-practice-manager-review/)
- **Already in the sector note (not repeated in detail):**
  - SuperDue: manual deadline board.
  - Odoo Payday Super dashboard module.
  - Employment Hero processing at A$0.30 per employee per batch.
  - Free calculators from RosterElf and FairWork Mate.
  - — see `au_employment_payroll_compliance.md` Q1 "Pricing and tools".

### Inferences
- **Positioning collapses.** A buyer who wants "one pane across clients" can already move clients onto Wrkr (A$5–79 per client a month, payment included) or stay inside Xero. A monitoring-only layer would sell *on top of* a free (Xero) or paid (Wrkr/EH) payment rail, without the data that matters. WTP for a read-only layer is likely below the A$8–20 per client a month the sector note assumed.
- **Practice Protect, Ignition, Dext and Hubdoc are not competitors here** (security, proposals/billing and document capture respectively). They are relevant only as WTP anchors (Q5).
- **Most likely fast-follower risk:** Xero shipping the "Gaining Support" Xero HQ all-client super report. Xero owns both the data and the channel.

### Gaps
- Not checked within budget: Xebra; ClickSuper's and SuperChoice's employer and bookkeeper dashboards; QuickBooks' HeroClear multi-client views.
- Not confirmed: whether Xero Payroll Manager actually surfaces super batch status per client.

---

## Q4. Who else serves the ATO debt and remission market (opportunity 2), and what do the DSP framework and ATO APIs allow?

### Takeaway
The data exists and is already used by incumbents.
- The ATO's SBR Client Account services give DSP-registered software per-client account balances, amounts due and payable, and **interest forecast to a future date**.
- HandiTax (Access Group), Business Fitness and GovReports already pull client account data. GovReports sells an "ATOInsights" add-on.
- ATOmate automates ATO notices, including tax-debt notices, for XPM, Xero Tax, APS and Elite users, and markets DPN and debt content to accountants.

The hand-check did **not** find any product that delivers a *cross-client, all-account* debt register with aging, DPN flags and a remission drafting and tracking workflow. That gap survives, but it is narrower ("rollup plus workflow on data incumbents already hold"). The kill condition remains live for GovReports and MYOB until checked in a trial.

Remission drafting is unserved by software. The ATO form is an Excel file lodged through practice mail, and only templates and guides exist (Accountants Desktop, law-firm letter templates).

### Cited Findings
**ATO APIs and DSP access**
- **SBR account management services:** Client Account Summary (CLNTACCSUM) "List" returns ATO account information for a client: account balance, type and name. Client Account (CLNTACC) lists amounts due and payable, and "the interest amount for certain accounts can be forecast to a future date". Business Implementation Guide v1.2 was published on 22 January 2026; package v1.5; SBR ebMS3 only. — [SBR: Account management (ACCMGT)](https://www.sbr.gov.au/digital-service-providers/developer-tools/australian-taxation-office-ato/obligation-management-oblmgt/account-management-accmgt)
- **HandiTax (Access Group):** its Accounts tab requests the client's account summary from the ATO and, where there is an outstanding balance, also requests the due amounts. That is per client. — [HandiSoft help](https://help-handisoft.theaccessgroup.com/en/articles/12494503-how-to-retrieve-client-account-information-from-the-ato)
- **Business Fitness:** an "integrated client account" template prefills transactions from the ATO ICA. The tax agent must first register Business Fitness as a DSP. Only ABN taxpayers are supported. — [Business Fitness help](https://activehelp.businessfitness.com/support/solutions/articles/5000887416)
- **PLS gap:** the ATO's BAS agent guide lists the "Client account running balance" report as available through Online services for agents but *not* through the Practitioner Lodgment Service (PLS). — [ATO BAS agent online services guide](https://www.ato.gov.au/tax-and-super-professionals/digital-services/bas-agent-online-services-guide)
- **OSfA exports, usable for a no-API v1:**
  - Accounts summary per client, with overdue amounts and balances, downloadable as CSV or HTML.
  - Client account running balance report (CSV or HTML, 2009 onward).
  - Activity statement obligations report showing each client's activity statement balance at the time of request.
  - — [OSfA: accounts and payments](https://www.ato.gov.au/tax-and-super-professionals/digital-services/online-services-for-agents/online-services-for-agents-user-guide/accounts-and-payments); [OSfA: reports](https://www.ato.gov.au/tax-and-super-professionals/digital-services/in-detail/online-services-for-agents-user-guide/reports-and-forms/reports)
- **DSP Operational Security Framework (OSF):**
  - Applies to "any software product or digital service that performs a functional role in the supply chain of transmitting Taxation, Accounting, Payroll, Business Registry or Superannuation data through ATO digital services".
  - Access requires an OSF security questionnaire with evidence: audit logging, authentication, certification, data hosting, key management, and encryption at rest and in transit.
  - Ongoing duties: an annual review, notifying the Digital Partnership Office of changes, and reporting breaches immediately.
  - ISO 27001 certification appears in an example DSP confirmation letter as one route.
  - No cost or timeline figures were found.
  - — [ATO OSF scope](https://softwaredevelopers.ato.gov.au/scope-dsp-operational-security-framework); [Operational framework](https://softwaredevelopers.ato.gov.au/operational_framework); [Maintaining compliance](https://softwaredevelopers.ato.gov.au/maintaining-compliance); [Example ATO confirmation letter (2020)](https://nz.frontiersoftware.com/system/files/document/2020-08/ATO%20Letter%20of%20Confirmation%20ichris.pdf)
- **Xero Tax:** connects agents through cloud software authentication and authorisation (CAA) and prefills activity statements. No client-wide balance report was found. — [Xero Tax](https://www.xero.com/au/xero-tax/)

**Products hand-checked**
- **GovReports:**
  - Advertises "view outstanding returns and Client Account balances and transactions", plus an "ATOInsights" dashboard adding real-time ATO data. — [GovReports tax agent](https://www.govreports.com.au/tax-agent)
  - Pricing, from a competitor's comparison page and so unverified: tax agent licences A$636 a year (up to 50 clients) to A$3,528 a year (unlimited), extra users A$158 a year, ATOInsights add-on A$534.55 + GST a year. — [Enterprise DNA "instead of GovReports"](https://enterprisedna.co/omni/instead-of/govreports); [Capterra AU listing](https://www.capterra.com.au/software/208920/govreports)
  - Whether it rolls balances up across *all* clients is not confirmed.
- **ATOmate (Business Automation Works, Melbourne):**
  - AI review of ATO documents (notices of assessment, statements of account, tax debts) against client records; flags discrepancies and redacts and attaches notices to client emails.
  - Integrates with XPM, Xero Tax, WorkflowMax, Reckon APS and Elite, and partners with the Access Group and Class.
  - Publishes DPN and ATO-debt content aimed at accountants.
  - Has had an ATO integration for client communications since 2021.
  - No live-balance rollup was found.
  - — [ATOmate + APS](https://atomate.com.au/atomate/); [Access Group integration](https://www.theaccessgroup.com/en-au/accounting-practices/integrations/atomate); [Xero App Store listing](https://apps.xero.com/au/app/atomate); [ATOmate on ATO debt and DPNs (July 2025)](https://atomate.com.au/2025/07/11/how-accountants-can-protect-clients-from-ato-debt-and-director-penalty-notices/); [ATOmate 2021 ATO integration](https://atomate.com.au/2021/10/28/new-ato-integration-revolutionises-client-communication-for-accountants/); [Class partner page](https://class.com.au/?p=23853)
- **LodgeiT:** the dashboard lists in-progress forms and you pick clients one at a time. No debt view was found. — [QuickBooks help: getting started with LodgeiT](https://quickbooks.intuit.com/learn-support/en-au/gst-and-bas/getting-started-with-lodgeit/00/271452)
- **Xero Tax and XPM:**
  - The "Total ATO Debt" idea drew only a response that Xero is "monitoring the interest". — [Xero Product Ideas](https://productideas.xero.com/forums/967133-reports-tax/suggestions/51365269-au-tax-integrate-live-ato-client-account-balance)
  - XPM reporting is oriented to jobs, time and WIP. — [XPM review 2026](https://getuku.com/articles/xero-practice-manager-review/)
  - Workaround: a ledger account for the ICA in each Xero file, which is one client at a time. — [Restaurant Bookkeepers](https://www.restaurantbookkeepers.com.au/how-to-track-my-ato-balance-in-xero/)
- **MYOB:** a 2025 Xero idea for an "Outstanding activity statement report" notes the ATO portal already lists overdue activity statements and ICA balances. A commenter says they are "still using MYOB" to produce such a report. That suggests MYOB AE or Practice has at least a partial cross-client activity statement and ICA view. — [Xero Product Ideas: outstanding AS report](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46192636-au-tax-outstanding-activity-statement-report)
- **FYI and Karbon:** no ATO account-balance integration surfaced. — [search, no result; see Gaps]
- **CCH iFirm:** nothing specific surfaced. — [see Gaps]
- **Remission tooling:**
  - The ATO's GIC remission application form must be submitted in Excel format. One form is needed per taxpayer and interest type, though one GIC form can cover both income tax and activity statement accounts. — [Accountants Desktop: new GIC remission form](https://accountantsdesktop.com.au/blog/news_feed/download-the-new-and-improved-gic-remission-application-form/); [Blackwattle Tax guide](https://blackwattletax.com.au/tax/how-to-request-gic-remission/)
  - Practitioners download the transaction CSV and total GIC by period by hand. — [Blackwattle Tax](https://blackwattletax.com.au/tax/how-to-request-gic-remission/)
  - A tax-law firm sells template letters but warns "there is no formula". — [Waterhouse Tax Lawyers](https://waterhousetaxlawyers.com.au/tax-debt/template-letter-ato-remission-request-gic/)
  - Practice mail lists "Remission of general interest charge (GIC)" as a subject; requests over A$2,500 are escalated to a dedicated team. — [ATO practice mail guide](https://www.ato.gov.au/tax-and-super-professionals/digital-services/online-services-for-agents/online-services-for-agents-user-guide/communication/practice-mail); [ATO: how to request remission](https://www.ato.gov.au/individuals-and-families/your-tax-return/if-you-disagree-with-an-ato-decision/dispute-interest-or-penalties/remission-of-interest-charges/how-to-request-a-remission-of-interest-and-failure-to-lodge-penalties); [ATO small business newsroom](https://www.ato.gov.au/businesses-and-organisations/small-business-newsroom/new-interest-and-ftl-penalty-remission-request-forms)
  - No remission drafting or tracking software was found.

**Policy context added this round**
- **Tax Ombudsman review (March 2026), "In the interest of fairness":** the ATO's approach led to "unduly harsh outcomes". 92% of phone remission requests were approved, against 76% of written ones (trade-press figure; check against the report). Four recommendations were accepted. The ATO had already committed to a centralised GIC decision function and published criteria. PS LA 2011/12 has not been updated since 2015. — [Tax Ombudsman report PDF](https://taxombudsman.gov.au/wp-content/uploads/2026/02/In-the-interest-of-fairness-A-review-into-GIC-remission-Tax-Ombudsman-March-2026.pdf); [SmartCompany](https://smartcompany.com.au/tax/general-interest-charge-ato-agrees-recommendations-ombudsman); [CA ANZ](https://www.charteredaccountantsanz.com/member-services/technical/tax/tax-in-focus/gic-remission-review-released); [CA ANZ on 22 Jan changes](https://www.charteredaccountantsanz.com/member-services/technical/tax/tax-in-focus/first-steps-toward-greater-consistency-in-gic-remissions)
- **GIC imposed:** rose to A$9.4bn in FY2025 (headline). — [AccountingTimes](https://www.accountingtimes.com.au/tax/gic-impositions-soared-to-9-4-billion-in-fy2025-ato-data-reveals)
- **Director penalty notices:** "over 84,000 DPNs to directors of approximately 64,000 companies in 2024–25, a 136 per cent increase". These are secondary advisory sources, not an ATO page. — [Paris Financial](https://www.parisfinancial.com.au/director-penalty-notice-australia/); [HOC](https://www.hoc.com.au/ato-debt-in-2026-director-penalty-notice-risks-for-business-owners/)
- **ATO automation:** law-firm commentary says ATO automation has shortened the lag between non-engagement and DPNs or garnishees. — [Ironbridge Legal](https://ironbridgelegal.com.au/ato-debt-recovery-director-penalty-notices/)
- **Demand signals:** an Eventbrite CPD webinar, "GIC under scrutiny: what the Ombudsman's report means for advisers", shows practitioner demand for remission know-how. — [Eventbrite](https://www.eventbrite.com.au/e/gic-under-scrutiny-what-the-ombudsmans-report-means-for-advisers-tickets-1982854636595)
- **Practitioner criticism:** an ABRT chair called a GIC remission decision evidence of "a failed framework". — [Accountants Daily](https://www.accountantsdaily.com.au/tax-compliance/22453-gic-remission-decision-highlights-a-failed-framework-practitioner-says)
- **No later update:** no September or October 2026 ATO update on the remission backlog surfaced. The ATO remission page was last updated 10 April 2026. — [ATO: how to request remission](https://www.ato.gov.au/individuals-and-families/your-tax-return/if-you-disagree-with-an-ato-decision/dispute-interest-or-penalties/remission-of-interest-charges/how-to-request-a-remission-of-interest-and-failure-to-lodge-penalties)

### Inferences
- **The sector note's kill criterion is not triggered, but is not cleared either.** It said to kill if LodgeiT, GovReports, XPM, MYOB, CCH, FYI or Karbon already shows live all-debt views across clients.
  - GovReports (client account balances plus ATOInsights) and MYOB (activity statement and ICA report) come closest.
  - Both appear to stop at per-client or ICA/activity-statement views, which is the same limitation practitioners complain about. A two-week trial of GovReports ATOInsights and a MYOB AE/Practice walkthrough are mandatory before writing code.
- **The interest forecast removes the hardest analytic step.** CLNTACC's "interest forecast to a future date" means a DSP-connected product could show "GIC you will accrue by date X if unpaid" per client without modelling GIC itself.
- **[Background, unverified]** The OSF tiers some requirements by product type and volume of taxpayer records. A small read-only DSP may be able to self-assess against parts of the framework rather than obtain ISO 27001 up front. This must be confirmed with the Digital Partnership Office.
- **[Inference]** A tool that only ingests reports agents have already downloaded, and never transmits to or from ATO digital services, appears to fall outside the OSF's stated scope. The TPB Code confidentiality duty and Privacy Act obligations still apply, so the product needs a data-processing agreement and Australian hosting from day one.
- **ATOmate is the most dangerous adjacent entrant.** It already has the ATO correspondence feed, debt and DPN messaging, and an XPM/APS install base. Adding "remission decision letter tracking" plus a debt rollup is a short step for it.
- **The 92% (phone) vs 76% (written) gap reframes the remission product.** Its value is lifting written-request success through better-evidenced narratives mapped to PS LA 2011/12 and the ATO case-study categories, not just saving drafting time. That is a measurable outcome a firm can sell to clients.
- **[Background, unverified]** Statement of account (SOA) and Client Communication List (CCL) services exist in SBR for correspondence. If they cover remission decision letters, a DSP version could auto-close the tracking loop. Otherwise tracking stays manual: the user marks the outcome.

### Gaps
- Not hand-checked within budget: CCH iFirm and CCH Integrator, MYOB Practice/AE (exact report scope), BGL CAS 360, Class, APS, FYI and Karbon integration directories, and Ignition. Absence of evidence is not proof.
- Not confirmed: GovReports' official pricing, and whether ATOInsights aggregates across clients.
- Not found: DSP onboarding cost, typical timeline, and whether ISO 27001 is mandatory for a small read-only product.
- Not found: average remission amount, hours spent per request, or post-January 2026 approval rates on the new forms.

---

## Q5. How big is the market, what could practices pay in AUD, and what evidence is there that they pay for similar tools?

### Takeaway
There is still no fresh TPB count, so the sizing remains approximate. The only national BAS agent figure found is "just over 15,000" (2017). Money-at-stake evidence for opportunity 2 strengthened this round: GIC imposed A$9.4bn in FY2025, DPNs reportedly up 136% to about 84,000, and remission requests above 125,000 a year.

AUD price anchors now exist for practice add-ons:
- GovReports ATOInsights at about A$535 a year;
- FYI at A$30–70 per user a month with a 5-user minimum;
- Practice Protect from about US$17 per user;
- Ignition from about US$49;
- Wrkr at A$5–79 per client a month.

These support A$79–349 a month per practice for opportunity 2, and suggest per-client monitoring fees for opportunity 1 would be compared against Wrkr's all-in A$5–79, which includes the payment itself.

### Cited Findings
- **TPB figures:** the TPB's 2024–25 annual report was published as a PDF on 9 October 2025, but registration totals were not retrieved. — [TPB Annual Report 2024–25 (PDF)](https://www.tpb.gov.au/sites/default/files/2025-10/TPB%20annual%20report%20202425.pdf)
- **BAS agents (dated):** "just over 15,000", 77% of them individuals (July 2017). — [Accountants Daily, 2017](https://www.accountantsdaily.com.au/regulation/10485-tpb-reports-healthy-growth-in-bas-agents)
  - This contradicts the sector note's background figure of about 9,000–10,000 BAS agents. The true 2026 figure is unverified.
- **GIC imposed:** A$9.4bn in FY2025. — [AccountingTimes](https://www.accountingtimes.com.au/tax/gic-impositions-soared-to-9-4-billion-in-fy2025-ato-data-reveals)
- **DPNs:** about 84,000 to directors of about 64,000 companies in 2024–25 (secondary). — [Paris Financial](https://www.parisfinancial.com.au/director-penalty-notice-australia/)
- **FYI (AU, ex GST):** Intermediate A$30 per user a month, Elite A$70, minimum 5 users. — [FYI pricing](https://fyi.app/pricing/)
- **Practice Protect:** from US$17 per user (Capterra aggregator). — [Capterra](https://www.capterra.com.au/software/166493/practiceprotect)
- **Ignition:** from US$49, flat rate (Capterra aggregator). — [Capterra](https://www.capterra.com.au/software/140861/ignition)
- **GovReports:** ATOInsights A$534.55 + GST a year; licences A$636–3,528 a year (competitor-sourced). — [Enterprise DNA](https://enterprisedna.co/omni/instead-of/govreports)
- **Wrkr:** A$5–79 per client ABN a month ex GST. — [Wrkr](https://www.wrkr.com.au/payday-super-bookkeepers)

### Inferences
- **Opportunity 2 (ATO debt and remission):**
  - **[Inference]** If roughly 10,000–15,000 practices hold SME clients (sector note, background), and 10–20% have enough debt clients to care, the serviceable market is about 1,500–3,000 practices.
  - At A$150–250 a month that is about A$2.7–9m ARR. This is a solid solo or small-team business, not venture scale.
  - Remission volume (125,000+ a year) averages fewer than 10 per practice a year, so remission must be a *feature* of a recurring debt register, or be priced per pack (about A$29–49), not a standalone subscription.
- **Opportunity 1 (Payday Super):**
  - **[Inference]** Bookkeepers already pay A$5–79 per client a month to Wrkr for payment *plus* tracking, or nothing extra for Xero Auto Super. A read-only monitor without fund-acceptance data would have to price at about A$2–5 per client a month. At 3–10% penetration of about 300,000 SME employers, that gives roughly A$0.2–1.8m ARR, well below the sector note's A$1.1–5.4m.
- **WTP signal:** practices demonstrably pay A$500–4,000+ a year for ATO-connected add-ons (GovReports, ATOmate) and A$1,800+ a year minimum for document and workflow tools (FYI). Paying A$1,200–3,000 a year for a debt and remission console is within the established envelope.

### Gaps
- No verified 2025–26 TPB totals for registered tax agents, BAS agents or entities (the TPB report and data.gov.au register were unreachable).
- No count of practices that run client payroll.
- No ATO collectable-debt figure for 2025–26 was retrieved. **[Background, unverified]** It was about A$50bn+, with roughly two-thirds owed by small businesses, in recent ATO annual reports.
- No ATOmate pricing; GovReports pricing came only from a competitor page.

---

## Q6. For a solo Australian founder (OAuth data sync, SQL, pivots and dashboards, OpenAI integration), which opportunity should go first? Should they be combined? What scope, price, channel and first 10 customers?

### Takeaway
**Build opportunity 2 first** (ATO debt register plus remission packs). Do not build opportunity 1 as a standalone product.

Combine them later at the *ATO-account* layer, not the payroll layer. Under Payday Super, SG failures end up as ATO-raised SGC debts, ICA balances and SG-related DPN risk. Those surface in the same client-account data that opportunity 2 already ingests.

That gives an honest "ATO exceptions desk for practices": debts, GIC/penalty remission, and SGC/DPN exposure, all from ATO data the agent can already export. An optional pre-submission super member-data checker via payroll OAuth can come later if pilots ask for it.

### Cited Findings
- **ATO-account data a v1 can ingest without DSP status:** Accounts summary CSV, client account running balance report, activity statement obligations report. — [OSfA accounts and payments](https://www.ato.gov.au/tax-and-super-professionals/digital-services/online-services-for-agents/online-services-for-agents-user-guide/accounts-and-payments); [OSfA reports](https://www.ato.gov.au/tax-and-super-professionals/digital-services/in-detail/online-services-for-agents-user-guide/reports-and-forms/reports)
- **The DSP upgrade path exists:** CLNTACCSUM and CLNTACC, including interest forecast. — [SBR ACCMGT](https://www.sbr.gov.au/digital-service-providers/developer-tools/australian-taxation-office-ato/obligation-management-oblmgt/account-management-accmgt)
- **Payday Super acceptance data is not reachable** (Q2). — [Xero Product Ideas: all-client super batches](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46609939-xero-hq-report-on-all-client-automatic-superannu); [EH HeroClear batch help](https://help.employmenthero.com/hc/en-au/articles/17426619221903-Batch-superannuation-processing-with-HeroClear)
- **Remission form and lodgment:** Excel form lodged through practice mail; practitioners total GIC by hand from CSV. — [Accountants Desktop](https://accountantsdesktop.com.au/blog/news_feed/download-the-new-and-improved-gic-remission-application-form/); [Blackwattle Tax](https://blackwattletax.com.au/tax/how-to-request-gic-remission/)
- **Reachable early adopters:**
  - Practitioners publicly requesting the feature on Xero ideas. — [Total ATO Debt idea](https://productideas.xero.com/forums/967133-reports-tax/suggestions/51365269-au-tax-integrate-live-ato-client-account-balance); [Outstanding AS report idea](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46192636-au-tax-outstanding-activity-statement-report)
  - Firms marketing DPN and ATO-debt help. — [HOC](https://www.hoc.com.au/ato-debt-in-2026-director-penalty-notice-risks-for-business-owners/); [Paris Financial](https://www.parisfinancial.com.au/director-penalty-notice-australia/); [B&T Advisory](https://www.bandtadvisory.au/director-penalty-notices/)
  - Remission CPD audiences. — [Eventbrite GIC webinar](https://www.eventbrite.com.au/e/gic-under-scrutiny-what-the-ombudsmans-report-means-for-advisers-tickets-1982854636595)

### Inferences
**Recommended v1 scope (about 8–10 weeks, no ATO API, no payroll API)**
1. **Ingest:** drag-and-drop the OSfA CSVs (Accounts summary per client, running balance, activity statement obligations) plus the firm's client list as CSV or via the XPM API.
2. **Cross-client debt register:**
   - by client, account type (income tax, ICA/activity statement, other) and age;
   - estimated GIC accrual at the current quarterly rate;
   - payment-plan and on-hold flags where present in the data;
   - "DPN exposure" flags for companies with overdue PAYGW, GST or SG, or late activity statements (lockdown DPN risk). DPNs are not on company accounts, so the tool flags risk rather than notices.
3. **Remission pack:**
   - GIC-by-period table built from the transaction CSV;
   - pre-filled ATO Excel form;
   - an AI-drafted circumstances narrative mapped to PS LA 2011/12 and the ATO's published case-study categories, with an evidence checklist;
   - a pre-lodgment check that figures reconcile to the account history.
4. **Tracker:**
   - lodged-via-practice-mail date, 50+ day ageing, follow-up reminders;
   - outcome and amount remitted;
   - a "GIC saved for clients" report the firm can use to bill and market.

**v2 and v3**
- **v2:** Xero or MYOB OAuth to reconcile each client's ICA ledger account against the ATO balance (catches unposted GIC and misallocated payments). Watch the Xero tier fees.
- **v2:** start DSP onboarding for live CLNTACCSUM and CLNTACC, including interest forecasts.
- **v3:** an SG module. Flag SGC assessments and SG-driven ICA debits as the ATO starts raising Payday Super SGC (from FY27–28), plus SG-related DPN risk.
- **v3, only if pilots demand it:** a pre-submission super member-data validator via Xero Payroll / EH OAuth.

**Price**
- A$99 a month (up to 50 debt clients), A$199 (up to 200), A$349 (unlimited).
- Or A$39 per remission pack for firms that want it ad hoc.
- Anchored above GovReports ATOInsights (about A$45 a month) because of the workflow and remission outcomes, and below FYI's 5-seat minimum (A$150–350 a month).

**Channel (in order)**
1. Direct outreach to the practitioners on the two or three Xero ideas threads.
2. IPA: small-practice members, vocal on GIC. Offer a CPD session on "winning written GIC remissions after the Ombudsman review".
3. Accountants Daily or AccountingTimes op-ed with anonymised remission-success data.
4. Accountant Facebook and LinkedIn groups.
5. Later: integration listings with XPM, FYI and GovReports. Partnership is more realistic than competing with GovReports.
6. Xero App Store only once the ICA-reconciliation feature exists.
7. ICB and ABSIA matter only for the later SG module.

**First 10 customers**
- 3–4 practitioners from the Xero ideas threads.
- 2–3 small firms that market DPN or ATO-debt services.
- 2 IPA small-practice members recruited via a CPD webinar.
- 1–2 tax-debt or insolvency-adjacent advisers (law firms such as Waterhouse or Blackwattle) as power users and referrers.
- Charge from day one (A$99) after a 30-day pilot, and measure remission success and time per pack.

**Why not opportunity 1 first:** the decisive data (fund acceptance and CTER) is held by clearing houses with no public API. The ATO's year-one leniency mutes urgency until mid-2027. Wrkr and Xero already own the one-pane and at-risk views. The founder would be building a monitor without the signal it needs to monitor.

### Gaps
- No primary interviews: willingness to pay and remission frequency per firm are untested.
- Whether a CSV-ingest tool needs any ATO or TPB notification is unconfirmed (see Q4 inference).
- No evidence yet on whether practices would let a third-party cloud tool hold client ATO account data without client consent wording updates. Check TPB guidance on third-party providers.

---

## Q7. Verdicts, re-scores and kill criteria: keep, downgrade or kill each, and does the combination hold up?

### Takeaway
1. **Payday Super exception desk: DOWNGRADE.** Kill as a standalone product. Keep only as a later SG module fed by ATO-account data, or revive only if a clearing house offers a status/CTER feed.
   - Re-score: **31/60** (average 5.2), down from 6.5 average (about 39/60). Feasibility drops from 8 to 4 on data access.
2. **ATO debt and remission desk: KEEP (conditional).** Re-score: **35/60**. The total is unchanged but now evidence-backed:
   - WTP rises (anchors found);
   - the gap falls (GovReports, HandiTax, MYOB and ATOmate hold adjacent ground);
   - feasibility is confirmed (CSV v1 plus an SBR path including interest forecasts).
   - It must pass the GovReports/MYOB hand-check before build.
3. **Combined "ATO exceptions desk for practices"** (opportunity 2 plus an SG/SGC module from ATO data): **36/60**. It is worth positioning towards, but launch as a debt and remission desk.

### Cited Findings
- **Opportunity 1, data access:** see Q2. — [Xero Product Ideas: all-client super batches](https://productideas.xero.com/forums/967127-practice-tools/suggestions/46609939-xero-hq-report-on-all-client-automatic-superannu); [EH back-end batch data](https://help.employmenthero.com/hc/en-au/articles/17426658559631-How-do-I-view-the-back-end-super-batch-data-on-Payroll-classic); [ATO SuperStream conformance guide](https://softwaredevelopers.ato.gov.au/sites/default/files/2025-12/Conformance_Implementation_Guide_Contributions_V3_FINAL.pdf)
- **Opportunity 1, urgency:** year-one leniency until 30 June 2027. — [ATO first-year page](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/missed-or-late-payday-super-payments/getting-it-right-compliance-in-the-first-year-of-payday-super)
- **Opportunity 1, competitors:** — [Wrkr pricing](https://www.wrkr.com.au/payday-super-bookkeepers); [Xero Payroll Manager claim](https://www.xero.com/au/accountant-bookkeeper-guides/how-to-choose-the-right-payroll-software/)
- **Opportunity 2, data path:** — [SBR ACCMGT](https://www.sbr.gov.au/digital-service-providers/developer-tools/australian-taxation-office-ato/obligation-management-oblmgt/account-management-accmgt); [OSfA reports](https://www.ato.gov.au/tax-and-super-professionals/digital-services/in-detail/online-services-for-agents-user-guide/reports-and-forms/reports)
- **Opportunity 2, adjacent competitors:** — [GovReports](https://www.govreports.com.au/tax-agent); [ATOmate](https://atomate.com.au/atomate/); [HandiSoft](https://help-handisoft.theaccessgroup.com/en/articles/12494503-how-to-retrieve-client-account-information-from-the-ato)
- **Opportunity 2, money at stake:** — [AccountingTimes GIC A$9.4bn](https://www.accountingtimes.com.au/tax/gic-impositions-soared-to-9-4-billion-in-fy2025-ato-data-reveals); [Tax Ombudsman 92% vs 76%](https://smartcompany.com.au/tax/general-interest-charge-ato-agrees-recommendations-ombudsman)

### Inferences
**Re-scores (1–10; judgement on the evidence above)**

| Criterion | (1) Payday Super exception desk | (2) ATO debt + remission desk | Combined ATO exceptions desk (2 + SG module from ATO data) |
|---|---|---|---|
| Pain | 7 (real, but year-one leniency defers the cost) | 7 (50+ day waits, no all-debt view, DPN surge, GIC A$9.4bn) | 7 |
| WTP evidence | 5 (Wrkr/EH charge for rails, not monitoring; Xero Auto Super included) | 6 (GovReports ATOInsights, ATOmate and FYI show practices pay for ATO add-ons; no direct price for this job) | 6 |
| Solution gap | 5 (Xero at-risk overview and Payroll Manager, Wrkr multi-client, Beam/EH validation) | 6 (no all-account cross-client register or remission workflow found; GovReports, MYOB and HandiTax hold the data) | 6 |
| Market size | 7 (≈300,000 SME employers, but a low price ceiling) | 6 (≈1,500–3,000 serviceable practices) | 7 (adds BAS-agent and bookkeeper buyers via SG) |
| Founder feasibility | 4 (no acceptance data; only proxies; Xero tier fees) | 6 (CSV v1 is easy; DSP for live data is a months-long compliance project) | 6 |
| Defensibility | 3 (platforms and clearing houses own the data and channel) | 4 (GovReports, ATOmate and Xero could add a rollup; remission-outcome data and narrative quality are a modest moat) | 4 |
| **Total / 60** | **31** (average 5.2) | **35** (average 5.8) | **36** (average 6.0) |

**Kill criteria: (1) Payday Super exception desk**
- **Already met:** no public API or export for fund acceptance or CTER found from Xero Auto Super, HeroClear, Beam or Wrkr. Do not build standalone.
- **Revive only if** a payroll-agnostic clearing house (Wrkr, Beam, SuperChoice or Ozedi) agrees in writing within about 3 months to a per-client status/CTER feed or partner API.
- **Permanently kill** if Xero ships the Xero HQ all-client super batch report (now "Gaining Support"), or the ATO extends year-one leniency past 30 June 2027.

**Kill criteria: (2) ATO debt and remission desk**
- **Kill or pivot to a remission-only plug-in** if a 2-week GovReports ATOInsights trial, or a MYOB AE/Practice or HandiTax walkthrough, shows a cross-client, all-account debt register with aging and export.
- **Kill** if fewer than 3 of 10 interviewed practices with 20 or more debt clients agree to pay A$99 or more a month after a 30-day pilot.
- **Kill** if pilot practices average fewer than 5 remission requests a year *and* fewer than 10 debt clients (too thin to retain).
- **Kill or rescope** if the ATO announces an OSfA all-debt report, or restores fast phone remission or automatic low-value remission in response to the Ombudsman's recommendations. Remission-workflow pain would then fall away.
- **Stay CSV-only and reassess** if the Digital Partnership Office indicates DSP onboarding needs more than about 9 months or more than about A$30k in certification before revenue. Kill if CSV upload adherence falls below 50% of pilot users in a month (they will not do manual exports).
- **Watch** ATOmate or GovReports announcing debt-rollup or remission tracking. Not an automatic kill, but drop the price and accelerate partnerships.

**On combining:** yes as a roadmap and brand ("ATO exceptions desk"), no as a launch scope.
- The two halves differ in buyer (tax agents versus payroll bookkeepers), data source (ATO exports versus clearing-house state), and cadence (monthly or event-driven versus every pay run).
- They converge once Payday Super failures turn into ATO-raised SGC debts on client accounts, from about FY27–28.

### Gaps
- All verdicts rest on search summaries. No full-page reads were possible and there were no practitioner interviews.
- The most decisive unknowns:
  1. GovReports ATOInsights and MYOB AE/Practice real report scope;
  2. DSP onboarding cost and time for a small read-only product;
  3. whether any clearing house will partner on status data;
  4. per-firm remission frequency and value.
