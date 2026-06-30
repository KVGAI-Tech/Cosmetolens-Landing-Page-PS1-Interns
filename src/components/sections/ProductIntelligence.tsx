import { useState, useMemo } from "react";
import { Container }         from "../ui/Container";
import { ImageSlot }         from "../ui/ImageSlot";
import { Reveal }            from "../ui/Reveal";
import { cn }                from "../../lib/cn";
import { productIntelligence as p } from "../../data/content";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */

type SkinType  = "Dry" | "Oily" | "Combination" | "Sensitive" | "Normal";
type PriceTier = "budget" | "mid" | "premium";
type Category  = "all" | "moisturiser" | "serum" | "spf" | "cleanser" | "eye" | "treatment";
type SortOrder = "none" | "asc" | "desc";

interface Product {
  name:           string;
  brand:          string;
  category:       Category;
  skinTypes:      SkinType[];
  priceTier:      PriceTier;
  priceValue:     number;   // numeric for sorting
  priceLabel:     string;
  concern:        string;
  texture:        string;
  keyIngredients: string[];
  note:           string;
  matchHint:      "high" | "mid" | "low";
}

/* ─────────────────────────────────────────
   CATALOGUE
───────────────────────────────────────── */

const catalogue: Product[] = [
  // ── MOISTURISERS
  { name: "Cicaplast Baume B5+",       brand: "La Roche-Posay", category: "moisturiser", skinTypes: ["Dry","Sensitive"],            priceTier:"mid",     priceValue:1299,  priceLabel:"₹ 1,299",  concern:"Barrier Repair",        texture:"Rich Balm",         keyIngredients:["Panthenol B5","Madecassoside","Ceramides"],       note:"Rebuilds a compromised barrier without fragrance. Safe for reactive and post-procedure skin.",                    matchHint:"high" },
  { name:"Cetaphil Moisturising Cream", brand:"Cetaphil",        category:"moisturiser",  skinTypes:["Dry","Normal","Sensitive"],    priceTier:"budget",  priceValue:499,   priceLabel:"₹ 499",    concern:"Daily Hydration",       texture:"Cream",             keyIngredients:["Glycerin","Petrolatum","Niacinamide"],            note:"Dermatologist-favourite daily moisturiser. Unfragranced, non-comedogenic, suitable for all ages.",               matchHint:"high" },
  { name:"Tatcha The Dewy Skin Cream",  brand:"Tatcha",          category:"moisturiser",  skinTypes:["Dry","Normal"],               priceTier:"premium", priceValue:5800,  priceLabel:"₹ 5,800",  concern:"Nourishment & Glow",    texture:"Whipped Cream",     keyIngredients:["Hadasei-3™","Hyaluronic Acid","Japanese Rice"],   note:"Luxury plumping cream with a luminous finish. Best for dry skin needing sustained overnight hydration.",          matchHint:"mid"  },

  // ── SERUMS
  { name:"Minimalist Niacinamide 10%",  brand:"Minimalist",      category:"serum",        skinTypes:["Oily","Combination","Sensitive"], priceTier:"budget", priceValue:599,  priceLabel:"₹ 599",    concern:"Pores & Oil Control",   texture:"Lightweight Serum", keyIngredients:["Niacinamide 10%","Zinc PCA"],                    note:"High-dose niacinamide tightens pores and controls sebum. Best-value active on the Indian market.",               matchHint:"high" },
  { name:"Tranexamic Acid 1% Serum",    brand:"Paula's Choice",  category:"serum",        skinTypes:["Normal","Combination","Oily"],    priceTier:"mid",    priceValue:2490, priceLabel:"₹ 2,490",  concern:"Dark Spots & Tone",     texture:"Fluid Serum",       keyIngredients:["Tranexamic Acid","Niacinamide","Resorcinol"],     note:"Clinically studied brightening without hydroquinone's irritation. Safe for long-term use.",                      matchHint:"high" },
  { name:"SkinCeuticals C E Ferulic",   brand:"SkinCeuticals",   category:"serum",        skinTypes:["Normal","Dry","Combination"],     priceTier:"premium",priceValue:12000,priceLabel:"₹ 12,000", concern:"Antioxidant & Firmness", texture:"Watery Serum",      keyIngredients:["Vitamin C 15%","Vitamin E","Ferulic Acid"],       note:"Gold-standard antioxidant serum. Shields against UV and environmental damage. Apply every morning.",              matchHint:"mid"  },

  // ── SPF
  { name:"Re'equil Oxybenzone-free SPF 50", brand:"Re'equil",   category:"spf",          skinTypes:["Oily","Combination","Sensitive"], priceTier:"budget", priceValue:445,  priceLabel:"₹ 445",    concern:"Daily UV Protection",   texture:"Matte Fluid",       keyIngredients:["Uvinul A Plus","Tinosorb S","Zinc Oxide"],        note:"No white cast, no oxybenzone, matte finish. One of the best sunscreens for oily skin in India.",                matchHint:"high" },
  { name:"Heliocare 360° Fluid SPF 50", brand:"Heliocare",      category:"spf",          skinTypes:["Normal","Combination","Dry"],     priceTier:"mid",    priceValue:1850, priceLabel:"₹ 1,850",  concern:"UV & Blue-Light Defence",texture:"Ultra-Light Fluid", keyIngredients:["Fernblock®","Zinc Oxide","Tinosorb S"],           note:"Antioxidant complex alongside broad-spectrum filters. No white cast — ideal for everyday urban use.",             matchHint:"high" },

  // ── CLEANSERS
  { name:"CeraVe Hydrating Cleanser",   brand:"CeraVe",          category:"cleanser",     skinTypes:["Dry","Normal","Sensitive"],       priceTier:"mid",    priceValue:999,  priceLabel:"₹ 999",    concern:"Gentle Cleansing",      texture:"Milky Lotion",      keyIngredients:["Ceramides","Hyaluronic Acid","Glycerin"],         note:"Non-foaming, pH-balanced cleanser that keeps the barrier intact. The go-to for dry and sensitive skin.",         matchHint:"high" },
  { name:"Minimalist 2% Salicylic Cleanser", brand:"Minimalist", category:"cleanser",     skinTypes:["Oily","Combination"],             priceTier:"budget", priceValue:349,  priceLabel:"₹ 349",    concern:"Congestion & Oil",      texture:"Gel Foam",          keyIngredients:["Salicylic Acid 2%","Tea Tree","Zinc"],            note:"BHA cleanser that exfoliates inside the pore. Use once daily — morning or night, not both.",                     matchHint:"high" },

  // ── EYE CARE
  { name:"Kiehl's Creamy Eye Treatment",brand:"Kiehl's",         category:"eye",          skinTypes:["Dry","Normal","Sensitive"],       priceTier:"premium",priceValue:3800, priceLabel:"₹ 3,800",  concern:"Fine Lines & Dryness",  texture:"Balm",              keyIngredients:["Avocado Oil","Shea Butter","Vitamin A"],          note:"Intensely moisturising eye cream. Dab gently — never rub — around the orbital bone.",                           matchHint:"mid"  },
  { name:"Plum Bright Years Eye Concentrate", brand:"Plum",      category:"eye",          skinTypes:["Normal","Combination","Oily"],    priceTier:"budget", priceValue:649,  priceLabel:"₹ 649",    concern:"Dark Circles & Puffiness",texture:"Gel Serum",        keyIngredients:["Peptides","Vitamin K","Caffeine"],                note:"Lightweight eye gel that depuffs and brightens. Best applied cold — store in the fridge overnight.",              matchHint:"high" },

  // ── TREATMENTS
  { name:"Differin Adapalene 0.1% Gel", brand:"Differin",        category:"treatment",    skinTypes:["Oily","Combination"],             priceTier:"mid",    priceValue:980,  priceLabel:"₹ 980",    concern:"Acne & Pore Clarity",   texture:"Clear Gel",         keyIngredients:["Adapalene 0.1%"],                                 note:"OTC retinoid proven for acne and texture over 12 weeks. Start twice weekly and increase slowly.",                matchHint:"high" },
  { name:"Plum 1% Retinol Night Serum", brand:"Plum",            category:"treatment",    skinTypes:["Normal","Dry","Combination"],     priceTier:"budget", priceValue:799,  priceLabel:"₹ 799",    concern:"Fine Lines & Texture",  texture:"Serum",             keyIngredients:["Retinol 1%","Bakuchiol","Squalane"],              note:"Beginner-friendly retinol cushioned with bakuchiol. Use only at night; follow with SPF next morning.",           matchHint:"mid"  },
];

/* ─────────────────────────────────────────
   FILTER CONFIG
───────────────────────────────────────── */

const categoryFilters: { id: Category; label: string }[] = [
  { id:"all",         label:"All"          },
  { id:"moisturiser", label:"Moisturisers" },
  { id:"serum",       label:"Serums"       },
  { id:"spf",         label:"SPF"          },
  { id:"cleanser",    label:"Cleansers"    },
  { id:"eye",         label:"Eye Care"     },
  { id:"treatment",   label:"Treatments"   },
];

const skinFilters: { id: SkinType | "all"; label: string }[] = [
  { id:"all",         label:"All Skin Types" },
  { id:"Dry",         label:"Dry"            },
  { id:"Oily",        label:"Oily"           },
  { id:"Combination", label:"Combination"    },
  { id:"Sensitive",   label:"Sensitive"      },
  { id:"Normal",      label:"Normal"         },
];

const priceFilters: { id: PriceTier | "all"; label: string; sub: string }[] = [
  { id:"all",     label:"Any Budget", sub:""            },
  { id:"budget",  label:"Budget",     sub:"Under ₹ 700" },
  { id:"mid",     label:"Mid-Range",  sub:"₹ 700–2,500" },
  { id:"premium", label:"Premium",    sub:"₹ 2,500+"    },
];

/* price → left border colour */
const tierBorder: Record<PriceTier, string> = {
  budget:  "border-l-accent",
  mid:     "border-l-accent-strong",
  premium: "border-l-primary",
};

const hintWidth: Record<"high"|"mid"|"low", string> = {
  high: "w-4/5",
  mid:  "w-3/5",
  low:  "w-2/5",
};

/* ─────────────────────────────────────────
   FILTER PILL  (hover + active animation)
───────────────────────────────────────── */

function FilterPill({
  active, onClick, children, sub,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-pill border px-3.5 py-1.5 text-caption-uppercase uppercase",
        "transition-all duration-200 outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        "active:scale-[0.96]",
        active
          ? "border-ink bg-ink text-canvas shadow-soft"
          : "border-hairline bg-canvas text-muted hover:border-ink/50 hover:text-ink hover:shadow-soft"
      )}
    >
      {children}
      {sub && (
        <span className={cn("ml-1 text-[8px] normal-case tracking-normal opacity-50")}>
          {sub}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   SORT BUTTON
───────────────────────────────────────── */

function SortButton({
  order, onChange,
}: {
  order: SortOrder;
  onChange: (o: SortOrder) => void;
}) {
  const cycle: Record<SortOrder, SortOrder> = { none:"asc", asc:"desc", desc:"none" };
  const labels: Record<SortOrder, string> = {
    none: "Price",
    asc:  "Price ↑",
    desc: "Price ↓",
  };
  return (
    <button
      onClick={() => onChange(cycle[order])}
      className={cn(
        "rounded-pill border px-3.5 py-1.5 text-caption-uppercase uppercase",
        "transition-all duration-200 outline-none select-none active:scale-[0.96]",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        order !== "none"
          ? "border-ink bg-ink text-canvas shadow-soft"
          : "border-hairline bg-canvas text-muted hover:border-ink/50 hover:text-ink hover:shadow-soft"
      )}
    >
      {labels[order]}
    </button>
  );
}

/* ─────────────────────────────────────────
   BLURRED SCORE
───────────────────────────────────────── */

function BlurredScore({ hint }: { hint: "high" | "mid" | "low" }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 w-12">
      <span
        className="font-serif text-display-sm leading-none text-ink select-none"
        style={{ filter:"blur(5px)", userSelect:"none" }}
        aria-hidden
      >
        {hint === "high" ? "91" : hint === "mid" ? "74" : "48"}
        <span className="text-sm">%</span>
      </span>
      <div className="h-px w-full bg-hairline overflow-hidden">
        <div
          className={cn("h-full bg-primary/30", hintWidth[hint])}
          style={{ filter:"blur(2px)" }}
        />
      </div>
      {/* lock */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
        className="h-3 w-3 text-muted/40" fill="currentColor" aria-label="Unlock by analysing your skin">
        <path d="M11 6V4.5a3 3 0 0 0-6 0V6H4v7h8V6h-1ZM6.5 4.5a1.5 1.5 0 0 1 3 0V6h-3V4.5Z"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div
        className={cn(
          "group relative flex flex-col sm:flex-row gap-4 rounded-lg border border-l-[3px] p-5",
          "transition-all duration-200 bg-surface-soft border-hairline",
          "hover:bg-canvas hover:shadow-soft",
          tierBorder[product.priceTier]
        )}
      >
        {/* Blurred score — left */}
        <BlurredScore hint={product.matchHint} />

        {/* Vertical rule — desktop */}
        <div className="hidden sm:block w-px bg-hairline self-stretch shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">

          {/* Brand · Name · Price */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-caption-uppercase uppercase text-muted mb-0.5">
                {product.brand}
              </p>
              <h4 className="text-title-md text-ink leading-snug group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h4>
            </div>
            <p className="font-serif text-title-sm text-ink shrink-0">
              {product.priceLabel}
            </p>
          </div>

          {/* Meta */}
          <p className="text-caption-uppercase uppercase text-muted">
            {product.concern}&ensp;·&ensp;{product.texture}
          </p>

          {/* Note */}
          <p className="text-body-sm text-muted leading-relaxed">{product.note}</p>

          {/* Ingredients */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-caption-uppercase uppercase text-muted">Actives:</span>
            {product.keyIngredients.map((ing) => (
              <span key={ing}
                className="rounded-pill border border-hairline px-2.5 py-0.5 text-caption text-ink">
                {ing}
              </span>
            ))}
          </div>

          {/* Skin types */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-caption-uppercase uppercase text-muted">Suits:</span>
            {product.skinTypes.map((st) => (
              <span key={st}
                className="text-caption text-muted rounded-pill border border-hairline/50 px-2 py-0.5">
                {st}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */

export function ProductIntelligence() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeSkin,     setActiveSkin]     = useState<SkinType | "all">("all");
  const [activePrice,    setActivePrice]    = useState<PriceTier | "all">("all");
  const [sortOrder,      setSortOrder]      = useState<SortOrder>("none");

  const visible = useMemo(() => {
    let list = catalogue.filter((product) => {
      const catOk   = activeCategory === "all" || product.category === activeCategory;
      const skinOk  = activeSkin     === "all" || product.skinTypes.includes(activeSkin as SkinType);
      const priceOk = activePrice    === "all" || product.priceTier === activePrice;
      return catOk && skinOk && priceOk;
    });

    if (sortOrder === "asc")  list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    if (sortOrder === "desc") list = [...list].sort((a, b) => b.priceValue - a.priceValue);

    return list.slice(0, 3); // always show exactly 3
  }, [activeCategory, activeSkin, activePrice, sortOrder]);

  return (
    <section className="bg-canvas py-section overflow-hidden">
      <Container>

        {/* ── Header ── */}
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow uppercase text-primary mb-3">
                Product Intelligence
              </p>
              <h2 className="font-serif text-display-xl max-w-lg leading-tight text-ink">
                {p.heading}
              </h2>
            </div>
            <p className="max-w-xs text-body-md text-muted md:text-right">
              {p.body}
            </p>
          </div>
        </Reveal>

        {/* ── Two-col grid ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">

          {/* ─── LEFT ─── */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            <Reveal>
              <ImageSlot
                src={p.image}
                alt="Skincare products arranged on a clean surface"
                ratio="portrait"
                rounded="rounded-xl"
                className="border border-hairline shadow-lift"
                imgClassName="object-[50%_30%]"
              />
            </Reveal>

            {/* What we analyse */}
            <Reveal>
              <div className="rounded-lg border border-hairline bg-surface-soft p-5 space-y-4">
                <p className="text-caption-uppercase uppercase text-muted">
                  Based on your skin, we analyse
                </p>
                <ul className="space-y-3">
                  {[
                    { label:"Skin Type",            detail:"Dry, oily, combination, or sensitive"     },
                    { label:"Active Concerns",       detail:"Acne, pigmentation, ageing, dullness"     },
                    { label:"Ingredient Flags",      detail:"Fragrances, AHAs, retinoids, sulfates"    },
                    { label:"Climate & Season",      detail:"Humidity, UV index, local temperature"    },
                    { label:"Texture & Tone Map",    detail:"Read from your uploaded skin photo"       },
                    { label:"Your Current Routine",  detail:"Cross-checked against what you already use" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="text-body-sm text-ink font-medium">{item.label}</p>
                        <p className="text-caption text-muted">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>

          {/* ─── RIGHT ─── */}
          <div className="lg:col-span-8 flex flex-col gap-5">

            {/* ── Skin type selector — prominent, first thing you see */}
            <Reveal>
              <div className="rounded-xl border border-hairline bg-surface-soft p-5 space-y-5">

                {/* Skin type */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-muted mb-2.5">
                    Select your skin type
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skinFilters.map((f) => (
                      <FilterPill
                        key={f.id}
                        active={activeSkin === f.id}
                        onClick={() => setActiveSkin(f.id)}
                      >
                        {f.label}
                      </FilterPill>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-hairline" />

                {/* Category + Price sort — secondary row */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <p className="text-caption-uppercase uppercase text-muted mb-2.5">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryFilters.map((f) => (
                        <FilterPill
                          key={f.id}
                          active={activeCategory === f.id}
                          onClick={() => setActiveCategory(f.id)}
                        >
                          {f.label}
                        </FilterPill>
                      ))}
                    </div>
                  </div>

                  <div className="sm:w-px sm:bg-hairline" />

                  <div>
                    <p className="text-caption-uppercase uppercase text-muted mb-2.5">
                      Budget
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {priceFilters.map((f) => (
                        <FilterPill
                          key={f.id}
                          active={activePrice === f.id}
                          onClick={() => setActivePrice(f.id)}
                          sub={f.sub}
                        >
                          {f.label}
                        </FilterPill>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* ── Result meta + sort ── */}
            <Reveal>
              <div className="flex items-center justify-between gap-3 flex-wrap -mt-1">
                <p className="text-caption-uppercase uppercase text-muted">
                  Showing 3 of {catalogue.filter((pr) => {
                    const c = activeCategory === "all" || pr.category === activeCategory;
                    const s = activeSkin === "all" || pr.skinTypes.includes(activeSkin as SkinType);
                    const p2 = activePrice === "all" || pr.priceTier === activePrice;
                    return c && s && p2;
                  }).length} matched
                  {activeSkin !== "all" && ` · ${activeSkin}`}
                  {activeCategory !== "all" && ` · ${categoryFilters.find(f => f.id === activeCategory)?.label}`}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-caption-uppercase uppercase text-muted">Sort:</span>
                  <SortButton order={sortOrder} onChange={setSortOrder} />
                </div>
              </div>
            </Reveal>

            {/* ── Cards ── */}
            {visible.length > 0 ? (
              <div className="space-y-3">
                {visible.map((product, i) => (
                  <ProductCard key={product.name} product={product} index={i} />
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="rounded-xl border border-hairline bg-surface-soft p-10 text-center">
                  <p className="text-body-sm text-muted">
                    No products match — try a different skin type or category.
                  </p>
                </div>
              </Reveal>
            )}

            {/* ── Trust line ── */}
            <Reveal>
              <p className="text-caption-uppercase uppercase text-muted border-t border-hairline pt-4">
                Recommendations are built from your skin profile — never from paid placements or brand partnerships.
              </p>
            </Reveal>

          </div>
        </div>
      </Container>
    </section>
  );
}
