import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Bluesky Feels',
  description: 'Bluesky is feeling...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  )
}
