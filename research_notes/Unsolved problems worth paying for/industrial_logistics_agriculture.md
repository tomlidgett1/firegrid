# Unsolved, high-willingness-to-pay problems: industrial, logistics/supply chain, trucking, agriculture, food, mining, automotive, aviation, maritime (as of 18 Oct 2026)

> **Method and limitations (read first).** The research used about 24 web searches. Then the shared web-search budget for this session ran out, and every WebFetch call failed with DNS errors (`getaddrinfo ENOTFOUND`, on cbp.gov, freightwaves.com, ycombinator.com and others). So **the findings come from search-engine result summaries, not full page reads.** Many sources are vendor blogs or SEO-style guides. Some, such as the beancount.io blog posts on tariffs, H-2A and PFAS, look like content marketing. These are flagged where used. Areas I could not research at all in this session are listed under Gaps: mining permitting and safety, MRO spare-parts master data, retiring-workforce knowledge capture, small-fleet maintenance and DOT compliance, food spec sheets and supplier questionnaires, grain marketing, maritime eBL/port documentation, Australia/UK/Asia-specific issues. Where I name competitors from background knowledge rather than this session's searches, they are marked **(background, unverified)**.

---

## Objective: candidate problems (dossiers) and top-3 ranking

### Takeaway
The clearest newly created, high-willingness-to-pay (WTP), under-served problem in this sector in late 2026 is **US tariff and duty recovery for small and mid-size importers**. That covers IEEPA refunds after the Supreme Court's 20 Feb 2026 ruling (about $166B collected from about 330,000 importers, with an estimated tens of billions not yet claimed), refunds of the Section 122 surcharge (still in litigation), and ongoing drawback on the Section 301/232 duties that replaced IEEPA. Second is **supplier origin and metal-content declaration management**: Section 232 melt-and-pour, the 15%-by-weight test, the USMCA U.S.-content split, country-specific Section 301 rates and UFLPA tracing. Third is **AI verification of mill test reports and certificates of conformance** at receiving. Several famous problems are already crowded and should be avoided or entered only through a narrow wedge: AI quoting for job shops, FAI ballooning, freight-broker AI agents, carrier vetting and fraud, HTS classification, CPG deductions, and laytime/demurrage claims.

### Cited Findings

#### Candidate 1 — Tariff/duty refund and recovery operations for SMB importers (IEEPA refunds, Section 122 refunds, drawback). **RANK #1**
- (a) **Who:** US importers of record (IORs). The focus is SMBs and mid-market firms (consumer goods, e-commerce, distributors, small manufacturers importing components) that lack in-house trade staff, plus small customs brokers serving them.
- (b) **Pain and frequency:**
  - On 20 Feb 2026 the Supreme Court (*Learning Resources v. Trump*, 6–3) held that IEEPA does not authorize tariffs. It did not itself order refunds, and the remedy went back to the CIT. — [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/02/supreme-court-strikes-down-ieepa-tariffs); [Wharton Budget Model](https://budgetmodel.wharton.upenn.edu/p/2026-02-20-supreme-court-tariff-ruling/)
  - On 4 Mar 2026 Judge Eaton (CIT) directed CBP to refund IEEPA duties. CBP reported over 53 million entries from over 330,000 importers, with about $166B collected and estimated. CBP activated Phase 1 of its refund process ("CAPE") on 20 Apr 2026, covering certain unliquidated entries and entries within 80 days of liquidation. Post-Summary Corrections cannot be used. — search synthesis of [JW](https://www.jw.com/news/insights-ieepa-refund-order/), [Buchalter](https://www.buchalter.com/insights/one-small-step-for-importers-federal-circuit-clears-the-way-for-ieepa-tariff-refund-litigation-to-resume/), [Weaver](https://weaver.com/resources/tariffs-and-the-path-to-refunds-following-the-supreme-court-ruling/), [Flexport](https://www.flexport.com/blog/the-supreme-courts-ieepa-tariff-ruling-next-steps-potential-refunds-and/)
  - On 2 Jun 2026 DOJ appealed the CIT refund order to the Federal Circuit. The appeal targets refunds on entries that are both liquidated and past the 80-day window. That is the main open risk for older entries. — [JW](https://www.jw.com/news/insights-ieepa-refund-order/)
  - Only the IOR or its authorized licensed broker can file a CAPE declaration. Refunds are consolidated by IOR, or paid to a party designated on CBP Form 4811. — [Beancount (blog)](https://beancount.io/blog/2026/08/06/tariff-refunds-importer-of-record-cape-portal-small-business-guide); [CBP IEEPA refunds page](https://www.cbp.gov/trade/programs-administration/trade-remedies/ieepa-duty-refunds)
  - So SMBs that bought DDP, or that used couriers, forwarders or 3PLs as IOR, often cannot claim directly. The "$166 Billion in Tariff Refunds: Why Most Small Importers Can't Claim a Dollar of It" piece argues this. — [Beancount (blog)](https://beancount.io/blog/2026/08/06/tariff-refunds-importer-of-record-cape-portal-small-business-guide); [ImportCostCalculator](https://www.importcostcalculator.com/who-gets-my-tariff-refund.html)
  - **Unclaimed amount:** as of early Aug 2026, CBP had accepted roughly $129B (about 78%) into CAPE. "Many affected importers, particularly smaller businesses, still have not submitted claims." — search synthesis of [Snell & Wilmer](https://www.swlaw.com/publication/update-on-ieepa-tariff-refunds-cape-goes-live-with-certain-limitations-for-importers/), [GBQ](https://www.gbq.com/resources/three-questions-every-importer-should-ask-about-ieepa-tariff-refunds), [Ginger Control](https://gingercontrol.com/blog/ieepa-tariff-refund-guide). The search tool did not attribute this figure to a single page, so verify it.
  - Entries outside Phase 1 need a **protest within 180 days of liquidation**, and the timing of later CAPE phases is unclear. A nationwide class-certification motion was argued in early Aug 2026. CBP says CAPE refunds can be offset against other duties owed. — same sources as above ([Snell & Wilmer](https://www.swlaw.com/publication/update-on-ieepa-tariff-refunds-cape-goes-live-with-certain-limitations-for-importers/); [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en-us/knowledge/publications/44450c73/cbp-issues-tariff-refund-instructions))
  - CBP says valid refunds are generally issued 60–90 days after acceptance of the CAPE declaration. — [CBP](https://www.cbp.gov/trade/programs-administration/trade-remedies/ieepa-duty-refunds); [FlavorCloud](https://flavorcloud.com/resources/blog/ieepa-tariff-refunds-and-cape-declarations-what-importers-need-to-know-in-2026)
  - **Second refund pool:** a 10% Section 122 surcharge applied from 24 Feb to 24 Jul 2026. The CIT ruled it unlawful on 7 May 2026 but limited relief to the parties before it. The Federal Circuit stayed that ruling on 16 Jun 2026, and refunds are still being litigated. — [Skadden](https://www.skadden.com/insights/publications/2026/05/us-trade-court-strikes-down-section-122-tariffs); [Gibson Dunn](https://www.gibsondunn.com/section-122-global-tariffs-invalidated-by-the-court-of-international-trade-ruling-and-next-steps/); [Carra Globe](https://carraglobe.com/section-122-tariff-2026/)
  - **Ongoing duties drive drawback:** at 12:01 a.m. on 24 Jul 2026, Section 301 duties of 10% or 12.5% on products of 60 economies replaced the surcharge (one source says this covers about 99% of US imports). Unused-merchandise drawback (re-export within 5 years) and rejected-merchandise drawback still apply. — [Tariffstool](https://www.tariffstool.com/guides/section-122-tariff-rates-2026); [Kroll](https://www.kroll.com/en/publications/a-tale-of-tariff-substitution); [Carra Globe](https://carraglobe.com/section-122-tariff-2026/)
- (c) **WTP evidence:**
  - Drawback is traditionally sold on contingency. Vendor pages repeat that about $15B of eligible drawback goes unclaimed each year and that about 80% of eligible refunds are never filed. These are vendor estimates, not audited. — [Wisp](https://www.wisp.blog/blog/best-duty-drawback-software-maximize-claims); [StreetInsider/GetNews](https://www.streetinsider.com/GetNews/Best+Duty+Drawback+Companies+in+2026:+Compared+by+Speed,+Cost+&+Recovery/26335540.html)
  - Large providers (for example Charter) are described as "purpose-built for large enterprises — smaller companies may not meet minimum thresholds or may find their claims deprioritized." — [TheSource ranking](https://thesource.com/2026/05/04/drawback-services/); [Zollback](https://www.zollback.com/blog/duty-drawback-services)
  - Descartes ABI is widely used for drawback filing. One broker reportedly said Descartes "significantly raised their quote", which pushed them to look at alternatives. — [Wisp](https://www.wisp.blog/blog/best-duty-drawback-software-maximize-claims)
  - Vendors contrast a "traditional 9–12 months to file" with 10–15-day processing (marketing claim). — [StreetInsider/GetNews](https://www.streetinsider.com/GetNews/Best+Duty+Drawback+Companies+in+2026:+Compared+by+Speed,+Cost+&+Recovery/26335540.html)
  - CBP warns that anyone asking for a fee while claiming to be CBP is a scam. A cottage industry of refund intermediaries exists, and CBP itself charges nothing. — [CBP](https://www.cbp.gov/trade/programs-administration/trade-remedies/ieepa-duty-refunds)
- (d) **Existing solutions:**
  - UPS markets a "US Customs Tariff Refunds" service to its brokerage clients. — [UPS](https://www.ups.com/us/en/supplychain/logistics-solutions/customs-brokerage/us-customs-tariff-refunds)
  - Flexport and Avalara publish refund guides and services. — [Flexport](https://www.flexport.com/blog/the-supreme-courts-ieepa-tariff-ruling-next-steps-potential-refunds-and/); [Avalara](https://www.avalara.com/us/en/blog/how-to-request-tariff-refunds.html)
  - Accounting firms (Weaver, GBQ, WebsterRogers) and law firms are active. — [Weaver](https://weaver.com/resources/tariffs-and-the-path-to-refunds-following-the-supreme-court-ruling/); [WebsterRogers](https://websterrogers.com/article/what-importers-need-to-know-about-ieepa-tariff-refunds/)
  - Drawback specialists include Tariff Management/ITM, Charter, Zollback and "Tariff Refund HQ" (SMB/mid-market managed filing), plus refund-credit sites. — [Tariff Management](https://www.tariffmanagement.com/blog); [TheSource](https://thesource.com/2026/05/04/drawback-services/); [TariffRefundCredits](https://tariffrefundcredits.com/guides/supreme-court-ruling)
  - **Why they fall short:** big brokers mostly serve their own clients. Enterprise drawback firms set minimums. Many SMBs have no IOR status or lack the data: entry numbers, liquidation dates, ACE reports.
- (e) **Why newly solvable or urgent:**
  - The ruling and the refund mechanics are new (Feb–Apr 2026).
  - The work is document- and data-heavy: pulling ACE entry data, matching invoices and liquidation dates, protest deadlines, Form 4811, DDP contract recovery. LLM extraction from 7501s, commercial invoices and broker statements fits it well.
  - Hard deadlines (180-day protests) create urgency.
- (f) **Market size (rough, my assumptions):**
  - About 330,000 IEEPA-paying importers ([JW](https://www.jw.com/news/insights-ieepa-refund-order/)).
  - If about $166B − $129B ≈ $37B was not yet in CAPE as of Aug 2026 (unverified), even a 1% share at a 15% contingency fee is about $55M in fees.
  - The durable drawback market (vendor-claimed $15B/yr unclaimed) could support a $100M+ business at 20–25% contingency.
- (g) **Feasibility (1–5 people, 6–12 months): HIGH.**
  - The MVP is data ingestion (ACE ES-003-style reports, 7501s, invoices), an eligibility and deadline engine, document assembly, and a partner licensed broker or attorney for filings.
  - Contingency pricing removes buyer objection, and the first revenue can come within weeks.
- (h) **Risks:**
  - **Time-limited pool:** the IEEPA refund window shrinks as claims are processed, so the durable business must be drawback and tariff-change recovery.
  - **Licensing:** "customs business" such as filing protests generally requires a licensed customs broker under 19 U.S.C. §1641 **(background, unverified)**. Partner with or hire a licensed broker.
  - Legal uncertainty from the Federal Circuit appeal and the class action.
  - Incumbent brokers may add the service, and CBP may simplify CAPE.
  - Reputational risk because the space attracts scammers ([CBP](https://www.cbp.gov/trade/programs-administration/trade-remedies/ieepa-duty-refunds)).
  - Geography: US only.

#### Candidate 2 — Supplier origin and metal-content declarations for importers (Section 232 melt/pour and 15%-weight test, USMCA U.S.-content split, Section 301 country rates, UFLPA tracing evidence). **RANK #2**
- (a) **Who:** US importers of steel, aluminum and copper derivatives (machinery, auto parts, fasteners, consumer goods, electrical) and their customs brokers. Also non-US suppliers in Mexico, Canada, Asia and the EU who must supply the data.
- (b) **Pain:**
  - Since 6 Apr 2026, Section 232 duties apply to the **full customs value** of covered articles. This removed metal-content valuation, but composition still matters: goods with under 15% steel/aluminum by weight may qualify for 0% (HTS 9903.82.03). — [Foley](https://www.foley.com/insights/publications/2026/05/what-every-multinational-should-know-about-the-new-rules-for-section-232-tariffs-on-steel-aluminum-and-copper-derivatives/); [GHY](https://www.ghy.com/trade-compliance/us-adjusts-section-232-tariffs-on-aluminum-steel-and-copper-full-customs-value-now-applies/); [Federal Register, 9 Apr 2026](https://www.federalregister.gov/documents/2026/04/09/2026-06960/strengthening-actions-taken-to-adjust-imports-of-aluminum-steel-and-copper-into-the-united-states)
  - Importers must keep reporting **country of melt and pour** for all steel and steel derivatives, and **country of smelt and cast** for aluminum. — [Allied (CSMS #68253075)](https://alliedchb.com/news/csms-68253075-section-232-duties-on-imports-of-aluminum-steel-and-copper)
  - The USMCA U.S.-content split across two entry lines (U.S.-content line capped at 40% of entered value) is called the most error-prone piece. The U.S.-content threshold for derivatives fell from 95% to 85% on 8 Jun 2026. — [Diaz Trade Law](https://diaztradelaw.com/new-section-232-action-what-the-june-2026-aluminum-steel-copper-proclamation-means-for-your-imports/); [CRS IN12519](https://www.congress.gov/crs-product/IN12519)
  - BIS proposed adding 14 more derivative articles on 6 Aug 2026, and the inclusions process was eliminated in April. — [CRS IN12519](https://www.congress.gov/crs-product/IN12519)
  - The country-specific Section 301 rates (10% or 12.5% on 60 economies from 24 Jul 2026) make origin evidence matter more. — [Tariffstool](https://www.tariffstool.com/guides/section-122-tariff-rates-2026)
  - UFLPA expects dated, quantity-reconciled records at every production step back to raw material. Generic supplier certifications are insufficient, and a single missing tier can defeat a rebuttal. — [ShopAppy](https://shopappy.com/trade/tariffs-customs/uflpa-forced-labor); [OFW Law](https://ofwlaw.com/expansion-of-the-uflpa-entity-list-implications-for-importers/); [LandedFees](https://www.landedfees.com/en/content/uflpa-entity-list-2026-update)
  - The UFLPA Entity List grew by 43 to 187 entities (Federal Register, 3 Aug 2026). — [Gateway Lines](https://gatewaylines.com/press-releases/uflpa-entity-list-adds-43-companies-largest-expansion); [Customs & Intl Trade Law blog](https://customsandinternationaltradelaw.com/2026/09/09/china-uflpa-tracing-provider-blacklist/)
- (c) **WTP evidence (moderate, mostly indirect):**
  - An importer sued at the CIT on 27 Jan 2026 over how duties are calculated on all-steel products. — [STR](https://www.strtrade.com/trade-news-resources/tariff-actions-resources/section-232-tariffs-on-steel-aluminum)
  - A cited Thomson Reuters survey found 72% of trade professionals named tariff volatility the most impactful regulatory change. — [Next MSC](https://www.nextmsc.com/report/ai-trade-compliance-market-bf5315)
  - The AI trade-compliance market is estimated at $1.89B in 2026 (a market-research firm figure, low reliability). — [Next MSC](https://www.nextmsc.com/report/ai-trade-compliance-market-bf5315)
  - UFLPA detentions require "clear and convincing evidence" to release goods. — [Gateway Lines](https://gatewaylines.com/press-releases/uflpa-entity-list-adds-43-companies-largest-expansion)
  - I found no direct pricing data for SMB supplier-declaration tools (gap).
- (d) **Existing solutions:**
  - Enterprise forced-labor and supply-chain risk tools: Kharon, Z2Data, Strix, Applied DNA Sciences. — [Kharon](https://www.kharon.com/resources/use-cases/forced-labor/uflpa-enforcement-and-compliance-strategy); [Z2Data](https://www.z2data.com/insights/the-complete-uflpa-entity-list-as-of-2024/); [Strix](https://strixsmart.com/resources/blog/uflpa-compliance-guide)
  - Others: Sayari, Altana, Exiger, Assent, Descartes/e2open/Thomson Reuters ONESOURCE GTM **(background, unverified)**.
  - On 5 Aug 2026 China's MOFCOM put six US supply-chain due-diligence providers, including Applied DNA Sciences, on its countermeasure list. That makes it harder for incumbents to operate in China. — [Customs & Intl Trade Law blog](https://customsandinternationaltradelaw.com/2026/09/09/china-uflpa-tracing-provider-blacklist/)
  - **Why they fall short:** they are enterprise-priced and screening-oriented ("is my supplier on a list"). They are not a per-SKU, per-shipment declaration workflow for SMB importers that turns supplier docs (mill certs, BOMs, weight data) into entry-ready data.
- (e) **Why new:** these rules changed in April, June, July and August 2026. LLM extraction from supplier MTRs, BOMs and certificates can now turn messy PDFs into structured declarations.
- (f) **Market size:** of the about 330,000 US importers, those touching metal derivatives are plausibly tens of thousands (my assumption). At $3k–$15k a year, the SAM is roughly $100M–$450M (rough inference). There is a network effect if supplier declarations are reused across their many importer customers.
- (g) **Feasibility: MEDIUM-HIGH.** Pure software: a supplier portal, doc extraction, rules engine and broker export (ABI/CSV).
- (h) **Risks:**
  - Rules keep changing, so it is a maintenance treadmill but also a moat.
  - Broker and GTM incumbents.
  - Liability if a declaration is wrong.
  - Supplier cooperation.
  - Geopolitical risk for China-facing tracing (MOFCOM countermeasures).

#### Candidate 3 — Mill test report (MTR) and certificate-of-conformance verification at receiving (aerospace, defense, energy, structural job shops and metals distributors). **RANK #3**
- (a) **Who:** quality managers and receiving inspectors at AS9100/ISO 9001 machine shops and fabricators, metals service centers, and oil and gas or nuclear suppliers.
- (b) **Pain:**
  - Every incoming metal lot must be checked: mill name, report number, issue date, grade versus the PO, heat number on the cert versus the physical marking, and a link from the receiving record to the cert number. Heat-number mismatches are the key discrepancy. — [MangoApps checklist](https://www.mangoapps.com/templates/inspections/material-test-report-mtr-review-and-heat-traceability-inspection)
  - Certificates vary by EN 10204 type: 2.1 is a declaration only, 3.1 has test results, and 3.2 adds a third-party inspector. — [Wikipedia](https://en.wikipedia.org/wiki/Mill_test_report); [Project Materials](https://blog.projectmaterials.com/project-procurement-mill-test-certificate/)
  - When certs are not enough, firms do independent XRF checks. — [Evident](https://ims.evidentscientific.com/en/insights/mill-test-reports-in-metal-manufacturing-a-comprehensive-guide)
- (c) **WTP evidence: weak in this session (gap).** The search found no AI-specific MTR verification vendor, which suggests a gap but is not proof. Adjacent evidence: FAI paperwork is valuable enough that groundcontrol (YC) reports 70+ US facilities producing about 1,000 reports a month, against a manual baseline of about 8 hours per report. — [YC Launch: groundcontrol](https://www.ycombinator.com/launches/NWA-groundcontrol-vertical-ai-for-highly-regulated-manufacturing)
- (d) **Existing solutions:**
  - Generic inspection-checklist apps (MangoApps template) and a small Microsoft marketplace MTR app. — [MangoApps](https://www.mangoapps.com/templates/inspections/material-test-report-mtr-review-and-heat-traceability-inspection); [Microsoft Marketplace listing](https://marketplace.microsoft.com/product/web-apps/PUBID.dhyeyconsultingservicespvtltd1584430919382|AID.mtr|PAPPID.15a59fac-420f-4e20-ba27-f3be1ead78fe)
  - QMS suites such as ETQ, Qualio, Uniphi and 1factory store certs but do not deeply verify chemistry or mechanical values against spec limits **(background, unverified)**.
- (e) **Why newly solvable:** LLM and vision extraction of semi-structured, multi-format certs (scanned, foreign-language) plus spec-limit tables (ASTM/AMS/EN) makes automated checking practical.
  - **Synergy:** MTRs state the melt country, which is the very data CBP requires for Section 232 melt-and-pour reporting ([Allied CSMS](https://alliedchb.com/news/csms-68253075-section-232-duties-on-imports-of-aluminum-steel-and-copper)). The same extraction engine could feed Candidate 2 (my inference).
- (f) **Market size:** unverified. Plausibly 10k–30k US shops and distributors handling certified metal at $2k–$10k a year, roughly $50M–$200M (assumption).
- (g) **Feasibility: HIGH.** Narrow workflow, a fast quality-manager buyer, and no hardware.
- (h) **Risks:** smaller market; it may be absorbed as a feature by QMS or ERP vendors (ProShop, Paperless Parts, groundcontrol); liability if a nonconforming material escape is missed (keep a human sign-off).

#### Candidate 4 — Detention and accessorial billing and collection for small carriers (flagged: structural, power-imbalance problem)
- (a) **Who:** small for-hire fleets (1–50 trucks), owner-operators, and the brokers and factors serving them.
- (b) **Pain:**
  - ATRI's 2024 report (2023 data) found detention cost $11.5B in lost productivity plus $3.6B in direct expenses, about $15B in total, with more than 135 million hours lost in for-hire trucking. — [Trucknews](https://www.trucknews.com/transportation/truck-driver-detention-costs-industry-15-billion-in-2023-atri); [SupplyChain247](https://www.supplychain247.com/article/truck-driver-detention-productivity-loss-ATRI-survey/American_Transportation_Research_Institute); [Truckers News](https://www.truckersnews.com/news/article/15683574/study-detention-cost-trucking-industry-135-million-hours-in-2023)
  - Shorter detentions (up to 2 hours) are rising. — [Trucknews](https://www.trucknews.com/transportation/truck-driver-detention-costs-industry-15-billion-in-2023-atri)
  - These are 2023 figures and no newer ATRI update was found.
- (c) **WTP evidence:** 94.5% of fleets charge detention but are paid on **fewer than 50%** of those invoices. — [Trucknews](https://www.trucknews.com/transportation/truck-driver-detention-costs-industry-15-billion-in-2023-atri)
- (d) **Existing:** ELD/telematics geofencing (Samsara, Motive), TMS (Rose Rocket, Ascend), factoring companies (OTR, RTS, Triumph), and Trucker Tools **(background, unverified)**. None fixes the core issue: shippers and brokers refusing to pay, and carriers fearing loss of freight.
- (e) **Newly solvable?** Partly. LLMs can parse rate-confirmation detention clauses, and GPS timestamps make evidence packets cheap. The enforcement leverage is not software.
- (f) **Market:** large on paper (hundreds of thousands of small carriers) but low ARPU.
- (g) **Feasibility:** medium. A contingency "we chase your detention" model is possible.
- (h) **Risks:** collection rates are capped by shipper power; churn; low ARPU. **Not top 3.**

#### Candidate 5 — H-2A farm-labor wage and compliance engine (agriculture)
- (a) **Who:** US farms and farm-labor contractors using H-2A. Also landscaping/H-2B businesses.
- (b) **Pain:**
  - An October 2025 DOL rule replaced the single state AEWR with two OEWS-based skill-level rates plus a housing credit of $0.71–$3.18 an hour. It requires separate pay codes by skill level and documented job orders to survive audits. — [Beancount (blog)](https://beancount.io/blog/2026/07/13/h-2a-wage-rules-2026-farm-labor-costs-guide); [AFBF](https://www.fb.org/market-intel/farm-labor-wage-changes-coming-to-h-2a)
  - In Michigan the adjusted Skill Level I rate falls below the state minimum wage, so multiple wage floors must be checked. The floors also shift mid-season (AEWR updates each 1 Jul). — [MSU Extension](https://www.canr.msu.edu/news/explaining-the-new-h-2a-wage-rule-for-michigan-growers)
  - Other obligations: the 3/4 hours guarantee (track hours "offered" versus "worked"), the ban on passing fees to workers (20 CFR 655.135(j)), and filing at least 45 days before the date of need. Recordkeeping gaps (time and payroll) are a common misstep. — [WOH checklist](https://woh.com/wp-content/uploads/2026/02/H-2A-Employer-Compliance-Checklist.pdf); [Greenhouse Grower](https://www.greenhousegrower.com/management/bloom-without-burnout-a-practical-guide-to-the-h-2a-visa-program/); [Beancount (blog)](https://beancount.io/blog/2026/07/10/h2a-h2b-seasonal-worker-visa-small-employer-guide)
  - Cost figures conflict across sources (USCIS fee $460 versus about $760/$1,000; subsistence rates) — [Beancount (blog)](https://beancount.io/blog/2026/07/10/h2a-h2b-seasonal-worker-visa-small-employer-guide)
- (c) **WTP:** farms already pay agents and attorneys (masLabor, USA Farm Labor and similar) **(background, unverified)**. I found no fee data in this session (gap).
- (d) **Existing:** H-2A agents, ag payroll providers, and law firms **(background, unverified)**.
- (e) **Why now:** the new two-tier wage rule (Oct 2025) and annual updates create multi-floor wage complexity that generic payroll handles poorly (inference).
- (f) **Market:** the H-2A program certified roughly 380k positions in FY2024 **(background, unverified)**, spread over thousands of employers.
- (g) **Feasibility:** medium. Sales are seasonal and relationship-driven, and payroll integration is needed.
- (h) **Risks:** policy volatility (immigration politics), liability for wage errors, slow farmer sales cycles. **Honorable mention (#4).**

#### Candidate 6 — Aviation MRO and used-parts back-to-birth documentation (aviation)
- (a) **Who:** used serviceable material traders, engine lessors, MROs and parts brokers.
- (b) **Pain:** IATA guidance says new parts need only an 8130-3/EASA Form 1. Used life-limited parts also need **full back-to-birth documentation** (engine data submittals, readiness logs, incident/accident clearance statements). — [IATA LLP traceability guidance (2020)](https://www.iata.org/contentassets/bf8ca67c8bcd4358b3d004b0d6d0916f/llp-traceability-1st-ed-2020.pdf)
  - Regulators "increasingly expect verifiable end-to-end traceability, including a continuous chain of custody." — [Aviation Business News MRO, Apr/May 2026](https://www.aviationbusinessnews.com/uploads/wp-content/MRO-Apr_May-26-lr.pdf)
- (c) **WTP:** the parts are high-value and records gaps can make a part unsellable **(inference)**. No hard spend data found (gap).
- (d) **Existing:** Block Aero (digital passports; an "AI QC Manager" reads data plates and checks them against the 8130-3), aircraftcloud, MG Aviation and blockchain plays. — [Block Aero](https://block.aero/); [Aircraftcloud](https://aircraftcloud.aero/back-to-birth-traceability-the-key-to-smarter-compliant-component-maintenance/); [MG Aviation](https://mg-aviation.tech/articles/back-to-birth-traceability.html)
  - The FAA AI roadmap implies AI-generated records must carry a validation trail back to source data. — [iFactory](https://ifactoryapp.com/industries/aviation-management/faa-ai-roadmap-aviation-analytics-mro-2026)
- (e) **Why now:** LLM/vision on scanned historical records packs. The 2023 AOG Technics fake-documents scandal raised demand **(background, unverified)**.
- (f) **Market:** a niche, high-ARPU global market; size unverified.
- (g) **Feasibility:** medium-low. Domain expertise and access to records are required, and the sales cycle is long.
- (h) **Risks:** liability for airworthiness, regulatory acceptance, incumbents (AMOS, TRAX, Rusada **(background, unverified)**).

#### Candidate 7 — EUDR due diligence for EU operators and non-EU exporters (flagged: imminent deadline, crowded and simplified)
- (b) **Status:**
  - Application is **30 Dec 2026** for large and medium operators and **30 Jun 2027** for micro/small firms (Regulation (EU) 2025/2650). — [EY](https://taxnews.ey.com/news/2026-0237-eu-deforestation-regulation-application-postponed-to-30-december-2026); [Council of the EU](https://www.consilium.europa.eu/en/press/press-releases/2025/12/18/deforestation-council-signs-off-targeted-revision-to-simplify-and-postpone-the-regulation/)
  - The Commission's 4 May 2026 simplification package did not reopen the legal text. It brought guidance, FAQs, a draft delegated act on scope and changes to the Information System, and is estimated to cut annual compliance costs by about 75%. — [HLC](https://www.hlc.com/en/publications/eu-deforestation-regulation-commission-publishes-simplification-package-ahead-of-december-2026); [Global ELR](https://www.globalelr.com/2026/05/european-commission-releases-new-eu-deforestation-regulation-measures/); [EUSTAFOR](https://eustafor.eu/eudr-what-the-commissions-4-may-2026-simplification-package-means-for-wood-state-forests-and-non-eu-operators/)
  - As of 30 Sep 2026, no proposal to change the dates was listed on EUR-Lex (secondary). — [Polygon](https://polygon-one.com/en/eudr-guide)
- (d) **Competition:** many EUDR tools exist, for example osapiens, Satelligence, Meridia, Koltiva, Sourcemap and Coolset **(background, unverified; not searched in this session)**.
- **Assessment:** spend is happening now (Q4 2026), but simplification cuts WTP and the field is crowded. The possible wedge is non-EU smallholder or exporter geolocation packets (for example Australian, Canadian or US timber and soy exporters selling to the EU). **Not top 3.**

#### Candidate 8 — EU CBAM reporting (flagged: thresholds removed most SMBs, crowded)
- **Status:**
  - The definitive period began on 1 Jan 2026.
  - A 50-tonne annual threshold (Art. 2(3a), Reg. (EU) 2025/2083) replaced the value-based exemption, and importers above it need "authorised declarant" status. — [EPA Ireland](https://www.epa.ie/our-services/licensing/climate-change/eu-carbon-border-adjustment-mechanism/); [Bird & Bird](https://cm.twobirds.com/en/insights/2026/italy/cbam-lavvio-del-periodo-definitivo-e-lobbligo-di-ottenere-lo-status-di-dichiarante-cbam-autorizzato)
  - Indirect customs representatives must be authorised regardless of whether the represented importer is under the threshold. — [Bird & Bird](https://cm.twobirds.com/en/insights/2026/italy/cbam-lavvio-del-periodo-definitivo-e-lobbligo-di-ottenere-lo-status-di-dichiarante-cbam-autorizzato)
  - Certificate sales start in Feb 2027. The first annual declaration for 2026 is due 30 Sep 2027 per Malta's guidance, but an omnibus proposal (status "being assessed") would set 31 Aug 2027. The sources conflict. — [Malta](https://climateaction.gov.mt/cbam/); [CMS](https://cms.law/en/ita/publication/update-on-the-carbon-border-adjustment-mechanism-cbam); [Luxembourg slides](https://environnement.public.lu/dam-assets/documents/emweltprozeduren/ets/cbam/webinar-171225final18-pptx-read-only.pdf)
- **Assessment:** the remaining pain is in getting verified installation-level emissions data from non-EU producers and in customs representatives' obligations. The tooling market is crowded (Tanso, cargolinked guides, and many carbon-accounting startups) — [Tanso](https://www.tanso.de/en/blog/cbam-faq-fragen-und-antworten-zur-cbam-verordnung-ab-2026); [Cargolinked](https://cargolinked.com/guides/cbam-definitive-period-2026-importer-guide). **Avoid unless specifically serving non-EU producers or customs representatives.**

#### Candidate 9 — FSMA 204 food traceability (flagged: deadline pushed to 2028; demand deferred)
- **Status:**
  - The original compliance date was 20 Jan 2026. The Continuing Appropriations, Agriculture, ... and Extensions Act of 2026 directed FDA not to enforce before **20 Jul 2028**, and FDA says it will comply.
  - The rule itself (Food Traceability List, CTEs, KDEs) is unchanged.
  - I found no separate Federal Register final rule confirming the extension.
  - Sources: [FDA](https://fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods); [NC State Extension](https://foodbusiness.ces.ncsu.edu/news/fda-fsma-204-food-traceability-rule-july-20-2028/); [Reliamag](https://reliamag.com/topics/guides/fsma-rule-204-compliance); [CFIA](https://inspection.canada.ca/en/exporting-food-plants-animals/food-exports/requirements-library/fsma-204)
- **Assessment:** regulatory urgency has fallen for 2026–27. Incumbents (ReposiTrak, iFoodDS, TraceGains, Trustwell/FoodLogiQ **(background, unverified)**) already sell to the largest firms. Retailer mandates may still pull demand forward (gap: not verified). **Not top 3 for a 6–12-month revenue goal.**

#### Candidate 10 — Retailer/distributor deductions recovery for emerging food and beverage brands (flagged: crowded with AI-native entrants)
- (b) **Pain:**
  - Retailers can deduct 6–24 months after payment, and auditors go back up to 3 years. Dispute windows are about 180 days at KeHE, and UNFI denies adjustments older than 12 months. — vendor blogs via search ([Promomash](https://www.promomash.com/blog/why-cpg-brands-struggle-to-reconcile-deductions); [OverDeduct](https://www.overdeduct.com/compare/best-cpg-retail-deduction-management-software-emerging-brands))
  - UNFI consolidated its supplier portal in 2026, and KeHE removes the dispute option once its window closes. — [Glimpse, July 2026 guide](https://www.tryglimpse.com/post/unfi-kehe-supplier-deductions)
  - Distributor deductions arrive as short-paid remittances with PDF backup, unlike structured retailer portals. — [Glimpse](https://www.tryglimpse.com/post/unfi-kehe-supplier-deductions)
- (c) **WTP:** a vendor claims small write-offs reach "six figures a year" for a portfolio (unsourced). Contingency models exist. — [Glimpse](https://www.tryglimpse.com/post/unfi-kehe-supplier-deductions); [OverDeduct](https://www.overdeduct.com/)
- (d) **Competitors:** Glimpse (YC; AI deductions), OverDeduct, Promomash, iNymbus, TrewUp, plus HighRadius at enterprise level. — [Glimpse](https://www.tryglimpse.com/); [iNymbus](https://blog.inymbus.com/10-best-deduction-management-software); [TrewUp](https://www.trewup.com/blog/best-deduction-management-software)
- **Assessment:** real pain and contingency WTP, but **already crowded**. Avoid.

#### Candidate 11 — PFAS TSCA 8(a)(7) reporting for article importers and small manufacturers (flagged: scope may shrink)
- **Status:**
  - An April 2026 final rule (91 FR 18786) moved the submission start to **31 Jan 2027**, or 60 days after a forthcoming final rule if earlier. There is no fixed closing date.
  - Article importers are currently treated as manufacturers. Small article-only importers get a 12-month window.
  - A November 2025 proposal would **exempt finished-article importers** and add a de minimis threshold, with a final rule expected in 2026.
  - Sources: [EPA](https://www.epa.gov/assessing-and-managing-chemicals-under-tsca/tsca-section-8a7-reporting-and-recordkeeping); [Bergeson & Campbell](https://www.lawbc.com/epa-postpones-start-of-reporting-period-for-tsca-section-8a7-pfas-reporting-rule/); [RegBase tracker](https://regbase.com/pfas-reporting-rule); [Greensoft](https://greensofttech.com/blog-2026-current-status-of-the-tsca-8a7-pfas-reporting-rule/)
- **Competitors:** Certivo, Greensoft, Assent, Source Intelligence **(partly background)** — [Certivo](https://www.certivo.com/blog-details/pfas-tsca-section-8(a)(7)-reporting-2026-federal-deadline-requirements-and-what-manufacturers-must-do-now)
- **Assessment:** demand for the largest SMB segment (article importers) may disappear if the exemption is finalized. **Watch, don't build.**

#### Candidates 12–16 — Crowded or well-served (avoid head-on); details under the "crowded" key question below
- AI quoting from CAD/drawings for job shops
- FAI/AS9102 ballooning
- Freight-broker AI agents and back-office automation
- Carrier vetting and freight fraud
- HTS classification AI
- Laytime/demurrage claims

#### Top-3 scoring (1–10)

| Rank | Problem | Pain | WTP evidence | Solution gap | Market size | Small-team feasibility | Defensibility | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | SMB tariff/duty recovery (IEEPA CAPE + protests, Section 122 if refundable, drawback on Section 301/232) | 9 | 8 | 7 | 8 | 7 | 4 | Contingency revenue fast. The IEEPA pool is time-limited; drawback and tariff-change recovery is the durable core. Needs a licensed-broker partner. |
| 2 | Supplier origin and metal-content declarations (Section 232 melt/pour and 15% weight, USMCA content, Section 301 origin, UFLPA evidence) | 8 | 6 | 6 | 7 | 7 | 6 | Rules changed Apr–Aug 2026. Supplier-network data reuse gives a moat. Enterprise tools are screening-oriented and costly. |
| 3 | MTR/CoC verification at receiving (aero/defense/energy shops, metals distributors) | 7 | 5 | 7 | 5 | 8 | 5 | Narrow LLM-extraction wedge. Feeds #2 (melt country). WTP evidence weak in this session. |
| (4) | H-2A multi-floor wage and compliance engine | 8 | 6 | 6 | 6 | 5 | 6 | New two-tier AEWR rule (Oct 2025). Seasonal sales. |
| (5) | Detention/accessorial collection for small carriers | 8 | 5 | 5 | 7 | 7 | 3 | Paid on fewer than 50% of invoices, but leverage is not software. |

### Inferences
- **The common pattern behind the best candidates:** a 2025–26 regulatory or tariff change creates a deadline-driven, document-heavy workflow in which money comes back (refunds, drawback) or is avoided (duties, detentions). The buyer is too small for enterprise GTM vendors and existing brokers lack capacity. Contingency pricing suits this pattern because it removes procurement friction.
- Candidates 1, 2 and 3 can be sequenced as one company. Start with refund/drawback recovery for cash flow and customer acquisition. The same ingestion of entries, invoices and supplier certs then powers ongoing declaration management (#2), and MTR extraction (#3) supplies melt/pour country data. This is my inference, not observed in any source.
- The IEEPA refund opportunity is decaying. About 78% of dollars were in CAPE by August 2026 (if accurate), and the remaining dollars skew toward harder cases: liquidated entries, protests, non-IOR buyers, and the Federal Circuit outcome. Hard cases favor a specialist, but the window for "easy" Phase 1 refunds has largely passed.
- Section 122 refunds (10% on most imports, 24 Feb–24 Jul 2026) could become a second large refund wave if the Federal Circuit affirms the CIT. A tooling platform built for IEEPA could be reused (speculative).
- Non-US angles: Canadian and Mexican exporters must supply USMCA content and melt data to US buyers. Non-EU (including Australian) exporters must supply EUDR geolocation and CBAM installation data to EU buyers. Supplier-side "compliance data passports" may be an under-served counterpart to importer tools (inference).

### Gaps
- I could not verify the $129B/78% CAPE acceptance figure against a primary CBP source, because cbp.gov fetch failed.
- I could not determine the current status (Oct 2026) of the Federal Circuit IEEPA refund appeal, the class-certification ruling, or the Section 122 appeal.
- No data on contingency fee levels charged for IEEPA refund filing; the search returned nothing.
- No direct pricing or review evidence for SMB supplier-declaration tools, or for MTR verification tools.
- The H-2A agent fee levels and the program size were not verified in this session.
- Licensing scope (19 U.S.C. §1641 "customs business") for a software company assisting with CAPE or protests is not verified. A customs attorney should confirm it.

---

## Which document-heavy, repetitive workflows in industrial/logistics businesses still run on email, PDFs and spreadsheets?

### Takeaway
Many still do. Examples include FAI/inspection reports, MTR/cert review, customs refund and drawback packets, distributor deduction backups, rate confirmations and BOL/POD matching, laytime statements of facts, aviation back-to-birth records packs, and H-2A time and wage records. Startups are attacking several of these, but customs refunds and drawback for SMBs, supplier origin declarations, and MTR review look least served.

### Cited Findings
- **FAI:**
  - Manual ballooning takes 2–8 hours per print. "Automatic" means different things across vendors: native 3D data versus PDF extraction. — [GND Control buyer's guide 2026](https://www.gndctl.com/insights-library/automated-ballooning-software-fai-buyers-guide-2026)
  - groundcontrol's founders' facilities once produced about 15 FAI reports a day at about 8 hours each. — [YC Launch: groundcontrol](https://www.ycombinator.com/launches/NWA-groundcontrol-vertical-ai-for-highly-regulated-manufacturing)
- **MTR review is still a manual checklist:** grade versus PO, heat number versus marking, cert number linked to the receiving record. — [MangoApps](https://www.mangoapps.com/templates/inspections/material-test-report-mtr-review-and-heat-traceability-inspection)
- **Customs refunds:** CAPE declarations, Form 4811 designations and 180-day protests require entry-level data. Only the IOR or a broker can file. — [Beancount (blog)](https://beancount.io/blog/2026/08/06/tariff-refunds-importer-of-record-cape-portal-small-business-guide); [Snell & Wilmer](https://www.swlaw.com/publication/update-on-ieepa-tariff-refunds-cape-goes-live-with-certain-limitations-for-importers/)
- **Drawback:** traditionally 9–12 months to file a claim (vendor claim). — [StreetInsider/GetNews](https://www.streetinsider.com/GetNews/Best+Duty+Drawback+Companies+in+2026:+Compared+by+Speed,+Cost+&+Recovery/26335540.html)
- **Distributor deductions** from UNFI/KeHE arrive as short-paid remittances with PDF backup. — [Glimpse](https://www.tryglimpse.com/post/unfi-kehe-supplier-deductions)
- **Laytime:** AI reads Statements of Facts and port-call documents, prices claims against charter-party terms and flags time bars. Human review is still needed where facts or legal meaning are disputed. — [Marcura](https://marcura.com/demurrage-software); [Zea Club](https://www.zeaclub.com/resources/zea-notes/laytime-demurrage-guide)
- **Aviation:** a used LLP needs an 8130-3/Form 1 plus a full back-to-birth pack (engine data submittals, readiness logs, incident clearance statements). — [IATA](https://www.iata.org/contentassets/bf8ca67c8bcd4358b3d004b0d6d0916f/llp-traceability-1st-ed-2020.pdf)
- **UFLPA:** dated records at every production step that reconcile in quantity and timing. — [ShopAppy](https://shopappy.com/trade/tariffs-customs/uflpa-forced-labor)
- **H-2A:** separate pay codes by skill level, hours "offered" versus "worked", and job orders documented for audit. — [Beancount (blog)](https://beancount.io/blog/2026/07/13/h-2a-wage-rules-2026-farm-labor-costs-guide); [WOH checklist](https://woh.com/wp-content/uploads/2026/02/H-2A-Employer-Compliance-Checklist.pdf)
- **Manufacturing quoting:** an industry guide recommends tracking "estimator minutes per quote and quoted-versus-actual variance". That implies estimating is still largely manual for non-repeat work. — [Outcome Catalyst](https://www.outcomecatalyst.com/blog/quote-to-fabrication-automation)

### Inferences
- The workflows with the most money attached per document are customs refunds/drawback (each entry can be worth thousands) and aviation records (a part can be worth $100k+). The highest-volume, lowest-value ones are BOL/POD matching and rate confirmations. The high-volume ones have attracted the most venture money (freight AI agents).
- LLM extraction is now good enough that the remaining moat is domain rules (tariff law, spec limits, charter-party clauses) plus integration (ACE, ERP, TMS), not OCR.

### Gaps
- I could not research food spec sheets and customer supplier questionnaires, spare-parts/MRO master data, maritime eBL/port documentation, or mining permit applications because the search budget ran out.

---

## Where are new regulatory or tariff changes forcing spend with immature tooling (tariff refunds/drawback, FSMA 204, CBAM, EUDR)?

### Takeaway
US tariff turmoil is the dominant forcing function in late 2026: the IEEPA refunds, the Section 122 surcharge and its litigation, Section 301 replacement tariffs on 60 economies, the Section 232 overhaul, and the UFLPA list expansion. The tooling for SMBs is immature. EUDR (30 Dec 2026) is imminent but has been simplified and is crowded. CBAM's thresholds removed most small importers. FSMA 204 slipped to July 2028. PFAS TSCA reporting slipped to 2027 and may exempt article importers.

### Cited Findings
- **IEEPA:** struck down 20 Feb 2026. CIT refund order 4 Mar 2026. CAPE Phase 1 on 20 Apr 2026. DOJ appeal 2 Jun 2026. About $166B, 53M entries, about 330k importers. — [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/02/supreme-court-strikes-down-ieepa-tariffs); [JW](https://www.jw.com/news/insights-ieepa-refund-order/); [Wharton](https://budgetmodel.wharton.upenn.edu/p/2026-02-20-supreme-court-tariff-ruling/)
- **Section 122:** 10% on most imports from 24 Feb 2026. CIT ruled it unlawful on 7 May 2026 (relief limited to the parties). Federal Circuit stay on 16 Jun 2026. Expired 24 Jul 2026. — [Skadden](https://www.skadden.com/insights/publications/2026/05/us-trade-court-strikes-down-section-122-tariffs); [Gibson Dunn](https://www.gibsondunn.com/section-122-global-tariffs-invalidated-by-the-court-of-international-trade-ruling-and-next-steps/); [Industrial Sage](https://www.industrialsage.com/section-122-tariff-expires-july-2026/)
- **Section 301 replacement:** 10% or 12.5% on products of 60 economies from 24 Jul 2026. Sources differ on details, for example a USTR mid-2026 proposal for a flat 12.5% on 46 countries. — [Tariffstool](https://www.tariffstool.com/guides/section-122-tariff-rates-2026); [Kroll](https://www.kroll.com/en/publications/a-tale-of-tariff-substitution)
- **Section 232:** full-value basis from 6 Apr 2026; 15% weight threshold; USMCA U.S.-content threshold cut from 95% to 85% on 8 Jun 2026; 14 new derivatives proposed 6 Aug 2026. — [Foley](https://www.foley.com/insights/publications/2026/05/what-every-multinational-should-know-about-the-new-rules-for-section-232-tariffs-on-steel-aluminum-and-copper-derivatives/); [BDO](https://www.bdo.com/insights/tax/section-232-metals-tariffs-expanded-and-recalibrated-what-importers-need-to-know); [CRS](https://www.congress.gov/crs-product/IN12519); [Diaz](https://diaztradelaw.com/new-section-232-action-what-the-june-2026-aluminum-steel-copper-proclamation-means-for-your-imports/)
- **Drawback:** CBP is moving to ACH-only payment for drawback, and audits are reportedly surging (no numbers). — search synthesis of [Gettransport](https://blog.gettransport.com/logistics-guide/duty-drawback-2026-tariff-recovery-guide/), [Tariff Management](https://www.tariffmanagement.com/blog)
- **UFLPA:** +43 entities (187 total) on 3 Aug 2026. China's countermeasures against six US tracing providers on 5 Aug 2026. — [Customs & Intl Trade Law blog](https://customsandinternationaltradelaw.com/2026/09/09/china-uflpa-tracing-provider-blacklist/); [Gateway Lines](https://gatewaylines.com/press-releases/uflpa-entity-list-adds-43-companies-largest-expansion)
  - CBP has issued new forced-labor enforcement guidance on due diligence and traceability (details not verified). — [Stile International](https://stileintl.com/cbp-forced-labor-enforcement-guidance-importers-2026/)
- **EUDR:** 30 Dec 2026 for large and medium operators, 30 Jun 2027 for micro and small. 4 May 2026 package, about 75% cost reduction, no postponement. — [EY](https://taxnews.ey.com/news/2026-0237-eu-deforestation-regulation-application-postponed-to-30-december-2026); [HLC](https://www.hlc.com/en/publications/eu-deforestation-regulation-commission-publishes-simplification-package-ahead-of-december-2026); [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/02/eu-regulation-on-deforestation-free-products-eudr-what-lies-ahead-in-2026); [EU Transition Pathways](https://transition-pathways.europa.eu/textiles/legislative-developments/commission-publishes-simplification-review-eu-deforestation)
- **CBAM:** definitive period from 1 Jan 2026; 50 t threshold; authorised declarant status; certificates from Feb 2027; first declaration 30 Sep 2027 (or 31 Aug 2027 per the omnibus proposal; conflicting). — [EPA Ireland](https://www.epa.ie/our-services/licensing/climate-change/eu-carbon-border-adjustment-mechanism/); [Malta](https://climateaction.gov.mt/cbam/); [CMS](https://cms.law/en/ita/publication/update-on-the-carbon-border-adjustment-mechanism-cbam)
- **FSMA 204:** enforcement not before 20 Jul 2028 (Congressional directive); rule content unchanged. — [FDA](https://fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods); [NC State](https://foodbusiness.ces.ncsu.edu/news/fda-fsma-204-food-traceability-rule-july-20-2028/)
- **PFAS TSCA 8(a)(7):** submission start 31 Jan 2027 (91 FR 18786); a proposed exemption for finished-article importers is pending. — [EPA](https://www.epa.gov/assessing-and-managing-chemicals-under-tsca/tsca-section-8a7-reporting-and-recordkeeping); [RegBase](https://regbase.com/pfas-reporting-rule)
- **H-2A:** October 2025 DOL two-tier OEWS AEWR plus housing credit. — [AFBF](https://www.fb.org/market-intel/farm-labor-wage-changes-coming-to-h-2a); [MSU](https://www.canr.msu.edu/news/explaining-the-new-h-2a-wage-rule-for-michigan-growers)

### Inferences
- Rank of "forced spend × immature SMB tooling" as of Oct 2026, from my judgment: (1) US tariff refunds/drawback; (2) Section 232/301 origin and content declarations; (3) UFLPA rebuttal evidence for mid-market importers; (4) EUDR (forced but crowded); (5) H-2A wage compliance; (6) CBAM (narrowed); (7) PFAS (uncertain); (8) FSMA 204 (deferred).
- Regulatory timelines have shifted repeatedly: FSMA 204 by 30 months, EUDR twice, PFAS several times, US tariffs through four legal bases in 2026. A business must be robust to a rule moving. Recovery businesses (money already paid) carry less regulatory-timing risk than compliance-deadline businesses.

### Gaps
- No primary-source verification of the July 2026 Section 301 action (Federal Register notices cited as 91 FR 9339 and 91 FR 47318 by one source) — [Tariffstool](https://www.tariffstool.com/guides/section-122-tariff-rates-2026)
- I could not find whether a "Section 301 forced labor tariff framework" (named in a Kroll headline) imposes new tracing documentation. The page fetch failed.
- No data found on Australia-, UK- or Asia-specific regulatory forcing functions in this sector (for example Australia's modern slavery reforms, or UK CBAM, planned for 2027 **(background, unverified)**).

---

## Where are businesses losing measurable money (freight fraud, detention, unclaimed duty refunds, scrap, downtime)?

### Takeaway
The biggest measurable pools found:
- unclaimed US tariff refunds (tens of billions in 2026, a one-time pool)
- detention (about $15B a year, 2023 data)
- unclaimed drawback (vendor-estimated $15B a year)
- cargo theft and fraud (about $725M in 2025, and $304.6M in Q2 2026 alone)
- CPG deduction write-offs (no reliable aggregate)

I did not find good 2026 data on scrap or downtime in this session.

### Cited Findings
- **IEEPA refunds:** about $166B collected. About $129B (78%) accepted into CAPE by early Aug 2026, so roughly $37B was not yet claimed (my arithmetic on an unverified figure). Smaller businesses lag. — [Snell & Wilmer](https://www.swlaw.com/publication/update-on-ieepa-tariff-refunds-cape-goes-live-with-certain-limitations-for-importers/); [Beancount (blog)](https://beancount.io/blog/2026/08/06/tariff-refunds-importer-of-record-cape-portal-small-business-guide)
- **Drawback:** about $15B in eligible refunds unclaimed annually; about 80% never filed (vendor estimates). GAO is cited as saying companies claim only a fraction of what they qualify for. — [Wisp](https://www.wisp.blog/blog/best-duty-drawback-software-maximize-claims); [StreetInsider/GetNews](https://www.streetinsider.com/GetNews/Best+Duty+Drawback+Companies+in+2026:+Compared+by+Speed,+Cost+&+Recovery/26335540.html)
- **Detention:** $11.5B in productivity plus $3.6B in direct costs (2023). Detention invoices are paid on fewer than 50% of occasions. — [Trucknews](https://www.trucknews.com/transportation/truck-driver-detention-costs-industry-15-billion-in-2023-atri)
  - An older federal OIG estimate was $1.1–1.3B a year, using a different method. — [SupplyChain247](https://www.supplychain247.com/article/truck-driver-detention-productivity-loss-ATRI-survey/American_Transportation_Research_Institute)
- **Cargo theft:** Q2 2026 had 677 incidents (−26% year over year) but $304.6M in losses (versus $135.7M in Q2 2025). Business email compromise and shipment misdirection held steady, while non-delivery fraud by newly acquired carriers fell. — [Verisk](https://www.verisk.com/company/newsroom/cargo-theft-losses-more-than-double-to-$304-million-in-q2-despite-a-drop-in-thefts-driven-by-high-value-metals-and-technology-heists/); [CargoNet](https://www.cargonet.com/news-and-events/cargonet-in-the-media/2026-q2-theft-trends/)
  - 2025 losses were about $725M (+60%), across 2,646 incidents (secondary compilation). — [MyCargoGuard](https://mycargoguard.com/resources/freight-security-statistics/)
  - The widely repeated "$800M+ FBI double-brokering estimate" could not be traced to a primary FBI source. — [TrackBOL](https://www.trackbol.com/blog/freight-fraud-statistics/)
  - Fraud is shifting into invoices: carrier impersonation, FMCSA record changes, and manipulated BOLs. — [Intelligent Audit](https://www.intelligentaudit.com/blog/fewer-thefts-bigger-losses-how-and-why-shipping-fraud-now-hides-in-the-invoice)
  - TIA's April 2025 survey found 34% named unlawful brokerage the leading fraud tactic. — [MyCargoGuard](https://mycargoguard.com/resources/freight-security-statistics/)
- **Demurrage:** a vendor claims its AI cuts demurrage spend 7–8% and processing time 50% (unverified). — [Marcura](https://marcura.com/demurrage-software)
- **Deductions:** a vendor claims "six figures a year" in small write-offs per portfolio (unsourced). — [Glimpse](https://www.tryglimpse.com/post/unfi-kehe-supplier-deductions)

### Inferences
- Cargo-theft losses are concentrated in fewer, larger strategic thefts (metals, tech), which favors shippers' and insurers' high-value-load security over SMB broker vetting tools. That segment is crowded anyway.
- Refund and recovery pools are the most "provable" ROI: the money is already paid and recoverable. That makes contingency pricing credible and shortens sales cycles compared with loss-prevention products.

### Gaps
- No 2026 data found on scrap rates, unplanned downtime cost for SMB manufacturers, MRO excess-inventory write-offs, or mining safety fines. The search budget was exhausted before these were researched.
- No independent aggregate for CPG deduction losses.

---

## Which areas are already crowded with startups (so should be avoided)?

### Takeaway
Avoid head-on entry into these: AI quoting for job shops, FAI/AS9102 ballooning, freight-broker AI agents and back-office automation, HTS classification AI, CPG deductions recovery, and maritime laytime/demurrage. Carrier vetting and freight fraud is also crowded with established players (from background knowledge; not re-verified this session). EUDR and CBAM tooling is likely crowded (background).

### Cited Findings
- **AI/CAD quoting for job shops:**
  - Paperless Parts, whose "Wingman" AI reads technical documents like an estimator. — [Yespress](https://yespress.io/paperless-parts); [G2 alternatives](https://www.g2.com/products/paperless-parts/competitors/alternatives)
  - Competitors include DigiFabster, Machine Research, MTI Costimator, ProShop, Fulcrum, JobBOSS² (with an AI BOM Builder), Realtrac, ShopVOX, Phasio, K+G AI ERP (from $1,995/mo) and CutQuote (laser/sheet/tube). — [Colab](https://colabcontent.com/vs/paperless-parts-alternatives/); [K+G](https://kgindustrialgroup.com/platform/alternatives/paperless-parts/); [CutQuote](https://cutquote.app/vs-paperless-parts.html); [Phasio](https://www.phas.io/competitors/phasio-vs-paperless-parts)
  - YC companies: Korso (2026; RFQ to quote to PO) and Arzana (order entry and quoting). Forgepoint's "Frank" raised a reported $9.8M seed. — [Extruct YC list](https://www.extruct.ai/data-room/ycombinator-companies-manufacturing-industrials/); [YC Manufacturing](https://ycombinator.com/companies/industry/Manufacturing); [Sovereign Magazine](https://www.sovereignmagazine.com/article/ai-quoting-software-forgepoint)
  - CADDi is also active **(background, unverified)**.
  - Paperless Parts is described as strong for US defense shops needing ITAR/CMMC hosting. — [Colab](https://colabcontent.com/vs/paperless-parts-alternatives/)
- **FAI ballooning:** groundcontrol (YC; 70+ US facilities, about 1,000 reports a month), Leo AI, 1factory, InspectionXpert, Net-Inspect, iFactory. — [YC Launch](https://www.ycombinator.com/launches/NWA-groundcontrol-vertical-ai-for-highly-regulated-manufacturing); [Leo AI](https://www.getleo.ai/blog/ai-first-article-inspection); [1factory](https://1factory.com/first-article-inspection-software-fai-as9102.html); [Net-Inspect](https://www.net-inspect.com/blog/how-automated-ballooning-accelerates-first-article-inspection/); [iFactory](https://ifactoryapp.com/blog/first-article-inspection-fai-as9102-ballooned-characteristics)
- **Freight-broker AI agents:**
  - HappyRobot raised a $150M Series C (Prysm Capital lead, Eurazeo co-lead) at a $1.2B valuation on 4 Aug 2026. It has 150+ enterprise customers including DHL, Kuehne + Nagel and Uber. — [FreightWaves](https://www.freightwaves.com/news/happyrobot-series-c-freighttech-unicorn); [Tech Funding News](https://techfundingnews.com/happyrobot-150m-series-c-ai-agents/)
  - Augment reportedly raised an $85M Series A. Vooma, FleetWorks, Parade and Debales are also active. — [CrashBytes](https://crashbytes.com/articles/how-ai-will-replace-freight-brokers-agentic-logistics-2026); [Debales](https://debales.ai/blog/ai-agents-for-freight-brokers-complete-2026-guide)
  - Pallet (YC) was not surfaced by search.
- **HTS classification AI:**
  - Gaia Dynamics (reported $7M raise, date unconfirmed); Tarifflo (pre-seed of about $500k at a $10M cap, early 2025). — [Gaia Dynamics](https://www.gaiadynamics.ai/blog/how-to-find-harmonized-tariff-codes-faster-with-ai-driven-compliance-tools); [TechBuzz](https://www.techbuzznews.com/tarifflo-leverages-agentic-ai-to-automate-tariff-classification/)
  - Also Digicust, the Flexport customs suite, and postal operators such as Swiss Post offering AI classification. — [Digicust](https://digicust.com/en/); [Flexport](https://www.flexport.com/technology/customs-suite/); [Swiss Post](https://international.post.ch/en/blog/ai-based-tariff-classification-for-e-commerce)
- **CPG deductions:** Glimpse (YC), OverDeduct, Promomash, iNymbus, TrewUp. — [Glimpse](https://www.tryglimpse.com/); [OverDeduct](https://www.overdeduct.com/compare/best-cpg-retail-deduction-management-software-emerging-brands); [iNymbus](https://blog.inymbus.com/10-best-deduction-management-software)
- **Laytime/demurrage:** Marcura (DA-Desk), Veson IMOS Claims, B&V Laysoft, Voyager/Teqplay, MarineFlow, SCIAR. — [Marcura](https://marcura.com/demurrage); [Veson](https://veson.com/products/imos/claims/); [B&V](https://burmester-vogel.com/laysoft/); [Voyager](https://www.voyagerportal.com/resources/teqplay-demurrage-insights-for-charterers-2/); [MarineFlow](https://www.marineflow.ai/); [SCIAR](https://www.sciarsystems.com/insights-ideas/supply-chain-innovation/next-generation-laytime-management/)
- **Freight fraud and carrier vetting:**
  - Established players include Highway, Carrier Assure, MyCarrierPackets/Truckstop, RMIS and DAT **(background, unverified; my search on these was blocked by the budget limit)**.
  - The fraud mix is shifting toward BEC and invoice fraud. — [CargoNet](https://www.cargonet.com/news-and-events/cargonet-in-the-media/2026-q2-theft-trends/); [Intelligent Audit](https://www.intelligentaudit.com/blog/fewer-thefts-bigger-losses-how-and-why-shipping-fraud-now-hides-in-the-invoice)
- **AI trade compliance broadly:** estimated at $1.89B in 2026 (low-reliability market-research figure). — [Next MSC](https://www.nextmsc.com/report/ai-trade-compliance-market-bf5315)

### Inferences
- Freight AI is now unicorn-funded (HappyRobot) with $85M-scale Series As (Augment). A 1–5 person team should not compete on generic broker automation.
- Manufacturing quoting has at least 15 named products, including several YC/AI-native entrants from 2025–26. Remaining room is in narrow verticals: castings, forgings, PCBA, structural steel from construction drawings, or non-US markets. That is speculative and was not researched.
- HTS classification is commoditizing: postal operators and Flexport offer it. The value has moved downstream into recovery and declarations (Candidates 1–2).
- Possible "under-the-radar" white spaces left by crowded markets: SMB refunds/drawback; supplier origin declarations; MTR verification; H-2A multi-floor wage compliance; non-EU supplier-side EUDR/CBAM data packets.

### Gaps
- I could not verify 2026 funding or status for Highway, Carrier Assure, Pallet, Vooma, CADDi, or EUDR/CBAM startups.
- I could not check G2/Capterra review complaints for ERPs (JobBOSS², E2, ProShop), TMS or WMS in this session. Review-based evidence on why incumbents fall short is therefore thin.
- Not researched at all: mining permitting and safety startups, MRO spares data (Verusen, Sparetech **(background)**), retiring-workforce knowledge capture (Augmentir, Dozuki, Tulip **(background)**), small-fleet maintenance (Fleetio, Whip Around **(background)**), grain marketing (Bushel, FBN, GrainFox **(background)**), 3PL billing and WMS pain, automotive (PPAP, IATF) documentation.
