/**
 * All landing-page copy + section data, in one typed place.
 * Source of truth: "Cosmetolens Landing Page Content.docx".
 * Editing copy here never touches markup. Backend can later replace these
 * constants with fetched data behind the same shapes.
 */

export const brand = {
  name: "Cosmetolens",
  trademark: "™",
  tagline: "Skin Intelligence. Product Transparency. Better Outcomes.",
  blurb:
    "Clinical Precision in Cosmetovigilance. Science-backed skincare intelligence for the modern era.",
} as const;

export const nav = {
  links: ["Analysis", "Reports", "Ingredients", "Knowledge Hub"],
  login: "Login",
  cta: "Create Your Skin ID",
} as const;

export const hero = {
  eyebrow: "AI Skin Intelligence",
  // Two lines (line break replaces the em-dash the PM asked to remove).
  headline: "Know How Skincare Works For Your Skin\nNot Everyone Else’s.",
  sub:
    "Cosmetolens is an AI-powered Skin Intelligence and Cosmetovigilance platform that helps consumers understand product performance based on their unique skin profile while enabling brands to build transparent, evidence-backed skincare intelligence.",
  primaryCta: "Create Your Skin ID",
  secondaryCta: "Report a Product",
  trust: [
    "AI Skin Analysis",
    "Evidence-Based Ingredient Recommendations",
    "Skin Profile Matched Product Intelligence",
    "Clinical Evidence Transparency",
  ],
  image: "/images/face-profile.jpg",
} as const;

/** Centralized image paths for the editorial / full-bleed bands. */
export const media = {
  heroPortrait: "/images/face-profile.jpg",
  spaFacial: "/images/spa-facial.jpg", // woman + clay mask facial (lifestyle band)
  serumHands: "/images/serum-hands.jpg", // hands + serum dropper
  skinPortrait: "/images/skin-analysis-portrait.png", // model face w/ analysis lines
  ingredientActives: "/images/ingredient-actives.png", // molecule visual
} as const;

/** Copy for the editorial lifestyle (spa) band — brand voice, gives the image a heading. */
export const lifestyle = {
  eyebrow: "The Cosmetolens Difference",
  heading: "Skincare read at the level of your skin.",
  sub: brand.tagline,
} as const;

export const problem = {
  eyebrow: "Beyond Generalizations",
  heading: "Why Traditional Product Ratings Fail",
  body: "Precise intelligence reveals hidden ingredient conflicts for specific skin conditions.",
  generic: {
    label: "Global Star Rating",
    title: "Conventional Review Site",
    rating: 4.5,
    reviewsCount: "12,400 reviews",
    note: "A standard metric that ignores your unique biological fingerprint.",
  },
  precise: {
    tag: "Active Analysis",
    label: "Cosmetolens Intelligence",
    title: "Bio-Profile Compatibility",
    bars: [
      {
        label: "Optimal for Dry Skin conditions.",
        score: 9.1,
        pct: 91,
        tone: "success" as const,
        status: "Bio-Compatible",
        targetSkin: "Dry Skin",
      },
      {
        label: "Ingredients may aggravate Oily Skin profiles.",
        score: 6.2,
        pct: 62,
        tone: "primary" as const,
        status: "Potential Conflict",
        targetSkin: "Oily Skin",
      },
    ],
    note: "Precise intelligence reveals hidden ingredient conflicts for specific skin conditions.",
  },
} as const;


export const howItWorks = {
  eyebrow: "How it Works",
  heading: "How Cosmetolens Works",
  sub: "Three steps from a unique skin profile to personalized, evidence-based intelligence.",
  steps: [
    {
      no: "01",
      title: "Create Your Skin ID",
      body: "Take a comprehensive skin assessment or upload your DNA profile to build a unique biological identity. This forms the foundation of all intelligence.",
      icon: "fingerprint" as const,
    },
    {
      no: "02",
      title: "Report Your Experience",
      body: "Contribute real-world data by logging how your skin reacts to different products. Our community data strengthens the algorithm for everyone.",
      icon: "history_edu" as const,
    },
    {
      no: "03",
      title: "Personalized Intelligence",
      body: "Receive precise, data-driven recommendations that match your Skin ID perfectly. Eliminate guesswork and shop with absolute confidence.",
      icon: "insights" as const,
    },
  ],
} as const;


export const skinIntelligence = {
  heading: "Understand Your Skin Better",
  // Doc-faithful lead-in to the marker list (Section 4 of the source .docx).
  body: "Our AI-powered analysis helps identify:",
  markers: [
    "Skin Type",
    "Pigmentation",
    "Acne Tendencies",
    "Dryness",
    "Sensitivity",
    "Skin Texture",
    "Fitzpatrick Skin Classification",
  ],
  cta: "Analyze My Skin",
  image: "/images/skin-analysis-portrait.png",
  overlayLabel: "Analyzing Pigmentation",
} as const;

export const ingredients = {
  eyebrow: "Molecular Analysis",
  heading: "Ingredients That Match Your Skin",
  body:
    "Based on your skin profile, concerns, environmental conditions, and existing routine, Cosmetolens recommends ingredients supported by scientific and clinical evidence.",
  link: "Discover My Ingredient Match",
  image: "/images/ingredient-actives.png",
  // Ingredient NAMES are from the source doc. The symbol codes, blurbs, and
  // compatibility % are placeholder/illustrative — swap % for real match data.
  items: [
    { symbol: "B3", name: "Niacinamide", body: "Reduces inflammation and supports the lipid barrier function.", pct: 98 },
    { symbol: "Cer", name: "Ceramides", body: "Essential lipids that lock in moisture and protect from stressors.", pct: 94 },
    { symbol: "AzA", name: "Azelaic Acid", body: "Calms redness and evens tone for sensitive, blemish-prone skin.", pct: 92 },
    { symbol: "Pep", name: "Peptides", body: "Signal molecules that support firmness and barrier repair.", pct: 90 },
    { symbol: "HA", name: "Hyaluronic Acid", body: "Multi-weight molecules for deep dermal hydration and plumping.", pct: 91 },
    { symbol: "Ret", name: "Retinoids", body: "Accelerate cell turnover for texture, tone, and signs of aging.", pct: 88 },
  ],
} as const;

export const productIntelligence = {
  heading: "Find Products That Match Your Skin",
  body:
    "Instead of generic ratings, see how products perform for people who share your skin type, concerns, age group, climate, and skin conditions.",
  cta: "Start Discovery",
  shareFactors: ["Skin Type", "Concerns", "Age Group", "Climate", "Skin Conditions"],
  image: "/images/serum-hands.jpg", // section lifestyle image
  // Card 1 (Hydra Repair, 92%, "148 reports") is from the source doc. Card 2 and the
  // "41%/Avoid" example are placeholder/illustrative — swap for real data.
  products: [
    {
      name: "Hydra Repair Moisturizer",
      category: "Barrier Support",
      match: 92,
      note: "Based on 148 reports from users with similar skin profiles.",
      recommended: true,
    },
    {
      name: "Brightening Serum X",
      category: "Potential Irritant",
      match: 41,
      note: "Flagged for sensitivity in profiles similar to yours.",
      recommended: false,
    },
  ],
} as const;

export const cosmetovigilance = {
  heading: "Helping Make Skincare Safer",
  body:
    "Cosmetolens enables consumers to report product outcomes. Every report contributes to a growing database of real-world skincare outcomes and product safety intelligence.",
  reports: [
    "Product Effectiveness",
    "Lack of Effect",
    "Skin Reactions",
    "Irritation",
    "Adverse Events",
  ],
  cta: "Report a Product",
} as const;

export const clinicalEvidence = {
  heading: "See The Science Behind The Claims",
  body:
    "Products carrying the Clinical Evidence Badge have undergone review of submitted clinical data and supporting evidence.",
  view: ["Key Ingredients", "Product Claims", "Clinical Evidence Status", "Scientific References"],
  kicker: "Transparency first. Marketing second.",
  badge: "Clinical Evidence Badge",
  cta: "Explore The Evidence",
} as const;

export const rewards = {
  heading: "Get Rewarded For Sharing Your Experience",
  body:
    "Contribute to the world’s largest skin intelligence database and earn rewards that fund your skincare journey. Redeem points for discounts and exclusive skincare benefits.",
  earn: [
    "Complete Your Skin Profile",
    "Submit Product Reports",
    "Upload Progress Photos",
    "Participate In Follow-Up Tracking",
  ],
  cta: "Start Earning Rewards",
  // placeholder — illustrative loyalty card; numbers not from the source doc.
  balance: {
    label: "My Balance",
    value: "2,450 XP",
    nextTier: "Next Tier: Clinical Elite",
    toGo: "550 XP To Go",
    pct: 70,
  },
} as const;

export const forBrands = {
  heading: "Turn Consumer Feedback Into Skin Intelligence",
  body:
    "Brands gain access to skin-type specific product performance, ingredient performance insights, climate-based efficacy data, claim substantiation reports, and consumer safety signals.",
  benefits: [
    "Skin-Type Specific Product Performance",
    "Ingredient Performance Insights",
    "Climate-Based Efficacy Data",
    "Claim Substantiation Reports",
    "Consumer Safety Signals",
  ],
  cta: "Partner With Cosmetolens",
} as const;

export const knowledgeHub = {
  heading: "Learn The Science Of Skincare",
  body: "Explore deep dives into ingredients, conditions, and the research behind effective skincare.",
  explore: [
    "Ingredient Library",
    "Skin Condition Guides",
    "Product Education",
    "Clinical Research Insights",
    "Myth vs Fact Resources",
  ],
  cta: "Explore Knowledge Hub",
} as const;

export const finalCta = {
  heading: "Your Skin Is Unique.\nYour Product Intelligence Should Be Too.",
  sub: "Join the next generation of evidence-based skincare.",
  ctas: ["Create Your Skin ID", "Report A Product", "Explore Products"],
} as const;

export const footer = {
  tagline: brand.tagline,
  columns: [
    {
      title: "Platform",
      links: ["Skin ID Analysis", "Ingredient Matching", "Product Registry", "Rewards"],
    },
    {
      title: "Research",
      links: ["Clinical Trials", "Cosmetovigilance", "Whitepapers", "Knowledge Hub"],
    },
    {
      title: "Company",
      links: ["About", "For Brands", "Careers", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ],
  copyright: "© 2026 Cosmetolens. Skin Intelligence. Product Transparency. Better Outcomes.",
  social: ["LinkedIn", "Instagram"],
} as const;
