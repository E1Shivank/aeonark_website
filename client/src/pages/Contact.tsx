import ContactForm from "@/components/sections/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Aeonark Labs</title>
        <meta name="description" content="Get in touch with Aeonark Labs for your web, app, and AI development needs. We're ready to bring your digital vision to life." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear from you. Reach out to discuss how we can help bring your digital vision to life.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      <ContactForm />
      
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="bg-card/40 rounded-xl p-8 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6 mt-6 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is your typical project timeline?</h3>
                  <p className="text-foreground/70">
                    Project timelines vary based on scope and complexity. A standard website typically takes 2-4 weeks, while more complex applications might take 2-3 months. We'll provide a detailed timeline during our initial consultation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do you offer maintenance services?</h3>
                  <p className="text-foreground/70">
                    Yes, we offer ongoing maintenance packages to keep your digital products up-to-date and secure. Our Growth and Scale packages include maintenance periods.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How do payments work?</h3>
                  <p className="text-foreground/70">
                    We typically require a 50% upfront deposit to begin work, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone-based payment schedules.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
