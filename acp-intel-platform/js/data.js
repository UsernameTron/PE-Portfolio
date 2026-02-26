/* === ACP Deal Sourcing Intelligence Platform Data === */
(function() {
  'use strict';

  var Data = {};

  // ── 1. Fund Economics ──
  Data.fundEconomics = {
    fundI: { size: 325, vintage: 2016 },
    fundII: { size: 450, vintage: 2020 },
    fundIII: { size: 620, vintage: 2022 },
    collaborate: { size: 233 },
    totalAUM: 1800,
    equityCheckRange: [20, 60],
    targetEBITDA: [3, 15],
    targetEV: 150,
    totalAcquisitions: 125,
    totalAddOns: 95
  };

  // ── 2. Prospect Database (30 records) ──
  // Distribution: 8 HOT, 12 WARM, 6 NURTURE, 4 STRATEGIC
  // Sectors: Software & TES, Professional Services, Industrial Services, Specialty M&D
  // Aggregate EV: ~$2.1B
  Data.prospects = [
    // ─── HOT (8) ───
    {
      id: 1,
      company: "Apex Compliance Services",
      sector: "Software & TES",
      subsector: "RegTech / Compliance SaaS",
      location: "Austin, TX",
      score: 93,
      tier: "HOT",
      signals: ["FOUNDER SUCCESSION", "RECURRING MOAT"],
      signalColors: ["emerald", "emerald"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.93,
          detectedAt: "2026-02-03",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Founder (age 62) updated profile to 'Advisory' role; succession advisor Bridgepoint Advisors engagement confirmed" },
            { provider: "Exit Planning Institute", dataPoint: "Estate planning initiated Q1 2026; liquidity event timeline identified as 12-18 months" }
          ],
          narrative: "Apex Compliance Services founder at age 62 has engaged succession advisors and initiated estate planning, signaling a near-term liquidity event for this $11.5M EBITDA RegTech platform in Austin."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.91,
          detectedAt: "2026-02-05",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "SaaS platform embedded in 1,200+ mid-market compliance workflows with 94% recurring revenue" },
            { provider: "Gartner", dataPoint: "Net revenue retention of 118% confirmed; category leader in compliance workflow automation" }
          ],
          narrative: "Apex Compliance demonstrates an exceptional recurring revenue moat with 94% recurring revenue and 118% NRR across 1,200+ mid-market clients, creating a highly defensible platform for PE-backed consolidation."
        }
      ],
      ebitda: "$11.5M",
      ebitdaNum: 11.5,
      revenue: "$58M",
      evEstimate: "$103M",
      equityCheck: "$55M",
      processStage: "LOI Submitted",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 95,
        mgmtQuality: 88,
        growthRunway: 85,
        ebitdaQuality: 92,
        dealComplexity: 80,
        competitiveProc: 95
      },
      thesisAlignments: ["Platform M&A", "Organic Growth"],
      notes: "Founder (age 62) initiated estate planning and retained succession advisor. 94% recurring revenue with net revenue retention of 118%. Platform serves 1,200+ mid-market firms with compliance workflow automation. Natural platform for add-on acquisitions in adjacent compliance verticals.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$11.5M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "LOI Submitted" }
      ]
    },
    {
      id: 2,
      company: "Meridian Industrial Services",
      sector: "Industrial Services",
      subsector: "Environmental Services",
      location: "Houston, TX",
      score: 89,
      tier: "HOT",
      signals: ["FOUNDER SUCCESSION", "ADD-ON MAGNET"],
      signalColors: ["emerald", "violet"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.90,
          detectedAt: "2026-02-02",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Owner-operator (age 64) no identified successor; recent networking with wealth management advisors" },
            { provider: "Axial Network", dataPoint: "Confidential outreach detected from advisor network indicating liquidity exploration" }
          ],
          narrative: "Meridian Industrial Services owner-operator at age 64 has no identified successor and is actively exploring liquidity options for the Gulf Coast environmental remediation platform generating $9.8M EBITDA."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.88,
          detectedAt: "2026-02-06",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "200+ regional environmental remediation competitors identified in Gulf Coast market, majority sub-$5M revenue" },
            { provider: "IBISWorld", dataPoint: "Environmental remediation industry fragmentation index of 0.82; top 10 players hold less than 15% market share" }
          ],
          narrative: "Meridian's dominant Houston position amid 200+ fragmented regional competitors makes it an ideal roll-up platform for Gulf Coast environmental services consolidation."
        }
      ],
      ebitda: "$9.8M",
      ebitdaNum: 9.8,
      revenue: "$67M",
      evEstimate: "$78M",
      equityCheck: "$42M",
      processStage: "IC Approved",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Advisor Network",
      convictionFactors: {
        sectorFit: 90,
        mgmtQuality: 82,
        growthRunway: 88,
        ebitdaQuality: 85,
        dealComplexity: 78,
        competitiveProc: 88
      },
      thesisAlignments: ["Platform M&A", "Add-On Acquisition"],
      notes: "Owner-operator (age 64) with no identified successor. Dominant position in Gulf Coast environmental remediation. Fragmented market with 200+ regional competitors suitable for roll-up. Strong management bench below founder. EBITDA growing 12% YoY organically.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$9.8M" },
        { label: "Source", value: "Advisor Network" },
        { label: "Stage", value: "IC Approved" }
      ]
    },
    {
      id: 3,
      company: "Keystone Actuarial Partners",
      sector: "Professional Services",
      subsector: "Insurance Consulting",
      location: "Hartford, CT",
      score: 87,
      tier: "HOT",
      signals: ["RECURRING MOAT", "SECTOR CONSOLIDATOR"],
      signalColors: ["emerald", "red"],
      signalDetails: [
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.89,
          detectedAt: "2026-02-04",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Multi-year retainer contracts across 60+ P&C carriers with 97% client retention over 5 years" },
            { provider: "IBISWorld", dataPoint: "Actuarial consulting market growing at 6.2% CAGR; Keystone ranked top-15 nationally by revenue" }
          ],
          narrative: "Keystone Actuarial Partners holds a deeply embedded recurring revenue position with 97% client retention across 60+ P&C carriers, creating a durable moat in the Hartford insurance consulting market."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.86,
          detectedAt: "2026-02-07",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "100+ boutique actuarial firms identified as potential consolidation targets nationally" },
            { provider: "S&P Capital IQ", dataPoint: "Three actuarial firm acquisitions completed in trailing 12 months by PE-backed platforms; multiples trending 9-11x" }
          ],
          narrative: "The actuarial consulting sector features 100+ boutique firms ripe for consolidation, positioning Keystone as a natural platform acquirer with institutional capital backing from its Hartford base."
        }
      ],
      ebitda: "$7.4M",
      ebitdaNum: 7.4,
      revenue: "$32M",
      evEstimate: "$74M",
      equityCheck: "$40M",
      processStage: "Diligence",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Management Referral",
      convictionFactors: {
        sectorFit: 92,
        mgmtQuality: 90,
        growthRunway: 82,
        ebitdaQuality: 88,
        dealComplexity: 72,
        competitiveProc: 85
      },
      thesisAlignments: ["Platform M&A", "Management Upgrade"],
      notes: "Top-15 actuarial firm with multi-year retainer contracts across 60+ P&C carriers. 97% client retention over 5 years. Fragmented sector with 100+ boutique firms ripe for consolidation. Partners receptive to institutional capital for growth.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$7.4M" },
        { label: "Source", value: "Management Referral" },
        { label: "Stage", value: "Diligence" }
      ]
    },
    {
      id: 4,
      company: "TrueNorth Data Systems",
      sector: "Software & TES",
      subsector: "Vertical SaaS",
      location: "Minneapolis, MN",
      score: 85,
      tier: "HOT",
      signals: ["PLATFORM FATIGUE", "RECURRING MOAT"],
      signalColors: ["red", "emerald"],
      signalDetails: [
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.87,
          detectedAt: "2026-02-08",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Bootstrapped vertical SaaS at $42M revenue showing declining feature release velocity; tech stack aging indicators detected" },
            { provider: "G2 Reviews", dataPoint: "Customer reviews cite need for deeper integrations and mobile capabilities; founder acknowledges resource constraints" }
          ],
          narrative: "TrueNorth Data Systems founder has bootstrapped to $42M revenue but is hitting a clear growth ceiling in building materials vertical SaaS, needing institutional resources to overcome platform fatigue."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.92,
          detectedAt: "2026-02-06",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "92% recurring SaaS revenue with 130% net expansion rate across building materials distribution vertical" },
            { provider: "Gartner", dataPoint: "Category-defining product in underserved building materials distribution vertical; no direct SaaS competitor at scale" }
          ],
          narrative: "TrueNorth's 92% recurring revenue and exceptional 130% net expansion rate in the underserved building materials vertical SaaS category create a category-defining moat in Minneapolis."
        }
      ],
      ebitda: "$8.2M",
      ebitdaNum: 8.2,
      revenue: "$42M",
      evEstimate: "$82M",
      equityCheck: "$44M",
      processStage: "LOI Submitted",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 90,
        mgmtQuality: 78,
        growthRunway: 88,
        ebitdaQuality: 86,
        dealComplexity: 82,
        competitiveProc: 90
      },
      thesisAlignments: ["Platform M&A", "Organic Growth"],
      notes: "Vertical SaaS platform for building materials distribution. Owner bootstrapped to $42M revenue but hitting growth ceiling without institutional resources. 92% recurring revenue, 130% net expansion rate. Category-defining product in an underserved vertical.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$8.2M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "LOI Submitted" }
      ]
    },
    {
      id: 5,
      company: "Sentinel Safety Solutions",
      sector: "Industrial Services",
      subsector: "Safety & Compliance",
      location: "Charlotte, NC",
      score: 82,
      tier: "HOT",
      signals: ["REGULATORY TAILWIND", "ADD-ON MAGNET"],
      signalColors: ["blue", "violet"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.88,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "New OSHA enforcement expansion rule published; workplace safety compliance requirements broadened across 12 additional SIC codes" },
            { provider: "LexisNexis", dataPoint: "OSHA penalty escalation provisions increasing fines 35% effective Q2 2026; multi-year enforcement regime confirmed" }
          ],
          narrative: "Sentinel Safety Solutions in Charlotte is positioned to capture 15%+ organic growth from the new OSHA enforcement expansion, creating a multi-year regulatory tailwind for workplace safety compliance."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.85,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "12 regional safety compliance firms identified as add-on targets in Mid-Atlantic and Midwest geographies" },
            { provider: "IBISWorld", dataPoint: "Workplace safety compliance market highly fragmented with top 20 firms holding less than 25% share nationally" }
          ],
          narrative: "Sentinel has identified 12 regional add-on targets for geographic expansion from its Southeast base into Mid-Atlantic and Midwest, supported by the fragmented $6.5M EBITDA safety compliance market."
        }
      ],
      ebitda: "$6.5M",
      ebitdaNum: 6.5,
      revenue: "$38M",
      evEstimate: "$55M",
      equityCheck: "$30M",
      processStage: "IOI Stage",
      dealLead: "Rebecca Liu, Director",
      sourceChannel: "Industry Conference",
      convictionFactors: {
        sectorFit: 88,
        mgmtQuality: 80,
        growthRunway: 85,
        ebitdaQuality: 78,
        dealComplexity: 75,
        competitiveProc: 82
      },
      thesisAlignments: ["Platform M&A", "Market Expansion"],
      notes: "OSHA regulatory expansion driving 15%+ organic growth in workplace safety compliance. Southeast market leader with expansion potential into Mid-Atlantic and Midwest. Identified 12 regional add-on targets. New OSHA enforcement regime is a multi-year tailwind.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Rebecca Liu" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$6.5M" },
        { label: "Source", value: "Industry Conference" },
        { label: "Stage", value: "IOI Stage" }
      ]
    },
    {
      id: 6,
      company: "Ridgeline Specialty Distribution",
      sector: "Specialty M&D",
      subsector: "Industrial Distribution",
      location: "Denver, CO",
      score: 79,
      tier: "HOT",
      signals: ["FOUNDER SUCCESSION", "SECTOR CONSOLIDATOR"],
      signalColors: ["emerald", "red"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.84,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Founder (age 59) exploring liquidity after 28 years of ownership; recent wealth advisor engagement detected" },
            { provider: "PrivCo", dataPoint: "Ridgeline ownership structure indicates sole proprietor with no institutional investors or family succession plan" }
          ],
          narrative: "Ridgeline Specialty Distribution founder at age 59 is exploring liquidity after 28 years building a $94M revenue Mountain West industrial distributor, signaling a proprietary succession opportunity in Denver."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.82,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "IBISWorld", dataPoint: "Rocky Mountain specialty industrial distribution market fragmented with 50+ regional players under $50M revenue" },
            { provider: "PitchBook", dataPoint: "Two PE-backed distribution platforms completed roll-ups in adjacent Western US markets in trailing 18 months" }
          ],
          narrative: "Ridgeline's defensible vendor relationships and proprietary product lines make it an ideal platform for Rocky Mountain industrial distribution consolidation across 50+ fragmented regional competitors."
        }
      ],
      ebitda: "$12.1M",
      ebitdaNum: 12.1,
      revenue: "$94M",
      evEstimate: "$97M",
      equityCheck: "$52M",
      processStage: "IC Approved",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 82,
        mgmtQuality: 85,
        growthRunway: 78,
        ebitdaQuality: 80,
        dealComplexity: 70,
        competitiveProc: 75
      },
      thesisAlignments: ["Platform M&A", "Add-On Acquisition"],
      notes: "Mountain West specialty industrial distributor. Founder (age 59) exploring liquidity after 28 years. $94M revenue with defensible vendor relationships and proprietary product lines. Strong platform for Rocky Mountain consolidation play.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$12.1M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "IC Approved" }
      ]
    },
    {
      id: 7,
      company: "Vanguard Testing Laboratories",
      sector: "Professional Services",
      subsector: "Testing, Inspection & Certification",
      location: "San Jose, CA",
      score: 76,
      tier: "HOT",
      signals: ["REGULATORY TAILWIND", "RECURRING MOAT"],
      signalColors: ["blue", "emerald"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.86,
          detectedAt: "2026-02-07",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "New FCC and EPA compliance mandates for semiconductor and electronics testing published; effective dates staggered through 2027" },
            { provider: "Compliance Week", dataPoint: "Electronics testing lab capacity nationally at 92% utilization; regulatory expansion expected to drive 20%+ demand increase" }
          ],
          narrative: "Vanguard Testing Laboratories in San Jose is experiencing record demand driven by new FCC and EPA compliance mandates, creating a sustained regulatory tailwind for semiconductor testing services."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.83,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "85% repeat revenue from 40+ OEM clients with multi-year certification testing agreements" },
            { provider: "Gartner", dataPoint: "Specialized semiconductor testing lab accreditations create 18-24 month switching barriers for OEM clients" }
          ],
          narrative: "Vanguard's 85% repeat revenue from 40+ OEM clients and specialized accreditations create deep switching costs and a defensible recurring moat in the capacity-constrained electronics testing market."
        }
      ],
      ebitda: "$5.8M",
      ebitdaNum: 5.8,
      revenue: "$28M",
      evEstimate: "$52M",
      equityCheck: "$28M",
      processStage: "Diligence",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Operating Partner",
      convictionFactors: {
        sectorFit: 85,
        mgmtQuality: 75,
        growthRunway: 82,
        ebitdaQuality: 80,
        dealComplexity: 68,
        competitiveProc: 78
      },
      thesisAlignments: ["Organic Growth", "Market Expansion"],
      notes: "Specialized semiconductor and electronics testing lab. New FCC and EPA compliance mandates driving record demand. 85% repeat revenue from 40+ OEM clients. Capacity-constrained with clear expansion ROI in new lab build-out.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$5.8M" },
        { label: "Source", value: "Operating Partner" },
        { label: "Stage", value: "Diligence" }
      ]
    },
    {
      id: 8,
      company: "Cascade Cloud Solutions",
      sector: "Software & TES",
      subsector: "Managed IT Services",
      location: "Seattle, WA",
      score: 76,
      tier: "HOT",
      signals: ["PLATFORM FATIGUE", "ADD-ON MAGNET"],
      signalColors: ["red", "violet"],
      signalDetails: [
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.84,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "G2 Reviews", dataPoint: "Cascade Cloud customer reviews highlight desire for expanded cybersecurity and cloud migration services beyond current MSP scope" },
            { provider: "StackShare", dataPoint: "Technology stack aging indicators; founder-led MSP at $52M revenue hitting growth ceiling without institutional playbook" }
          ],
          narrative: "Cascade Cloud Solutions founder is hitting a growth ceiling at $52M revenue in Seattle, needing institutional resources and a professional management playbook to unlock the next phase of MSP growth."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.86,
          detectedAt: "2026-02-13",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "15+ MSP add-on targets identified in Pacific Northwest region, ranging from $1-5M revenue" },
            { provider: "GF Data", dataPoint: "MSP sector median acquisition multiple at 6-8x EBITDA; sub-$5M revenue targets available at 4-5x" }
          ],
          narrative: "Cascade's 350+ SMB client base and $3.8M MRR position it as a natural roll-up platform with 15+ identified MSP add-on targets across the highly fragmented Pacific Northwest market."
        }
      ],
      ebitda: "$7.9M",
      ebitdaNum: 7.9,
      revenue: "$52M",
      evEstimate: "$71M",
      equityCheck: "$38M",
      processStage: "IOI Stage",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 80,
        mgmtQuality: 72,
        growthRunway: 78,
        ebitdaQuality: 75,
        dealComplexity: 70,
        competitiveProc: 80
      },
      thesisAlignments: ["Platform M&A", "Operational Improvement"],
      notes: "Pacific Northwest MSP with 350+ SMB clients. Founder hitting growth ceiling at $52M — needs institutional playbook for next phase. Highly fragmented MSP market with 15+ identified add-on targets in the region. MRR base of $3.8M growing 8% YoY.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$7.9M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "IOI Stage" }
      ]
    },

    // ─── WARM (12) ───
    {
      id: 9,
      company: "Prism Engineering Consultants",
      sector: "Professional Services",
      subsector: "Engineering Consulting",
      location: "Atlanta, GA",
      score: 68,
      tier: "WARM",
      signals: ["MANAGEMENT UPGRADE", "ADD-ON MAGNET"],
      signalColors: ["teal", "violet"],
      signalDetails: [
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.81,
          detectedAt: "2026-02-08",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Management depth gap identified below founder-CEO; no VP-level hires in past 3 years despite $41M revenue scale" },
            { provider: "Glassdoor", dataPoint: "Employee reviews cite lack of middle management structure and career development opportunities" }
          ],
          narrative: "Prism Engineering Consultants in Atlanta shows a clear management depth gap below the founder-CEO, presenting an opportunity to unlock value through professional management installation post-acquisition."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.78,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "8 tuck-in engineering consultancy targets identified in adjacent Southeast geographies" },
            { provider: "IBISWorld", dataPoint: "Engineering consulting market in Southeast US growing at 5.8% CAGR with highly fragmented competitive landscape" }
          ],
          narrative: "Prism's deep DOT relationships and 8 identified tuck-in targets across the fragmented Southeast engineering consulting market make it a compelling add-on acquisition platform."
        }
      ],
      ebitda: "$6.2M",
      ebitdaNum: 6.2,
      revenue: "$41M",
      evEstimate: "$53M",
      equityCheck: "$28M",
      processStage: "Initial Screening",
      dealLead: "Rebecca Liu, Director",
      sourceChannel: "Advisor Network",
      convictionFactors: {
        sectorFit: 78,
        mgmtQuality: 62,
        growthRunway: 72,
        ebitdaQuality: 70,
        dealComplexity: 65,
        competitiveProc: 70
      },
      thesisAlignments: ["Management Upgrade", "Add-On Acquisition"],
      notes: "Strong engineering consultancy with deep DOT relationships. Management depth gap below founder-CEO. Southeast market with fragmented competitive landscape. Identified 8 tuck-in targets in adjacent geographies.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Rebecca Liu" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$6.2M" },
        { label: "Source", value: "Advisor Network" },
        { label: "Stage", value: "Initial Screening" }
      ]
    },
    {
      id: 10,
      company: "Summit Packaging Group",
      sector: "Specialty M&D",
      subsector: "Specialty Packaging",
      location: "Nashville, TN",
      score: 65,
      tier: "WARM",
      signals: ["CARVE-OUT CANDIDATE", "RECURRING MOAT"],
      signalColors: ["amber", "emerald"],
      signalDetails: [
        {
          type: "CARVE_OUT_CANDIDATE",
          label: "CARVE-OUT CANDIDATE",
          color: "amber",
          confidence: 0.82,
          detectedAt: "2026-02-05",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "SEC EDGAR", dataPoint: "$2B parent packaging conglomerate disclosed strategic review of non-core divisions in Q4 2025 10-K filing" },
            { provider: "PitchBook", dataPoint: "Parent company engaged two bulge bracket banks for potential divestitures; Summit identified as non-core asset" }
          ],
          narrative: "Summit Packaging Group is a non-core division of a $2B conglomerate undergoing strategic review, creating a carve-out opportunity for the $8.7M EBITDA specialty packaging unit in Nashville."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.80,
          detectedAt: "2026-02-07",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "80% of revenue under multi-year contracts with consumer staples manufacturers; average contract duration 3.2 years" },
            { provider: "IBISWorld", dataPoint: "Specialty packaging for consumer staples demonstrates high switching costs due to custom tooling and FDA compliance requirements" }
          ],
          narrative: "Summit's 80% contracted revenue with consumer staples manufacturers under multi-year agreements creates a defensible recurring moat with strong standalone economics if carved out with dedicated management."
        }
      ],
      ebitda: "$8.7M",
      ebitdaNum: 8.7,
      revenue: "$62M",
      evEstimate: "$70M",
      equityCheck: "$37M",
      processStage: "IOI Stage",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 72,
        mgmtQuality: 70,
        growthRunway: 68,
        ebitdaQuality: 72,
        dealComplexity: 60,
        competitiveProc: 65
      },
      thesisAlignments: ["Operational Improvement", "Organic Growth"],
      notes: "Non-core division of $2B packaging conglomerate. Parent pursuing strategic review. 80% of revenue under multi-year contracts with consumer staples manufacturers. Strong standalone economics if carved out with dedicated management.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$8.7M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "IOI Stage" }
      ]
    },
    {
      id: 11,
      company: "Pinehurst Wealth Advisors",
      sector: "Professional Services",
      subsector: "Wealth Management / RIA",
      location: "Raleigh, NC",
      score: 63,
      tier: "WARM",
      signals: ["FOUNDER SUCCESSION", "RECURRING MOAT"],
      signalColors: ["emerald", "emerald"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.79,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Founder (age 61) exploring partial liquidity; recent connections with PE-focused wealth advisors in Raleigh market" },
            { provider: "PrivCo", dataPoint: "RIA with $2.4B AUM under sole founder ownership; no institutional capital or family succession plan identified" }
          ],
          narrative: "Pinehurst Wealth Advisors founder at age 61 is exploring partial liquidity for the $2.4B AUM RIA in Raleigh, opening a window for PE-backed RIA consolidation in the Carolinas."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.83,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "98% recurring fee revenue from high-net-worth client base across $2.4B assets under management" },
            { provider: "IBISWorld", dataPoint: "RIA sector demonstrates 95%+ client retention rates; fee-based revenue model provides predictable cash flows" }
          ],
          narrative: "Pinehurst's 98% recurring fee revenue across $2.4B AUM from high-net-worth clients creates an exceptionally sticky revenue moat ideal for PE-backed RIA roll-up in the Carolinas market."
        }
      ],
      ebitda: "$4.8M",
      ebitdaNum: 4.8,
      revenue: "$19M",
      evEstimate: "$53M",
      equityCheck: "$28M",
      processStage: "Initial Screening",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 75,
        mgmtQuality: 68,
        growthRunway: 70,
        ebitdaQuality: 78,
        dealComplexity: 60,
        competitiveProc: 72
      },
      thesisAlignments: ["Platform M&A", "Organic Growth"],
      notes: "RIA with $2.4B AUM across high-net-worth clients. Founder (age 61) exploring partial liquidity. 98% recurring fee revenue. RIA roll-up thesis with 6 identified targets in Carolinas market. Premium valuation reflective of AUM quality.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$4.8M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "Initial Screening" }
      ]
    },
    {
      id: 12,
      company: "Ironclad Fabrication Holdings",
      sector: "Industrial Services",
      subsector: "Metal Fabrication",
      location: "Cleveland, OH",
      score: 61,
      tier: "WARM",
      signals: ["SECTOR CONSOLIDATOR", "MANAGEMENT UPGRADE"],
      signalColors: ["red", "teal"],
      signalDetails: [
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.77,
          detectedAt: "2026-02-06",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Great Lakes metal fabrication market features 80+ independent shops with average revenue under $30M" },
            { provider: "IBISWorld", dataPoint: "Metal fabrication industry consolidation accelerating; 15 PE-backed platforms completed roll-ups nationally in past 24 months" }
          ],
          narrative: "Ironclad Fabrication Holdings in Cleveland serves as a natural platform for Great Lakes regional metal fabrication consolidation amid 80+ independent shops in the fragmented Midwest market."
        },
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.76,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Thin management bench identified; no dedicated COO or CFO roles despite $78M revenue and $10.3M EBITDA" },
            { provider: "Glassdoor", dataPoint: "Reviews indicate strong operational capabilities but founder-dependent decision-making and lack of professional management structure" }
          ],
          narrative: "Ironclad's strong $10.3M EBITDA operational foundation is constrained by a thin management bench, requiring COO and CFO recruitment post-close to unlock the Great Lakes consolidation thesis."
        }
      ],
      ebitda: "$10.3M",
      ebitdaNum: 10.3,
      revenue: "$78M",
      evEstimate: "$72M",
      equityCheck: "$39M",
      processStage: "Relationship Building",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Industry Conference",
      convictionFactors: {
        sectorFit: 70,
        mgmtQuality: 58,
        growthRunway: 65,
        ebitdaQuality: 68,
        dealComplexity: 58,
        competitiveProc: 68
      },
      thesisAlignments: ["Platform M&A", "Management Upgrade"],
      notes: "Midwest metal fabrication leader serving automotive and aerospace OEMs. Strong operational capabilities but thin management bench. Natural platform for Great Lakes regional consolidation. Need to recruit COO and CFO post-close.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$10.3M" },
        { label: "Source", value: "Industry Conference" },
        { label: "Stage", value: "Relationship Building" }
      ]
    },
    {
      id: 13,
      company: "BrightPath Learning Systems",
      sector: "Software & TES",
      subsector: "EdTech / LMS",
      location: "Boston, MA",
      score: 59,
      tier: "WARM",
      signals: ["PLATFORM FATIGUE", "RECURRING MOAT"],
      signalColors: ["red", "emerald"],
      signalDetails: [
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.78,
          detectedAt: "2026-02-14",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "G2 Reviews", dataPoint: "Enterprise LMS clients requesting AI-powered learning paths and mobile-first UX; current platform lagging competitors on feature velocity" },
            { provider: "Gartner", dataPoint: "BrightPath ranked in 'Niche Players' quadrant; product roadmap under-invested relative to peer set due to founder capital constraints" }
          ],
          narrative: "BrightPath Learning Systems founder-CEO in Boston is seeking an operating partner to accelerate the LMS product roadmap after growth has stalled due to under-investment in product and go-to-market."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.80,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "88% SaaS revenue with 95% gross retention across 180+ enterprise LMS clients" },
            { provider: "Gartner", dataPoint: "Corporate LMS switching costs averaging 12-18 months of implementation; embedded workflow integration creates durable moat" }
          ],
          narrative: "BrightPath's 88% SaaS revenue and 95% gross retention across 180+ enterprise clients create a sticky recurring moat in the corporate LMS market, providing a stable base for PE-backed growth acceleration."
        }
      ],
      ebitda: "$5.1M",
      ebitdaNum: 5.1,
      revenue: "$27M",
      evEstimate: "$51M",
      equityCheck: "$27M",
      processStage: "Initial Screening",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Management Referral",
      convictionFactors: {
        sectorFit: 72,
        mgmtQuality: 65,
        growthRunway: 70,
        ebitdaQuality: 62,
        dealComplexity: 55,
        competitiveProc: 65
      },
      thesisAlignments: ["Organic Growth", "Operational Improvement"],
      notes: "Corporate LMS platform with 180+ enterprise clients. Founder-CEO seeking operating partner to accelerate product roadmap. 88% SaaS revenue, 95% gross retention. Growth constrained by under-investment in product and GTM.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$5.1M" },
        { label: "Source", value: "Management Referral" },
        { label: "Stage", value: "Initial Screening" }
      ]
    },
    {
      id: 14,
      company: "Cornerstone Fire Protection",
      sector: "Industrial Services",
      subsector: "Fire & Life Safety",
      location: "Tampa, FL",
      score: 57,
      tier: "WARM",
      signals: ["REGULATORY TAILWIND", "SECTOR CONSOLIDATOR"],
      signalColors: ["blue", "red"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.82,
          detectedAt: "2026-02-08",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "Updated Florida building codes mandating enhanced fire protection and life safety systems for commercial and multi-family properties" },
            { provider: "IBISWorld", dataPoint: "Fire protection services market growing at 7.4% CAGR nationally; Sunbelt states leading growth due to construction volume" }
          ],
          narrative: "Cornerstone Fire Protection in Tampa benefits from new Florida building codes driving demand growth in fire protection and life safety services across the high-growth Sunbelt construction market."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.79,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "20+ bolt-on fire protection candidates identified across Sunbelt states; average target revenue $3-8M" },
            { provider: "S&P Capital IQ", dataPoint: "Fire and life safety services sector fragmentation index 0.79; PE-backed roll-ups emerging as dominant consolidation model" }
          ],
          narrative: "Cornerstone's 65% recurring inspection and monitoring revenue positions it as a natural Sunbelt consolidation platform with 20+ identified bolt-on candidates in the highly fragmented fire protection market."
        }
      ],
      ebitda: "$5.4M",
      ebitdaNum: 5.4,
      revenue: "$36M",
      evEstimate: "$46M",
      equityCheck: "$25M",
      processStage: "Relationship Building",
      dealLead: "Rebecca Liu, Director",
      sourceChannel: "Operating Partner",
      convictionFactors: {
        sectorFit: 68,
        mgmtQuality: 62,
        growthRunway: 72,
        ebitdaQuality: 60,
        dealComplexity: 55,
        competitiveProc: 62
      },
      thesisAlignments: ["Platform M&A", "Market Expansion"],
      notes: "Florida fire protection and life safety services. New building codes driving demand growth. 65% recurring inspection and monitoring revenue. Highly fragmented market — 20+ bolt-on candidates identified across Sunbelt.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Rebecca Liu" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$5.4M" },
        { label: "Source", value: "Operating Partner" },
        { label: "Stage", value: "Relationship Building" }
      ]
    },
    {
      id: 15,
      company: "Granite Claims Management",
      sector: "Professional Services",
      subsector: "Insurance TPA",
      location: "Philadelphia, PA",
      score: 55,
      tier: "WARM",
      signals: ["RECURRING MOAT", "ADD-ON MAGNET"],
      signalColors: ["emerald", "violet"],
      signalDetails: [
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.81,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Multi-year claims administration contracts with 50+ carrier clients; AI-assisted claims triage technology differentiation" },
            { provider: "IBISWorld", dataPoint: "TPA industry demonstrates 90%+ client retention; switching costs include data migration and regulatory compliance recertification" }
          ],
          narrative: "Granite Claims Management in Philadelphia holds multi-year contracts with 50+ carrier clients and differentiates through AI-assisted claims triage, creating a durable recurring moat in the TPA market."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.77,
          detectedAt: "2026-02-13",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Fragmented TPA market with 150+ independent administrators nationally; majority under $20M revenue" },
            { provider: "Axial Network", dataPoint: "Four TPA owners in Mid-Atlantic region expressing interest in strategic combinations or partial liquidity events" }
          ],
          narrative: "Granite's technology-differentiated claims platform and 50+ carrier relationships position it as a natural roll-up acquirer in the highly fragmented TPA market with 150+ independent targets."
        }
      ],
      ebitda: "$6.9M",
      ebitdaNum: 6.9,
      revenue: "$44M",
      evEstimate: "$62M",
      equityCheck: "$33M",
      processStage: "IOI Stage",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 72,
        mgmtQuality: 60,
        growthRunway: 62,
        ebitdaQuality: 65,
        dealComplexity: 50,
        competitiveProc: 55
      },
      thesisAlignments: ["Platform M&A", "Add-On Acquisition"],
      notes: "Third-party claims administrator handling workers comp and general liability. Multi-year contracts with 50+ carrier clients. Technology platform differentiation with AI-assisted claims triage. Roll-up opportunity in fragmented TPA market.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$6.9M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "IOI Stage" }
      ]
    },
    {
      id: 16,
      company: "Northwind IT Solutions",
      sector: "Software & TES",
      subsector: "IT Staffing & Services",
      location: "Chicago, IL",
      score: 53,
      tier: "WARM",
      signals: ["MANAGEMENT UPGRADE", "PLATFORM FATIGUE"],
      signalColors: ["teal", "red"],
      signalDetails: [
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.76,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Key leadership gaps in VP Sales and VP Operations roles; high turnover among mid-level managers over past 18 months" },
            { provider: "Glassdoor", dataPoint: "Employee reviews cite operational inefficiency and lack of professional management structure despite $48M revenue scale" }
          ],
          narrative: "Northwind IT Solutions in Chicago has $48M revenue but thin margins due to operational inefficiency and critical leadership gaps, creating a clear management upgrade value creation opportunity."
        },
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.75,
          detectedAt: "2026-02-14",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Internal tools and client portal showing aging architecture; limited automation in staffing workflows and billing processes" },
            { provider: "G2 Reviews", dataPoint: "Clients praise relationship quality but cite technology gaps versus larger MSP competitors in reporting and SLA management" }
          ],
          narrative: "Northwind's strong Fortune 500 client relationships are hampered by aging internal technology and operational inefficiency, with 300-400bps of margin improvement achievable through an institutional playbook."
        }
      ],
      ebitda: "$4.6M",
      ebitdaNum: 4.6,
      revenue: "$48M",
      evEstimate: "$37M",
      equityCheck: "$20M",
      processStage: "Initial Screening",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Advisor Network",
      convictionFactors: {
        sectorFit: 65,
        mgmtQuality: 52,
        growthRunway: 60,
        ebitdaQuality: 58,
        dealComplexity: 52,
        competitiveProc: 60
      },
      thesisAlignments: ["Management Upgrade", "Operational Improvement"],
      notes: "Mid-market IT staffing and managed services. Revenue scale but thin margins due to operational inefficiency. Strong client relationships with Fortune 500 accounts. Opportunity to improve margins 300-400bps with operational playbook.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$4.6M" },
        { label: "Source", value: "Advisor Network" },
        { label: "Stage", value: "Initial Screening" }
      ]
    },
    {
      id: 17,
      company: "Atlas Precision Components",
      sector: "Specialty M&D",
      subsector: "Precision Manufacturing",
      location: "Grand Rapids, MI",
      score: 51,
      tier: "WARM",
      signals: ["CARVE-OUT CANDIDATE", "SECTOR CONSOLIDATOR"],
      signalColors: ["amber", "red"],
      signalDetails: [
        {
          type: "CARVE_OUT_CANDIDATE",
          label: "CARVE-OUT CANDIDATE",
          color: "amber",
          confidence: 0.80,
          detectedAt: "2026-02-07",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "SEC EDGAR", dataPoint: "$1.5B industrial conglomerate disclosed divestiture plans for non-core precision machining division in strategic review filing" },
            { provider: "S&P Capital IQ", dataPoint: "Parent company targeting portfolio simplification; Atlas division EBITDA margins 200bps below parent average indicating under-investment" }
          ],
          narrative: "Atlas Precision Components is a precision machining division being divested by a $1.5B conglomerate in Grand Rapids, with standalone EBITDA margins expandable by 200bps under dedicated PE ownership."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.77,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "IBISWorld", dataPoint: "Precision machining industry in Great Lakes region features 120+ independent shops; consolidation trend accelerating" },
            { provider: "PitchBook", dataPoint: "Five PE-backed precision manufacturing platforms completed acquisitions in Midwest in trailing 12 months" }
          ],
          narrative: "Atlas's strong aerospace and defense customer base positions it as a platform for Great Lakes precision manufacturing consolidation, with carve-out complexity manageable using an experienced transition team."
        }
      ],
      ebitda: "$7.8M",
      ebitdaNum: 7.8,
      revenue: "$55M",
      evEstimate: "$62M",
      equityCheck: "$34M",
      processStage: "Relationship Building",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 68,
        mgmtQuality: 58,
        growthRunway: 55,
        ebitdaQuality: 62,
        dealComplexity: 48,
        competitiveProc: 55
      },
      thesisAlignments: ["Operational Improvement", "Add-On Acquisition"],
      notes: "Precision machining division being divested by $1.5B industrial conglomerate. Strong aerospace and defense customer base. Standalone EBITDA margins expandable by 200bps. Carve-out complexity manageable with experienced transition team.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$7.8M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "Relationship Building" }
      ]
    },
    {
      id: 18,
      company: "Clearwater Environmental Group",
      sector: "Industrial Services",
      subsector: "Water Treatment",
      location: "Orlando, FL",
      score: 50,
      tier: "WARM",
      signals: ["REGULATORY TAILWIND", "ADD-ON MAGNET"],
      signalColors: ["blue", "violet"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.79,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "EPA PFAS regulations expanding mandated testing and remediation requirements for municipal and industrial water systems" },
            { provider: "LexisNexis", dataPoint: "PFAS compliance timelines extending through 2030; estimated $12B in cumulative remediation spend nationally" }
          ],
          narrative: "Clearwater Environmental Group in Orlando is positioned to benefit from multi-year PFAS regulatory tailwinds driving demand for water treatment and compliance services across Sunbelt states."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.76,
          detectedAt: "2026-02-15",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "IBISWorld", dataPoint: "Water treatment services market highly fragmented across Sunbelt states; 200+ independent operators under $15M revenue" },
            { provider: "PitchBook", dataPoint: "Three PE-backed water treatment platforms actively acquiring in Southeast; average add-on multiple 5-7x EBITDA" }
          ],
          narrative: "Clearwater's Florida base and PFAS-driven demand growth create a compelling platform for water treatment consolidation across the fragmented Sunbelt market with significant add-on opportunities."
        }
      ],
      ebitda: "$4.2M",
      ebitdaNum: 4.2,
      revenue: "$29M",
      evEstimate: "$38M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "Rebecca Liu, Director",
      sourceChannel: "Industry Conference",
      convictionFactors: {
        sectorFit: 62,
        mgmtQuality: 55,
        growthRunway: 68,
        ebitdaQuality: 52,
        dealComplexity: 48,
        competitiveProc: 58
      },
      thesisAlignments: ["Platform M&A", "Market Expansion"],
      notes: "Florida water treatment and compliance services. PFAS regulations creating multi-year demand tailwind. Currently monitoring for right entry point. Fragmented market with significant consolidation opportunity across Sunbelt states.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Rebecca Liu" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$4.2M" },
        { label: "Source", value: "Industry Conference" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 19,
      company: "Heritage Building Products",
      sector: "Specialty M&D",
      subsector: "Building Products Distribution",
      location: "Dallas, TX",
      score: 47,
      tier: "WARM",
      signals: ["FOUNDER SUCCESSION", "SECTOR CONSOLIDATOR"],
      signalColors: ["emerald", "red"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.78,
          detectedAt: "2026-02-06",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Axial Network", dataPoint: "Second-generation owner in Dallas exploring options; contacted two regional investment banks for exploratory conversations" },
            { provider: "PrivCo", dataPoint: "Heritage Building Products under family ownership since founding; no institutional investors or third-generation succession identified" }
          ],
          narrative: "Heritage Building Products second-generation owner in Dallas is exploring strategic options including investment bank engagement, signaling a succession-driven liquidity opportunity for the $9.4M EBITDA distributor."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.76,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "IBISWorld", dataPoint: "Building products distribution in Texas growing at 4.5% CAGR; fragmented market with 100+ independent distributors" },
            { provider: "S&P Capital IQ", dataPoint: "Housing recovery providing near-term tailwind; PE-backed building products platforms reporting 8-12% organic growth in Sunbelt" }
          ],
          narrative: "Heritage's $82M revenue Texas base and steady cash flows position it for building products distribution consolidation, with margin improvement achievable through procurement optimization and ERP implementation."
        }
      ],
      ebitda: "$9.4M",
      ebitdaNum: 9.4,
      revenue: "$82M",
      evEstimate: "$75M",
      equityCheck: "$40M",
      processStage: "Relationship Building",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 65,
        mgmtQuality: 55,
        growthRunway: 52,
        ebitdaQuality: 58,
        dealComplexity: 45,
        competitiveProc: 60
      },
      thesisAlignments: ["Platform M&A", "Operational Improvement"],
      notes: "Texas-based building products distributor. Second-generation owner exploring options. Steady cash flows but margin improvement opportunity through procurement optimization and ERP implementation. Housing recovery provides near-term tailwind.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$9.4M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "Relationship Building" }
      ]
    },
    {
      id: 20,
      company: "Beacon Healthcare Staffing",
      sector: "Professional Services",
      subsector: "Healthcare Staffing",
      location: "Columbus, OH",
      score: 45,
      tier: "WARM",
      signals: ["PLATFORM FATIGUE", "MANAGEMENT UPGRADE"],
      signalColors: ["red", "teal"],
      signalDetails: [
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.77,
          detectedAt: "2026-02-13",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Legacy staffing platform technology stack with limited automation; manual scheduling and credentialing workflows" },
            { provider: "G2 Reviews", dataPoint: "Healthcare facility clients requesting digital credentialing and real-time scheduling capabilities not available on current platform" }
          ],
          narrative: "Beacon Healthcare Staffing in Columbus is constrained by legacy technology and manual workflows, with the founder-CEO stretched thin managing $64M revenue growth across 60+ healthcare facilities."
        },
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.75,
          detectedAt: "2026-02-15",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Founder-CEO managing all functions without dedicated VP-level leadership; no COO, VP Sales, or VP Operations roles filled" },
            { provider: "Glassdoor", dataPoint: "Employee reviews highlight strong client relationships but cite need for professional management layer and career development paths" }
          ],
          narrative: "Beacon's strong client relationships across Ohio and Pennsylvania are hampered by a founder-CEO stretched thin without professional management, with margins below industry benchmarks indicating clear improvement potential."
        }
      ],
      ebitda: "$5.6M",
      ebitdaNum: 5.6,
      revenue: "$64M",
      evEstimate: "$45M",
      equityCheck: "$24M",
      processStage: "Initial Screening",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Management Referral",
      convictionFactors: {
        sectorFit: 60,
        mgmtQuality: 48,
        growthRunway: 58,
        ebitdaQuality: 52,
        dealComplexity: 45,
        competitiveProc: 55
      },
      thesisAlignments: ["Management Upgrade", "Operational Improvement"],
      notes: "Regional healthcare staffing firm serving 60+ facilities across Ohio and Pennsylvania. Founder-CEO stretched thin managing growth. Strong client relationships but needs professional management layer. Margins below industry benchmarks — clear improvement path.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$5.6M" },
        { label: "Source", value: "Management Referral" },
        { label: "Stage", value: "Initial Screening" }
      ]
    },

    // ─── NURTURE (6) ───
    {
      id: 21,
      company: "Trident Marine Services",
      sector: "Industrial Services",
      subsector: "Marine & Offshore Services",
      location: "New Orleans, LA",
      score: 42,
      tier: "NURTURE",
      signals: ["SECTOR CONSOLIDATOR", "REGULATORY TAILWIND"],
      signalColors: ["red", "blue"],
      signalDetails: [
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.73,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Gulf Coast marine inspection and maintenance market features 40+ independent operators; three PE-backed platforms emerging" },
            { provider: "IBISWorld", dataPoint: "Marine services industry consolidation driven by increasing regulatory complexity and capital requirements for compliance" }
          ],
          narrative: "Trident Marine Services in New Orleans operates in a fragmenting Gulf Coast marine services market with 40+ independent operators, though cyclicality concerns from O&G exposure warrant continued monitoring."
        },
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.71,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "Jones Act compliance requirements maintaining steady demand for domestic marine inspection and maintenance services" },
            { provider: "Compliance Week", dataPoint: "Enhanced maritime safety regulations increasing inspection frequency requirements for commercial vessels in Gulf region" }
          ],
          narrative: "Jones Act compliance requirements and enhanced maritime safety regulations create steady demand for Trident's Gulf Coast marine inspection services, though EBITDA quality needs improvement before investment."
        }
      ],
      ebitda: "$3.8M",
      ebitdaNum: 3.8,
      revenue: "$31M",
      evEstimate: "$30M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Operating Partner",
      convictionFactors: {
        sectorFit: 55,
        mgmtQuality: 48,
        growthRunway: 52,
        ebitdaQuality: 45,
        dealComplexity: 40,
        competitiveProc: 48
      },
      thesisAlignments: ["Platform M&A", "Market Expansion"],
      notes: "Gulf Coast marine inspection and maintenance services. Jones Act compliance requirements creating steady demand. Cyclicality concerns given O&G exposure. Monitoring for improved EBITDA quality and reduced customer concentration.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$3.8M" },
        { label: "Source", value: "Operating Partner" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 22,
      company: "Provident Accounting Group",
      sector: "Professional Services",
      subsector: "Accounting & Advisory",
      location: "Richmond, VA",
      score: 38,
      tier: "NURTURE",
      signals: ["FOUNDER SUCCESSION", "ADD-ON MAGNET"],
      signalColors: ["emerald", "violet"],
      signalDetails: [
        {
          type: "FOUNDER_SUCCESSION",
          label: "FOUNDER SUCCESSION",
          color: "emerald",
          confidence: 0.74,
          detectedAt: "2026-02-08",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Managing partner (age 66) planning retirement; succession plan not formalized within partnership structure" },
            { provider: "Exit Planning Institute", dataPoint: "Mid-Atlantic CPA firm succession timeline estimated at 18-24 months; partner buyout economics under review" }
          ],
          narrative: "Provident Accounting Group managing partner at age 66 is planning retirement with no formalized succession plan, though the $3.2M EBITDA is below standalone platform threshold in Richmond."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.70,
          detectedAt: "2026-02-14",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Axial Network", dataPoint: "Multiple CPA firm owners in Mid-Atlantic region approaching retirement; partner succession crisis affecting 40% of firms" },
            { provider: "IBISWorld", dataPoint: "Accounting industry consolidation accelerating; 60+ independent firms in Virginia and Maryland market seeking strategic options" }
          ],
          narrative: "Provident's audit and advisory practice in Richmond could serve as an add-on or reach scale through combination, as 40% of Mid-Atlantic CPA firms face partner succession challenges."
        }
      ],
      ebitda: "$3.2M",
      ebitdaNum: 3.2,
      revenue: "$18M",
      evEstimate: "$32M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "Rebecca Liu, Director",
      sourceChannel: "Advisor Network",
      convictionFactors: {
        sectorFit: 58,
        mgmtQuality: 42,
        growthRunway: 48,
        ebitdaQuality: 45,
        dealComplexity: 38,
        competitiveProc: 42
      },
      thesisAlignments: ["Platform M&A", "Add-On Acquisition"],
      notes: "Mid-Atlantic CPA firm with audit and advisory practice. Managing partner (age 66) planning retirement. Below-target EBITDA for standalone platform — better suited as add-on or requires additional scale before investment. Nurturing relationship for future window.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Rebecca Liu" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$3.2M" },
        { label: "Source", value: "Advisor Network" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 23,
      company: "Patriot Defense Logistics",
      sector: "Specialty M&D",
      subsector: "Defense Distribution",
      location: "Virginia Beach, VA",
      score: 35,
      tier: "NURTURE",
      signals: ["REGULATORY TAILWIND", "RECURRING MOAT"],
      signalColors: ["blue", "emerald"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.72,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "ITAR compliance requirements tightening for defense supply chain participants; new cybersecurity maturity model certification (CMMC) mandates" },
            { provider: "LexisNexis", dataPoint: "Defense procurement regulations expanding contractor compliance burden, favoring established ITAR-regulated suppliers" }
          ],
          narrative: "Patriot Defense Logistics in Virginia Beach benefits from tightening ITAR and CMMC compliance requirements that create barriers to entry for the defense supply chain and logistics market."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.69,
          detectedAt: "2026-02-13",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Long-term defense contracts with ITAR-regulated customer base; average contract duration exceeding 3 years" },
            { provider: "Gartner", dataPoint: "Defense logistics switching costs elevated due to security clearance requirements and supply chain certification processes" }
          ],
          narrative: "Patriot's ITAR-regulated customer base and long-term defense contracts create recurring revenue, though low margins from the pass-through distribution model and government concentration risk remain concerns."
        }
      ],
      ebitda: "$4.5M",
      ebitdaNum: 4.5,
      revenue: "$52M",
      evEstimate: "$36M",
      equityCheck: "$22M",
      processStage: "Monitoring",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Industry Conference",
      convictionFactors: {
        sectorFit: 52,
        mgmtQuality: 40,
        growthRunway: 45,
        ebitdaQuality: 38,
        dealComplexity: 35,
        competitiveProc: 40
      },
      thesisAlignments: ["Organic Growth", "Operational Improvement"],
      notes: "Defense supply chain and logistics provider. ITAR-regulated customer base with long-term contracts. Low margins relative to revenue due to pass-through distribution model. Monitoring for margin improvement and reduced government concentration risk.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$4.5M" },
        { label: "Source", value: "Industry Conference" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 24,
      company: "Skyline HVAC Holdings",
      sector: "Industrial Services",
      subsector: "Mechanical Services",
      location: "Phoenix, AZ",
      score: 32,
      tier: "NURTURE",
      signals: ["ADD-ON MAGNET", "MANAGEMENT UPGRADE"],
      signalColors: ["violet", "teal"],
      signalDetails: [
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.72,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Arizona commercial HVAC market features 30+ independent operators under $10M revenue suitable for tuck-in acquisitions" },
            { provider: "GF Data", dataPoint: "HVAC services add-on multiples ranging 4-6x EBITDA for sub-$5M EBITDA targets in Sunbelt markets" }
          ],
          narrative: "Skyline HVAC Holdings in Phoenix has strong recurring maintenance revenue but needs to reach $5M+ EBITDA before viable as a platform, with 30+ tuck-in targets identified in Arizona."
        },
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.68,
          detectedAt: "2026-02-16",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Owner-operator managing all functions with no professional management layer; limited back-office infrastructure at $26M revenue" },
            { provider: "Glassdoor", dataPoint: "Employee reviews indicate operational talent but lack of formal processes and career development structure" }
          ],
          narrative: "Skyline's below-threshold $3.5M EBITDA and lack of professional management require monitoring for organic growth trajectory before the Phoenix commercial HVAC platform becomes investable."
        }
      ],
      ebitda: "$3.5M",
      ebitdaNum: 3.5,
      revenue: "$26M",
      evEstimate: "$28M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Proprietary",
      convictionFactors: {
        sectorFit: 50,
        mgmtQuality: 35,
        growthRunway: 48,
        ebitdaQuality: 38,
        dealComplexity: 32,
        competitiveProc: 42
      },
      thesisAlignments: ["Platform M&A", "Management Upgrade"],
      notes: "Arizona commercial HVAC service provider. Strong recurring maintenance revenue but below-threshold EBITDA. Needs to reach $5M+ EBITDA before viable as platform. Monitoring organic growth trajectory and potential tuck-in combinations.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$3.5M" },
        { label: "Source", value: "Proprietary" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 25,
      company: "Crestview Data Analytics",
      sector: "Software & TES",
      subsector: "Data & Analytics",
      location: "Portland, OR",
      score: 29,
      tier: "NURTURE",
      signals: ["PLATFORM FATIGUE", "RECURRING MOAT"],
      signalColors: ["red", "emerald"],
      signalDetails: [
        {
          type: "PLATFORM_FATIGUE",
          label: "PLATFORM FATIGUE",
          color: "red",
          confidence: 0.72,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Niche analytics platform for food and beverage industry showing limited feature development velocity; founder-constrained R&D budget" },
            { provider: "StackShare", dataPoint: "Technology stack adequate but not scaling; lack of cloud-native architecture limits enterprise adoption potential" }
          ],
          narrative: "Crestview Data Analytics in Portland has interesting IP but below-scale $3.1M EBITDA, with the founder constrained from investing in the product roadmap needed to reach critical mass in food and beverage analytics."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.73,
          detectedAt: "2026-02-14",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "90% SaaS revenue with strong retention metrics; embedded in client supply chain and quality control workflows" },
            { provider: "Gartner", dataPoint: "Food and beverage analytics market growing at 9% CAGR; limited direct SaaS competitors in the niche vertical" }
          ],
          narrative: "Crestview's 90% SaaS revenue and strong retention create a defensible niche in food and beverage analytics, making it a compelling add-on candidate for an existing portfolio company at current EBITDA scale."
        }
      ],
      ebitda: "$3.1M",
      ebitdaNum: 3.1,
      revenue: "$16M",
      evEstimate: "$31M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Management Referral",
      convictionFactors: {
        sectorFit: 52,
        mgmtQuality: 38,
        growthRunway: 42,
        ebitdaQuality: 35,
        dealComplexity: 28,
        competitiveProc: 35
      },
      thesisAlignments: ["Organic Growth", "Operational Improvement"],
      notes: "Niche data analytics platform for food and beverage industry. Interesting IP but below-scale EBITDA. 90% SaaS revenue with strong retention. Monitoring for revenue growth to reach critical mass. Could be compelling add-on to existing portfolio company.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Software & TES" },
        { label: "EBITDA", value: "$3.1M" },
        { label: "Source", value: "Management Referral" },
        { label: "Stage", value: "Monitoring" }
      ]
    },
    {
      id: 26,
      company: "Redwood Staffing Partners",
      sector: "Professional Services",
      subsector: "Light Industrial Staffing",
      location: "Sacramento, CA",
      score: 26,
      tier: "NURTURE",
      signals: ["SECTOR CONSOLIDATOR", "MANAGEMENT UPGRADE"],
      signalColors: ["red", "teal"],
      signalDetails: [
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.70,
          detectedAt: "2026-02-11",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "IBISWorld", dataPoint: "California light industrial staffing market highly fragmented with 300+ independent operators; top 10 firms hold less than 20% share" },
            { provider: "PitchBook", dataPoint: "PE-backed staffing platforms accelerating West Coast consolidation; four roll-ups completed in trailing 12 months" }
          ],
          narrative: "Redwood Staffing Partners in Sacramento operates in a highly fragmented California light industrial staffing market with 300+ operators, though significant profitability improvement is needed before platform viability."
        },
        {
          type: "MANAGEMENT_UPGRADE",
          label: "MANAGEMENT UPGRADE",
          color: "teal",
          confidence: 0.68,
          detectedAt: "2026-02-16",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "LinkedIn Sales Navigator", dataPoint: "Owner-operator structure with no professional management team; high revenue ($42M) but low margins indicating operational inefficiency" },
            { provider: "Glassdoor", dataPoint: "Employee reviews cite need for improved processes, technology investment, and professional development infrastructure" }
          ],
          narrative: "Redwood's $42M revenue but low margins reflect significant management and operational improvement needs, with potential synergy through combination with the Beacon Healthcare Staffing thesis."
        }
      ],
      ebitda: "$3.4M",
      ebitdaNum: 3.4,
      revenue: "$42M",
      evEstimate: "$24M",
      equityCheck: "$20M",
      processStage: "Monitoring",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Advisor Network",
      convictionFactors: {
        sectorFit: 48,
        mgmtQuality: 32,
        growthRunway: 38,
        ebitdaQuality: 30,
        dealComplexity: 28,
        competitiveProc: 32
      },
      thesisAlignments: ["Management Upgrade", "Operational Improvement"],
      notes: "California light industrial staffing. High revenue but low margins typical of staffing. Significant management and operational improvement needed. Monitoring for improved profitability or potential combination with Beacon Healthcare Staffing thesis.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$3.4M" },
        { label: "Source", value: "Advisor Network" },
        { label: "Stage", value: "Monitoring" }
      ]
    },

    // ─── STRATEGIC (4) ───
    {
      id: 27,
      company: "Pacific Rim Logistics",
      sector: "Industrial Services",
      subsector: "Freight & Logistics",
      location: "Long Beach, CA",
      score: 22,
      tier: "STRATEGIC",
      signals: ["CARVE-OUT CANDIDATE", "SECTOR CONSOLIDATOR"],
      signalColors: ["amber", "red"],
      signalDetails: [
        {
          type: "CARVE_OUT_CANDIDATE",
          label: "CARVE-OUT CANDIDATE",
          color: "amber",
          confidence: 0.67,
          detectedAt: "2026-02-07",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "SEC EDGAR", dataPoint: "Asian shipping conglomerate parent disclosed potential divestiture of West Coast logistics operations in annual report" },
            { provider: "Bloomberg", dataPoint: "Parent company strategic review driven by portfolio simplification; Pacific Rim operations identified as non-core to Asian trade lane focus" }
          ],
          narrative: "Pacific Rim Logistics in Long Beach is a potential carve-out from an Asian shipping conglomerate, though the $114M EV exceeds ACP's typical check size and falls outside core sector expertise."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.63,
          detectedAt: "2026-02-13",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "West Coast freight and logistics sector seeing increased PE consolidation activity; 6 platform deals in trailing 18 months" },
            { provider: "Preqin", dataPoint: "Logistics sector fundraising up 35% YoY; multiple sector-specialist funds actively deploying in West Coast markets" }
          ],
          narrative: "Pacific Rim's West Coast logistics operations present a strategic watch opportunity, with potential partnership with a sector-specialist co-investor needed given the above-threshold check size."
        }
      ],
      ebitda: "$14.2M",
      ebitdaNum: 14.2,
      revenue: "$120M",
      evEstimate: "$114M",
      equityCheck: "$60M",
      processStage: "Strategic Watch",
      dealLead: "James Harrington, Partner",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 40,
        mgmtQuality: 30,
        growthRunway: 25,
        ebitdaQuality: 22,
        dealComplexity: 18,
        competitiveProc: 20
      },
      thesisAlignments: ["Platform M&A", "Operational Improvement"],
      notes: "West Coast logistics operation — potential carve-out from Asian shipping conglomerate. Well above typical check size and outside core sector expertise. Watching for potential partnership opportunity with sector-specialist co-investor.",
      keyIntelligence: [
        { label: "Deal Lead", value: "James Harrington" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$14.2M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "Strategic Watch" }
      ]
    },
    {
      id: 28,
      company: "Magnolia Health Systems",
      sector: "Professional Services",
      subsector: "Behavioral Health",
      location: "Memphis, TN",
      score: 18,
      tier: "STRATEGIC",
      signals: ["REGULATORY TAILWIND", "ADD-ON MAGNET"],
      signalColors: ["blue", "violet"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.65,
          detectedAt: "2026-02-09",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "Mental health parity enforcement strengthening; new CMS behavioral health reimbursement codes expanding coverage scope" },
            { provider: "IBISWorld", dataPoint: "Behavioral health services market growing at 8.5% CAGR driven by mental health parity laws and expanded insurance coverage" }
          ],
          narrative: "Magnolia Health Systems in Memphis benefits from mental health parity law enforcement and expanded reimbursement, though regulatory complexity and reimbursement risk fall outside ACP's core competency."
        },
        {
          type: "ADD_ON_MAGNET",
          label: "ADD-ON MAGNET",
          color: "violet",
          confidence: 0.62,
          detectedAt: "2026-02-15",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Southeast behavioral health market features 100+ independent providers suitable for consolidation; average target revenue $3-10M" },
            { provider: "Axial Network", dataPoint: "Multiple behavioral health practice owners in Tennessee and surrounding states exploring strategic options due to operational burden" }
          ],
          narrative: "Magnolia's $6.8M EBITDA behavioral health platform in Memphis has attractive market dynamics for add-on consolidation, but remains a strategic watch as ACP builds sector expertise and evaluates reimbursement risk."
        }
      ],
      ebitda: "$6.8M",
      ebitdaNum: 6.8,
      revenue: "$45M",
      evEstimate: "$68M",
      equityCheck: "$36M",
      processStage: "Strategic Watch",
      dealLead: "Michael Torres, Partner",
      sourceChannel: "Operating Partner",
      convictionFactors: {
        sectorFit: 35,
        mgmtQuality: 22,
        growthRunway: 30,
        ebitdaQuality: 20,
        dealComplexity: 15,
        competitiveProc: 18
      },
      thesisAlignments: ["Market Expansion", "Add-On Acquisition"],
      notes: "Behavioral health services provider. Mental health parity laws driving demand. Attractive market dynamics but regulatory complexity and reimbursement risk outside core competency. Strategic watch for sector learning and potential future entry.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Michael Torres" },
        { label: "Sector", value: "Professional Services" },
        { label: "EBITDA", value: "$6.8M" },
        { label: "Source", value: "Operating Partner" },
        { label: "Stage", value: "Strategic Watch" }
      ]
    },
    {
      id: 29,
      company: "Sterling Aerospace Components",
      sector: "Specialty M&D",
      subsector: "Aerospace Parts",
      location: "Wichita, KS",
      score: 14,
      tier: "STRATEGIC",
      signals: ["CARVE-OUT CANDIDATE", "RECURRING MOAT"],
      signalColors: ["amber", "emerald"],
      signalDetails: [
        {
          type: "CARVE_OUT_CANDIDATE",
          label: "CARVE-OUT CANDIDATE",
          color: "amber",
          confidence: 0.64,
          detectedAt: "2026-02-08",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "SEC EDGAR", dataPoint: "UK parent company disclosed divestiture plans for non-core aerospace aftermarket operations in half-year trading update" },
            { provider: "S&P Capital IQ", dataPoint: "Sterling Aerospace identified as non-strategic asset; parent pursuing UK defense prime contractor strategy requiring capital redeployment" }
          ],
          narrative: "Sterling Aerospace Components in Wichita is being divested by its UK parent as a non-core asset, though the $93M EV is above ACP's target and falls outside core sector focus."
        },
        {
          type: "RECURRING_MOAT",
          label: "RECURRING MOAT",
          color: "emerald",
          confidence: 0.61,
          detectedAt: "2026-02-12",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "BuiltWith", dataPoint: "Strong recurring revenue from MRO contracts with aerospace OEMs; average contract duration 4+ years with auto-renewal provisions" },
            { provider: "Gartner", dataPoint: "Aerospace aftermarket parts distribution benefits from FAA certification requirements creating 24-36 month switching barriers" }
          ],
          narrative: "Sterling's MRO contract base and FAA-certified aftermarket parts distribution create a durable recurring moat, though ACP is tracking for potential co-investment with an aerospace-specialist fund."
        }
      ],
      ebitda: "$11.6M",
      ebitdaNum: 11.6,
      revenue: "$78M",
      evEstimate: "$93M",
      equityCheck: "$50M",
      processStage: "Strategic Watch",
      dealLead: "David Chen, Managing Director",
      sourceChannel: "Banker Outreach",
      convictionFactors: {
        sectorFit: 30,
        mgmtQuality: 18,
        growthRunway: 22,
        ebitdaQuality: 18,
        dealComplexity: 12,
        competitiveProc: 15
      },
      thesisAlignments: ["Operational Improvement", "Organic Growth"],
      notes: "Aerospace aftermarket parts distributor being divested by UK parent. Strong recurring revenue from MRO contracts. Above target EV and outside core sector focus. Tracking for potential co-invest with aerospace-specialist fund.",
      keyIntelligence: [
        { label: "Deal Lead", value: "David Chen" },
        { label: "Sector", value: "Specialty M&D" },
        { label: "EBITDA", value: "$11.6M" },
        { label: "Source", value: "Banker Outreach" },
        { label: "Stage", value: "Strategic Watch" }
      ]
    },
    {
      id: 30,
      company: "Evergreen Waste Solutions",
      sector: "Industrial Services",
      subsector: "Waste Management",
      location: "Portland, OR",
      score: 11,
      tier: "STRATEGIC",
      signals: ["REGULATORY TAILWIND", "SECTOR CONSOLIDATOR"],
      signalColors: ["blue", "red"],
      signalDetails: [
        {
          type: "REGULATORY_TAILWIND",
          label: "REGULATORY TAILWIND",
          color: "blue",
          confidence: 0.63,
          detectedAt: "2026-02-10",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "Federal Register", dataPoint: "Extended Producer Responsibility (EPR) legislation advancing in Oregon and Washington; mandating producer-funded recycling programs" },
            { provider: "IBISWorld", dataPoint: "Waste and recycling services market in Pacific Northwest growing at 6.8% CAGR driven by EPR mandates and sustainability regulation" }
          ],
          narrative: "Evergreen Waste Solutions in Portland benefits from EPR legislation driving long-term demand, though the capital-intensive waste management business model falls outside ACP's typical investment profile."
        },
        {
          type: "SECTOR_CONSOLIDATOR",
          label: "SECTOR CONSOLIDATOR",
          color: "red",
          confidence: 0.60,
          detectedAt: "2026-02-14",
          lastVerified: "2026-02-24",
          status: "ACTIVE",
          sources: [
            { provider: "PitchBook", dataPoint: "Pacific Northwest waste services market features 50+ independent operators; PE-backed platforms actively acquiring in adjacent Western states" },
            { provider: "Preqin", dataPoint: "Waste management sector attracting increased PE interest; three new sector-focused funds raised in past 18 months totaling $2.5B" }
          ],
          narrative: "Evergreen's $8.3M EBITDA Pacific Northwest waste platform has consolidation potential across 50+ operators, but ACP is monitoring for a potential entry through the less capital-intensive services segment."
        }
      ],
      ebitda: "$8.3M",
      ebitdaNum: 8.3,
      revenue: "$56M",
      evEstimate: "$66M",
      equityCheck: "$36M",
      processStage: "Strategic Watch",
      dealLead: "Sarah Donovan, Managing Director",
      sourceChannel: "Industry Conference",
      convictionFactors: {
        sectorFit: 28,
        mgmtQuality: 15,
        growthRunway: 20,
        ebitdaQuality: 15,
        dealComplexity: 10,
        competitiveProc: 12
      },
      thesisAlignments: ["Platform M&A", "Market Expansion"],
      notes: "Pacific Northwest waste and recycling services. EPR legislation driving long-term demand. Capital-intensive business model outside typical ACP profile. Strategic watch — monitoring for potential entry through less capital-intensive services segment.",
      keyIntelligence: [
        { label: "Deal Lead", value: "Sarah Donovan" },
        { label: "Sector", value: "Industrial Services" },
        { label: "EBITDA", value: "$8.3M" },
        { label: "Source", value: "Industry Conference" },
        { label: "Stage", value: "Strategic Watch" }
      ]
    }
  ];


  // ── 3. Sourcing Agents (5) ──
  Data.agents = [
    {
      id: "signal-hunter",
      name: "Signal Hunter",
      subtitle: "The Eyes",
      color: "emerald",
      badgeColor: "#34D399",
      description: "Monitors founder liquidity events, platform fatigue signals, regulatory triggers, and carve-out activity across target sectors. Scans SEC filings, industry publications, M&A databases, estate planning records, and proprietary networks.",
      stats: { sources: "60+", latency: "2-6 hrs", signals: "8 types" },
      simulationSteps: [
        { time: "00:00", text: "Signal detected: Apex Compliance Services founder (age 62) initiated estate planning with succession advisory firm Bridgepoint Advisors" },
        { time: "00:01", text: "Cross-referencing with deal pipeline... Apex already flagged in Software & TES sector lane with $11.5M EBITDA" },
        { time: "00:03", text: "Scanning related entities... no competitive process indicators detected. Proprietary window confirmed" },
        { time: "00:05", text: "Signal strength: HIGH. Routing to Deal Qualifier for scoring against Fund III investment criteria" },
        { time: "00:06", text: "Secondary signal: Heritage Building Products owner (age 59, 2nd generation) contacted two regional investment banks for exploratory conversations" },
        { time: "00:08", text: "Alert: New OSHA enforcement rule published — mapping to Sentinel Safety Solutions regulatory tailwind thesis" }
      ]
    },
    {
      id: "deal-qualifier",
      name: "Deal Qualifier",
      subtitle: "The Brain",
      color: "blue",
      badgeColor: "#3B82F6",
      description: "Scores acquisition targets against ACP investment criteria: EBITDA quality, management depth, sector fit, growth runway, deal complexity, and competitive process risk. Generates conviction scores and tier recommendations.",
      stats: { criteria: "42", models: "6", accuracy: "87%" },
      simulationSteps: [
        { time: "00:00", text: "Received Signal Hunter handoff: Apex Compliance Services — founder succession signal confirmed" },
        { time: "00:02", text: "Running conviction scoring model... Sector Fit: 95 | Mgmt Quality: 88 | Growth Runway: 85 | EBITDA Quality: 92" },
        { time: "00:04", text: "Deal complexity assessment: moderate (80/100). Single founder, clean cap table, no institutional investors" },
        { time: "00:06", text: "Competitive process risk: LOW (95/100). No banker engagement detected. Proprietary channel via James Harrington" },
        { time: "00:08", text: "Composite conviction score: 93. Tier recommendation: HOT. Routing to Thesis Builder for investment memo framework" },
        { time: "00:10", text: "Comparable transaction analysis: 5 RegTech deals at 8-10x EBITDA in trailing 18 months. Apex EV estimate: $103M at 9x" }
      ]
    },
    {
      id: "thesis-builder",
      name: "Thesis Builder",
      subtitle: "The Architect",
      color: "violet",
      badgeColor: "#A78BFA",
      description: "Generates investment thesis narratives, value creation plans, and IC memo frameworks. Maps thesis alignment to ACP playbooks: Platform M&A, organic growth, operational improvement, add-on acquisition, management upgrade, and market expansion.",
      stats: { templates: "12", theses: "6", memos: "30+" },
      simulationSteps: [
        { time: "00:00", text: "Thesis construction initiated for Apex Compliance Services (RegTech / Compliance SaaS)" },
        { time: "00:03", text: "Primary thesis: Platform M&A — Apex as hub for compliance software consolidation across adjacent verticals (HR compliance, ESG reporting, SOX)" },
        { time: "00:06", text: "Secondary thesis: Organic Growth — 94% recurring revenue with 118% net expansion provides strong organic flywheel" },
        { time: "00:09", text: "Add-on pipeline mapped: 7 targets identified in compliance SaaS vertical ($2-5M EBITDA range). 3 targets have confirmed founder succession signals" },
        { time: "00:12", text: "Investment memo framework generated: 5-year value creation plan projects $11.5M to $28M EBITDA through platform + 3 add-ons + organic growth" },
        { time: "00:15", text: "Thesis confidence: HIGH. Alignment with Fund III mandate: STRONG. Routing to Value Modeler for financial projections" }
      ]
    },
    {
      id: "value-modeler",
      name: "Value Modeler",
      subtitle: "The Calculator",
      color: "amber",
      badgeColor: "#F59E0B",
      description: "Projects EBITDA bridges, models add-on economics, builds exit scenario analyses, and calculates returns across base, upside, and downside cases. Integrates with ACP proprietary benchmarking data across 125+ acquisitions.",
      stats: { scenarios: "3", metrics: "25+", benchmarks: "125 deals" },
      simulationSteps: [
        { time: "00:00", text: "Financial model initiated for Apex Compliance Services. Entry EBITDA: $11.5M at 9.0x ($103M EV)" },
        { time: "00:04", text: "EBITDA bridge (5-year): Organic growth +$4.2M | Margin expansion +$1.8M | Add-on contribution +$10.5M | Total exit EBITDA: $28.0M" },
        { time: "00:08", text: "Exit scenario analysis: Base case 8.5x ($238M, 3.1x MOIC) | Upside 10x ($280M, 3.7x MOIC) | Downside 7x ($196M, 2.5x MOIC)" },
        { time: "00:12", text: "Add-on economics: 3 acquisitions at 5-6x EBITDA, $15M cumulative capital deployed. Blended entry multiple drops from 9.0x to 6.8x" },
        { time: "00:15", text: "IRR projections: Base 28% | Upside 35% | Downside 20%. All scenarios exceed Fund III hurdle rate of 20%" },
        { time: "00:18", text: "Sensitivity analysis complete. Model exported to IC package. Key risk: founder transition execution and management recruitment timeline" }
      ]
    },
    {
      id: "portfolio-monitor",
      name: "Portfolio Monitor",
      subtitle: "The Memory",
      color: "red",
      badgeColor: "#EF4444",
      description: "Tracks portfolio company performance, monitors exit readiness signals, flags sector concentration risk, and identifies cross-portfolio synergies. Maintains institutional knowledge across all 125+ ACP acquisitions and 95 add-ons.",
      stats: { companies: "125+", addOns: "95", exitReady: "8" },
      simulationSteps: [
        { time: "00:00", text: "Portfolio pulse check initiated across 15 active holdings. Scanning Q4 financial updates and board reporting packages" },
        { time: "00:04", text: "E Source (Software & TES): 14th add-on completed. Platform EBITDA now $22M, up from $4.5M at entry. Exit readiness: HIGH" },
        { time: "00:08", text: "Alert: Sector concentration in Industrial Services approaching 35% of Fund III deployed capital. Risk threshold is 40%" },
        { time: "00:12", text: "Cross-portfolio opportunity: Clarion Technologies (IT managed services) could be strategic add-on buyer for smaller MSP targets in current pipeline" },
        { time: "00:15", text: "Exit window analysis: 3 portfolio companies (E Source, VetEvolve, Summit Safety) meeting exit criteria. Strategic buyer interest confirmed for VetEvolve" },
        { time: "00:18", text: "Portfolio summary: 12 active, 3 exit-ready, weighted average MOIC 2.8x, aggregate portfolio EBITDA growth of 18% YoY" }
      ]
    }
  ];


  // ── 4. Competitors (7 PE firms) ──
  Data.competitors = [
    {
      id: "bluepoint",
      name: "Blue Point Capital Partners",
      threatLevel: "HIGH",
      marketShare: "18%",
      description: "Cleveland-based lower-middle-market PE firm with $3B+ AUM. Strong industrial services and specialty manufacturing focus. Aggressive add-on strategy with deep operating partner bench.",
      strengths: [
        "Deep industrial sector expertise and operating playbook",
        "Strong banker relationships in Midwest and Southeast",
        "Experienced add-on integration team with dedicated M&A resources"
      ],
      vulnerabilities: [
        "Limited software and technology-enabled services capability",
        "Slower decisioning process due to larger fund committee structure",
        "Less flexible on deal structure and earn-out arrangements"
      ],
      whereACPWins: "ACP wins on speed-to-close in proprietary situations and has stronger technology sector expertise. Blue Point's committee structure creates 2-3 week delays that ACP can exploit in competitive timing.",
      metrics: { deals: "4-6/yr", checkSize: "$25-75M", sectors: "Industrials, Specialty Mfg" }
    },
    {
      id: "benford",
      name: "Benford Capital Partners",
      threatLevel: "HIGH",
      marketShare: "15%",
      description: "Chicago-based PE firm focused on services and distribution businesses in the $5-15M EBITDA range. Known for founder-friendly deal structures and relationship-driven sourcing.",
      strengths: [
        "Founder-friendly reputation drives proprietary deal flow",
        "Flexible deal structures including minority recaps and earn-outs",
        "Strong track record in professional services and healthcare services"
      ],
      vulnerabilities: [
        "Smaller operating team limits post-close value creation capacity",
        "Historically slower to deploy add-on capital post-platform acquisition",
        "Limited West Coast presence and deal origination"
      ],
      whereACPWins: "ACP's larger operating partner network and proven add-on execution track record (95 completed add-ons) gives a decisive edge in Platform M&A thesis pitches to founder-sellers who want growth, not just liquidity.",
      metrics: { deals: "3-5/yr", checkSize: "$20-60M", sectors: "Services, Distribution" }
    },
    {
      id: "hci",
      name: "HCI Equity Partners",
      threatLevel: "MEDIUM",
      marketShare: "12%",
      description: "Washington DC-based lower-middle-market firm with government services and professional services expertise. Strong presence in Mid-Atlantic corridor.",
      strengths: [
        "Deep government services and regulatory compliance expertise",
        "Strong Mid-Atlantic network with DC-area professional services firms",
        "Proven thesis around mission-critical service businesses"
      ],
      vulnerabilities: [
        "Geographic concentration in Mid-Atlantic limits national deal flow",
        "Government services exposure creates policy and budget cycle risk",
        "Smaller fund size limits ability to compete on larger platform deals"
      ],
      whereACPWins: "ACP's national footprint and sector diversification across 4 lanes provides broader deal access. ACP can also move faster on deals outside HCI's core government services comfort zone.",
      metrics: { deals: "3-4/yr", checkSize: "$15-50M", sectors: "Gov Services, Professional Svcs" }
    },
    {
      id: "halifax",
      name: "Halifax Group",
      threatLevel: "MEDIUM",
      marketShare: "10%",
      description: "Washington DC-based PE firm investing in services, technology, and government businesses. Multi-fund platform with both equity and credit strategies.",
      strengths: [
        "Multi-strategy platform provides flexible capital solutions",
        "Strong technology and government technology portfolio",
        "Active board participation drives governance improvement"
      ],
      vulnerabilities: [
        "Multi-strategy complexity can slow decision-making on equity deals",
        "Credit arm occasionally creates conflicts with equity opportunities",
        "Less experienced in pure industrial and manufacturing sectors"
      ],
      whereACPWins: "ACP's single-strategy focus on equity creates cleaner alignment with sellers. No conflicts between credit and equity arms. Simpler decision-making process appeals to founder-sellers.",
      metrics: { deals: "3-5/yr", checkSize: "$20-65M", sectors: "Technology, Gov Tech, Services" }
    },
    {
      id: "rotunda",
      name: "Rotunda Capital Partners",
      threatLevel: "MEDIUM",
      marketShare: "9%",
      description: "Bethesda-based lower-middle-market firm focused on founder-owned businesses. Strong in business services, specialty distribution, and niche manufacturing.",
      strengths: [
        "Excellent founder-owner reputation and referral network",
        "Flexible on deal size with ability to grow into larger opportunities",
        "Deep business services expertise with multiple successful platforms"
      ],
      vulnerabilities: [
        "Smaller team limits bandwidth for concurrent active deals",
        "Less sophisticated data-driven sourcing compared to larger competitors",
        "Geographic bias toward Mid-Atlantic and Southeast"
      ],
      whereACPWins: "ACP's AI-enabled sourcing platform identifies signals weeks before traditional relationship-based sourcing. Scale advantage with 125+ acquisitions provides unmatched pattern recognition for deal qualification.",
      metrics: { deals: "2-4/yr", checkSize: "$15-50M", sectors: "Business Services, Distribution" }
    },
    {
      id: "centergate",
      name: "CenterGate Capital",
      threatLevel: "LOW",
      marketShare: "8%",
      description: "Dallas-based PE firm focused on lower-middle-market businesses in Texas and the broader Southwest. Industry focus on services, distribution, and healthcare services.",
      strengths: [
        "Dominant position in Texas and Southwest deal flow",
        "Strong healthcare services track record and relationships",
        "Deep relationships with regional investment banks and brokers"
      ],
      vulnerabilities: [
        "Almost exclusively regional — limited presence outside Texas and Southwest",
        "Smaller fund limits ability to compete on platform deals above $60M EV",
        "Less experienced in technology and software investments"
      ],
      whereACPWins: "ACP competes effectively in Texas through national banker relationships while CenterGate cannot reciprocate nationally. ACP's technology and software capability covers sectors CenterGate cannot access.",
      metrics: { deals: "2-3/yr", checkSize: "$15-45M", sectors: "Services, Healthcare, Distribution" }
    },
    {
      id: "incline",
      name: "Incline Equity Partners",
      threatLevel: "LOW",
      marketShare: "7%",
      description: "Pittsburgh-based PE firm investing in distribution, services, and manufacturing businesses. Known for operational value creation with hands-on approach.",
      strengths: [
        "Proven operational value creation playbook in distribution and manufacturing",
        "Strong Rust Belt and Midwest sourcing network",
        "Experienced at complex carve-out transactions"
      ],
      vulnerabilities: [
        "Heavy industrial and manufacturing tilt may limit deal flow in growth sectors",
        "Less active in services and technology verticals",
        "Relationship-dependent sourcing without technology augmentation"
      ],
      whereACPWins: "ACP's balanced sector strategy across 4 lanes generates more pipeline diversity. AI-powered signal detection identifies proprietary situations that Incline's relationship-only model misses.",
      metrics: { deals: "2-4/yr", checkSize: "$20-60M", sectors: "Distribution, Manufacturing" }
    }
  ];


  // ── 5. Portfolio Companies (15) ──
  Data.portfolioCompanies = [
    {
      id: "esource",
      company: "E Source",
      sector: "Software & TES",
      description: "Energy analytics and advisory platform serving utilities and energy companies",
      hq: "Boulder, CO",
      investmentDate: "2018",
      exitDate: null,
      addOns: 14,
      status: "Active",
      keyMetric: "14 add-ons completed"
    },
    {
      id: "vetevolve",
      company: "VetEvolve",
      sector: "Professional Services",
      description: "Veterinary practice management and consolidation platform",
      hq: "Richmond, VA",
      investmentDate: "2019",
      exitDate: null,
      addOns: 19,
      status: "Active",
      keyMetric: "19 clinics acquired, 3.5x MOIC on paper"
    },
    {
      id: "proceed",
      company: "Proceed Finance",
      sector: "Software & TES",
      description: "Patient financing platform for elective healthcare procedures",
      hq: "Scottsdale, AZ",
      investmentDate: "2020",
      exitDate: null,
      addOns: 2,
      status: "Active",
      keyMetric: "$850M+ financed through platform"
    },
    {
      id: "summitsafety",
      company: "Summit Safety",
      sector: "Industrial Services",
      description: "Workplace safety compliance and training services platform",
      hq: "Charlotte, NC",
      investmentDate: "2021",
      exitDate: null,
      addOns: 7,
      status: "Active",
      keyMetric: "7 add-ons, 22% organic growth"
    },
    {
      id: "clarion",
      company: "Clarion Technologies",
      sector: "Software & TES",
      description: "Managed IT services and cybersecurity platform for mid-market enterprises",
      hq: "Grand Rapids, MI",
      investmentDate: "2021",
      exitDate: null,
      addOns: 5,
      status: "Active",
      keyMetric: "5 MSP add-ons, $38M ARR"
    },
    {
      id: "patriotroof",
      company: "Patriot Roofing Group",
      sector: "Industrial Services",
      description: "Commercial roofing services platform across Southeast US",
      hq: "Tampa, FL",
      investmentDate: "2020",
      exitDate: null,
      addOns: 8,
      status: "Active",
      keyMetric: "8 add-ons across 6 states"
    },
    {
      id: "sterling",
      company: "Sterling Dental Partners",
      sector: "Professional Services",
      description: "Multi-location dental practice management organization",
      hq: "Nashville, TN",
      investmentDate: "2022",
      exitDate: null,
      addOns: 11,
      status: "Active",
      keyMetric: "11 practices, 45 dentists"
    },
    {
      id: "meridianpack",
      company: "Meridian Packaging",
      sector: "Specialty M&D",
      description: "Specialty packaging solutions for pharmaceutical and nutraceutical industries",
      hq: "Indianapolis, IN",
      investmentDate: "2022",
      exitDate: null,
      addOns: 3,
      status: "Active",
      keyMetric: "3 add-ons, FDA-regulated moat"
    },
    {
      id: "apexenv",
      company: "Apex Environmental",
      sector: "Industrial Services",
      description: "Environmental remediation and compliance services platform",
      hq: "Houston, TX",
      investmentDate: "2023",
      exitDate: null,
      addOns: 4,
      status: "Active",
      keyMetric: "4 add-ons in first 18 months"
    },
    {
      id: "truebridge",
      company: "Truebridge Analytics",
      sector: "Software & TES",
      description: "Supply chain analytics and optimization platform",
      hq: "Chicago, IL",
      investmentDate: "2023",
      exitDate: null,
      addOns: 1,
      status: "Active",
      keyMetric: "110% net revenue retention"
    },
    {
      id: "ironwood",
      company: "Ironwood Engineering",
      sector: "Professional Services",
      description: "Civil and structural engineering consulting firm — exited to strategic",
      hq: "Denver, CO",
      investmentDate: "2017",
      exitDate: "2021",
      addOns: 6,
      status: "Exited",
      keyMetric: "Exited at 4.2x MOIC"
    },
    {
      id: "greystone",
      company: "Greystone Distribution",
      sector: "Specialty M&D",
      description: "Specialty fastener and industrial supplies distributor — exited to PE sponsor",
      hq: "Milwaukee, WI",
      investmentDate: "2016",
      exitDate: "2020",
      addOns: 9,
      status: "Exited",
      keyMetric: "Exited at 3.8x MOIC"
    },
    {
      id: "pinnacletech",
      company: "Pinnacle Tech Services",
      sector: "Software & TES",
      description: "IT consulting and managed services — exited to strategic acquirer",
      hq: "Dallas, TX",
      investmentDate: "2017",
      exitDate: "2022",
      addOns: 12,
      status: "Exited",
      keyMetric: "Exited at 5.1x MOIC, 12 add-ons"
    },
    {
      id: "cascademed",
      company: "Cascade Medical Group",
      sector: "Professional Services",
      description: "Multi-specialty physician practice management — exited to health system",
      hq: "Portland, OR",
      investmentDate: "2018",
      exitDate: "2023",
      addOns: 8,
      status: "Exited",
      keyMetric: "Exited at 3.2x MOIC"
    },
    {
      id: "horizonind",
      company: "Horizon Industrial Services",
      sector: "Industrial Services",
      description: "Industrial staffing and maintenance services — monitoring performance",
      hq: "Birmingham, AL",
      investmentDate: "2024",
      exitDate: null,
      addOns: 0,
      status: "Monitoring",
      keyMetric: "Post-close integration in progress"
    }
  ];


  // ── 6. Roadmap Phases (4) ──
  Data.roadmapPhases = [
    {
      id: "foundation",
      name: "Foundation",
      subtitle: "Signal Architecture & Data Pipeline",
      weeks: "Weeks 1-2",
      status: "READY",
      statusColor: "emerald",
      investment: "$15,000",
      tasks: [
        { name: "Signal taxonomy build (8 types)", hours: "20H" },
        { name: "Data source integration (60+ sources)", hours: "30H" },
        { name: "Conviction scoring engine", hours: "40H" },
        { name: "Dashboard MVP with 30 targets", hours: "20H" }
      ],
      metrics: [
        { label: "Signal Types", value: "8" },
        { label: "Data Sources", value: "60+" },
        { label: "Targets", value: "30" }
      ],
      deliverable: "Working pipeline with 30 scored targets, conviction scoring engine across 6 dimensions, and signal detection framework covering 8 signal types across 4 sector lanes."
    },
    {
      id: "pipeline-intelligence",
      name: "Pipeline Intelligence",
      subtitle: "Target Identification & Qualification",
      weeks: "Weeks 3-6",
      status: "NEXT",
      statusColor: "blue",
      investment: "$28,000",
      tasks: [
        { name: "Automated signal monitoring", hours: "35H" },
        { name: "Target qualification workflows", hours: "30H" },
        { name: "Investment thesis generation", hours: "40H" },
        { name: "Competitive intelligence mapping", hours: "25H" }
      ],
      metrics: [
        { label: "Qualified Targets", value: "100+" },
        { label: "Thesis Templates", value: "12" },
        { label: "Competitors Mapped", value: "7" }
      ],
      deliverable: "Automated signal monitoring across 60+ sources with real-time alerts. Qualification engine producing conviction-scored targets with auto-generated investment thesis frameworks and competitive positioning."
    },
    {
      id: "value-creation",
      name: "Value Creation Engine",
      subtitle: "EBITDA Bridge Modeling & Exit Scenarios",
      weeks: "Weeks 7-10",
      status: "PLANNED",
      statusColor: "amber",
      investment: "$32,000",
      tasks: [
        { name: "EBITDA bridge modeling", hours: "45H" },
        { name: "Add-on economics calculator", hours: "30H" },
        { name: "Exit scenario analysis", hours: "35H" },
        { name: "Sensitivity analysis framework", hours: "25H" }
      ],
      metrics: [
        { label: "Scenarios", value: "3 per deal" },
        { label: "Benchmarks", value: "125 deals" },
        { label: "Add-On Models", value: "Dynamic" }
      ],
      deliverable: "Full financial modeling suite with EBITDA bridge projections, add-on economics, 3-scenario exit analysis (base/upside/downside), and sensitivity testing calibrated against 125+ historical ACP transactions."
    },
    {
      id: "portfolio-intelligence",
      name: "Portfolio Intelligence",
      subtitle: "Performance Tracking & Exit Readiness",
      weeks: "Weeks 11-14",
      status: "PLANNED",
      statusColor: "violet",
      investment: "$25,000",
      tasks: [
        { name: "Portfolio performance dashboard", hours: "35H" },
        { name: "Exit readiness scoring", hours: "25H" },
        { name: "Sector concentration alerts", hours: "20H" },
        { name: "Cross-portfolio synergy mapping", hours: "30H" }
      ],
      metrics: [
        { label: "Portfolio Cos", value: "15" },
        { label: "Exit Signals", value: "Real-time" },
        { label: "Synergies", value: "Mapped" }
      ],
      deliverable: "Portfolio intelligence layer tracking 15 active holdings with exit readiness scoring, sector concentration risk monitoring, and cross-portfolio synergy identification for add-on routing."
    }
  ];


  // ── 7. Sector Lanes (4) ──
  Data.sectorLanes = [
    {
      id: "software-tes",
      name: "Software & TES",
      subtitle: "Technology-Enabled Services",
      weeks: "Fund III Focus",
      status: "PRIMARY",
      statusColor: "emerald",
      investment: "$180M deployed",
      tasks: [
        { name: "Vertical SaaS platforms", hours: "6 cos" },
        { name: "IT managed services", hours: "4 cos" },
        { name: "Data & analytics providers", hours: "3 cos" }
      ],
      metrics: [
        { label: "Portfolio Cos", value: "13" },
        { label: "Avg EBITDA", value: "$7.2M" },
        { label: "Add-Ons", value: "34" }
      ],
      deliverable: "Focus on mission-critical, recurring revenue software and services businesses with high retention rates. Target 85%+ recurring revenue, 90%+ gross retention, and clear platform M&A thesis."
    },
    {
      id: "professional-services",
      name: "Professional Services",
      subtitle: "Knowledge & Advisory",
      weeks: "Fund II-III",
      status: "PRIMARY",
      statusColor: "blue",
      investment: "$145M deployed",
      tasks: [
        { name: "Financial advisory & consulting", hours: "5 cos" },
        { name: "Healthcare services platforms", hours: "4 cos" },
        { name: "Testing & certification", hours: "2 cos" }
      ],
      metrics: [
        { label: "Portfolio Cos", value: "11" },
        { label: "Avg EBITDA", value: "$5.8M" },
        { label: "Add-Ons", value: "28" }
      ],
      deliverable: "Target knowledge-intensive professional services firms with high client retention, recurring engagement models, and fragmented competitive landscapes suitable for buy-and-build strategies."
    },
    {
      id: "industrial-services",
      name: "Industrial Services",
      subtitle: "Essential & Regulated Services",
      weeks: "Fund I-III",
      status: "CORE",
      statusColor: "amber",
      investment: "$210M deployed",
      tasks: [
        { name: "Environmental & safety services", hours: "7 cos" },
        { name: "Facility services & maintenance", hours: "5 cos" },
        { name: "Specialty inspection & testing", hours: "3 cos" }
      ],
      metrics: [
        { label: "Portfolio Cos", value: "15" },
        { label: "Avg EBITDA", value: "$6.5M" },
        { label: "Add-Ons", value: "22" }
      ],
      deliverable: "Core franchise in essential, regulation-driven industrial services. Target businesses with recurring maintenance contracts, regulatory compliance moats, and geographic density for route-based consolidation."
    },
    {
      id: "specialty-md",
      name: "Specialty M&D",
      subtitle: "Manufacturing & Distribution",
      weeks: "Fund I-II Legacy",
      status: "SELECTIVE",
      statusColor: "violet",
      investment: "$95M deployed",
      tasks: [
        { name: "Specialty distribution platforms", hours: "4 cos" },
        { name: "Niche manufacturing", hours: "3 cos" },
        { name: "Value-added distribution", hours: "2 cos" }
      ],
      metrics: [
        { label: "Portfolio Cos", value: "9" },
        { label: "Avg EBITDA", value: "$8.1M" },
        { label: "Add-Ons", value: "11" }
      ],
      deliverable: "Selective investments in specialty distribution and niche manufacturing with defensible market positions, proprietary product lines, and clear competitive moats. Emphasis on value-add vs. commodity distribution."
    }
  ];


  // ── 8. Feed Entries (8) ──
  Data.feedEntries = [
    { agent: "SIGNAL HUNTER", color: "emerald", time: "2 min ago", text: "Founder succession signal detected at Meridian Industrial Services \u2014 owner age 64, estate planning engagement confirmed with Bridgepoint Advisors" },
    { agent: "DEAL QUALIFIER", color: "blue", time: "8 min ago", text: "Apex Compliance Services conviction score updated to 93 (HOT). EBITDA quality index: 92/100. Proprietary process window confirmed" },
    { agent: "THESIS BUILDER", color: "violet", time: "15 min ago", text: "Investment thesis framework generated for TrueNorth Data Systems \u2014 Platform M&A in building materials vertical SaaS. 7 add-on targets mapped" },
    { agent: "VALUE MODELER", color: "amber", time: "22 min ago", text: "Ridgeline Specialty Distribution exit scenario updated: Base 2.8x MOIC ($97M entry \u2192 $272M exit at 8x on $34M projected EBITDA)" },
    { agent: "PORTFOLIO MONITOR", color: "red", time: "35 min ago", text: "E Source completed 14th add-on acquisition. Platform EBITDA now $22M (entry: $4.5M). Exit readiness score upgraded to 94/100" },
    { agent: "SIGNAL HUNTER", color: "emerald", time: "48 min ago", text: "New OSHA enforcement rule published \u2014 regulatory tailwind thesis strengthened for Sentinel Safety Solutions and Cornerstone Fire Protection" },
    { agent: "DEAL QUALIFIER", color: "blue", time: "1 hr ago", text: "Summit Packaging Group downgraded from HOT to WARM (65). Carve-out complexity increased \u2014 parent company requesting longer transition services agreement" },
    { agent: "THESIS BUILDER", color: "violet", time: "1 hr ago", text: "Competitive displacement opportunity identified: Incline Equity lost LOI on Atlas Precision Components due to timeline. ACP proprietary window opening" }
  ];


  // ── 9. Helper Methods ──

  Data.getTierCounts = function() {
    var counts = { ALL: 0, HOT: 0, WARM: 0, NURTURE: 0, STRATEGIC: 0 };
    Data.prospects.forEach(function(p) {
      counts[p.tier]++;
      counts.ALL++;
    });
    return counts;
  };

  Data.getSectorDistribution = function() {
    var dist = {};
    Data.prospects.forEach(function(p) {
      dist[p.sector] = (dist[p.sector] || 0) + 1;
    });
    return Object.entries(dist).sort(function(a, b) { return b[1] - a[1]; });
  };

  Data.getAggregateEV = function() {
    var total = Data.prospects.reduce(function(sum, p) {
      var ev = parseFloat(p.evEstimate.replace(/[$M,B]/g, ''));
      if (p.evEstimate.includes('B')) ev *= 1000;
      return sum + ev;
    }, 0);
    if (total >= 1000) return '$' + (total / 1000).toFixed(1) + 'B';
    return '$' + total.toFixed(0) + 'M';
  };

  Data.getProspectById = function(id) {
    return Data.prospects.find(function(p) { return p.id === id; }) || null;
  };

  Data.getProspectsByTier = function(tier) {
    if (!tier || tier === 'ALL') return Data.prospects;
    return Data.prospects.filter(function(p) { return p.tier === tier; });
  };

  Data.getProspectsBySector = function(sector) {
    if (!sector || sector === 'ALL') return Data.prospects;
    return Data.prospects.filter(function(p) { return p.sector === sector; });
  };

  Data.getAgentById = function(id) {
    return Data.agents.find(function(a) { return a.id === id; }) || null;
  };

  Data.getActivePortfolioCompanies = function() {
    return Data.portfolioCompanies.filter(function(c) { return c.status === 'Active'; });
  };

  Data.getExitedPortfolioCompanies = function() {
    return Data.portfolioCompanies.filter(function(c) { return c.status === 'Exited'; });
  };

  Data.getTotalAddOns = function() {
    return Data.portfolioCompanies.reduce(function(sum, c) { return sum + c.addOns; }, 0);
  };

  Data.getAverageScore = function(tier) {
    var prospects = tier ? Data.getProspectsByTier(tier) : Data.prospects;
    if (prospects.length === 0) return 0;
    var total = prospects.reduce(function(sum, p) { return sum + p.score; }, 0);
    return Math.round(total / prospects.length);
  };

  Data.getProcessStageDistribution = function() {
    var dist = {};
    Data.prospects.forEach(function(p) {
      dist[p.processStage] = (dist[p.processStage] || 0) + 1;
    });
    return dist;
  };

  Data.getAggregateEBITDA = function(tier) {
    var prospects = tier ? Data.getProspectsByTier(tier) : Data.prospects;
    var total = prospects.reduce(function(sum, p) { return sum + p.ebitdaNum; }, 0);
    return '$' + total.toFixed(1) + 'M';
  };


  Data.getSignalSummary = function() {
    var summary = { totalActiveSignals: 0, signalsByType: {}, avgConfidence: 0 };
    var confSum = 0, confCount = 0;
    Data.prospects.forEach(function(p) {
      if (!p.signalDetails) return;
      p.signalDetails.forEach(function(s) {
        if (s.status === 'ACTIVE') {
          summary.totalActiveSignals++;
          summary.signalsByType[s.type] = (summary.signalsByType[s.type] || 0) + 1;
          confSum += s.confidence;
          confCount++;
        }
      });
    });
    summary.avgConfidence = confCount > 0 ? Math.round((confSum / confCount) * 100) / 100 : 0;
    return summary;
  };


  // ── Export ──
  window.Data = Data;

})();
