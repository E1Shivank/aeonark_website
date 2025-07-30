import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { FileText, Upload, Zap, Target, Check } from "lucide-react";
import { Link } from "wouter";

export default function AeonRFP() {
  const features = [
    "Upload any RFP or brief (PDF/DOCX)",
    "Get full proposal drafts, tailored to your business",
    "SmartMatch tech scores opportunities by fit",
    "Works with Slack, Gmail, Google Drive & CRMs"
  ];

  const benefits = [
    {
      icon: <Upload className="h-8 w-8 text-[hsl(var(--neon-blue))]" />,
      title: "Easy Upload",
      description: "Drop any RFP document and watch the magic happen"
    },
    {
      icon: <Zap className="h-8 w-8 text-[hsl(var(--neon-green))]" />,
      title: "Instant Processing", 
      description: "From 20-hour drafts to 2-minute proposals"
    },
    {
      icon: <Target className="h-8 w-8 text-[hsl(var(--neon-purple))]" />,
      title: "Perfect Targeting",
      description: "SmartMatch scores opportunities by business fit"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AeonRFP - Automated Proposal Generation | Aeonark Labs</title>
        <meta name="description" content="AeonRFP is your unfair advantage in enterprise sales. Auto-draft proposal responses and deliver polished pitch decks in minutes, not hours." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-green))]/10 via-transparent to-[hsl(var(--neon-blue))]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <FileText className="h-16 w-16 text-[hsl(var(--neon-green))] mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="text-gradient">AeonRFP</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-foreground/80 mb-6">
                Automated RFP, Quote & Proposal Generation for Agencies, SaaS
              </p>
              <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
                AeonRFP is your unfair advantage in enterprise sales. It scans complex RFP documents, auto-drafts proposal responses, and delivers polished pitch decks — tailored to your services, voice, and clients — in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-gradient text-lg px-8 py-4">
                    Request Access
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4 border-[hsl(var(--neon-green))]/30">
                  See Demo
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-card/40 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              <span className="text-gradient">Powered by DeepSeek LLM</span>
            </h2>
            <p className="text-xl text-center text-foreground/70 mb-16 max-w-3xl mx-auto">
              AeonRFP acts as your internal proposal writer, summarizer, compliance officer, and sales strategist — all in one.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="flex items-center p-6 bg-background rounded-xl border border-[hsl(var(--neon-green))]/20">
                  <Check className="h-6 w-6 text-[hsl(var(--neon-green))] mr-4 flex-shrink-0" />
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              Why <span className="text-gradient">AeonRFP</span> Changes Everything
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="text-center p-6 bg-card rounded-xl border border-border/20 card-hover">
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

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--neon-green))]/10 to-[hsl(var(--neon-blue))]/10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                From 20-hour drafts to <span className="text-gradient">2-minute proposals</span>
              </h2>
              <p className="text-xl text-foreground/80 mb-8">
                — without hiring a single new writer.
              </p>
              <Link href="/contact">
                <Button className="btn-gradient text-lg px-12 py-4">
                  Transform Your Sales Process
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}