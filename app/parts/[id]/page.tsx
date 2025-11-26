import { supabase, type Part } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getPart(id: string): Promise<Part | null> {
  const { data, error } = await supabase
    .from('Part')
    .select(`
      *,
      source:Source (
        id,
        name,
        baseUrl
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Error fetching part:', error)
    return null
  }

  return data as Part
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const part = await getPart(id)

  if (!part) {
    notFound()
  }

  const makeModelYear = [
    part.vehicleMake,
    part.vehicleModel,
    part.yearFrom && part.yearTo
      ? `${part.yearFrom}-${part.yearTo}`
      : part.yearFrom || part.yearTo
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/parts"
        className="text-indigo-600 hover:text-indigo-700 mb-4 inline-block"
      >
        ← Back to Parts
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {part.imageUrl && (
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={part.imageUrl.replace(/([^:]\/)\/+/g, '$1')}
                alt={part.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{part.title}</h1>

            {makeModelYear && (
              <p className="text-lg text-gray-600 mb-4">{makeModelYear}</p>
            )}

            {part.price !== null && (
              <p className="text-3xl font-bold text-indigo-600 mb-6">
                {part.currency} ${part.price.toLocaleString()}
              </p>
            )}

            {(part.locationSuburb || part.locationState) && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-1">Location</p>
                <p className="text-gray-900">
                  📍 {[part.locationSuburb, part.locationState].filter(Boolean).join(', ')}
                </p>
              </div>
            )}

            {part.description && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                <p className="text-gray-900 whitespace-pre-wrap">{part.description}</p>
              </div>
            )}

            {part.source && (
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Source</p>
                <p className="text-gray-900 mb-4">{part.source.name}</p>
                {part.partUrl && (
                  <a
                    href={part.partUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View on wrecker site →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

