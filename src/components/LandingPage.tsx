import { TopNav } from "./layout/TopNav";
import { Footer } from "./layout/Footer";
import { Hero } from "./sections/Hero";
import { ProblemComparison } from "./sections/ProblemComparison";
import { HowItWorks } from "./sections/HowItWorks";
import { SkinIntelligence } from "./sections/SkinIntelligence";
import { IngredientMatches } from "./sections/IngredientMatches";
import { ProductIntelligence } from "./sections/ProductIntelligence";
import { Cosmetovigilance } from "./sections/Cosmetovigilance";
import { ClinicalEvidence } from "./sections/ClinicalEvidence";
import { Rewards } from "./sections/Rewards";
import { ForBrandsHub } from "./sections/ForBrandsHub";
import { FinalCta } from "./sections/FinalCta";
import { FullBleed } from "./ui/FullBleed";
import { lifestyle, media } from "../data/content";

/**
 * Cosmetolens desktop landing page — warm editorial.
 * Band rhythm (no two neighbours share a surface): cream → soft → image → dark →
 * cream → soft → cream → dark → cream → soft → cream → terracotta → dark-footer.
 */
export function LandingPage() {
  return (
    <div className="min-w-[1024px] bg-canvas">
      <TopNav />
      <main>
        <Hero />
        <ProblemComparison />

        {/* Editorial lifestyle band — contained + rounded, face in focus, with a heading */}
        <FullBleed
          src={media.skinDiversity}
          alt="Skincare for every skin"
          overlay="center"
          contained
          rounded="rounded-xl"
          height="h-[540px]"
          position="object-center"
        >
          <div className="text-caption-uppercase uppercase tracking-widest text-on-primary/70">{lifestyle.eyebrow}</div>
          <h2 className="mt-6 font-serif text-display-xl text-on-primary">{lifestyle.heading}</h2>
          <p className="mt-6 text-body-lg text-on-primary/80">{lifestyle.sub}</p>
        </FullBleed>

        <HowItWorks />
        <SkinIntelligence />
        <IngredientMatches />
        <ProductIntelligence />
        <Cosmetovigilance />
        <ClinicalEvidence />
        <Rewards />
        <ForBrandsHub />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}