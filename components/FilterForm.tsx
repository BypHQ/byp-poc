'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Button from './Button'

interface FilterFormProps {
  makes: string[]
  models: string[]
  sources: Array<{ id: string; name: string }>
  initialFilters: {
    make?: string
    model?: string
    source?: string
    q?: string
  }
}

export default function FilterForm({ makes, models, sources, initialFilters }: FilterFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  // Reset loading state when URL changes (navigation completes)
  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    const q = formData.get('q') as string
    const make = formData.get('make') as string
    const model = formData.get('model') as string
    const source = formData.get('source') as string

    if (q) params.set('q', q)
    if (make) params.set('make', make)
    if (model) params.set('model', model)
    if (source) params.set('source', source)

    router.push(`/parts?${params.toString()}`)
  }

  return (
    <form method="get" onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="q" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="q"
            name="q"
            defaultValue={initialFilters.q}
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
            defaultValue={initialFilters.make}
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
            defaultValue={initialFilters.model}
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

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            id="source"
            name="source"
            defaultValue={initialFilters.source}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Sources</option>
            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            loading={loading}
            variant="secondary"
            className="w-full"
          >
            Filter
          </Button>
        </div>
      </div>
    </form>
  )
}

