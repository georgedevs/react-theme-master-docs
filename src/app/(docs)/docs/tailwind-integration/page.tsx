'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function TailwindIntegrationPage() {
  const { themeObject } = useTheme()

  const tailwindConfigCode = `// tailwind.config.js
import { generateSafelist } from 'react-theme-master';

/** @type {import('tailwindcss').Config} */
export default {
  // Your content paths
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Safelist for React Theme Master
  safelist: generateSafelist(),
  
  theme: {
    extend: {},
  },
  plugins: [],
};`

  const customSafelistCode = `// tailwind.config.js
import { extractThemeClasses } from 'react-theme-master';
import myCustomThemes from './src/themes';

// Extract classes from your custom themes
const themeClasses = extractThemeClasses(myCustomThemes);

// Add any additional classes you want to safelist
const additionalClasses = [
  // Your custom safelist
  'hover:bg-blue-700',
  'focus:ring-2'
];

/** @type {import('tailwindcss').Config} */
export default {
  // Your content paths
  content: [
    // ...
  ],
  
  // Combine theme classes with your additional classes
  safelist: [...themeClasses, ...additionalClasses],
  
  theme: {
    extend: {},
  },
  plugins: [],
};`

  const basicThemeUsageCode = `import { useTheme } from 'react-theme-master';

function Button({ children, onClick }) {
  const { themeObject } = useTheme();
  
  return (
    <button 
      onClick={onClick}
      className={\`
        px-4 py-2 rounded-md 
        \${themeObject.colors.button}
      \`}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick }) {
  const { themeObject } = useTheme();
  
  return (
    <button 
      onClick={onClick}
      className={\`
        px-4 py-2 rounded-md border 
        \${themeObject.colors.buttonOutline}
      \`}
    >
      {children}
    </button>
  );
}`

  const conditionalStylingCode = `import { useTheme } from 'react-theme-master';

function Card({ title, children, highlighted = false }) {
  const { themeObject, theme } = useTheme();
  
  return (
    <div className={\`
      p-6 rounded-lg
      \${highlighted 
        ? 'bg-blue-500 text-white' // Highlighted state ignores theme
        : themeObject.colors.accent // Normal state uses theme
      }
      \${theme === 'dark' ? 'shadow-md' : 'shadow-sm'} // Conditional shadow based on theme
    \`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}`

  const tailwindMergeCode = `// utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine clsx and tailwind-merge for safer class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// In your component
import { useTheme } from 'react-theme-master';
import { cn } from '../utils';

function Button({ children, className, ...props }) {
  const { themeObject } = useTheme();
  
  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-md', // Base classes
        themeObject.colors.button, // Theme classes
        className // User provided classes (can override)
      )}
      {...props}
    >
      {children}
    </button>
  );
}`

  const cssVarsCode = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Use CSS variables defined by the theme
        'theme-primary': 'var(--theme-primary)',
        'theme-accent': 'var(--theme-accent)',
        'theme-text': 'var(--theme-text)',
      },
      borderRadius: {
        'theme': 'var(--theme-radius, 0.5rem)',
      },
    },
  },
};

// Usage in component
<div className="bg-theme-primary text-theme-text rounded-theme">
  This uses theme CSS variables through Tailwind
</div>`

  return (
    <DocTemplate 
      title="Tailwind CSS Integration" 
      description="How to integrate React Theme Master with Tailwind CSS"
      previousPage={{ title: "Theme Provider", href: "/docs/theme-provider" }}
      nextPage={{ title: "ThemeSelector", href: "/docs/components/theme-selector" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master is built to work seamlessly with Tailwind CSS. It uses Tailwind classes for theme definitions,
          making it easy to apply consistent styling across your application.
        </p>
        <p className={themeObject.colors.textMuted}>
          This approach leverages Tailwind's utility-first philosophy while adding theme management capabilities.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Tailwind Configuration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          To ensure that theme-related classes aren't purged in production builds, add the safelist to your Tailwind configuration:
        </p>
        <CodePreview code={tailwindConfigCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">generateSafelist()</code> function automatically includes all classes used in the default themes
          and essential utility classes used by the React Theme Master components.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Safelist</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          If you have custom themes, you can extract classes from them and add your own safelist:
        </p>
        <CodePreview code={customSafelistCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">extractThemeClasses()</code> function takes a themes object and returns an array of all CSS classes used in those themes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Using Theme Colors in Components</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          With the <code className="font-mono">useTheme</code> hook, you can access theme colors and apply them to your components:
        </p>
        <CodePreview code={basicThemeUsageCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This approach ensures that your components automatically update when the theme changes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Conditional Styling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can combine theme values with conditional styling for more complex components:
        </p>
        <CodePreview code={conditionalStylingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This example shows how to apply different styles based on both component props and the current theme.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Class Merging with tailwind-merge</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          For components that accept custom className props, it's recommended to use utilities like <code className="font-mono">clsx</code> and <code className="font-mono">tailwind-merge</code> to safely combine classes:
        </p>
        <CodePreview code={tailwindMergeCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This approach properly handles class conflicts and allows consumers of your component to override theme styles when needed.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>CSS Variables Integration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master automatically applies theme colors as CSS variables when using the <code className="font-mono">cssVars</code> property.
          You can extend your Tailwind configuration to use these variables:
        </p>
        <CodePreview code={cssVarsCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This provides an alternative approach to using theme values directly through Tailwind classes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use the <code className="font-mono">generateSafelist()</code> function to ensure theme classes aren't purged.
            </li>
            <li>
              Create reusable components that use theme colors for consistent styling.
            </li>
            <li>
              Consider using <code className="font-mono">tailwind-merge</code> for components that accept custom className props.
            </li>
            <li>
              For simpler needs, using theme colors directly is fine. For more complex theming, consider CSS variables.
            </li>
            <li>
              Remember that theme colors are just Tailwind classes, so you can combine them with other Tailwind utilities.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Troubleshooting</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">Missing theme classes in production</h3>
            <p className={themeObject.colors.textMuted}>
              If theme classes are getting purged in production, ensure you've added the safelist to your Tailwind config and that your build process is correctly using it.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Custom theme classes not working</h3>
            <p className={themeObject.colors.textMuted}>
              If you're using custom Tailwind classes in your themes, make sure they're either included in your content paths or added to the safelist.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Class conflicts</h3>
            <p className={themeObject.colors.textMuted}>
              If you're experiencing class conflicts when combining theme classes with other classes, use <code className="font-mono">tailwind-merge</code> to properly handle this.
            </p>
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}