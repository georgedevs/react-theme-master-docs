'use client'

import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'
import Link from 'next/link'

export default function InstallationPage() {
  const { themeObject } = useTheme()

  const npmInstallCode = `npm install react-theme-master`
  
  const yarnInstallCode = `yarn add react-theme-master`
  
  const pnpmInstallCode = `pnpm add react-theme-master`

  const tailwindConfigCode = `// tailwind.config.js
import { generateSafelist } from 'react-theme-master';

/** @type {import('tailwindcss').Config} */
export default {
  // Your content paths
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  // This preserves all theme classes
  safelist: generateSafelist(),
  
  theme: {
    extend: {},
  },
  plugins: [],
};`

  const basicProviderCode = `// app/providers.tsx or components/providers.tsx
'use client'

import { ThemeProvider } from 'react-theme-master'

export function Providers({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}`

  const nextJsSetupCode = `// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}`

  const createReactAppCode = `// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'react-theme-master';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 ${themeObject.colors.text}`}>Installation</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Install the Package</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            Install React Theme Master using your preferred package manager:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-medium mb-2 ${themeObject.colors.text}`}>npm</h3>
              <CodePreview code={npmInstallCode} language="bash" />
            </div>
            
            <div>
              <h3 className={`text-lg font-medium mb-2 ${themeObject.colors.text}`}>yarn</h3>
              <CodePreview code={yarnInstallCode} language="bash" />
            </div>
            
            <div>
              <h3 className={`text-lg font-medium mb-2 ${themeObject.colors.text}`}>pnpm</h3>
              <CodePreview code={pnpmInstallCode} language="bash" />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Tailwind CSS Configuration</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            To prevent Tailwind from purging theme-related classes in production builds, add the safelist to your <code className="font-mono">tailwind.config.js</code>:
          </p>
          
          <CodePreview code={tailwindConfigCode} language="javascript" />
          
          <p className={`mt-4 ${themeObject.colors.textMuted}`}>
            The <code className="font-mono">generateSafelist()</code> function will include all necessary CSS classes for both built-in and custom themes.
          </p>
        </section>
        
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Setup with Different Frameworks</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-medium mb-3 ${themeObject.colors.text}`}>Basic Setup</h3>
              <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                Create a provider component that wraps your application:
              </p>
              <CodePreview code={basicProviderCode} language="jsx" />
            </div>
            
            <div>
              <h3 className={`text-xl font-medium mb-3 ${themeObject.colors.text}`}>Next.js (App Router)</h3>
              <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                For Next.js with App Router, create a providers component and use it in your root layout:
              </p>
              <CodePreview code={nextJsSetupCode} language="jsx" />
              <p className={`mt-4 ${themeObject.colors.textMuted}`}>
                Note the <code className="font-mono">suppressHydrationWarning</code> attribute which prevents warnings related to theme hydration.
              </p>
            </div>
            
            <div>
              <h3 className={`text-xl font-medium mb-3 ${themeObject.colors.text}`}>Create React App</h3>
              <p className={`mb-4 ${themeObject.colors.textMuted}`}>
                For Create React App, wrap your App component in the root file:
              </p>
              <CodePreview code={createReactAppCode} language="jsx" />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Verify Installation</h2>
          <p className={`mb-4 ${themeObject.colors.text}`}>
            To verify that React Theme Master is properly installed and configured, you can use the <code className="font-mono">useTheme</code> hook in a component:
          </p>
          
          <CodePreview 
            code={`import { useTheme } from 'react-theme-master';

function MyComponent() {
  const { theme } = useTheme();
  
  return <div>Current theme: {theme}</div>;
}`} 
            language="jsx" 
          />
          
          <p className={`mt-4 ${themeObject.colors.textMuted}`}>
            If this component renders without errors, you've successfully set up React Theme Master!
          </p>
        </section>
        
        <section>
          <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Next Steps</h2>
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            Now that you've installed React Theme Master, you can start using its components and hooks:
          </p>
          
          <ul className={`list-disc list-inside space-y-2 ml-4 ${themeObject.colors.text}`}>
            <li>
              <Link href="/docs/components/theme-selector" className="underline hover:text-opacity-80">
                Use the ThemeSelector component
              </Link>
            </li>
            <li>
              <Link href="/docs/components/theme-toggle" className="underline hover:text-opacity-80">
                Add a ThemeToggle for light/dark switching
              </Link>
            </li>
            <li>
              <Link href="/docs/hooks/use-theme" className="underline hover:text-opacity-80">
                Use the useTheme hook in your components
              </Link>
            </li>
            <li>
              <Link href="/docs/advanced/custom-themes" className="underline hover:text-opacity-80">
                Create custom themes
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}