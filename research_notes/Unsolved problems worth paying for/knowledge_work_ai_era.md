# Unsolved, High-Willingness-to-Pay Problems in Knowledge Work, Software/IT, GTM, HR, Media and the AI Boom Itself (as of October 18, 2026)

How this was researched, and its limits (read first): about 37 web searches were run before the shared search budget ran out. Every attempt to fetch full primary pages with WebFetch failed with DNS errors (for example checkr.com, techcrunch.com, ramp.com and ycombinator.com/rfs). So **all findings below come from search-engine summaries of the cited pages, not from reading the full pages.** Where the summary did not show which page a statistic came from, the citation says "(page attribution uncertain)". Many statistics come from vendors that sell into the problem, and they are flagged as vendor-sourced. Reddit, HN and G2 threads were not read directly. Competitor names marked "(not verified this session)" come from background knowledge and need checking.

## Objective: Which specific, concrete problems would companies clearly pay to solve where no great solution exists — candidate dossiers and top-3 ranking

### Takeaway
After screening about 22 problem areas, most "AI-era" categories are already crowded with well-funded startups, or are being absorbed by platforms: GEO, agent security, evals, AI support, security questionnaires, AI SDRs and SMB analytics. Three areas held up best:
- **SMB and lower-mid-market outbound-payment fraud control** (vendor bank-detail changes, BEC and deepfake executives). New Nacha rules from 2026 make it a compliance requirement.
- **Hiring identity continuity**, from application through to payroll. The pain is the strongest seen anywhere in HR, but the interview-stage detection layer is crowded.
- **Assurance evidence for companies selling AI agents**, needed for insurers, AIUC-1, EU AI Act and customer reviews. This is newer, but the evidence of willingness to pay is thin.

### Cited Findings

#### C1. Outbound-payment fraud for SMBs / lower mid-market (vendor bank-change fraud, BEC, deepfake executives) + Nacha 2026 compliance — TOP-RANKED
- **(a) Who:** Controllers, AP managers and owner-operators at US businesses with roughly 20–1,000 employees that pay vendors by ACH or wire from bank portals, QuickBooks/Xero or light AP tools. Also the MSPs and outsourced accounting firms that serve them. The problem exists globally (Eftsure started in Australia), but the regulatory hook below is US-specific.
- **(b) Pain and frequency:**
  - In 2025 the FBI IC3 recorded 24,768 BEC complaints with about $3.047B in reported losses. BEC was the second-largest loss category, behind investment fraud (about $8.65B). Wire transfers made up the bulk of BEC losses — [McDonald Hopkins](https://www.mcdonaldhopkins.com/insights/news/the-sobering-truth-of-the-fbis-2025-internet-crime-complaint-center-report); [CyberScoop](https://cyberscoop.com/fbi-internet-crime-complaint-center-annual-cybercrime-report/).
  - That is up about 10% from $2.77B in 2024 (third-party analysis) — [Axis Intelligence](https://axis-intelligence.com/business-email-compromise-statistics/).
  - Sources disagree on total 2025 cybercrime losses: $20.877B (+26%) per [MacMyths](https://macmyths.com/cybercrime-losses-jumped-26-to-20-9-billion-in-2025-fbi-says-but-scams-drove-most-of-the-increase/) versus $17.6B per [gBlock](https://www.gblock.app/articles/fbi-ic3-17-billion-cyber-fraud-2025).
  - Nacha reported almost $8.5B lost to BEC over three years (April 2025) — [Nacha](https://www.nacha.org/news/fbis-ic3-finds-almost-85-billion-lost-business-email-compromise-last-three-years).
  - The typical modern attack pairs a spoofed email asking to change a vendor's bank details with a short voice note "from the CEO" confirming it — [Serrala](https://www.serrala.com/blog/payment-fraud-in-the-ai-era-how-deepfakes-and-vendor-impersonation-get-past-ap-controls); [Adaptive Security](https://www.adaptivesecurity.com/blog/deepfake-fraud-prevention-finance-teams) (page attribution uncertain).
  - Attackers also split invoices to stay below review limits (page attribution uncertain, same result set).
  - In the Arup case, a finance employee authorised 15 transactions after a video call in which the CFO and colleagues were AI-generated — [Corpay](https://www.corpay.com/resources/blog/ai-payments-fraud). The commonly reported loss of about US$25M was not verified this session.
  - An October 2026 Early Warning piece says executive and vendor impersonation exploits inconsistent payment controls across a company's multiple bank relationships — [AI-360](https://www.ai-360.online/deepfake-fraud-exposes-the-control-gaps-between-a-company-and-its-banks/).
- **(c) Willingness-to-pay evidence:**
  - **New regulatory mandate.** Nacha's 2026 fraud-monitoring rules came in two phases:
    - Phase 1, from March 20, 2026: ODFIs and large non-consumer originators (6M or more ACH entries in 2023).
    - Phase 2, from June 19/22, 2026: all remaining non-consumer originators, regardless of volume.
    - Originators must keep risk-based, documented processes to catch fraud-induced entries, including social engineering and BEC. Pre-screening every transaction is not required — [CorporateOne](https://www.corporateone.coop/resources/newsletter/february-2026-nacha-rules); [Bottomline](https://www.bottomline.com/learning-center/2026-nacha-compliance-rules-risks-and-how-prepare); [Regions](https://www.regions.com/insights/commercial/article/2026-nacha-rule-changes); [Regions treasury page](https://www.regions.com/commercial-banking/treasury-management/managing-payments/nacha-rule-changes).
  - Ramp says compliance **cannot be fully outsourced to the originator's bank** — [Ramp](https://ramp.com/blog/2026-nacha-rule-changes).
  - Kyriba describes an account-verification element: confirm the recipient account belongs to the payee using a trusted source or direct contact, and record the method and outcome. This was not verified against Nacha's own text — [Kyriba](https://www.kyriba.com/blog/Nacha-rule-changes-2026/).
  - Existing vendors sell this at enterprise "contact sales" prices (Eftsure, Trustpair), which shows spend at the top of the market — [Eftsure roundup](https://www.eftsure.com/blog/products/top-7-vendor-verification-software-in-2026/).
- **(d) Existing solutions and why they fall short:**
  - **Trustpair:** enterprise-priced and "less accessible for smaller businesses". It is hard to justify below roughly 50–100 suppliers, and ERP integration is a hurdle for small teams — [FitGap](https://us.fitgap.com/products/trustpair). Trustpair claims 20+ ERP/P2P connectors and instant validation in 85% of cases (vendor claim) — [Trustpair](https://trustpair.com/eftsure-alternative/).
  - **Eftsure:** targets mid-to-large organisations, with contact-sales pricing — [Eftsure](https://www.eftsure.com/blog/products/top-7-vendor-verification-software-in-2026/). G2 mid-market reviewers complain about slow verification of international suppliers and duplicated supplier records — [G2](https://www.g2.com/products/eftsure/reviews).
  - **AccountChek:** usage-based bank-ownership checks at payment time, a lighter option — [Eftsure roundup](https://www.eftsure.com/blog/products/top-7-vendor-verification-software-in-2026/).
  - **Others:** Bottomline, Kyriba, Serrala and Corpay all publish guidance and sell at the enterprise/treasury tier — [Bottomline](https://www.bottomline.com/learning-center/2026-nacha-compliance-rules-risks-and-how-prepare); [Kyriba](https://www.kyriba.com/blog/Nacha-rule-changes-2026/).
  - **AP platforms:** Ramp, and possibly BILL (not verified this session), are writing about Nacha, which suggests they will bundle controls.
- **(e) Why still unsolved / durability (assessment):**
  - Fraud targeting SMB payments is durable: the attacker economics only improve with voice and video cloning.
  - The SMB gap persists because enterprise tools need ERP integration and minimum fees.
  - Frontier labs are unlikely to absorb this.
  - The real absorption risk is from **banks** (account-validation services such as Early Warning; not verified this session) and **AP/spend platforms** (Ramp, BILL).
- **(f) Market size (inference):**
  - Assume 300k–1M US businesses originate recurring vendor ACH or wires and now fall under Phase 2. This buyer count is an assumption, not verified.
  - At $100–$400/month, that is roughly $0.36B–$4.8B/year in the US.
  - Global upside exists via Australia/UK/EU (UK APP-fraud regime and EU Verification of Payee; not verified this session).
- **(g) Feasibility for a 1–5 person team (assessment):** Medium-high.
  - An MVP could combine a vendor-master change log, a forced out-of-band callback workflow to numbers on file, and email/domain lookalike checks on change requests.
  - It would add bank-account ownership checks through existing data partners, plus an auto-generated "Nacha fraud-monitoring procedures + evidence" PDF the business can give its bank.
  - Distribution could run through outsourced accountants, fractional CFOs and MSPs.
  - Main dependency: access to account-ownership data (partnership needed).
- **(h) Risks:**
  - Bundling by banks and AP platforms.
  - Liability if a "verified" payment still turns out to be fraudulent.
  - SMB price sensitivity.
  - Crowdsourced verified-payee data could become a moat, which is Eftsure's model (inference).

#### C2. Hiring identity fraud and "identity continuity" from applicant to payroll (deepfake/proxy interviews, North Korean IT workers) — TOP-3, CROWDED AT INTERVIEW LAYER
- **(a) Who:**
  - Heads of Talent Acquisition, CISOs and HR ops at remote-first tech and mid-market employers.
  - IT/contract staffing agencies, RPOs and EOR/contractor platforms. These place workers into clients and carry the reputational risk.
  - Global, with the US the epicentre.
- **(b) Pain and frequency:**
  - **Checkr survey (2026, 3,000 US hiring managers):**
    - 86% of organisations experienced at least one type of hiring fraud in the past year.
    - 40% personally interviewed someone later revealed to be using a fake identity, up from 31% in 2025.
    - 44% lack a formal written process for verifying identity after hire — [Checkr Hiring Hoax 2026](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2026).
  - **Gartner** projects one in four candidate profiles worldwide will be fake by 2028. It also expects about 30% of enterprises to consider standard identity verification unreliable against deepfakes by end-2026 — [The Interview Guys](https://blog.theinterviewguys.com/the-deepfake-candidate-problem/); [Greenhouse/CLEAR release](https://greenhouse.com/newsroom/greenhouse-and-clear-announce-partnership-to-enable-candidate-verification).
  - **Pindrop:** of 827 applications to one developer role, roughly one in eight were judged fake — [Sherlock](https://www.sherlock.sh/blog/rise-of-ai-interview-fraud); [The Interview Guys](https://blog.theinterviewguys.com/the-deepfake-candidate-problem/) (vendor-compiled; page attribution uncertain).
  - **Experian's 2026 Future of Fraud Forecast** lists deepfake job candidates among its top five fraud threats — [Pin](https://www.pin.com/blog/ai-deepfake-interviews/); [Glozo](https://www.glozo.com/blog/deepfake-job-candidates) (page attribution uncertain).
  - **North Korean IT workers:** Okta has reportedly detected 6,500+ cases of them using fake identities to get hired. Eleven governments jointly warned on July 31, 2026 about their use of deepfakes at scale — [ScamDrill](https://scamdrill.com/blog/deepfake-job-candidate-remote-hire-fraud); [Remote Staff](https://www.remotestaff.com/blog/deepfake-job-candidates-ai-interview-fraud/) (secondary; page attribution uncertain; not verified against Okta or government text).
  - Tofu claims that for some tech roles it flagged 46% of applicants as potentially fraudulent (vendor testimonial) — [Tofu](https://www.hiretofu.com/).
- **(c) Willingness-to-pay evidence:**
  - Incumbents are launching paid products: Checkr launched Identity Verification on March 4, 2026 to combat AI-driven hiring fraud — [SiliconANGLE](https://siliconangle.com/2026/03/04/checkr-launches-identity-verification-combat-ai-driven-hiring-fraud/).
  - Greenhouse partnered with CLEAR (June 12, 2025) for selfie-based verification inside MyGreenhouse — [Greenhouse](https://greenhouse.com/newsroom/greenhouse-and-clear-announce-partnership-to-enable-candidate-verification).
  - iCIMS unveiled a candidate-fraud strategy — [PR Newswire](https://prnewswire.com/news-releases/icims-unveils-candidate-fraud-strategy-to-help-enterprise-recruiting-teams-detect-fake-applicants-302911338.html).
  - Proof offers identity verification inside Greenhouse workflows — [Proof](https://www.proof.com/blog/what-hr-teams-are-seeing-when-it-comes-to-candidate-fraud).
  - A digital-identity startup, TransCrypts, reportedly raised a $15M–$20M seed (dates unverified) — [Wikipedia](https://en.wikipedia.org/wiki/TransCrypts).
- **(d) Competitors and gaps:**
  - **Interview-stage detection is crowded.** BrightHire covers impersonation, deepfakes and AI cheating — [BrightHire](https://brighthire.com/solutions/candidate-fraud/). Others:
    - Tofu: real-time synthetic audio and face-swap detection — [Tofu](https://www.hiretofu.com/)
    - Sardine: device fingerprinting, virtual cameras, remote-access tooling — [Sardine](https://www.sardine.ai/candidate-fraud)
    - InterviewGuard: detects ChatGPT, Claude, Cluely, InterviewCoder and proxies — [InterviewGuard](https://www.interviewguard.io/)
    - Honorlock — [Honorlock](https://honorlock.com/blog/interview-fraud-prevention/)
    - Phenom — [Phenom](https://www.phenom.com/blog/candidate-fraud-prevention-chro)
  - **Shortcomings found:**
    - Greenhouse's own help centre says an identity/application mismatch "doesn't always mean fraud", so recruiters get risk signals rather than decisions — [Greenhouse support](https://support.greenhouse.io/hc/en-us/articles/40921076478491).
    - Checkr's own framing is that "fraud doesn't end at the offer", and 44% have no post-hire verification process — [Checkr](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2026).
    - Recommended red flags are manual checks, such as whether payment and tax details match the interviewee's name — [Glozo](https://www.glozo.com/blog/deepfake-job-candidates) (page attribution uncertain).
- **(e) Why unsolved / durability (assessment):**
  - Durable: an arms race in which deepfake quality keeps rising.
  - **Platform absorption risk is high** from ATSs (Greenhouse+CLEAR, iCIMS), background-check firms (Checkr) and IDV firms (Persona, CLEAR, Socure; not verified this session).
  - The least-served slice is **continuity**: proving the person interviewed is the person who signs, receives the laptop, logs in and gets paid. That spans HRIS, IT device shipping, IdP and payroll, which no single incumbent owns.
- **(f) Market size (inference):**
  - Assume about 50k US employers hiring remotely at scale plus about 20k staffing/RPO firms (counts not verified).
  - At $5k–$50k/year, that is roughly $0.5B–$2B.
  - Per-check pricing of $5–$30 per verified hire is an alternative.
- **(g) Feasibility (assessment):** Medium-high technically, since IDV/liveness APIs can be licensed. Selling into staffing firms is fast, while selling to enterprise TA is slow.
- **(h) Risks:**
  - Crowding: at least 8 named vendors plus incumbents.
  - Commoditised liveness/IDV.
  - Legal and privacy constraints on biometrics (BIPA/GDPR; not verified this session).
  - False positives against legitimate candidates.

#### C3. AI-generated applicant floods: screening and "proof of effort / proof of human" in hiring — FLAGGED (crowded, ATS-absorbed)
- **(a) Who:** In-house recruiters and TA leaders, especially for remote and entry-level roles, and agency recruiters.
- **(b) Pain:**
  - Greenhouse data: applications per job rose from 116 to 244 (2022→2025). Applications per recruiter rose from 146 to 746 while recruiters per organisation fell from 10.43 to 4.62 — [The Hire Hub](https://www.thehirehub.ai/blog/ai-generated-job-applications).
  - Ashby data: roughly 291 applications per hire versus about 100 in early 2021 — [Axios](https://axios.com/2026/08/21/job-seekers-ai-hiring-ghost-jobs-trust).
  - 77% of hiring teams say they regularly encounter AI-generated or AI-assisted applications, up from 53% in early 2024 (Willo Hiring Trends Report 2026) — [HeroHunt](https://www.herohunt.ai/blog/surviving-the-ai-application-flood-2026-playbook/) (page attribution uncertain).
  - Only 21% of recruiters are "very confident" their systems are not weeding out qualified candidates — [The Interview Guys](https://blog.theinterviewguys.com/the-quality-paradox/) (page attribution uncertain).
  - About 250 resumes per corporate posting — [VisualCV](https://www.visualcv.com/blog/resume-statistics-2026-hiring-trends/).
  - A trade outlet headline: "AI has quadrupled job applications and quietly broken hiring" — [Recruiting News Network](https://www.recruitingnewsnetwork.com/posts/ai-has-quadrupled-job-applications-and-quietly-broken-hiring).
- **(c) Willingness to pay:** YC's Fall 2026 RFS includes a request titled "Proving You're Human" — [Modelence summary of YC RFS](https://modelence.com/yc-rfs-fall-2026); [IBTimes](https://www.ibtimes.sg/A000Ncu).
- **(d) Competitors:**
  - AI interview/screening vendors such as Tenzo — [Tenzo](https://www.tenzo.ai/blog/hiring-fraud-2026-what-changed-2025), HeroHunt — [HeroHunt](https://www.herohunt.ai/blog/surviving-the-ai-application-flood-2026-playbook/) and Metaview — [Metaview](https://www.metaview.ai/resources/blog/candidate-fraud-statistics-fake-applications).
  - AI screening built into ATSs such as Ashby and Greenhouse (not verified this session).
  - Low recruiter confidence (21%) suggests current screeners are distrusted.
- **(e)–(h) (assessment):**
  - Very crowded, and the ATS vendors control the workflow, so the absorption risk is high.
  - Regulatory exposure: automated employment decisions are regulated in NYC and treated as high-risk under the EU AI Act (not verified this session).
  - Market is large but the gap is narrow. **Avoid generic AI screening.** The only interesting wedge is verified-human or "costly signal" application rails, which overlap with C2.

#### C4. Assurance evidence for companies selling AI agents (insurer underwriting, AIUC-1, EU AI Act, enterprise AI security reviews) — TOP-3 (thin WTP evidence)
- **(a) Who:**
  - AI-native SaaS vendors, especially voice/support/agentic startups, selling to enterprises and needing liability cover or procurement approval.
  - Secondary: enterprise buyers' risk teams.
- **(b) Pain:**
  - AIUC-1, the clearest public underwriting standard, asks for execution-chain logs, tool-call records and quarterly third-party testing — [Vorp Labs](https://vorplabs.com/ai-agent-liability).
  - Armilla describes traditional insurers retreating from AI risk — [Armilla](https://www.armilla.ai/resources/armilla-ai-raises-lloyds-backed-coverage-to-25m-as-traditional-insurers-retreat-from-ai-risk).
- **(c) Willingness to pay:**
  - ElevenLabs said in February 2026 that it was the first company to go live with an AIUC-1-backed policy covering its voice agents (terms undisclosed) — [Vorp Labs](https://vorplabs.com/ai-agent-liability).
  - Armilla (a Lloyd's coverholder) raised its limits to $25M per organisation in January 2026 and relies on 500+ independent AI evaluations — [Fintech Global](https://fintech.global/2026/01/23/armilla-ai-raises-capacity-to-25m/); [Armilla](https://www.armilla.ai/resources/armilla-ai-raises-lloyds-backed-coverage-to-25m-as-traditional-insurers-retreat-from-ai-risk).
  - Other carriers: Testudo (Lloyd's-backed, up to $10M), Klaimee and Corgi — [QuoteSweep](https://www.quotesweep.com/blog/best-ai-liability-insurance).
  - YC's Fall 2026 RFS includes "AI-Native Compliance Infrastructure" — [Modelence](https://modelence.com/yc-rfs-fall-2026).
- **(d) Competitors:**
  - Eval/observability vendors that already capture traces: Braintrust ($80M), Arize, Galileo, Langfuse, Fiddler — [Fundable](https://www.tryfundable.ai/blog/top-agent-observability-deals); [Mozilla Ventures](https://mozilla.vc/fiddler-raises-30m-series-c-to-power-the-control-plane-for-ai-agents/).
  - AIUC itself (reportedly about $15M raised; unverified) — [Neuronfeed](https://neuronfeed.com/compare/aiuc-vs-armilla-ai).
  - GRC platforms such as Vanta and Drata adding AI frameworks (not verified this session).
- **(e) Durability (assessment):** The need is durable as agents take on real liability. But the "evidence pack" layer could be absorbed by eval platforms or by AIUC/insurers offering their own tooling.
- **(f) Market size (inference):** A few thousand agent vendors at $10k–$50k/year gives roughly $50M–$250M today, growing with agent adoption.
- **(g) Feasibility:** High. The MVP is an SDK or log connector plus control mapping (AIUC-1 / EU AI Act / ISO 42001) and auto-generated evidence reports.
- **(h) Risks:**
  - The category may not settle on one standard.
  - Insurers may set requirements directly.
  - Crowding from eval and GRC vendors.

#### C5. SMB offboarding and access sprawl, including apps outside SSO (often MSP-delivered) — RUNNER-UP
- **(a) Who:** IT generalists and office managers at businesses with 20–500 employees, and the MSPs serving them.
- **(b) Pain:**
  - A Productiv report found 56% of SaaS licences assigned to departed employees were still active 90 days after departure — [Infonaligy](https://www.infonaligy.com/blog/employee-offboarding-security-gaps-smb).
  - Apps outside SSO (shared logins, personal-email SaaS accounts, API keys) are the main gap when only the primary identity account is disabled — [Infonaligy](https://www.infonaligy.com/blog/employee-offboarding-security-gaps-smb); [Substly](https://www.substly.com/en/blog/how-smbs-can-streamline-employee-offboarding-without-expensive-iam-tools).
- **(c) Willingness to pay:** There is spend, but at low price points:
  - Revoke is listed at $59/month and claims to save 30–60 minutes per offboarding — [Parse.gl](https://www.parse.gl/brands/getrevoke-com).
  - A $49 spreadsheet kit with 42 revocation tasks sells to teams that avoid tools — [Payhip](https://payhip.com/b/7Vptr).
  - Freshworks is acquiring Torii to extend Freshservice into software management and AI-spend governance, which validates the category for mid-market ITSM — [Calcalist](https://calcalistech.com/ctechnews/article/xnwfli0e6).
- **(d) Competitors and gaps:**
  - Revoke (Google Workspace, M365, Slack, Zoom only) — [Parse.gl](https://www.parse.gl/brands/getrevoke-com)
  - Substly (sends removal requests to service owners for what the IdP cannot automate) — [Substly](https://www.substly.com/en/blog/how-smbs-can-streamline-employee-offboarding-without-expensive-iam-tools)
  - CloudFuze Manage — [CloudFuze](https://www.cloudfuze.com/?p=40303)
  - Mosyle AccessMule — [Computerworld](https://www.computerworld.com/article/4011882/mosyles-accessmule-makes-employee-access-a-little-easier-for-smbs.html)
  - Also Rippling, JumpCloud, Zluri, Lumos, BetterCloud (not verified this session)
  - The gap is non-SSO and shadow apps, where most of these tools fall back to manual tasks.
- **(e)–(h) (assessment):**
  - Durable but low-ACV and crowded at the bottom.
  - Platform risk from Google and Microsoft admin consoles, and from HRIS-plus-IT suites (Rippling).
  - Browser-extension discovery of non-SSO logins plus agentic deprovisioning through app UIs is feasible for a small team, but defensibility is weak.
  - Market (inference): about 1M SMBs × $50–$200/month, but realistic capture comes through the MSP channel.

#### C6. MSP tooling: vendor lock-in, pricing practices and service-desk labour — MODERATE, CROWDED
- **(a) Who:** Owners and service managers at MSPs with 5–100 staff.
- **(b) Pain:**
  - A hand-coding of 330 top r/msp posts from the past 12 months found that 32.2% of software complaints were about price hikes, licensing traps, partner treatment and vendor consolidation, versus 14.0% about usability. Switching tools was the most-discussed topic — [BigIdeasDB](https://bigideasdb.com/msp-software-pain-points-2026) (single commercial source; methodology unverified).
  - Kaseya has a company-level reputation for auto-renewals, billing disputes and hard-to-exit contracts, even though its BMS product scores 4.3 on G2 and 4.1 on Capterra — [Flamingo](https://www.flamingo.run/blog/kaseya-bms-review).
  - ConnectWise PSA: steep learning curve, dated interface, pricing hidden until a sales call — [Flamingo](https://www.flamingo.run/blog/connectwise-psa-review).
  - Critical vulnerabilities were reported in Kaseya Network Detective — [Business of Tech](https://businessof.tech/podcast/critical-vulnerabilities-in-kaseya-and-mcdonalds-chatbot-highlight-msp-security-risks/).
- **(c)/(d) Funding and competitors:**
  - Mizo (AI agents across the full MSP ticket lifecycle; works with Autotask, ConnectWise and HaloPSA) raised an early-stage round from Devolutions and Telegraph Ventures in July 2026 — [Dealroom](https://dealroom.co/news/138899-devolutions-telegraph-ventures-back-msp-automation-startup-mizo/).
  - Treeline raised a Series A on March 31, 2026 — [StartupHub](https://www.startuphub.ai/ai-news/investors-news/2026/treeline-secures-series-a.md).
  - ConnectWise acquired zofiQ (agentic service desk) on January 20, 2026 — [CB Insights](https://www.cbinsights.com/investor/zofiq).
  - OpenFrame/OpenMSP reported a $2.2M seed with 30 MSPs deployed (date unclear) — [LinkedIn](https://il.linkedin.com/in/amitaiziv).
  - Older rounds: SuperOps ($14M Series A) — [Deccan Herald](https://www.deccanherald.com/amp/story/business/superopsai-raises-14-million-led-by-lee-fixel-s-addition-1075473.html); MSPbots ($5M) — [Pulse2](https://pulse2.com/mspbots-5-million-secured-to-build-intelligence-solutions-for-automating-tasks).
- **(e)–(h) (assessment):**
  - MSPs are angry at vendors (a demand signal) but price-sensitive.
  - The AI service-desk layer is already crowded and incumbents are acquiring.
  - The better role for MSPs is as a **distribution channel** for C1, C5 and C7, not as a target market for another PSA.
  - Market (inference): tens of thousands of MSPs globally × $5k–$30k/year.

#### C7. Microsoft 365 Copilot / AI-assistant oversharing remediation for SMB and mid-market — FLAGGED (high Microsoft platform risk)
- **(a) Who:** IT leads and MSPs deploying Copilot in M365 tenants with messy SharePoint/OneDrive permissions.
- **(b) Pain:**
  - The main gaps flagged before enabling Copilot are "Everyone except external users" sharing, broken permission inheritance and orphaned guest accounts — [Copilot Consulting](https://www.copilotconsulting.com/insights/microsoft-copilot-oversharing-prevention-guide-2026).
  - Microsoft ran an April 2026 conference session on remediating oversharing — [Microsoft](https://adoption.microsoft.com/files/microsoft-365-community-conference/2026/pdf/MS88%20-%20Secure%20and%20Govern%20Microsoft%20365%20Copilot.pdf).
- **(c) Willingness to pay:** Consultancies sell multi-phase remediation engagements and list consulting fees — [EPC Group](https://www.epcgroup.net/answers/clean-sharepoint-permissions-before-copilot-2026).
- **(d) Solutions:**
  - Microsoft SharePoint Advanced Management (data access governance reports, restricted content discoverability) and Purview — [EPC Group](https://www.epcgroup.net/answers/clean-sharepoint-permissions-before-copilot-2026); [MyWorkDrive](https://go.myworkdrive.com/blog/microsoft-365-copilot-oversharing).
  - PnP PowerShell scripting — [Copilot Consulting](https://copilotconsulting.com/insights/microsoft-copilot-sharepoint-permissions-oversharing-fix).
  - Varonis, AvePoint, ShareGate, Syskit (not verified this session).
  - The widely repeated "87% of tenants" statistic is unverified — see [Copilot Consulting](https://copilotconsulting.com/insights/sharepoint-permissions-cleanup-before-microsoft-copilot).
- **(e)–(h) (assessment):** Real but **likely to be absorbed by Microsoft's** native tooling and by established M365 governance vendors. Only viable as an MSP-delivered, fixed-price "readiness" product with fast payback. Defensibility is low.

#### C8. Shadow AI governance and AI-spend control — FLAGGED (consolidating into SSE / browser / ITSM / password-manager vendors)
- **(a) Who:** CISOs, CIOs and FinOps leads at mid-market and enterprise companies, plus regulated SMBs.
- **(b) Pain:**
  - 50–71% of employees use unapproved AI, and 66% of office professionals use AI tools they believe are forbidden — [Teramind](https://www.teramind.co/l/shadow-ai-report-2026/).
  - CSA cites 80% using unapproved tools while only 37% of enterprises have any AI governance policy — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/).
  - Only 25% of organisations have comprehensive visibility into employee AI use — [Optro](https://optro.ai/blog/shadow-ai-stats).
  - **CB Financial Services filed what appears to be the first SEC 8-K triggered by unauthorised employee AI use** — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/).
  - Cost side: 98% of FinOps teams now manage AI spend (versus 31% two years earlier), and 73% of companies exceeded their original AI cost plans (State of FinOps 2026, secondary) — [Varcio](https://varcio.com/blog/finops-for-ai-llm-token-cost-control); [Innobu](https://www.innobu.com/en/articles/ai-token-costs-finops-2026.html) (page attribution uncertain).
- **(c)/(d) Spend and competitors:**
  - Akamai completed its acquisition of LayerX in July 2026 and now sells it as Workforce Protector. Island raised a Series F in September 2026 to extend into AI and agent controls — [Push Security](https://pushsecurity.com/blog/the-top-10-shadow-ai-discovery-and-governance-tools); [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/) (page attribution uncertain).
  - Freshworks is acquiring Torii for AI-spend governance — [Calcalist](https://calcalistech.com/ctechnews/article/xnwfli0e6).
  - 1Password launched AI Spend and Consumption Management, consolidating token use across Anthropic, OpenAI and Cursor. The Linux Foundation launched a Tokenomics Foundation — [Elvex](https://www.elvex.com/blog/ai-token-cost-enterprise-budget-control); [Innobu](https://www.innobu.com/en/articles/ai-token-costs-finops-2026.html) (page attribution uncertain).
  - AI cost tools for startups: Amnic, TrueFoundry, Helicone, Mavvrik — [Amnic](https://amnic.com/blogs/ai-cost-optimization-tools-for-startups).
- **(e)–(h) (assessment):** Strong pain, but acquisitions show it is becoming a **feature of larger platforms**. Avoid as a standalone product, unless it is a vertical compliance wedge (for example, a bank or law-firm AI-use attestation tied to 8-K or regulator obligations).

#### C9. Getting cited by AI search engines (GEO/AEO) — FLAGGED CROWDED; residual gap is independent measurement
- **(a) Who:** CMOs, SEO/content leads and agencies.
- **(b)/(c) Pain and willingness to pay:**
  - Profound raised a $180M Series D at a $1.8B valuation (September 15, 2026; Sequoia and Kleiner Perkins), about $334.5M in total — [Everything-PR](https://everything-pr.com/profound-reaches-1-billion-valuation-with-96m-series-c-cementing-category-leadership-in-ai-search-marketing).
  - About $604M has been raised across ten GEO/AEO startups, with Profound holding about 55% — [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors).
  - Sitecore bought Scrunch (reported $225M) and HubSpot bought XFunnel — [Dealroom](https://dealroom.co/charts/generative-engine-optimization-startups?theme=light).
  - Peec AI reportedly raised about $29M (unverified) — [Surmado](https://www.surmado.com/blog/best-ai-visibility-tools-2026) (page attribution uncertain).
  - AthenaHQ is YC-backed, with about $2.2M — [Rankability](https://www.rankability.com/blog/athenahq-ai-review/).
- **(d) Shortcomings:**
  - The same prompt returns different cited sources across runs and days (University of St. Gallen paper, April 2026, and an arXiv paper by Schulte et al.) — [AuthorityTech](https://authoritytech.io/curated/measure-geo-like-a-distribution-not-a-ranking-2026).
  - Opaque, unreproducible scoring, with different platforms giving different scores for the same brand on the same day. Prompt sets are synthetic — [Metricus](https://metricusapp.com/blog/ai-visibility-dashboard-trust-problem-black-box-scoring-synthetic-data-vendor-conflict-2026/).
  - Visible citations underreport real retrieval by 3–10x (3,981 domains) — [Something Inc.](https://somethinginc.com/blog/mention-rate-dashboard-is-lying-to-you/).
  - In about 46,000 online mentions, the dominant complaint is that the tools are unreliable or misleading — [Brand24](https://brand24.com/blog/ai-visibility-tracking-issues-report).
  - The IAB published vocabulary and disclosure guidance on August 3, 2026, with no certification (page attribution uncertain; same result set as Metricus).
- **(e)–(h) (assessment):**
  - **Avoid building another tracker.** The category has a $1.8B leader, M&A by suites, and exposure to SEO incumbents (Semrush, Ahrefs; not verified this session).
  - It also depends on the answer engines themselves (OpenAI/Google could expose first-party analytics).
  - A possible small-team niche is an independent, statistically rigorous **measurement or audit service** sold to agencies. That market is small and has weak defensibility.

#### C10. Outbound in the AI-spam era: lead data quality, deliverability, AI SDRs — FLAGGED (crowded, commoditising)
- **(a) Who:** SDR/BDR leaders, RevOps and agency outbound teams.
- **(b) Pain: reply rates are falling.**
  - Median 2.1% in 2026 versus 4.7% in 2022 — [Visionary Marketing](https://visionary-marketing.co.uk/blog/b2b-cold-email-statistics-2026).
  - Instantly benchmark: about 3.43%, down from about 5% in 2025 — [SyncGTM](https://syncgtm.com/blog/state-of-cold-email-2026) (page attribution uncertain).
  - Bridge Group: 3.5% (2018) to 1.4% (2025) — [Boomerang](https://getboomerang.ai/glossaries/why-cold-outbound-stopped-working).
  - Signal-triggered campaigns reportedly reach 8–12% — [Darwin](https://blog.getdarwin.ai/en/ai-cold-email-2026-signal-based-strategies-reply-rates).
  - A practitioner piece says "the idea of an AI SDR is showing some real weakness" (title only; not read) — [LeadGenius](https://www.leadgenius.com/resources/the-idea-of-an-ai-sdr-is-showing-some-real-weakness).
- **Data quality:**
  - In a vendor test of 100,000 Apollo contacts, only 73.2% were SMTP-deliverable — [BounceZero](https://bouncezero.io/apollo-io-review-2026) (page attribution uncertain).
  - ZoomInfo's 95% accuracy guarantee reportedly covers only company affiliation, not email, phone or title accuracy. One Reddit user reported a 50.7% bounce rate — [Prospeo](https://prospeo.io/s/is-zoominfo-accurate).
  - ZoomInfo Trustpilot complaints centre on cancellation disputes and outdated data — [Prospeo](https://prospeo.io/s/zoominfo-reviews).
  - A "renewal trap" is described — [Valley](https://www.joinvalley.co/blog/apollo-vs-zoominfo).
- **(d) Competitors:** ZoomInfo, Apollo, Clay, Prospeo, Crustdata, Instantly, Smartlead, Valley and many AI SDRs — [Crustdata](https://crustdata.com/blog/zoominfo-vs-apollo).
- **(e)–(h) (assessment):** The pain is real but saturated with tools. Inbox providers (Google, Microsoft, Yahoo) set the rules and weight engagement. Data is commoditising. **Avoid**, unless the product is a verifiable "real buyer intent" exchange (no evidence gathered).

#### C11. Marketing attribution after cookie loss, for SMB and mid-market — MODERATE / FLAGGED (free platform tools)
- **(a) Who:** Growth and marketing leads at DTC and B2B companies spending roughly $50k–$5M/year on ads.
- **(b) Pain:**
  - Attribution is now a "triangulation problem" across MTA, MMM and incrementality testing — [Balistro](https://www.balistro.com/blog/marketing-attribution-in-2026); [Dataslayer](https://www.dataslayer.ai/blog/marketing-attribution-broken-2026).
  - Incrementality tests are the gold standard but expensive and slow — [Dataslayer](https://www.dataslayer.ai/blog/marketing-attribution-broken-2026) (page attribution uncertain).
- **(c)/(d):**
  - Meta's Robyn and Google's Meridian are open-source MMM tools that lower the barrier — [Optimix](https://optimix51-optimix-blog.hf.space/?p=190) (page attribution uncertain).
  - A vendor claim that MMM adoption grew from 9% (2023) to 26% (2026), and an "IAB 40% untrackable journeys" figure, are both unverified.
  - Vendors include askBosco — [askBosco](https://askbosco.io/blog/webinar-event/marketing-mix-modelling-mmm-what-cmos-need-to-know/), plus Recast, Northbeam, Triple Whale, Haus, Fospha (not verified this session).
- **(e)–(h) (assessment):** Durable, but free platform MMM (Google, Meta) and an established vendor field limit the gap. A small team could productise "Meridian-as-a-service for SMBs", but the models' credibility and the conflict of interest in platform-built models are hard to overcome.

#### C12. Developer tools: maintaining AI-generated code, and legacy modernization — FLAGGED (crowded; frontier-lab risk)
- **(a) Who:** Engineering managers and platform teams. For modernization: bank, insurer and government CIOs.
- **(b) Pain: AI-generated code debt.**
  - Sonar's 2026 survey: 88% of developers saw at least one negative AI impact on technical debt; 53% say AI code looks correct but hides defects; 40% say AI duplication increased debt — [Quash](https://quashbugs.com/blog/technical-debt-statistics); [Alex Cloudstar](https://alexcloudstar.com/blog/ai-generated-code-technical-debt-2026/) (secondary).
  - GitLab/Harris Poll (June 2026, 1,528 respondents): 73% concerned about maintainability; 82% say it creates new debt; **43% cannot reliably tell AI-written from human-written code** in their own codebase — [LetsDataScience](https://letsdatascience.com/news/gitlab-survey-finds-ai-coding-outpaces-governance-1e4e1caf).
  - An arXiv repository study found 24.2% of tracked AI-introduced issues survive at the latest revision — [arXiv 2603.28592](https://arxiv.org/pdf/2603.28592).
- **Legacy modernization:**
  - Anthropic's February 2026 announcement that Claude can automate COBOL exploration sent IBM stock down more than 13% in one session — [CIO Dive](https://www.ciodive.com/news/ai-shifts-mainframe-modernization-strategy/825677/) (page attribution uncertain).
  - Gartner warned that more than 70% of mainframe migrations started this year will fail — same source.
  - Hypercubic (YC-backed) raised a $5.3M seed on August 18, 2026 for COBOL/JCL/z/OS agents — [SiliconANGLE](https://siliconangle.com/2026/08/18/hypercubic-raises-5-3m-map-rewrite-legacy-cobol-apps-ai-agents/).
- **(d) Competitors:** Sonar; AI code review tools such as CodeRabbit, Graphite and Qodo; modernization players such as Mechanical Orchard and Moderne; systems integrators (all not verified this session except Sonar via the survey).
- **(e)–(h) (assessment):**
  - Coding agents (Anthropic, OpenAI, GitHub/Microsoft, Cursor) are directly absorbing review, refactor and modernization. Enterprise modernization sales cycles are too long for a 6–12 month target.
  - A possible niche is **behavioural-equivalence verification** (proving migrated or AI-rewritten code behaves the same), which is what makes Gartner's 70% failure rate meaningful. Not validated with buyer evidence.

#### C13. AI-content labelling compliance for deployers under EU AI Act Article 50 (from August 2, 2026) — NICHE
- **(a) Who:** Mid-size EU publishers, marketing agencies, brands and platforms that publish AI-generated or AI-edited media or public-interest text.
- **(b) Pain:**
  - Article 50 obligations apply from August 2, 2026. Deepfakes must be clearly labelled, as must AI-generated text informing the public on matters of public interest, with exemptions for text under human editorial responsibility — [Enterprise DNA](https://enterprisedna.co/resources/news/eu-ai-act-code-practice-ai-content-labelling-august-2026); [Emerging Europe](https://emerging-europe.com/europes-ai-labelling-rules-arrive/).
  - The Commission published a voluntary Code of Practice on June 10, 2026 (more than 187 participants) and endorsed it on July 9, 2026 — [LetsDataScience](https://letsdatascience.com/news/eu-endorses-ai-generated-content-transparency-code-f9326b9c).
  - C2PA manifests can be stripped by re-saves, so the Code encourages pairing them with invisible watermarks — [sota.io](https://sota.io/blog/eu-ai-act-ai-content-labelling-tools-2026-c2pa-provenance-detection).
  - Penalties are reported at up to €15M or 3% of global turnover. One outlier claims 6%, likely wrong — [Enterprise DNA](https://enterprisedna.co/resources/news/eu-ai-act-code-practice-ai-content-labelling-august-2026) (page attribution uncertain).
  - Guides tell deployers to ask AI tool providers whether outputs carry Content Credentials — [C2PA Viewer](https://c2paviewer.com/articles/eu-ai-act-content-credentials).
- **(c) Willingness to pay:** No direct spend evidence found.
- **(d) Competitors:** Generators embedding C2PA or watermarks themselves (Adobe Content Credentials, Google SynthID, OpenAI; not verified this session); Truepic and Digimarc (not verified).
- **(e)–(h) (assessment):** Durable regulation, but the **generator side will be absorbed by the platforms**. The deployer-side workflow is unserved as far as found: inventory which published assets are AI-touched, apply labels consistently across CMS and social, and keep audit evidence. The market depends on enforcement intensity. Feasible for a small team. Low defensibility.

#### C14. Creator / talent likeness protection and AI-clone licensing — MODERATE
- **(a) Who:** Talent agencies, musicians, top creators, sports and entertainment rights holders.
- **(b)/(c) Pain and willingness to pay:**
  - Vermillio raised a $16M Series A (March 2025) led by Sony Music, its first AI investment. TraceID fingerprints and monitors AI-generated likenesses — [Lawyer Monthly](https://www.lawyer-monthly.com/2025/03/ai-protection-platform-vermillio-secures-16m-in-series-a-funding-led-by-sony-music/); [Pulse2](https://pulse2.com/vermillio-16-million-series-a-closed-for-ai-licensing-and-protection-platform/amp/).
  - Loti raised a $16.2M Series A (April 2025, per a third-party database) — [VC Backed](https://www.vcbacked.co/company/loti).
  - Through its March 2026 Underscore Talent partnership, Loti claims a 95% takedown success rate within 17 hours. Its CEO forecasts prompt-level licensing and royalties emerging in 2026 — [Loti](https://lotiai.com/in-the-press).
- **(d)–(h) (assessment):**
  - The top-talent tier is served by funded players.
  - The mid-tier creator market has lower willingness to pay.
  - Platforms such as YouTube are building likeness detection (not verified this session).
  - A licensing marketplace needs two-sided liquidity, which is hard for a small team.
  - No 2026 funding was found for either leader.

#### C15. Grant management: AI-written application floods at funders, plus reporting burden at grantees — LOW-MODERATE (thin evidence)
- **(a) Who:** Programme officers at foundations and government grant-makers. Finance and grants staff at nonprofits.
- **(b) Pain:**
  - 57% of foundations surveyed did not know whether they had received AI-generated applications (Candid, 2024) — [Candid](https://candid.org/blogs/funders-insights-on-ai-generated-grant-application-proposals/).
  - NIH's NOT-OD-25-132 targets applications substantially developed by AI and caps each PI at six submissions a year — [OpenGrants](https://opengrants.io/ai-for-grant-writing-2026-playbook/).
  - A PNAS study found AI-assisted applications more likely to be funded, with more homogeneous ideas — [Granted AI](https://grantedai.com/blog/topics/ai-grants) (page attribution uncertain).
  - Funders on a grant platform's community forum report receiving ChatGPT-written applications — [Foundant community](https://community.foundant.com/funders_community_foundations/discussions?tagID=1027).
  - Each funder has its own reporting rules, budget categories and deadlines — [ClickTime](https://www.clicktime.com/blog/grant-management-software-comparison).
- **(c) Willingness to pay:**
  - The grant-management software market is estimated at $2.5B–$3.07B (2025), with about 10% CAGR — [Stealth Agents](https://stealthagents.com/research/ai-grant-management-automation-statistics-2026) (page attribution uncertain).
  - Euna claims users save 72% of admin time (vendor claim) — [Euna](https://eunasolutions.com/resources/2026-state-of-grants-management-report-blog/).
- **(d) Competitors:**
  - Grant Lifecycle Manager: reviewers say reporting and role permissions take time to learn — [Capterra](https://www.capterra.com/p/122147/Grant-Lifecycle-Manager/reviews/Capterra___5082017/).
  - Foundant, Euna, Submittable, Fluxx, Instrumentl, Grantable (partly not verified).
- **(e)–(h) (assessment):** Durable but low willingness to pay on the nonprofit side. Funder-side "AI-flood triage" is plausible but **no 2026 evidence of a quantified flood was found**. A small, slow-procurement market.

#### Screened out quickly (crowded or platform-absorbed; brief evidence)
- **AI agent identity, permissions and security.** Many large 2026 rounds, and TechCrunch's headline says AI agent security startups now "crowd the market":
  - Reco: $55M; found 21,000 unknown agents at one Fortune 100 customer — [TechCrunch](https://techcrunch.com/2026/09/29/reco-raises-55m-as-ai-agent-security-startups-crowd-the-market/)
  - AIR: $50M seed (Sequoia, Greenoaks) — [PYMNTS](https://www.pymnts.com/news/investment-tracker/2026/ai-agent-security-startup-air-raises-50-million-to-guard-enterprise-supply-chains/)
  - NewCore: $66M seed at a $300M post-money valuation — [TechCrunch](https://techcrunch.com/2026/06/15/ai-agents-are-becoming-employees-newcore-emerges-with-66m-to-give-them-identities/)
  - Oasis: $120M Series B — [Calcalist](https://www.calcalistech.com/ctechnews/article/ske4mstcwl)
  - Obsidian: $85M Series D at $1.1B — [Obsidian](https://www.obsidiansecurity.com/news/unlocking-ai-potential-securely)
  - GitGuardian: $50M Series C — [SiliconANGLE](https://siliconangle.com/2026/02/11/gitguardian-raises-50m-expand-non-human-identity-ai-agent-security/)
  - About $3.6B across ten agentic-security startups (aggregator figure) — [Software Strategies](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- **AI agent evaluation and observability.**
  - Datadog shipped AI Agent Monitoring, and New Relic added agentic monitoring at no extra cost (February 2026). Braintrust raised $80M — [Fundable](https://www.tryfundable.ai/blog/top-agent-observability-deals); [Pebblous](https://blog.pebblous.ai/blog/coralogix-ai-agent-observability-200m/en/).
  - Fiddler raised a $30M Series C — [Mozilla Ventures](https://mozilla.vc/fiddler-raises-30m-series-c-to-power-the-control-plane-for-ai-agents/).
  - Coval (voice evals) raised a $28M Series A; Sazabi an $8M seed — [Neuronfeed](https://neuronfeed.com/category/ai-observability).
  - Autoheal raised about $8M (September 28, 2026) — [aifunding.me](https://aifunding.me/companies/autoheal).
- **Security questionnaires and RFP response.** Comparison lists rank 12 to 31 tools:
  - Named vendors: Conveyor, Loopio, Responsive, AutoRFP.ai, Inventive AI, Arphie, Iris, Vendict, 1up, SiftHub — [SiftHub](https://www.sifthub.io/blog/best-ai-tools-security-questionnaire-management); [DeepRFP](https://deeprfp.com/blog/best-rfp-tools-comparison/); [ComplyJet](https://www.complyjet.com/blog/best-security-questionnaire-automation); [Loopio](https://loopio.com/blog/best-ai-software-rfp-responses/); [Iris](https://heyiris.ai/blog/best-ai-rfp-response-software-2026).
- **AI customer support.**
  - Decagon: $250M Series D at $4.5B (January 2026); about $481M raised in total — [Revenue Memo](https://www.revenuememo.com/p/decagon-funding).
  - Sierra: reportedly $950M at over $15B (May 2026); about $100M ARR in late 2025 — [Drag](https://www.dragapp.com/blog/decagon-vs-sierra/).
  - Trackers count 95–123 AI support startups with $7.2B–$10.8B raised — [Neuronfeed](https://neuronfeed.com/category/ai-customer-support).
- **SMB unified analytics without a data team.**
  - In Databox's own survey, 86% of users reach for ChatGPT, Claude, Gemini or Copilot first for analytical work — [Databox](https://databox.com/?p=193051).
  - AI-native BI (Fabi) and cheap BI already exist: Zoho at $30/month, Power BI at $14/user/month, Domo at $500+/month — [Fabi](https://fabi.ai/blog/7-easy-and-affordable-dashboard-solutions); [Novapixel](https://novapixeldev.com/blog/best-dashboard-tools-small-business-2026-no-data-team).
  - Klipfolio warns that AI does not replace defining which metrics matter — [Klipfolio](https://www.klipfolio.com/blog/smb-dashboard-reporting-trends-2026-klips).
  - Very high LLM-platform absorption risk via connectors.
- **Publisher monetisation of AI crawlers.**
  - Cloudflare Pay Per Crawl was still in closed beta in August 2026 — [Press Gazette](https://pressgazette.co.uk/platforms/cloudflare-says-bot-blocking-is-fueling-publisher-ai-deals/). On July 1, 2026 Cloudflare proposed pay-per-answer instead — [PPC Land](https://ppc.land/cloudflare-stops-charging-ai-per-crawl-and-starts-paying-per-answer/).
  - AWS WAF added a 402 paywall settled in stablecoin (June 15, 2026). TollBit runs a marketplace — [SEJ](https://searchenginejournal.com/charging-ai-bots-decides-which-agents-can-still-cite-you/580050).
  - About 1 AI-bot visit per 31 human visits (Q4 2025) — [Centinel](https://www.centinelanalytica.com/learn/why-monetize-ai-agents-not-just-block-them).
  - Some crawlers simply stopped when served 402s rather than paying — [Godberry](https://godberrystudios.com/posts/cloudflare-pay-per-crawl-http-402-scrapers-2026/index.md).
  - Infrastructure-platform risk is extreme.

### Inferences

**Top-3 ranking (1–10 scales; higher is better, including feasibility and defensibility):**

| Rank | Problem | Pain intensity | WTP evidence | Solution gap | Market size | Feasibility (1–5 ppl, 6–12 mo) | Defensibility | Total /60 |
|---|---|---|---|---|---|---|---|---|
| 1 | C1: SMB/lower-mid-market outbound-payment fraud control + Nacha 2026 evidence | 8 | 7 | 6 | 7 | 7 | 5 | 40 |
| 2 | C2: Hiring identity continuity (application → interview → offer → device → payroll), sold first to staffing/RPO and remote-first mid-market | 8 | 8 | 4 | 7 | 7 | 3 | 37 |
| 3 | C4: Assurance-evidence automation for AI-agent vendors (AIUC-1 / insurer / EU AI Act / enterprise AI reviews) | 6 | 5 | 6 | 5 | 8 | 3 | 33 |

Close runners-up:
- C5, SMB non-SSO offboarding via MSPs: about 33/60. Low ACV, crowded at the bottom.
- C13, EU Article 50 deployer labelling: about 31/60. No spend evidence; depends on enforcement.

**Rationale for C1 as #1:**
- It is the only candidate with all three of: a large, reported loss figure ($3.05B BEC in 2025, under-reported); a **fresh mandate** (Nacha Phase 2 since June 22, 2026, covering all non-consumer originators, with documentation that cannot be outsourced to the bank); and named incumbents that explicitly do not fit smaller buyers (Trustpair is "hard to justify" below 50–100 suppliers; Eftsure is "mid-to-large").
- Frontier labs have no reason to absorb it.
- The main threat is bundling by AP platforms and banks, which argues for a channel strategy through accountants and MSPs and a bank-agnostic evidence layer.

**C2 caveat:** The willingness-to-pay evidence is the strongest of any HR item (86% hit by fraud; Checkr, Greenhouse/CLEAR and iCIMS all launching). But that same evidence shows incumbents moving fast. Only pursue it with a wedge incumbents do not own:
- Post-offer and onboarding continuity (44% have no post-hire verification).
- Linking IT device shipping, IdP and payroll.
- The staffing-agency channel, where agencies must vouch for placed workers.

**C4 caveat:** This is a bet that agent liability insurance and AI-specific procurement reviews become routine. Current willingness-to-pay evidence is a handful of policies (ElevenLabs) and insurer capacity announcements. It is also exposed to eval vendors and GRC suites (Vanta/Drata; not verified) adding the same features.

**Cross-cutting pattern:** The best remaining gaps sit where (1) liability or regulation forces documented process, (2) enterprise tools exist but are priced or integrated for large companies, and (3) the work spans several systems no single platform owns (bank + AP + email; ATS + HRIS + IT + payroll).

**Dangerous trap:** Pure "AI-wrapper" analytics, writing and response tools (RFPs, analytics Q&A, SEO content) are being absorbed by general assistants with connectors.

### Gaps
- Not researched because the search budget ran out:
  - accreditation software for higher ed
  - translation/localisation
  - events
  - research/consulting workflows
  - EOR/contractor compliance (assumed crowded by Deel, Remote, Rippling; not verified)
  - reference and background-check fraud
  - SMB email security and ransomware (assumed crowded by Abnormal, Sublime, IRONSCALES, Huntress; not verified)
  - deepfake-detection vendors for video calls (Reality Defender, GetReal, Pindrop; not verified)
- No SMB-specific pricing or quotes were found for vendor-bank verification. Trustpair and Eftsure publish no list prices.
- No SMB loss distribution for BEC (median loss per incident by company size) was obtained.
- Nacha's own rule text was not read. The account-validation element for ACH credits (Kyriba/Ramp) needs checking against primary text.
- No primary Reddit or HN threads were read: no direct "I'd pay for X" quotes for any candidate. The MSP complaint statistics come from one commercial analysis.
- None of the hiring-fraud startups' funding (Tofu, InterviewGuard, Sherlock) could be confirmed. No YC company-directory check was possible (DNS failure).
- The full text of the YC Fall 2026 RFS could not be read. Only titles ("Proving You're Human", "AI-Native Compliance Infrastructure") came through secondary summaries.
- Market-size figures in dossiers are inferences built on assumed buyer counts that were not verified this session.

## What brand-new problems did widespread AI adoption create in 2024–2026 that companies are now paying (or desperate) to solve?

### Takeaway
The AI boom created at least eight new categories that buyers already pay for:
- deepfake and synthetic candidates
- AI-scale applicant floods
- agent identity and permissions
- shadow AI and AI-spend overruns
- AI-code debt
- content-labelling compliance
- AI liability insurance
- brand visibility inside AI answers

The money has mostly flowed to enterprise security (agent identity) and marketing (GEO). The hiring-fraud and AI-assurance segments are the least saturated of these.

### Cited Findings
- **Deepfake and fake candidates:**
  - 86% of organisations hit by hiring fraud; 40% interviewed a fake identity (up from 31%) — [Checkr](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2026).
  - Gartner: one in four candidate profiles fake by 2028 — [Greenhouse/CLEAR](https://greenhouse.com/newsroom/greenhouse-and-clear-announce-partnership-to-enable-candidate-verification).
  - Experian lists deepfake candidates among its top five 2026 fraud threats — [Pin](https://www.pin.com/blog/ai-deepfake-interviews/) (page attribution uncertain).
- **Agent identity and security:** Large rounds for Reco ($55M), AIR ($50M seed), NewCore ($66M seed), Oasis ($120M B) and Obsidian ($85M D at $1.1B) — [TechCrunch](https://techcrunch.com/2026/09/29/reco-raises-55m-as-ai-agent-security-startups-crowd-the-market/); [PYMNTS](https://www.pymnts.com/news/investment-tracker/2026/ai-agent-security-startup-air-raises-50-million-to-guard-enterprise-supply-chains/); [TechCrunch](https://techcrunch.com/2026/06/15/ai-agents-are-becoming-employees-newcore-emerges-with-66m-to-give-them-identities/); [Calcalist](https://www.calcalistech.com/ctechnews/article/ske4mstcwl); [Obsidian](https://www.obsidiansecurity.com/news/unlocking-ai-potential-securely).
- **Shadow AI:**
  - Only 37% of enterprises have AI governance policies.
  - The first SEC 8-K triggered by unauthorised employee AI use (CB Financial Services) — [CSA](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/).
- **AI cost overruns:** 73% of companies exceeded AI cost plans; 98% of FinOps teams manage AI spend — [Varcio](https://varcio.com/blog/finops-for-ai-llm-token-cost-control) (page attribution uncertain).
- **AI-code debt:**
  - 82% say AI code risks new technical debt; 43% cannot tell AI code from human code — [LetsDataScience/GitLab](https://letsdatascience.com/news/gitlab-survey-finds-ai-coding-outpaces-governance-1e4e1caf).
  - 24.2% of AI-introduced issues persist — [arXiv](https://arxiv.org/pdf/2603.28592).
- **Content-labelling compliance:** EU Article 50 applies from August 2, 2026; the Code of Practice was endorsed on July 9, 2026 — [LetsDataScience](https://letsdatascience.com/news/eu-endorses-ai-generated-content-transparency-code-f9326b9c); [Enterprise DNA](https://enterprisedna.co/resources/news/eu-ai-act-code-practice-ai-content-labelling-august-2026).
- **AI liability insurance:**
  - Armilla offers $25M limits as traditional insurers retreat — [Armilla](https://www.armilla.ai/resources/armilla-ai-raises-lloyds-backed-coverage-to-25m-as-traditional-insurers-retreat-from-ai-risk).
  - ElevenLabs holds an AIUC-1-backed policy — [Vorp Labs](https://vorplabs.com/ai-agent-liability).
- **GEO:** Profound raised a $180M Series D at $1.8B — [Everything-PR](https://everything-pr.com/profound-reaches-1-billion-valuation-with-96m-series-c-cementing-category-leadership-in-ai-search-marketing).
- **Publisher bot monetisation:** About 1 AI-bot visit per 31 human visits — [Centinel](https://www.centinelanalytica.com/learn/why-monetize-ai-agents-not-just-block-them).
- **Likeness protection:** Loti claims 95% takedowns within 17 hours — [Loti](https://lotiai.com/in-the-press).
- **YC signals:** The Fall 2026 RFS names "Proving You're Human" and "AI-Native Compliance Infrastructure" — [Modelence](https://modelence.com/yc-rfs-fall-2026); [IBTimes](https://www.ibtimes.sg/A000Ncu).

### Inferences
- The new problems split into two groups:
  - Problems sold to the **security budget**: agent identity, shadow AI, deepfake fraud. These are well funded and fast-crowding.
  - Problems that fall **between budgets**: hiring fraud spans HR, security and IT; AI-assurance evidence spans product, legal and sales. These are less crowded because no single buyer owns them yet.
- "Proof" problems recur across domains: proof of human (candidates, applicants), proof of provenance (content labelling), proof of control (agent logs for insurers), proof of payee (bank-detail verification). Verification infrastructure is the common thread, and it suits small teams that can integrate several systems.

### Gaps
- No independent loss data for deepfake-candidate incidents (cost per fraudulent hire).
- No buyer-side price points for agent-assurance evidence products.

## Which go-to-market and HR workflows broke because of AI-generated volume (spam applicants, spam outreach, fake candidates)?

### Takeaway
Three workflows visibly broke:
- **High-volume recruiting:** applications per job doubled and applications per recruiter roughly quintupled while recruiter headcount halved.
- **Cold outbound:** reply rates roughly halved to about 1–3.5%.
- **Identity trust in remote interviews.**

The volume side is being absorbed by ATS vendors and sales-tool incumbents. The identity side still has gaps after the offer stage.

### Cited Findings
- Applications per job went from 116 to 244 (2022→2025). Per recruiter: 146→746. Recruiters per organisation: 10.43→4.62 — [The Hire Hub](https://www.thehirehub.ai/blog/ai-generated-job-applications).
- About 291 applications per hire versus about 100 in early 2021 (Ashby) — [Axios](https://axios.com/2026/08/21/job-seekers-ai-hiring-ghost-jobs-trust).
- 77% of hiring teams regularly see AI-assisted applications (Willo 2026) — [HeroHunt](https://www.herohunt.ai/blog/surviving-the-ai-application-flood-2026-playbook/) (page attribution uncertain).
- Cold-email median reply rate: 2.1% in 2026 versus 4.7% in 2022; February 2024 bulk-sender rules raised the deliverability bar — [Visionary Marketing](https://visionary-marketing.co.uk/blog/b2b-cold-email-statistics-2026).
- Bridge Group: 3.5%→1.4% (2018→2025) — [Boomerang](https://getboomerang.ai/glossaries/why-cold-outbound-stopped-working).
- AI-generated cold outbound reportedly gets 0.5–1.5% reply rates (methodology unclear) — [Boomerang](https://getboomerang.ai/glossaries/listicle-ai-outreach-makes-cold-worse).
- Lead-data accuracy: Apollo 73.2% deliverable in a vendor test; ZoomInfo's guarantee covers only company affiliation — [BounceZero](https://bouncezero.io/apollo-io-review-2026); [Prospeo](https://prospeo.io/s/is-zoominfo-accurate).
- 44% of companies have no formal post-hire identity verification — [Checkr](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2026).
- Grant-making is showing early signs: NIH caps PIs at six applications a year and targets AI-developed applications — [OpenGrants](https://opengrants.io/ai-for-grant-writing-2026-playbook/). 57% of foundations do not know if they have received AI applications — [Candid](https://candid.org/blogs/funders-insights-on-ai-generated-grant-application-proposals/).

### Inferences
- The "receiving end" of AI-generated volume (recruiters, funders, inbox owners, procurement teams reading AI-written RFP responses) is a recurring pattern.
- The dominant gatekeeper usually absorbs the fix: the ATS for applications, Google/Microsoft for inboxes, NIH-style policy caps for grants.
- Startups do better selling **verification** (human, identity, payee) than **filtering** (ranking or screening), because filtering is a native feature of the gatekeeper.

### Gaps
- No primary data on recruiter time-cost per fake candidate or cost per bad hire.
- No data found on AI-written RFP responses overwhelming procurement teams (a hypothesised parallel).

## Which SMB IT/security pains are underserved because enterprise tools are too expensive and complex?

### Takeaway
The clearest underserved SMB pains:
- **Payment-fraud verification:** enterprise tools are explicitly hard to justify below 50–100 suppliers, and a Nacha mandate has applied since June 2026.
- **Offboarding of non-SSO apps:** 56% of departed employees' licences are still active after 90 days.
- **Readiness for AI assistants and Copilot.**

MSPs are the natural channel, and r/msp is more frustrated with its vendors' commercial practices than with features.

### Cited Findings
- Trustpair is less accessible for smaller businesses, with the investment hard to justify below roughly 50–100 suppliers — [FitGap](https://us.fitgap.com/products/trustpair). Eftsure targets mid-to-large organisations — [Eftsure](https://www.eftsure.com/blog/products/top-7-vendor-verification-software-in-2026/).
- Nacha Phase 2 (June 22, 2026) extends fraud-monitoring duties to all non-consumer originators regardless of volume — [Bottomline](https://www.bottomline.com/learning-center/2026-nacha-compliance-rules-risks-and-how-prepare); [Ramp](https://ramp.com/blog/2026-nacha-rule-changes).
- 56% of SaaS licences of departed employees remain active 90 days later; non-SSO apps are the main gap — [Infonaligy](https://www.infonaligy.com/blog/employee-offboarding-security-gaps-smb).
- SMB tools are cheap and partial: Revoke ($59/month, four apps), Substly (manual requests for non-IdP apps) — [Parse.gl](https://www.parse.gl/brands/getrevoke-com); [Substly](https://www.substly.com/en/blog/how-smbs-can-streamline-employee-offboarding-without-expensive-iam-tools).
- Copilot readiness needs permission cleanup ("Everyone except external users", broken inheritance, orphaned guests), often done by consultants or with PnP PowerShell scripts — [Copilot Consulting](https://www.copilotconsulting.com/insights/microsoft-copilot-oversharing-prevention-guide-2026); [EPC Group](https://www.epcgroup.net/answers/clean-sharepoint-permissions-before-copilot-2026).
- MSP vendor complaints (32.2% about pricing, licensing and consolidation) outweigh usability complaints (14.0%) — [BigIdeasDB](https://bigideasdb.com/msp-software-pain-points-2026).
- Kaseya: auto-renewals and hard-to-exit contracts — [Flamingo](https://www.flamingo.run/blog/kaseya-bms-review). ConnectWise: hidden pricing — [Flamingo](https://www.flamingo.run/blog/connectwise-psa-review).
- The MSP AI service-desk layer is crowding: Mizo (July 2026), Treeline (Series A, March 2026), and ConnectWise's acquisition of zofiQ (January 2026) — [Dealroom](https://dealroom.co/news/138899-devolutions-telegraph-ventures-back-msp-automation-startup-mizo/); [StartupHub](https://www.startuphub.ai/ai-news/investors-news/2026/treeline-secures-series-a.md); [CB Insights](https://www.cbinsights.com/investor/zofiq).

### Inferences
- The SMB gap is real wherever (a) enterprise tools need ERP/IdP integration that SMBs lack and (b) a regulation or insurer now demands documented process.
- MSP-friendly packaging should be a design requirement: multi-tenant, transparent pricing, no lock-in. That responds directly to r/msp's top grievance.

### Gaps
- No SMB cyber-insurance data was gathered on underwriting requirements (for example, insurers demanding callback controls for payment changes).
- SMB ransomware and email-security tooling gaps were not researched.

## Which areas are already crowded or exposed to platform absorption (so should be avoided)?

### Takeaway
Avoid these unless there is a sharp, defensible wedge:
- GEO tracking
- AI customer support
- security questionnaires/RFPs
- agent identity/security
- agent evals/observability
- AI SDRs/lead data
- shadow-AI governance
- SMB conversational analytics
- publisher crawler monetisation
- Copilot oversharing tools
- AI code review/modernization

Each already has unicorn-scale leaders, acquisitions by suites, or a frontier/infrastructure platform shipping the same feature.

### Cited Findings
- **GEO:** Profound at $1.8B; about $604M raised across ten startups; Sitecore bought Scrunch; HubSpot bought XFunnel — [Everything-PR](https://everything-pr.com/profound-reaches-1-billion-valuation-with-96m-series-c-cementing-category-leadership-in-ai-search-marketing); [Value Add VC](https://valueaddvc.com/blog/ai-search-optimization-startups-2026-geo-aeo-funding-investors); [Dealroom](https://dealroom.co/charts/generative-engine-optimization-startups?theme=light).
- **AI support:** Decagon at $4.5B, Sierra at $15B+, 95–123 startups — [Revenue Memo](https://www.revenuememo.com/p/decagon-funding); [Drag](https://www.dragapp.com/blog/decagon-vs-sierra/); [Neuronfeed](https://neuronfeed.com/category/ai-customer-support).
- **Agent security:** "crowd the market" — [TechCrunch](https://techcrunch.com/2026/09/29/reco-raises-55m-as-ai-agent-security-startups-crowd-the-market/); about $3.6B raised across ten startups — [Software Strategies](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/).
- **Evals/observability:** Datadog and New Relic (free) entered; Braintrust raised $80M — [Fundable](https://www.tryfundable.ai/blog/top-agent-observability-deals).
- **Security questionnaires/RFP:** lists of 12–31 tools — [DeepRFP](https://deeprfp.com/blog/best-rfp-tools-comparison/); [SiftHub](https://www.sifthub.io/best-ai-rfp-software).
- **Shadow AI / SaaS management consolidation:** Akamai–LayerX, Freshworks–Torii, 1Password AI spend management — [Push Security](https://pushsecurity.com/blog/the-top-10-shadow-ai-discovery-and-governance-tools); [Calcalist](https://calcalistech.com/ctechnews/article/xnwfli0e6); [Elvex](https://www.elvex.com/blog/ai-token-cost-enterprise-budget-control) (page attribution uncertain).
- **Publisher crawler monetisation:** Cloudflare (pay-per-answer) and AWS WAF (402 paywall) — [PPC Land](https://ppc.land/cloudflare-stops-charging-ai-per-crawl-and-starts-paying-per-answer/); [SEJ](https://searchenginejournal.com/charging-ai-bots-decides-which-agents-can-still-cite-you/580050).
- **Legacy modernization:** Anthropic's COBOL announcement moved IBM stock by more than 13% — [CIO Dive](https://www.ciodive.com/news/ai-shifts-mainframe-modernization-strategy/825677/) (page attribution uncertain).
- **Hiring fraud:** incumbents absorbing it — Greenhouse+CLEAR, Checkr IDV, iCIMS — [Greenhouse](https://greenhouse.com/newsroom/greenhouse-and-clear-announce-partnership-to-enable-candidate-verification); [SiliconANGLE](https://siliconangle.com/2026/03/04/checkr-launches-identity-verification-combat-ai-driven-hiring-fraud/); [PR Newswire](https://prnewswire.com/news-releases/icims-unveils-candidate-fraud-strategy-to-help-enterprise-recruiting-teams-detect-fake-applicants-302911338.html).
- **SMB analytics:** 86% of analytics users reach for general LLM assistants first — [Databox](https://databox.com/?p=193051).

### Inferences
- The absorption vectors differ by category:
  - Frontier labs: code, analytics Q&A, writing.
  - Infrastructure platforms: Cloudflare/AWS for crawler payments; Microsoft for Copilot governance.
  - System-of-record incumbents: ATS for hiring screening; AP platforms and banks for payment checks.
  - Security suites: SSE/browser vendors for shadow AI.
- A small team should prefer problems where the fix needs **cross-system workflow plus liability-grade evidence**, which no single platform owns.

### Gaps
- Product Hunt and YC W24–F26 directories could not be scanned directly (DNS failures and search budget), so small, unfunded competitors in C1, C2 and C4 may be missed. A manual check of ycombinator.com/companies for "payment fraud", "vendor verification", "hiring fraud", "identity verification" and "AI assurance" is recommended before acting.
