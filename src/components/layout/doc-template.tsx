'use client'

import React from 'react'
import { useTheme } from 'react-theme-master'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface DocTemplateProps {
  title: string
  description?: string
  children: React.ReactNode
  previousPage?: {
    title: string
    href: string
  }
  nextPage?: {
    title: string
    href: string
  }
}

export default function DocTemplate({
  title,
  description,
  children,
  previousPage,
  nextPage
}: DocTemplateProps) {
  const { themeObject } = useTheme()

  return (
    <div className="max-w-3xl mx-auto">
      <div className={`p-6 rounded-lg mb-8 ${themeObject.colors.accent}`}>
        <h1 className={`text-3xl font-bold mb-2 ${themeObject.colors.text}`}>{title}</h1>
        {description && (
          <p className={`text-lg ${themeObject.colors.textMuted}`}>
            {description}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {children}
      </div>

      {/* Navigation between pages */}
      {(previousPage || nextPage) && (
        <div className="mt-16 pt-4 border-t flex items-center justify-between">
          {previousPage ? (
            <Link 
              href={previousPage.href}
              className={`flex items-center gap-1 ${themeObject.colors.text} hover:underline`}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span>{previousPage.title}</span>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPage && (
            <Link 
              href={nextPage.href}
              className={`flex items-center gap-1 ${themeObject.colors.text} hover:underline`}
            >
              <span>{nextPage.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}