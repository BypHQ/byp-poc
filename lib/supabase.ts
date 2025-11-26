import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types - matching Prisma schema
export interface Source {
  id: string
  name: string
  baseUrl: string | null
  scraperVersion: string | null
  lastScrapedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Part {
  id: string
  sourceId: string
  sourcePartKey: string
  title: string
  description: string | null
  price: number | null
  currency: string
  condition: string | null
  imageUrl: string | null
  partUrl: string | null
  vehicleMake: string | null
  vehicleModel: string | null
  vehicleModelCode: string | null
  yearFrom: number | null
  yearTo: number | null
  category: string | null
  partName: string | null
  locationSuburb: string | null
  locationState: string | null
  rawData: any | null
  isInStock: boolean
  lastSeenAt: Date
  createdAt: Date
  updatedAt: Date
  source?: Source
}

