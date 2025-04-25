'use client'

import React, { useState } from 'react'
import { useTheme, ThemeSelector, ThemeToggle } from 'react-theme-master'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodePreview from '@/components/code-preview'
import ThemeBuilder from '@/components/playground/theme-builder'
import Link from 'next/link'

export default function PlaygroundPage() {
  const { themeObject, theme, availableThemes } = useTheme()
  const [selectedTab, setSelectedTab] = useState('preview')
  const [showCode, setShowCode] = useState(false)
  
  // Theme showcase component
  const [selectorVariant, setSelectorVariant] = useState('dropdown')
  const [showPreview, setShowPreview] = useState(true)
  const [toggleSize, setToggleSize] = useState('md')
  const [showLabel, setShowLabel] = useState(false)

  // Generate code based on current settings
  const generateCode = () => {
    let code = "import React from 'react';\n"
    code += "import { ThemeProvider, ThemeSelector, ThemeToggle, useTheme } from 'react-theme-master';\n\n"
    code += "function MyComponent() {\n"
    code += "  const { themeObject } = useTheme();\n\n"
    code += "  return (\n"
    code += "    <div className={`p-6 ${themeObject.colors.primary}`}>\n"
    
    // Add theme selector if visible
    if (selectedTab === 'selectors') {
      code += `      <ThemeSelector\n`
      code += `        variant="${selectorVariant}"\n`
      if (showPreview) {
        code += `        showPreview={true}\n`
      }
      code += `      />\n`
    }
    
    // Add theme toggle if visible
    if (selectedTab === 'toggles') {
      code += `      <ThemeToggle\n`
      code += `        size="${toggleSize}"\n`
      if (showLabel) {
        code += `        showLabel={true}\n`
      }
      code += `      />\n`
    }
    
    // Add theme showcase if visible
    if (selectedTab === 'preview') {
      code += "      <div className={`mb-4 ${themeObject.colors.accent} p-4 rounded-lg`}>\n"
      code += "        <h2 className={`text-xl font-bold ${themeObject.colors.text}`}>Current Theme: {theme}</h2>\n"
      code += "      </div>\n\n"
      
      code += "      <div className=\"grid grid-cols-2 gap-3 mb-4\">\n"
      code += "        {Object.entries(themeObject.colors).slice(0, 4).map(([key, value]) => (\n"
      code += "          <div key={key} className={`p-3 rounded ${value} border ${themeObject.colors.border}`}>\n"
      code += "            <div className=\"font-mono text-sm\">{key}</div>\n"
      code += "            <div className=\"text-xs opacity-70\">{value}</div>\n"
      code += "          </div>\n"
      code += "        ))}\n"
      code += "      </div>\n"
    }
    
    code += "    </div>\n"
    code += "  );\n"
    code += "}\n\n"
    
    code += "// Wrap with provider when using in your app\n"
    code += "export default function App() {\n"
    code += "  return (\n"
    code += "    <ThemeProvider>\n"
    code += "      <MyComponent />\n"
    code += "    </ThemeProvider>\n"
    code += "  );\n"
    code += "}"
    
    return code
  }

  const renderPreview = () => (
    <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Preview</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Current theme: <span className="font-medium">{theme}</span>
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={themeObject.colors.secondary}>
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
            <CardDescription className={themeObject.colors.textMuted}>
              Using theme colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={themeObject.colors.text}>
              This card uses the current theme's colors.
            </p>
          </CardContent>
          <CardFooter>
            <Button className={themeObject.colors.button}>
              Action
            </Button>
          </CardFooter>
        </Card>
        
        <Card className={themeObject.colors.secondary}>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className={`w-full ${themeObject.colors.button}`}>
                Primary Button
              </Button>
              <Button className={`w-full ${themeObject.colors.buttonOutline}`}>
                Outline Button
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={themeObject.colors.secondary}>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className={`text-lg font-bold ${themeObject.colors.text}`}>
                Heading
              </h3>
              <p className={themeObject.colors.text}>
                Regular text
              </p>
              <p className={themeObject.colors.textMuted}>
                Muted text for secondary info
              </p>
              <a href="#" className={`underline ${themeObject.colors.text}`}>
                Link text
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSelectors = () => (
    <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Selectors</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Try different ThemeSelector variants and options.
        </p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`block font-medium ${themeObject.colors.text}`}>Variant</label>
            <div className="flex flex-wrap gap-2">
              {['dropdown', 'buttons', 'icons', 'grid'].map((variant) => (
                <Button 
                  key={variant}
                  onClick={() => setSelectorVariant(variant)}
                  variant={selectorVariant === variant ? "default" : "outline"}
                  className={selectorVariant === variant ? themeObject.colors.button : themeObject.colors.buttonOutline}
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-preview"
              checked={showPreview}
              onChange={(e) => setShowPreview(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="show-preview" className={themeObject.colors.text}>
              Show theme preview
            </label>
          </div>
        </div>
      </div>
      
      <div className={`p-6 border rounded-lg mb-6 ${themeObject.colors.secondary} ${themeObject.colors.border}`}>
        <h3 className={`text-lg font-medium mb-4 ${themeObject.colors.text}`}>Result:</h3>
        <ThemeSelector 
          variant={selectorVariant as any} 
          showPreview={showPreview}
        />
      </div>
    </div>
  )

  const renderToggles = () => (
    <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Toggles</h2>
        <p className={`mb-4 ${themeObject.colors.textMuted}`}>
          Customize the ThemeToggle component.
        </p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`block font-medium ${themeObject.colors.text}`}>Size</label>
            <div className="flex flex-wrap gap-2">
              {['sm', 'md', 'lg'].map((size) => (
                <Button 
                  key={size}
                  onClick={() => setToggleSize(size)}
                  variant={toggleSize === size ? "default" : "outline"}
                  className={toggleSize === size ? themeObject.colors.button : themeObject.colors.buttonOutline}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-label"
              checked={showLabel}
              onChange={(e) => setShowLabel(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="show-label" className={themeObject.colors.text}>
              Show label
            </label>
          </div>
        </div>
      </div>
      
      <div className={`p-6 border rounded-lg mb-6 ${themeObject.colors.secondary} ${themeObject.colors.border}`}>
        <h3 className={`text-lg font-medium mb-4 ${themeObject.colors.text}`}>Result:</h3>
        <ThemeToggle 
          size={toggleSize as any}
          showLabel={showLabel}
        />
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${themeObject.colors.primary}`}>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`p-6 rounded-lg mb-8 ${themeObject.colors.accent}`}>
            <h1 className={`text-3xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Playground</h1>
            <p className={`text-lg ${themeObject.colors.textMuted}`}>
              Experiment with React Theme Master components and see the results in real-time.
            </p>
          </div>
          
          <Tabs defaultValue="components" className="mb-10">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="builder">Theme Builder</TabsTrigger>
            </TabsList>
            
            <TabsContent value="components" className="mt-6">
              <Tabs
                defaultValue="preview"
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Theme Preview</TabsTrigger>
                  <TabsTrigger value="selectors">Theme Selectors</TabsTrigger>
                  <TabsTrigger value="toggles">Theme Toggles</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-6">
                  {renderPreview()}
                </TabsContent>
                
                <TabsContent value="selectors" className="mt-6">
                  {renderSelectors()}
                </TabsContent>
                
                <TabsContent value="toggles" className="mt-6">
                  {renderToggles()}
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end mb-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCode(!showCode)}
                  className={themeObject.colors.buttonOutline}
                >
                  {showCode ? 'Hide Code' : 'Show Code'}
                </Button>
              </div>
              
              {showCode && (
                <CodePreview 
                  code={generateCode()} 
                  language="tsx" 
                  showLineNumbers={true}
                />
              )}
            </TabsContent>
            
            <TabsContent value="builder" className="mt-6">
              <ThemeBuilder />
            </TabsContent>
          </Tabs>
          
          <div className={`p-6 rounded-lg mt-10 ${themeObject.colors.accent} border ${themeObject.colors.border}`}>
            <h2 className={`text-xl font-bold mb-4 ${themeObject.colors.text}`}>More Resources</h2>
            <p className={`mb-6 ${themeObject.colors.textMuted}`}>
              Explore these resources to learn more about using React Theme Master in your projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={themeObject.colors.secondary}>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeObject.colors.textMuted}>
                    Read the full documentation to learn about all the features and APIs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/docs">View Docs</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={themeObject.colors.secondary}>
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeObject.colors.textMuted}>
                    See practical examples of React Theme Master in action.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className={themeObject.colors.button}>
                    <Link href="/examples">View Examples</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className={themeObject.colors.secondary}>
                <CardHeader>
                  <CardTitle>GitHub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={themeObject.colors.textMuted}>
                    Check out the source code, report issues, or contribute to the project.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className={themeObject.colors.button}>
                    <a href="https://github.com/georgedevs/react-theme-master" target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}