'use client'

import Link from 'next/link'
import { useTheme } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import CodePreview from '@/components/code-preview'
import ThemeShowcase from '@/components/theme-showcase'

export default function DocsPage() {
  const { themeObject } = useTheme()

  const basicUsageCode = `import { ThemeProvider, useTheme } from 'react-theme-master';

// In your component
function MyComponent() {
  const { theme, themeObject, setTheme } = useTheme();
  
  return (
    <div className={themeObject.colors.primary}>
      <p className={themeObject.colors.text}>
        Current theme: {theme}
      </p>
      <button 
        className={themeObject.colors.button}
        onClick={() => setTheme('dark')}
      >
        Switch to Dark Mode
      </button>
    </div>
  );
}`

  return (
    <div className="max-w-3xl mx-auto">
      <div className={`p-6 rounded-lg mb-8 ${themeObject.colors.accent}`}>
        <h1 className={`text-3xl font-bold mb-4 ${themeObject.colors.text}`}>React Theme Master</h1>
        <p className={`text-lg ${themeObject.colors.textMuted}`}>
          A powerful, flexible theme management system for React applications with Tailwind CSS integration.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Introduction</h2>
          <div className={`prose max-w-none ${themeObject.colors.text}`}>
            <p>
              React Theme Master provides an elegant solution for managing themes in your React applications.
              Whether you need a simple light/dark mode toggle or a complex theming system with multiple color schemes,
              this library has you covered.
            </p>
            <p>
              Built with Tailwind CSS in mind, React Theme Master makes it easy to apply consistent themes across your entire application
              using Tailwind's utility classes.
            </p>
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Key Features</h2>
          <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
            <li>Multiple theme support (beyond just light/dark)</li>
            <li>First-class Tailwind CSS integration</li>
            <li>Ready-to-use UI components for theme switching</li>
            <li>System preference detection</li>
            <li>Time-based theme scheduling</li>
            <li>Theme persistence with configurable storage</li>
            <li>Smooth transitions between themes</li>
            <li>TypeScript support</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            Here's how to use React Theme Master in your components:
          </p>
          <CodePreview code={basicUsageCode} language="tsx" />
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Live Example</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            This entire documentation site is built with React Theme Master. 
            Try changing themes using the selector in the header!
          </p>
          <div className="mb-6">
            <ThemeShowcase showCards={false} showElements={true} showToggles={true} showSelectors={false} />
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Getting Started</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            Ready to add React Theme Master to your project? Follow our installation guide:
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className={themeObject.colors.button}>
              <Link href="/docs/installation">
                Installation Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className={themeObject.colors.buttonOutline}>
              <Link href="/docs/quick-start">
                Quick Start
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}