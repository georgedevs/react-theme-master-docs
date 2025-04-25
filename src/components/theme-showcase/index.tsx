'use client'

import React from 'react'
import { 
  useTheme, 
  ThemeSelector, 
  ThemeToggle 
} from 'react-theme-master'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ThemeShowcaseProps {
  showSelectors?: boolean
  showToggles?: boolean
  showElements?: boolean
  showCards?: boolean
}

export function ThemeShowcase({
  showSelectors = true,
  showToggles = true,
  showElements = true,
  showCards = true
}: ThemeShowcaseProps) {
  const { themeObject, theme, availableThemes } = useTheme()
  
  return (
    <div className="space-y-8">
      {/* Theme Info Section */}
      <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
      <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>
  Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
</h3>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          This showcase demonstrates how React Theme Master applies themes consistently across your UI.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {Object.entries(themeObject.colors).map(([key, value]) => (
            <div key={key} className={`p-3 rounded ${value} border ${themeObject.colors.border}`}>
              <div className="font-mono text-sm">{key}</div>
              <div className="text-xs opacity-70 truncate">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Theme Selectors Section */}
      {showSelectors && (
        <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
          <h3 className="text-xl font-bold mb-4">Theme Selectors</h3>
          
          <Tabs defaultValue="dropdown">
            <TabsList>
              <TabsTrigger value="dropdown">Dropdown</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="icons">Icons</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dropdown" className="p-4">
              <div className="flex flex-col space-y-4">
                <p className={`mb-2 ${themeObject.colors.textMuted}`}>
                  Default dropdown selector with theme preview:
                </p>
                <ThemeSelector variant="dropdown" showPreview={true} />
                
                <p className={`mt-4 mb-2 ${themeObject.colors.textMuted}`}>
                  Without labels:
                </p>
                <ThemeSelector variant="dropdown" showLabels={false} />
              </div>
            </TabsContent>
            
            <TabsContent value="buttons" className="p-4">
              <div className="flex flex-col space-y-4">
                <p className={`mb-2 ${themeObject.colors.textMuted}`}>
                  Button group style selector:
                </p>
                <ThemeSelector variant="buttons" />
                
                <p className={`mt-4 mb-2 ${themeObject.colors.textMuted}`}>
                  Without labels:
                </p>
                <ThemeSelector variant="buttons" showLabels={false} />
              </div>
            </TabsContent>
            
            <TabsContent value="icons" className="p-4">
              <div className="flex flex-col space-y-4">
                <p className={`mb-2 ${themeObject.colors.textMuted}`}>
                  Icon-only selector (compact):
                </p>
                <ThemeSelector variant="icons" />
              </div>
            </TabsContent>
            
            <TabsContent value="grid" className="p-4">
              <div className="flex flex-col space-y-4">
                <p className={`mb-2 ${themeObject.colors.textMuted}`}>
                  Grid layout with preview:
                </p>
                <ThemeSelector variant="grid" showPreview={true} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {/* Theme Toggles Section */}
      {showToggles && (
        <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
          <h3 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Toggles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className={themeObject.colors.textMuted}>Default Toggle:</p>
                <ThemeToggle />
              </div>
              
              <div className="space-y-2">
                <p className={themeObject.colors.textMuted}>With Label:</p>
                <ThemeToggle showLabel={true} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className={themeObject.colors.textMuted}>Different Sizes:</p>
                <div className="flex items-center gap-4">
                  <ThemeToggle size="sm" />
                  <ThemeToggle size="md" />
                  <ThemeToggle size="lg" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className={themeObject.colors.textMuted}>Custom Themes:</p>
                <ThemeToggle 
                  lightTheme={availableThemes[0]} 
                  darkTheme={availableThemes.length > 2 ? availableThemes[2] : 'dark'} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* UI Elements Section */}
      {showElements && (
        <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
           <h3 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>UI Elements</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className={themeObject.colors.textMuted}>Buttons:</p>
              <div className="flex flex-wrap gap-2">
                <button className={themeObject.colors.button}>
                  Primary Button
                </button>
                <button className={themeObject.colors.buttonOutline}>
                  Outline Button
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className={themeObject.colors.textMuted}>Text Styles:</p>
              <div className="space-y-1">
                <p className={`text-lg font-bold ${themeObject.colors.text}`}>
                  Heading Text
                </p>
                <p className={themeObject.colors.text}>
                  Regular text in the current theme
                </p>
                <p className={themeObject.colors.textMuted}>
                  Muted text for secondary information
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className={themeObject.colors.textMuted}>Form Elements:</p>
              <div className="flex flex-col space-y-2 max-w-xs">
                <input 
                  type="text" 
                  placeholder="Text input" 
                  className={`px-3 py-2 rounded border ${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`}
                />
                <select 
                  className={`px-3 py-2 rounded border ${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`}
                >
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cards Section */}
      {showCards && (
        <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
           <h3 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>Cards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={themeObject.colors.secondary}>
              <CardHeader>
                <CardTitle className={themeObject.colors.text}>Card Title</CardTitle>
                <CardDescription className={themeObject.colors.textMuted}>
                  Card description or subtitle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={themeObject.colors.text}>
                  This is a simple card component that uses the current theme colors.
                </p>
              </CardContent>
              <CardFooter>
                <Button className={themeObject.colors.button}>
                  Action Button
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={themeObject.colors.secondary}>
              <CardHeader>
              <CardTitle className={themeObject.colors.text}>Features</CardTitle>
                <CardDescription className={themeObject.colors.textMuted}>
                  What makes this special
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className={`list-disc list-inside space-y-1 ${themeObject.colors.text}`}>
                  <li>Multiple theme support</li>
                  <li>Tailwind integration</li>
                  <li>Easy to customize</li>
                </ul>
              </CardContent>
              <CardFooter>
              <Button variant="outline" className={themeObject.colors.buttonOutline}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={themeObject.colors.secondary}>
              <CardHeader>
              <CardTitle className={themeObject.colors.text}>Theme Stats</CardTitle>
                <CardDescription className={themeObject.colors.textMuted}>
                  Current theme information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={themeObject.colors.textMuted}>Name:</span>
                    <span className={themeObject.colors.text}>{theme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeObject.colors.textMuted}>Colors:</span>
                    <span className={themeObject.colors.text}>{Object.keys(themeObject.colors).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeObject.colors.textMuted}>Available:</span>
                    <span className={themeObject.colors.text}>{availableThemes.length} themes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className={themeObject.colors.button}>
                  View All Themes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeShowcase