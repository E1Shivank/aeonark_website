import { Link } from "wouter";
import { Linkedin, Instagram, MessageSquare } from "lucide-react";
import aeonarkLogo from "@/assets/aeonark-logo.png";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/aeonark-labs/", icon: Linkedin, color: "neon-blue" },
  { name: "WhatsApp", href: "https://chat.whatsapp.com/DyqFra7IfF66RszqBLVs84", icon: MessageSquare, color: "neon-green" },
  { name: "Instagram", href: "#", icon: Instagram, color: "neon-purple" },
];

export default function Footer() {
  return (
    <footer className="bg-background py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <img 
                src={aeonarkLogo} 
                alt="Aeonark Labs" 
                className="h-10 w-10 object-contain mr-3"
              />
              <span className="text-xl font-bold text-gradient">Aeonark Labs</span>
            </div>
            <p className="text-foreground/60 mt-2">Building the digital future.</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-[hsl(var(--${link.color}))]/10 text-[hsl(var(--${link.color}))] hover:bg-[hsl(var(--${link.color}))]/20 transition-colors`}
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <nav className="flex flex-wrap justify-center md:justify-end gap-6 mb-4">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div className="text-foreground/70 hover:text-[hsl(var(--neon-blue))] transition-colors cursor-pointer">
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
            <p className="text-foreground/60 text-sm">© {new Date().getFullYear()} Aeonark Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
