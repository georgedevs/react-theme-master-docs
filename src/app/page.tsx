'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Cpu, Palette, Moon, Sun, Clock, Code, Zap } from 'lucide-react'
import { useTheme } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import CodePreview from '@/components/code-preview'
import ThemeShowcase from '@/components/theme-showcase'

export default function Home() {
  const { themeObject, theme } = useTheme()

  // Quick start code example
  const quickStartCode = `// 1. Install the package
npm install react-theme-master

// 2. Wrap your app with ThemeProvider
import { ThemeProvider, ThemeToggle, useTheme } from 'react-theme-master';

function App() {
  const { themeObject } = useTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <ThemeToggle />
      </header>
      <main>
        <h1 className={\`text-2xl \${themeObject.colors.text}\`}>
          Hello, Themed World!
        </h1>
      </main>
    </div>
  );
}

// Wrap your app with the ThemeProvider
export default function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}`

  return (
    <div>
      {/* Hero section */}
      <section className={`py-20 px-4 ${themeObject.colors.primary}`}>
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4">
            {/* Display logo based on theme */}
            {theme === 'light' ? (
              <Image 
                src="/logo-light.png" 
                alt="React Theme Master" 
                width={100} 
                height={100} 
                priority
              />
            ) : (
              <Image 
                src="/logo-others.png" 
                alt="React Theme Master" 
                width={100} 
                height={100} 
                priority
              />
            )}
          </div>
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${themeObject.colors.text}`}>
            React Theme Master
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${themeObject.colors.textMuted}`}>
            A powerful, flexible theme management system for React applications with Tailwind CSS integration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className={themeObject.colors.button}>
              <Link href="/docs">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className={`${themeObject.colors.buttonOutline} bg-transparent hover:${themeObject.colors.text}`}>
              <Link href="/playground">
                Try Playground
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className={`py-16 px-4 ${themeObject.colors.secondary}`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${themeObject.colors.text}`}>
            Why Choose React Theme Master?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
  <Palette className="h-6 w-6 " /> 
</div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                Unlimited Themes
              </h3>
              <p className={themeObject.colors.textMuted}>
                Not just light and dark. Create unlimited custom themes with complete flexibility.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
                <Code className="h-6 w-6" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                Tailwind Integration
              </h3>
              <p className={themeObject.colors.textMuted}>
                Built for Tailwind CSS with zero config. Use Tailwind classes for all your theme colors.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
                <Cpu className="h-6 w-6 " />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                System Preference
              </h3>
              <p className={themeObject.colors.textMuted}>
                Automatically detect and match the user's system dark/light mode preference.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
                <Clock className="h-6 w-6 " />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                Time-Based Themes
              </h3>
              <p className={themeObject.colors.textMuted}>
                Schedule themes based on time of day. Switch to dark mode at sunset automatically.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
                <Zap className="h-6 w-6 " />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                Ready-to-Use UI
              </h3>
              <p className={themeObject.colors.textMuted}>
                Pre-built components like ThemeSelector, ThemeToggle, and ThemeIndicator save development time.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${themeObject.colors.button}`}>
                <div className="flex">
                  <Sun className="h-6 w-6 -mr-1" />
                  <Moon className="h-6 w-6 -ml-1" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
                Smooth Transitions
              </h3>
              <p className={themeObject.colors.textMuted}>
                Beautiful, configurable transition animations when switching between themes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick start section */}
      <section className={`py-16 px-4 ${themeObject.colors.primary}`}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-8 text-center ${themeObject.colors.text}`}>
              Quick Start
            </h2>
            <p className={`text-lg mb-8 text-center ${themeObject.colors.textMuted}`}>
              Get up and running in minutes with these simple steps
            </p>
            <CodePreview 
              code={quickStartCode} 
              language="tsx" 
              showLineNumbers={true}
            />
            <div className="mt-6 text-center">
              <Button asChild className={themeObject.colors.button}>
                <Link href="/docs/installation">
                  Complete Installation Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live demo section */}
      <section className={`py-16 px-4 ${themeObject.colors.secondary}`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${themeObject.colors.text}`}>
            See It In Action
          </h2>
          <p className={`text-lg mb-12 text-center max-w-3xl mx-auto ${themeObject.colors.textMuted}`}>
            This entire website is built using React Theme Master. Try changing themes using the selector in the header
            to see how it affects all components consistently.
          </p>
          
          <div className="max-w-5xl mx-auto">
            <ThemeShowcase showCards={true} showElements={true} showSelectors={false} showToggles={true} />
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className={themeObject.colors.button}>
              <Link href="/examples">
                View More Examples <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className={`py-20 px-4 ${themeObject.colors.accent} border-t ${themeObject.colors.border}`}>
        <div className="container mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${themeObject.colors.text}`}>
            Ready to transform your app's theming?
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${themeObject.colors.textMuted}`}>
            Start building beautiful, theme-aware interfaces with React Theme Master today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className={themeObject.colors.button}>
              <Link href="/docs">
                Read the Docs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={themeObject.colors.buttonOutline}>
              <Link href="https://github.com/georgedevs/react-theme-master" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}