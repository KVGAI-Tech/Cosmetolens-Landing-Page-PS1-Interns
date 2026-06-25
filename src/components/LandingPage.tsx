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
          src={media.spaFacial}
          alt="A considered skincare ritual"
          overlay="center"
          contained
          rounded="rounded-xl"
          height="h-[440px]"
          position="object-[50%_55%]"
        >
          <div className="text-caption-uppercase uppercase text-on-primary/80">{lifestyle.eyebrow}</div>
          <h2 className="mt-4 font-serif text-display-lg text-on-primary">{lifestyle.heading}</h2>
          <p className="mt-4 text-body-md text-on-primary/85">{lifestyle.sub}</p>
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
