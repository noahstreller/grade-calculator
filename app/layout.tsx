import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import HeaderComponent from '@/components/header/header'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rechner',
  description: 'Notenrechner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className + " dark")}>
        <HeaderComponent />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
