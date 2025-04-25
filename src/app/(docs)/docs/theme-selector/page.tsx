'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme, ThemeSelector } from 'react-theme-master'
import CodePreview from '@/components/code-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

export default function ThemeSelectorPage() {
  const { themeObject } = useTheme()

  const basicUsageCode = `import { ThemeSelector } from 'react-theme-master';

// Default dropdown
<ThemeSelector />

// With a different variant
<ThemeSelector variant="buttons" />

// With theme previews
<ThemeSelector variant="grid" showPreview={true} />

// Icons only (compact)
<ThemeSelector variant="icons" />`

  const propTypesCode = `interface ThemeSelectorProps {
  // Display variants
  variant?: 'dropdown' | 'buttons' | 'grid' | 'icons';
  
  // Whether to show theme names
  showLabels?: boolean;
  
  // Size of the selector
  size?: 'sm' | 'md' | 'lg';
  
  // Dropdown placement (for dropdown variant)
  placement?: 'top' | 'bottom' | 'left' | 'right';
  
  // Additional class names
  className?: string;
  
  // Inline styles
  style?: React.CSSProperties;
  
  // Callback when theme changes
  onChange?: (themeName: string) => void;
  
  // Custom icons for each theme
  themeIcons?: Record<string, React.ReactNode>;
  
  // Whether to show a theme preview
  showPreview?: boolean;
  
  // Preview type
  previewType?: 'color-circles' | 'mini-mockup';
}`

  const customIconsCode = `import { ThemeSelector } from 'react-theme-master';
import { Sun, Moon, Leaf, Palette } from 'lucide-react';

function ThemeSwitcher() {
  // Define custom icons for each theme
  const themeIcons = {
    light: <Sun size={16} />,
    dark: <Moon size={16} />,
    forest: <Leaf size={16} />,
    custom: <Palette size={16} />
  };
  
  return (
    <ThemeSelector
      variant="dropdown"
      themeIcons={themeIcons}
      showLabels={true}
    />
  );
}`

  const customStylingCode = `// Custom styling with className and style props
<ThemeSelector
  variant="buttons"
  className="p-2 rounded bg-gray-100 dark:bg-gray-800"
  style={{ maxWidth: '400px' }}
/>

// Different sizes
<ThemeSelector size="sm" />
<ThemeSelector size="md" />
<ThemeSelector size="lg" />

// Dropdown placement
<ThemeSelector placement="bottom" /> {/* default */}
<ThemeSelector placement="top" />
<ThemeSelector placement="left" />
<ThemeSelector placement="right" />`

  const onChangeHandlerCode = `import { ThemeSelector } from 'react-theme-master';

function ThemeSwitcher() {
  const handleThemeChange = (themeName: string) => {
    // Log theme change
    console.log('Theme changed to:', themeName);
    
    // You could trigger analytics here
    sendAnalyticsEvent('theme_changed', { theme: themeName });
    
    // Or sync with other systems
    updateExternalUI(themeName);
  };
  
  return (
    <ThemeSelector
      variant="dropdown"
      onChange={handleThemeChange}
    />
  );
}`

  return (
    <DocTemplate 
      title="ThemeSelector" 
      description="UI component for selecting themes"
      previousPage={{ title: "Tailwind Integration", href: "/docs/tailwind-integration" }}
      nextPage={{ title: "ThemeToggle", href: "/docs/components/theme-toggle" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">ThemeSelector</code> component provides a user interface for selecting themes.
          It comes in multiple variants to fit different UI needs.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use the ThemeSelector component:
        </p>
        <CodePreview code={basicUsageCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Live Examples</h2>
        <Tabs defaultValue="dropdown">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdown">Dropdown</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dropdown">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Default dropdown variant:</p>
                <ThemeSelector variant="dropdown" />
                
                <p className={`mt-6 mb-4 ${themeObject.colors.textMuted}`}>With theme preview:</p>
                <ThemeSelector variant="dropdown" showPreview={true} />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeSelector variant="dropdown" />

<ThemeSelector variant="dropdown" showPreview={true} />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="buttons">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Buttons variant:</p>
                <ThemeSelector variant="buttons" />
                
                <p className={`mt-6 mb-4 ${themeObject.colors.textMuted}`}>Without labels:</p>
                <ThemeSelector variant="buttons" showLabels={false} />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeSelector variant="buttons" />

<ThemeSelector variant="buttons" showLabels={false} />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="icons">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Icons variant (compact):</p>
                <ThemeSelector variant="icons" />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeSelector variant="icons" />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
          
          <TabsContent value="grid">
            <Card className={themeObject.colors.secondary}>
              <CardContent className="p-6">
                <p className={`mb-4 ${themeObject.colors.textMuted}`}>Grid variant with previews:</p>
                <ThemeSelector variant="grid" showPreview={true} />
              </CardContent>
            </Card>
            
            <CodePreview 
              code={`<ThemeSelector variant="grid" showPreview={true} />`}
              language="jsx"
              className="mt-4"
            />
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Props</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The ThemeSelector component accepts the following props:
        </p>
        <CodePreview code={propTypesCode} language="typescript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Icons</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can customize the icons for each theme:
        </p>
        <CodePreview code={customIconsCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">themeIcons</code> prop takes an object where keys are theme names and values are React nodes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Styling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can customize the appearance of the ThemeSelector:
        </p>
        <CodePreview code={customStylingCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>onChange Handler</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Listen for theme changes with the onChange callback:
        </p>
        <CodePreview code={onChangeHandlerCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This is useful for triggering side effects when the theme changes, such as analytics events or updating external systems.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Previews</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">showPreview</code> prop controls whether theme previews are displayed. There are two preview types available:
        </p>
        
        <CodePreview 
          code={`// Show color circles preview (default)
<ThemeSelector 
  variant="dropdown" 
  showPreview={true} 
  previewType="color-circles" 
/>

// Show mini-mockup preview
<ThemeSelector 
  variant="dropdown" 
  showPreview={true} 
  previewType="mini-mockup" 
/>`} 
          language="jsx" 
        />
        
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The preview helps users understand the theme's appearance before selecting it.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Accessibility</h2>
        <p className={`mb-4 ${themeObject.colors.text}`}>
          The ThemeSelector component is built with accessibility in mind:
        </p>
        
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>Dropdown uses proper ARIA attributes for expanded state</li>
          <li>Button variant uses <code className="font-mono">aria-pressed</code> to indicate the active theme</li>
          <li>Icon variant includes title attributes for screen readers</li>
          <li>Keyboard navigation is supported</li>
        </ul>
        
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This ensures that all users, including those using assistive technologies, can effectively use the theme selector.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use the <code className="font-mono">dropdown</code> variant for most cases as it's space-efficient
            </li>
            <li>
              The <code className="font-mono">buttons</code> variant works well when you have only a few themes
            </li>
            <li>
              The <code className="font-mono">icons</code> variant is best for very limited space
            </li>
            <li>
              The <code className="font-mono">grid</code> variant with previews is ideal for theme galleries or settings pages
            </li>
            <li>
              Consider adding <code className="font-mono">showPreview={true}</code> when users might not be familiar with the themes
            </li>
            <li>
              For consistent UI, use the same size prop as other UI elements in the same area
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
              Use the dropdown or icons variant in a navigation bar for space efficiency.
            </p>
            <CodePreview 
              code={`<nav className="flex items-center justify-between p-4">
  <div>Logo</div>
  <div className="flex items-center gap-4">
    <NavigationLinks />
    <ThemeSelector variant="dropdown" />
  </div>
</nav>`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">In a settings page</h3>
            <p className={themeObject.colors.textMuted}>
              Use the grid variant with previews to showcase all available themes.
            </p>
            <CodePreview 
              code={`<div className="settings-page">
  <h2>Appearance</h2>
  <div className="card p-6">
    <h3>Theme</h3>
    <p>Choose your preferred theme</p>
    <ThemeSelector variant="grid" showPreview={true} />
  </div>
</div>`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">In a compact UI</h3>
            <p className={themeObject.colors.textMuted}>
              Use the icons variant when space is very limited.
            </p>
            <CodePreview 
              code={`<div className="toolbar">
  <ToolbarButton icon={<Edit />} />
  <ToolbarButton icon={<Save />} />
  <div className="divider" />
  <ThemeSelector variant="icons" size="sm" />
</div>`} 
              language="jsx" 
            />
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}