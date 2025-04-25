'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function ThemeProviderPage() {
  const { themeObject } = useTheme()

  const basicProviderCode = `import { ThemeProvider } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`

  const providerWithOptionsCode = `import { ThemeProvider, defaultThemes } from 'react-theme-master';

// Custom themes
const customThemes = {
  forest: {
    name: 'forest',
    colors: {
      // Forest theme colors...
    }
  }
};

function App() {
  return (
    <ThemeProvider
      options={{
        // Initial theme to use (default: 'light')
        initialTheme: 'dark',
        
        // Combine default themes with custom themes
        themes: { ...defaultThemes, ...customThemes },
        
        // Fallback theme if selected theme isn't available
        fallbackTheme: 'light',
        
        // Custom storage key for persisting theme
        storageKey: 'my-app-theme',
        
        // Storage type: 'local', 'session', 'none', or 'custom'
        storageType: 'local',
        
        // Auto-detect system preference
        followSystemPreference: true,
        
        // Transition duration in milliseconds
        transitionDuration: 300,
        
        // Called when theme changes
        onThemeChange: (themeName, theme) => {
          console.log('Theme changed to:', themeName);
        },
        
        // Schedule themes based on time of day
        scheduleThemes: [
          { theme: 'dark', from: '20:00', to: '06:00' },
          { theme: 'light', from: '06:00', to: '20:00' }
        ]
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  const providerOptionsReference = `interface ThemeProviderOptions {
  // Initial theme to use (default: 'light')
  initialTheme?: string;
  
  // Themes object containing Theme or ThemeColors objects
  themes?: Record<string, Theme | ThemeColors>;
  
  // Fallback theme if selected theme isn't available (default: 'light')
  fallbackTheme?: string;
  
  // Custom storage key for persisting theme (default: 'react-theme-master-theme')
  storageKey?: string;
  
  // Storage type: 'local', 'session', 'none', or 'custom' (default: 'local')
  storageType?: 'local' | 'session' | 'custom' | 'none';
  
  // Whether to follow system preference (default: false)
  // Set to true to always follow, or 'initial-only' to follow only on initial load
  followSystemPreference?: boolean | 'initial-only';
  
  // Transition duration in milliseconds (default: 300)
  transitionDuration?: number;
  
  // Called when theme changes
  onThemeChange?: (themeName: string, theme: Theme) => void;
  
  // Schedule themes based on time of day
  scheduleThemes?: Array<{
    theme: string;
    from: string; // HH:MM format
    to: string;   // HH:MM format
  }>;
}`

  const followSystemPreferenceCode = `// Always follow system preference
<ThemeProvider
  options={{
    followSystemPreference: true
  }}
>
  <YourApp />
</ThemeProvider>

// Follow system preference only on initial load, then respect user choice
<ThemeProvider
  options={{
    followSystemPreference: 'initial-only'
  }}
>
  <YourApp />
</ThemeProvider>`

  const themeSchedulingCode = `<ThemeProvider
  options={{
    scheduleThemes: [
      // Night mode from 8 PM to 6 AM
      { theme: 'dark', from: '20:00', to: '06:00' },
      
      // Day mode from 6 AM to 8 PM
      { theme: 'light', from: '06:00', to: '20:00' }
    ]
  }}
>
  <YourApp />
</ThemeProvider>`

  const customStorageCode = `// Using session storage instead of localStorage
<ThemeProvider
  options={{
    storageType: 'session'
  }}
>
  <YourApp />
</ThemeProvider>

// Disable storage completely
<ThemeProvider
  options={{
    storageType: 'none'
  }}
>
  <YourApp />
</ThemeProvider>

// Custom storage key
<ThemeProvider
  options={{
    storageKey: 'my-app-theme-preference'
  }}
>
  <YourApp />
</ThemeProvider>`

  return (
    <DocTemplate 
      title="Theme Provider" 
      description="The ThemeProvider component and configuration options"
      previousPage={{ title: "Theme Structure", href: "/docs/theme-structure" }}
      nextPage={{ title: "Tailwind Integration", href: "/docs/tailwind-integration" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The <code className="font-mono">ThemeProvider</code> component is the foundation of React Theme Master.
          It must wrap your application to provide theme context to all components:
        </p>
        <CodePreview code={basicProviderCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Without any options, it will use the default light and dark themes and start with the light theme.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Provider with Options</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The provider accepts an <code className="font-mono">options</code> prop that lets you customize the theming behavior:
        </p>
        <CodePreview code={providerWithOptionsCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Options Reference</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Here's a complete reference of all available options:
        </p>
        <CodePreview code={providerOptionsReference} language="typescript" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>System Preference</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can configure the provider to automatically match the user's system preference:
        </p>
        <CodePreview code={followSystemPreferenceCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          When set to <code className="font-mono">true</code>, the theme will always follow the system preference, even if the user manually changes it.
          When set to <code className="font-mono">'initial-only'</code>, it will follow the system preference only on initial load, then respect the user's choice.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Scheduling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can schedule themes to activate at specific times of day:
        </p>
        <CodePreview code={themeSchedulingCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Time should be specified in 24-hour format (<code className="font-mono">HH:MM</code>). The schedule will be checked on initial load
          and then every minute to ensure the correct theme is active.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Storage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          By default, the selected theme is stored in <code className="font-mono">localStorage</code> to persist across visits.
          You can customize this behavior:
        </p>
        <CodePreview code={customStorageCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Transitions</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Theme transitions are enabled by default with a duration of 300ms. You can customize this or disable transitions completely:
        </p>
        <CodePreview 
          code={`// Longer transition duration
<ThemeProvider options={{ transitionDuration: 500 }}>
  <YourApp />
</ThemeProvider>

// Disable transitions
<ThemeProvider options={{ transitionDuration: 0 }}>
  <YourApp />
</ThemeProvider>`} 
          language="jsx" 
        />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Transitions apply to background colors, text colors, border colors, and box shadows.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Change Callback</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can listen for theme changes with the <code className="font-mono">onThemeChange</code> callback:
        </p>
        <CodePreview 
          code={`<ThemeProvider
  options={{
    onThemeChange: (themeName, theme) => {
      // Log the theme change
      console.log('Theme changed to:', themeName);
      
      // Sync with external systems
      if (themeName === 'dark') {
        // Update external UI or analytics
        sendAnalyticsEvent('dark_mode_enabled');
      }
      
      // Store in custom storage
      myCustomStorage.saveTheme(themeName);
    }
  }}
>
  <YourApp />
</ThemeProvider>`} 
          language="jsx" 
        />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This callback receives both the theme name (string) and the complete theme object.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Server-Side Rendering</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          When using React Theme Master with frameworks like Next.js that support server-side rendering,
          it's important to set the <code className="font-mono">initialTheme</code> to prevent hydration mismatches:
        </p>
        <CodePreview 
          code={`// In your layout or provider component
<ThemeProvider options={{ initialTheme: 'light' }}>
  <YourApp />
</ThemeProvider>`} 
          language="jsx" 
        />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          This ensures that the server and client render with the same initial theme.
          After hydration, the client will check for stored preferences or system preferences.
        </p>
        <p className={`mt-2 ${themeObject.colors.textMuted}`}>
          For Next.js App Router, remember to add <code className="font-mono">suppressHydrationWarning</code> to your HTML element:
        </p>
        <CodePreview 
          code={`// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`} 
          language="jsx" 
        />
      </section>
    </DocTemplate>
  )
}