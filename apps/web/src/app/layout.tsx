import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '../components/ClientLayout'

export const metadata: Metadata = {
  title: 'Tennis Travel Assistant',
  description: 'Plan your tennis tournament trips with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <main className="min-h-screen bg-gradient-to-br from-tennis-50 to-tennis-100">
          <ClientLayout>
            {children}
          </ClientLayout>
        </main>
      </body>
    </html>
  )
}
