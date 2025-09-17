# Tennis Travel Assistant

A specialized travel planning application for tennis players to book flights and hotels for tournaments.

## 🎾 Features

- **Tournament Calendar**: Browse official ATP, WTA, and ITF tournaments
- **Smart Travel Search**: Find optimized flight and hotel combinations
- **Player Profiles**: Personalized preferences and booking history
- **Price Optimization**: AI-powered recommendations based on budget and preferences
- **Mobile & Web**: Cross-platform experience with React Native and Next.js

## 🏗️ Architecture

This is a monorepo built with:

- **Frontend Web**: Next.js 14 + TypeScript + Tailwind CSS
- **Frontend Mobile**: React Native Expo
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Shared**: TypeScript libraries for common types and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tennis-travel-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` in each app directory and fill in your Supabase credentials:
   
   ```bash
   # apps/web/.env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up database**
   
   Run the SQL scripts in Supabase:
   ```sql
   -- Run supabase/schema.sql to create tables
   -- Run supabase/seed.sql to populate sample data
   ```

### Development

Start the development servers:

```bash
# Start web app
npm run dev:web

# Start mobile app  
npm run dev:mobile

# Build shared packages
npm run build --workspace=packages/shared
```

### Project Structure

```
tennis-travel-assistant/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Utilities and configurations
│   │   └── package.json
│   └── mobile/              # React Native Expo application
│       ├── app/             # Expo router screens
│       ├── components/      # React Native components
│       └── package.json
├── packages/
│   └── shared/              # Shared TypeScript libraries
│       ├── src/
│       │   ├── types.ts     # Type definitions
│       │   └── utils.ts     # Utility functions
│       └── package.json
├── supabase/
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Sample data
└── package.json             # Root workspace configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Expo**: React Native development platform

### Backend
- **Supabase**: Backend as a service
  - PostgreSQL database
  - Authentication & authorization
  - Row Level Security (RLS)
  - Edge Functions for serverless logic
  - Real-time subscriptions

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **npm workspaces**: Monorepo management

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start web app
npm run dev:web          # Start web app specifically  
npm run dev:mobile       # Start mobile app

# Building
npm run build            # Build web app
npm run build:web        # Build web app specifically
npm run build:mobile     # Build mobile app

# Type checking
npm run type-check       # Check TypeScript across all packages

# Linting
npm run lint             # Lint all packages
```

## 🗃️ Database Schema

### Core Tables

- **players**: User profiles and preferences
- **tournaments**: Tennis tournament information
- **bookings**: Flight and hotel reservations
- **search_history**: User search tracking
- **price_alerts**: Price monitoring for tournaments

### Key Features

- **Row Level Security**: Users can only access their own data
- **PostGIS**: Geospatial queries for location-based features
- **JSONB**: Flexible storage for preferences and search parameters
- **Indexes**: Optimized queries for performance

## 🔐 Security

- **Authentication**: Supabase Auth with email/password and OAuth
- **Authorization**: Row Level Security policies
- **Data Protection**: Encrypted sensitive data
- **HTTPS**: All communications encrypted in transit
- **Input Validation**: Comprehensive data validation and sanitization

## 📱 Deployment

### Web App (Vercel)
```bash
# Deploy to Vercel
npm run build:web
# Connect repository to Vercel dashboard
```

### Mobile App (Expo)
```bash
# Build for app stores
npm run build:mobile
# Follow Expo documentation for store submission
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review existing issues and discussions

---

Built with ❤️ for the tennis community
