import PricingTiers from "@/components/sections/PricingTiers";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Aeonark Labs</title>
        <meta name="description" content="Flexible pricing plans for web development, app creation, and AI solutions. Choose the package that fits your business needs." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-purple">Transparent</span> Pricing
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              No hidden fees, no surprises. Choose the plan that works best for your business needs and budget.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      <PricingTiers />
      
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="bg-card/40 rounded-xl p-8 max-w-3xl mx-auto card-hover text-center">
              <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-foreground/70 mb-6">
                Our packages are designed to fit most business needs, but we understand that some projects require specialized attention. 
                If you need a custom quote for your project, we're happy to discuss your specific requirements.
              </p>
              <Link href="/contact">
                <Button asChild className="btn-gradient">
                  <a>Request Custom Quote</a>
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
