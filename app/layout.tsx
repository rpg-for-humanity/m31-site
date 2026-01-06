import { Exo_2 } from 'next/font/google'
import './globals.css'

const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  )
}