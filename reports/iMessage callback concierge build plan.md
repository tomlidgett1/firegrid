# Build a Dispatcher, Then Earn the Liquidity

Build this as a **deterministic dispatch workflow with a few small language-model calls inside it**, not as an autonomous agent. Each request gets one durable Vercel Workflow run on the Next.js and Vercel stack you already know. **Supabase Postgres in Sydney** is the system of record, and **Claude Haiku 5.5** does almost all the language work. A **Linq iMessage line plus a Twilio Australian 04 number** for SMS form the front door. **SMS job cards go to an opted-in tradie roster before any AI call**, and a **masked callback you build yourself on Twilio Programmable Voice** connects the tradie to the customer; its call records double as billing evidence.

The adversarial red team kept Linq, Twilio and the Vercel AI SDK but overturned seven first-round defaults:
- **Vercel Workflow** (generally available since April 2026) replaces Inngest.
- A **SQL score** replaces "LLM dispatch".
- **GPT-6 Luna and GPT-6.1 Sol** replace stale OpenAI fallbacks.
- A **plain scripted Twilio call is A/B-tested against Retell**.
- Masking uses **two differently sized number pools with cheap 02 proxies**.
- **Supabase beats your familiar Firestore**.
- **MCP waits**.

Modelled v1 cost is about **US$1.5–1.9 per request (A$2.3–2.9)** against a planned **A$15–35 provider fee per connected call**. So the stack is not the unit-economics risk; tradie responsiveness, fill rate and your own time are.

Build liquidity the way Jim's Group built its central number. Start with one zone and three or four urgent or small-job categories, in staffed hours only. Hand-recruit a roster of tradies who have promised fast callbacks. Dispatch by hand for the first weeks. Expand a cell only after it holds **80% fill for four straight weeks**.

The first unknown to close is commercial, not technical: **nothing published confirms Linq can supply +61 iMessage lines**. A caveat on evidence applies throughout. Every research note behind this report relied on search-result summaries rather than full page reads, and only Anthropic's documentation was read directly. Many prices come from competitors' blogs. Every per-request figure and threshold below is a labelled estimate that week-one logging should replace.

## Each request is a timed dispatch job, not a conversation

Your belief that human-to-human confirmation is the value narrows the deliverable to one event: **a real provider phones the customer inside a promised window**. Everything before that event is operations:
- finding providers
- offering the job
- waiting
- escalating
- connecting

Webhooks and timers that run for minutes to hours punctuate those operations. That is why the research converged on a **durable workflow engine as the backbone, with a thin model layer called at bounded decision points**. This is the workflows-as-code pattern Vercel's engine was designed around ([Vercel blog](https://vercel.com/blog/the-best-workflow-engine-is-a-programming-language)).

An autonomous agent loop that holds a job open fights its own guardrails:
- The AI SDK's `ToolLoopAgent` caps at **20 steps by default** ([DEV Community](https://dev.to/koenig_academy_9a8f35ff4b/vercel-ai-sdk-6-production-patterns-for-autonomous-loops-2n6f)).
- Its context grows with every webhook.

The red team put it bluntly: nothing here needs an agent loop, because **the workflow is the loop**.

### One request passes ten stages and ends in one billable call

The lifecycle below combines the design notes with the red team's workflow pattern. The clock targets are estimates to measure, not benchmarks.

| # | Stage | Target clock (estimate) | What happens | Owner |
|---|---|---|---|---|
| 1 | Intake | T+0–5 s | The Linq or Twilio webhook is verified, deduplicated on event ID and logged. A tapback and typing indicator go out before any model call. | Code |
| 2 | Triage | T+5–15 s | Extract trade, task, suburb, deadline, "now" vs "quote" and missing fields. Check scope against the category, zone and hours whitelist. | Haiku 5.5 extracts; code decides scope |
| 3 | Clarify (only if needed) | Wait up to 2 h | One bundled question ("What suburb are you in, and when do you need it by?"). Never a second round. | Template, Haiku phrasing |
| 4 | Confirm and consent | T+15–30 s | "A local handyman will call you on this number before 3pm. We'll share your number with that one provider only." First contact also pushes the contact card and a privacy-notice link. | Template; Sonnet 5.5 drafts the first confirmation |
| 5 | Rank | T+30 s | SQL score over the opted-in roster. Google Places is fetched live only when the roster is thin. | Code |
| 6 | Fan-out | T+30–60 s | A one-segment SMS job card goes to the top 3–5 providers, each from that provider's sticky 04 number. | Code |
| 7 | Race and escalate | YES or 3 min, then up to ~10 min | No YES after 3 minutes: call the best non-responders, either a scripted call or a Retell agent call, only inside telemarketing hours or with standing consent. The search is time-boxed to half the deadline, or 15 minutes for "now" jobs. | Code; Haiku parses replies |
| 8 | Accept and connect | First YES | Open a masking session. Text the provider the proxy number and brief. Tell the customer who will call and from which number. Tell the other providers "job taken". | Code |
| 9 | Callback and billing evidence | ≤15 min after YES | The provider dials the proxy, which rings the customer. A status callback records answer, answered-by and duration. Billable if a human answered and the call ran ≥30–60 s. Reroute if no call within N minutes. | Code |
| 10 | Confirm and learn | After the call | "Did Dave call?" with a one-tap reply. Ask the provider the outcome. Refresh provider stats. The session expires after 24–72 h. | Haiku parses free-text replies |

The timings at the top of the table are driven by platform behaviour:
- Linq retries webhooks **up to 10 times over about 25 minutes** with a unique event ID, so deduplication is mandatory ([Linq webhooks](https://docs.linqapp.com/channel/imessage/guides/webhooks/)).
- Typing indicators work only on iMessage and expire **85–90 seconds** after the last refresh, so Android and SMS users must get a plain-text product ([Linq typing indicators](https://docs.linqapp.com/channel/imessage/guides/chats/typing-indicators/)).
- Apple's own guideline for business messaging agents is a **first reply within 5 seconds**. That is a sensible bar even off Apple's platform, and it is why the tapback fires before triage ([Apple Messages for Business UX](https://register.apple.com/resources/messages/messaging-documentation/ux-design)).

Split requests into **"now" jobs** and **"quote" jobs**:
- "Now" jobs, like your poster-by-3pm example, get the 15-minute promise and roster-only dispatch.
- "Quote" jobs, like your wall-painting example, get a same-day callback and may use cold outreach.

When nobody accepts inside the time-box, say so honestly and offer two choices: keep looking, or try tomorrow morning.

### Three webhooks, one workflow per job, one masking router

```
CONSUMER                     VERCEL: Next.js route handlers + Vercel Workflow            PROVIDERS
                             (system of record: Supabase Postgres, Sydney)
iPhone --iMessage--> Linq line --+
                                 +--> /api/inbound   verify signature, dedupe event id,
Android --SMS--> Twilio AU 04 ---+       upsert user, append job_events, resume job hook
                                               |
                                               v
       +--------------------- JOB WORKFLOW: one durable run per job -----------------------+
       |  triage ---> clarify? ---> rank ---> fan-out SMS ---> race(YES, 3 min)           |
       |  Haiku 5.5   hook <= 2 h    SQL                             |                     |
       |                                                             v                     |
       |  escalate calls ---> race(YES, ~10 min) ---> connect ---> notify ---> confirm ---> close
       |  hooks: cancel | founder takeover | founder approve    gates: hours, consent, caps |
       +--------+-------------------------------+------------------------------+-----------+
                |                               |                              |
     status texts (Linq/SMS)          SMS job cards from             scripted call or Retell
                |                     sticky 04 outreach pool        (BYO Twilio SIP)
                v                               |                              |
             consumer                           +-----> tradie says YES <------+
                                                              |
                                      /api/sms, /api/voice: parse reply, resume hook

MASKED CALLBACK (synchronous TwiML, outside the workflow)
tradie dials 02 proxy --> Twilio voice webhook --> find masking_session(To = proxy, From = caller)
                      --> <Dial callerId = proxy> consumer's mobile
                      --> status callback: answered? AnsweredBy? duration? --> cdrs --> charges
                      --> emits call.connected into the job workflow

Supabase: users, jobs, job_events, providers, provider_stats, outreach_attempts, consents,
          phone_numbers, masking_sessions, cdrs, charges, cost_ledger
Side:     Langfuse traces keyed by job_id | founder console (Realtime board, takeover, approve, click-to-call)
External: Anthropic + OpenAI via AI SDK 7 | Google Places (New) | ABN Lookup | NSW Trades API
```

Three kinds of webhook enter the system:
- customer messages from Linq or Twilio SMS
- provider replies by SMS
- call outcomes from Twilio or the voice vendor

Every one lands in an idempotent route handler. The handler verifies the signature, appends to `job_events` and resumes the right workflow through a hook keyed `job:{id}`. Vercel Workflow's `createWebhook` gives a running workflow a real, callable URL to wait on. Its `defineHook` primitive pauses a run for the next human message ([Workflow SDK createWebhook](https://workflow-sdk.dev/docs/api-reference/workflow/create-webhook); [Vercel human-in-the-loop guide](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk)). A timeout is then just a `Promise.race` between the hook and a `sleep`.

The masking router sits deliberately outside the workflow, because Twilio needs an immediate TwiML answer while the call rings. It reads `masking_sessions`, dials the other party with the proxy as caller ID, and reports the outcome back into the run as an event.

Cross-job rules belong in Postgres rather than in engine features. Examples are "don't text the same tradie three jobs in five minutes" and "at most one AI call per provider per hour"; a check against `outreach_attempts` in the outreach step enforces them.

Two interfaces keep every vendor swappable:
- **A `Channel` adapter** with capability flags (typing, tapback, contact card), so SMS users degrade gracefully and Apple Messages for Business or WhatsApp can be added later as further adapters.
- **A `placeOutreachCall(jobBrief, provider)` function** that returns a normalised outcome of `accepted`, `declined`, `voicemail`, `ai_receptionist` or `no_answer`, plus transcript, duration and cost, whichever vendor placed the call.

### Code decides; the model reads and writes

The red team's sharpest challenge was to the first-round idea of a "strong model for dispatch". **Ranking providers is a SQL score**, built from:
- smoothed response rate
- time-to-call
- distance
- opt-in status
- calling-hours eligibility

That score is auditable and free. What remains for language models is small:
- extract the job from a text
- parse provider replies
- phrase one-line messages inside templates
- flag edge cases such as emergencies or out-of-scope requests

That cuts modelled LLM spend to about **US$0.02–0.06 per job**, against the first round's US$0.15–0.70.

| Decision | Owner | Why |
|---|---|---|
| Turn a text into {trade, task, suburb, deadline, urgency, missing fields} | Haiku 5.5, effort low, structured output | Language understanding, including slang ("hot water's carked it", "need a sparky this arvo") |
| Is it in scope (category, zone, hours, banned request types)? | Code over the extracted fields; Haiku flags oddities | Auditable, and the main defence against Magic-style scope creep |
| Emergency, safety or legal edge case | Sonnet 5.5 classifies, then a founder-approval hook | Rare and high-stakes |
| Which providers, in what order | SQL: Bayesian-smoothed acceptance, time-to-call, distance, opt-in, hours eligibility, frequency caps | Free, explainable, improves with data |
| Fan-out width, timers, when to call | Workflow policy constants | Tunable without touching prompts |
| Job cards and status texts | Templates with slots; model optional for the one-line task summary | Everything passes a deterministic validator |
| Parse "yep", "Y", "can do after 4", "who is this", "STOP" | Code catches STOP and opt-out keywords first; Haiku parses the rest | Opt-outs must be 100% reliable |
| The outreach call | Pre-recorded script plus keypad, or Retell with a narrow prompt | Fewer hallucination paths |
| Is a connection billable? | Code over call records | Evidence, not judgement |
| Money, cancellations, complaints, legal or medical | You | Human in the loop by design |

**Model choice: Anthropic and OpenAI tie on price, so verify on reliability.** Anthropic's official pricing lists:
- **Haiku 5.5 at $0.10/$0.50** per million input/output tokens
- **Sonnet 5.5 at $2/$10**

([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)). OpenAI's current generation is GPT-6:
- **GPT-6 Luna at $0.10/$0.50**
- **GPT-6.1 Sol at $2/$10**, announced at DevDay on 29 September 2026

Both OpenAI prices come from secondary sources only, because openai.com was unreachable during research ([eesel on GPT-6 Luna](https://www.eesel.ai/blog/gpt-6-luna-pricing); [Gizmodo Japan on GPT-6.1 Sol](https://www.gizmodo.jp/article/2609-gpt-6-1-sol-openai-devday-2026/)). The first-round picks of GPT-5.4 mini and GPT-5.5 are therefore stale.

Price does not separate the labs at these tiers. Schema reliability, latency and refusal behaviour do. The red team's verdict is **Haiku 5.5 as primary, with Luna and Sol as a hot-standby second provider** through the AI SDK, failing over on errors, rate limits or refusals. That verdict rests partly on Anthropic's facts being verified from official docs while OpenAI's were not. Your OpenAI experience is a fair tiebreaker. Run the golden set on both, and if Luna wins, swapping is a configuration change.

Three Anthropic-specific details matter in code ([Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)):
- Sonnet 5.5 and Opus 5.5 reject forced `tool_choice`, so use structured outputs.
- Haiku 5.5 thinks at medium effort by default, so set effort to low for triage.
- A byte-stable system prompt keeps prompt caching effective.

Skip the US$10/$50 tier entirely: Claude Fable 5.1 and GPT-6 Astra, the latter launched on 3 September 2026 ([Bloomberg Government](https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1)).

**The harness is the Vercel AI SDK v7, used minimally.** Use `generateObject` with Zod schemas for triage and parsing and one-shot generation for drafting, each wrapped in a workflow step for retries and tracing. AI SDK 7's `WorkflowAgent` is "a durable, resumable AI agent for use inside a workflow" ([AI SDK docs](https://ai-sdk.dev/docs/reference/ai-sdk-workflow)). Keep it in reserve for when intake grows into a genuine multi-turn conversation, and then cap it at three or four tools and ten steps.

The rejected options, and why:

| Option | Why not |
|---|---|
| OpenAI Agents SDK | Works, but ties you to one vendor |
| Mastra | Adds a framework layer you don't need, despite its US$22M Series A ([Techleap](https://finder.techleap.nl/news/feed/mastra-raises-22m-series-a-to-help-developers-build-ai-agents)) |
| Claude Agent SDK | It is Claude Code packaged as a library for coding and filesystem agents ([Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)) |
| Codex SDK | OpenAI scopes it to coding threads ([OpenAI Codex SDK](https://developers.openai.com/codex/sdk)) |
| OpenAI Agent Builder and hosted Evals | Gone from 30 November 2026 ([OpenAI AgentKit](https://openai.com/index/introducing-agentkit/)) |
| Assistants API | Sunset on 26 August 2026 ([OpenAI migration guide](https://developers.openai.com/api/reference/resources/beta/subresources/assistants.md)) |
| Claude Managed Agents | Still beta, built around a per-session container at $0.08 per session-hour, and not eligible for zero data retention. A dispatch job is many tiny decisions separated by long waits, which is a durable-timer problem, not a sandbox problem ([Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)). |

**MCP is deferred.** Write tools as typed in-process functions now; they can be exposed through MCP later if a ChatGPT or Claude app becomes a distribution channel.

**Guardrails are code, not prompts.** Every outbound text passes a validator that enforces:
- no prices
- no "booked", "confirmed" or "guaranteed"
- at most 160 plain characters
- brand name and STOP present

Anything involving money, cancellation, complaints, legal or medical matters triggers a founder-approval hook. Every job carries a takeover flag that stops auto-replies and routes messages to your console. Per-job caps on providers contacted, model calls and dollars sit alongside a daily spend kill switch.

Prompts carry only the customer's **first name and suburb**, never a full address. One reason is privacy. The other is that Anthropic's first-party API offers no Australian inference region: `inference_geo` accepts only "us" or "global" ([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)).

The minimal eval set below runs in CI on every prompt or model change. It costs under US$1 per run on Haiku (red-team estimate).

| Eval | Cases | Pass bar |
|---|---|---|
| Intake triage | 100 real and synthetic texts, including slang, missing suburb, email handles, emergencies and pranks | ≥95% trade, ≥90% suburb |
| Provider reply parsing | 60 replies ("yep", "can do after 4", "who is this", "STOP", "wrong number") | 100% on opt-outs, ≥95% overall |
| Outbound copy policy | 40 job cards and customer updates | 100% pass the validator |
| Scope and safety | 30 requests (weapons, medical, finance leads, harassment) | 100% declined |
| Voice outcomes (Phase 1) | 20 simulated calls: voicemail, AI receptionist, phone menu, site noise, "who's this?" | ≥90% correct outcome code, zero commitments |
| Production funnel | Every job | Time to first contact, acceptance by channel, SLA hit, connect rate, cost per fulfilled job, opt-outs |

### Twelve tables and one state machine hold the business

The schema extends the agent note's six tables with the red team's additions for consent evidence, masking, call records and cost. The `charges` table is this report's addition.

| Table | Holds | Notes |
|---|---|---|
| `users` | Mobile number, iMessage handle, first name, default suburb, channel capability | If the iMessage handle arrives as an email address, ask for a mobile |
| `jobs` | Status, trade, task, suburb, deadline, now/quote, SLA due time, accepted provider, workflow run ID | One row per request; status mirrors the state machine |
| `job_events` | Append-only log of every message, call, webhook, model call and decision, with model, prompt version and cost | Audit trail, eval source and dispute record |
| `providers` | `place_id`, provider-supplied mobile and email, trades, service suburbs, opt-in status, calling window, max open jobs, ABN and licence check results, do-not-contact flag, sticky outreach number | First-party, consented data only; never Google-derived phone numbers |
| `provider_stats` | Materialised view of smoothed acceptance, median time-to-call, connect rate and strikes, by trade × zone × hour band | Feeds the SQL ranking |
| `outreach_attempts` | Job, provider, channel, number used, sent and reply times, outcome, cost | Also enforces per-provider frequency caps across jobs |
| `consents` | Subject, channel, exact wording, timestamp, source, calling-hours preference, withdrawal | Spam Act and Telemarketing Standard evidence |
| `phone_numbers` | Every 04 and 02 number, its pool, daily answer rate, median call duration, resting flag | Early warning for carrier spam labels |
| `masking_sessions` | Proxy number, provider number, customer number, job, `expires_at` | Lookup key is (proxy dialled, caller) |
| `cdrs` | Twilio call records: call IDs, legs, durations, answered-by result, cost | Billing evidence |
| `charges` | Provider, job, call record, amount, status (free, billable, refunded, disputed) | Provider invoicing |
| `cost_ledger` | Per-job, per-vendor cost lines | Unit economics independent of any observability vendor |

```
RECEIVED -> TRIAGED -> [NEEDS_INFO <-> customer reply, max 2 h] -> SEARCHING (SMS round, 3 min)
  -> ESCALATING (calls, hours and consent permitting) -> ACCEPTED -> AWAITING_CALLBACK
  -> CONNECTED (human answered, >= 30-60 s) -> CONFIRMED -> CLOSED (session expires 24-72 h)
Side exits: OUT_OF_SCOPE | UNFILLED (time-box hit) | CANCELLED | TAKEN_OVER (automation paused)
Loops:      AWAITING_CALLBACK --no call in N min--> REROUTED --> SEARCHING;  UNFILLED --"keep looking"--> SEARCHING
```

| State | Entered when | Leaves when |
|---|---|---|
| `NEEDS_INFO` | A required field (suburb, deadline, callback number) is missing | The customer replies (re-triage), or 2 h pass (close politely) |
| `SEARCHING` | Job cards sent to round-one providers | First YES, or 3 minutes pass |
| `ESCALATING` | Calls placed to non-responders | First YES, or the time-box ends (→ `UNFILLED`) |
| `AWAITING_CALLBACK` | The provider has the proxy number | The proxy call arrives, or N minutes pass (→ `REROUTED`) |
| `CONNECTED` | The customer's leg was answered by a human for ≥30–60 s | The customer confirms, disputes, or 2 h pass |
| `TAKEN_OVER` | You flag the job | You resume automation or close the job |

## The red team keeps Linq and Twilio but overturns seven defaults

You asked for a stack-challenging review, and the red team note was written for that purpose. It read the six first-round notes, ran 45 searches on 18 October 2026, and supersedes them wherever they conflict. All four of its attempts to fetch full pages failed, so its non-Anthropic facts are also search-summary grade.

| Layer | First-round recommendation | Red-team verdict | Confidence |
|---|---|---|---|
| Durable orchestration | Inngest; Vercel Workflow "once GA" | **Replace: Vercel Workflow**, GA since mid-April 2026; Inngest is the documented fallback | Medium |
| Provider ranking | Sonnet 5.5 or GPT-5.5 as "dispatcher" | **Replace with a SQL score**; Sonnet only for edge cases and the first customer confirmation | Medium-high |
| OpenAI fallback models | GPT-5.4 mini / GPT-5.5 | **Replace with GPT-6 Luna / GPT-6.1 Sol** | Medium (secondary sources) |
| Triage and parsing model | Haiku 5.5 | **Keep**, at effort low | High |
| Outbound AI call | Retell vs ElevenLabs bake-off | **Retell on your own Twilio SIP trunk, A/B'd against a scripted Twilio call**; ElevenLabs as voice challenger; Vapi, Bland and Pipecat out | Medium |
| Voice architecture | Cascade by default, speech-to-speech trial | **Keep cascade or scripted**; speech-to-speech only if it wins a noisy Australian bake-off | Medium-high |
| Masked calling | DIY, one pool of 10–30 AU mobiles, inbound leg assumed ~$0.01/min | **Keep DIY, replace the pool design**: two pools, local 02 proxies, inbound to mobiles costs $0.05/min | Medium |
| System of record | Supabase (agent note) vs Firestore (frontier note) | **Supabase Postgres, Sydney region** | Medium |
| Customer channel | Linq, +61 to be confirmed | **Keep Linq**; prototype on the Sendblue sandbox in week one | Medium |
| SMS | Twilio AU 04 | **Keep**; one plain-text segment per message | High |
| MCP | "Worth using internally" vs "optional" | **Defer** | Medium-high |
| Observability | Langfuse or Braintrust | **Langfuse** | Medium-high |
| Hosted agent runtime | None | **Keep none** | High |
| Data residency | Not addressed consistently | **Partial**: database in Sydney, model, messaging and voice vendors offshore, disclosed in the privacy policy | Medium |

### Vercel Workflow went GA, so your home platform wins orchestration

The first round picked Inngest mainly because Vercel Workflow's GA was unconfirmed; the frontier note even cited Vercel docs saying "beta". That page was last updated on 1 December 2025.

Newer evidence shows **Vercel Workflow reached GA in mid-April 2026**:
- Vercel's community digest for 10–17 April lists it as the week's top highlight ([Vercel Community weekly](https://community.vercel.com/t/vercel-weekly-2026-04-20/38580)).
- A Dutch trade outlet reports that the beta had passed **100 million runs** ([Dutch IT Channel](https://www.dutchitchannel.nl/news/730354/vercel-workflows-nu-officieel-beschikbaar)).

The cost per job is trivial:
- Pricing is **US$0.02 per 1,000 events** at about three events per step.
- A 40-step job is roughly **US$0.0024**.
- The Hobby plan's 50,000 free events cover about 400 jobs a month.

([Vercel Workflow pricing](https://vercel.com/docs/workflows/pricing))

Since the per-job cost is a fraction of a cent everywhere, the deciding factors become practical ones:
- one vendor and one dashboard
- durable state next to the webhooks
- native AI SDK integration
- a self-host escape hatch called "Worlds"

The alternatives:

| Engine | Verdict | Why |
|---|---|---|
| Inngest | **Documented alternative** | Pick it if you want engine-level per-provider throttles or ever leave Vercel. Pro is US$99 a month (third-party) ([AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/)). |
| Trigger.dev | Credible | Waits longer than 5 seconds don't count toward compute ([Trigger.dev pricing](https://trigger.dev/pricing)) |
| Temporal | Rejected | Per-action pricing plus plan minimums, and determinism overhead that only pays off with a team |
| Restate | Rejected | Too young |
| Cloudflare | Rejected | Would mean leaving Vercel |

### Firebase loses the system of record, and only week one makes it close

This is where your familiar choice loses. The core workload is relational and analytical:
- ranking by trade × suburb × hour band
- an append-only event ledger
- reconciling charges against call records
- distance queries

Postgres does each of these in a query. In Firestore, every new ranking signal becomes a hand-maintained counter document, and the red team expects month-two analytics to force a migration anyway.

Firestore's ergonomic edge, triggers plus security rules on client reads, barely applies here, because the backend runs on Vercel and the only client is your one-person console. Supabase Realtime and row-level security cover that console. **Supabase Pro costs US$25 a month** ([Jet Admin](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/)) and offers a Sydney region, which keeps the record in Australia even though the model, messaging and voice vendors stay offshore.

There is also a stay-with-Google Postgres option that the first round missed: **Firebase Data Connect**, GA since April 2025. Its first 250,000 operations a month are free on Blaze, and Cloud SQL starts around US$9.37 a month after a trial ([Firebase Data Connect GA](https://firebase.blog/posts/2025/04/dataconnect-general-availability); [Data Connect pricing](https://firebase.google.com/docs/data-connect/pricing)). It works, but its GraphQL-first layer adds nothing for this product.

The honest close call is narrow. If you would otherwise lose a week learning Supabase, a Firestore prototype for the first ten test jobs is defensible. Beyond that, it is not close.

The red team also overturned two first-round assumptions on cost:
- **The masked call was under-costed.** Twilio's Australian page lists **US$0.05 a minute to receive a call on a mobile number**, against **US$0.01 on a local 02 number** ([Twilio Voice pricing AU](https://www.twilio.com/en-us/voice/pricing/au)). A five-minute callback through a mobile proxy therefore costs **US$0.63**, versus **US$0.43** through a local one. The first round's $0.43 was right only by accident.
- **The number pool was one undifferentiated block of 10–30 mobiles.** It should be two pools with different sizing rules, covered in the supply section below.

### The stack by phase, with costs

All costs are USD list prices from the notes, converted at the notes' assumed A$1 = US$0.65. Totals are the red team's estimates from cited inputs.

| Layer | Phase 0: MVP, weeks 1–4, you in the loop (~50–300 requests) | Phase 1: automated v1, months 2–6 (~300–3,000 a month) | Phase 2: scale, multi-zone and multi-city (~3,000–30,000 a month) |
|---|---|---|---|
| Customer channel | Sendblue free sandbox in week 1, then one Linq line; Twilio 04 for SMS users | 1–2 Linq lines plus the 04; contact card carries iMessage, SMS and proxy numbers | 3–6 Linq lines plus Apple Messages for Business through a provider; WhatsApp for Android later |
| Provider SMS | 2 Twilio 04 mobiles | Outreach pool of 4–8 sticky 04s | 20–40 numbers with health monitoring; Telnyx or an Australian aggregator for bulk SMS |
| Outreach call | None automated: you phone providers from the console through a Twilio bridge showing the brand's 04 | Scripted Twilio call (pre-generated Australian-voice clip plus keypad) A/B'd against Retell on your Twilio SIP trunk | Twilio ConversationRelay or LiveKit Agents (Node, once out of beta) above ~20k AI minutes a month; bake-off of speech-to-speech vs a Deepgram Flux cascade |
| Masked callback | DIY router on Programmable Voice, 4 local 02 proxies | 6–8 local 02 proxies | Same pool; ask carriers about whitelisting past ~1,000 jobs a day |
| Orchestration | Vercel Workflow, one run per job, founder-approval hooks | Same, with approvals only on flagged jobs | Same; "Worlds" self-host, or Inngest if leaving Vercel |
| Models | AI SDK 7; Haiku 5.5 for triage and parsing; Sonnet 5.5 drafts for your approval | Haiku 5.5 (effort low) for nearly everything; Sonnet 5.5 for edge cases; GPT-6 Luna / 6.1 Sol failover | Re-run the golden set on each new small model; Claude on Bedrock in Australia if counsel requires residency |
| Ranking and discovery | Your judgement over SQL; roster first, then Places (New) within free caps; ABN Lookup and NSW Trades API | SQL score; Places fetched live with only `place_id` stored; one web-search API at $1–5 per 1,000 | SQL with learned weights; offline enrichment |
| System of record | Supabase Pro, Sydney | Same, US$25–60 a month | Compute upgrades and read replicas |
| Ops console | Next.js admin, Realtime board, takeover, click-to-call | Same | Part-time ops staff; Slack approvals |
| Observability | Langfuse Hobby (free) | Langfuse Core (US$29); golden set in CI; Coval Starter once AI calls are on the critical path | Langfuse Pro or self-hosted; Coval Growth |
| **Fixed per month** | **≈US$235–350 (A$360–540)**, plus a reported Linq setup fee of US$500–1,000 | **≈US$415–945 (A$640–1,450)** | **≈US$2,000–4,500 (A$3,100–6,900)** |
| **Variable per request** | **≈US$1.1–1.8**, plus your time (the dominant cost) | **≈US$1.5–1.9 typical**; lean case ≈0.90, heavy case ≈3.7 | **≈US$1.0–1.4 typical** |

Supporting prices:
- **Langfuse:** now owned by ClickHouse; stays open source; Hobby free, Core US$29 a month ([TrueFoundry](https://www.truefoundry.com/blog/langfuse-alternatives); [UsagePricing](https://usagepricing.com/blueprint/langfuse)). That beats Braintrust Pro at US$249 a month ([TrueFoundry](https://www.truefoundry.com/blog/braintrust-pricing)).
- **Coval:** voice-simulation testing, raised a US$28M Series A, starter tiers around US$100 a month ([Dealroom](https://dealroom.co/news/135855-coval-raises-28m-series-a-to-stress-test-voice-ai-agents/); [andrew.ooo](https://andrew.ooo/answers/roark-vs-coval-vs-hamming-voice-ai-eval-april-2026/)).
- **Linq:** price is sales-gated. The US$160–250 per line per month figure comes from a competitor's comparison page ([Blooio](https://blooio.com/compare/blooio-vs-linq-blue)).

The red team's buy-or-build split is short.

**Build these eleven pieces yourself.** They are small, core and differentiating:
1. the masking router and session store
2. the number-pool manager
3. the `Channel` adapter
4. the job workflow
5. the SQL ranking
6. the consent and contact-rules ledger
7. the scripted outreach call
8. the vCard generator
9. the commitment validator
10. the per-job cost ledger and founder console
11. the golden-set script

**Do not build:**
- your own iMessage bridge (Lindy's self-hosted Mac mini setup ended in an Apple ban)
- your own voice media pipeline in v1
- a durable engine on cron or Firestore status fields
- anything on OpenAI's retiring Agent Builder or Assistants API
- an agent framework as the core abstraction
- an internal MCP server, agent-to-agent endpoints or agent payments
- browser agents that fill tradies' contact forms
- RCS for Australia
- a Google-derived provider database
- agent-memory products or a vector database
- your own eval platform
- multi-carrier failover before volume
- Gemini Live 2.5 native audio, which Google discontinues on 13 December 2026 ([Vertex AI model page](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api))

## Tradies miss calls on the tools, so supply runs SMS-first

### The evidence on reaching tradies is thin and points one way

**No published data measures Australian tradies' SMS reply rates or callback times**, so these are the first pilot metrics. The adjacent evidence is consistent:
- An AI-receptionist founder called **180 Australian tradies in business hours and 60% did not answer**. This is a small vendor test ([Product Hunt / AIssie](https://www.producthunt.com/posts/1215531)).
- An agency's analysis of 207,000 inbound calls across 858 businesses found about **1 in 10 unanswered**, but it was not trade-specific ([Dynamic Business](https://dynamicbusiness.com/topics/news/that-missed-call-wasnt-nothing-it-was-a-customer-and-probably-a-sale.html)).
- Businesses **failed to answer 26% of Google's AI pricing calls** and gave no price on 48% of those they did answer ([Invoca](https://www.invoca.com/blog/google-ai-pricing-calls-study)).
- In OpenAI- and CommBank-commissioned research, **45% of Australian construction SMBs** said they had lost work through slow responses ([Dynamic Business](https://dynamicbusiness.com/article/commbank-and-openai-are-betting-ai-can-fix-the-tradie-admin-problem)).

The implication: a live call during working hours often goes unanswered, while a text gets read between jobs. A pre-opted-in roster that has promised quick callbacks is the only way a 15-minute promise holds. Cold-dialling Google results in real time will mostly miss it.

Many tradies now also run **AI receptionists**. Australian products such as TransferToAI start from A$99 a month and book jobs into ServiceM8 ([Product Hunt](https://www.producthunt.com/products/transfertoai-australia-ai-receptionist)), so your calls will increasingly reach another AI. When that happens, the call should detect the greeting, deliver a structured brief in about 20 seconds, hang up and follow with an SMS. Two AIs should never talk for more than about 45 seconds.

Email is too slow for a 15-minute promise. Keep it for onboarding, consent confirmations, weekly statements and invoices, and as a low-priority channel for "quote" jobs. Browser agents that fill tradies' web contact forms stay off the critical path: on the harder OSWorld 2.0 benchmark, success fell to 20.6% for a model that scored 83.5% on the older verified set ([youngju.dev](https://www.youngju.dev/transcribe/2026-07-17-computer-use-agents-what-benchmarks-measure.en)).

Small jobs carry a separate problem. Tradespeople say travel and setup cost the same whether the job is large or small, so some simply don't answer small requests ([UK Business Forums](https://www.ukbusinessforums.co.uk/goto/post?id=1667762)). Route "hang a poster" to handymen and odd-job specialists rather than licensed trades.

### What a roster provider experiences

**Onboarding is a founder phone call inside telemarketing hours.** The pitch from the supply note runs roughly: customers text us, we get a local tradie to call them within 15 minutes, leads are exclusive to the first to claim, the first connections are free, then you pay a fixed fee only when you actually speak to the customer, with no subscription and no contract.

That pitch is aimed squarely at incumbent grievances:
- **hipages** shares each lead with **up to three businesses**, raised its plans to **A$139–649 a month plus GST in July 2026**, and uses 6-month then 12-month auto-renewing terms ([What's The Damage, a competitor](https://whatsthedamage.com.au/tradies/hipages-cost/)).
- hipages gave the ACCC an **enforceable undertaking over auto-renewal disclosure** ([ACCC](https://www.accc.gov.au/media-release/tradie-platform-hipages-rectifies-subscription-trap-issues)).
- **Oneflare closed on 30 June 2026**, displacing its paying cleaners, handymen and removalists ([Oneflare help centre](https://help.oneflare.com.au/hc/en-au/articles/58074479988377-Oneflare-is-closing-here-s-what-you-need-to-know)).

On the call, capture **express consent** ("yes, text and call me with jobs, 7am–7pm, seven days"), a calling window and a maximum number of open jobs. Then send a confirmation SMS with an opt-out and a vCard of the provider's sticky outreach number saved as "[Brand] Jobs".

Verification is cheap and mostly automated:
- **ABN Lookup** is free ([ABR web services](https://abr.business.gov.au/Tools/WebServices)).
- NSW's **Trades API** checks licence validity by work type, with a free tier of 2,500 calls a month. The product page dates from 2020, so confirm it is still live ([api.nsw Trades API](https://api.nsw.gov.au/Product/Index/25)).
- Victoria's **Building and Plumbing Commission** register is searchable and published as open data ([BPC](https://www.bpc.vic.gov.au/find-and-check-a-practitioner)).
- Collect a photo of the public-liability certificate and track its expiry.

Position the service as an introducer whose providers contract directly with the customer. Airtasker's own insurance excludes faulty workmanship ([Airtasker insurance](https://support.airtasker.com/hc/en-au/articles/23363113132057-What-do-I-need-to-know-about-Airtasker-s-Insurance-Coverage)). Never auto-publish reviews: ServiceSeeking was penalised **A$600,000** over roughly 17,000 automatically published reviews ([Flying Solo](https://www.flyingsolo.com.au/?p=1034281)).

**A job reaches the provider as one plain-text SMS** of about 130 characters:

> [Brand] Jobs: paid job in Surry Hills - hang 1 poster by 3pm today. Reply YES to call the customer now or NO to pass. STOP to opt out.

A YES gets back "Thanks Dave. Call Sarah on 02 XXXX XXXX (rings her mobile) within 15 min." The other providers get a polite "job taken" text.

If the provider hasn't replied after three minutes and the hour is lawful, the call opens:

> Hi, this is an automated assistant from [Brand] with a paid job for a customer in Surry Hills: hang a poster by 3pm today. Press 1 to take it and we'll text you the customer's number, 2 to pass, or 9 to stop calls from us.

That one sentence carries the AI disclosure, the purpose and the opt-out.

Each week the provider gets an SMS summary: jobs received, connections and what they paid. That reverses the hipages complaint of paying without visibility.

Three no-shows or complaints demote or remove a provider. Charges for customers who never answered are refunded automatically. Because the fee is charged per connection, a tradie who later deals with the customer directly costs the platform nothing, so the masking only has to survive the first call.

### The voice call should start as a recording with a keypad

On Australian mobiles, the **carrier leg costs roughly half of every option**. Managed voice platforms, Twilio's own voice layer, LiveKit, Deepgram and OpenAI's realtime models all land at about US$0.13–0.20 a minute all-in. So choose on outbound features and reliability, not on price.

The figures below are the red team's arithmetic on cited inputs.

| Option | All-in US$/min to an AU mobile (estimate) | Notes |
|---|---|---|
| Scripted Twilio call: pre-generated Australian-voice clip, then keypad input | ≈0.075 | Deterministic and noise-proof; buildable in a day |
| Retell on your own Twilio SIP trunk | ≈0.15 | Batch dialling, voicemail detection, phone-menu navigation, warm transfer; numbers and call records stay in Twilio |
| Retell with its own Australian telephony | ≈0.18 | Retell lists AU outbound at US$0.10/min |
| ElevenLabs Agents plus Twilio | ≈0.16–0.20 (burst 0.24+) | Best-marketed AU voices; voicemail detection only on Twilio numbers |
| Twilio ConversationRelay plus Haiku 5.5 | ≈0.15 | TypeScript WebSocket, your own LLM, same carrier |
| LiveKit cascade plus Twilio SIP | ≈0.14 | Per-second billing; Node SDK still beta |
| Deepgram Voice Agent plus SIP | ≈0.15 | Flux speech-to-text plus Flux text-to-speech with AU voices |
| OpenAI gpt-realtime-2.1-mini via SIP | ≈0.13–0.17 | Speech-to-speech; outbound needs a carrier bridge |

The underlying rates:
- Twilio charges **US$0.075 a minute to AU mobiles**; Plivo's SIP trunk charges **US$0.058** ([Twilio Voice AU](https://www.twilio.com/en-us/voice/pricing/au); [Plivo SIP AU](https://www.plivo.com/sip-trunking/pricing/au/)).
- Retell's infrastructure costs US$0.055 a minute, plus US$0.015 for third-party voices ([Retell pricing](https://www.retellai.com/pricing)); its AU outbound rate is US$0.10 ([Retell international calls](https://docs.retellai.com/deploy/international-call)).
- ElevenLabs Agents costs **US$0.08 a minute**, doubling to US$0.16 for burst minutes above concurrency ([Macha](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained)).
- Twilio ConversationRelay lists at **US$0.07 a minute** ([Twilio](https://twilio.com/en-us/products/conversational-ai/pricing)).
- Deepgram's Flux text-to-speech went GA on 12 August 2026 with **Australian-accented voices** ([Deepgram changelog](https://developers.deepgram.com/changelog/2026/8/12)).

The call is 30–60 seconds: a disclosure, a job offer and a yes or no. Its risks are site noise, utes, speakerphones and AI receptionists. That is why the red team's **biggest simplification is a scripted call**:
1. Generate the pitch audio once per job.
2. Play it and collect a keypad press.
3. Text the masked number on "1".
4. Leave a voicemail of 15 seconds or less on no answer.

Run **Retell as the A/B arm**, because it handles questions ("where is it?") and has the richest outbound toolkit, and keep ElevenLabs as the challenger on voice quality. **Keep the conversational arm only if the data show tradies ask questions before accepting.**

Speech-to-speech stays a later bake-off candidate for three reasons:
- In 278 simulated calls, speech-to-speech agents completed only **26–38% of tasks once noise and varied accents were added**, against 85% for a text agent ([JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html)).
- OpenAI's GPT-Live-1 reached the API only on 10 September 2026 ([OpenAI](https://openai.com/index/introducing-gpt-live-1-in-the-api/)).
- OpenAI's SIP guide documents incoming calls only ([OpenAI voice SIP guide](https://developers.openai.com/api/docs/guides/voice-sip)).

Avoid Vapi, whose default of **10 concurrent lines** and orchestration-only pricing hide the true cost of parallel fan-out ([Macha](https://www.getmacha.com/blog/vapi-ai-pricing-explained)). Above about 20,000 AI minutes a month, moving from Retell to ConversationRelay saves roughly US$0.03–0.05 a minute, or US$900–1,500 a month at 30,000 minutes. That justifies the engineering only in Phase 2.

### Masked callbacks need two number pools, not one

Twilio's managed masking product, Proxy, is **"closed for new customers"**, and Twilio's own docs tell you to build masking on Programmable Voice ([Twilio Proxy docs](https://www.twilio.com/docs/proxy/understanding-phone-number-management)). The red team estimates the build at 150–250 lines of TypeScript:
1. On the first YES, create a session with a proxy number on which neither participant already has an open session.
2. The inbound webhook on each proxy looks up the open session by (number dialled, caller) and dials the other party, presenting the proxy as caller ID.
3. The status callback on the customer's leg records whether a human answered and for how long.
4. A late call to an expired session hears "This job has closed, text us at…".

Proxy's own reuse rule sets the sizing logic: one participant cannot be in two concurrent sessions on the same number, but a number can serve many sessions between different people ([Twilio: phone numbers needed](https://www.twilio.com/docs/proxy/phone-numbers-needed)). **Proxy-pool size therefore depends on concurrency per person, not on total volume.**

| Pool | Number type | Sizing rule (red team) | Example | Cost |
|---|---|---|---|---|
| Proxy (masked callbacks) | Local 02, voice-only | Max open sessions per participant + 1. Cap providers at 5 open jobs and customers at 2. | **6–8 numbers cover a whole city** at thousands of jobs a month | US$3/month each; US$0.01/min inbound |
| Outreach (job cards, call caller ID) | 04 mobile, SMS and voice | ceil(peak daily outbound calls ÷ 50) + 2 spares, minimum 3. Sticky assignment per provider. | 100 jobs/day × 2 calls → 6 numbers; 1,000 jobs/day → ~42 | US$8.25–20/month each (Twilio's page conflicts) |

Pace each outreach number at no more than one call every 3–5 minutes, and avoid floods of sub-15-second calls. US dialler vendors treat both patterns as spam signals ([JustCall](https://justcall.io/blog/how-to-avoid-spam-likely-or-spam-tagged.html)). Watch each number's daily answer rate and median call length, and rest any number whose answer rate suddenly drops.

An optional "press 1 to connect now" live bridge is the same session started from the server. It costs two outbound legs, about US$0.75 for five minutes against US$0.43 for a masked callback, so offer it as an opt-in fast path for urgent jobs.

### Contact cards are Australia's only verified-caller system

No branded or "verified AI caller" scheme is live in Australia. GSMA's Open Verifiable Calling is still a project, not a standard ([GSMA Foundry](https://www.gsma.com/get-involved/gsma-foundry/general/gsma-foundry-launches-open-verifiable-calling-project-building-on-proven-live-deployments-to-restore-trust-in-global-voice-communications/)). Meanwhile:
- Telstra's Scam Protect relabels high-volume single-number traffic as **"Suspicious Calling Pattern"** ([EFTM](https://eftm.com/2025/03/telstra-introduces-new-scam-and-suspicious-call-alerts-directly-into-caller-id-260453)).
- iOS 26 can screen unknown callers by asking their name and purpose ([Euronews](https://euronews.com/next/2025/10/09/getting-too-many-spam-calls-new-iphone-ios-26-call-screen-feature-could-help)).

The fix is free. A third-party mirror of Telstra's FAQ says **saved contacts override its warning labels** ([FAQ mirror](https://www.letsbemates.com.au/mate/wp-json/wp/v2/faq/25223)), and iOS screening applies only to non-contacts. So **every customer's contact card should carry the iMessage handle, the AU SMS number and all 6–8 proxy numbers** under "[Brand]". Every provider's card should carry their sticky outreach number.

This works only because the proxy pool does not grow with volume, which makes the small fixed pool a deliverability feature rather than just a cost saving. Linq can push an Apple contact card with a native "add contact" banner on iMessage, and a .vcf attachment covers everyone else ([Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)). Poke used exactly this onboarding: users entered their number and Poke "gave itself a contact card" ([Tech Funding News](https://techfundingnews.com/poke-launches-15m-seed-imessage-ai-assistant/)).

## Australian contact rules set the outreach clock

The research found no regulator guidance on whether offering a tradie a paid job lead counts as "telemarketing", and the notes disagree:
- The telephony note treats the outreach as telemarketing because providers pay per connected call.
- The liquidity note argues a customer-specific job enquiry plausibly is not.

**Design for the stricter reading until an Australian lawyer says otherwise.** It costs little, because SMS-first contact and onboarding consent already do most of the work.

| Obligation | What it requires (as the sources summarise it) | How the build enforces it |
|---|---|---|
| Spam Act 2003: SMS, email, and any message that promotes | Consent: express, or inferred only when the number is conspicuously published, the message relates directly to the recipient's business, and there is no refusal statement. Plus sender identification and a working unsubscribe. The burden of proof sits with the sender. ([ACMA](https://www.acma.gov.au/avoid-sending-spam); [Mondaq](https://www.mondaq.com/australia/consumer-law/996226/spamming-and-the-spam-act)) | `consents` ledger; every job card carries the brand and STOP; STOP honoured across all channels at once; customer job threads stay purely transactional; express consent captured at onboarding |
| Telemarketing and Research Calls Industry Standard 2017 | Weekdays 9am–8pm and Saturdays 9am–5pm; no Sundays or national public holidays without consent. State name and purpose up front; end the call on request; present a caller ID that is callable for at least 30 days; synthetic-voice calls must let the recipient request information. ([DNCR industry standards](https://www.donotcall.gov.au/industry/industry-overview/industry-standards)) | Calling-hours gate in the escalate step; standing 7-day consent from roster providers; scripted opening; sticky 04 caller ID that stays live |
| Do Not Call Register | Business numbers are generally ineligible, but a mixed-use mobile that is mainly personal can be registered ([DNCR](https://www.donotcall.gov.au/Industry/Industry-Overview/Register-legislation); [Sprintlaw](https://sprintlaw.com.au/articles/do-not-call-register-australia-businesses-need-to-know/)) | Voice calls go only to consented roster providers; cold first contact is SMS; wash numbers against the register if cold calling is ever needed |
| Call recording (state surveillance laws) | Sources describe NSW, Victoria, WA, Tasmania and the NT as all-party consent, and Queensland, SA and the ACT as one-party ([Sprintlaw](https://www.sprintlaw.com.au/articles/is-it-illegal-to-record-a-phone-call-in-australia)) | **Never record bridged customer–provider calls**; announce any recording of AI calls; bill from call metadata only |
| Privacy Act and the Australian Privacy Principles | Phone numbers, suburbs and photos are personal information. A statutory privacy tort is in force. **Automated-decision transparency in privacy policies starts 10 December 2026.** ([G+T](https://www.gtlaw.com.au/insights/automated-decision-making-transparency-under-the-privacy-act); [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/79510bfb/privacy-breakthrough-the-wait-is-over)) | Collection notice on first contact; the customer's number reaches one accepted provider only, behind a mask; sessions expire; prompts carry first name and suburb only; the privacy policy discloses automated provider selection and offshore processing |
| AI disclosure | No Australian statute was found. Google's Ask for Me opens every call by announcing it is automated and lets businesses opt out ([Android Authority](https://androidauthority.com/google-search-ask-for-me-3521795)); Apple requires AI labelling and a human path ([Apple MfB FAQ](https://register.apple.com/resources/messages/messaging-documentation/faq)) | First sentence of every call names the brand and says "automated assistant"; never imply a human; honour "don't call me again" across all channels |
| Caller-ID and anti-scam codes | Only carrier-allocated numbers may be shown as caller ID; Telstra blocks some foreign-carrier use of Telstra numbers; Twilio's AU numbers need a KYC regulatory bundle, and bundle review takes up to 3 business days ([Twilio support](https://support.twilio.com/hc/en-us/articles/4407966601115-Telstra-Australian-Caller-ID-Restrictions-Reducing-Scam-Calls-Industry-Code); [Twilio KYC](https://support.twilio.com/hc/en-us/articles/49291010297883-Know-Your-Customer-KYC-in-Australia); [Twilio bundle docs](https://live.docs.dev.twilio.com/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle.md)) | Twilio-allocated numbers only; never present the customer's or the provider's own number |
| Financial lead generation | ASIC is reviewing advice licensees that use lead generators; the ACCC wants digital lead generation inside unsolicited-selling rules, with new unfair-trading provisions from 1 July 2027 ([ASIC](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-029mr-asic-commences-new-review-of-advice-licensees-that-use-lead-generation-services); [Insurance Business](https://www.insurancebusinessmag.com/au/news/breaking-news/comparison-sites-and-data-brokers-caught-in-acccs-unsolicited-selling-net-583947.aspx)) | The category whitelist excludes finance, insurance, energy and legal |

Calling hours collide with the product's best moments: "by 3pm today" on a Sunday is exactly when a cold AI call is off-limits. That is why onboarding consent is a product feature rather than paperwork. A roster provider who has agreed to "texts and calls about jobs, 7am–7pm, seven days" can be reached on a Sunday morning; a cold Google result can only be texted.

Customer threads raise a related question. A customer's own request makes the replies transactional, but any "need anything else? 10% off" message would turn a thread into a commercial message. Re-engagement and seasonal nudges therefore need recorded express consent.

Several questions sit outside what the notes could verify and belong in a short legal opinion before automated calling begins:
- the telemarketing classification
- the limits of inferred consent for SMS to published sole-trader mobiles
- masking and recording
- whether a provider-paid referral service loses the small-business privacy exemption by "trading in personal information"
- offshore-processing disclosure for US-hosted model, messaging and voice vendors

## Liquidity is built one suburb-and-trade cell at a time

### Constrain, recruit supply first, and keep cold outreach as overflow

Lenny Rachitsky's interviews with operators of 17 marketplaces found that most constrained their market and most went supply-first ([Greylock](https://greylock.com/blog/lessons-learned-growing-successful-marketplaces-2/)):
- **16 of 17 initially constrained their market.** Thumbtack was the exception, because low-frequency services forced it to cast a wide net.
- **14 of 17 went supply-first.**

Thumbtack's founders hand-collected local pros' email addresses to seed supply ([Alexander Jarvis](https://www.alexanderjarvis.com/thumbtack-doing-things-that-dont-scale)). Airtasker's Sydney launch showed the opposite failure: sign-ups to do tasks far outran tasks posted, a mistake its founder later called embarrassing and costly ([Pulse 2.0](https://pulse2.com/airtasker-profile-tim-fung-interview/)).

The closest Australian precedent is **Jim's Group**. One central number routes leads to franchisees who pay roughly **A$9–18 per lead** on top of a monthly fee, and Jim's Electrical charges A$27.50 ([Jim's franchise FAQs](https://jims.net/jims-franchise-faqs-answered/); [Jim's Electrical](https://jims.net/jims-electrical-franchise-better-leads/)). Your product is that model with the call centre replaced by software.

This product has one cold-start advantage the 2015 concierges lacked: **"virtual supply"**. The agent can text any business listed on Google from request number one. But tradie non-answer rates mean cold outreach cannot hold a 15-minute promise, so blend two kinds of supply:
- **A committed roster** that serves every "now" job.
- **Cold outreach**, used as overflow for "quote" jobs and as a recruiting channel.

Every responsive cold contact gets converted into a roster member. Google's terms let you store only `place_id` indefinitely ([Places policies](https://developers.google.com/maps/documentation/places/web-service/policies)), so phone numbers are fetched live at request time and your own provider table grows only from first-party, consented records.

### Launch with urgent and small jobs, and treat painting as a quote

The supply research recommends launch categories whose providers already run on answering the phone fast:
- **Handyman and odd jobs**, the brand-defining "hang a poster by 3pm".
- **Locksmiths**, the purest "call me now" moment.
- **Emergency plumbing**: blocked drains and hot water.
- Optionally **end-of-lease cleaning or rubbish removal**, where Oneflare's closure left lead-hungry providers.

Electricians come next. Painting is a slow quote cycle and a poor fit for a 15-minute promise, so run it as a same-day "quote" category. In NSW, residential work of **A$5,000 or more needs a licence** even for a handyman ([BizCover](https://www.bizcover.com.au/blog/handyman-licence-nsw/)), so triage should flag large handyman jobs. Electrical, plumbing and gas work must only reach licence-checked providers.

**Sydney** is the supply note's pick. It has the most automatable licence checks through the NSW Trades API and the densest concentration of hipages and Airtasker grievances. Your home city wins if it differs, because in-person recruiting matters more than market size. Start with one **3–5 km zone** of inner-ring suburbs, Monday to Saturday, 7am–6pm.

Roster sizing differs between the notes, and the two figures fit together as stages:
- **3–5 committed providers per category in a zone** is the floor to open the cell (liquidity note).
- **8–12** is what a reliable 15-minute promise needs once only some providers are free at any moment (supply note).

### A six-week MVP you run by hand

| When | Build | Supply | Demand | Exit test |
|---|---|---|---|---|
| Week 0 | Linq sales call (+61?); Twilio AU KYC bundle (ABN, AU address); Supabase Sydney; book a legal opinion | Pick the zone and 3–4 categories; build a `place_id` prospect queue | — | Linq answer in hand; numbers approved |
| Week 1 | Sendblue sandbox and a Twilio 04; inbound route, schema, one workflow with approval hooks; console with click-to-call bridge | Phone 20–30 providers in calling hours; capture express consent; ABN and licence checks; send vCards | Up to 10 testers on the sandbox (its limit is 10 verified contacts) | 20 end-to-end test jobs |
| Week 2 | Masking router, 4 local proxies, call-record callbacks; contact card; Haiku triage under your approval; Linq line if contracted | Reach 40–60 roster providers | 20–50 seed users: neighbours, 2–3 local Facebook groups | First real callbacks; time-to-callback measured |
| Week 3 | Automated SMS job cards and YES parsing; triage and reply-parsing evals in CI; Langfuse | Convert every responsive cold contact; weekly provider summaries | Letterbox drop with fridge magnets to 2–3k homes; contact card after every success | Fill ≥60%, median time-to-first-call ≤20 min |
| Week 4 | Scripted Twilio call to non-responders inside calling hours; reroute timer; cost ledger | Strikes and ranking live | Start 3–5 business conversations: self-managing landlords, a small agency, strata, short-stay hosts | ≥60% fill with at most one founder intervention per job |
| Weeks 5–6 | Retell arm of the A/B; replayed-call or Coval voice evals | Grow only where demand needs it | Review request logs; decline out-of-scope requests instantly | Pass the launch gates below |

Supply is recruited by founder phone calls. A real job in hand is the strongest pitch you have: when a request lands in a thin cell, you contact unrecruited providers about that specific job, by SMS or by phone in calling hours.

The modelled vendor spend for the whole MVP is small: about A$1,800–3,200 for six weeks, covering fixed costs, the reported Linq setup fee, and 300 requests at US$1.1–1.8 each. This is an estimate that excludes legal advice and your time. **The real cost is founder minutes per request**, which the liquidity note puts at about A$3.33 (five minutes at an assumed A$40 an hour).

### Gates decide when a cell may expand

There are no authoritative published thresholds for fill rate or time-to-fill, so the liquidity note proposes self-set gates. Measure them **per suburb cluster × category × time band**, because city-wide averages hide thin cells.

| Metric | Launch bar | Expansion gate |
|---|---|---|
| In-scope rate (requests the service is built for) | ≥80% | ≥80% |
| Fill rate (a real provider speaks to the customer within the SLA) | ≥60% | **≥80% for 4 consecutive weeks** |
| Time to first call, "now" jobs in staffed hours | Median ≤20 min | Median ≤15 min, p90 ≤45 min |
| Provider acceptance | Cold ≥20–25%; roster ≥60% | Same |
| Connect rate (accepted, then actually reached the customer) | ≥85% | ≥90%; hipages reports 84% on shared leads ([WebBlend](https://webblend.au/is-hipages-worth-it/)) |
| Booked-job rate (both sides report a job or quote visit) | Measure | ≥40% |
| Customer repeat within 90 days | Measure | ≥25%, including business accounts |
| Paying-provider retention, month on month | — | ≥70% |
| Committed roster per category in the zone | 3–5 | 8–12 before advertising a 15-minute promise |

Expansion order:
- **Expand category before geography** when the request logs cluster, as GoButler did when it narrowed to flights.
- Add one or two adjacent cells at a time.
- **Months 2–3:** turn on the provider fee after the free connections. Targets are **≥75% fill, median ≤15 minutes, ≥90% connect, and 5–10 fulfilled requests a day**.
- **Months 4–6:** cover 10–20 suburbs and launch paid business accounts.
- **Months 6–12:** extend hours to after-hours locksmith and emergency plumbing at premium fees; hire part-time ops help; apply for Apple Messages for Business; add tradie-side value such as turning a provider's own missed calls into callbacks.
- **Year 2:** a second city. Melbourne's open licence data makes it the natural next one ([DataVic BPC register](https://discover.data.vic.gov.au/dataset/bpc-building-practitioner-register)). Add distribution through ChatGPT or Claude apps, as Airtasker already does through its MCP ([Investing.com, Airtasker FY26 call](https://www.investing.com/news/transcripts/earnings-call-transcript-airtasker-lifts-fy-2026-growth-shares-jump-on-outlook-93CH-4876175)).

**Demand starts hyper-local and should stay cheap until the gates pass.** In rough order of cost:
1. Local Facebook and "buy nothing" groups, posting as a resident offering free callbacks.
2. Letterbox drops with fridge magnets. The liquidity note estimates A$30–150 per activated user, an unvalidated assumption.
3. Tradies leaving cards at jobs.
4. Suburb × category landing pages.
5. Above all, a **contact card sent after every successful call**, with "send this to someone who needs a tradie".

Press works for this kind of product: Magic drew national coverage within weeks of one Hacker News post ([CNN Money](https://money.cnn.com/2015/02/25/smallbusiness/magic-startup/)), and GoButler reached **100,000+ beta users and 1 million+ requests** as a free SMS number ([tech.eu](https://tech.eu/brief/rocket-internet-gobutler-funding)). Hold it back until out-of-scope requests can be declined gracefully. The structural fix for low household frequency is **business accounts**: self-managing landlords, small agencies, strata committees and short-stay hosts, each generating requests every month. Don't compete with Tapi's property-manager software ([Tapi](https://tapihq.com/en-au)); serve the self-managers it doesn't reach.

### Providers pay per connected call, and the margin is in telecom, not AI

The recommended model is that **the provider pays a fixed fee per connected call**. The call must be exclusive and live, with the customer waiting for that call. The first few connections are free; the notes differ between 3 and 10, so test it. There is no lock-in, and calls the customer never answers are refunded automatically. Customers stay free at launch.

"Connected" is defined by the customer's leg of the masked call: answered by a human for 30–60 seconds or more, with the customer's "Did Dave call?" reply as the dispute backstop.

| Category | Proposed fee per connected call (hypothesis) | Benchmark |
|---|---|---|
| Handyman, odd jobs, cleaning | A$15 | Airtasker takes 12.5–20% from Taskers plus a 15.95% poster connection fee ([Airtasker support](https://support.airtasker.com/hc/en-au/articles/360031769372)), roughly A$10–20 on an A$60–150 job (estimate) |
| Standard trades | A$20 | Jim's A$9–18 per lead plus about A$750 a month; What's The Damage from A$25 per lead ([WTD FAQ](https://whatsthedamage.com.au/faq/)) |
| Urgent: locksmith, emergency plumbing, after-hours | A$25–40 | Jim's Electrical A$27.50; hipages' implied ~A$33 per connection, derived from A$90.6m revenue over ~2.7m connections, and those leads are shared three ways ([Investing.com, hipages FY26](https://www.investing.com/news/company-news/hipages-fy26-slides-cash-flow-surges-66-as-ai-platform-evolves-93CH-4872530)) |
| Large quote jobs (painting) | A$40+ | Bark leads typically cost about US$20–70 to unlock ([Hook Agency](https://hookagency.com/blog/bark-reviews-contractors/)) |

**Avoid early:**
- a percentage take of job value, which needs payments in the flow plus dispute handling
- consumer subscriptions, which low purchase frequency undermines (Pine AI charges about US$30 a month for a different, high-frequency use: [SiliconANGLE](https://siliconangle.com/2026/05/06/pine-ai-aims-consumer-ai-agent-complex-customer-service-interactions/))
- finance and insurance referral fees

**Later options:**
- a refundable "rush" fee for customers
- a provider priority subscription
- business accounts at an assumed A$49–199 a month

The red team's typical v1 cost per request shows where the money goes:

| Line item | Typical v1, US$ |
|---|---|
| LLM (about 15 Haiku and 3 Sonnet calls) | 0.06 |
| Discovery (half of jobs need Places) | 0.05 |
| Provider SMS (4 job cards, 3 "taken" notices, the masked-number text, inbound replies) | 0.44 |
| SMS to customers without iMessage (assumed ~45% of customers × 4 messages) | 0.09 |
| Outreach calls (2 × ~1 min; scripted $0.075 or Retell ~$0.15 a minute) | 0.15–0.31 |
| Masked callback (5 min via a local 02 proxy) | 0.43 |
| Linq line amortised (US$250 ÷ 1,000 requests) | 0.25 |
| Workflow, compute, tracing | 0.01 |
| **Total** | **≈1.5–1.9 (A$2.3–2.9)** |

SMS and the masked call each cost about seven times the LLM. A request that goes unfilled still burns about US$0.6–1.2. The cost levers are therefore:
- roster-first fill
- one-segment texts
- fewer calls

Cheaper models are not a lever.

The unit economics below are this report's estimates. They combine the red team's per-request costs with the liquidity note's assumptions: an A$40-an-hour operator, operator minutes per request falling from 5 to 1, fill rising from 60% to 85%, and an A$20 average fee.

| Phase | Cost per request incl. ops time | Fill rate | Cost per fulfilled request | Contribution at A$20 |
|---|---|---|---|---|
| MVP (5 founder min/request) | ≈A$5.0–6.1 | 60% | ≈A$8.4–10.2 | Negative while connections are free |
| v1 (≈2 min/request) | ≈A$3.6–4.3 | 75% | ≈A$4.9–5.7 | ≈A$14–15 (≈72–76%) |
| Scale (≈1 min/request) | ≈A$2.2–2.8 | 85% | ≈A$2.6–3.3 | ≈A$17 (≈85%) |

Break-even on v1 fixed costs takes only **40–100 fulfilled requests a month**. Covering an assumed A$10,000 monthly founder draw on top takes roughly **700–800 a month, about 25 a day** (estimate). That is higher than the liquidity note's ~570 because the red team's corrected telecom costs and fixed costs are now included.

A consumer-only path at an assumed 1–3 requests per household per year needs several thousand active users. **Thirty to a hundred business accounts at 5–30 requests a month each** reach the same volume. That is the arithmetic case for selling to landlords and strata early.

## Fill rate, Apple and Google are the real risks

| Risk | Evidence | Mitigation | Early warning |
|---|---|---|---|
| Tradies don't answer, or accept and don't call | 60% of 180 test calls unanswered (vendor); 26% of Google AI calls unanswered; 45% of construction SMBs lose work to slow replies | SMS first; roster with an explicit callback promise; 3–5 in parallel; reroute timer; strikes; staffed hours only for "now" jobs | Time to YES; accepted-but-no-call rate |
| Small jobs don't interest trades | Travel and setup costs are fixed per job | Route to handymen and odd-job specialists; frame a minimum call-out; bundle tasks | Decline rate by category |
| iMessage line flagged, or Apple enforcement | Linq lines carry ACTIVE or FLAGGED status ([Linq key concepts](https://docs.linqapp.com/channel/imessage/getting-started/key-concepts/)); Lindy's self-built bridge was banned ([Lindy](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)); Apple shut down Beeper Mini in 2023 ([Tom's Guide](https://www.tomsguide.com/phones/rip-beeper-mini-imessage-on-android-is-now-truly-done)) | Inbound-first traffic and no blasts; a line-status webhook; contact cards carrying both numbers; the channel adapter; an Apple Messages for Business application at traction; no annual lock-in at MVP | Line status; delivery receipts |
| Google, Airtasker or hipages enters | Ask for Me covers US home repair ([JobNimbus](https://jobnimbus.com/blog/google-ai-calling-home-services)); Gemini Call for Me is limited to US Pixel owners calling US numbers ([TechCrunch](https://techcrunch.com/2026/09/24/google-tests-letting-gemini-make-phone-calls-initially-for-us-pixel-owners/)); Airtasker is in ChatGPT ([iTWire](https://itwire.com/business-it-news/data/airtasker-has-entered-the-chat-ai-meets-real-world-help-with-new-chatgpt-launch)) and turned a profit with A$239.8m in gross marketplace volume ([Airtasker FY26 release](https://bulletin.webull.com/qbd/announcement/20260826/499500381/263c368f7e3db748bd39b471f9d1e7b5.pdf)) | Win on callback promises, roster density, business contracts and the saved-contact habit; move while Google's calling stays US-only | Competitor announcements in Australia |
| Scope creep | See the 2015 concierges below | Category, zone and hours whitelist; instant polite decline; never buy, deliver or book | In-scope rate |
| Low purchase frequency | Household services are infrequent (assumed) | Business accounts; contact-card sharing; consented seasonal nudges | 90-day repeat rate |
| Carrier spam labels | Telstra's "Suspicious Calling Pattern"; iOS 26 screening | Pool pacing, vCards, per-number health monitoring | One number's answer rate dropping |
| Regulation | Telemarketing classification unresolved; lead-generation scrutiny; automated-decision transparency from 10 Dec 2026 | Stricter reading, consent ledger, finance excluded, legal opinion | Complaints, opt-out rate |

The Apple risk deserves a precise framing. **Linq delivers iMessage through Apple accounts on real Apple hardware, not through any Apple-sanctioned channel.** Its documentation already includes a reputation error that restricts a sending line ([Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)). The realistic failure is losing or throttling your published line, not losing the whole platform overnight. That is why the saved contact must carry the Australian SMS number too.

Apple's sanctioned path now exists. On 4 June 2026 Apple approved **Poke as the first AI agent on Messages for Business**, after a couple of months of changes. Its conditions were access to live human support and AI labelling, and Poke pays its messaging provider a fee per user ([TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/)). But Messages for Business is not a phone number you text, it is customer-initiated through Apple's entry points, and it excludes Android. It is the durability play once traction exists, not a launch channel. Poke itself ran on Linq first, then moved to Apple's channel, then sold to Cognition in July 2026 ([Dealroom](https://dealroom.co/news/140804-devin-maker-cognition-acquires-poke-the-ai-agent-native-to-apple-message/)).

Other channels are out for launch:
- **RCS:** iPhone RCS still does not work on Australian carriers ([EFTM](https://eftm.com/2026/10/iphone-support-for-rcs-messaging-in-australia-still-no-closer-to-working-281910)).
- **WhatsApp:** it bans general-purpose AI assistants but allows task-specific business bots, which makes it a later Android channel rather than a launch one ([respond.io](https://respond.io/blog/whatsapp-ai-chatbot-policy)).

### The 2015 concierges failed on scope and humans, and only one of those is solved

The 2015–2018 text-a-number concierges proved demand and failed on cost:
- **Magic** reportedly broke even on half its orders, **lost money on a quarter**, and later added a US$100-an-hour tier for complex requests ([TechCrunch](https://techcrunch.com/2015/02/27/catch-a-tiger-by-the-toe/); [Fortune](https://fortune.com/2016/01/05/magic-assistant/)).
- **GoButler** dropped general concierge work in March 2016 to become a flight assistant, the one category its users asked for most ([Deutsche Startups](https://www.deutsche-startups.de/2016/03/21/gobutler-ist-kein-full-service-butler-mehr/)).
- **Facebook M** reached only about **2,000 people** before closing in January 2018 ([Engadget](https://www.engadget.com/2018-01-08-facebook-m-ai-assistant-closure.html)). Commentators reported it never passed roughly **30% automation** ([Motley Fool](https://www.fool.com/investing/2018/01/12/facebook-kills-its-answer-to-siri-and-alexa.aspx)).

In 2026 the human labour those companies paid for (searching, calling around, following up) costs cents to a couple of dollars per request. The product's structure is also kinder: the provider does and is paid for the actual work, so the concierge never buys, delivers or books anything.

Three things 2026 does not fix:
- unbounded requests outside the provider network
- low purchase frequency
- tradies who don't answer

Each has a structural answer in this plan: the whitelist, business accounts, and the committed roster. GoButler's pivot is also the method for choosing what to add next: **let the request logs pick the next category**.

### Resolve these unknowns in the next 30 days

| Priority | Unknown | Why it matters | How to resolve |
|---|---|---|---|
| 1 | Can Linq provision **+61 iMessage lines**? Also its price, setup fee, contract term, per-line daily caps (competitors report 50–150 a day), how fast a flagged line is replaced, whether status updates inside customer-started threads count as replies, its data-processing terms, whether it is an Apple Messages for Business provider, and whether the uncorroborated report that it is closing outreach accounts from 19 October affects you ([Blue Reacher](https://bluereacher.com/best/imessage-api)) | The published number is the product, and a +1 line forces a separate Australian SMS identity | Linq sales call in week 0. Fallbacks: a +1 iMessage line, which the red team expects to work for Australian iPhone users over data, plus the AU 04 for SMS. Check LoopMessage, whose Australian senders are reported by one review and contradicted by another ([Blue Reacher review](https://bluereacher.com/reviews/loopmessage-review); [GetApp](https://www.getapp.co.uk/software/2073318/loopmessage)) |
| 2 | Is an SMS or AI-call job offer "telemarketing" or a commercial message? Where are the inferred-consent limits for published sole-trader mobiles? How do masking and recording rules apply? Does the small-business privacy exemption survive? How should offshore processing and automated decisions be disclosed? | Sets calling hours, consent design and the privacy policy | A short Australian legal opinion before automated calling |
| 3 | Twilio AU details: KYC timing under the Scams Prevention Framework, the conflicting US$8.25 vs US$20 mobile-number fee, per-second vs per-minute billing rounding, whether answered-by detection works on dialled legs of a masked call, whether 02 numbers display cleanly as caller ID on mobiles | Moves variable cost by roughly ±US$0.2 a request and settles the proxy design | Twilio support plus a 50-call test on real AU mobiles |
| 4 | Tradie behaviour: SMS reply rate and time to YES, answer rate on the sticky 04, scripted vs Retell acceptance, willingness to pay A$15–35 per connected call | Sets fill rate, roster size and price | First 100 jobs; ask the first 20 roster providers about price |
| 5 | Customer behaviour: answer rate on proxy calls with and without the saved contact; drop-off after the clarifying question | Sets the connect rate | A/B tests in month one |
| 6 | Vercel Workflow limits: maximum hook and sleep lifetime, where step data is stored, native per-key concurrency | Two-hour waits and 72-hour sessions depend on them | Docs plus a test run |
| 7 | OpenAI's GPT-6 Luna and 6.1 Sol prices, GPT-Live-1's price, and whether OpenAI's SIP connector can place outbound calls | Matters only for failover and the Phase 2 voice bake-off | Check openai.com before budgeting |
| 8 | Whether Haiku 5.5 and Sonnet 5.5 run on Amazon Bedrock with an Australia-only inference profile, which exists for older Claude models ([AWS](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-bedrock-cross-region-inference-for-claude-sonnet-4-5-and-haiku-4-5-in-japan-and-australia/)) | Matters only if counsel requires onshore inference | AWS console check |

### How much weight the evidence can bear

Every one of the seven notes worked from search-result summaries. WebFetch failed with DNS errors on almost every vendor domain, so even "official" prices were seen as snippets of official pages. The one exception is Anthropic, whose documentation was read directly and whose prices and model behaviour were cross-checked against Anthropic's API reference.

Confidence varies by claim type:

| Claim type | Evidence quality |
|---|---|
| OpenAI model names and prices, GPT-Live-1's status | Secondary sources |
| Vercel Workflow GA | A community digest and two trade outlets, not Vercel's changelog |
| Linq pricing and daily caps | Competitors' comparison pages |
| Tradie answer rates | Vendors with an interest |
| hipages figures | Partly from autogenerated summaries, with conflicting subscriber growth |
| "Saved contacts override Telstra labels" | A third-party mirror of Telstra's FAQ |
| Every per-request cost, CAC figure, fee band, fill-rate target and gate in this report | Modelled estimates or self-set recommendations, not benchmarks |

None of this changes the architecture: the structural choices hold across plausible price errors. It does mean the first job of the system, from day one, is to log real `usage`, call durations and per-vendor costs into the cost ledger, and to replace these numbers with your own.

## Conclusion

**The masked callback is the core asset of this business, and it is about 200 lines of code.** That one component does four jobs:
- It protects the customer's number.
- It labels the incoming call through the saved contact card.
- It produces the call record that makes "pay only when connected" credible to tradies.
- It generates the provider-quality data that ranks the roster.

Google's and Yelp's agents return quotes and summaries, so they never own the moment two humans start talking. Owning that moment is the defensible version of your belief in human-to-human confirmation.

Two further implications follow. First, **the AI's share of the work should shrink as the business succeeds**. Every roster tradie who answers a text with YES removes a voice call. Language models earn their keep in cold-start overflow and in turning cold contacts into roster members. By the scale phase, the largest cost line is human operations, not tokens. So founder hours belong in supply density, the consent ledger and business accounts, not in agent sophistication.

Second, the whole stack can be assembled in weeks from rented parts, which cuts both ways. It is why you should move during the window while Google's calling agents stay US-only and Airtasker stays a post-and-wait marketplace. It is also why the technology itself will never be the moat. What lasts is a suburb-by-suburb roster that has promised to call back, the contracts with landlords and strata managers, and a contact card already saved in thousands of phones.
