import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bluesky Mood',
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
    </html>
  )
}
