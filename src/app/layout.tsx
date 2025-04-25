import type { Metadata } from 'next'
import { Wix_Madefor_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import MobileWarning from '@/components/MobileWarning'

const wixMadeforDisplay = Wix_Madefor_Display({ 
  subsets: ['latin'],
  weight: ['400'], // Using regular (400) weight
})

export const metadata: Metadata = {
  title: 'React Theme Master - Flexible theme management for React',
  description: 'A powerful, flexible theme management system for React applications with Tailwind CSS integration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={wixMadeforDisplay.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <MobileWarning/>  
          </div>
        </Providers>
      </body>
    </html>
  )
}