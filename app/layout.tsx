import type { Metadata } from 'next'
import { Big_Shoulders_Display } from 'next/font/google'
import './styles/components.css'

const bigShouldersDisplay = Big_Shoulders_Display({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-primary'
})

export const metadata: Metadata = {
  title: '$Bardo',
  description: '',
  icons: {
    icon: [
      { url: '/assets/logo.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: '/assets/logo.png',
    shortcut: '/assets/logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <link rel="shortcut icon" href="/assets/logo.png" />
      </head>
      <body className={bigShouldersDisplay.variable}>
        {children}
      </body>
    </html>
  )
}
