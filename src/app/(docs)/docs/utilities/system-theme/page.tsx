'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function SystemThemeUtilitiesPage() {
  const { themeObject } = useTheme()

  const systemThemeUtilitiesCode = `import { 
  getSystemTheme,
  isSystemTheme,
  getThemeForSystem,
  createSystemThemeListener
} from 'react-theme-master';

// Get the current system theme ('light' or 'dark')
const systemTheme = getSystemTheme();

// Check if a theme matches the system preference
const isMatchingSystem = isSystemTheme('dark'); // true if system is in dark mode

// Get a theme that matches the system preference
const themeForSystem = getThemeForSystem('light', 'dark'); // 'dark' if system is dark, 'light' otherwise

// Create a listener for system theme changes
const cleanup = createSystemThemeListener((isDarkMode) => {
  console.log('System switched to', isDarkMode ? 'dark' : 'light', 'mode');
});

// When done, clean up the listener
cleanup();`

  const getSystemThemeCode = `/**
 * Detect system color scheme preference
 * @returns 'light' | 'dark' - The current system theme
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  // Check for prefers-color-scheme media query
  const isDarkMode = window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return isDarkMode ? 'dark' : 'light';
};`

  const isSystemThemeCode = `/**
 * Check if a theme matches the system preference
 * @param theme - The theme name to check
 * @returns boolean - Whether the theme matches the system preference
 */
export const isSystemTheme = (theme: string): boolean => {
  const systemTheme = getSystemTheme();
  return theme === systemTheme;
};`

  const getThemeForSystemCode = `/**
 * Get a theme that matches the system preference
 * @param lightTheme - The theme to use for light mode
 * @param darkTheme - The theme to use for dark mode
 * @returns string - The theme that matches the system preference
 */
export const getThemeForSystem = (
  lightTheme: string = 'light',
  darkTheme: string = 'dark'
): string => {
  const systemTheme = getSystemTheme();
  return systemTheme === 'dark' ? darkTheme : lightTheme;
};`

  const createSystemThemeListenerCode = `/**
 * Create a media query listener for system preference changes
 * @param callback - The callback to run when the system preference changes
 * @returns Function - A cleanup function to remove the listener
 */
export const createSystemThemeListener = (
  callback: (isDarkMode: boolean) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  // Different browsers have different event listener methods
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else if ('addListener' in mediaQuery) {
    // @ts-ignore - For older browsers
    mediaQuery.addListener(handleChange);
  }
  
  // Return cleanup function
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleChange);
    } else if ('removeListener' in mediaQuery) {
      // @ts-ignore - For older browsers
      mediaQuery.removeListener(handleChange);
    }
  };
};`

  const systemThemeProviderConfigCode = `import { ThemeProvider } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider
      options={{
        // Automatically follow system preference
        followSystemPreference: true,
        
        // Or follow only initially, then respect user choice
        // followSystemPreference: 'initial-only',
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  const themeShowcaseSystemCode = `import { getSystemTheme, getThemeForSystem } from 'react-theme-master';

function ThemeShowcase() {
  // Get current system theme
  const systemTheme = getSystemTheme();
  
  // Get a specific theme for the current system setting
  const theme = getThemeForSystem('light-blue', 'dark-blue');
  
  return (
    <div>
      <div>Your system prefers: {systemTheme} mode</div>
      <div>Recommended theme: {theme}</div>
      
      {/* Conditionally render based on system preference */}
      {systemTheme === 'dark' ? (
        <div>Dark mode content optimized for eye comfort</div>
      ) : (
        <div>Light mode content for better daytime visibility</div>
      )}
    </div>
  );
}`

  const systemListenerExampleCode = `import { createSystemThemeListener } from 'react-theme-master';
import { useState, useEffect } from 'react';

function SystemThemeMonitor() {
  const [systemTheme, setSystemTheme] = useState(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
      : 'light'
  );
  
  const [changeCount, setChangeCount] = useState(0);
  
  useEffect(() => {
    // Create listener for system theme changes
    const cleanup = createSystemThemeListener((isDarkMode) => {
      setSystemTheme(isDarkMode ? 'dark' : 'light');
      setChangeCount(prev => prev + 1);
      
      // You could also trigger analytics events or other actions
      console.log('System theme changed to', isDarkMode ? 'dark' : 'light');
    });
    
    // Clean up when component unmounts
    return cleanup;
  }, []);
  
  return (
    <div>
      <div>Current system theme: {systemTheme}</div>
      <div>Theme changes detected: {changeCount}</div>
      <div>Try changing your system theme to see it update!</div>
    </div>
  );
}`

  const customSystemThemeHandlerCode = `import { 
  getSystemTheme, 
  createSystemThemeListener 
} from 'react-theme-master';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    // Initially use stored preference or system theme
    const storedTheme = localStorage.getItem('theme-preference');
    return storedTheme || getSystemTheme();
  });
  
  const [followSystem, setFollowSystem] = useState(() => {
    // Check if we should follow system based on a stored setting
    return localStorage.getItem('follow-system') === 'true';
  });
  
  // Setup system preference listener if following system
  useEffect(() => {
    if (followSystem) {
      // Initially sync with system
      setTheme(getSystemTheme());
      
      // Create listener for changes
      const cleanup = createSystemThemeListener((isDarkMode) => {
        setTheme(isDarkMode ? 'dark' : 'light');
      });
      
      return cleanup;
    }
  }, [followSystem]);
  
  // Save preference when theme changes
  useEffect(() => {
    localStorage.setItem('theme-preference', theme);
  }, [theme]);
  
  // Toggle between light and dark
  const toggleTheme = () => {
    // If following system, stop following when manually toggling
    if (followSystem) {
      setFollowSystem(false);
      localStorage.setItem('follow-system', 'false');
    }
    
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  // Toggle following system
  const toggleFollowSystem = () => {
    const newValue = !followSystem;
    setFollowSystem(newValue);
    localStorage.setItem('follow-system', String(newValue));
    
    // If enabling, immediately sync with system
    if (newValue) {
      setTheme(getSystemTheme());
    }
  };
  
  return (
    <div className={\`theme-\${theme}\`}>
      <header>
        <button onClick={toggleTheme}>
          Toggle Theme (Current: {theme})
        </button>
        
        <label>
          <input
            type="checkbox"
            checked={followSystem}
            onChange={toggleFollowSystem}
          />
          Follow System Theme
        </label>
      </header>
      
      <main>
        {/* Your app content themed with 'theme' variable */}
        <div>Your app content goes here</div>
      </main>
    </div>
  );
}`

  const browserCompatibilityCode = `// Compatibility-optimized system theme detection
export const getSystemThemeSafe = (): 'light' | 'dark' => {
  // Default to light in non-browser environments
  if (typeof window === 'undefined') return 'light';
  
  try {
    // Check for prefers-color-scheme support
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Modern browsers
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Fallback based on time of day (between 8 PM and 6 AM = dark)
    const hours = new Date().getHours();
    return (hours >= 20 || hours < 6) ? 'dark' : 'light';
  } catch (error) {
    // In case of any errors, safely fall back to light mode
    console.warn('Error detecting system theme:', error);
    return 'light';
  }
};`

  return (
    <DocTemplate 
      title="System Theme Utilities" 
      description="Utilities for working with system color scheme preferences"
      previousPage={{ title: "CSS Variables", href: "/docs/utilities/css-variables" }}
      nextPage={{ title: "Theme Validation", href: "/docs/utilities/theme-validation" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master provides utilities for detecting and responding to the user's system color scheme preference.
          These utilities make it easy to automatically match your application's theme to the user's system settings,
          creating a more integrated and comfortable experience.
        </p>
        <p className={themeObject.colors.textMuted}>
          The system theme utilities use the browser's <code className="font-mono">prefers-color-scheme</code> media query to detect whether the user's operating system is set to light or dark mode.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Available Utilities</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use these system theme utilities:
        </p>
        <CodePreview code={systemThemeUtilitiesCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These utilities provide different ways to interact with the system theme preference,
          from simply detecting it to listening for changes.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Utility Functions</h2>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>getSystemTheme</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Gets the current system color scheme preference:
        </p>
        <CodePreview code={getSystemThemeCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This function returns either <code className="font-mono">'light'</code> or <code className="font-mono">'dark'</code> based on the user's system preference.
          It falls back to <code className="font-mono">'light'</code> when used in non-browser environments (like server-side rendering).
        </p>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>isSystemTheme</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Checks if a given theme matches the system preference:
        </p>
        <CodePreview code={isSystemThemeCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This function is useful for determining if the current active theme matches what the system prefers,
          which can be helpful for UI indicators showing whether the app is following system settings.
        </p>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>getThemeForSystem</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Returns a theme name based on the system preference:
        </p>
        <CodePreview code={getThemeForSystemCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This function lets you map system preferences to specific themes in your application.
          For example, you could map the system's "dark" preference to your "midnight-blue" theme.
        </p>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>createSystemThemeListener</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Creates a listener for system theme preference changes:
        </p>
        <CodePreview code={createSystemThemeListenerCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This function sets up an event listener for changes to the system's color scheme preference,
          calling your callback function whenever the user switches between light and dark mode.
          It also returns a cleanup function to remove the listener when no longer needed.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>ThemeProvider Integration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          In most cases, you'll want to use the built-in ThemeProvider integration:
        </p>
        <CodePreview code={systemThemeProviderConfigCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Setting <code className="font-mono">followSystemPreference: true</code> in the ThemeProvider options
          automatically keeps your app's theme in sync with the system preference.
          The <code className="font-mono">'initial-only'</code> option uses the system preference only on the initial load,
          then respects the user's manual theme selections.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Usage Examples</h2>
        
        <h3 className={`text-xl font-medium mb-3 ${themeObject.colors.text}`}>Theme Showcase with System Detection</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Display content based on the system theme:
        </p>
        <CodePreview code={themeShowcaseSystemCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This example shows how to use <code className="font-mono">getSystemTheme</code> and <code className="font-mono">getThemeForSystem</code>
          to display different content based on the user's system preference.
        </p>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>System Theme Change Monitor</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Create a component that monitors system theme changes:
        </p>
        <CodePreview code={systemListenerExampleCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This example shows how to use <code className="font-mono">createSystemThemeListener</code>
          to update your application when the user changes their system theme.
        </p>
        
        <h3 className={`text-xl font-medium mt-6 mb-3 ${themeObject.colors.text}`}>Custom System Theme Handler</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Build a custom system theme handling system:
        </p>
        <CodePreview code={customSystemThemeHandlerCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This example shows a more advanced implementation that gives users control over whether to follow the system theme,
          while also persisting their preferences.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Browser Compatibility</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">prefers-color-scheme</code> media query is supported by all modern browsers,
          but for older browsers, you might want to implement a fallback strategy:
        </p>
        <CodePreview code={browserCompatibilityCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This enhanced implementation checks for browser support and falls back to a time-based approach if needed.
          For browsers that don't support <code className="font-mono">prefers-color-scheme</code>,
          it assumes dark mode during nighttime hours and light mode during the day.
        </p>
        <p className={`mt-2 ${themeObject.colors.textMuted}`}>
          Modern browser support for <code className="font-mono">prefers-color-scheme</code>:
        </p>
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>Chrome 76+ (July 2019)</li>
          <li>Firefox 67+ (May 2019)</li>
          <li>Safari 12.1+ (March 2019)</li>
          <li>Edge 79+ (January 2020)</li>
        </ul>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              For most applications, use the <code className="font-mono">followSystemPreference</code> option in ThemeProvider instead of manually handling system theme changes
            </li>
            <li>
              Always provide a way for users to override the system preference
            </li>
            <li>
              Consider using <code className="font-mono">followSystemPreference: 'initial-only'</code> to respect user choices after their initial visit
            </li>
            <li>
              Implement appropriate fallbacks for browsers that don't support <code className="font-mono">prefers-color-scheme</code>
            </li>
            <li>
              Remember that system theme preferences can change while your application is running
            </li>
            <li>
              Add event listeners for theme changes inside useEffect hooks and clean them up properly
            </li>
            <li>
              Consider storing the user's preference to provide consistent experience across visits
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Additional Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">First-time user experience</h3>
            <p className={themeObject.colors.textMuted}>
              Automatically set the theme based on system preference for new users:
            </p>
            <CodePreview 
              code={`function App() {
  // Check if this is the user's first visit
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return localStorage.getItem('has-visited') !== 'true';
  });
  
  useEffect(() => {
    if (isFirstVisit) {
      // Mark that the user has visited
      localStorage.setItem('has-visited', 'true');
      setIsFirstVisit(false);
      
      // Set initial theme based on system preference
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
    }
  }, [isFirstVisit]);
  
  // Rest of your app
}`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Theme suggestion UI</h3>
            <p className={themeObject.colors.textMuted}>
              Suggest theme changes based on system preference:
            </p>
            <CodePreview 
              code={`function ThemeSuggestion() {
  const { theme, setTheme } = useTheme();
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('theme-suggestion-dismissed') === 'true';
  });
  
  // Check if current theme matches system
  const matchesSystem = isSystemTheme(theme);
  
  // Only show suggestion if theme doesn't match system and hasn't been dismissed
  const showSuggestion = !matchesSystem && !dismissed;
  
  // Get the system theme
  const systemTheme = getSystemTheme();
  
  // Handle dismissal
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('theme-suggestion-dismissed', 'true');
  };
  
  // Handle acceptance of suggestion
  const handleAccept = () => {
    setTheme(systemTheme);
    handleDismiss();
  };
  
  if (!showSuggestion) return null;
  
  return (
    <div className="theme-suggestion">
      <p>
        Your system is using {systemTheme} mode. Would you like to switch 
        this app to match your system preference?
      </p>
      <button onClick={handleAccept}>Yes, use {systemTheme} theme</button>
      <button onClick={handleDismiss}>No, keep using {theme} theme</button>
    </div>
  );
}`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">System-specific optimizations</h3>
            <p className={themeObject.colors.textMuted}>
              Apply optimizations based on system theme:
            </p>
            <CodePreview 
              code={`function OptimizedImages() {
  // Get current system theme
  const systemTheme = getSystemTheme();
  
  // Different image sets based on theme to reduce battery usage
  const imageSrc = systemTheme === 'dark'
    ? '/images/optimized-dark.jpg'  // Darker image with less brightness
    : '/images/optimized-light.jpg'; // Normal image
  
  return (
    <div>
      <img 
        src={imageSrc} 
        alt="Optimized for your system theme"
        loading="lazy"
      />
      <p>
        {systemTheme === 'dark' 
          ? "We've loaded a darker image that's easier on your eyes and battery" 
          : "Standard image loaded for light mode"}
      </p>
    </div>
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