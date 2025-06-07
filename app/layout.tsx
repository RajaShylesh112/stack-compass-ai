import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Stack Recommender - Technology Stack Recommendations',
  description: 'Get AI-powered technology stack recommendations for your next project. Compare technologies, explore compatibility, and make informed decisions.',
  keywords: 'technology stack, AI recommendations, software development, tech stack comparison',
  openGraph: {
    title: 'AI Stack Recommender',
    description: 'AI-powered technology stack recommendations for developers',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}