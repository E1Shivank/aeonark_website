import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import aeonarkLogo from "@/assets/aeonark-logo.png";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About Us", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <img 
            src={aeonarkLogo} 
            alt="Aeonark Labs" 
            className="h-12 w-12 object-contain cursor-pointer"
          />
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className={cn(
                "relative text-foreground hover:text-[hsl(var(--neon-blue))] transition-colors py-2 cursor-pointer",
                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[hsl(var(--neon-blue))] after:to-[hsl(var(--neon-green))] after:transition-all after:duration-300",
                "hover:after:w-full",
                location === item.href && "after:w-full font-medium"
              )}>
                {item.name}
              </span>
            </Link>
          ))}

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/new-auth'}
              className={cn(
                "border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))] hover:text-black transition-all duration-300",
                "hover:shadow-lg hover:shadow-[hsl(var(--neon-blue))]/50 hover:scale-105"
              )}
            >
              Login
            </Button>
            <Button 
              size="sm"
              onClick={() => window.location.href = '/new-auth'}
              className={cn(
                "bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-black hover:from-[hsl(var(--neon-blue))] hover:to-[hsl(var(--neon-green))] transition-all duration-300",
                "hover:shadow-lg hover:shadow-[hsl(var(--neon-green))]/50 hover:scale-105"
              )}
            >
              Sign Up
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={cn(
          "fixed inset-0 top-[57px] bg-background z-40 transition-transform duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="px-4 py-6 space-y-2 flex flex-col">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className={cn(
                    "block py-3 px-4 text-lg rounded-md hover:bg-foreground/10 transition-colors cursor-pointer",
                    location === item.href && "font-medium text-[hsl(var(--neon-blue))]"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-foreground/10 space-y-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/new-auth';
                }}
                className={cn(
                  "w-full border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))] hover:text-black transition-all duration-300",
                  "hover:shadow-lg hover:shadow-[hsl(var(--neon-blue))]/50"
                )}
              >
                Login
              </Button>
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/new-auth';
                }}
                className={cn(
                  "w-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-black hover:from-[hsl(var(--neon-blue))] hover:to-[hsl(var(--neon-green))] transition-all duration-300",
                  "hover:shadow-lg hover:shadow-[hsl(var(--neon-green))]/50"
                )}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}