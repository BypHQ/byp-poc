import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Source {
  id: string
  name: string
  baseUrl: string
}

export interface Part {
  id: string
  title: string
  description: string | null
  image: string | null
  make: string | null
  model: string | null
  year: number | null
  price: number | null
  location: string | null
  sourceId: string
  source?: Source
}

