'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function ThemeIndicatorPage() {
  const { themeObject } = useTheme()

  const basicUsageCode = `import { ThemeIndicator } from 'react-theme-master';

// Basic usage
<ThemeIndicator />

// With custom duration (in milliseconds)
<ThemeIndicator duration={5000} />

// Custom position
<ThemeIndicator position="top-right" />

// Show theme name
<ThemeIndicator showThemeName={true} />`

  const propTypesCode = `interface ThemeIndicatorProps {
  // Position on the screen
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  // Duration in milliseconds to show the indicator (default: 3000)
  duration?: number;
  
  // Whether to show the theme name
  showThemeName?: boolean;
  
  // Additional class names
  className?: string;
  
  // Inline styles
  style?: React.CSSProperties;
  
  // Custom icon
  icon?: ReactNode;
}`

  const customIconCode = `import { ThemeIndicator } from 'react-theme-master';
import { PaintBrush } from 'lucide-react';

// Custom icon
<ThemeIndicator 
  icon={<PaintBrush className="h-5 w-5" />} 
  showThemeName={true}
/>

// Custom icon and position
<ThemeIndicator 
  icon={<PaintBrush className="h-5 w-5" />}
  position="bottom-left"
  showThemeName={true}
/>`

  const customStylingCode = `import { ThemeIndicator } from 'react-theme-master';

// With custom classes
<ThemeIndicator 
  className="border border-gray-200 dark:border-gray-700 shadow-lg"
  showThemeName={true}
/>

// With inline styles
<ThemeIndicator 
  style={{ 
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
    borderRadius: '0.75rem' 
  }}
  showThemeName={true}
/>`

  const appUsageCode = `import { ThemeProvider, ThemeToggle, ThemeIndicator } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <header>
          <nav>
            <ThemeToggle />
          </nav>
        </header>
        
        <main>
          {/* Your app content */}
        </main>
        
        {/* The indicator will appear when theme changes */}
        <ThemeIndicator 
          position="bottom-right"
          duration={2000}
          showThemeName={true}
        />
      </div>
    </ThemeProvider>
  );
}`

  return (
    <DocTemplate 
      title="ThemeIndicator" 
      description="A notification component that appears when the theme changes"
      previousPage={{ title: "ThemeToggle", href: "/docs/components/theme-toggle" }}
      nextPage={{ title: "useTheme Hook", href: "/docs/hooks/use-theme" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">ThemeIndicator</code> component provides visual feedback when the theme changes.
          It displays a temporary notification that shows the current theme name and automatically disappears after a specified duration.
        </p>
        <p className={themeObject.colors.textMuted}>
          This is especially useful for providing users with confirmation that their theme change action was successful.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use the ThemeIndicator component at the root of your application:
        </p>
        <CodePreview code={basicUsageCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The indicator will only appear when the theme changes, so it won't be visible initially.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Props</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The ThemeIndicator component accepts the following props:
        </p>
        <CodePreview code={propTypesCode} language="typescript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Positioning</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can control where the indicator appears on the screen:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className={`p-4 rounded border ${themeObject.colors.border} ${themeObject.colors.accent}`}>
            <p className={`font-medium mb-2 ${themeObject.colors.text}`}>top-left</p>
            <CodePreview 
              code={`<ThemeIndicator position="top-left" />`} 
              language="jsx" 
              showCopyButton={false}
            />
          </div>
          <div className={`p-4 rounded border ${themeObject.colors.border} ${themeObject.colors.accent}`}>
            <p className={`font-medium mb-2 ${themeObject.colors.text}`}>top-right</p>
            <CodePreview 
              code={`<ThemeIndicator position="top-right" />`} 
              language="jsx" 
              showCopyButton={false}
            />
          </div>
          <div className={`p-4 rounded border ${themeObject.colors.border} ${themeObject.colors.accent}`}>
            <p className={`font-medium mb-2 ${themeObject.colors.text}`}>bottom-left</p>
            <CodePreview 
              code={`<ThemeIndicator position="bottom-left" />`} 
              language="jsx" 
              showCopyButton={false}
            />
          </div>
          <div className={`p-4 rounded border ${themeObject.colors.border} ${themeObject.colors.accent}`}>
            <p className={`font-medium mb-2 ${themeObject.colors.text}`}>bottom-right (default)</p>
            <CodePreview 
              code={`<ThemeIndicator position="bottom-right" />`} 
              language="jsx" 
              showCopyButton={false}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Duration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Control how long the indicator is visible with the <code className="font-mono">duration</code> prop:
        </p>
        <CodePreview 
          code={`// Show for 3 seconds (default)
<ThemeIndicator duration={3000} />

// Show for 5 seconds
<ThemeIndicator duration={5000} />

// Show for just 1 second
<ThemeIndicator duration={1000} />`} 
          language="jsx" 
        />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The duration is specified in milliseconds. The default is 3000ms (3 seconds).
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Name Display</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can control whether the theme name is displayed with the <code className="font-mono">showThemeName</code> prop:
        </p>
        <CodePreview 
          code={`// Show just the icon (default)
<ThemeIndicator showThemeName={false} />

// Show icon and theme name
<ThemeIndicator showThemeName={true} />`} 
          language="jsx" 
        />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          When <code className="font-mono">showThemeName</code> is true, the indicator will display the capitalized theme name (e.g., "Dark Theme").
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Icon</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can provide a custom icon to replace the default theme icons:
        </p>
        <CodePreview code={customIconCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          By default, the indicator uses different icons based on the current theme (sun for light, moon for dark, etc.).
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Styling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Customize the appearance with className and style props:
        </p>
        <CodePreview code={customStylingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The indicator uses your theme's accent color by default, but you can override this with custom styles.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Application Setup</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Here's how to integrate the ThemeIndicator in your app:
        </p>
        <CodePreview code={appUsageCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Place the ThemeIndicator component at the root level of your application. It will automatically appear when the theme changes and disappear after the specified duration.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Accessibility</h2>
        <p className={`mb-4 ${themeObject.colors.text}`}>
          The ThemeIndicator is designed with accessibility in mind:
        </p>
        
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>Uses semantic HTML structure</li>
          <li>Provides proper contrast for text and icons</li>
          <li>Auto-dismisses after a set period to avoid permanent screen clutter</li>
          <li>Uses the <code className="font-mono">role="complementary"</code> attribute for screen readers</li>
        </ul>
        
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Since this is a non-critical UI element that doesn't require user interaction, it's designed to be unobtrusive while still providing useful visual feedback.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use a reasonable duration that gives users enough time to notice the change without being distracting
            </li>
            <li>
              Enable <code className="font-mono">showThemeName</code> when you have many themes to help users understand which theme was activated
            </li>
            <li>
              Position the indicator where it won't interfere with important UI elements
            </li>
            <li>
              Consider using a shorter duration (1-2 seconds) for frequent theme changes
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Example Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">Basic feedback</h3>
            <p className={themeObject.colors.textMuted}>
              Provide simple confirmation when the user changes the theme:
            </p>
            <CodePreview 
              code={`<ThemeIndicator position="bottom-right" duration={2000} />`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">With theme name for clarity</h3>
            <p className={themeObject.colors.textMuted}>
              When your app has multiple themes, show the name to help users:
            </p>
            <CodePreview 
              code={`<ThemeIndicator showThemeName={true} duration={3000} />`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">In a crowded interface</h3>
            <p className={themeObject.colors.textMuted}>
              Use the top position when the bottom of the screen has other elements:
            </p>
            <CodePreview 
              code={`<ThemeIndicator position="top-right" showThemeName={true} />`} 
              language="jsx" 
            />
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}