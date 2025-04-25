'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'react-theme-master'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import Link from 'next/link'

// Define search results shape
interface SearchResult {
  title: string
  description: string
  path: string
  keywords: string[]
  category: string
}

const searchIndex: SearchResult[] = [
  {
    title: 'Getting Started',
    description: 'Learn how to set up React Theme Master in your project',
    path: '/docs',
    keywords: ['installation', 'setup', 'start', 'intro', 'introduction'],
    category: 'Documentation'
  },
  {
    title: 'Installation',
    description: 'Step-by-step guide to install React Theme Master',
    path: '/docs/installation',
    keywords: ['npm', 'yarn', 'install', 'setup', 'package'],
    category: 'Documentation'
  },
  {
    title: 'Quick Start',
    description: 'Get up and running quickly with React Theme Master',
    path: '/docs/quick-start',
    keywords: ['quick', 'start', 'guide', 'beginner', 'tutorial'],
    category: 'Documentation'
  },
  {
    title: 'Theme Structure',
    description: 'Understanding how themes are structured',
    path: '/docs/theme-structure',
    keywords: ['structure', 'format', 'colors', 'properties', 'tailwind'],
    category: 'Documentation'
  },
  {
    title: 'Theme Provider',
    description: 'Learn about the ThemeProvider component',
    path: '/docs/theme-provider',
    keywords: ['provider', 'context', 'options', 'configuration'],
    category: 'Documentation'
  },
  {
    title: 'Tailwind Integration',
    description: 'How to integrate with Tailwind CSS',
    path: '/docs/tailwind-integration',
    keywords: ['tailwind', 'css', 'classes', 'integration', 'config'],
    category: 'Documentation'
  },
  {
    title: 'ThemeSelector Component',
    description: 'Using the ThemeSelector component',
    path: '/docs/theme-selector',
    keywords: ['selector', 'dropdown', 'component', 'ui', 'buttons', 'grid', 'icons'],
    category: 'Components'
  },
  {
    title: 'ThemeToggle Component',
    description: 'Using the ThemeToggle component',
    path: '/docs/theme-toggle',
    keywords: ['toggle', 'switch', 'component', 'ui', 'button'],
    category: 'Components'
  },
  {
    title: 'ThemeIndicator Component',
    description: 'Using the ThemeIndicator component',
    path: '/docs/theme-indicator',
    keywords: ['indicator', 'notification', 'component', 'ui'],
    category: 'Components'
  },
  {
    title: 'useTheme Hook',
    description: 'Using the useTheme hook',
    path: '/docs/hooks/use-theme',
    keywords: ['hook', 'react', 'custom', 'theme', 'state'],
    category: 'Hooks'
  },
  {
    title: 'useSystemTheme Hook',
    description: 'Using the useSystemTheme hook',
    path: '/docs/hooks/use-system-theme',
    keywords: ['hook', 'system', 'preference', 'dark', 'light', 'detect'],
    category: 'Hooks'
  },
  {
    title: 'Custom Themes',
    description: 'Creating and using custom themes',
    path: '/docs/advanced/custom-themes',
    keywords: ['custom', 'theme', 'create', 'tailwind', 'colors'],
    category: 'Advanced'
  },
  {
    title: 'Theme Scheduling',
    description: 'Schedule themes based on time of day',
    path: '/docs/advanced/theme-scheduling',
    keywords: ['schedule', 'time', 'automatic', 'day', 'night'],
    category: 'Advanced'
  },
  {
    title: 'Examples',
    description: 'Examples of React Theme Master in action',
    path: '/examples',
    keywords: ['example', 'demo', 'sample', 'code', 'usage'],
    category: 'Examples'
  },
  {
    title: 'Playground',
    description: 'Interactive playground to test React Theme Master',
    path: '/playground',
    keywords: ['playground', 'interactive', 'test', 'try', 'experiment'],
    category: 'Tools'
  }
]

export default function Search() {
  const { themeObject } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Open search dialog with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    
    const searchTerms = searchQuery.toLowerCase().split(' ')
    
    // Filter and sort results by relevance
    const searchResults = searchIndex
      .filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
        const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const keywordMatch = item.keywords.some(keyword => 
          searchTerms.some(term => keyword.includes(term))
        )
        
        return titleMatch || descriptionMatch || keywordMatch
      })
      .sort((a, b) => {
        // Give higher priority to title matches
        const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase())
        const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (aTitle && !bTitle) return -1
        if (!aTitle && bTitle) return 1
        
        // Then consider keyword matches
        const aKeywords = a.keywords.filter(keyword => 
          searchTerms.some(term => keyword.includes(term))
        ).length
        
        const bKeywords = b.keywords.filter(keyword => 
          searchTerms.some(term => keyword.includes(term))
        ).length
        
        return bKeywords - aKeywords
      })
    
    setResults(searchResults)
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    performSearch(newQuery)
  }

  // Handle result selection
  const handleResultClick = (path: string) => {
    router.push(path)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  // Reset search
  const clearSearch = () => {
    setQuery('')
    setResults([])
    searchInputRef.current?.focus()
  }

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = []
    }
    acc[result.category].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded border ${themeObject.colors.border} ${themeObject.colors.textMuted} hover:${themeObject.colors.accent}`}
        aria-label="Search documentation"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden md:inline">Search docs...</span>
        <div className="hidden md:flex items-center justify-center h-5 w-5 text-xs rounded border ml-2 opacity-60">
          ⌘K
        </div>
      </button>

      {/* Search Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          {/* Dialog */}
          <div 
            ref={searchContainerRef}
            className={`relative w-full max-w-xl rounded-lg shadow-xl ${themeObject.colors.primary} border ${themeObject.colors.border}`}
          >
            {/* Search Input */}
            <div className={`flex items-center border-b ${themeObject.colors.border}`}>
              <SearchIcon className={`ml-4 h-5 w-5 ${themeObject.colors.textMuted}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search documentation..."
                className={`flex-1 px-4 py-3 ${themeObject.colors.primary} ${themeObject.colors.text} focus:outline-none`}
              />
              {query && (
                <button 
                  onClick={clearSearch}
                  className="p-1.5 rounded-full mr-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {results.length === 0 && query && (
                <div className={`p-4 text-center ${themeObject.colors.textMuted}`}>
                  No results found for "{query}"
                </div>
              )}
              
              {results.length > 0 && (
                <div className="space-y-4">
                  {Object.entries(groupedResults).map(([category, categoryResults]) => (
                    <div key={category}>
                      <h3 className={`text-xs font-semibold px-3 py-1.5 ${themeObject.colors.textMuted}`}>
                        {category}
                      </h3>
                      <div className="mt-1">
                        {categoryResults.map(result => (
                          <button
                            key={result.path}
                            className={`w-full text-left px-3 py-2 rounded hover:${themeObject.colors.accent} ${themeObject.colors.text}`}
                            onClick={() => handleResultClick(result.path)}
                          >
                            <div className="font-medium">{result.title}</div>
                            <div className={`text-sm truncate ${themeObject.colors.textMuted}`}>
                              {result.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Initial state - search tips */}
              {!query && (
                <div className="p-4">
                  <h3 className={`text-sm font-medium mb-2 ${themeObject.colors.text}`}>
                    Search tips
                  </h3>
                  <ul className={`text-sm space-y-1 ${themeObject.colors.textMuted}`}>
                    <li>• Try searching for components, hooks, or features</li>
                    <li>• Use specific terms like "toggle", "custom theme", or "system"</li>
                    <li>• Press ESC to close this dialog</li>
                  </ul>
                  
                  <h3 className={`text-sm font-medium mt-4 mb-2 ${themeObject.colors.text}`}>
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Getting Started', 'ThemeSelector', 'Custom Themes', 'Playground'].map(title => {
                      const result = searchIndex.find(r => r.title === title)
                      if (!result) return null
                      
                      return (
                        <button
                          key={result.path}
                          className={`text-left px-3 py-2 rounded hover:${themeObject.colors.accent} ${themeObject.colors.text}`}
                          onClick={() => handleResultClick(result.path)}
                        >
                          {result.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className={`p-3 border-t ${themeObject.colors.border} text-xs ${themeObject.colors.textMuted} flex items-center justify-between`}>
              <span>
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">↓</kbd> to navigate
              </span>
              <span>
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">Enter</kbd> to select
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}