import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thai Plus - ไทยช่วยไทย พลัส',
  description: 'Thai Plus',
  generator: 'Thai Plus.app',
  icons: {
    icon: [
      {
        url: '/Icon1.png',
        type: 'image/png',
      },
    ],
    apple: '/Icon1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
