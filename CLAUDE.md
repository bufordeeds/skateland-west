# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Skateland West - A modern website for San Antonio's premier family skating destination, built with Next.js 15, Payload CMS 3.50, and PostgreSQL.

## Development Commands

```bash
# Development
npm run dev                    # Start development server (port 3000)
npm run build                  # Build for production
npm run start                  # Start production server
npm run dev:prod               # Clean build and start production locally

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix              # Fix ESLint issues automatically

# Testing
npm run test                   # Run all tests (integration + e2e)
npm run test:int              # Run Vitest integration tests
npm run test:e2e              # Run Playwright e2e tests

# Database & Payload
npm run payload migrate        # Run database migrations
npm run payload migrate:create # Create new migration
npm run payload generate:types # Generate TypeScript types

# Utilities
npm run reinstall             # Clean reinstall dependencies
```

## Environment Setup

Required environment variables (see .env.example):
- `POSTGRES_URL` - PostgreSQL connection string  
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Server URL (no trailing slash)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token (for production)
- `DATABASE_MIGRATE_ON_START` - Auto-migrate on start (set to "true" for Vercel)

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **CMS**: Payload CMS 3.50 with admin panel at `/admin`
- **Database**: PostgreSQL (local) or Vercel Postgres (production)
- **Storage**: Local filesystem or Vercel Blob (production)
- **UI Components**: shadcn/ui, Radix UI primitives

### Key Directories

- `src/app/(frontend)/` - Public-facing Next.js pages
- `src/app/(payload)/` - Payload admin and API routes
- `src/blocks/` - Reusable content blocks with layout builder
- `src/collections/` - Payload CMS collections (Pages, Posts, Media, etc.)
- `src/components/` - Shared React components
- `src/Header/` & `src/Footer/` - Global layout components

### Content Blocks System

The site uses a flexible block-based layout system. Each block has:
- `Component.tsx` - React component
- `config.ts` - Payload field configuration

Available blocks: HeroSection, ScheduleCards, PartyPackages, ServicesCards, Testimonials, CTASection, Content, MediaBlock, CallToAction, ArchiveBlock, FormBlock, Code, Banner

Blocks are rendered via `src/blocks/RenderBlocks.tsx` and configured in collection schemas.

### Routing Strategy

- Dynamic pages: `[slug]` routes fetch from Pages collection
- Blog posts: `/posts/[slug]` with pagination support
- Search: Full-text search via Payload plugin
- Preview: Draft preview system with authentication

### Payload CMS Configuration

Main config: `src/payload.config.ts`

Collections:
- **Pages**: Dynamic pages with layout builder
- **Posts**: Blog posts with categories
- **Media**: Image/file management with automatic optimization
- **Users**: Admin user management
- **Categories**: Content categorization

Globals:
- **Header**: Navigation configuration
- **Footer**: Footer links and content

### Database Schema

Using Payload's automatic migration system with Vercel Postgres adapter. Migrations handled via `npm run payload migrate`.

### Deployment Notes

The project is configured for Vercel deployment with:
- Automatic database migrations on deploy (via DATABASE_MIGRATE_ON_START)
- Vercel Blob storage for media uploads
- PostgreSQL database via Vercel Postgres
- Environment variables managed through Vercel dashboard