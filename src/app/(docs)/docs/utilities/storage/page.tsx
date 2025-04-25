'use client'

import DocTemplate from '@/components/layout/doc-template'
import { useTheme } from 'react-theme-master'
import CodePreview from '@/components/code-preview'

export default function StorageUtilitiesPage() {
  const { themeObject } = useTheme()

  const storageUtilitiesCode = `import { 
  loadThemeFromStorage,
  saveThemeToStorage,
  removeThemeFromStorage,
  DEFAULT_STORAGE_KEY
} from 'react-theme-master';

// Load theme from localStorage (default)
const theme = loadThemeFromStorage();

// Save theme to localStorage
saveThemeToStorage('dark');

// Use a custom storage key
saveThemeToStorage('dark', 'my-custom-key');

// Use sessionStorage instead
saveThemeFromStorage('dark', undefined, 'session');

// Remove theme from storage
removeThemeFromStorage();`

  const storageConfigurationCode = `import { ThemeProvider } from 'react-theme-master';

function App() {
  return (
    <ThemeProvider
      options={{
        // Use localStorage (default)
        storageType: 'local',
        
        // Or use sessionStorage
        // storageType: 'session',
        
        // Or disable storage completely
        // storageType: 'none',
        
        // Custom storage key (default is 'react-theme-master-theme')
        storageKey: 'my-app-theme-preference',
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  const customStorageAdapterCode = `import { ThemeProvider } from 'react-theme-master';
import { ThemeStorage } from 'react-theme-master/types';

// Create a custom storage adapter
const customStorageAdapter: ThemeStorage = {
  get: (key: string): string | null => {
    // Custom implementation - e.g., using a state management system
    return myStateManager.getState(key);
  },
  set: (key: string, value: string): void => {
    // Custom implementation
    myStateManager.setState(key, value);
    
    // Could also synchronize with server
    myApiClient.updateUserPreference(key, value);
  },
  remove: (key: string): void => {
    // Custom implementation
    myStateManager.removeState(key);
  }
};

// Use the custom storage adapter in the ThemeProvider
function App() {
  return (
    <ThemeProvider
      options={{
        storageType: 'custom',
        onThemeChange: (themeName) => {
          // Use your custom storage
          customStorageAdapter.set('theme-preference', themeName);
        }
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`

  const storageAdapterTypesCode = `// Storage adapter interface
interface ThemeStorage {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

// Available built-in storage adapters:
// 1. localStorageAdapter - uses localStorage
// 2. sessionStorageAdapter - uses sessionStorage
// 3. noopStorageAdapter - doesn't store anything`

  const errorHandlingCode = `import { 
  loadThemeFromStorage, 
  saveThemeToStorage 
} from 'react-theme-master';

// The functions include built-in error handling for:
// - Browser environments without storage access
// - Private browsing mode
// - Storage quota exceeded

try {
  // This is safe to call even in environments without localStorage
  // It will fall back gracefully with warnings
  const theme = loadThemeFromStorage();
  
  console.log('Loaded theme:', theme);
} catch (error) {
  // You shouldn't need this try/catch, but you can add it for custom error handling
  console.error('Custom error handling:', error);
}`

  const multiStorageStrategyCode = `import { 
  loadThemeFromStorage, 
  saveThemeToStorage,
  DEFAULT_STORAGE_KEY
} from 'react-theme-master';

// Function to get theme with fallback strategies
function getThemeWithFallback() {
  // Try localStorage first
  const localTheme = loadThemeFromStorage(DEFAULT_STORAGE_KEY, 'local');
  if (localTheme) return localTheme;
  
  // Fall back to sessionStorage
  const sessionTheme = loadThemeFromStorage(DEFAULT_STORAGE_KEY, 'session');
  if (sessionTheme) return sessionTheme;
  
  // Fall back to default
  return 'light';
}

// Function to save theme to multiple storage types
function saveThemeEverywhere(theme) {
  // Save to localStorage for persistence across sessions
  saveThemeToStorage(theme, DEFAULT_STORAGE_KEY, 'local');
  
  // Also save to sessionStorage as a backup
  saveThemeToStorage(theme, DEFAULT_STORAGE_KEY, 'session');
  
  // Could also save to a custom system
  myCustomStorage.save('theme', theme);
}`

  const syncMultiBrowserCode = `// Example of synchronizing themes across browser tabs
// Create a component that listens for storage events
function ThemeSyncComponent() {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    // This event fires when localStorage is modified in another tab
    const handleStorageChange = (event) => {
      if (event.key === 'react-theme-master-theme') {
        // Update theme to match the other tab
        setTheme(event.newValue);
      }
    };
    
    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setTheme]);
  
  return null; // No UI needed
}

// Then use this component in your app
function App() {
  return (
    <ThemeProvider>
      <ThemeSyncComponent />
      <YourApp />
    </ThemeProvider>
  );
}`

  return (
    <DocTemplate 
      title="Storage Utilities" 
      description="Utilities for persisting and retrieving theme preferences"
      previousPage={{ title: "useSystemTheme Hook", href: "/docs/hooks/use-system-theme" }}
      nextPage={{ title: "CSS Variables", href: "/docs/utilities/css-variables" }}
    >
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Overview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          React Theme Master provides utilities for storing and retrieving theme preferences.
          These utilities make it easy to persist theme choices across page refreshes and browser sessions,
          ensuring a consistent experience for your users.
        </p>
        <p className={themeObject.colors.textMuted}>
          By default, theme preferences are stored in <code className="font-mono">localStorage</code>, but you can configure them to use <code className="font-mono">sessionStorage</code> or implement a custom storage solution.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Basic Usage</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Import and use the storage utilities directly:
        </p>
        <CodePreview code={storageUtilitiesCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These functions provide direct access to the storage mechanisms used by the ThemeProvider.
          In most cases, you won't need to use these directly, as the ThemeProvider handles storage automatically.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>ThemeProvider Configuration</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Configure storage behavior through the ThemeProvider:
        </p>
        <CodePreview code={storageConfigurationCode} language="jsx" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These options let you control how and where theme preferences are stored without having to directly call the storage utilities.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Custom Storage Adapters</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can implement your own storage mechanism:
        </p>
        <CodePreview code={customStorageAdapterCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          Custom storage adapters are useful when you want to store theme preferences somewhere other than the browser's built-in storage options, such as in a state management system or synced with a server.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Storage Adapter Types</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Storage adapters must implement the <code className="font-mono">ThemeStorage</code> interface:
        </p>
        <CodePreview code={storageAdapterTypesCode} language="typescript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          React Theme Master includes several built-in storage adapters:
        </p>
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>
            <code className="font-mono">localStorageAdapter</code> - Uses <code className="font-mono">localStorage</code> for persistent storage across browser sessions
          </li>
          <li>
            <code className="font-mono">sessionStorageAdapter</code> - Uses <code className="font-mono">sessionStorage</code> for storage within the current browser session
          </li>
          <li>
            <code className="font-mono">noopStorageAdapter</code> - A "no operation" adapter that doesn't actually store anything
          </li>
        </ul>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Error Handling</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          The storage utilities include built-in error handling:
        </p>
        <CodePreview code={errorHandlingCode} language="javascript" />
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          These functions gracefully handle common storage issues, including:
        </p>
        <ul className={`list-disc list-inside space-y-2 ${themeObject.colors.text}`}>
          <li>Accessing storage in non-browser environments</li>
          <li>Private browsing modes that restrict storage</li>
          <li>Storage quota being exceeded</li>
          <li>Permission issues when accessing storage</li>
        </ul>
        <p className={`mt-4 ${themeObject.colors.textMuted}`}>
          When errors occur, the functions log warnings to the console but don't throw exceptions, ensuring your application continues to function.
        </p>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Advanced Usage</h2>
        <p className={`text-lg font-medium mb-2 ${themeObject.colors.text}`}>Multi-Storage Strategy</p>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can implement a fallback strategy using multiple storage types:
        </p>
        <CodePreview code={multiStorageStrategyCode} language="javascript" />
        
        <p className={`text-lg font-medium mt-6 mb-2 ${themeObject.colors.text}`}>Synchronizing Across Browser Tabs</p>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          You can listen for storage events to sync themes across tabs:
        </p>
        <CodePreview code={syncMultiBrowserCode} language="jsx" />
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Best Practices</h2>
        <div className={`mb-4 ${themeObject.colors.text}`}>
          <ul className="list-disc list-inside space-y-2">
            <li>
              In most cases, use the ThemeProvider's <code className="font-mono">storageType</code> and <code className="font-mono">storageKey</code> options rather than calling the storage utilities directly
            </li>
            <li>
              Use <code className="font-mono">localStorage</code> (the default) for most applications to ensure theme preferences persist across sessions
            </li>
            <li>
              Use <code className="font-mono">sessionStorage</code> when you want theme preferences to be temporary (only for the current browser session)
            </li>
            <li>
              Use custom storage adapters when you need to integrate with a state management library or server-side storage
            </li>
            <li>
              Include a fallback theme in case storage is unavailable or empty
            </li>
            <li>
              Consider using a multi-storage strategy for important applications
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Example Use Cases</h2>
        <div className={`space-y-4 ${themeObject.colors.text}`}>
          <div>
            <h3 className="font-bold mb-1">User preferences across multiple devices</h3>
            <p className={themeObject.colors.textMuted}>
              Store theme preferences on a server and sync across devices:
            </p>
            <CodePreview 
              code={`// Custom storage that syncs with a backend service
const serverSyncStorage = {
  get: async (key) => {
    // First try local cache
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;
    
    // Then try to fetch from server
    try {
      const response = await fetch('/api/user/preferences');
      const data = await response.json();
      return data.theme || null;
    } catch (error) {
      console.warn('Failed to fetch theme from server:', error);
      return null;
    }
  },
  
  set: async (key, value) => {
    // Save locally
    localStorage.setItem(key, value);
    
    // Sync with server
    try {
      await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: value })
      });
    } catch (error) {
      console.warn('Failed to sync theme to server:', error);
    }
  },
  
  remove: async (key) => {
    localStorage.removeItem(key);
    
    try {
      await fetch('/api/user/preferences/theme', {
        method: 'DELETE'
      });
    } catch (error) {
      console.warn('Failed to remove theme from server:', error);
    }
  }
};`} 
              language="javascript" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Theme history tracker</h3>
            <p className={themeObject.colors.textMuted}>
              Track and allow users to revert to previously used themes:
            </p>
            <CodePreview 
              code={`// Component that maintains theme history
function ThemeHistoryTracker() {
  const { theme, setTheme } = useTheme();
  const [themeHistory, setThemeHistory] = useState(() => {
    const savedHistory = localStorage.getItem('theme-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  // Update history when theme changes
  useEffect(() => {
    // Only add to history if it's different from the most recent entry
    if (themeHistory.length === 0 || themeHistory[0] !== theme) {
      const newHistory = [theme, ...themeHistory].slice(0, 10); // Keep last 10
      setThemeHistory(newHistory);
      localStorage.setItem('theme-history', JSON.stringify(newHistory));
    }
  }, [theme, themeHistory]);
  
  // Function to go back to previous theme
  const revertToPreviousTheme = () => {
    if (themeHistory.length > 1) {
      const previousTheme = themeHistory[1]; // Index 0 is current theme
      setTheme(previousTheme);
    }
  };
  
  return (
    <div>
      <button onClick={revertToPreviousTheme} disabled={themeHistory.length <= 1}>
        Revert to Previous Theme
      </button>
      
      <div>
        <h3>Theme History</h3>
        <ul>
          {themeHistory.map((historicalTheme, index) => (
            <li key={index}>
              {index === 0 ? '(Current) ' : ''}
              {historicalTheme}
              {index > 0 && (
                <button onClick={() => setTheme(historicalTheme)}>
                  Apply
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`} 
              language="jsx" 
            />
          </div>
          
          <div>
            <h3 className="font-bold mb-1">Migrating theme preferences</h3>
            <p className={themeObject.colors.textMuted}>
              Handle version changes in theme storage:
            </p>
            <CodePreview 
              code={`// Version-aware theme storage
function migrateThemePreferences() {
  const oldStorageKey = 'old-app-theme';
  const newStorageKey = 'react-theme-master-theme';
  const versionKey = 'theme-storage-version';
  
  // Get current storage version
  const storageVersion = localStorage.getItem(versionKey) || '1';
  
  // If we're still on version 1, migrate to version 2
  if (storageVersion === '1') {
    const oldTheme = localStorage.getItem(oldStorageKey);
    
    if (oldTheme) {
      // Map old theme names to new ones if necessary
      const themeMap = {
        'classic': 'light',
        'midnight': 'dark',
        'ocean': 'blue'
      };
      
      // Save with new format and key
      const newTheme = themeMap[oldTheme] || oldTheme;
      localStorage.setItem(newStorageKey, newTheme);
      
      // Clean up old storage
      localStorage.removeItem(oldStorageKey);
    }
    
    // Update version
    localStorage.setItem(versionKey, '2');
  }
}

// Call this function early in your application
migrateThemePreferences();`} 
              language="javascript" 
            />
          </div>
        </div>
      </section>
    </DocTemplate>
  )
}