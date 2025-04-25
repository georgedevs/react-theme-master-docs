'use client'

import { ThemeProvider, defaultThemes } from 'react-theme-master'
import { ThemeIndicator } from 'react-theme-master'

// Define custom showcase themes
const showcaseThemes = {
  // Neon theme
  neon: {
    name: 'neon',
    colors: {
      primary: 'bg-black',
      secondary: 'bg-zinc-900',
      text: 'text-purple-400',
      textMuted: 'text-purple-600',
      accent: 'bg-zinc-800',
      border: 'border-purple-500',
      shadow: 'shadow-purple-500/20',
      button: 'bg-purple-500 text-white hover:bg-purple-600',
      buttonOutline: 'border-purple-500 text-purple-500 hover:bg-purple-500/10',
    },
    meta: {
      description: 'Neon theme with vibrant purple accents',
    }
  },
  // Ocean theme
  ocean: {
    name: 'ocean',
    colors: {
      primary: 'bg-cyan-950',
      secondary: 'bg-cyan-900',
      text: 'text-cyan-50',
      textMuted: 'text-cyan-300/70',
      accent: 'bg-cyan-800',
      border: 'border-cyan-600',
      shadow: 'shadow-cyan-900/60',
      button: 'bg-cyan-500 text-white hover:bg-cyan-600',
      buttonOutline: 'border-cyan-500 text-cyan-500 hover:bg-cyan-500/10',
    },
    meta: {
      description: 'Deep ocean blues theme',
    }
  },
  // Mint theme
  mint: {
    name: 'mint',
    colors: {
      primary: 'bg-emerald-50',
      secondary: 'bg-emerald-100',
      text: 'text-emerald-900',
      textMuted: 'text-emerald-700/70',
      accent: 'bg-emerald-200',
      border: 'border-emerald-300',
      shadow: 'shadow-emerald-200/60',
      button: 'bg-emerald-600 text-white hover:bg-emerald-700',
      buttonOutline: 'border-emerald-600 text-emerald-600 hover:bg-emerald-600/10',
    },
    meta: {
      description: 'Fresh mint green theme',
    }
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      options={{
        initialTheme: 'light',
        themes: { ...defaultThemes, ...showcaseThemes },
        followSystemPreference: true,
        transitionDuration: 300,
      }}
    >
      {children}
      <ThemeIndicator position="bottom-right" duration={2000} showThemeName={true} />
    </ThemeProvider>
  )
}