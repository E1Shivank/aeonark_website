# Aeonark Labs Website

## Overview
This project is a modern, responsive multi-page website for Aeonark Labs, an Indian digital solutions company. It aims to showcase their services in web development, app development, and AI solutions. The website features a clean, professional design with neon accents and smooth animations, targeting a broad market for digital solutions. The business vision is to provide cutting-edge digital services, with ambitions for market leadership in web, app, and AI solutions.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom design system, utilizing Radix UI components and shadcn/ui integration.
- **Animations**: Framer Motion for scroll reveals and transitions.
- **State Management**: React Query for server state.
- **UI/UX Decisions**: Clean, professional design with neon accent colors. Responsive design with a mobile-first approach. Dark/light theme support. Custom components like ScrollReveal, gradient buttons, and animated cards enhance user experience.

### Backend
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Structure**: RESTful endpoints for health checks, contact form, and authentication flows.
- **File Processing**: Archiver for project downloads.
- **Authentication**: OTP-based authentication system for user management, integrated with Supabase for robust, secure authentication and session management.

### Key Features
- **Pages**: Home, Services, Pricing (three-tier structure), About, Testimonials, Contact.
- **User Authentication**: Secure OTP-based login/signup, onboarding, and cart management with plan selection and add-ons.
- **Payment Flow**: Cart system with Indian Rupee (₹) currency, plan selection, and add-ons.
- **Design Elements**: Twinkling stars background, Aeonark Labs branding, and neon glow effects for interactive elements.

## External Dependencies

- **Database Provider**: Neon Database (serverless PostgreSQL), Supabase (for authentication and database).
- **Email Services**: Resend (for server-side contact form), Nodemailer with Gmail SMTP (for OTP and admin notifications).
- **Analytics/Monitoring**: (No explicit third-party service mentioned, handled internally or via platform defaults).
- **APIs**: No external third-party APIs apart from email and database providers.
- **Core Libraries**:
    - **React Ecosystem**: `react`, `react-dom`, `wouter`.
    - **UI/Styling**: `@radix-ui/*`, `lucide-react`, `tailwindcss`, `class-variance-authority`, `clsx`.
    - **Database/ORM**: `@neondatabase/serverless`, `drizzle-orm`, `supabase-js`.
    - **Server**: `express`, `archiver`.
    - **Animations**: `framer-motion`.
    - **Forms**: `react-hook-form`, `@hookform/resolvers`.
    - **Email**: `nodemailer`, `@resend/node`.
- **Deployment-Specific Tools**: Vercel (for serverless functions), Docker (for containerization on platforms like Render.com).