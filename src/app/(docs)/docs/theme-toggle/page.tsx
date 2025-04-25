'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme, ThemeToggle } from 'react-theme-master'
import CodePreview from '@/components/code-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

export default function ThemeTogglePage() {
  const { themeObject } = useTheme()

  const basicUsageCode = `import { ThemeToggle } from 'react-theme-master';

// Basic toggle between light and dark
<ThemeToggle />

// With label
<ThemeToggle showLabel={true} />

// Different size
<ThemeToggle size="lg" />

// Custom themes to toggle between
<ThemeToggle lightTheme="light" darkTheme="blue" />`

  const propTypesCode = `interface ThemeToggleProps {
  // Themes to toggle between (default: 'light' and 'dark')
  lightTheme?: string;
  darkTheme?: string;
  
  // Size of the toggle button
  size?: 'sm' | 'md' | 'lg';
  
  // Position of the toggle in the UI
  position?: 'inline' | 'fixed-top-right' | 'fixed-bottom-right' | 'fixed-top-left' | 'fixed-bottom-left';
  
  // Additional class names
  className?: string;
  
  // Inline styles
  style?: React.CSSProperties;
  
  // Whether to show a text label
  showLabel?: boolean;
  
  // Custom label text or label object for each theme
  label?: string | Record<string, string>;
  
  // Custom icon or icon object for each theme
  icon?: React.ReactNode | Record<string, React.ReactNode>;
}`

  const customLabelCode = `import { ThemeToggle } from 'react-theme-master';

// Custom labels for each theme state
<ThemeToggle 
  showLabel={true}
  label={{
    light: 'Switch to Dark',
    dark: 'Switch to Light'
  }}
/>

// Single custom label
<ThemeToggle 
  showLabel={true}
  label="Toggle Theme"
/>`

  const customIconCode = `import { ThemeToggle } from 'react-theme-master';
import { Sun, Moon, Star, Cloud } from 'lucide-react';

// Custom icons for each theme state
<ThemeToggle 
  icon={{
    light: <Sun size={18} />,
    dark: <Moon size={18} />
  }}
/>

// Custom icons with blue and forest themes
<ThemeToggle 
  lightTheme="blue"
  darkTheme="forest"
  icon={{
    blue: <Cloud size={18} />,
    forest: <Star size={18} />
  }}
/>`

  const fixedPositionCode = `import { ThemeToggle } from 'react-theme-master';

// Fixed in the top-right corner
<ThemeToggle position="fixed-top-right" />

// Fixed in the bottom-right corner
<ThemeToggle position="fixed-bottom-right" />

// Fixed in the top-left corner
<ThemeToggle position="fixed-top-left" />

// Fixed in the bottom-left corner
<ThemeToggle position="fixed-bottom-left" />

// Inline (default)
<ThemeToggle position="inline" />`

  const customStylingCode = `import { ThemeToggle } from 'react-theme-master';

// With custom class and style
<ThemeToggle 
  className="border border-gray-200 dark:border-gray-700"
  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
/>

// Different sizes
<ThemeToggle size="sm" />
<ThemeToggle size="md" /> {/* default */}
<ThemeToggle size="lg" />`

  return (
    <DocTemplate 
      title="ThemeToggle" 
      description="Simple toggle component for switching between themes"
      previousPage={{ title: "ThemeSelector", href: "/docs/components/theme-selector" }}
      nextPage={{ title: "ThemeIndicator", href: "/docs/components/theme-indicator" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">ThemeToggle</code> component provides a simple button for toggling between two themes,
          typically light and dark modes. It's designed to be intuitive and easy to use, with customizable appearance and behavior.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use the ThemeToggle component:
        </p>
        <CodePreview code={basicUsageCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Live Examples</h2>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="labeled">With Labels</TabsTrigger>
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
            <TabsTrigger value="custom">Custom Themes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Default toggle with no label:</p>
                <ThemeToggle />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeToggle />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="labeled">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Toggle with default label:</p>
                <ThemeToggle showLabel={true} />
                
                <p className={`mt-6 mb-4 ${themeObject.colors.textMuted}`}>With custom label:</p>
                <ThemeToggle 
                  showLabel={true} 
                  label={{
                    light: 'Switch to Dark',
                    dark: 'Switch to Light'
                  }}
                />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeToggle showLabel={true} />

<ThemeToggle 
  showLabel={true} 
  label={{
    light: 'Switch to Dark',
    dark: 'Switch to Light'
  }}
/>`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="sizes">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Different sizes:</p>
                <div className="flex items-center gap-4">
                  <ThemeToggle size="sm" />
                  <ThemeToggle size="md" />
                  <ThemeToggle size="lg" />
                </div>
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeToggle size="sm" />
<ThemeToggle size="md" /> {/* default */}
<ThemeToggle size="lg" />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="custom">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Toggle between custom themes:</p>
                <ThemeToggle lightTheme="light" darkTheme="blue" />
                
                <p className={`mt-6 mb-4 ${themeObject.colors.textMuted}`}>With label:</p>
                <ThemeToggle 
                  lightTheme="light" 
                  darkTheme="purple" 
                  showLabel={true}
                />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeToggle lightTheme="light" darkTheme="blue" />

<ThemeToggle 
  lightTheme="light" 
  darkTheme="purple" 
  showLabel={true}
/>`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Props</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The ThemeToggle component accepts the following props:
        </p>
        <CodePreview code={propTypesCode} language="typescript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Labels</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can customize the labels shown next to the toggle:
        </p>
        <CodePreview code={customLabelCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          When using a string for the label, it will be used regardless of the current theme. 
          When using an object, the key should match the theme name.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Icons</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can also customize the icons used in the toggle:
        </p>
        <CodePreview code={customIconCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          By default, the toggle uses sun and moon icons for light and dark themes. You can provide custom icons for any theme.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Fixed Position</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The toggle can be positioned in fixed locations on the screen:
        </p>
        <CodePreview code={fixedPositionCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This is useful for ensuring the toggle is always accessible regardless of page scroll position.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Styling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Customize the appearance with className and style props:
        </p>
        <CodePreview code={customStylingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          You can also use the <code className="font-mono">size</code> prop to change the button size.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Accessibility</h2>
        <p className={`mb-4 ${themeObject.colors.text}`}>
          The ThemeToggle component includes proper accessibility features:
        </p>
        
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>Proper <code className="font-mono">aria-label</code> describing the toggle's purpose</li>
          <li>Dynamic <code className="font-mono">title</code> attribute for tooltips</li>
          <li>Focus styles for keyboard navigation</li>
          <li>Support for screen readers</li>
        </ul>
        
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These features ensure that all users can interact with the theme toggle, regardless of their abilities or input methods.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Place the toggle in a consistent location across all pages
            </li>
            <li>
              Consider using <code className="font-mono">showLabel</code> for clarity
            </li>
            <li>
              For mobile interfaces, consider using <code className="font-mono">size="sm"</code> to save space
            </li>
            <li>
              Use the <code className="font-mono">position</code> prop for fixed positioning only when necessary
            </li>
            <li>
              When toggling between non-standard themes, use clear icons or labels to indicate what each theme looks like
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Example Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">In a navbar</h3>
            <p className={themeObject.colors.textMuted}>
              Add a theme toggle to your site's navigation for quick access.
            </p>
            <CodePreview 
              code={`<nav className="flex items-center justify-between p-4">
  <div className="logo">My App</div>
  <div className="flex items-center gap-4">
    <NavLinks />
    <ThemeToggle size="sm" />
  </div>
</nav>`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Fixed position for long pages</h3>
            <p className={themeObject.colors.textMuted}>
              Use fixed positioning for easy access on long scrolling pages.
            </p>
            <CodePreview 
              code={`<div className="min-h-screen">
  <ThemeToggle 
    position="fixed-bottom-right" 
    size="lg"
    showLabel={true}
  />
  <main>
    {/* Long page content */}
  </main>
</div>`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Custom themes toggle</h3>
            <p className={themeObject.colors.textMuted}>
              Toggle between custom themed modes for your application.
            </p>
            <CodePreview 
              code={`<ThemeToggle 
  lightTheme="light" 
  darkTheme="forest"
  showLabel={true}
  label={{
    light: 'Forest Mode',
    forest: 'Light Mode'
  }}
  icon={{
    light: <TreeIcon />,
    forest: <SunIcon />
  }}
/>`} 
              language="jsx" 
            />
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}