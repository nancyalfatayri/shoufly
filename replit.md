# Overview

This is a full-stack e-commerce web application called "Shoufly" that showcases local merchants and their products. The application allows users to browse different merchants (like grocery stores, pharmacies, and bakeries) and view their product catalogs. It's built as a modern single-page application with a React frontend and Express backend, designed for local business discovery and shopping.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA**: Built with React 18 using TypeScript and Vite as the build tool
- **UI Framework**: Utilizes shadcn/ui components with Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod resolvers for type-safe form validation

## Backend Architecture
- **Server Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Data Storage**: Currently implements in-memory storage for development, designed to transition to PostgreSQL
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)

## Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript implementation across frontend, backend, and shared types
- **Code Organization**: Monorepo structure with shared schema definitions between client and server
- **Development Server**: Integrated Vite dev server with Express backend proxy

## Database Design
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Type Generation**: Automatic TypeScript type generation from database schema
- **Validation**: Zod schemas for runtime validation matching database structure
- **Current Schema**: Supports merchants and products with relational data structure

## Design System
- **Component Library**: Custom shadcn/ui implementation with consistent styling
- **Theming**: CSS custom properties for colors, spacing, and typography
- **Typography**: Inter font family for modern, readable text
- **Color Scheme**: Blue and green accent colors for different merchant types
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Session Storage**: PostgreSQL-backed session management (connect-pg-simple)

## UI & Styling
- **Radix UI**: Comprehensive set of accessible React components (@radix-ui/*)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS integration
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

## Development Tools
- **Vite**: Build tool with React plugin and runtime error overlay
- **Replit Integration**: Cartographer plugin for Replit-specific development features
- **TypeScript**: Static type checking and enhanced developer experience

## Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for type-safe data handling
- **Date-fns**: Date manipulation and formatting utilities

## State Management
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Minimalist routing library for React applications

## Utility Libraries
- **Class Variance Authority**: Type-safe CSS class composition
- **clsx & tailwind-merge**: Conditional CSS class handling
- **nanoid**: URL-safe unique ID generation