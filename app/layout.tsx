import { Outfit } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'RPG for Humanity — Learn Languages Through Role-Play',
  description: 'Move freely in any language. Get closer in any culture. Practice real conversations through role-play with AI NPCs. Learn Korean, French, English through missions, not drills.',
  keywords: 'learn korean, learn french, learn english, language learning RPG, roleplay language learning, conversation practice, AI language tutor',
  openGraph: {
    title: 'RPG for Humanity — Learn Languages Through Role-Play',
    description: 'Move freely in any language. Get closer in any culture. Practice real conversations through role-play with AI NPCs.',
    url: 'https://rpgforhumanity.com',
    siteName: 'RPG for Humanity',
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
      <body className={outfit.className}>{children}</body>
    </html>
  )
}