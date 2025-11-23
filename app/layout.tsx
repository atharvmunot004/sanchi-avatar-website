import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Your Digital Identity',
  description: 'Build your 3D digital avatar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
