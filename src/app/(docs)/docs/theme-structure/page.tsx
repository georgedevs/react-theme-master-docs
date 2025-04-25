'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function ThemeStructurePage() {
  const { themeObject } = useTheme()

  const themeStructureCode = `// Basic theme structure
const myTheme = {
  // Required: Theme name identifier
  name: 'custom-theme',
  
  // Required: Theme colors using Tailwind CSS classes
  colors: {
    primary: 'bg-blue-900',      // Main background
    secondary: 'bg-blue-800',    // Secondary backgrounds (headers, cards)
    text: 'text-blue-50',        // Main text color
    textMuted: 'text-blue-300/70', // Secondary/muted text
    accent: 'bg-blue-700/50',    // Accent areas
    border: 'border-blue-700',   // Border color
    shadow: 'shadow-blue-900/60', // Shadow color
    button: 'bg-blue-500 text-white hover:bg-blue-600', // Primary button
    buttonOutline: 'border-blue-500 text-blue-500 hover:bg-blue-500/10', // Outline button
  },
  
  // Optional: Additional CSS variables (will be applied to :root)
  cssVars: {
    '--custom-blue': '#1e40af',
    '--custom-spacing': '1.5rem',
  },
  
  // Optional: Metadata about the theme
  meta: {
    description: 'A custom blue theme',
    author: 'Your Name',
    version: '1.0',
    // Any other metadata you want to include
  }
};`

  const requiredColorsCode = `// Required color properties
{
  primary: 'bg-white',          // Main background color
  secondary: 'bg-gray-50',      // Secondary background (headers, cards)
  text: 'text-gray-900',        // Main text color
  textMuted: 'text-gray-600',   // Secondary/muted text
  accent: 'bg-gray-100',        // Accent areas (highlights, focus)
  border: 'border-gray-200',    // Border color
  shadow: 'shadow-gray-200/20', // Shadow color
  button: 'bg-gray-900 text-white hover:bg-gray-800', // Primary button
  buttonOutline: 'border-gray-200 text-gray-900 hover:bg-gray-50', // Outline button
}`

  const themeColorsUsageCode = `import { useTheme } from 'react-theme-master';

function MyComponent() {
  const { themeObject } = useTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <h1 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
          My App
        </h1>
      </header>
      
      <main className="p-4">
        <div className={\`p-6 rounded-lg \${themeObject.colors.accent} border \${themeObject.colors.border}\`}>
          <h2 className={\`text-lg font-bold \${themeObject.colors.text}\`}>Welcome</h2>
          <p className={\`mt-2 \${themeObject.colors.textMuted}\`}>
            This content uses theme colors
          </p>
          <button className={\`mt-4 px-4 py-2 rounded \${themeObject.colors.button}\`}>
            Primary Button
          </button>
          <button className={\`mt-4 ml-2 px-4 py-2 rounded \${themeObject.colors.buttonOutline}\`}>
            Outline Button
          </button>
        </div>
      </main>
    </div>
  );
}`

  const themeWithCssVarsCode = `const myTheme = {
  name: 'custom-theme',
  colors: {
    // All required colors
    // ...
  },
  // CSS variables will be applied to :root
  cssVars: {
    '--theme-primary': 'hsla(210, 100%, 50%, 1)',
    '--theme-radius': '0.5rem',
    '--theme-font': '"Inter", sans-serif',
    '--theme-shadow-strength': '0.2',
    // Any custom CSS variables you need
  }
};`

  const multipleThemesCode = `import { ThemeProvider, defaultThemes } from 'react-theme-master';

// Your custom themes
const customThemes = {
  forest: {
    name: 'forest',
    colors: {
      // Forest theme colors...
    }
  },
  sunset: {
    name: 'sunset',
    colors: {
      // Sunset theme colors...
    }
  }
};

function App() {
  return (
    <ThemeProvider
      options={{
        // Combine built-in themes with your custom themes
        themes: { ...defaultThemes, ...customThemes },
        // Set initial theme
        initialTheme: 'forest'
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  return (
    <DocTemplate 
      title="Theme Structure" 
      description="Understanding how themes are structured in React Theme Master"
      previousPage={{ title: "Quick Start", href: "/docs/quick-start" }}
      nextPage={{ title: "Theme Provider", href: "/docs/theme-provider" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Theme Structure</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          A theme in React Theme Master is a JavaScript object with specific properties. Here's a complete example:
        </p>
        <CodePreview code={themeStructureCode} language="javascript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Required Properties</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Each theme must have a unique <code className="font-mono">name</code> and a <code className="font-mono">colors</code> object
          with the following required properties:
        </p>
        <CodePreview code={requiredColorsCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          All color properties use Tailwind CSS classes. You can include multiple classes for each property
          (e.g., <code className="font-mono">bg-blue-500 text-white hover:bg-blue-600</code> for buttons).
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Using Theme Colors</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          When you access the current theme via the <code className="font-mono">useTheme</code> hook, you can apply these color classes to your components:
        </p>
        <CodePreview code={themeColorsUsageCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>CSS Variables</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Themes can optionally include CSS variables, which will be applied to the document root.
          This is useful for more advanced theming needs:
        </p>
        <CodePreview code={themeWithCssVarsCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          CSS variables are applied automatically when the theme changes. You can then use them in your CSS:
        </p>
        <CodePreview 
          code={`.custom-element {
  background-color: var(--theme-primary);
  border-radius: var(--theme-radius);
  font-family: var(--theme-font);
  box-shadow: 0 2px 10px rgba(0, 0, 0, var(--theme-shadow-strength));
}`} 
          language="css" 
        />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Multiple Themes</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master comes with built-in themes (<code className="font-mono">light</code>, <code className="font-mono">dark</code>, <code className="font-mono">blue</code>, etc.) 
          but you can add your own custom themes and use them alongside the defaults:
        </p>
        <CodePreview code={multipleThemesCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          All themes will be available through the <code className="font-mono">ThemeSelector</code> component 
          and the <code className="font-mono">setTheme</code> function from <code className="font-mono">useTheme</code>.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Metadata</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">meta</code> property is optional and can contain any information you want to associate with the theme.
          This could include a description, author, version, or custom properties specific to your application.
        </p>
        <p className={themeObject.colors.textMuted}>
          Metadata is accessible via <code className="font-mono">themeObject.meta</code> and can be useful for displaying information
          about the current theme in your UI.
        </p>
      </section>
    </DocTemplate>
  )
}