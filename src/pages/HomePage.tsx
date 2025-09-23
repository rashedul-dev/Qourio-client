import { HeroSection } from "@/components/modules/home/hero-section";
import { TestimonialsSection } from "@/components/modules/home/testimonials-section";
import { FeaturesSection } from "@/components/modules/home/features-section";
import { PricingSection } from "@/components/modules/home/pricing-section";
import { CTASection } from "@/components/modules/home/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
    </div>
  );
}
