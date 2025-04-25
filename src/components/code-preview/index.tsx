'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'react-theme-master'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodePreviewProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  className?: string
}

export function CodePreview({
  code,
  language = 'tsx',
  showLineNumbers = true,
  showCopyButton = true,
  className = ''
}: CodePreviewProps) {
  const { themeObject, theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<React.ReactNode[]>([])
  
  // Handle copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Get token styles based on current theme
  const getTokenStyles = () => {
    // Create theme-specific syntax highlighting
    // Adjust colors based on which theme is active
    switch(theme) {
      case 'dark':
        return {
          keyword: 'text-pink-400',
          function: 'text-blue-400',
          string: 'text-green-400',
          number: 'text-yellow-300',
          comment: 'text-gray-500 italic',
          punctuation: 'text-gray-400',
          operator: 'text-yellow-300',
          property: 'text-blue-300',
          variable: 'text-white',
          className: 'text-yellow-200',
          tag: 'text-red-400',
          attribute: 'text-purple-300',
        }
      case 'blue':
        return {
          keyword: 'text-pink-300',
          function: 'text-cyan-300',
          string: 'text-green-300',
          number: 'text-yellow-200',
          comment: 'text-gray-500 italic',
          punctuation: 'text-gray-300',
          operator: 'text-yellow-200',
          property: 'text-cyan-200',
          variable: 'text-blue-100',
          className: 'text-orange-200',
          tag: 'text-red-300',
          attribute: 'text-purple-200',
        }
      case 'green':
        return {
          keyword: 'text-pink-300',
          function: 'text-blue-300',
          string: 'text-yellow-300',
          number: 'text-red-300',
          comment: 'text-gray-500 italic',
          punctuation: 'text-gray-300',
          operator: 'text-orange-300',
          property: 'text-blue-200',
          variable: 'text-green-100',
          className: 'text-amber-300',
          tag: 'text-red-300',
          attribute: 'text-teal-200',
        }
      case 'purple':
        return {
          keyword: 'text-pink-300',
          function: 'text-blue-300',
          string: 'text-green-300',
          number: 'text-yellow-300',
          comment: 'text-gray-500 italic',
          punctuation: 'text-gray-300',
          operator: 'text-yellow-200',
          property: 'text-blue-200',
          variable: 'text-purple-100',
          className: 'text-orange-300',
          tag: 'text-red-300',
          attribute: 'text-teal-300',
        }
      case 'light':
      default:
        return {
          keyword: 'text-purple-600',
          function: 'text-blue-600',
          string: 'text-green-600',
          number: 'text-orange-600',
          comment: 'text-gray-500 italic',
          punctuation: 'text-gray-600',
          operator: 'text-yellow-700',
          property: 'text-indigo-600',
          variable: 'text-gray-900',
          className: 'text-amber-600',
          tag: 'text-red-600',
          attribute: 'text-cyan-600',
        }
    }
  }

  // JavaScript/TypeScript/JSX keywords for simple highlighting
  const keywords = [
    'import', 'export', 'from', 'default', 'const', 'let', 'var', 'function', 'class',
    'extends', 'if', 'else', 'return', 'true', 'false', 'null', 'undefined', 'this',
    'async', 'await', 'try', 'catch', 'new', 'for', 'while', 'switch', 'case', 'break',
    'continue', 'typeof', 'instanceof', 'interface', 'type', 'as', 'of', 'in', 'static',
    'public', 'private', 'protected', 'implements', 'super', 'void', 'yield', 'delete'
  ]

  // Format and highlight code
  useEffect(() => {
    const codeLines = code.trim().split('\n')
    const tokenStyles = getTokenStyles()
    
    const processed = codeLines.map((line, lineIndex) => {
      if (line.trim() === '') {
        return <span key={lineIndex} className="h-6 block">&nbsp;</span>
      }

      // Simple tokenization for basic syntax highlighting
      const tokens = tokenizeLine(line, tokenStyles)
      
      return (
        <div key={lineIndex} className="min-h-6">
          {showLineNumbers && (
            <span className={`inline-block w-10 mr-4 text-right select-none opacity-50 ${themeObject.colors.textMuted}`}>
              {lineIndex + 1}
            </span>
          )}
          <span className={themeObject.colors.text}>
            {tokens}
          </span>
        </div>
      )
    })
    
    setHighlightedCode(processed)
  }, [code, showLineNumbers, themeObject, theme])

  // Simple tokenizer function
  const tokenizeLine = (line: string, tokenStyles: Record<string, string>): React.ReactNode[] => {
    // Patterns for different types of tokens
    const patterns = [
      // Multi-line comment blocks - disabled in simple implementation
      // { pattern: /(\/\*[\s\S]*?\*\/)/g, tokenType: 'comment' },
      
      // Comments
      { pattern: /(\/\/.*$)/, tokenType: 'comment' },
      // JSX tags
      { pattern: /(<\/?[a-zA-Z][a-zA-Z0-9]*|>|<|&lt;|&gt;)/g, tokenType: 'tag' },
      // JSX attributes
      { pattern: /\s([a-zA-Z][a-zA-Z0-9]*)(=)/g, tokenType: 'attribute' },
      // Strings (double quotes)
      { pattern: /("(?:\\.|[^"\\])*?")/g, tokenType: 'string' },
      // Strings (single quotes)
      { pattern: /('(?:\\.|[^'\\])*?')/g, tokenType: 'string' },
      // Template literals
      { pattern: /(`(?:\\.|[^`\\])*?`)/g, tokenType: 'string' },
      // Numbers
      { pattern: /\b(\d+(\.\d+)?|\.\d+)\b/g, tokenType: 'number' },
      // Keywords
      { pattern: new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), tokenType: 'keyword' },
      // Function calls
      { pattern: /\b([a-zA-Z][a-zA-Z0-9_]*)\s*\(/g, tokenType: 'function' },
      // Object properties
      { pattern: /\.([a-zA-Z][a-zA-Z0-9_]*)\b/g, tokenType: 'property' },
      // Class names (capitalized identifiers)
      { pattern: /\b([A-Z][a-zA-Z0-9_]*)\b/g, tokenType: 'className' },
      // Punctuation and operators
      { pattern: /(\{|\}|\(|\)|\[|\]|,|;|\.|\:)/g, tokenType: 'punctuation' },
      { pattern: /(\+|\-|\*|\/|\%|\=|\&\&|\|\||\!|\?|\<|\>)/g, tokenType: 'operator' },
      // Variables and identifiers (catch-all, should be last)
      { pattern: /\b([a-zA-Z][a-zA-Z0-9_]*)\b/g, tokenType: 'variable' },
    ]

    // Fragments for output
    const result: React.ReactNode[] = []
    let remaining = line
    let lastIndex = 0
    let index = 0
    
    // Simple approach: try each pattern in order
    // This isn't a full lexer but works for basic highlighting
    while (remaining.length > 0 && index < 1000) { // Safety limit
      index++
      let found = false
      
      for (const { pattern, tokenType } of patterns) {
        pattern.lastIndex = 0 // Reset regex state
        const match = pattern.exec(remaining)
        
        if (match && match.index === 0) {
          const token = match[0]
          result.push(
            <span 
              key={`${lastIndex}-${tokenType}-${token}`} 
              className={tokenStyles[tokenType as keyof typeof tokenStyles]}
            >
              {token}
            </span>
          )
          remaining = remaining.slice(token.length)
          lastIndex += token.length
          found = true
          break
        }
      }
      
      // If no pattern matched at the start, move one character to result and continue
      if (!found) {
        result.push(remaining[0])
        remaining = remaining.slice(1)
        lastIndex++
      }
    }
    
    return result
  }

  return (
    <div className={`relative my-4 rounded-lg overflow-hidden shadow-md ${className}`}>
      {/* Editor-style header */}
      <div className={`flex items-center p-3 border-b ${themeObject.colors.secondary} ${themeObject.colors.border}`}>
        <div className="flex items-center space-x-2">
          {/* Macbook-style buttons */}
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        {/* Language indicator in center */}
        <div className="flex-1 text-center">
          <span className={`text-xs font-medium px-2 py-1 rounded ${themeObject.colors.textMuted}`}>
            {language}
          </span>
        </div>
        
        {/* Copy button */}
        {showCopyButton && (
  <Button
    variant="ghost"
    size="sm"
    onClick={copyToClipboard}
    className={`h-8 w-8 p-0 ${themeObject.colors.text}`}
    aria-label={copied ? 'Copied' : 'Copy code'}
    title={copied ? 'Copied!' : 'Copy code'}
  >
    {copied ? (
      <Check className="h-4 w-4" />
    ) : (
      <Copy className="h-4 w-4" />
    )}
  </Button>
)}
      </div>
      
      {/* Code content */}
      <pre className={`p-4 overflow-x-auto ${themeObject.colors.accent}`}>
        <code className="font-mono text-sm">
          {highlightedCode}
        </code>
      </pre>
    </div>
  )
}

export default CodePreview