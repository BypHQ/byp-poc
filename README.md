# BYP Web Aggregator POC

A Next.js 16 web application for browsing auto parts from multiple sources via Supabase.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Supabase credentials:
```bash
cp .env.example .env.local
```

Then add your Supabase URL and anon key:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3004) in your browser.

## Database Schema

The app connects to a PostgreSQL database (Supabase) with the following schema structure:

### Source Model
- `id` (string, UUID, primary key)
- `name` (string, unique)
- `baseUrl` (string, nullable)
- `scraperVersion` (string, nullable)
- `lastScrapedAt` (DateTime, nullable)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Part Model
- `id` (string, UUID, primary key)
- `sourceId` (string, foreign key to Source.id)
- `sourcePartKey` (string)
- `title` (string)
- `description` (string, nullable)
- `price` (float, nullable)
- `currency` (string, default: "AUD")
- `condition` (string, nullable)
- `imageUrl` (string, nullable)
- `vehicleMake` (string, nullable)
- `vehicleModel` (string, nullable)
- `vehicleModelCode` (string, nullable)
- `yearFrom` (int, nullable)
- `yearTo` (int, nullable)
- `category` (string, nullable)
- `partName` (string, nullable)
- `locationSuburb` (string, nullable)
- `locationState` (string, nullable)
- `rawData` (JSON, nullable)
- `isInStock` (boolean, default: true)
- `lastSeenAt` (DateTime)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Indexes:**
- Unique constraint on `[sourceId, sourcePartKey]`
- Index on `[sourceId, isInStock]`
- Index on `[sourceId, lastSeenAt]`

## Features

- **Landing Page** (`/`) - Simple welcome page
- **Parts List** (`/parts`) - Browse all parts with filters:
  - Search by title/description (`q` parameter)
  - Filter by vehicle make (`make` parameter)
  - Filter by vehicle model (`model` parameter)
- **Part Detail** (`/parts/[id]`) - View detailed information about a specific part

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (REST API via @supabase/supabase-js)

