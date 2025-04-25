'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function CssVariablesPage() {
  const { themeObject } = useTheme()

  const cssVarsUtilitiesCode = `import { 
  applyThemeToCssVars,
  setupThemeTransition,
  removeThemeTransition
} from 'react-theme-master';

// Apply a theme's colors as CSS variables
applyThemeToCssVars(myTheme);

// Setup smooth transitions between themes
setupThemeTransition(300); // Duration in milliseconds

// Remove transitions (if needed)
removeThemeTransition();`

  const themeCssVarsCode = `// When defining a theme, you can include CSS variables
const myTheme = {
  name: 'custom',
  colors: {
    primary: 'bg-blue-900',
    secondary: 'bg-blue-800',
    // other required colors...
  },
  // Custom CSS variables to apply to :root
  cssVars: {
    '--theme-primary-color': '#1e3a8a', // Raw color value
    '--theme-border-radius': '0.5rem',
    '--theme-font-family': '"Inter", sans-serif',
    '--theme-animation-speed': '300ms'
  }
};`

  const tailwindIntegrationCode = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Use CSS variables defined by the theme
        'theme-primary': 'var(--theme-primary)',
        'theme-secondary': 'var(--theme-secondary)',
        'theme-accent': 'var(--theme-accent)',
        'theme-text': 'var(--theme-text)',
      },
      borderRadius: {
        'theme': 'var(--theme-border-radius, 0.5rem)',
      },
      fontFamily: {
        'theme': 'var(--theme-font-family, sans-serif)',
      },
      transitionDuration: {
        'theme': 'var(--theme-transition-duration, 300ms)',
      },
    },
  },
};`

  const cssUseExampleCode = `/* In your CSS or styled components */
.themed-element {
  /* Use theme CSS variables */
  background-color: var(--theme-primary);
  color: var(--theme-text);
  border-radius: var(--theme-border-radius, 0.5rem);
  font-family: var(--theme-font-family, sans-serif);
  transition-duration: var(--theme-transition-duration, 300ms);
  box-shadow: 0 2px 10px rgba(0, 0, 0, var(--theme-shadow-opacity, 0.1));
}

/* Create different styles based on theme */
[data-theme="dark"] .themed-element {
  box-shadow: 0 2px 15px rgba(0, 0, 0, var(--theme-shadow-opacity, 0.2));
}

[data-theme="blue"] .special-background {
  background-image: linear-gradient(
    to bottom right,
    var(--theme-primary), 
    var(--theme-secondary)
  );
}`

  const transitionImplementationCode = `// This is how theme transitions are implemented
const setupThemeTransition = (duration = 300) => {
  const root = document.documentElement;
  
  // Set transition duration variable
  root.style.setProperty('--theme-transition-duration', \`\${duration}ms\`);
  
  // Add the theme transition class if it doesn't exist
  if (!root.classList.contains('theme-transition')) {
    root.classList.add('theme-transition');
    
    // Add the transition CSS if it doesn't exist
    let style = document.getElementById('theme-transition-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'theme-transition-style';
      style.innerHTML = \`
        .theme-transition {
          transition: background-color var(--theme-transition-duration) ease,
                      color var(--theme-transition-duration) ease,
                      border-color var(--theme-transition-duration) ease,
                      box-shadow var(--theme-transition-duration) ease;
        }
        
        .theme-transition * {
          transition: background-color var(--theme-transition-duration) ease,
                      color var(--theme-transition-duration) ease,
                      border-color var(--theme-transition-duration) ease,
                      box-shadow var(--theme-transition-duration) ease;
        }
      \`;
      document.head.appendChild(style);
    }
  }
};`

  const themeProviderCssVarsCode = `import { ThemeProvider } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider
      options={{
        // Enable smooth transitions between themes
        transitionDuration: 300, // Duration in milliseconds
        
        // Or disable transitions completely
        // transitionDuration: 0
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  const customThemeApplicationCode = `import { applyThemeToCssVars } from 'react-theme-master';

// Create a custom theme
const customTheme = {
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
  cssVars: {
    '--theme-border-radius': '0.75rem',
    '--theme-shadow-opacity': '0.15',
    '--theme-forest-leaf-color': '#1a4420'
  }
};

// Manually apply the theme
applyThemeToCssVars(customTheme);

// This will:
// 1. Clean up existing theme CSS variables
// 2. Apply new CSS variables for each color and custom property
// 3. Set the data-theme attribute on the document element`

  const cssVarsInJsCode = `function ThemedComponent() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Get access to CSS variables in JavaScript
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-primary')
      .trim();
    
    // Use it for something that requires the actual color value
    // For example, with a third-party library that doesn't support CSS variables
    myChartLibrary.setChartColors({
      backgroundColor: primaryColor,
      // ...
    });
  }, [theme]); // Re-run when theme changes
  
  return (
    <div>
      {/* Your component content */}
    </div>
  );
}`

  return (
    <DocTemplate 
      title="CSS Variables Utilities" 
      description="Utilities for managing theme-based CSS variables"
      previousPage={{ title: "Storage Utilities", href: "/docs/utilities/storage" }}
      nextPage={{ title: "System Theme", href: "/docs/utilities/system-theme" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master provides utilities for working with CSS Custom Properties (CSS Variables).
          These utilities allow you to apply theme colors and other properties as CSS variables,
          enabling more advanced styling techniques and smooth transitions between themes.
        </p>
        <p className={themeObject.colors.textMuted}>
          CSS variables provide a powerful way to use theme values in places where direct Tailwind classes can't be applied,
          such as in SVGs, pseudo-elements, or with third-party components.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Available Utilities</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use these CSS variables utilities:
        </p>
        <CodePreview code={cssVarsUtilitiesCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These functions provide direct control over CSS variables and transitions. In most cases, you won't need to call these directly as the ThemeProvider handles this automatically.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme CSS Variables</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Themes can include custom CSS variables:
        </p>
        <CodePreview code={themeCssVarsCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          When a theme includes a <code className="font-mono">cssVars</code> property, those variables will be applied to the document root (<code className="font-mono">:root</code>) when the theme is active.
        </p>
        <p className={`mt-2 ${themeObject.colors.textMuted}`}>
          In addition to custom variables, React Theme Master automatically creates CSS variables for each color in your theme, with names like <code className="font-mono">--theme-primary</code>, <code className="font-mono">--theme-secondary</code>, etc.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Tailwind Integration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can use theme CSS variables in your Tailwind configuration:
        </p>
        <CodePreview code={tailwindIntegrationCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This allows you to use theme colors with Tailwind classes like <code className="font-mono">bg-theme-primary</code> or <code className="font-mono">text-theme-accent</code>, which will automatically update when the theme changes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Using CSS Variables</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Use the CSS variables in your stylesheets:
        </p>
        <CodePreview code={cssUseExampleCode} language="css" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          CSS variables make it possible to apply theme colors in places where Tailwind classes can't be used directly, such as in pseudo-elements, gradients, filters, and animations.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Transitions</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master includes utilities for smooth transitions between themes. Here's how they're implemented:
        </p>
        <CodePreview code={transitionImplementationCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These transitions create a smooth fade effect when switching between themes, rather than an abrupt change.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>ThemeProvider Configuration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Configure CSS variables behavior through the ThemeProvider:
        </p>
        <CodePreview code={themeProviderCssVarsCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">transitionDuration</code> option controls how smoothly themes fade into each other. Set it to <code className="font-mono">0</code> to disable transitions completely.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Manual Theme Application</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Manually apply a theme's CSS variables:
        </p>
        <CodePreview code={customThemeApplicationCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This is useful for applying themes in contexts where you're not using the ThemeProvider, or for creating theme previews.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Accessing CSS Variables in JavaScript</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can access the CSS variables in your JavaScript code:
        </p>
        <CodePreview code={cssVarsInJsCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This technique is useful when working with third-party libraries that require actual color values rather than CSS variables.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Generated CSS Variables</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          When a theme is active, the following CSS variables are automatically created:
        </p>
        
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>
            <code className="font-mono">--theme-primary</code> - Primary background color
          </li>
          <li>
            <code className="font-mono">--theme-secondary</code> - Secondary background color
          </li>
          <li>
            <code className="font-mono">--theme-text</code> - Main text color
          </li>
          <li>
            <code className="font-mono">--theme-text-muted</code> - Secondary text color
          </li>
          <li>
            <code className="font-mono">--theme-accent</code> - Accent color
          </li>
          <li>
            <code className="font-mono">--theme-border</code> - Border color
          </li>
          <li>
            <code className="font-mono">--theme-shadow</code> - Shadow color
          </li>
          <li>
            <code className="font-mono">--theme-transition-duration</code> - Theme transition duration
          </li>
          <li>
            Any custom variables defined in the theme's <code className="font-mono">cssVars</code> property
          </li>
        </ul>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use Tailwind classes directly for most styling needs, falling back to CSS variables only when necessary
            </li>
            <li>
              Keep transitions enabled for a better user experience when switching themes
            </li>
            <li>
              Prefix custom CSS variables in themes with <code className="font-mono">--theme-</code> to avoid conflicts
            </li>
            <li>
              When working with third-party libraries, use the CSS variables to maintain consistent colors
            </li>
            <li>
              Consider adding fallback values for CSS variables, e.g., <code className="font-mono">var(--theme-border-radius, 0.5rem)</code>
            </li>
            <li>
              Use the <code className="font-mono">data-theme</code> attribute for conditional styling based on the current theme
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Example Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">Styling SVG elements</h3>
            <p className={themeObject.colors.textMuted}>
              Use CSS variables to theme SVG elements:
            </p>
            <CodePreview 
              code={`function ThemedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <style>
        {/* Use theme CSS variables to style SVG elements */}
        {
        \`
        .icon-primary {
          fill: var(--theme-primary);
        }
        .icon-secondary {
          fill: var(--theme-secondary);
        }
        .icon-accent {
          stroke: var(--theme-accent);
          stroke-width: 2;
        }
        \`
        }
      </style>
      <circle cx="12" cy="12" r="10" className="icon-primary" />
      <path d="M8 12l3 3 5-5" className="icon-accent" />
    </svg>
  );
}`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Advanced CSS effects</h3>
            <p className={themeObject.colors.textMuted}>
              Create theme-aware advanced CSS effects:
            </p>
            <CodePreview 
              code={`/* In your CSS */
.themed-glass-card {
  background: rgba(var(--theme-primary-rgb, 255, 255, 255), 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-border-rgb, 0, 0, 0), 0.1);
  box-shadow: 
    0 4px 6px rgba(var(--theme-shadow-rgb, 0, 0, 0), 0.1),
    0 1px 3px rgba(var(--theme-shadow-rgb, 0, 0, 0), 0.05);
}

.themed-gradient-button {
  background: linear-gradient(
    to right,
    var(--theme-button-from, #3b82f6),
    var(--theme-button-to, #60a5fa)
  );
  color: white;
  transition: all var(--theme-transition-duration, 300ms) ease;
}

.themed-gradient-button:hover {
  background: linear-gradient(
    to right,
    var(--theme-button-to, #60a5fa),
    var(--theme-button-from, #3b82f6)
  );
}`} 
              language="css" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Third-party library integration</h3>
            <p className={themeObject.colors.textMuted}>
              Use CSS variables with chart libraries:
            </p>
            <CodePreview 
              code={`import { useTheme } from 'react-theme-master';
import { Chart } from 'chart.js';

function ThemedChart({ data }) {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Get theme colors from CSS variables
    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue('--theme-primary').trim();
    const secondaryColor = style.getPropertyValue('--theme-secondary').trim();
    const textColor = style.getPropertyValue('--theme-text').trim();
    
    // Create or update chart with theme colors
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Primary Data',
            backgroundColor: primaryColor,
            data: data.primary,
          }, {
            label: 'Secondary Data',
            backgroundColor: secondaryColor,
            data: data.secondary,
          }]
        },
        options: {
          // Use theme colors for text
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColor
              }
            },
            y: {
              ticks: {
                color: textColor
              }
            }
          }
        }
      });
      
      return () => chart.destroy();
    }
  }, [data, theme]); // Re-create chart when theme changes
  
  return (
    <canvas ref={chartRef} width="400" height="200"></canvas>
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