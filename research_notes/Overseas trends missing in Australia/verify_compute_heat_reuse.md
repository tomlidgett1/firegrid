# Verification: distributed "digital boiler" compute heat reuse (Deep Green / Heata / Qarnot / Leafcloud / Thermify model) in Australia

Independent adversarial check, run 13 October 2026. Scope: is there any business, pilot, announcement, or defunct attempt in Australia (and NZ for overseas-entrant signals) where compute hardware is placed at a heat user's site, or a data centre exports waste heat to a pool, building or district network?

## Key Question 1: Does any Australian business, pilot, or overseas entrant already supply waste heat from compute to pools, hot water, or buildings in Australia?

### Takeaway
**VERDICT: PARTIAL. Confidence: 75%** (my split: PARTIAL 75 / PRESENT 15 / ABSENT 10).

I found no ongoing commercial "digital boiler" service in Australia, meaning nobody who places operator-owned compute at third-party heat users, sells the compute, and supplies the heat. None of Deep Green, Heata, Qarnot or Leafcloud has an Australian presence. However, the concept has already been pitched and partly piloted here, and the physical mechanism is already operating at least once:
- ResetData installed liquid-cooled server pods in an Investa office tower in Sydney in December 2023, explicitly pitched as "offices that double as data centres with free hot water". The promised hot-water hookup was never confirmed.
- Hawkesbury Brewing Co (NSW) heats all of its process hot water with 16 immersion-cooled bitcoin miners.
- ANU said in 2019 that heat from the NCI supercomputer is reused for hot water in student accommodation.
- NEXTDC's planned M4 Melbourne campus promises "waste heat recovery for district-level energy reuse".

A new entrant could not credibly claim to be entirely first in Australia. It could plausibly claim to be the first to run this as an ongoing commercial service for pools, hot water or buildings.

### Cited Findings

#### Verdict rationale
- **Why not PRESENT:** the closest commercial match (ResetData × Investa) is a one-off 2023 lab pilot whose hot-water connection was only promised ("by late next year", i.e. 2024) and never confirmed. ResetData's 2025 messaging has moved to centralised NVIDIA "AI factories" with no mention of heat reuse ([DCD, Dec 2023](https://www.datacenterdynamics.com/en/news/resetdata-launches-liquid-cooled-data-center-lab-in-sydney); [Australian Manufacturing](https://www.australianmanufacturing.com.au/resetdata-and-nvidia-join-forces-to-launch-sovereign-ai-factories-in-australia/)). The one operating install (Hawkesbury Brewing) is host-owned crypto mining at a single site, not a service offered to others ([Crypto Briefing](https://cryptobriefing.com/australian-brewery-bitcoin-mining-heat-beer/)).
- **Why not ABSENT:** an Australian firm has publicly pitched and piloted "free hot water from servers" ([ResetData](https://resetdata.com/creating-offices-that-double-as-data-centres-with-free-hot-water)). Compute heat already supplies hot water at an Australian business ([Bitcoin News](https://bitcoinnews.com/p/hawkesbury-brewing-solar-bitcoin-mining)). An Australian university has claimed HPC heat reuse in buildings ([Technology Magazine, Oct 2019](https://publication.technologymagazine.com/technology-magazine-october-2019/0806457001688512182/p230)). All three fall inside the brief's "counts as same or similar" definitions.

#### Overseas exemplars: Australian presence checks (none found)
- **Deep Green (UK):** a search for "Deep Green" plus Australia returned no Australian project, partner, distributor or customer. The only hits were unrelated green data-centre items, such as GreenSquareDC in Perth ([Austrade](https://international.austrade.gov.au/en/news-and-analysis/news/australia-apacs-rising-regional-hub-for-green-data-centres)). Australian media has covered Deep Green only as overseas news, e.g. RenewEconomy's "From heat pumps to pumped heat: Octopus backs tech that reuses data centre heat" ([RenewEconomy](https://reneweconomy.com.au/from-heat-pumps-to-pumped-heat-octopus-backs-tech-that-reuses-data-centre-heat/)).
- **Qarnot (France):** the Q.rad and QH-1 "computing heaters" have listed deployments in French social housing and collaborations with BNP Paribas and Schneider Electric. None are in Australia, and no Australian reseller surfaced ([Net Zero Compare](https://netzerocompare.com/organizations/qarnot); [Climate-KIC](https://www.climate-kic.org/?p=9156)).
- **Heata (UK):** UK only. A trial of about 100 home units was reported in January 2023 ([The Register](https://www.theregister.com/2023/01/12/heata_offers_free_hot_water/)), followed by a 2025 British Gas trial in 10 employees' homes ([District Energy / IDEA](https://www.districtenergy.org/blogs/district-energy/2025/02/12/british-gas-partners-with-heata-on-waste-heat-reus)). Australian trade press (HVACR News) reported the UK trial, but there is no local launch ([HVACR News](https://hvacrnews.com.au/news/householders-get-free-hot-water-in-server-cooling-trial/)).
- **Leafcloud (Netherlands):** operates "Leaf Sites" in the Amsterdam metro area, in apartment buildings, nursing homes and pools. One example is a 5 kW site at a Zaandam nursing home that displaced 25% of the home's gas use. I found no Australian presence ([leaf.cloud](https://leaf.cloud/leafsites/)).
- **Thermify (UK):** not searched individually because of the search budget. It did not appear in any Australian result.

#### Australian pilots, installations and announcements (the closest matches)
- **ResetData × Investa, 151 Clarence St, Sydney (Dec 2023):**
  - The installation is two 100 kW server "pods" using Submer liquid cooling with modified Dell/Intel servers, in a basement lab in Investa's office tower ([DCD](https://www.datacenterdynamics.com/en/news/resetdata-launches-liquid-cooled-data-center-lab-in-sydney); [ChannelLife](https://channellife.com.au/story/resetdata-launches-apac-s-first-liquid-cooled-data-centre-lab-in-sydney)).
  - ResetData said it would connect the pods to the building's hot-water supply "by late next year", i.e. late 2024 ([DCD](https://www.datacenterdynamics.com/en/news/resetdata-launches-liquid-cooled-data-center-lab-in-sydney)).
  - Investa described water heated to 40–60°C. An Investa executive called the hot-water idea "something we are exploring", and Investa said it was looking at scaling the model across its portfolio ([Investa](https://www.investa.com.au/news/data-centres-with-a-difference)).
  - ResetData's own post is titled "Creating offices that double as data centres – with free hot water" ([ResetData](https://resetdata.com/creating-offices-that-double-as-data-centres-with-free-hot-water)).
  - I found no source confirming that the hot-water connection was ever made.
- **ResetData in 2025 (pivot):** launched "Australia's first sovereign public AI-Factory" with NVIDIA, with a first site in Melbourne's CBD using liquid-cooled H200 clusters ([Australian Manufacturing](https://www.australianmanufacturing.com.au/resetdata-and-nvidia-join-forces-to-launch-sovereign-ai-factories-in-australia/)). Nokia is supplying networking for a national AI Factory rollout ([Intelligent CIO, Apr 2025](https://www.intelligentcio.com/apac/2025/04/14/nokia-networking-backbone-to-connect-resetdatas-ai-factory-data-centers-across-australia/)). None of the 2025–26 coverage I found mentions heat reuse.
- **Hawkesbury Brewing Co, Lisarow, NSW (operating; publication date not visible in extracts):**
  - 16 bitcoin miners sit in non-conductive fluid that heats to about 90°C. A heat exchanger preheats incoming town water, and the captured heat "fulfills all of the brewery's hot water needs" for brewing, cleaning and bottle washing ([Crypto Briefing](https://cryptobriefing.com/australian-brewery-bitcoin-mining-heat-beer/); [Bitcoin News](https://bitcoinnews.com/p/hawkesbury-brewing-solar-bitcoin-mining)).
  - The miners run only on surplus rooftop solar. Reported mining rewards are about $2,000 a month, but that figure comes from a single outlet ([Crypto Briefing](https://cryptobriefing.com/australian-brewery-bitcoin-mining-heat-beer/)).
  - The project was developed "in partnership with Synergy Infrastructure". Operations manager Adam Neale said "it's really an energy story" ([Value the Markets](https://www.valuethemarkets.com/cryptocurrency/news/innovative-brewery-turns-bitcoin-mining-into-sustainable-beer-production)).
  - The brewery suggests the approach could suit public pools, apartment buildings and factories ([Bitcoin News](https://bitcoinnews.com/p/hawkesbury-brewing-solar-bitcoin-mining)).
  - A 2026 republication exists ([Solatatech](https://solatatech.com/article/bitcoin-mining-for-beer-how-a-brewery-generates-heat-and-cuts-costs)).
- **ANU / NCI supercomputer, Canberra (claimed in 2019; the status conflicts):**
  - In a 2019 interview, ANU's Director of Facilities and Services, Nicki Middleton, said the supercomputer uses roughly a quarter of campus electricity and that its heat "is captured and reused in other buildings", e.g. hot water for student accommodation. She said two central energy plants were built and a third was in concept ([Technology Magazine, Oct 2019](https://publication.technologymagazine.com/technology-magazine-october-2019/0806457001688512182/p230)).
  - A later ANU sustainability page says NCI data-centre waste heat "could be captured and redistributed across a thermal precinct" and that this needs partnerships ([ANU Sustainability](https://sustainability.anu.edu.au/ANU-kicks-off-the-transition-away-from-gas-heating)).
  - **Conflict:** the 2019 source reads as operational, while the ANU page reads as future intent.
- **NEXTDC M4, Fishermans Bend / Port Melbourne (announced June 2025; not built):**
  - A $2b campus of up to 150 MW at 127 Todd Road. Planned infrastructure includes "waste heat recovery for district-level energy reuse", and cooling will use recycled wastewater ([NEXTDC](https://www.nextdc.com/news/nextdc-announces-2-billion-ai-factory-and-technology-campus-at-fishermans-bend); [InnovationAus](https://www.innovationaus.com/?p=67193)).
  - DCD says the campus "will offer its waste heat for district networks" ([DCD](https://www.datacenterdynamics.com/en/news/nextdc-announces-plans-for-data-center-in-melbourne-promises-1mw-rack-densities/)).
  - At announcement it was subject to final design and development approval, with an 18-month build to follow ([W.Media](https://w.media/nextdc-announces-2-billion-ai-factory-and-technology-campus-at-fishermans-bend/)). No offtaker or network is named.

#### Australian data-centre operators: no heat-export project found
- **AirTrunk:** no heat-reuse project found. The only relevant result was its $3–5b Kurri Kurri (Hunter) project seeking renewable-energy partners ([Newcastle Herald](https://www.newcastleherald.com.au/story/9327354/airtrunks-5-billion-kurri-kurri-data-centre-seeks-hunter-renewable-energy-partners/)).
- **Equinix:**
  - Global heat export was 14.5 GWh in 2024, at sites including Helsinki, Toronto and Paris ([iTWire](https://itwire.com/guest-articles/company-news/equinix-named-a-leader-in-the-idc-marketscape-worldwide-datacentre-services-sustainability-2025-2026-vendor-assessment.html)).
  - The Heat Export programme covers France, Finland, Germany, Ireland, Switzerland and Canada, not Australia ([Structure Research](https://www.structureresearch.net/2024/06/27/equinix-launches-program-to-export-heat-from-data-centres)).
  - Its Australian sites list no heat export ([Equinix AU](https://www.equinix.com/data-centers/asia-pacific-colocation/australia-colocation)).
- **CDC Data Centres (Canberra):**
  - At Hume 1 (4.5 MW IT), CDC chose Climaveneta multi-purpose heat pumps plus free-cooling chillers. The source says nothing about exporting heat off site, so at most this is internal heat recovery ([Archilovers / Climaveneta](https://archilovers.com/projects/176266/climaveneta-supplying-the-australian-data-centre-provider-of-the-year.html)).
  - CDC is reassessing its 576 MW Hume Campus 3 after a planning setback ([W.Media](https://w.media/?p=44096)).
- **Firmus / Sustainable Metal Cloud:**
  - Uses immersion-cooled "HyperCube" containers in STT GDC sites in Singapore, India and Australia, with PUE claims of about 1.03–1.05. I found no heat export ([TechDay](https://techday.asia/tag/firmus); [Intelligent CIO](https://www.intelligentcio.com/apac/2022/04/05/firmus-benefits-from-data-center-powered-by-grid-connected-renewable-energy/)).
  - Its Bell Bay (Tas) AI data centre was approved by George Town Council despite community opposition. I found no heat-reuse element ([Infor Capital](https://inforcapital.com/news/tasmanian-council-approves-firmus-bell-bay-ai-data-centre-despite-community-opposition/)).
- **Pawsey Supercomputing Centre (Perth):** uses groundwater cooling. Water is reinjected into the aquifer a few degrees warmer, which rejects the heat rather than reusing it ([CSIRO 2013](https://www.csiro.au/en/news/All/News/2013/February/Cooling-solution-for-supercomputer-heralds-new-age-in-renewable-energy)). The water-saving figures conflict: 38.5 ML a year in CSIRO's 2013 estimate versus about 7 ML a year on [Pawsey's own page](https://pawsey.org.au/our-green-credentials/).

#### Proposals and ideas (no deployment)
- **ACT Greens motion (Sept 2026):**
  - Brindabella MLA Laura Nuttall brought a Private Members' Business motion asking the ACT Government to consider co-locating or pairing data centres with public pools to use their waste heat. It also sought conditions for the ACT Data Centre Framework ([Region Canberra, 22 Sep 2026](https://region.com.au/barr-shoots-down-greens-call-for-data-centres-to-heat-pools/1001558/); [ABC, 22 Sep 2026](https://www.abc.net.au/news/2026-09-22/act-greens-proposal-pair-data-centres-swimming-pools/107181808)).
  - Chief Minister Barr said heat recovery "is not a justification for locating data-centre infrastructure on public aquatic sites in suburban Canberra" ([Australasian Leisure Management](https://www.ausleisure.com.au/news/act-government-rules-out-co-location-of-data-centres-with-public-swimming-pools); [Region Canberra](https://region.com.au/barr-shoots-down-greens-call-for-data-centres-to-heat-pools/1001558/)).
  - **No Australian company, operator or specific site was named** in any of the three news extracts. Coverage of the topic referenced UK precedents (the Exmouth pool / Deep Green), but I could not confirm the motion text itself cites them.
- **Dorset Council, Tasmania (date not shown in extract):** during debate on a $40,000 study into roofing the Scottsdale pool, Cr Vincent Teichmann floated brokering a deal between a data centre and a pool provider. An officer said the idea was out of the study's scope ([The Examiner](https://www.examiner.com.au/story/9314046/tasmanian-councillor-suggests-data-centres-could-heat-pools/)).

#### New Zealand (overseas-entrant signal, not Australia)
- **Spark + Aventuur, Auckland:**
  - A planned data centre (staged up to 40 MW) would warm a 2.2 ha surf lagoon through a heat exchanger. The project was first proposed in August 2023.
  - DCD reports an EPA go-ahead ([DCD](https://www.datacenterdynamics.com/en/news/spark-data-center-to-heat-surfing-lagoon-in-auckland-new-zealand/)). The Inertia says final approval was still pending and the park is due to open in 2027 ([The Inertia](https://www.theinertia.com/?p=307711)). The two sources conflict on approval status.
  - A 2023 Baxtel extract mentions Aventuur also having "a surf park under construction in Perth", with no data-centre link stated ([Baxtel](https://baxtel.com/news/solar-powered-data-center-to-heat-surfing-lagoon-in-new-zealand)).
- **LinkedIn idea post:** "Could Auckland's future swimming pools be heated by data centres?" ([LinkedIn, Hamish Rogers](https://nz.linkedin.com/in/hamishrogers)). This is an idea only.

#### Grants, media and community checks
- **ARENA / CEFC:** I found no funding for data-centre heat recovery. The closest ARENA/CEFC items were energy-from-waste projects, e.g. CEFC committing up to $57.5m to the East Rockingham plant ([CEFC](https://www.cefc.com.au/media/media-release/cefc-spearheads-investment-in-energy-from-waste-sector-backing-second-wa-facility/)).
- **Startup Daily:** an opinion piece cites heat-reuse examples in Finland, a UK pool and a Norwegian trout farm, and names no Australian deployment ([Startup Daily](https://www.startupdaily.net/topic/data/data-centres-have-an-energy-problem-heres-what-needs-to-be-done-about-it/)).
- **Community forums:** Whirlpool returned only general hot-water threads and nothing on server heat ([Whirlpool](https://forums.whirlpool.net.au/archive/2630201)). Reddit and AFR were rejected by the search API as blocked domains, so they are unchecked.

### Inferences
- The idea has been "in the air" in Australia since at least 2023 (ResetData), and politically since September 2026 (ACT Greens). Nobody has turned it into an ongoing service. ResetData moving from a "free hot water" office-pod pilot to centralised AI factories suggests the distributed heat-to-host model was harder to commercialise than centralised GPU hosting. This is my inference; ResetData has not said so.
- The adjacent installs that exist are either host-owned (the brewery, ANU) or large-campus plans (NEXTDC M4). None is a third-party compute operator contracting with heat hosts such as pools, hotels, apartments or homes, which is the core of the Deep Green, Heata and Leafcloud model.
- Hawkesbury Brewing shows that the physical integration (immersion-cooled compute, heat exchanger, town-water preheat) works in an Australian plumbing context. Synergy Infrastructure could become a competitor if it productises the approach; its role is unknown.

### Gaps
#### Unresolved leads
1. **ResetData × Investa hot-water hookup:** I could not confirm whether the pods were ever connected to 151 Clarence St's hot water, or whether the lab still operates. WebFetch is blocked and no 2024–26 update surfaced.
2. **ANU / NCI:** is the supercomputer's heat actually reused today (2019 claim), or is it still a plan (later ANU page)? The size of the scheme and who supplies the heat are unknown.
3. **Hawkesbury Brewing / Synergy Infrastructure:** the launch date is not visible in extracts. I could not find out what Synergy Infrastructure is, or whether it sells compute-heat installs to other businesses. If it does, the verdict would move toward PRESENT for the commercial hot-water segment.
4. **ACT Greens motion:** the outcome of the debate (passed, amended or defeated) was not found, and neither was the motion text, so I cannot confirm whether it named any company.
5. **NEXTDC M4:** development-approval status, whether heat recovery survived into the final design, and the identity of any district-network partner at Fishermans Bend.
6. **Aventuur and Perth:** whether the Perth surf park mentioned in 2023 coverage has any data-centre heat component.
7. **CDC Hume 1:** whether its multi-purpose heat pumps export any heat beyond the facility.
8. **Not checked:** Thermify by name; hotels and hospitals specifically; Reddit and AFR (blocked domains); Canberra Times via a domain filter (one Canberra Times result appeared incidentally); AEMO data-centre load forecasts.

#### Search log
There were 38 WebSearch calls, all in standard mode. 36 returned results; 2 were rejected by the API because they included blocked domains. There was also 1 WebFetch attempt, which failed with a DNS error. 37 of the 38 calls were presence checks.
1. "Deep Green" data centre Australia
2. Qarnot computing heater Australia
3. Heata servers hot water cylinder Australia
4. Leafcloud servers apartment hot water Australia
5. ResetData free hot water servers
6. ACT Greens motion data centre heat swimming pools
7. Sustainable Metal Cloud Firmus heat reuse
8. Canberra data centre waste heat pool
9. ResetData Investa 151 Clarence Street liquid-cooled server hot water
10. Tasmanian councillor data centres could heat pools
11. NEXTDC waste heat reuse
12. AirTrunk waste heat recovery Australia
13. Equinix Australia heat export data centre
14. CDC Data Centres heat recovery Canberra Hume
15. Pawsey supercomputing centre waste heat reuse
16. "digital boiler" Australia
17. ResetData heat reuse 2025 hot water deployment
18. Australia aquatic centre heated by data centre servers
19. Aventuur surf lagoon data centre waste heat
20. Laura Nuttall data centre framework motion pools
21. bitcoin mining heat pool hot water Australia
22. data centre heat reuse district heating Australia first
23. Synergy Infrastructure Hawkesbury Brewing bitcoin miners heat
24. data centre waste heat reuse Australia [domains: itnews, innovationaus, datacenterdynamics, reneweconomy, afr]: **error, afr.com blocked**
25. startup servers waste heat hot water [domains: startupdaily, smartcompany, crunchbase, linkedin]
26. data centre heat swimming pool Australia [domains: reddit, whirlpool]: **error, reddit.com blocked**
27. data centre heat reuse Australia pool building [domains: itnews, innovationaus, datacenterdynamics, reneweconomy, abc.net.au]
28. bitcoin miner heat reuse Australia company hot water heating
29. server heat hot water [domain: whirlpool.net.au]
30. university supercomputer heat recovery campus heating Australia
31. ANU NCI supercomputer waste heat hot water student accommodation energy plant
32. NEXTDC M4 Fishermans Bend waste heat district network
33. Hawkesbury Brewing Lisarow bitcoin solar hot water
34. council aquatic centre gas emissions electrification heat pumps Australia (demand)
35. ResetData 2026 AI factory sovereign cloud heat reuse
36. ANU heat recovery data centre central energy plant heating buildings
37. "Synergy Infrastructure" bitcoin mining Australia heat
38. ARENA CEFC funding data centre waste heat recovery Australia
- WebFetch: region.com.au ACT article. Failed with `getaddrinfo ENOTFOUND`.

## Key Question 2: What is the closest thing found, and how does it differ?

### Takeaway
The closest business-model match is **ResetData × Investa (Sydney, Dec 2023)**: operator-owned liquid-cooled compute in a host building, pitched as free hot water for the landlord. It differs because it was a single lab pilot whose heat delivery was never confirmed, and the company later pivoted. The closest physical-delivery match is **Hawkesbury Brewing (NSW)**: compute heat supplies all hot water, but the host owns the miners, the compute is crypto rather than cloud or AI, and it is one site. ANU/NCI (HPC heat to campus buildings) and NEXTDC M4 (a planned district heat export) are institutional or centralised variants.

### Cited Findings

#### Entity register
| Entity | What it does | Status / date | Same as concept? |
|---|---|---|---|
| ResetData × Investa, 151 Clarence St Sydney ([ResetData](https://resetdata.com/creating-offices-that-double-as-data-centres-with-free-hot-water); [DCD](https://www.datacenterdynamics.com/en/news/resetdata-launches-liquid-cooled-data-center-lab-in-sydney); [Investa](https://www.investa.com.au/news/data-centres-with-a-difference)) | Two 100 kW Submer liquid-cooled server pods in an office-tower basement; pitched as "offices that double as data centres with free hot water"; 40–60°C water | Launched Dec 2023; hot-water hookup promised for late 2024, unconfirmed | **Closest model match (PARTIAL).** One-off pilot; heat delivery unverified; no ongoing service |
| ResetData AI Factory ([Australian Manufacturing](https://www.australianmanufacturing.com.au/resetdata-and-nvidia-join-forces-to-launch-sovereign-ai-factories-in-australia/)) | Liquid-cooled sovereign GPU cloud, Melbourne CBD first site | 2025, active | Adjacent: cooling without heat export (none mentioned) |
| Hawkesbury Brewing Co + Synergy Infrastructure, Lisarow NSW ([Crypto Briefing](https://cryptobriefing.com/australian-brewery-bitcoin-mining-heat-beer/); [Bitcoin News](https://bitcoinnews.com/p/hawkesbury-brewing-solar-bitcoin-mining)) | 16 immersion-cooled bitcoin miners preheat town water and meet all brewery hot-water needs; run on surplus solar | Operating; date not visible (a 2026 republication exists) | **Same mechanism (PARTIAL).** Host-owned; crypto not cloud/AI; single site; Synergy's model unknown |
| ANU / NCI supercomputer, Canberra ([Technology Magazine 2019](https://publication.technologymagazine.com/technology-magazine-october-2019/0806457001688512182/p230); [ANU](https://sustainability.anu.edu.au/ANU-kicks-off-the-transition-away-from-gas-heating)) | Supercomputer heat to student-accommodation hot water via central energy plants (2019 claim); "thermal precinct" plan | Conflicting: operational (2019) vs prospective (later page) | Counts as "data centre exporting heat to buildings", but institutional and in-house, not a commercial service |
| NEXTDC M4 Fishermans Bend ([NEXTDC](https://www.nextdc.com/news/nextdc-announces-2-billion-ai-factory-and-technology-campus-at-fishermans-bend); [DCD](https://www.datacenterdynamics.com/en/news/nextdc-announces-plans-for-data-center-in-melbourne-promises-1mw-rack-densities/)) | 150 MW AI campus with "waste heat recovery for district-level energy reuse" | Announced June 2025; subject to approval; not built | Announcement only; centralised hyperscale, not distributed modules |
| ACT Greens motion, Laura Nuttall MLA ([ABC](https://www.abc.net.au/news/2026-09-22/act-greens-proposal-pair-data-centres-swimming-pools/107181808); [Region](https://region.com.au/barr-shoots-down-greens-call-for-data-centres-to-heat-pools/1001558/); [Ausleisure](https://www.ausleisure.com.au/news/act-government-rules-out-co-location-of-data-centres-with-public-swimming-pools)) | Proposed pairing data centres with public pools | Sept 2026; rejected by the Chief Minister; vote outcome unknown | Proposal only; no company named in extracts |
| Dorset Council councillor, Tas ([Examiner](https://www.examiner.com.au/story/9314046/tasmanian-councillor-suggests-data-centres-could-heat-pools/)) | Floated a data-centre deal to heat the Scottsdale pool | Idea; ruled out of the study's scope | Idea only |
| CDC Hume 1, Canberra ([Archilovers/Climaveneta](https://archilovers.com/projects/176266/climaveneta-supplying-the-australian-data-centre-provider-of-the-year.html)) | Multi-purpose heat pumps plus free-cooling chillers | Operating; date unclear | Adjacent: no heat export found |
| Firmus / Sustainable Metal Cloud ([TechDay](https://techday.asia/tag/firmus)) | Immersion-cooled HyperCubes; Bell Bay (Tas) AI data centre | Active; Bell Bay approved | Adjacent: cooling without heat export |
| Equinix Australia ([Equinix AU](https://www.equinix.com/data-centers/asia-pacific-colocation/australia-colocation); [iTWire](https://itwire.com/guest-articles/company-news/equinix-named-a-leader-in-the-idc-marketscape-worldwide-datacentre-services-sustainability-2025-2026-vendor-assessment.html)) | Global heat-export programme; none in Australia | n/a | Not present in Australia |
| AirTrunk ([Newcastle Herald](https://www.newcastleherald.com.au/story/9327354/airtrunks-5-billion-kurri-kurri-data-centre-seeks-hunter-renewable-energy-partners/)) | Hyperscale data centres; Kurri Kurri plan | n/a | No heat export found |
| Pawsey Centre, Perth ([CSIRO](https://www.csiro.au/en/news/All/News/2013/February/Cooling-solution-for-supercomputer-heralds-new-age-in-renewable-energy)) | Groundwater (aquifer) cooling | Operating since about 2013 | Adjacent: heat rejected to an aquifer, not reused |
| GreenSquareDC, Perth ([Austrade](https://international.austrade.gov.au/en/news-and-analysis/news/australia-apacs-rising-regional-hub-for-green-data-centres)) | 96 MW "green" AI data centre plan | Planned | Adjacent: no heat export mentioned |
| Wilson Hot Water ([Ai Group](https://www.australianindustrygroup.com.au/news/member-stories/store-heating-a-win-for-shoppers--and-the-environment/)) | Supermarket refrigeration waste heat to store heating | Operating | Adjacent: not compute |
| Spark + Aventuur, Auckland NZ ([DCD](https://www.datacenterdynamics.com/en/news/spark-data-center-to-heat-surfing-lagoon-in-auckland-new-zealand/)) | Data centre heat to a surf lagoon | Planned; target opening 2027 | NZ only; centralised data centre, not distributed modules |
| Deep Green, Heata, Qarnot, Leafcloud ([Leafcloud](https://leaf.cloud/leafsites/); [The Register](https://www.theregister.com/2023/01/12/heata_offers_free_hot_water/); [Net Zero Compare](https://netzerocompare.com/organizations/qarnot)) | Overseas exemplars | No Australian launch, distributor, pilot or customer found | Not present |

### Inferences
- The specific business (third-party, distributed, small compute modules at pools, hotels, apartments or homes, selling cloud or AI compute and giving heat free or cheaply) has **no active Australian operator** that I could find. The verdict is PARTIAL, not ABSENT, because of the ResetData pitch and pilot, the brewery install, and the ANU and NEXTDC heat-reuse claims.
- ACT politics is framing the debate as "data centres at pools". A kW-scale module business (Leafcloud or Heata scale) may need to position itself as plant-room heating equipment rather than a "data centre" to avoid that framing. This is a positioning inference, not tested against planning law.

### Gaps
- No primary confirmation of the operational status of any of the four closest matches (the ResetData hot-water link, ANU heat reuse, the Hawkesbury Brewing date, NEXTDC M4 approval). WebFetch is blocked, so every finding relies on search extracts.

## Key Question 3: What Australian facts on demand or regulation matter for launch?

### Takeaway
Council aquatic centres are typically a council's largest gas load. Councils are now replacing pool gas boilers with heat pumps, often grant-funded, which creates both a demand window and a deadline for any compute-heat offer. The policy environment for data centres is tightening (the ACT framework and its rejection of pool co-location, NSW's framework, a Tasmanian inquiry, water scrutiny), which both pressures and constrains the concept.

### Cited Findings
1. **Pools dominate council gas use.**
   - Banyule's three aquatic centres account for 93% of the gas the council uses ([Banyule, WaterMarc fact sheet](https://www.banyule.vic.gov.au/files/assets/public/v/1/about-us/advocacy/fact-sheets/watermarc-aquatic-centre.pdf); [Banyule news](https://banyule.vic.gov.au/News-items/WaterMarc-wins-2.3M-electrification-grant)).
   - Lane Cove Aquatic Centre made up 60% of the council's energy use and 99% of its gas use in 2024 ([North Shore Lorikeet](https://www.northshorelorikeet.com.au/p/lane-cove-aquatic-centre-moves-to-its-ditch-gas-heating-systems)).
2. **Councils are electrifying pool heating now, with grants.**
   - Banyule's WaterMarc gas-boiler-to-heat-pump project won a $2.3M grant (58 of 165 applications succeeded) and expects a 37% emissions cut ([Banyule](https://banyule.vic.gov.au/News-items/WaterMarc-wins-2.3M-electrification-grant)).
   - Toowoomba's Milne Bay centre received $1,083,907 from the federal Community Energy Upgrades Fund to replace gas with heat pumps and permanently remove its gas connection ([Toowoomba Regional Council](https://www.tr.qld.gov.au/Council/News-and-public-notices/Media-releases/The-heat-is-on-for-Milne-Bay-Aquatic-and-Fitness-Centre)).
   - Cabarita pool (Canada Bay) replaced its gas boilers with a 540 kW Rheem heat pump ([Future Heat](https://www.futureheat.info/post/cabarita-swimming-centre-sydney)).
3. **The ACT has rejected co-locating data centres with suburban pools.** The Chief Minister says data centres should go in areas planned and serviced for data-centre development, and a draft ACT Data Centre Framework is due early next year, i.e. 2027 ([Region Canberra](https://region.com.au/barr-shoots-down-greens-call-for-data-centres-to-heat-pools/1001558/); [ABC](https://www.abc.net.au/news/2026-09-22/act-greens-proposal-pair-data-centres-swimming-pools/107181808)).
4. **Regulatory scrutiny of data centres is rising.**
   - The ACT Greens motion sought 100% renewables, water-sustainability conditions, batteries instead of diesel, a community levy and a moratorium until the framework exists ([Region Canberra](https://region.com.au/barr-shoots-down-greens-call-for-data-centres-to-heat-pools/1001558/)).
   - NSW has released a Data Centre Policy Framework and guidelines ([Infrastructure NSW](https://www.infrastructure.nsw.gov.au/news/nsw-releases-data-centre-policy-framework-and-guidelines/); [Clayton Utz, Aug 2026](https://www.claytonutz.com/insights/2026/august/nsw-draws-the-line-what-the-new-data-centre-policy-framework-means-for-investors-developers-government-and-communities)).
   - Tasmania has launched a parliamentary inquiry into AI data centres ([W.Media](https://w.media/tasmania-launches-parliamentary-inquiry-into-ai-data-centres/)).
5. **Water scrutiny is pushing data centres toward recycled water.** Sydney Water has confirmed that a new $1.2b recycling plant could supply data centres ([ABC, 6 Oct 2026](https://www.abc.net.au/news/2026-10-06/nsw-sydney-recycled-water-earmarked-for-ai-data-centres/107214474)). NEXTDC M4 plans liquid cooling with recycled wastewater ([NEXTDC](https://www.nextdc.com/news/nextdc-announces-2-billion-ai-factory-and-technology-campus-at-fishermans-bend)).

### Inferences
- **The electrification window is open now and closing.** Pools are switching to heat pumps with grant money, so a compute-heat offer should be designed to feed or pre-heat heat pumps or buffer tanks rather than replace a gas boiler. Once a council has committed to a new heat-pump system, the next retrofit opportunity may be years away.
- Investa's 40–60°C figure for server-heated water suggests compute heat will often be pre-heat for domestic hot water. Australian hot-water storage temperature rules for Legionella control will matter (see Gaps).
- The ACT's planning objection targets "data-centre infrastructure on public aquatic sites in suburban Canberra". Small modules inside existing plant rooms may be treated differently, but this is untested; the draft ACT framework (2027) is a consultation opening.

### Gaps
- **Legionella and storage temperature:** the minimum storage temperature for hot water was not verified from a primary source. A Whirlpool forum post cites 60°C as the accepted safe minimum ([Whirlpool](https://forums.whirlpool.net.au/archive/2712823)), which is low quality; AS/NZS 3500.4 and state plumbing codes should be checked.
- **National data:** no national figure on total gas use by aquatic centres was found, and AEMO data-centre load forecasts were not searched because of the budget.
- **NSW framework:** whether the NSW Data Centre Policy Framework or the forthcoming ACT framework rewards or requires heat reuse is unknown; only the headlines were seen.
