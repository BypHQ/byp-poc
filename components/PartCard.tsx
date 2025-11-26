'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import type { Part } from '@/lib/supabase'
import LoadingSpinner from './LoadingSpinner'

interface PartCardProps {
  part: Part
}

export default function PartCard({ part }: PartCardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  
  // Reset loading state when navigation completes
  useEffect(() => {
    setLoading(false)
  }, [pathname])
  
  const makeModelYear = [
    part.vehicleMake,
    part.vehicleModel,
    part.yearFrom && part.yearTo
      ? `${part.yearFrom}-${part.yearTo}`
      : part.yearFrom || part.yearTo
  ]
    .filter(Boolean)
    .join(' ')

  // Normalize image URL to fix double slashes
  const normalizedImageUrl = part.imageUrl?.replace(/([^:]\/)\/+/g, '$1')

  const handleClick = () => {
    setLoading(true)
    router.push(`/parts/${part.id}`)
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
    >
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <LoadingSpinner size="md" />
        </div>
      )}
        {normalizedImageUrl && (
          <div className="relative w-full h-48 bg-gray-100">
            <Image
              src={normalizedImageUrl}
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
            {part.currency} ${part.price.toLocaleString()}
          </p>
        )}

        {(part.locationSuburb || part.locationState) && (
          <p className="text-sm text-gray-500 mb-2">
            📍 {[part.locationSuburb, part.locationState].filter(Boolean).join(', ')}
          </p>
        )}

        {part.source && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
              Source: <span className="font-medium">{part.source.name}</span>
            </p>
            {part.partUrl && (
              <a
                href={part.partUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
              >
                View on wrecker site →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

