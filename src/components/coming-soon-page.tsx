'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import { Clock, Edit, ArrowLeft } from 'lucide-react'

interface ComingSoonPageProps {
  title?: string
  description?: string
  suggestedPages?: Array<{
    title: string
    href: string
    description?: string
  }>
  returnPath?: string
  returnLabel?: string
}

export default function ComingSoonPage({
  title = "Page Coming Soon",
  description = "We're working hard to bring you comprehensive documentation. This page is currently under development.",
  suggestedPages,
  returnPath = "/docs",
  returnLabel = "Return to Documentation"
}: ComingSoonPageProps) {
  const { themeObject } = useTheme()
  
  return (
    <div className={`${themeObject.colors.primary} py-6`}>
      <div className="max-w-3xl mx-auto mt-20">
        <div className={`p-6 rounded-lg mb-8 ${themeObject.colors.accent}`}>
          <div className="flex items-center mb-4">
            <div className={`mr-4 p-3 rounded-full ${themeObject.colors.secondary}`}>
              <Clock className="w-8 h-8" />
            </div>
            <h1 className={`text-3xl font-bold ${themeObject.colors.text}`}>{title}</h1>
          </div>
          <p className={`text-lg ${themeObject.colors.textMuted}`}>
            {description}
          </p>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${themeObject.colors.text}`}>
              <Edit className="w-5 h-5 mr-2" />
              Under Construction
            </h2>
            <div className={`p-6 rounded-lg ${themeObject.colors.secondary} space-y-3`}>
              <p className={themeObject.colors.text}>
                This documentation page is currently being written and will be available soon. 
              </p>
              <p className={themeObject.colors.textMuted}>
                Our team is working to provide detailed, helpful information on this topic. 
                Check back soon for updates, or explore some of our other documentation topics below.
              </p>
            </div>
          </section>
          
          {suggestedPages && suggestedPages.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>
                Explore Related Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedPages.map((page, index) => (
                  <Link 
                    key={index} 
                    href={page.href}
                    className={`block p-4 rounded-lg border ${themeObject.colors.border} ${themeObject.colors.secondary} hover:${themeObject.colors.accent} transition-colors`}
                  >
                    <h3 className={`font-medium mb-1 ${themeObject.colors.text}`}>
                      {page.title}
                    </h3>
                    {page.description && (
                      <p className={`text-sm ${themeObject.colors.textMuted}`}>
                        {page.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          <div className="flex justify-center mt-8 mb-8">
            <Button 
              asChild 
              className={themeObject.colors.button}
            >
              <Link href={returnPath}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {returnLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}