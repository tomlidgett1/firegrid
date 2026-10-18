# Australian employment, payroll and workplace compliance: unsolved problems employers would pay to fix (as of 18 October 2026)

*Method: 22 web searches. WebFetch failed with DNS errors (ENOTFOUND) on both attempts, so every "Cited Finding" comes from search-result snippets and summaries, not full-page reads. Where a search summary attributed a claim to a group of pages rather than one page, the citation says so. Anything marked **[Background, unverified]** is the researcher's prior knowledge and was not confirmed in this round. Earlier conclusions on award-wage auditing are taken as given (see `Unsolved problems worth paying for/verify_australia_forced_demand.md`, Q5).*

---

## Q1. What is actually going wrong for small employers since Payday Super started on 1 July 2026, and are payroll platforms and clearing houses handling it well?

### Takeaway
Payday Super is live. The free ATO Small Business Superannuation Clearing House (SBSCH) closed on 1 July 2026. Three problems recur in the evidence:
- **Data errors cause fund rejections.** Employment Hero says incorrect member data causes more than 90% of contribution errors, and a rejection does not reset the 7-business-day clock.
- **Settlement time eats the window.** Clearing houses can take 3–5 business days to settle.
- **Funds were not fully ready.** One analysis found 48% of onboarding items unanswered or unprocessable in the first month.

The ATO is being lenient in year one: employers who pay on payday and fix errors promptly are treated as low risk. The new super guarantee charge (SGC) is still a real cost. The ATO assesses it automatically, interest compounds at the general interest charge (GIC) of about 11.5% a year, and there is an administrative uplift.

Each platform has added its own clearing house: Xero Auto Super, MYOB PaySuper, HeroClear (Employment Hero, and now QuickBooks), and Beam (QuickBooks). Wrkr and SuperDue sell multi-client tracking to bookkeepers. No search found a cross-platform tool that reconciles pay run → clearing house → fund acceptance and also estimates SGC exposure per payday. The ATO's own SGC calculator stops at the quarter ending 30 June 2026.

### Cited Findings
**Rules and costs**
- **New rules:** super is due within 7 business days of payday, with exceptions such as new employees. The base moves from ordinary time earnings to "qualifying earnings", which include salary-sacrificed amounts, and the rate stays at 12%. The ATO now assesses SGC itself and employers no longer lodge an SG statement. Interest compounds daily at the GIC. SGC has four components, calculated per payday ("QE day"). — [ATO: about Payday Super](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/about-payday-super); [ATO: the new SGC](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/missed-or-late-payday-super-payments/the-new-super-guarantee-charge)
- **Late payments still cost money:** a late contribution can reduce the SGC, but the employer may still owe the interest and administrative components and any choice loading. — [ATO: payment deadlines](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-on-payday/payment-deadlines-for-payday-super)
- **Uplift and GIC rate:** the administrative uplift can reach 60% of the shortfall plus notional earnings, and the GIC rate for October–December 2026 is 11.51% a year. Both figures come from a search summary of several employer guides; the exact page was not confirmed. — [Hamilton Locke](https://hamiltonlocke.com.au/payday-super-what-the-1-july-2026-reforms-mean-for-directors-and-businesses/); [Access Group guide](https://www.theaccessgroup.com/en-au/payroll/payday-super/payday-super-a-guide-for-employers-in-australia/); [WorkPro guide](https://www.workpro.com.au/blog/payday-super-2026-employer-guide)
- **Earlier proposal:** the 2024 proposed model described an admin uplift of up to 60% and a penalty cap of 50%, and said SGC would become tax deductible. The final settings should be checked against the ATO. — [Sladen (Sept 2024)](https://sladen.com.au/news/2024/9/30/sladen-snippet-payday-super-proposed-model-released)
- **Near real-time detection:** guides say the ATO now compares Single Touch Payroll (STP) data with the contributions funds actually receive, in near real time. — [same guide set as above; attribution not confirmed]
- **Directors' liability:** law firms are publishing on directors' personal liability and insolvency safe harbour under Payday Super. — [Taylor David](https://taylordavid.com/payday-super-directors-liability/); [Hamilton Locke](https://hamiltonlocke.com.au/payday-super-what-the-1-july-2026-reforms-mean-for-directors-and-businesses/)

**SBSCH closure**
- The SBSCH stopped taking new registrations on 1 October 2025. Its last day of use was 30 June 2026, and it closed on 1 July 2026. Payments attempted after that are rejected. — [Wrkr](https://www.wrkr.com.au/resources/small-business-super-clearing-house-closing); [ATO content](https://www.ato.gov.au/api/public/content/0-2ba2bdf6-13fa-4ef3-832e-4280bf6dd002)
- The SBSCH was free and many alternatives charge fees. Industry groups argued that payroll software companies raised prices to reflect Payday Super's demands. — [Accountants Daily: "Small business decries 'unfair' payday super changes"](https://www.accountantsdaily.com.au/business/20435-small-business-decries-unfair-payday-super-changes) (snippet only; fetch failed); [BIA guide](https://bia.org.au/another/your-guide-to-the-ato-super-clearing-house-closure/)
- Named replacements: Xero Auto Super, QuickBooks Online with Beam, MYOB PaySuper, fund-provided clearing houses, and commercial gateways such as Wrkr. — [BIA](https://bia.org.au/another/your-guide-to-the-ato-super-clearing-house-closure/); [McLaren Hunt](https://mclarenhunt.com.au/insights/the-small-business-superannuation-clearing-house-is-closing/)

**What is going wrong**
- **Data errors:** Employment Hero says incorrect member data accounts for more than 90% of super contribution errors. Employers cannot delay payment while waiting for employee details; they must use the stapled or default fund. — [Employment Hero Payday Super FAQs](https://help.employmenthero.com/hc/en-au/articles/16258865498383-Payday-Super-FAQs)
- **Settlement time:** many clearing houses take 3–5 business days to settle, which leaves little time to find invalid member details before the deadline. QuickBooks added HeroClear for Payday Super. — [CFOtech](https://cfotech.com.au/story/quickbooks-adds-heroclear-for-payday-super-compliance)
- **Rejections do not reset the clock:** from 1 July 2026 funds generally have 3 business days to allocate a contribution or return it. Rejections usually come from data problems such as TFN or date-of-birth mismatches, closed accounts or wrong fund identifiers. — [Workstem](https://www.workstem.com/au/?p=3218); [Jake Law](https://jakelaw.com.au/payday-super-nsw-employers-guide/); [Microkeeper](https://info.microkeeper.com.au/blogs/payday-super-how-long-do-super-funds-have-to-allocate)
- **Returned money handled differently:** some clearing houses refund rejected money to the employer's bank account, so a new payment has to be set up. HeroClear keeps the money so the batch can be reprocessed. Employment Hero has published a help article on fixing CTER batch errors. — [Employment Hero help 1](https://help.employmenthero.com/hc/en-au/articles/17426654247951); [Employment Hero CTER help](https://help.employmenthero.com/hc/en-au/articles/17079330759823-Fix-super-batch-contribution-errors-CTER-and-reprocess-affected-contributions-with-HeroClear)
- **Retirees returning to work:** AustralianSuper (7 October 2026) flags returning retirees whose old accounts are closed. The fund needs a new member registration before it can accept contributions. — [AustralianSuper, 7 Oct 2026](https://www.australiansuper.com/employers/employers-articles/2026/10/super-reasons-why-contributions-may-be-rejected)
- **Public-sector funds:** CSC (PSSap and ADF Super) says it can no longer hold contributions in the fund while working with employers to resolve errors or data issues. — [CSC](https://www.csc.gov.au/payday-super)
- **Fund readiness:** at onboarding, "a staggering 48% remained without a response or were unable to be processed", described as "very understandable teething issues in the first month". What the 48% measures was not clear from the snippet. — [Financial Standard](https://www.financialstandard.com.au/news/super-funds-show-unpreparedness-on-payday-super-179813649)
- **Who is struggling:** a regional NSW article said "it is not the businesses that ignored the change that are struggling. It is the ones that assumed their existing systems would handle it." It also said the 20-business-day concession for a new employee's first contribution is not a general grace period and does not roll over to the second pay run. — [Daily Liberal](https://www.dailyliberal.com.au/story/9364384/ato-payday-super-rules-trigger-penalty-risks-for-employers/) (attribution from search summary)
- **Cash flow:** a March 2026 Xero survey found 84% of Australian small business owners warning that late customer payments could make them miss Payday Super deadlines. — [Xero media release](https://www.xero.com/us/media-releases/small-businesses-back-payday-super-but-late-payments-are-major-compliance-barrier/)

**ATO year-one approach**
- Employers who pay on payday and fix errors quickly are treated as low risk: "If you fix the error promptly, we will not focus compliance action on you." — [ATO: getting it right in the first year](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/missed-or-late-payday-super-payments/getting-it-right-compliance-in-the-first-year-of-payday-super)
- MYOB's FAQ says the clock runs from payday to fund receipt, not from submission. It says the ATO will take a reasonable approach, "particularly in the first year", where delays are outside the employer's control. Bookkeepers can be set up as "Pay Super Authorisers" for clients. — [MYOB Payday Super FAQ PDF](https://pages.myob.com/hubfs/_SMB/Expansion/Payday%20Super/MYOB%20Payday%20Super%20Webinar%20FAQs.pdf?hsLang=en)

**Pricing and tools**
- **Employment Hero:** from 1 April 2026 its integrated super processing costs A$0.30 per employee per batch. — [Employment Hero help](https://help.employmenthero.com/hc/en-au/articles/15084112983183)
- **QuickBooks:** super processing through Beam is included in the payroll subscription, with "no announcement of a specific surcharge". This is a community-forum reply from staff, not an official price. — [QuickBooks community](https://quickbooks.intuit.com/community/payroll-and-stp-49/payday-super-processing-cost-129509)
- **Wrkr:** multi-client bookkeeper portal ("create, submit and track contributions across all client entities from one secure login") with a timeline from submission to fund processing. Its price was "free until July 31st and from $5.50/month after". — [Wrkr for bookkeepers](https://wrkr.com.au/bookkeepers-payday-super/); [Wrkr pricing page](https://www.wrkr.com.au/payday-super-bookkeepers)
- **SuperDue:** a deadline board for bookkeepers and BAS agents that ranks all clients' pay runs, riskiest first. It has no Xero or MYOB connection (manual or spreadsheet import), and it neither lodges nor advises. — [SaaSworthy: SuperDue](https://www.saasworthy.com/product/superdue)
- **Odoo:** an "l10n_au_payday_super_dashboard" module tracks each liability against its 7-business-day deadline, ages overdue amounts, and scores each fund on required, received, outstanding and on-time rate. It targets in-house payroll on Odoo. — [Odoo Apps](https://apps.odoo.com/apps/modules/18.0/l10n_au_payday_super_dashboard)
- **Xero:** a Xero Partner Hub product idea asks for a widget showing clients' super compliance status. It is still at the suggestion stage. — [Xero Product Ideas](https://productideas.xero.com/forums/967127-practice-tools/suggestions/51555809-xph-include-superannuation-compliance-status-wid)
- **SGC calculators:**
  - The ATO's SGC calculator covers 1 July 2003 to the quarter ending 30 June 2026 only. — [ATO SGC calculator](https://www.ato.gov.au/calculators-and-tools/super-guarantee-charge-statement-and-calculator-tool)
  - RosterElf's free Payday Super calculator uses a GIC of about 10.61%. — [RosterElf](https://www.rosterelf.com/free-tools/payday-super-calculator)
  - FairWork Mate's SGC calculator was "last verified 1 July 2025". — [FairWork Mate SGC](https://fairworkmate.com.au/tools/sgc-penalty)
  - The ATO's draft Law Companion Rulings LCR 2026/D1–D4 were under consultation, with a joint professional-body submission. — [SMSF Association joint submission](https://www.smsfassociation.com/advocacy/joint-submission-payday-super-d1-qualifying-earnings-d2-eligible-contributions-d3-calculation-and-assessment-of-sgc-d4-application-and-transitional-provisions)
- **STP and qualifying earnings:** a payroll vendor says Payday Super uses STP Phase 2 data as its main way of verifying SG compliance, so wrong income-type disaggregation produces wrong qualifying earnings. This is a vendor claim, not an ATO statement. The ATO's own "common STP Phase 2 mistakes" page was last updated 29 July 2022. — [Workstem: common STP errors 2026](https://www.workstem.com/au/?p=3259); [ATO STP Phase 2 mistakes](https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll/expanding-single-touch-payroll-phase-2/common-stp-phase-2-reporting-questions-and-mistakes)

### Inferences
**What is going wrong**
- The failures are operational, not about awareness. The window is 7 business days, settlement takes 3–5, and funds take up to 3 more to accept or return. That leaves a day or two of slack per pay run. Weekly payers face this 52 times a year, against 4 quarterly deadlines before. Each rejection needs someone to chase member data and resubmit, usually a bookkeeper or office manager.
- Rejected money now lands in different places: it may be refunded to the employer's bank (some clearing houses) or held for reprocessing (HeroClear), and CSC no longer holds it in suspense. A bookkeeper with clients on several platforms has no single view of "what is late, what bounced, and what it will cost".
- **[Background, unverified]** Under the old rules, a contribution was treated as received by the fund on the day the SBSCH accepted it. Losing that rule is part of why the timing risk moved to employers.

**Are platforms handling it?**
- Partly. Each payroll platform now runs its own clearing house and is solving the problem inside its own walls. Wrkr comes closest for bookkeepers, but it is a clearing house: you pay through it. SuperDue is a manual deadline board.
- The gap is a platform-agnostic overlay that does three things:
  1. reads pay runs from Xero, Employment Hero (KeyPay), MYOB and QBO;
  2. ingests clearing-house and fund status;
  3. computes per-payday SGC exposure under the new four-component formula.

  The ATO calculator does not cover post-July periods, and the free calculators are out of date or inconsistent.

**Timing**
- Urgency is muted until about 30 June 2027 by the ATO's "fix it promptly and we won't focus on you" stance. Urgency should rise for FY2027-28, once leniency ends and the ATO's automated SGC assessments and data matching are running.
- The opening for a product is therefore "be the evidence that you fixed promptly" now, and "SGC exposure and assessment checking" from 2027.

**Who pays**
- The money flows are real: SGC interest at GIC (about 11.5%), an uplift of up to 60%, and director penalty exposure. Bookkeepers already pay for partial tools (Wrkr A$5.50/month, EH A$0.30 per employee per batch), but these anchors are low. A new product would likely price per client entity at roughly A$5–25/month, not per employee.

### Gaps
- No post-July 2026 statistics were found: no ATO counts of late Payday Super contributions, rejected contribution rates, or SGC assessments issued. No SmartCompany or Accountants Daily coverage of the first months was retrieved, so "what is actually going wrong" rests on vendor, fund and law-firm guidance plus one fund-readiness analysis (Financial Standard, 48%).
- No Reddit, Whirlpool or MYOB community complaint threads were captured; a MYOB thread exists but its content was not retrieved ([MYOB community](https://community.myob.com/discussions/staffing_and_payroll/payday-super/905289)).
- Unknown:
  - Xero Auto Super and MYOB PaySuper fees.
  - Whether Xero or MYOB expose fund-acceptance status through their APIs (critical for a third-party overlay).
  - Whether Wrkr, Beam or QuickSuper offer APIs.
- Not confirmed: how many businesses used the SBSCH. **[Background, unverified]** It was reported at roughly 150,000–200,000.
- NZ: KiwiSaver is already deducted every payday through the payday filing system, so a Payday Super tool would not transfer directly. **[Background, unverified]**

---

## Q2. Which workplace obligations newly hit small businesses in 2025–2027 with immature tooling?

### Takeaway
Seven obligations are new or newly enforced in 2025–2027 and still have immature tooling:
- **Payday Super**, from 1 July 2026 (see Q1).
- **NSW psychosocial Code of Practice**, effectively mandatory from 1 July 2026. Victoria's Psychological Health Regulations started on 1 December 2025.
- **Labour hire licensing**: Victoria rewrote its scheme from 1 June 2026, and South Australia extended licensing to all industries from 23 April 2026. Hosts face penalties of more than A$660k in Victoria.
- **Sponsor compliance under the Skills in Demand visa**, with ATO–Home Affairs payroll data matching covering about 58,000 visa holders, plus regulations from November 2025.
- **NSW workers' compensation reforms** from 1 July 2026.
- **A non-compete ban**, proposed from 2027 for workers under about A$175k (indexed). Passage was not confirmed.
- **Right to disconnect** for small businesses from August 2025. **[Background, unverified]**

The least mature tooling, where obligations depend on payroll data, is:
1. checking sponsored workers' pay against their nominations;
2. cross-platform Payday Super monitoring;
3. portable long service leave returns across schemes;
4. checking labour hire licences across states.

### Cited Findings
**Psychosocial hazards**
- From 1 July 2026, NSW employers must follow the psychosocial Code of Practice, or an alternative that meets an equivalent or higher standard. Inspectors can act on breaches of the Code without waiting for a psychological injury. SafeWork NSW added 20 inspectors focused on psychosocial risk in March 2026, within a A$127.7m enforcement investment. — search summary across [Insurance Business](https://www.insurancebusinessmag.com/au/news/breaking-news/mental-health-reforms-shift-risk-for-nsw-businesses-585426.aspx); [Gadens](https://www.gadens.com/legal-insights/psychosocial-hazards-in-the-workplace-legal-obligations-enforcement-trends-and-what-employers-need-to-know/); [FairWork Mate](https://fairworkmate.com.au/blog/psychosocial-risk-assessment-employer-requirements-2026)
- Victoria's Psychological Health Regulations have applied since 1 December 2025, and failing to follow the compliance code can be used as evidence. Queensland requires the hierarchy of controls for psychosocial risk. Other jurisdictions apply model WHS regulations, with codes as evidence. — [Gadens](https://www.gadens.com/legal-insights/psychosocial-hazards-in-the-workplace-legal-obligations-enforcement-trends-and-what-employers-need-to-know/); [HR Partner blog](https://blog.hrpartner.io/?p=4738)
- SafeWork NSW's 2024–26 psychosocial strategy targets small and medium businesses with A$5.6m of support. Employers with 200 or more staff get compliance site visits. — [Mondaq / Coleman Greig](https://mondaq.com/australia/health-safety/1489566/safework-nsw-releases-new-strategy-to-address-psychosocial-hazards)
- Enforcement focus is shifting "from bullying to management processes" (case commentary). — [Culture Plus Consulting](https://cultureplusconsulting.com/blog/from-bullying-to-management-processes-the-cases-defining-the-next-phase-of-psychosocial-regulation)

**Labour hire licensing**
- **Victoria:** changes from 1 June 2026 apply to all licence holders and applicants. They add a stronger fit-and-proper test, a financial viability requirement and wider information-gathering powers. The definition of labour hire now reaches supply-chain arrangements. — [Labour Hire Authority](https://www.labourhireauthority.vic.gov.au/about-us/labour-hire-law-changes-2026/); [LHA news](https://www.labourhireauthority.vic.gov.au/latest-news/be-aware-of-labour-hire-law-changes-that-come-into-effect-from-1-june-2026/)
- In June 2026 the authority refused or cancelled 16 licences. Penalties for using an unlicensed provider may exceed A$660,000 for a corporation. An older source cites more than A$500k, which conflicts. — [LHA, June 2026 actions](https://www.labourhireauthority.vic.gov.au/latest-news/providers-subject-to-licensing-action-in-june-2026/); [Acclaimed Workforce (older)](https://www.acclaimedworkforce.com.au/blog/workplace-relations/victorian-labour-hire-licence-scheme-update)
- **South Australia:** licensing was extended to all industries on 23 April 2026. Newly covered providers had to be licensed by 29 July 2026. Hosts must check that a provider holds a valid SA licence and can be liable even if they did not know it was unlicensed. — [Teamed](https://www.teamed.global/insights/south-australia-expands-labour-hire-licensing-to-all); [Baker McKenzie, July 2026](https://www.bakermckenzie.com/en/insight/publications/2026/07/australia-labour-hire-reform-lands-in-vic-sa)
- There is no national scheme. Licences do not carry across states: a Queensland licence does not cover Victoria or SA. — [Teamed](https://www.teamed.global/insights/south-australia-expands-labour-hire-licensing-to-all)

**Same job, same pay**
- Fair Work Commission (FWC) "regulated labour hire arrangement orders" require labour hire employers to pay at least the host's enterprise agreement rate. One 2026 article says the first year raised pay for more than 7,600 workers in mining, aviation, warehousing and freight. A Full Federal Court decision set aside an order that went beyond the relevant class of workers. Sources disagree on whether the protected rate covers base pay only or loadings and allowances too. — [Lander & Rogers](https://landers.com.au/legal-insights-news/same-job-same-pay-orders-one-year-on-fwc-guidelines-and-recent-decisions); [Gadens](https://www.gadens.com/insights/learnings-from-recent-same-job,-same-pay-cases-decided-by-the-fair-work-commission); [FairWork Mate](https://fairworkmate.com.au/blog/same-job-same-pay-labour-hire-rights)
- Liability for labour downstream in supply chains is now a 2026 legal theme for food and beverage businesses. — [Allens](https://www.allens.com.au/insights-news/explore/2026/food-beverage-law-2026/downstream-labour-liability/)

**Employer-sponsored visas (Skills in Demand, subclass 482)**
- Sponsors must notify Home Affairs within 28 days of key changes, such as a sponsored worker leaving or a significant change in duties. A missed notification is a breach even if unintentional. The obligations sit in Division 2.19 of the Migration Regulations, and monitoring can continue for up to 5 years after sponsorship ends. — [One Planet Migration Law](https://oneplanetmigrationlaw.com.au/immigration-blog/sponsorship-obligations-australia-business-sponsors/)
- A November 2025 instrument extended the Minister's power to cancel a Skills in Demand visa when sponsorship obligations are breached. — [Migration Alliance](https://migrationalliance.com.au/immigration-daily-news/entry/2025-11-migration-amendment-skilled-visa-reform-technical-measures-regulations-2025.html)
- Home Affairs is highlighting its monitoring of right-to-work checks, market-rate evidence and record keeping. — [BDO](https://www.bdo.com.au/en-au/insights/migration-services/sponsorship-compliance-in-focus-what-employers-need-to-know)
- A one-off ATO–Home Affairs data exchange matches visa records against payroll for about 58,000 subclass 482 holders and their employers. It checks correct salary, the nominated role and lawful conditions. "Any discrepancies between what was approved in a visa nomination and what's recorded in payroll could trigger an investigation." It is expected to become ongoing if it succeeds. These reports date from July 2025, and the program's status in October 2026 was not found. — [Accounting Times](https://www.accountingtimes.com.au/compliance/ato-home-affairs-intensify-monitoring-of-employers-skilled-visa-compliance); [BDO](https://www.bdo.com.au/en-au/insights/migration-services/visa-compliance-enforcement-enters-new-era-with-government-data-matching); [HR Leader](https://www.hrleader.com.au/learning/27017-ato-home-affairs-intensify-monitoring-of-employers-skilled-visa-compliance)
- The Core Skills Income Threshold is cited as A$76,515 by one source and A$79,499 from 1 July 2026 by another (conflict). — [One Planet Migration Law](https://oneplanetmigrationlaw.com.au/?p=4114); [RosterElf](https://www.rosterelf.com/blog/visa-sponsorship-requirements-australia)
- One 2026 commentary says an approved sponsor faces four times the unit penalty a non-sponsor faces for the same failure, with figures updated from 1 July 2026 (single source). Sponsorship generally lasts 5 years (6 for accredited sponsors). The Minister can cancel or bar sponsors under s140M. — [One Planet: breach penalties 2026](https://oneplanetmigrationlaw.com.au/immigration-blog/sponsorship-breach-penalties-australia-2026/); [No Borders Law Group](https://noborderslawgroup.com.au/articles/standard-business-sponsorships-introduction-to-sponsorship-bars-and-cancellations/)

**Non-compete ban**
- The government announced a ban on non-compete clauses for workers earning under the high-income threshold (A$175,000 at announcement), to take effect "from 2027 following consultation and passage of legislation". It operates prospectively. — [DEWR/Treasurer joint release](https://ministers.dewr.gov.au/chalmers/cracking-down-non-compete-clauses-boost-wages-and-productivity)
- Several sources cite 1 January 2027 "if passed". Threshold figures differ: A$175,088 (FairWork Mate) versus A$190,100 for 2026–27 (BrightHR and YourLifeChoices). The searches did not confirm that the bill has passed. — [BrightHR](https://www.brighthr.com/au/blog/employment-law/non-compete-clauses-ban-in-2027/); [FairWork Mate](https://fairworkmate.com.au/blog/non-compete-clause-ban-australia); [YourLifeChoices](https://www.yourlifechoices.com.au/finance/union-group-says-banning-this-contract-clause-could-lift-pay-by-4300-a-year/)

**Workers' compensation**
- **NSW:** reforms took effect on 1 July 2026, including an 18-month freeze on base premiums, which the government says saves the average small business A$12,000 over four years. icare's 8% average rise in 2025–26 was the last year of the 8% cap. — [NSW Government](https://www.nsw.gov.au/ministerial-releases/workers-comp-cost-reform); [icare](https://www.icare.nsw.gov.au/news-and-stories/icare-confirms-8-average-workers-compensation-premium-rate-increase-in-2025-26)
- NSW minimum premium rose from A$225 to A$240. Paying upfront earns up to 5% off, and safer employers can get up to 7.5% more. Small and experience-rated policies must lodge an actual wages declaration within 4 months of the policy period. This is from the 2025–26 article. — [NSW Small Business Commissioner](https://www.smallbusiness.nsw.gov.au/news-podcasts/news/workers-compensation-premium-increases-for-2025-26)
- **Victoria:** the average WorkCover premium is frozen at 1.8% for 2026–27, the fourth year in a row, with A$5.8m for free return-to-work training and support. Individual premiums still move across more than 500 industry rates. A Nationals MP (partisan source) cited a Bendigo employer whose premium rose from A$32,000 in 2022/23 to nearly A$76,000 in 2025/26. — [Victorian Premier](https://www.premier.vic.gov.au/workcover-premiums-hold-next-financial-year); [Vic Nationals](https://vic.nationals.org.au/media-releases/gaelle-broad-mp-workcover-premiums-soar-as-businesses-left-without-options/); [Insurance News](https://www.insurancenews.com.au/regulatory-government/state-maintains-freeze-on-workers-comp-rates)

**Portable long service leave**
- **NSW:** the Long Service Corporation's community services scheme gained an online employer portal with a dashboard and reporting from April 2026, and the Corporation may audit. — [NSW Long Service Corporation FAQ](https://www.longservice.nsw.gov.au/csi/employers/employer-frequently-asked-questions)
- **Victoria:** the portable scheme covers community services, contract cleaning and security. LeavePlus (formerly CoINVEST) covers construction. The July–September 2026 return is due 31 October 2026, and employers must register within 3 months of starting in a covered industry. — [Pay Cat (updated Oct 2026)](https://www.paycat.com.au/blog/victoria-portable-long-service-leave)
- **ACT:** employers must register, lodge quarterly returns (nil returns included) and pay levies. Late lodgement attracts penalties, and records must be kept for 7 years. The building and construction levy is 2.75%. — [ACT Leave: community sector](https://actleave.act.gov.au/community/employers/); [ACT Leave: security](https://actleave.act.gov.au/security/employers/); [ACT Leave: construction](https://actleave.act.gov.au/construction/employers/)
- **Queensland:** QLeave's contract cleaning scheme requires quarterly returns of ordinary wages, with 8.67 weeks of leave after 10 years. QLeave runs a page specifically for bookkeepers and accountants. — [QLeave](https://www.qleave.qld.gov.au/contract-cleaning/employers/bookkeepers-and-accountants)

**Other**
- STP Phase 2 has a new consequence: wrong income-type mapping now flows into qualifying earnings and SGC (vendor claim; see Q1). — [Workstem](https://www.workstem.com/au/?p=3259)

### Inferences
**Tooling maturity**
- **Most immature, payroll-data dependent:**
  - Sponsor nomination-versus-payroll checks: no payroll-integrated tool was found.
  - Cross-platform Payday Super exception and SGC monitoring.
  - Multi-scheme portable long service leave returns: Xero has no report.
  - Multi-state labour hire licence checks for hosts.

  A developer who already builds OAuth payroll and POS integrations, SQL and dashboards can reach all four.
- **More mature or advisory-heavy:**
  - Psychosocial risk: many HR, WHS and consultancy offerings exist (see Q4).
  - Non-compete re-papering: lawyers and template vendors cover it.
  - Workers' comp: brokers, premium consultants and insurer portals cover it.

**Effect of freezes and pending laws**
- The NSW and Victorian workers' comp freezes reduce near-term premium pain for 2026–27.
- The non-compete ban is uncertain (passage not confirmed) and prospective, so it does not force anyone to buy anything in 2026.

**Background, unverified**
- **Right to disconnect:** applied to small businesses from 26 August 2025.
- **Casual employment:** the new definition and the "employee choice" pathway to conversion started on 26 August 2024.
- **Employee-like workers:** the FWC's power to set minimum standards for employee-like digital platform workers started in 2024.

  These mostly need policies and templates, which HRIS vendors and associations already supply, so they show weak software willingness to pay.

### Gaps
- No evidence was collected on: right to disconnect disputes involving small businesses; casual conversion disputes; FWC orders for "employee-like" workers; or the PALM scheme (approved employer counts, compliance burden, deductions, accommodation rules). These are important gaps for the agriculture and meat processing segments.
- Labour hire (Queensland and ACT): no 2026 changes were found.
- Labour hire (all states): registered provider counts were not found.
- Sponsor counts: there is no count of approved standard business sponsors, and no 2026 sanctions statistics.
- Non-compete bill: its parliamentary status in October 2026 is unverified.
- No psychosocial enforcement outcomes against SMBs (prosecutions, improvement notices) were found.

---

## Q3. Where are employers paying consultants, lawyers or bookkeepers large fees for repetitive compliance work?

### Takeaway
Hard price points were scarce in this round. The clearest evidence of repetitive paid work is:
- **Portable LSL returns:** bookkeepers spend "upwards of 3 hours each quarter" per client on Victorian portable LSL returns from Xero.
- **Super processing:** fees per employee per batch (Employment Hero A$0.30) and per-client clearing portals (Wrkr A$5.50/month) for work the free SBSCH used to cover.
- **Workplace investigations:** external investigators at about A$250+GST an hour (QHA).
- **Advisory work:** sponsor compliance audits by migration lawyers, payroll tax contractor reviews by mid-tier firms (BDO, Findex, Crowe), and dismissal advice through employer associations (MTA NSW's "call us first") and advice subscriptions.

The money-flow areas, where penalties, levies and premiums are actually paid, are super (SGC), payroll tax back-assessments, workers' comp premiums and visa sanctions.

### Cited Findings
- **Portable LSL:** a Xero product-ideas thread requests a quarterly report meeting Victorian portable LSL requirements. A user says the PLSL report "can take upwards of 3 hours each quarter". Employment Hero (Payroll classic, Standard and Premium plans) has a portable LSL report. Returns can be uploaded as CSV, but some states or industries require manual entry in the employer portal. — [Xero Product Ideas](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/47693666-au-payroll-add-portable-long-service-leave-repor); [Employment Hero help](https://help.employmenthero.com/hc/en-au/articles/17426642142095-Portable-Long-Service-Leave-Report-on-Payroll-classic)
- **Portable LSL competitor:** Pay Cat sells a "portable long service leave toolbox". — [Pay Cat toolbox](https://www.paycat.com.au/portable-long-service-leave-toolbox)
- **Super processing:** Employment Hero charges A$0.30 per employee per batch from 1 April 2026. Wrkr charges from A$5.50/month for bookkeepers. — [Employment Hero](https://help.employmenthero.com/hc/en-au/articles/15084112983183); [Wrkr](https://www.wrkr.com.au/payday-super-bookkeepers)
- **Workplace investigations:**
  - QHA lists a nominal A$250 + GST an hour for an employment relations expert to run an investigation. — [QHA](https://qha.org.au/?p=1155)
  - Guides recommend external investigators for serious allegations, cases involving senior staff, or where litigation risk exists. — [HWL Ebsworth](https://hwlebsworth.com.au/internal-or-external-investigation/); [Sprintlaw](https://sprintlaw.com.au/articles/how-to-conduct-independent-workplace-investigations-in-australia/)
  - In *Cao v Metro Assist* [2016] FWC 5592, the FWC suggested an objective third party may be prudent. — [WISE Workplace](https://www.wiseworkplace.com.au/?p=3868)
  - A 2012 parliamentary submission lists legal fees, higher WorkCover premiums and replacement hiring as costs of badly handled bullying complaints (dated). — [APH submission 144](https://aphref.aph.gov.au/house/committee/ee/bullying/subs/sub144.pdf)
- **Payroll tax on GP contractors:**
  - Mid-tier firms publish heavily on medical practices' payroll tax exposure. — [Findex](https://www.findex.com.au/insights/article/recent-decisions-and-rulings-set-to-impact-payroll-tax-compliance-in-medical-practices); [Crowe](https://crowe.com/au/insights/recent-decisions-impact-payroll-tax-compliance-in-medical-practices); [BDO](https://bdo.com.au/en-au/insights/advisory/articles/vic-nsw-and-act-follow-qlds-lead-in-the-payroll-tax-and-medical-centres-saga); [King & Wood Mallesons](https://www.mallesons.com/au/en/insights/latest-thinking/payroll-tax-rolling-with-developments.html)
  - **Queensland:** the amnesty covered periods to 30 November 2024. GP wages have been exempt since 1 December 2024, made permanent by legislation. — [QRO](https://qro.qld.gov.au/payroll-tax/liability/contractor-payments/amnesty/)
  - **South Australia:** a retrospective amnesty covers unpaid payroll tax on GP contractor payments before 1 July 2024 (ruling dated 12/09/2025). It does not cover employed GPs or other staff. — [RevenueSA PTASA004](https://revenuesa.sa.gov.au/__data/assets/pdf_file/0009/1185984/PTASA004V3.pdf); [SA Business Chamber](https://sabusinesschamber.com.au/news/payroll-tax-amnesty-announced-for-medical-practices-contracting-general-practitioners)
  - **NSW and ACT:** NSW paused GP audits for 12 months from August 2023 (likely lapsed). The ACT amnesty covered payments up to 30 June 2023, plus a conditional prospective amnesty tied to bulk-billing and MyMedicare. — [BDO](https://bdo.com.au/en-au/insights/advisory/articles/vic-nsw-and-act-follow-qlds-lead-in-the-payroll-tax-and-medical-centres-saga)
- **Dismissals:** employer associations sell dismissal advice as a member benefit, for example MTA NSW's "Pause Before You Dismiss – Call MTA NSW First". — [MTA NSW](https://www.mtansw.com.au/resources1/hr-ir-news/pause-before-you-dismiss---call-mta-nsw-first.aspx)
- **Sponsor compliance:** migration law firms sell sponsor compliance services and publish 2026 guides to breach penalties. — [One Planet Migration Law](https://oneplanetmigrationlaw.com.au/immigration-blog/sponsorship-breach-penalties-australia-2026/); [Hannan Tew](https://www.hannantew.com.au/immigration/compliance/); [BDO migration](https://www.bdo.com.au/en-au/insights/migration-services/sponsorship-compliance-in-focus-what-employers-need-to-know)
- **STP Phase 2:** advisory firms sell STP Phase 2 error clean-ups. — [EEA Advisory](https://eea-advisory.com.au/article/fix-common-stp-phase-2-payroll-errors/); [AustPayroll](https://austpayroll.com.au/news-and-resources/common-stp-phase-2-reporting-questions-and-mistakes); [Digit](https://digit.business/insights/people-payroll/stp-phase-2-reporting-guide-australia)

### Inferences
- **Portable LSL** is the cleanest "repetitive bookkeeper labour" signal. At 3 hours a quarter and about A$60–90 an hour of bookkeeper time **[background market rate, unverified]**, that is roughly A$720–1,080 a client a year. A tool at A$20–40/month per entity would pay for itself.
- **Payroll tax for GP contractors:** the medical-centre payroll tax "saga" has largely been defused for GPs by state amnesties and exemptions (Qld permanent exemption; SA retrospective amnesty). The remaining fee pool is allied health, dental and other contractor-heavy clinics, plus grouping, which is advisory work where a solo developer has little edge.
- **Investigations and dismissal disputes** are paid work, but mostly bespoke professional services. Software can only help at the margins (case file, evidence log, report drafting) and would be sold to HR consultancies, not directly to SMBs.
- **[Background, unverified]** Employsure (now part of Peninsula Group), BrightHR and the employer associations (Ai Group, state chambers, NRA, ARA) sell multi-year HR and IR advice subscriptions to SMBs. Employsure contracts are commonly reported at several thousand dollars a year. This shows SMBs pay for compliance peace of mind, but the channel is sales-heavy.

### Gaps
- No published Australian prices were found for:
  - sponsor compliance audits (migration agents and lawyers);
  - payroll tax contractor reviews;
  - workers' comp premium reviews;
  - outsourced Payday Super reconciliation by bookkeepers.
- No survey of bookkeeper hourly rates or of time spent on Payday Super per client was found.
- Not found: numbers of registered BAS agents and bookkeepers.
- Not found: Employsure/Peninsula pricing.

---

## Q4. Which areas are already crowded?

### Takeaway
Crowded or bundled:
- **Award interpretation and wage auditing:** per prior research.
- **Clearing houses:** every payroll platform plus Wrkr, Beam and HeroClear.
- **VEVO work-rights checks:** CheckWorkRights and HRIS modules.
- **Psychosocial risk templates and registers:** HR suites, WHS apps, consultancies, FairWork Mate.
- **Dismissal and IR advice:** associations, Employsure/Peninsula/BrightHR, law firms.
- **Contract templates for the non-compete ban:** LawPath and others.
- **STP reporting itself:** bundled in all payroll software.

Least crowded:
- cross-platform Payday Super exception and SGC analytics;
- payroll-to-nomination checks for sponsored workers;
- multi-scheme portable LSL return generation for Xero and MYOB users;
- multi-state labour hire licence monitoring for SMB hosts.

### Cited Findings
- **Clearing houses and Payday Super tools:** Xero Auto Super, QuickBooks + Beam, MYOB PaySuper, HeroClear (Employment Hero and QuickBooks), Wrkr, SuperDue, an Odoo module, and fund clearing houses (e.g., Rest Pay). — [BIA](https://bia.org.au/another/your-guide-to-the-ato-super-clearing-house-closure/); [CFOtech](https://cfotech.com.au/story/quickbooks-adds-heroclear-for-payday-super-compliance); [Wrkr](https://wrkr.com.au/bookkeepers-payday-super/); [SaaSworthy SuperDue](https://www.saasworthy.com/product/superdue); [Odoo](https://apps.odoo.com/apps/modules/18.0/l10n_au_payday_super_dashboard); [Rest](https://rest.com.au/employer/rest-pay/what-is-a-clearing-house)
- **Free Payday Super and SGC calculators:** RosterElf and FairWork Mate. — [RosterElf](https://www.rosterelf.com/free-tools/payday-super-calculator); [FairWork Mate](https://fairworkmate.com.au/tools/sgc-penalty)
- **VEVO automation:** CheckWorkRights offers an "always-on API connection" to Home Affairs, with alerts and reports. It does not claim to check salary or nominations. Tanda publishes guidance on employing visa workers (roster-side checks). — [CheckWorkRights](https://checkworkrights.com.au/vevo-checks/); [Tanda](https://www.tanda.com.au/blog/employing-visa-workers-in-australia)
- **Psychosocial risk content and tools:** FairWork Mate (risk assessment guide and register), HR Partner, consultancies such as Culture Plus, and law firms. — [FairWork Mate](https://fairworkmate.com.au/blog/psychosocial-risk-assessment-employer-requirements-2026); [HR Partner](https://blog.hrpartner.io/?p=4738); [Culture Plus](https://cultureplusconsulting.com/blog/from-bullying-to-management-processes-the-cases-defining-the-next-phase-of-psychosocial-regulation)
- **Unfair dismissal and non-compete content:** LawPath and FairWork Mate both publish 2026 small business unfair dismissal guides. BrightHR and FairWork Mate both cover the non-compete ban. — [LawPath](https://lawpath.com.au/blog/whats-small-business-fair-dismissal-code); [FairWork Mate](https://fairworkmate.com.au/blog/unfair-dismissal-changes-2026-fwc-on-the-papers-weak-claims); [BrightHR](https://www.brighthr.com/au/blog/employment-law/non-compete-clauses-ban-in-2027/)
- **Portable LSL:** Employment Hero has a portable LSL report; Pay Cat sells a toolbox; Xero has none (request on the ideas board). — [Employment Hero](https://help.employmenthero.com/hc/en-au/articles/17426642142095-Portable-Long-Service-Leave-Report-on-Payroll-classic); [Pay Cat](https://www.paycat.com.au/portable-long-service-leave-toolbox); [Xero Ideas](https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/47693666-au-payroll-add-portable-long-service-leave-repor)
- **Award wage checking (prior research):** WageSafe, PaidRight, Yellow Canary, FairWork Mate (free for up to 5 staff, from A$499/month), and award interpretation bundled in Tanda and Deputy. — prior notes: `Unsolved problems worth paying for/verify_australia_forced_demand.md` Q5

### Inferences
- **FairWork Mate:** it appears in almost every 2026 search result across Payday Super, SGC, psychosocial risk, non-compete, unfair dismissal and labour hire. It is the closest "SMB compliance super-app" competitor in content and SEO terms, and any new SMB-facing compliance product will compete with its free tools for attention.
- **Psychosocial hazards:**
  - A real, newly enforced obligation (NSW from July 2026).
  - Crowded with low-cost templates, registers and EAP-linked services.
  - The product would be documentation, not data, so a data-integration developer has little edge.
- **Payday Super:**
  - The *payment* layer is crowded: every platform owns a clearing house.
  - The *observability and exposure* layer is not: no cross-platform reconciliation was found, and no Payday Super-era SGC estimator from the ATO or a credible vendor.
- **[Background, unverified]** Other likely competitors:
  - Large-employer supplier prequalification platforms (Cm3, Rapid Global, Avetta) already cover labour hire licence checks for big hosts.
  - QuickSuper, ClickSuper and Ozedi are additional commercial clearing houses.
  - Entitled and VisaCheck are other VEVO tools.

### Gaps
- Not checked in the Xero App Store (no fetch): SGC, super reconciliation, portable LSL or visa-compliance apps. This needs a manual check before any build decision.
- No Seek job-ad evidence was gathered (e.g., "Payday Super payroll officer" roles).
- Wrkr's and Beam's API availability and their reconciliation features beyond tracking are unverified.

---

## Q5. Which 8–12 candidate problems are worth paying for, and which top 3 should this founder pursue?

### Takeaway
Of 11 candidates, the strongest for a solo Australian developer with payroll and POS integration, SQL and dashboard skills are:

| Rank | Candidate | Average score |
|---|---|---|
| 1 | **Payday Super "exception desk"** for bookkeepers and multi-entity employers: cross-platform pay run → fund-receipt reconciliation, rejection triage, and per-payday SGC exposure and assessment checking | 6.8 / 10 |
| 2 | **Sponsored-worker payroll compliance monitor**: payroll compared with nomination terms, 28-day notification triggers, evidence pack, sold through migration agents and accountants | 6.3 / 10 |
| 3 | **Multi-scheme portable LSL return generator** for Xero/MYOB users in community services, cleaning and security | 5.3 / 10 |

Labour hire host licence monitoring and workers' comp wage-declaration and premium checks are honourable mentions.

Areas to avoid as standalone products:
- psychosocial risk registers;
- non-compete re-papering;
- dismissal advice;
- right to disconnect and casual conversion;
- payroll tax advisory.

### Cited Findings
**Market sizing inputs (ABS via ASBFEO, at 30 June 2025, latest verified)**

| Businesses | Count | Share |
|---|---|---|
| Employing businesses | 994,178 | of 2,729,648 actively trading |
| 1–4 employees | 688,870 | |
| 5–19 employees | 232,129 | 8.5% of all businesses |
| 20–199 employees | 67,857 | 2.5% |
| 200+ employees | 5,322 | |

The ABS count excludes businesses not registered for GST. — [ASBFEO, Aug 2025](https://asbfeo.gov.au/sites/default/files/2025-12/Number%20of%20small%20businesses%20in%20Australia_Aug%202025.pdf); [ABS Counts of Australian Businesses](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits). An ABS release covering July 2022 to June 2026 exists but was not read. — [ABS jul2022–jun2026](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/jul2022-jun2026)

**Sponsored-worker pool**
- About 58,000 subclass 482 holders and their employers are covered by the ATO–Home Affairs data matching. — [Accounting Times](https://www.accountingtimes.com.au/compliance/ato-home-affairs-intensify-monitoring-of-employers-skilled-visa-compliance)

**Fair Work Commission volumes**
- **2024–25:** 44,075 lodgements, 24% above the five-year average. These included 16,500 unfair dismissal and 6,209 general protections dismissal claims. — [HCA Mag](https://www.hcamag.com/au/specialisation/employment-law/fair-work-commission-unveils-reforms-as-applications-surge/556415); [QLS Proctor](https://www.qlsproctor.com.au/2025/11/unsustainable-increase-prompts-fwc-reform/)
- **Q1 2025–26:** 13,671 lodgements (another source says 13,761), 45% above the three-year Q1 average. General protections dismissal claims were 2,120, up 57%. — [HCA Mag](https://www.hcamag.com/au/specialisation/employment-law/fair-work-commissions-workload-is-unsustainable-within-current-setup/556415); [Australian Mining Review (AREEA)](https://australianminingreview.com.au/?p=58994)
- **Trend:** general protections dismissal claims are "on track to increase by 80% over the 3 years to the end of FY2025-26". President Hatcher called the growth "unsustainable". — [FWC Bulletin, Feb 2026](https://www.fwc.gov.au/documents/bulletin/bulletin-ending-2026-02-28.htm)
- **Small Business Fair Dismissal Code:** applies to employers with fewer than 15 employees, with a 12-month qualifying period. — [LawPath](https://lawpath.com.au/blog/whats-small-business-fair-dismissal-code)
- **Unverified single-source claim:** since 7 July 2026, the FWC can decide unfair dismissal claims on the papers if both parties consent. — [FairWork Mate](https://fairworkmate.com.au/blog/unfair-dismissal-changes-2026-fwc-on-the-papers-weak-claims)

*All other evidence for the candidates is cited in Q1–Q4 above.*

### Inferences

#### Candidate dossiers (a = buyer, b = pain, c = WTP evidence, d = competitors, e = why unsolved / why now, f = market, g = feasibility and channel, h = risks)

**C1. Payday Super exception desk: cross-platform reconciliation, rejection triage and SGC exposure (TOP 1)**
- **(a) Buyer:**
  - BAS agents and bookkeepers running payroll for 10–150 SMB clients on mixed platforms (Xero, Employment Hero/KeyPay, MYOB, QBO).
  - In-house payroll officers at multi-entity employers with 20–199 staff, e.g. hospitality groups and franchisees.
- **(b) Pain and frequency:**
  - Every pay run (weekly or fortnightly) now has a 7-business-day fund-receipt deadline.
  - Clearing settlement takes 3–5 days, and funds take 3 days to allocate or return.
  - Rejections from bad member data (more than 90% of errors per Employment Hero) do not reset the clock.
  - Returned money lands in different places depending on the clearing house.
  - Nobody sees "late / at-risk / bounced / cost" across all clients (Q1).
- **(c) WTP evidence:**
  - Money flows: SGC with GIC interest (11.51% for October–December 2026), an uplift of up to 60%, and director-liability commentary.
  - Bookkeepers already pay Wrkr (A$5.50/month) and EH (A$0.30 per employee per batch).
  - A Xero Partner Hub idea asks for exactly this view.
  - 84% of small business owners fear missing deadlines because of late customer payments.
  - Weak point: the ATO's year-one leniency (Q1).
- **(d) Competitors:**
  - Wrkr: multi-client tracking, but you must clear through Wrkr.
  - SuperDue: manual deadline board, no integrations.
  - HeroClear and Beam: inside their own platforms.
  - Xero Auto Super and MYOB PaySuper: inside their own platforms.
  - Odoo dashboard: Odoo users only.
  - RosterElf and FairWork Mate SGC calculators: generic, inconsistent or outdated.
  - The ATO calculator stops at 30 June 2026.
- **(e) Why unsolved / why now:**
  - Each vendor solves only its own platform. The SGC formula is new (four components per QE day, LCRs still in draft in 2026). The SBSCH closed on 1 July 2026.
  - Leniency ends around 30 June 2027, when the ATO's automated SGC assessment becomes the real stick.
  - **[Background]** The ATO also issues SGC assessments without any SG statement from the employer, so accountants will need to check them.
- **(f) Market:**
  - About 300,000 employing businesses with 5–199 staff, and about 994,000 employing businesses in total (ABS, June 2025).
  - Theoretical revenue: A$15/month across 300,000 entities ≈ A$54m/year.
  - Realistic: 3–10% penetration through bookkeepers gives about 9,000–30,000 entities × A$10–15/month ≈ A$1.1–5.4m ARR (inference).
  - NZ is weak: KiwiSaver is already paid each payday through IRD **[background]**. No global transfer beyond "contribution reconciliation".
- **(g) Feasibility:** high, 8/10.
  - Read-only OAuth to Xero Payroll AU, Employment Hero/KeyPay and QBO pay runs, a payroll/super ledger in SQL, and a rules engine for business days and public holidays by state.
  - An LLM drafts the "member data fix" request to the employee and a prompt-fix evidence note.
  - First customers: 5–10 BAS agents from Payday Super Facebook and LinkedIn groups and bookkeeper associations (ICB, Australian Bookkeepers Network **[background]**), then the Xero App Store.
  - Price per client entity, about A$8–20/month; practice plans about A$99–299/month.
- **(h) Risks:**
  - Xero ships the Partner Hub super widget, or Wrkr adds cross-platform ingestion.
  - Fund-acceptance status may not be available via API (critical; see gap). The fallback is clearing-house remittance or CTER files, or bank-feed matching.
  - The ATO's leniency keeps urgency low until mid-2027.
  - Liability if the SGC estimate is wrong; present it as an estimate with assumptions.

**C2. SGC assessment checker and late-super cost estimator for tax agents** (sub-candidate; best as a C1 feature)
- **(a) Buyer:** tax agents and accountants whose clients receive ATO SGC assessments, and franchisors or groups with many entities.
- **(b) Pain:**
  - Four-component SGC per payday: shortfall, notional earnings at GIC compounding daily, admin uplift, choice loading.
  - Late contributions offset only part of it.
  - The ATO calculator does not cover post-July 2026 periods.
- **(c) WTP:** SGC money is paid directly; demand for calculators is shown by RosterElf and FairWork Mate building free ones.
- **(d) Competitors:** free calculators (outdated or inconsistent), accountants' spreadsheets, payroll vendors (none found shipping one).
- **(e) Why unsolved / why now:** the LCRs were still in draft in 2026; volume arrives once assessments flow.
- **(f) Market:** in-house tax agents. **[Background, unverified]** About 40,000+ registered tax agents and about 10,000+ BAS agents.
- **(g) Feasibility:** high as a module of C1; weak as a standalone because demand is episodic.
- **(h) Risks:** the ATO publishes a free calculator; rule changes; liability for estimates.

**C3. STP Phase 2 pay-item mapping audit, from a "qualifying earnings" angle** (sub-candidate; onboarding feature of C1)
- **(a) Buyer:** bookkeepers taking on clients, and employers who migrated payroll platforms.
- **(b) Pain:** wrong income-type mapping now produces wrong qualifying earnings, which leads to SG underpayment and SGC (vendor claim). The ATO's STP mistakes page dates from 2022.
- **(c) WTP:** advisory firms (EEA Advisory, AustPayroll, Digit) sell STP clean-ups; no prices found.
- **(d) Competitors:** payroll vendor setup checks and consultants.
- **(e) Why now:** Payday Super raised the stakes of STP mapping.
- **(f) Market:** the same ~300,000 businesses; a one-off audit per client.
- **(g) Feasibility:** high; pay-item metadata is available through payroll APIs.
- **(h) Risks:** low recurring revenue; platforms add validation.

**C4. Sponsored-worker (Skills in Demand / 482) payroll compliance monitor (TOP 2)**
- **(a) Buyer:**
  - Approved standard business sponsors with 5–200 staff: hospitality (chefs, cooks), aged care and health, trades, IT, agriculture and meat processing.
  - Channel: registered migration agents and immigration lawyers, plus accountants.
- **(b) Pain:**
  - Continuous obligations: pay at least the nominated salary and market rate, the nominated occupation and duties, and 28-day notifications (resignation, role change). Breaches count even if unintentional.
  - Records for up to 5 years after sponsorship.
  - Payroll data now matched by the ATO and Home Affairs for about 58,000 holders.
  - Frequency: every pay run, plus events such as rate changes and terminations.
- **(c) WTP evidence:**
  - Consequences: sanctions, bars, cancellation of sponsorship (and with it the worker's visa), a public sanctions register, and a reported 4× unit penalty for sponsors.
  - Migration law firms market sponsor compliance services and 2026 penalty guides.
  - Gap: no AUD price points were found for audits.
- **(d) Competitors:**
  - CheckWorkRights: VEVO only, no salary or nomination check.
  - Tanda: guidance on visa workers.
  - Migration law firms (One Planet, Hannan Tew, BDO): manual audits.
  - **[Background]** VisaCheck/Entitled VEVO tools and HRIS visa-expiry fields in Employment Hero and others.
  - None compares payroll lines with nomination terms (Q2/Q4).
- **(e) Why unsolved / why now:**
  - Needs both payroll integration and migration-rule knowledge.
  - Data matching (2025) plus Skills in Demand regulations (November 2025), and a CSIT indexed on 1 July 2026 (A$79,499 per one source, conflicting).
- **(f) Market:**
  - If 58,000 holders average 2–4 per sponsor, roughly 15,000–30,000 active sponsors (inference).
  - A$50–150/month per sponsor gives a theoretical A$9–54m/year; realistically 500–1,500 customers ≈ A$0.5–2m ARR.
  - Global potential: the UK sponsor-licence regime is analogous **[background]**, but rules differ.
- **(g) Feasibility:** 7/10.
  - Reuses payroll OAuth.
  - Rules are bounded: salary floor, hours, occupation and location from the nomination, plus event triggers.
  - An LLM drafts notification wording.
  - Channel: partner with 5–10 migration agencies who get a client dashboard (they keep the advice role), and accountants serving restaurants.
  - First customers: restaurant groups and aged-care providers with 3+ sponsored workers.
- **(h) Risks:**
  - Policy churn (thresholds, programme redesign).
  - Data matching may stay "one-off".
  - **[Background]** Giving "immigration assistance" without registration under the Migration Act is restricted. Position the product as record-keeping and alerts, with advice from partnered registered agents.
  - Small market.

**C5. Multi-scheme portable LSL return generator (TOP 3)**
- **(a) Buyer:**
  - Employers in Victorian community services (including disability and NDIS providers), contract cleaning and security.
  - Employers in NSW community services, Queensland contract cleaning, and the ACT community, security and cleaning schemes.
  - Their bookkeepers. Construction schemes (LeavePlus, ACT construction) are a later extension.
- **(b) Pain:**
  - Quarterly returns per scheme, with registration within 3 months, nil returns, levies and late penalties.
  - "Upwards of 3 hours each quarter" per client from Xero.
  - Some portals require manual entry.
- **(c) WTP:**
  - Time cost of about A$700–1,000 per client a year (inference).
  - Levies and penalties are paid directly.
  - Pay Cat sells a toolbox, which shows people pay.
  - A Xero ideas thread shows demand.
- **(d) Competitors:**
  - Employment Hero Payroll report (CSV for some schemes).
  - Pay Cat toolbox.
  - Xero: none.
  - MYOB: unknown.
  - Scheme portals: the NSW portal launched April 2026.
- **(e) Why unsolved:**
  - Small and fragmented (one format per scheme); payroll giants deprioritise it.
  - Why now: the NSW portal change (April 2026) and Victorian quarterly cycles (return due 31 October 2026).
- **(f) Market:** unknown employer counts (gap). Plausibly a few thousand to about 15,000 registered employers across schemes (inference) × A$25–50/month ≈ A$1–9m theoretical. NZ/global: none.
- **(g) Feasibility:** 9/10.
  - Straight payroll-data transformation (ordinary wages and service days per worker per quarter) into scheme CSV formats, plus a reconciliation check.
  - Channel: NDIS-provider and community-sector bookkeepers, peak bodies (e.g., NDS **[background]**), QLeave's bookkeeper page, and the Xero App Store.
- **(h) Risks:**
  - Xero builds the report (the idea is on its board).
  - Scheme portal format changes.
  - Small ceiling, so it is best as a wedge into a broader "state-based payroll obligations" toolkit: portable LSL plus payroll tax plus workers' comp wage declarations.

**C6. Labour hire licence and host-compliance monitor across Vic, Qld, SA and ACT** (honourable mention)
- **(a) Buyer:** SMB hosts in agriculture, meat and food processing, warehousing, cleaning and aged care, and labour hire providers operating in more than one state.
- **(b) Pain:**
  - Hosts are liable even without knowledge (SA). Penalties exceed A$660k (Victoria).
  - SA extended licensing to all industries in April 2026; Victoria's supply-chain definition and financial viability test start June 2026.
  - Licences are not portable across states, and providers can lose them (16 refused or cancelled in Victoria in June 2026).
- **(c) WTP:** penalty-driven, but there was no evidence that SMB hosts pay for monitoring.
- **(d) Competitors:**
  - Free public state registers.
  - **[Background]** Large-host prequalification platforms (Cm3, Rapid Global, Avetta) and ethical-sourcing auditors (Fair Farms).
- **(e) Why now:** 2026 regime changes in SA and Victoria.
- **(f) Market:** unknown; hosts in four jurisdictions. Modest.
- **(g) Feasibility:** medium. Registers would need scraping or watching, and no APIs were found.
- **(h) Risks:** low SMB urgency; regulators may add their own alerts.

**C7. Psychosocial risk register, consultation records and complaint handling for SMBs** (crowded)
- **(a) Buyer:** NSW and Victorian employers with 20–199 staff.
- **(b) Pain:** the NSW Code applies from July 2026, inspectors (20 new) can act without an injury, and Victorian regulations started December 2025.
- **(c) WTP:** consultancies and EAPs sell into this; no AUD prices found.
- **(d) Competitors:** FairWork Mate, HR Partner, HRIS suites (Employment Hero, ELMO **[background]**), WHS apps (SafetyCulture **[background]**), consultancies.
- **(e) Why now:** real enforcement change, but the deliverable is documentation.
- **(f) Market:** about 68,000 businesses with 20–199 staff nationally.
- **(g) Feasibility:** medium-low; little data-integration advantage.
- **(h) Risks:** template commoditisation; liability if a register is treated as proof of compliance.

**C8. Workplace investigation case management and report drafting** (service-heavy)
- **(a) Buyer:** HR consultancies and investigators, plus mid-size employers.
- **(b) Pain:** bullying, sexual harassment and psychosocial complaints need procedurally fair investigations. External investigators charge about A$250+/hour (QHA).
- **(c) WTP:** fee-based.
- **(d) Competitors:** law firms, WISE Workplace and similar.
- **(g) Feasibility:** an LLM-drafting tool for investigators is possible, but the channel is narrow.
- **(h) Risks:** procedural-fairness liability.

**C9. Dismissal readiness and FWC claim response for SMBs** (crowded)
- **(b) Pain:** general protections dismissal claims rising toward +80% over 3 years; record lodgements.
- **(d) Competitors:** associations (MTA NSW and others), Employsure/Peninsula/BrightHR **[background]**, LawPath and law firms.
- **(g) Feasibility:** low-medium. The product would be a dismissal "file builder" checking the Small Business Fair Dismissal Code (<15 staff), probably resold through associations.
- **(h) Risks:** advice liability and incumbent channels.

**C10. Payroll tax contractor and grouping risk review for clinics and contractor-heavy SMBs** (advisory)
- **(b) Pain:** contractor provisions and grouping; back-assessments with interest and penalties.
- **(e) Status:** the GP issue is mostly defused (Qld permanent exemption; SA retrospective amnesty; ACT conditional amnesty), so the residual is allied health, dental and beauty.
- **(d) Competitors:** BDO, Findex, Crowe, King & Wood Mallesons and mid-tier firms.
- **(g) Feasibility:** low for a solo developer.
- **(h) Risks:** high liability; state-by-state rulings.

**C11. Workers' comp wage declaration, classification and premium check** (honourable mention)
- **(b) Pain:**
  - NSW requires the actual wages declaration within 4 months for small and experience-rated policies.
  - Victoria has more than 500 industry rates, and individual premium jumps occur (A$32k → about A$76k cited by a partisan source).
- **(c) WTP:** **[Background]** premium-review consultants work on contingency.
- **(e) Why now:** muted in 2026–27 by the NSW 18-month base-premium freeze and the Victorian average-rate freeze.
- **(g) Feasibility:** medium. Wage declarations can be pre-filled from payroll (fits C5's "state obligations" toolkit).

**Also considered and rejected:**
- **Non-compete re-papering:** passage unconfirmed, prospective only, template-crowded.
- **Right to disconnect and casual conversion:** policy and template work, low WTP.
- **Wage theft criminalisation:** no new angle found beyond prior notes. Note that Payday Super makes super underpayment visible in near real time through ATO matching, which supports C1 rather than a separate product.

#### Top-3 scoring (1–10)

| Criterion | C1 Payday Super exception desk | C4 Sponsored-worker payroll monitor | C5 Multi-scheme portable LSL |
|---|---|---|---|
| Pain intensity | 8 | 7 | 5 |
| WTP evidence | 6 (money flows plus paid partial tools, but low A$ anchors and year-one leniency) | 5 (severe sanctions, but no A$ price points found) | 5 (3 hrs/quarter of bookkeeper time; paid toolbox exists) |
| Solution gap | 6 (Wrkr/SuperDue/platform clearing houses partly cover) | 8 (no payroll-to-nomination tool found) | 6 (EH report and Pay Cat exist; Xero gap) |
| Market size | 7 | 4 | 3 |
| Feasibility for this founder | 8 | 7 | 9 |
| Defensibility | 4 (Xero/Wrkr can bundle) | 7 (niche rules plus migration-agent channel) | 4 (format work; Xero could ship) |
| **Average** | **6.5** | **6.3** | **5.3** |

The C1 average rises to about 6.8 if C2 and C3 are folded in as features, which adds +1 to the solution gap and WTP scores (judgement).

#### Kill criteria (inference)
- **C1:**
  - In 10 bookkeeper calls, fewer than 4 say they would pay at least A$10 per client a month for cross-platform exception and SGC exposure.
  - Xero ships a Partner Hub super-status widget before launch.
  - Fund-acceptance or CTER data cannot be obtained via API or file import from at least two of Xero Auto Super, Employment Hero/HeroClear or Beam.
- **C4:**
  - Fewer than 3 of 10 migration agencies agree to pilot.
  - Home Affairs confirms data matching stays one-off and no sanctions publicity follows.
  - Legal advice says alerts amount to "immigration assistance".
- **C5:**
  - Xero ships a portable LSL report.
  - Fewer than about 3,000 employers are registered across target schemes.

### Gaps
- **No primary WTP data:** no interviews, survey data or forum quotes from Australian bookkeepers about Payday Super exceptions after July were captured. The first step should be 10–15 discovery calls with BAS agents.
- **Fund-acceptance status:** whether Xero Auto Super, MYOB PaySuper, HeroClear, Beam and Wrkr expose it through APIs or exports is unverified. This decides C1's feasibility.
- **Counts not found:** active standard business sponsors (C4); employers registered in each portable LSL scheme (C5); labour hire licence holders and hosts (C6); PALM approved employers.
- **ABS data:** the June 2026 counts release exists but was not read; June 2025 counts are used.
- **Xero App Store:** not reviewed for super reconciliation, SGC, portable LSL or visa apps; a manual check is required.
- **Not researched (budget):** PALM scheme compliance, employee-like/gig worker standards, casual conversion disputes, right to disconnect disputes, and Queensland/ACT labour hire 2026 changes.
