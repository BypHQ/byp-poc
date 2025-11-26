import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Part Not Found</h1>
        <p className="text-gray-600 mb-8">
          The part you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/parts"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          ← Back to Parts
        </Link>
      </div>
    </div>
  )
}

