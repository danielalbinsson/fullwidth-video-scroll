import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Scroll Playback',
  description: 'GSAP ScrollTrigger video playback with text',
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