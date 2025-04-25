'use client'

import { useTheme } from 'react-theme-master'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodePreview from '@/components/code-preview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ExamplesPage() {
  const { themeObject } = useTheme()

  const basicExample = `import { ThemeProvider, ThemeToggle, useTheme } from 'react-theme-master';

function App() {
  const { themeObject } = useTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={\`text-2xl font-bold \${themeObject.colors.text}\`}>My App</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className={\`p-6 rounded-lg \${themeObject.colors.accent}\`}>
          <h2 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
            Welcome to My Themed App
          </h2>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            This app uses React Theme Master for theming.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}`

  const customThemesExample = `import { ThemeProvider, ThemeSelector, useTheme } from 'react-theme-master';

// Define custom themes
const customThemes = {
  forest: {
    name: 'forest',
    colors: {
      primary: 'bg-green-900',
      secondary: 'bg-green-800',
      text: 'text-green-50',
      textMuted: 'text-green-200/70',
      accent: 'bg-green-700/50',
      border: 'border-green-700',
      shadow: 'shadow-green-900/60',
      button: 'bg-green-500 text-white hover:bg-green-600',
      buttonOutline: 'border-green-500 text-green-500 hover:bg-green-500/10',
    },
    meta: {
      description: 'Forest theme',
    }
  },
  sunset: {
    name: 'sunset',
    colors: {
      primary: 'bg-amber-800',
      secondary: 'bg-amber-700',
      text: 'text-amber-50',
      textMuted: 'text-amber-200/70',
      accent: 'bg-amber-700/50',
      border: 'border-amber-600',
      shadow: 'shadow-amber-900/60',
      button: 'bg-amber-500 text-white hover:bg-amber-600',
      buttonOutline: 'border-amber-500 text-amber-500 hover:bg-amber-500/10',
    },
    meta: {
      description: 'Sunset theme',
    }
  }
};

function App() {
  const { themeObject, theme } = useTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={\`text-2xl font-bold \${themeObject.colors.text}\`}>Custom Themes</h1>
          <ThemeSelector variant="dropdown" showPreview={true} />
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className={\`p-6 rounded-lg \${themeObject.colors.accent}\`}>
          <h2 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
            Current Theme: {theme}
          </h2>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            Try switching between custom themes!
          </p>
        </div>
      </main>
    </div>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider 
      options={{
        // Merge default themes with custom themes
        themes: customThemes,
        initialTheme: 'forest',
      }}
    >
      <App />
    </ThemeProvider>
  );
}`

  const systemPreferenceExample = `import { ThemeProvider, ThemeToggle, useTheme, useSystemTheme } from 'react-theme-master';

function App() {
  const { themeObject, theme } = useTheme();
  const { systemTheme, isSystemDarkMode } = useSystemTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={\`text-2xl font-bold \${themeObject.colors.text}\`}>System Theme</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className={\`p-6 rounded-lg \${themeObject.colors.accent}\`}>
          <h2 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
            Current Theme: {theme}
          </h2>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            Your system prefers: {systemTheme} mode
            {isSystemDarkMode ? ' (Dark)' : ' (Light)'}
          </p>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            Try changing your system theme!
          </p>
        </div>
      </main>
    </div>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider 
      options={{
        // Follow system preferences
        followSystemPreference: true,
      }}
    >
      <App />
    </ThemeProvider>
  );
}`

  const scheduleThemesExample = `import { ThemeProvider, useTheme } from 'react-theme-master';

function App() {
  const { themeObject, theme } = useTheme();
  
  // Format current time as HH:MM
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={\`text-2xl font-bold \${themeObject.colors.text}\`}>Scheduled Themes</h1>
          <div className={\`px-4 py-2 rounded \${themeObject.colors.accent} \${themeObject.colors.text}\`}>
            {currentTime}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className={\`p-6 rounded-lg \${themeObject.colors.accent}\`}>
          <h2 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
            Current Theme: {theme}
          </h2>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            The theme will change automatically based on the time of day:
          </p>
          <ul className={\`mt-4 space-y-2 \${themeObject.colors.text}\`}>
            <li>• Light theme: 06:00 - 18:00</li>
            <li>• Dark theme: 18:00 - 06:00</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider 
      options={{
        // Schedule themes based on time of day
        scheduleThemes: [
          { theme: 'light', from: '06:00', to: '18:00' },
          { theme: 'dark', from: '18:00', to: '06:00' }
        ]
      }}
    >
      <App />
    </ThemeProvider>
  );
}`

  const nextJsExample = `// app/providers.tsx
'use client';

import { ThemeProvider } from 'react-theme-master';

export function Providers({ children }) {
  return (
    <ThemeProvider 
      options={{
        initialTheme: 'light',
        followSystemPreference: true,
      }}
    >
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// app/header.tsx
'use client';

import { useTheme, ThemeToggle } from 'react-theme-master';

export function Header() {
  const { themeObject } = useTheme();
  
  return (
    <header className={\`p-4 \${themeObject.colors.secondary}\`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className={\`text-2xl font-bold \${themeObject.colors.text}\`}>Next.js App</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

// app/page.tsx
import { Header } from './header';

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto p-4">
        <h1>Hello, Next.js with React Theme Master!</h1>
      </div>
    </main>
  );
}`

  return (
    <div className={`min-h-screen ${themeObject.colors.primary}`}>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`p-6 rounded-lg mb-8 ${themeObject.colors.accent}`}>
            <h1 className={`text-3xl font-bold mb-4 ${themeObject.colors.text}`}>Examples</h1>
            <p className={`text-lg ${themeObject.colors.textMuted}`}>
              Explore practical examples of React Theme Master in action.
            </p>
          </div>
          
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="custom">Custom Themes</TabsTrigger>
              <TabsTrigger value="system">System Preference</TabsTrigger>
              <TabsTrigger value="schedule">Theme Scheduling</TabsTrigger>
              <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                  A simple example showing how to set up React Theme Master and use it in a basic React application.
                </p>
                <CodePreview code={basicExample} language="jsx" />
                <div className="mt-6">
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/playground">
                      Try in Playground
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-6">
              <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Themes</h2>
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                  Create and use custom themes beyond the default light and dark modes.
                </p>
                <CodePreview code={customThemesExample} language="jsx" />
                <div className="mt-6">
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/docs/advanced/custom-themes">
                      Learn More About Custom Themes
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6">
              <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>System Preference Detection</h2>
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                  Automatically match the user's system color scheme preference.
                </p>
                <CodePreview code={systemPreferenceExample} language="jsx" />
                <div className="mt-6">
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/docs/hooks/use-system-theme">
                      useSystemTheme Hook Documentation
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-6">
              <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Scheduling</h2>
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                  Change themes automatically based on time of day.
                </p>
                <CodePreview code={scheduleThemesExample} language="jsx" />
                <div className="mt-6">
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/docs/advanced/theme-scheduling">
                      Theme Scheduling Documentation
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nextjs" className="space-y-6">
              <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Next.js Integration</h2>
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                  How to use React Theme Master with Next.js App Router.
                </p>
                <CodePreview code={nextJsExample} language="jsx" />
                <div className="mt-6">
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/docs/advanced/framework-integration">
                      Framework Integration Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className={`p-6 rounded-lg mt-10 text-center ${themeObject.colors.accent}`}>
            <h2 className={`text-2xl font-bold mb-2 ${themeObject.colors.text}`}>Ready to try it yourself?</h2>
            <p className={`mb-6 ${themeObject.colors.textMuted}`}>
              Explore more features and customize React Theme Master to fit your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className={themeObject.colors.button}>
                <Link href="/docs">
                  Read the Documentation
                </Link>
              </Button>
              <Button asChild variant="outline" className={themeObject.colors.buttonOutline}>
                <Link href="/playground">
                  Try the Playground
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}