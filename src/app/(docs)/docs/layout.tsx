'use client'

import React from 'react'
import { useTheme } from 'react-theme-master'
import Sidebar from '@/components/layout/sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { themeObject } = useTheme()

  return (
    <div className={`flex ${themeObject.colors.primary}`}>
      {/* Fixed sidebar - positioned below the header */}
      <div className="fixed inset-y-16 left-0 z-30 w-64 lg:w-72">
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
          <Sidebar />
        </div>
      </div>
      
      {/* Main content with sidebar offset and padding for header */}
      <div className="flex-1 min-h-screen ml-0 md:ml-64 lg:ml-72">
        <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}