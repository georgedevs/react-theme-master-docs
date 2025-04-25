'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'react-theme-master'
import { AlertTriangle, X, ExternalLink } from 'lucide-react'

export default function MobileWarning() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { themeObject } = useTheme()

  useEffect(() => {
    // Check if user has previously dismissed the warning
    const dismissed = localStorage.getItem('mobile-warning-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
      return
    }

    // Check if user is on a mobile device
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768
      setIsVisible(isMobile)
      
      // Prevent scrolling on body when modal is visible
      if (isMobile && !isDismissed) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    // Run check immediately and on resize
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      document.body.style.overflow = ''
    }
  }, [isDismissed])

  const dismissWarning = () => {
    setIsVisible(false)
    setIsDismissed(true)
    document.body.style.overflow = ''
    localStorage.setItem('mobile-warning-dismissed', 'true')
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      <div className={`${themeObject.colors.primary} rounded-lg shadow-xl border ${themeObject.colors.border} w-full max-w-md mx-auto`}>
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className={`text-lg font-semibold ${themeObject.colors.text}`}>
                Mobile Experience Limited
              </h3>
            </div>
            <button
              className={`${themeObject.colors.textMuted} hover:${themeObject.colors.text} transition-colors`}
              onClick={dismissWarning}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          
          {/* Divider */}
          <div className={`my-4 border-t ${themeObject.colors.border}`}></div>
          
          {/* Content */}
          <div className={`${themeObject.colors.text} mb-6`}>
            <p className="mb-4">
              This website is optimized for desktop viewing and has limited mobile responsiveness.
            </p>
            <p>
              For the best experience, we recommend accessing this site on a desktop or laptop computer.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={dismissWarning}
              className={`${themeObject.colors.button} py-2 px-4 rounded flex items-center justify-center`}
            >
              <span>Continue Anyway</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}