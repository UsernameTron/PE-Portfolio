/* ═══ CTG Platform Data ═══ */
(function() {
  'use strict';

  var Data = {};

  // ── 5.2 Prospect Database (30 records) ──
  // Distribution: 9 HOT, 13 WARM, 5 NURTURE, 3 STRATEGIC
  // Platforms: Genesys Cloud 8, NICE CXone 6, Cisco UCCE 5, Avaya 4, Five9 3, Amazon Connect 2, Other 2
  // Pipeline: ~$24.0M
  Data.prospects = [
    {
      id: 1,
      company: "Meridian Health Systems",
      industry: "Healthcare",
      location: "Phoenix, AZ",
      score: 82,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "AI INITIATIVE", "QA COMPLIANCE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Avaya",
      annualSpend: "$1.5M",
      contractExpiry: "Sep 2026",
      agents: 2200,
      cxLeader: "Sarah Chen, VP Customer Operations",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 80,
        evalComplexity: 80,
        expertiseGap: 80,
        timelinePressure: 90,
        complianceBurden: 75,
        stakeholders: 85
      },
      serviceAlignment: ["CCaaS Migration", "AI Agent Assist", "QA Analytics", "Workforce Management"],
      notes: "Avaya end-of-life forcing migration. Board mandated AI strategy by Q3. HIPAA-regulated. VP Customer Ops hired 4 months ago from Genesys.",
      keyIntelligence: [
        { label: "CX Leader", value: "Sarah Chen, VP Customer Ops" },
        { label: "Platform", value: "Avaya (legacy)" },
        { label: "Annual Spend", value: "$1.5M" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Sep 2026" }
      ]
    },
    {
      id: 2,
      company: "Pinnacle Financial Group",
      industry: "Financial Services",
      location: "New York, NY",
      score: 89,
      tier: "HOT",
      signals: ["PLATFORM RFP ACTIVE", "CCAAS MIGRATION", "COST REDUCTION"],
      signalColors: ["amber", "emerald", "gray"],
      platform: "Cisco UCCE",
      annualSpend: "$2.0M",
      contractExpiry: "Jul 2026",
      agents: 3400,
      cxLeader: "James Whitfield, SVP Client Services",
      contactPath: "Verified contact + direct outreach",
      strainFactors: {
        vendorUniverse: 95,
        evalComplexity: 95,
        expertiseGap: 80,
        timelinePressure: 85,
        complianceBurden: 90,
        stakeholders: 85
      },
      serviceAlignment: ["CCaaS Migration", "Speech Analytics", "Digital Engagement", "QA Analytics"],
      notes: "Active RFP posted Q1. Cisco UCCE EOL timeline accelerating. PCI + SOC2 + GDPR triple compliance burden. 9 stakeholders across 3 divisions.",
      keyIntelligence: [
        { label: "CX Leader", value: "James Whitfield, SVP Client Services" },
        { label: "Platform", value: "Cisco UCCE (EOL)" },
        { label: "Annual Spend", value: "$2.0M" },
        { label: "Contact Path", value: "Verified contact" },
        { label: "Contract Expiry", value: "Jul 2026" }
      ]
    },
    {
      id: 3,
      company: "Cascade Insurance Partners",
      industry: "Insurance",
      location: "Columbus, OH",
      score: 75,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "NEW CX LEADER", "WFM OVERHAUL"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$600K",
      contractExpiry: "Nov 2026",
      agents: 850,
      cxLeader: "Maria Gonzalez, Director CX",
      contactPath: "Conference contact + referral",
      strainFactors: {
        vendorUniverse: 65,
        evalComplexity: 80,
        expertiseGap: 80,
        timelinePressure: 95,
        complianceBurden: 55,
        stakeholders: 70
      },
      serviceAlignment: ["CCaaS Migration", "Workforce Management", "AI Readiness Assessment"],
      notes: "New CX Director hired 3 months ago. Genesys PureConnect migration mandate from corporate. Claims processing workflow redesign underway.",
      keyIntelligence: [
        { label: "CX Leader", value: "Maria Gonzalez, Director CX" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$600K" },
        { label: "Contact Path", value: "Conference + referral" },
        { label: "Contract Expiry", value: "Nov 2026" }
      ]
    },
    {
      id: 4,
      company: "TrueNorth Retail Corp",
      industry: "Retail",
      location: "San Jose, CA",
      score: 60,
      tier: "WARM",
      signals: ["AI INITIATIVE", "DIGITAL TRANSFORMATION", "OUTSOURCING EVAL"],
      signalColors: ["gray", "gray", "gray"],
      platform: "NICE CXone",
      annualSpend: "$1.1M",
      contractExpiry: "Mar 2027",
      agents: 1600,
      cxLeader: "Kevin Park, VP Contact Center Ops",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 55,
        evalComplexity: 65,
        expertiseGap: 55,
        timelinePressure: 55,
        complianceBurden: 70,
        stakeholders: 60
      },
      serviceAlignment: ["AI Agent Assist", "Conversational AI/IVA", "Outsourcing/BPO", "Digital Engagement"],
      notes: "Evaluating AI agent assist overlay on existing NICE CXone. Considering nearshore BPO for seasonal overflow. Holiday peak planning drives timeline.",
      keyIntelligence: [
        { label: "CX Leader", value: "Kevin Park, VP CC Ops" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$1.1M" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Mar 2027" }
      ]
    },
    {
      id: 5,
      company: "Summit Healthcare Network",
      industry: "Healthcare",
      location: "Tampa, FL",
      score: 92,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "PLATFORM RFP ACTIVE", "QA COMPLIANCE", "AI INITIATIVE"],
      signalColors: ["emerald", "amber", "gray", "gray"],
      platform: "Avaya",
      annualSpend: "$3.5M",
      contractExpiry: "Jun 2026",
      agents: 4200,
      cxLeader: "Dr. Rachel Torres, Chief Patient Experience Officer",
      contactPath: "Regulatory network + conference panel",
      strainFactors: {
        vendorUniverse: 95,
        evalComplexity: 92,
        expertiseGap: 88,
        timelinePressure: 100,
        complianceBurden: 95,
        stakeholders: 80
      },
      serviceAlignment: ["CCaaS Migration", "QA Analytics", "AI Agent Assist", "Conversational AI/IVA", "Workforce Management"],
      notes: "Largest prospect. Active RFP with June 2026 deadline. HIPAA + SOC2 + PCI + state regulations. CPXO hired from Cleveland Clinic. Board-level AI mandate.",
      keyIntelligence: [
        { label: "CX Leader", value: "Dr. Rachel Torres, CPXO" },
        { label: "Platform", value: "Avaya (legacy)" },
        { label: "Annual Spend", value: "$3.5M" },
        { label: "Contact Path", value: "Regulatory network" },
        { label: "Contract Expiry", value: "Jun 2026" }
      ]
    },
    {
      id: 6,
      company: "Velocity Travel Holdings",
      industry: "Travel & Hospitality",
      location: "Las Vegas, NV",
      score: 44,
      tier: "NURTURE",
      signals: ["AI INITIATIVE", "REMOTE AGENT", "COST REDUCTION"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Five9",
      annualSpend: "$500K",
      contractExpiry: "Jan 2027",
      agents: 900,
      cxLeader: "Amanda Liu, Director Guest Services",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 40,
        evalComplexity: 40,
        expertiseGap: 40,
        timelinePressure: 50,
        complianceBurden: 25,
        stakeholders: 80
      },
      serviceAlignment: ["AI Agent Assist", "BYOD/Remote Agent", "GigCX"],
      notes: "Five9 renewal coming. Exploring AI chatbot for booking changes. Low evaluation complexity. Remote agent model for seasonal flexibility.",
      keyIntelligence: [
        { label: "CX Leader", value: "Amanda Liu, Dir Guest Services" },
        { label: "Platform", value: "Five9" },
        { label: "Annual Spend", value: "$500K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jan 2027" }
      ]
    },
    {
      id: 7,
      company: "Heartland Power & Gas",
      industry: "Utilities",
      location: "Chicago, IL",
      score: 58,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "WFM OVERHAUL", "DIGITAL TRANSFORMATION"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Avaya",
      annualSpend: "$400K",
      contractExpiry: "Dec 2026",
      agents: 650,
      cxLeader: "Robert Dawson, Manager Customer Service",
      contactPath: "Website inquiry",
      strainFactors: {
        vendorUniverse: 50,
        evalComplexity: 55,
        expertiseGap: 70,
        timelinePressure: 65,
        complianceBurden: 40,
        stakeholders: 55
      },
      serviceAlignment: ["CCaaS Migration", "Workforce Management", "Digital Engagement"],
      notes: "Legacy platform aging. Outage management workflow needs overhaul. State PUC compliance for response times. First cloud migration.",
      keyIntelligence: [
        { label: "CX Leader", value: "Robert Dawson, Manager CS" },
        { label: "Platform", value: "Avaya (legacy)" },
        { label: "Annual Spend", value: "$400K" },
        { label: "Contact Path", value: "Website inquiry" },
        { label: "Contract Expiry", value: "Dec 2026" }
      ]
    },
    {
      id: 8,
      company: "Apex Lending Solutions",
      industry: "Financial Services",
      location: "Dallas, TX",
      score: 80,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "NEW CX LEADER", "QA COMPLIANCE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$800K",
      contractExpiry: "Oct 2026",
      agents: 1100,
      cxLeader: "Diana Foster, VP Operations",
      contactPath: "Referral from existing Guru client",
      strainFactors: {
        vendorUniverse: 70,
        evalComplexity: 80,
        expertiseGap: 85,
        timelinePressure: 85,
        complianceBurden: 80,
        stakeholders: 75
      },
      serviceAlignment: ["CCaaS Migration", "QA Analytics", "Speech Analytics", "AI Readiness Assessment"],
      notes: "PureConnect EOL. New VP Ops from Capital One. CFPB compliance gap identified in audit. Referral from existing Guru client.",
      keyIntelligence: [
        { label: "CX Leader", value: "Diana Foster, VP Ops" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$800K" },
        { label: "Contact Path", value: "Guru client referral" },
        { label: "Contract Expiry", value: "Oct 2026" }
      ]
    },
    {
      id: 9,
      company: "CloudBridge Technologies",
      industry: "Technology",
      location: "Seattle, WA",
      score: 32,
      tier: "NURTURE",
      signals: ["AI INITIATIVE", "COST REDUCTION"],
      signalColors: ["gray", "gray"],
      platform: "Twilio Flex",
      annualSpend: "$250K",
      contractExpiry: "Jun 2027",
      agents: 350,
      cxLeader: "Nathan Cho, Head of Support Engineering",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 35,
        evalComplexity: 35,
        expertiseGap: 20,
        timelinePressure: 30,
        complianceBurden: 25,
        stakeholders: 45
      },
      serviceAlignment: ["AI Agent Assist", "Knowledge Management"],
      notes: "Tech-savvy team evaluating AI agent assist. Low urgency — Twilio Flex working but expensive. Internal expertise present.",
      keyIntelligence: [
        { label: "CX Leader", value: "Nathan Cho, Head Support Eng" },
        { label: "Platform", value: "Twilio Flex" },
        { label: "Annual Spend", value: "$250K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jun 2027" }
      ]
    },
    {
      id: 10,
      company: "National Auto Insurance",
      industry: "Insurance",
      location: "Atlanta, GA",
      score: 85,
      tier: "HOT",
      signals: ["PLATFORM RFP ACTIVE", "CCAAS MIGRATION", "OUTSOURCING EVAL"],
      signalColors: ["amber", "emerald", "gray"],
      platform: "Avaya",
      annualSpend: "$1.2M",
      contractExpiry: "Aug 2026",
      agents: 1800,
      cxLeader: "Patricia Wells, SVP Claims Operations",
      contactPath: "Verified contact",
      strainFactors: {
        vendorUniverse: 75,
        evalComplexity: 85,
        expertiseGap: 85,
        timelinePressure: 95,
        complianceBurden: 80,
        stakeholders: 80
      },
      serviceAlignment: ["CCaaS Migration", "Outsourcing/BPO", "QA Analytics", "Workforce Management"],
      notes: "Aspect end-of-support driving urgent migration. Active RFP with August deadline. Evaluating BPO for claims overflow. State insurance regulations.",
      keyIntelligence: [
        { label: "CX Leader", value: "Patricia Wells, SVP Claims" },
        { label: "Platform", value: "Avaya (legacy)" },
        { label: "Annual Spend", value: "$1.2M" },
        { label: "Contact Path", value: "Verified contact" },
        { label: "Contract Expiry", value: "Aug 2026" }
      ]
    },
    {
      id: 11,
      company: "Crestview Medical Group",
      industry: "Healthcare",
      location: "Scottsdale, AZ",
      score: 62,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "QA COMPLIANCE", "REMOTE AGENT"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$300K",
      contractExpiry: "Feb 2027",
      agents: 450,
      cxLeader: "Linda Martinez, Practice Operations Director",
      contactPath: "Conference contact (HIMSS)",
      strainFactors: {
        vendorUniverse: 55,
        evalComplexity: 55,
        expertiseGap: 80,
        timelinePressure: 60,
        complianceBurden: 65,
        stakeholders: 50
      },
      serviceAlignment: ["CCaaS Migration", "QA Analytics", "BYOD/Remote Agent"],
      notes: "Multi-site medical group on legacy PBX. Zero cloud experience. HIPAA compliance a major concern. Met at HIMSS conference.",
      keyIntelligence: [
        { label: "CX Leader", value: "Linda Martinez, Practice Ops Dir" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$300K" },
        { label: "Contact Path", value: "HIMSS conference" },
        { label: "Contract Expiry", value: "Feb 2027" }
      ]
    },
    {
      id: 12,
      company: "Pacific Coast Bancorp",
      industry: "Financial Services",
      location: "San Francisco, CA",
      score: 52,
      tier: "WARM",
      signals: ["AI INITIATIVE", "DIGITAL TRANSFORMATION", "WFM OVERHAUL"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$1.6M",
      contractExpiry: "Sep 2027",
      agents: 2800,
      cxLeader: "Thomas Nakamura, Chief Digital Officer",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 50,
        evalComplexity: 60,
        expertiseGap: 40,
        timelinePressure: 40,
        complianceBurden: 65,
        stakeholders: 55
      },
      serviceAlignment: ["AI Agent Assist", "Conversational AI/IVA", "Workforce Management", "Digital Engagement"],
      notes: "Already on Genesys Cloud but evaluating AI overlay vendors. CDO driving digital-first strategy. Well-resourced team but AI vendor landscape overwhelming.",
      keyIntelligence: [
        { label: "CX Leader", value: "Thomas Nakamura, CDO" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$1.6M" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Sep 2027" }
      ]
    },
    {
      id: 13,
      company: "Redwood Property Management",
      industry: "Real Estate",
      location: "Denver, CO",
      score: 28,
      tier: "NURTURE",
      signals: ["COST REDUCTION", "REMOTE AGENT"],
      signalColors: ["gray", "gray"],
      platform: "Five9",
      annualSpend: "$200K",
      contractExpiry: "Apr 2027",
      agents: 280,
      cxLeader: "Stephanie Brooks, Customer Relations Manager",
      contactPath: "Website inquiry",
      strainFactors: {
        vendorUniverse: 20,
        evalComplexity: 30,
        expertiseGap: 30,
        timelinePressure: 25,
        complianceBurden: 20,
        stakeholders: 40
      },
      serviceAlignment: ["BYOD/Remote Agent", "Knowledge Management"],
      notes: "Small operation exploring cost optimization. Current platform adequate but may be overbuilt. Low complexity, low urgency.",
      keyIntelligence: [
        { label: "CX Leader", value: "Stephanie Brooks, CR Manager" },
        { label: "Platform", value: "Five9" },
        { label: "Annual Spend", value: "$200K" },
        { label: "Contact Path", value: "Website inquiry" },
        { label: "Contract Expiry", value: "Apr 2027" }
      ]
    },
    {
      id: 14,
      company: "Continental Logistics Group",
      industry: "Logistics",
      location: "Houston, TX",
      score: 46,
      tier: "NURTURE",
      signals: ["OUTSOURCING EVAL", "WFM OVERHAUL", "AI INITIATIVE"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Amazon Connect",
      annualSpend: "$800K",
      contractExpiry: "Aug 2027",
      agents: 1200,
      cxLeader: "Marcus Johnson, VP Customer Success",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 40,
        evalComplexity: 40,
        expertiseGap: 40,
        timelinePressure: 45,
        complianceBurden: 30,
        stakeholders: 90
      },
      serviceAlignment: ["Outsourcing/BPO", "Workforce Management", "AI Agent Assist"],
      notes: "Amazon Connect deployed but WFM is manual Excel. Internal team comfortable with tech evaluation. Evaluating nearshore BPO for shipment tracking overflow.",
      keyIntelligence: [
        { label: "CX Leader", value: "Marcus Johnson, VP CS" },
        { label: "Platform", value: "Amazon Connect" },
        { label: "Annual Spend", value: "$800K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Aug 2027" }
      ]
    },
    {
      id: 15,
      company: "Guardian Life & Annuity",
      industry: "Insurance",
      location: "Hartford, CT",
      score: 64,
      tier: "WARM",
      signals: ["AI INITIATIVE", "QA COMPLIANCE", "NEW CX LEADER"],
      signalColors: ["gray", "gray", "gray"],
      platform: "NICE CXone",
      annualSpend: "$1.2M",
      contractExpiry: "May 2027",
      agents: 2100,
      cxLeader: "Elizabeth Warren-Cross, EVP Policyholder Services",
      contactPath: "Guru referral from Hartford connection",
      strainFactors: {
        vendorUniverse: 60,
        evalComplexity: 70,
        expertiseGap: 60,
        timelinePressure: 55,
        complianceBurden: 70,
        stakeholders: 65
      },
      serviceAlignment: ["AI Agent Assist", "QA Analytics", "Speech Analytics", "AI Readiness Assessment"],
      notes: "New EVP from MetLife driving modernization. NICE CXone adequate but AI evaluation overwhelming. State insurance + PCI compliance. Guru referral.",
      keyIntelligence: [
        { label: "CX Leader", value: "Elizabeth Warren-Cross, EVP" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$1.2M" },
        { label: "Contact Path", value: "Guru referral" },
        { label: "Contract Expiry", value: "May 2027" }
      ]
    },
    {
      id: 16,
      company: "Skyline SaaS Inc",
      industry: "Technology",
      location: "Palo Alto, CA",
      score: 18,
      tier: "STRATEGIC",
      signals: ["AI INITIATIVE", "COST REDUCTION"],
      signalColors: ["gray", "gray"],
      platform: "Talkdesk",
      annualSpend: "$120K",
      contractExpiry: "Nov 2027",
      agents: 180,
      cxLeader: "Jake Morrison, Head of CX",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 10,
        evalComplexity: 20,
        expertiseGap: 10,
        timelinePressure: 15,
        complianceBurden: 10,
        stakeholders: 55
      },
      serviceAlignment: ["AI Agent Assist", "Knowledge Management"],
      notes: "Early-stage SaaS company. Small team, tech-savvy. Talkdesk handles needs well. Long horizon — strategic watch for future growth.",
      keyIntelligence: [
        { label: "CX Leader", value: "Jake Morrison, Head of CX" },
        { label: "Platform", value: "Talkdesk" },
        { label: "Annual Spend", value: "$120K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Nov 2027" }
      ]
    },
    {
      id: 17,
      company: "Great Lakes Energy Cooperative",
      industry: "Utilities",
      location: "Grand Rapids, MI",
      score: 66,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "DIGITAL TRANSFORMATION", "QA COMPLIANCE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Cisco UCCE",
      annualSpend: "$200K",
      contractExpiry: "Aug 2026",
      agents: 320,
      cxLeader: "Carol Henderson, Member Services Supervisor",
      contactPath: "Regulatory network",
      strainFactors: {
        vendorUniverse: 55,
        evalComplexity: 60,
        expertiseGap: 85,
        timelinePressure: 75,
        complianceBurden: 55,
        stakeholders: 55
      },
      serviceAlignment: ["CCaaS Migration", "Digital Engagement", "QA Analytics"],
      notes: "Legacy IVR system failing. State energy commission mandating response time standards. Zero cloud experience internally. Cooperative board approval required.",
      keyIntelligence: [
        { label: "CX Leader", value: "Carol Henderson, Supervisor" },
        { label: "Platform", value: "Cisco UCCE" },
        { label: "Annual Spend", value: "$200K" },
        { label: "Contact Path", value: "Regulatory network" },
        { label: "Contract Expiry", value: "Aug 2026" }
      ]
    },
    {
      id: 18,
      company: "Trident Defense Services",
      industry: "Government",
      location: "Arlington, VA",
      score: 76,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "PLATFORM RFP ACTIVE", "QA COMPLIANCE"],
      signalColors: ["emerald", "amber", "gray"],
      platform: "Cisco UCCE",
      annualSpend: "$500K",
      contractExpiry: "Oct 2026",
      agents: 750,
      cxLeader: "Col. David Mitchell (Ret.), Director Constituent Services",
      contactPath: "Verified government contact",
      strainFactors: {
        vendorUniverse: 40,
        evalComplexity: 80,
        expertiseGap: 80,
        timelinePressure: 85,
        complianceBurden: 90,
        stakeholders: 75
      },
      serviceAlignment: ["CCaaS Migration", "QA Analytics", "Speech Analytics"],
      notes: "FedRAMP + ITAR compliance requirements. Active RFP through government procurement. Cisco UCCE EOL. Complex approval chain. Veterans affairs help desk.",
      keyIntelligence: [
        { label: "CX Leader", value: "Col. David Mitchell (Ret.)" },
        { label: "Platform", value: "Cisco UCCE (EOL)" },
        { label: "Annual Spend", value: "$500K" },
        { label: "Contact Path", value: "Verified govt contact" },
        { label: "Contract Expiry", value: "Oct 2026" }
      ]
    },
    {
      id: 19,
      company: "Horizon Cruise Lines",
      industry: "Travel & Hospitality",
      location: "Miami, FL",
      score: 70,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "OUTSOURCING EVAL", "AI INITIATIVE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$1.0M",
      contractExpiry: "Dec 2026",
      agents: 1400,
      cxLeader: "Sofia Ramirez, VP Guest Experience",
      contactPath: "CX Summit conference",
      strainFactors: {
        vendorUniverse: 60,
        evalComplexity: 70,
        expertiseGap: 65,
        timelinePressure: 75,
        complianceBurden: 55,
        stakeholders: 80
      },
      serviceAlignment: ["CCaaS Migration", "Outsourcing/BPO", "Conversational AI/IVA", "GigCX"],
      notes: "PureConnect migration planned. Seasonal demand (4x peak). Evaluating GigCX model for surge capacity. Met VP at CX Summit.",
      keyIntelligence: [
        { label: "CX Leader", value: "Sofia Ramirez, VP Guest Exp" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$1.0M" },
        { label: "Contact Path", value: "CX Summit conference" },
        { label: "Contract Expiry", value: "Dec 2026" }
      ]
    },
    {
      id: 20,
      company: "Keystone Health Partners",
      industry: "Healthcare",
      location: "Philadelphia, PA",
      score: 56,
      tier: "WARM",
      signals: ["AI INITIATIVE", "QA COMPLIANCE", "WFM OVERHAUL"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$900K",
      contractExpiry: "Jan 2027",
      agents: 1300,
      cxLeader: "Dr. Michael Okafor, VP Patient Access",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 50,
        evalComplexity: 55,
        expertiseGap: 55,
        timelinePressure: 50,
        complianceBurden: 65,
        stakeholders: 60
      },
      serviceAlignment: ["AI Agent Assist", "QA Analytics", "Workforce Management", "AI Readiness Assessment"],
      notes: "Platform functional but AI roadmap unclear. VP Patient Access pushing for predictive scheduling. HIPAA + state health regs.",
      keyIntelligence: [
        { label: "CX Leader", value: "Dr. Michael Okafor, VP PA" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$900K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jan 2027" }
      ]
    },
    {
      id: 21,
      company: "Atlas Financial Services",
      industry: "Financial Services",
      location: "Chicago, IL",
      score: 54,
      tier: "WARM",
      signals: ["NEW CX LEADER", "AI INITIATIVE", "COST REDUCTION"],
      signalColors: ["gray", "gray", "gray"],
      platform: "NICE CXone",
      annualSpend: "$700K",
      contractExpiry: "Mar 2027",
      agents: 950,
      cxLeader: "Ryan Mitchell, Director Contact Center",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 50,
        evalComplexity: 55,
        expertiseGap: 50,
        timelinePressure: 50,
        complianceBurden: 55,
        stakeholders: 60
      },
      serviceAlignment: ["AI Agent Assist", "Speech Analytics", "AI Readiness Assessment"],
      notes: "New CC Director from Discover. Contract up for review. AI agent assist evaluation started. PCI compliance.",
      keyIntelligence: [
        { label: "CX Leader", value: "Ryan Mitchell, Dir CC" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$700K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Mar 2027" }
      ]
    },
    {
      id: 22,
      company: "Western States Utility District",
      industry: "Utilities",
      location: "Tucson, AZ",
      score: 77,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "DIGITAL TRANSFORMATION", "PLATFORM RFP ACTIVE"],
      signalColors: ["emerald", "gray", "amber"],
      platform: "NICE CXone",
      annualSpend: "$300K",
      contractExpiry: "Jul 2026",
      agents: 410,
      cxLeader: "Janet Kim, Director Customer Programs",
      contactPath: "Regulatory network",
      strainFactors: {
        vendorUniverse: 60,
        evalComplexity: 75,
        expertiseGap: 90,
        timelinePressure: 90,
        complianceBurden: 55,
        stakeholders: 65
      },
      serviceAlignment: ["CCaaS Migration", "Digital Engagement", "Knowledge Management"],
      notes: "Homegrown system being decommissioned. Active RFP with July deadline. Zero vendor evaluation experience. State utility commission compliance.",
      keyIntelligence: [
        { label: "CX Leader", value: "Janet Kim, Dir Customer Pgms" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$300K" },
        { label: "Contact Path", value: "Regulatory network" },
        { label: "Contract Expiry", value: "Jul 2026" }
      ]
    },
    {
      id: 23,
      company: "Brightpath Education Group",
      industry: "Technology",
      location: "Boston, MA",
      score: 38,
      tier: "NURTURE",
      signals: ["AI INITIATIVE", "REMOTE AGENT", "WFM OVERHAUL"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$350K",
      contractExpiry: "Jul 2027",
      agents: 500,
      cxLeader: "Priya Sharma, VP Student Experience",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 35,
        evalComplexity: 35,
        expertiseGap: 35,
        timelinePressure: 30,
        complianceBurden: 40,
        stakeholders: 55
      },
      serviceAlignment: ["AI Agent Assist", "BYOD/Remote Agent", "Workforce Management"],
      notes: "EdTech company with growing support needs. Platform working but WFM is spreadsheet-based. Some internal tech evaluation capability. Remote-first workforce.",
      keyIntelligence: [
        { label: "CX Leader", value: "Priya Sharma, VP Student Exp" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$350K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jul 2027" }
      ]
    },
    {
      id: 24,
      company: "Patriot Home Insurance",
      industry: "Insurance",
      location: "Charlotte, NC",
      score: 72,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "QA COMPLIANCE", "NEW CX LEADER"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "NICE CXone",
      annualSpend: "$450K",
      contractExpiry: "Sep 2026",
      agents: 650,
      cxLeader: "William Turner, Claims VP",
      contactPath: "Guru referral",
      strainFactors: {
        vendorUniverse: 55,
        evalComplexity: 65,
        expertiseGap: 85,
        timelinePressure: 80,
        complianceBurden: 65,
        stakeholders: 70
      },
      serviceAlignment: ["CCaaS Migration", "QA Analytics", "AI Readiness Assessment"],
      notes: "No cloud experience. New Claims VP pushing modernization. State insurance compliance. Guru referral.",
      keyIntelligence: [
        { label: "CX Leader", value: "William Turner, Claims VP" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$450K" },
        { label: "Contact Path", value: "Guru referral" },
        { label: "Contract Expiry", value: "Sep 2026" }
      ]
    },
    {
      id: 25,
      company: "Nexus Data Systems",
      industry: "Technology",
      location: "Austin, TX",
      score: 15,
      tier: "STRATEGIC",
      signals: ["AI INITIATIVE", "COST REDUCTION"],
      signalColors: ["gray", "gray"],
      platform: "Amazon Connect",
      annualSpend: "$150K",
      contractExpiry: "Jan 2028",
      agents: 220,
      cxLeader: "Alex Rivera, Support Director",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 10,
        evalComplexity: 10,
        expertiseGap: 10,
        timelinePressure: 10,
        complianceBurden: 10,
        stakeholders: 40
      },
      serviceAlignment: ["AI Agent Assist", "Knowledge Management"],
      notes: "Small tech company. Amazon Connect well-configured internally. Engineering team handles own evaluation. Long contract horizon. Watch for growth signals.",
      keyIntelligence: [
        { label: "CX Leader", value: "Alex Rivera, Support Dir" },
        { label: "Platform", value: "Amazon Connect" },
        { label: "Annual Spend", value: "$150K" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jan 2028" }
      ]
    },
    {
      id: 26,
      company: "Valley Medical Centers",
      industry: "Healthcare",
      location: "Los Angeles, CA",
      score: 78,
      tier: "HOT",
      signals: ["CCAAS MIGRATION", "AI INITIATIVE", "QA COMPLIANCE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Cisco UCCE",
      annualSpend: "$1.2M",
      contractExpiry: "Nov 2026",
      agents: 1700,
      cxLeader: "Dr. Susan Park, Chief Experience Officer",
      contactPath: "Verified contact",
      strainFactors: {
        vendorUniverse: 70,
        evalComplexity: 80,
        expertiseGap: 80,
        timelinePressure: 80,
        complianceBurden: 85,
        stakeholders: 70
      },
      serviceAlignment: ["CCaaS Migration", "AI Agent Assist", "QA Analytics", "Conversational AI/IVA"],
      notes: "Cisco UCCE migration imminent. CXO driving patient experience overhaul. HIPAA + PCI + SOC2 + state regs. Multi-facility coordination.",
      keyIntelligence: [
        { label: "CX Leader", value: "Dr. Susan Park, CXO" },
        { label: "Platform", value: "Cisco UCCE (EOL)" },
        { label: "Annual Spend", value: "$1.2M" },
        { label: "Contact Path", value: "Verified contact" },
        { label: "Contract Expiry", value: "Nov 2026" }
      ]
    },
    {
      id: 27,
      company: "Empire Retail Group",
      industry: "Retail",
      location: "New York, NY",
      score: 51,
      tier: "WARM",
      signals: ["OUTSOURCING EVAL", "AI INITIATIVE", "WFM OVERHAUL"],
      signalColors: ["gray", "gray", "gray"],
      platform: "NICE CXone",
      annualSpend: "$1.3M",
      contractExpiry: "Jun 2027",
      agents: 2400,
      cxLeader: "Christine Lee, COO",
      contactPath: "LinkedIn engagement",
      strainFactors: {
        vendorUniverse: 50,
        evalComplexity: 55,
        expertiseGap: 45,
        timelinePressure: 45,
        complianceBurden: 45,
        stakeholders: 65
      },
      serviceAlignment: ["Outsourcing/BPO", "AI Agent Assist", "Workforce Management", "GigCX"],
      notes: "Large omnichannel retailer. NICE CXone stable but exploring BPO + AI simultaneously. COO sponsoring initiative.",
      keyIntelligence: [
        { label: "CX Leader", value: "Christine Lee, COO" },
        { label: "Platform", value: "NICE CXone" },
        { label: "Annual Spend", value: "$1.3M" },
        { label: "Contact Path", value: "LinkedIn engagement" },
        { label: "Contract Expiry", value: "Jun 2027" }
      ]
    },
    {
      id: 28,
      company: "Clearwater Telehealth",
      industry: "Healthcare",
      location: "Orlando, FL",
      score: 50,
      tier: "WARM",
      signals: ["AI INITIATIVE", "REMOTE AGENT", "QA COMPLIANCE"],
      signalColors: ["gray", "gray", "gray"],
      platform: "Genesys Cloud",
      annualSpend: "$250K",
      contractExpiry: "Apr 2027",
      agents: 380,
      cxLeader: "Jennifer Adams, Director Patient Engagement",
      contactPath: "Conference contact",
      strainFactors: {
        vendorUniverse: 40,
        evalComplexity: 50,
        expertiseGap: 50,
        timelinePressure: 45,
        complianceBurden: 60,
        stakeholders: 50
      },
      serviceAlignment: ["AI Agent Assist", "BYOD/Remote Agent", "QA Analytics"],
      notes: "Telehealth startup scaling rapidly. Needs AI overlay. HIPAA compliance critical. 100% remote agent workforce.",
      keyIntelligence: [
        { label: "CX Leader", value: "Jennifer Adams, Dir Patient Eng" },
        { label: "Platform", value: "Genesys Cloud" },
        { label: "Annual Spend", value: "$250K" },
        { label: "Contact Path", value: "Conference contact" },
        { label: "Contract Expiry", value: "Apr 2027" }
      ]
    },
    {
      id: 29,
      company: "Golden State Transit Authority",
      industry: "Government",
      location: "Sacramento, CA",
      score: 68,
      tier: "WARM",
      signals: ["CCAAS MIGRATION", "DIGITAL TRANSFORMATION", "QA COMPLIANCE"],
      signalColors: ["emerald", "gray", "gray"],
      platform: "Cisco UCCE",
      annualSpend: "$350K",
      contractExpiry: "Aug 2026",
      agents: 550,
      cxLeader: "Michael Tran, Public Affairs Director",
      contactPath: "Regulatory network",
      strainFactors: {
        vendorUniverse: 45,
        evalComplexity: 60,
        expertiseGap: 75,
        timelinePressure: 80,
        complianceBurden: 65,
        stakeholders: 65
      },
      serviceAlignment: ["CCaaS Migration", "Digital Engagement", "QA Analytics"],
      notes: "State mandate for digital service channels by 2027. Legacy IVR failing ADA compliance. Government procurement process adds complexity.",
      keyIntelligence: [
        { label: "CX Leader", value: "Michael Tran, Public Affairs" },
        { label: "Platform", value: "Cisco UCCE" },
        { label: "Annual Spend", value: "$350K" },
        { label: "Contact Path", value: "Regulatory network" },
        { label: "Contract Expiry", value: "Aug 2026" }
      ]
    },
    {
      id: 30,
      company: "Lakeshore Hospitality Group",
      industry: "Travel & Hospitality",
      location: "Milwaukee, WI",
      score: 22,
      tier: "STRATEGIC",
      signals: ["REMOTE AGENT", "COST REDUCTION"],
      signalColors: ["gray", "gray"],
      platform: "Five9",
      annualSpend: "$300K",
      contractExpiry: "Oct 2027",
      agents: 420,
      cxLeader: "Emily Watson, Guest Services Director",
      contactPath: "Website inquiry",
      strainFactors: {
        vendorUniverse: 20,
        evalComplexity: 20,
        expertiseGap: 25,
        timelinePressure: 15,
        complianceBurden: 10,
        stakeholders: 40
      },
      serviceAlignment: ["BYOD/Remote Agent", "Knowledge Management"],
      notes: "Regional hotel group. Current platform adequate. Low urgency. Seasonal staffing challenges. Watch for expansion signals.",
      keyIntelligence: [
        { label: "CX Leader", value: "Emily Watson, Guest Svc Dir" },
        { label: "Platform", value: "Five9" },
        { label: "Annual Spend", value: "$300K" },
        { label: "Contact Path", value: "Website inquiry" },
        { label: "Contract Expiry", value: "Oct 2027" }
      ]
    }
  ];

  // ── 5.3 Agent Definitions ──
  Data.agents = [
    {
      id: "scout", name: "Scout", subtitle: "The Eyes",
      color: "emerald", badgeColor: "#34D399",
      description: "Monitors 50+ data sources continuously. Detects signals from press releases, job postings, RFP filings, conference calendars, regulatory bulletins, and vendor EOL notices.",
      stats: { sources: "50+", latency: "2-6 hrs", signals: "10 types" },
      simulationSteps: [
        { time: "00:00", text: "Signal detected: Summit Healthcare posted 3 contact center architect positions on LinkedIn" },
        { time: "00:01", text: "Cross-referencing with existing intelligence... Summit Healthcare already flagged for Avaya contract expiry Jun 2026" }
      ]
    },
    {
      id: "analyst", name: "Analyst", subtitle: "The Brain",
      color: "blue", badgeColor: "#3B82F6",
      description: "Transforms raw signals into scored intelligence. Recalculates Sourcing Strain Index on every new signal, detects tier crossings, enriches firmographic data, and maintains decision timeline estimates.",
      stats: { accuracy: "94%", enrichment: "12 APIs", recalc: "Real-time" },
      simulationSteps: [
        { time: "00:03", text: "Recalculating strain index for Summit Healthcare... New score: 100 (was 87). Tier crossing detected: WARM \u2192 HOT" },
        { time: "00:04", text: "Decision window estimated: Q2 2026. Urgency: CRITICAL. Recommend immediate engagement." }
      ]
    },
    {
      id: "strategist", name: "Strategist", subtitle: "The Voice",
      color: "violet", badgeColor: "#A78BFA",
      description: "Generates contextual executive outreach briefings using Claude API. Recommends channel, timing, and message angle based on prospect profile and historical conversion data. Matches prospects to specialized Gurus.",
      stats: { briefs: "Auto-gen", matching: "90 Gurus", channels: "5 types" },
      simulationSteps: [
        { time: "00:06", text: "Generating outreach brief for Summit Healthcare... Channel: Conference panel (HIMSS 2026) + LinkedIn InMail sequence" },
        { time: "00:07", text: "Guru match: Rebecca Chen (Healthcare CCaaS specialist, 12 years Avaya migration experience). Confidence: 94%" }
      ]
    },
    {
      id: "planner", name: "Planner", subtitle: "The Calculator",
      color: "amber", badgeColor: "#F59E0B",
      description: "Translates pipeline intelligence into financial projections and operational readiness. Prioritizes prospects, models commission revenue, calculates conversion probability, and manages portfolio diversification.",
      stats: { models: "Revenue", projection: "3-year", risk: "Portfolio" },
      simulationSteps: [
        { time: "00:09", text: "Updating pipeline model... Summit Healthcare: Est. deal value $3.5M annual, CTG commission $525K/yr (perpetual). Pipeline now $24.0M total." }
      ]
    },
    {
      id: "monitor", name: "Monitor", subtitle: "The Memory",
      color: "red", badgeColor: "#EF4444",
      description: "Closes the feedback loop. Ingests outreach outcomes, correlates with scoring factors, generates quarterly model performance reports, and recommends factor weight adjustments. Makes the system learn.",
      stats: { feedback: "Continuous", learning: "Quarterly", accuracy: "Improving" },
      simulationSteps: [
        { time: "00:11", text: "Logging pipeline update. Tracking Summit Healthcare engagement for outcome correlation. Model accuracy: 87% (target: 92% by Q4)." }
      ]
    }
  ];

  // ── 5.4 Competitor Data ──
  Data.competitors = [
    {
      id: "diy", name: "DIY (Internal Evaluation)", threatLevel: "HIGH", marketShare: "60%",
      description: "Most enterprises default to running vendor evaluations internally with existing IT and CX teams.",
      strengths: ["No additional cost (perceived)", "Internal control", "Existing vendor relationships"],
      vulnerabilities: ["3-6 month timelines", "200+ vendors to evaluate", "No specialized methodology", "Team distraction from core work"],
      whereCtgWins: "CTG reduces evaluation from 6 months to 2 weeks at zero cost to the buyer. Internal teams can't match 3,000+ hours of accumulated evaluation methodology.",
      metrics: { time: "3-6 months", cost: "$50K-$500K+", coverage: "10-20 vendors" }
    },
    {
      id: "consultancies", name: "Enterprise Consultancies", threatLevel: "MEDIUM", marketShare: "15%",
      description: "Gartner, Forrester, McKinsey, Deloitte \u2014 large advisory firms offering CX technology consulting.",
      strengths: ["Brand credibility", "Executive relationships", "Broad methodology"],
      vulnerabilities: ["$200K-$1M+ engagement costs", "Generalist approach", "Long sales cycles", "Not vendor-funded"],
      whereCtgWins: "CTG provides specialist depth at zero cost to buyer. Vendor-funded model means CTG\u2019s advice costs nothing while consultancies charge $200K+.",
      metrics: { time: "2-4 months", cost: "$200K-$1M+", coverage: "50-100 vendors" }
    },
    {
      id: "tsds", name: "Technology Solution Distributors", threatLevel: "MEDIUM", marketShare: "20%",
      description: "Master agents and TSDs like Telarus, Avant, Intelisys \u2014 traditional channel partner networks.",
      strengths: ["Established channel", "Vendor relationships", "Transaction infrastructure"],
      vulnerabilities: ["Generalist reps (not CC specialists)", "Volume over quality", "Limited evaluation methodology"],
      whereCtgWins: "CTG Gurus are contact center specialists with deep domain expertise. TSDs use generalist reps who sell telecom, UCaaS, and CCaaS \u2014 CTG focuses exclusively on contact center technology.",
      metrics: { time: "2-4 weeks", cost: "$0 (vendor-funded)", coverage: "30-50 vendors" }
    },
    {
      id: "bpo", name: "BPO Advisory Firms", threatLevel: "LOW", marketShare: "5%",
      description: "Everest Group, ISG, NelsonHall \u2014 firms advising on outsourcing and managed services.",
      strengths: ["BPO expertise", "Outsourcing relationships", "Process methodology"],
      vulnerabilities: ["Technology is secondary focus", "Outsourcing bias", "Limited CCaaS depth"],
      whereCtgWins: "CTG is technology-first, not outsourcing-first. When the decision is 'which platform,' not 'should we outsource,' CTG\u2019s specialist model wins.",
      metrics: { time: "1-3 months", cost: "$100K-$500K", coverage: "20-40 vendors" }
    }
  ];

  // ── 5.5 Roadmap Phases ──
  Data.roadmapPhases = [
    {
      id: "foundation", name: "Foundation", subtitle: "Data Infrastructure & Core Platform",
      weeks: "Weeks 1\u20134", status: "READY", statusColor: "emerald", investment: "$12,000",
      tasks: [
        { name: "Data source integration", hours: "40H" },
        { name: "Scoring engine build", hours: "60H" },
        { name: "Dashboard MVP", hours: "30H" },
        { name: "Pipeline database", hours: "20H" }
      ],
      metrics: [
        { label: "Data Sources", value: "15+" },
        { label: "Score Accuracy", value: "80%" },
        { label: "Prospects", value: "50" }
      ],
      deliverable: "Working pipeline with 50 scored prospects, basic dashboard, and manual Guru assignment workflow."
    },
    {
      id: "intelligence", name: "Intelligence Engine", subtitle: "AI Agents & Automated Scoring",
      weeks: "Weeks 5\u201312", status: "PENDING", statusColor: "amber", investment: "$28,000",
      tasks: [
        { name: "Scout agent deployment", hours: "80H" },
        { name: "Analyst scoring automation", hours: "60H" },
        { name: "Strategist brief generation", hours: "40H" },
        { name: "Signal classification pipeline", hours: "40H" }
      ],
      metrics: [
        { label: "Automation", value: "70%" },
        { label: "Signal Types", value: "10" },
        { label: "Latency", value: "<6hrs" }
      ],
      deliverable: "Automated signal detection, real-time scoring, AI-generated outreach briefs, and Guru matching algorithm."
    },
    {
      id: "platform", name: "Full Platform", subtitle: "Guru Portal & Revenue Operations",
      weeks: "Weeks 13\u201320", status: "FUTURE", statusColor: "text-muted", investment: "$35,000",
      tasks: [
        { name: "Guru-facing portal", hours: "80H" },
        { name: "Revenue tracking system", hours: "40H" },
        { name: "Commission automation", hours: "30H" },
        { name: "Planner agent deployment", hours: "40H" }
      ],
      metrics: [
        { label: "Guru Portal", value: "Live" },
        { label: "Revenue Track", value: "Automated" },
        { label: "Commission", value: "Auto-calc" }
      ],
      deliverable: "Two-sided marketplace: operator dashboard + Guru portal with assignment workflows, brief delivery, and commission tracking."
    },
    {
      id: "optimization", name: "Optimization", subtitle: "Learning System & Scale",
      weeks: "Weeks 21\u201326", status: "FUTURE", statusColor: "text-muted", investment: "$15,000",
      tasks: [
        { name: "Monitor agent (feedback loop)", hours: "40H" },
        { name: "Model tuning pipeline", hours: "30H" },
        { name: "Performance analytics", hours: "20H" },
        { name: "Scale to 200+ prospects", hours: "30H" }
      ],
      metrics: [
        { label: "Score Accuracy", value: "92%+" },
        { label: "Prospects", value: "200+" },
        { label: "Learning", value: "Quarterly" }
      ],
      deliverable: "Self-improving system: outcome tracking, quarterly model recalibration, and scaling to full addressable market of 200+ prospects."
    }
  ];

  // ── 5.6 Intelligence Feed Data ──
  Data.feedEntries = [
    { agent: "SCOUT", color: "emerald", time: "2 min ago", text: "New signal: TechFirst Financial posted VP Contact Center Operations role on LinkedIn" },
    { agent: "ANALYST", color: "blue", time: "5 min ago", text: "Strain recalculated: Meridian Insurance score 86 \u2192 89. Approaching HOT threshold." },
    { agent: "STRATEGIST", color: "violet", time: "8 min ago", text: "Outreach brief generated for Pacific Utilities. Recommended channel: Industry conference + direct email." },
    { agent: "PLANNER", color: "amber", time: "12 min ago", text: "Pipeline rebalanced. Q2 projected commission: $412K across 4 active deals." },
    { agent: "SCOUT", color: "emerald", time: "18 min ago", text: "EOL notice detected: Cisco UCCE 12.x end-of-support Dec 2026. 5 pipeline prospects affected." },
    { agent: "ANALYST", color: "blue", time: "25 min ago", text: "Enrichment complete: Apex Retail Group now linked to parent company data. Agent count revised: 1,200." },
    { agent: "STRATEGIST", color: "violet", time: "32 min ago", text: "Guru assignment recommendation: James Park for CloudNova Technologies \u2014 89% expertise match on Five9 migration." },
    { agent: "SCOUT", color: "emerald", time: "45 min ago", text: "Conference signal: 3 pipeline prospects registered for CCW Nashville. Cross-pollination opportunity identified." }
  ];

  // ── Helper: Pipeline Value ──
  Data.getPipelineValue = function() {
    return Data.prospects.reduce(function(sum, p) {
      var spend = parseFloat(p.annualSpend.replace(/[$M,]/g, ''));
      if (p.annualSpend.includes('M')) spend *= 1000000;
      else if (p.annualSpend.includes('K')) spend *= 1000;
      return sum + spend;
    }, 0);
  };

  // ── Helper: Tier Counts ──
  Data.getTierCounts = function() {
    var counts = { ALL: 0, HOT: 0, WARM: 0, NURTURE: 0, STRATEGIC: 0 };
    Data.prospects.forEach(function(p) { counts[p.tier]++; counts.ALL++; });
    return counts;
  };

  // ── Helper: Platform Distribution ──
  Data.getPlatformDistribution = function() {
    var dist = {};
    Data.prospects.forEach(function(p) { dist[p.platform] = (dist[p.platform] || 0) + 1; });
    return Object.entries(dist).sort(function(a, b) { return b[1] - a[1]; });
  };

  window.Data = Data;
})();
