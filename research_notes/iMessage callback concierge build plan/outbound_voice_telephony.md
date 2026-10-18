# Outbound Contact Layer: AI Voice, Telephony and Provider Outreach (as of 18 October 2026)

How these notes were made. I ran 30 web searches; every WebFetch failed with DNS errors (twilio.com, openai.com, ecorpit.com, dev.to). So the "Cited Findings" below come from search-result snippets and summaries of the cited pages. I could not read the full pages. Many pricing figures come from third-party or competitor blogs, and I flag those. Anything in "Inferences" marked **[Background]** comes from the researcher's prior knowledge and was NOT re-verified this session. All prices are in USD unless stated. The cost model at the end uses list prices captured in these sources, dated where possible.

---

## Q1. Connection mechanics: which outreach pattern gets busy tradies to call the consumer fastest, and how do we measure the call?

### Takeaway
I found no published data on tradie answer rates or channel preference. The adjacent evidence points the same way. Businesses often don't answer AI calls (26% of Google's AI pricing calls went unanswered, and 48% of answered calls gave no usable answer). Australians broadly prefer texting. Missed-call text-back products exist precisely because tradies can't answer on the tools. Twilio's off-the-shelf number-masking product (Proxy) is closed to new customers, so masking has to be built on Programmable Voice. The best pattern looks like **SMS job card first → AI voice call as escalation → the provider calls a masked/proxy number that rings the consumer**. An optional "press 1 to connect now" live bridge covers urgent jobs. Billing comes from the telephony provider's call records for the masked leg.

### Cited Findings
- **Businesses often don't pick up AI calls.** Invoca's study of Google's AI pricing calls (November 2025, released 10 Dec 2025) found a 4x month-on-month surge in such calls. Locations "failed to answer 1 in 4 calls (26%)" and did not provide pricing on 48% of the calls they did answer. These calls were under 1% of calls to eligible businesses — [Invoca blog](https://www.invoca.com/blog/google-ai-pricing-calls-study); [Invoca press release](https://www.invoca.com/press-release/new-invoca-study-finds-pricing-request-phone-calls-from-googles-ai-surged-over-300-in-november); [CXM World](https://cxm.world/digital-experience/googles-ai-is-phoning-businesses-for-pricing-and-many-arent-answering-survey-reveals/)
- A secondary source cites "Invoca (2026)": plumbing AI-call volume rose 650% in a month, with 26% unanswered. I could not verify this against Invoca's own materials — [FindSkill.ai](https://findskill.ai/learn/agentic-calling/)
- **General Australian channel preference (dated).** A 2018 finder.com.au survey of 2,011 adults found 56% avoid phone calls in favour of texting, messaging apps or email. It covers consumers, not tradies, and is eight years old — [finder.com.au](https://www.finder.com.au/press-release-august-2018-11-million-avoid-phone-calls); [iTWire](https://itwire.com/your-it-news/apps/aussies-show-a-preference-for-texting-over-phonecalls-survey)
- **Tradie missed-call behaviour.** "Tradie Texts" is sold as a missed-call auto-text product for tradies' mobiles. Its listing notes that texts can't reach withheld numbers or landlines. This is a vendor claim with no answer-rate data — [GetApp AU](https://www.getapp.com.au/software/2111133/tradie-texts)
- **Twilio Proxy (managed masking) is closed to new customers.** The Twilio docs say: "Proxy Public Beta is currently closed for new customers. Please consider using Twilio Conversations and Programmable Voice directly if you are building your masking application." Other Proxy pages still describe it as Public Beta (no SLA). I found no sunset date — [Twilio Proxy: Phone Number Management](https://www.twilio.com/docs/proxy/understanding-phone-number-management); [Twilio Proxy docs](https://www.twilio.com/docs/proxy)
- **Warm-transfer billing (Retell).** Per a Retell-published guide, the AI agent fee stops once the caller is connected to the destination and the agent drops off. The hold/briefing phase of a warm transfer is still billed, and voicemail calls bill only while the agent is active — [Retell: how to calculate monthly cost](https://www.retellai.com/learn/how-to-calculate-the-monthly-cost-of-running-an-ai-voice-agent); [eesel Retell pricing](https://eesel.ai/blog/retell-ai-pricing)
- **Carrier-side risk to high-volume AI calling.** Telstra's Scam Protect (launched March 2025) replaces caller ID on suspicious calls with labels. These include "Warning: Suspicious Calling Pattern" for high traffic volume from one number, plus "Warning: Potential Fraud" and "Unverified: Overseas Call". It applies automatically to Telstra, Boost and Belong customers — [EFTM](https://eftm.com/2025/03/telstra-introduces-new-scam-and-suspicious-call-alerts-directly-into-caller-id-260453); [Pickr](https://pickr.com.au/news/2025/telstra-sees-more-scams-auto-identified-across-iphone-android)

### Inferences
- **Option (a): AI call, then warm transfer/live bridge.** This is fastest when it works, since the consumer is talking to a human within a minute or two. But it needs three things at once: the tradie answers, can talk now, and the consumer is free right then. With a large share of businesses not answering even Google's calls, and tradies physically on the tools, success per dial will be low. It also costs the most (two outbound mobile legs plus AI time while on hold). Keep it as an opt-in fast path ("Press 1 or say 'connect me' to be put through now"), not the default.
- **Option (b): AI call or SMS, then a masked number that rings the consumer.** This is the best fit for the business model. The provider calls when they put the tools down (inside the 5–30 min window). The consumer's real number is never exposed. Every connection produces a call record you control, which is the billing evidence. Because Twilio Proxy is closed, build it yourself: a pool of AU mobile numbers on Twilio Programmable Voice. A webhook on inbound calls looks up the active job for that (proxy number, caller) pair and `<Dial>`s the consumer with the proxy number as caller ID. **[Background]** This is the standard "number masking with Programmable Voice" pattern.
- **Option (c): SMS job card, "reply YES", then click-to-call.** This likely gets the best acceptance for on-the-tools tradies. It is asynchronous, can be read in 5 seconds, costs about $0.05 a segment, and can go to 3–8 providers in parallel. "Click-to-call" should not reveal the consumer's real number. Make it a `tel:` link to the masked proxy number (option b), or a "reply CALL and we'll ring you and connect you" server-initiated bridge (option a). Both keep call records. Combining (c) with (b) gives the most leverage.
- **Option (d): email or web form.** Too slow for a 5–30 min SLA. Use it only for provider onboarding, consent capture, receipts and invoices.
- **Suggested escalation ladder per request:** (1) SMS job card to the top 3–5 matched providers at once. (2) After 2–3 min without a reply, an AI voice call to the best-ranked non-responders, with a voicemail drop or a hang-up on voicemail. (3) On the first YES, text the provider the masked number plus the job summary. Tell the consumer over iMessage "Dave from X Painting will call you from 04xx xxx xxx in the next ~10 min". Send polite "job taken" texts to the others.
- **Measuring "connected call" for billing.** Use the telephony provider's call-detail records and status callbacks on the proxy → consumer leg. Define billable as: consumer leg answered AND duration ≥ a threshold (e.g. 30–60 s) AND not answered by voicemail. **[Background]** Twilio gives CallStatus, CallDuration and (with AMD enabled) AnsweredBy on status callbacks. Add a lightweight iMessage confirmation to the consumer ("Did Dave call? Y/N") as a dispute backstop. Don't record the bridged consumer–provider call at MVP (see Q5).
- Spread outbound AI calls across a pool of numbers and keep per-number volume low. A single new number placing dozens of short calls is exactly the "Suspicious Calling Pattern" Telstra flags.
- **[Background] Cheaper pitch call.** The "pitch + yes/no" call could be a scripted call: a pre-generated natural TTS clip plus DTMF/speech `<Gather>`, rather than a full conversational LLM agent. That cuts cost and hallucination risk. Escalate to a conversational agent only if the provider asks questions.

### Gaps
- I found no published data on Australian tradie phone answer rates, SMS reply rates or response times, or on channel preference. This includes Whirlpool, r/AusRenovation and hipages/ServiceSeeking reports. The plan should treat answer and reply rates as unknowns to measure in a pilot.
- I found no data comparing acceptance rates for warm transfer and masked callback in home services.
- I could not confirm whether Twilio Proxy has a formal end-of-life date. It is closed to new customers, which is enough to rule it out.

---

## Q2. Voice AI platforms (October 2026): pricing, features and fit for many short parallel outbound calls

### Takeaway
Managed platforms land at about **$0.07–$0.31/min all-in**, and headline rates understate the true cost. For an AU MVP built by a TypeScript solo founder, the strongest candidates are **Retell AI** and **ElevenLabs Agents**:
- **Retell AI** has the most complete outbound toolkit: batch calls, voicemail detection, IVR/DTMF navigation, warm transfer and per-dial billing.
- **ElevenLabs Agents** has a flat ~$0.08/min, batch calling, Twilio-native AMD and marketed Australian voices.

**LiveKit Agents** (per-second billing, 10 s minimum) is the best long-run option on cost and control for very short calls. **OpenAI's realtime models** are the main engine choice if you build it yourself. Much of the pricing evidence is third-party and some conflicts.

### Cited Findings
**OpenAI Realtime API (gpt-realtime family, SIP)**
- Third-party sources put full gpt-realtime at $32 per 1M audio input tokens, $64 per 1M audio output tokens and $0.40 per 1M cached input. That works out to roughly $0.18–0.24 per minute; gpt-realtime-mini is about $10/$20 per 1M tokens, or ~$0.06–0.10/min — [eesel gpt-realtime-mini pricing](https://www.eesel.ai/blog/gpt-realtime-mini-pricing); [rywalker research](https://rywalker.com/research/openai-realtime-api); [techsy](https://techsy.io/it/blog/ai-voice-agent-pricing)
- A 2026 build guide claims OpenAI shipped **gpt-realtime-2.1 and gpt-realtime-2.1-mini on 6 July 2026**, and that a real support call with caching runs about **$0.04/min**. Another source describes "gpt-realtime-2" (May 2026). The current model name is UNVERIFIED (I couldn't reach openai.com) — [ecorpit](https://ecorpit.com/gpt-realtime-2-1-voice-agents-reasoning-cost-build-guide-2026/); [noqta](https://noqta.tn/en/blog/openai-gpt-realtime-voice-agents-sip-mcp-2026)
- One source says OpenAI's native SIP endpoint is in beta, and that many teams route calls via a telephony provider such as Twilio, which bills separately — [Fora Soft](https://www.forasoft.com/blog/article/openai-realtime-api-webrtc-sip-websockets-integration)

**ElevenLabs Agents**
- Batch Calling starts many outbound calls at once through configured agents and works with native Twilio numbers and SIP trunks. Voicemail detection uses **Twilio's carrier-level AMD**, which is off unless configured and "ignored for non-Twilio providers" — [ElevenLabs batch calling docs](https://elevenlabs.io/docs/agents-platform/phone-numbers/batch-calls)
- A Sept 2026 third-party post reports:
  - $0.08 per call minute on all plans.
  - "Burst" minutes above the concurrency limit at $0.16/min.
  - The LLM billed per minute on top, from $0.0005 (GPT-5 Nano) to $0.0446 (GPT-5.5).
  - Telephony billed separately.
  - A 95% discount on silences over 10 s — [Macha: ElevenLabs Agents pricing](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained)
- On a 40,000-minute benchmark, ElevenLabs Agents was the cheapest managed platform and Bland the most expensive. Bland disputes this — [beri.net](https://www.beri.net/article/voice-ai-per-minute-pricing-vapi-retell-elevenlabs-bland-cost-per-resolved-call); [Bland blog](https://www.bland.ai/blog/voice-ai-pricing-enterprise)
- ElevenLabs markets Australian-accent voices for agents, and `eleven_flash_v2_5` is its lowest-latency model. These are vendor claims with no independent test found — [ElevenLabs AU accent blog](https://elevenlabs.io/blog/australian-accent-text-to-speech); [ElevenLabs AU accent page](https://elevenlabs.io/text-to-speech/australian-accent)

**Retell AI**
- Features: IVR navigation, DTMF, warm transfer to a human, voicemail detection, and batch outbound calling with per-dial analytics. Agents are built with a flow editor or the API/SDKs — [Retell: best voice AI providers](https://retellai.com/blog/best-voice-ai-providers); [Zeeg Retell review](https://zeeg.me/en/blog/post/retell-ai-review)
- Pricing:
  - PAYG from $0.07/min, of which Retell's infrastructure is ~$0.055/min. LLM, TTS and telephony pass through, for $0.07–$0.31/min all-in.
  - New accounts get $10 credit (~60 min) and 20 concurrent calls.
  - $0.005 per number dialled in a batch; $0.10 per call with branded caller ID.
  - Telephony ~$0.015/min unless you bring your own carrier — [eesel Retell pricing](https://eesel.ai/blog/retell-ai-pricing); [11x Retell pricing](https://www.11x.ai/guides/retell-ai-pricing)
- Retell's own blog gives an effective $0.12–0.19/min at 10k min/month; Retell's estimator gives ~$0.115/min — [Retell vs ElevenLabs/Vapi](https://retellai.com/blog/vapi-vs-elevenlabs); [DevToolLab](https://devtoollab.com/blog/best-ai-voice-agent-platforms)

**Vapi**
- $0.05/min platform fee, with model, voice and transport billed at cost. Realistic all-in is $0.09–$0.14/min according to one source, and $0.17–0.30/min according to competitors Retell and ElevenLabs. One source says Vapi doesn't resell telephony, so you bring your own provider — [beri.net](https://www.beri.net/article/voice-ai-per-minute-pricing-vapi-retell-elevenlabs-bland-cost-per-resolved-call); [11x Vapi pricing](https://www.11x.ai/guides/vapi-pricing); [ElevenLabs: Vapi alternatives](https://elevenlabs.io/blog/vapi-alternatives); [Retell vs Vapi](https://retellai.com/blog/vapi-vs-elevenlabs)
- Concurrency defaults to 10 lines, with more at $10/line/month. Another source describes tiers of Core $29 with 10 lines and Pro from $999 with 30 lines. One source warns that high-volume simultaneous outbound adds up — [Macha Vapi pricing](https://www.getmacha.com/blog/vapi-ai-pricing-explained); [Zeeg Vapi pricing](https://zeeg.me/en/blog/post/vapi-ai-pricing)

**Bland AI**
- Build plan from $299/month plus usage. Concurrency is 10 (Start), 50 (Build) and 100 (Scale), with custom Enterprise pricing. Per-minute figures conflict: $0.09/min flat versus $0.11–0.14/min bundled. It has a native outbound dialer with pacing, according to a vendor-adjacent review — [CloudTalk: Bland pricing (Apr 2026)](https://www.cloudtalk.io/bland-ai-pricing/); [Bland blog](https://www.bland.ai/blog/voice-ai-pricing-enterprise)

**LiveKit Agents + LiveKit SIP**
- Public tiers are Build $0, Ship $50 and Scale $500, plus Enterprise. Plans include agent-session minutes and inference credits — [LiveKit pricing](https://livekit.io/pricing); [TRTC summary](https://trtc.io/blog/details/livekit-pricing-2026)
- **Per-second metering with a 10-second minimum** applies to agent sessions, recording, WebRTC and SIP connections. This suits short outbound calls — [LiveKit blog](https://livekit.com/blog/introducing-per-second-metering-for-livekit); [LiveKit community](https://community.livekit.io/t/introducing-per-second-metering-for-livekit/1924)
- Agent sessions cost about $0.01/min. SIP is ~$0.003–0.004/min (third-party). An aggregator quotes LiveKit's estimate of **$0.0672/min** for its default stack (Gemma 4 31B + Deepgram Nova-3 + Cartesia Sonic 3), of which LiveKit's own fees are $0.02/min — [usagepricing LiveKit](https://usagepricing.com/blueprint/livekit); [Medium/QSS](https://medium.com/@qss-technosoft/how-to-build-real-time-ai-applications-with-livekit-architecture-cost-and-use-cases-d7c1483d6d0f)

**Deepgram Voice Agent API**
- Late-August 2026 rates (PAYG/Growth per min): Standard $0.075/$0.068; Standard-BYO TTS $0.065/$0.051; Custom BYO LLM+TTS $0.050/$0.041; Advanced $0.163/$0.146; Advanced-BYO TTS $0.122/$0.110. A 26 Aug 2026 change raised Custom-BYO LLM PAYG from $0.056 to $0.065, with a promo at $0.050. Growth starts at ~$4,000/yr prepaid. An older $0.08/min figure is still on some sites — [usagepricing Deepgram](https://usagepricing.com/blueprint/deepgram); [usagepricing price change](https://usagepricing.com/blueprint/activity/deepgram-2026-08-26-price-change); [CostBench](https://costbench.com/software/ai-transcription-apis/deepgram/hidden-costs)

**Telnyx Voice AI**
- Telnyx's voice-agent page lists a **$0.05/min voice engine** covering orchestration, STT and TTS, with ~$0.06/min total for a US inbound profile. Its Australia article claims ~$0.08/min Voice AI. The Voice API is $0.002/min plus SIP trunking for outbound — [Telnyx voice AI pricing](https://telnyx.com/pricing/voice-ai-agents.md); [Telnyx best telco Australia](https://telnyx.com/resources/best-telco-australia); [Telnyx Voice API pricing](https://telnyx.com/pricing/voice-api.md)
- Telnyx says ElevenLabs Australian voices can be imported into its platform — [Telnyx Australian AI voice](https://telnyx.com/resources/australian-ai-voice)

**Gemini Live API, Hume, Cartesia**
- Gemini Live: Google's docs name telephony as a server-to-server use case. A Feb 2026 Google Cloud community article builds a phone agent with FreeSWITCH + ADK and highlights low first-audio latency — [Gemini Live API docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api); [Medium/Google Cloud](https://medium.com/google-cloud/gemini-live-part-1-building-a-low-latency-telephone-voice-agent-with-freeswitch-and-adk-agents-ceafd209f017)
- Hume EVI: EVI 3 is English-only and EVI 4-mini is multilingual (needs a supplemental LLM), and you can bring your own LLM. Cartesia Sonic is cited as the default TTS in LiveKit Agents at ~75 ms time to first word — [eesel GPT-Live alternatives](https://www.eesel.ai/blog/gpt-live-alternatives)
- Cartesia offers Sonic (TTS), Ink (STT) and Line (a full voice-agent platform) — [ToolQuestor](https://toolquestor.com/de/vs/cartesia-vs-hume-ai)

### Inferences
- **Fit for many short parallel outbound calls:**
  - **Retell AI**: best out-of-box outbound feature set. AMD, IVR navigation and batch dialling matter because some trade businesses have phone menus or answering services.
  - **ElevenLabs Agents**: simplest flat pricing and the best-marketed AU voices. Watch the 2x "burst" pricing when you exceed the concurrency limit, and note that AMD depends on Twilio numbers.
  - **LiveKit Agents**: per-second billing with a 10 s minimum is ideal for 20–40 s unanswered or voicemail attempts. **[Background]** LiveKit has a Node/TypeScript Agents SDK (agents-js), but more examples are in Python. It is more engineering, with the most control.
  - **Vapi**: flexible, but the low default concurrency (10) and the gap between headline and real cost are drawbacks for parallel bursts.
  - **Bland**: the $299/month floor and inconsistent pricing make it a weaker fit for a solo MVP.
  - **Deepgram Voice Agent and Telnyx Voice AI**: credible low-cost engines. Telnyx bundles carrier and AI on one bill.
- **[Background]** Pipecat (by Daily) is an open-source Python-first framework with a hosted Pipecat Cloud. It suits a Python team more than a TypeScript solo founder. Synthflow is a no-code platform aimed at agencies. Neither was verified this session.
- **[Background]** Twilio ConversationRelay connects a Twilio call to your own LLM over WebSocket, with Twilio handling STT/TTS. It is another TS-friendly option that keeps everything on one carrier. Its pricing was not verified.
- **Latency.** The search gave no independent October 2026 latency benchmarks beyond vendor claims (e.g. Cartesia ~75 ms TTFB). Speech-to-speech models (OpenAI realtime, Gemini Live) generally have the lowest turn latency. Cascaded STT→LLM→TTS stacks give more control over voice choice, including AU accent.
- **Architecture point.** Keep the bridging, masking and billing logic in your own Twilio (or Telnyx) layer, not inside the voice-AI vendor. That way the AI vendor is swappable and the billing evidence (CDRs) lives in one place you control.

### Gaps
- I couldn't confirm OpenAI's current realtime model name (gpt-realtime vs -2 vs -2.1), official per-minute pricing, or whether the SIP connector is GA. openai.com was unreachable.
- I found no verified current pricing or features for Synthflow, Pipecat Cloud, Hume EVI, Cartesia Line or Gemini Live audio for telephony.
- I found no independent Australian-accent quality test for any provider. Run a blind listening test with AU scripts on real calls to AU mobiles.
- I found no voicemail-detection specifics for Vapi or Bland, and no independent AMD accuracy data for any platform.
- "GPT-Live" is referenced as an OpenAI product in an eesel article. I did not establish what it is.
- I found no 2026 entrants beyond those listed, and no named startups in search results.

---

## Q3. Telephony in Australia: numbers, KYC, pricing, masking, CLI rules, scam-call blocking and branded caller ID

### Takeaway
Twilio publishes clear AU list prices:
- **$0.0750/min outbound to AU mobiles**, $0.0252/min to landlines.
- **$0.0515 per outbound SMS segment**.
- AU mobile numbers at ~$6.50–8.25/month, which need KYC (ID plus an Australian address).

You must present only numbers your carrier has allocated to you as caller ID. Carriers block spoofed, anonymous, unallocated and special-service CLIs. Telstra flags high-volume single-number calling. The Scams Prevention Framework is tightening KYC and CLI controls through 2026–27.

### Cited Findings
- **Twilio AU voice list prices.** Outbound to mobiles is $0.0750/min and to local/landline $0.0252/min. Local numbers cost $3.00/month and mobile numbers $8.25/month. Twilio's AU number CSV shows the mobile number at 6.50/month, so the figures conflict. Twilio SIP Trunking termination to AU mobile is $0.0710/min — [Twilio Voice pricing AU](https://www.twilio.com/en-us/voice/pricing/au); [Twilio number pricing CSV](https://www.twilio.com/content/dam/twilio-com/pricing-data/en/csv/PMded94a0dae30eaaec0f115f22859bd38_SiteNumbersPricing.csv); [Twilio SIP Trunking AU](https://www.twilio.com/en-us/sip-trunking/pricing/au)
- **Twilio AU SMS.** Outbound is $0.0515 per segment for the first 20k/month, then $0.0505 and $0.0484 at higher tiers. Inbound is $0.0075 and MMS $0.35. Carrier fees may apply, and a third-party tracker confirmed $0.0515 on 4 Sep 2026 — [Twilio SMS pricing AU](https://www.twilio.com/en-us/sms/pricing/au); [textbee](https://textbee.dev/sms-pricing/twilio)
- **Twilio AU regulatory requirements.**
  - Mobile numbers need proof of identity plus an Australian address (no PO Box), and services are for business or trade use.
  - Twilio said KYC for Mobile and Toll-Free purchases would be updated "toward the later end of May 2026" under ACMA's Scam Prevention Framework. Third-party guides say business numbers need a business name, an AU address and a business ID (ABN) — [Twilio AU regulatory guidelines](https://static0.twilio.com/en-us/guidelines/au/regulatory); [Enrollio Twilio AU guide](https://help.enrollio.ai/en/articles/1021-twilio-setup-and-compliance-for-australia-users)
  - Numbers from a different charging district are billed as that district and may not be portable — [Twilio AU regulatory guidelines](https://static0.twilio.com/en-us/guidelines/au/regulatory)
- **AU caller-ID (CLI) rules.**
  - Under the Reducing Scam Calls code, an operator may originate calls only with CLIs from numbers it has been allocated.
  - Anonymous CLI, unallocated +61 numbers and special-service/toll-free CLIs (the "Do-Not-Originate" list) are blocked.
  - From 1 March 2022, Telstra blocks calls presenting a Telstra-owned AU CLI that reach a Telstra number via another carrier (cause 21 → SIP 402). Twilio-owned numbers are unaffected, and the fix is to port numbers to Twilio (4–6 weeks).
  - Plivo reports rejection of CLIs prefixed +6113/+611300/+611800/+611900 — [Twilio support: Telstra CLI restrictions](https://support.twilio.com/hc/en-us/articles/4407966601115-Telstra-Australian-Caller-ID-Restrictions-Reducing-Scam-Calls-Industry-Code); [Twilio AU voice guidelines](https://www.twilio.com/en-us/guidelines/au/voice); [Plivo AU restrictions](https://old-support.plivo.com/hc/en-us/articles/360059777332-What-are-the-restrictions-on-outbound-calling-toward-Australia)
- **The Reducing Scam Calls and Scam SMs code** (C661:2022, registered by ACMA) requires telcos to identify, trace and block scam calls and SMS. It also requires checks on organisations using text sender IDs and reporting of blocked scam calls. Telcos have blocked more than 2.2 billion scam calls since December 2020 and more than 788 million scam SMS since July 2022. ACMA enforced CLI-monitoring failures against NetSIP in 2024 — [ACMA caller ID scams](https://www.acma.gov.au/caller-id-scams); [Comms Alliance C661:2020](https://www.commsalliance.com.au/__data/assets/pdf_file/0015/72150/C661_2020.pdf); [ACMA NetSIP report](https://acma.gov.au/sites/default/files/2024-12/NetSIP%20-%20Final%20investigation%20report%20-%20Reducing%20Scams%20Code%20-%201%20November%202024.pdf)
- **The Scams Prevention Framework (SPF) draft telco code** was in consultation from 28 May 2026. It covers:
  - Identity verification before supplying a service, plus rights-of-use checks and a "legitimate use case" for high-risk services.
  - Bars on calls without CLI or with spoofed AU numbers.
  - A shared "do not originate" list, limits on bulk messaging over prepaid services, and network monitoring and filtering.

  The law-firm sources give different start dates for obligations: **27 May 2027** in one and **31 March 2027** in another — [G+T](https://www.gtlaw.com.au/insights/click-here-australias-scam-prevention-framework-takes-shape); [Corrs](https://www.corrs.com.au/insights/developing-the-scams-prevention-framework-treasury-consults-on-draft-rules-and-codes); [Ashurst](https://www.ashurstperkinscoie.com/en/insights/scams-prevention-framework-draft-rules-and-codes-released/); [Treasury draft telco code](https://storage.googleapis.com/files-au-treasury/treasury/p/prj3c72c6a97cd887188b1ff/page/c2026_765133_code_telecom.pdf); [Dwyer Harris](https://www.dwyerharris.com/blog/scams-prevention-framework-the-next-big-compliance-challenge)
- A vendor blog reports that an **SMS Sender ID Register** would commence 1 July 2026. I didn't verify this against ACMA — [Calilio](https://www.calilio.com/blogs/australian-phone-number-sms-compliance)
- **Carrier scam labelling.** Telstra Scam Protect labels include "Suspicious Calling Pattern" for high volume from one number. Optus "Call Stop" (with the AFCX) redirects calls to identified scam numbers to a warning message — [EFTM](https://eftm.com/2025/03/telstra-introduces-new-scam-and-suspicious-call-alerts-directly-into-caller-id-260453); [Mobile World Live: Optus](https://www.mobileworldlive.com/featured-content/top-three/optus-ups-measures-in-battle-against-scammers/)
- **Telnyx.** Voice API is $0.002/min plus SIP trunking (per-destination sheet not retrieved), and Voice AI is ~$0.05–0.08/min — [Telnyx Voice API pricing](https://telnyx.com/pricing/voice-api.md); [Telnyx best telco Australia](https://telnyx.com/resources/best-telco-australia)
- **Branded caller ID.** Retell lists $0.10 per call for branded caller ID — [11x Retell pricing](https://www.11x.ai/guides/retell-ai-pricing). I found no source confirming it works on AU carriers.

### Inferences
- **Use AU mobile numbers (04xx) rented from the carrier as both the SMS sender and the masked-call proxy.** Tradies recognise and trust a mobile number more than a 1300 or overseas number. A single 04 number can be two-way SMS and voice. **[Background]** Twilio AU local (02/03/07/08) numbers are generally voice-only.
- **Pool sizing.** Each proxy number can map to one active job per provider (the key is the pair of proxy number and calling provider), so a pool of ~10–30 mobile numbers ($65–250/month) is enough at MVP scale. Pace AI outbound calls across the pool to stay under "suspicious pattern" heuristics.
- **Never present the consumer's or tradie's own number as caller ID.** Never use a toll-free or 13/1300 number as CLI. These are blocked, and spoofing would breach the code.
- **Provider choice.**
  - **Twilio** has the best-documented AU pricing and KYC path, native integrations with ElevenLabs, Retell and Vapi, and Programmable Voice for masking. It is the default MVP choice.
  - **Telnyx** is a cheaper candidate to evaluate later (own network, bundled Voice AI), but AU rates weren't verified.
  - **[Background]** Vonage, Plivo and Sinch all support AU numbers and masking-style call control. Vonage has historically shipped number-masking tutorials. None were verified this session.
- **[Background]** Even before the SPF takes effect, expect AU number purchase to require ABN-registered business details. Allow days to weeks for regulatory bundle approval.

### Gaps
- I found no verified Twilio per-minute inbound rate on AU mobile numbers (needed for the provider → proxy leg of a masked call).
- I couldn't retrieve AU mobile/landline termination rates or SMS rates for Telnyx, Plivo, Vonage or Sinch.
- I could not confirm the current status (post-May 2026) of Twilio's AU KYC update, or the final SPF commencement dates.
- I found no evidence of a branded or verified caller-ID product live on AU carriers (US STIR/SHAKEN-style branded calling does not obviously apply in AU).
- I found no data on how Telstra or Optus treat AI-voice traffic from newly provisioned cloud numbers specifically, or on the volume thresholds behind "Suspicious Calling Pattern".

---

## Q4. Precedents: Google "Ask for Me", Duplex, and agents that phone businesses for users

### Takeaway
Google is the main precedent. Its "Ask for Me" calls open by stating they are automated and from Google on behalf of a user. Businesses can opt out via their Business Profile or by asking on the call, and Google applies per-business call quotas. In May 2026 Google expanded it to **home repair, beauty and pet care** across the US. Business reception is lukewarm: about a quarter of calls go unanswered and about half of answered calls give no usable answer.

### Cited Findings
- **Ask for Me launch (January 2025, Search Labs, US).**
  - Initial categories: oil changes, tyre/brake replacement, emissions tests and nail appointments.
  - Each call begins "by announcing that it's an automated system calling from Google on behalf of a user".
  - Businesses can opt out via Google Business Profile settings, or by asking Google not to call them during a call. Google has "call quotas in place to ensure businesses don't get calls too often".
  - It is built on Duplex — [Android Authority](https://androidauthority.com/google-search-ask-for-me-3521795); [CO/AI](https://getcoai.com/news/googles-latest-ai-feature-ask-for-me-will-call-local-businesses-for-you); [Tom's Guide](https://www.tomsguide.com/ai/hate-phone-calls-google-now-wants-to-let-ai-take-care-of-that-for-you-too)
- **2026 expansion.** At Google I/O (19–20 May 2026, sources differ on the day), Google said "for select categories like home repair, beauty or pet care, you can ask Google to call businesses on your behalf." The rollout was US-wide in summer 2026, and the UI shows "Have AI check pricing". A secondary source quotes a Business Profile page saying availability is US-only except Indiana, Louisiana, Minnesota, Montana and Nebraska. Canada is expected in 2026 — [JobNimbus](https://jobnimbus.com/blog/google-ai-calling-home-services); [Famulor](https://www.famulor.io/es/blog/google-ai-is-calling-your-business-how-to-win-the-lead); [FindSkill.ai](https://findskill.ai/learn/agentic-calling/); [Retail Insider (Aug 2026)](https://retail-insider.com/articles/2026/08/when-the-first-customer-to-call-your-business-is-an-ai-assistant/)
- A UK chamber of commerce post claims Google only calls businesses whose profiles have clear structured data. This is unverified — [Black Country Chamber](https://www.blackcountrychamber.co.uk/news/article/google-business-profile-optimisation-getting-ready-for-google%E2%80%99s-ai-calls/)
- **Reception.** 26% of calls unanswered and 48% of answered calls gave no pricing (Invoca, November 2025) — [Invoca](https://www.invoca.com/blog/google-ai-pricing-calls-study)
- An August 2026 roundup says "Google, Apple, and a wave of well funded voice startups" converged on agentic calling within weeks of each other. It names no startups in the snippet, and I couldn't fetch the full text — [DEV Community (Aug 2026)](https://dev.to/assindo/ai-agent-news-august-2026-the-calling-gap-starts-to-close-19dd)

### Inferences
- **Copy Google's design pattern:**
  - Immediate AI disclosure naming the brand and "on behalf of a customer".
  - A clear purpose: here, a paid job lead rather than a price check. That is a stronger value proposition to the recipient than Google's.
  - An on-call opt-out ("say 'don't call me again'") honoured across all channels.
  - Per-business frequency caps.
  - A web opt-out page.
- This product's call carries value to the provider (a job), unlike Google's price-check calls. Acceptance should be meaningfully higher than Google's numbers, but this is unproven.
- **[Background] Google Duplex.** It was announced at I/O in May 2018 and drew criticism for sounding human without disclosing it was AI. Google then committed to identifying itself, and later used Duplex for restaurant bookings and business-hours updates. This history is why upfront disclosure is now the norm.
- **[Background]** Google's US-only, state-exclusion rollout suggests it is cautious about state call-recording and consent laws. That is a signal for AU state recording laws too.

### Gaps
- I found no named 2025–2026 startups with documented reception or opt-out data. Apple's reported calling feature is unverified.
- I couldn't confirm whether the 2026 home-services expansion keeps the Business Profile opt-out.
- I found no Australian precedent of an AI calling tradies at scale. Neither hipages nor ServiceSeeking showed up with AI-calling features.

---

## Q5. Compliance in Australia for AI calls and texts to businesses (plus a brief US TCPA note)

### Takeaway
Most business voice numbers can't go on the Do Not Call Register, but sole traders' "personal" mobiles can be. Treat provider outreach as telemarketing and comply with the Telemarketing Standard anyway: calling hours, identification, ending the call on request, and a returnable CLI. SMS and email job offers are almost certainly "commercial electronic messages" under the Spam Act. Inferred consent from a published business number is narrow (the job must relate directly to the published role), and sender ID plus a working unsubscribe are mandatory. Recording consent varies by state (NSW, Vic, WA, Tas and NT are effectively all-party), so announce any recording, and don't record bridged consumer–provider calls. New Privacy Act automated-decision transparency rules start **10 December 2026**. In the US, the FCC (Feb 2024) confirmed AI-generated voices are "artificial voice" under the TCPA, so prior consent is needed for calls to mobiles.

### Cited Findings
- **DNCR eligibility.** Business voice numbers generally aren't eligible. Business fax numbers can be registered, and business numbers "predominantly used for personal communications" may be. A 2008 Senate inquiry considered expanding to all business numbers, but it wasn't confirmed as enacted — [DNCR application form](https://www.donotcall.gov.au/media/1191/application-to-register-numbers_sept2016.pdf); [Sprintlaw](https://sprintlaw.com.au/articles/do-not-call-register-australia-businesses-need-to-know/); [DNCR about](https://www.donotcall.gov.au/about/about-the-do-not-call-register); [APH Senate report](https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/Completed_inquiries/2008-10/donotcallregister/report/c01)
- **Telemarketing and Research Calls Industry Standard 2017:**
  - Calling hours are weekdays 9am–8pm and Saturday 9am–5pm. There is no telemarketing on Sundays or national public holidays.
  - Express consent is needed to call outside those hours.
  - Callers must give their name and the purpose of the call at the start, and disclose where they got the number on request.
  - The call must end immediately if asked.
  - A return CLI must be displayed and be callable for at least 30 days.
  - Calls using recorded or synthetic voices must give the recipient a way to request information during the call.

  Sources conflict on Sunday research calls — [DNCR industry standards](https://www.donotcall.gov.au/industry/industry-overview/industry-standards); [Bright Law](https://www.brightlaw.com.au/telemarketing-and-research-calls-industry-standard/); [HSF](https://www.hsfkramer.com/fr/insights/2017-04/new-standard-for-telemarketing-and-research-calls); [DNCR industry guide](https://www.donotcall.gov.au/media/1212/dncr-industry-guide.pdf)
- **Spam Act 2003, inferred consent via conspicuous publication.** All three conditions must hold. The address is publicly published (website or directory). There is no accompanying statement refusing commercial messages. The message relates directly to the recipient's business role. "Believing your product would benefit the recipient is not enough." In *Clarity1*, the court limited inferred consent to actual prior customers — [Mondaq](https://www.mondaq.com/australia/consumer-law/996226/spamming-and-the-spam-act); [Point On Partners](https://pointonpartners.com.au/spam-act/); [Osgoode/Clarity1](https://yorku.ca/osgoode/thecourt/?p=794); [EmailListValidation summary](https://emaillistvalidation.com/blog/conspicuously-published-address-rule-australian-spam-act/)
- **Call recording.**
  - **Federal:** a party to a conversation generally isn't "intercepting" it under the TIA Act.
  - **NSW** (Surveillance Devices Act 2007): recording a private conversation without all parties' consent is an offence, except where reasonably necessary to protect lawful interests (sources conflict on the label).
  - **Vic, WA, Tas, NT:** described as all-party.
  - **Qld, SA, ACT:** described as one-party (one source is inconsistent on Qld).
  - Publishing covert recordings can be an offence even where recording was lawful. Standard business advice is a clear recording notice to every party — [Sprintlaw NSW](https://sprintlaw.com.au/articles/is-it-legal-to-record-a-phone-call-in-nsw/); [Sprintlaw AU](https://www.sprintlaw.com.au/articles/is-it-illegal-to-record-a-phone-call-in-australia); [ThinkPickle](https://thinkpickle.com.au/blog/call-recording-laws-australia); [Mondaq](https://www.mondaq.com/australia/privacy-protection/1174364/is-it-legal-to-record-a-phone-call-in-australia)
- **Privacy Act ADM transparency (new APPs 1.7–1.9, from the Privacy and Other Legislation Amendment Act 2024).** It commences **10 December 2026**. It applies where a computer program makes or substantially supports a decision that could significantly affect an individual's rights or interests, using personal information. It is a privacy-policy disclosure, not a ban and not a right to human review. The OAIC is also running a privacy-policy compliance sweep — [G+T](https://www.gtlaw.com.au/insights/automated-decision-making-transparency-under-the-privacy-act); [Corrs](https://corrs.com.au/insights/automated-decision-making-preparing-for-the-new-transparency-obligation); [Lander & Rogers](https://landers.com.au/legal-insights-news/australian-privacy-law-update-what-app-entities-need-to-know-in-2026)
- **US TCPA.** FCC Declaratory Ruling FCC 24-17 (8 Feb 2024, CG Docket 23-362) confirms that AI-generated human-like voices are "artificial" voices under the TCPA. The existing restrictions apply, including the need for the called party's prior express consent for artificial or prerecorded voice calls to wireless numbers — [Hunton](https://huntonak.com/privacy-and-information-security-law/fcc-issues-declaratory-ruling-that-tcpa-applies-to-ai-generated-voice-calls); [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2024/02/fcc-declares-authority-and-intent-to-regulate-ai-generated-calls-under-the-tcpa); [Womble Bond Dickinson](https://www.womblebonddickinson.com/us/insights/blogs/fcc-adopts-declaratory-ruling-confirming-ai-voice-calls-are-subject-tcpa-takes)
- In 2026 the FCC proposed per-call penalties to bolster caller KYC enforcement (FCC 26-27) — [FCC 26-27](https://docs.fcc.gov/public/attachments/FCC-26-27A1.pdf)

### Inferences
- **Is a "job lead" call telemarketing?** **[Background]** Under the DNCR Act, a "telemarketing call" includes calls offering, advertising or promoting goods, services, or business or investment opportunities. If the platform bills the provider per connected call, the outreach is promoting a paid lead-gen service, so treat it as telemarketing. **[Background]** The Telemarketing Standard applies to all telemarketing calls whether or not the number is on the DNCR. So calling hours, identification and CLI rules apply to calls to tradies even though most business numbers can't be registered.
  - **Consequence:** AI voice calls on Sundays, public holidays and outside 9–8 weekdays / 9–5 Saturdays need the provider's express consent. That collides with urgent "by 3pm today" jobs on weekends. Use SMS for cold first contact, and get standing express consent at provider onboarding, e.g. "text or call me with jobs 7am–7pm, 7 days".
- **DNCR washing.** Many sole-trader tradies use one mobile for personal and business use. Some will have registered it as personal. **[Background]** Washing numbers via the DNCR (a paid subscription) before cold voice calls, or calling only consented providers, avoids this risk.
- **Spam Act for SMS and email job cards.** **[Background]** The Spam Act covers SMS and email but not voice calls. Each message needs consent, accurate sender identification and a functional unsubscribe (e.g. "Reply STOP"). Inferred consent from a published listing is defensible only where the job matches the published trade (a painter listed online receiving a painting job) and the listing doesn't say "no marketing". Convert to express consent at the first reply ("Reply YES to get jobs like this").
- **AI disclosure.** **[Background]** Australia has no AI-specific statutory call-disclosure rule as of my knowledge. But the Standard's identification-and-purpose requirement, plus the Australian Consumer Law's ban on misleading or deceptive conduct (s18), make it prudent to disclose up front ("Hi, this is an automated assistant from [Brand]"). Never imply a human caller.
- **Recording.** The AI-to-provider call involves the platform as a party, so a recording notice at the start covers all-party states. The bridged consumer-to-provider call does NOT involve the platform as a speaker. **[Background]** Recording it without both parties' knowledge risks the federal TIA Act's interception offence as well as state law. At MVP, don't record bridged calls. Use call metadata (CDRs) as billing evidence instead.
- **Privacy Act exposure.** **[Background]** Passing a consumer's job details to providers for a fee may count as "trading in personal information". That would remove the small-business (<$3M turnover) exemption, so plan to comply with the APPs from day one. Masking the consumer's number helps here. With the ADM obligation from 10 Dec 2026, the privacy policy should disclose that provider selection and outreach are automated, since this arguably affects providers, who are sole traders and so individuals.
- **US later.** AI voice calls to tradies' mobiles need prior express consent, and prior express written consent if the call is a telemarketing call. **[Background]** Plan SMS-based opt-in, A2P 10DLC registration for US SMS and STIR/SHAKEN-attested numbers. Some states have their own AI or bot disclosure laws.

### Gaps
- I found no ACMA guidance specifically on whether a call offering a business a paid job lead is a "telemarketing call". This needs a short legal opinion.
- I didn't verify whether the Telemarketing Standard expressly applies to calls to business numbers. It's background knowledge, though the DNCR industry guide likely confirms it.
- I found no Australian guidance specific to AI-voice disclosure (ACMA or OAIC).
- I couldn't confirm the OAIC ADM guidance publication (expected around Sept 2026).
- I didn't look up current DNCR washing subscription prices.

---

## Q6. Cost model: estimated cost per fulfilled request

### Takeaway
At Twilio AU list prices plus a managed voice-AI platform, a fulfilled request with 3–8 short AI calls, SMS job cards and one 4–6 minute masked call costs roughly **$1.10 (lean) to $4.60 (heavy) USD**, with a typical case around **$2 USD**. Telephony to AU mobiles ($0.075/min) is a large share, so AI vendor choice matters less than call count and call length. A live warm-transfer bridge roughly doubles the cost of the final connection compared with a masked callback.

### Cited Findings (inputs)
- AU mobile termination is $0.0750/min (Twilio Programmable Voice) or $0.0710/min (Twilio SIP trunk). AU mobile numbers cost $6.50–8.25/month — [Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au); [Twilio SIP AU](https://www.twilio.com/en-us/sip-trunking/pricing/au)
- AU SMS is $0.0515 per outbound segment and $0.0075 inbound — [Twilio SMS AU](https://www.twilio.com/en-us/sms/pricing/au)
- Voice-AI platform per minute (excluding carrier where noted):
  - ElevenLabs $0.08 + LLM (~$0.0005–0.045) — [Macha](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained)
  - Retell $0.07–0.31 all-in — [eesel](https://eesel.ai/blog/retell-ai-pricing)
  - Vapi $0.09–0.14 all-in — [beri.net](https://www.beri.net/article/voice-ai-per-minute-pricing-vapi-retell-elevenlabs-bland-cost-per-resolved-call)
  - LiveKit default stack ~$0.067 — [usagepricing](https://usagepricing.com/blueprint/livekit)
  - Deepgram VA $0.075 Standard PAYG — [usagepricing](https://usagepricing.com/blueprint/deepgram)
  - gpt-realtime ~$0.18–0.24 (full) and ~$0.04–0.10 (mini) — [eesel](https://www.eesel.ai/blog/gpt-realtime-mini-pricing); [ecorpit](https://ecorpit.com/gpt-realtime-2-1-voice-agents-reasoning-cost-build-guide-2026/)
  - Telnyx ~$0.05–0.08 — [Telnyx](https://telnyx.com/pricing/voice-ai-agents.md)
- LiveKit bills per second with a 10 s minimum. Retell charges $0.005 per batch-dialled number — [LiveKit](https://livekit.com/blog/introducing-per-second-metering-for-livekit); [11x](https://www.11x.ai/guides/retell-ai-pricing)

### Inferences (worked estimates, USD; my arithmetic on the cited inputs)
Assumptions: an average AI outreach call is billed at about 1 minute (many go unanswered or hit voicemail; answered pitches run 45–90 s). SMS job cards are 2 segments. The masked callback runs 4–6 min on the consumer leg. The inbound provider → proxy leg is assumed ~$0.01/min (UNVERIFIED; see Gaps). LLM orchestration and matching text tokens add about $0.01–0.05 and are excluded.

| Scenario | AI calls | AI $/min + carrier $/min | AI call cost | SMS job cards | Masked call (consumer leg $0.075 + inbound ~$0.01) | **Total/request** |
|---|---|---|---|---|---|---|
| Lean (SMS wins, few calls) | 3 × 1 min | $0.08 + $0.075 = $0.155 | $0.47 | 3 × 2 seg × $0.0515 = $0.31 | 4 min × $0.085 = $0.34 | **≈ $1.12** |
| Typical | 5 × 1 min | $0.13 + $0.075 = $0.205 | $1.03 | 5 × 2 × $0.0515 = $0.52 | 5 min × $0.085 = $0.43 | **≈ $1.97** |
| Heavy (8 calls, premium S2S model) | 8 × 1.5 min | $0.20 + $0.075 = $0.275 | $3.30 | 8 × 2 × $0.0515 = $0.82 | 6 min × $0.085 = $0.51 | **≈ $4.63** |

- **Warm-transfer variant.** Replace the masked callback with a server-bridged call. That is two outbound mobile legs (provider + consumer) × 5 min × $0.075 = $0.75, plus ~0.5 min of AI time on the briefing/hold, versus ~$0.43 for the masked callback.
- **Fixed costs.** A number pool of 10–30 AU mobiles is ~$65–250/month. Managed-platform minimums, such as Bland at $299/month, would add fixed cost.
- **[Background]** Twilio generally bills voice per minute, rounded up, so 20 s unanswered attempts bill as full minutes on the carrier side. LiveKit's per-second AI metering doesn't change the carrier's rounding. Cheaper levers are scripted (non-LLM) pitch calls, SMS-first sequencing, and hanging up on voicemail detection rather than leaving long messages.
- **[Assumption]** With a provider fee per connected call of, say, AUD $10–30, these contact costs (~AUD $2–7 at roughly 1.5 AUD per USD) leave healthy margin. Unfulfilled requests still incur most of the outreach cost, so the fulfilment rate is the key unit-economics driver.

### Gaps
- I didn't find Twilio's inbound per-minute charge on AU mobile numbers or AMD per-call charges, so the masked-call inbound leg is assumed.
- I found no data on real average call durations or answer rates for tradie outreach. The scenario mix is assumption-driven until a pilot measures it.
- I didn't verify official OpenAI realtime per-minute costs.

---

## Q7. Recommendation: connection mechanic, voice platform, telephony provider and compliance guardrails

### Takeaway
1. **Mechanic.** Use SMS job card first (parallel to 3–5 providers), then AI voice call to non-responders, then a masked proxy callback. The provider rings an AU 04 proxy number that bridges to the consumer. Offer an optional "press 1 to connect now" live bridge for urgent jobs. Bill on proxy-leg call records.
2. **Voice.** Start with a managed platform: Retell AI for outbound features, or ElevenLabs Agents for flat pricing and AU voices. Choose after a 1–2 day bake-off on real AU mobiles. Keep masking and billing in your own Twilio code, and keep LiveKit Agents (TS) + OpenAI realtime-mini or Deepgram as the cost-down path.
3. **Telephony.** Use Twilio Programmable Voice and Messaging on ABN-registered AU mobile numbers. Build masking yourself, since Proxy is closed to new customers.
4. **Compliance.** Treat outreach as telemarketing and commercial messaging: disclose AI up front, respect calling hours unless consented, include STOP, cap frequency, don't record bridged calls, and keep a privacy policy with ADM disclosure by 10 Dec 2026.

### Cited Findings
- Twilio Proxy is closed to new customers, and Twilio recommends building masking with Programmable Voice/Conversations — [Twilio docs](https://www.twilio.com/docs/proxy/understanding-phone-number-management)
- Retell offers voicemail detection, IVR/DTMF navigation, warm transfer and batch outbound — [Retell](https://retellai.com/blog/best-voice-ai-providers). ElevenLabs offers batch calling with Twilio AMD — [ElevenLabs docs](https://elevenlabs.io/docs/agents-platform/phone-numbers/batch-calls) — at ~$0.08/min — [Macha](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained)
- Twilio publishes AU mobile termination at $0.075/min and SMS at $0.0515 per segment, and requires AU-address KYC for mobile numbers — [Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au); [Twilio SMS AU](https://www.twilio.com/en-us/sms/pricing/au); [Twilio AU regulatory](https://static0.twilio.com/en-us/guidelines/au/regulatory)
- Google's precedent: up-front automated-call disclosure, on-call and profile opt-out, and per-business call quotas — [Android Authority](https://androidauthority.com/google-search-ask-for-me-3521795); [CO/AI](https://getcoai.com/news/googles-latest-ai-feature-ask-for-me-will-call-local-businesses-for-you)
- Telemarketing Standard: calling hours, identification and purpose, end the call on request, and a returnable CLI for 30 days — [DNCR industry standards](https://www.donotcall.gov.au/industry/industry-overview/industry-standards)
- Spam Act inferred consent is narrow (role relevance) — [Mondaq](https://www.mondaq.com/australia/consumer-law/996226/spamming-and-the-spam-act)
- ADM transparency starts 10 Dec 2026 — [G+T](https://www.gtlaw.com.au/insights/automated-decision-making-transparency-under-the-privacy-act)

### Inferences
**Connection flow (MVP):**
1. Consumer texts the iMessage number (Linq). The agent structures the job (what, where, when-by) and confirms the consumer's callback window and consent to be called by a provider.
2. The matcher picks the top N providers. At the same moment, it sends an **SMS job card** from an AU 04 proxy number, along these lines: "[Brand]: Paid job near you – hang poster, Surry Hills, by 3pm today. Reply YES to call the customer now, NO to pass. Reply STOP to opt out."
3. After 2–3 minutes with no reply, an **AI voice call** goes to the next-best providers. The script opens: "Hi, this is an automated assistant calling from [Brand] about a paid job…". If AMD detects voicemail, hang up or leave a ≤15 s message pointing to the SMS. On an answered call, collect yes/no by voice or DTMF.
4. On the first YES:
   - **Default:** text the provider "Call [consumer first name] on 04xx xxx xxx (masked) within 15 min".
   - **Urgent opt-in:** "Press 1 to connect now" triggers a server-side bridge. The provider stays on the line while the system dials the consumer, using the proxy number as CLI.
   - Tell the consumer over iMessage who is calling and from which number. Send "job filled" texts to the other providers.
5. **Measure.** A Twilio status callback on the proxy → consumer leg records answered, duration and AnsweredBy. Mark billable if the call was human-answered and ≥ 30–60 s. Confirm with the consumer over iMessage, and allow provider disputes within X days.

**Platform choice:**
- Run a short bake-off between **Retell AI** and **ElevenLabs Agents** (both TS/REST-friendly, both work with Twilio numbers). Measure on 20–50 calls to real AU mobiles: AU voice naturalness, turn latency, AMD accuracy, and handling of tradie phone menus/IVRs.
- Reassess at scale: **LiveKit Agents (agents-js) + OpenAI realtime-mini or a Deepgram/Cartesia pipeline** cuts per-minute cost and bills per second.
- Avoid Bland (fixed $299/month floor) and Vapi's low default concurrency for parallel bursts at MVP.

**Telephony:**
- Use **Twilio** (AU mobile numbers, KYC via ABN business bundle, Programmable Voice for masking and bridging, Messaging for two-way SMS). A pool of ~10–30 numbers is enough at MVP.
- Evaluate **Telnyx** later for cost, given its bundled carrier + Voice AI.

**Compliance guardrails:**
1. Identify the brand and say it's an automated assistant in the first sentence. Never pretend to be human.
2. State the purpose (a paid job lead) and give a callable return number (CLI live for ≥30 days).
3. Treat cold voice outreach as telemarketing: weekdays 9am–8pm and Saturdays 9am–5pm only, no Sundays or national public holidays, unless the provider has given express consent. On Sundays and after hours, use SMS only to consented providers.
4. Capture **express consent and contact preferences** at the first positive reply, with the time stamp, channel and wording logged in Firestore. Prioritise opted-in providers in matching.
5. Every SMS and email identifies the sender and has a working opt-out ("Reply STOP"). Honour opt-outs across all channels immediately, including an on-call "don't call me" voice opt-out. Rely on conspicuous-publication consent only where the job matches the provider's published trade.
6. Frequency caps per provider (e.g. ≤3 cold contacts/week until opted in), modelled on Google's call quotas.
7. Optionally wash cold mobile numbers against the DNCR, or restrict cold voice calls to numbers clearly published as business lines.
8. Use only carrier-allocated numbers as CLI. Never spoof the consumer's or provider's number. Spread call volume across the pool to avoid "Suspicious Calling Pattern" labels.
9. Recording: announce it at the start of AI-to-provider calls if recording ("this call is recorded for quality"). Do not record bridged consumer–provider calls. Bill from call metadata.
10. Privacy: the consumer's real number is never disclosed without their consent, and the masked number expires after the job window. Publish an APP-compliant privacy policy covering automated provider selection and outreach before 10 Dec 2026. Assume the small-business exemption does not apply.
11. US expansion: get prior express (written, for telemarketing) consent before AI voice calls to mobiles, use 10DLC-registered SMS and STIR/SHAKEN-attested numbers, and check state AI-disclosure laws.

### Gaps
- A short Australian legal opinion is warranted on: (i) whether job-lead outreach is "telemarketing"; (ii) Spam Act inferred-consent limits for SMS to published tradie mobiles; (iii) recording and interception for masked calls. No primary regulator guidance on these specific questions was found.
- The platform recommendation rests partly on third-party pricing and feature summaries. Vendor pages couldn't be fetched, so re-check pricing on the vendor sites before committing.
- Real tradie answer and reply rates, and time-to-callback, are unknown and should be the first pilot metrics.
