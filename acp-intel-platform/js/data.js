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
      score: 72,
      tier: "HOT",
      signals: ["PLATFORM FATIGUE", "ADD-ON MAGNET"],
      signalColors: ["red", "violet"],
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
      score: 49,
      tier: "WARM",
      signals: ["REGULATORY TAILWIND", "ADD-ON MAGNET"],
      signalColors: ["blue", "violet"],
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


  // ── Export ──
  window.Data = Data;

})();
