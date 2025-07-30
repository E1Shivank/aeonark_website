import AboutSection from "@/components/sections/AboutSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Aeonark Labs</title>
        <meta name="description" content="Founded with a mission to democratize access to cutting-edge tech, Aeonark Labs builds affordable, powerful digital systems for startups and visionaries." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Aeonark Labs</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Get to know our story, our team, and the vision that drives us to build cutting-edge digital solutions.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      <AboutSection />
      
      <section className="py-16 relative bg-card/40">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 rounded-xl bg-background card-hover">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-blue))]/10 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-[hsl(var(--neon-blue))]">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m16 10-4 4-4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-foreground/70">We continuously explore new technologies and approaches to deliver cutting-edge solutions.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-background card-hover">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-green))]/10 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-[hsl(var(--neon-green))]">
                      <path d="M18 6 7 17l-5-5" />
                      <path d="m22 10-7.5 7.5L13 16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-foreground/70">We are committed to delivering high-quality solutions that exceed client expectations.</p>
                </div>
                
                <div className="p-6 rounded-xl bg-background card-hover">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-purple))]/10 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-[hsl(var(--neon-purple))]">
                      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Client Focus</h3>
                  <p className="text-foreground/70">We prioritize understanding and addressing the unique needs of each client we serve.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
