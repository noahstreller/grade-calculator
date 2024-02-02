import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import HeaderComponent from '@/components/header/header'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'

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
    <html>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderComponent />
          <main className='bg-background text-foreground h-screen flex justify-center mt-[5rem]'>
            {children}
          </main>
          <Toaster theme='light' className='dark:hidden' />
          <Toaster theme='dark' className='hidden dark:flex' />
        </ThemeProvider>
      </body>
    </html>
  )
}
