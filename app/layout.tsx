import './globals.css'
import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

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
      <body className={instrumentSerif.className}>{children}</body>
    </html>
  )
} 