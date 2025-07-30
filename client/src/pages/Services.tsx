import ServiceCards from "@/components/sections/ServiceCards";
import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Aeonark Labs</title>
        <meta name="description" content="Comprehensive digital services including web development, app creation, and AI solutions for businesses." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              We provide end-to-end digital solutions to help your business thrive in the digital world. From beautiful websites to intelligent AI agents, we've got you covered.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      <ServiceCards />
      
      <section className="py-16 relative bg-card/40">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="bg-background rounded-xl p-8 max-w-3xl mx-auto card-hover">
              <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-foreground/70 mb-6">
                We understand that every business is unique. If you don't see a service that matches your needs, we'd be happy to discuss creating a custom solution tailored specifically for your business.
              </p>
              <div className="flex justify-center">
                <a href="/contact" className="btn-gradient">
                  Get in Touch
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
