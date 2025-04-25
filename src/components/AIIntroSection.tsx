'use client'

import { useTheme } from 'react-theme-master'
import { Bot, Sparkles, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AIIntroSectionProps {
  onOpenChat: () => void
}

export default function AIIntroSection({ onOpenChat }: AIIntroSectionProps) {
  const { themeObject } = useTheme()
  
  return (
    <section className={`py-16 px-4 ${themeObject.colors.accent}`}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full mb-6 bg-blue-500 text-white">
            <Bot className="h-8 w-8" />
          </div>
          
          <h2 className={`text-3xl font-bold mb-6 ${themeObject.colors.text}`}>
            Chat with our Docs AI Assistant
          </h2>
          
          <p className={`text-xl mb-8 ${themeObject.colors.textMuted}`}>
            Tired of browsing through documentation? Our AI assistant can instantly answer your questions about React Theme Master and help you solve implementation challenges.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            <div className={`p-6 rounded-lg ${themeObject.colors.secondary}`}>
              <Sparkles className="h-8 w-8 mb-4 text-blue-500" />
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>Intelligent Answers</h3>
              <p className={themeObject.colors.textMuted}>
                Get detailed explanations and code examples tailored to your specific questions.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.secondary}`}>
              <MessageSquare className="h-8 w-8 mb-4 text-blue-500" />
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>Conversational Help</h3>
              <p className={themeObject.colors.textMuted}>
                Have a natural conversation about complex topics and implementation details.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${themeObject.colors.secondary}`}>
              <Bot className="h-8 w-8 mb-4 text-blue-500" />
              <h3 className={`text-xl font-bold mb-2 ${themeObject.colors.text}`}>Troubleshooting</h3>
              <p className={themeObject.colors.textMuted}>
                Describe issues you're facing and get guidance on how to resolve them.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={onOpenChat}
              className={themeObject.colors.button}
            >
              <Bot className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenChat}
              className={themeObject.colors.buttonOutline}
            >
              View Sample Questions
            </Button>
          </div>
          
          <p className={`mt-6 text-sm ${themeObject.colors.textMuted}`}>
            The AI assistant is continuously learning and may occasionally provide incorrect information.
          </p>
        </div>
      </div>
    </section>
  )
}