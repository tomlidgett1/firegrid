# Frontier Stack Challenge: Attacking the "Default" 2024-era Stack for an iMessage Callback Concierge (as of 18 October 2026)

Scope and method notes for the report writer:
- I used 30 web searches. WebFetch reached only Anthropic's official docs (platform.claude.com and code.claude.com). openai.com, platform.openai.com, developers.openai.com, community.openai.com, ai.google.dev, vercel.com, blog.cloudflare.com, telnyx.com, techcrunch.com, emergent.sh, justcall.io, beri.net and codebridge.tech all failed DNS. So **the only primary-source-verified facts are the Anthropic ones**. Every OpenAI, Google, Vercel, Cloudflare, voice-vendor and benchmark figure below comes from search-result snippets of secondary or vendor pages, and is labelled that way.
- Search-result aggregators were often stale or contradicted each other. For example, an aggregator snapshot from 20 Aug 2026 had no "GPT-6.1 Sol", and secondary Anthropic pages listed Sonnet 5 and Opus 5 while the official docs list Opus/Sonnet/Haiku 5.5 and Fable 5.1. Treat any model name or price not marked "official" as needing a check on the vendor's pricing page before budgeting.
- Background knowledge (my training runs to about June 2026) is kept in the **Gaps** sections and labelled "Background (unverified this session)", per the rule that every claim must carry a source.

---

## 1. Models: frontier and fast/cheap models (OpenAI, Anthropic, Google, open-weight), pricing and tool use; which suit triage, dispatch and real-time voice; is speech-to-speech good enough for outbound business calls in Australian English?

### Takeaway
GPT-4o-class plus Chat Completions is now two to three model generations stale. Every major lab now ships a tiered family with a tiny model at about $0.10/$0.50 per million tokens: Anthropic Haiku 5.5 is official, and OpenAI "GPT-6 Luna" is reported by secondary sources. That tier is right for intent triage. For planning and dispatch the mid tier at about $2/$10 is enough (Sonnet 5.5, reported GPT-6.1 Sol). Real-time voice has moved to full-duplex speech-to-speech models (OpenAI GPT-Live-1, gpt-realtime-2.x, Gemini Live native audio). The best 2026 evidence still says a well-built cascade (STT, then LLM, then TTS) is safer for noisy, accented, task-oriented calls. No evidence specific to Australian English was found.

### Cited Findings
**Anthropic (official, verified via docs fetch):**
- Current lineup and list prices per million tokens (input/output):
  - Claude Fable 5.1, $10/$50, "for demanding reasoning and long-horizon agentic work".
  - Claude Opus 5.5, $4/$20, recommended starting point "for most workloads".
  - Claude Sonnet 5.5, $2/$10, "best combination of speed and intelligence".
  - Claude Haiku 5.5, from $0.10/$0.50, "for high-volume, latency-sensitive tasks such as classification, extraction, and routing".
  - All four have a 1M-token context window and a June 2026 reliable knowledge cutoff.
  - Source: [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Haiku 5.5 is $0.10/$0.50 for prompts up to 100k tokens and $0.50/$2.50 above that. Cache hits are $0.01/MTok and Batch is $0.05/$0.25 — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- The Batch API is 50% off. Prompt-cache reads cost 10% of base input (5% on Opus 5.5 and Sonnet 5.5) — [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Retirement commitments are "not sooner than" 1 Sep 2027 (Fable 5.1), 22 Sep 2027 (Opus 5.5), 28 Sep 2027 (Sonnet 5.5) and 7 Oct 2027 (Haiku 5.5). Legacy models (Opus 4.5–5, Sonnet 4.6/5, Haiku 4.5) are still available — [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Data residency: `inference_geo: "us"` adds a 1.1x price multiplier, and regional or multi-region cloud endpoints carry a 10% premium. Only the "global" and "us" options appear; no Australia option appears on the pricing page — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Server-side web search costs $10 per 1,000 searches plus tokens — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- Secondary sources lag the official lineup. One reports Sonnet 5 (30 Jun 2026) at $2/$10, with launch pricing made permanent on 10 Aug 2026 — [soci.ai](https://www.soci.ai/blog/local-memo-anthropic-releases-claude-sonnet-5-citing-gains-in-autonomous-task-execution/); [tech-insider.org](https://tech-insider.org/?p=17064). Another reports Fable 5 on 9 Jun 2026 at $10/$50 — [aiindigo](https://aiindigo.com/arena/event/anthropic-claude-fable-5-release-june-2026).

**OpenAI (secondary only; OpenAI domains unreachable):**
- A capture of OpenAI's pricing page on 5 Oct 2026 lists:
  - GPT-6 Astra at $10/$50 (premium tier)
  - GPT-6.1 Sol at $2/$10
  - GPT-6 Luna at $0.10/$0.50 (cheapest tier)
  - new GPT-Live-1 at $0.05/min and GPT-Transcribe at $0.0045/min
  - It says the GPT-5.6 lineup was replaced.
  - Source: [UsagePricing capture](https://www.usagepricing.com/blueprint/activity/openai-2026-10-05-gpt-6-api-launch)
- **Conflict:** a guide dated 6 Oct lists GPT-5.6 Sol at $4/$20 with a promo running at least to 21 Nov 2026 — [Mem0](https://mem0.ai/library/llms-and-models/openai-api-pricing); [Digital Applied tracker](https://www.digitalapplied.com/blog/ai-model-api-pricing-tracker-q3-2026). UsagePricing says no promo badge remains.
- In late July 2026 OpenAI cut GPT-5.6 Luna's price by 80% and Terra's by 20% — [BleepingComputer](https://bleepingcomputer.com/news/artificial-intelligence/openai-says-its-new-gpt-56-models-are-becoming-more-cost-efficient); [ProPakistani](https://propakistani.pk/2026/08/01/openai-cuts-gpt-5-6-luna-price-by-80-soon-after-launch/)
- DevDay 2026 was held around 29 Sep 2026. Headline launches were "Dots" (always-on agents with their own cloud computer) and a $500 plan — [CNBC](https://www.cnbc.com/2026/09/29/openai-devday-2026-live-updates.html); [Reworked](https://www.reworked.co/ai-news/the-biggest-announcements-from-openai-devday-dots-agents-new-500-plan/). One roundup is headlined "From Dots to GPT-6.1 Sol" — [emergent.sh](https://emergent.sh/news/openai-devday-2026).
- An aggregator snapshot of the Artificial Analysis Intelligence Index dated 20 Aug 2026 had GPT-5.6 Sol #1 at 59, Gemini 3.7 Flash at 56 and GPT-5.6 Terra at 55. Index v4.1 (June 2026) includes agentic components Terminal-Bench 2.1 and τ³-Bench Banking — [anotherwrapper AA index](https://anotherwrapper.com/tools/llm-pricing/evals/artificial-analysis). This predates the reported GPT-6 / Opus 5.5 generation.

**Google (secondary only; ai.google.dev unreachable):**
- Gemini 3 Flash is $0.50/$3.00 per MTok as of 15 Sep 2026 — [anotherwrapper](https://anotherwrapper.com/llm-pricing/gemini-3-flash-preview); [BenchLM](https://benchlm.ai/google/api-pricing)
- Gemini 3.8 Flash prices conflict: $0.75/$3.75 per [anotherwrapper](https://anotherwrapper.com/tools/llm-pricing/gemini-3.8-flash) versus $0.375/$1.88 per [pricepertoken](https://pricepertoken.com/pricing-page/model/google-gemini-3.8-flash)

**Open-weight:**
- As of April 2026, a vendor tau-bench page names Kimi K2.6 as top open-weight model, with DeepSeek V4 also strong, and says proprietary models still lead — [ertas.ai tau-bench](https://www.ertas.ai/benchmarks/tau-bench)
- Kimi K2 Thinking (Dec 2025) was "one of the first open-weight models" able to chain hundreds of tool calls — [Understanding AI](https://www.understandingai.org/i/181645140/13-llama-from-meta)
- AWS's Kiro added DeepSeek, MiniMax and Qwen as open-weight options and describes DeepSeek 3.2 as good at long tool-calling chains (vendor characterisation) — [Kiro changelog](https://kiro.dev/changelog/models/deepseek-minimax-and-qwen-now-available-as-open-weight-model-options/)

**Real-time voice models:**
- **GPT-Live-1 and GPT-Live-1 mini launched 8 Jul 2026.**
  - They are full-duplex: they speak and listen at once and handle interruptions naturally.
  - When a request needs reasoning or agentic work, they delegate to a text model (e.g. GPT-5.5) in the background without pausing the voice.
  - At launch the API was "coming soon".
  - Sources: [TechCrunch](https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/); [Yahoo Tech](https://tech.yahoo.com/ai/chatgpt/articles/openai-launches-gpt-live-voice-130906310.html)
- One blog says GPT-Live-1 reached the API on 10 Sep 2026 and can pair with your own backend model; this is a single source — [explainx.ai](https://www.explainx.ai/blog/gpt-live-1-api-openai-voice-agents-september-2026). The $0.05/min price is from the UsagePricing capture above and is unverified.
- The OpenAI developer forum lists "New Realtime models on the API: gpt-realtime-2.1 and gpt-realtime-2.1-mini" on 14 Sep 2026 (search snippet) — [OpenAI community announcements](https://community.openai.com/c/announcements/6)
- Azure Foundry docs list gpt-realtime-1.5 and gpt-realtime-2 (2026-05-07) with SIP support — [Microsoft Learn](https://learn.microsoft.com/en-my/Azure/foundry/openai/how-to/realtime-audio-sip)
- **Gemini Live on Vertex:**
  - The model `gemini-live-2.5-flash-native-audio` is GA, released 12 Dec 2025, with a **discontinuation date of 13 Dec 2026**.
  - It has 30 HD voices in 24 languages, function calling and Google Search.
  - Google recommends a server-to-server design for telephony.
  - Sources: [Vertex model page](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api); [Live API overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api)

**Speech-to-speech (S2S) vs cascade evidence:**
- **JustCall (Mar 2026), 278 simulated customer-service calls:**
  - S2S agents from OpenAI, Google and xAI completed only **26–38%** of tasks once background noise and varied accents were added.
  - A text-based agent completed **85%** of the same tasks.
  - This compares S2S with text, not with a cascade.
  - Source: [JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html) (via search snippet)
- **Latency (Future AGI):**
  - Typical warm time-to-first-audio is 600–1200 ms for a cascade and 300–500 ms for S2S.
  - Under realistic conditions OpenAI's realtime model measured 0.90 s and Google's 1.14 s.
  - A streamed cascade (Deepgram + Qwen + ElevenLabs) measured 755 ms.
  - Future AGI rates cascade tool calling "mature" and S2S tool calling "working… edge cases still rough".
  - Source: [Future AGI](https://futureagi.com/blog/cascaded-voice-ai-vs-speech-to-speech-2026/)
- Codebridge recorded 499 live calls across four architectures. The fastest stack answered in 707 ms, and the study reports a turn-taking failure "the entire industry currently shares" — [Codebridge](https://www.codebridge.tech/articles/voice-ai-phone-agents-latency-benchmark) (snippet only)
- Coval argues that for most 2026 enterprise voice deployments the cascade still wins because it can be evaluated: an S2S call has no native transcript to grade — [Coval](https://coval.ai/blog/voice-ai-models-2026/)
- Tool calls still add wait time: the model cannot begin speaking until they return — [SoftwareSeni](https://www.softwareseni.com/voice-agent-latency-solved-enough-for-production-benchmarks-and-architecture-tradeoffs)

### Inferences
- **(a) Intent triage** ("need someone to call me about painting my wall" → {trade, suburb, urgency, callback window, missing fields}): use the $0.10/$0.50 tier with structured outputs, i.e. Claude Haiku 5.5 (official) or GPT-6 Luna (reported).
  - At about 2k input and 200 output tokens, a Haiku 5.5 triage costs about $0.0003 (my arithmetic from official prices).
  - Model cost is irrelevant here. The things that matter are schema reliability, latency, and a second provider as fallback.
- **(b) Planning/dispatch** (choose providers, write the voice brief, decide when to escalate or retry): the $2/$10 tier is enough, i.e. Sonnet 5.5 (official) or GPT-6.1 Sol (reported).
  - A 20k-in/2k-out dispatch turn on Sonnet 5.5 costs about $0.06.
  - Escalate to Opus 5.5 ($4/$20) only on evals-proven hard cases.
  - The $10/$50 tier (Fable 5.1, GPT-6 Astra) is not justified for this workflow.
- **Text model spend is a rounding error next to voice minutes.** Five parallel calls × 1.5 min × about $0.10–0.20/min ≈ $0.75–1.50 per request (inference using the platform per-minute ranges in §3). So the cost lever is fewer, better-targeted calls and SMS-first contact, not cheaper LLMs.
- **(c) Real-time voice:** the outbound business call is short and narrow ("Can you call Sarah in Marrickville about a wall-painting job within 30 minutes? Yes/no/when/rough price?"). It needs about two to four tools (record_outcome, end_call, maybe send_sms). That is the case where S2S tool-calling weakness matters least.
  - But JustCall's noise and accent collapse is directly relevant: tradies answer on job sites, in utes, on speaker.
  - Recommendation: run a bake-off of (i) a cascade (Deepgram Flux/Nova or Cartesia Ink-2 → fast LLM → Cartesia/ElevenLabs AU voice) against (ii) GPT-Live-1 or gpt-realtime-2.1 over SIP. Use about 50 recorded or simulated AU calls with noise.
  - Choose on task completion, not latency. Default to the cascade until S2S wins on that bake-off.
- The reported pattern of GPT-Live delegating reasoning to a text model in the background is the architecture this product wants anyway: a voice front plus a text brain. But it is days to weeks old in the API and the evidence is a single source.
- Do not build on `gemini-live-2.5-flash-native-audio`: it is scheduled for discontinuation on 13 Dec 2026, less than two months away.
- Open-weight models are only worth it later, as a cost hedge via hosted inference. Self-hosting is not justified for a solo founder when the closed small tier already costs $0.10/MTok.

### Gaps
- Official OpenAI and Google pricing and model pages could not be fetched. GPT-6 / GPT-6.1 names and prices, GPT-Live API GA status and $0.05/min, and gpt-realtime-2.1 all need checking on openai.com and ai.google.dev.
- No current (Oct 2026) tau-bench or τ³-bench tool-use leaderboard numbers were found for GPT-6.x, Claude 5.5 or Gemini 3.8.
- No benchmark found for S2S or cascade on **Australian English** accents. Also unknown: which vendors offer native Australian voices on their realtime models.
- No Australian-region inference was found for Anthropic; OpenAI and Google AU regions were not checked. This matters if privacy counsel wants AU data residency.
- Background (unverified this session): Anthropic has no public speech-to-speech realtime API. OpenAI's Responses API (Mar 2025) is the recommended successor to Chat Completions for agentic work, and the Assistants API is being sunset. A secondary source does say Assistants is "being deprecated in mid-2026" — [blckalpaca](https://blckalpaca.at/en/knowledge-base/ai-agents/ai-agent-frameworks-comparison/openai-agents-sdk).

---

## 2. Agent harnesses, runtimes and protocols (OpenAI Agents SDK, AgentKit, Responses API, Codex SDK, Claude Agent SDK and Managed Agents, Google ADK/Agent Engine, Vercel Workflow DevKit, Cloudflare Agents, Temporal/Inngest/Restate, MCP, A2A, AP2/ACP/Stripe): which are production-ready?

### Takeaway
The real problem in this product is a **durable, event-driven wait**: fan out to N providers, wait up to 30 minutes for the first "yes", time out, retry, and notify the user. That is better served by a durable-execution engine (Inngest, Vercel Workflow, Restate or Temporal) than by Cloud Functions plus cron, and better than any hosted "agent sandbox" product. The 2026 hosted agent runtimes (Claude Managed Agents, OpenAI Agents API and Dots) are aimed at long-running, sandboxed knowledge or coding work. They are beta, priced per session-hour, and the wrong shape for a fast message-and-call dispatcher. Coding-agent SDKs (Claude Agent SDK, Codex SDK) are also the wrong shape. MCP is worth adopting internally. A2A and agent-payment protocols are irrelevant for v1.

### Cited Findings
**OpenAI:**
- AgentKit and Agent Builder launched at DevDay on 6 Oct 2025 — [OpenAI](https://openai.com/blog/introducing-agentkit); [osher.com.au](https://osher.com.au/blog/openai-agentkit/)
- OpenAI's own Agents SDK docs say to use Agent Builder only if you specifically want the hosted workflow editor and ChatKit path — [OpenAI Agents SDK docs](https://developers.openai.com/api/docs/guides/agents) (snippet)
- Practitioners move anything complex out of Agent Builder into Agents SDK code so it can be reviewed in pull requests, and note that the hosted runtime is OpenAI infrastructure (lock-in) — [osher.com.au](https://osher.com.au/blog/openai-agentkit/)
- An Agents SDK update on 15 Apr 2026 reportedly added native sandbox execution, a "model-native harness", and MCP and AGENTS.md support. One review still calls it a v0.x API — [blckalpaca](https://blckalpaca.at/en/knowledge-base/ai-agents/ai-agent-frameworks-comparison/openai-agents-sdk) (single secondary source)
- DevDay 2026: the "Agents API" now supports computer use, multi-agent workflows, tool search, tool calling and context management. It is available via API and to Pro 500 and Enterprise users in Codex and ChatGPT Work — [AI Agents Library roundup](https://www.aiagentslibrary.com/blog/openai-devday-2026/); [Reworked](https://www.reworked.co/ai-news/the-biggest-announcements-from-openai-devday-dots-agents-new-500-plan/) (secondary; the sources disagree on details)

**Anthropic (official):**
- **Claude Managed Agents** is a "pre-built, configurable agent harness that runs in managed infrastructure. Best for long-running tasks and asynchronous work."
  - Status: **beta**, header `managed-agents-2026-04-01`.
  - Concepts: Agent, Environment (Anthropic cloud sandbox or self-hosted), Session, Events (SSE).
  - Features: scheduled deployments on cron, MCP, and built-in bash, file and web tools.
  - It is **not eligible for Zero Data Retention or HIPAA BAA** because it is stateful.
  - Source: [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- Managed Agents billing is tokens plus **$0.08 per session-hour** of `running` status — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing). It launched as a public beta on 8 Apr 2026 — [Help Net Security](https://www.helpnetsecurity.com/?p=365593). Named early users are Notion, Rakuten and Asana — [MEXC news](https://www.mexc.com/it-IT/news/1016491).
- The **Claude Agent SDK** is "a library that runs the Claude Code binary", with built-in file and shell tools, hooks, subagents, MCP, permissions and sessions, in Python and TypeScript. Anthropic positions the Client SDK, with its beta tool runner, for direct API use where you write the loop — [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)

**Durable execution:**
- **Vercel Workflow / Workflow DevKit:** docs (last updated 1 Dec 2025) say "available in Beta on all plans". It runs steps on Vercel Functions, uses Vercel Queues, and records inputs and outputs in an event log. No 2026 GA announcement was found — [Vercel docs](https://vercel.com/docs/workflow); [Vercel examples](https://examples.vercel.com/workflow); [StartupHub](https://www.startuphub.ai/ai-news/ai-video/2026/vercels-workflow-devkit-solves-the-brittle-agent-problem)
- **Temporal:** the incumbent, workflow-as-code with history replay and seven SDKs. It raised a $300M Series D at a $5B valuation. Large LLM payloads bloat workflow history — [Spheron](https://www.spheron.network/blog/ai-agent-workflow-orchestration-temporal-inngest-restate-gpu-cloud/); [particula.tech](https://particula.tech/blog/durable-execution-ai-agents-temporal-inngest-restate)
- **Inngest:** TypeScript-first and event-driven (`step.run`). One cost analysis flags a 1,000-step cap per run, an SSPL server licence and concurrency limits.
- **Restate:** journal-and-replay with exactly-once writes, the cheapest managed meter, but the youngest option and BSL-licensed.
- **Cost:** a 50-call agent run costs about 51 billable units on each of Temporal Cloud, Inngest, Restate Cloud and DBOS, or about $80–310/month at 100K runs (pricing checked 16 Oct 2026). Shared rules: deterministic workflow code, idempotent side effects.
- Source for the last three bullets: [beri.net](https://www.beri.net/article/temporal-vs-inngest-vs-restate-vs-dbos-durable-execution-agent-cost) (snippet only)

**Cloudflare:**
- `@cloudflare/voice` (`withVoice(Agent)`) adds a voice pipeline to a Durable Object agent over WebSocket, with SQLite persistence and Workers AI providers including Deepgram. The launch post (Apr 2026) calls it **experimental**; the docs say Beta — [Cloudflare blog](https://blog.cloudflare.com/voice-agents/); [Cloudflare docs](https://developers.cloudflare.com/agents/communication-channels/voice/index.md)

**Protocols:**
- **MCP:** a 2026-07-28 release candidate adds stateless servers, "MCP Apps" and a Tasks extension. Whether the final version shipped is unconfirmed — [mcpplaygroundonline](https://mcpplaygroundonline.com/blog/mcp-2026-roadmap-whats-changing-for-developers)
- **Governance:** MCP and A2A are reportedly under Linux Foundation / AAIF governance — [agentready](https://www.agentready.it.com/blog/a2a-vs-mcp)
- **A2A:** reportedly 150+ supporting organisations, mostly enterprise. v0.3 added gRPC and signed agent cards, and the protocol is "not finished" — [First AI Movers radar](https://radar.firstaimovers.com/a2a-2026-what-technical-leaders-should-watch.md)
- **Agent payments:**
  - AP2 was reportedly donated to the FIDO Alliance on 28 Apr 2026 with v0.2.
  - OpenAI launched Instant Checkout in Sep 2025 and **pulled native checkout in Mar 2026 after minimal uptake**.
  - Stripe expanded its Agentic Commerce Suite at Sessions 2026, added x402 USDC payments in Feb 2026, and launched the Machine Payments Protocol with Tempo in Mar 2026.
  - Sources: [Crossmint](https://crossmint.com/learn/agentic-payments-protocols-compared); [ecorpit](https://ecorpit.com/ucp-acp-ap2-agentic-commerce-standards-merchant-guide-2026/); [The Paypers](https://thepaypers.com/payments/expert-views/the-road-to-agentic-commerce-the-journey-so-far)

### Inferences
- **Production-readiness verdict for this product:**
  - **OpenAI Agents SDK (TS):** usable, but v0.x. It is fine as a thin loop if you are OpenAI-only.
  - **Responses API:** the right OpenAI primitive instead of Chat Completions (background, see Gaps).
  - **Agent Builder / AgentKit hosted:** prototyping only.
  - **Agents API / Dots:** too new; computer-use oriented.
  - **Claude Managed Agents:** beta, sandbox-oriented, and the session-hour plus no-ZDR model is a poor fit for many short, bursty jobs. Waiting 30 minutes for a tradie is a durable-timer problem, not a sandbox problem.
  - **Claude Agent SDK and Codex SDK:** coding-agent harnesses that need a CLI binary and filesystem process. They are the wrong shape for a serverless message/call dispatcher and are **not recommended for non-coding agents of this kind**.
  - **Vercel Workflow:** attractive given the founder's Vercel skills, but beta with no GA evidence.
  - **Inngest:** the most mature TS-first durable option. It has `step.waitForEvent` / `step.sleep`-style primitives (background) that map directly onto "wait for provider reply OR 10-minute timeout".
  - **Temporal:** over-engineered for a solo founder.
  - **Restate:** promising but young and BSL.
  - **Cloudflare voice:** experimental; skip.
- **Recommended shape:**
  - A thin, provider-agnostic tool loop: Vercel AI SDK, or the raw Anthropic/OpenAI SDKs with the Anthropic tool runner. No LangChain.
  - Run it inside durable workflow steps (Inngest, or Vercel Workflow if GA-equivalent stability is confirmed).
  - Firestore can stay as the system of record, or move to Postgres. Waits, timeouts and retries move out of cron.
  - Each "job" is one workflow instance: triage → discover → fan-out (parallel child steps per provider) → `waitForEvent("provider.accepted", timeout)` → notify user → follow-up.
- **MCP:** worth using internally to expose your own tools (provider lookup, place call, send SMS) to whichever model or harness, so you can swap models. Don't build product dependencies on the 2026-07-28 RC features.
- **A2A, AP2, ACP and Stripe agentic commerce: do not adopt.** Tradie AI receptionists expose phone lines, not A2A endpoints (§4), and the product does not take payment in v1. OpenAI's checkout retreat shows agentic-commerce flows are still immature.

### Gaps
- Could not verify the OpenAI Agents SDK's current version or stability, the Agents API's GA status, or Dots pricing, because OpenAI domains were unreachable.
- Google ADK / Agent Engine 2026 status was not searched (budget). Background (unverified): ADK is an open-source Python/Java (and later TS) framework, and Agent Engine is Vertex AI's managed runtime. Both are GCP-centric, which fits Firebase but has a smaller TS story.
- Background (unverified): the OpenAI Codex SDK (TypeScript, Oct 2025) embeds the Codex coding agent and its sandboxed workspace. It is designed for code tasks, not consumer dispatch.
- Background (unverified): Firebase/GCP Cloud Tasks supports delayed, retried HTTP tasks. It is a cheaper middle ground than a new vendor if the founder wants to stay inside Firebase, but it has no workflow-history replay.
- Inngest's current step caps and pricing should be checked on its official pricing page; the 1,000-step cap comes from one analyst.

---

## 3. Voice: SIP-native model endpoints, ElevenLabs Agents, LiveKit, Pipecat, Deepgram, Cartesia, new entrants; turn-taking, latency and cost; voicemail detection; parallel outbound calling

### Takeaway
2026 brought three real advances:
1. SIP-native model endpoints. OpenAI Realtime/GPT-Live over SIP means no media server in between.
2. Model-based turn detection (Deepgram Flux, Cartesia Ink-2, LiveKit Turn Detector v1).
3. Full-duplex S2S models.

Pricing on managed platforms is still $0.08–0.30/min all-in, and vendor latency claims are mostly unverified. Vapi is no longer the obvious default. Its $0.05/min headline is orchestration-only, and ElevenLabs Agents, Retell and Bland bundle more. For a solo founder, a managed platform with batch outbound, answering-machine detection (AMD) and concurrency is still the right v1. Wrap it behind your own interface so you can drop to direct SIP plus model later.

### Cited Findings
**SIP-native model endpoints:**
- OpenAI's voice SIP guide describes **incoming** calls: an incoming-call webhook, signature verification, and a session ID per call. SIP must be enabled for the project and your trunk routed to it. The guide uses "GPT-Live" naming and a deprecated `live.call.incoming` event — [OpenAI voice SIP guide](https://developers.openai.com/api/docs/guides/voice-sip) (snippet; no outbound steps seen)
- One blog says the realtime model reached GA in Apr 2026 with native SIP for placing and receiving calls — [noqta.tn](https://noqta.tn/en/blog/openai-gpt-realtime-voice-agents-sip-mcp-2026)
- Azure documents SIP into realtime sessions — [Microsoft Learn](https://learn.microsoft.com/en-my/Azure/foundry/openai/how-to/realtime-audio-sip)

**Managed platforms:**
- **ElevenLabs Agents:**
  - $0.08/min on every plan, with the LLM and phone line billed on top.
  - Burst minutes above the concurrency limit cost $0.16/min.
  - LLM cost per minute ranges from $0.0005 (GPT-5 Nano) to $0.0446 (GPT-5.5).
  - Sources: [Macha, Sep 2026](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained); [Dupple](https://dupple.com/learn/best-ai-voice-agents)
  - Plans run $0–$990/month: Pro is $99 for 1,238 minutes, Business is $990 for 12,375 minutes, and concurrency limits are the main difference between tiers — [CloudTalk, Jun 2026](https://www.cloudtalk.io/blog/elevenlabs-pricing/)
- **Vapi:** $0.05/min covers only orchestration. Production stacks cost about $0.13–0.30/min all-in — [Zeeg](https://zeeg.me/en/blog/post/vapi-ai-pricing); [ainora.lt](https://ainora.lt/blog/ai-voice-agent-cost-per-minute-2026)
- **Retell:** from $0.07/min, estimator about $0.115/min.
- **Bland:** about $0.11–0.14/min, telephony extra.
- **Scenario:** 10,000 calls/month at 4 minutes each costs about $2,800 on Retell, $3,600–4,400 on Bland and $7,200–8,800 on Vapi with BYOK. The source builds on these platforms, so it is not independent.
- Sources for the last three bullets: [techsy.io](https://techsy.io/en/blog/retell-ai-vs-vapi-vs-bland); [ainora.lt](https://ainora.lt/blog/ai-voice-agent-cost-per-minute-2026); [aiagentrank](https://aiagentrank.io/blog/vapi-vs-retell-vs-bland-2026)

**Frameworks:**
- **LiveKit Agents:**
  - Ships Turn Detector v1 and v1-mini (audio-based end-of-turn models) and adaptive interruption handling.
  - Turn-detection modes: audio model, STT endpointing, realtime LLM, VAD-only and manual.
  - Native SIP telephony.
  - Off LiveKit Cloud, the default is v1-mini on CPU.
  - Sources: [Future AGI frameworks 2026](https://futureagi.com/blog/best-voice-ai-frameworks-2026/); [flaviocopes LiveKit guide](https://flaviocopes.com/livekit.md)
  - Version is unclear: 1.5.8 (May 2026) or "1.6" — [forasoft](https://www.forasoft.com/livekit-ai-agent-development-experts)

**STT and TTS:**
- Deepgram Flux (2 Oct 2025) is "the first real-time Conversational Speech Recognition model built for voice agents", with built-in end-of-turn detection — [Deepgram changelog](https://developers.deepgram.com/changelog/2025/10/2)
- Cartesia Sonic 3.5 TTS is GA. Cartesia Ink-2 streaming STT with built-in turn detection arrived in May 2026, **English only**, and is pitched as a migration path from Flux — [Cartesia changelog](https://docs.cartesia.ai/changelog)
- The 40 ms Sonic Turbo time-to-first-audio claim has only a co-marketing load test behind it — [Future AGI Jul 2026](https://futureagi.com/blog/best-voice-ai-july-2026/)

**Telephony and AMD:**
- Telnyx answering-machine detection costs $0.002 per call (standard) and $0.0065 per call (premium). Telnyx's bundled voice-AI stack is about $0.05/min, SIP trunking from $0.005/min outbound, Telnyx STT $0.015/min and Deepgram Nova-3 $0.005/min — [Telnyx pricing](https://telnyx.com/pricing/voice-api.md); [tooldirectory.ai](https://tooldirectory.ai/tools/telnyx)
- US voice-AI per-minute rates: Telnyx $0.005 vs Twilio $0.014 (vendor page, "medium confidence") — [Telnyx vs Twilio](https://telnyx.com/compare/twilio); [growwstacks](https://growwstacks.com/blog/twilio-vs-telnyx-voice-ai-carrier-comparison)
- A June 2026 comparison found the latency gap smaller than vendors claim, and per-minute carrier rate "is not what drives the bill" — [techsy.io telephony](https://techsy.io/en/blog/voice-agent-telephony-comparison)

**Latency and turn-taking:** see §1. A well-streamed cascade reached 755 ms. The best live stack measured 707 ms, with an industry-wide turn-taking failure — [Future AGI](https://futureagi.com/blog/cascaded-voice-ai-vs-speech-to-speech-2026/); [Codebridge](https://www.codebridge.tech/articles/voice-ai-phone-agents-latency-benchmark)

### Inferences
- **Swap "Vapi by default" for a bake-off.** Compare ElevenLabs Agents (strong voices incl. accents, $0.08/min plus extras, plan-based concurrency) against Retell or Vapi on AU calls. Because the call script is tiny, pick on:
  1. AU voice naturalness, so tradies don't hang up on a robot
  2. AMD/voicemail handling
  3. concurrency and burst pricing for parallel fan-out
  4. transcript and webhook quality for evals
- **"Frontier" path for v2 (not v1):**
  - Direct SIP from an AU carrier trunk (Telnyx/Twilio) into OpenAI GPT-Live or gpt-realtime-2.1, or into a LiveKit Agents worker running a cascade.
  - This removes a platform margin (about $0.05–0.08/min) but adds ops work: scaling workers, recording, AMD, retries.
  - It is only worth doing after volume proves out.
- **Parallel outbound:** concurrency is a plan-tier feature on managed platforms, and burst minutes cost about 2x on ElevenLabs. Fan-out width (e.g. 3–5 providers at once) should be a tunable policy in the workflow, not hard-coded.
- **SMS-first, call-second may beat call-first:**
  - Tradies often ignore unknown-number calls but read texts between jobs.
  - Send an SMS lead offer first, then voice-call non-responders after N minutes. This also cuts voice spend.
  - This is a product hypothesis to A/B test, not a sourced finding.
- **Voicemail:** use carrier AMD (cheap, per call) plus an LLM check on the first utterance. On voicemail, leave a short structured message and follow with an SMS containing the lead and a reply keyword.
- **Bridge instead of callback:** SIP and conference APIs let the agent say "I have the customer on the line, can I connect you now?" and warm-transfer. This could collapse the 5–30 minute target to under 2 minutes for accepting providers. It is an architecture option enabled by programmable telephony, not a new 2026 breakthrough.

### Gaps
- No Australian per-minute rates (AU mobile and landline termination) or AU number regulatory requirements were found for Twilio or Telnyx; check their AU price pages.
- No 2026 evidence on Pipecat. Background (unverified): Pipecat is Daily's open-source Python voice framework with an open "Smart Turn" turn-detection model and a hosted Pipecat Cloud. It is a Python-first alternative to LiveKit Agents, which has both Python and Node SDKs.
- No independent AMD accuracy benchmarks for 2026, and no data on how the voicemail or AI-receptionist greetings common among AU tradies affect AMD.
- No evidence of outbound-call support in OpenAI's SIP docs; only the inbound flow was seen in the snippet.
- No 2026 "new entrant" voice platforms specific to Australia were identified beyond those named. Not verified: whether Deepgram Flux supports en-AU, or how Cartesia Ink-2 being English-only treats Australian English.
- Background (unverified): ACMA rules on calling-line identification and carrier blocking of spoofed or unknown CLIs mean outbound calls should come from a properly provisioned AU number. Unanswered or blocked call rates should be monitored.

---

## 4. Messaging: 2026 changes to iMessage APIs, Apple Messages for Business, RCS (incl. iOS RCS), and agent-to-agent messaging with businesses' own AI receptionists

### Takeaway
Nothing in 2026 changes the core fact: **Apple still has no public iMessage API**. Linq-style managed bridges remain the only way to "text a phone number on iMessage". They carry a platform risk that Linq, not the founder, manages, so keep Linq. RCS is **not** a viable alternative in Australia: the carriers have not enabled business RCS to iPhones. Many AU tradies now run AI receptionists, but there is **no agent-to-agent protocol** at those vendors. The practical play is to make the voice agent detect an AI receptionist and hand it a compact, structured lead, not to "negotiate" with it.

### Cited Findings
- **Linq:**
  - Runs a managed iMessage bridge: it handles the Mac Minis, iPhones, Apple IDs, number rotation and anti-spam strategies, and exposes a REST API.
  - Lindy describes its own self-built iMessage setup being **permanently banned** by Apple, the reason teams move to managed providers.
  - Apple offers no public iMessage API.
  - Apple's sanctioned route, Messages for Business, reportedly prohibits proactive outreach.
  - Source: [Lindy](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)
- Linq raised a $20M Series A led by TQ Ventures — [Pulse 2.0](https://pulse2.com/linq-20-million-series-a/). Linq claims SOC 2 Type II for its iMessage API, a 99.95% SLA, flat per-number pricing, and coverage of iMessage, SMS, RCS and voice (vendor claims) — [Linq blog](https://linqapp.com/blog/the-best-imessage-api-providers)
- Competitors are Sendblue, Blooio, LoopMessage, Chert and BlueBubbles (the last is open source, for personal use) — [Lindy](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works); [plushcap/Linq](https://www.plushcap.com/content/linq/blog/linq-the-best-imessage-api-providers)
- **RCS in Australia:**
  - iPhone business RCS is **not yet enabled by Telstra, Optus or Vodafone**. The advice is to register an SMS Sender ID with ACMA and keep using SMS — [VocPhone](https://vocphone.com/blog/rcs-vs-sms-australia-business-2026) (vendor)
  - Kudosity markets RCS on Android and iOS 18+. That describes device support, not AU carrier enablement — [Kudosity](https://kudosity.com/au/products/messaging/rcs)
  - An earlier forecast that ANZ carriers would launch RCS Business Messaging in late 2025 did not pan out — [Modica](https://omni.modicagroup.com/docs/en/product-news/rcs-insights/)
- **AI receptionists among AU tradies:**
  - TransferToAI is built in Australia for tradies, integrates with ServiceM8 booking, and costs from AUD $99/month — [Product Hunt](https://www.producthunt.com/p/transfertoai-australia-ai-receptionist)
  - Made 4 Tradies is on the Australian Government AI directory and offers after-hours AI receptionists that integrate with Xero, ServiceM8 and Tradify — [industry.gov.au AI directory](https://aidirectory.industry.gov.au/organisation/made-4-tradies)
  - A vendor guide cites AUD $1.50–4 per resolved conversation for AI-first platforms versus AUD $300–1,200 per line per month for human virtual receptionists. It stresses the AU accent and Privacy Act/ACMA compliance — [Open.cx](https://www.open.cx/blog/best-ai-receptionist-australia-2026)
  - Triage of emergency versus routine calls is the hard part for these products — [Trillet](https://trillet.ai/blogs/ai-answering-service-for-australian-tradespeople)
- **Agent-to-agent calls:**
  - One analysis (Aug 2026) proposes a structured handshake (AI disclosure, structured intent, confirmation) and flags failure modes: **infinite loops and "AI spam calling AI"** — [dailyaiworld](https://dailyaiworld.com/blogs/ai-ai-phone-calls-2026-both-ends-line-agents)
  - Google's "Ask For Me" reportedly has a personal AI agent phone US home-repair, beauty and pet-care businesses, and "a growing share" of those answer with AI agents — [aiautomationglobal](https://aiautomationglobal.com/blog/ai-agents-calling-each-other-phone-automation-2026) (trade blog)

### Inferences
- **Keep Linq** for the consumer channel; there is no 2026 breakthrough that replaces it. Mitigate Apple risk:
  1. Provision a plain AU SMS number as a fallback channel with the same agent behind it.
  2. Keep the conversation store channel-agnostic.
  3. Consider Apple Messages for Business as a sanctioned, branded entry point (see Gaps), knowing it changes the "just text a number" UX.
- **RCS:** ignore for AU in v1. Revisit when Telstra, Optus or Vodafone enable iPhone business RCS.
- **AI receptionists are an opportunity, not an obstacle.** When the outbound call is answered by an AI receptionist:
  - Detect it from cues like a greeting script or the "I'm an AI assistant" disclosure.
  - Deliver a compact structured message in about 20 seconds (customer first name, suburb, job, urgency, callback number, a reference code) so the receptionist logs it into ServiceM8/Tradify.
  - Hang up, then follow with an SMS to the business number.
  - Enforce max call duration and loop guards.
  - Don't attempt price negotiation in v1.
- **Competitive and strategic signal:** Google's "Ask For Me" is the same pattern in the US. If it reaches Australia, a consumer could get similar behaviour from Google. Differentiation must come from the guaranteed callback SLA and AU provider quality, not from the calling ability itself.
- A2A will not help here: no AU tradie receptionist product was found exposing an A2A or MCP endpoint. Revisit only if ServiceM8, Tradify or hipages ship agent APIs. That is plausible but not found.

### Gaps
- No primary Apple source was checked for 2026 changes to Messages for Business or iMessage.
- Background (unverified this session): Apple Messages for Business is user-initiated (users start from Maps, Safari, Siri, a link or a QR code), requires Apple approval and an approved messaging service provider, and shows a verified business identity. Because this product's conversations are user-initiated, AMB may be more viable than "no proactive outreach" suggests. A legal and UX check is needed.
- No 2026 data on how often Linq-hosted numbers are flagged or banned, and no AU-specific Linq pricing or AU number availability.
- Whether ACMA's SMS Sender ID Register is now mandatory, and how it affects alphanumeric sender IDs for the SMS fallback and for texting businesses, was not verified beyond the VocPhone advice.
- No data on the share of AU tradies using AI receptionists. Vendor listings exist, but Capterra AU listings showed 0 reviews.

---

## 5. Browser/computer-use agents and web-search APIs for discovering and contacting providers (2026 reliability and cost)

### Takeaway
For discovery, Google Places API (New) is still the most structured source of local businesses with phone numbers, but it is costly per field and restrictive on caching. Pair it with a 2026 agent-native search API (Parallel or Exa at about $1–7 per 1,000 searches) to enrich and verify providers: licences, reviews, service areas, mobiles. **Browser and computer-use agents are not reliable enough to sit on the critical path** (e.g. submitting contact forms on tradie websites). Hard-benchmark success collapses when benchmarks change, and production results lag benchmark scores.

### Cited Findings
- **Google Places API (New):**
  - The $200 monthly credit was replaced with **per-SKU free monthly caps**: 10,000 calls (Essentials), 5,000 (Pro) and 1,000 (Enterprise) — [Google Maps billing FAQ](https://developers.google.com/maps/billing-and-pricing/faq)
  - Third-party rates verified on 3 Jul 2026 against Google's price list: Place Details Essentials $5/1k, Place Details Pro $17/1k, Text/Nearby Search Pro $32/1k. Google bills each request at the highest-tier field requested — [Open Places API](https://openplacesapi.com/blog/google-places-api-pricing)
  - Adding one Pro field (e.g. opening hours or business status) moves Place Details from $5 to $17 per 1k — [Woosmap](https://www.woosmap.com/blog/google-places-api-pricing)
  - New projects can no longer enable the legacy Places API — [Open Places API](https://openplacesapi.com/blog/google-places-api-pricing)
- **Search APIs, list prices per 1,000 searches:**
  - Parallel $1 (Turbo/Fast)
  - Exa $7 (raised from $5 in Mar 2026; $4 for the instant tier)
  - Tavily $8 pay-as-you-go ($5 on the $500/month plan)
  - Brave and Perplexity $5
  - Page extraction is billed separately at about $1 per 1,000 pages for Exa and Parallel.
  - Sources: [Parallel comparison](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose); [beri.net search cost](https://www.beri.net/article/tavily-vs-exa-vs-brave-vs-perplexity-search-api-agent-cost-2026); [costbench](https://www.costbench.com/compare/exa-vs-tavily/)
- **Search benchmarks:**
  - The Artificial Analysis Search Index (Aug 2026) ranks Parallel (advanced) first at 75 and Exa (auto) at 74 — [Parallel: Exa alternatives](https://parallel.ai/articles/exa-alternatives) (reported on a vendor page)
  - Parallel's own BrowseComp run reports 51% for Parallel vs 33.7% for Exa (vendor-run).
  - A Sept 2026 OpenBenchmarks run reports Exa fast at 66.3% vs Tavily basic at 51.0%.
  - AIMultiple reportedly finds Brave, Firecrawl, Exa and Parallel statistically indistinguishable.
  - Sources for the last three: [Tavily blog](https://tavily.com/blog/exa-vs-parallel-benchmarking-retrieval-apis-for-ai-agents-in-2026); [Parallel vs Exa](https://parallel.ai/compare/exa-vs-parallel) (vendor-authored; treat with caution)
- Anthropic's built-in web search tool costs $10 per 1,000 searches plus tokens (official) — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- **Browser and computer-use agents:**
  - A blog citing the OSWorld 2.0 paper (Jun 2026) reports Claude Opus 4.8 at **83.5% on OSWorld-Verified but only 20.6% on OSWorld 2.0** — [youngju.dev](https://www.youngju.dev/transcribe/2026-07-17-computer-use-agents-what-benchmarks-measure.en) (secondary)
  - WebArena results swing 20–30 points depending on scaffold — [benchmarkingagents.com](https://benchmarkingagents.com/best-benchmarks-for-browser-agents)
  - WebVoyager is saturated, with several agents above 90% — [Notte](https://www.notte.cc/glossary/ai-browser-agents/what-are-browser-agent-benchmarks)
  - OpenAI's 2025 CUA reported 87.0% on WebVoyager, 58.1% on WebArena and 38.1% on OSWorld — [benchmarkingagents.com OSWorld](https://benchmarkingagents.com/osworld)
  - OpenAI's DevDay 2026 "Agents API" adds computer use (secondary) — [AI Agents Library](https://www.aiagentslibrary.com/blog/openai-devday-2026/)

### Inferences
- **Discovery pipeline recommendation:**
  1. Places Text Search to get candidate place IDs for "painter near {suburb}". Request only the fields you need, since each Pro or Enterprise field raises the price of the whole call.
  2. Places Details for the phone number on the shortlist only.
  3. Optional enrichment from a search API (Parallel or Exa) to find a mobile number, licence info, service area and a "currently taking jobs" signal.
  4. **Build your own provider table over time**: providers who answered, accepted, rated well and opted in, with consent to receive leads by SMS. This becomes the moat and cuts Places spend.
- Per-request discovery cost is cents. For example, one Text Search at $32/1k ≈ $0.03, plus 5 details calls at about $0.02 each. This is negligible next to voice. The bigger risk is Places Terms of Service limits on storing data (see Gaps), which shape the "own provider table" design.
- **Browser and computer-use agents:** don't use them on the critical path for a 5–30 minute SLA. They are slow, captcha-prone, and a 20% success rate on hard benchmarks is not acceptable. Contact forms are a low-value channel for urgent callbacks anyway. Possible later use: offline, batch enrichment of provider websites.

### Gaps
- Exact Places (New) SKU tiers for `nationalPhoneNumber` / `websiteUri` and AU pricing were not verified. Background (unverified): phone and website fields sit in the higher "Enterprise" Place Details SKU (about $20/1k, 1,000 free per month), and Google's terms restrict caching Places content other than place IDs. Both affect cost and the "own provider DB" design.
- No 2026 per-task cost data for browser or computer-use agents.
- No AU-specific search-API quality benchmark (e.g. local tradie discovery).
- Alternative AU business data sources (hipages, ServiceSeeking, Oneflare, Yellow Pages/Sensis, ABN Lookup, state licence registers) were not researched here; another researcher may cover supply data.

---

## 6. Evals, observability, guardrails and cost tooling for agents in 2026

### Takeaway
"No evals, basic logging" is the weakest part of the default stack. 2026 has mature off-the-shelf options for both halves:
- **voice-call simulation and QA:** Coval, Hamming, Evalion, Cekura, Roark
- **LLM tracing and evals:** Langfuse (open source), Braintrust

For this product the north-star metric is end-to-end: **did a human provider call the user within the SLA?** Every call transcript, tool call and outcome should be traced and replayable. That also argues for cascaded voice, where transcripts are native.

### Cited Findings
- **Coval** simulates synthetic callers across scenarios and scores responses. It publishes a public STT benchmark and integrates with Langfuse for end-to-end voice simulations — [HackerNoon voice eval tools 2026](https://hackernoon.com/best-voice-agent-evaluation-and-testing-tools-in-2026); [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/)
- **Hamming:** high-volume call simulation, audio-native evaluation and replay of production calls. In one independent benchmark it scored 43.0 on simulation quality and 75.7% on evaluation accuracy — [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/)
- **Evalion** ranked first on both simulation quality and evaluation accuracy in the same ContextQA benchmark, a single reviewer's run — [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/)
- **Braintrust** needs partner integrations such as Evalion for voice simulation — [Braintrust](https://braintrust.dev/articles/best-voice-agent-evaluation-tools-2025)
- **Langfuse** separates single-turn tracing from multi-turn end-to-end simulation and recommends regression testing across prompt and model changes — [Langfuse](https://langfuse.com/blog/2025-01-22-evaluating-voice-ai-agents.md)
- Other tools named: Cekura (formerly Vocera), Roark, Maxim — [Future AGI Hamming alternatives](https://futureagi.com/blog/best-hamming-alternatives-2026/)
- The cascade's evaluation advantage: S2S calls have no native transcript to grade — [Coval](https://coval.ai/blog/voice-ai-models-2026/)
- Anthropic exposes per-model capabilities (thinking, server tools) via the Models API, which helps automated model-swap tests — [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)

### Inferences
- **Minimum viable eval stack for a solo founder:**
  1. **Langfuse** (self-host or cloud) tracing every LLM call, tool call and workflow step, keyed by job ID.
  2. **A golden set of about 100 inbound texts** (messy, slangy, Aussie: "need a sparky arvo", "hot water's carked it") with expected triage JSON. Run it in CI on every prompt or model change.
  3. **Simulated outbound calls** via Coval, Hamming or Evalion with personas such as: tradie on site with noise, voicemail, AI receptionist, IVR, "who is this?" hostility, "I don't do that suburb", and strong accents. Gate voice-prompt changes on these.
  4. **Production outcome metrics:** time-to-first-provider-contact, acceptance rate per channel, callback SLA hit rate, calls per success, cost per success, provider complaint and opt-out rate.
- **Guardrails** (inference; not searched in depth):
  - Hard caps on calls per job and per provider per day.
  - Quiet-hours rules.
  - AI disclosure at the start of every call.
  - An opt-out keyword and an honoured do-not-contact list.
  - Max call duration and loop detection for AI-to-AI calls.
  - PII minimisation: share the customer's first name and suburb only until the provider accepts.
  - A spend kill-switch per day.
- **Cost tooling:** per-job cost attribution across model tokens, voice minutes, carrier, and Places and search calls, emitted as trace metadata. Voice dominates (see §1 inference).

### Gaps
- Not researched due to budget: specific 2026 guardrail products (e.g. OpenAI Agents SDK guardrails, Anthropic or other moderation endpoints, Guardrails AI, NeMo Guardrails), LLM cost-management gateways (OpenRouter, Portkey, Helicone, LiteLLM, Vercel AI Gateway), and Langfuse's or Braintrust's 2026 pricing.
- Australian regulatory obligations: Spam Act 2003 for SMS and email to businesses, the Do Not Call Register and Telemarketing Industry Standard for voice, Privacy Act changes, and any AI-disclosure rules. Background (unverified): the Spam Act allows "inferred consent" for messages to conspicuously published business addresses when the message is relevant to their business and the publication does not refuse such messages. Whether calls offering a lead count as "telemarketing" needs legal review. Another researcher or a lawyer should cover this.

---

## 7. What would a frontier-minded 2026 team build differently, what should a solo founder deliberately NOT adopt yet, and the challenge table

### Takeaway
A frontier-minded 2026 team would:
- Keep Linq.
- Replace GPT-4o + Chat Completions + LangChain with a **tiered, multi-provider model setup** (Haiku 5.5 / GPT-6 Luna for triage; Sonnet 5.5 / GPT-6.1 Sol for dispatch) behind a thin TypeScript tool loop.
- Move waiting, retries and fan-out from cron to a **durable workflow engine** (Inngest, or Vercel Workflow once stable).
- Treat voice as a **swappable, eval-gated component**: a managed platform first, with a cascade by default and S2S only if it wins on AU noisy-call task completion.
- Add **SMS-first contact plus voice follow-up** and a **live bridge** to shrink time-to-callback.
- Instrument everything with tracing and simulated-call evals from day one.

They would deliberately skip:
- hosted agent sandboxes
- coding-agent SDKs
- A2A and agent payments
- browser agents on the critical path
- iOS RCS in Australia
- Gemini Live 2.5 native audio (discontinued Dec 2026)
- top-tier $10/$50 models

### Cited Findings
- Haiku 5.5 is officially positioned for "classification, extraction, and routing" at $0.10/$0.50, and Sonnet 5.5 at $2/$10 — [Anthropic models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- S2S task completion collapses under noise and accents (26–38% vs 85% for text) — [JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html)
- Cascades win on evaluability — [Coval](https://coval.ai/blog/voice-ai-models-2026/)
- Durable engines record LLM outputs once and replay them, require idempotent side effects, and cost about $80–310/month at 100K agent runs — [beri.net](https://www.beri.net/article/temporal-vs-inngest-vs-restate-vs-dbos-durable-execution-agent-cost)
- Claude Managed Agents is beta, not ZDR-eligible, and billed $0.08 per session-hour — [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview); [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- The Claude Agent SDK runs the Claude Code binary — [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- Vercel Workflow is in Beta — [Vercel docs](https://vercel.com/docs/workflow)
- Cloudflare voice is experimental — [Cloudflare blog](https://blog.cloudflare.com/voice-agents/)
- Gemini Live 2.5 native audio is discontinued on 13 Dec 2026 — [Vertex model page](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api)
- AU carriers have not enabled iPhone RCS — [VocPhone](https://vocphone.com/blog/rcs-vs-sms-australia-business-2026)
- OpenAI pulled Instant Checkout in Mar 2026 — [Crossmint](https://crossmint.com/learn/agentic-payments-protocols-compared)
- Browser agents score 20.6% on OSWorld 2.0 vs 83.5% on OSWorld-Verified — [youngju.dev](https://www.youngju.dev/transcribe/2026-07-17-computer-use-agents-what-benchmarks-measure.en)
- Vapi's $0.05/min is orchestration only; all-in is about $0.13–0.30/min — [Zeeg](https://zeeg.me/en/blog/post/vapi-ai-pricing)
- Telnyx AMD costs $0.002–0.0065 per call — [Telnyx pricing](https://telnyx.com/pricing/voice-api.md)
- Search APIs cost $1–8 per 1k — [Parallel comparison](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose)
- Voice eval tooling: [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/)

### Inferences
**Reference architecture (inference):**
1. Linq webhook → **ingest** endpoint (Vercel or Cloud Run) → append the message to the conversation store → emit a `message.received` event.
2. **Durable workflow per job** (Inngest or Vercel Workflow):
   - `triage` (Haiku 5.5 or GPT-6 Luna, structured output; ask one clarifying question via Linq if fields are missing)
   - `discover` (Places + optional Parallel/Exa + own provider table)
   - `rank`
   - `fanout`: parallel child steps per provider. SMS lead offer first; after N minutes, an AI voice call via a managed platform with AMD; email as a low-priority, asynchronous channel.
   - `waitForEvent("provider.accepted", timeout=10m)` → escalate the fan-out width or widen the radius
   - `notify user` via Linq
   - `confirm callback happened` (ask the user or the provider)
   - `close` and feedback
3. Provider replies arrive as SMS, voice-outcome webhooks or email. Normalise them with a small model, then emit `provider.accepted` / `declined` events into the workflow.
4. Optional **live bridge** when a provider accepts on a call and the user has pre-consented: "Connecting you now".
5. Tracing everywhere (Langfuse), plus simulated-call evals in CI.

**Model routing** (inference, based on official Anthropic prices and reported OpenAI prices):
- triage: Haiku 5.5 or GPT-6 Luna
- dispatch and reasoning: Sonnet 5.5 or GPT-6.1 Sol
- voice: a cascade with an AU voice, or GPT-Live-1 if the bake-off favours it
- a fallback provider for each tier
- abstraction via Vercel AI SDK or the provider SDKs, not LangChain

**What a solo founder should NOT adopt yet:**
- Claude Managed Agents, OpenAI Agents API/Dots or AgentKit hosted runtime: beta, sandbox-oriented, lock-in
- Claude Agent SDK and Codex SDK: coding-agent harnesses
- Temporal: heavy ops
- Cloudflare `@cloudflare/voice`: experimental
- self-hosted LiveKit or Pipecat in v1, and direct SIP-to-model: ops burden until volume justifies it
- pure S2S without transcripts or evals
- Gemini Live 2.5 native audio: sunset in Dec 2026
- A2A, AP2/ACP/Stripe agentic commerce, x402
- browser or computer-use agents for contacting providers
- RCS for AU iPhones
- $10/$50 models (Fable 5.1, GPT-6 Astra) for routine work
- self-hosted open-weight models
- LangChain as the core abstraction

#### Challenge table

| Layer | Default choice | Recommended 2026 choice | Evidence | Confidence | What not to adopt yet |
|---|---|---|---|---|---|
| Consumer channel | Linq (iMessage) | **Keep Linq**, plus a plain AU SMS fallback number behind the same agent; channel-agnostic conversation store; evaluate Apple Messages for Business as a sanctioned entry point | No public Apple iMessage API; self-built bridges get banned ([Lindy](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)); Linq funded and SOC 2 per vendor ([Pulse 2.0](https://pulse2.com/linq-20-million-series-a/); [Linq](https://linqapp.com/blog/the-best-imessage-api-providers)) | Medium-high | Self-built BlueBubbles/Mac-mini bridges; iOS RCS in AU (not carrier-enabled: [VocPhone](https://vocphone.com/blog/rcs-vs-sms-australia-business-2026)) |
| Carrier / SMS / telephony | Twilio | Twilio or **Telnyx** (lower US rates, per-call AMD pricing); decide on **AU** rates and number provisioning, not US headline rates | Telnyx $0.005 vs Twilio $0.014/min (US, vendor) ([Telnyx](https://telnyx.com/compare/twilio)); AMD $0.002–0.0065/call ([Telnyx pricing](https://telnyx.com/pricing/voice-api.md)); per-minute rate "not what drives the bill" ([techsy](https://techsy.io/en/blog/voice-agent-telephony-comparison)) | Low-medium (no AU data found) | Multi-carrier failover before you have volume |
| Outbound AI voice platform | Vapi | Bake-off of **ElevenLabs Agents vs Retell vs Vapi** on AU calls; pick on AU voice quality, AMD, concurrency/burst pricing and transcripts; wrap behind your own `placeCall()` | Vapi $0.05/min is orchestration only, $0.13–0.30 all-in ([Zeeg](https://zeeg.me/en/blog/post/vapi-ai-pricing)); ElevenLabs $0.08/min + LLM + telephony, burst $0.16 ([Macha](https://www.getmacha.com/blog/elevenlabs-agents-pricing-explained)); Retell from $0.07 ([ainora](https://ainora.lt/blog/ai-voice-agent-cost-per-minute-2026)) | Medium | Self-hosted LiveKit/Pipecat workers or direct SIP-to-model in v1; Cloudflare `@cloudflare/voice` (experimental) |
| Voice model architecture | Whatever Vapi defaults to (cascade) | **Cascade by default** (Deepgram Flux / Cartesia Ink-2 STT with model-based turn detection, fast LLM, AU-accent TTS); trial **GPT-Live-1 / gpt-realtime-2.1 over SIP** and adopt only if it wins on noisy AU task completion | S2S 26–38% vs text 85% under noise/accents ([JustCall](https://justcall.io/blog/speech-to-speech-vs-cascaded-voice-agents.html)); cascade 755 ms achievable ([Future AGI](https://futureagi.com/blog/cascaded-voice-ai-vs-speech-to-speech-2026/)); evaluability ([Coval](https://coval.ai/blog/voice-ai-models-2026/)); GPT-Live full duplex ([TechCrunch](https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/)) | Medium | Gemini Live 2.5 native audio (discontinued 13 Dec 2026: [Vertex](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash-live-api)); pure S2S without transcripts |
| Intent-triage model | GPT-4o via Chat Completions | **Claude Haiku 5.5** ($0.10/$0.50, official) or **GPT-6 Luna** ($0.10/$0.50, reported), structured outputs, second provider as fallback | [Anthropic models](https://platform.claude.com/docs/en/about-claude/models/overview); [UsagePricing](https://www.usagepricing.com/blueprint/activity/openai-2026-10-05-gpt-6-api-launch) | High (that GPT-4o is outdated); medium (on the specific pick) | Fine-tuning or self-hosting open-weight triage models |
| Planning/dispatch model | GPT-4o | **Claude Sonnet 5.5** ($2/$10) or **GPT-6.1 Sol** ($2/$10 reported; conflicting $4/$20 GPT-5.6 Sol reports); escalate to Opus 5.5 only on hard cases proven by evals | [Anthropic models](https://platform.claude.com/docs/en/about-claude/models/overview); [UsagePricing](https://www.usagepricing.com/blueprint/activity/openai-2026-10-05-gpt-6-api-launch) vs [Mem0](https://mem0.ai/library/llms-and-models/openai-api-pricing) | Medium | Fable 5.1 / GPT-6 Astra ($10/$50) for routine dispatch |
| LLM API / framework | Chat Completions + LangChain | Provider-native APIs (OpenAI Responses API / Anthropic Messages with tool runner) behind **Vercel AI SDK** or a thin custom loop; MCP for your own tools | Agents SDK still v0.x ([blckalpaca](https://blckalpaca.at/en/knowledge-base/ai-agents/ai-agent-frameworks-comparison/openai-agents-sdk)); Agent Builder only for hosted editor ([OpenAI docs](https://developers.openai.com/api/docs/guides/agents)) | Medium-high | LangChain as core abstraction; AgentKit / Agent Builder hosted workflows; Claude Agent SDK and Codex SDK (coding-agent harness: [Agent SDK docs](https://code.claude.com/docs/en/agent-sdk/overview)) |
| Agent runtime (hosted) | None (functions) | **None.** Keep the agent loop in your own durable workflow steps | Managed Agents is beta, sandbox-oriented, $0.08/session-hr, no ZDR ([Anthropic](https://platform.claude.com/docs/en/managed-agents/overview)); OpenAI Agents API/Dots very new ([Reworked](https://www.reworked.co/ai-news/the-biggest-announcements-from-openai-devday-dots-agents-new-500-plan/)) | Medium-high | Claude Managed Agents, OpenAI Agents API/Dots, Google Agent Engine |
| Waiting / retries / fan-out | Cloud Functions + Firestore + cron | **Durable workflow engine**: Inngest (TS-first, mature) or Vercel Workflow (familiar but beta); one workflow per job with `waitForEvent` plus timeouts; idempotent tool calls | Durable replay and idempotency, ~$80–310/mo at 100K runs ([beri.net](https://www.beri.net/article/temporal-vs-inngest-vs-restate-vs-dbos-durable-execution-agent-cost)); Vercel Workflow beta ([Vercel](https://vercel.com/docs/workflow)) | Medium-high | Temporal (ops-heavy for a solo founder); Restate (young, BSL) |
| Data store | Firestore | Keep Firestore for v1 (founder skill), or Postgres if relational provider analytics grow; it is not on the critical path for frontier-ness | (No 2026 evidence gathered; inference) | Low | Vector DB / agent "memory" products, which are not needed |
| Provider discovery | Google Places API | Places API (New) with minimal field masks, plus **Parallel/Exa** enrichment, plus your **own opted-in provider table** as the moat | Per-SKU free caps ([Google FAQ](https://developers.google.com/maps/billing-and-pricing/faq)); $5/$17/$32 per 1k ([Open Places API](https://openplacesapi.com/blog/google-places-api-pricing)); Parallel $1/1k, Exa $7/1k ([Parallel](https://parallel.ai/articles/openai-web-search-vs-parallel-vs-exa-vs-tavily-how-to-choose)) | Medium | Browser or computer-use agents on the critical path (OSWorld 2.0: 20.6% — [youngju.dev](https://www.youngju.dev/transcribe/2026-07-17-computer-use-agents-what-benchmarks-measure.en)) |
| Contacting providers | Parallel AI voice calls | **SMS-first lead offer, then voice to non-responders**, email low-priority; AI-receptionist detection with a structured lead hand-off; optional live bridge to the user | Many AU tradies use AI receptionists ([TransferToAI](https://www.producthunt.com/p/transfertoai-australia-ai-receptionist); [Made 4 Tradies](https://aidirectory.industry.gov.au/organisation/made-4-tradies)); AI-to-AI loop risk ([dailyaiworld](https://dailyaiworld.com/blogs/ai-ai-phone-calls-2026-both-ends-line-agents)) | Medium (product hypothesis; needs A/B test) | Negotiating price with AI receptionists; contact-form bots |
| Agent-to-agent / protocols | None | MCP internally only | MCP RC 2026-07-28 ([mcpplayground](https://mcpplaygroundonline.com/blog/mcp-2026-roadmap-whats-changing-for-developers)); A2A enterprise-only, "not finished" ([First AI Movers](https://radar.firstaimovers.com/a2a-2026-what-technical-leaders-should-watch.md)) | Medium | A2A endpoints; expecting tradie receptionists to speak A2A |
| Payments | None | None in v1 (Stripe checkout links if you charge later) | OpenAI pulled Instant Checkout in Mar 2026; AP2 v0.2 at FIDO ([Crossmint](https://crossmint.com/learn/agentic-payments-protocols-compared)) | Medium-high | AP2, ACP, x402, MPP |
| Evals / observability | None, basic logs | **Langfuse tracing**, a CI golden set for triage, **simulated AU calls** (Coval/Hamming/Evalion), outcome SLA dashboards | [ContextQA](https://contextqa.com/blog/ai-voice-agent-testing-tools/); [Langfuse](https://langfuse.com/blog/2025-01-22-evaluating-voice-ai-agents.md); [Coval](https://coval.ai/blog/voice-ai-models-2026/) | High | Building a custom eval platform; multiple overlapping eval vendors |
| Guardrails / cost | None | Per-job spend caps, per-provider contact caps, quiet hours, AI disclosure, opt-out list, max call length, PII minimisation, per-job cost attribution in traces | Inference (not researched in depth; see §6 gaps) | Medium | Heavy guardrail frameworks before you have traffic |

### Gaps
- All OpenAI-specific claims (GPT-6.x names and prices, GPT-Live API price and GA, gpt-realtime-2.1, Agents API, Dots) rest on secondary sources because OpenAI domains were unreachable. The report writer should flag these as "reported" and recommend verifying them on openai.com/api/pricing.
- No Australian-specific evidence was found on voice accent performance, carrier rates, AMD accuracy, AU regulatory obligations for AI outbound calls or SMS to businesses, or Apple Messages for Business availability in AU.
- Google ADK / Agent Engine, Pipecat 2026 releases, AI gateways and guardrail products were not researched within the 30-search budget.
