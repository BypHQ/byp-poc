import Image from 'next/image'
import Link from 'next/link'
import type { Part } from '@/lib/supabase'

interface PartCardProps {
  part: Part
}

export default function PartCard({ part }: PartCardProps) {
  const makeModelYear = [part.make, part.model, part.year]
    .filter(Boolean)
    .join(' ')

  return (
    <Link href={`/parts/${part.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {part.image && (
          <div className="relative w-full h-48 bg-gray-100">
            <Image
              src={part.image}
              alt={part.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {part.title}
          </h3>
        
        {makeModelYear && (
          <p className="text-sm text-gray-600 mb-2">{makeModelYear}</p>
        )}

        {part.price !== null && (
          <p className="text-xl font-bold text-indigo-600 mb-2">
            ${part.price.toLocaleString()}
          </p>
        )}

        {part.location && (
          <p className="text-sm text-gray-500 mb-2">📍 {part.location}</p>
        )}

        {part.source && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              Source: <span className="font-medium">{part.source.name}</span>
            </p>
            {part.source.baseUrl && (
              <a
                href={part.source.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
              >
                View on wrecker site →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
    </Link>
  )
}

