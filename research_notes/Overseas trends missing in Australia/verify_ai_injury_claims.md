# Verification: AI claims preparation for compensation claims (PI / CTP / workers' comp / TPD) in Australia

**Read this first:** this verification could not be carried out. The shared web-search budget for this turn was used up by other agents before this verifier's first query ran (the limit is 200 WebSearch calls per turn across all agents). All 6 searches attempted returned no results. The single WebFetch allowed by the brief failed with a DNS error (getaddrinfo ENOTFOUND). **No statement in these notes has been checked against a source.** Anything below that is not a search log or a gap comes from the verifier's prior knowledge (training data to about mid-2026) and is labelled as unverified. The report writer must not present this idea as "verified absent from Australia".

## Does any Australian business, pilot, or overseas entrant provide AI claim preparation for personal-injury/CTP/workers' comp/TPD claims in Australia?

### Takeaway
**VERDICT: INCONCLUSIVE (not verified). Provisional lean: PARTIAL. Confidence: 30%.** ABSENT cannot be issued. The decision rules allow ABSENT only after an exhaustive search finds nothing, and no search ran. Judging from prior knowledge alone, a full search is unlikely to return ABSENT (roughly 85–90% that it would not, unverified). Several adjacent categories very probably exist in Australia: AI assistants inside Australian practice-management software used by PI firms, insurer-side AI review of medical records and claims, and law-firm in-house triage tools. Under the brief, insurer-side AI on its own already scores PARTIAL. A purpose-built Australian equivalent of EvenUp or Supio (which would make the verdict PRESENT) is plausible given the 2024–26 legal-AI boom. However, the verifier knows of no specific one.

### Cited Findings
- **None.** No web evidence was retrieved in this session. Search log (the full list of queries run):
  1. WebSearch "EvenUp Australia personal injury law firms": not executed, turn budget exhausted, 0 results
  2. WebSearch "Wisedocs Australia insurer medical record review": not executed, 0 results
  3. WebSearch "medical chronology AI Australia lawyers": not executed, 0 results
  4. WebSearch "TPD claim AI Australia superannuation": not executed, 0 results
  5. WebSearch "personal injury AI startup Australia claims": not executed, 0 results
  6. WebSearch "Supio OR "Eve Legal" OR Precedent AI personal injury Australia": not executed, 0 results
  7. WebFetch https://www.wisedocs.ai/ (the one attempt the brief allows): failed, `getaddrinfo ENOTFOUND www.wisedocs.ai`
  - **Searches that returned results: 0 of 6 attempted (planned budget was about 35).** No workaround was tried: no curl or wget searching, no third-party readers, proxies or archives.

### Inferences
*There are no cited findings. Everything below is the verifier's prior-knowledge judgement (to about mid-2026). It is unverified and must not be cited as fact.*
- **Why ABSENT is unlikely (prior knowledge only):**
  - Australian practice-management vendors used by small and mid-size PI firms have added general AI assistants. LEAP has LawY and Matter AI; Smokeball has Archie. These can summarise documents such as medical reports. The brief counts "AI features in Australian legal practice software marketed for personal-injury claim preparation". Whether either is *marketed for PI claim preparation* is the deciding question, and it is unknown.
  - Insurer-side AI review of medical records and claim documents is a mainstream use case for life, disability and workers' comp insurers worldwide. Deployment by at least one Australian life insurer or workers' comp claims manager is likely but unconfirmed. The brief rates this as PARTIAL.
  - The brief's own lead, Maurice Blackburn's 2020 in-house TPD triage tool, would on its description be intake triage rather than claim preparation. It would be an in-house tool, not a product for sale, so at most PARTIAL.
- **Why PRESENT cannot be ruled out:** general legal-AI adoption by Australian firms accelerated in 2024–26. A local start-up, a medico-legal provider or an offshore medical-chronology vendor could be serving Australian PI or TPD firms without the verifier knowing. Medical chronologies and TPD claim bundles are document-heavy and suit automation well. The verifier has no specific name to put forward.
- **Structural difference (analysis, unverified):** the US exemplars centre on demand letters and damages valuation for negotiating with third-party liability insurers. Much of Australian volume runs through statutory schemes with prescribed forms and impairment-assessment pathways: NSW CTP under SIRA, Victoria's TAC, workers' comp, and TPD claims made through superannuation trustees and group life insurers. A local product would therefore centre on scheme forms, medical chronologies, impairment and capacity evidence, and TPD claim packs rather than US-style demand letters. A follow-up search should treat any tool doing those jobs as "the same or similar".

### Gaps
**Every lead in the brief is unresolved.** The "Homepage" column only identifies each entity. It is not a source, and the descriptions are unverified prior knowledge.

| Entity | Homepage (ID only) | Understood to do (unverified) | Would it count? | Status |
|---|---|---|---|---|
| EvenUp (US) | https://www.evenuplaw.com | AI demand letters, medical chronologies and damages for US PI firms | PRESENT if serving Australian firms | Unresolved; no Australia/NZ presence known |
| Supio (US) | https://www.supio.com | AI case analysis and medical chronologies for US PI firms | PRESENT if serving Australian firms | Unresolved |
| Eve (US) | https://www.eve.legal | AI platform for US plaintiff firms | PRESENT if serving Australian firms | Unresolved |
| Finch (US), Precedent (US) | not verified | AI for PI firms and demand letters (per brief) | PRESENT if serving Australian firms | Unresolved |
| Wisedocs (Canada) | https://www.wisedocs.ai | AI medical-record review and summaries for insurers, IME firms and legal users | PARTIAL (insurer side); PRESENT if Australian law firms use it | Unresolved (fetch failed) |
| DigitalOwl | https://www.digitalowl.com | AI medical-record analysis for life and disability insurers | PARTIAL if deployed by Australian insurers | Unresolved |
| EvolutionIQ (US) | https://www.evolutioniq.com | AI claims guidance for disability and workers' comp insurers | PARTIAL if deployed in Australia | Unresolved |
| LEAP (AU): LawY, Matter AI | https://www.leap.com.au | Australian practice-management system; AI Q&A (LawY) and AI over matter documents (Matter AI) | PRESENT or PARTIAL if marketed for PI claim preparation; otherwise adjacent | **Top-priority lead**, unresolved |
| Smokeball (AU/US): Archie | https://www.smokeball.com.au | Practice-management system with Archie AI assistant (drafting and summarising) | As for LEAP | **Top-priority lead**, unresolved |
| Actionstep (NZ/AU) | https://www.actionstep.com | Practice-management system with PI workflows; AI features unknown | As for LEAP | Unresolved |
| Lawcadia (AU) | https://www.lawcadia.com | Legal procurement and matter management for in-house teams and insurers | Probably adjacent only | Unresolved |
| Josef (AU) | https://joseflegal.com | No-code legal automation and AI; could power firm-built TPD or PI intake and claim tools | PARTIAL or PRESENT depending on what was built | Unresolved |
| Maurice Blackburn | https://www.mauriceblackburn.com.au | Brief's lead: in-house TPD triage tool (2020); newer AI unknown | PARTIAL at most (in-house triage) | Unresolved |
| Slater and Gordon | https://www.slatergordon.com.au | AI use in claim preparation unknown | PARTIAL or PRESENT if in-house AI chronologies or claims | Unresolved |
| Shine Lawyers (Shine Justice, ASX: SHJ) | https://www.shine.com.au | AI use unknown; ASX annual reports would disclose tech investment | As above | Unresolved |
| Carter Capner Law | https://www.cartercapner.com.au | AI use unknown | As above | Unresolved |
| Gerard Malouf & Partners | https://www.gerardmalouf.com.au | AI use unknown | As above | Unresolved |
| TAL, AIA Australia, Zurich Australia, MLC Life | https://www.tal.com.au, https://www.aia.com.au, https://www.zurich.com.au, https://www.mlcinsurance.com.au | Possible gen-AI medical-record or claims summarisation | PARTIAL (counterpart) if confirmed | Unresolved |
| Workers' comp claims managers and insurers (icare/EML, Gallagher Bassett, Allianz, QBE) | not verified | Possible AI triage or medical-document processing | PARTIAL if confirmed | Unresolved |
| Australian medico-legal / IME providers (names to check, unverified: MLCOA, Red Health, Medilaw) | not verified | Possible AI medical chronologies or summaries for law firms | PRESENT or PARTIAL if offered to claimant firms | Unresolved |
| Adjacent, does not count: Lexis+ AI / Protégé, CoCounsel, Harvey, Legora, Microsoft Copilot; AI medical scribes (e.g., Heidi Health, Lyrebird Health) that IME doctors may use; plaintiff-firm marketing chatbots and "check your claim" quizzes | not verified | General legal AI, drafting, or doctor-side tools | Adjacent only | Unresolved |

- **Failed or defunct Australian attempts:** none known to the verifier; not searched.
- **New Zealand:** not searched. Unverified prior knowledge: ACC's no-fault scheme largely bars personal-injury damages suits, so NZ's claimant-side market would be small. Verify this.
- **Planned queries not executed** (for a re-run; about 35 searches, at least 80% on presence checks):
  - EvenUp Australia
  - Supio Australia
  - Eve / Finch / Precedent "personal injury" Australia
  - Wisedocs Australia
  - DigitalOwl Australia insurer
  - EvolutionIQ Australia
  - "medical chronology" AI Australia
  - "personal injury" AI lawyers Australia
  - TPD claim AI
  - CTP claim AI
  - workers compensation AI claim preparation Australia
  - medico-legal AI summary Australia
  - Maurice Blackburn AI TPD triage
  - Slater and Gordon AI
  - Shine Lawyers AI / Shine Justice annual report AI
  - Carter Capner AI
  - Gerard Malouf AI
  - LEAP Matter AI personal injury
  - Smokeball Archie personal injury Australia
  - Actionstep AI
  - Josef TPD OR "insurance claim"
  - Lawcadia AI
  - TAL generative AI claims
  - AIA / Zurich / MLC Life AI claims medical
  - icare / EML / Gallagher Bassett AI medical records
  - lawyersweekly.com.au AI personal injury
  - startupdaily.net legal AI claims
  - insurancenews.com.au AI medical records
  - riskinfo.com.au AI TPD claims
  - reddit r/auslaw AI personal injury
  - defunct "personal injury" legal tech Australia
  - plus 4–5 demand and regulation queries (see the third key question)

## What is the closest thing found, and how does it differ?

### Takeaway
Nothing was found in this session. Prior knowledge suggests the closest candidates, all **unverified**, are:
1. The general AI assistants in LEAP (Matter AI / LawY) and Smokeball (Archie), used by Australian PI firms.
2. Insurer-side AI review of medical records and claims at Australian life and workers' comp insurers.
3. Maurice Blackburn's in-house TPD triage tool (2020).

None is known to be a purpose-built claim-preparation product of the EvenUp kind sold to claimant firms.

### Cited Findings
- None (no searches executed).

### Inferences
*Prior-knowledge judgements, unverified:*
- **LEAP / Smokeball AI:** likely general-purpose (summarise, draft, Q&A) rather than purpose-built for medical chronologies, entitlement calculations or claim packs. The gap narrows if either now markets PI-specific chronology or claim-pack features. That would push the verdict towards PRESENT under the brief's rule for practice software.
- **Insurer-side AI:** does the same technical job (reading medical records, producing summaries) for the opposite customer. The brief scores it PARTIAL.
- **Maurice Blackburn triage tool:** screens eligibility at intake, does not prepare claims, and is in-house rather than sold. PARTIAL at most.

### Gaps
- Whether any of the three is marketed or deployed for PI, CTP, workers' comp or TPD claim preparation.
- Whether any Australian start-up or medico-legal provider sells AI medical chronologies to claimant firms. This is the single most important unresolved question.

## What Australian facts matter for launch (size of the plaintiff personal-injury market, TPD claim volumes via APRA, CTP/workers' comp claim volumes, legal-practice rules on AI use and fee arrangements)?

### Takeaway
None of the requested cited facts could be obtained (0 of 5), because no searches ran. The items below are retrieval targets and prior-knowledge recollections to verify, not facts.

### Cited Findings
- None (no searches executed).

### Inferences
- None that can be grounded in a source.

### Gaps
Retrieval targets. Recollections are flagged "verify"; do not use any of them without a source.
- **TPD volumes:** the APRA / ASIC life insurance claims and disputes statistics (https://www.apra.gov.au) report TPD claims received and finalised, admittance rates and dispute rates by channel (group super, individual advised, direct). No figures are recalled with enough confidence to state.
- **CTP volumes:**
  - SIRA's NSW CTP claims data and open-data dashboards (https://www.sira.nsw.gov.au)
  - TAC annual report: new claims a year (https://www.tac.vic.gov.au)
  - MAIC Queensland CTP scheme statistics (https://maic.qld.gov.au)
- **Workers' comp volumes:** Safe Work Australia, Key WHS Statistics: serious claims a year (https://www.safeworkaustralia.gov.au); icare (https://www.icare.nsw.gov.au).
- **Rules on AI use (verify):**
  - The Supreme Court of NSW Practice Note SC Gen 23 (Use of Generative AI), recalled as commencing in early 2025, restricts gen-AI use in affidavits, witness statements and expert reports and requires leave for some uses. This bears directly on AI-built chronologies and evidence bundles (https://supremecourt.nsw.gov.au).
  - A joint statement on AI use in legal practice by the Victorian Legal Services Board, the Law Society of NSW and the Legal Practice Board of WA, recalled as late 2024 (https://lsbc.vic.gov.au).
- **Fee arrangements (verify):**
  - Contingency (percentage-of-damages) fees for lawyers are prohibited under the Legal Profession Uniform Law. Victoria allows Group Costs Orders, but only in class actions.
  - Uplift-fee limits apply to conditional ("no win no fee") costs agreements.
  - Queensland has a "50/50 rule" capping legal fees on speculative PI claims relative to the client's net damages.
  - In NSW workers' comp, lawyers are funded through the Independent Review Office (https://www.iro.nsw.gov.au) rather than by the worker.
  - NSW CTP legal costs are regulated under the Motor Accident Injuries Act 2017 and its Regulation.
  - All of these shape whether per-case pricing to firms works.
- **Plaintiff PI market size:**
  - No figure is recalled with confidence.
  - Shine Justice (ASX: SHJ) annual reports would give one listed firm's revenue.
  - An industry report such as IBISWorld would be needed for the market total.
