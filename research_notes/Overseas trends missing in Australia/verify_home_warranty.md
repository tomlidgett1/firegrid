# Verification: Home warranty / home service plans in Australia (adversarial presence check)

Verifier: independent adversarial analyst (not involved in proposing the idea). Notes date: 13 October 2026.

> **Read first: execution status.** No web search ran for this verification.
> - **WebSearch.** I attempted three calls and the tool refused all of them. Its message was: "this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)".
> - **WebFetch.** The brief allowed one attempt, on https://www.domesticandgeneral.com.au/. It failed with `getaddrinfo ENOTFOUND`. That result is inconclusive, because the brief notes that WebFetch fails with DNS errors in this environment.
> - **No workarounds.** As the tool instructs, I did not query search engines with curl or wget, and I did not use third-party readers, proxies or archives.
> - **Status of the rest.** Everything below the execution log comes from my background knowledge: model training data with a nominal cutoff of mid-2026. My coverage of niche Australian products is patchy and possibly dated. Nothing below was confirmed in this session, so it sits under Inferences or Gaps and is tagged [UNVERIFIED]. **The verdict is provisional. The full adversarial search protocol still needs to be run.**

## 1. Does this business, or anything closely similar, already exist in Australia? (Verdict)

### Takeaway
**VERDICT: PARTIAL (provisional, not search-verified). Confidence: 35%.**

From background knowledge, Australia has several adjacent products that each cover part of the job:
- optional "motor burnout" cover in home insurance;
- emergency home-assist memberships from motoring clubs;
- single-product retail extended warranties;
- manufacturer warranties.

I know of no US-style home warranty that covers several systems against wear and tear for a recurring fee. However, the searches that could find one were not run. They would look for:
- a Domestic & General or administrator-run plan;
- an energy retailer's repair plan;
- an insurer's breakdown add-on;
- a start-up launched in 2023–26.

So PRESENT cannot be ruled out, and ABSENT cannot be supported.

### Cited Findings
- WebSearch did not run for any of the three queries attempted. The tool reported that the per-turn budget, shared across all agents (200 calls), was exhausted. Source: tool output, this session; no URL.
- WebFetch of the Domestic & General Australia domain failed with `getaddrinfo ENOTFOUND www.domesticandgeneral.com.au`. That error cannot tell a non-existent domain apart from the environment-wide DNS block noted in the brief. Source: tool output, this session; no URL.
- No external fact in these notes is backed by a source retrieved in this session.

### Inferences
- [UNVERIFIED] **My prior across outcomes:** PARTIAL about 60%, PRESENT about 30%, ABSENT about 10%. ABSENT is unlikely under the decision rules. I believe motor-burnout cover and emergency home-assist memberships are long-established, and each covers part of the job:
  - motor-burnout cover pays for appliance motors that fail;
  - home-assist memberships pay for the call-out and some labour when a home system fails.
- **How the 35% was set:** it is the roughly 60% prior, discounted because none of the search protocol was executed.
- [UNVERIFIED] **Most plausible routes to PRESENT, most likely first:**
  1. Domestic & General, Assurant, AmTrust or another warranty administrator sells plans covering several appliances in Australia, either directly or under a retailer's or manufacturer's brand.
  2. An energy retailer sells repair cover, not just an emergency call-out. Candidates: AGL, Origin, EnergyAustralia, Red Energy/Lumo, Alinta, Simply Energy, ActewAGL.
  3. An insurer sells an add-on that covers breakdown of home systems beyond motor burnout.
  4. A recent start-up sells "home cover" as a subscription.
- **Implication for the entrepreneur:** until the leads below are resolved, a new entrant should not market itself as "first in Australia". Even on my prior, the claim it could defend is narrower, for example "first home warranty covering several systems against wear and tear, with a contracted trade network". It could not claim to be the first home repair cover.

### Gaps
#### Full query log
| # | Tool / mode | Query or URL | Outcome |
|---|---|---|---|
| 1 | WebSearch, standard | HomeServe Australia home repair plans | Not performed: shared budget exhausted |
| 2 | WebSearch, standard | Domestic & General Australia appliance protection | Not performed: shared budget exhausted |
| 3 | WebSearch, standard | "home warranty" Australia appliances wear and tear plan | Not performed: shared budget exhausted |
| 4 | WebFetch (the one permitted attempt) | https://www.domesticandgeneral.com.au/ | Failed: getaddrinfo ENOTFOUND (inconclusive) |

Searches executed: **0** (three attempted, all refused). About 35 searches of the brief's budget are unused.

#### Unresolved leads (every lead in the brief plus new ones, highest priority first)
1. **Domestic & General.** Has it ever operated in Australia, or partnered with an Australian manufacturer or retailer to sell plans under the partner's brand? Also: who administers or underwrites The Good Guys Concierge, Harvey Norman Product Care and JB Hi-Fi Guarantee Plus? Candidates are D&G, Assurant and AmTrust.
2. **Energy retailers** (AGL, Origin, EnergyAustralia, Red Energy/Lumo, Alinta, Simply Energy, ActewAGL, Synergy).
   - Does any of them sell a "home assist" or repair plan?
   - If so, does it cover only the emergency call-out, or also repair and replacement after wear and tear?
   - I have only a weak, unverifiable memory that some retailers have marketed home-assistance add-ons based on call-outs.
3. **Insurers.**
   - Motor-burnout cover: which brands offer it, the claim limits, and the motor-age caps.
   - "Home assist" or home-emergency add-ons from Allianz, Youi, Budget Direct, Suncorp/AAMI, NRMA Insurance, RACV, QBE and brands underwritten by Hollard.
   - Any "equipment breakdown" cover for private homes.
4. **Start-ups.**
   - The named leads "Upkeep" and "HomeCare".
   - Any start-up offering a home warranty, home membership or home-maintenance subscription. Check Crunchbase, Startup Daily, SmartCompany and LinkedIn.
   - Whether Cover Genius sells appliance or home-system protection to Australian consumers. It is a Sydney-founded company that embeds insurance in other businesses' checkouts, through its XCover platform.
5. **Motoring clubs** (RACV, RACQ, RAA, RAC WA, NRMA). For each home-assist product, check:
   - whether it covers only the call-out and labour, or also parts and replacement;
   - the annual fee;
   - whether it is still sold.
6. **Manufacturer plans** (Rheem, Rinnai, Dux, Daikin, Fujitsu, Mitsubishi Electric, Fisher & Paykel, Electrolux, Samsung, LG). For each extended-warranty or service plan, check:
   - whether it covers one brand or several products;
   - whether it is paid upfront or by recurring fee.
7. **Trade businesses' memberships.** Find plumbing and air-conditioning businesses that run a "service club" or maintenance-plan membership, and check whether any include repair cover rather than only servicing and discounts. I have a weak memory of one run by a Queensland plumbing, electrical and air-conditioning business; I could not verify its name.
8. **HomeServe.** Confirm it has no operation, partnership or past pilot in Australia or New Zealand.
9. **Water utilities** (Sydney Water, Yarra Valley Water, SA Water, Water Corporation, Icon Water, Urban Utilities and others). Check whether any has a partnership covering the pipes and plumbing on the homeowner's side of the meter, as HomeServe runs with UK and US utilities.
10. **Sales-channel signals.** Check whether any of these has offered home cover after settlement or after a new home is handed over:
    - real-estate groups: Ray White, LJ Hooker;
    - property portals: Domain, REA;
    - property-management software: PropertyMe, Ailo, Kolmeo;
    - volume builders.
11. **Defunct attempts.** Any Australian home-warranty or appliance-cover subscription that has since closed. This would count as prior existence.
12. **New Zealand.** Whether HomeServe or D&G operates there, and whether NZ energy retailers (Mercury, Contact, Genesis) or lines companies (which run the local electricity networks) sell home-services plans.
13. **Community signals.** Threads on Reddit (r/AusFinance, r/AusPropertyChat), Whirlpool and OzBargain that mention "home warranty", "appliance cover" or "home assist".

#### Suggested query set for a re-run
About 32 searches, all in standard mode, about 85% of them presence checks. Square brackets give the `allowed_domains` filter for that search.

1. HomeServe Australia
2. Domestic & General Australia
3. "home warranty" Australia appliances -builder
4. home service plan Australia
5. appliance cover plan Australia monthly
6. home repair cover subscription Australia
7. breakdown cover home appliances Australia
8. hot water breakdown cover Australia
9. home emergency cover Australia
10. AGL home assist
11. Origin Energy home assist
12. EnergyAustralia home assist
13. Red Energy Alinta home services
14. motor burnout cover home insurance
15. Youi Budget Direct home assist add-on
16. RACV Home Assist cover
17. RACQ RAA RAC home assist
18. Rheem Rinnai extended warranty plan
19. Daikin care plan Australia
20. Good Guys Concierge underwriter
21. home maintenance subscription startup Australia
22. [startupdaily.net, smartcompany.com.au] home warranty
23. [finder.com.au, canstar.com.au, choice.com.au] appliance insurance
24. [insurancenews.com.au] home warranty appliance breakdown
25. [crunchbase.com, linkedin.com] home warranty Australia
26. [reddit.com] home warranty Australia
27. [whirlpool.net.au, ozbargain.com.au] appliance breakdown cover
28. HomeServe New Zealand home plans
29. ASIC deferred sales model add-on insurance
30. ASIC warranties financial products
31. ACCC extended warranties consumer guarantees
32. ABS dwellings age home repair spending

## 2. Can Australian homeowners or landlords buy a recurring plan covering wear-and-tear repair or replacement of multiple home systems and appliances today?

### Takeaway
This was not established in this session. From background knowledge only: probably not from any mainstream provider. Australian households appear to get this protection in pieces rather than as one US-style plan:
- motor-burnout cover inside home insurance;
- emergency call-out memberships;
- extended warranties on single products;
- manufacturer warranties;
- the statutory consumer guarantees.

A niche, partner-branded or recent provider could exist, and has not been ruled out.

### Cited Findings
- None. No source was retrieved (see the query log in section 1).

### Inferences
- [UNVERIFIED] **The term is already taken.** In Australia, "home warranty" mostly means builders' statutory home warranty insurance, which covers structural defects and builders who fail to finish. That naming clash would hide a US-style product from simple searches. A re-run must use synonyms such as "appliance cover", "home assist", "home protection plan" and "breakdown cover".
- [UNVERIFIED] **Possible reasons the US model has not been copied at scale.** These are hypotheses, not findings.
  - The Australian Consumer Law's consumer guarantees already give buyers remedies when goods fail within a "reasonable time". That weakens the case for a paid plan and adds compliance risk to its marketing.
  - Breakdown cover sold for a fee is likely to be regulated as general insurance, which makes it costlier to distribute.
  - In the US, sellers or agents often buy a home warranty for the buyer as a closing cost. Australian property settlements have no such convention.
  - Two rules introduced after the Hayne Royal Commission into financial services make it harder for agents and retailers to bundle cover at the point of sale. One is the deferred sales model for add-on insurance. The other is the ban on hawking, meaning unsolicited selling of financial products.
- [UNVERIFIED] **Landlords may be the strongest source of demand.** State tenancy laws require landlords to fix urgent failures such as hot water and heating quickly. Some states let tenants arrange urgent repairs up to a cap and then be reimbursed. A plan that guarantees a tradie will be sent maps directly onto that obligation.

### Gaps
- Not verified: whether any provider sells a plan covering several appliances or systems for a monthly or annual fee in 2026 (see leads 1–7 in section 1).
- Not verified: whether any Australian real-estate agency, builder, property manager or utility currently sells such a plan.

## 3. What is the closest thing found, and how does it differ?

### Takeaway
No entity was found by search in this session. On background knowledge, the closest equivalents, none of them confirmed, are:
1. **Motor-burnout cover in home insurance.** Closest on *what is covered*: appliances failing through wear and tear.
2. **Motoring clubs' home-assist memberships.** Closest on *how it works*: a membership fee, with a tradie sent when something fails.
3. **Retail extended warranties.** Closest on appliance coverage, but sold one product at a time.

None of them combines all of the following:
- a recurring fee;
- cover across several systems and appliances;
- repair and replacement after wear and tear;
- a contracted network of tradespeople.

### Cited Findings
- None. No source was retrieved in this session.

### Inferences
- **The gap is the bundle.** If the register below is accurate, a new entrant would offer these together, as one subscription:
  - cover for the whole home;
  - cover triggered by wear and tear;
  - parts and labour;
  - replacement when a repair is not worth doing.
- **Each piece already exists on its own; the combination does not**, as far as I know. That is why the verdict leans PARTIAL rather than ABSENT.
- **Likeliest fast competitors.** The motoring clubs and large insurers (IAG/NRMA, Suncorp/AAMI, RACV, RACQ) already have the customers, the tradie networks and the insurance licences to launch this quickly. They are the most likely to have piloted a repair-cover tier, or to launch one soon. That is another reason not to claim "first".

### Gaps
#### Entity register (background knowledge, all [UNVERIFIED])
None of these entities was found by search in this session. The URLs are root domains I know from background knowledge, not fetched. Product names, prices, status and dates are unconfirmed.

| Entity | URL (root, not fetched) | What it does (per background knowledge) | Status / date | Same as concept? |
|---|---|---|---|---|
| Frontdoor (American Home Shield, Frontdoor, 2-10 HBW) | https://www.frontdoorhome.com | US home warranties and home service plans | Active in the US. No Australian operation known | Overseas exemplar. Not in Australia, on my prior (about 90%) |
| Choice Home Warranty | https://www.choicehomewarranty.com | US home warranties | Active in the US. No Australian operation known | Overseas exemplar. Not in Australia, on my prior |
| Cinch Home Services | https://www.cinchhomeservices.com | US home warranties | Active in the US. No Australian operation known | Overseas exemplar. Not in Australia, on my prior |
| HomeServe (owned by Brookfield) | https://www.homeserve.com | Home emergency and repair plans, often sold through utility partners | Active in the UK, North America, France, Spain and Japan (per the brief). No Australian or NZ operation known (about 80%) | Would be SAME if present in Australia. Unresolved |
| Domestic & General | https://www.domesticandgeneral.com | Appliance protection plans in the UK, Europe and the US | Australian presence, past or present, unresolved. The .com.au fetch failed (inconclusive) | Would be SAME or close if present in Australia. Highest-priority lead |
| Assurant; AmTrust | (not given) | I believe both administer or underwrite extended warranties and device protection, with Australian operations | Unverified | May sit behind retailers' plans under the retailer's brand. Lead |
| Cover Genius (XCover) | https://www.covergenius.com | Sydney-founded insurer that sells cover, including product protection, through other businesses' online checkouts worldwide | Active, I believe | Adjacent: protects products, not the whole home. Also a possible partner. Lead |
| Motoring clubs' home assist: RACV, RACQ, RAA, RAC WA, NRMA | https://www.racv.com.au · https://www.racq.com.au · https://www.raa.com.au · https://rac.com.au · https://www.mynrma.com.au | 24/7 emergency home help, sold as a membership or linked to insurance. Covers the call-out and limited labour; parts and replacement generally excluded | I believe current. Details unverified | PARTIAL / adjacent (the brief's own classification) |
| Motor-burnout cover in home insurance (e.g., NRMA Insurance, AAMI, Suncorp, Budget Direct) | https://www.nrma.com.au · https://www.aami.com.au · https://www.suncorp.com.au · https://www.budgetdirect.com.au | Optional or included cover to repair or replace burnt-out electric motors in household appliances and equipment. Usually capped by the motor's age | I believe long-established. Details by brand unverified | PARTIAL. It is genuine wear-and-tear breakdown cover, but limited to motors and sold inside an insurance policy, with no servicing or trade network |
| Insurers' home-emergency or "home assist" add-ons (Allianz, Youi, Budget Direct, Suncorp/AAMI) | https://www.allianz.com.au · https://www.youi.com.au | Emergency help or temporary repairs after an insured event | Unverified | Adjacent unless it covers breakdowns. Unresolved |
| Retail extended warranties: Harvey Norman Product Care, JB Hi-Fi Guarantee Plus, The Good Guys Concierge | https://www.harveynorman.com.au · https://www.jbhifi.com.au · https://www.thegoodguys.com.au | Extended warranty on a single product, paid upfront at the point of sale | I believe current | Adjacent (the brief's classification): one product, no recurring fee, no home systems |
| Manufacturer warranties and extended warranties: Daikin, Rinnai, Rheem, Dux | https://www.daikin.com.au · https://www.rinnai.com.au · https://www.rheem.com.au · https://www.dux.com.au | Brand warranties, sometimes extended if the product is registered or installed by an approved dealer; servicing | Unverified | Adjacent: one brand, conditional, not a recurring plan across several systems |
| Energy retailers: AGL, Origin, EnergyAustralia, Red Energy, Alinta | https://www.agl.com.au · https://www.originenergy.com.au · https://www.energyaustralia.com.au · https://www.redenergy.com.au · https://www.alintaenergy.com.au | Sell electricity and gas; some also sell and install hot water, solar and batteries. Whether any sells a repair-cover plan is unresolved | Unverified | Would be SAME if a repair plan exists; PARTIAL if it covers only call-outs. Unresolved |
| Builders' statutory home warranty insurance: icare HBCF (NSW), VMIA DBI (Vic), QBCC scheme (Qld) | https://www.icare.nsw.gov.au · https://www.vmia.vic.gov.au · https://www.qbcc.qld.gov.au | Statutory insurance against structural or major defects, and against builders who fail to finish | Active | NOT the same (the brief's classification). It matters because it has already claimed the term "home warranty" |
| Landlord insurance: Terri Scheer, EBM RentCover | https://www.terrischeer.com.au · https://www.ebmrentcover.com.au | Covers unpaid rent, tenant damage, and insured events to the building and contents | I believe current | NOT the same: no cover for breakdown through wear and tear |
| Tradie marketplaces: hipages, Airtasker | https://hipages.com.au · https://www.airtasker.com | Online marketplaces that match households with tradespeople | Active | NOT the same: no cover. Possible partners for a trade network |
| Start-ups ("Upkeep", "HomeCare", other subscription home cover) | (none identified) | I know of no specific Australian home-warranty start-up | Unresolved | Unresolved (lead 4) |

## 4. What Australian facts matter for launch (regulatory classification, consumer law, market size)?

### Takeaway
No regulatory or market fact could be cited in this session (0 of the up to 5 requested). From background knowledge, the likely position is:
- **Classification.** A plan that covers breakdowns for a fee is probably a general insurance product. It would need an insurer authorised by APRA (the prudential regulator) to issue or underwrite it. The seller and the claims handler would each need an Australian financial services licence (AFSL), or to act as an insurer's authorised representative.
- **Distribution.** Selling it alongside a property purchase, a new build or an appliance purchase, through agents, builders or retailers, may trigger the deferred sales model for add-on insurance and the anti-hawking rules.
- **Consumer law.** The Australian Consumer Law's consumer guarantees apply alongside the plan and limit how it can be marketed.

All of this needs to be verified and checked with a lawyer.

### Cited Findings
- None (0 of up to 5). No source was retrieved in this session.

### Inferences
- [UNVERIFIED] **Classification.** A promise, made for a fee, to pay for or carry out repairs or replacement if a breakdown happens is a transfer of risk. That points to a contract of insurance:
  - under the Insurance Act 1973, the insurance business must sit with an insurer authorised by APRA, so a start-up would partner with one as underwriter;
  - under Chapter 7 of the Corporations Act, selling or advising on the product needs an AFSL or authorised-representative status.

  Two structures may fall outside the definition of a financial product: warranties given by a manufacturer or retailer, and prepaid servicing contracts that promise no payout. Choosing between an insurance structure and a service-contract structure is the central legal question.
- [UNVERIFIED] **Claims handling.** Under the post-Hayne reforms, handling and settling insurance claims became a financial service that needs a licence. I recall this starting on 1 January 2022. An app-based claims operator would need its own AFSL authorisation, or would have to act under the insurer's licence.
- [UNVERIFIED] **Distribution rules.** Three regimes apply directly to most of the planned channels. I recall all three starting on 5 October 2021:
  - the deferred sales model for add-on insurance, which I recall imposes a 4-day wait;
  - the ban on hawking;
  - the design and distribution obligations, which require the issuer to define a target market.

  They bite when the plan is sold through real-estate agents at purchase, builders at handover, retailers when an appliance is sold, or utilities alongside an energy plan. Direct sales of a subscription to consumers are less exposed. ASIC's exemption instruments should be checked.
- [UNVERIFIED] **Unfair contract terms and industry code.** The unfair contract terms regime was extended to insurance contracts; I recall from 5 April 2021. The General Insurance Code of Practice applies to insurers that subscribe to it.
- [UNVERIFIED] **Consumer guarantees under the Australian Consumer Law** (in force since 1 January 2011). Goods must be of acceptable quality and last a reasonable time, whatever paid warranty the buyer has. Marketing that implies the plan gives rights consumers already have risks being misleading. The ACCC (the consumer regulator) has long published guidance on extended warranties.
- [UNVERIFIED] **Demand drivers to quantify:**
  - the ageing housing stock;
  - the large number of private landlords;
  - tenancy laws that oblige landlords to make urgent repairs;
  - electrification programs, such as heat-pump hot water and reverse-cycle air-conditioning, which add more costly home systems that can fail.

### Gaps
Facts I believe but could not cite. Each needs a primary source; the suggested root domains were not fetched.
1. **Deferred sales model for add-on insurance** — https://asic.gov.au
   - start date, which I believe is 5 October 2021;
   - length of the wait, which I believe is 4 days;
   - how it applies to warranties and home-related add-ons.
2. **Where warranties and service contracts sit** — https://asic.gov.au
   - whether they count as financial products, per ASIC's guidance on warranties;
   - where the line falls between insurance and a service contract.
3. **ACCC guidance on extended warranties and consumer guarantees**, including any disclosure required when selling an extended warranty — https://www.accc.gov.au
4. **Housing stock**: number and age of dwellings, and household spending on repairs and maintenance — https://www.abs.gov.au
5. **Number of individual landlords** — https://www.ato.gov.au. I believe it is roughly 2.2–2.3 million, from ATO taxation statistics; unverified.
- **Also unverified:**
  - each state's cap on urgent repairs a tenant can arrange (I recall about A$2,500 in Victoria and A$1,000 in NSW);
  - the size of the Australian home repair and maintenance services market;
  - how many households take up motor-burnout cover.
