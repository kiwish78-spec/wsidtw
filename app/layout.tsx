import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WSIDTW — What Should I Do This Weekend?',
  description: 'The most exclusive weekend party collective in Pune. We curate experiences, not just events.',
  keywords: 'party pune, weekend events pune, exclusive parties, villa party lonavala',
  openGraph: {
    title: 'WSIDTW — What Should I Do This Weekend?',
    description: 'Stop scrolling. Start living. The most exclusive weekend party collective in Pune.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Narrow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-pop-bg min-h-screen">{children}</body>
    </html>
  )
}
