'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodePreview from '@/components/code-preview'
import tailwindColors from './tailwind-colors'

interface ColorOption {
  name: string
  value: string
}

interface ThemeProperty {
  key: string
  label: string
  description: string
  prefix: string
  defaultColor: string
  additionalClasses?: string
}

// Helper function to get color value for a Tailwind class
const getColorValueFromClass = (colorClass: string, colorOptions: Record<string, ColorOption[]>) => {
  const colorMatch = colorClass.match(/(bg|text|border|shadow)-(.*)/);
  
  if (!colorMatch) return '#cccccc'; // Fallback color
  
  const colorName = colorMatch[2];
  const colorFamily = colorName.split('-')[0];
  
  const colorObj = colorOptions[colorFamily]?.find(c => c.name === colorName);
  return colorObj ? colorObj.value : '#cccccc';
}

export default function ThemeBuilder() {
  const { themeObject, theme, setTheme } = useTheme()
  const [themeName, setThemeName] = useState('custom-theme')
  const [themeProperties, setThemeProperties] = useState<Record<string, string>>({
    primary: 'bg-blue-900',
    secondary: 'bg-blue-800',
    text: 'text-blue-50',
    textMuted: 'text-blue-300/70',
    accent: 'bg-blue-700/50',
    border: 'border-blue-700',
    shadow: 'shadow-blue-900/60',
    button: 'bg-blue-500 text-white hover:bg-blue-600',
    buttonOutline: 'border-blue-500 text-blue-500 hover:bg-blue-500/10',
  })
  const [generatedCode, setGeneratedCode] = useState('')
  const [previewTheme, setPreviewTheme] = useState(theme)
  const [currentTab, setCurrentTab] = useState('editor')
  
  // Theme property definitions
  const propertyDefinitions: ThemeProperty[] = [
    { 
      key: 'primary', 
      label: 'Primary Background', 
      description: 'Main background color', 
      prefix: 'bg-',
      defaultColor: 'blue-900'
    },
    { 
      key: 'secondary', 
      label: 'Secondary Background', 
      description: 'Secondary background (headers, cards)', 
      prefix: 'bg-',
      defaultColor: 'blue-800'
    },
    { 
      key: 'text', 
      label: 'Text Color', 
      description: 'Main text color', 
      prefix: 'text-',
      defaultColor: 'blue-50'
    },
    { 
      key: 'textMuted', 
      label: 'Muted Text', 
      description: 'Secondary/muted text', 
      prefix: 'text-',
      defaultColor: 'blue-300/70'
    },
    { 
      key: 'accent', 
      label: 'Accent', 
      description: 'Accent areas, highlights', 
      prefix: 'bg-',
      defaultColor: 'blue-700/50'
    },
    { 
      key: 'border', 
      label: 'Border', 
      description: 'Border color', 
      prefix: 'border-',
      defaultColor: 'blue-700'
    },
    { 
      key: 'shadow', 
      label: 'Shadow', 
      description: 'Shadow color', 
      prefix: 'shadow-',
      defaultColor: 'blue-900/60'
    },
    { 
      key: 'button', 
      label: 'Button', 
      description: 'Primary button styling', 
      prefix: '',
      defaultColor: 'bg-blue-500 text-white hover:bg-blue-600',
      additionalClasses: 'px-4 py-2 rounded-md'
    },
    { 
      key: 'buttonOutline', 
      label: 'Outline Button', 
      description: 'Outline button styling', 
      prefix: '',
      defaultColor: 'border-blue-500 text-blue-500 hover:bg-blue-500/10',
      additionalClasses: 'px-4 py-2 rounded-md border'
    }
  ]
  
  // Color options grouped by color family
  const colorOptions: Record<string, ColorOption[]> = {
    'gray': tailwindColors.gray,
    'red': tailwindColors.red,
    'orange': tailwindColors.orange,
    'amber': tailwindColors.amber, 
    'yellow': tailwindColors.yellow,
    'lime': tailwindColors.lime,
    'green': tailwindColors.green,
    'emerald': tailwindColors.emerald,
    'teal': tailwindColors.teal,
    'cyan': tailwindColors.cyan,
    'blue': tailwindColors.blue,
    'indigo': tailwindColors.indigo,
    'violet': tailwindColors.violet,
    'purple': tailwindColors.purple,
    'fuchsia': tailwindColors.fuchsia,
    'pink': tailwindColors.pink,
    'rose': tailwindColors.rose,
  }

  // Update a single theme property
  const updateThemeProperty = (key: string, value: string) => {
    setThemeProperties(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Generate theme code
  useEffect(() => {
    const code = `// Custom theme definition
const ${themeName.replace(/-/g, '_')} = {
  name: '${themeName}',
  colors: {
    primary: '${themeProperties.primary}',
    secondary: '${themeProperties.secondary}',
    text: '${themeProperties.text}',
    textMuted: '${themeProperties.textMuted}',
    accent: '${themeProperties.accent}',
    border: '${themeProperties.border}',
    shadow: '${themeProperties.shadow}',
    button: '${themeProperties.button}',
    buttonOutline: '${themeProperties.buttonOutline}',
  },
  meta: {
    description: '${themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/-/g, ' ')} theme',
    author: 'Created with Theme Builder',
  }
};

// How to use it in your ThemeProvider
<ThemeProvider
  options={{
    themes: { 
      ...defaultThemes, 
      [${themeName.replace(/-/g, '_')}.name]: ${themeName.replace(/-/g, '_')} 
    },
    initialTheme: '${themeName}'
  }}
>
  <App />
</ThemeProvider>`;

    setGeneratedCode(code);
  }, [themeName, themeProperties]);

  // Create a sample theme object for preview
  const previewThemeObject = {
    name: themeName,
    colors: themeProperties,
    meta: {
      description: `${themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/-/g, ' ')} theme`,
      author: 'Created with Theme Builder',
    }
  };

  // Create select options for Tailwind colors
  const createColorOptions = (prefix: string, key: string) => {
    const options = [];
    
    // Add opacity options group
    if (key === 'textMuted' || key === 'accent' || key === 'shadow') {
      options.push(
        <optgroup label="Opacity Variants" key="opacity">
          {['50', '60', '70', '80', '90'].map(opacity => (
            <option key={opacity} value={`${prefix}blue-300/${opacity}`}>
              blue-300/{opacity}
            </option>
          ))}
        </optgroup>
      );
    }
    
    // Add color families
    for (const [family, colors] of Object.entries(colorOptions)) {
      options.push(
        <optgroup label={family.charAt(0).toUpperCase() + family.slice(1)} key={family}>
          {colors.map(color => (
            <option key={color.name} value={`${prefix}${color.name}`}>
              {color.name}
            </option>
          ))}
        </optgroup>
      );
    }
    
    return options;
  };

  // Render color sample
  const ColorSample = ({ className }: { className: string }) => {
    // Extract color information from the Tailwind class
    const colorMatch = className.match(/(bg|text|border|shadow)-(.*)/);
    
    if (!colorMatch) return <div className="w-6 h-6 rounded-full bg-gray-200"></div>;
    
    const colorName = colorMatch[2];
    // Look up the actual color value from your tailwindColors object
    const colorFamily = colorName.split('-')[0];
    const colorShade = colorName.split('-')[1]?.split('/')[0]; // Handle opacity notation
    
    const colorObj = colorOptions[colorFamily]?.find(c => c.name === colorName);
    const bgColor = colorObj ? colorObj.value : '#cccccc';
    
    return (
      <div 
        className="w-6 h-6 rounded-full" 
        style={{ backgroundColor: bgColor }}
      ></div>
    );
  };

  // Get color style for primary, accent, etc.
  const getColorStyle = (colorClass: string) => {
    if (!colorClass.includes('-')) return {};
    
    const isBackground = colorClass.startsWith('bg-');
    const isBorder = colorClass.startsWith('border-');
    const isText = colorClass.startsWith('text-');
    const isShadow = colorClass.startsWith('shadow-');
    
    const colorValue = getColorValueFromClass(colorClass, colorOptions);
    
    if (isBackground) return { backgroundColor: colorValue };
    if (isBorder) return { borderColor: colorValue };
    if (isText) return { color: colorValue };
    if (isShadow) return { boxShadow: `0 4px 6px -1px ${colorValue}` };
    
    return {};
  }

  // Parse button classes and extract styles
  const parseButtonStyles = (buttonClasses: string) => {
    const style: React.CSSProperties = {};
    
    // Extract background color
    const bgMatch = buttonClasses.match(/bg-([a-z]+-[0-9]+)/);
    if (bgMatch) {
      const bgClass = `bg-${bgMatch[1]}`;
      const bgColor = getColorValueFromClass(bgClass, colorOptions);
      style.backgroundColor = bgColor;
    }
    
    // Extract text color
    const textMatch = buttonClasses.match(/text-([a-z]+-[0-9]+|white|black)/);
    if (textMatch) {
      if (textMatch[1] === 'white') {
        style.color = '#ffffff';
      } else if (textMatch[1] === 'black') {
        style.color = '#000000';
      } else {
        const textClass = `text-${textMatch[1]}`;
        const textColor = getColorValueFromClass(textClass, colorOptions);
        style.color = textColor;
      }
    }
    
    // Extract border color for outline button
    const borderMatch = buttonClasses.match(/border-([a-z]+-[0-9]+)/);
    if (borderMatch) {
      const borderClass = `border-${borderMatch[1]}`;
      const borderColor = getColorValueFromClass(borderClass, colorOptions);
      style.borderColor = borderColor;
      style.border = `1px solid ${borderColor}`;
    }
    
    return style;
  }

  // Apply this theme to the site
  const applyTheme = () => {
    // This would ideally register the theme with the ThemeProvider
    // For this example, we'll just show a message
    alert(`In a real implementation, this would register and apply the ${themeName} theme.`);
  };

  return (
    <div className={`p-6 rounded-lg ${themeObject.colors.accent}`}>
      <h2 className={`text-2xl font-bold mb-4 ${themeObject.colors.text}`}>Theme Builder</h2>
      <p className={`mb-6 ${themeObject.colors.textMuted}`}>
        Create your own custom theme by selecting colors for each theme property. 
        Preview the theme and generate code to use in your application.
      </p>
      
      <Tabs 
        defaultValue="editor" 
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Theme Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Generated Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="theme-name" className={themeObject.colors.text}>Theme Name</Label>
              <Input 
                id="theme-name" 
                value={themeName} 
                onChange={(e) => setThemeName(e.target.value)}
                className={`mt-1 ${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`} 
                placeholder="my-custom-theme" 
              />
              <p className={`text-sm mt-1 ${themeObject.colors.textMuted}`}>Use kebab-case (e.g., dark-blue)</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {propertyDefinitions.map((prop) => (
              <div key={prop.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label htmlFor={`property-${prop.key}`} className={themeObject.colors.text}>
                    {prop.label}
                  </Label>
                  <p className={`text-sm ${themeObject.colors.textMuted}`}>
                    {prop.description}
                  </p>
                </div>
                
                <div className="col-span-2">
                  {prop.key === 'button' || prop.key === 'buttonOutline' ? (
                    <Input 
                      id={`property-${prop.key}`}
                      value={themeProperties[prop.key]} 
                      onChange={(e) => updateThemeProperty(prop.key, e.target.value)}
                      className={`${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`} 
                    />
                  ) : (
                    <select 
                      id={`property-${prop.key}`}
                      value={themeProperties[prop.key]} 
                      onChange={(e) => updateThemeProperty(prop.key, e.target.value)}
                      className={`w-full px-3 py-2 rounded border ${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`}
                    >
                      {createColorOptions(prop.prefix, prop.key)}
                    </select>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {prop.key === 'button' ? (
                    <button className={`${themeProperties.button} ${prop.additionalClasses || ''}`}>
                      Button
                    </button>
                  ) : prop.key === 'buttonOutline' ? (
                    <button className={`${themeProperties.buttonOutline} ${prop.additionalClasses || ''}`}>
                      Outline
                    </button>
                  ) : (
                    <ColorSample className={themeProperties[prop.key]} />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              variant="outline" 
              className={themeObject.colors.buttonOutline}
              onClick={() => setCurrentTab('preview')}
            >
              Preview Theme
            </Button>
            <Button 
              className={themeObject.colors.button}
              onClick={() => setCurrentTab('code')}
            >
              Generate Code
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-6 mt-6">
          {/* Preview content with inline styles */}
          <div 
            className="p-6 rounded-lg border overflow-hidden"
            style={{
              ...getColorStyle(themeProperties.border),
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div 
              className="-m-6 p-6 mb-6"
              style={getColorStyle(themeProperties.primary)}
            >
              <div 
                className="p-4"
                style={getColorStyle(themeProperties.secondary)}
              >
                <h3 
                  className="text-xl font-bold"
                  style={getColorStyle(themeProperties.text)}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/-/g, ' ')} Theme
                </h3>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 
                  className="text-lg font-bold mb-2"
                  style={getColorStyle(themeProperties.text)}
                >
                  Theme Preview
                </h4>
                <p style={getColorStyle(themeProperties.textMuted)}>
                  This is how your theme looks with different components and elements.
                </p>
              </div>
              
              <div 
                className="p-4 rounded-lg"
                style={getColorStyle(themeProperties.accent)}
              >
                <h5 
                  className="font-medium"
                  style={getColorStyle(themeProperties.text)}
                >
                  Accent Section
                </h5>
                <p 
                  className="mt-2"
                  style={getColorStyle(themeProperties.textMuted)}
                >
                  This section uses the accent color of your theme.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-lg border"
                  style={{
                    ...getColorStyle(themeProperties.primary),
                    ...getColorStyle(themeProperties.border),
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                >
                  <h5 
                    className="font-medium"
                    style={getColorStyle(themeProperties.text)}
                  >
                    Card Example
                  </h5>
                  <p 
                    className="mt-2"
                    style={getColorStyle(themeProperties.textMuted)}
                  >
                    Cards with the primary background color.
                  </p>
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 rounded"
                      style={parseButtonStyles(themeProperties.button)}
                    >
                      Primary Button
                    </button>
                  </div>
                </div>
                
                <div 
                  className="p-4 rounded-lg"
                  style={getColorStyle(themeProperties.secondary)}
                >
                  <h5 
                    className="font-medium"
                    style={getColorStyle(themeProperties.text)}
                  >
                    Secondary Background
                  </h5>
                  <p 
                    className="mt-2"
                    style={getColorStyle(themeProperties.textMuted)}
                  >
                    This section uses the secondary color.
                  </p>
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 rounded border"
                      style={parseButtonStyles(themeProperties.buttonOutline)}
                    >
                      Outline Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              variant="outline" 
              className={themeObject.colors.buttonOutline}
              onClick={() => setCurrentTab('editor')}
            >
              Back to Editor
            </Button>
            <Button 
              className={themeObject.colors.button}
              onClick={() => setCurrentTab('code')}
            >
              Generate Code
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-6 mt-6">
          <p className={`mb-4 ${themeObject.colors.textMuted}`}>
            Copy and paste this code into your application to use your custom theme:
          </p>
          
          <CodePreview code={generatedCode} language="jsx" />
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              variant="outline" 
              className={themeObject.colors.buttonOutline}
              onClick={() => setCurrentTab('preview')}
            >
              View Preview
            </Button>
            <Button 
              className={themeObject.colors.button}
              onClick={applyTheme}
            >
              Apply This Theme
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}