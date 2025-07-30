import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Monitor, Clock, Zap, TrendingUp, Check } from "lucide-react";
import { Link } from "wouter";

export default function AeonForge() {
  const features = [
    "48-hour personal brand sites",
    "Scalable web apps for service automation", 
    "SEO, analytics, and lead-gen integrated by default",
    "Growth-ready: connect with AI agents anytime"
  ];

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-[hsl(var(--neon-blue))]" />,
      title: "Lightning Fast Delivery",
      description: "From concept to live website in just 48 hours"
    },
    {
      icon: <Zap className="h-8 w-8 text-[hsl(var(--neon-green))]" />,
      title: "Built for Performance", 
      description: "Optimized for speed, SEO, and conversions"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[hsl(var(--neon-purple))]" />,
      title: "Growth Focused",
      description: "Ready to scale with AI integration capabilities"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AeonForge - Custom Website Development | Aeonark Labs</title>
        <meta name="description" content="AeonForge isn't just web development — it's your digital launchpad. Get your professional website in 48 hours with built-in SEO and growth features." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))]/10 via-transparent to-[hsl(var(--neon-green))]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Monitor className="h-16 w-16 text-[hsl(var(--neon-blue))] mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="text-gradient">AeonForge</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-foreground/80 mb-8">
                AeonForge isn't just web development — it's your digital launchpad
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-gradient text-lg px-8 py-4">
                    Request Access
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4 border-[hsl(var(--neon-blue))]/30">
                  View Examples
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
              What You Get with <span className="text-gradient">AeonForge</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index + 1}>
                <div className="flex items-center p-6 bg-background rounded-xl border border-[hsl(var(--neon-blue))]/20">
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
              Why Choose <span className="text-gradient">AeonForge</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--neon-blue))]/10 to-[hsl(var(--neon-green))]/10 relative">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-6">
              Ready to Launch Your <span className="text-gradient">Digital Presence</span>?
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the businesses that chose speed, quality, and growth with AeonForge.
            </p>
            <Link href="/contact">
              <Button className="btn-gradient text-lg px-12 py-4">
                Get Started Now
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}