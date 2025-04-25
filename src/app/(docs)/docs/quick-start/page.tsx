'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'
import Link from 'next/link'

export default function QuickStartPage() {
  const { themeObject } = useTheme()

  const basicSetupCode = `// 1. Install the package
npm install react-theme-master

// 2. Add the ThemeProvider to your app
import { ThemeProvider } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`

  const basicUsageCode = `// 3. Use the hook in your components
import { useTheme } from 'react-theme-master';

function MyComponent() {
  const { themeObject, theme, setTheme } = useTheme();
  
  return (
    <div className={\`p-6 \${themeObject.colors.primary}\`}>
      <h1 className={\`text-xl \${themeObject.colors.text}\`}>
        Current theme: {theme}
      </h1>
      
      <button 
        className={\`mt-4 px-4 py-2 rounded \${themeObject.colors.button}\`}
        onClick={() => setTheme('dark')}
      >
        Switch to Dark Mode
      </button>
    </div>
  );
}`

  const addComponentsCode = `// 4. Add theme switching components
import { ThemeToggle, ThemeSelector } from 'react-theme-master';

function Header() {
  const { themeObject } = useTheme();
  
  return (
    <header className={\`p-4 \${themeObject.colors.secondary}\`}>
      <div className="flex items-center justify-between">
        <h1 className={\`text-xl font-bold \${themeObject.colors.text}\`}>My App</h1>
        
        {/* Simple toggle between light/dark */}
        <ThemeToggle />
        
        {/* Or use a selector for multiple themes */}
        <ThemeSelector variant="dropdown" showPreview={true} />
      </div>
    </header>
  );
}`

  const tailwindConfigCode = `// 5. Configure Tailwind CSS (optional but recommended)
// tailwind.config.js
import { generateSafelist } from 'react-theme-master';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Your content paths
  ],
  safelist: generateSafelist(), // Prevents Tailwind from purging theme classes
  theme: {
    extend: {},
  },
  plugins: [],
};`

  return (
    <DocTemplate 
      title="Quick Start" 
      description="Get up and running with React Theme Master in minutes"
      previousPage={{ title: "Installation", href: "/docs/installation" }}
      nextPage={{ title: "Theme Structure", href: "/docs/theme-structure" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>1. Setup</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Install the package and wrap your application with the ThemeProvider:
        </p>
        <CodePreview code={basicSetupCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>2. Use the Hook</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Access and use theme data in your components with the useTheme hook:
        </p>
        <CodePreview code={basicUsageCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">themeObject</code> contains all colors and styles for your current theme,
          which you can apply to your components using Tailwind classes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>3. Add Theme Controls</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master provides ready-to-use components for theme switching:
        </p>
        <CodePreview code={addComponentsCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>4. Tailwind Configuration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          For optimal performance with Tailwind CSS, add the safelist to your configuration:
        </p>
        <CodePreview code={tailwindConfigCode} language="javascript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>5. Next Steps</h2>
        <p className={`mb-4 ${themeObject.colors.text}`}>
          You now have a working theme system! Here are some next steps to explore:
        </p>
        
        <ul className={`list-disc list-inside space-y-2 ml-4 ${themeObject.colors.text}`}>
          <li>
            <Link href="/docs/theme-structure" className="underline hover:text-opacity-80">
              Learn about theme structure
            </Link>
          </li>
          <li>
            <Link href="/docs/advanced/custom-themes" className="underline hover:text-opacity-80">
              Create your own custom themes
            </Link>
          </li>
          <li>
            <Link href="/docs/advanced/theme-scheduling" className="underline hover:text-opacity-80">
              Set up time-based theme scheduling
            </Link>
          </li>
          <li>
            <Link href="/docs/hooks/use-system-theme" className="underline hover:text-opacity-80">
              Use system theme preferences
            </Link>
          </li>
          <li>
            <Link href="/playground" className="underline hover:text-opacity-80">
              Try the interactive playground
            </Link>
          </li>
        </ul>
      </section>
    </DocTemplate>
  )
}