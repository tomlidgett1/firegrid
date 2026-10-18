# Consumer Messaging "Front Door" for a Text-a-Number Callback Concierge (AU-first, as of 18 Oct 2026)

Method note for the report writer: these notes come from 30 web searches run on 18 Oct 2026. Every WebFetch attempt failed with DNS errors (linqapp.com, docs.linqapp.com, techcrunch.com), so the findings come from search-result snippets and summaries, not full pages. Many "facts" about iMessage API providers appear only on competitors' comparison pages (Blooio, Sendblue, Tuco, Blue Reacher, BlueSendr), which are biased, so they are labelled that way. Items marked "Background (unverified this session)" are prior knowledge I could not confirm, and they appear only under Gaps or Inferences.

---

## 1. Linq: what it offers, how it delivers iMessage, commercial terms, stability, and Apple risk

### Takeaway
Linq is the best-funded and most AI-agent-focused iMessage API. It has a $20M Series A from Feb 2026, powers Poke and Tomo, carries 30M+ messages a month, and offers iMessage + RCS + SMS fallback + voice through one API with good real-time features (typing indicators, voice memos, reactions, contact-card push, webhooks). Pricing is sales-gated and not public. It delivers iMessage through unofficial, device-based infrastructure (Apple accounts on real Apple hardware), not through any Apple-sanctioned channel, so individual lines can be "FLAGGED" and restricted. Australian (+61) number availability could not be verified and has to be confirmed with Linq sales before committing.

### Cited Findings
**Company, funding, traction**
- Linq (Birmingham, Alabama) raised a $20M Series A in early Feb 2026, led by TQ Ventures with Mucker Capital and angels including a former Apple and Google executive. Its APIs let AI agents and businesses reach users over iMessage, SMS, RCS and voice. — [TechCrunch](https://techcrunch.com/2026/02/02/linq-raises-20m-to-enable-ai-assistants-to-live-within-messaging-apps); [Pulse 2.0](https://pulse2.com/linq-20-million-series-a/); [Bham Now](https://bhamnow.com/2026/02/03/birmingham-startup-raises-20m-in-funding-for-ai-powered-messaging/)
- Linq claims 100+ customers including Poke.com, Tomo and Hypercard, 30M+ messages a month across customers, and pricing "about 90% below legacy communications API providers". TechCrunch reported Linq doubled, within eight months, the ARR it had built over four years. — [TechCrunch](https://techcrunch.com/2026/02/02/linq-raises-20m-to-enable-ai-assistants-to-live-within-messaging-apps); [ContentGrip](https://www.contentgrip.com/linq-raises-20m-ai-messaging/)
- Linq started as a digital business card and lead-capture tool, then pivoted to upgrading business texting from SMS to iMessage and RCS. The founders are ex-Shipt executives Elliott Potter (CEO), Patrick Sullivan (CTO) and Jared Mattsson (President). — [Pulse 2.0](https://pulse2.com/linq-20-million-series-a/); [Business Alabama](https://businessalabama.com/birmingham-communications-startup-raises-20m-in-series-a-funding/)
- One secondary (Chinese-language) report of the TechCrunch coverage says observers flagged exposure to Apple policy changes, and that the CEO positions Linq as infrastructure that will extend to Slack, email, Telegram and WhatsApp. This is a single secondary source and is unconfirmed. — [DigitalToday](https://www.digitaltoday.co.kr/cn/view/32911/linq-raises-20-million-to-support-ai-assistants-inside-messaging-apps)
- Linq says its API powers Poke's messaging, and a third-party guide also says Poke uses Linq as its messaging relay. — [Linq example apps](https://linqapp.com/s/example-apps/ai); [Poster guide](https://www.poster.ly/guides/poke-guide)
- Linq publishes a Tomo customer story. — [Linq blog](https://linqapp.com/blog/tomo-customer-story)

**How iMessage is delivered (mechanism and Apple relationship)**
- Apple offers no public iMessage API. Cloud providers run real Apple devices, often Mac minis in data centres, each with an Apple ID and phone number. Sendblue says outright that it runs Mac minis in data centres. — [Sendblue: iMessage API without a Mac](https://www.sendblue.com/blog/imessage-api-without-mac)
- Lindy's post (18 Mar 2026) describes its own pre-Linq setup: a Mac mini in a data centre with a paired iPhone and an Apple account, plus a Swift daemon that watched the Messages SQLite database and injected messages through Private Frameworks "in ways Apple definitely didn't intend". It took three rewrites in a month before they swapped it for an API call (Linq), and the post states "There is no iMessage Business API." The title cites "One Apple Ban". — [Lindy blog](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)
- Linq's own blog (as summarised by a third party) says Lindy moved off a hardware-based integration after account bans and maintenance problems, and migrated to Linq within days. — [Linq blog](https://linqapp.com/blog/best-imessage-api); [Plushcap summary](https://www.plushcap.com/companies/linq/blog/summaries/2026/07)
- Third-party write-ups describe Linq as a managed bridge that handles the Mac minis, iPhones, Apple IDs, number rotation and anti-spam measures. — [Claw Messenger comparison](https://www.clawmessenger.com/compare/imessage-api); [Lindy blog](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)
- A GitHub issue from a Linq user (the Homeroom bot), which is not an official source, says Linq has no Apple partnership and that a line can be "FLAGGED or lost". — [GitHub issue #3983](https://github.com/Usernode-Labs/social-vibecoding/issues/3983)
- Linq's docs confirm lines have an ACTIVE or FLAGGED status, reported through a `phone_number.status_updated` webhook, and error 2027 means "the sender number is currently restricted from sending due to its line reputation". — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/); [Linq key concepts](https://docs.linqapp.com/channel/imessage/getting-started/key-concepts/)
- Linq's FAQ calls its lines "P2P iMessage numbers" not designed for OTP/verification traffic and recommends a separate SMS provider for one-time passcodes. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Dedicated iMessage numbers from Sendblue and Linq "start with zero reputation", per an anti-blocking guide from a competitor. — [texting.blue](https://texting.blue/blog/avoid-to-imessage-blocks/)
- Precedent: in Dec 2023 Apple shut down Beeper Mini (iMessage on Android) and later flagged and banned Apple accounts and Macs used by Beeper users, which prompted US lawmakers to ask the DOJ to investigate. — [Tom's Guide](https://www.tomsguide.com/phones/rip-beeper-mini-imessage-on-android-is-now-truly-done); [Notebookcheck](https://www.notebookcheck.net/Apple-bans-iMessage-accounts-linked-to-Beeper-app.798639.0.html); [Bloomberg](https://www.bloomberg.com/news/articles/2023-12-18/lawmakers-ask-doj-to-probe-apple-for-shuttering-imessage-apps) *(2023, older context)*
- Gizmodo (Aug 2026), covering ChatGPT's Mac app gaining iMessage control, noted Apple's history of shutting down third-party apps that tap into or bridge iMessage. — [Gizmodo](https://gizmodo.com/chatgpts-mac-app-can-now-control-imessage-which-apple-probably-wont-like-2000801353)
- One analysis cites MacRumors/The Information as saying Apple's concern is "rogue AI agents deleting content and causing other problems". — [Gadget Hacks](https://apple.gadgethacks.com/news/third-party-ai-agent-in-iphone-messages-what-poke-reveals-about-apples-ai-strategy/)
- A HackMD write-up claims Apple warned it would stop supporting non-compliant apps in June 2026. I could not confirm this. — [HackMD](https://hackmd.io/@ZURhi6cqSnWHVFu2MCiTpg/BJJXqdqd-l)

**Features (from Linq docs, via search snippets)**
- Protocols: iMessage, RCS and SMS/MMS with automatic SMS fallback, plus voice. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/); [Linq iMessage API page](https://linqapp.com/imessage-api); [GitHub issue (zeroclaw)](https://github.com/zeroclaw-labs/zeroclaw/issues/656)
- Typing indicators work in 1:1 and group chats on iMessage only. RCS/SMS requests return 204 with nothing shown. An indicator clears when you send a message or about 85–90 s after the last start request, the docs suggest refreshing every 60 s, and a 204 means "accepted", not "displayed". — [Linq typing indicators](https://docs.linqapp.com/channel/imessage/guides/chats/typing-indicators/). The FAQ adds that the chat must have had activity in the last 5 minutes. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Voice memos are sent with `POST /api/partner/v3/chats/{chatId}/voicememo` (MP3, M4A, AAC, CAF, WAV, AIFF or AMR, max 10 MB, not combinable with other parts). They play inline on iMessage and fall back to an ordinary audio attachment on RCS/SMS. — [Linq voice memos](https://docs.linqapp.com/guides/messaging/voice-memos/)
- Reactions/tapbacks: Linq's own example agent calls `POST /v3/messages/{messageId}/reactions` with standard tapbacks or any custom emoji. I found no dedicated reference page. — [linq-team/granola-agent](https://github.com/linq-team/granola-agent)
- Webhooks are HMAC-SHA256 signed, retried up to 10 times over about 25 minutes with exponential backoff, and carry a unique event ID for deduplication. Subscriptions are created with `POST /api/partner/v3/webhook-subscriptions` or in the dashboard. — [Linq webhooks](https://docs.linqapp.com/channel/imessage/guides/webhooks/)
- Delivery and read receipts: `message.delivered` fires only for direct chats on iMessage or RCS, while SMS-only recipients and group chats emit only `message.sent`. Users can turn read receipts off. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Contact cards: a "Share Contact Card" action pushes an Apple contact card over iMessage and shows an "add contact" popup at the top of the thread (iMessage only, not Android). For non-iPhones the docs suggest a .vcf attachment. The API cannot read or save Apple contact-card data sent by users, though .vcf files can be saved. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Attachments (images, video, documents, voice memos, contact cards) can be up to 100 MB. — [Linq iMessage docs](https://docs.linqapp.com/channel/imessage/)
- "Experiences" (native interactive cards) are iMessage-only, and SMS/RCS recipients get errors 2018 and 4005. — [Linq experiences docs](https://docs.linqapp.com/channel/imessage/guides/messaging/experiences/index.md)
- Link previews appear in a third-party integration's feature list. I found no Linq rich-link doc. — [Sim integration page](https://docs.sim.ai/integrations/linq)
- Group chats are supported, and Android members can take part over RCS/SMS with fewer features. — [GitHub issue #3983](https://github.com/Usernode-Labs/social-vibecoding/issues/3983) (unofficial); [Linq typing indicators](https://docs.linqapp.com/channel/imessage/guides/chats/typing-indicators/)
- Linq's own AI-context page argues that Apple Messages for Business lacks RCS/SMS, group chats, iMessage apps, E2E encryption, reactions, read receipts, calls and typing indicators. This is a vendor claim. — [Linq AI instructions page](https://linqapp.com/s/ai-instructions)

**Numbers, countries, onboarding**
- Handles use E.164. Accounts start with one or more lines, and you get more numbers by contacting a Linq representative. `GET /v3/phone_numbers` lists your lines. — [Linq key concepts](https://docs.linqapp.com/channel/imessage/getting-started/key-concepts/); [List phone numbers](https://docs.linqapp.com/channel/imessage/api/go/resources/phone_numbers/methods/list/)
- Error 2032 reads "International plan is not enabled for this number", which suggests international sending or calling is a per-line setting. — [Linq FAQ/errors](https://docs.linqapp.com/guides/resources/faq/)
- My searches found no Linq page that confirms Australian (+61) lines or lists supported countries. — (search returned nothing relevant; see Gaps)

**Pricing, limits, SLA**
- Linq's site says it has no per-message pricing or metered billing and that RCS, SMS fallback and voice are bundled. — [Linq iMessage API page](https://linqapp.com/imessage-api)
- Price is sales-gated with no public tier or free trial, and contracts are reportedly annual. Competitor pages quote roughly $160–250 per line per month plus a $500–1,000 setup fee, and Tuco lists "$500 setup plus annual-only billing". These numbers are unverified and come from competitors. — [Blooio vs Linq](https://blooio.com/compare/blooio-vs-linq-blue); [Blooio Linq alternative](https://blooio.com/alternatives/linq); [Tuco pricing](https://tuco.ai/blog/imessage-api-pricing-comparison-2026); [Tuco vs Linq Blue](https://tuco.ai/compare/linq-blue); [imessageapis.com](https://imessageapis.com/articles/linq-vs-sendblue)
- Reported daily caps conflict: about 150 messages/day (Tuco), 50 new chats/day (BlueSendr), and a ranking site's "50 opted-in / 30 cold new contacts per day" that isn't clearly attributed to Linq. All are competitor claims. — [Tuco](https://tuco.ai/compare/linq-blue); [BlueSendr](https://bluesendr.com/linq-alternative); [Blue Reacher ranking](https://bluereacher.com/best/imessage-api)
- Linq advertises a contractual 99.95% uptime SLA and under 120 ms latency, and says it is the only provider backing uptime with an SLA. A buyer's guide advises getting the SLA text and remedy terms. — [Linq texting API guide](https://linqapp.com/blog/texting-api); [Linq AI instructions page](https://linqapp.com/s/ai-instructions); [imessageapis.com on Linq Blue](https://imessageapis.com/articles/linq-blue-imessage-api)
- A competitor ranking page dated 16 Oct 2026 says Linq does not support message blasts and is "closing sales, prospecting and outreach accounts and removing lines from Monday 19 October 2026". A follow-up search found no corroboration. — [Blue Reacher ranking](https://bluereacher.com/best/imessage-api)
- Linq also sells an iMessage sales agent ("Emily") that hands off to humans. — [Linq Emily page](https://skywalker-next.linqapp.com/s/emily)

### Inferences
- Linq fits a conversational, inbound-first AI product well. Users text first, and typing indicators, voice memos, reactions and contact-card push are exactly what a "we're on it" concierge needs. The reported push away from sales and outreach accounts, if true, helps an inbound consumer use case because it should reduce spam-driven flagging of the shared infrastructure.
- Apple risk is structural, not hypothetical. The channel depends on Apple tolerating Apple IDs on data-centre hardware. Apple's Dec 2023 Beeper response shows it can flag accounts at scale, and Linq's own FLAGGED status and reputation error codes show line-level enforcement already happens. The realistic failure mode is losing or rate-limiting one line (your published number), not losing the whole platform overnight. Design for line loss.
- Inbound-only, user-initiated traffic with low message counts per user is the lowest-risk profile on these channels, since caps and warm-up rules mostly target new outbound conversations.
- The "Hypercard" customer named in Linq's funding coverage could not be identified.

### Gaps
- Whether Linq can provision Australian +61 iMessage lines, and if not, how a US +1 line behaves for Australian users. Background (unverified this session): iMessage itself works across borders over data, so iPhone users can iMessage a +1 handle for free. SMS fallback to and from a +1 number would be international SMS, which may cost the Australian user money and look foreign or suspicious. This is the single most important question for Linq sales.
- Actual Linq price, per-line daily new-contact limits for inbound vs outbound, warm-up rules, what happens and how fast when a line is FLAGGED (replacement number? number portability?), SLA remedies. None of this is public.
- Whether Linq is (or resells) an Apple Messages for Business MSP. TechCrunch says Poke's AMB approval went through "its messaging service provider", but I could not confirm that this is Linq.
- Whether Linq's RCS reaches Android through P2P RCS from Android devices or through Google RBM. Not documented in what I found.
- Whether location sharing (iMessage "Share My Location"/pins) arrives through Linq webhooks. Not found.
- Not verified: the 19 Oct 2026 account-closure claim and the June 2026 "Apple stops supporting non-compliant apps" claim.

---

## 2. Alternatives and fallbacks: other iMessage APIs, self-hosting, Apple Messages for Business, RCS, WhatsApp, Australian SMS, the ACMA Sender ID Register, and Android users

### Takeaway
All third-party "blue bubble" APIs (Sendblue, LoopMessage, Blooio and newer resellers) use the same unofficial device-farm model, so they share Linq's Apple risk. They differ mainly on price transparency, daily contact caps and country coverage. LoopMessage is the only one with a (third-party) report of Australian senders. Apple Messages for Business is now the sanctioned route for AI agents (Poke, June 2026), but it needs human escalation, is customer-initiated, and excludes Android. iPhone RCS is still not live on Australian carriers (Oct 2026), so business RCS is not a real channel in Australia yet. WhatsApp allows task-specific business bots (this product qualifies) but bans general-purpose assistants. Plain two-way SMS on an Australian dedicated virtual mobile number is the robust universal fallback, and the new ACMA Sender ID Register (live 1 Jul 2026) applies to alphanumeric sender IDs, not to numeric mobile numbers.

### Cited Findings
**Sendblue (US)**
- Free sandbox on a shared number (full API, up to 10 verified contacts). The "AI Agent" plan is $100 per dedicated line per month with 1,000 inbound contacts/day and no per-message fees. Outbound-initiated messaging needs a custom or Enterprise plan, which third parties put at about $1,000/line/month plus a $2,000 setup fee. — [Sendblue pricing comparison](https://www.sendblue.com/blog/imessage-api-pricing-comparison); [mynumberrs](https://mynumberrs.com/blog/sendblue-pricing-and-alternatives/); [texting.blue vs Sendblue](https://texting.blue/compare/sendblue/)
- A review warns that auto-SMS fallback "works smoothly… unless you're dealing with international numbers". Sendblue's own comparison positions Sendblue for US-focused messaging and Twilio for international SMS. — [AI Chief review](https://aichief.com/ai-business-tools/sendblue/); [Sendblue text API comparison](https://www.sendblue.com/blog/text-message-api-comparison)
- Mechanism: Mac minis in data centres. — [Sendblue](https://www.sendblue.com/blog/imessage-api-without-mac)

**LoopMessage**
- Dedicated senders: Sandbox $0, Light $59.99/mo (300 daily contacts), Regular $99.99/mo (1,000 daily contacts). Shared senders are free for nonprofits or $20/mo. Add-ons are about $15/mo for a phone number, $15/mo for SMS/RCS fallback and $30/mo to start conversations, so a fully outbound-capable Light line comes to about $119.99. — [Blue Reacher LoopMessage pricing](https://bluereacher.com/blog/loopmessage-pricing-2026). WhatsApp is about +$10/mo. — [Blooio vs LoopMessage](https://blooio.com/compare/blooio-vs-loopmessage)
- No cold outbound. Outbound-first sending needs a dedicated sender, a warm-up period and opted-in contacts. — [Blooio vs LoopMessage](https://blooio.com/compare/blooio-vs-loopmessage)
- Countries conflict: Blue Reacher's 2026 review lists senders in the US, UK, **Australia**, Germany, NZ, Spain, Portugal and Japan, while GetApp lists only the US. — [Blue Reacher review](https://bluereacher.com/reviews/loopmessage-review); [GetApp](https://www.getapp.co.uk/software/2073318/loopmessage). LoopMessage's own site lists Australia among local messaging markets, markets itself as "iMessage, RCS, WhatsApp omnichannel API", and warns that users in regions with iMessage/FaceTime restrictions can't be reached. — [loopmessage.com](https://loopmessage.com/)

**Blooio**
- $39/mo shared plan (a competitor says it is capped at about 5 contacts/day). Dedicated plans were $289/mo with a $50 activation fee on older pages. Newer pricing is "from $98/mo" for inbound-only (reply-only, cannot initiate) and $195/mo for outbound, with Enterprise at $195/line for 6+ lines. — [Blooio API page](https://blooio.com/integrations/api); [Blooio vs Linq pricing](https://blooio.com/compare/blooio-vs-linq-pricing); [SalesTechStar](https://salestechstar.com/partner-management-channel-enablement/blooio-lowers-imessage-api-pricing-to-98-mo-adds-hubspot-integration-and-tier-1-carrier-partnerships/); [Blooio blog](https://blooio.com/blog/best-imessage-api-2026)
- Unlimited messages with no per-message fees (fair-use caps on replies, per a competitor). Webhooks; SDKs for Node, Python, Go and Java; polls, FaceTime, FindMy location sharing, group chats and RCS fallback. Blooio also claims to be an Apple Messages for Business MSP, which is a separate product. Sendblue says Blooio lacks a FaceTime Audio API, a CLI and SOC 2. — [Blooio guide](https://blooio.com/guides/send-imessage-programmatically); [Sendblue vs Blooio](https://www.sendblue.com/compare/sendblue-vs-blooio)

**Other 2024–2026 iMessage API sellers (all marketing-heavy, mostly sales or outreach tools):** Tuco AI, Blue Reacher, BlueSendr, texting.blue, Claw Messenger and imessageapi.dev publish comparison pages. — [Tuco](https://tuco.ai/blog/imessage-automation-for-business); [Blue Reacher](https://bluereacher.com/best/imessage-api); [BlueSendr](https://bluesendr.com/linq-alternative); [Claw Messenger](https://www.clawmessenger.com/compare/imessage-api); [imessageapi.dev](https://imessageapi.dev/compare/best-imessage-api)

**Self-hosted (BlueBubbles-style)**
- This requires your own Mac kept online 24/7 and suits people who want full control. — [Claw Messenger comparison](https://www.clawmessenger.com/compare/imessage-api)
- Lindy's experience was three rewrites in a month, an Apple account ban, and a conclusion that they "shouldn't run their own phone infrastructure". — [Lindy blog](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)

**Apple Messages for Business (official)**
- On 4 Jun 2026 Apple approved Poke as the first third-party AI agent on Messages for Business. Conditions included access to live human support, labelling the product as AI-generated, and changes to meet Apple's design rules, which took "a couple of months". — [TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/); [9to5Mac](https://9to5mac.com/2026/06/04/apples-messages-app-on-iphone-now-has-a-third-party-ai-agent/)
- On fees, Poke pays per user at a rate "well below" what Meta charges for AI on WhatsApp, and declined to give the price. TechCrunch corrected early reports: Poke pays its messaging service provider, not Apple directly. — [TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/); [Yahoo/TechCrunch syndication](https://tech.yahoo.com/ai/apple-intelligence/articles/apple-approves-poke-first-ai-192058378.html)
- Apple's FAQ says escalation to a human agent is mandatory and that Apple "won't approve a deployment using virtual agents exclusively". — [Apple Messages for Business FAQ](https://register.apple.com/resources/messages/messaging-documentation/faq)
- Apple's UX rules: clearly identify automated agents ("This is an automated agent"), send the first reply within 5 seconds, route "help" to a live agent, and send an after-hours message when no agents are available. The human introduces themselves on takeover, and the customer should never have to restart or re-explain. — [Apple MfB UX design](https://register.apple.com/resources/messages/messaging-documentation/ux-design)
- Conversations are customer-initiated, through a Messages for Business button on websites, emails, QR codes on print, or apps. An MSP provides the REST integration and the live-agent console. — [CM.com KB](https://knowledgecenter.cm.com/knowledge-center/communications-platform/other-channels/apple-messages-for-business/do-i-need-a-human-agent-with-apple-messages-for-bu); [Bird](https://bird.com/en-au/explained/apple-messages/how-do-apple-messages-conversations-route-into-an-existing-inbox)
- Australia: Australia was in the Oct 2018 Business Chat expansion (older information), and Apple's AU page lists Telstra and Harvey Norman. Amazon Connect supports AMB, including in the Sydney region. — [MacRumors 2018](https://www.macrumors.com/2018/10/02/apple-business-chat-expands-to-13-countries/); [Apple AU](https://www.apple.com/au/ios/business-chat/); [AWS 2024](https://aws.amazon.com/about-aws/whats-new/2024/05/amazon-connect-apple-messages-business/). Apple has a current "Apple Business feature availability" page that I could not read. — [Apple Support](https://support.apple.com/en-us/126603)
- Apple has not published vetting criteria for AI agents on AMB. — [Startup Fortune](https://startupfortune.com/apple-gives-poke-a-rare-lane-into-imessage-for-ai-agents/)

**Google RCS Business Messaging in Australia**
- As of Oct 2026, iPhone RCS still doesn't work in Australia. Telstra says it "continues to move towards enabling RCS Messaging". — [EFTM, Oct 2026](https://eftm.com/2026/10/iphone-support-for-rcs-messaging-in-australia-still-no-closer-to-working-281910); [WhistleOut](https://www.whistleout.com.au/MobilePhones/News/iOS-18-RCS-Australia)
- A 2026 guide says Android P2P RCS works through Google Messages and Google's Jibe on Australian networks, that business RCS campaigns are limited, that Telstra, Optus and Vodafone have no public RBM rate card, and that access is through aggregators such as Sinch or Infobip. — [VocPhone](https://vocphone.com/features/news/what-is-rcs-messaging-australian-business-2026); [AustraliaBulkSMS](https://australiabulksms.com/guides/rcs-vs-sms-in-australia/). This is contradicted by a 2026 blog that claims iPhone RCS works on iOS 18 in Australia. — [160.com.au](https://www.160.com.au/blog/rcs-vs-sms-whats-the-difference-and-which-should-you-use). The more recent EFTM report should win.
- I found no Australian carrier announcement of RBM verified-sender availability. — (absence across [VocPhone](https://vocphone.com/features/news/what-is-rcs-messaging-australian-business-2026) and [EFTM](https://eftm.com/2026/10/iphone-support-for-rcs-messaging-in-australia-still-no-closer-to-working-281910))

**WhatsApp Business Platform**
- From 15 Jan 2026, Meta bars "AI Providers" from the WhatsApp Business Solution where AI is the primary (not incidental) functionality, which in practice targets general-purpose chatbots. It applied to new users from 15 Oct 2025. Businesses using AI for customer service, bookings, order tracking, notifications or sales are not affected. OpenAI, Perplexity, Luzia and Poke were named as affected. — [9to5Mac](https://9to5mac.com/2025/10/20/whatsapp-bans-ai-chatbots-from-using-its-business-api/); [respond.io](https://respond.io/blog/whatsapp-ai-chatbot-policy); [Yahoo/TechCrunch](https://tech.yahoo.com/ai/meta-ai/articles/whatssapp-changes-terms-bar-general-141214399.html)
- Post-acquisition coverage still lists WhatsApp among Poke's channels, which conflicts with the ban reports. This may be an aggregator error. — [Startup Fortune](https://startupfortune.com/cognition-buys-poke-to-plant-its-ai-agent-inside-your-text-messages/)

**Plain SMS in Australia**
- Twilio AU (USD): $0.0515 per outbound SMS segment to mobiles for the first 20k a month, then $0.0505 for the next 55k and $0.0484 for the next 75k. Inbound is $0.0075 and MMS $0.35. Failed messages cost $0.001. Mobile-number and alphanumeric volumes are tiered separately, and carrier fees may apply. — [Twilio AU pricing](https://www.twilio.com/en-us/sms/pricing/au)
- Local bulk and two-way providers (Mobile Message, ClickSend, Kudosity/MessageMedia, Cellcast, Notifyre, GoFax) publish AU pricing and sender-ID guidance. I verified no prices. — [Mobile Message comparison](https://mobilemessage.com.au/best-bulk-sms-provider-australia); [ClickSend](https://help.clicksend.com/en/articles/46062-acma-upcoming-changes-to-alphanumeric-senderids-formerly-alpha-tags-registration-usage); [Kudosity](https://kudosity.com/resources/articles/what-is-the-sms-sender-id-register-australia)

**ACMA SMS Sender ID Register**
- The register commenced and went live with the 1 Jul 2026 changeover. Registered sender IDs keep showing the business name. SMS sent with unregistered branded (alphanumeric) sender IDs must be labelled "Unverified" by the carrier and grouped in one thread. — [ACMA, Jun 2026](https://www.acma.gov.au/articles/2026-06/sms-sender-id-register-goes-live-help-protect-australians-scams); [ACMA, May 2026](https://www.acma.gov.au/articles/2026-05/unregistered-branded-sms-be-labelled-unverified-1-july-acma-warns)
- Registration goes through an ACMA-approved telco or messaging provider, with a 30 Jun 2026 deadline for continuity. — [MEF](https://mobileecosystemforum.com/2026/05/20/acmas-sms-sender-id-rules-come-into-effect-on-july-1st/); [Lexology](https://www.lexology.com/library/detail.aspx?g=a0520792-6e1e-41c0-903c-b90828fc8ca1)
- Scope: one provider FAQ says only alphanumeric IDs are affected and numeric senders are not. Another page from the same provider says numeric-only sender IDs "will be prohibited" and recommends a dedicated virtual mobile number. The two conflict. — [GoFax FAQ](https://support.gofax.com.au/en/sms-sender-id-register-faqs); [GoFax article](https://www.gofax.com.au/?p=17218)
- Alphanumeric sender IDs can't receive replies, so two-way SMS needs a real number. — [Kudosity](https://kudosity.com/resources/articles/what-is-the-sms-sender-id-register-australia)

### Inferences
- **Android users in Australia:** iPhone users get iMessage (blue). Android users get RCS only if the provider sends P2P RCS from an Android-side line (Linq claims RCS support) and otherwise get SMS. With iPhone RCS not enabled in Australia, any RCS benefit applies to Android-to-provider only. A conversational SMS fallback from an Australian mobile number is the reliable baseline. The design must assume no typing indicators, no tapbacks, no read receipts and no inline voice memos for these users. Australian iPhone share is high (background, roughly half of smartphones; unverified), so a large Android minority will get the plain-text version of the product.
- Because the concierge is inbound and user-initiated, a "reply-only/inbound" plan (Sendblue AI Agent $100; Blooio inbound $98) may suffice, as long as status updates sent within an existing user-started thread count as replies and not new conversations. Confirm this with each vendor.
- Per-line daily contact caps (300–1,000/day on LoopMessage and Sendblue, reportedly lower on Linq) mean one published number has a growth ceiling. Past that you need multiple lines, and with them multiple numbers, which works against the "save one number" concept. Negotiate cap terms up front.
- Apple Messages for Business fits this product's model surprisingly well: it is user-initiated and this service already has humans in the loop (the human provider calls back, and ops staff can take over). Its downsides are that it is not a phone number you text, it excludes Android, it needs Apple approval (Poke took months), it requires a live human agent console, and it is reachable only through Apple's entry points. It is the "sanctioned" plan B if unofficial iMessage lines become untenable.
- WhatsApp is policy-compatible for this service, since a trades and services dispatcher is a business-specific bot, not a general assistant. It is a reasonable later channel for Android users and migrant communities. Australian WhatsApp penetration is lower than iMessage/SMS for this use case (background, unverified).
- Google RBM is not worth building for in Australia in 2026.

### Gaps
- Whether any iMessage API provider will supply **+61 iMessage lines** in production (only LoopMessage is reported to, by a third-party review).
- Current AMB country list and whether new AI-agent deployments are being approved in Australia, plus the per-user MSP fees.
- Whether the ACMA register affects messages sent *from* standard mobile numbers. Most sources say no, one says yes. Check ACMA's register page directly.
- Australian two-way SMS virtual-number costs from local providers (Cellcast, MessageMedia/Kudosity, Mobile Message), and Twilio's regulatory requirements for AU mobile numbers. Background (unverified this session): Twilio AU mobile numbers require a regulatory bundle with business documents and an address.
- US differences (background, unverified this session): US SMS from local numbers requires A2P 10DLC brand and campaign registration (or toll-free verification). iPhone RCS works on major US carriers. All the iMessage vendors are US-first, so a US expansion is easier on the iMessage side. TCPA consent rules apply to texts and calls.

---

## 3. How existing consumer AI products in iMessage/SMS are built and what they learned

### Takeaway
The leading iMessage-native assistants (Poke, Tomo) run on Linq. Poke has since moved its iPhone users onto Apple's official Messages for Business (June 2026) and was acquired by Cognition (July 2026). The repeated lessons: "no app to download" is a powerful wedge, onboarding should be a web page where you enter your number and the bot texts first and drops its contact card, personality and proactive behaviour drive retention, and unofficial iMessage infrastructure is fragile (Lindy's ban), so mature players move to a managed provider or to Apple's sanctioned channel.

### Cited Findings
- **Poke (The Interaction Company of California):** a $15M seed led by General Catalyst. Onboarding is to visit poke.com and enter your phone number, after which Poke appears as a thread in Messages and "gave itself a contact card" in the user's Contacts; setup takes under a minute. — [Tech Funding News](https://techfundingnews.com/poke-launches-15m-seed-imessage-ai-assistant/); [Tanisha Srivatsa Substack](https://tanishasrivatsa.substack.com/p/i-spent-30-minutes-arguing-with-a); [ChatGate](https://chatgate.ai/post/poke)
- Poke's onboarding "bouncer" negotiates your entry price while roasting you, a deliberate virality and personality play. — [mana.am](https://mana.am/en/blog/poke-sms-ai-agent/)
- Self-reported traction: 750,000+ messages and "near-perfect retention" across the first few thousand users, and more than 6,000 beta testers sending about 200k messages a month. Unverified. — [AI Journal](https://aijourn.com/poke-com-raises-15m-to-put-an-ai-assistant-in-imessage/); [Tech Funding News](https://techfundingnews.com/poke-launches-15m-seed-imessage-ai-assistant/)
- Poke's messaging runs on Linq. — [Linq](https://linqapp.com/s/example-apps/ai); [Poster guide](https://www.poster.ly/guides/poke-guide)
- First AI agent approved on Apple Messages for Business (4 Jun 2026). It needed human support, AI labelling and design changes, and pays its MSP per user. — [TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/)
- Cognition (maker of Devin) acquired The Interaction Company on 23 Jul 2026 for a reported "low nine figures". Users exchanged 100M+ messages with Poke in the three months before the deal, and Poke stays available. Coverage is secondary. — [Startup Fortune](https://startupfortune.com/cognition-buys-poke-to-plant-its-ai-agent-inside-your-text-messages/); [RuntimeWire](https://runtimewire.com/article/cognition-acquires-poke-interaction-consumer-ai-agents); [LetsDataScience](https://letsdatascience.com/news/ai-startups-acquire-consumer-facing-ai-products-86ca0263)
- Consumer pricing: Free Forever tier, and Pro from $16/mo billed yearly (aggregator listing). — [AI Agent Index](https://theaiagentindex.com/agents/poke)
- One analysis's lesson: user resistance to "install another app" is bigger than you think. — [Startup Fortune](https://startupfortune.com/apple-gives-poke-a-rare-lane-into-imessage-for-ai-agents/)
- **Tomo:** "a phone number you text" (an AI "champion"). It raised a $5M seed led by Bain Capital Ventures in Jun 2026 and launched a companion app for users who text it more than 20 days a month. It is a Linq customer. — [Business Wire](https://secure.businesswire.com/news/home/20260625645270/en/Tomo-is-the-AI-Champion-Helping-People-Bet-on-Themselves-Emerging-from-Stealth-with-%245-Million); [Linq Tomo story](https://linqapp.com/blog/tomo-customer-story)
- **szn:** an iMessage agent from ex-Siri engineer Nikhil Gupta that can shop, browse and contact vendors on the user's behalf, with its own phone number and email. A launch was expected in October 2026, and how it connects to iMessage was unclear in coverage. — [PhoneArena](https://www.phonearena.com/news/an-ex-siri-engineer-is-unleashing-the-imessage-assistant-many-wanted-siri-to-be_id183622); [MacDailyNews](https://macdailynews.com/2026/09/28/former-siri-engineer-launches-imessage-ai-agent-szn-that-can-shop-talk-to-vendors-and-act-on-your-behalf/)
- **Lindy** (AI agents): went from a self-built Mac mini plus iPhone setup, through an Apple ban, to Linq. — [Lindy blog](https://www.lindy.ai/blog/imessage-api-three-rewrites-one-apple-ban-and-what-actually-works)
- **OpenAI** ran a WhatsApp number that stopped working after 15 Jan 2026 because of Meta's policy. — [9to5Mac](https://9to5mac.com/2025/10/20/whatsapp-bans-ai-chatbots-from-using-its-business-api/)
- **Boardy:** a voice-AI "superconnector" that makes introductions, with an $8M seed in Jan 2025. — [Creandum](https://creandum.com/commitments/boardy)

### Inferences
- The proven onboarding pattern: a landing page with "enter your mobile". The bot texts first with a short greeting and pushes its contact card, so the number is saved under the brand name with a logo. QR codes or `sms:` links on flyers come next, and NameDrop can be used in person. For this product, the first outbound message is user-requested, so it is consented. An `sms:`/`imessage:` deep link with a prefilled body ("Hi, I need someone to call me about…") gets the user to send first, which also starts the thread inbound, the lowest-risk pattern for line reputation.
- Poke's path (Linq first, then Apple MfB once at scale, then exit) suggests the unofficial channel is acceptable for an MVP and early growth, and that the official channel is the route to durability. Plan for migration from day one by keeping the conversation engine channel-agnostic.
- Retention in this product depends on outcomes (did someone call within 30 minutes), not on the chat being delightful. Saving the contact card is what turns a one-off use into "the number I text next time".

### Gaps
- Background (unverified this session), older text concierges (2015–2018): Magic (text-anything, human-plus-AI, pivoted toward a premium tier and business use), GoButler (Berlin, pivoted to flight search in 2016) and Operator (Garrett Camp, wound down around 2018). The common lesson was that human fulfilment costs and low-value requests sank the unit economics, which argues for narrowing scope (callbacks for trades and services only) and charging the supply side or the user.
- Background (unverified): Boardy's onboarding is mainly a voice call (users call a number, the AI interviews them), with double-opt-in introductions by email. I could not confirm its channel providers.
- No source said how Poke or Tomo capture location or address, or verify identity, beyond the phone number. Background: the iMessage sender handle can be an Apple ID email rather than a phone number if the user's "Start new conversations from" setting is an email. In that case the bot must ask for a callback number.
- Hypercard (named as a Linq customer) is unidentified.

---

## 4. Conversation and UX design for the callback concierge

### Takeaway
Collect only what is needed to dispatch: the job, the suburb or postcode, the deadline or time window, and implicit consent to share the number. Infer everything you can from the first text, ask at most one bundled follow-up, then confirm in one message that states the ETA, that the user's number will be shared with a vetted provider, and how to cancel. Use iMessage-only affordances (typing indicator, tapback, contact card) as enhancements, never as dependencies, because Android/SMS users get none of them.

### Cited Findings
- Apple's own bot UX rules are a good baseline even off-platform: identify the bot as automated, give the first reply within 5 seconds, honour "help" with a human route, handle after-hours honestly, and never make the customer re-explain on handoff. — [Apple MfB UX design](https://register.apple.com/resources/messages/messaging-documentation/ux-design)
- Typing indicators (iMessage only) can be held for long jobs by refreshing every 60 s. They auto-clear about 85–90 s after the last start and only show if the chat was active in the last 5 minutes. — [Linq typing indicators](https://docs.linqapp.com/channel/imessage/guides/chats/typing-indicators/); [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Tapback reactions are available as a lightweight "got it" acknowledgement. — [linq-team/granola-agent](https://github.com/linq-team/granola-agent)
- Contact-card push shows a native "add contact" banner on iMessage, and a .vcf file is the fallback for others. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Delivery and read signals are unreliable for SMS users and for users with read receipts off. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- Users can send photos and attachments up to 100 MB, and voice memos arrive as audio. — [Linq iMessage docs](https://docs.linqapp.com/channel/imessage/); [Linq voice memos](https://docs.linqapp.com/guides/messaging/voice-memos/)
- Blooio supports FindMy location sharing and polls through its API, showing that location capture through native iMessage features is technically possible on some providers. — [Blooio guide](https://blooio.com/guides/send-imessage-programmatically)

### Inferences (design recommendations)
**Minimum dispatch payload**
1. *What*: a category plus a one-line description (the LLM extracts this, e.g. "painting – one wall, interior" or "handyman – hang poster").
2. *Where*: the suburb or postcode. That is enough to match a provider, and the full street address can be taken by the provider on the call, which keeps sensitive data out of your store. Accept a shared location pin or address text if offered.
3. *When*: "ASAP", "by 3pm today" or "this week". Parse it into a deadline and a callback SLA.
4. *Callback number*: the sender's phone handle. If the handle is an email (iMessage via Apple ID), ask for a mobile number.
5. *Consent to share*: put it in the confirmation ("We'll pass your number to one vetted local tradie so they can call you"). Optionally ask for a photo ("Snap a pic if it helps") but never block on it. Leave budget out; the provider discusses it on the call.

**One-to-two-message flow**
- If the first text has the job, location and time, send one confirmation: "No worries, we're on it 👍 A local handyman will call you on this number within ~20 min (before 3pm). We'll share your number with them only. Reply STOP to cancel." Show the typing indicator plus a tapback on the user's message within 5 s.
- If something is missing, send one bundled question: "No worries! What suburb are you in, and when do you need it done by?" Never more than one round of questions.
- First-ever message from a new user: also push the contact card and a one-line privacy notice with a link (an APP 5 collection notice).

**While the agent works**
- Keep the typing indicator alive (iMessage), but send at most one proactive update before the call: "Found someone. Dave from X Painting will call you in ~5 min from 04xx xxx xxx." Naming the caller and number matters because people screen unknown callers. Background (unverified): iOS 26 adds call screening for unknown numbers, so tell providers to state "[Brand] callback about your painting job".
- Afterwards, a single follow-up: "Did Dave call? 👍/👎". Reactions make this a one-tap reply on iMessage.

**Cancel, redirect, no-one-available**
- Accept natural-language "cancel", "stop", "actually make it tomorrow" or "wrong suburb" at any time, and make every state change idempotent against webhook retries (Linq retries up to 10 times; dedupe on event ID).
- Time-box the search, for example to half the user's deadline or 15 minutes for ASAP. If nobody is found, say so honestly and offer two options: "Want us to keep looking and text you, or try for tomorrow morning?"
- A human ops escalation path ("reply HELP for a person") is good practice, and mandatory if you ever move to Apple MfB.

**Channel-agnostic engine**
- Build the conversation state machine and LLM layer against an internal `Channel` interface (send text, send media, react, typing, contact card, plus capability flags). Then Linq, SMS (Twilio or a local provider), Apple MfB and WhatsApp become adapters, and iMessage-only features degrade gracefully.

### Gaps
- No empirical data was found on drop-off per extra question in SMS concierge flows, or on callback answer rates for unknown numbers in Australia.
- I could not confirm whether Linq delivers inbound location pins or rich links as structured webhook data.

---

## 5. Compliance for the consumer channel in Australia

### Takeaway
Replies to a user-initiated request are generally service or transactional messages, not "commercial electronic messages". Anything promotional (re-engagement, offers, "refer a friend") needs Spam Act consent (express or inferred), sender identification and a working unsubscribe, and the burden of proving consent sits with the business. The Privacy Act applies to phone numbers, suburbs and addresses, and photos: expect to need a collection notice and a privacy policy that covers disclosure to providers and offshore processors. The statutory privacy tort is already in force, and automated-decision transparency obligations start around 10 Dec 2026. If you ever run on Apple MfB, Apple's rules require AI disclosure and a human path.

### Cited Findings
- The Spam Act covers "commercial electronic messages", meaning messages whose purpose, or one of whose purposes, is to offer, advertise or promote goods or services. It has a precise definition in s6. — [Kellehers](https://kellehers.com.au/latest-news/can-the-spam/); [Spam Act 2003 (Federal Register of Legislation)](https://www.legislation.gov.au/C2004A01214/latest/text)
- ACMA: consent can be inferred where the person knowingly gave their address or number and would reasonably expect marketing, usually through an ongoing relationship with marketing directly related to it. The sender must be able to prove consent. — [ACMA: Avoid sending spam](https://www.acma.gov.au/avoid-sending-spam)
- There is an exemption for messages that contain no more than factual information (with conditions). — [Kellehers](https://kellehers.com.au/latest-news/can-the-spam/)
- The ACMA Sender ID Register is live from 1 Jul 2026 (relevant if you ever send alphanumeric-branded SMS). — [ACMA](https://www.acma.gov.au/articles/2026-06/sms-sender-id-register-goes-live-help-protect-australians-scams)
- Privacy and Other Legislation Amendment Act 2024 (Royal Assent 10 Dec 2024): most changes started the next day. The statutory tort for serious invasions of privacy started six months later (around Jun 2025). Automated-decision-making transparency in privacy policies starts 24 months after assent (around 10 Dec 2026). — [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/79510bfb/privacy-breakthrough-the-wait-is-over); [EY](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-au/technical/tax/documents/ey-tax-and-compliance-alert-privacy-and-other-legislation-amendment-bill-2024-passed-in-both-houses-of-parliament.pdf)
- Apple MfB requires human escalation and AI identification. — [Apple MfB FAQ](https://register.apple.com/resources/messages/messaging-documentation/faq); [TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/)
- WhatsApp's 2026 terms ban general-purpose AI assistants but allow business-specific bots. — [respond.io](https://respond.io/blog/whatsapp-ai-chatbot-policy)
- Linq says not to use its iMessage lines for OTP or verification traffic. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)

### Inferences
- Treat every message in a job thread (acknowledgement, status, "did they call?") as transactional and keep it free of promotional content, so the Spam Act CEM rules aren't triggered. Any later "need anything else? 10% off" message turns it into a CEM. Gate those behind recorded express consent, identify the sender, and honour STOP.
- Log the inbound first message with a timestamp as evidence of the user-initiated relationship and consent.
- Sharing the user's number with a provider is a *disclosure* under the APPs. Make it explicit in the confirmation text and in the collection notice, share with one matched provider at a time, and set contractual limits on providers' use (no marketing to the user).
- Photos may contain other people or home interiors. Minimise retention and use short-lived signed URLs when forwarding to providers.
- If the AI decides which provider gets the job and that significantly affects providers' interests, the Dec 2026 ADM transparency rule may require privacy-policy disclosure. This needs legal review.

### Gaps
- Background (unverified this session): the APPs generally exempt small businesses with turnover of $3M or less. That exemption is lost by an organisation that discloses personal information to another party for a benefit, service or advantage ("trading in personal information") unless it has consent. A lead-referral concierge that is paid by providers may fall into this and so be covered by the APPs from day one. Get legal confirmation.
- Background (unverified): APP 8 cross-border disclosure applies to sending data to US-hosted Linq, OpenAI and Firebase. The Notifiable Data Breaches scheme applies once the business is APP-covered.
- Background (unverified): the Spam Act does not cover voice calls (the provider's callback). Telemarketing rules and the Do Not Call Register cover marketing calls, but a callback the user requested is generally not unsolicited.
- I did not check carrier (Telstra, Optus, TPG) content policies for A2P SMS from virtual numbers, or the new Scams Prevention Framework obligations for messaging providers.

---

## 6. Recommendation: primary channel provider, fallback channel(s), and risks to design around

### Takeaway
Launch iMessage-first on **Linq**, if it can supply a production line that works well for Australian users (ideally +61, at minimum a US line with international SMS fallback enabled and acceptable caps). If Linq cannot offer +61 numbers, run a short bake-off against **LoopMessage**, the only provider reported, by a third party, to have Australian senders. Pair it from day one with a **two-way SMS line on a dedicated Australian virtual mobile number** (Twilio AU or a local provider) for Android, non-iMessage handles and line-loss continuity. Hold **Apple Messages for Business** (through an MSP) as the sanctioned migration path, and **WhatsApp** as a later Android channel. Skip RBM in Australia for now.

### Cited Findings
- Linq has the strongest funding, AI-agent focus, feature set and SLA claim of the iMessage APIs, and Poke and Tomo use it. — [TechCrunch](https://techcrunch.com/2026/02/02/linq-raises-20m-to-enable-ai-assistants-to-live-within-messaging-apps); [Linq](https://linqapp.com/blog/texting-api)
- LoopMessage reportedly has Australian senders and transparent pricing (from $59.99/mo plus add-ons). — [Blue Reacher](https://bluereacher.com/reviews/loopmessage-review); [loopmessage.com](https://loopmessage.com/)
- Lines can be flagged and restricted for reputation reasons. — [Linq FAQ](https://docs.linqapp.com/guides/resources/faq/)
- iPhone RCS is not live in Australia. — [EFTM](https://eftm.com/2026/10/iphone-support-for-rcs-messaging-in-australia-still-no-closer-to-working-281910)
- AMB is the only Apple-sanctioned AI-agent route and needs human escalation. — [Apple MfB FAQ](https://register.apple.com/resources/messages/messaging-documentation/faq); [TechCrunch](https://techcrunch.com/2026/06/04/apple-approves-poke-as-the-first-ai-agent-on-its-messages-for-business-platform/)
- Twilio AU SMS costs about US$0.05 per outbound segment and US$0.0075 inbound. — [Twilio](https://www.twilio.com/en-us/sms/pricing/au)

### Inferences (risks to design around)
1. **Line loss or flagging (highest risk).** The published number is the product. Mitigations: keep traffic inbound-first and low-volume per user with no blasts; subscribe to `phone_number.status_updated`; contractually require Linq to supply a replacement line quickly; and make the pushed contact card carry **both** the iMessage line and the AU SMS number, so a saved contact survives the loss of either.
2. **Apple policy shift.** Apple could tighten enforcement on device-farm iMessage at any time. The Beeper precedent and the Poke move to MfB show which way things are heading. Keep the conversation engine channel-agnostic, and once traction is proven, begin an AMB application (it needs a human escalation console, which this business has anyway).
3. **Australian number availability and cost.** A +1 number is a trust and cost problem for Australians, especially for SMS fallback. Confirm +61 support, or decide that iMessage users talk to the +1 line while everyone else uses the +61 SMS line.
4. **Capacity caps.** Daily new-contact caps per line limit growth on a single number. Negotiate inbound-reply terms, and model when you would need extra lines.
5. **Vendor concentration and churn.** Linq is a young, still-pivoting company (the reported account clean-up from 19 Oct 2026, unverified), and its marquee customer was just acquired. Avoid annual lock-in at MVP stage where possible, and keep the adapter abstraction.
6. **Android degradation.** A big share of Australians will get plain SMS. Write every message so it works as plain text first.
7. **Compliance.** Keep job threads transactional, log user-initiated consent, put the number-sharing disclosure in the confirmation text, publish an APP-compliant privacy policy (with the ADM clause by Dec 2026), and assume APP coverage from day one if providers pay for leads.
8. **US expansion.** The iMessage side is easier (the vendors are US-native), but SMS fallback then needs 10DLC or toll-free registration and TCPA-grade consent (background, unverified).

### Gaps
- Questions to put to Linq sales: +61 line availability; price and setup fee; per-line daily inbound and outbound caps; behaviour and turnaround on FLAGGED lines; SLA remedy; whether Linq is an Apple MfB MSP (and Poke's MSP); RCS mechanism for Android; data residency and processing terms for Privacy Act purposes.
