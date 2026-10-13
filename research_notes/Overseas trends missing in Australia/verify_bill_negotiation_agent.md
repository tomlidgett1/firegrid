# Verification: consumer AI "admin agent" for bill negotiation and subscription cancellation (Australia)

> **STATUS: VERIFICATION NOT PERFORMED. Do not use this note to clear the idea.**
> - **Searches run: 0.** I tried 4 WebSearch calls (standard mode). All 4 were refused with "Web search was not performed: this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)". The tool said not to work around the cap, so I didn't.
> - **WebFetch: 1 attempt** (https://www.billhero.com.au/). It failed with `getaddrinfo ENOTFOUND www.billhero.com.au`. The brief says WebFetch DNS fails in this environment for every domain, so this is **not** evidence that Bill Hero has closed.
> - **No source was retrieved in this session.** Every description of a real-world entity or rule below comes from my prior knowledge. That knowledge runs to about mid-2026, covers small Australian start-ups thinly, and has nothing from mid-2026 to 13 Oct 2026. These items are marked UNVERIFIED and sit under "Gaps", because the research rules allow only cited claims under "Cited Findings".
>
> **VERDICT (provisional, unverified): leaning PARTIAL. ABSENT cannot be supported.**
> **Confidence: 40% in PARTIAL.** My subjective split, from prior knowledge only: PARTIAL about 45%, PRESENT about 40%, ABSENT about 15%. I am about 85% confident the idea is *not* absent from Australia.
> - **Why not ABSENT:** I recall several Australian offerings that each cover part of the job:
>   - comparison call centres that switch a customer for them, one switch at a time;
>   - group negotiation of energy deals (One Big Switch);
>   - business energy brokers who negotiate on a client's behalf (a narrow business-only segment);
>   - banks blocking or cancelling recurring payments.
>   All of these are unverified.
> - **Why it could be PRESENT:** any one of these would move the verdict, and none could be checked:
>   - Bill Hero's current product;
>   - an Australian bank that cancels subscriptions with the merchant (not just blocks the card);
>   - an Australian AI-agent start-up from 2025–26.
> - **Action needed:** re-run this verification in a new turn with a fresh search budget, or raise `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`. A priority query plan is in Q1 > Gaps.

## Q1. Does any service in Australia negotiate household bills or cancel subscriptions on a consumer's behalf (AI or human), or auto-switch them to better deals?

### Takeaway
Not verified, because no search ran. From prior knowledge alone, I know of no Australian consumer service that does any of these:
- negotiates a household's existing bills with the current provider for a fee or success fee;
- automatically switches households between energy, telco or insurance deals;
- cancels subscriptions with the merchant as a dedicated app.

However, several adjacent Australian offerings are recalled (unverified), so ABSENT cannot be supported. The provisional verdict is PARTIAL.

### Cited Findings
- None. No source could be retrieved: 0 searches ran and 1 fetch failed (see the status box above).

### Inferences
- **ABSENT is ruled out by the rules, not the evidence.** The brief allows ABSENT only after an exhaustive search finds nothing. No search was possible, so ABSENT cannot be returned whatever prior knowledge suggests.
- **The recalled adjacent offerings would support at least PARTIAL if confirmed** (entities listed in Gaps). Each covers part of the job or a narrow segment:
  - one switch at a time with someone doing it for you: comparison call centres, Simply Switch, moving-house connection services;
  - group negotiation of new deals: One Big Switch;
  - real negotiation on a customer's behalf, but for businesses only: business energy brokers and procurement firms;
  - stopping subscription payments from the bank side: in-app recurring-payment controls, and the recalled Banking Code duty to cancel direct debits or recurring payments when asked.
- **A new entrant might still be first with the full combined model.** That model is consumer-facing, AI-driven, negotiates with the current provider, handles renewals across telco, energy and insurance, cancels subscriptions with the merchant, and chases refunds. This rests only on my not knowing of a competitor, which this session could not test.
- **The blind spot is the riskiest period.** My knowledge has nothing from mid-2026 to Oct 2026, and AI-agent launches are most likely in exactly that window. A presence check is still needed for it.

### Gaps

#### Queries run (complete list)
| # | Tool | Query / URL | Result |
|---|---|---|---|
| 1 | WebSearch (standard) | `"Bill Hero" Australia bills app` | Not performed: shared 200-call per-turn budget used up |
| 2 | WebSearch (standard) | `Rocket Money available in Australia` | Not performed: budget used up |
| 3 | WebSearch (standard) | `Pine AI agent negotiate bills Australia` | Not performed: budget used up |
| 4 | WebSearch (standard) | `bill negotiation service Australia negotiate on your behalf` | Not performed: budget used up |
| 5 | WebFetch | https://www.billhero.com.au/ | Failed: `getaddrinfo ENOTFOUND` (DNS blocked in this environment) |

Searches run: **0** of about 35 budgeted.

#### Entity register (all from prior knowledge, all UNVERIFIED; URLs are pointers for checking and were not opened)
"Recall" is my confidence that the description was accurate as of about mid-2026.

| Entity | Pointer | What it does (as recalled) | Status / date (as recalled) | Recall | Classification if confirmed, and why |
|---|---|---|---|---|---|
| **Bill Hero** | https://www.billhero.com.au | Australian household-bill app. Users add or upload bills (energy, internet, mobile, possibly more); it compares plans and helps them switch. Believed to be paid by provider commissions. | Believed active in the early-to-mid 2020s; 2026 status unknown (fetch blocked by DNS) | Low–moderate | **Top lead.** PARTIAL if it only compares and helps with a one-off switch. PRESENT if it watches bills and switches or negotiates for the user on an ongoing basis. |
| Simply Switch | https://www.simplyswitch.com.au | Free phone and online comparison-and-switch service (energy, broadband, some insurance). A consultant completes the switch. Paid by commissions. | Believed active | Moderate | PARTIAL. One-off and started by the user; no negotiation with the current provider, no automatic switching, no cancellations. |
| Joust | https://www.joust.com.au | Home-loan marketplace where lenders bid for a borrower's loan | Believed launched mid-2010s; current status unknown | Moderate | Not the same: mortgages fall outside the concept's categories. Similar idea of making providers compete. |
| Switchd | UK service; no AU domain known | UK automatic energy-switching service | UK only, as far as I know; no known AU operation | Low–moderate | Unresolved for AU. No Australian evidence recalled. |
| "Billy" | unknown | No recollection of an Australian bill-negotiation or subscription app by this name | — | — | Unresolved |
| Hello Energy | unknown | No recollection of an Australian auto-switch service or broker by this name | — | — | Unresolved |
| "Flipped" | unknown | No Australian recollection. The name resembles the UK auto-switchers Flipper and Weflip; the lead may be a mix-up. | — | — | Unresolved |
| One Big Switch | https://www.onebigswitch.com.au | Group switching: pools members and negotiates discounted energy (and other) deals with providers; members then choose whether to switch | Active in the 2010s with media-partner campaigns; current status unknown | Moderate | PARTIAL. It negotiates for consumers as a group, but for new deals, not an individual's existing bill. No ongoing per-user management, no cancellations. **Strong adversarial lead.** |
| CHOICE Switch | choice.com.au | CHOICE's former commission-free energy comparison-and-switch service | Believed mid-2010s; believed closed | Low | Closed adjacent service (compare and switch). Counts as an earlier attempt at switching on a consumer's behalf. |
| Comparison sites with call-centre switching: Compare the Market, iSelect, Canstar Blue, Finder, Econnex, WATTever, Electricity Wizard, Energy Watch, Mozo | comparethemarket.com.au; iselect.com.au; canstarblue.com.au; finder.com.au; econnex.com.au; wattever.com.au; electricitywizard.com.au; energywatch.com.au; mozo.com.au | Compare plans; several complete the switch for you by phone or online. Paid by commissions. | Active (high recall for the large ones) | High (that they exist) | Adjacent/PARTIAL per the brief. One-off and started by the user; no negotiation with the current provider, no renewal automation, no cancellations. |
| Government comparison tools: Energy Made Easy (AER), Victorian Energy Compare, NSW "Energy Switch" (Service NSW, compared plans using an uploaded bill) | energymadeeasy.gov.au; compare.energy.vic.gov.au; service.nsw.gov.au | Independent plan comparison | Energy Made Easy and Victorian Energy Compare active; NSW Energy Switch status unknown | High / High / Low–moderate | Adjacent. They don't switch or negotiate for the user. |
| Business energy brokers and procurement firms: Energy Action (formerly ASX: EAX; ran reverse auctions for business energy contracts), Make It Cheaper Australia, Utility Bidder, Leading Edge Energy | makeitcheaper.com.au; utilitybidder.com.au; others | Tender or negotiate electricity and gas contracts for businesses. Paid by fees or commissions. | Long-established segment; individual firms' status unverified | Moderate–high | PARTIAL (narrow segment). Genuine negotiation on a customer's behalf, but for businesses, not households. |
| Moving-house connection services: Direct Connect, Connect Now | directconnect.com.au; connectnow.com.au | Arrange energy and internet connections for people moving house. Free to the consumer; retailers pay. | Believed active | Moderate | Adjacent. One-off connection, no negotiation. |
| CommBank app | commbank.com.au | "Bill Sense" predicts upcoming bills. I also recall in-app viewing and blocking of recurring card payments to a merchant. | Bill Sense since about 2019; recurring-payment controls recalled from about 2022–24 | Low–moderate | PARTIAL (card blocking, per the brief). PRESENT only if it cancels the subscription with the merchant. |
| NAB, Westpac, ANZ (incl. ANZ Plus), ING, Up | nab.com.au; westpac.com.au; anz.com.au; ing.com.au; up.com.au | Card controls or merchant blocking recalled for some. I don't confidently recall any "cancel subscription" feature. | Unknown | Low | Unresolved; probably PARTIAL (blocking) if anything is found |
| Banking Code of Practice duty | ausbanking.org.au | I recall a duty for banks to promptly cancel a direct debit or recurring payment when the customer asks | Code in force since 2019, revised since | Moderate | PARTIAL. The bank stops the payment, but doesn't cancel the contract or negotiate. |
| Revolut (Australia) | revolut.com | The app detects and manages subscriptions. Whether Australian users can block or cancel them is unknown. | Operating in Australia | Low | PARTIAL if confirmed |
| Budgeting and subscription-tracking apps: Frollo, WeMoney, Pocketbook, MoneyBrilliant, global trackers (e.g. Bobby) | frollo.com.au; wemoney.com.au | Track spending and subscriptions; Frollo and WeMoney use open banking (CDR). No cancellation or negotiation. | Frollo and WeMoney believed active; Pocketbook and MoneyBrilliant believed closed | Moderate | Adjacent (tracking only) |
| General-purpose AI agents: OpenAI Operator / ChatGPT agent, browser agents | openai.com | Consumers can tell an agent to work through websites, for example to cancel an online subscription. I recall Operator expanding to Australia in early 2025. | Believed available | Low–moderate | PARTIAL stand-in for online cancellation only. No phone negotiation, no dedicated bill product, no success fee. |
| Airtasker (informal gigs) | airtasker.com | Anecdotal: people post tasks asking someone to ring providers and negotiate their bills | Unknown | Low | Informal PARTIAL evidence if confirmed |
| Rocket Money, Trim, BillShark, Billcutterz, Pine (US) | rocketmoney.com; others | Bill negotiation and subscription cancellation for US consumers with US providers | No known Australian availability | Moderate (Rocket Money US-only) / Low (Pine) | Not present in Australia (unverified) |
| Look After My Bills, Emma, Snoop (UK) | lookaftermybills.com; emma-app.com; snoop.app | UK automatic switching (Look After My Bills); UK subscription tracking and cancellation (Emma, Snoop) | No known Australian availability | Moderate | Not present in Australia (unverified) |
| NZ: Powerswitch (Consumer NZ), Glimp | powerswitch.org.nz; glimp.co.nz | NZ comparison sites | NZ only | Moderate | Adjacent (NZ) |

#### Unresolved leads (none could be resolved in this session)
1. **Bill Hero:**
   - What it offers: negotiation? automatic switching? subscription cancellation? ongoing monitoring?
   - How it makes money, and whether it is still trading in 2026.
   - Any bank or Consumer Data Right (CDR) partnerships.
2. **Joust:** confirm it only does mortgages, and whether it still operates.
3. **Simply Switch:** confirm how it works, and whether it offers an ongoing "we'll review your plan every year" service.
4. **Switchd:** any Australian presence.
5. **"Billy":** identify the entity.
6. **Hello Energy:** identify the entity.
7. **"Flipped":** identify the entity; it may be confused with the UK's Flipper or Weflip.
8. **Any Australian household energy auto-switch service**, including "annual review" or "set and forget" offers from brokers or comparison sites (Electricity Wizard, Energy Watch, Bill Hero).
9. **Bank apps (CommBank, NAB, Westpac, ANZ, ING, Up):** exactly which subscription features exist (view, block, or cancel with the merchant), and when each launched.
10. **Bank subscription-management partners:** Minna Technologies, or Visa and Mastercard subscription tools, at any Australian bank.
11. **Australian AI-agent start-ups for household admin, 2024–2026:** check startupdaily.net, smartcompany.com.au, afr.com, LinkedIn and Crunchbase.
12. **Rocket Money and Pine:** any Australian launch, waitlist, or support for Australian providers.
13. **CHOICE and ACCC commentary:** on the "loyalty tax" (higher prices for customers who stay put), and on bill negotiators or auto-switch services.
14. **One Big Switch:** current status and offering in 2026.
15. **Revolut Australia:** whether it can block or cancel subscriptions.
16. **General AI agents (ChatGPT agent and others):** availability in Australia, and whether any can make phone calls to providers.
17. **Community signals:** r/AusFinance, OzBargain and Whirlpool mentions of paid negotiators or auto-switch services.
18. **Anything from mid-2026 to 13 Oct 2026**, which falls outside my knowledge.

#### Priority query plan for the re-run (about 31 queries, standard mode)
1. `"Bill Hero" bills app`
2. `"Bill Hero" startup` (allowed_domains: startupdaily.net, smartcompany.com.au)
3. `CommBank app cancel subscriptions`
4. `NAB app block recurring payments subscriptions`
5. `Westpac ANZ app manage subscriptions`
6. `ING Up bank subscriptions feature`
7. `negotiate bills for you Australia`
8. `bill negotiation service Australia success fee`
9. `cancel subscriptions app Australia`
10. `automatic energy switching service Australia`
11. `AI agent negotiate bills Australia startup`
12. `AI household admin startup Australia 2026` (allowed_domains: startupdaily.net, smartcompany.com.au, afr.com)
13. `Rocket Money Australia launch`
14. `Pine AI Australia`
15. `"One Big Switch" 2026`
16. `"Simply Switch" Australia review`
17. `Switchd Australia energy`
18. `"Hello Energy" Australia`
19. `"Flipped" energy switching`
20. `"Billy" AI bills app`
21. `Joust home loan auction`
22. `bill negotiator` (allowed_domains: reddit.com, ozbargain.com.au, whirlpool.net.au)
23. `Minna Technologies Australia bank`
24. `Revolut Australia subscriptions cancel`
25. `CHOICE loyalty tax insurance energy`
26. `ACCC loyalty tax electricity 2025`
27. `CDR action initiation switching`
28. `energy broker regulation residential Australia`
29. `subscription traps ban Australia legislation`
30. `"negotiate your bills" Australia` (allowed_domains: linkedin.com)
31. `bill negotiation Australia` (allowed_domains: crunchbase.com)

## Q2. What is the closest thing found, and how does it differ?

### Takeaway
Nothing was *found*, because no search ran. From prior knowledge (unverified), the closest candidates are, in order:
1. Bill Hero, if it watches bills and switches for the user;
2. One Big Switch, which negotiates energy deals for a group;
3. comparison-and-switch services where someone completes the switch for you (Simply Switch, and iSelect and Compare the Market call centres).

None of them is known to negotiate an individual's existing bill with the current provider. None is known to act as an AI agent, manage renewals on an ongoing basis, or cancel subscriptions with merchants.

### Cited Findings
- None (see the status box).

### Inferences
- **Questions the re-run should answer for each candidate:**
  - (a) Does it negotiate with the *current* provider, or only move the user to a new one?
  - (b) Is it a one-off the user starts, or ongoing and automatic at each renewal?
  - (c) Does it act on the user's accounts (authority to act, phone calls, chat), or only refer the user on?
  - (d) Does it cancel subscriptions with the merchant, or only block card payments?
  - (e) Who pays: the consumer (subscription or success fee) or the providers (commission)? Commission-funded comparison sites are paid to move customers, not to win them retention discounts. A consumer-paid agent could differ on exactly this point.
  - (f) Which categories does it cover: energy only, or telco, insurance and subscriptions too?
- **Rule for upgrading the verdict:** if any candidate is ongoing *and* acts on the user's behalf, even in one category, the verdict should move toward PRESENT under the brief's rules.

### Gaps
- Every candidate comparison is unverified. The biggest unknown for the decision is what Bill Hero currently offers and whether it still trades.
- I don't know whether any Australian bank cancels a subscription *with the merchant* rather than blocking card payments. Examples of that model elsewhere are Minna Technologies and the Visa and Mastercard subscription tools.

## Q3. What Australian facts matter for launch (loyalty-tax size, ACCC and state findings, CDR data availability, rules on acting as a consumer's agent)?

### Takeaway
No fact could be verified this session. The points below are what a re-run should confirm first, recalled from prior knowledge with a source to check for each.
- **Energy:** already price-capped (Default Market Offer and Victorian Default Offer) and has "better offer" rules, which shrinks the loyalty-tax headroom.
- **Insurance:** acting for a consumer probably needs a financial services licence (AFSL).
- **Telco:** strict identity checks on telco accounts complicate an agent working on them.
- **CDR open banking and energy data:** probably usable for reading data, but probably not yet for executing switches.

### Cited Findings
- None (see the status box).

### Inferences
- **Where the agent's value probably lies:** in energy, regulators already push customers towards cheaper plans, at least within the same retailer. The agent's value is then mainly in switching between retailers and winning retention discounts. Telco, insurance renewals and subscriptions have less price regulation and may hold more headroom (depends on Gaps items 1, 2 and 5).
- **Likely licensing needs** (depends on items 4, 6 and 7):
  - an AFSL, or authorised-representative status, for insurance work;
  - to be named as an authorised representative on telco accounts;
  - a way to obtain the customer's explicit informed consent for energy switches.
  Without these, a fully hands-off "AI phones the provider" model may not be legal or workable in some categories.

### Gaps
Regulatory and demand facts to verify (prior knowledge; none confirmed this session). The first five are the "up to 5" facts the brief asked for.

1. **Energy price caps.** From 1 July 2019, two caps limit standing-offer prices: the AER's Default Market Offer (NSW, south-east Queensland, SA) and Victoria's Default Offer. They followed the ACCC's Retail Electricity Pricing Inquiry final report (July 2018), which found that customers who don't switch pay substantially more.
   - Recall: high for the caps existing and the date. I don't recall the dollar figure for the gap.
   - Check: accc.gov.au (report), aer.gov.au (Default Market Offer), esc.vic.gov.au (Victorian Default Offer).
2. **"Better offer" messages.** The AER's Better Bills Guideline (about 2021–22) requires household energy bills to show a message when the retailer has a cheaper plan for that customer. Victoria has had a similar "best offer" rule since about 2019.
   - Recall: moderate.
   - Check: aer.gov.au, esc.vic.gov.au.
3. **Consumer Data Right (CDR).**
   - Banking is live (big four banks from July 2020).
   - Energy is live, from about late 2022 for the largest retailers.
   - Telco was designated, but rule-making was deferred.
   - "Action initiation" would let accredited parties act for a consumer, for example to switch provider. Whether it has commenced is unknown.
   - Recall: moderate for banking and energy, low for action initiation.
   - Check: cdr.gov.au, treasury.gov.au.
4. **Insurance rules.**
   - Arranging or advising on general insurance for retail clients, including negotiating renewals for them, probably needs an AFSL or authorised-representative status (Corporations Act 2001 (Cth) s 911A; ASIC Regulatory Guide 36).
   - Renewal notices must show last year's premium. This regulation dates from the late 2010s; the year needs checking.
   - ASIC has taken insurers to court over loyalty-discount "pricing promises", for example proceedings against IAG filed in about 2023.
   - Recall: high on the licensing principle, moderate on the rest.
   - Check: asic.gov.au, legislation.gov.au.
5. **"Subscription traps" ban.** In late 2024 the federal government said it would add an unfair-trading-practices ban to the Australian Consumer Law. It included specific protections against subscription traps, such as subscriptions that are hard to cancel and automatic renewals without notice. I don't know whether it was passed or in force by October 2026.
   - Recall: moderate.
   - Check: treasury.gov.au.
6. **Telco identity checks.** ACMA's Telecommunications Service Provider (Customer Identity Authentication) Determination 2022 requires multi-factor authentication for high-risk transactions. An agent probably needs to be named as an authorised representative on the account.
   - Recall: moderate.
   - Check: acma.gov.au.
7. **Energy switching consent.** Under the National Energy Retail Law and Rules, switching retailer needs the customer's explicit informed consent. I don't know whether a standing authority can be given to a third party, which automatic switching would need.
   - Recall: moderate on the consent rule, low on third-party authority.
   - Check: aer.gov.au, aemc.gov.au.
8. **Rules for comparison sites and brokers.** The ACCC's 2018 report made recommendations on comparison sites and broker conduct, including disclosure of commissions. I'm not aware of a single national licence for household energy brokers that don't sell energy themselves.
   - Recall: low–moderate.
9. **Hardship customers.** An AEMC rule (about 2024) requires retailers to put hardship customers on their best offer.
   - Recall: low–moderate.

Other unknowns:
- Dollar size of the loyalty tax by sector (energy, telco, home insurance).
- How often customers switch (AER retail market reports, Energy Consumers Australia sentiment surveys).
- CHOICE's survey figures.
- The latest figures from the ACCC's electricity market inquiry.
- Any 2025–26 federal "loyalty tax" reforms in energy (for example from the review of the Default Market Offer).
