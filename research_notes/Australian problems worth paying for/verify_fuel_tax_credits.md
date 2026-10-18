# Verification: Fuel tax credit (FTC) lookback and recovery desk (Australia, as of October 2026)

**Scope note.** This builds on `au_cross_sector_signals.md` (C2), which ranked the idea #1 (39/60) and established these points:
- A$345M net gap (3.7%) for 2023-24.
- The "87% small business" figure.
- The four-year lookback.
- AIT Specialists' success-fee contract through LGA SA.
- Account Kit, Xbert, Banlaw and the free ATO calculator.
- The Grattan and Australia Institute attacks on the scheme, and FuelCred (US).

None of that is repeated here except where new evidence changes it.

**Method.** I used 30 web searches. WebFetch and curl to ato.gov.au, lga.sa.gov.au, grantthornton.com.au, geotab.com, prismapp.com.au, aitspecialists.com.au and data.gov.au all failed (DNS errors or a proxy 403). As a result:
- Every "Cited Finding" below comes from search-engine extracts of the cited page, not a full read. Exact wording should be spot-checked before anything is published.
- Items marked **[Background, unverified]** are my prior knowledge and were not confirmed this round.

---

## 1. The gap: how much is under-claiming (money owed to businesses) vs over-claiming, and where are the under-claims?

### Takeaway
The headline A$345M is a **net** figure (overclaims minus underclaims). The ATO says outright that it is positive because **overclaims exceed underclaims**. The ATO does **not** publish the size of the under-claim component (none was found).

So the A$345M is mostly money the ATO wants back, not money owed to businesses. The upside case built on it is overstated.

Under-claims do exist and the ATO names their causes:
- unawareness of eligibility;
- conservative estimates;
- perceived complexity;
- missed rate changes.

They are concentrated among small claimants: about 182,000 claimants, 80% of whom claim under A$10k a year. Each small claimant's lookback is therefore worth little.

The cleanest under-claim pockets that carry low audit risk are:
- **auxiliary-equipment safe harbours** (concrete agitators, refrigerated bodies, waste trucks), usable at any claim size;
- **off-road use by heavy and light vehicles**, which needs evidence.

The 2026 excise-relief rate chaos is a new source of errors, but history (2022) suggests it mainly produces **overclaims**.

### Cited Findings
**What the ATO says about the gap**
- The 2023-24 net gap is about A$345M (3.7%), and over 96% of FTCs are claimed correctly. "A gap of 3.7% means overclaims have exceeded underclaims." — [ATO latest estimate and trends](https://www.ato.gov.au/about-ato/research-and-statistics/in-detail/tax-gap/a-h-tax-gaps/fuel-tax-credits-gap/latest-estimate-and-trends)
- The ATO lists these under-claim causes: "being unaware of their eligibility to claim, conservative estimates, perceived complexity, and being unaware of rate increases." — [ATO latest estimate and trends](https://ato.gov.au/about-ato/research-and-statistics/in-detail/tax-gap/fuel-tax-credits-gap/latest-estimate-and-trends)
- The ATO lists these overclaim causes:
  - mainly claiming for ineligible road activity;
  - GPS/telematics misclassifying road vs off-road use;
  - being unaware of, or ignoring, the temporary rate decrease in 2021-22.
  - Source: [ATO latest estimate](https://www.ato.gov.au/about-ato/research-and-statistics/in-detail/tax-gap/a-h-tax-gaps/fuel-tax-credits-gap/latest-estimate-and-trends); [ATO gap print section](https://www.ato.gov.au/api/public/content/0-963e0164-f0a6-4cd3-aae8-3bf38cf3d7c9)
- **Data conflict:** one ATO document gives the 2021-22 net gap as 2.6% (A$175.3M) under a "revised methodology". The later ATO trend table lists A$354M for 2021-22. The reason is not stated (probably the method revision). — [ATO gap print section](https://www.ato.gov.au/api/public/content/0-963e0164-f0a6-4cd3-aae8-3bf38cf3d7c9); [ATO latest estimate](https://www.ato.gov.au/about-ato/research-and-statistics/in-detail/tax-gap/a-h-tax-gaps/fuel-tax-credits-gap/latest-estimate-and-trends)

**The ATO's latest view (Fuel Schemes Stakeholder Group, 22 July 2026)**
- The gap "includes under and overclaims" and indicates "a very high level of compliance".
- Recurring error sources: incorrect apportionment methodologies, application of the wrong rate, and inaccurate record keeping.
- Reasons for under-claiming: clients not aware of rate changes, and claiming seen as "too difficult for the time it takes".
- "Most businesses' everyday record systems do not generally support" FTC claims.
- Source: [ATO FSSG key messages, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)

**Scheme size and claimant mix**
- About **182,000 claimants**; **80% claim less than A$10,000 a year**. The 87% "small business" figure in the earlier note was not re-found. Both may hold, since they measure different things. — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)
- **A$9.8B was claimed in 2024-25**, approximately as follows. — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)

| Industry | Approx. FTC claimed, 2024-25 |
|---|---|
| Mining | A$4.5B |
| Transport, postal and warehousing | A$1.8B |
| Agriculture, forestry and fishing | A$1.1B |
| Construction and manufacturing | A$694M |
| Other | A$344M |

- An advocacy source says mining took about 47% of FTC value but only 1.3% of claims in FY23. It proposed a A$50M-per-group cap that it estimated would hit only eight firms. — [Climate Energy Finance (2024)](https://climateenergyfinance.org/wp-content/uploads/2024/08/Fuel-Tax-Credit-Scheme-Report-Response.pdf); [CEF 2026-27 pre-budget submission](https://climateenergyfinance.org/wp-content/uploads/2026/01/2026-27-Pre-Budget-Submission.pdf)

**Simplified methods**
- For claims under A$10k a year, businesses can use one or more simplified methods:
  - the basic method for heavy vehicles;
  - using the rate at the end of the BAS period;
  - working out litres as total fuel cost ÷ average price per litre;
  - simplified record keeping.
  - Source: [ATO simplified fuel tax credits](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/working-out-your-fuel-tax-credits/simplified-fuel-tax-credits)
- The **auxiliary equipment method** is available at any claim size:
  - A set percentage per vehicle and equipment type covers both fuel used by the auxiliary equipment (e.g. PTO) and fuel used off public roads.
  - No separate off-road calculation or sample testing is needed.
  - It cannot be combined with the basic method, and the ATO calculator can't be used with it.
  - Source: [Tax, Super + You: auxiliary equipment method](https://smallbusiness.taxsuperandyou.gov.au/fuel-tax-credits/simplified-method-for-calculating-fuel-used-in-heavy-vehicles-with-auxiliary-equipment); [ATO heavy vehicles: work out your FTCs](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/in-detail/heavy-vehicles/work-out-your-fuel-tax-credits); [PCG 2016/8](https://www.ato.gov.au/law/view/print?DocID=COG%2FPCG20168%2FNAT%2FATO%2F00001&PiT=99991231235958)
- **Safe-harbour percentages** (third-party listing of PCG 2016/11; verify against the PCG): concrete agitators 30%, refrigerated vehicles 10%, waste collection 15%, specialised equipment 5%, long-haul sleeper-cab air-conditioning 5%. — [Tax, Super + You](https://smallbusiness.taxsuperandyou.gov.au/fuel-tax-credits/simplified-method-for-calculating-fuel-used-in-heavy-vehicles-with-auxiliary-equipment)

**Rates and the 2026 excise relief**
- Rates are indexed to CPI in **February and August**. — [ATO FTC rates](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/rates-business)
- **2026 excise relief created at least four rate regimes within about seven months:**

| Period | Excise / credit change | Road user charge (RUC) | Source |
|---|---|---|---|
| 1 Apr – 30 Jun 2026 | Excise cut by 60.9% | Nil | [Treasury Laws Amendment (Fuel Excise Relief) Act 2026, No. 22](https://www.ato.gov.au/law/view/pdf/acts/20260022.pdf), which includes a Schedule 3 on FTCs; [ATO rates page](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/rates-business) |
| 1 Jul – 2 Aug 2026 | Relief extended at 16c/L (a 30.4% excise reduction); credits 36.6c/L for other uses, 20.2c/L for heavy vehicles on public roads | 16.4c | [PM&C, "Fuel tax relief extended"](https://www.pmc.gov.au/news/fuel-tax-relief-extended); [ATO rates page](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/rates-business) |
| From 3 Aug 2026 | 53.7c/L for other business uses; 21.3c/L for heavy vehicles on public roads | 32.4c | [freetools.au](https://freetools.au/tools/fuel-tax-credit-calculator/); [Account Kit rates guide](https://www.account-kit.com/blog/fuel-tax-credits-guide); [QTA](https://www.qta.com.au/news/ato-confirms-new-fuel-tax-credit-rates) |

  - The 3 Aug 2026 figures are secondary sources citing the ATO.
  - A temporary April–June arrangement is described as excise of 20.6c/L with RUC nil. — [ClearTax AU](https://cleartax.com.au/tax/business-tax/fuel-tax-credit-rates-changed/)
- A bill passed both houses on 29 June 2026 and received royal assent on 30 June 2026. It is probably the extension, but its name was not visible. — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)
- Practitioner guidance says statements straddling 1 April 2026 need two claim rows per vehicle-use category, one at each rate. — [Invoice Data Extraction blog](https://invoicedataextraction.com/blog/fleet-card-statement-to-fuel-tax-credit-spreadsheet)

**Practitioner views**
- Grant Thornton names on/off-road apportionment, battery-powered sleeper cabins, cash vs accrual differences, AdBlue claims and hybrids as risk areas. It frames correct apportionment as a way to "optimise" refunds. — [Grant Thornton](https://www.grantthornton.com.au/insights/blogs/identify-your-opportunities-in-the-complex-landscape-of-fuel-tax-credits/); [Grant Thornton, "ATO reviewing FTC claims"](https://www.grantthornton.com.au/insights/client-alerts/the-ato-are-reviewing-ftc-claims-have-you-claimed-too-much/)
- PKF (a regional accounting firm) says many farmers and businesses under-claim through outdated rates, poor records and not separating eligible uses. — [PKF](https://www.pkf.com.au/insights/maximising-fuel-tax-credits-in-australia-for-businesses-and-farmers/)
- The ATO itself runs "Don't miss out on fuel tax credits" and calculator campaigns aimed at small business. The free ATO channel competes for the same under-claimers. — [ATO newsroom](https://ato.gov.au/businesses-and-organisations/small-business-newsroom/dont-miss-out-on-fuel-tax-credits); [ATO calculator newsroom](https://www.ato.gov.au/businesses-and-organisations/small-business-newsroom/use-our-calculator-to-help-claim-the-right-fuel-tax-credits)

### Inferences
- **The net gap is the wrong number to size a recovery business on.** A positive net gap means overclaims exceed underclaims, so the true under-claim pool could be anywhere from tens of millions to a few hundred million a year. Nothing published pins it down.
- The gap is measured on lodged claims. Eligible businesses that never registered or claimed may be only partly captured, so that could be extra upside (inferred; not checked against ATO methodology).
- **Per-claimant economics for the 80% small cohort are poor.** For example, a A$5k-a-year claimant under-claiming by 20% loses A$1k a year, or about A$4k over four years. A 25% fee on that is about A$1,000 of one-off revenue (illustrative arithmetic, not data).
- **The 2026 rate chaos mostly produces overclaim risk.** The ATO linked 2021-22 overclaims to ignoring a temporary rate cut. The same pattern is likely for off-road users who kept claiming about 50c/L during Apr–Jun 2026 (when the credit was about 20.6c) and 1 Jul–2 Aug 2026 (36.6c).
  - That favours an agent-facing compliance and reconciliation tool over a success-fee recovery desk.
  - Under-claims from the August 2026 rate rise (36.6c → 53.7c) are possible for anyone who kept using the lower rate.
- **The best under-claim wedge is the ATO-sanctioned auxiliary-equipment safe harbour**, because it needs no telematics evidence. Illustration (all inputs are my assumptions, not data):
  - A concrete agitator using about 36–40k L a year at the 30% safe harbour has about 11–12k L a year eligible for the higher "other uses" rate instead of the heavy on-road rate.
  - The difference is the RUC, about 27–32c/L over 2022–26 [RUC history: Background, unverified].
  - That is about A$3–4k per truck per year, or about A$12–15k per truck over four years if never claimed.
  - A 10-truck fleet is worth roughly A$120–150k, or about A$30–37k at a 25% fee.

### Gaps
- The ATO's gross under-claim figure was not found and is probably unpublished. The ATO methodology page (random enquiries, treatment of non-claimants) could not be opened.
- Claim-size distribution beyond "80% under A$10k" was not available. The ATO Taxation Statistics Excise Table 4 on data.gov.au (FTC by industry, 2006-07 to 2024-25) was found but could not be opened: [data.gov.au](https://data.gov.au/data/dataset/taxation-statistics-2023-24/resource/c12e48ca-4b65-499c-8455-a3ced570e800).
- Packaged fuels, and under-claim rates by claim type (PTO vs off-road vs rate errors), were not found.
- Exact rates for 2 Feb – 31 Mar 2026 and the official RUC history were not verified against the ATO directly.

---

## 2. Competitor landscape with pricing

### Takeaway
The field is far more crowded than C2 assumed. There are three layers:
- **Labour-based success-fee specialists.** The verified 25% + GST norm comes from AIT Specialists.
- **Telematics vendors with ATO product or class rulings.** Teletrac Navman FTC Manager partners with a specialist tax firm that already offers four-year retrospective claims. EROAD holds a 2026 class ruling. About eight other fleet vendors market FTC reports.
- **Accounting-practice tools and free calculators.** These include Account Kit, Xbert, several free web calculators and generic statement-extraction tools.

Big 4 firms (confirmed for PwC, through a joint business relationship with Fuel Tax Advisers) cover the large end.

The only open space found is **small and mid fleets without ATO-ruled telematics, served through their BAS agent, using ledger + fuel-card data**. No 2026 startup doing exactly this was found, but Account Kit is one feature away from it.

### Cited Findings
**Success-fee and advisory specialists**
- **AIT Specialists**
  - Fee: "if additional credits are not found then there is no fee applicable"; where missed retrospective credits are found, the fee is **25% (plus GST)** of the missed credits, all-inclusive and fixed (2020 capability statement). — [AIT capability statement, Feb 2020](https://www.lga.sa.gov.au/__data/assets/pdf_file/0031/846751/AIT-Specialists-Capability-Statement-SA-Councils-February-2020.pdf)
  - **LGA SA contract LGAP 22048** runs 1 Oct 2021 – 30 Sep 2026, with three 12-month extension options. Its "management fee is 10% of the 25% rebate charged to councils", which reads as LGA SA taking 10% of AIT's 25% fee (so the councils' fee is still 25%).
  - The LGA SA page carries AIT's claim that it "has yet to work with a council who has undiscovered fuel tax credits" (vendor claim). — [LGA SA Procurement](https://www.lga.sa.gov.au/lgaprocurement/contracts/special-contracts/fuel-tax-credits)
  - In Tasmania, LGAT procurement lists AIT and says it recovered "in excess of $214k" for Tasmanian councils in calendar 2020, on a success basis. — [LGAT](https://www.lgat.tas.gov.au/member-services/for-council-employees/lgat-procurement/contracts/contracts/fleet/fuel-tax-credit-fuel-rebate)
  - AIT is a **WALGA preferred supplier** in WA. — [WALGA](https://walga.asn.au/suppliers/preferred-supplier-directory/ait-specialists); [AIT services](https://aitspecialists.com.au/services/)
- **BTGI**: free review, success-based ("you only pay us if we recover credits"), four-year retrospective window. No percentage published. — [BTGI](https://btgi.com.au/tax-recovery/fuel-tax-credits/)
- **Johnsons MME** (accounting firm): FTC review on contingency ("we take a percentage of the refund claimed and received"). Percentage not stated. — [Johnsons MME](https://johnsonsmme.com.au/our_services/fuel_tax_credit_review/)
- **Fuel Tax Advisers Pty Ltd / PPM**
  - In 2017, Teletrac Navman's FTC Manager was built with PPM Tax & Legal. "Gold" users got "PPM preparing a retrospective four-year claim on their behalf". — [Fully Loaded (2017)](https://www.fullyloaded.com.au/teletrac-navman-offers-heavy-vehicle-fuel-tax-solution/)
  - Later ATO rulings name PPM Tax Tech (PR 2021/2), then Fuel Tax Advisers Pty Ltd (2023 and 2024 rulings), as the service provider. — [PR 2021/2](https://www.ato.gov.au/law/view/pdf/pbr/pr2021-002.pdf); [PR 2023/17](https://www.ato.gov.au/law/view/pdf/pbr/pr2023-017.pdf); [Fuel Tax Advisers](https://fueltaxadvisers.com.au/ftcmanager/)
- **PwC** has an excise and FTC practice, including "FTC technology solutions developed through our joint business relationship with Fuel Tax Advisers Pty Ltd". — [PwC excise and FTC](https://www.pwc.com.au/tax/excise-and-fuel-tax-credits.html); [PwC vehicle data](https://www.pwc.com.au/tax/accurate-vehicle-data-to-support-fuel-tax-credit-entitlement.html)
- **Grant Thornton** publishes FTC client alerts, including on the 2026 excise halving, which signals an active advisory line. — [Grant Thornton excise-halved alert](https://www.grantthornton.com.au/insights/client-alerts/fuel-excise-halved-ftc-implications-for-businesses/); [Grant Thornton](https://www.grantthornton.com.au/insights/client-alerts/fuel-tax-credits--are-you-keeping-up/)
- **Regional and mid-tier accountants** publish FTC guides aimed at farmers and operators: PKF, Nanak, Samios Partners, National Accounts. — [PKF](https://www.pkf.com.au/insights/maximising-fuel-tax-credits-in-australia-for-businesses-and-farmers/); [Nanak](https://nanakaccountants.com.au/how-to-fix-errors-in-ato-fuel-tax-credit-claims/); [National Accounts](https://www.nationalaccounts.com.au/blog/fuel-excise-halved/)

**Telematics and fleet vendors**
- **Teletrac Navman FTC Manager**
  - Covered by **PR 2024/18** (self-claim clients) and **CR 2024/68** (FTC Data clients). The rulings cover fuel acquired **1 July 2024 – 30 June 2026**.
  - The reports can be used as records, but not as the only record.
  - Source: [PR 2024/18](https://www.ato.gov.au/law/view/document?docid=PRR%2FPR202418%2FNAT%2FATO%2F00001); [CR 2024/68](https://www.ato.gov.au/law/view/document?DocID=CLR/CR202468/NAT/ATO/00001&PiT=99991231235958); [Teletrac FTC Manager](https://www.teletracnavman.com.au/fleet-management-software/compliance/ftc-manager); [NatRoad](https://www.natroad.com.au/teletrac-navman-and-ppm-tax-groups-fuel-tax-credit-manager-first-to-receive-ato-product-ruling/)
  - FTC Manager pricing is not public. Third-party estimates put Teletrac telematics at about US$15–25 per vehicle per month. — [SelectHub](https://www.selecthub.com/p/fleet-management-software/teletrac-navman/); [Expert Market](https://www.expertmarket.com/fleet-management/teletrac-navman-review)
- **EROAD**
  - **CR 2026/69** (newest), CR 2023/32 (added off-road apportionment and off-road idle), CR 2021/95 and CR 2019/54.
  - EROAD markets off-road claims as worth "up to 2.5 times the on-road rate" and cites a backdated recovery case (vendor claim).
  - Source: [CR 2026/69](https://www.ato.gov.au/law/view/pdf/pbr/cr2026-069.pdf); [CR 2023/32](https://www.ato.gov.au/law/view/pdf/pbr/cr2023-032.pdf); [CR 2021/95](https://www.ato.gov.au/law/view/pdf/pbr/cr2021-095.pdf); [EROAD FTC](https://www.eroad.com/en-au/products/fuel-tax-credits)
- **Other fleet vendors marketing FTC modules or reports:**
  - Verizon Connect: fuel card + GPS, with a database of off-road locations. Its page still cites an old 42.3c rate.
  - Ctrack; Intellitrac; Fleetcare; ConnectFleet.
  - **Prism** ("Australia's leading Fuel Tax Credit automation service for commercial vehicles using telematics").
  - Michelin Connected Fleet; Geotab (2026 excise-cut blog); MyTrucking (integrates FTC Manager).
  - Sources: [Verizon Connect](https://www.verizonconnect.com/au/solutions/fuel-tax-reporting/); [Ctrack](https://ctrack.com/au/solutions/fuel-tax-credits/); [Intellitrac](https://www.intellitrac.com.au/FTC.html); [Fleetcare](https://www.fleetcare.com.au/telematics/fuel-tax-credits); [ConnectFleet](https://connectfleet.com.au/solutions/gps-fleet-management-software/fuel-tax-credit-reporting/); [Prism](https://prismapp.com.au/); [Michelin](https://connectedfleet.michelin.com/en-au/blog/what-are-fuel-tax-credits/); [Geotab](https://www.geotab.com/au/blog/fuel-excise-cut-2026-fuel-tax-credits/); [MyTrucking](https://mytrucking.com/integrations/teletrac-navman-integration/)
- **Banlaw** (mining fuel management): the Restrack FTC report splits claimable and non-claimable fuel (heavy on-road vs other uses) for the BAS. — [Banlaw Restrack docs](https://docs.restracklite.banlaw.com/rtl-cloud/reports/ftc-report)
- The ATO actively invites telematics providers to seek product rulings ("give you and your clients certainty"). — [ATO telematics providers page](https://www.ato.gov.au/about-ato/ato-advice-and-guidance/ato-advice-products-rulings/information-for-product-rulings-applicants/fuel-tax-credits-telematics-technology-providers)

**Accounting software and free tools**
- **Account Kit** FTC calculator:
  - for Australian tax practices only;
  - pulls fuel transactions from a connected Xero file;
  - supports standard and simplified methods;
  - works best when clients note litres in transaction descriptions.
  - Pricing was not found. — [Account Kit help](https://intercom.help/accountkit-a584a67b03c2/en/articles/17348106); [Account Kit support](https://support.account-kit.com/hc/en-us/articles/360003124434)
- **Xero** has no native FTC calculation. A long-running Product Ideas request remains open. Users note that Hubdoc only accepts two decimal places for fuel prices. A forum claim says MYOB handles FTC (unverified). — [Xero Product Ideas](https://productideas.xero.com/forums/967133-reports-tax/suggestions/44960323-business-activity-statement-to-automatically-cal)
- **Xbert** flags possibly unclaimed FTCs for Australian files in Xero, MYOB and QBO, using the chart of accounts and trial balance. — [Xbert](https://support.xbert.io/en/articles/15583349-fuel-tax-credits-may-be-unclaimed-au)
- **Free calculators** already carry the 3 Aug 2026 rates: freetools.au, austax.tools, calcuris, Budgetly and taxtracker. Calculation itself is commoditised. — [freetools.au](https://freetools.au/tools/fuel-tax-credit-calculator/); [Budgetly](https://www.budgetly.com.au/resources/fuel-tax-credit-calculator/); [taxtracker](https://taxtracker.com.au/learn/fuel-tax-credits)
- A generic document-extraction vendor markets turning BP Plus, StarCard, Shell Card and Motorpass statements into a per-vehicle FTC spreadsheet split by rate period. — [Invoice Data Extraction](https://invoicedataextraction.com/blog/fleet-card-statement-to-fuel-tax-credit-spreadsheet)

**Fuel cards**
- **WEX Motorpass** offers reports marketed as ATO-compliant (quarterly and annual activity reports by card or vehicle, with litres and GST). Some reports cost extra, and **CSV transaction download covers only the last 12 months**. — [WEX Motorpass](https://www.wexinc.com/motorpass/compare-fuel-cards/); [WEX Motorpass](https://www.wexinc.com/motorpass/?p=12825)
- **AmpolCard** has a Xero/MYOB integration (a data feed, not an FTC calculation). — [Ampol](https://www.ampol.com.au/business/products-and-services/fuel-cards/ampolcard/xero-myob)
- **BP Plus** provides GST-substantiated monthly statements. — [Finder](https://www.finder.com.au/fuel-cards/bp-plus-card)
- No Shell-specific or Ampol-specific FTC report was found.

### Inferences
- **Fee norm:** 25% + GST is the one verified success-fee rate. Others (BTGI, Johnsons) are contingent but undisclosed. A software-led entrant could price at 15–20% and still clear margin on mid-size files (inferred).
- **Telematics incumbents own the evidence for off-road heavy-vehicle claims**, with ATO rulings as a moat. One of them (Teletrac with PPM/Fuel Tax Advisers) has bundled four-year lookbacks since 2017.
- **The un-served segment** is fleets without ruled telematics, such as concrete, waste and refrigerated operators, farms and small civil contractors. Their evidence lives in the ledger, fuel-card statements and a vehicle register. That matches the founder's stack, but it also limits claims to safe-harbour and rate-error recoveries.
- **Main threat:** Account Kit or Xbert adding fuel-card ingestion and rate-period splitting would close the gap for accountants quickly.

### Gaps
- No public pricing for Account Kit's FTC module, Teletrac FTC Manager, EROAD FTC, Prism, BTGI or Fuel Tax Advisers.
- Deloitte, KPMG, BDO, Findex and William Buck FTC teams; Webfleet, MiX, Linxio, Fleet Complete and MTData FTC modules; and Shell Card or Fleetcard reports were not checked (search budget).
- No independent outcomes data (average recovery per client) for any specialist.

---

## 3. Rules for a provider: TPB registration, partnering with agents, and record-keeping limits on lookbacks

### Takeaway
Fuel tax law is a "BAS provision". Providing BAS services, which includes working out FTC entitlements a client relies on, **for a fee requires TPB registration**, with large civil penalties otherwise.

The founder must therefore do one of three things:
- sell software to registered BAS or tax agents, who take responsibility and lodge;
- partner with a registered agent entity, as Teletrac/PPM and PwC/Fuel Tax Advisers do;
- register personally [registration requirements: Background, unverified].

Lookbacks are limited by four things:
- the four-year entitlement window;
- the need for records supporting both the claim and the apportionment methodology;
- a 12-month CSV limit on at least one major fuel card;
- **ATO Taxpayer Alert TA 2021/3**, which names **commission-based fees** and favourable sampling as drivers of overclaims and threatens promoter penalties.

### Cited Findings
**Registration**
- The TPB's BAS services page lists fuel tax law among the BAS provisions. Significant civil penalties apply for providing or advertising BAS services for a fee while unregistered. — [TPB BAS services](https://www.tpb.gov.au/bas-services)
- Penalties were up to A$55,500 for individuals and A$275,000 for a body corporate as of 2023; they may since have been indexed. — [TPB(I) 38/2023](https://www.tpb.gov.au/sites/default/files/2023-01/TPB(I)%2038%202023%20What%20is%20a%20BAS%20service_0.pdf)
- BAS agents' scope covers GST, PAYG, BAS, the superannuation guarantee and fuel tax credits (industry summary). — [ReconLink](https://reconlink.com.au/blog/tax-agent-vs-bas-agent-australia)

**Partnering precedents**
- ATO rulings describe the FTC Manager product as "provided by Navman Wireless … in conjunction with services provided by Fuel Tax Advisers Pty Ltd". — [PR 2023/17](https://www.ato.gov.au/law/view/pdf/pbr/pr2023-017.pdf)
- PwC runs a joint business relationship with Fuel Tax Advisers. — [PwC](https://www.pwc.com.au/tax/excise-and-fuel-tax-credits.html)

**Time limits and corrections**
- FTCs must be claimed within four years. The period starts the day after the BAS was due for the tax period in which the fuel was acquired. — [ATO Claiming](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/claiming)
- Late claims use the rate at the time of acquisition. — [Account Kit guide](https://www.account-kit.com/blog/fuel-tax-credits-guide)
- Under-claims can be corrected in a later BAS within the time limit; overclaims have value and time limits (practitioner and ATO community answers). A revised BAS is treated as an amendment request. — [Nanak Accountants](https://nanakaccountants.com.au/how-to-fix-errors-in-ato-fuel-tax-credit-claims/); [ATO Community](https://community.ato.gov.au/s/question/a0J9s000000OcDT/p00202318); [Xero guide](https://www.xero.com/au/guides/fuel-tax-credits/)

**Records**
- ATO rulings require records to be kept for at least five years. Telematics reports can be "a record" but not the only one. — [PR 2024/18](https://www.ato.gov.au/law/view/document?docid=PRR%2FPR202418%2FNAT%2FATO%2F00001); [CR 2024/68](https://www.ato.gov.au/law/view/document?DocID=CLR/CR202468/NAT/ATO/00001&PiT=99991231235958)
- Claimants must keep complete records supporting both the claim and the methodology. — [ATO Claiming](https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/incentives-and-concessions/fuel-schemes/fuel-tax-credits-business/claiming)

**TA 2021/3 (September 2021)**
- It targets GPS, telematics and software providers, and tax professionals, marketing products that produce incorrect apportionment, for past and future arrangements.
- The ATO says "aggressive marketing is being fuelled in some cases by commission-based fee arrangements".
- Example patterns:
  - misclassified public/private roads;
  - "a small (and overly favourable) sample being applied across an entire business";
  - false claims of ATO endorsement.
- Promoter penalties under Division 290 can apply, and registered agents can be referred to the TPB.
- Sources: [TA 2021/3](https://www.ato.gov.au/law/view/view.htm?docid=%22TPA%2FTA20213%2FNAT%2FATO%2F00001%22); [Clayton Utz](https://www.claytonutz.com/insights/2021/september/ato-on-high-alert-for-overclaimed-fuel-tax-credits); [taxed.com.au](https://taxed.com.au/fuel-tax-credit-over-claims/)

**Fuel-card data**
- Motorpass CSV downloads cover the last 12 months only. — [WEX Motorpass](https://www.wexinc.com/motorpass/?p=12825)

### Inferences
- **Selling "software to the agent" is the cleanest structure.** The agent ascertains the entitlement and lodges; the software never advises the end client. A direct success-fee desk would need a registered entity (partner or own registration) plus professional indemnity insurance.
  - Whether an automated client-specific entitlement report counts as a "BAS service" when sold direct is a legal question to resolve before launch [Background, unverified].
- **TA 2021/3 makes a pure success-fee lookback desk a regulatory target.** Mitigations:
  - lead with safe harbours and rate corrections, which are ATO-sanctioned methods;
  - always report overclaims alongside underclaims (the "net position");
  - avoid sample extrapolation;
  - never imply ATO endorsement.
- **Data availability, not the four-year law, limits lookbacks.** Card portals may only give 12 months of CSV, so older years need PDF statements or ledger lines. That favours LLM document extraction (a founder strength).
- **The window rolls off each quarter.** Fuel acquired in the Jul–Sep 2022 quarter falls out of time around late October 2026 (inferred from the four-year rule and standard quarterly due dates). That creates a recurring "use it or lose it" urgency message.

### Gaps
- TPB guidance on whether automated tools or software vendors provide "BAS services" was not retrieved.
- Current BAS-agent registration requirements and indexed penalty amounts for 2026 were not verified.
- The ATO's exact error-correction thresholds for fuel tax (value limits, time limits) were not confirmed from ato.gov.au directly.

---

## 4. Policy risk (2025–2026)

### Takeaway
Near-term policy risk is **lower than feared for the SMB target**:
- The **May 2026 Budget kept FTCs for on-road heavy vehicles**, rejecting the Productivity Commission's 10-year phase-out.
- Reform proposals, such as CEF's A$50M-per-group cap, target large miners, not SMBs.

The bigger 2026 policy fact is **operational**. Temporary excise relief and suspension of the road user charge created multiple short rate periods, a one-off error spike and a compliance-tool moment.

Long-run risks remain (ATA warning of loss by 2031, decarbonisation pressure, electrification), but on a 3–5-year horizon they do not kill an SMB-focused product.

### Cited Findings
- The 2026-27 Budget kept the FTC scheme for on-road heavy vehicles, rejecting the Productivity Commission proposal to phase it out over 10 years. The ATA credited an "evidence-based campaign". — [ATA media release](https://www.truck.net.au/media/media-releases/trucking-industry-win-budget-keeps-fuel-tax-credits); [Woodcentral](https://woodcentral.com.au/log-trucks-win-budget-fuel-tax-credits-productivity-commission/); [Owner//Driver](https://www.ownerdriver.com.au/fuel-tax-credits-kept-in-federal-budget-despite-fears-of-removal)
- The ATA had warned that FTCs "could be lost by 2031" if the phase-out were paired with current road-user charging. — [Prime Mover](https://primemovermag.com.au/fuel-tax-credits-could-be-lost-by-2031-ata-warns/); [ATA pre-budget submission](https://new.truck.net.au/2026-27-pre-budget-submission/)
- Mining bodies called the budget "mining-friendly". No mining-specific FTC change was found. — [Australian Mining](https://www.australianmining.com.au/critical-minerals-fuel-security-and-faster-approvals-define-mining-friendly-budget/)
- CEF's pre-budget submission (January 2026) proposed a **A$50M-per-year cap per consolidated group**, saying it would leave farmers and road transport unaffected. It is an advocacy proposal, not adopted. — [CEF 2026-27 pre-budget submission](https://climateenergyfinance.org/wp-content/uploads/2026/01/2026-27-Pre-Budget-Submission.pdf)
- 2026 excise relief: see the rate table in section 1. — [Fuel Excise Relief Act 2026](https://www.ato.gov.au/law/view/pdf/acts/20260022.pdf); [PM&C](https://www.pmc.gov.au/news/fuel-tax-relief-extended); [Grant Thornton](https://www.grantthornton.com.au/insights/client-alerts/fuel-excise-halved-ftc-implications-for-businesses/); [Geotab](https://www.geotab.com/au/blog/fuel-excise-cut-2026-fuel-tax-credits/)
- One source says the PC has said FTCs are not a fossil-fuel subsidy (date unclear; likely older). — [Adept Economics](https://adepteconomics.com.au/productivity-commission-says-fuel-tax-credit-isnt-a-fossil-fuel-subsidy/)

### Inferences
- Policy risk falls mainly on (a) large miners (caps) and (b) on-road heavy vehicles through RUC increases. Both shrink the RUC-differential "prize" only gradually.
- Off-road machinery, agriculture and auxiliary-equipment claims are the least politically exposed.
- The 2026 relief periods will produce ATO compliance activity on Q4 FY26 and Q1 FY27 BAS, based on its 2021-22 experience. An agent-side reconciliation tool is useful exactly then, but the window is short-lived (inferred).

### Gaps
- Primary text of the Productivity Commission recommendation (report name and date), the Budget paper wording, and any Greens or independent 2026 proposals were not retrieved.
- Treasury and NTC heavy-vehicle charge decisions for 2027-28 onward, and EV-transition effects on the scheme, were not researched (budget).

---

## 5. Market size: claimants, claim sizes, recoverable amounts, fee revenue, NZ analogue

### Takeaway
The verified base is about 182,000 claimants, 80% under A$10k a year, and A$9.8B claimed (2024-25). Dollars are concentrated in mining, transport and agriculture.

Under any reasonable assumption, the **SMB under-claim fee pool is small**: low tens of millions one-off across all providers, plus a few million a year recurring. The council segment is tiny (Tasmania: about A$214k recovered in a year).

A solo founder's realistic ceiling is about **A$0.5–2M ARR** through an accountant-embedded tool plus selective mid-size lookbacks. That is well below the A$2–8M assumed in the cross-sector note.

NZ is **not** a lookback analogue: off-road RUC refunds need only two years of records, and fuel excise duty refunds are quarterly with a 10% late penalty.

### Cited Findings
- About 182,000 claimants; 80% claim under A$10k a year; A$9.8B claimed in 2024-25 (industry split in section 1). — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)
- Tasmanian councils received more than A$214k in AIT-recovered credits in calendar 2020. — [LGAT](https://www.lgat.tas.gov.au/member-services/for-council-employees/lgat-procurement/contracts/contracts/fleet/fuel-tax-credit-fuel-rebate)
- **NZ off-road RUC refunds:** records must be kept for two years and all applications are subject to audit. — [NZTA RUC refunds](https://nzta.govt.nz/vehicles/road-user-charges/ruc-refunds)
- **NZ fuel excise duty refunds** (petrol/LPG used off-road): quarterly applications within three months of quarter-end, with a 10% late penalty. — [NZTA fuel excise duty refunds](https://nzta.govt.nz/vehicles/fuel-excise-duty-refunds/)
- **NZ refund service firm:** PR Claims estimates about 80% of farmers skip fuel excise duty refunds because the process is bureaucratic and run by NZTA rather than the tax office. This is an industry estimate. — [Rural News, Aug 2026](https://ruralnewsgroup.co.nz/rural-news/rural-general-news/farm-focus-pr-claims-fuel-excise-duty-refunds)

### Inferences
**Illustrative fee-pool scenarios.** These are assumptions, not data, because the ATO does not publish gross under-claims.

| Gross annual under-claim (% of A$9.8B) | A$/yr | 4-yr stock | Recoverable with records (assume 50%) | One-off fee pool at 15% / 30% | Recurring fee pool/yr at 20% |
|---|---|---|---|---|---|
| 0.5% | ~49M | ~196M | ~98M | ~15M / ~29M | ~4.9M |
| 1% | ~98M | ~392M | ~196M | ~29M / ~59M | ~9.8M |
| 2% | ~196M | ~784M | ~392M | ~59M / ~118M | ~19.6M |

Reading the scenarios:
- These pools are shared across all providers. A large share of the dollars sits with mining and transport firms already served by Big 4 and telematics vendors.
- The **SMB-addressable** share is plausibly well under half.

**Per-customer revenue at a 25% fee:**

| Claimant type | One-off lookback revenue | Basis |
|---|---|---|
| Small (under A$10k/yr) | ~A$250–1,500 | Not viable for direct sale |
| Mid-size auxiliary-equipment fleet | ~A$10–40k | 10-truck illustration in section 1 |
| Council | ~A$2–10k | Tasmania data |

- **Council segment:** scaling Tasmania's A$214k a year to about 537 councils nationally gives roughly A$4M in recoveries, or about A$1M in fees, mostly one-off. That is already worked by AIT [council count: Background, unverified].
- **Revised ceiling:**
  - Agent channel: about 300 agent firms × 10 relevant clients × A$15 a month ≈ A$0.5M ARR.
  - Mid-size lookbacks: about 50–100 a year at about A$15k ≈ A$0.75–1.5M a year, non-recurring.
  - Total: **about A$0.5–2M ARR-equivalent** (inferred).

### Gaps
- Counts of concrete-agitator, waste and refrigerated heavy vehicles in Australia, and how many of their owners already use the safe harbour, are unknown. The ABS Motor Vehicle Census or industry bodies could answer this.
- The claim-size distribution (Taxation Statistics) could not be opened.
- There is no data on how many eligible businesses do not claim at all.

---

## 6. Willingness-to-pay evidence

### Takeaway
WTP for **outcome-priced** FTC recovery is confirmed:
- 25% + GST success fees;
- council procurement contracts in SA (2021–2026), Tasmania and WA;
- a telematics vendor bundling four-year lookbacks;
- multiple contingency firms.

But the evidence clusters in **councils and mid-size fleets**, not micro-claimants. The ATO notes that many small claimants find claiming "too difficult for the time it takes", which signals low engagement rather than latent WTP. Accountant demand shows up as a long-standing request for native Xero FTC support.

### Cited Findings
- **AIT Specialists:**
  - 25% + GST, no-find-no-fee. — [AIT capability statement](https://www.lga.sa.gov.au/__data/assets/pdf_file/0031/846751/AIT-Specialists-Capability-Statement-SA-Councils-February-2020.pdf)
  - LGA SA contract 2021–2026 with extension options. — [LGA SA](https://www.lga.sa.gov.au/lgaprocurement/contracts/special-contracts/fuel-tax-credits)
  - LGAT (more than A$214k recovered in 2020). — [LGAT](https://www.lgat.tas.gov.au/member-services/for-council-employees/lgat-procurement/contracts/contracts/fleet/fuel-tax-credit-fuel-rebate)
  - WALGA preferred supplier. — [WALGA](https://walga.asn.au/suppliers/preferred-supplier-directory/ait-specialists)
- **Teletrac Navman tiers:** Silver and Gold, with Gold including a PPM-prepared four-year retrospective claim (2017). — [Fully Loaded](https://www.fullyloaded.com.au/teletrac-navman-offers-heavy-vehicle-fuel-tax-solution/)
- **Contingency firms:** BTGI and Johnsons MME. — [BTGI](https://btgi.com.au/tax-recovery/fuel-tax-credits/); [Johnsons MME](https://johnsonsmme.com.au/our_services/fuel_tax_credit_review/)
- The ATO says commission-based fee arrangements are common enough to fuel "aggressive marketing", which is indirect evidence that operators pay on commission. — [TA 2021/3](https://www.ato.gov.au/law/view/view.htm?docid=%22TPA%2FTA20213%2FNAT%2FATO%2F00001%22)
- Accountants and users have asked Xero for automatic FTC calculation in the BAS, and the request remains open. — [Xero Product Ideas](https://productideas.xero.com/forums/967133-reports-tax/suggestions/44960323-business-activity-statement-to-automatically-cal)
- Under-claimers see claiming as "too difficult for the time it takes". — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)

### Inferences
- WTP is real but **sized to the prize**. Mid-size fleets and councils pay 25%; micro-claimants will only "pay" through their accountant's existing BAS fee. That means the tool must be cheap per client and sold to the accountant.
- The SA council contract's initial term ended 30 Sep 2026. It is either extended or open to re-tender now, which is a possible entry point, though councils are a small pool (inferred; status unverified).

### Gaps
- No verified Reddit or Whirlpool owner-operator or accountant quotes. The one forum search returned only ATO and vendor pages.
- No testimonials with dollar outcomes from independent sources.
- No data on accountant attitudes (fee resistance, liability concerns) toward third-party FTC tools.

---

## 7. Best wedge for this solo founder (Xero-style OAuth sync, SQL, pivots and dashboards, OpenAI)

### Takeaway
If pursued, **do not build a success-fee recovery desk for small businesses.** Build an **agent-facing "FTC reconciliation and lookback" tool**. It works on ledger, fuel-card and vehicle-register data and produces a per-period over/under schedule plus an audit pack, which the agent lodges.

Lead with three things:
- the 2026 multi-rate-period reconciliation;
- auxiliary-equipment safe-harbour recoveries for concrete, waste and refrigerated fleets;
- light-vehicle and machinery off-road claims for farms and civil contractors.

Offer an optional success-fee lookback only for mid-size fleets, through a registered-agent partner.

### Cited Findings
- No 2026 startup was found automating FTC from fuel-card data alone for small fleets. Incumbents mostly require their own telematics hardware. — [search across vendor pages: Verizon Connect](https://www.verizonconnect.com/au/solutions/fuel-tax-reporting/); [Prism](https://prismapp.com.au/); [Invoice Data Extraction](https://invoicedataextraction.com/blog/fleet-card-statement-to-fuel-tax-credit-spreadsheet)
- Xero has no native FTC; Account Kit pulls Xero fuel transactions but relies on litres being typed into descriptions. — [Xero Product Ideas](https://productideas.xero.com/forums/967133-reports-tax/suggestions/44960323-business-activity-statement-to-automatically-cal); [Account Kit](https://intercom.help/accountkit-a584a67b03c2/en/articles/17348106)
- Fuel-card data paths exist: AmpolCard Xero/MYOB feed, Motorpass CSV (12 months), BP Plus monthly statements. — [Ampol](https://www.ampol.com.au/business/products-and-services/fuel-cards/ampolcard/xero-myob); [WEX Motorpass](https://www.wexinc.com/motorpass/?p=12825); [Finder](https://www.finder.com.au/fuel-cards/bp-plus-card)
- The safe-harbour auxiliary method requires no off-road evidence and is available at any claim size. — [Tax, Super + You](https://smallbusiness.taxsuperandyou.gov.au/fuel-tax-credits/simplified-method-for-calculating-fuel-used-in-heavy-vehicles-with-auxiliary-equipment)

### Inferences
**Product (MVP in about 8–12 weeks, inferred)**
1. Xero/MYOB OAuth pulls the fuel accounts.
2. Fuel-card CSV/PDF ingestion uses LLM extraction for older statements, capturing litres, product, date and site.
3. A vehicle register records GVM, body type (agitator, refrigerated, waste), fuel type and any telematics reports.
4. A rules engine holds every rate period from 2022 to 2026, including 1 Apr–30 Jun 2026, 1 Jul–2 Aug 2026 and from 3 Aug 2026, and the safe-harbour table.
5. The output is a per-BAS-period over/under schedule, a methodology memo citing the ATO method used, and later-BAS correction lines for the agent.
6. Overclaims are always shown as well (TA 2021/3 defence).

**Pricing (inferred)**
- To agents: about A$99–249 per client lookback report, plus about A$10–20 per client per month ongoing. Alternatively, a 10–15% revenue share where the agent bills a success fee.
- Direct mid-size via a registered partner: 15–20% success fee, undercutting AIT's 25%.

**Channel (inferred; association names are [Background, unverified])**
- BAS agent and bookkeeper communities (ICB, Institute of Certified Bookkeepers; ABSIA).
- Xero App Store.
- Regional accounting firms with transport and agriculture books.
- Industry bodies: NatRoad, ATA, QTA, Cement Concrete & Aggregates Australia, WMRR.
- LGA procurement panels, only opportunistically.

**First 10 customers (inferred)**
- 4–5 regional BAS agents or bookkeepers (QLD, NSW and WA wheatbelt) with 10+ transport, civil or ag clients each. Run free lookbacks on 3 clients each to prove dollars found.
- 3 concrete-agitator or waste fleets (10–40 trucks) without ruled telematics, via those agents.
- 1–2 councils not on an AIT arrangement (e.g. in states without an LGA special contract).

### Gaps
- Fuel-card API availability (Ampol, BP, Shell/Viva, Motorpass) for third-party apps was not checked.
- Xero App Store listing requirements and data-residency expectations for councils were not checked.

---

## 8. Kill criteria, verdict and re-score

### Takeaway
**Verdict: DOWNGRADE, but do not kill.** Score: **39/60 → 29/60**, which drops it below DRFA (38) and EMDG (35) as a lead idea.

**What fails:**
- The thesis that the A$345M gap is money owed to SMBs fails, because the ATO says overclaims exceed underclaims.
- So does the "small business success-fee lookback" model: per-client prizes are about A$1k, and TA 2021/3 targets commission-based FTC marketing.
- The competitive field is crowded with telematics vendors holding ATO rulings, specialists, Big 4, Account Kit, Xbert and free calculators.

**What survives** is a narrower, cheaper product: an agent-facing reconciliation and lookback tool focused on safe-harbour and rate-period errors. It is worth keeping as a **module inside a broader "claims desk"** (alongside EMDG or DRFA), not as the lead business.

### Cited Findings
- Net gap: overclaims exceed underclaims. — [ATO latest estimate](https://www.ato.gov.au/about-ato/research-and-statistics/in-detail/tax-gap/a-h-tax-gaps/fuel-tax-credits-gap/latest-estimate-and-trends)
- 182,000 claimants, 80% under A$10k a year. — [ATO FSSG, 22 July 2026](https://www.ato.gov.au/about-ato/consultation/in-detail/stakeholder-relationship-groups-key-messages/fuel-schemes-stakeholder-group/fuel-schemes-stakeholder-group-key-messages-22-july-2026)
- TA 2021/3 on commission-based fees. — [TA 2021/3](https://www.ato.gov.au/law/view/view.htm?docid=%22TPA%2FTA20213%2FNAT%2FATO%2F00001%22)
- Telematics vendors with current rulings: EROAD [CR 2026/69](https://www.ato.gov.au/law/view/pdf/pbr/cr2026-069.pdf); Teletrac [PR 2024/18](https://www.ato.gov.au/law/view/document?docid=PRR%2FPR202418%2FNAT%2FATO%2F00001)
- 25% + GST success-fee norm. — [AIT capability statement](https://www.lga.sa.gov.au/__data/assets/pdf_file/0031/846751/AIT-Specialists-Capability-Statement-SA-Councils-February-2020.pdf)
- Budget retained FTCs for heavy vehicles. — [ATA](https://www.truck.net.au/media/media-releases/trucking-industry-win-budget-keeps-fuel-tax-credits)

### Inferences
**Re-score (1–10 each; judgment)**

| Criterion | C2 original | Re-score | Why |
|---|---|---|---|
| Pain | 6 | **5** | Real but low-priority for most (claiming seen as "too difficult for the time it takes"). Temporarily higher during the 2026 rate chaos. |
| WTP evidence | 8 | **7** | 25% + GST success fees, council panels in SA, TAS and WA, and telematics lookback bundles are verified. But the evidence clusters in councils and mid-size fleets. |
| Solution gap | 6 | **4** | At least 10 telematics vendors (two with ATO rulings), specialists (AIT, BTGI, Johnsons, Fuel Tax Advisers), PwC/GT, Account Kit, Xbert and free calculators. The gap is narrow: no-telematics fleets via agents. |
| Market size | 6 | **4** | Under-claim component unknown and smaller than the net gap; 80% of claimants under A$10k a year; council pool about A$1M in fees; no NZ lookback analogue. |
| Founder feasibility | 8 | **6** | Tech fit is strong (OAuth, SQL, LLM extraction). Against it: TPB registration or agent partner needed, PI insurance, TA 2021/3 exposure, and fuel-card data limited to 12 months. |
| Defensibility | 5 | **3** | Rules are public. Account Kit or Xbert could add the feature. Telematics vendors own off-road evidence and ATO rulings. |
| **Total** | **39** | **29/60** | |

**Kill criteria** (test within 6–8 weeks of customer discovery; any two met means kill):
1. **Per-client prize:** in 15+ real client files from 3+ BAS agents, the median four-year net recoverable amount (after overclaim offsets) is **under A$3k**, and under A$15k for fleets of 10+ heavy vehicles.
2. **Channel:** fewer than 3 of 10 BAS agents or bookkeepers agree to a paid pilot (at least A$99 per lookback or at least A$10 per client per month), or most say Account Kit or the ATO calculator suffices.
3. **Regulatory:** legal or TPB advice says the direct product is a BAS service, and no registered agent partner signs within 60 days. Also kill if the ATO signals that safe-harbour back-claims via third-party tools attract TA 2021/3 scrutiny.
4. **Data:** in fewer than half of pilot files can 24+ months of fuel litres per vehicle be reconstructed from card statements or the ledger.
5. **Incumbent move:** Xero ships native FTC, or Account Kit or Xbert ships fuel-card ingestion with rate-period splitting before first revenue.
6. **Policy:** legislation removes or caps credits for SMB categories (heavy on-road, agriculture or auxiliary equipment) before 2028. This is not currently on the table.

**What would upgrade it back:**
- the ATO publishing a gross under-claim figure above about A$150M a year; or
- pilots showing a median above A$10k recoverable per mid-size fleet with an 80%+ agent acceptance rate.

### Gaps
- No customer discovery has been done. Every per-client recovery figure here is illustrative arithmetic, not observed data.
- Pricing for Account Kit, Teletrac FTC Manager, EROAD FTC, Prism and BTGI is unknown, which weakens the competitive price-positioning analysis.
