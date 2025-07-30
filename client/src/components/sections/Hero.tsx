import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Shield, Zap, ThumbsUp, Clock } from "lucide-react";
import TwinklingStars from "@/components/animations/TwinklingStars";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      <TwinklingStars />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              We Engineer <span className="text-gradient">Digital Power</span> — Websites, Apps & AI Agents.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={1}>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Launch faster. Convert smarter. Dominate with less.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="btn-gradient">
                  Let's Build Something
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Trust badges */}
        <ScrollReveal delay={3}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-foreground/80">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2 rounded-full bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <span>100% Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2 rounded-full bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <Zap className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <span>Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2 rounded-full bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <ThumbsUp className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <span>Top Quality</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2 rounded-full bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-[hsl(var(--neon-blue))]/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-40 left-10 w-48 h-48 bg-[hsl(var(--neon-green))]/10 rounded-full filter blur-3xl"></div>
    </section>
  );
}