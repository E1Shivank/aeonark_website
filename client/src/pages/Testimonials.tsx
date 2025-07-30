import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet";
import { Star, Quote, ExternalLink } from "lucide-react";
import companiesLogos from "@/assets/companies-logos.png";
import testimonialPerson1 from "@/assets/testimonial-person1.png";
import testimonialPerson2 from "@/assets/testimonial-person2.png";

const portfolioTestimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profession: "Interior Designer",
    content: "Aeonark Labs created an incredible portfolio website that perfectly showcases my interior design work. The clean, modern design and smooth galleries have helped me attract high-end clients. My inquiries increased by 300% within the first month!",
    rating: 5,
    image: testimonialPerson1,
    website: null
  },
  {
    id: 2,
    name: "Priya Sharma",
    profession: "Architect",
    content: "The portfolio website they built transformed how I present my architectural projects. The responsive design looks stunning on all devices, and the project showcase section beautifully highlights my work. Clients love the professional presentation.",
    rating: 5,
    image: testimonialPerson2,
    website: null
  },
  {
    id: 3,
    name: "Setare Rezaei",
    profession: "Creative Professional",
    content: "Working with Aeonark Labs was an amazing experience. They understood my vision and created a website that truly represents my creative work. The attention to detail and professional quality exceeded my expectations.",
    rating: 5,
    image: null,
    website: "www.setare-rezaei.com"
  }
];

const businessTestimonials = [
  {
    id: 4,
    name: "Sarah Chen",
    company: "TechStart Inc.",
    role: "CEO",
    content: "Aeonark Labs transformed our digital presence with AeonForge. Their 48-hour delivery promise was met, and the scalable web app has automated our entire client onboarding process.",
    rating: 5
  },
  {
    id: 5,
    name: "Michael Rodriguez", 
    company: "GrowthLab Agency",
    role: "Head of Sales",
    content: "AeonRFP has been a game-changer for our proposal process. We went from 20-hour drafts to 2-minute proposals. Our win rate increased by 40% since implementation.",
    rating: 5
  },
  {
    id: 6,
    name: "Emily Johnson",
    company: "DataFlow Solutions",
    role: "Operations Director",
    content: "The AeonAgent implementation reduced our support ticket load by 60%. Our HR bot handles onboarding seamlessly, and our sales agents follow up 24/7. Incredible ROI!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Testimonials | Aeonark Labs</title>
        <meta name="description" content="See what our clients say about working with Aeonark Labs. Read testimonials from professionals and businesses that have transformed their digital presence with our solutions." />
      </Helmet>
      
      <div className="pt-24 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-green))]/5 to-transparent"></div>
        <ScrollReveal>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Client <span className="text-gradient">Success Stories</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Discover how we've helped professionals and businesses achieve their digital transformation goals and drive meaningful results.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Portfolio Testimonials Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="text-gradient">Portfolio Website</span> Success Stories
            </h2>
            <p className="text-center text-foreground/70 mb-16">
              Professional portfolio websites for interior designers, architects, and creative professionals
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index + 1}>
                <div className="bg-card rounded-xl p-6 border border-border/20 card-hover relative">
                  <Quote className="h-8 w-8 text-[hsl(var(--neon-blue))]/30 mb-4" />
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))]" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-green))] flex items-center justify-center mr-4">
                          <span className="text-white font-semibold text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-foreground/60">{testimonial.profession}</p>
                      </div>
                    </div>
                    {testimonial.website && (
                      <a 
                        href={`https://${testimonial.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-[hsl(var(--neon-blue))] hover:text-[hsl(var(--neon-green))] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business Testimonials Section */}
      <section className="py-16 bg-card/40 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              <span className="text-gradient">Business Solutions</span> Success Stories
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index + 1}>
                <div className="bg-background rounded-xl p-6 border border-border/20 card-hover relative">
                  <Quote className="h-8 w-8 text-[hsl(var(--neon-purple))]/30 mb-4" />
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))]" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))] flex items-center justify-center mr-4">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/60">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trusted Companies Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
          </ScrollReveal>
          
          <div className="flex justify-center">
            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border/20">
                <img 
                  src={companiesLogos} 
                  alt="Trusted Companies: StellarWave, Sttarketing, CloudNest, DataSphere" 
                  className="max-w-full h-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--neon-green))]/10 to-[hsl(var(--neon-blue))]/10 relative">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join Our <span className="text-gradient">Success Stories</span>?
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business and achieve your digital goals.
            </p>
            <a href="/contact" className="btn-gradient text-lg px-12 py-4 inline-block">
              Start Your Project
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}