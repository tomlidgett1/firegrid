# Stack Red Team: Challenging the Consolidated Tech Stack for the iMessage Callback Concierge (as of 18 Oct 2026)

Method note for the report writer:
- I read all six earlier notes in this folder first, then ran exactly 45 web searches on 18 Oct 2026.
- All 4 WebFetch attempts failed with DNS errors: openai.com/api/pricing, vercel.com/changelog, docs.linqapp.com and apidog.com. So **every non-Anthropic fact below comes from search-result summaries**, not full pages. Vendor and official pages are labelled "official"; aggregators, blogs and competitor pages are labelled "third-party".
- **Anthropic model IDs, prices and API behaviour come from the `claude-api` skill** (Anthropic's bundled Claude API reference, model table cached 2026-10-06). This is cited as "Anthropic API reference (claude-api skill)", with the public docs URL alongside.
- Items marked **[Background, unverified]** are my prior knowledge (training to about June 2026) that I did not re-verify. They appear only in Inferences or Gaps.
- All prices are USD unless stated. Where AUD is shown I used the earlier notes' assumption of A$1 = US$0.65.
- **Status labels used in this note:**
  - "Keep" means the earlier notes' choice survives.
  - "Replace" means a better-evidenced option exists today.
  - "Defer" means correct eventually but not in the first 3–6 months.

---

## 1. What single stack do the six notes jointly imply, and where do they contradict each other?

### Takeaway
The six notes converge on one architecture:
- A Linq iMessage line plus an Australian 04 two-way SMS number as the consumer front door.
- Next.js webhooks on Vercel.
- One durable workflow run per job, with the AI SDK and a cheap/strong two-model split.
- Google Places plus your own opted-in provider roster for discovery.
- An outreach ladder: SMS job card first, an AI voice call to non-responders, then a masked proxy callback built on Twilio Programmable Voice.
- Postgres as the system of record, Langfuse/Braintrust for tracing and evals, and a founder console with takeover.

They contradict each other on eight points that matter:
1. OpenAI model names and prices.
2. Whether Vercel Workflow is GA.
3. Firestore vs Postgres.
4. Inngest vs Vercel Workflow.
5. The cost of the masked-call inbound leg.
6. Pool sizing.
7. Whether MCP is worth adopting now.
8. Per-request cost.

### Cited Findings
- **Front door.** Linq iMessage first (confirm +61 lines), plus a dedicated AU virtual mobile number for two-way SMS. Apple Messages for Business is the sanctioned migration path. Skip RCS in AU. Keep a channel-agnostic `Channel` interface — [messaging_front_door.md](./messaging_front_door.md)
- **Outreach and connection.**
  - SMS job card to 3–5 providers, then an AI voice call after 2–3 min, then a masked callback through an AU 04 proxy number on Twilio Programmable Voice, because Twilio Proxy is closed to new customers.
  - Optional "press 1" live bridge.
  - Billing comes from call records (CDRs).
  - Voice bake-off between Retell and ElevenLabs Agents, with LiveKit Agents (TS) as the cost-down path.
  - Pool of 10–30 AU mobile numbers.
  - Cost estimate $1.12–$4.63 per request.
  - Source: [outbound_voice_telephony.md](./outbound_voice_telephony.md)
- **Brain.**
  - Inngest as the primary durable engine; Vercel Workflow if all-in on Vercel, though its GA was unconfirmed.
  - Vercel AI SDK v6/v7.
  - Claude Haiku 5.5 for triage, Claude Sonnet 5.5 for dispatch, with OpenAI alternatives GPT-5.4 mini / GPT-5.5.
  - Supabase Postgres, Langfuse or Braintrust.
  - Brain cost $0.15–0.70 per job.
  - Source: [agent_runtime_orchestration.md](./agent_runtime_orchestration.md)
- **Frontier challenge note.**
  - Keep Linq. Haiku 5.5 / "GPT-6 Luna" for triage, Sonnet 5.5 / "GPT-6.1 Sol" for dispatch.
  - Inngest, or Vercel Workflow "once stable" (described as Beta).
  - **Keep Firestore for v1.**
  - Cascade voice by default.
  - MCP "worth using internally".
  - Coval/Hamming/Evalion for voice simulation.
  - Source: [frontier_stack_challenge.md](./frontier_stack_challenge.md)
- **Supply side.**
  - Discovery stores Places `place_id` only.
  - Verification via ABN Lookup and the NSW Trades API.
  - Express consent captured at onboarding.
  - Source: [supply_side_australia.md](./supply_side_australia.md)
- **Liquidity.** About A$6.30–6.70 cost per request early and about A$1.90–2.15 at scale, including founder ops time. The provider pays A$15–35 per connected call — [liquidity_gtm_competitors.md](./liquidity_gtm_competitors.md)

### Inferences

**(1) Consolidated stack as implied by the notes (before red-teaming)**

| Layer | Implied choice |
|---|---|
| Consumer channel | Linq iMessage line (ideally +61); contact card pushed on first contact; Apple MfB later; WhatsApp later |
| SMS fallback and provider SMS | Twilio AU 04 mobile number(s), two-way |
| Ingress / hosting | Next.js route handlers on Vercel; HMAC verification; idempotency on event IDs |
| Durable orchestration | Inngest (one run per job; `waitForEvent` + timeout; `cancelOn`), alt. Vercel Workflow |
| LLM layer | Vercel AI SDK (structured outputs, tools); MCP optional |
| Models | Haiku 5.5 (triage/parsing) + Sonnet 5.5 (dispatch/copy); OpenAI alternatives "GPT-5.4 mini / GPT-5.5" or "GPT-6 Luna / GPT-6.1 Sol" |
| Discovery | Own provider DB → Google Places (New) Text Search (store `place_id` only) → Parallel/Brave/Exa web search; ABN + NSW Trades API checks |
| Provider outreach | SMS job card → AI voice call (Retell or ElevenLabs Agents, Twilio numbers, AMD) → first YES |
| Connection | Self-built masking on Twilio Programmable Voice, 10–30 AU mobile proxy pool, optional live bridge, CDR-based billing |
| Data | Supabase Postgres (`users`, `jobs`, `job_events`, `providers`, `outreach_attempts`, `provider_stats`), or Firestore (frontier note) |
| Ops console | Next.js admin: live job board, takeover, approvals |
| Observability / evals | Langfuse or Braintrust; golden set in CI; Coval/Hamming/Evalion voice simulation |
| Guardrails | Structured-output "no commitments" validator; founder-approval hook; per-job caps; calling-hours gate; consent ledger |

**(2) Contradictions to resolve (resolved in sections 2–9):**
1. OpenAI lineup: "GPT-5.4 mini / GPT-5.5" (agent note) vs "GPT-5.6 Sol" vs "GPT-6 Luna / GPT-6.1 Sol / Astra" (frontier note). Resolved in §2.
2. Vercel Workflow "beta / GA unconfirmed" (both notes). Resolved in §4: GA since mid-April 2026.
3. Firestore (frontier note) vs Supabase Postgres (agent note). Resolved in §5.
4. Inngest-first vs Vercel-Workflow-if-stable. Resolved in §4.
5. The provider→proxy inbound leg was assumed at ~$0.01/min (outbound note). Twilio's AU page shows ~$0.05/min on mobile numbers, which is corrected in §6.
6. "10–30 numbers" was one undifferentiated pool. It should be two pools with different sizing rules (§6).
7. MCP "worth using internally" (frontier) vs "not necessary for the MVP" (agent). Resolved in §8: defer.
8. Sonnet 5.5 cache read was described as "5% of base" (frontier) but listed at $0.20/MTok, which is 10% of $2. The claude-api skill gives $0.20, so it is 10% on Sonnet 5.5 and 5% on Opus 5.5. Minor.

### Gaps
- The notes never priced the full masked-call path with official AU inbound rates, or AI-call carrier rounding. That is addressed in §3, §6 and §11, but rounding remains unverified.

---

## 2. Models: what is OpenAI's actual lineup in October 2026, are its realtime/speech-to-speech models and SIP connector GA, and which models should do which job?

### Takeaway
**OpenAI's current generation is GPT-6.** "GPT-5.4 mini" and "GPT-5.5" are stale defaults, and "GPT-5.6 Sol" was superseded.
- GPT-6 Astra ($10/$50) launched on 3 Sep 2026; Bloomberg and The Verge are cited via Techmeme.
- GPT-6.1 Sol ($2/$10, `gpt-6.1-sol`) was announced at DevDay on 29 Sep 2026.
- GPT-6 Luna ($0.10/$0.50) is the cheap tier.
- The Sol and Luna prices come from several consistent secondary sources. OpenAI's pages were unreachable, so confidence is medium.

On voice:
- gpt-realtime-2.1 and 2.1-mini are token-priced and documented.
- GPT-Live-1 reached the API on 10 Sep 2026, according to the title of OpenAI's own announcement page. Its $0.05/min price is unverified.
- OpenAI's SIP connector is documented for routing calls *into* OpenAI. I found no official confirmation of OpenAI-originated outbound calls; outbound means your carrier dials and then bridges to OpenAI over SIP.

On Anthropic (authoritative via the skill): Haiku 5.5 is $0.10/$0.50, Sonnet 5.5 $2/$10, Opus 5.5 $4/$20 and Fable 5.1 $10/$50.

**Verdict:**
- Use **Claude Haiku 5.5 for almost everything** (triage, reply parsing, message drafting at low effort).
- Use **Sonnet 5.5 only for edge cases and user-facing copy that needs judgement**.
- Keep **GPT-6 Luna / GPT-6.1 Sol as the hot-standby second provider**.
- Don't put any realtime S2S model on the critical path in v1.

### Cited Findings
**OpenAI text models (secondary only; openai.com unreachable)**
- GPT-6 Astra was rolled out to business users in OpenAI's Daybreak program on 3 Sep 2026, priced at $10/1M input and $50/1M output. It is OpenAI's first model to cross the "critical" cybersecurity capability threshold — [Bloomberg Government](https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1); [Techmeme 4 Sep 2026](https://www.techmeme.com/260904/p9)
- GPT-6.1 Sol (`gpt-6.1-sol`) was released at DevDay on 29 Sep 2026 at $2/$10 per 1M tokens. It is pitched as near-Astra intelligence at one-fifth the price. Sources conflict on ChatGPT availability; its "Ultrafast" mode is "coming soon" — [Gizmodo Japan](https://www.gizmodo.jp/article/2609-gpt-6-1-sol-openai-devday-2026/); [Apidog DevDay 2026 recap](https://apidog.com/blog/openai-devday-2026/)
- GPT-6 Luna is $0.10 input / $0.50 output with cached input at $0.01 (third-party). One source says "GPT-6 Sol" was released on 22 Sep 2026 at $2/$10, replacing GPT-5.6 Sol — [eesel GPT-6 Luna pricing](https://www.eesel.ai/blog/gpt-6-luna-pricing); [eesel GPT-6 Astra pricing](https://www.eesel.ai/blog/gpt-6-astra-pricing); [LLM Gateway changelog](https://llmgateway.io/changelog/gpt-6-sol-luna)
- A 5 Oct 2026 capture of OpenAI's pricing page lists GPT-6 Astra $10/$50, GPT-6.1 Sol $2/$10, GPT-6 Luna $0.10/$0.50, GPT-Live-1 $0.05/min and GPT-Transcribe $0.0045/min. It says the GPT-5.6 lineup was replaced — [UsagePricing capture](https://www.usagepricing.com/blueprint/activity/openai-2026-10-05-gpt-6-api-launch) (via frontier note)
- Earlier generation (now superseded):
  - GPT-5.5 $5/$30; GPT-5.4 mini $0.75/$4.50; GPT-5.4 nano marked deprecated — [OpenAI GPT-5.5 model page](https://developers.openai.com/api/docs/models/gpt-5.5); [GPT-5.4 nano](https://developers.openai.com/api/docs/models/gpt-5.4-nano) (via agent note)
  - GPT-5.6 Luna had an 80% price cut in late July 2026 — [BleepingComputer](https://bleepingcomputer.com/news/artificial-intelligence/openai-says-its-new-gpt-56-models-are-becoming-more-cost-efficient) (via frontier note)

**OpenAI realtime / voice (secondary only)**
- gpt-realtime-2.1 (token-priced, captured from OpenAI's pricing page on 2026-07-13):
  - Full model: audio in $32/1M ($0.40 cached), audio out $64/1M, text in $4, text out $24.
  - Mini: audio in $10/1M, audio out $20/1M.
  - Per-minute prices exist only for gpt-realtime-whisper ($0.017/min) and gpt-realtime-translate ($0.034/min).
  - Source: [aireiter realtime pricing](https://aireiter.com/blog/openai-realtime-api-pricing)
- gpt-realtime-mini works out to roughly $0.06–0.10/min — [eesel](https://www.eesel.ai/blog/gpt-realtime-mini-pricing) (via outbound note)
- **GPT-Live-1:**
  - Launched in ChatGPT on 8 Jul 2026 as a full-duplex model that delegates reasoning to a text model — [TechCrunch](https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/) (via frontier note)
  - OpenAI's announcement page "Introducing GPT-Live-1 in the API" is dated 10 Sep 2026 — [OpenAI](https://openai.com/index/introducing-gpt-live-1-in-the-api/) (search snippet)
  - Third parties call it GA at $0.05/min. Another says the official page showed no per-minute price — [llmreference](https://www.llmreference.com/model/gpt-live-1); [tokencost](https://tokencost.app/blog/gpt-live-1-api-pricing-per-minute); contradicted by [aireiter](https://aireiter.com/blog/gpt-live-1-api-pricing-status)
- **SIP:**
  - OpenAI's voice SIP guide documents incoming calls: an incoming-call webhook, with your trunk routed to the project — [OpenAI voice SIP guide](https://developers.openai.com/api/docs/guides/voice-sip) (via frontier note)
  - A Callr guide shows the endpoint `sip:<project-id>@sip.api.openai.com;transport=tls` for inbound routing only — [Callr](https://docs.callr.com/docs/connect-to-openai)
  - One blog says SIP reached GA in April 2026; another calls the native SIP endpoint beta and recommends a carrier bridge — [noqta](https://noqta.tn/en/blog/openai-gpt-realtime-voice-agents-sip-mcp-2026); contradicted by [Fora Soft](https://www.forasoft.com/blog/article/openai-realtime-api-webrtc-sip-websockets-integration)
  - A July 2026 commentary says the Realtime API "lets agents make and receive real phone calls", with no GA or outbound specifics — [aiskill.market](https://aiskill.market/blog/realtime-voice-sip-telephony-support-agents)
- **S2S vs cascade evidence** (via frontier note):
  - S2S agents completed 26–38% of tasks under noise and varied accents, versus 85% for a text agent — [JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html)
  - S2S tool calling is "edge cases still rough", and a streamed cascade reached 755 ms — [Future AGI](https://futureagi.com/blog/cascaded-voice-ai-vs-speech-to-speech-2026/)
  - Cascades are easier to evaluate because there is a native transcript — [Coval](https://coval.ai/blog/voice-ai-models-2026/)

**Google**
- `gemini-live-2.5-flash-native-audio` is GA but will be discontinued on 13 Dec 2026 (official) — [Vertex AI model page](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api)
- A third-party changelog says `gemini-3.1-flash-live-preview` replaced it on 19 May 2026 — [gsans/gemini-3-live-angular](https://github.com/gsans/gemini-3-live-angular). An uncorroborated site claims "Gemini 3.8 Live" launched 15 Sep 2026 — [mer.vin](https://mer.vin/news/gemini-3-8-live-adds-extended-thinking-to-real-time-multimodal-ai/)

**Anthropic (authoritative: Anthropic API reference via the claude-api skill, cached 2026-10-06; public docs [models overview](https://platform.claude.com/docs/en/about-claude/models/overview), [pricing](https://platform.claude.com/docs/en/about-claude/pricing))**
- Model IDs and prices per 1M tokens:

  | Model ID | Input / Output | Notes |
  |---|---|---|
  | `claude-haiku-5-5` | $0.10 / $0.50 | Prompts ≤100K; $0.50/$2.50 above |
  | `claude-sonnet-5-5` | $2 / $10 | Cache reads $0.20 |
  | `claude-opus-5-5` | $4 / $20 | Cache reads $0.20; default effort `medium` |
  | `claude-fable-5-1` | $10 / $50 | |

  All are 1M context, and Batch is 50% off.
- Haiku 5.5 cache hits are $0.01/MTok and batch is $0.05/$0.25 — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) (via frontier note's official fetch)
- **API behaviour that matters here** (Anthropic API reference, claude-api skill):
  - Opus 5.5 and Sonnet 5.5 return HTTP 400 on forced `tool_choice` (`any`/`tool`). Use `auto` + `strict: true` tools, or structured outputs (`output_config.format`).
  - Thinking can't be disabled on Opus 5.5.
  - Haiku 5.5 runs adaptive thinking by default with effort default `medium`, and `disabled` is allowed only at effort `high` or below.
  - The server-side refusal `fallbacks` parameter exists for Sonnet 5.5 / Opus 5.5.
- **Residency** (Anthropic API reference, claude-api skill): `inference_geo` accepts only `"us"` or `"global"`, so there is no Australian inference option on the first-party API.
- **Claude on Amazon Bedrock in Australia:**
  - Bedrock offers Australia cross-region inference that keeps processing within Australia (Sydney/Melbourne), launched for Sonnet 4.5 / Haiku 4.5 — [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-cross-region-inference-for-claude-sonnet-4-5-and-haiku-4-5-in-japan-and-australia/)
  - Anthropic's Bedrock page lists ap-southeast-2 with "Global, AU" profiles for Opus 4.7+ — [Claude in Amazon Bedrock](https://platform.claude.com/docs/build-with-claude/claude-in-amazon-bedrock)
- **OpenAI residency:** ChatGPT data residency lists Australia, while API residency for Australia is unconfirmed — [OpenAI Help](https://help.openai.com/en/articles/9903489)

### Inferences
- **Resolving the OpenAI naming conflict.** The notes captured different snapshots of a fast-moving lineup. The best-evidenced timeline is:
  1. GPT-5.5 (spring 2026) and GPT-5.4 mini.
  2. GPT-5.6 Sol/Terra/Luna (July 2026).
  3. GPT-6 Astra (3 Sep 2026; strongest evidence, Bloomberg).
  4. GPT-6 Sol/Luna (~22 Sep, secondary).
  5. GPT-6.1 Sol at DevDay (29 Sep).

  For budgeting, OpenAI's small tier is $0.10/$0.50 and its mid tier is $2/$10, matching Anthropic's Haiku 5.5 / Sonnet 5.5 exactly. **Price is not a differentiator between the two labs at these tiers**; schema reliability, latency and refusal behaviour are.
- **Challenge to the notes: the "strong model for dispatch" is mostly unnecessary.** Ranking providers should be a deterministic SQL score: smoothed response rate, time-to-call, distance, opt-in status and calling-hours eligibility. That is auditable and free. The LLM's real jobs are small:
  1. Extract `{trade, task, suburb, deadline, missing_fields}`.
  2. Parse provider replies (`yes/no/eta`).
  3. Draft one-line messages inside templates.
  4. Spot edge cases ("is this an emergency?", "out of scope").

  Haiku 5.5 at low effort covers 1–3. Route only flagged edge cases and the first user-facing confirmation to Sonnet 5.5. This cuts LLM spend to about $0.02–0.06 per job (§11), versus the notes' $0.15–0.70.
- **Latency for the first reply.** Apple's MfB guidance is a first reply within 5 s ([messaging note](./messaging_front_door.md)). Fire the Linq typing indicator and a tapback before any LLM call, and run triage on Haiku 5.5 with effort `low`. Thinking defaults on, so set effort explicitly.
- **Second provider.** Implement the triage and parse prompts against both Anthropic and OpenAI through the AI SDK, and run the golden set (§9) on both. Fail over on 5xx/429 or refusal.
- **Realtime voice models are not GA-grade evidence yet for this use.**
  - gpt-realtime-2.1 is mature and token-priced.
  - GPT-Live-1 is about 5 weeks old in the API, with a disputed price.
  - Outbound requires your carrier to originate and bridge into OpenAI SIP.
  - The S2S noise/accent collapse (JustCall) applies directly to tradies on job sites.
  - Treat S2S as a Phase-2 bake-off candidate, not a default (§3).
- **Do not build on Gemini Live 2.5 native audio** (dies 13 Dec 2026), nor on any `-preview` Live model on the critical path.
- **Residency.** First-party Claude and OpenAI API inference is US/global. If counsel later requires AU-resident inference, the realistic paths are:
  - Claude via Bedrock with an AU cross-region profile (verify that Haiku 5.5 / Sonnet 5.5 have AU profiles).
  - Azure OpenAI Australia East.

  For the MVP, disclose offshore processing under APP 8 rather than engineer residency.

### Gaps
- No official OpenAI page could be read. GPT-6.1 Sol and GPT-6 Luna prices, GPT-Live-1's price and GA label, and whether OpenAI SIP supports outbound origination all need checking on openai.com before budgeting.
- Whether Haiku 5.5 / Sonnet 5.5 are offered on Bedrock with an AU-only inference profile: not confirmed.
- No head-to-head eval of Haiku 5.5 vs GPT-6 Luna on structured extraction of Australian slang was found.

---

## 3. Voice: cascaded vs speech-to-speech for short outbound calls to busy tradies; which platform to start with and which to migrate to; true all-in per-minute cost

### Takeaway
On Australian mobiles the **carrier leg ($0.058–0.10/min) is roughly half of every option's cost**. Retell, ElevenLabs Agents, Twilio ConversationRelay, LiveKit, Deepgram Voice Agent and OpenAI realtime-mini all land at about **$0.13–0.20 per minute all-in**. So choose on outbound features and reliability, not on platform price.

**Verdict:**
- **Start (v1): Retell**, running a near-scripted flow on your own Twilio AU numbers via SIP. It has the most complete outbound toolkit (batch, AMD, IVR/DTMF, warm transfer) and published AU telephony.
- **A/B it against a plain Twilio scripted call** (pre-generated AU-voice clip + "press 1 to take the job"). That costs about $0.075/min and is deterministic and noise-proof. If acceptance rates are equal, keep the scripted call.
- **Migrate (Phase 2, >~20k AI minutes/month) to one of:**
  - **Twilio ConversationRelay**: TypeScript WebSocket, your own LLM, same carrier.
  - **LiveKit Agents (Node)**, once its Node SDK leaves beta.
- **Speech-to-speech** (gpt-realtime-2.1-mini / GPT-Live-1) only if it wins a noisy-AU-call bake-off on task completion.
- **Pipecat is Python**: skip for a TS founder.

### Cited Findings
**Retell**
- Retell's infrastructure is $0.055/min. Third-party voices (Cartesia, MiniMax, ElevenLabs) add $0.015/min. The LLM is billed separately, e.g. GPT-5 mini at $0.012/min — [Retell pricing (official)](https://www.retellai.com/pricing); [Macha Retell](https://www.getmacha.com/blog/retell-ai-pricing-explained)
- Retell's international-call docs list a Twilio-based **Australia outbound rate of $0.10/min**, against $0.015/min for US numbers — [Retell docs: international calls (official)](https://docs.retellai.com/deploy/international-call)
- Retell features: batch outbound, voicemail detection, IVR/DTMF navigation, warm transfer — [Retell blog](https://retellai.com/blog/best-voice-ai-providers) (via outbound note). Batch dialling costs $0.005 per number; branded caller ID $0.10/call — [11x](https://www.11x.ai/guides/retell-ai-pricing) (via outbound note)

**ElevenLabs Agents**
- $0.08 per call minute on every plan. LLM billed on top ($0.0005/min for GPT-5 Nano up to $0.0446/min for GPT-5.5). Telephony is separate. Burst above concurrency is $0.16/min — [Macha (Sep 2026)](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained); [Dupple](https://dupple.com/learn/best-ai-voice-agents)
- Batch calling uses Twilio's carrier AMD, which is "ignored for non-Twilio providers" — [ElevenLabs docs (official)](https://elevenlabs.io/docs/agents-platform/phone-numbers/batch-calls) (via outbound note)

**Twilio ConversationRelay**
- $0.07/min list price, separate from voice charges. Your app supplies the LLM over WebSocket — [Twilio Conversations pricing (official)](https://twilio.com/en-us/products/conversational-ai/pricing); [superdupr](https://superdupr.com/blog/twilio-pricing.md); [RyWalker research](https://rywalker.com/research/twilio-conversation-relay)
- One analysis says Twilio's Conversations layer reached GA on 6 May 2026. ConversationRelay's own GA date was not confirmed — [UsagePricing](https://www.usagepricing.com/blueprint/activity/twilio-2026-05-06-launch)

**LiveKit Agents (Node/TS)**
- LiveKit's outbound flow is to set up an outbound trunk, dispatch an agent, then create a SIP participant. Official examples are in Python — [LiveKit outbound calls (official)](https://docs.livekit.io/telephony/making-calls/outbound-calls)
- A Node fork describes the Node SDK as beta. A comparison says the Node plugin list is much shorter than Python's — [agents-js fork](https://github.com/ServOps117/agents-js); [Micdrop](https://micdrop.dev/blog/alternative-to-livekit-agents)
- LiveKit bills agent sessions and SIP per second with a 10 s minimum — [LiveKit blog (official)](https://livekit.com/blog/introducing-per-second-metering-for-livekit). LiveKit's estimate for its default cascade is about $0.0672/min — [UsagePricing](https://usagepricing.com/blueprint/livekit) (both via outbound note)

**Pipecat**
- Pipecat Cloud is $0.01 per agent-minute (0.5 vCPU) with STT/LLM/TTS and telephony extra. Smart Turn v3.2 turn detection is open source — [Daily: Pipecat Cloud pricing (official)](https://www.daily.co/pricing/pipecat-cloud); [RyWalker](https://rywalker.com/research/pipecat)

**Cascade components (new in 2026)**
- Deepgram Flux Multilingual went GA on 29 Apr 2026: 10 languages with mid-call code-switching. No Australian-English accuracy figures are published — [Deepgram press release (official)](https://deepgram.com/learn/deepgram-launches-flux-multilingual-press-release)
- Deepgram Flux TTS went GA on 12 Aug 2026 with 36 English voices, **including Australian accents** — [Deepgram changelog (official)](https://developers.deepgram.com/changelog/2026/8/12)
- The Deepgram Voice Agent API is $0.075/min Standard PAYG — [UsagePricing](https://usagepricing.com/blueprint/deepgram) (via outbound note). Cartesia Ink-2 STT is English-only — [Cartesia changelog](https://docs.cartesia.ai/changelog) (via frontier note)

**Vapi**
- $0.05/min covers orchestration only, about $0.13–0.30/min all-in. The default concurrency is 10 lines — [Zeeg](https://zeeg.me/en/blog/post/vapi-ai-pricing); [Macha Vapi](https://www.getmacha.com/blog/vapi-ai-pricing-explained) (via notes)

**Carrier legs to AU mobiles**

| Carrier route | $/min | Source |
|---|---|---|
| Twilio Programmable Voice | $0.0750 | [Twilio AU (official)](https://www.twilio.com/en-us/voice/pricing/au) (via outbound note) |
| Twilio SIP Trunking | $0.0710 | [Twilio SIP AU (official)](https://www.twilio.com/en-us/sip-trunking/pricing/au) (via outbound note) |
| Plivo Voice API | $0.0730 | [Plivo AU voice (official)](https://www.plivo.com/voice/pricing/au/) |
| Plivo SIP Trunking (May 2026) | $0.0580 | [Plivo AU SIP (official)](https://www.plivo.com/sip-trunking/pricing/au/) |

### Inferences

**All-in cost per connected minute to an AU mobile (USD; my arithmetic on the cited inputs)**

| Option | Platform/AI | Carrier | All-in ≈ | Notes |
|---|---|---|---|---|
| Scripted call: Twilio `<Play>` AU-voice clip + DTMF `<Gather>` | $0 (pre-generated TTS) | $0.075 | **$0.075** | Deterministic; noise-proof; no hallucination; speech-input Gather adds an unverified per-15 s fee |
| Retell (Retell-resold Twilio AU) | $0.055 + $0.015 voice + ~$0.012 LLM | $0.10 | **~$0.18** | Retell doc rate may be stale |
| Retell with BYO Twilio SIP trunk | $0.082 | $0.071 | **~$0.15** | Keeps numbers and CDRs in your Twilio |
| ElevenLabs Agents + Twilio | $0.08 + $0.001–0.045 LLM | $0.075 | **~$0.16–0.20** (burst $0.24+) | Best-marketed AU voices; AMD only on Twilio numbers |
| Twilio ConversationRelay + Haiku 5.5 | $0.07 + ~$0.002 | $0.075 | **~$0.15** | TS WebSocket server needed (not on Vercel Functions, [Background, unverified]) |
| LiveKit Cloud cascade (default stack) + Twilio SIP | ~$0.067 | $0.071 | **~$0.14** | Per-second AI billing; Node SDK beta |
| Deepgram Voice Agent Standard + SIP | $0.075 | $0.071 | **~$0.15** | Flux STT + Flux TTS AU voices in one vendor |
| OpenAI gpt-realtime-2.1-mini via SIP | ~$0.06–0.10 | $0.071 | **~$0.13–0.17** | S2S noise risk; outbound via carrier bridge |
| OpenAI GPT-Live-1 via SIP | $0.05 (unverified) + backend tokens | $0.071 | **~$0.13+** | 5 weeks old in API |

- **Cascade vs S2S for this call.** The call is about 30–60 s:
  - Disclosure, then "paid job, Surry Hills, hang a poster by 3pm, can you call the customer in the next 15 min? Press 1 or say yes", then end.
  - That needs about 2 tools and no open conversation.
  - The risk is noise (job sites, utes, speakerphone) and AI receptionists. S2S collapses there, and cascades and DTMF are evaluable.
  - So v1 should be scripted or cascade, and **S2S stays a bake-off candidate only**.
- **Why Retell first, not ElevenLabs.**
  - Both can use ElevenLabs-grade voices; Retell resells them at +$0.015/min. So the AU-accent argument for ElevenLabs is weaker than the notes imply.
  - Retell has the richer outbound toolkit: per-dial batch analytics, IVR navigation for trade businesses with phone menus, and warm transfer for the "press 1 to connect now" live bridge.
  - Its AU telephony rate is published.
  - **Run ElevenLabs as the challenger in the bake-off.** If its AU voice wins on hang-up rate, switch; the call script is tiny.
- **The scripted-call challenge (biggest simplification).** For a yes/no job offer, a conversational agent adds cost, latency, hallucination risk and eval burden. Recommended design:
  1. Pre-generate the pitch per job with one TTS call (Deepgram Flux TTS AU voice or ElevenLabs).
  2. `<Play>` it, then `<Gather input="dtmf">`.
  3. On "1", send the masked number by SMS.
  4. On no input, leave a ≤15 s voicemail pointing to the SMS.

  This is buildable in a day on Twilio and costs about half of a managed agent. Keep Retell for the A/B arm and for questions ("where is it?" "how big?"). The conversational path is only worth it if data show tradies ask questions before accepting.
- **Migration path.**
  - Wrap every vendor behind your own `placeOutreachCall(jobBrief, provider)` interface that returns a normalised outcome (`accepted | declined | voicemail | ai_receptionist | no_answer`, transcript, duration, cost).
  - At volume, move to ConversationRelay, which keeps carrier, AMD, masking and CDRs in one Twilio account and gives full TS/LLM control. Alternatively move to LiveKit Agents (Node) once it is out of beta.
  - Saving is about $0.03–0.05/min. At 30k AI min/month that is about $900–1,500/month, enough to justify the engineering only in Phase 2.
- **Avoid in v1:**
  - **Vapi**: the low default concurrency (10) and orchestration-only pricing hide the true cost of parallel fan-out.
  - **Bland**: $299/month floor.
  - **Pipecat**: Python.
  - **Cloudflare voice**: experimental (frontier note).

### Gaps
- Billing granularity (per-second vs per-minute rounding) for Retell's resold telephony and for Twilio AU calls was not verified. Twilio has historically rounded up per minute ([Background, unverified]), which makes 20 s unanswered attempts cost a full minute.
- The Twilio speech-recognition `<Gather>` price was not checked.
- There is no independent Australian-accent naturalness or AMD-accuracy test for any vendor. This needs a 50-call bake-off on real AU mobiles.
- Whether Retell's $0.10/min AU rate is current is unknown (docs page undated).
- The LiveKit Node SDK's current version and outbound-SIP parity with Python were not confirmed.

---

## 4. Durable workflows: Inngest vs Vercel Workflow vs Trigger.dev vs Restate vs Cloudflare vs Temporal for a TypeScript solo founder on Vercel

### Takeaway
**The notes are stale here: Vercel Workflow reached GA in mid-April 2026.** It had passed 100M+ processed runs during beta, and GA added TypeScript support, step-data encryption, hooks, sleep and a self-hosting "Worlds" adapter. AI SDK 7 ships a `WorkflowAgent` that runs inside it.

The founder is already on Vercel and per-job cost is a fraction of a cent everywhere, so **the verdict flips: default to Vercel Workflow** (one fewer vendor, native AI SDK integration).

**Keep Inngest as the documented alternative** if you need built-in cross-run flow control: per-provider throttles and concurrency keys, and event-match waits. Inngest Pro is $99/month (third-party).

**Reject:**
- Temporal: $25/M actions plus plan minimums and determinism overhead.
- Restate: young; tiers from a single source.
- Cloudflare: requires leaving Vercel.

Trigger.dev is a credible third option: waits over 5 s are not billed.

### Cited Findings
- **Vercel Workflow GA:**
  - Vercel's community weekly for 10–17 Apr 2026 lists Workflows GA as a top highlight — [Vercel Community weekly](https://community.vercel.com/t/vercel-weekly-2026-04-20/38580)
  - A Dutch outlet (23 Apr 2026) says the beta launched in Oct 2025 and passed 100 million runs — [Dutch IT Channel](https://www.dutchitchannel.nl/news/730354/vercel-workflows-nu-officieel-beschikbaar)
  - An aggregator says GA includes TypeScript support (Python SDK beta), AI SDK durable-agent integration, step-data encryption, hooks for external events, sleep, and a "Worlds" adapter for self-hosting — [CreateWith](https://www.createwith.com/tool/vercel/updates/vercel-workflows-reaches-general-availability-for-long-running-processes)
  - The Workflow SDK 5 beta (June 2026) added in-flight cancellation via AbortSignal — [releases.sh](https://releases.sh/vercel/vercel.md)
  - **Contradicts:** the frontier note's "available in Beta" came from a docs page last updated 1 Dec 2025 — [Vercel docs](https://vercel.com/docs/workflow)
- **Vercel Workflow pricing (official):** $0.02 per 1K events, about 3 events per step. Hobby includes 50K events/month. Max 10,000 steps per run. Data written and retained at $0.50/GB — [Vercel Workflow pricing](https://vercel.com/docs/workflows/pricing) (via agent note)
- **AI SDK 7 `WorkflowAgent`:** "a durable, resumable AI agent for use inside a workflow" that survives restarts and pauses for human approval. Tools can be workflow steps with automatic retries — [AI SDK workflow reference (official)](https://ai-sdk.dev/docs/reference/ai-sdk-workflow); [ai@7.0.22 docs](https://app.unpkg.com/ai@7.0.22/files/docs/07-reference/04-ai-sdk-workflow/01-workflow-agent.mdx); [Vercel blog](https://vercel.com/blog)
- **Inngest:**
  - Pro $99/month for 1M executions, 100 concurrent steps and 5 GB traces; overage $50 per 1M. Free up to 50K executions. Metered per step. An older figure of $75 conflicts — [AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/); [BudgetForge](https://www.budgetforge.dev/tools/inngest-pricing-2026)
  - One analyst cites a 1,000-step cap per run and an SSPL server licence — [beri.net](https://www.beri.net/article/temporal-vs-inngest-vs-restate-vs-dbos-durable-execution-agent-cost) (via frontier note)
- **Trigger.dev:**
  - The official pricing page says waits longer than 5 s are checkpointed and "do not count towards compute usage". Per-run fee $0.000025 — [Trigger.dev pricing (official)](https://trigger.dev/pricing)
  - Hobby $10 and Pro $50 plans (third-party) — [UsagePricing](https://www.usagepricing.com/blueprint/activity/trigger-dev-2026-09-11-realtime-connection-limits-raised)
- **Restate Cloud:**
  - Reported tiers: Free 50K actions/month, Starter $75 for 5M, Business $300 for 20M; overage $25/M (single third-party source, July 2026) — [DevTune](https://devtune.ai/verticals/workflow-orchestration-and-durable-execution/restate/pricing)
  - $20M Series A (Sept 2026) — [FourWeekMBA](https://fourweekmba.com/ai-restate-series-a-durable-execution-price/)
- **Temporal Cloud:** 1M actions = $25 plus storage; $1,000 free credits; plan minimums vary across Temporal pages — [Temporal pricing (official)](https://temporal.io/pricing.md); [AutomationAtlas](https://automationatlas.io/guides/temporal-cloud-pricing-changes-2026/)
- **Cloudflare Workflows:** 500K steps included in Workers Paid, then $0.80 per 100K (third-party) — [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/). The Agents SDK "Think" layer is experimental — [Cloudflare blog](https://blog.cloudflare.com/project-think/) (via agent note)

### Inferences

| Engine | Fit for "fan out to 3–5 providers, wait ≤20 min for first YES, escalate" | Cost per ~40-step job | Verdict |
|---|---|---|---|
| **Vercel Workflow (GA)** | `createWebhook`/`defineHook` keyed `job:{id}` + `Promise.race([hook, sleep("3m")])`; runs on the same Vercel project; AI SDK 7 native | ~120 events ≈ **$0.0024** (Hobby includes ~400 jobs/month) | **Primary** |
| Inngest | `step.waitForEvent` with match expression + timeout, `cancelOn`; native throttle/concurrency keys ([Background, unverified] API names) | ~$0.002–0.004; free to ~1,250 jobs/month | **Alternative**; pick if you want engine-level per-provider throttling or to leave Vercel |
| Trigger.dev v4 | Waitpoint tokens; waits >5 s free; runs on Trigger's compute | cents per month at MVP | Viable; adds a second compute plane |
| Restate | Strong semantics; youngest; BSL | Free tier 50K actions | Defer |
| Cloudflare Workflows / Durable Objects | Elegant per-job DO + SQL | Low | Reject (platform switch) |
| Temporal | Best-in-class signals and timers; determinism rules | $25/M + minimums | Reject until a team exists |

- **Why the verdict flips.** Both notes chose Inngest primarily because Vercel Workflow's GA was unconfirmed. With GA confirmed (two independent secondary sources plus Vercel's community digest), the deciding factors are:
  - One vendor and one dashboard.
  - Durable state co-located with the webhooks.
  - The `WorkflowAgent` path if the intake conversation ever needs an open-ended loop.
  - A self-host escape hatch via "Worlds".
- **Cross-job flow control** ("don't text the same tradie three jobs in five minutes"; "max 1 AI call per provider per hour") belongs in Postgres anyway: a `provider_contact_log` table plus a check in the outreach step. So engine-level throttles are a nice-to-have, not a reason to add Inngest.
- **Pattern** (keep the LLM inside steps, not the other way round):
  1. `triage`
  2. `clarify` (hook wait ≤2 h)
  3. `discover`
  4. `fanout` (parallel SMS steps)
  5. `race(firstYes, sleep 3m)`
  6. `escalate` (AI/scripted calls)
  7. `race(firstYes, sleep 10m)`
  8. `connect` (create masking session)
  9. `notify`
  10. `confirm` (hook ≤2 h)
  11. `close`

  `cancel` and `takeover` hooks abort the run.

### Gaps
- Vercel's own GA changelog could not be fetched; GA rests on Vercel's community digest plus two secondary outlets.
- Vercel Workflow's maximum sleep/hook lifetime, its native per-key concurrency controls, and where step data is stored (US vs AU region) are unverified.
- Inngest's official pricing page was not reachable.

---

## 5. Data: Supabase Postgres vs Firestore (founder knows Firebase): relational queries, RLS, realtime ops console, AU residency, cost

### Takeaway
**Keep the agent note's choice: Supabase Postgres in the Sydney region (Pro $25/month).** Reject the frontier note's "keep Firestore".
- The core workload is relational and analytical. Provider ranking, response-rate aggregates by trade × suburb × hour, an append-only `job_events` ledger, billing reconciliation against CDRs, and PostGIS distance are all SQL-shaped.
- The backend is on Vercel rather than Firebase Functions, so Firestore's main ergonomic advantage (triggers plus security rules on client reads) barely applies.
- The ops console is a single-operator app, where Supabase Realtime + RLS covers what Firestore listeners would.

**Firebase Data Connect** (GA April 2025; managed Cloud SQL Postgres inside Firebase) is the "stay with Google" Postgres option the notes missed. It is viable, but its GraphQL-first model adds a layer for no benefit here.

### Cited Findings
- **Supabase Pro:**
  - $25/month (checked 16 Jul 2026), including an 8 GB database, 100K MAU, 100 GB storage and 250 GB egress.
  - A $10 compute credit covers one Micro instance.
  - Usage-based overage, with a spend cap on by default.
  - Sources conflict on whether $25 is per org or per project; one says extra projects are $10/month.
  - [Jet Admin](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/); [Schematic](https://schematichq.com/blog/supabase-pricing); [FocusReactive](https://focusreactive.com/blog/supabase-price/)
- **Firebase Data Connect:**
  - GA in April 2025.
  - The first 250K operations/month are free on Blaze, then $4 per million.
  - Cloud SQL is billed separately: a 3-month no-cost trial, then from $9.37/month.
  - [Firebase blog: GA](https://firebase.blog/posts/2025/04/dataconnect-general-availability); [Firebase Data Connect pricing (official)](https://firebase.google.com/docs/data-connect/pricing); [Firebase blog: post-GA pricing](https://firebase.blog/posts/2025/04/dataconnect-pricing-postga)
- **Vercel Workflow state** is billed at $0.50/GB written and $0.50/GB-month retained, so it is not a place for long-term profiles — [Vercel Workflow pricing](https://vercel.com/docs/workflows/pricing) (via agent note)

### Inferences
- **Schema** (from the agent note, kept): `users`, `jobs`, `job_events` (append-only), `providers`, `outreach_attempts`, `provider_stats` (materialised view). Add:
  - `consents`: channel, wording, timestamp, source, and calling-hours preferences, for Spam Act / Telemarketing Standard evidence.
  - `masking_sessions`: proxy number, participant A, participant B, `expires_at`.
  - `cdrs`: Twilio call SID, legs, durations, `AnsweredBy`, cost.
  - `cost_ledger`: per job, per vendor line.
- **RLS:** turn it on for every table. The Next.js server uses the service role, and the console uses a single operator role.
- **Realtime console:** subscribe to `jobs` and `job_events` changes for the live board.
- **Residency.** Supabase offers an AWS Sydney (ap-southeast-2) region, and Firestore and Cloud SQL offer australia-southeast1 ([Background, unverified] for both). Either keeps the system of record in Australia. But:
  - LLM calls (first-party Anthropic/OpenAI), Linq, Vercel Workflow step data and the voice vendor are offshore.
  - So residency is partial whatever the database. Design for APP 8 disclosure and minimise PII in prompts: first name and suburb only, never full addresses.
- **Firestore is still acceptable** if the founder wants to ship in days. But each new ranking signal becomes a hand-maintained counter document, and month-2 analytics will push a migration anyway.
- **Cost:** about $25–60/month through Phase 1. Database cost is immaterial against messaging and voice.

### Gaps
- I couldn't confirm Supabase Sydney-region pricing parity or current Firestore per-operation prices this session.
- Firebase Data Connect's suitability for server-side bulk analytics was not assessed.

---

## 6. Masked calling in Australia after Twilio Proxy: how to build it, which carrier, and how big the number pools should be

### Takeaway
**Build masking yourself on Twilio Programmable Voice** (keep). Twilio Proxy is still "closed for new customers", with no published sunset date. Telnyx (AU mobile voice+SMS, masking use case) and Plivo (AU mobile termination $0.058–0.073/min) are Phase-2 cost options. Vonage's AU pricing could not be found.

The notes **under-costed the masked call**. Twilio's AU page lists **about $0.05/min to receive a call on a mobile number** (not the assumed $0.01), so a masked call through a mobile proxy costs about $0.125/min. Using **AU local (02) numbers as voice-only proxies** cuts the inbound leg to $0.01/min, about $0.085/min total.

**Size the two pools differently:**
- **Outreach pool** (04 mobiles for SMS job cards and AI-call caller ID): scales with daily outbound call volume, at roughly ≤50 AI calls per number per day in AU (a conservative reading of US 75–100/day heuristics), and is "sticky" per provider.
- **Proxy pool** (masked callbacks): scales only with the **maximum number of concurrent open jobs for any single participant**, per Twilio's own Proxy reuse rule. So 5–10 numbers suffice even at thousands of jobs per month.

Put the proxy numbers and the outreach number into the contact cards you push to consumers and providers. Telstra's FAQ says **saved contacts override its "Suspicious Calling Pattern" labels**, and iOS 26 call screening applies only to unknown numbers.

### Cited Findings
- **Twilio Proxy status (official):**
  - "Proxy Public Beta is currently closed for new customers… consider using Twilio Conversations and Programmable Voice directly." Beta, no SLA. No end-of-life date found — [Twilio Proxy docs](https://www.twilio.com/docs/proxy/understanding-phone-number-management) (via outbound note); [Twilio Proxy product page](https://www.twilio.com/proxy)
  - **Reuse rule:** "One single participant cannot be assigned to the same Proxy number in concurrently active sessions… One single proxy Identifier can be used in multiple active sessions, but by distinct participants." A participant in two concurrent sessions needs at least two numbers. Strict geo-matching increases pool size. Pools are capped at 5,000 reserved numbers — [Twilio: phone numbers needed](https://www.twilio.com/docs/proxy/phone-numbers-needed); [error 80208](https://www.twilio.com/docs/api/errors/80208); [error 80402](https://www.twilio.com/docs/api/errors/80402)
- **Twilio AU voice (official page via search):**
  - Receiving a call on a mobile number is $0.0500/min; on a local number $0.0100/min.
  - Monthly fees conflict on the same page: mobile is listed at $20.00/month in the receive table and $8.25/month in the number table; local is $3.00/month — [Twilio Voice pricing AU](https://www.twilio.com/en-us/voice/pricing/au)
  - Outbound to AU mobile $0.0750/min and SMS $0.0515 per segment — [Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au); [Twilio SMS AU](https://www.twilio.com/en-us/sms/pricing/au) (via outbound note)
- **Twilio AU KYC:**
  - New Scams Prevention Framework KYC obligations cover Twilio's AU local, mobile and toll-free numbers, with mobile and toll-free updates "toward the later end of May 2026"; the final requirements were described as pending — [Twilio KYC in Australia](https://support.twilio.com/hc/en-us/articles/49291010297883-Know-Your-Customer-KYC-in-Australia); [Twilio AU regulatory guidelines](https://www.twilio.com/en-us/guidelines/au/regulatory)
  - Bundle review takes up to 3 business days — [Twilio regulatory bundle docs](https://live.docs.dev.twilio.com/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle.md)
- **CLI rules:** calls to Telstra subscribers must present a provisioned Australian number, and Twilio-owned numbers are fine — [Twilio support: Telstra CLI](https://support.twilio.com/hc/en-us/articles/4407966601115-Telstra-Australian-Caller-ID-Restrictions-Reducing-Scam-Calls-Industry-Code)
- **Telstra Scam Protect:**
  - "Suspicious Calling Pattern" means high-volume incoming traffic from a single number. It is applied automatically — [EFTM](https://eftm.com/2025/03/telstra-introduces-new-scam-and-suspicious-call-alerts-directly-into-caller-id-260453); [Telstra Exchange](https://www.telstra.com.au/exchange/suspicious-phone-calls--what-telstra-is-doing-to-raise-the-alarm)
  - A mirrored Telstra FAQ says "contact information saved on the handset will override the warning messages" and that flagged numbers should contact support (third-party mirror) — [FAQ mirror](https://www.letsbemates.com.au/mate/wp-json/wp/v2/faq/25223)
- **Per-number heuristics (US vendor blogs, not carrier thresholds):**
  - Keep to about 75–80 calls per number per day (JustCall) or 75–100 (BatchDialer), and rotate numbers.
  - Mostly <10–15 s calls are a spam signal, and calling the same contact five times in two days looks like harassment.
  - Recycled numbers can arrive with prior labels.
  - [JustCall](https://justcall.io/blog/how-to-avoid-spam-likely-or-spam-tagged.html); [BatchDialer](https://batchdialer.com/blog/high-volume-outbound-calling-best-practices-and-caller-id-management); [Kixie](https://www.kixie.com/sales-blog/how-to-avoid-showing-up-as-scam-likely-in-outbound-sales/); [Commio](https://www.commio.com/?p=18383)
- **iOS 26 call screening:** "Screen Unknown Callers → Ask Reason for Calling" has a Siri voice ask non-contacts for their name and purpose, and shows a transcript. It is off by default. "Silence" sends unknown numbers to voicemail — [Euronews](https://euronews.com/next/2025/10/09/getting-too-many-spam-calls-new-iphone-ios-26-call-screen-feature-could-help); [Gulf News / AP](https://gulfnews.com/business/ap-one-tech-tip-iphone-call-screening-1.500300506)
- **Telnyx:**
  - Telnyx licenses AU numbers directly, and AU mobile numbers support two-way voice and SMS (release note from 2019) — [Telnyx release note](https://telnyx.com/release-notes/australian-mobile-voice-and-messaging-now-available); [Telnyx Australia](https://telnyx.com/solutions/australia-isdn-replacement)
  - Telnyx markets number masking — [Telnyx masking](https://telnyx.com/use-cases/phone-number-masking)
  - AU SMS is listed at $0.004 per part + carrier fee — [Telnyx AU messaging](https://telnyx.com/pricing/messaging/au)
  - AMD costs $0.002–0.0065 per call — [Telnyx Voice API pricing](https://telnyx.com/pricing/voice-api.md) (via frontier note)
- **Plivo:** AU mobile $0.0730/min (Voice API) and $0.0580/min (SIP trunking, May 2026) — [Plivo AU voice](https://www.plivo.com/voice/pricing/au/); [Plivo AU SIP](https://www.plivo.com/sip-trunking/pricing/au/)

### Inferences
**Build-it-yourself masking (about 150–250 lines of TS):**
1. When the first provider accepts, create a `masking_session(proxy_number, provider_e164, consumer_e164, job_id, expires_at = now + 24–72 h)`.
   - Choose the proxy number with the rule: neither participant already has an open session on it.
2. The Twilio inbound-call webhook on every proxy number looks up the open session by `(To = proxy, From = caller)`, returns `<Dial callerId="{proxy}">{other_party}</Dial>`, and adds a recording-free status callback.
3. Billing evidence comes from the child-leg status callback:
   - The consumer leg was answered by a human (`AnsweredBy=human`, with AMD on).
   - Duration was ≥30–60 s.
   - Store this in `cdrs`.
4. Expire sessions. A late call to an expired session plays "This job has closed. Text us at …".
5. The "press 1 to connect now" live bridge is the same session, server-initiated: `<Dial>` the consumer from the provider's live call.

**Number-pool sizing (rules, not guesses):**
- **Proxy pool** (masked callbacks; voice-only):
  - `N_proxy ≥ max_open_sessions_per_participant + 1`.
  - Cap any provider at, say, 5 concurrent open jobs and give consumers at most 2 concurrent jobs, so N = 6–8 numbers covers the whole city.
  - Because numbers are reused across distinct participant pairs, the pool **does not grow with total volume**.
  - **Use AU local 02 numbers** ($3/month, $0.01/min inbound) unless the bake-off shows consumers answer 04 numbers measurably more often.
  - **Keep the pool small and fixed**, because every proxy number goes into the consumer's saved contact card as "[Brand] – your tradie callback". That bypasses iOS 26 screening and, per Telstra's FAQ, Telstra's warning labels.
  - Tell providers to open with "Hi, it's Dave from [Brand] about your poster job".
- **Outreach pool** (04 mobiles; SMS job cards and AI/scripted-call caller ID):
  - `N_out = ceil(peak_day_outbound_calls / 50) + 2 spares`, with a minimum of 3.
  - Use **sticky assignment** (`hash(provider_id) mod N`), so each tradie always hears from the same 04 number. Send them a vCard at onboarding ("[Brand] Jobs") so the number is saved.
  - Pace at most 1 call per number per 3–5 min.
  - Avoid floods of <15 s calls: leave a 10–15 s voicemail rather than instantly hanging up on AMD, and send SMS first so fewer calls are needed.
  - At 100 jobs/day × 2 calls that is 200/day, so 4 + 2 = **6 numbers**. At 1,000 jobs/day it is about 42 numbers, which is the point to ask Telstra/Twilio about whitelisting and to consider an AU carrier relationship.
- **Monitoring:** watch per-number answer rate and median call duration daily. A sudden answer-rate drop on one number signals a label, so rest that number and escalate to carrier support.

**Carrier choice:**
- **MVP: Twilio.** It has documented AU KYC, published AU rates, native Retell/ElevenLabs integration, AMD, and one account for SMS + voice + masking.
- **Phase 2:** price Telnyx (cheaper SMS if AU carrier fees are modest; per-call AMD pricing; owns numbers) and Plivo SIP ($0.058/min mobile) for the outbound-AI leg only.
- Don't build multi-carrier failover before you have volume.

**Cost per masked 5-minute callback:**

| Proxy type | Calculation | Cost |
|---|---|---|
| Mobile proxy | 5 × ($0.05 + $0.075) | **$0.63** |
| Local 02 proxy | 5 × ($0.01 + $0.075) | **$0.43** |

The notes' $0.43 figure was right only by accident, if local proxies are used.

### Gaps
- The Twilio AU mobile number monthly fee conflicts ($8.25 vs $20.00 on the same page), so budget conservatively at $20.
- Telstra's numeric threshold for "Suspicious Calling Pattern" is unpublished, and the "saved contact overrides label" statement comes from a third-party mirror of Telstra's FAQ.
- Whether Twilio AU local numbers can present as CLI on outbound legs to mobiles without being labelled was not tested ([Background, unverified]: AU local numbers are voice-only on Twilio).
- Vonage AU pricing was not found, and Telnyx AU voice termination rates were not found.
- The final SPF KYC start dates are still unconfirmed.

---

## 7. Messaging front door: Linq vs LoopMessage vs Sendblue for Australian +61 numbers; SMS fallback provider and costs

### Takeaway
- **Keep Linq as the target primary**, but **nothing published confirms Linq can provision +61 iMessage lines**. Its docs say numbers are assigned by your Linq representative, so it is a sales question.
- LoopMessage's Australian support is contested: one review says AU senders, while GetApp lists the US only.
- Sendblue says it can send "to any enabled phone globally" and has a free sandbox, which makes it the fastest way to prototype in week 1 while the Linq contract is negotiated.
- A US +1 iMessage line works for Australian iPhone users (iMessage runs over data), so the real gap is **SMS fallback, which must come from an AU 04 number**.
- **For SMS fallback, use the same Twilio AU 04 number that does provider outreach in v1** (one integration, voice + SMS on one number). The cheapest SMS is from AU-local aggregators: Mobile Message at about A$0.016–0.04 per SMS, with a free dedicated number. Their downside is no voice on the same number.
- The "Linq closes outreach accounts on 19 Oct 2026" claim from the earlier note found **no corroboration**.

### Cited Findings
- **Linq:**
  - The API sends iMessage, then RCS, then SMS automatically. Access needs a bearer token and "one or more phone numbers assigned to your account" by a Linq representative. Contact support@linqapp.com — [Linq iMessage API (official)](https://linqapp.com/imessage-api); [Linq v2 docs (official)](https://docs.linqapp.com/v2/api/index.md)
  - No page confirming +61 lines was found — (search; see Gaps)
- **LoopMessage:**
  - GetApp lists the US only — [GetApp](https://www.getapp.co.uk/software/2073318/loopmessage)
  - An earlier note's third-party review lists Australian senders — [Blue Reacher](https://bluereacher.com/reviews/loopmessage-review) (via messaging note)
  - The AU SMS provider Mobile Message lists a LoopMessage integration — [Mobile Message integration](https://mobilemessage.com.au/integrations/app/imessage-api-by-loopmessage-ca15)
  - A competitor says LoopMessage needs a DUNS number and warm-up for outbound — [Blooio vs LoopMessage](https://blooio.com/compare/blooio-vs-loopmessage)
- **Sendblue:**
  - The docs say outbound iMessage/SMS can go "to any enabled phone globally" — [Sendblue outbound docs (official)](https://docs.sendblue.com/docs/outbound)
  - AI Agent plan $100/line/month, 1,000 inbound contacts/day, with outbound-initiated messaging on Enterprise — [Sendblue pricing comparison](https://www.sendblue.com/blog/imessage-api-pricing-comparison) (via messaging note)
- **Linq "19 Oct 2026 closure" claim:** a search found no report of it; results were unrelated "Linq" companies — (search 18 Oct 2026); original claim at [Blue Reacher ranking](https://bluereacher.com/best/imessage-api) (via messaging note)
- **AU SMS providers:**
  - Mobile Message: first dedicated number free, extra numbers $100/year ex GST, SMS from 1.6¢ — [Mobile Message pricing](https://www.mobilemessage.com.au/pricing)
  - Notifyre virtual numbers from $17.50/month; GoFax virtual mobile $18.50/month; SMS Broadcast 3.7–7¢ with free inbound — [Mobile Message comparison](https://mobilemessage.com.au/best-bulk-sms-provider-australia)
  - MessageMedia reportedly rebranded to Sinch Engage in 2026 (single source) — [Sinch](https://sinch.com/fr/engage/resources/business-messaging/fournisseurs-de-sms-australie/)
  - Twilio AU SMS is $0.0515 per outbound segment and $0.0075 inbound — [Twilio SMS AU (official)](https://www.twilio.com/en-us/sms/pricing/au) (via notes)
  - Telnyx AU SMS is $0.004 per part + carrier fee — [Telnyx AU messaging](https://telnyx.com/pricing/messaging/au)
- **ACMA Sender ID Register:** organisations using branded (alphanumeric) sender IDs had to register by 1 Jul 2026 — [ACMA](https://www.acma.gov.au/articles/2025-11/call-action-all-organisations-using-branded-sms). This doesn't affect replies from a numeric 04 number, which is what two-way needs anyway.
- **Apple Messages for Business:** Poke was still the first and only approved AI agent in coverage found. Approval took months and required live support, AI labelling and provider testimony — [TechWyse](https://www.techwyse.com/news/platform-updates/apple-messages-for-business-first-ai-agent-poke-approved); [iGeeksBlog](https://www.igeeksblog.com/apple-poke-messages-business-ai-agent/)

### Inferences
- **Front-door design:**
  - **Day 0–7:** Sendblue sandbox (free, 10 verified contacts) for development, plus a Twilio AU 04 number.
  - **Week 2+:** a Linq production line. Ask Linq for: (a) a +61 line; failing that, (b) a +1 line with SMS fallback disabled and your own AU 04 number used for SMS-only users.
  - The contact card pushed on first contact carries the iMessage handle, the AU 04 SMS number and the proxy callback numbers (§6). One saved contact then survives line loss, Android fallback and screening.
- **Routing rule:** if Linq reports the handle is iMessage-capable, reply via Linq. Otherwise reply from the AU 04 number. Users who text the 04 number first stay on SMS.
- **Message hygiene that cuts SMS cost.** Keep provider job cards and SMS-fallback messages to **one GSM-7 segment (≤160 chars, no emoji)**. Emoji force UCS-2 and 70-character segments ([Background, unverified]), which roughly doubles to triples cost per message at $0.0515 per segment.
- **Phase 2:** move bulk SMS to Telnyx or an AU-local aggregator only if SMS becomes the top variable cost line. Keep provider-facing voice and SMS on the same 04 number, since that consistency matters more than about 2¢ per message.
- **Apple MfB stays the sanctioned migration** (Phase 2+). The business already has the human escalation console Apple requires.

### Gaps
- Linq +61 availability, price, daily caps and flagged-line replacement SLA are all unpublished. These are questions for Linq sales; the docs site was unreachable.
- LoopMessage AU sender availability conflicts.
- Sendblue's $29 vs $100 AI Agent price conflicts (liquidity note vs messaging note) and was not resolved. It is immaterial at 1–2 lines.
- Whether Sendblue/Linq status updates sent inside a user-started thread count as "replies" under inbound-only plans has not been confirmed with the vendors.

---

## 8. Agent harness: OpenAI Agents SDK (TS), Vercel AI SDK v6/v7, Mastra, Claude Agent SDK, or plain tool calling; does MCP add value; why not the Codex SDK or Agent Builder?

### Takeaway
**Plain tool-calling code inside workflow steps, via the Vercel AI SDK (v7)** (keep the notes' choice, made more minimal).
- Use `generateObject`/structured outputs for triage and parsing, and one-shot `generateText` for drafting.
- Use `WorkflowAgent` only if the consumer intake ever needs an open-ended multi-turn loop.

Rejected harnesses:
- **OpenAI Agents SDK (TS):** fine but OpenAI-only. Its RealtimeAgent is relevant only if you go S2S.
- **Mastra (v1.0 Jan 2026, $22M Series A, durable graph workflows):** adds a framework layer and dependency surface you don't need.
- **Claude Agent SDK:** the Claude Code harness for coding/filesystem agents, so the wrong shape.
- **Codex SDK:** OpenAI scopes it to coding threads.
- **OpenAI Agent Builder:** removed from the platform on 30 Nov 2026.

**MCP: defer.** In-process typed tools are simpler. MCP's value here is later and external: letting Claude/ChatGPT clients act as an ops console, or distributing "request a callback" as an MCP/ChatGPT app, as Airtasker does.

### Cited Findings
- **AI SDK:** AI SDK 7 is available with `WorkflowAgent`, a durable resumable agent inside Vercel Workflow — [AI SDK docs (official)](https://ai-sdk.dev/docs/reference/ai-sdk-workflow). AI SDK 6 added `ToolLoopAgent`, tool approvals and stable MCP — [Noqta](https://noqta.tn/en/blog/vercel-ai-sdk-6-typescript-ai-agents-guide-2026) (via agent note)
- **OpenAI Agents SDK (JS):**
  - A TypeScript-first layer over the Realtime API with `RealtimeAgent`/`RealtimeSession` and WebSocket and SIP transports — [openai-agents-js docs index](https://docsearch.algolia.com/mcp/docs/repo/openai/openai-agents-js)
  - Announced June 2025 — [The Decoder](https://the-decoder.com/openai-adds-new-features-and-improvements-to-its-agent-development-tools-and-language-model/)
  - Still described as v0.x — [blckalpaca](https://blckalpaca.at/en/knowledge-base/ai-agents/ai-agent-frameworks-comparison/openai-agents-sdk) (via frontier note)
- **OpenAI Agent Builder and Evals:** no longer available on the platform from 30 Nov 2026, per OpenAI's AgentKit page update of 3 Jun 2026 (official) — [OpenAI AgentKit](https://openai.com/index/introducing-agentkit/) (via agent note). The Assistants API was sunset on 26 Aug 2026 — [OpenAI migration guide](https://developers.openai.com/api/reference/resources/beta/subresources/assistants.md) (via agent note)
- **Codex SDK:** use it "for coding-focused Codex threads" (official) — [OpenAI Codex SDK docs](https://developers.openai.com/codex/sdk) (via agent note)
- **Claude Agent SDK** "is Claude Code packaged as a library" with built-in file, bash and web tools. It is harness-only, you host it, and it is "a batteries-included coding/filesystem agent". The Tool Runner in the regular Anthropic SDK loops over tools you define — Anthropic API reference (claude-api skill); [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- **Claude Managed Agents:** beta (`managed-agents-2026-04-01`), with a per-session container. Tokens + $0.08 per session-hour running + $10 per 1K web searches. Not ZDR-eligible — Anthropic API reference (claude-api skill); [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- **Mastra:**
  - v1.0 stable in Jan 2026; $22M Series A led by Spark Capital in Apr 2026, alongside a hosted platform (Studio, Server, Memory Gateway).
  - Durable graph workflows; Apache-2.0; 300k+ weekly npm downloads.
  - [Techleap](https://finder.techleap.nl/news/feed/mastra-raises-22m-series-a-to-help-developers-build-ai-agents); [RyWalker](https://rywalker.com/research/mastra); [AgenticWire](https://www.agenticwire.news/article/mastra-framework-open-source-ai-tooling-heats-up)

### Inferences
- **Recommended code shape:**
  - `lib/llm.ts` holds 4–6 typed functions: `triage(msg)`, `parseProviderReply(text)`, `draftUserUpdate(state)`, `draftJobCard(job)`, `classifyEdgeCase(job)`.
  - Each uses AI SDK `generateObject` with a Zod schema, Haiku 5.5 by default, and a fallback provider.
  - Every call is wrapped in a workflow step, which gives retries, durability and a trace span.
  - Tools are plain TS functions: `sendSms`, `sendImessage`, `placeOutreachCall`, `createMaskingSession`, `queryProviders`, `escalateToFounder`.
  - Nothing here needs an agent loop: the workflow *is* the loop.
- **When to use an agent loop:** only the consumer conversation, if it grows multi-turn ("actually make it tomorrow", "can they bring a ladder?"). Even then a `WorkflowAgent` with 3–4 tools and a 10-step cap is enough.
- **Anthropic-specific gotchas** if you call Claude directly or via the AI SDK:
  - Sonnet 5.5 and Opus 5.5 reject forced tool choice, so use structured outputs.
  - Set effort explicitly (Haiku 5.5 and Opus 5.5 default to `medium`; use `low` for triage).
  - Keep the system prompt and tool list byte-stable for prompt caching.
- **MCP verdict: defer.** Wrapping internal tools as an MCP server adds a process boundary, auth and a protocol whose 2026 RC features are unsettled (frontier note), for zero user-visible benefit in v1. Write tools as Zod-typed functions now, which are trivially exposable via MCP later.
- **Why not Claude Managed Agents** (even though it has webhooks, budgets and schedules): the per-session container and the session-hour model are designed for long sandboxed work. A dispatch job is many tiny decisions separated by long waits, which is a durable-timer problem.

### Gaps
- The current `@openai/agents` version and whether its SIP transport supports outbound origination were not confirmed.
- A claim that a June 2026 npm supply-chain attack backdoored many `@mastra` packages appeared in one listing summary with no primary source found. Unverified, but it is a general reason to minimise framework dependencies and pin versions.

---

## 9. Evals and observability: Langfuse vs Braintrust vs others; voice-agent testing tools; the minimal eval set for a solo founder

### Takeaway
- **Use Langfuse** (Hobby free → Core $29/month). It is now owned by ClickHouse (Jan 2026), stays MIT and self-hostable, ingests AI SDK OpenTelemetry, and is cheaper at this scale than **Braintrust** (free Starter; Pro $249/month). Braintrust's eval UX is stronger, but it isn't worth $249/month to a solo founder.
- **Don't buy a voice-simulation tool until AI calls are on the critical path (Phase 1).** Then **Coval** (published pricing from about $100/month; $28M Series A) is the startup-accessible choice; Hamming is sales-gated, and Evalion topped one reviewer's benchmark.
- Don't rely on OpenAI's hosted Evals (removed 30 Nov 2026).

### Cited Findings
- **Langfuse:**
  - ClickHouse acquired Langfuse (announced 16 Jan 2026); Langfuse stays open source and self-hostable with no planned licence change.
  - Plans: Hobby free (50K units, 30-day data, 2 users), Core $29/month (100K units, 90 days, unlimited users), Pro $199/month, Enterprise $2,499/month. Overage from $8 per 100K units.
  - [TrueFoundry](https://www.truefoundry.com/blog/langfuse-alternatives); [UsagePricing](https://usagepricing.com/blueprint/langfuse); [AgenticWire](https://www.agenticwire.news/article/langfuse-vs-langsmith-self-hosted)
- **Braintrust:** Starter $0 (1 GB processed data, 10K scores); Pro $249/month (5 GB, 50K scores); custom Enterprise. One CostBench page conflicts ("no free tier") — [TrueFoundry (competitor)](https://www.truefoundry.com/blog/braintrust-pricing); [CostBench](https://www.costbench.com/software/ai-observability/braintrust/free-plan/)
- **Voice testing:**
  - Coval raised a $28M Series A led by Norwest — [Dealroom](https://dealroom.co/news/135855-coval-raises-28m-series-a-to-stress-test-voice-ai-agents/)
  - Coval's published pricing starts around $99–100/month; tiers of $100/$500/$4,500 have been reported, with simulation minutes at $0.40 (Starter) and $0.25 (Growth) — [Cekura (competitor)](https://www.cekura.ai/blogs/coval-alternative); [andrew.ooo](https://andrew.ooo/answers/roark-vs-coval-vs-hamming-voice-ai-eval-april-2026/)
  - Hamming is custom-priced — [CostBench](https://costbench.com/software/voice-ai-agents/hamming-ai/)
  - Evalion ranked first in one ContextQA benchmark — [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/) (via frontier note)
- **OpenAI Evals:** the dashboard goes read-only on 31 Oct 2026 and Evals is removed from 30 Nov 2026 — [OpenAI AgentKit](https://openai.com/index/introducing-agentkit/) (via agent note)

### Inferences
**Minimal eval set (build in week 2–3, run in CI on every prompt or model change; about 300 cases, under $1 per run on Haiku 5.5):**

| # | Eval | Cases | Grader | Pass bar |
|---|---|---|---|---|
| 1 | **Intake triage** | 100 real and synthetic texts, including Aussie slang ("hot water's carked it", "need a sparky this arvo"), missing suburb, email-handle senders, out-of-scope, emergencies, pranks | Exact-match on `{trade, suburb, deadline_bucket, needs_clarification}` + an LLM judge on the clarifying question (one question, bundled) | ≥95% trade, ≥90% suburb |
| 2 | **Provider reply parsing** | 60 SMS replies ("yep", "Y", "can do after 4", "who is this", "STOP", "wrong number") | Exact-match `{answer, eta, opt_out}` | 100% on STOP / opt-out, ≥95% overall |
| 3 | **Outbound copy policy** | 40 generated job cards and user updates | Deterministic validator: no prices, no "booked/guaranteed", ≤160 GSM-7 chars, sender ID + STOP present | 100% |
| 4 | **Scope and safety** | 30 requests (weapons, medical, finance/insurance leads, harassment, "call my ex") | Exact-match decline | 100% |
| 5 | **Voice call outcomes** (Phase 1) | 20 simulated calls: voicemail, AI receptionist, IVR menu, noisy site, "who's this?", decline, "I don't do that suburb" | Coval simulation, or replayed recordings + transcript judge | ≥90% correct outcome code, 0 commitments |
| 6 | **Online (production)** | Every job | Funnel metrics in Postgres: time-to-first-contact, acceptance by channel, callback within SLA, connect rate, cost per fulfilled job, opt-out rate | Dashboards and alerts |

- **Tracing:** AI SDK OpenTelemetry into Langfuse, keyed by `job_id`, with cost attached as span metadata. Mirror every vendor cost into the `cost_ledger` table so unit economics never depend on the observability vendor.

### Gaps
- Langfuse and Braintrust official pricing pages were not reachable; the figures are third-party.
- No independent evaluation of the voice-testing vendors on Australian accents or tradie scenarios was found.

---

## 10. What did the six notes miss that a frontier team would use in October 2026?

### Takeaway
The notes missed ten developments that change decisions.
1. Vercel Workflow went GA in April 2026, which flips the durable-engine choice.
2. The GPT-6 generation and GPT-Live-1 in the API (September 2026) supersede the notes' OpenAI picks.
3. Deepgram shipped Flux Multilingual STT (April) and Flux TTS with Australian voices (August), a one-vendor AU-accent cascade.
4. Twilio ConversationRelay ($0.07/min) is a TypeScript, same-carrier, bring-your-own-LLM voice path.
5. iOS 26 call screening and Telstra's saved-contact override make contact cards a deliverability tool, not just branding.
6. The official Twilio AU inbound mobile rate ($0.05/min) changes the masked-call cost.
7. Retell publishes an AU outbound rate ($0.10/min).
8. Langfuse was acquired by ClickHouse.
9. Mastra raised a Series A with a hosted platform.
10. No "verified AI caller" or branded-calling standard is live in Australia. GSMA's Open Verifiable Calling is still a project, so don't wait for it.

Managed agent runtimes have **not** reached GA: Claude Managed Agents is still beta, and OpenAI's Agents API/Dots are weeks old.

### Cited Findings
- **Vercel Workflow GA** (April 2026) — [Vercel Community weekly](https://community.vercel.com/t/vercel-weekly-2026-04-20/38580); [Dutch IT Channel](https://www.dutchitchannel.nl/news/730354/vercel-workflows-nu-officieel-beschikbaar)
- **GPT-6 Astra** (3 Sep 2026) — [Bloomberg Government](https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1). **GPT-6.1 Sol** (29 Sep 2026) — [Gizmodo Japan](https://www.gizmodo.jp/article/2609-gpt-6-1-sol-openai-devday-2026/). **GPT-Live-1 in the API** (10 Sep 2026) — [OpenAI](https://openai.com/index/introducing-gpt-live-1-in-the-api/)
- **Deepgram:** Flux Multilingual GA (29 Apr 2026) — [Deepgram](https://deepgram.com/learn/deepgram-launches-flux-multilingual-press-release). Flux TTS with Australian voices GA (12 Aug 2026) — [Deepgram changelog](https://developers.deepgram.com/changelog/2026/8/12)
- **Twilio ConversationRelay** at $0.07/min — [Twilio](https://twilio.com/en-us/products/conversational-ai/pricing)
- **iOS 26 "Ask Reason for Calling"** screening for non-contacts — [Euronews](https://euronews.com/next/2025/10/09/getting-too-many-spam-calls-new-iphone-ios-26-call-screen-feature-could-help). **Saved contacts override Telstra warnings** (FAQ mirror) — [FAQ mirror](https://www.letsbemates.com.au/mate/wp-json/wp/v2/faq/25223)
- **Twilio AU inbound** to mobile numbers at $0.05/min — [Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au). **Retell AU outbound** at $0.10/min — [Retell docs](https://docs.retellai.com/deploy/international-call)
- **Langfuse acquired by ClickHouse** (16 Jan 2026) — [TrueFoundry](https://www.truefoundry.com/blog/langfuse-alternatives). **Mastra Series A and hosted platform** — [Techleap](https://finder.techleap.nl/news/feed/mastra-raises-22m-series-a-to-help-developers-build-ai-agents)
- **GSMA Open Verifiable Calling** is a Foundry project to embed cryptographic proof of caller identity, brand rights and intent, covering human and AI-assisted calls. It is not a ratified standard, and no Australian carrier link was found — [GSMA Foundry OVC](https://www.gsma.com/get-involved/gsma-foundry/general/gsma-foundry-launches-open-verifiable-calling-project-building-on-proven-live-deployments-to-restore-trust-in-global-voice-communications/)
- **Claude Managed Agents** is still beta as of the 2026-10-06 reference — Anthropic API reference (claude-api skill). OpenAI's DevDay "Agents API"/Dots is described inconsistently across secondary sources — [Reworked](https://www.reworked.co/ai-news/the-biggest-announcements-from-openai-devday-dots-agents-new-500-plan/) (via frontier note)
- **Bedrock Australia** cross-region inference keeps Claude processing in AU — [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-cross-region-inference-for-claude-sonnet-4-5-and-haiku-4-5-in-japan-and-australia/)

### Inferences
- **"Verified calling" substitute available today:** contact cards. Push a vCard to consumers (via Linq) containing the iMessage handle, the AU SMS number and the 6–8 proxy numbers, all under "[Brand]". Send providers a vCard of their sticky outreach number. This is free, works on every carrier and handset, and addresses screening, labels and answer rate at once.
- **AI-receptionist hand-off** (from the frontier note, reinforced): many AU tradies' lines are answered by AI receptionists. The scripted/cascade call should detect "I'm an AI assistant" greetings and deliver a ≤20 s structured brief (first name, suburb, job, deadline, callback via SMS), then hang up and send the SMS. Never let two AIs converse beyond 45 s.
- **Things that look frontier but should be ignored for now:**
  - A2A and agent payments.
  - Browser and contact-form agents.
  - RCS in AU.
  - The `$10/$50` models (Fable 5.1, GPT-6 Astra).
  - S2S-only voice.
  - Hosted agent runtimes.
  - Agent memory products.

### Gaps
- I could not check whether any Australian carrier plans branded or verified voice calling for 2027.
- An EU AI Act disclosure-duty claim (from 2 Aug 2026) appeared only in vendor marketing and is not relevant to the AU launch.

---

## 11. Final verdict: red-team table, "do not build" / "build yourself", and a phase-by-phase stack with fixed and variable costs

### Takeaway
Most of the notes' stack survives. The red team changes seven things:
1. **Vercel Workflow replaces Inngest** as the default, since it is now GA.
2. **Haiku 5.5 does nearly all LLM work.** Provider ranking becomes deterministic SQL, and the "strong model for dispatch" shrinks to edge cases.
3. **The OpenAI fallback models move to GPT-6 Luna / GPT-6.1 Sol** (from GPT-5.4 mini / GPT-5.5).
4. **A scripted Twilio call is A/B-tested against Retell** for the AI outreach call.
5. **Masked calling uses two differently-sized pools** with local 02 proxies, plus contact cards for deliverability.
6. **Supabase wins over Firestore.**
7. **MCP is deferred.**

Typical v1 variable cost is **about US$1.6–1.9 per request** (A$2.5–2.9), against US$1.1–4.6 in the notes. The main changes are the corrected inbound proxy leg and the Linq line amortisation, offset by lower LLM spend. Fixed cost is about **US$235–350/month at MVP, $415–945/month at v1, and $2–4.5k/month at scale**.

### Cited Findings (key inputs used below)
- **Anthropic** Haiku 5.5 $0.10/$0.50 and Sonnet 5.5 $2/$10 (cache read $0.20) — Anthropic API reference (claude-api skill); [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- **Twilio AU (official):**
  - Outbound to mobile $0.075/min; SIP $0.071/min.
  - Inbound $0.05/min on mobile numbers and $0.01/min on local numbers.
  - SMS $0.0515 per segment out, $0.0075 in.
  - Numbers: mobile $8.25–20/month, local $3/month.
  - [Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au); [Twilio SMS AU](https://www.twilio.com/en-us/sms/pricing/au); [Twilio SIP AU](https://www.twilio.com/en-us/sip-trunking/pricing/au)
- **Retell** $0.055 + $0.015/min, with AU telephony at $0.10/min — [Retell pricing](https://www.retellai.com/pricing); [Retell international calls](https://docs.retellai.com/deploy/international-call)
- **Vercel Workflow** $0.02 per 1K events — [Vercel](https://vercel.com/docs/workflows/pricing). **Supabase Pro** $25 — [Jet Admin](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/). **Langfuse Core** $29 — [UsagePricing](https://usagepricing.com/blueprint/langfuse). **Coval** from about $100 — [andrew.ooo](https://andrew.ooo/answers/roark-vs-coval-vs-hamming-voice-ai-eval-april-2026/)
- **Google Places (New):**
  - Text Search Pro is $32 per 1K and Enterprise $35 per 1K, with 5K and 1K free per month respectively.
  - Place Details Enterprise is $20 per 1K.
  - Only `place_id` may be cached indefinitely.
  - Sources: [Google pricing (official)](https://developers.google.com/maps/billing-and-pricing/pricing); [Places policies (official)](https://developers.google.com/maps/documentation/places/web-service/policies) (via notes)
- **Linq pricing:** about $160–250 per line per month plus a $500–1,000 setup fee (competitor-reported, unverified) — [Blooio vs Linq](https://blooio.com/compare/blooio-vs-linq-blue) (via messaging note). Sendblue AI Agent plan $100 per line — [Sendblue](https://www.sendblue.com/blog/imessage-api-pricing-comparison) (via messaging note)

### Inferences

#### (A) Red-team table

| Layer | Notes' choice | Challenger's verdict | Evidence | Confidence | Migration path later |
|---|---|---|---|---|---|
| Consumer channel | Linq iMessage (+61 TBC) + AU SMS fallback; AMB later | **Keep Linq**; prototype on **Sendblue sandbox** in week 1 while the Linq contract is negotiated; contact card carries iMessage + SMS + proxy numbers | Linq numbers assigned by a rep, no +61 evidence ([Linq docs](https://docs.linqapp.com/v2/api/index.md)); Sendblue sends globally ([Sendblue](https://docs.sendblue.com/docs/outbound)); no corroboration of the 19 Oct closure claim | Medium | Apple MfB via an MSP once traction exists; WhatsApp for Android later |
| SMS (fallback + provider job cards) | Twilio AU 04 | **Keep Twilio** in v1 (same number does voice + SMS); single-segment GSM-7 messages | Twilio $0.0515 per segment ([Twilio](https://www.twilio.com/en-us/sms/pricing/au)); AU aggregators 1.6–7¢ ([Mobile Message](https://www.mobilemessage.com.au/pricing)) | High | Telnyx ($0.004 + carrier fee) or an AU aggregator for bulk once SMS is the top cost line |
| Telephony carrier | Twilio; Telnyx later | **Keep Twilio** | Published AU rates and KYC path ([Twilio AU](https://www.twilio.com/en-us/guidelines/au/regulatory)); Plivo SIP $0.058 ([Plivo](https://www.plivo.com/sip-trunking/pricing/au/)) | Medium-high | Telnyx/Plivo SIP for the outbound-AI leg at volume |
| Masked calling | DIY on Programmable Voice; 10–30 AU mobile pool | **Keep DIY, but replace the pool design**: outreach pool `ceil(calls/day ÷ 50) + 2` sticky 04 mobiles; proxy pool 6–8 **local 02** numbers sized by max concurrent jobs per participant; proxies in the contact card | Proxy closed ([Twilio](https://www.twilio.com/docs/proxy/understanding-phone-number-management)); reuse rule ([Twilio](https://www.twilio.com/docs/proxy/phone-numbers-needed)); inbound $0.05 vs $0.01 ([Twilio AU](https://www.twilio.com/en-us/voice/pricing/au)); saved contacts override labels ([FAQ mirror](https://www.letsbemates.com.au/mate/wp-json/wp/v2/faq/25223)) | Medium | Telnyx masking; carrier whitelisting at >1,000 jobs/day |
| Outbound AI call | Retell vs ElevenLabs bake-off; LiveKit later | **Start Retell** (BYO Twilio SIP) **A/B'd against a scripted Twilio `<Play>` + DTMF call**; ElevenLabs as challenger on voice; Vapi/Bland out | §3 table: all options $0.13–0.20/min on AU mobiles; Retell outbound features ([Retell](https://retellai.com/blog/best-voice-ai-providers)) | Medium | ConversationRelay (TS, own LLM) or LiveKit Agents Node at >20k min/month |
| Voice architecture | Cascade by default; S2S trial | **Keep cascade / scripted**; S2S (gpt-realtime-2.1-mini, GPT-Live-1) only if it wins a noisy-AU bake-off | S2S 26–38% vs 85% ([JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html)); GPT-Live API weeks old ([OpenAI](https://openai.com/index/introducing-gpt-live-1-in-the-api/)); Gemini Live 2.5 dies 13 Dec 2026 ([Vertex](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api)) | Medium-high | Deepgram Flux STT + Flux TTS AU voices; S2S later |
| Durable workflow | Inngest (or Vercel Workflow once GA) | **Replace with Vercel Workflow** (GA April 2026); Inngest as fallback | GA ([Vercel Community](https://community.vercel.com/t/vercel-weekly-2026-04-20/38580)); $0.02 per 1K events ([Vercel](https://vercel.com/docs/workflows/pricing)); Inngest $99 Pro ([AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/)) | Medium | Workflow "Worlds" self-host, or Inngest if leaving Vercel |
| Agent harness / LLM layer | Vercel AI SDK; MCP optional | **Keep AI SDK v7, but plain structured calls inside steps**; no agent framework; `WorkflowAgent` only for the multi-turn intake | AI SDK 7 ([ai-sdk.dev](https://ai-sdk.dev/docs/reference/ai-sdk-workflow)); Agent Builder removed 30 Nov ([OpenAI](https://openai.com/index/introducing-agentkit/)); Codex SDK coding-scoped ([OpenAI](https://developers.openai.com/codex/sdk)) | High | OpenAI Agents SDK RealtimeAgent only if going S2S |
| Triage / parsing model | Haiku 5.5 (or GPT-5.4 mini / GPT-6 Luna) | **Keep Haiku 5.5** (effort `low`); **replace the OpenAI alternative with GPT-6 Luna** | Anthropic API reference (claude-api skill); Luna $0.10/$0.50 ([eesel](https://www.eesel.ai/blog/gpt-6-luna-pricing)) | High (Anthropic), medium (OpenAI) | Re-run the golden set on each new small model |
| Dispatch / copy model | Sonnet 5.5 (or GPT-5.5 / GPT-6.1 Sol) | **Replace "LLM dispatch" with SQL ranking**; Sonnet 5.5 only for edge cases and first user confirmation; GPT-6.1 Sol as fallback | Sonnet 5.5 $2/$10 (Anthropic API reference, claude-api skill); GPT-6.1 Sol $2/$10 ([Gizmodo JP](https://www.gizmodo.jp/article/2609-gpt-6-1-sol-openai-devday-2026/)) | Medium-high | Opus 5.5 at low effort only if evals show a need |
| Discovery | Own DB → Places (New) → search API | **Keep**; roster-first; Places details live at request time only | Caching terms (place_id only) ([Google](https://developers.google.com/maps/documentation/places/web-service/policies)) | High | Parallel/Exa enrichment offline |
| System of record | Supabase (agent note) vs Firestore (frontier note) | **Supabase Postgres, Sydney region** | Relational/analytic workload; Pro $25 ([Jet Admin](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/)); Data Connect as a Google-side option ([Firebase](https://firebase.google.com/docs/data-connect/pricing)) | Medium | Neon / Cloud SQL if needed; read replicas |
| Ops console | Next.js admin with takeover | **Keep**, plus Supabase Realtime for the live board; founder click-to-call through the brand number | — (design) | High | Slack approvals later |
| Observability | Langfuse or Braintrust | **Langfuse** (Hobby → Core $29) | ClickHouse acquisition, MIT, pricing ([TrueFoundry](https://www.truefoundry.com/blog/langfuse-alternatives)); Braintrust Pro $249 ([TrueFoundry](https://www.truefoundry.com/blog/braintrust-pricing)) | Medium-high | Self-host Langfuse on ClickHouse at volume |
| Voice evals | Coval / Hamming / Evalion | **Defer to Phase 1**, then Coval Starter; replay real calls first | Coval pricing ([andrew.ooo](https://andrew.ooo/answers/roark-vs-coval-vs-hamming-voice-ai-eval-april-2026/)); Hamming sales-gated ([CostBench](https://costbench.com/software/voice-ai-agents/hamming-ai/)) | Medium | Coval Growth tier in Phase 2 |
| MCP / protocols | "Internal MCP" (frontier) vs optional (agent) | **Defer**; Zod-typed in-process tools; A2A and payments: no | — (design); MCP RC unsettled (frontier note) | Medium-high | Public MCP / ChatGPT app for distribution (Airtasker precedent) |
| Hosted agent runtime | None | **Keep "none"** (Managed Agents beta; Agents API/Dots new) | Anthropic API reference (claude-api skill); [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview) | High | Revisit when GA and if long multi-day agent work appears |
| Data residency | Not addressed consistently | **Partial residency**: database in Sydney; LLM, Linq and voice offshore; APP 8 disclosure; PII minimisation | `inference_geo` us/global only (Anthropic API reference, claude-api skill); Bedrock AU CRIS ([AWS](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-cross-region-inference-for-claude-sonnet-4-5-and-haiku-4-5-in-japan-and-australia/)) | Medium | Claude via Bedrock AU / Azure OpenAI AU if counsel requires |

#### (B) "Do not build" and "build yourself"

**Do not build (buy, defer or skip):**
1. Your own iMessage bridge (Mac minis / BlueBubbles). Lindy was banned by Apple, so use Linq or Sendblue.
2. Your own voice media pipeline, LiveKit/Pipecat workers or direct SIP-to-model in v1.
3. A durable-execution engine on cron, Cloud Tasks or Firestore status fields. Vercel Workflow costs about $0.0024 per job.
4. Anything on OpenAI Agent Builder (gone 30 Nov 2026), the Assistants API (sunset 26 Aug 2026), the Codex SDK, the Claude Agent SDK, Claude Managed Agents or OpenAI Agents API/Dots.
5. An agent framework layer (Mastra, LangChain) as the core abstraction.
6. An internal MCP server, A2A endpoints, or agent-payments flows (AP2/ACP/x402).
7. Browser or contact-form agents for reaching providers.
8. RCS for Australia.
9. A Google-Places-derived provider database. Store `place_id` only, and grow first-party opted-in records instead.
10. Agent memory products (Mem0/Zep/Letta) or a vector database.
11. Your own eval/tracing platform. Use Langfuse plus a CI script.
12. Branded or "verified caller" programmes. None exist in AU, so use contact cards.
13. Multi-carrier failover, or AU-resident LLM inference, before counsel or volume demands it.
14. Gemini Live 2.5 native audio or any `-preview` realtime model on the critical path.

**Build yourself (small, core, differentiating):**
1. **Masking router and session store** on Twilio Programmable Voice, with CDR-based "connected call" billing evidence.
2. **Number-pool manager**: sticky outreach assignment, the proxy-number chooser, and per-number health (answer rate, median duration).
3. **Channel adapter** (`Channel` interface for Linq and SMS; AMB and WhatsApp later) with capability flags.
4. **The job workflow**: triage → clarify → discover → fan-out → race(YES, timer) → escalate → connect → confirm → close, with cancel and takeover hooks.
5. **Deterministic provider ranking** in SQL: Bayesian-smoothed acceptance, time-to-call, distance, calling-hours eligibility, per-provider frequency caps.
6. **Consent and contact-rules ledger**: Spam Act consent evidence, STOP across channels, Telemarketing Standard calling hours, per-provider caps.
7. **The scripted outreach call**: TTS clip per job, DTMF accept/decline, short voicemail, AI-receptionist brief.
8. **vCard generator**: brand, iMessage handle, SMS number and proxy numbers for consumers; sticky number for providers.
9. **Commitment guardrail validator**: no prices, bookings or guarantees; GSM-7 length; sender ID + STOP.
10. **Per-job cost ledger** and the **founder console** (live board, takeover, approve, click-to-call via the brand number).
11. **Golden-set eval script** (§9) in CI.

#### (C) Recommended phase-by-phase stack with costs (USD; my estimates from the cited list prices)

**Phase 0: MVP, weeks 1–4, founder in the loop (Wizard of Oz; about 50–300 requests)**
- **Stack:**
  - Sendblue sandbox in week 1, then a Linq line.
  - Twilio: 2 × 04 mobiles for SMS and founder outreach caller ID, plus 4 × 02 local proxies.
  - Next.js on Vercel Pro; Vercel Workflow (one run per job, with founder-approval hooks).
  - Supabase Pro (Sydney).
  - AI SDK with Haiku 5.5 (triage/parse) and Sonnet 5.5 (draft user copy for founder approval).
  - Langfuse Hobby; Google Places within free caps; ABN Lookup and NSW Trades API (free).
  - **No AI voice.** The founder phones providers from the console through a Twilio bridge, presenting the brand's 04 number, so providers save it.
- **Fixed per month:**

  | Item | Cost |
  |---|---|
  | Linq line (competitor-reported, unverified; plus a reported $500–1,000 setup fee), or Sendblue $100 | $160–250 |
  | Twilio numbers | $30–55 |
  | Vercel Pro | $20 |
  | Supabase | $25 |
  | Langfuse, Workflow, Places | $0 |
  | **Total** | **≈ $235–350/month** |

- **Variable per request:**

  | Item | Cost |
  |---|---|
  | LLM | ~$0.03 |
  | SMS | $0.20–0.45 |
  | Founder bridge calls (2 legs × 3–6 min × $0.075) | $0.45–0.90 |
  | Masked callback | ~$0.43 |
  | **Total** | **≈ $1.1–1.8**, plus founder time (the dominant cost; the liquidity note values it at about A$3.33 per request) |

**Phase 1: automated v1, months 2–6 (about 300–3,000 requests/month)**
- **Stack additions:**
  - Automated ladder: SMS card to 3–4 roster providers, then at 3 minutes **scripted Twilio call vs Retell (BYO Twilio SIP)** A/B to non-responders, then first YES, then a masking session.
  - Outreach pool of 4–8 sticky 04 numbers, and a proxy pool of 6–8 local 02 numbers in the contact card.
  - Langfuse Core; Coval Starter once voice prompts change weekly.
  - One web-search API ($1–5 per 1K) for enrichment.
  - The golden-set CI gate.
- **Fixed per month:**

  | Item | Cost |
  |---|---|
  | Linq 1–2 lines | $250–500 |
  | Twilio numbers (8 mobiles at up to $20 + 8 locals at $3) | $90–185 |
  | Vercel | $20 |
  | Supabase | $25–60 |
  | Langfuse | $29 |
  | Coval | $0–100 |
  | Places / search beyond free caps | $0–50 |
  | **Total** | **≈ $415–945/month** |

- **Variable per request (typical case):**

  | Item | Cost |
  |---|---|
  | LLM (15 Haiku calls + 3 Sonnet calls) | $0.06 |
  | Discovery (half of jobs need Places) | $0.05 |
  | Provider SMS (4 single-segment cards + 3 "taken" notices + masked-number text + inbound) | $0.44 |
  | SMS to Android/SMS-only consumers (about 45% × 4 messages) | $0.09 |
  | Outreach calls (2 attempts × ~1 min: Retell BYO ~$0.15 or scripted ~$0.075) | $0.15–0.31 |
  | Masked callback (5 min, local proxy; mobile proxy $0.63) | $0.43 |
  | Linq line amortised ($250 ÷ 1,000 requests) | $0.25 |
  | Workflow, compute, tracing | $0.01 |
  | **Total** | **≈ $1.5–1.9 (≈ A$2.3–2.9)** |

  - **Lean case** (a roster provider replies YES to SMS; no call; 4-minute callback): ≈ $0.90.
  - **Heavy case** (6 cards, 4 conversational calls billed at 2 min each at $0.18, 8-minute call on a mobile proxy): ≈ $3.7.
  - Unfilled requests still incur about $0.6–1.2 of outreach cost.

**Phase 2: scale, multi-zone and multi-city (about 3,000–30,000 requests/month)**
- **Stack changes:**
  - Apple Messages for Business via an MSP alongside 3–6 Linq lines.
  - Voice moves from Retell to **Twilio ConversationRelay** (TS WebSocket service on Fly/Cloud Run/Railway; [Background, unverified] hosting) or **LiveKit Agents Node**, but only once AI minutes exceed about 20k/month and the Node SDK is stable.
  - Bake off **S2S** (gpt-realtime-2.1-mini / GPT-Live-1) against a **Deepgram Flux STT + Flux TTS AU-voice** cascade on noisy AU calls.
  - Price Telnyx/Plivo for outbound minutes and Telnyx/AU aggregators for bulk SMS.
  - Outreach pool of 20–40 numbers with health monitoring.
  - Langfuse Pro (or self-host), Coval Growth.
  - Consider Claude via Bedrock AU if counsel requires residency.
- **Fixed per month:**

  | Item | Cost |
  |---|---|
  | iMessage lines + AMB MSP (per-user fee undisclosed) | $750–1,500+ |
  | Numbers | $300–600 |
  | Vercel/Supabase (compute upgrades) | $100–300 |
  | Langfuse | $199 |
  | Coval | $500 |
  | Voice service hosting | $50–150 |
  | Places/search | $100–300 |
  | **Total** | **≈ $2,000–3,550/month**, up to ~$4,500 with paid support tiers |

- **Variable per request:** about **$1.0–1.4 typical**, driven by:
  - A roster-first fill rate that cuts calls.
  - About $0.03–0.05/min platform-margin savings.
  - Cheaper SMS.
  - Linq amortisation falling below $0.10.
- Human ops (part-time staff) becomes the largest cost line, which is outside this note's scope.

**Sanity check against revenue:** at the liquidity note's A$15–35 per connected call (about US$10–23), a typical v1 cost of about US$1.6–1.9 per request, and a 60–85% fill rate, the cost per *fulfilled* request is about US$2–3. **The tech stack is not the unit-economics risk; fill rate and founder/ops time are.** This matches the earlier notes' conclusion with corrected inputs.

### Gaps
- All per-request figures are modelled from list prices and assumed call counts and durations. Log real `usage`, CDR durations and per-vendor costs from day one and replace them.
- Linq's real price and caps, the Twilio AU mobile number fee ($8.25 vs $20), Twilio and Retell billing rounding, and the GPT-Live-1 price are unverified and could move the variable cost by about ±$0.2 per request.
- Legal questions remain open and are outside this note's scope. A short AU legal opinion is still needed on:
  - whether job-lead calls are "telemarketing";
  - Spam Act inferred-consent limits;
  - masking and recording.
