'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Button from '@/components/Button'

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  // Reset loading state when navigation completes
  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const handleNavigate = () => {
    setLoading(true)
    router.push('/parts')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          BYP Auto Parts Aggregator
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Browse auto parts from multiple wreckers and suppliers all in one place
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Button
              onClick={handleNavigate}
              loading={loading}
              className="w-full"
            >
              Browse Parts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

