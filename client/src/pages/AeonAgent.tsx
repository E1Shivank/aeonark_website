import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Bot, Users, MessageCircle, BarChart3, Check } from "lucide-react";
import { Link } from "wouter";

export default function AeonAgent() {
  const features = [
    "SalesBots that follow up 24/7",
    "Legal agents that scan contracts or policy updates",
    "Support agents that reduce ticket load by 60%",
    "HR bots that onboard or answer team queries"
  ];

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-[hsl(var(--neon-blue))]" />,
      title: "Full AI Workforce",
      description: "Deploy role-specific agents for every department"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-[hsl(var(--neon-green))]" />,
      title: "Seamless Integration", 
      description: "Works with Slack, web interfaces, or direct API"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[hsl(var(--neon-purple))]" />,
      title: "Proven Results",
      description: "60% reduction in support tickets, 24/7 availability"
    }
  ];

  const useCases = [
    {
      title: "Sales Operations",
      description: "Automated follow-ups, lead qualification, and CRM updates",
      color: "neon-blue"
    },
    {
      title: "Customer Support",
      description: "Instant responses, ticket routing, and issue resolution",
      color: "neon-green"
    },
    {
      title: "HR & Onboarding",
      description: "Employee queries, policy updates, and new hire processes",
      color: "neon-purple"
    },
    {
      title: "Legal & Compliance",
      description: "Contract analysis, policy monitoring, and compliance checks",
      color: "neon-blue"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AeonAgent - Custom AI Agents | Aeonark Labs</title>
        <meta name="description" content="AeonAgent builds your private AI workforce. Custom AI agents for sales, operations, legal, HR, and more. Deploy precision AI made for your operations." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-purple))]/10 via-transparent to-[hsl(var(--neon-blue))]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Bot className="h-16 w-16 text-[hsl(var(--neon-purple))] mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="text-gradient">AeonAgent</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-foreground/80 mb-6">
                Custom AI agents for sales, operations, legal, HR, and more
              </p>
              <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
                AeonAgent builds your private AI workforce. From triaging support tickets to generating daily reports, from sales outreach to internal task routing — we craft intelligent, role-specific AI agents that integrate directly into your stack.
              </p>
              <p className="text-xl font-semibold text-[hsl(var(--neon-purple))] mb-8">
                No fluff. Just results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-gradient text-lg px-8 py-4">
                    Request Access
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4 border-[hsl(var(--neon-purple))]/30">
                  See Examples
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/40 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              What Your <span className="text-gradient">AI Workforce</span> Can Do
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="flex items-center p-6 bg-background rounded-xl border border-[hsl(var(--neon-purple))]/20">
                  <Check className="h-6 w-6 text-[hsl(var(--neon-green))] mr-4 flex-shrink-0" />
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              <span className="text-gradient">AI Agents</span> for Every Department
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className={`p-6 bg-card rounded-xl border border-[hsl(var(--${useCase.color}))]/20 card-hover`}>
                  <h3 className={`text-xl font-semibold mb-3 text-[hsl(var(--${useCase.color}))]`}>
                    {useCase.title}
                  </h3>
                  <p className="text-foreground/70">{useCase.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/40">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              Why Choose <span className="text-gradient">AeonAgent</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="text-center p-6 bg-background rounded-xl border border-border/20 card-hover">
                  <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-foreground/70">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Built with <span className="text-gradient">State-of-the-Art LLMs</span>
              </h2>
              <p className="text-xl text-foreground/80 mb-8">
                All built using state-of-the-art LLMs (GPT, Claude, DeepSeek), embedded with your data, and deployed via Slack, web, or API.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--neon-purple))]/10 to-[hsl(var(--neon-blue))]/10 relative">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-6">
              Your team shouldn't do what <span className="text-gradient">an agent can</span>
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Deploy precision AI, made for your operations.
            </p>
            <Link href="/contact">
              <Button className="btn-gradient text-lg px-12 py-4">
                Deploy Your AI Workforce
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}