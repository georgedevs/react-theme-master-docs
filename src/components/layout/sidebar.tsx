'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'react-theme-master'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { ChevronLeft, Menu, X } from 'lucide-react'

const sidebarLinks = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      { title: 'Theme Structure', href: '/docs/theme-structure' },
      { title: 'Theme Provider', href: '/docs/theme-provider' },
      { title: 'Tailwind Integration', href: '/docs/tailwind-integration' },
    ],
  },
  {
    title: 'Components',
    links: [
      { title: 'ThemeSelector', href: '/docs/theme-selector' },
      { title: 'ThemeToggle', href: '/docs/theme-toggle' },
      { title: 'ThemeIndicator', href: '/docs/theme-indicator' },
    ],
  },
  {
    title: 'Hooks',
    links: [
      { title: 'useTheme', href: '/docs/hooks/use-theme' },
      { title: 'useSystemTheme', href: '/docs/hooks/use-system-theme' },
    ],
  },
  {
    title: 'Utilities',
    links: [
      { title: 'Storage', href: '/docs/utilities/storage' },
      { title: 'CSS Variables', href: '/docs/utilities/css-variables' },
      { title: 'System Theme', href: '/docs/utilities/system-theme' },
      { title: 'Theme Validation', href: '/docs/utilities/theme-validation' },
    ],
  },
  {
    title: 'Advanced Usage',
    links: [
      { title: 'Custom Themes', href: '/docs/advanced/custom-themes' },
      { title: 'Theme Scheduling', href: '/docs/advanced/theme-scheduling' },
      { title: 'Server Components', href: '/docs/advanced/server-components' },
      { title: 'Framework Integration', href: '/docs/advanced/framework-integration' },
    ],
  },
]

export default function Sidebar() {
  const { themeObject } = useTheme()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="sm"
        className={`fixed top-20 left-4 z-50 md:hidden ${isOpen ? 'hidden' : 'flex'}`}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open sidebar</span>
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          `h-full ${themeObject.colors.secondary} ${themeObject.colors.border} border-r`,
          {
            'fixed inset-0 z-40 w-full md:w-64 lg:w-72': isOpen,
            'w-full h-full': !isOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className={`flex items-center justify-between h-16 px-4 border-b md:hidden ${themeObject.colors.border}`}>
            <span className={`font-semibold ${themeObject.colors.text}`}>Documentation</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          
          {/* Sidebar content - scrollable */}
          <ScrollArea className="flex-1 py-6">
            <div className="px-4 space-y-6">
              {sidebarLinks.map((section, i) => (
                <div key={i} className="space-y-2">
                  <h4 className={`text-sm font-semibold ${themeObject.colors.text}`}>
                    {section.title}
                  </h4>
                  
                  {section.links.map((link) => {
                    const isActive = pathname === link.href
                    
                    return (
                      <Button
                        key={link.href}
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start",
                          isActive 
                            ? `${themeObject.colors.accent} ${themeObject.colors.text}` 
                            : themeObject.colors.textMuted
                        )}
                        asChild
                      >
                        <Link href={link.href}>
                          {link.title}
                        </Link>
                      </Button>
                    )
                  })}
                  
                  {i < sidebarLinks.length - 1 && (
                    <Separator className={`my-4 ${themeObject.colors.border}`} />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Back to home link at bottom */}
          <div className={`p-4 border-t ${themeObject.colors.border} hidden md:block`}>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start ${themeObject.colors.textMuted}`}
              asChild
            >
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}