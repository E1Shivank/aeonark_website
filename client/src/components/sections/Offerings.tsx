import ScrollReveal from "@/components/ScrollReveal";
import { Monitor, FileText, Bot, Check } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function Offerings() {
  return (
    <section className="py-16 bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-16">
            Our <span className="text-gradient">Key Offerings</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AeonForge */}
          <ScrollReveal delay={1}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-blue))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-blue))]/10 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AeonForge</h3>
              <p className="text-foreground/70 mb-4">
                AeonForge isn't just web development — it's your digital launchpad
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  48-hour personal brand sites
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Scalable web apps for service automation
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  SEO, analytics, and lead-gen integrated by default
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Growth-ready: connect with AI agents anytime
                </div>
              </div>
              <div className="mt-auto">
                <a href="/aeonforge" className="flex items-center text-[hsl(var(--neon-blue))] hover:underline cursor-pointer">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          {/* AeonRFP */}
          <ScrollReveal delay={2}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-green))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-green))]/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-[hsl(var(--neon-green))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AeonRFP</h3>
              <p className="text-foreground/70 mb-4">
                Automated RFP, Quote & Proposal Generation for Agencies, SaaS. AeonRFP is your unfair advantage in enterprise sales. It scans complex RFP documents, auto-drafts proposal responses, and delivers polished pitch decks — tailored to your services, voice, and clients — in minutes.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Upload any RFP or brief (PDF/DOCX)
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Get full proposal drafts, tailored to your business
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  SmartMatch tech scores opportunities by fit
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Works with Slack, Gmail, Google Drive & CRMs
                </div>
              </div>
              <p className="text-sm text-foreground/60 mb-4">
                From 20-hour drafts to 2-minute proposals — without hiring a single new writer.
              </p>
              <div className="mt-auto">
                <a href="/aeonrfp" className="flex items-center text-[hsl(var(--neon-green))] hover:underline cursor-pointer">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          {/* AeonAgent */}
          <ScrollReveal delay={3}>
            <div className="rounded-xl p-6 bg-card border border-[hsl(var(--neon-purple))]/20 card-hover">
              <div className="w-14 h-14 mb-4 rounded-lg bg-[hsl(var(--neon-purple))]/10 flex items-center justify-center">
                <Bot className="h-8 w-8 text-[hsl(var(--neon-purple))]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AeonAgent</h3>
              <p className="text-foreground/70 mb-4">
                Custom AI agents for sales, operations, legal, HR, and more. AeonAgent builds your private AI workforce. From triaging support tickets to generating daily reports, from sales outreach to internal task routing — we craft intelligent, role-specific AI agents that integrate directly into your stack.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  SalesBots that follow up 24/7
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Legal agents that scan contracts or policy updates
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  Support agents that reduce ticket load by 60%
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-[hsl(var(--neon-green))] mr-2" />
                  HR bots that onboard or answer team queries
                </div>
              </div>
              <p className="text-sm text-foreground/60 mb-4">
                Your team shouldn't do what an agent can. Deploy precision AI, made for your operations.
              </p>
              <div className="mt-auto">
                <a href="/aeonagent" className="flex items-center text-[hsl(var(--neon-purple))] hover:underline cursor-pointer">
                  <span className="mr-2 font-medium">Learn more</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
