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

## Deployment to Render

This application is configured for deployment on Render using the `render.yaml` file.

### Quick Deploy

1. **Push your code to GitHub** (if not already done)

2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Set Environment Variables:**
   In the Render dashboard, add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

4. **Deploy:**
   - Render will automatically build and deploy your application
   - The service will be available at `https://your-app-name.onrender.com`

### Manual Deploy (without Blueprint)

1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** byp-web-aggregator
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Create Web Service"

### Notes

- Render automatically provides the `PORT` environment variable - Next.js will use it automatically
- The health check is configured to use the root path (`/`)
- Builds typically take 3-5 minutes
- Free tier services spin down after 15 minutes of inactivity

