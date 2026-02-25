Analysis: CTG Signal Detection App → Align Capital Partners Adaptation
What the CTG App Actually Is
The CTG platform is a 7-module SPA built on the Cortex architecture (zero-dependency vanilla JS, Obsidian design system, hash router, module contract with init/destroy lifecycle). It serves Cloud Tech Gurus — a contact center technology marketplace — by providing:

Command Center — Pipeline KPIs, prospect cards, live agent feed
Pipeline Intel — 30 scored prospects with signal taxonomy, radar charts, tier filtering
Strain Simulator — "Sourcing Strain Index" with 6-factor scoring (vendor universe complexity, eval complexity, expertise gap, timeline pressure, compliance burden, stakeholder count)
Revenue Model — Commission revenue projections with scenario sliders
Agent Architecture — 5 AI agents (Scout, Analyst, Strategist, Planner, Monitor)
Competitive Map — Displacement analysis against DIY, consultancies, TSDs, BPOs
Build Roadmap — 4-phase implementation timeline with investment breakdown

The data layer (data.js) contains 30 prospect records, 5 AI agent definitions, 4 competitor profiles, 4 roadmap phases, and feed entries — all hardcoded as a self-contained demonstration dataset.
How the Deep Research Maps to ACP
Here's where it gets interesting. The CTG app is fundamentally a deal sourcing intelligence platform. ACP's business model — sourcing, evaluating, and executing on LMM B2B acquisitions — is structurally analogous. Let me map the domains:
CTG ConceptACP EquivalentResearch EvidenceProspects (30 companies with signals)Platform acquisition targets — B2B companies with $3-15M EBITDA in ACP's 4 lanesDeep research defines exact criteria: Software/TES, Professional Services, Industrial Services, Specialty Mfg/DistTier system (HOT/WARM/NURTURE/STRATEGIC)Deal conviction tiers based on criteria fit, seller readiness, timeline pressureACP references "speed and certainty" and deal conviction signalsSignal detection (CCAAS MIGRATION, RFP ACTIVE, etc.)Acquisition signals — founder succession planning, platform fatigue, regulatory pressure, growth ceiling, bolt-on adjacencyResearch identifies key triggers: founder liquidity events, EOL situations, compliance mandatesSourcing Strain Index (6 factors)Deal Complexity Score — EBITDA quality, management team depth, compliance burden, competitive process, integration complexity, growth runwayDirect parallel to ACP's evaluation criteriaAI Agents (Scout→Analyst→Strategist→Planner→Monitor)Sourcing Intelligence Pipeline — deal sourcing → qualification → thesis development → valuation → portfolio monitoringMaps cleanly to ACP's "proactive identification → diligence → value creation → exit"Competitive Map (DIY vs Consultancies vs TSDs vs BPOs)Competitive landscape — ACP vs other LMM PE (Blue Point, Benford, Halifax, Rotunda) + competitive positioningResearch provides full competitive set with criteria comparisonRevenue Model (commission projections)Fund deployment model — equity check sizing, return projections, buy-and-build economicsResearch provides $20-60M equity checks, $150M EV ceilingBuild RoadmapValue creation roadmap — ACP's post-close operating model (talent, go-to-market, tech, M&A)Research details ACP's operating toolkit claims
Verdict: Yes, Absolutely Buildable
This isn't a stretch adaptation — it's a natural fit. The CTG architecture was designed for exactly this pattern: score entities against multi-factor criteria, visualize pipeline health, model economics, and show an AI-powered sourcing thesis. The ACP version would be arguably more compelling because:

The data is richer. The deep research gives us real portfolio companies (E Source 14 add-ons, VetEvolve 19 add-ons, Proceed 12 add-ons), real fund data ($1.8B AUM, Fund III $620M), real sector criteria, and real competitive positioning.
The narrative is tighter. ACP's "platform + buy-and-build" model creates natural interconnections between modules — a prospect scored high on the pipeline feeds into a value creation simulator that models add-on economics.
The audience is PE-native. Bankers, founders, and LPs understand pipeline dashboards intuitively. This positions you as someone who can build the kind of intelligence tooling PE firms actually need.

Proposed Module Architecture (ACP Version)
Here's what I'd build, mapped to the existing Cortex module contract:
#ModuleHash RoutePurposeAccent1Command Center#command-centerFund overview KPIs, active deal pipeline, sector allocation, intelligence feedCyan (ACP brand)2Deal Pipeline#deal-pipelinePlatform targets scored against ACP criteria, tier filtering, detail cards with thesis notesEmerald/Amber/Red (by tier)3Thesis Engine#thesis-engineInvestment thesis builder — sector fit scoring, management quality, growth runway, compliance burden (replaces Strain Simulator)Emerald4Value Creation#value-creationPost-close operating model simulator — revenue growth, margin expansion, add-on M&A economics, EBITDA bridge (replaces Revenue Model)Violet5AI Sourcing Architecture#ai-sourcing5 AI agents adapted: Signal Hunter → Deal Qualifier → Thesis Builder → Value Modeler → Portfolio MonitorBlue/Violet/Amber/Red6Competitive Landscape#competitive-landscapeACP vs LMM PE competitors (Blue Point, Benford, Halifax, Rotunda) + positioning matrixAmber7Portfolio Intelligence#portfolio-intelCurrent portfolio performance tracking, add-on pipeline, sector concentration, exit readiness (new module leveraging ACP's 125+ acquisitions data)Cyan
What Changes vs. What Stays
Stays identical (architecture layer):

Obsidian design tokens (obsidian.css) — maybe recolor primary accent from emerald to a blue/navy for ACP
Shared components (shared-components.js) — KPICard, TierBadge, CircularScore, RadarChart, DataTable, etc. all transfer directly
Shell architecture — sidebar nav, status bar, content+panel layout
Router (app.js) — hash routing, lazy loading, module lifecycle
Module contract — init/destroy, _interval/_timeout/_on wrappers

Changes completely (data + domain layer):

data.js — rewritten with ACP-specific prospect data, portfolio companies, sector criteria, fund economics, competitor profiles
Module JS files — domain logic rewritten, but structural patterns (filter tabs, detail panels, score calculations, chart rendering) carry over
Module CSS files — mostly inherited with accent color adjustments
Branding — "Cloud Tech Gurus" → "Align Capital Partners" (or a sanitized "LMM PE Intelligence Platform" if you want it generic for demos)

Signal-by-Signal: What It Takes
1. FOUNDER SUCCESSION (emerald)
What it detects: Owner approaching retirement, no identified successor, liquidity event likely.
How it actually works:

Age/tenure signal: Cross-reference founder name against LinkedIn (age/experience inference from graduation dates) or public SEC filings (for larger companies). Owner age 55+ with 20+ year tenure = high probability succession window.
Behavioral signal: Founder starts attending industry conferences on "exit planning," "business valuation," or "legacy transitions." Detected via event registration APIs or social media activity.
Advisor signal: Company retains an M&A advisor, investment banker, or business broker. Detected via press releases, deal announcements, or intermediary databases.

APIs/Sources:
SourceCostWhat You GetLinkedIn Sales Navigator$100-150/mo per seatFounder profiles, tenure, job title changes, company headcount trendsPitchBook$20-40K/yrOwnership data, advisor relationships, deal activity, company financialsAxial NetworkFree (with membership)LMM deal flow, intermediary connections, seller-initiated processesGrata$15-25K/yrAI-powered company search, ownership type filters, founder-led identificationGoogle Alerts / News APIFree / $50-300/moPress releases mentioning succession planning, advisor retentionZoomInfo$15-25K/yrContact data, org charts, executive tenure, technographics
Feasibility: Medium. LinkedIn + PitchBook gets you 70% of the signal. The rest is manual pattern matching on news and advisor activity.

2. PLATFORM FATIGUE (red)
What it detects: Company has hit a growth ceiling, needs operational partner to reach next stage.
How it actually works:

Revenue plateau signal: 3+ years of flat or single-digit revenue growth despite market growth. Detected from financial databases or estimated from employee headcount trends.
Technology debt signal: Company still running legacy ERP/CRM (SAP R/3, on-prem Salesforce, custom-built systems). Detected via technographic providers.
Hiring signal (inverted): Company not hiring in growth roles (sales, product) but is hiring in maintenance roles (IT ops, accounting). Detected via job posting analysis.

APIs/Sources:
SourceCostWhat You GetPrivCo$5-15K/yrPrivate company revenue estimates, growth ratesBuiltWith / HG Insights$5-12K/yrTechnology stack detection (legacy vs. modern)Indeed / LinkedIn Jobs APIFree-$500/moJob posting analysis, hiring pattern detectionDun & Bradstreet$10-20K/yrFinancial risk scores, payment behavior, company sizeCrunchbase$5-7K/yrFunding history (no recent raises = bootstrap plateau)
Feasibility: Medium-High. Technographic data + hiring patterns + revenue estimates triangulate well. The challenge is getting reliable revenue data for private companies in the $10-50M range.

3. REGULATORY TAILWIND (blue)
What it detects: New or tightening regulations creating demand acceleration for the target's services.
How it actually works:

Legislation tracking: Monitor federal/state legislative databases for new compliance requirements in the target's sector (EPA rules for industrial services, HIPAA expansions for healthcare, SOX/SOC requirements for tech).
Enforcement action signal: Increased fines, consent decrees, or enforcement actions in the sector signal regulatory pressure ramping up.
RFP/procurement signal: Government procurement databases show increased spending in the target's category.

APIs/Sources:
SourceCostWhat You GetRegulations.gov APIFreeFederal regulatory proposals, final rules, comment periodsCongress.gov APIFreeBill tracking, committee activity, sponsor analysisFiscalNote / Quorum$10-30K/yrRegulatory intelligence with AI-powered impact analysisUSAspending.gov APIFreeFederal contract awards by NAICS codeState legislature APIsFree (varies)State-level regulatory trackingGoogle News API$50-300/moSector + regulation keyword monitoring
Feasibility: High for tracking. The hard part is connecting a regulatory change to a specific target company's demand uplift. That's an inference step, not a data retrieval step. A human analyst (or an LLM with the right context) makes that connection.
Cost advantage: Most regulatory data sources are free. This is the cheapest signal to build.

4. ADD-ON MAGNET (violet)
What it detects: Fragmented market with clear bolt-on acquisition targets surrounding the platform company.
How it actually works:

Market fragmentation signal: High number of small competitors in the same NAICS/SIC code within the target's geography. Low market concentration ratio.
Acquisition velocity signal: Other PE firms have already executed buy-and-build in the adjacent space, validating the thesis.
Target density signal: Count of companies matching add-on criteria ($1-5M EBITDA, same sector, same geography) within a reasonable radius.

APIs/Sources:
SourceCostWhat You GetPitchBook$20-40K/yrDeal comps, PE activity by sector, add-on transaction historyGrata$15-25K/yrSimilar company search, market mapping, fragmentation analysisCensus Bureau (CBP)FreeEstablishment counts by NAICS code and geographyIBISWorld$5-10K/yrIndustry reports with market concentration data, number of firmsSourceScrub$10-20K/yrCompany database specifically designed for PE deal sourcing
Feasibility: High. PitchBook + Grata + Census data gives you a quantitative fragmentation score. This is one of the most automatable signals because it's fundamentally a database query: "How many companies match [criteria] in [geography] in [sector]?"

5. CARVE-OUT CANDIDATE (amber)
What it detects: Large corporation divesting a non-core business unit that fits ACP criteria.
How it actually works:

Strategic review signal: Public company announces "strategic alternatives review," portfolio rationalization, or non-core asset divestiture.
Earnings call signal: NLP on earnings call transcripts detecting language like "simplify portfolio," "focus on core," "evaluate alternatives for [division]."
Advisor signal: Investment bank retained for sell-side advisory on a division.

APIs/Sources:
SourceCostWhat You GetSEC EDGAR APIFree10-K, 8-K, proxy filings mentioning divestitures, strategic reviewsSeeking Alpha / Earnings Call APIs$200-2K/yrEarnings call transcripts for NLP processingPitchBook$20-40K/yrCarve-out deal tracking, advisor mandatesMergermarket$15-30K/yrRumored and confirmed M&A, including carve-outsBloomberg Terminal$24K/yrReal-time M&A activity, deal screeningOpenAI / Claude API$50-500/moNLP processing of earnings transcripts and filings
Feasibility: Medium. The signals exist in public filings and transcripts, but connecting a carve-out candidate to ACP's specific criteria requires inference. Most carve-outs are too large for LMM PE — the filtering step is critical.

6. MANAGEMENT UPGRADE (teal)
What it detects: Strong business fundamentals but leadership gap creates PE value-add opportunity.
How it actually works:

Departure signal: C-suite departures detected via LinkedIn job changes, press releases, or SEC filings.
Tenure gap signal: Key roles (CFO, COO, VP Sales) are either vacant or held by very short-tenure individuals (<1 year).
Glassdoor signal: Low management ratings (below 3.0) combined with high product/service ratings. This indicates the business is good but leadership is the constraint.

APIs/Sources:
SourceCostWhat You GetLinkedIn Sales Navigator$100-150/moExecutive movements, org chart gaps, tenure dataGlassdoor API (unofficial)Scraping riskManagement ratings, CEO approval, employee sentimentIndeed Company Data (MCP)Free (connected)Company ratings, management scores — you already have thisZoomInfo$15-25K/yrOrg charts, executive changes, hiring signalsGoogle AlertsFreeExecutive departure announcements
Feasibility: Medium. LinkedIn is the best single source. Glassdoor/Indeed ratings provide supporting signal but can't be the primary trigger (too noisy for small private companies with few reviews).

7. RECURRING MOAT (emerald)
What it detects: Mission-critical services with contractual recurring revenue.
How it actually works:

Revenue model signal: Company charges on subscription, retainer, or contractual basis rather than project/transaction. Detected from company website, customer testimonials, pricing pages.
Customer retention signal: Low churn indicators — long customer relationships, multi-year contracts, high switching costs.
Mission-critical signal: Service is compliance-mandated, safety-critical, or operationally essential (can't turn it off without business disruption).

APIs/Sources:
SourceCostWhat You GetCompany website scrapingFree (engineering time)Pricing model, customer testimonials, contract termsPrivCo$5-15K/yrRevenue model classification (recurring vs. project)Grata$15-25K/yrBusiness model filtering, keyword-based company searchG2 / Capterra (for software)Free-$5K/yrCustomer reviews indicating stickinessIBISWorld$5-10K/yrIndustry revenue model normsClaude/GPT API$50-500/moWebsite content analysis, business model classification
Feasibility: Medium. This is more of an analysis signal than a detection signal. You're classifying a business model, not detecting an event. An LLM reading the company's website can make this determination with ~80% accuracy. The remaining 20% requires financial diligence.

8. SECTOR CONSOLIDATOR (red)
What it detects: Natural platform for buy-and-build strategy in a fragmentable market.
How it actually works:
This is essentially a composite signal — it combines ADD-ON MAGNET (fragmented market), RECURRING MOAT (defensible core), and MANAGEMENT UPGRADE (capacity to absorb acquisitions). A company triggers SECTOR CONSOLIDATOR when:

Market fragmentation score > threshold (from ADD-ON MAGNET analysis)
Company is already one of the larger players in a fragmented space
Existing operational infrastructure (ERP, HR, compliance) can absorb bolt-ons
PE precedent exists (other firms have done buy-and-build in adjacent sectors)

APIs/Sources: Same as ADD-ON MAGNET + PitchBook deal comps. No unique sources needed.
Feasibility: High once the underlying signals exist. This is a scoring function, not a data source problem.

Cost Summary
Minimum Viable Signal Detection (Manual + Semi-Automated)
TierSourcesAnnual CostWhat You GetFree tierSEC EDGAR, Congress.gov, Census Bureau, Google Alerts, USAspending, Indeed MCP$0Regulatory tracking, government spending, basic company ratings, filing monitoringStarter+ LinkedIn Sales Navigator, Crunchbase, Google News API~$3K/yrExecutive movements, funding history, news monitoringProfessional+ Grata, PrivCo, IBISWorld~$30-50K/yrPrivate company search, revenue estimates, industry reports, fragmentation dataEnterprise+ PitchBook, ZoomInfo, SourceScrub~$70-120K/yrFull deal flow intelligence, ownership data, advisor tracking, comprehensive company data
LLM Processing Costs (for automated signal inference)
TaskVolumeAPI CostWebsite analysis (business model classification)500 companies/mo~$50-100/moEarnings transcript NLP200 transcripts/mo~$30-60/moNews/filing summarization1000 articles/mo~$20-40/moSignal scoring pipeline (orchestration)Continuous~$100-200/mo
Total LLM cost: ~$200-400/mo
Infrastructure Costs
ComponentCostNetlify (static hosting)Free tierData pipeline (Lambda/Cloud Functions)~$20-50/moDatabase (Supabase/Planetscale)Free-$25/moCron jobs / scheduling~$10-20/mo

What's Actually Buildable in the Current Architecture
The CTG/ACP platform is a static SPA with no backend. Zero API calls. Zero authentication. The data.js file is the database. That means real signal detection requires a fundamentally different architecture:
Current state: data.js → shared-components.js → view modules → static HTML. Done.
Real signal detection adds:

A backend service (Node/Python) that runs on a schedule (daily/weekly)
API integrations with 3-8 data providers (authenticated, rate-limited)
A database to store historical signals and track changes over time
An LLM pipeline for unstructured data analysis (websites, filings, transcripts)
A build step that regenerates data.js from the database (or an API the SPA calls)