import { useState } from "react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceType = 'AeonForge' | 'AeonRFP' | 'AeonAgent';

const serviceData = {
  AeonForge: {
    color: "neon-blue",
    tiers: [
      {
        name: "Starter Site",
        price: "₹4,999",
        popular: false,
        features: [
          "Personal site, 4 pages",
          "48h delivery",
          "Free domain",
          "1 month free maintenance"
        ]
      },
      {
        name: "Growth Bundle",
        price: "₹14,999",
        popular: true,
        features: [
          "Web + basic app (form/backend)",
          "Custom domain",
          "SEO optimization",
          "Analytics integration"
        ]
      },
      {
        name: "Scale Forge",
        price: "₹49,999",
        popular: false,
        features: [
          "Full website + PWA",
          "Lead generation system",
          "AI Chatbot integration",
          "CMS & email integrations"
        ]
      }
    ],
    addOns: [
      "AI Chat Assistant: ₹2,999",
      "Quarterly Maintenance: ₹999/qtr",
      "Mobile App wrapper (PWA to Android): ₹5,000"
    ]
  },
  AeonRFP: {
    color: "neon-green",
    tiers: [
      {
        name: "Launch Pass",
        price: "₹4,999 (one-time)",
        popular: false,
        features: [
          "Single user access",
          "5 proposals/month",
          "PDF RFP uploads",
          "AI response generation"
        ]
      },
      {
        name: "Growth Seat",
        price: "₹24,999/year",
        popular: true,
        features: [
          "3 users access",
          "Unlimited proposals",
          "Analytics dashboard",
          "Slack/Gmail integration"
        ]
      },
      {
        name: "Agency Power",
        price: "₹59,999/year",
        popular: false,
        features: [
          "10+ users access",
          "Custom templates",
          "CRM/API integration",
          "Dedicated onboarding support"
        ]
      }
    ],
    addOns: [
      "Doc Sign Workflow: ₹3,000",
      "Compliance Audit Agent: ₹4,999"
    ]
  },
  AeonAgent: {
    color: "neon-purple",
    tiers: [
      {
        name: "Core Agent",
        price: "₹19,999 one-time",
        popular: false,
        features: [
          "1 Agent deployment",
          "1 use-case (email triage, chatbot, scraper, etc)",
          "API/UI deployment",
          "Basic customization"
        ]
      },
      {
        name: "Smart Stack",
        price: "₹49,999 setup + ₹4,999/mo",
        popular: true,
        features: [
          "Up to 3 integrated agents",
          "Multi-use cases (RFP + Outreach + CRM)",
          "Dashboard access",
          "Monthly optimization"
        ]
      },
      {
        name: "Enterprise NeuralOps",
        price: "₹1.2L+ custom quote",
        popular: false,
        features: [
          "10+ agents deployment",
          "Private LLM/DB integration",
          "Advanced analytics",
          "White-labeling options"
        ]
      }
    ],
    addOns: [
      "SalesBot: Follow-up engine",
      "OpsAgent: HR query assistant",
      "SupportSentinel: Ticket triage",
      "PMAgent: Task assignment via Slack"
    ]
  }
};

function getPlanType(planName: string): string {
  switch (planName) {
    case 'Starter Site':
      return 'starter';
    case 'Growth Bundle':
      return 'growth';
    case 'Scale Forge':
      return 'scale';
    default:
      return 'starter';
  }
}

export default function PricingTiers() {
  const [selectedService, setSelectedService] = useState<ServiceType>('AeonForge');
  const currentService = serviceData[selectedService];
  
  return (
    <section className="py-20 bg-card/40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(178,102,255,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            Choose Your <span className="text-gradient">Service</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={1}>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-12">
            Select a service to view pricing plans designed for your specific needs.
          </p>
        </ScrollReveal>
        
        {/* Service Selection Buttons */}
        <ScrollReveal delay={2}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {(Object.keys(serviceData) as ServiceType[]).map((service) => (
              <Button
                key={service}
                onClick={() => setSelectedService(service)}
                className={cn(
                  "px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105",
                  selectedService === service
                    ? `bg-[hsl(var(--${serviceData[service].color}))] text-white shadow-lg shadow-[hsl(var(--${serviceData[service].color}))]/50 border-2 border-[hsl(var(--${serviceData[service].color}))] ring-2 ring-[hsl(var(--${serviceData[service].color}))]/30`
                    : "bg-background text-foreground border-2 border-foreground/20 hover:bg-foreground/10 hover:border-[hsl(var(--neon-blue))] hover:text-[hsl(var(--neon-blue))]"
                )}
              >
                {service}
              </Button>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Pricing Tiers for Selected Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {currentService.tiers.map((tier, index) => (
            <ScrollReveal 
              key={`${selectedService}-${tier.name}`}
              delay={index + 3}
              className={cn(
                "relative",
                tier.popular && "md:transform md:scale-[1.05] md:z-10"
              )}
            >
              <div className={cn(
                "bg-background rounded-xl overflow-hidden card-hover h-full flex flex-col",
                tier.popular && `shadow-xl shadow-[hsl(var(--${currentService.color}))]/10 border border-[hsl(var(--${currentService.color}))]/20`
              )}>
                <div className={cn(
                  "p-6 border-b border-foreground/10",
                  tier.popular && `bg-[hsl(var(--${currentService.color}))]/5`
                )}>
                  <h3 className="text-xl font-semibold text-center">{tier.name}</h3>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                  </div>
                  {tier.popular && (
                    <div className="absolute top-4 right-4">
                      <span className={`bg-[hsl(var(--${currentService.color}))] text-background text-xs px-2 py-1 rounded-full font-medium`}>
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className={`h-4 w-4 text-[hsl(var(--${currentService.color}))] mr-3 flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button 
                      onClick={() => window.location.href = `/auth?plan=${getPlanType(tier.name)}`}
                      className={cn(
                        "w-full py-3 rounded-lg transition-all font-bold text-base",
                        tier.popular 
                          ? `bg-[hsl(var(--${currentService.color}))] text-white hover:shadow-lg hover:shadow-[hsl(var(--${currentService.color}))]/30 border-2 border-[hsl(var(--${currentService.color}))] ring-1 ring-[hsl(var(--${currentService.color}))]/50`
                          : `text-white bg-[hsl(var(--${currentService.color}))] hover:bg-[hsl(var(--${currentService.color}))]/80 border-2 border-[hsl(var(--${currentService.color}))] hover:shadow-lg hover:shadow-[hsl(var(--${currentService.color}))]/30`
                      )}>
                        Choose Plan
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Add-ons Section */}
        <ScrollReveal delay={6}>
          <div className="bg-background rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-4">
              {selectedService === 'AeonAgent' ? 'Use Cases' : 'Optional Add-Ons'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentService.addOns.map((addOn, index) => (
                <div key={index} className="flex items-center p-3 bg-card rounded-lg">
                  <Check className={`h-4 w-4 text-[hsl(var(--${currentService.color}))] mr-3 flex-shrink-0`} />
                  <span className="text-sm">{addOn}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
