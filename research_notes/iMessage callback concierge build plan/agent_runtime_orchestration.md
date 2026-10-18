# Agent "Brain" and Orchestration Layer for a Text-a-Number Concierge (as of 18 Oct 2026)

Scope: agent runtime and framework, durable workflows, tools (discovery, search, browser), models, memory and data, observability, evals and safety, reference architectures, and a recommended TypeScript-first stack with a per-job cost.

Method note: I ran 30 web searches. WebFetch failed with DNS errors on every vendor domain I tried (vercel.com, developers.openai.com), so most findings come from search-result snippets. Vendor-official snippets are marked "official". Third-party aggregators are marked "third-party" and are lower confidence; several conflict with each other. Anthropic pricing and Managed Agents facts come from Anthropic's own Claude API reference bundled with Claude Code (model table cached 2026-10-06), cited as "Anthropic API reference (bundled)". Statements from my own background knowledge that I did not re-verify this session are labelled **[background, unverified]** and appear only under Inferences or Gaps.

Out of scope here (other researchers cover it): Linq/iMessage, voice and telephony vendors and their per-minute costs, provider supply data and liquidity.

---

## 1. Which agent harnesses and frameworks suit a long-running, event-driven, multi-channel operations agent (Oct 2026)?

### Takeaway
None of the agent "harnesses" is, by itself, the right backbone for a job that sleeps for hours waiting on webhooks. The winning pattern in Oct 2026 is a **durable workflow engine as the backbone** that calls a **thin, provider-agnostic LLM layer** at each decision point. For a TypeScript founder, the LLM layer is best built with the Vercel AI SDK (v6, or v7 with `WorkflowAgent`) or the OpenAI Agents SDK (JS). OpenAI's Agent Builder is being shut down. The Codex SDK is scoped to coding work. Claude Managed Agents is a credible hosted option but is built around a sandbox and container per session, which this product doesn't need.

### Cited Findings

**OpenAI stack**
- **Assistants API is gone.** It was sunset on **26 Aug 2026** and is no longer available. OpenAI points new builds to the Responses API, mapping Assistants→Prompts, Threads→Conversations, Runs→Responses and Run steps→Items, and says Responses reached feature parity after the Conversations launch. Responses adds MCP, computer use and deep research — [OpenAI Assistants migration guide (official)](https://developers.openai.com/api/reference/resources/beta/subresources/assistants.md); [OpenAI "what's new" (official)](https://developers.openai.com/api/docs/assistants/whats-new); [OpenAI community thread](https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666)
- **Agent Builder and Evals are being wound down.** OpenAI's AgentKit page carries an update dated **3 June 2026**: both will no longer be available on the platform from **30 Nov 2026**. OpenAI recommends the Agents SDK for workflows kept in code, and Workspace Agents in ChatGPT for natural-language use — [Introducing AgentKit (official, with update)](https://openai.com/index/introducing-agentkit/). A secondary source says the Evals dashboard goes read-only on **31 Oct 2026** — [DEV Community](https://dev.to/mr_manushukla/4-openai-agent-apis-in-2026-responses-chat-completions-agents-sdk-agentkit-3bln)
- **ChatKit remains available** and is described as generally available, but it is an embeddable chat UI, which doesn't apply to an iMessage-only product — [Apidog](https://apidog.com/blog/openai-agentkit/); [DEV Community](https://dev.to/mr_manushukla/4-openai-agent-apis-in-2026-responses-chat-completions-agents-sdk-agentkit-3bln)
- **OpenAI Agents SDK, 15 Apr 2026 update** (official): adds a "model-native harness" that lets agents work across files and tools, plus native sandbox execution for long-horizon tasks — [OpenAI: The next evolution of the Agents SDK](https://openai.com/index/the-next-evolution-of-the-agents-sdk/). Third-party coverage adds:
  - It shipped **Python-first, with TypeScript to follow** — [DevOps.com](https://devops.com/openai-upgrades-its-agents-sdk-with-sandboxing-and-a-new-model-harness/)
  - Sandbox providers at launch: Blaxel, Cloudflare, Daytona, E2B, Modal, Runloop and Vercel — [Idlen](https://www.idlen.io/news/openai-agents-sdk-sandbox-harness-codex-filesystem-tools-april-2026)
  - Durable execution via snapshotting and rehydration — [Blockchain.News](https://blockchain.news/news/openai-agents-sdk-sandbox-execution-model-native-harness)
  - A May 2026 third-party post is titled "Agents SDK TypeScript Goes Sandbox-Native", which suggests TypeScript caught up around then — [Daniel Vaughan blog](https://codex.danielvaughan.com/2026/05/06/agents-sdk-typescript-sandbox-agents-codex-harness-portable-compute/)
  - Third-party summaries say the TypeScript SDK was at v0.8.5 by April 2026 — [OpenLink infographic](https://www.openlinksw.com/data/html/openai-agents-sdk-next-evolution-infographic.html); [FutureAGI](https://futureagi.com/blog/what-is-openai-agents-sdk-2026/)
- **Unverified "Agents API".** One third-party table lists an "Agents API" in public beta since **10 Sept 2026**, separate from the open-source SDK. I could not confirm this in OpenAI sources — [Tech Insider](https://tech-insider.org/?p=22856)
- **Codex SDK is coding-scoped.** OpenAI's docs say to use the Codex SDK "for coding-focused Codex threads". For broader workflows, they say to run Codex CLI as an MCP server and orchestrate it with the Agents SDK. The documented use cases are CI/CD, engineering tasks and internal tools — [OpenAI Codex SDK docs (official)](https://developers.openai.com/codex/sdk). I found no documented non-coding use — [Daniel Vaughan, Codex TS SDK](https://codex.danielvaughan.com/2026/03/28/codex-typescript-sdk-embedding-agents/)

**Anthropic stack**
- **Claude Managed Agents** entered public beta on **8 Apr 2026** — [Verdent (third-party)](https://verdent.ai/guides/claude-managed-agents-pricing); [Finout](https://www.finout.io/blog/anthropic-just-launched-managed-agents.-lets-talk-about-how-were-going-to-pay-for-this). Anthropic's own reference describes it as follows:
  - Persisted, versioned Agent configs. Each Session provisions a container workspace, and Anthropic runs the agent loop.
  - Session state-change **webhooks**, so no polling is needed.
  - Hard dollar **session budgets** (`budget_reached` pauses the session).
  - **Scheduled deployments** (cron) and multi-agent sessions.
  - Tool **permission policies** (`always_allow` / `always_ask` / `auto`).
  - **Cost:** model tokens at list price, plus web searches at **$10 per 1,000**, plus **session running time at $0.08/hour** — Anthropic API reference (bundled): `shared/managed-agents-overview.md`, `shared/managed-agents-core.md` (verify at https://platform.claude.com/docs). Third-party guides also report $0.08 per session-hour metered only while running, no monthly fee, and no Batch discount — [Verdent](https://verdent.ai/guides/claude-managed-agents-pricing)
- Vercel publishes a guide to running a Claude Managed Agent from Vercel Workflow — [Vercel KB (official)](https://vercel.com/kb/guide/claude-managed-agent-vercel)
- **Four ways to build on Claude.** Anthropic distinguishes:
  - a manual tool loop
  - the SDK **Tool Runner**: harness only, you host, tools you define
  - **Managed Agents**: harness plus hosted sandbox
  - the **Claude Agent SDK**: Claude Code packaged as a library, with built-in file, bash and web tools; harness only, you host

  The Agent SDK is described as "a batteries-included coding/filesystem agent" — Anthropic API reference (bundled), "Building an Agent: Four Approaches"

**Google, Microsoft, LangChain**
- **Google ADK** is free and Apache-2.0, with SDKs for Python, TypeScript, Go and Java. Deployment to Vertex AI Agent Engine, Cloud Run or GKE is billed at Google Cloud usage rates. Agent Engine is listed as GA with sessions and observability. One source says ADK 2.0 adds graph-based workflows. I found no Agent Engine unit prices — [RyWalker research](https://rywalker.com/research/google-adk); [VPSRanking](https://vpsranking.com/ai/google-adk/); [EveryDev](https://www.everydev.ai/tools/google-adk)
- **Microsoft Agent Framework 1.0** reached GA in **April 2026** (one source says 3 Apr). It covers **.NET and Python** with Go in preview, is MIT-licensed, and succeeds AutoGen and Semantic Kernel — [Microsoft Techwiese (official, DE)](https://www.microsoft.com/de-de/techwiese/news/offiziell-verfuegbar-microsoft-agent-framework-10.aspx); [RyWalker](https://rywalker.com/research/microsoft-agent-framework). Microsoft's Durable Task Scheduler supports JS/TS for durable agents — [Microsoft Learn](https://learn.microsoft.com/en-my/azUre/durable-task/sdks/durable-task-for-ai-agents)
- **LangGraph Platform** has been renamed **LangSmith Deployment**. One tracker says billing changed on **1 Jan 2026** from $0.001 per node to **$0.005 per agent run** — [PricingSaaS diff](https://pricingsaas.com/companies/langchain/diffs/2025Q4). Older pricing: Plus at $39/seat, plus standby fees of $0.0007/min (dev) and $0.0036/min (prod) per deployment — [LangChain pricing page](https://www.langchain.com/langgraph-platform-pricing); [ZenML](https://www.zenml.io/blog/langgraph-pricing). The current figures conflict across sources.

**TypeScript-native frameworks**
- **Vercel AI SDK**
  - **AI SDK 6** (22 Dec 2025) added the `Agent` interface, `ToolLoopAgent`, tool approvals, DevTools and stable MCP support — [Noqta guide](https://noqta.tn/en/blog/vercel-ai-sdk-6-typescript-ai-agents-guide-2026); [AI SDK v6 docs](https://v6.ai-sdk.dev/docs/agents)
  - **AI SDK 7** (25 Jun 2026, per one secondary source) added **`WorkflowAgent`**, a "durable, resumable AI agent for use inside a workflow" that survives restarts and pauses for human approval. Its existence is corroborated by the `ai@7.x` reference docs — [unpkg ai@7.0.40 docs](https://app.unpkg.com/ai@7.0.40/files/docs/07-reference/04-ai-sdk-workflow/01-workflow-agent.mdx)
  - The `ToolLoopAgent` default loop caps at `stepCountIs(20)` — [DEV Community](https://dev.to/koenig_academy_9a8f35ff4b/vercel-ai-sdk-6-production-patterns-for-autonomous-loops-2n6f)
- **Mastra**
  - v1 beta was announced Nov 2025 as a stabilisation release. It covers `agent.network()`, Mastra Auth, and "multi-engine workflow support (e.g. Inngest)" — [Mastra blog (official)](https://mastra.ai/blog/mastrav1)
  - 1.0 shipped around **Jan 2026**. It is Apache-2.0, with 300k+ weekly npm downloads claimed — [Neuronfeed](https://neuronfeed.com/startups/mastra)
- **Cloudflare Agents SDK / "Project Think"**
  - Each agent runs on a Durable Object with its own SQL database, WebSockets and scheduling (one-shot, recurring, cron). Idle agents hibernate.
  - New primitives: durable "fibers" (crash recovery and checkpointing), sub-agents, sandboxed code execution and persistent sessions.
  - The `Think` base class is **experimental**. Its turns survive eviction, and it can pause for human approval.

  Sources: [Cloudflare blog: Project Think (official)](https://blog.cloudflare.com/project-think/); [Cloudflare agents repo index](https://docsearch.algolia.com/mcp/docs/repo/cloudflare/agents). One tutorial says it was in **preview as of Aug 2026** — [Noqta](https://noqta.tn/en/tutorials/cloudflare-project-think-durable-ai-agents-typescript-2026)

### Inferences
- **Use a workflow engine as the outer loop.** This product is an operations state machine with LLM decision points, not a chat assistant. The workflow encodes the job lifecycle: intake → clarify → discover → fan-out → wait → select → connect → confirm → learn. LLM calls make bounded decisions inside steps: classify, rank, draft, parse a reply. A single autonomous agent loop holding a job open for hours is the wrong shape, because loop caps (e.g. 20 steps) and context growth work against it.
- **OpenAI-specific:**
  - Build on Responses API plus the Agents SDK (JS) only if you want to stay OpenAI-only.
  - Do **not** build on Agent Builder: it shuts down on 30 Nov 2026.
  - Do **not** use the Codex SDK as the concierge brain. OpenAI's own docs scope it to coding threads, and its strengths (file editing, sandboxed shell) are irrelevant to dispatching tradespeople.
- **Claude Managed Agents** is the most complete hosted "agent with webhooks, budgets, schedules and approvals" offering found. However, its value centres on a per-session container workspace that a dispatch agent doesn't need. It is also beta, and adds coupling to one model vendor. It fits better as a later option than as the MVP backbone.
- **Not a fit for a TypeScript solo founder:**
  - Microsoft Agent Framework: no TypeScript in the 1.0 GA.
  - Pydantic AI: Python.
  - LangGraph/LangSmith Deployment: viable via LangGraph.js, but adds a paid platform layer and seat pricing.
  - Google ADK has a TypeScript SDK but pulls you towards GCP.
- **Mastra** is the strongest "framework with batteries" option in TypeScript. It can run workflows on Inngest, which matches the recommended durable layer. The trade-off is adding framework abstraction on top of the AI SDK, which Mastra itself builds on **[background, unverified]**.
- **Cloudflare Agents** (one Durable Object per job, with built-in SQL, scheduling and hibernation) is architecturally elegant for this problem. However, the "Think" layer is experimental/preview, and the founder's stack is Vercel/Firebase rather than Workers.

### Gaps
- I could not reach OpenAI's openai-agents-js release notes to confirm the current TypeScript version and sandbox/harness parity.
- I could not confirm the claimed "Agents API" public beta (10 Sept 2026).
- I found no Vertex AI Agent Engine unit pricing.
- I didn't research **Pydantic AI** (Python, not a fit).
- I found no authoritative "2026 newcomer" ranking beyond Project Think, Claude Managed Agents, the Agents SDK harness and AI SDK 7.
- The GA status of Vercel Workflow was not confirmed (see section 2).

---

## 2. Durable execution: how each option handles "call 5 providers, wait up to 20 minutes for a YES, escalate, retry"

### Takeaway
Every serious option can express this pattern: fan-out steps, a durable wait on an external event with a timeout, then branch, escalate or retry. Durable-execution charges per job are fractions of a cent everywhere. Choose on maturity, ergonomics and hosting fit, not on price.
- **Most mature with a hosted free tier:** Inngest.
- **Most native to Vercel:** Vercel Workflow plus AI SDK 7 `WorkflowAgent`. Cheapest per event, but GA status unconfirmed.
- **Most battle-tested but heaviest:** Temporal Cloud ($100/mo minimum).
- **Viable with flow-control trade-offs:** Trigger.dev v4 (waitpoints) and Cloudflare Workflows/Durable Objects.

### Cited Findings
- **Vercel Workflow (Workflow DevKit / "Workflow SDK")**
  - **Billing:** Workflow Events at **$0.02 per 1K** ($20 per 1M). Hobby includes 50K events/month. Data written costs $0.50/GB and data retained $0.50/GB-month. Functions invoked by workflows are billed at normal compute rates, and Queues are billed separately — [Vercel Workflow pricing (official)](https://vercel.com/docs/workflows/pricing); [Vercel pricing](https://vercel.com/pricing)
  - **Limits:** A normal step produces about 3 events, and a run is capped at **10,000 steps** — [Vercel Workflow pricing (official)](https://vercel.com/docs/workflows/pricing)
  - **Primitives:**
    - `sleep()` accepts duration strings, ms or a Date, and releases the function instance between polls — [Mintlify mirror of Workflow docs](https://www.mintlify.com/vercel/workflow/api-reference/workflow/sleep)
    - `createWebhook()` creates "a real, callable URL inside a running workflow" that the run waits on — [workflow-sdk.dev createWebhook](https://workflow-sdk.dev/docs/api-reference/workflow/create-webhook); [Vercel blog](https://vercel.com/blog/the-best-workflow-engine-is-a-programming-language)
    - `defineHook()` lets a run wait for the next message — [Vercel KB: Human-in-the-loop with Chat SDK and Workflow SDK (official)](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk)
  - **Timeouts:** The documented pattern is `Promise.race([webhook, sleep("24h")])` — [jhakim blog](https://jhakim.com/blog/building-reliable-onboarding-flows-with-vercel-workflows)
  - Launched as "Built-in durability" with `"use workflow"` / `"use step"` directives — [Vercel blog (official)](https://vercel.com/blog/introducing-workflow)
  - I found **no confirmed GA announcement or date**.
- **Temporal Cloud**
  - Essentials **from $100/mo**, Business from $500/mo, pay-as-you-go consumption, and **$1,000 free credits** for new accounts — [Temporal pricing (official)](https://temporal.io/pricing.md)
  - Third-party: Essentials includes 1M Actions, and overage is about **$50 per 1M Actions** — [AutomationAtlas](https://automationatlas.io/answers/temporal-pricing-explained-2026/). Another source quotes $50/M, falling to $25/M at volume, with $150 credits — [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/). Figures conflict.
  - Self-hosting is free but means running a multi-service cluster with a database — [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/)
- **Inngest**
  - Meters **steps**. Sleep and wait-for-event steps **count once regardless of how long they wait** — [AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/); [BudgetForge](https://www.budgetforge.dev/tools/inngest-pricing-2026)
  - **Prices conflict:**
    - Free tier: 50K or 100K executions/month
    - Pro: **$75** or **$99/mo** for 1M executions, 100 concurrent steps and 5 GB of traces
    - Overage: about $50 per extra 1M
    - $499 for 10M

    Sources: [AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/); [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/)
  - Mastra 1.0 supports Inngest as a workflow engine — [Mastra blog](https://mastra.ai/blog/mastrav1)
- **Trigger.dev v4** (GA)
  - **Waitpoint tokens** pause a run until completed or timed out, pitched for approvals and human-overseen agents — [Trigger.dev v4 GA (official)](https://trigger.dev/launchweek/2/trigger-v4-ga)
  - Added **hard per-org spend limits** and alerts — [releases.sh digest, Jun 2026](https://releases.sh/collections/workflow-orchestration/digest/2026-06-29)
  - Pricing: $10 Hobby / $50 Pro, compute billed per second plus a per-run fee (third-party) — [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/)
  - A third-party claim that paused waits aren't billed is unverified — [Vantaige](https://vantaige.io/ai-tool/trigger-dev)
- **Cloudflare Workflows:** billed on requests, CPU, steps and storage. Workers Paid includes 500K steps, then **$0.80 per 100K** (third-party) — [andrew.ooo](https://andrew.ooo/answers/best-durable-execution-platforms-for-ai-agents-2026/). Durable Objects plus the Agents SDK give per-agent SQL, scheduling and hibernation — [Cloudflare blog](https://blog.cloudflare.com/project-think/)
- **Opinion (Sept 2026):** per-action pricing is a poor fit for agents, because agent frameworks hide many billable actions — [AAIF blog](https://aaif.io/blog/per-action-pricing-is-especially-bad-for-ai-agents)

### Inferences
- **The pattern in Vercel Workflow** (from the cited primitives):
  1. Fan out with `Promise.all` over `contactProvider(p)` steps, each of which creates its own `createWebhook()` URL or a `defineHook` token keyed by `jobId:providerId`.
  2. `await Promise.race([firstYes(hooks), sleep("20m")])`.
  3. On timeout, branch to "widen radius / next 5 providers / notify founder".
  4. Step-level automatic retries handle transient API failures.

  Cost: a job of about 40 steps is about 120 events ≈ **$0.0024**.
- **The pattern in Inngest** **[API names background, unverified]**:
  1. `step.run` steps fan out messages.
  2. `step.waitForEvent("provider-yes", { event: "provider/replied", timeout: "20m", if: "async.data.jobId == event.data.jobId && async.data.answer == 'yes'" })` waits for a YES.
  3. A `null` result means timeout, so escalate.
  4. `cancelOn` handles the user cancelling.
  5. Concurrency/throttle keys can cap simultaneous outreach per provider.

  Waits count as one step, so a 40-step job is about **$0.002–0.004**.
- **Temporal:**
  - Signals and timers model this best, and TypeScript workflows are first class **[background]**.
  - Determinism constraints and a $100/mo floor are overhead for a solo founder pre-revenue.
  - Temporal has an official OpenAI Agents SDK integration, Python-first **[background, unverified]**.
- **Firebase / Cloud Tasks** **[background, unverified]**:
  - Cloud Tasks can schedule an HTTP callback in the future (up to about 30 days), which can implement timeouts.
  - There is no step memoisation or "wait for event" primitive, so you would hand-roll a state machine in Firestore (status fields plus idempotency keys).
  - Workable for an MVP, but it re-implements what Inngest or Vercel Workflow give you for almost nothing.
- **Recommendation:**
  - **Inngest** if the founder wants the most proven waitForEvent/timeout/flow-control model, portable across Vercel, Firebase Functions or anything else.
  - **Vercel Workflow** if fully committed to Vercel and comfortable on a younger product; the AI SDK 7 `WorkflowAgent` integration is a real plus.
  - Either beats Temporal at this stage.

### Gaps
- **Restate:** I found no 2026 pricing or Cloud details; the search returned nothing relevant.
- Vercel Workflow GA date and maximum sleep/webhook lifetime are not confirmed.
- I could not confirm Inngest's official current plan prices (third-party sources conflict: $75 vs $99).
- Trigger.dev's official rate card and whether waitpoint time is billed are unconfirmed.
- I did not verify Firebase/Cloud Tasks limits this session.

---

## 3. Tools: local business discovery, search APIs, browser/computer-use agents, MCP

### Takeaway
- **Google Places API (New) Text Search** is the best structured discovery source, but it's not cheap:
  - Text Search Enterprise (needed for phone, website and rating fields) costs **$35 per 1,000 requests** after 1,000 free.
  - You may only cache **place_id indefinitely**, and lat/lng for 30 days.
  - So the founder's own provider database must be built from first-party data: what providers tell you, and response history.
- **Web-search APIs** cost **$1–8 per 1,000 queries** and are good for finding emails and contact pages.
- **Browser agents** for contact forms are cheap in infrastructure (~$0.10–0.12/browser-hour) but have no independent reliability data. Treat them as a later fallback, not a core channel.

### Cited Findings
- **Google Places API (New) pricing (official table)**

  | SKU | Free cap | Price after cap |
  |---|---|---|
  | Text Search Enterprise | 1,000 | **$35.00 per 1,000** for the first 100K, tiered down to $2.63 above 5M |
  | Enterprise + Atmosphere | 1,000 | **$40.00 per 1,000** |
  | Text Search Pro | 5,000 | **$32.00 per 1,000** |
  | Text Search Essentials (IDs Only) | unlimited | free |

  Source: [Google Maps Platform pricing list (official)](https://developers.google.com/maps/billing-and-pricing/pricing). A request is billed at the highest SKU of any field requested, per request rather than per place, and returns up to 20 places — [Google SKU details (official)](https://developers.google.com/maps/billing-and-pricing/sku-details) as summarised by [OpenPlacesAPI](https://openplacesapi.com/blog/google-places-api-pricing). The $200 monthly credit was removed in the March 2025 reset — [OpenPlacesAPI](https://openplacesapi.com/blog/google-places-api-pricing) (third-party).
- **Google caching terms**
  - "Customer can temporarily cache latitude (lat) and longitude (lng) values from the Places API for up to 30 consecutive calendar days… Customer can cache Places API Place ID (place_id) values, in accordance with the Places API Policies" — [Google Maps Platform Service Specific Terms (official)](https://cloud.google.com/maps-platform/terms/maps-service-terms/index-20240422)
  - A third-party summary (Aug 2026) says place_id is the only field storable indefinitely. Name, address, rating and photos have no caching exception — [OpenPlacesAPI: Can you store Places API results?](https://openplacesapi.com/blog/can-you-store-places-api-results)
- **Search APIs**
  - **Parallel:** about **$1 per 1K** on fast tiers (vendor-authored) — [Parallel](https://parallel.ai/articles/tavily-alternatives). Deeper tiers cost $5 per 1K — [FastCRW](https://fastcrw.com/blog/web-search-api-pricing-2026)
  - **Brave:** **$5 per 1K**, with $5 monthly credit. The free tier was retired in early 2026 — [Parallel: Brave vs Parallel](https://parallel.ai/ai/articles/brave-search-api-vs-parallel)
  - **Exa:** **$7 per 1K** auto/fast and $4 instant, plus about $1 per 1K for page contents (sources conflict) — [Beri.net, Oct 2026](https://www.beri.net/article/tavily-vs-exa-vs-brave-vs-perplexity-search-api-agent-cost-2026); [FastCRW](https://fastcrw.com/blog/web-search-api-pricing-2026)
  - **Tavily:** about **$8 per 1K** pay-as-you-go, $5 on the $500/mo plan. Acquired by Nebius in 2026 — [Beri.net](https://www.beri.net/article/tavily-vs-exa-vs-brave-vs-perplexity-search-api-agent-cost-2026); [Parallel](https://parallel.ai/articles/tavily-alternatives)
  - **Claude Managed Agents / API web search:** $10 per 1K — Anthropic API reference (bundled)
- **Browserbase**
  - Developer plan: **$20/mo with 100 browser-hours**, then $0.12/hr
  - Startup plan: **$99/mo with 500 hours**, then $0.10/hr
  - Free: 1 hour

  Source: [Browserbase pricing (official)](https://www.browserbase.com/pricing); [EveryDev](https://www.everydev.ai/developers/browserbase). Hours bill wall-clock time, so waiting on slow pages costs the same as working — [Skyvern blog (competitor)](https://skyvern.com/blog/stagehand-alternatives-pricing-reviews/). Stagehand v3 (Oct 2025) claims to be "44% faster with improved reliability"; I found no independent form-filling benchmark — same Skyvern/directory sources.
- **Anthropic computer use** on current models runs only through `computer_toolset_20260801` on the Claude API (Opus 5.5 / Sonnet 5.5) — Anthropic API reference (bundled)
- **MCP is now mainstream across the stack:**
  - The Responses API supports MCP — [OpenAI what's new](https://developers.openai.com/api/docs/assistants/whats-new)
  - AI SDK 6 shipped stable MCP support — [Noqta](https://noqta.tn/en/blog/vercel-ai-sdk-6-typescript-ai-agents-guide-2026)
  - Microsoft Agent Framework supports MCP and A2A — [RyWalker](https://rywalker.com/research/microsoft-agent-framework)

### Inferences
- **Discovery flow per job:**
  1. Query your own provider DB first. It's free and favours providers who answer.
  2. Then make 1–2 Places Text Search calls with a field mask. Ask only for `id`, `displayName`, `nationalPhoneNumber`, `websiteUri`, `rating` and `userRatingCount`; phone, website and rating likely push the call to the Enterprise tier **[field-to-SKU mapping is background, verify]**.
  3. Then 1–3 web searches to find email or contact-form URLs.

  Cost: about **$0.04–0.12 per job** for discovery once past the free cap.
- **Caching:**
  - Store only `place_id` from Google, and re-fetch details when needed.
  - When a provider replies, or opts in to receive leads, the contact details they give you are your own first-party data. That is the legitimate way to grow the "own provider database". Legal review of this interpretation is advisable.
- **Browser agents:** contact-form submission by browser agent costs about $0.005–0.01 of browser time per form, plus LLM tokens. Reliability is unproven, CAPTCHAs are likely, and many trades sites have no forms. Defer it, and prefer SMS, email and voice.
- **MCP:** wrap the founder's internal tools (provider DB queries, `send_sms`, `place_call`, `escalate_to_founder`) as typed functions in-process. MCP is useful later for letting Claude/ChatGPT clients or the founder's console reach the same tools, but it's not necessary for the MVP.

### Gaps
- **Apple Maps Server API:** no pricing or terms found; not searched due to budget.
- **Perplexity Sonar pricing:** not found.
- **Browser Use** (open-source/cloud) pricing and reliability: not found.
- **OpenAI computer-use / agent mode:** no reliability data on real-world contact forms found.
- I could not confirm the exact field-to-SKU mapping for Places (New) Text Search from an official page in this session.

---

## 4. Models: which to use for triage, planning/dispatch and message writing (Oct 2026 pricing)

### Takeaway
Use a two-tier model setup with prompt caching:
- **Cheap tier for triage, parsing replies and extraction:** Claude Haiku 5.5 ($0.10/$0.50), GPT-5.4 mini ($0.75/$4.50) or Gemini 3.1 Flash-Lite ($0.25/$1.50).
- **Strong tier for planning, dispatch and user-facing wording:** Claude Sonnet 5.5 ($2/$10), Claude Opus 5.5 at low/medium effort ($4/$20) or GPT-5.5 ($5/$30).

Either way, LLM cost per job lands well under US$1.

### Cited Findings
- **Anthropic** (official reference, cached 2026-10-06; per 1M input/output tokens)

  | Model | Model ID | Input / Output | Notes |
  |---|---|---|---|
  | Claude Haiku 5.5 | `claude-haiku-5-5` | **$0.10 / $0.50** | Prompts up to 100K tokens; $0.50/$2.50 beyond |
  | Claude Sonnet 5.5 | `claude-sonnet-5-5` | **$2 / $10** | Cache reads $0.20 |
  | Claude Opus 5.5 | `claude-opus-5-5` | **$4 / $20** | Cache reads $0.20; default effort "medium" |
  | Claude Fable 5.1 | `claude-fable-5-1` | $10 / $50 | Most capable widely released model |
  | Claude Sonnet 4.6 / Haiku 4.5 | — | $3/$15 and $1/$5 | Older models still priced |

  Cache writes cost about 1.25x input and cache reads about 0.1x. Batch is 50% off. — Anthropic API reference (bundled; verify at https://platform.claude.com/docs). Third-party pages broadly agree on these list prices — [BenchLM](https://benchlm.ai/anthropic/api-pricing); [Metacto](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration). One third-party page gives the Sonnet 5.5 cache read as $0.10, which conflicts with Anthropic's $0.20.
- **Anthropic API mechanics that matter for this build:**
  - Structured outputs via `output_config.format`, and `strict: true` tools.
  - On Opus 5.5 and Sonnet 5.5, forced `tool_choice` (`any`/`tool`) returns 400; use `auto` plus strict tools, or structured outputs.
  - Thinking cannot be disabled on Opus 5.5; effort is the control.
  - Server-side compaction (beta), and mid-conversation system messages that preserve the cache.
  - **Task budgets** (a token ceiling per agent loop, beta).

  Source: Anthropic API reference (bundled)
- **OpenAI** (official model pages)

  | Model | Input / Cached / Output (per 1M) | Notes |
  |---|---|---|
  | **GPT-5.5** | **$5 / $0.50 / $30** | 1.05M context; surcharge above 272K input tokens; Batch/Flex at 50%; Priority at 2.5x |
  | **GPT-5.4 mini** | **$0.75 / $0.075 / $4.50** | 400K context |
  | **GPT-5.4 nano** | **$0.20 / $0.02 / $1.25** | Docs page marked **deprecated** |

  Sources: [GPT-5.5 model page](https://developers.openai.com/api/docs/models/gpt-5.5); [Introducing GPT-5.5](https://openai.com/index/introducing-gpt-5-5/); [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini); [GPT-5.4 nano](https://developers.openai.com/api/docs/models/gpt-5.4-nano); [Introducing GPT-5.4 mini and nano](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/). gpt-5-mini is listed at $0.25/$2.00 (third-party calculator, Sept 2026) — [Spur](https://www.spurnow.com/en/tools/openai-chatgpt-api-pricing-calculator).
- **Unverified OpenAI flagship:** third-party sites describe a "**GPT-6 Astra**" released 3 Sept 2026 at $10/$50, with "Sol" and "Luna" siblings and a "GPT-5.6". I could not verify this on OpenAI's site, and it conflicts with other pages — [CloudZero](https://www.cloudzero.com/blog/openai-pricing/); [ModelPricing.ai](https://modelpricing.ai/models/openai)
- **Google** (aggregators citing Google's page)

  | Model | Input / Output (per 1M) |
  |---|---|
  | Gemini 3 Flash | **$0.50 / $3.00** |
  | Gemini 3.1 Flash-Lite | **$0.25 / $1.50** |
  | Gemini 3.5 Flash | $1.50 / $9.00 |
  | Gemini 2.5 Flash-Lite | $0.10 / $0.40 |

  Sources: [Morph](https://www.morphllm.com/gemini-api-pricing); [BenchLM Google](https://benchlm.ai/google/api-pricing). One site lists a "Gemini 3.5 Flash-Lite" at $0.30/$2.50, unconfirmed — [AnotherWrapper](https://anotherwrapper.com/tools/llm-pricing/o3-2025-04-16/gemini-3.5-flash-lite)

### Inferences
- **Suggested routing**

  | Job | Model | Why |
  |---|---|---|
  | Intent and triage | **Claude Haiku 5.5** (cheapest current-gen) or GPT-5.4 mini / Gemini 3.1 Flash-Lite | Short prompt, strict JSON schema: `{trade, task, location, urgency, needs_clarification, question}` |
  | Planning and dispatch: ranking, choosing channels, deciding escalation | **Claude Sonnet 5.5** or GPT-5.5 | Strong reasoning with tool calls; Opus 5.5 at low effort is a good-value alternative |
  | Outbound message writing (SMS/email to providers, iMessage to users) | Sonnet 5.5 or Haiku 5.5 | Template-anchored, with a deterministic post-validator (see section 6) |
  | Reply parsing (provider SMS/email, call transcripts) | Haiku 5.5 or GPT-5.4 mini | Structured outputs: `{will_call: yes/no/maybe, eta, price_mentioned, notes}` |

- Use a **provider-agnostic SDK** (Vercel AI SDK) so routes can switch vendors as prices move. Prices changed several times in 2026.
- **Prompt caching:** keep a frozen system prompt and tool list at the front of every call. At about 10K stable tokens per call, cache reads cut input cost by about 90% on both Anthropic and OpenAI.
- Avoid GPT-5.4 nano because it's marked deprecated. Treat "GPT-6 Astra" as unverified until checked on openai.com.

### Gaps
- **Open-weight models:** I found no reliable Oct 2026 pricing or quality data (e.g. Llama, Qwen or DeepSeek via Groq or Together); not searched due to budget.
- **No GPT-5.5 mini** found; the current small OpenAI tier appears to be GPT-5.4 mini.
- Official Gemini pricing page not fetched (DNS).
- No head-to-head eval found for "dispatch quality" between these models.

---

## 5. Memory and data: profiles, provider performance; Postgres vs Firestore; Mem0/Zep/Letta

### Takeaway
This is a relational, analytics-heavy domain: jobs, outreach attempts, response latency, conversion by trade and suburb. **Postgres (Supabase or Neon) as the system of record** fits better than Firestore. Dedicated agent-memory layers (Mem0, Zep, Letta) are **overkill at MVP**: user "memory" is a profile row plus recent message history, and provider "learning" is SQL aggregates.

### Cited Findings
- **Cloudflare Agents** give each agent its own embedded SQL database inside a Durable Object, showing the "state lives with the agent/job" pattern — [Cloudflare blog: Project Think](https://blog.cloudflare.com/project-think/)
- **OpenAI** replaced Assistants Threads with the Conversations API for server-side conversation state — [OpenAI Assistants migration guide](https://developers.openai.com/api/reference/resources/beta/subresources/assistants.md)
- **Claude Managed Agents** has memory stores (beta header `agent-memory-2026-07-22`) — Anthropic API reference (bundled)
- **Vercel Workflow** bills persisted workflow data at $0.50/GB written and $0.50/GB-month retained, so workflow state is not the place for long-term profiles — [Vercel Workflow pricing](https://vercel.com/docs/workflows/pricing)

### Inferences
- **Suggested schema (Postgres):**
  - `users` (phone, name, default address/suburb, preferences JSONB, consent flags)
  - `jobs` (status enum, trade, description, location, timestamps)
  - `job_events` (append-only audit of every inbound/outbound message, call, webhook and decision, with model, prompt version and cost)
  - `providers` (place_id, own-sourced phone/email, trades[], service-area polygon or suburbs, opt-in status, do-not-contact)
  - `outreach_attempts` (job, provider, channel, sent_at, replied_at, outcome, called_user_at)
  - `provider_stats` (materialised view: response rate, median time-to-reply, time-to-call, completion rate and user rating, by trade and region)
- **Why Postgres over Firestore:**
  - Ranking providers needs joins and aggregates such as "response rate in the last 90 days for painters within 15 km". Firestore makes these awkward and costly.
  - PostGIS and pgvector (for fuzzy trade matching) are available on Supabase and Neon **[background]**.
  - Firestore is fine for a throwaway MVP, and the founder can keep Firebase Auth, Hosting and Functions for the admin console if preferred.
- **Agent memory is just database reads.** On each event, the workflow step reads the user profile, job state and last N messages into the prompt. No vector memory is needed until users have long, varied histories. Consider Mem0, Zep or Letta only if the product broadens into a general personal assistant (Poke-style).
- **Learning loop:** in-database provider scoring, e.g. a Bayesian-smoothed response rate and a time-to-call percentile, fed into the dispatch prompt as features. This is more reliable than LLM "memory", and auditable.

### Gaps
- **Mem0, Zep and Letta:** I didn't research current features or pricing (budget); the "overkill" judgement is inference.
- I didn't verify current Supabase, Neon or Firestore pricing.

---

## 6. Observability, evals, safety and cost controls

### Takeaway
- **Tracing:** use OpenTelemetry-compatible tracing into **Langfuse** (open-source, free tier or self-hosting) or **Braintrust** (generous free tier, strongest eval workflow). Don't rely on OpenAI's hosted Evals: its dashboard goes read-only on 31 Oct 2026 and Evals is removed on 30 Nov 2026.
- **Safety:** enforce "no commitments" with structured outputs plus deterministic validators plus approval gates, not just prompting.
- **Cost:** cap spend per job (step limits, task or session budgets) and per org (vendor spend limits).

### Cited Findings
- **Langfuse**
  - Hobby is free (50K units/month, 30-day retention); Core $29/mo; Pro $199/mo — [Dupple](https://dupple.com/learn/best-ai-observability-tools)
  - Self-hosting is free with the same feature set, and it is MIT-licensed — [Dupple](https://dupple.com/learn/best-llm-observability-tools); [DevToolLab](https://devtoollab.com/blog/best-llm-observability-tools)
  - A competitor blog says ClickHouse acquired Langfuse in Jan 2026 (unconfirmed) — [Latitude](https://latitude.so/blog/best-llm-observability-tools-agents-latitude-vs-langfuse-langsmith)
- **Braintrust:** free tier with 1M spans/month and unlimited users — [Latitude](https://latitude.so/blog/best-llm-observability-tools-agents-latitude-vs-langfuse-langsmith). Pro is $249/mo per one source and custom-priced per another — [MojoAuth](https://mojoauth.com/blog/top-9-ai-eval-observability-platforms); [CostBench](https://www.costbench.com/compare/braintrust-vs-langfuse/). It is described as strongest for evaluation-driven development and CI eval gating — [Latitude](https://latitude.so/blog/best-llm-observability-tools-agents-latitude-vs-langfuse-langsmith)
- **LangSmith:** Plus at $39/seat — [LangChain pricing](https://www.langchain.com/langgraph-platform-pricing)
- **OpenAI hosted evals are going away:** the Evals dashboard goes read-only on 31 Oct 2026, and Agent Builder and Evals are removed from 30 Nov 2026 — [OpenAI AgentKit page](https://openai.com/index/introducing-agentkit/); [DEV Community](https://dev.to/mr_manushukla/4-openai-agent-apis-in-2026-responses-chat-completions-agents-sdk-agentkit-3bln)
- **Built-in guardrails and cost controls:**
  - AI SDK 6 added **tool approvals**, and its default agent loop caps at 20 steps — [Noqta](https://noqta.tn/en/blog/vercel-ai-sdk-6-typescript-ai-agents-guide-2026); [DEV Community](https://dev.to/koenig_academy_9a8f35ff4b/vercel-ai-sdk-6-production-patterns-for-autonomous-loops-2n6f)
  - Claude Managed Agents has hard USD **session budgets** and `always_ask` tool permission policies. Anthropic's Messages API has **task budgets** (beta) and OpenTelemetry tracing support — Anthropic API reference (bundled)
  - Trigger.dev added hard per-org **spend limits** — [releases.sh](https://releases.sh/collections/workflow-orchestration/digest/2026-06-29)
- **Practitioner lesson from AI voice agents:** they handle straightforward quote and booking requests well, but callers hang up on emotional or complex calls, so routing to a human matters — [GrowwStacks](https://growwstacks.com/blog/how-to-build-sell-ai-voice-agents-local-businesses/)

### Inferences
- **Commitment guardrails, in layers:**
  1. Every outbound message is generated as structured output (`{text, mentions_price: bool, mentions_booking_time: bool, commits_on_behalf_of_user: bool}`).
  2. A deterministic validator rejects any text with currency amounts, "booked/confirmed/guarantee" language or dates, unless the workflow state allows it.
  3. Outbound voice-agent prompts state that the agent may only request a callback and must never quote, accept or book.
  4. Anything involving money, cancellation or legal or medical matters triggers `escalate_to_founder` (a human-approval hook in the workflow).
  5. Every job has a founder-takeover flag. When it is set, the workflow stops auto-replying and forwards inbound messages to the founder console.
- **Evals:**
  1. Build a golden set of 50–150 real or synthetic requests ("need someone to call me about painting my wall"; ambiguous ones; out-of-area ones; emergencies).
  2. Grade: (a) triage JSON accuracy, (b) whether the clarifying question was necessary and limited to one, (c) dispatch ranking against a founder-labelled "good providers" list, (d) policy compliance of outbound text (no commitments).
  3. Run in CI on prompt or model changes with Braintrust or Langfuse datasets.
  4. Online, track the funnel per job: providers contacted, replies, first-callback latency, user-confirmed connection, cost per job.
- **Cost controls:**
  - Per-job budgets: max providers contacted, max LLM calls, max US$ (computed from token usage logged in `job_events`).
  - Per-day global caps with an alert.
  - Prompt caching.
  - Cheap-model routing for parsing.

### Gaps
- No public dispatch-quality eval benchmarks for "concierge/ops" agents were found.
- Langfuse's ClickHouse acquisition is unconfirmed.
- Braintrust's paid pricing is inconsistent across sources.
- I didn't research OpenAI's current tracing dashboard status (separate from Evals).

---

## 7. Reference architectures and write-ups from teams building long-running ops agents

### Takeaway
Public engineering detail is thin. The closest comparable, **Poke** (an iMessage/SMS agent from The Interaction Company), was acquired by **Cognition on 23 July 2026**, and its internals aren't public. Vercel and Anthropic publish relevant reference patterns: human-in-the-loop with a durable workflow, and Managed Agents driven from Vercel Workflow. I found no engineering write-up of an agent that phones businesses on a consumer's behalf.

### Cited Findings
- **Poke**
  - Cognition (maker of Devin) acquired The Interaction Company of California, maker of Poke, announced 23 July 2026, terms undisclosed — [Dealroom](https://dealroom.co/news/140804-devin-maker-cognition-acquires-poke-the-ai-agent-native-to-apple-message/)
  - Poke is a personal agent inside iMessage and SMS that **starts conversations itself** and exposes a "constrained, message-driven surface" rather than broad system privileges — [LetsDataScience](https://letsdatascience.com/news/poke-simplifies-ai-agents-through-text-interfaces-b2710087); [wwwhatsnew](https://wwwhatsnew.com/2026/04/10/poke-ai-agente-imessage-sms-sin-app/)
  - About 10 people, backed by Spark Capital and General Catalyst, at a $300M post-money valuation after a $10M extension to a $15M seed — [TechCrunch](https://techcrunch.com/?p=3110530)
  - A Spanish-language article has a section on "multi-agent architecture and third-party MCP", but no detail was retrievable — [Ecosistema Startup](https://ecosistemastartup.com/poke-agentes-ia-tan-faciles-como-enviar-un-mensaje/)
- **Vercel reference guides:**
  - "Human-in-the-Loop with Chat SDK and Workflow SDK", where a workflow pauses on a hook for the next message — [Vercel KB](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk)
  - "Build a Claude Managed Agent with Vercel Workflow" — [Vercel KB](https://vercel.com/kb/guide/claude-managed-agent-vercel)
  - "The best workflow engine is a programming language" (design rationale) — [Vercel blog](https://vercel.com/blog/the-best-workflow-engine-is-a-programming-language)
- **Durable execution for agents:** an April 2026 explainer frames durable execution (Temporal, Inngest, Cloudflare Workflows) as the fix for "agent amnesia" in long-running agents — [AgentMarketCap](https://agentmarketcap.ai/blog/2026/04/07/durable-execution-temporal-inngest-cloudflare-workflows-agent-amnesia)
- **Outbound calling:** the search for "AI agent phones local businesses for quotes on your behalf" returned only inbound AI-receptionist content. AI receptionists sell for about $500–1,000/month to trades — [GrowwStacks](https://growwstacks.com/blog/how-to-build-sell-ai-voice-agents-local-businesses/)

### Inferences
- **Lessons from Poke's public positioning:**
  - A narrow, message-driven tool surface (not general computer access).
  - A proactive agent that messages first, e.g. "Two painters said yes; Sam from X Painting will call you in about 15 min".
  - Multi-agent plus MCP for integrations.
- **This product is narrower than Poke** (one job type: get a human provider to call you back). That argues for a deterministic workflow with LLM decision steps over a general multi-agent system.
- The absence of public "agent phones businesses" engineering write-ups means the founder should treat the voice-outreach step as the riskiest part. The other researcher's voice/telephony findings and early manual founder-in-the-loop testing (Wizard-of-Oz) should drive it.

### Gaps
- No Poke engineering blog content was retrievable.
- No talks were found from AI Engineer World's Fair 2026 or OpenAI DevDay 2026 on long-running ops agents (DevDay 2026 date and content not confirmed; not searched due to budget).
- No Latent Space or Hacker News write-ups were retrieved.
- Google's consumer "Ask for Me" calling feature (2025), which phoned businesses for quotes, may be relevant **[background, unverified]**. I found no architecture write-up.

---

## 8. Recommended stack for this founder (TypeScript-first), component diagram and per-job cost

### Takeaway
**Recommended MVP stack:** Next.js on Vercel for webhooks and the founder console, plus a durable workflow per job, plus Postgres (Supabase) as the system of record. The workflow is **Inngest**, or **Vercel Workflow** if going all-in on Vercel. The LLM layer is the **Vercel AI SDK** (provider-agnostic structured outputs and tools), routing triage and parsing to **Claude Haiku 5.5** (or GPT-5.4 mini) and planning and messaging to **Claude Sonnet 5.5** (or GPT-5.5). Use **Google Places (New)** plus **one web-search API** for discovery, and **Langfuse** or **Braintrust** for traces and evals.

Estimated agent-brain, orchestration and discovery cost: **about US$0.15–0.70 per job**, excluding telephony, voice minutes and messaging fees, which will likely dominate.

### Cited Findings
- **Component prices used in the estimate:**
  - Vercel Workflow events at $0.02/1K, about 3 events per step — [Vercel Workflow pricing](https://vercel.com/docs/workflows/pricing)
  - Inngest: waits count once, about $50 per 1M steps — [AutomationAtlas](https://automationatlas.io/answers/inngest-pricing-explained-2026/)
  - Places Text Search Enterprise at $35/1K after 1,000 free, up to 20 results per request — [Google pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
  - Search APIs at $1–8/1K — [Beri.net](https://www.beri.net/article/tavily-vs-exa-vs-brave-vs-perplexity-search-api-agent-cost-2026)
  - Claude Haiku 5.5 $0.10/$0.50; Sonnet 5.5 $2/$10 (cache read $0.20); Opus 5.5 $4/$20 — Anthropic API reference (bundled)
  - GPT-5.5 $5/$30 (cached $0.50); GPT-5.4 mini $0.75/$4.50 — [OpenAI model docs](https://developers.openai.com/api/docs/models/gpt-5.5)
  - Langfuse free at 50K units/month — [Dupple](https://dupple.com/learn/best-ai-observability-tools)
  - Browserbase at $0.10–0.12/hr — [Browserbase](https://www.browserbase.com/pricing)
  - Claude Managed Agents runtime at $0.08/hr while running — Anthropic API reference (bundled)

### Inferences

**Recommended stack, with reasons**

| Layer | Pick | Why | Alternatives |
|---|---|---|---|
| Ingress and webhooks | Next.js route handlers on Vercel (Linq iMessage, telephony/voice provider, email inbound, SMS) | The founder already knows Vercel. Handlers verify the signature, write `job_events`, and emit a workflow event. They stay idempotent. | Firebase Functions |
| Durable orchestration | **Inngest**: one function run per job, `step.run` fan-out, `step.waitForEvent` with timeouts, `cancelOn` for user cancel or founder takeover | Most proven flow-control (waits are free, concurrency and throttling, replay). Portable off Vercel. | **Vercel Workflow** with `createWebhook`/`defineHook`/`sleep`, plus AI SDK 7 `WorkflowAgent`: cheapest and most native, but GA unconfirmed. **Temporal Cloud** once volume justifies $100+/mo and ops. |
| LLM layer | **Vercel AI SDK** (v6/v7): `generateObject`/structured outputs for triage and parsing, tool calls for dispatch, MCP client optional | Provider-agnostic, TypeScript-first, tool approvals, OpenTelemetry. Avoids lock-in while prices churn. | OpenAI Agents SDK (JS) plus Responses API if OpenAI-only. **Not** Agent Builder (shut down 30 Nov 2026). **Not** the Codex SDK (coding-scoped). Claude Managed Agents later, if a hosted loop with budgets and webhooks becomes attractive. |
| Models | Triage, parsing, extraction: **Claude Haiku 5.5** (or GPT-5.4 mini / Gemini 3.1 Flash-Lite). Dispatch and planning plus user and provider copy: **Claude Sonnet 5.5** (or GPT-5.5; Opus 5.5 at low effort for hard cases). | Cost/quality split; prompt caching on stable prefixes | — |
| Discovery tools | Own provider DB first → Google Places (New) Text Search with tight field masks (store place_id only) → one web-search API (Parallel or Brave) for emails and contact pages | Cheapest reliable path within Google's caching terms | Browserbase + Stagehand for contact forms as a later fallback |
| Data | **Supabase Postgres** (users, jobs, job_events, providers, outreach_attempts, provider_stats views; PostGIS/pgvector optional) | Joins, aggregates and geo for provider scoring | Neon; Firestore acceptable for a throwaway MVP |
| Founder console | Next.js admin: live job board, transcript, "take over" (sends a `job/takeover` event that pauses auto-actions), approve/deny escalations, manual message send | Human-in-the-loop is a product requirement | Slack approvals later |
| Observability and evals | **Langfuse** (free tier or self-host) or **Braintrust**; OTel from the AI SDK; golden-set evals in CI; per-job cost ledger in Postgres | OpenAI hosted Evals is going away | LangSmith |
| Guardrails and cost | Structured-output validator for no-commitments; founder-approval hook; per-job caps (max providers, LLM calls, US$); daily spend alert | Prevents unauthorised commitments and runaway loops | — |

**Component diagram (text)**

```
[User iPhone] --iMessage--> [Linq] --webhook--> (Vercel: /api/linq)
                                                    |  verify sig, upsert user, append job_event
                                                    v
                                         [Inngest event: "msg/inbound"]
                                                    |
        +-------------------------------------------v----------------------------------------------+
        | JOB WORKFLOW (one durable run per job, keyed jobId)                                      |
        |  1. triage (Haiku 5.5, JSON schema) -> if ambiguous: send ONE clarifying Q,             |
        |     waitForEvent("msg/inbound", 2h) -> re-triage                                         |
        |  2. discover: query providers DB -> Places Text Search -> web search (contact/email)     |
        |  3. rank & plan (Sonnet 5.5 + provider_stats features) -> pick top N=5, channel per prov |
        |  4. fan-out steps: voice call / SMS / email per provider (each idempotent, logged)       |
        |  5. waitForEvent("provider/replied" where answer=yes, 20m)                               |
        |       - replies arrive via (Vercel: /api/voice, /api/sms, /api/email) -> parse (Haiku)   |
        |       - timeout -> next batch / widen radius / notify founder (escalate hook)            |
        |  6. on YES: tell provider user's number + context; tell user "X will call ~15 min"       |
        |  7. waitForEvent("call/confirmed" | "msg/inbound", 2h) -> confirm with user              |
        |  8. learn: write outreach outcomes; refresh provider_stats                               |
        |  cancelOn: "job/cancelled", "job/takeover" (founder)                                     |
        +-------------------------------------------+----------------------------------------------+
                                                    |
          [Supabase Postgres]  <---- reads/writes ---+---- traces ----> [Langfuse / Braintrust]
          users, jobs, job_events, providers,        |
          outreach_attempts, provider_stats          +---- alerts/approvals ----> [Founder console (Next.js)]
                                                                                   take over / approve / send
External APIs: LLMs (Anthropic / OpenAI via AI SDK), Google Places (New), Parallel/Brave search,
               voice-agent + telephony provider, SMS provider, email provider (other researchers)
```

**Estimated per-job cost** (agent brain, orchestration and discovery only, USD)

Assumptions for a typical job:
- 6 user messages
- 1 clarifying question
- 5 providers contacted (1 batch, with a second batch in 30% of jobs)
- 5 replies parsed
- about 10 strong-model decision calls (about 15K input with about 12K cached, plus about 1K output including reasoning)
- about 15 cheap-model calls (about 4K input, 300 output)
- 1–2 Places Text Search (Enterprise) calls
- 3 web searches
- about 40 workflow steps

| Component | Low (Claude Haiku 5.5 + Sonnet 5.5) | High (GPT-5.4 mini + GPT-5.5) |
|---|---|---|
| Cheap-model calls (15 × 4K in / 0.3K out) | ≈ $0.008 | ≈ $0.065 |
| Strong-model calls (10 × [12K cached + 3K fresh in, 1K out]) | ≈ $0.20 (Sonnet 5.5; ≈ $0.33 on Opus 5.5) | ≈ $0.51 |
| Google Places Text Search Enterprise (1–2 calls; free first 1,000/mo) | $0–0.07 | $0.07 |
| Web search (3 queries at $1–8/1K) | ≈ $0.003 | ≈ $0.024 |
| Durable workflow (about 40 steps / about 120 events) | ≈ $0.002 (Inngest / Vercel) | ≈ $0.005 (Temporal actions; plus $100/mo floor) |
| Serverless compute for webhooks and steps | < $0.01 | < $0.01 |
| Observability | $0 (free tiers cover about 1K+ jobs/mo) | ≈ $0.01–0.03 when amortised on a paid plan |
| **Total (excl. voice, telephony, messaging)** | **≈ $0.15–0.30** | **≈ $0.60–0.70** |

**Volume and plan caveats**
- Optional browser form fill: about $0.01 of browser time per form, plus about $0.02–0.05 of tokens.
- Fixed monthly costs at MVP scale (illustrative):
  - Vercel Pro $20/seat
  - Supabase about $25 **[background price, unverified]**
  - Inngest $0 on the free tier, or about $75–99 for Pro
  - Langfuse $0 to $29
- At 1,000 jobs/month, LLM, orchestration and discovery come to roughly **$150–700/month**.
- Voice minutes for 5 outbound AI calls per job are likely to exceed this and are covered by the telephony researcher.
- Claude Managed Agents alternative: runtime adds only $0.08 per running hour; a job with 10 minutes of active running costs about $0.013 plus tokens. Cost is not the reason to avoid it; beta status and the container-centric design are.

**Build-order advice**
1. Week 1–2:
   - Workflow skeleton with founder-in-the-loop (Wizard-of-Oz): the founder manually picks and contacts providers from the console while the workflow handles state, timers and messaging.
   - Log everything to `job_events`.
2. Automate triage and reply parsing (cheap model plus schemas).
3. Automate discovery and ranking.
4. Automate outreach channels in order of reliability: SMS/email, then AI voice.
5. Add evals from logged real jobs, then tune models and prompts.

### Gaps
- Per-job token counts are modelled assumptions, not measurements. The founder should log `usage` per call from day one to replace them.
- The Vercel Workflow GA date and Inngest's official current pricing were not verified (conflicting third-party figures).
- Supabase and Vercel plan prices were not re-verified this session.
- AUD conversion not applied; all figures are USD list prices. AUD/USD in Oct 2026 was not checked.
