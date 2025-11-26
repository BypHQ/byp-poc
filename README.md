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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The app expects the following Supabase tables:

- **Part** table with columns:
  - `id` (string)
  - `title` (string)
  - `description` (string, nullable)
  - `image` (string, nullable)
  - `make` (string, nullable)
  - `model` (string, nullable)
  - `year` (number, nullable)
  - `price` (number, nullable)
  - `location` (string, nullable)
  - `sourceId` (string, foreign key to Source.id)
  - `created_at` (timestamp)

- **Source** table with columns:
  - `id` (string)
  - `name` (string)
  - `baseUrl` (string)

## Features

- **Landing Page** (`/`) - Simple welcome page
- **Parts List** (`/parts`) - Browse all parts with filters:
  - Search by title/description (`q` parameter)
  - Filter by make (`make` parameter)
  - Filter by model (`model` parameter)
- **Part Detail** (`/parts/[id]`) - View detailed information about a specific part

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (REST API via @supabase/supabase-js)

