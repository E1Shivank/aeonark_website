import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Monitor, FileText, Bot, Check
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "AeonForge",
    description: "AeonForge isn't just web development — it's your digital launchpad",
    features: [
      "48-hour personal brand sites",
      "Scalable web apps for service automation",
      "SEO, analytics, and lead-gen integrated by default",
      "Growth-ready: connect with AI agents anytime"
    ],
    icon: <Monitor className="h-6 w-6 text-[hsl(var(--neon-blue))]" />,
    color: "neon-blue"
  },
  {
    id: 2,
    title: "AeonRFP",
    description: "Automated RFP, Quote & Proposal Generation for Agencies, SaaS. AeonRFP is your unfair advantage in enterprise sales. It scans complex RFP documents, auto-drafts proposal responses, and delivers polished pitch decks — tailored to your services, voice, and clients — in minutes.",
    features: [
      "Upload any RFP or brief (PDF/DOCX)",
      "Get full proposal drafts, tailored to your business",
      "SmartMatch tech scores opportunities by fit",
      "Works with Slack, Gmail, Google Drive & CRMs"
    ],
    icon: <FileText className="h-6 w-6 text-[hsl(var(--neon-green))]" />,
    color: "neon-green"
  },
  {
    id: 3,
    title: "AeonAgent",
    description: "Custom AI agents for sales, operations, legal, HR, and more. AeonAgent builds your private AI workforce. From triaging support tickets to generating daily reports, from sales outreach to internal task routing — we craft intelligent, role-specific AI agents that integrate directly into your stack.",
    features: [
      "SalesBots that follow up 24/7",
      "Legal agents that scan contracts or policy updates",
      "Support agents that reduce ticket load by 60%",
      "HR bots that onboard or answer team queries"
    ],
    icon: <Bot className="h-6 w-6 text-[hsl(var(--neon-purple))]" />,
    color: "neon-purple"
  }
];

export default function ServiceCards() {
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(57,255,20,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={1}>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Comprehensive digital solutions to power your online presence and business operations.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index + 2}>
              <div className={`bg-card rounded-xl p-6 border border-[hsl(var(--${service.color}))]/10 card-hover`}>
                <div className="flex items-start mb-5">
                  <div className={`w-12 h-12 rounded-lg bg-[hsl(var(--${service.color}))]/10 flex items-center justify-center mr-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-foreground/70 text-sm mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 mb-5">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link href={service.id === 1 ? "/aeonforge" : service.id === 2 ? "/aeonrfp" : "/aeonagent"}>
                  <Button className={`py-2 px-4 rounded-lg bg-[hsl(var(--${service.color}))]/10 text-[hsl(var(--${service.color}))] hover:bg-[hsl(var(--${service.color}))]/20 transition-all`}>
                    Learn More
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
