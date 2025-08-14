import type { Metadata } from 'next'
import { Big_Shoulders_Display } from 'next/font/google'
import './styles/globals.css'
import './styles/components.css'

const bigShouldersDisplay = Big_Shoulders_Display({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-primary'
})

export const metadata: Metadata = {
  title: '$Bardo - Revolutionary Token Project',
  description: 'A modern, responsive cryptocurrency website for $Bardo token with NextJS and admin gallery management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={bigShouldersDisplay.variable}>
        {children}
      </body>
    </html>
  )
}
