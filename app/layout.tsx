import { CorruptedDataDialog } from '@/components/corrupted-data-dialog';
import HeaderComponent from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: "Grades",
  title: {
    default: "Grade Calculator",
    template: "%s - Grades",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grade Calculator",
  },
  formatDetection: {
    telephone: false,
  },
  description:
    "This grade calculator features different tools to get an overview of your grades and calculate your average grades for your subjects.",
};
// export const viewport: Viewport = {
//   themeColor: "#030712",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
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
          <CorruptedDataDialog />
          <Toaster theme='light' className='dark:hidden' />
          <Toaster theme='dark' className='hidden dark:flex' />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
