'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme, ThemeSelector, ThemeToggle } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import Search from './search'

export default function Header() {
  const { themeObject, theme } = useTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'Playground', href: '/playground' },
  ]
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''} ${themeObject.colors.primary} ${themeObject.colors.border}`}>
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 w-10">
                {theme === 'light' ? (
                  <Image 
                    src="/logo-light.png" 
                    alt="React Theme Master" 
                    width={48} 
                    height={48} 
                    priority
                    className="max-h-full w-auto"
                  />
                ) : (
                  <Image 
                    src="/logo-others.png" 
                    alt="React Theme Master" 
                    width={48} 
                    height={48} 
                    priority
                    className="max-h-full w-auto"
                  />
                )}
              </div>
              <span className={`inline-block font-bold ${themeObject.colors.text}`}>
                React Theme Master
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  pathname === item.href 
                    ? `${themeObject.colors.text} font-medium` 
                    : `${themeObject.colors.textMuted} hover:${themeObject.colors.text}`
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Search />
            
            <ThemeSelector 
              variant="dropdown" 
              showPreview={true}
              placement="bottom"
            />
            
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/georgedevs/react-theme-master" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  />
                </svg>
                <span>GitHub</span>
              </Link>
            </Button>
            
            <ThemeToggle size="sm" />
          </div>
          
          {/* Mobile actions */}
          <div className="flex md:hidden items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  ctrlKey: true,
                  bubbles: true
                });
                document.dispatchEvent(event);
              }}
              className={themeObject.colors.textMuted}
            >
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            <ThemeToggle size="sm" />
            
            {/* Mobile menu button */}
            <button
              className={`p-2 rounded-md transition-colors ${
                mobileMenuOpen ? `${themeObject.colors.accent}` : ''
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
                <span 
                  className={`absolute block w-6 h-0.5 top-2 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
                <span 
                  className={`absolute block w-6 h-0.5 transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile menu panel */}
      <div 
        className={`fixed top-16 inset-x-0 bottom-0 z-50 md:hidden overflow-y-auto transition-transform duration-300 ${themeObject.colors.primary} border-t ${themeObject.colors.border} ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Navigation links */}
          <nav className="grid gap-5 text-lg">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center ${
                  pathname === item.href 
                    ? `${themeObject.colors.text} font-medium` 
                    : `${themeObject.colors.textMuted} hover:${themeObject.colors.text}`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Theme selector */}
          <div className="pt-4 border-t">
            <h3 className={`text-sm font-semibold mb-3 ${themeObject.colors.textMuted}`}>Theme</h3>
            <div className="flex flex-wrap gap-2">
              <ThemeToggle showLabel={true} />
              <div className="w-full mt-3">
                <ThemeSelector variant="icons" />
              </div>
            </div>
          </div>
          
          {/* GitHub link */}
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              asChild 
              className="w-full"
            >
              <Link 
                href="https://github.com/georgedevs/react-theme-master" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  />
                </svg>
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}