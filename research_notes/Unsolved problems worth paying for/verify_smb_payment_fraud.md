# Verification: SMB vendor-payment fraud prevention (vendor bank-detail changes, BEC, deepfake executives) and the 2026 Nacha fraud-monitoring rules (as of October 2026)

Method note: 35 web searches were used, the full budget. No primary pages could be opened. WebFetch failed with DNS errors on nacha.org, usbank.com and jpmorgan.com, and curl through the proxy got a 403 policy denial. Reddit and HN are also blocked. Every "Cited Finding" below therefore rests on search-result snippets and summaries of the cited URL, not on a full read of the page. Items marked **[Background knowledge, not verified this session]** come from model knowledge, not this session's sources. This note also corrects two claims in the earlier notes (knowledge_work_ai_era.md): the account-validation claim and the AccountChek claim (see Key Questions 1 and 2).

---

## 1. What exactly do the 2026 Nacha rules require of SMB originators, and are banks pushing the obligations onto business clients?

### Takeaway
The rules are real, and Phase 2 has applied to every non-consumer originator since June 19, 2026 (practically June 22). But the obligation is light and not prescriptive. An originator needs written, risk-based procedures "reasonably intended to identify" entries that are unauthorized or authorized under "False Pretenses", applied in practice and reviewed at least annually. There is no mandated tool, no requirement to screen every entry, and (as far as the snippets show) no account-validation mandate for B2B credits. Wires, where most BEC money is lost, are outside Nacha entirely. Banks are telling clients about the rule, but no evidence was found that banks demand attestations or evidence packs from SMB clients. **The Nacha "compliance forcing function" thesis is much weaker than the earlier notes assumed.**

### Cited Findings
**Rule package and origin**
- Nacha approved the package in March 2024, aimed at "credit push fraud" — [Consumer Financial Services Law Monitor](https://www.consumerfinancialserviceslawmonitor.com/2024/03/nacha-approves-new-rules-to-combat-credit-push-fraud/).
- Before 2026, required monitoring covered only a small set of debits (WEB debits and micro-entries). The new rules extend it to credits, which brings BEC and payroll diversion into scope — [Westamerica Bank PDF](https://www.westamerica.com/wp-content/uploads/2026/02/2026_Nacha-Rule-Changes.pdf); [UCBI](https://www.ucbi.com/business-banking/treasury-management/2026-nacha-rule-changes) (search-summary attribution across this bank result set).

**Phase 1 (effective March 20, 2026)**
- Covers all ODFIs, plus non-consumer Originators, TPSPs and TPSs with 2023 ACH origination volume of 6 million entries or more. These must "establish and implement risk-based processes and procedures reasonably intended to identify ACH Entries initiated due to fraud" — [Nacha Phase 1 page](https://www.nacha.org/rules/risk-management-topics-fraud-monitoring-phase-1); [Pinion](https://www.pinionglobal.com/?p=20275); [Regions](https://www.regions.com/commercial-banking/treasury-management/managing-payments/nacha-rule-changes).
- RDFIs with more than 10M receipts in 2023 must also monitor incoming credits from that date — [ThreatMark](https://www.threatmark.com/nacha-2026-explained/); [WTW](https://www.wtwco.com/en-us/insights/2025/11/navigating-nachas-new-fraud-rules-what-financial-institutions-need-to-know).

**Phase 2 (effective June 19, 2026; practically Monday June 22, because June 19 is a federal holiday)**
- Covers all remaining non-consumer Originators, TPSPs and TPSs regardless of volume, and all RDFIs — [Nacha Phase 2 page](https://www.nacha.org/rules/risk-management-topics-fraud-monitoring-phase-2); [MyLSB bank educational PDF](https://www.mylsb.com/MyLSB/media/Documents/ACH-Educational_260382-unsecure.pdf).
- Some vendors say "June 19" and others "June 22". Both are correct: the rule date versus the practical date.

**Operative standard (as quoted from Nacha's page by a study guide)**
- Covered parties must "establish and implement risk-based processes and procedures, relevant to the role they play, reasonably intended to identify Entries suspected of being unauthorized or authorized under False Pretenses and review them at least annually." Nacha prescribes no specific tool — [Open Exam Prep (AAP study guide)](https://open-exam-prep.com/study-guides/aap-nacha/ach-risk-management-fraud/fraud-monitoring-rules-2026).
- U.S. Bank's client PDF also lists an annual review of established processes — [U.S. Bank](https://www.usbank.com/content/dam/usbank/en/documents/pdfs/corporate-and-commercial-banking/Nacha-USBank-fraud-monitoring-rule-changes.pdf) (snippet only).

**No per-entry screening required**
- The processes "do not require the screening of every ACH transaction individually" — [DefenseStorm](https://defensestorm.com/blogs/everything-you-need-to-know-about-the-2026-nacha-operating-rules-and-regulations/); [Unit21 checklist](https://go.unit21.ai/hubfs/Unit21%20NACHA%20Checklist.pdf).
- Nacha does not require monitoring to happen before origination — [Stampli](https://stampli.com/blog/payments/nacha-operating-rules); [PaymentWorks](https://www.paymentworks.com/pw-resources/nacha-rule-changes-2026-webinar/) (search summary).

**"False Pretenses" definition**
- It means inducing a payment by misrepresenting (a) the person's identity, (b) their association with or authority to act for another person, or (c) the ownership of the account to be credited.
- It excludes scams involving fake, non-existent or poor-quality goods or services. It covers BEC, vendor impersonation and payroll redirection — [Eftsure](https://www.eftsure.com/blog/industry-news/nachas-2026-fraud-monitoring-rules-what-every-finance-team-needs-to-know/); [Sardine](https://www.sardine.ai/whitepapers/the-nacha-2026-mandate); [ThreatMark](https://www.threatmark.com/nacha-2026-explained/).
- A search summary of these sources says Nacha frames the rules as folding these risks into existing fraud programmes "through documented, risk-based procedures", not as separate compliance mandates (summary of the same result set; wording not verified on nacha.org).

**Other 2026 changes**
- Mandatory Company Entry Descriptions "PAYROLL" and "PURCHASE" took effect March 20, 2026 — [Ramp](https://ramp.com/blog/2026-nacha-rule-changes); [UCBI](https://www.ucbi.com/business-banking/treasury-management/2026-nacha-rule-changes) (search summary).
- Bottomline's checklist lists a further change on Sept 18, 2026: a 9:00 a.m. funds-availability/posting item for non-same-day ACH credits. It is unrelated to fraud monitoring — [Bottomline checklist](https://www.bottomline.com/download_file/692d863d-7d2f-4770-9f25-db29e1a79d7d/7635).
- Trustpair says "compliance phases begin in March, June, and September 2026" — [Trustpair](https://trustpair.com/blog/how-to-be-compliant-with-nacha-rules/).

**Account validation: conflicting claims (correction to the earlier notes)**
- Several vendor pages say the 2026 rules "require real time validation of bank accounts before initiating ACH transactions", or require verifying recipient account ownership before B2B payments — [ABC Fitness](https://ignite.abcfitness.com/upcoming-nacha-rule-changes-and-abcs-new-bank-account-validation-solution-effective-march-20-2026/); [Trustpair](https://trustpair.com/blog/how-to-be-compliant-with-nacha-rules/).
- One search summary claimed account verification "before first ACH credits is also required".
- The Nacha rule wording quoted above contains no such mandate. The validation requirement that does exist in the rules (the "commercially reasonable fraudulent transaction detection system", including account validation) applies to **WEB debits** — [PYMNTS on Aliaswire](https://www.pymnts.com/?p=1239719).
- Vendors appear to be blending the older WEB-debit validation rule into the 2026 credit rules. Treat "Nacha requires account validation for vendor credits" as **unverified marketing**.

**Responsibility and banks' role**
- Ramp says compliance "is your responsibility as the originator and can't be fully outsourced to your bank" — [Ramp, May 14 2026](https://ramp.com/blog/2026-nacha-rule-changes).
- ODFIs are expected to "clearly spell out fraud monitoring expectations in their agreements, risk assessments, and oversight of business originators and third-party senders" — [Corebank](https://corebank.com/2026-nacha-rule-changes/) (search-summary attribution; Corebank's guidance covers originator responsibilities under the ODFI agreement).
- Banks sent client-facing notices: [U.S. Bank PDF](https://www.usbank.com/content/dam/usbank/en/documents/pdfs/corporate-and-commercial-banking/Nacha-USBank-fraud-monitoring-rule-changes.pdf), [JPMorgan client webinar deck](https://www.jpmorgan.com/content/dam/jpmorgan/documents/payments/client-resource-center/nacha-rule-changes-client-webinar.pdf), [Regions](https://www.regions.com/commercial-banking/treasury-management/managing-payments/nacha-rule-changes), [UCBI](https://www.ucbi.com/business-banking/treasury-management/2026-nacha-rule-changes), [Alerus](https://www.alerus.com/help/treasury-management-resources/nacha-ach-rule-changes-2/), [Westamerica](https://www.westamerica.com/wp-content/uploads/2026/02/2026_Nacha-Rule-Changes.pdf), [Esquire Bank](https://signature.esquirebank.com/news-and-insights/strengthening-ach-fraud-detection-what-businesses-need-to-know-about-nachas-2026-rule-changes/).
- A targeted search found **no Nacha-issued or ODFI-published attestation questionnaire for business clients** — [search result set incl. Unit21](https://www.unit21.ai/resources/content-downloads/nacha-2o26-fraud-monitoring-rules-fraud-monitoring-checklist) (gated).
- Vendors have piled into Nacha content: Bottomline, Kyriba, Ramp, Stampli, PaymentWorks, Trustpair, Eftsure, Sardine, Unit21, DefenseStorm, DataVisor, Q2, Outseer, Sumsub (URLs throughout this note) — [Outseer](https://otsr.outseer.com/blog/2026-nacha-rule-change-proactive-fraud-monitoring-requirement); [Sumsub](https://sumsub.com/blog/nacha-opearating-rules/); [DataVisor](https://www.datavisor.com/blog/nachas-2026-operating-rules-a-simple-guide-to-mastering-compliance); [Q2](https://www.q2.com/blog/navigating-nachas-2026-rule-changes-how-q2-can-help).

### Inferences
**What an SMB originator must actually do**
- At minimum, a short written procedure for its role. Examples: verify vendor bank changes out of band, dual approval in the bank portal, review unusual payees and amounts. It must be applied in practice and reviewed annually, plus whatever the ODFI agreement adds.
- A template plus a calendar reminder can meet this. A compliance-only product has little to differentiate it, and its price ceiling is low.

**Enforcement**
- Nacha enforces through ODFIs. In practice an SMB faces the rule only if its bank asks, or after a loss when liability is being argued. No evidence was found of banks auditing SMB originators' procedures. The pull comes from fear of loss, not compliance deadlines.

**Wires**
- **[Background knowledge, not verified this session]** Nacha rules govern ACH only. Wires fall under UCC Article 4A and Fedwire/CHIPS rules. IC3 says wires carry the bulk of BEC losses (Key Question 3), so the Nacha hook misses where most of the money goes.

**SMBs paying through AP platforms**
- **[Background knowledge, not verified this session]** When an SMB pays through BILL, Melio, Ramp, AvidXchange or Tipalti, the platform usually originates the ACH, as originator or third-party sender, from its own bank relationship. The platform then carries the Nacha monitoring duty. The SMBs directly obligated as Originators are the ones originating from their own bank portal or treasury module.

**Net assessment**
- The "fresh mandate" in the earlier #1 ranking is overstated.
- It does give a legitimate *conversation opener* ("your bank's new Nacha rule says you need documented fraud-monitoring procedures"). It is not a *budget line*.

### Gaps
- Nacha's own rule text could not be read (DNS/403). The quoted operative sentence comes from a study guide citing Nacha. Nacha's Phase 1 and 2 pages are cited from search snippets only.
- Nacha's enforcement or fine schedule for these rules was not verified. Trustpair publishes penalty figures, which a search summary flagged as needing checking against Nacha.
- Whether any major bank has changed treasury-management or origination agreements to require SMB attestations, evidence, or specific controls (e.g., mandatory callback logs) was not found.
- Whether Nacha issued any 2025 clarifying amendments narrowing the rules was not found. A targeted search returned nothing.
- The number of US businesses that are direct non-consumer ACH Originators (vs. paying via AP platforms) was not found. This is the core TAM input.

---

## 2. Who competes, at what price, and which segments are still unserved?

### Takeaway
The top of the market is consolidating fast around Nacha "Preferred Partner" status and account-ownership data:
- Eftsure has bought Sis ID and Relish and offers a $1M guarantee.
- Trustmi raised a $17M Series A.
- LSEG and Nacha's own Phixius sell account validation.

The bottom of the market already has free or cheap controls: BILL's vendor-confirmation email, bank dual approval, and Xero apps such as VendorAlert at A$9/month. The real gap is narrow. It is **US SMBs (roughly 20–500 staff) on QuickBooks paying from bank portals**. They have no US Confirmation of Payee, no SMB-priced account-ownership check, and no callback workflow that produces evidence. Even there, the price anchor is low and banks or AP platforms can close the gap.

### Cited Findings
**Enterprise and mid-market specialists**
- **Trustpair**
  - Publishes no price list. Pricing is quoted per deployment, in two tiers ("Platform Access" and "Custom Access for enterprises") — [ERP Research](https://erpresearch.com/erp-add-ons/fraud-risk/trustpair/pricing).
  - Capterra lists target companies as 1,001–10,000+ employees — [Capterra](https://www.capterra.ie/software/187396/trustpair).
  - "Hard to justify below roughly 50–100 suppliers" (from the earlier notes) — [FitGap](https://us.fitgap.com/products/trustpair).
  - Markets itself directly as Nacha-compliance software — [Trustpair](https://trustpair.com/?p=23750).
- **Eftsure (Australian-founded)**
  - Pricing is unpublished. It "scales based on 2 factors; annual expenditure and the number of new vendors onboarded monthly" — [Eftsure pricing](https://eftsure.com/pricing).
  - Subscriptions signed after March 10, 2025 include a guarantee of up to $1M if a verified payment is lost to social engineering — [Eftsure pricing](https://eftsure.com/pricing).
  - Capterra: 4.6/5 from 45 reviews; value for money 4.6 — [Capterra UK](https://www.capterra.co.uk/software/216234/eftsure).
- **Eftsure's growth and expansion**
  - The 2025 Sis ID deal (Level Equity-backed) grew its client base from about 2,800 to more than 3,500 organisations and gave it a European foothold.
  - The acquisition of US vendor-data firm Relish took it to more than 4,000 corporate customers and "deepens Eftsure's presence in the US enterprise market".
  - It claims to protect $288B in payments a year and monitor 11M vendors in 190 countries (company-reported) — [Business News Australia](https://www.businessnewsaustralia.com/articles/eftsure-acquires-us-vendor-data-firm-relish-to-build-global-payment-assurance-platform.html).
  - It has launched in Singapore — [DealStreetAsia](https://www.dealstreetasia.com/stories/sea-digest-mceasy-eftsure-491009).
- **Eftsure's early funding was small**
  - A$2M Series A in 2017 — [SmartCompany](https://www.smartcompany.com.au/startupsmart/fintech-eftsure-raises-2-million-tackle-700-million-cost-payment-fraud/).
  - About US$2.5M Series B in 2019 — [Seedtable](https://seedtable.com/companies/eftsure/funding-rounds/series-b-2019-08).
- **Relish**
  - Nacha named Relish a Preferred Partner for account validation, fraud monitoring and risk (May 13, 2026). It validates account existence, ownership and status in real time — [Nacha](https://www.nacha.org/index%2ephp/news/nacha-announces-relish-nacha-preferred-partner-account-validation-fraud-monitoring-and-risk).
- **Trustmi**
  - Nacha Preferred Partner since May 11, 2026. It builds per-vendor payment baselines and flags or blocks deviations before ACH entries are created — [Nacha](https://nacha.org/news/trustmi-now-nacha-preferred-partner-risk-and-fraud-prevention-fraud-monitoring-and-account); [BusinessWire](https://secure.businesswire.com/news/home/20260511550725/en/Trustmi-Now-a-Nacha-Preferred-Partner-for-Risk-and-Fraud-Prevention-Fraud-Monitoring-and-Account-Validation).
  - $17M Series A (Cyberstarts, Zeev Ventures), about 64 employees, enterprise customers including Colgate-Palmolive, Monday.com and CNA — [yespress profile](https://yespress.io/trustmi) (third-party profile).

**Account-ownership and validation data**
- **Phixius (Nacha):** expanded bank-account validation coverage via Validifi in April 2025 — [BusinessWire](https://businesswire.com/news/home/20250427801940/en/phixius-by-nacha-expands-bank-account-validation-coverage-with-validifi). No 2026 status or pricing found.
- **LSEG Risk Intelligence:** API checks of vendor accounts (valid, in good standing, authorised party); described as a Nacha Preferred Partner — [LSEG](https://lseg.com/en/risk-intelligence/account-verification-solutions).
- **Aliaswire:** validation, including ownership matching, sold to banks and their commercial clients — [PYMNTS](https://www.pymnts.com/?p=1239719).
- **Socure Account Intelligence and CSG Forte "Authenticate":** both check that a personal or business name matches the account owner — [SoftwareOne listing](https://platform.softwareone.com/product/socure-account-intelligence/PCP-9333-7629); [Forte](https://www.forte.net/insights/bank-account-verification). No pricing found.
- **Early Warning (bank-owned):** real-time checks on whether an account is open and active and whether the transactor is authorised — [Early Warning eBook, 2021](https://www.earlywarning.com/sites/default/files/2021-06/Early%20Warning%20Account%20Validation%20eBook.pdf) (older data).
- **Bank of America (2021):** launched Account Validation for corporate and public-sector clients, covering account status and owner authentication before ACH, wire or RTP — [BofA newsroom](https://newsroom.bankofamerica.com/content/newsroom/press-releases/2021/10/bofa-launches-account-validation-to-assist-clients-with-fraud-pr.html) (older data).
- **Limits of verification:** a South Carolina state contract notes such services "can neither guarantee nor confirm" a payee's ownership of a deposit account — [SC Treasurer schedule](https://treasurer.sc.gov/media/82135/schedule-n.pdf).
- **Industry context:** firms that usually catch fraud before settlement mostly use instant bank account verification (81%) and open-banking ownership verification (76%) — [PYMNTS](https://www.pymnts.com/?p=3716462).
- **Correction to the earlier notes:** **AccountChek** is a lender-facing service for collecting digital bank statements (Fannie Mae Day 1 Certainty), not an AP vendor-verification tool — [Informative Research](https://www.informativeresearch.com/accountchek). The earlier note calling it "usage-based bank-ownership checks at payment time" looks wrong.

**Controls built into AP and spend platforms**
- **BILL:** when a user changes a vendor's bank details, BILL emails the vendor to confirm. The vendor can click "I didn't request this change". Confirmation **is not required** before payments are scheduled — [BILL help](https://vendorpayhelp.bill.com/hc/en-us/articles/360056648731).
- **Melio (QuickBooks bill pay):** QuickBooks community users report that vendors can change payment method without the payer knowing, and that funds were taken via push-to-debit after a vendor's email was compromised. Melio reportedly would not say where funds went without a subpoena (anecdotal) — [QuickBooks Community](https://quickbooks.intuit.com/community/other-questions-9/melio-unauthorized-entries-and-changes-to-bills-in-qbo-78252); [QuickBooks Community 2](https://quickbooks.intuit.com/learn-support/en-us/reports-and-accounting/re-issues-with-melio/01/1373445/highlight/true).
- **Tipalti:** markets "instant payment detail validation", payee-data monitoring and OFAC screening — [Tipalti](https://tipalti.com/vendor-validation-software-ptr/).
- **AvidXchange:** lists OFAC screening, audit trails, "e-validation" and 24/7 fraud monitoring — [AvidXchange](https://www.avidxchange.com/?p=36421).
- **Ramp and Stampli:** both publish Nacha guidance — [Ramp](https://ramp.com/blog/2026-nacha-rule-changes); [Stampli](https://stampli.com/blog/payments/nacha-operating-rules). Their specific bank-change controls were not found.
- **Corpay:** says manual banking-change verification is unreliable because it "depends on someone deciding to make the call" and degrades under volume — [Corpay, July 2026](https://www.corpay.com/resources/blog/vendor-verification-banking-validation).
- **Gatekeeper:** sells a "bank details validator" that screens vendor bank-detail changes — [Gatekeeper](https://www.gatekeeperhq.com/blog/bank-details-validator-screen-vendor-bank-detail-changes-against-fraud-patterns-before-payment).

**Xero, QuickBooks and Australian SMB tools (the low end is not empty)**
- **VendorAlert (Xero app):** read-only monitoring of contact bank details, with alerts on change about every 6 hours. Costs **A$9/month per Xero organisation** including GST — [Xero App Store](https://apps.xero.com/app/vendoralert).
- **Xbert:** has a "contact bank account changed" alert — [Xbert](https://support.xbert.io/en/articles/11069292-contact-bank-account-changed).
- **ApprovalMax:** "Fraud Detection" emails admins about changes made in Xero after approval, including supplier fields — [ApprovalMax](https://support.approvalmax.com/en/articles/413344-fraud-detection-changes-made-after-approval).
- **Xero:** a request for native bank-change notifications was answered "not planned in the near future" (date unclear) — [Xero Product Ideas](https://productideas.xero.com/forums/967130-contacts-files/suggestions/44961181-contact-notify-all-users-or-nominated-users-when?page=3).
- **OK2Pay (Australia):** payee verification with ABN/GST monitoring at A$195/month (API), A$395 (Starter) and A$595 (Growth) — [Capterra](https://www.capterra.com/p/10042652/OK2Pay/).
- **PayOK (Australia):** founded by CreditorWatch's founder. Raised $3M at a $10M valuation (date unclear). It is a bank-side name/account validation API, and its G2 profile has been inactive for more than a year — [SmartCompany](https://www.smartcompany.com.au/startupsmart/pay-ok-creditorwatch-founder-sme-invoice-scams/); [G2](https://www.g2.com/products/payok/pricing).

**Email security (the inbox side of BEC)**
- **Abnormal:** median annual spend $41,360 across 42 purchases; a $3/user/month list figure conflicts with this — [Costbench](https://costbench.com/software/email-security/abnormal-security/).
- **IRONSCALES:** 50-user minimum. AWS Marketplace prices are $3,600–$6,000/year for 50 users; Capterra figures of $3.89–$7.29/user/month conflict — [Toolradar](https://toolradar.com/tools/ironscales/pricing); [Capterra](https://capterra.com/p/201112/IRONSCALES/).

**Deepfake and identity**
- **Nametag:** its "Deepfake Defense" targets identity verification for helpdesk and IAM, with a Beyond Identity partnership. It is not specific to payments — [Mobile ID World](https://mobileidworld.com/beyond-identity-partners-with-nametag-to-combat-deepfake-threats-in-identity-management/).

**Startups**
- No YC or 2025–26 seed-stage SMB payment-verification startup surfaced in two searches — [search result set](https://www.kognitos.com/blog/vendor-payment-fraud-bank-detail-change-bec-ap-controls-2026/). This means there is no visible new entrant, but it also fits the possibility that founders and VCs see the SMB tier as unattractive.

### Inferences
**Market structure: a barbell**
- At the top, enterprise vendors (Eftsure+Relish+Sis ID, Trustpair, Trustmi, LSEG, Kyriba, Bottomline) compete on ownership data, ERP connectors and guarantees.
- At the bottom, free platform features (BILL), bank dual approval and A$9/month Xero alert apps cover "detect the change".
- What nobody serves at SMB price in the **US** is "**verify ownership of the new account plus enforce and log the callback**".

**Unserved segment**
- US companies with roughly 20–500 staff, on QuickBooks Online or Desktop, paying vendors by ACH or wire from their own bank portal (not BILL, Melio or Ramp), often with an outsourced bookkeeper.
- Xero users in AU and NZ are partly served (VendorAlert, CoP). AP-platform users get platform controls.

**Why the gap may persist**
- US account-ownership data sits with bank-owned Early Warning, LSEG, Phixius/Validifi and Plaid-type networks. These sell to banks and enterprises.
- A 1–5 person team would resell per-check data with thin margins, and needs a partner to say yes.

**Why the gap may close**
- **[Background knowledge, not verified this session]** Xero agreed to buy Melio (announced June 2025, about US$2.5B), giving Xero a US payments product it could fold bank-change verification into.
- Intuit and BILL have the data exhaust (millions of vendor records) to build network-level "known-good account" checks, as Eftsure does.

**Eftsure's $1M guarantee**
- It sets a customer expectation that a small entrant cannot match without an insurance partner.

### Gaps
- No list pricing found for Trustpair, Eftsure, Trustmi, Phixius, LSEG, Socure, Forte, Early Warning or bank account-validation services. Per-check data cost, the key unit-economics input, is unknown.
- Paymode (Bottomline), Corpay's payee verification and Plaid's account-ownership product for B2B payments were not checked this session (search budget).
- No US QuickBooks-ecosystem equivalent of VendorAlert was found or ruled out. Intuit's native vendor bank-change controls were not verified.
- Ramp, Brex and Stampli bank-change verification controls were not found.
- No YC directory check was possible (blocked).
- The date and price of the Eftsure–Relish acquisition were not in the snippets. The Relish Nacha listing dates (April/May 2026) suggest 2026.

---

## 3. Is there evidence that SMBs pay for this: losses, insurance conditions, service providers, user complaints?

### Takeaway
Loss severity is high, which supports willingness to pay in principle:
- Mean BEC loss per IC3 complaint was about $123k in 2025.
- Coalition's average initial funds-transfer-fraud loss was $185k in 2024.
- BEC plus FTF made up 58% of Coalition's 2025 claims.

Insurers' social-engineering coverage often depends on documented callback verification, which is a concrete reason to want logged evidence. But no direct evidence was found of SMBs paying a standalone vendor for payment verification, or of MSPs or accountants selling it as a priced service. The demand is real but mostly **latent and incident-driven**.

### Cited Findings
**FBI IC3 2025 (secondary reports)**
- 24,768 BEC complaints and about $3.047B in reported losses. Complaints rose 15.5% and losses rose 10%.
- BEC was the #2 loss category after investment fraud (about $8.65B). Wires made up the bulk of BEC fraud — [McDonald Hopkins](https://www.mcdonaldhopkins.com/insights/news/the-sobering-truth-of-the-fbis-2025-internet-crime-complaint-center-report); [CyberScoop](https://cyberscoop.com/fbi-internet-crime-complaint-center-annual-cybercrime-report/).
- Totals conflict: $20.877B ([MacMyths](https://macmyths.com/cybercrime-losses-jumped-26-to-20-9-billion-in-2025-fbi-says-but-scams-drove-most-of-the-increase/)) versus $17.6B ([gBlock](https://www.gblock.app/articles/fbi-ic3-17-billion-cyber-fraud-2025)).

**AFP 2026 Payments Fraud and Control Survey (covers 2025 activity)**
- 465 respondents. More than 75% of US firms experienced payments fraud in 2025 — [AFP press release](https://www.financialprofessionals.org/about/learn-more/press-releases/Details/over-75-percent-of-us-firms-experienced-payments-fraud-in-2025-while-ai-adoption-for-fraud-mitigation-lags); [AFP report page](https://www.financialprofessionals.org/publications-data-tools/reports/survey-research-economic-data/Details/payments-fraud).
- BEC prevalence is reported as 74% (press release) and as "70% … top avenue" (AFP staff article). The figures conflict or measure different things — [AFP article](https://www.financialprofessionals.org/training-resources/resources/articles/Details/from-bec-to-deepfakes-payments-fraud-is-only-getting-more-sophisticated).
- The report flags concern about voice and video impersonation of executives and vendors — [Truist key highlights](https://www.truist.com/content/dam/truist-bank/us/en/documents/info/cci/2026-afp-payments-fraud-control-survey-report-key-highlights.pdf).
- Vendor-imposter fraud was 45% in AFP's **2024** survey (secondary, older) — [DeepStrike](https://deepstrike.io/blog/business-email-compromise-statistics-2026).

**Coalition (cyber insurer, heavy SMB book)**
- BEC plus FTF were 58% of claims in the 2026 Cyber Claims Report (secondary) — [Stingrai](https://www.stingrai.io/blog/business-email-compromise-statistics-2026).
- Average initial FTF loss was $185k in 2024 (2025 report) and $278k in 2023 — [Coalition](https://www.coalitioninc.com/blog/insurance/new-claims-report-sees-sharp-increase-in-funds-transfer-fraud-attacks); [Osterman Research](https://ostermanresearch.com/2025/03/25/coalition-cyber-claims-2024/).
- Median small-business claim (all claim types) was about $38k (secondary, citing Coalition 2026) — [Stingrai SMB](https://www.stingrai.io/blog/small-business-cybersecurity-statistics-2026).

**Insurance conditions**
- Some social-engineering endorsements require callback or other documented verification. The requirement varies: every transaction, internal or external only, above a dollar threshold, or none.
- Cyber policies without callback requirements are "becoming less and less available as claims increase" — [BankDirector](https://www.bankdirector.com/?p=5427); [Amwins](https://www.amwins.com/resources-and-insights/market-insights/article/how-cyber-and-crime-insurance-policies-respond-to-social-engineering).
- A New Jersey court denied "Fraudulently Induced Transfers" coverage because the insured skipped precautions that were conditions precedent — [Ward and Smith](https://www.wardandsmith.com/article/social-engineering-fraud-and-your-crime-policy-why-your-insurer-may-deny-the-claim-and-what-you-can-do-about-it).
- In a Quebec case an insured was left with only a $50k social-engineering sublimit — [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/d63f30d3/quebec-superior-court-provides-useful-guidance-regarding-social-engineering-fraud).
- Small crime sublimits on property policies create false security — [Rough Notes](https://roughnotes.com/modern-day-crime-coverage-issues/).
- Brokers are asking for higher social-engineering limits — [Insurance Business](https://www.insurancebusinessmag.com/ca/news/professional-liability/brokers-are-asking-for-higher-social-engineering-fraud-limits-585525.aspx).
- At-Bay's client handout tells insureds to verify payment-instruction changes under their protocols. No underwriting question was found — [At-Bay PDF](https://www.at-bay.com/wp-content/uploads/2024/12/At-Bay-8-Warning-Signs-of-Financial-Fraud.pdf).
- Travelers and Corvus publish out-of-band verification guidance for funds transfers — [Travelers](https://www.travelers.com/cyber-knowledge/cybersecurity-best-practices/securing-funds-transfers-out-of-band-authentication-and-other-considerations); [Corvus](https://www.corvusinsurance.com/resources/risk-prevention/funds-transfer-fraud).

**MSPs and accountants**
- Thread, a PSA/helpdesk platform used by MSPs, ships a "vendor fraud / BEC alert" runbook: "BEC is a money problem before it is an email problem. Put the funds first — freeze, recall". This shows MSPs get pulled into BEC incidents — [Thread docs](https://docs.getthread.com/skill-library/security/vendor-fraud-bec-alert).
- Accounting-adjacent content marketing on BEC AP controls, 2026 — [Beancount.io](https://beancount.io/blog/2026/07/03/business-email-compromise-accounts-payable-controls-stop-wire-fraud-guide).
- No priced MSP or accounting-firm "payment verification" service was found.

**Victim anecdotes**
- In one Australian case, the business checked that the sender's email matched the supplier's and was still defrauded. It found out only when the supplier phoned — [Scamwatch](https://www.scamwatch.gov.au/node/565).
- A US bank case study recovered only part of a wire through recall — [FirstBank](https://www.firstbank.com/resources/learning-center/a-business-scam-story-the-vendor-email-that-changed-everything/).
- A UK engineering firm lost money after a supplier's email server was compromised — [UK Financial Ombudsman](https://financial-ombudsman.org.uk/decisions-case-studies/case-studies/invoice-intercept-scam-deceives-engineering-company).
- An Australian small business lost $500k to an invoice scam — [SmartCompany](https://www.smartcompany.com.au/business-advice/small-business-hit-by-500-0000-invoice-scam-accc-issues-warning/).
- QuickBooks and Melio forum complaints — see Key Question 2.

### Inferences
- **Mean loss per incident:** $3.047B / 24,768 ≈ **$123k** per IC3 BEC complaint (computed). The mean is skewed by large cases, and the SMB median is probably much lower (Coalition's all-claims SMB median is about $38k). Even so, a $50–$200/month tool pays for itself if it prevents one incident every several years. The ROI story is easy. The problem is *urgency before the first incident*.
- **Insurance-conditioned evidence is the strongest willingness-to-pay lever found.** A product that turns each bank-change callback into a time-stamped, tamper-evident record could protect coverage. Insurers or MGAs could also use it as a premium credit or a condition. This hypothesis is not yet validated with any insurer.
- **MSPs handle the aftermath, not prevention.** The prevention controls (callbacks, dual approval, vendor-master change control) sit in finance processes MSPs don't own. That makes outsourced accountants and bookkeepers a better channel than MSPs.

### Gaps
- No SMB-specific BEC loss distribution (median by company size) from IC3, AFP or Coalition.
- No primary Reddit (r/msp, r/Accounting, r/smallbusiness) quotes, because Reddit is blocked. No direct "I'd pay $X" evidence.
- No insurer evidence (Coalition, At-Bay, Chubb) of premium credits or underwriting questions tied to vendor bank-change verification.
- AFP's 2026 vendor-impersonation percentage was not found.
- No pricing or packaging found for MSPs or accounting firms selling payment-fraud controls.

---

## 4. Australia and UK: does Confirmation of Payee solve the problem and kill the opportunity?

### Takeaway
In the UK, Confirmation of Payee (CoP), mandated from 2020, plus APP reimbursement has pushed invoice and mandate-redirection fraud to record lows (£41.3M and 2,305 cases in 2025). That strongly suggests bank-run name-checking commoditises the "is this account really the vendor's?" check. Australia's CoP launched in July 2025, ran more than 150M checks in its first year, and is rolling out to business payments through 2026. Australian payment-redirection losses (A$166.8M in 2025, +9%) are the opportunity Eftsure was built on, and CoP is now eroding it. **CoP does largely kill the account-matching wedge in the UK and Australia.** Workflow, evidence and deepfake-executive controls remain, but at thin margins. The US has no CoP equivalent, which is the only reason a US wedge survives.

### Cited Findings
**Australia: losses**
- Payment-redirection losses were A$166.8M in 2025, up from A$152.6M in 2024. It is the fifth-largest category and one of the few top-five categories that grew.
- Combined reported scam losses were A$2.18B (+7.8%). False billing was the most-reported scam type for small businesses — [Scamwatch Targeting Scams](https://www.scamwatch.gov.au/research-and-resources/targeting-scams-report); [Eftsure blog](https://www.eftsure.com/blog/industry-news/$167m-lost-in-2025-why-bec-scams-keep-costing-australians/).
- An earlier-year press report put payment-redirection losses at A$227M, with the ACCC calling for CoP — [Countryman](https://www.countryman.com.au/business/227m-stolen-in-payment-redirection-swindles-says-accc-c-7436221) (older data).

**Australia: Confirmation of Payee**
- Live with more than 100 institutions, with more than 150M checks in its first year.
- AP+ says businesses are adopting it "from onboarding to completing comprehensive back-book checks". Business rollout continues through 2026, with Westpac among the first for business customers — [eCommerceNews](https://ecommercenews.com.au/story/confirmation-of-payee-passes-150-million-checks-in-year); [AP+](https://www.auspayplus.com.au/?p=8854); [Australian Banking Association](https://www.ausbanking.org.au/scam-safe-accord/confirmation-of-payee/).
- Launched July 2025, with major banks early and nationwide coverage targeted for December 2025 — [Pay.UK commentary](https://www.wearepay.uk/shaping-payments-in-australia/).
- CommBank returns match, close-match and no-match results — [CommBank](https://www.commbank.com.au/support/security/confirmation-of-payee.html).
- Revolut notes a match "is not a guarantee that your payment will be sent to a legitimate recipient" — [Revolut](https://help.revolut.com/help/transfers/outbound-transfers/how-to-send-money-to-another-bank/what-recipient-account-details-do-i-need/confirmation-of-payee/how-to-decide-if-a-payment-is-safe/).

**Australia: Scams Prevention Framework**
- The Act passed on February 13, 2025.
- The sector designation instrument took effect around May 23, 2026, covering banks, telcos and certain digital platforms.
- The bank sector code is still an exposure draft. Draft examples include banks confirming payees' identity. Consultation closed June 25, 2026.
- Key bank obligations apply from the earliest of March 31, 2027. Fines are up to A$50M, with the ACCC as general regulator — [HSF Kramer, June 2026](https://www.hsfkramer.com/insights/2026-06/stage-1-of-the-scams-prevention-framework); [Netcraft](https://www.netcraft.com/blog/australia-scams-prevention-framework-what-the-new-obligations-mean-for-banks); [Gilbert + Tobin](https://www.gtlaw.com.au/insights/the-scams-prevention-framework-legislation-passes-parliament-time-to-get-your-house-in-order).

**UK**
- UK Finance figures for 2025 (secondary): APP losses of £576.4M (+19%) across 248,070 cases.
- Invoice and mandate scams hit their "lowest loss and case totals ever reported": £41.3M and 2,305 cases.
- The same article says they are "just under a quarter of APP losses, compared with more than half in 2020". This is **internally inconsistent**: £41.3M is about 7% of £576.4M — [IBTimes](https://www.ibtimes.co.uk/cfo-prevents-invoice-scam-1817723).
- Invoice fraud was £50.3M in 2023 (+2%) — [BPCA citing UK Finance](https://bpca.org.uk/news-and-blog/what-is-invoice-fraud-and-how-does-it-affect-traders).
- The UK regulator mandated CoP for the nine largest banks in 2020 — [Sis ID](https://sis-id.com/en/2024/07/confirmation-of-payee).
- APP reimbursement (from October 7, 2024): mandatory refunds up to £85k, split between sending and receiving banks.
- It covers individuals, micro-enterprises (fewer than 10 employees and under £2M turnover) and small charities. **Larger businesses are not covered** — [IBTimes](https://www.ibtimes.co.uk/cfo-prevents-invoice-scam-1817723); [BPCA](https://bpca.org.uk/news-and-blog/what-is-invoice-fraud-and-how-does-it-affect-traders) (search-summary attribution).

**US**
- A search for any US CoP, name-matching mandate or Federal Reserve initiative returned nothing relevant — [search result set, e.g. Sis ID](https://sis-id.com/en/2024/07/confirmation-of-payee).

### Inferences
**CoP's effect**
- The UK record low in invoice and mandate fraud, 5+ years after CoP, plus Australia's rapid CoP adoption, suggests bank-provided name-account matching removes most of the simple "change of bank details" fraud.
- In the UK and Australia, a standalone SMB account-verification product would compete with a free bank feature.
- The remaining UK/AU value: international payees, mule accounts opened in a lookalike company name (CoP returns a "match"), deepfake-executive requests for internal approval, and evidence and workflow. These are thinner wedges.

**Eftsure's trajectory**
- Its acquisitions (Sis ID in Europe, Relish in the US) and Singapore launch look consistent with an incumbent diversifying away from a home market where CoP is commoditising its core check. This is inference, not company-stated.

**Who is left exposed**
- UK businesses with 10+ employees or more than £2M turnover fall outside mandatory reimbursement, so mid-sized UK firms still bear losses. But CoP has already cut incidence there.

**Background knowledge (not verified this session)**
- The EU Instant Payments Regulation required Verification of Payee for euro credit transfers from October 9, 2025.
- Australia's SPF definition of "SPF consumer" is understood to include small businesses (under 100 employees). Both unverified.

**Net**
- **Australia and the UK should not be secondary markets for a 1–5 person team.** The US is the only one of the three markets without bank-level payee matching.

### Gaps
- UK Finance's 2025 Annual Fraud Report was not read directly. The invoice/mandate share is inconsistent in the secondary source.
- No Pay.UK data on CoP's effect on business (B2B) payments specifically.
- How many Australian business-banking channels (bulk ABA file payments, business portals) run CoP on each payment versus only at payee setup was not determined. This matters because B2B bulk files may bypass CoP. AP+ mentions "back-book checks", which suggests partial coverage.
- No Eftsure AU/NZ pricing found. The Eftsure Australian Payment Fraud Index 2026 exists but its contents were not retrieved — [Eftsure](https://www.eftsure.com/en-au/statistics/payment-fraud-index/).
- Whether the US Federal Reserve or industry has a CoP-like initiative in progress was not determined. One search returned nothing.

---

## 5. Best wedge, channel, realistic price and kill criteria for a 1–5 person team — and the verdict

### Takeaway
**Verdict: DOWNGRADE, not kill outright. It is no longer a clear #1.**
- Three pillars of the earlier ranking failed verification:
  - Nacha's obligations on SMB originators are light, tool-agnostic and don't cover wires.
  - The low end already has cheap or free controls (BILL confirmation emails, A$9/month Xero alerts, bank dual approval).
  - CoP has commoditised account matching in the UK and Australia, while incumbents with ownership data and guarantees are consolidating in the US.
- What survives is a narrow, US-only wedge: **a multi-client "vendor bank-change firewall" sold through outsourced accounting firms**. It would combine QuickBooks vendor-master change detection, an enforced and logged callback to the number on file, an optional per-check account-ownership lookup via a data partner, and auto-generated Nacha procedures plus insurer-grade evidence.
- Realistic price is about $25–$99 per client entity per month. That makes a viable small business but probably not a venture-scale one. Re-scoring with the earlier rubric drops it from about 40/60 to about 32–34/60 (inference), roughly level with the #2 and #3 candidates.

### Cited Findings
**Price anchors**
- VendorAlert: A$9/month per Xero organisation for bank-change alerts — [Xero App Store](https://apps.xero.com/app/vendoralert).
- OK2Pay: A$195–A$595/month for AU payee verification — [Capterra](https://www.capterra.com/p/10042652/OK2Pay/).
- IRONSCALES: about $3,600–$6,000/year for 50 users — [Toolradar](https://toolradar.com/tools/ironscales/pricing).
- Abnormal: median $41,360/year — [Costbench](https://costbench.com/software/email-security/abnormal-security/).
- Eftsure and Trustpair: quote-only, scaling with spend and vendor volume — [Eftsure](https://eftsure.com/pricing); [ERP Research](https://erpresearch.com/erp-add-ons/fraud-risk/trustpair/pricing).

**Free and bundled substitutes**
- BILL's vendor-confirmation email (not required before payment) — [BILL](https://vendorpayhelp.bill.com/hc/en-us/articles/360056648731).
- Bank-recommended dual authorisation and limits for ACH and wires — [Busey Bank](https://www.busey.com/assets/files/lUaxxgC0/PaymentsFraudTrendsPrevention.pdf).
- BofA account validation for corporate clients — [BofA](https://newsroom.bankofamerica.com/content/newsroom/press-releases/2021/10/bofa-launches-account-validation-to-assist-clients-with-fraud-pr.html).

**Weakness of manual callbacks (the opening for enforced workflow)**
- Manual verification degrades because it "depends on someone deciding to make the call" — [Corpay](https://www.corpay.com/resources/blog/vendor-verification-banking-validation).
- A callback to a number taken from the change request is not independent — [Thread runbook](https://docs.getthread.com/skill-library/security/vendor-fraud-bec-alert).

**Insurance lever**
- Callback conditions in social-engineering cover, and denial where precautions were skipped — [BankDirector](https://www.bankdirector.com/?p=5427); [Ward and Smith](https://www.wardandsmith.com/article/social-engineering-fraud-and-your-crime-policy-why-your-insurer-may-deny-the-claim-and-what-you-can-do-about-it).

**Incumbent pressure**
- Eftsure has 4,000+ customers after acquiring Relish and Sis ID, and offers a $1M guarantee — [Business News Australia](https://www.businessnewsaustralia.com/articles/eftsure-acquires-us-vendor-data-firm-relish-to-build-global-payment-assurance-platform.html); [Eftsure pricing](https://eftsure.com/pricing).
- Trustmi and Relish became Nacha Preferred Partners in May 2026 — [Nacha/Trustmi](https://nacha.org/news/trustmi-now-nacha-preferred-partner-risk-and-fraud-prevention-fraud-monitoring-and-account); [Nacha/Relish](https://www.nacha.org/index%2ephp/news/nacha-announces-relish-nacha-preferred-partner-account-validation-fraud-monitoring-and-risk).

### Inferences
**Best wedge (if pursued)**
- **Buyer and channel:** outsourced accounting, bookkeeping and client-advisory firms that run AP for many US SMB clients. Fractional CFO firms are the secondary channel.
- **Why that channel:**
  - The firm itself is often the party keying vendor bank changes, so it carries the reputational and possibly legal exposure.
  - One sale covers 20–200 client entities.
  - Such firms already resell apps per client.
- **Core product:**
  - (1) Watch QuickBooks Online (and Xero) vendor records for bank-detail changes, which needs a US equivalent of VendorAlert.
  - (2) Block or hold the change until a callback to the pre-existing number on file is completed and logged: who, when, number, outcome, optional recording.
  - (3) Optional per-check ownership verification via a data partner such as Phixius/Validifi, LSEG, Socure or Forte, priced as pass-through.
  - (4) Auto-generate the client's written "Nacha risk-based fraud monitoring procedures" plus an annual-review record.
  - (5) Export an insurer-ready evidence log for social-engineering claims.
- **Deepfake-executive add-on:** for internal "CEO says pay now" requests, require a pre-registered out-of-band approval, such as a passkey or app push to the real executive, for payments above a threshold. Note that banks' dual-approval tokens partly cover this already.

**Price**
- About $25–$49 per entity per month wholesale to firms, which mark up. About $99–$199 per month direct to a 50–500 staff company.
- Plus per-check ownership-verification fees.
- Anything above about $300/month competes with Eftsure and Trustpair's lower tiers and with OK2Pay-style pricing.

**Channel ranking**
- (1) Accounting and bookkeeping firms.
- (2) Cyber-insurance MGAs and brokers, as an endorsed control or premium credit. This would be the strongest pull if one insurer agrees.
- (3) MSPs, who handle incidents but don't own finance workflows.
- (4) Banks: unlikely buyers. They would build or buy enterprise vendors and are a bundling threat.

**Kill criteria (any one should stop the effort)**
- 1. Twenty discovery calls with US accounting firms and 50–500 staff controllers show fewer than about 30% willing to pay $25+ per entity per month, or most say "our bank's template and dual approval are enough for Nacha".
- 2. No data partner (Phixius/Validifi, LSEG, Socure, Forte, Plaid) will sell per-check US business account-ownership verification at a cost that leaves at least 60% gross margin at SMB price points.
- 3. Intuit (QuickBooks or Bill Pay), Xero+Melio or BILL ships native bank-change holds with vendor callback, or makes BILL's confirmation mandatory.
- 4. Three or more top-10 US banks bundle payee account-ownership checks into SMB business online banking at no or low cost, or a US CoP/name-match scheme is announced by Nacha, Early Warning, The Clearing House or the Fed.
- 5. No cyber insurer or MGA will recognise the evidence log (premium credit, sublimit uplift or underwriting acceptance) within 6 months of approach.
- 6. Eftsure or Trustpair launch a self-serve SMB tier at or below about $200/month with a guarantee.

**Positioning against the earlier memo**
- Keep the problem on the shortlist, but reframe it as "SMB finance-process fraud controls sold through accountants (US only)", not "Nacha compliance".
- Stop treating Australia and the UK as expansion markets.
- The earlier memo's TAM (300k–1M obligated originators × $100–$400/month) is unsupported. The originator count is unverified, and the price range is above the observed SMB anchors.

### Gaps
- The direct-originator count is unverified, so there is no defensible TAM. Neither is the share of SMBs paying from bank portals versus AP platforms.
- No insurer or accounting-firm interviews or quotes, and no forum evidence of willingness to pay.
- Per-check costs for US account-ownership data are unknown, so unit economics are unverified.
- Liability and regulation (e.g., whether "verified" status creates negligence exposure when fraud still occurs) were not researched.
- The status of Xero–Melio integration and any Intuit roadmap for vendor-change verification was not verified this session.
