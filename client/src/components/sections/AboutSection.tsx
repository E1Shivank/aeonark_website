import ScrollReveal from "@/components/ScrollReveal";
import { User } from "lucide-react";

const founders = [
  {
    name: "Shwetank Pandey",
    title: "Co-Founder & CEO",
    bio: "Technopreneur with expertise in AI and web technologies, focused on creating innovative digital solutions.",
    color: "neon-blue"
  },
  {
    name: "Shivank Pandey",
    title: "Co-Founder & CTO",
    bio: "Full-stack developer and systems architect with a passion for creating scalable, efficient digital platforms.",
    color: "neon-green"
  }
];

const timeline = [
  {
    year: "2022",
    description: "Founded Aeonark Labs with a vision to make cutting-edge technology accessible to startups.",
    color: "neon-blue"
  },
  {
    year: "2023",
    description: "Expanded our services to include AI agents and automation solutions for businesses.",
    color: "neon-green"
  },
  {
    year: "2024",
    description: "Launched our comprehensive service packages to serve clients across different growth stages.",
    color: "neon-purple"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,229,255,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            About <span className="text-gradient">Aeonark Labs</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ScrollReveal delay={1}>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Founded with a mission to democratize access to cutting-edge tech, Aeonark Labs builds affordable, powerful digital systems for startups and visionaries.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Based in Gurugram, India, our team of 10 talented professionals is revolutionizing how businesses adopt and leverage technology. We combine technical expertise with creative thinking to deliver solutions that drive real business growth.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We believe in creating technology that not only solves problems but also empowers businesses to grow and thrive in the digital landscape. Our team is passionate about innovation, quality, and delivering exceptional value to our clients.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={1} direction="right">
            <h3 className="text-2xl font-semibold mb-4">Meet Our Founders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Founder cards */}
              {founders.map((founder, index) => (
                <div key={index} className="bg-card rounded-xl p-5 card-hover">
                  <div className={`w-20 h-20 rounded-full bg-[hsl(var(--${founder.color}))]/10 flex items-center justify-center mb-4`}>
                    <User className={`h-10 w-10 text-[hsl(var(--${founder.color}))]`} />
                  </div>
                  <h4 className="text-lg font-semibold">{founder.name}</h4>
                  <p className="text-sm text-foreground/60 mb-2">{founder.title}</p>
                  <p className="text-sm text-foreground/80">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        
        {/* Timeline Section */}
        <ScrollReveal delay={2}>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-10">Our Journey</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--neon-blue))] via-[hsl(var(--neon-green))] to-[hsl(var(--neon-purple))] transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center relative",
                      index % 2 === 0 
                        ? "md:col-start-2 md:text-left" 
                        : "md:col-start-1 md:text-right"
                    )}
                  >
                    <div 
                      className={cn(
                        `w-4 h-4 rounded-full bg-[hsl(var(--${item.color}))] absolute left-1/2 transform -translate-x-1/2`,
                        index % 2 === 0 
                          ? "md:left-0 md:-translate-x-[calc(100%+18px)]" 
                          : "md:right-0 md:left-auto md:translate-x-[calc(100%+18px)]"
                      )}
                    ></div>
                    <div 
                      className={cn(
                        "bg-card p-5 rounded-xl w-full card-hover",
                        index % 2 === 0 
                          ? "md:ml-6" 
                          : "md:mr-6"
                      )}
                    >
                      <h4 className={`text-[hsl(var(--${item.color}))] font-semibold mb-2`}>{item.year}</h4>
                      <p className="text-sm text-foreground/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Helper function for conditional classNames
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
