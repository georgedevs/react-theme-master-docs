'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function UseThemePage() {
  const { themeObject } = useTheme()

  const basicUsageCode = `import { useTheme } from 'react-theme-master';

function MyComponent() {
  const { 
    theme,           // Current theme name (string)
    themeObject,     // Complete theme object with colors
    setTheme,        // Function to set theme
    toggleTheme,     // Function to toggle between themes
    availableThemes, // Array of available theme names
    isThemeAvailable, // Function to check if a theme exists
    getThemeProperty, // Function to get a theme property
    getThemeClass     // Function to get a theme class
  } = useTheme();
  
  return (
    <div className={themeObject.colors.primary}>
      <h1 className={themeObject.colors.text}>Current Theme: {theme}</h1>
      <button 
        className={themeObject.colors.button}
        onClick={() => setTheme('dark')}
      >
        Switch to Dark
      </button>
    </div>
  );
}`

  const hookReturnTypeCode = `interface UseThemeReturn {
  // Current theme name
  theme: string;
  
  // Complete theme object with all properties
  themeObject: Theme;
  
  // Function to set theme by name
  setTheme: (themeName: string) => void;
  
  // Function to toggle between two themes
  toggleTheme: (themeA: string, themeB?: string) => void;
  
  // Array of all available theme names
  availableThemes: string[];
  
  // Function to check if a theme exists
  isThemeAvailable: (themeName: string) => boolean;
  
  // Function to get a specific theme property
  getThemeProperty: (property: string) => string;
  
  // Function to get a specific theme class
  getThemeClass: (property: string) => string;
}`

  const themeSwitchingCode = `function ThemeSwitcher() {
  const { setTheme, toggleTheme, theme, availableThemes } = useTheme();
  
  return (
    <div className="space-y-4">
      {/* Set a specific theme */}
      <button onClick={() => setTheme('dark')}>
        Switch to Dark
      </button>
      
      {/* Toggle between light and dark (default behavior) */}
      <button onClick={() => toggleTheme('light', 'dark')}>
        Toggle Light/Dark
      </button>
      
      {/* Toggle between custom themes */}
      <button onClick={() => toggleTheme('blue', 'purple')}>
        Toggle Blue/Purple
      </button>
      
      {/* Cycle through all available themes */}
      <button onClick={() => {
        const currentIndex = availableThemes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        setTheme(availableThemes[nextIndex]);
      }}>
        Next Theme
      </button>
    </div>
  );
}`

  const themeDataAccessCode = `function ThemeInfo() {
  const { 
    theme, 
    themeObject, 
    availableThemes,
    getThemeProperty,
    getThemeClass
  } = useTheme();
  
  return (
    <div>
      <div>Current theme: {theme}</div>
      
      <div>Available themes: {availableThemes.join(', ')}</div>
      
      <div>Primary color: {themeObject.colors.primary}</div>
      
      {/* Access nested properties */}
      <div>Theme description: {themeObject.meta?.description}</div>
      
      {/* Get properties by path string */}
      <div>Button class: {getThemeProperty('colors.button')}</div>
      
      {/* Get theme class directly */}
      <div className={getThemeClass('colors.accent')}>
        This uses the accent color
      </div>
    </div>
  );
}`

  const componentStylingCode = `function ThemedButton({ children, onClick }) {
  const { themeObject } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={\`
        px-4 py-2 rounded
        \${themeObject.colors.button}
      \`}
    >
      {children}
    </button>
  );
}

function ThemedCard({ title, children }) {
  const { themeObject } = useTheme();
  
  return (
    <div className={\`
      p-6 rounded-lg border
      \${themeObject.colors.secondary}
      \${themeObject.colors.border}
    \`}>
      <h3 className={\`text-xl font-bold \${themeObject.colors.text}\`}>
        {title}
      </h3>
      <div className={\`mt-2 \${themeObject.colors.textMuted}\`}>
        {children}
      </div>
    </div>
  );
}`

  const conditionalThemingCode = `function ResponsiveThemedUI() {
  const { theme, themeObject } = useTheme();
  
  // Apply different styles based on the current theme
  const containerClasses = 
    theme === 'dark' 
      ? 'shadow-lg border-opacity-30' 
      : 'shadow-md border-opacity-100';
  
  // Mix theme colors with conditional styles
  return (
    <div className={\`
      p-6 rounded-lg border
      \${themeObject.colors.secondary}
      \${themeObject.colors.border}
      \${containerClasses}
    \`}>
      <h2 className={\`
        text-2xl font-bold
        \${theme === 'dark' 
          ? 'text-white' 
          : themeObject.colors.text
        }
      \`}>
        Responsive to Theme
      </h2>
      
      {/* Content conditional on theme */}
      {theme === 'dark' ? (
        <p className="text-gray-300">Dark mode content</p>
      ) : (
        <p className="text-gray-700">Light mode content</p>
      )}
    </div>
  );
}`

  const dynamicThemeClassName = `function DynamicThemeComponent({ variant = "primary" }) {
  const { themeObject } = useTheme();
  
  // Dynamically access theme properties based on props
  const bgColorClass = themeObject.colors[variant] || themeObject.colors.primary;
  const textColorClass = variant === 'primary' 
    ? themeObject.colors.text
    : themeObject.colors.textMuted;
  
  return (
    <div className={\`p-4 rounded \${bgColorClass}\`}>
      <p className={\`\${textColorClass}\`}>
        This component uses the {variant} theme color
      </p>
    </div>
  );
}

// Usage
<DynamicThemeComponent variant="accent" />
<DynamicThemeComponent variant="secondary" />`

  return (
    <DocTemplate 
      title="useTheme Hook" 
      description="Core hook for accessing and controlling themes"
      previousPage={{ title: "ThemeIndicator", href: "/docs/components/theme-indicator" }}
      nextPage={{ title: "useSystemTheme Hook", href: "/docs/hooks/use-system-theme" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">useTheme</code> hook is the core API for interacting with themes in React Theme Master.
          It provides access to the current theme, theme data, and functions to manipulate themes.
        </p>
        <p className={themeObject.colors.textMuted}>
          This hook must be used within a <code className="font-mono">ThemeProvider</code> component.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use the hook in your components:
        </p>
        <CodePreview code={basicUsageCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Return Values</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">useTheme</code> hook returns an object with the following properties and methods:
        </p>
        <CodePreview code={hookReturnTypeCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These values and functions provide complete control over the theme system.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Switching</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Use the provided functions to change themes:
        </p>
        <CodePreview code={themeSwitchingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          <code className="font-mono">setTheme</code> directly sets a specific theme, while <code className="font-mono">toggleTheme</code> switches between two themes.
          If you call <code className="font-mono">toggleTheme('light', 'dark')</code> and the current theme is 'light', it will switch to 'dark' (and vice versa).
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Accessing Theme Data</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Get information about the current theme and available themes:
        </p>
        <CodePreview code={themeDataAccessCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">themeObject</code> contains all properties of the current theme, including colors, metadata, and custom properties.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Styling Components</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Create themed components by applying theme colors:
        </p>
        <CodePreview code={componentStylingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          By creating reusable components that use theme colors, you can ensure consistent styling across your application.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Conditional Theming</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Apply different styles based on the current theme:
        </p>
        <CodePreview code={conditionalThemingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This allows you to further customize the appearance beyond just the theme colors, creating more sophisticated theme-aware components.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Dynamic Theme Properties</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Access theme properties dynamically based on props or other conditions:
        </p>
        <CodePreview code={dynamicThemeClassName} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This pattern is useful for creating flexible components that can adapt to different contexts while still respecting the current theme.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Error Handling</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <p className="mb-2">The <code className="font-mono">useTheme</code> hook includes built-in error handling:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Throws an error if used outside of a <code className="font-mono">ThemeProvider</code>
            </li>
            <li>
              Safely handles missing themes by falling back to the default theme
            </li>
            <li>
              Returns empty strings for missing theme properties rather than throwing errors
            </li>
            <li>
              Logs warnings when attempting to switch to a non-existent theme
            </li>
          </ul>
        </div>
        <CodePreview 
          code={`// Example of error handling
function SafeThemedComponent() {
  try {
    const { theme, themeObject } = useTheme();
    
    return (
      <div className={themeObject.colors.primary}>
        Current theme: {theme}
      </div>
    );
  } catch (error) {
    // This will catch the error if used outside ThemeProvider
    console.error('Theme error:', error);
    
    // Fallback rendering when theme is not available
    return (
      <div className="bg-gray-100 text-gray-900">
        Theme system not available
      </div>
    );
  }
}`} 
          language="jsx" 
        />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use <code className="font-mono">themeObject.colors</code> for consistent styling instead of hardcoded colors
            </li>
            <li>
              Create reusable themed components for common UI elements
            </li>
            <li>
              Consider using the <code className="font-mono">cn</code> utility (from libs like tailwind-merge or clsx) when combining theme classes with other classes
            </li>
            <li>
              Avoid excessive re-renders by not frequently changing themes
            </li>
            <li>
              When creating custom themes, ensure they include all required color properties
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Example Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">Theme-aware component library</h3>
            <p className={themeObject.colors.textMuted}>
              Create a set of components that automatically adapt to the current theme:
            </p>
            <CodePreview 
              code={`// components/Button.jsx
import { useTheme } from 'react-theme-master';

export function Button({ children, variant = 'primary', ...props }) {
  const { themeObject } = useTheme();
  
  const buttonClass = variant === 'outline' 
    ? themeObject.colors.buttonOutline
    : themeObject.colors.button;
  
  return (
    <button 
      className={\`px-4 py-2 rounded-md \${buttonClass}\`}
      {...props}
    >
      {children}
    </button>
  );
}

// components/Card.jsx
import { useTheme } from 'react-theme-master';

export function Card({ title, children, ...props }) {
  const { themeObject } = useTheme();
  
  return (
    <div 
      className={\`p-6 rounded-lg border \${themeObject.colors.secondary} \${themeObject.colors.border}\`}
      {...props}
    >
      <h3 className={\`text-xl font-bold \${themeObject.colors.text}\`}>{title}</h3>
      <div className={\`mt-2 \${themeObject.colors.textMuted}\`}>{children}</div>
    </div>
  );
}`} 
              language="jsx" 
            />
          </div>

          <div>
            <h3 className="font-bold mb-1">Theme selector with preview</h3>
            <p className={themeObject.colors.textMuted}>
              Create a custom theme selector with live preview:
            </p>
            <CodePreview 
              code={`function ThemePickerWithPreview() {
  const { availableThemes, theme, setTheme, themeObject } = useTheme();
  
  return (
    <div className="space-y-4">
      <h3 className={themeObject.colors.text}>Select a theme:</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {availableThemes.map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={\`
              p-3 rounded-lg border 
              \${themeName === theme ? 'ring-2 ring-blue-500' : ''}
              \${themeObject.colors.border}
              \${themeObject.colors.secondary}
            \`}
          >
            <div className="text-left font-medium mb-2">
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </div>
            
            {/* Theme color preview */}
            <div className="flex gap-1">
              {['primary', 'secondary', 'accent', 'button'].map(color => (
                <div 
                  key={color}
                  className={\`w-4 h-4 rounded-full \${themeObject.colors[color]}\`}
                  title={color}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}`} 
              language="jsx" 
            />
          </div>

          <div>
            <h3 className="font-bold mb-1">Themed charts and data visualization</h3>
            <p className={themeObject.colors.textMuted}>
              Apply theme colors to data visualizations:
            </p>
            <CodePreview 
              code={`import { useTheme } from 'react-theme-master';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ThemedBarChart({ data }) {
  const { themeObject, theme } = useTheme();
  
  // Extract colors from theme without the 'bg-', 'text-', etc. prefixes
  const primaryColor = themeObject.colors.primary.replace(/^(bg|text|border)-/, '');
  const accentColor = themeObject.colors.accent.replace(/^(bg|text|border)-/, '');
  
  // Use different grid colors based on theme
  const gridColor = theme === 'dark' ? '#555555' : '#dddddd';
  
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
      <XAxis dataKey="name" tick={{ fill: themeObject.colors.text }} />
      <YAxis tick={{ fill: themeObject.colors.text }} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: themeObject.colors.secondary,
          borderColor: themeObject.colors.border,
          color: themeObject.colors.text
        }} 
      />
      <Legend />
      <Bar dataKey="value" fill={primaryColor} />
      <Bar dataKey="secondaryValue" fill={accentColor} />
    </BarChart>
  );
}`} 
              language="jsx" 
            />
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}