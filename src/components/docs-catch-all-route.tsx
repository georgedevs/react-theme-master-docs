'use client'

import { usePathname } from 'next/navigation'
import ComingSoonPage from '@/components/coming-soon-page'

// Map of page slugs to suggested related pages
const suggestedPagesMap: Record<string, Array<{title: string, href: string, description?: string}>> = {
  // Hooks pages suggestions
  '/docs/hooks/use-theme': [
    { 
      title: 'useSystemTheme Hook', 
      href: '/docs/hooks/use-system-theme', 
      description: 'Detect and respond to system theme preferences'
    },
    { 
      title: 'Theme Provider', 
      href: '/docs/theme-provider', 
      description: 'Configuration options for the ThemeProvider component'
    }
  ],
  '/docs/hooks/use-system-theme': [
    { 
      title: 'useTheme Hook', 
      href: '/docs/hooks/use-theme', 
      description: 'Access and control the current theme'
    },
    { 
      title: 'Theme Structure', 
      href: '/docs/theme-structure', 
      description: 'Understanding how themes are structured'
    }
  ],

  // Utilities pages suggestions
  '/docs/utilities/storage': [
    { 
      title: 'Theme Provider', 
      href: '/docs/theme-provider', 
      description: 'Learn about storage options in ThemeProvider'
    },
    { 
      title: 'Quick Start', 
      href: '/docs/quick-start', 
      description: 'Get up and running with React Theme Master'
    }
  ],
  '/docs/utilities/css-variables': [
    { 
      title: 'Theme Structure', 
      href: '/docs/theme-structure', 
      description: 'Understanding how themes are structured'
    },
    { 
      title: 'Tailwind Integration', 
      href: '/docs/tailwind-integration', 
      description: 'How to integrate with Tailwind CSS'
    }
  ],
  '/docs/utilities/system-theme': [
    { 
      title: 'useSystemTheme Hook', 
      href: '/docs/hooks/use-system-theme', 
      description: 'Detect and respond to system theme preferences'
    },
    { 
      title: 'Theme Provider', 
      href: '/docs/theme-provider', 
      description: 'Configure system preference following'
    }
  ],
  '/docs/utilities/theme-validation': [
    { 
      title: 'Theme Structure', 
      href: '/docs/theme-structure', 
      description: 'Understanding how themes are structured'
    },
    { 
      title: 'Custom Themes', 
      href: '/docs/advanced/custom-themes', 
      description: 'Creating and using custom themes'
    }
  ],

  // Advanced pages suggestions  
  '/docs/advanced/custom-themes': [
    { 
      title: 'Theme Structure', 
      href: '/docs/theme-structure', 
      description: 'Understanding how themes are structured'
    },
    { 
      title: 'Tailwind Integration', 
      href: '/docs/tailwind-integration', 
      description: 'How to integrate with Tailwind CSS'
    }
  ],
  '/docs/advanced/theme-scheduling': [
    { 
      title: 'Theme Provider', 
      href: '/docs/theme-provider', 
      description: 'Configuration options for the ThemeProvider'
    },
    { 
      title: 'useSystemTheme Hook', 
      href: '/docs/hooks/use-system-theme', 
      description: 'Detect and respond to system theme preferences'
    }
  ],
  '/docs/advanced/server-components': [
    { 
      title: 'Installation', 
      href: '/docs/installation', 
      description: 'Setting up React Theme Master in your project'
    },
    { 
      title: 'Framework Integration', 
      href: '/docs/advanced/framework-integration', 
      description: 'Using React Theme Master with different frameworks'
    }
  ],
  '/docs/advanced/framework-integration': [
    { 
      title: 'Installation', 
      href: '/docs/installation', 
      description: 'Setting up React Theme Master in your project'
    },
    { 
      title: 'Quick Start', 
      href: '/docs/quick-start', 
      description: 'Get up and running with React Theme Master'
    }
  ],

  // Default suggestions if no specific ones are found
  'default': [
    { 
      title: 'Installation', 
      href: '/docs/installation', 
      description: 'Setting up React Theme Master in your project'
    },
    { 
      title: 'Quick Start', 
      href: '/docs/quick-start', 
      description: 'Get up and running with React Theme Master'
    },
    { 
      title: 'Theme Structure', 
      href: '/docs/theme-structure', 
      description: 'Understanding how themes are structured' 
    },
    { 
      title: 'Theme Provider', 
      href: '/docs/theme-provider', 
      description: 'Configuration options for the ThemeProvider component'
    }
  ]
};

// Dynamically generate titles based on the path
function generateTitle(path: string): string {
  // Remove the /docs/ prefix
  const cleanPath = path.replace(/^\/docs\//, '');
  
  // Split the path into parts
  const parts = cleanPath.split('/');
  
  // If it's a top-level page
  if (parts.length === 1) {
    return parts[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  // For nested pages, focus on the last part
  const lastPart = parts[parts.length - 1];
  
  // Make it title case and replace hyphens with spaces
  return lastPart.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default function ComingSoonCatchAll() {
  const pathname = usePathname();
  
  // Generate a title based on the pathname
  const title = `${generateTitle(pathname)} Documentation Coming Soon`;
  
  // Get suggested pages for this route, or use default if none specified
  const suggestedPages = suggestedPagesMap[pathname] || suggestedPagesMap['default'];
  
  return (
    <ComingSoonPage 
      title={title}
      suggestedPages={suggestedPages}
    />
  );
}