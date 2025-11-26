import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BYP Auto Parts Aggregator',
  description: 'Browse auto parts from multiple sources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-900">
                  BYP Parts
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="/parts"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Browse Parts
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

