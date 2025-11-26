import { supabase, type Part } from '@/lib/supabase'
import PartCard from '@/components/PartCard'
import { Suspense } from 'react'

interface PartsPageProps {
  searchParams: {
    make?: string
    model?: string
    q?: string
  }
}

async function getParts(filters: { make?: string; model?: string; q?: string }) {
  let query = supabase
    .from('Part')
    .select(`
      *,
      source:Source (
        id,
        name,
        baseUrl
      )
    `)

  if (filters.make) {
    query = query.eq('vehicleMake', filters.make)
  }

  if (filters.model) {
    query = query.eq('vehicleModel', filters.model)
  }

  if (filters.q) {
    const searchTerm = `%${filters.q}%`
    query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching parts:', error)
    return []
  }

  return (data || []) as Part[]
}

async function getMakes() {
  const { data, error } = await supabase
    .from('Part')
    .select('vehicleMake')
    .not('vehicleMake', 'is', null)

  if (error) {
    console.error('Error fetching makes:', error)
    return []
  }

  const makes = Array.from(new Set(data.map((item) => item.vehicleMake).filter(Boolean)))
  return makes.sort() as string[]
}

async function getModels(make?: string) {
  let query = supabase
    .from('Part')
    .select('vehicleModel')
    .not('vehicleModel', 'is', null)

  if (make) {
    query = query.eq('vehicleMake', make)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching models:', error)
    return []
  }

  const models = Array.from(new Set(data.map((item) => item.vehicleModel).filter(Boolean)))
  return models.sort() as string[]
}

function PartsList({ parts }: { parts: Part[] }) {
  if (parts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No parts found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {parts.map((part) => (
        <PartCard key={part.id} part={part} />
      ))}
    </div>
  )
}

export default async function PartsPage({ searchParams }: PartsPageProps) {
  const parts = await getParts(searchParams)
  const makes = await getMakes()
  const models = await getModels(searchParams.make)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Parts</h1>
        
        <form method="get" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="q" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="q"
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search parts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <select
                id="make"
                name="make"
                defaultValue={searchParams.make}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <select
                id="model"
                name="model"
                defaultValue={searchParams.model}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Models</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {parts.length} part{parts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading parts...</div>}>
        <PartsList parts={parts} />
      </Suspense>
    </div>
  )
}

