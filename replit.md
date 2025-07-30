# Aeonark Labs Website

## Overview

This is a modern, responsive multi-page website for Aeonark Labs, an Indian digital solutions company. The website showcases their services in web development, app development, and AI solutions. Built with React, TypeScript, and modern web technologies, it features a clean, professional design with neon accent colors and smooth animations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: Radix UI components with shadcn/ui integration
- **Animations**: Framer Motion for smooth scroll reveals and transitions
- **State Management**: React Query for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Structure**: RESTful endpoints for health checks and contact form
- **File Processing**: Archiver for project downloads

## Key Components

### Pages
- **Home**: Hero section with key offerings showcase
- **Services**: Detailed service cards with descriptions
- **Pricing**: Three-tier pricing structure (Starter, Growth, Scale)
- **About**: Company story and founder information
- **Collaborations**: Client testimonials and case studies
- **Contact**: Contact form with company information

### UI Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Company links and social media
- **ScrollReveal**: Animated component reveals on scroll
- **Theme Provider**: Dark/light theme support
- **Button**: Gradient button variants with hover effects
- **Card**: Reusable card components with hover animations

### Database Schema
- **Users Table**: Basic user authentication structure
- Extensible schema for future features like contact submissions or client data

## Data Flow

1. **Static Content**: Most content is hardcoded in components for fast loading
2. **Contact Form**: Collects user data and returns success response (no actual storage implemented)
3. **API Endpoints**: Health check and contact form processing
4. **Theme Management**: Client-side theme persistence using localStorage
5. **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Production Dependencies
- **React Ecosystem**: react, react-dom, react-router via wouter
- **UI Components**: @radix-ui/* components, lucide-react icons
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Database**: @neondatabase/serverless, drizzle-orm
- **Server**: express, archiver for file processing
- **Animations**: framer-motion
- **Forms**: react-hook-form, @hookform/resolvers

### Development Dependencies
- **Build Tools**: vite, typescript, esbuild
- **Development**: tsx for TypeScript execution
- **Database Tools**: drizzle-kit for migrations
- **Replit Integration**: @replit/vite-plugin-* for development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle handles schema migrations and seeding

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)
- **PROJECT_FILES_DIR**: Directory for file downloads (optional)

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Push database schema changes
- `db:seed`: Seed database with initial data

### Hosting Considerations
- **Static Assets**: Served from `/Aeonark/` base path
- **API Routes**: Express server handles `/api/*` endpoints
- **Database**: Serverless PostgreSQL via Neon
- **File Storage**: Local file system for project downloads

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Migration from Replit Agent to Replit environment completed
- July 05, 2025. Updated branding with new logo and key offerings:
  - Added Aeonark Labs logo to replace text branding
  - Updated key offerings to AeonForge, AeonRFP, and AeonAgent
  - Added detailed feature descriptions for each offering
  - Fixed navbar structure to remove nested anchor tag warnings
- July 05, 2025. Testimonials and Contact Form Implementation:
  - Converted Collaborations page to Testimonials page
  - Added portfolio testimonials for interior designers and architects
  - Added business testimonials for AeonForge, AeonRFP, and AeonAgent
  - Integrated company logos and testimonial photos
  - Added external link to www.setare-rezaei.com testimonial
  - Implemented EmailJS contact form functionality
  - Contact form now sends to aeonark.labs@gmail.com
  - Added form validation and loading states
  - Updated navigation to use "Testimonials" instead of "Collaborations"
- July 05, 2025. Space Theme and Animation Updates:
  - Removed rotating cube animation from hero section
  - Added twinkling stars background with meteor animations
  - Updated hero heading to "We Engineer Digital Power — Websites, Apps & AI Agents"
  - Updated subheading to "Launch faster. Convert smarter. Dominate with less."
  - Made background darker like space (3% lightness for dark theme)
  - Configured EmailJS with real credentials (service_wxxvfxn, template_d40xh5o)
  - Updated Calendly integration to https://calendly.com/aeonark-lab/30min
  - Hero section now uses centered layout without rotating cube
- July 09, 2025. Logo and Contact Form Updates:
  - Replaced old logo with new knight chess piece logo in black and white
  - Updated logo references in navbar and footer components
  - Changed contact email from aeonark.labs@gmail.com to aeonark.lab@gmail.com
  - Migrated contact form from EmailJS to Resend for better reliability
  - Added server-side contact form handling with Resend integration
  - Fixed pricing section button visibility with improved borders and colors
  - Enhanced "Choose Plan" button visibility for all pricing tiers
  - Fixed DOM nesting warning in Footer component by removing nested anchor tags
- July 09, 2025. Full-Stack SaaS Authentication System Implementation:
  - Built complete OTP-based authentication system using PostgreSQL and Resend
  - Added database schema for users, OTP codes, and cart items with proper relations
  - Created AuthPage with dark-mode UI and email/OTP verification tabs
  - Implemented OnboardingPage for collecting user profile information
  - Built CartPage with plan selection, add-ons, and pricing calculations
  - Added JWT-based session management with secure token storage
  - Integrated admin notification emails to aeonark.lab@gmail.com for new users
  - Updated pricing section "Choose Plan" buttons to redirect to auth flow
  - Added proper routing for auth flow without navbar/footer interference
  - Implemented brute-force protection and OTP expiry security measures
  - Added comprehensive form validation and error handling throughout
- July 09, 2025. UI/UX Improvements and Localization:
  - Fixed DOM nesting errors in Footer and PricingTiers components
  - Changed currency from USD ($) to Indian Rupees (₹) throughout cart system
  - Added twinkling stars background animation to OnboardingPage and CartPage
  - Integrated Aeonark Labs logo next to "Welcome to Aeonark Labs" in onboarding
  - Added logo to cart page header in top-left navigation area
  - Enhanced error handling in API client with proper JSON parsing
  - Improved authentication flow with better error messages and debugging
- July 09, 2025. Complete Supabase Authentication Migration:
  - Migrated from Replit Agent to Replit environment successfully
  - Replaced custom OTP system with Supabase auth.signInWithOtp
  - Built enhanced authentication flow with email-check logic for signup vs login
  - Updated database schema to use UUID-based user IDs for Supabase compatibility
  - Created NewAuthPage with improved mobile-responsive design and flow detection
  - Enhanced authentication determines signup vs login automatically based on email existence
  - Added proper session management using Supabase sessions and JWT tokens
  - Updated OnboardingPage and CartPage to use new auth system
  - Fixed all DOM nesting warnings and improved error handling
  - OTP emails now work for all email addresses, not just aeonark.lab@gmail.com
- July 09, 2025. Final Environment Migration and UI Improvements:
  - Completed full migration from Replit Agent to Replit environment
  - Added conditional database/email service fallbacks for development
  - Fixed pricing discrepancies in cart pages (starter: ₹4,999, growth: ₹14,999, scale: ₹49,999)
  - Corrected add-on pricing (AI Chatbot: ₹2,999, Mobile App: ₹5,000, Maintenance: ₹999)
  - Fixed logo display issues in cart pages with proper asset paths
  - Added Login/Signup buttons to navbar with neon glow hover effects
  - Integrated mobile-responsive auth buttons in navigation menu
  - Project now fully operational in Replit environment with proper fallbacks
- July 09, 2025. Complete Bug Fixes and Final Polish:
  - Fixed all pricing inconsistencies across CartPage.tsx and NewCartPage.tsx
  - Updated PLAN_PRICES to correct values (starter: ₹4,999, growth: ₹14,999, scale: ₹49,999)
  - Fixed AVAILABLE_ADDONS pricing (AI Chatbot: ₹2,999, Mobile App: ₹5,000, Maintenance: ₹999)
  - Corrected logo paths in both cart pages from "/Aeonark/aeonark-logo.png" to "/Aeonark/src/assets/aeonark-logo.png"
  - Added prominent Login/Signup buttons to navbar with neon glow hover effects
  - Implemented mobile-responsive auth buttons in navigation menu
  - Fixed DOM nesting warning by removing Link wrappers from nav buttons
  - Added missing /new-auth route to App.tsx router configuration
  - Added /new-onboarding and /new-cart routes for complete auth flow
  - All routing issues resolved permanently - auth buttons now work correctly
- July 09, 2025. Docker Containerization Setup:
  - Created production-ready Dockerfile with multi-stage build process
  - Added docker-compose.yml for easy orchestration and deployment
  - Included .dockerignore for optimized build context
  - Created .env.docker template for environment variable management
  - Added comprehensive docker-deployment.md guide with setup instructions
  - Docker setup includes health checks, security hardening, and asset handling
- July 28, 2025. Vercel Deployment Configuration:
  - Migrated project from Replit Agent to Replit environment successfully
  - Created complete Vercel serverless API structure in /api directory
  - Built serverless functions for all authentication and cart endpoints
  - Added vercel.json configuration with proper routing and environment variables
  - Created README-VERCEL.md with comprehensive deployment guide
  - Added development fallbacks for all external services (database, email, auth)
  - Project now supports both Replit development and Vercel production deployment
  - All API endpoints converted to Vercel-compatible serverless functions
- July 28, 2025. Gmail Integration for OTP Authentication:
  - Replaced MailerSend with Gmail SMTP using Nodemailer
  - Created professional HTML email templates for OTP delivery
  - Added Gmail app password authentication system
  - Built server/emailService.ts with sendOTPEmail and sendAdminNotification functions
  - Updated all Vercel API endpoints to use Gmail for email sending
  - Created GMAIL-SETUP-GUIDE.md with complete setup instructions
  - Added environment variables for GMAIL_USER and GMAIL_PASSWORD
  - Enhanced email templates with Aeonark Labs branding and security features
- July 28, 2025. Complete .env File Configuration:
  - Added dotenv package and configuration to all API endpoints and server files
  - Updated all hardcoded fallback values to properly use environment variables
  - Created comprehensive .env.example template with all required variables
  - Fixed Gmail integration to use proper environment configuration from .env file
  - Updated all JWT secrets and database connections to use environment variables
  - All code now loads environment variables from .env file using dotenv.config()
  - Created ENV-SETUP-COMPLETE.md with complete configuration guide
- July 28, 2025. Complete Vercel Deployment Configuration Fixed:
  - Fixed all Vercel environment variable reference errors in vercel.json
  - Added Supabase DATABASE_URL integration for production database storage
  - Successfully pushed database schema to Supabase with users, otp_codes, and cart_items tables
  - Corrected secret name mappings: @database_url, @gmail_user, @gmail_password, @jwt_secret
  - Tested complete authentication flow with real database connection
  - Created VERCEL-COMPLETE-SETUP.md with exact deployment instructions
  - All environment variable errors resolved for production Vercel deployment
- July 29, 2025. Full Vercel Compatibility Implementation:
  - Fixed all TypeScript compilation errors in storage system
  - Updated tsconfig.json with proper ES2015 target and downlevelIteration support
  - Resolved type compatibility issues in MemStorage implementation
  - Added complete environment variable mapping in vercel.json for all required secrets
  - Created comprehensive README-VERCEL.md deployment guide
  - Added .env.example template with all required environment variables
  - Created automated deploy-vercel.sh script for easy deployment
  - Project is now fully compatible with Vercel serverless architecture
  - All API endpoints configured as Vercel serverless functions
  - Build process optimized for Vercel static file serving
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```