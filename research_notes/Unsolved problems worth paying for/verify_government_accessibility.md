# Verify: Digital Accessibility Remediation for US Public Entities (ADA Title II, WCAG 2.1 AA), as of October 2026

> **Overall verdict: the demand is real, but the "open field" thesis does not hold.** The legal driver is intact, buyers are paying, and RFPs are live. But the long tail of small local governments and special districts is **already being bundled** by CivicPlus, the dominant small-government CMS vendor:
> - It owns Municode and bought Streamline (a special-district website vendor with 2,500+ agencies) along with Streamline's DocAccess PDF-to-HTML tool.
> - It partners with Allyant and resells AudioEye.
> - DocAccess was wired into Diligent's BoardDocs/iCompass agenda platforms in September 2026.
>
> Siteimprove shipped AI PDF remediation agents in 2026. Adobe has folded auto-tagging into Acrobat Pro. A free MIT-licensed AWS pipeline puts automated tagging at cents per page.
>
> **Recommendation:** downgrade from #1. A 1–5 person team can still build a services-heavy business ($1–3M ARR scale) on a narrow wedge: compliance-grade tagged PDFs with human QA, plus in-scope triage, for entities serving 50k+ people before 26 April 2027. It is not a defensible software category.
>
> **Method note:** 35 web searches were used. WebFetch failed with DNS errors on all 5 attempts (adatitleiii.com, federalregister.gov, sog.unc.edu, naco.org), so findings below rest on search-result summaries of the cited pages, not full-text reads. Items marked "background knowledge" are unverified in this session.

## 1. Exact regulatory status (2024 rule, April 2026 DOJ action, deadlines, scope, enforcement, repeal/delay risk)

### Takeaway
On 20 April 2026, DOJ published an **interim final rule (IFR)** that only moved the compliance dates:
- **26 April 2027** for entities serving 50,000+ people.
- **26 April 2028** for entities under 50,000 and special districts.

WCAG 2.1 AA and every other provision of the 2024 rule, including its exceptions, are unchanged. Private suits remain possible during the extension. The live risk is a further DOJ rulemaking to make the rule "less costly". It is listed on DOJ's regulatory agenda with timetable "TBD"; no NPRM had been found as of this research.

### Cited Findings
- **The IFR.** "Extension of Compliance Dates for Nondiscrimination on the Basis of Disability; Accessibility of Web Information and Services of State and Local Government Entities" was published 20 April 2026 at 91 FR 20902 and took effect immediately ([Federal Register](https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web)).
  - Deadlines: entities serving 50,000+ moved from 24 April 2026 to **26 April 2027**; entities under 50,000 and any special district government moved from 26 April 2027 to **26 April 2028**.
  - Comments were due 22 June 2026 ([Federal Register](https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web)).
  - GAO issued a major-rule report on it dated 5 May 2026 ([GAO](https://www.gao.gov/assets/890/885605.pdf)).
- **Date discrepancy.** One law firm gave the large-entity date as 27 April 2027 ([Plante Moran search summary](https://plantemoran.com/explore-our-thinking/insight/2026/04/doj-extends-ada-title-ii-web-accessibility-compliance-deadlines)). The Federal Register text, as summarized in search results, says 26 April 2027.
- **DOJ's stated reasons.** Resource constraints, staffing limits, "slower-than-expected technological solutions (including limits of generative artificial intelligence for remediation)", and litigation risk ([JD Supra](https://www.jdsupra.com/legalnews/doj-delays-ada-web-accessibility-7295347/); [Consumer Financial Services Law Monitor](https://www.consumerfinancialserviceslawmonitor.com/2026/04/doj-extends-title-ii-ada-web-accessibility-rule-compliance-deadlines-for-state-and-local-governments/)).
  - DOJ said it "overestimated the capabilities (whether staffing or technology) of covered entities to comply with the rule in the time frames provided" ([NPR via KUNC](https://www.kunc.org/npr-news/2026-04-22/trump-administration-delays-rule-aimed-at-improving-disability-access-in-schools)).
  - The rule cites correspondence from education advocacy groups about limited financial, technical and staffing resources ([Federal Register](https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web)).
- **Substance unchanged.** DOJ's language, as quoted: "[t]he amendments do not alter any other provisions of the 2024 final rule." WCAG 2.1 AA is retained ([CM Law Library blog](https://cmlawlibraryblog.classcaster.net/2026/04/21/doj-extends-compliance-dates-for-web-content-mobile-app-accessibility/); [Mondaq](https://www.mondaq.com/unitedstates/media-entertainment-law/1782220/doj-extends-ada-title-ii-digital-accessibility-deadlines-by-one-year)).
- **Scope exceptions still in place** per county and legal guides:
  - archived content not used for active programs or services
  - preexisting conventional electronic documents not needed for current services
  - third-party content

  ([NACo via Axios/NACo summary](https://www.naco.org/news/pdfs-are-doa-new-web-standards-approach); [Jeffer Mangels guide](https://ada.jeffer.com/?p=6693)). From background knowledge, the 2024 rule has five exceptions: archived web content; preexisting conventional electronic documents; third-party-posted content; individualized password-protected documents; and preexisting social media posts.
- **Earlier signal of a rollback.** In September 2025, DOJ said it might issue a proposed rule "to reconsider whether some of the regulatory provisions imposed by the April 24, 2024 rule could be made less costly." No NPRM had been issued as of that reporting ([League of Minnesota Cities](https://www.lmc.org/?p=46432)).
- **Regulatory agenda.** A Seyfarth summary says DOJ's agenda includes intent to "re-examine the Title II website accessibility regulations", with timetable "TBD" ([JD Supra topic page](https://jdsupra.com/topics/title-ii/website-accessibility/websites/)).
  - AAPD says the IFR signals intent to pursue further rulemaking that could bring "substantial changes" ([AAPD](https://www.aapd.com/aapd-statement-title-ii-doj-web-rule-ifr/)).
  - Duane Morris says DOJ "fully anticipates implementing the regulation at the new deadline" ([JD Supra / Duane Morris](https://www.jdsupra.com/authors/beth-morris/compliance-dates/)).
- **Opposition to the delay.** The American Council of the Blind called the IFR unusual (no prior comment, which requires a good-cause finding) and asked OIRA for a meeting to argue it should be withdrawn ([ACB](https://www.acb.org/node/9583)).
- **Enforcement.** The extension does not suspend Title II's underlying nondiscrimination and effective-communication duties. DOJ commentary acknowledges private litigants can obtain injunctive relief and attorneys' fees from public entities ([Equidox midyear 2026](https://equidox.co/blog/2026-midyear-accessibility-lawsuits-the-doj-delayed-enforcement-so-plaintiffs-took-action/); [JD Supra](https://www.jdsupra.com/legalnews/doj-delays-ada-web-accessibility-7295347/)).
  - ED's Office for Civil Rights has opened reviews of school district websites under Section 504 and Title II after complaints that used automated checkers ([ED OCR case 15171500-a](https://www2.ed.gov/about/offices/list/ocr/docs/investigations/more/15171500-a.pdf)).
- **Litigation climate (mostly private sector).**
  - Seyfarth counted 3,117 federal website accessibility suits in 2025, up 27% from 2,452 in 2024 (as reported by [TestParty](https://testparty.ai/blog/ada-compliance-2026)).
  - UsableNet projects more than 6,000 web accessibility suits of all types in 2026 ([Equidox](https://equidox.co/blog/2026-midyear-accessibility-lawsuits-the-doj-delayed-enforcement-so-plaintiffs-took-action/)).
  - No count of Title II suits against public entities was found.
- **Parallel HHS Section 504 rule** (hospitals, health centers and other HHS-funded recipients). An HHS IFR (announced 7 May 2026, published 11 May 2026 at 91 FR 25496) moved the dates ([Federal Register](https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web); [LeadingAge](https://leadingage.org/web-accessibility-compliance-date-delayed-under-hhs-section-504-regulations/); [Feldesman](https://www.feldesman.com/hhs-extends-compliance-deadlines-for-web-and-mobile-accessibility-requirements/)):
  - Recipients with 15+ employees: **11 May 2027**.
  - Recipients with fewer than 15: **10 May 2028**.
  - This resolves the earlier note's open question about the May 2026 HHS date.

### Inferences
- **Deadline risk.** The rule has slipped once. DOJ has explicitly flagged a cost-reduction re-examination, so a second delay or a narrowing is plausible, though no NPRM had been found as of this research. The most likely targets, if narrowed, are the document-heavy parts (preexisting documents, archived content, timing), and those matter most to a per-page PDF business. Treat the 26 April 2027 date as probable but not certain.
- **Exceptions shrink the backlog.** The archived and preexisting-document exceptions mean much of the "tens of thousands of legacy PDFs" is legally out of scope if properly archived. The durable market is the **ongoing flow** of new agendas, minutes, forms and reports, plus legacy documents still used for current services. The Axios expert quote ("much of the rule applies to future documents") points the same way.
- **DOJ's AI admission cuts both ways.** It validates that remediation is hard (good for a quality-focused vendor). It also signals regulators will not treat "AI did it" as a defense.
- **Private enforcement continues.** Fee-shifting means demand persists even if DOJ deprioritizes enforcement, but public-entity suits appear rare so far.

### Gaps
- Could not read the IFR's full text or Regulatory Impact Analysis. Missing: DOJ's total cost estimate, covered-entity counts, and the exact Unified Agenda RIN and stage.
- No evidence found either way on whether DOJ issued a final rule after the comment period or published an NPRM between June and October 2026.
- No tracker of Title II (public-entity) web accessibility lawsuits was found.
- No state-law overlays checked; for example, state laws that independently require WCAG for local governments (Colorado HB21-1110 is background knowledge only).

## 2. Size: covered entities, document volumes, price per page, total spend

### Takeaway
There are about **91,000 local governments**, including about **39,000 special districts** and **12,500 school districts**, plus states, public colleges and other public bodies. Entity volumes run from about 1,500 pages (a city RFQ) to 10,000+ PDFs (a mid-size city RFP). Manual remediation lists at about **$4–$15 per page** (forms up to about $60 per page); AI-only pipelines cost cents per page. Per-entity spend in board records runs from about $2–5k per year (small bodies) to about $100k per year (large counties). My estimate of total addressable spend is low-to-mid hundreds of millions of dollars per year, an inference.

### Cited Findings
- **Entity counts.**
  - The Census of Governments counted **90,837 local governments in 2022 and 91,438 in 2025** ([Census Government Organization Summary Report 2022 & 2025](https://www.census.gov/library/publications/2026/econ/govtorg2225.html)).
  - A Census-based analysis puts 2022 special districts at **39,313** and school districts at **12,545** ([GatherGov](https://gathergov.com/methodology/unraveling-the-black-box-of-local-government)). Its total (90,498) differs slightly from Census.
- **Document volumes in solicitations.**
  - City of Madison RFP: remediate **10,000+ web-based PDFs** over 12 months; proposals due 7 January 2026 ([Starbridge](https://starbridge.ai/buyer/city-of-madison-32/rfps)).
  - City of Tampa RFQ: about **1,500 pages** to WCAG 2.2 AA; due 14 April 2026 ([SamSearch](https://samsearch.co/gov-explore/sled/comprehensive-ada-document-remediation-services/254439)).
  - University of North Dakota: CMS PDF remediation software for about **2,500 PDFs** ([Govly award](https://app.govly.com/public/awards/a932e8fb899eedffe811f7ca7a970afe)).
- **Baseline inaccessibility (proxy).** A 2026 study found only **9.5%** of PDFs on German public-sector websites were accessible, and over a third were structurally inaccessible from the start ([PDF Association](https://pdfa.org/only-95-accessible-what-a-new-study-on-pdf-accessibility-in-the-public-sector-reveals/)). No equivalent US audit was found.
- **Per-page pricing (published, mostly vendor-sourced):**

  | Source | Price | Notes |
  |---|---|---|
  | [Venngage guide (July 2026)](https://venngage.com/blog/pdf-accessibility-cost/) | $5–$25/page | Average range |
  | [Equalify doc (March 2026)](https://equalify.uic.edu/EqualifyEverything/equalify-docs/blob/main/reflow/sources.md) | $1–$11.50/page | Most vendors at $5–$8 |
  | [Accessible.org](https://accessible.org/?p=1011030) | $7.50–$11.50/page | By complexity |
  | [Harvard vendor list](https://accessibility.huit.harvard.edu/doc-vendors.md): Documenta11y | $4/page simple, $8/page complex | |
  | [Harvard vendor list](https://accessibility.huit.harvard.edu/doc-vendors.md): GrackleDocs | $5.50/page simple, $13.20/page complex; **$60.50/page** for forms/OCR | +25% rush |
  | [DigitalA11Y](https://www.digitala11y.com/?p=24025) | $4–$10/page | |
  | [SecureScan](https://www.securescan.com/services/pdf-remediation/) | **$0.30/page** automated; $12+/page human-reviewed | |
  | Allyant (Syracuse figure cited in [Equalify](https://equalify.uic.edu/EqualifyEverything/equalify-docs/blob/main/reflow/sources.md)) | $5–$8/page manual | 50% rush surcharge; currency unconfirmed |
  | Ohio State estimate ([ASU challenge page](https://smartchallenges.asu.edu/challenges/pdf-accessibility-ohio-state-university)) | $3–$4/page manual | |
  | AWS / ITHAKA ([AWS blog](https://aws.amazon.com/blogs/publicsector/how-ithaka-built-an-on-demand-pdf-remediation-pipeline-on-aws/)) | $1–$4/page manual | |
  | CNI higher-ed pilot ([CNI](https://www.cni.org/wp-content/uploads/2025/12/CNI_Project_Tressler.pdf)) | $4–5+/page manual vs **about $0.06/page AI** | |
  | ASU/AWS open-source pipeline ([AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-hvqjpfphsec6y)) | About $0.015 per 10 pages, plus Adobe API costs | 3.5 min for a 17-page PDF |
- **DOJ cost estimates for education** (via an SIIA whitepaper, reported by [K-12 Dive](https://www.k12dive.com/news/edtech-website-accessibility-compliance-schools-disability/719161)):
  - $1.134B for K-12 classroom courses
  - $5.5B for postsecondary courses
  - $113.8M to remediate existing third-party websites for school districts, and $93.6M for higher education

  A K-12 association survey found most districts would struggle to pay; one official called the rule "unfunded" (same source).
- **Per-entity spend data points.**
  - Des Moines area, Iowa ([Axios Des Moines, January 2026](https://www.axios.com/local/des-moines/2026/01/22/ada-online-document-purge-disabilities-harkin)):
    - one city earmarked **$40,000**
    - another bought a one-year **$2,300** AudioEye trial
    - a Virginia county approved **$41,900**: $21,000 for remediating existing documents plus $20,900 per year for monitoring
    - some cities fold costs into website redesigns
  - Riverside County, CA: DocAccess SaaS, sole-source, capped at **$198,575 through July 2028**, plus a $19,857 contingency ([Riverside County BOS agenda, 12 May 2026](https://media.rivcocob.org/proceeds/2026/p2026_05_12_files/03.21001.pdf)).
  - Clark County, OH: DocAccess PDF remediation **$29,800** plus AudioEye **$12,873.13** for the rest of 2026 ([Citizen Portal](https://citizenportal.ai/articles/8730869/ohio/clark-county/clark-county-approves-civicplus-contract-for-pdf-and-website-accessibility-tools); [Clark County agenda](https://www.clarkcountyohio.gov/AgendaCenter/ViewFile/Agenda/_03042026-1219)).
  - Ashtabula County, OH: DocAccess plus AudioEye, not to exceed $17,262.56 initially, then $20,000 in 2027 and $30,000 per year thereafter ([Ashtabula packet](https://crms-public-prod.ashtabulacounty.gov/pdfs//R3613/R3613-Packet.pdf)). The figures are internally inconsistent per the search summary.
  - Northern Sierra Air Quality Management District (a special district): about **$4,800 per year** subscription, per an aggregator ([CivicIQ](https://civiciq.com/public-contract/907f93fe-b810-4d20-b973-0fa3babda110)).
  - Washington State DES: a five-year document accessibility remediation cooperative contract valued at **$5.5M**, open to eligible WA public entities (vendor announcement: [Optimal Solutions Group](https://optimalsolutionsgroup.com/?p=5499)).

### Inferences
- **Most entities are small.** From background knowledge, the large majority of the about 91k local governments serve fewer than 50k people. They face the 2028 date and have the smallest budgets (the $2–5k per year observations). The 2027 cohort (50k+) is the near-term, better-funded segment; count unverified, likely low thousands.
- **Rough spend sizing.** This is an inference with stated assumptions, not a sourced figure:
  - Small entities: if about 35–40% of the roughly 89k small ones buy something at about $3–5k per year, that is about $100–180M per year.
  - Large entities: about 2–3k at about $30–100k per year, roughly $60–300M per year.
  - States, public universities and K-12 courseware are additive (DOJ's $5.5B postsecondary course estimate is mostly faculty labor, not vendor spend).
  - Result: **low-to-mid hundreds of millions of dollars per year across all vendors**, with a one-time backlog bump in 2026–2028. That supports a niche services business, not a venture-scale software category.
- **Price compression is under way.** The spread from $5–15 (manual) to $0.30 (automated tier) to about $0.06 (AI pilot) per page shows it. Buyers seeing DocAccess subscriptions of $4.8k–$100k per year will benchmark against flat fees, not per-page rates.

### Gaps
- Count of Title II entities above and below 50k population: not found.
- No US audit of PDFs per government website or share inaccessible.
- DOJ's 2024 Regulatory Impact Analysis totals for state and local governments (not education) were not retrieved.
- No market-research TAM for "document accessibility remediation" was found. The sizing above is my inference.
- Commercial AI "$2/page, basic $0.50/page" offers appeared in one search summary, but attribution to a specific vendor was unclear, so they are excluded.

## 3. Full competitor landscape with pricing; is the long tail unserved?

### Takeaway
The market is crowded at every layer:
- **CMS/agenda vendors:** CivicPlus/Municode/Streamline/DocAccess, plus Diligent BoardDocs via DocAccess.
- **Web accessibility platforms:** Siteimprove PDF agents; AudioEye resold by CivicPlus.
- **Remediation specialists:** Allyant/CommonLook AI, Equidox, Continual Engine, Grackle, Appligent, Deque, regional firms on state cooperative contracts.
- **Near-free tooling:** Adobe Auto-Tag in Acrobat Pro; the MIT-licensed ASU/AWS pipeline.

The long tail is **not unserved**. CivicPlus deliberately bought into special districts and bundles PDF accessibility with the website. The one structural weakness is that DocAccess-style HTML "transcripts" leave the original PDF untouched, which may not satisfy the rule's narrow allowance for alternate versions.

### Cited Findings
**Government CMS and agenda vendors (bundling threat):**
- **CivicPlus acquired Streamline** (announced 18 December 2025). Streamline "serves over 2,500 public agencies nationwide, with a focus on special districts and ADA compliance." The deal included Streamline's special-district website product and **DocAccess** ([CivicPlus](https://www.civicplus.com/news/nn/civicplus-acquires-streamline/); [press release](https://markets.financialcontent.com/times-online/article/gnwcq-2025-12-18-civicplus-expands-accessibility-and-special-district-offerings-with-streamline-acquisition); [Willkie](https://www.willkie.com/news/2025/12/willkie-advises-civicplus-on-acquisition-of-streamline)).
- **What DocAccess does.** It converts PDFs into "WCAG 2.1 AA-aligned HTML transcripts", translatable into 150–250+ languages. Original PDFs "remain unchanged as the official record," pitched as accessibility "without manual remediation" ([CivicPlus DocAccess](https://www.civicplus.com/web-accessibility-software/docaccess/); [CivicPlus blog, March 2026](https://www.civicplus.com/blog/am/meet-accessibility-and-language-access-mandates-without-changing-official-records/); [CivicPlus fact sheet](https://www.civicplus.com/fact-sheets/am/agenda-accessibility-and-translation-powered-by-docaccess/)).
- **Diligent + CivicPlus DocAccess integration** (22 September 2026). It automatically generates HTML alternatives for **archived and newly uploaded** PDFs in Diligent Community, **BoardDocs and iCompass**, the dominant board and agenda platforms ([Diligent newsroom](https://www.diligent.com/company/newsroom/diligent-announces-integration-with-civicplus-docaccess); [Diligent DocAccess](https://www.diligent.com/docaccess)).
- **CivicPlus and Allyant partnership** (July 2024). It offers CivicPlus local-government customers "a comprehensive suite of PDF accessibility software and remediation technology" ([Business Wire](https://www.businesswire.com/news/home/20240716151444/en/Allyant%C2%AE-Partners-with-CivicPlus%C2%AE-to-Empower-Local-Governments-with-PDF-Accessibility-Remediation)).
- **CivicPlus bundles AudioEye** with DocAccess in county contracts (Clark County and Ashtabula County, OH; see section 2) ([Citizen Portal](https://citizenportal.ai/articles/8730869/ohio/clark-county/clark-county-approves-civicplus-contract-for-pdf-and-website-accessibility-tools)).
- **Municode** was purchased by CivicPlus (noted in a 2023 Addison, TX council presentation) ([Addison TX](https://agendas.addisontx.gov/docs/2023/CM/20231024_7136/5062%5FWebsite%5FCouncil%5FPresentation.pdf)).
- **Granicus, Tyler, Revize.** Searches found no 2026 document-remediation product launch from Granicus, Tyler Technologies or Revize. Granicus markets products built for "compliance, accessibility, and transparency requirements" generically ([Granicus](https://granicus.com/llms.txt)).

**Web accessibility platforms adding PDF remediation:**
- **Siteimprove.**
  - Spring '26 release (9 June 2026): launched a **PDF Remediation Agent** (auto-tagging, structure, heading fixes; WCAG and PDF/UA target), with fully automated, expert-led or hybrid options ([Siteimprove Spring 2026](https://www.siteimprove.com/launch/spring-2026-release/)).
  - Fall '26 release (13 October 2026): added PDF Policies, alt-text generation for PDF images, and a CMS Remediation Agent for Drupal and WordPress, citing the Title II dates ([Siteimprove Fall 2026](https://www.siteimprove.com/launch/fall-2026-release/)).
  - Siteimprove publicly argues that PDF-to-HTML converters "change nothing about the documents themselves" and that blanketing a site with converted alternates may conflict with the rule's conditions for alternate versions ([Siteimprove](https://www.siteimprove.com/blog/pdf-to-html-converters-accessibility/)).
- **AudioEye.** Sold directly (an Iowa city's $2,300 one-year trial) and via CivicPlus ([Axios](https://www.axios.com/local/des-moines/2026/01/22/ada-online-document-purge-disabilities-harkin)).
- **accessiBe (overlay caution).** The FTC announced a proposed order on 3 January 2025 alleging that claims accessWidget could make any site WCAG-compliant were false or unsubstantiated, plus undisclosed paid reviews. The final consent order requires a **$1M** payment. Sources differ on the final date (15 vs 22 April 2025) ([LF Legal](https://www.lflegal.com/?p=61630); [TestParty, a competitor](https://testparty.ai/blog/are-accessibility-overlays-legal)). accessiBe still markets a government platform ([accessiBe](https://accessibe.com/industry/government)).

**PDF remediation specialists:**
- **Allyant (CommonLook):** launched an AI-powered, web-based CommonLook PDF in July 2025, explicitly citing Title II ([Business Wire](https://www.businesswire.com/news/home/20250708014451/en/Allyant-Announces-the-Launch-of-its-AI-Powered-PDF-Remediation-Software)). It holds a State of Iowa cooperative contract (2024-BUS-0416A, renewals through February 2028) with a SHI/Sourcewell participating addendum listed ([Pavilion](https://www.withpavilion.com/solicitations/118da3cc-70a0-4afc-b547-269672f8b833/contracts/state-of-iowa_2024-bus-0416a_netcentric-technologies-inc-)). Manual pricing is about $5–8 per page (section 2).
- **Equidox:** AI tagging with a zone-based interface, aimed at government and higher ed. No public pricing ([TrustRadius](https://www.trustradius.com/products/equidox/pricing); [Continual Engine comparison](https://www.continualengine.com/blog/best-pdf-accessibility-vendors/)).
- **Continual Engine (PREP):** won UND's CMS PDF remediation software award, **$7,850 for about 2,500 PDFs**, about $3 per PDF ([Govly](https://app.govly.com/public/awards/a932e8fb899eedffe811f7ca7a970afe)).
- **GrackleDocs and Documenta11y:** priced per page (section 2) ([Harvard](https://accessibility.huit.harvard.edu/doc-vendors.md)).
- **Ohio State remediation supplier list:** Allyant, **Appligent**, **Deque**, Mobikasa ([OSU DAS](https://das.osu.edu/resources/pdf-remediation-suppliers)).
- **Washington State DES cooperative contract 02024 (2026–2029):** awardees include Optimal Solutions Group and Access Ingenuity ([Optimal](https://optimalsolutionsgroup.com/?p=5499); [Access Ingenuity](https://linkedin.com/company/access-ingenuity)).
- **Adobe:** Auto-Tag API (Adobe Sensei), with a tagging report that flags content for review. PDF Services gives 500 free transactions per month; enterprise pricing is unpublished and a fall-2025 forum thread complains sales didn't respond ([Adobe pricing](https://developer.adobe.com/document-services/pricing/main); [Adobe community](https://community.adobe.com/t5/acrobat-services-api-discussions/enterprise-pricing-for-pdf-services-api-and-auto-tagging-api/m-p/15517374)). Engadget (2025) reported Auto-Tag coming to **Acrobat Pro at no extra cost** ([Engadget](https://www.engadget.com/adobes-new-ai-automates-pdf-accessibility-tags-130019203.html)).
- **ASU AI Cloud Innovation Center / AWS:** an **MIT-licensed open-source** PDF remediation pipeline targeting WCAG 2.1 AA, built on AWS plus the Adobe Auto-Tag API ([AWS Public Sector blog](https://aws.amazon.com/blogs/publicsector/from-inaccessible-to-inclusive-how-the-new-pdf-accessibility-remediation-solution-helps-institutions-compliantly-address-accessibility-requirements); [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-hvqjpfphsec6y)).

**AI-native entrants (2024–2026):**
- **QyrosXS:** an AI PDF remediation product on AWS Marketplace, explicitly targeting Title II and claiming veraPDF PDF/UA-1 validation ([AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-ynb6jp67w7oqe)).
- **Klartext AI (Vienna), Doclarity:** €75k non-dilutive grant ([Dealroom](https://dealroom.co/news/145984-viennas-klartext-ai-lands-75k-grant-for-accessible-pdf-tool-doclarity/)).
- **DocAxess (France, founded 2020):** AI-based remediation ([DocAxess](https://docaxess.ipedis.com/en/pdf-remediation-at-scale-debunking-myths-and-unveiling-realities)).
- **Sanlekh (India):** remediation services firm ([Bouncewatch](https://bouncewatch.com/company/sanlekh-accessibility)).
- No large 2024–2026 venture round for AI document remediation was found in two targeted searches. accessiBe's $58.5M total is from 2019–2022 ([Extruct](https://www.extruct.ai/hub/accessibe-com-funding/)).
- **Managed service providers.** VC3, an MSP serving municipalities, co-runs North Carolina League of Municipalities webinars on making PDFs accessible (28 July 2026) ([NCLM](https://election.nclm.org/member-services/ada-digital-compliance/)).

**Background knowledge, not verified this session:**
- Level Access merged with eSSENTIAL Accessibility (2022) and reportedly acquired UserWay (around 2024–25).
- Acquia owns Monsido.
- Deque (axe), Pope Tech, DubBot and Silktide sell scanning and monitoring, widely used in higher ed and K-12.
- AbleDocs (axesPDF/axes4), Crawford Technologies (transactional documents), PDFix and AccessiblePDF are additional remediation vendors.
- Microsoft Office's accessibility checker and tagged-PDF export cover born-digital Word documents.
- Ally (Anthology) covers LMS course files.

### Inferences
- **The "zero YC companies" signal was misleading.** The category is served by about 20 identifiable vendors across four layers, plus free tooling. Venture absence likely reflects a modest, services-heavy, procurement-gated market, not an open gap.
- **The long tail is being captured by distribution, not quality.** CivicPlus now touches websites (CivicPlus, Streamline), codes (Municode), agendas (its own product plus the Diligent/BoardDocs integration) and accessibility (DocAccess, Allyant, AudioEye). A small special district buys a $4,800-per-year add-on from the vendor already hosting its site; a startup can't beat that cost of sale.
- **One real crack: whether HTML alternates count as compliance.** From background knowledge, 28 CFR 35.202 in the 2024 rule permits conforming alternate versions only where making content directly accessible is not possible due to technical or legal limitations. If that reading holds, DocAccess-style "PDF unchanged plus HTML transcript" is legally exposed. Siteimprove is already marketing on that point. This is a wedge argument for true tagged-PDF remediation, but it needs a lawyer's confirmation and is not proven.
- **The real competition for paid remediation is incumbents' automated tiers.** Allyant AI, Siteimprove agents, Adobe in Acrobat Pro and the free ASU pipeline set a near-zero price anchor for automated output, leaving value only in **verified human QA and accountability**.

### Gaps
- No public pricing found for Equidox, Continual Engine PREP (beyond the UND award), AbleDocs, Allyant software, Siteimprove agents, Level Access, Deque, Pope Tech, DubBot, Silktide or Monsido.
- Not verified: Level Access/UserWay deal terms, the AudioEye government product line, Tyler/Revize/Granicus accessibility partnerships, and any Sourcewell or TIPS remediation contract. The search found none; only the Iowa contract's Sourcewell addendum was mentioned.
- CivicPlus's market share among local governments is not quantified this session.
- No legal opinion found on whether DocAccess HTML transcripts satisfy 28 CFR 35.202.

## 4. Evidence of willingness to pay (RFPs, awards, budgets, cooperative contracts, cost panic)

### Takeaway
Willingness to pay is confirmed and observable:
- live RFPs and RFQs (Madison, Tampa, Fresno County, NJ DOE, Utah SBE)
- board-approved contracts ($4.8k to about $200k)
- a $5.5M statewide cooperative contract (Washington)
- local press on "document purges" and earmarked budgets

Spend per entity is modest and often sole-sourced to the incumbent website vendor. Cost panic is real but expressed as deleting content as often as buying remediation.

### Cited Findings
- **Solicitations:**
  - City of Madison: 10,000+ PDFs, due January 2026 ([Starbridge](https://starbridge.ai/buyer/city-of-madison-32/rfps)).
  - City of Tampa: about 1,500 pages, due April 2026 ([SamSearch](https://samsearch.co/gov-explore/sled/comprehensive-ada-document-remediation-services/254439)).
  - Fresno County E-RFP 26-077: document accessibility remediation **software**, closed 25 August 2026 ([Starbridge](https://starbridge.ai/rfp/e-rfp-26-077-document-accessibility-remediation-software)).
  - NJ Department of Education RFQ 26-006: PDF remediation and training, due 20 February 2026 ([NJ DOE](https://nj.gov/education/purchasing/docs/26006_RFQ.docx)).
  - Utah State Board of Education: document editing and 508 remediation RFP, open through 30 June 2027 ([Starbridge](https://starbridge.ai/rfp/document-editing-and-508-remediation-rfp)).
  - Harper College Q01214: digital accessibility services; LMS documents in scope, public-facing documents excluded ([Harper College](https://www.harpercollege.edu/about/directory/accounting/pdf/Q01214%20Digital%20Accessibility%20Services%20-%20Addendum.pdf)).
- **Awards and approvals:**
  - Riverside County: DocAccess up to $198,575, sole source.
  - Clark County, OH: $29,800 DocAccess plus $12,873 AudioEye.
  - Ashtabula County, OH: about $17k initial, then $20–30k per year.
  - Northern Sierra AQMD: $4,800 per year.
  - UND: Continual Engine, $7,850.
  - WA DES: $5.5M over five years.
  - Iowa cooperative: Allyant.

  (Sources in sections 2–3.)
- **Budget lines:** one Iowa city set aside $40,000; a Virginia county approved $41,900, including $20,900 per year for monitoring ([Axios](https://www.axios.com/local/des-moines/2026/01/22/ada-online-document-purge-disabilities-harkin)).
- **Cost panic and avoidance.** Des Moines-area governments told Axios the rule "is leading to the removal of some online content." One Iowa county said "the vast majority of documents will be deleted from the website, made ADA-compliant and re-uploaded," with some deleted permanently. Advocates object ([Axios](https://www.axios.com/local/des-moines/2026/01/22/ada-online-document-purge-disabilities-harkin)).
  - NACo's coverage is headlined "PDFs are DOA" ([NACo](https://www.naco.org/news/pdfs-are-doa-new-web-standards-approach)), and NACo published a 2026 Tech Xchange accessibility report ([NACo report](https://www.naco.org/sites/default/files/2026-04/2026NACo%20Tech%20Xchange%20Accessibility%20%28ADA%29%20Report_v7.pdf)). Neither could be read.
  - The Maryland Association of Counties ran "Countdown to Compliance" guidance ([Conduit Street](https://conduitstreet.mdcounties.org/2026/03/13/countdown-to-compliance-what-counties-need-to-know-about-new-ada-digital-accessibility-standards/)).
- **K-12 strain.** Most districts in an association survey said they would struggle to pay; one official called it "unfunded" ([K-12 Dive](https://www.k12dive.com/news/edtech-website-accessibility-compliance-schools-disability/719161)).
- **Vendor messaging.** CivicPlus says manual remediation "isn't sustainable at scale" for many municipalities, citing limited staff and expertise ([CivicPlus](https://www.civicplus.com/?p=24725)). This is a vendor claim.
- **Cooperative purchasing:** WA DES contract 02024 and the Iowa cooperative contract were confirmed. No Sourcewell or TIPS remediation contract was found ([Optimal](https://optimalsolutionsgroup.com/?p=5499); [Pavilion](https://www.withpavilion.com/solicitations/118da3cc-70a0-4afc-b547-269672f8b833/contracts/state-of-iowa_2024-bus-0416a_netcentric-technologies-inc-)).

### Inferences
- **Buyers prefer the incumbent.** Sole-source approvals (Riverside) and bundles (Clark, Ashtabula) show buyers favour the website vendor's add-on over competitive per-page services. Competitive RFPs mainly come from larger cities, state agencies and universities.
- **"Delete and re-upload" signals price sensitivity.** Triage (what is in scope, what can be archived) is worth as much to buyers as remediation, and is a lower-friction entry product.
- **Timing.** The April 2026 IFR likely deferred some 2026 purchases into Q4 2026 to Q1 2027 for the 50k+ cohort. That is the window now open.

### Gaps
- No Reddit or forum quotes were retrieved: a search for Reddit discussion returned only vendor pages.
- No count of remediation RFPs per year; Starbridge and Govly listings imply many but no total.
- Award values for Madison and Tampa were not found.
- State small-purchase thresholds (below which no RFP is needed) were not checked.

## 5. AI quality: can AI produce compliant tagged PDFs, and what does it mean for margins?

### Takeaway
No independent benchmark shows AI-only remediation reliably producing WCAG/PDF-UA-conformant PDFs. The evidence points the other way:
- DOJ cited "limits of generative AI for remediation" as a reason for the delay.
- Reading order on complex layouts and table headers remain failure points.
- Vendors and Siteimprove report automatically "remediated" files that pass checkers but are unusable with screen readers.

AI cuts per-page labor sharply (cents of compute vs $3–15 manual). Human QA is still required for compliance-grade output, so margins depend on QA minutes per page.

### Cited Findings
- **DOJ's own view.** It listed "slower-than-expected technological solutions (including limits of generative artificial intelligence for remediation)" among its reasons ([JD Supra](https://www.jdsupra.com/legalnews/doj-delays-ada-web-accessibility-7295347/)).
- **Controlled study (not AI-only).** On scientific PDFs remediated with PAVE 2.0, a footer-like block was misplaced in reading order on page 1 in **15 of 19** PDFs. Experienced users did not reliably beat novices on reading order ([arXiv 2503.22216](https://arxiv.org/pdf/2503.22216)).
- **Tables.** Siteimprove's agent repairs spans and sets header cells, but tables where "headers could not be reliably determined are flagged for review" ([Siteimprove help](https://help.siteimprove.com/support/solutions/articles/80001215024-how-pdf-remediation-works)).
- **Checker-passing files can still be unusable.** Siteimprove reports "remediated" PDFs that passed automated checks but were "completely unusable with a screen reader" ([Siteimprove](https://www.siteimprove.com/blog/guided-vs-automated-pdf-remediation/)).
- **Hard layouts.** Multi-column layouts, sidebars, callouts, newsletters and brochures "frequently confuse automated reading-order detection" ([Skynet Technologies](https://www.skynettechnologies.com/blog/ai-vs-human-pdf-accessibility); [EZUD](https://ezud.com/automated-pdf-remediation-ai/)).
- **Human review.** Best practice is to flag low-confidence fixes for human review. Adobe's guidance (via Equidox) calls for checking alt text, complex tables, title and reading order ([Equidox](https://equidox.co/?p=19851)).
  - Adobe's Auto-Tag output includes a report of items needing review ([Adobe](https://developer.adobe.com/document-services/pricing/main)).
- **AI pilot results.** A higher-ed pilot reported automated-check pass rates rising from about **52.5% to 93.7%** after AI remediation at about **$0.06 per page** ([CNI](https://www.cni.org/wp-content/uploads/2025/12/CNI_Project_Tressler.pdf)). These are checker pass rates, not full manual WCAG conformance.
- **Vendors sell hybrid tiers.** Siteimprove offers automated, expert-led or hybrid ([Siteimprove Spring 2026](https://www.siteimprove.com/launch/spring-2026-release/)); SecureScan sells $0.30 per page automated vs $12+ per page human-reviewed ([SecureScan](https://www.securescan.com/services/pdf-remediation/)).

### Inferences
- **What AI can do now.** It plausibly handles most simple, born-digital, single-column text documents (agendas, minutes, letters) with light QA. Complex tables, fillable forms, scanned documents and multi-column reports still need substantial human work. That matches the price ladder: Grackle's forms at $60.50 per page vs about $5.50 simple.
- **Margin model** (my estimate, not sourced):
  - Compute: about $0.01–0.10 per page.
  - QA for simple pages: about 1 minute per page at $30–40 per hour, roughly $0.50–0.70 per page.
  - QA for complex pages: 5–10+ minutes per page, roughly $3–7 per page.
  - Selling at $2–4 per page blended (vs $5–15 manual) gives about 60–75% gross margin on simple-heavy mixes such as agendas and minutes, falling sharply on table- and form-heavy mixes.
- **Liability favours accountable human QA.** The FTC's accessiBe order and DOJ's AI caveat mean "AI-only, guaranteed compliant" claims carry legal risk. The defensible product is AI plus human-certified output with a conformance report (PAC/veraPDF plus manual screen-reader checks), sold as accountability.
- **Benchmark risk.** If frontier vision models close the reading-order and table gap during 2027, incumbents' automated tiers improve for free and per-page prices collapse. A per-page business must expect price decline.

### Gaps
- No independent 2025–2026 benchmark of AI PDF remediation against full manual WCAG/PDF-UA audits was found.
- No published measure of human QA minutes per page after AI pre-tagging.
- No accuracy data for the ASU/AWS pipeline, Allyant AI, Siteimprove's agent or QyrosXS.

## 6. Best wedge for a 1–5 person team: channel, price, first 10 customers, kill criteria

### Takeaway
Do **not** pursue generic "AI per-page PDF remediation for small towns and special districts". CivicPlus, Diligent, AudioEye and Siteimprove already bundle it at $5–30k per year, and free Adobe/ASU tooling anchors automated output near zero.

The most viable wedge is **compliance-grade (tagged PDF/UA plus human QA) remediation with up-front in-scope triage**, sold to the **50k+ cohort** (26 April 2027 deadline), public universities and state agencies. Sell through:
- competitive RFPs and state cooperative contracts
- subcontracting to awarded primes and MSPs
- white-labelling for website vendors that lack a document product (Revize, Granicus and Tyler had no product found)

Expect a services business, not defensible SaaS.

### Cited Findings
- **Long tail is bundled.** CivicPlus bought Streamline (2,500+ agencies, special-district focus) with DocAccess ([CivicPlus](https://www.civicplus.com/news/nn/civicplus-acquires-streamline/)). DocAccess is integrated into BoardDocs and iCompass ([Diligent](https://www.diligent.com/company/newsroom/diligent-announces-integration-with-civicplus-docaccess)). It is priced as low as $4,800 per year for a special district ([CivicIQ](https://civiciq.com/public-contract/907f93fe-b810-4d20-b973-0fa3babda110)).
- **Competitive buying exists in the 50k+ and institutional segments:**
  - Madison (10,000+ PDFs), Tampa (1,500 pages), Fresno County (software)
  - NJ DOE and Utah SBE (open to June 2027)
  - Ohio State's multi-vendor supplier list
  - WA DES contract 02024 with multiple awardees

  ([Starbridge](https://starbridge.ai/buyer/city-of-madison-32/rfps); [SamSearch](https://samsearch.co/gov-explore/sled/comprehensive-ada-document-remediation-services/254439); [Starbridge](https://starbridge.ai/rfp/document-editing-and-508-remediation-rfp); [OSU](https://das.osu.edu/resources/pdf-remediation-suppliers); [Optimal](https://optimalsolutionsgroup.com/?p=5499))
- **Leagues and MSPs educate the market.** The NC League of Municipalities hosts ADA digital compliance resources and VC3 webinars on PDFs ([NCLM](https://election.nclm.org/member-services/ada-digital-compliance/)). No league-endorsed remediation vendor or member discount was found.
- **Buyers triage first.** Iowa governments are deleting, fixing and re-uploading, and experts note much of the rule applies to future documents ([Axios](https://www.axios.com/local/des-moines/2026/01/22/ada-online-document-purge-disabilities-harkin)).
- **A rival is attacking HTML alternates.** Siteimprove argues blanket HTML alternates may conflict with the rule's alternate-version conditions ([Siteimprove](https://www.siteimprove.com/blog/pdf-to-html-converters-accessibility/)).
- **Price anchors:**
  - manual $4–15 per page; forms about $60 per page
  - automated $0.30 per page
  - software about $3 per PDF (UND)
  - SaaS bundles $4.8k–$100k per year

  (section 2)

### Inferences
- **Recommended wedge: "Triage plus certified remediation."**
  1. **Inventory and triage** (fixed fee, about $1.5–5k): crawl the entity's site; classify every PDF as in scope, archivable (exception) or delete; flag complexity; produce a remediation plan and quote. This is low-risk for buyers, fits under small-purchase thresholds (threshold levels unverified), and directly addresses the "delete or fix?" panic.
  2. **Certified remediation** at about **$2–4 per page** for simple documents and **$8–15 per page** for tables and forms, roughly 40–60% below manual vendors. Each document gets a PAC/veraPDF report plus a manual screen-reader QA log.
  3. **Ongoing flow subscription** for new agendas, minutes and forms (for example $500–2,500 per month, sized by volume), positioned as compliance-grade tagged originals rather than HTML transcripts.
- **Channels, ranked:**
  1. **Subcontract or white-label** to prime contractors on state cooperative vehicles (WA DES 02024 awardees, Iowa) and to municipal MSPs like VC3. Fastest revenue, no procurement cycle.
  2. **Competitive RFPs** surfaced by Starbridge, Govly, BidNet or DemandStar for 50k+ cities and counties, state agencies and universities (higher ed carries the largest DOJ cost estimates).
  3. **Partnerships with non-CivicPlus web vendors** (Revize, Granicus, smaller regional CMS shops) that need a document answer to compete with CivicPlus/DocAccess.
  4. **State municipal and county associations** (webinars, conference booths): useful for credibility, but they host vendors rather than endorse them.
- **Path to the first 10 customers:**
  - Pick 1–2 states with active pain (Iowa per Axios; North Carolina per NCLM activity).
  - Offer free or low-cost PDF inventory reports to every 50k+ city and county there.
  - Convert to triage and remediation under the small-purchase threshold.
  - In parallel, bid 10–15 open RFPs and pitch 3–5 cooperative-contract primes for overflow subcontracts.
  - Realistic: 3–5 paying customers by early 2027 if execution is fast; the 2027 deadline compresses buying into Q4 2026 to Q2 2027.
- **Kill criteria** (any two should stop the effort):
  1. DOJ publishes an NPRM narrowing document obligations or delaying again before mid-2027 (watch the Unified Agenda and Federal Register).
  2. Fewer than 3 paid triage engagements, or a win rate below 20% on 10+ RFP or subcontract bids, by 31 March 2027.
  3. Measured human QA exceeds about $1.50 per simple page at target quality, making $2–4 per page uneconomic.
  4. Buyers and counsel broadly accept DocAccess-style HTML alternates as compliant, removing the quality differentiator.
  5. CivicPlus, Siteimprove or Adobe automated tiers push market prices below $1 per page for "good enough" output.
  6. Average deal size stays under about $5k, with sales cycles over 6 months.
- **Overall re-score vs the earlier ranking.** Solution gap falls from 8 to about 4 (heavily served). Defensibility falls from 5 to about 3 (services; incumbents bundle). WTP evidence holds at about 7 (proven but modest). Pain holds at about 8. On those scores the idea likely drops out of the #1 spot.

### Gaps
- Small-purchase and quote thresholds by state not retrieved, so the triage price point is unvalidated.
- No interviews or forum quotes from clerks or ADA coordinators on what they would pay for, or on whether they distrust HTML transcripts.
- Sub-contractor margins and prime-contractor appetite for AI-assisted subcontractors are unknown.
- Not checked whether Revize, Granicus or Tyler already have undisclosed document partners (e.g., with Equidox or AudioEye).

## 7. Comparable non-US mandates (EU, Australia)

### Takeaway
The **European Accessibility Act** (applying from 28 June 2025) mainly covers private-sector products and services. EU public bodies are covered by the separate Web Accessibility Directive (background). Enforcement in year one has been complaint-driven, and reports of court actions are uncorroborated. EU public-sector PDFs are badly inaccessible (Germany: 9.5% accessible). Australia's federal agencies target WCAG 2.2 AA through policy, not a dated mandate like Title II. Both widen the market modestly but require local presence and languages.

### Cited Findings
- **EAA enforcement.** Year one was "complaint-driven and corrective-first" ([AllAccessible](https://allaccessible.org/blog/european-accessibility-act-one-year-on-2026-enforcement-update)).
  - A single source reports the first EAA court decision (Tribunal judiciaire de Lille, 5 May 2026) and a Caen court ordering Carrefour France to fix its site within six months ([Pinmeto](https://www.pinmeto.com/news/eu-accessibility-act-enforcement-french-courts-2026/)). Uncorroborated.
  - National penalty ceilings vary: Germany €100k, France about €75k, Spain up to €1M ([DisabilityWorld](https://www.disabilityworld.org/articles/eaa-first-year-enforcement-report/)). Figures differ across sources.
- **German public-sector PDFs.** Only 9.5% accessible; over a third structurally inaccessible from the start ([PDF Association](https://pdfa.org/only-95-accessible-what-a-new-study-on-pdf-accessibility-in-the-public-sector-reveals/)).
- **EU entrants.** Klartext AI (Austria, €75k grant) and DocAxess (France) are active ([Dealroom](https://dealroom.co/news/145984-viennas-klartext-ai-lands-75k-grant-for-accessible-pdf-tool-doclarity/); [DocAxess](https://docaxess.ipedis.com/en/pdf-remediation-at-scale-debunking-myths-and-unveiling-realities)).
- **Australia.**
  - The Department of the Prime Minister and Cabinet aims to conform to the Digital Service Standard and **WCAG 2.2 AA** ([PM&C](https://www.pm.gov.au/accessibility)).
  - Deque reports AHRC guidance (April 2025) under the Disability Discrimination Act recommending WCAG 2.2 AA as the minimum, and a DTA Digital Experience Policy for new government sites ([Deque](https://www.deque.com/blog/accessibility-updates-in-australia-in-2026/)). Primary documents not verified.

### Inferences
- **EU.** EU public-sector document remediation (Web Accessibility Directive) is a real but language-fragmented market with local incumbents. For a US-focused small team it is a later expansion, not a reason to start.
- **Australia.** Policy-driven demand without hard US-style dates, and a smaller market. Low priority.

### Gaps
- Web Accessibility Directive (2016/2102) obligations and enforcement for EU public bodies not verified this session (background only).
- EAA application date (28 June 2025) is from background knowledge and vendor sources; EUR-Lex not checked.
- Canada (Accessible Canada Act; Ontario AODA) and the UK (Public Sector Bodies Accessibility Regulations 2018) not covered.
