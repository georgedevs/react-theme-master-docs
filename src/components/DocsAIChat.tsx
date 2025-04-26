'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from 'react-theme-master'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, X, ChevronDown, Loader2, Lightbulb } from 'lucide-react'

// Define message types
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

// Define chat history type
interface ChatHistory {
  id: string
  messages: {
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: string
  }[]
  createdAt: string
  updatedAt: string
}

// Generate a unique ID for new chats
const generateChatId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Maximum number of messages per conversation (for rate limiting)
const MAX_MESSAGES_PER_CHAT = 10;

export default function DocsAIChat() {
  const { themeObject } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string>('')
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [hasReachedLimit, setHasReachedLimit] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Load chat history from localStorage on initial load
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        // Check if there's a current chat ID in localStorage
        const savedChatId = localStorage.getItem('current-chat-id')
        
        if (savedChatId) {
          // Get the chat history for this ID
          const chatHistory = localStorage.getItem(`chat-history-${savedChatId}`)
          
          if (chatHistory) {
            const parsedHistory: ChatHistory = JSON.parse(chatHistory)
            
            // Convert ISO date strings back to Date objects
            const parsedMessages: Message[] = parsedHistory.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
            
            // Set the current chat ID and messages
            setCurrentChatId(savedChatId)
            setMessages(parsedMessages)
            setMessageCount(parsedHistory.messages.filter(msg => msg.role === 'user').length)
            setHasReachedLimit(parsedHistory.messages.filter(msg => msg.role === 'user').length >= MAX_MESSAGES_PER_CHAT)
            return
          }
        }
        
        // If no existing chat found, create a new one
        createNewChat()
      } catch (error) {
        console.error('Error loading chat history:', error)
        createNewChat()
      }
    }
    
    loadChatHistory()
  }, [])
  
  // Create a new chat
  const createNewChat = () => {
    const newChatId = generateChatId()
    const initialMessage: Message = {
      role: 'assistant',
      content: "👋 Hi there! I'm the React Theme Master AI assistant. I can help you with documentation, usage examples, and troubleshooting. What would you like to know about the library?",
      timestamp: new Date()
    }
    
    // Update state
    setCurrentChatId(newChatId)
    setMessages([initialMessage])
    setMessageCount(0)
    setHasReachedLimit(false)
    
    // Save to localStorage
    const newChatHistory: ChatHistory = {
      id: newChatId,
      messages: [{
        role: initialMessage.role,
        content: initialMessage.content,
        timestamp: initialMessage.timestamp.toISOString()
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem('current-chat-id', newChatId)
    localStorage.setItem(`chat-history-${newChatId}`, JSON.stringify(newChatHistory))
    
    // Also save to chat history index
    saveChatToIndex(newChatId, new Date().toISOString())
  }
  
  // Save a chat ID to the chat history index
  const saveChatToIndex = (chatId: string, timestamp: string) => {
    try {
      const chatIndex = localStorage.getItem('chat-history-index')
      let chatList: {id: string, timestamp: string}[] = []
      
      if (chatIndex) {
        chatList = JSON.parse(chatIndex)
      }
      
      // Add new chat to the list if it doesn't exist
      if (!chatList.some(chat => chat.id === chatId)) {
        chatList.push({ id: chatId, timestamp })
        localStorage.setItem('chat-history-index', JSON.stringify(chatList))
      }
    } catch (error) {
      console.error('Error saving chat to index:', error)
    }
  }
  
  // Save current chat to localStorage
  const saveChatToStorage = () => {
    if (!currentChatId) return
    
    try {
      const chatHistory: ChatHistory = {
        id: currentChatId,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        })),
        createdAt: localStorage.getItem(`chat-history-${currentChatId}`) 
          ? JSON.parse(localStorage.getItem(`chat-history-${currentChatId}`) || '{}').createdAt
          : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem(`chat-history-${currentChatId}`, JSON.stringify(chatHistory))
      localStorage.setItem('current-chat-id', currentChatId)
    } catch (error) {
      console.error('Error saving chat to storage:', error)
    }
  }
  
  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      saveChatToStorage()
    }
  }, [messages, currentChatId])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Wait for the next frame to ensure DOM update is complete
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!input.trim() || isLoading || hasReachedLimit) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }
    
    // Update message count for rate limiting
    const newMessageCount = messageCount + 1
    setMessageCount(newMessageCount)
    
    // Check if user has reached message limit
    if (newMessageCount >= MAX_MESSAGES_PER_CHAT) {
      setHasReachedLimit(true)
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call API to get response
      const response = await fetch('/api/docs-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          chatId: currentChatId // Include chatId for tracking in Redis
        })
      })

      // Check for rate limit
      if (response.status === 429) {
        const data = await response.json();
        
        // Check if this is a chat-specific limit
        if (data.count && data.count >= MAX_MESSAGES_PER_CHAT) {
          setHasReachedLimit(true);
        }
        
        setMessages(prev => [
          ...prev, 
          {
            role: 'assistant',
            content: `⚠️ ${data.message || 'Rate limit exceeded. Please try again later.'}`,
            timestamp: new Date()
          }
        ]);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Add assistant response
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: data.content,
          timestamp: new Date()
        }
      ])
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
          timestamp: new Date()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Reset confirmation modal
  const ResetConfirmationModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className={`w-full max-w-md p-6 rounded-lg ${themeObject.colors.primary} ${themeObject.colors.border} border shadow-lg`}>
          <h3 className={`text-lg font-medium mb-4 ${themeObject.colors.text}`}>Start New Conversation?</h3>
          <p className={`mb-6 ${themeObject.colors.textMuted}`}>
            Are you sure you want to start a new conversation? Your current chat will remain saved in history.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowResetConfirmation(false)}
              className={themeObject.colors.buttonOutline}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                createNewChat()
                setShowResetConfirmation(false)
              }}
              className={themeObject.colors.button}
            >
              Start New Chat
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Reset conversation
  const handleReset = () => {
    setShowResetConfirmation(true)
  }

  // Suggested questions
  const suggestedQuestions = [
    "How do I install React Theme Master?",
    "How do I create a custom theme?",
    "How can I toggle between themes?",
    "What's the difference between ThemeToggle and ThemeSelector?",
    "How do I use system theme preferences?",
    "Can you show me a basic example?"
  ]

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  // Minimize chat
  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    // Optional: Auto-send the question
    // setTimeout(() => {
    //   handleSendMessage()
    // }, 100)
  }
  
  // Format message content with code blocks
  const formatMessage = (content: string) => {
    // Split by code blocks
    const parts = content.split(/(```[a-z]*\n[\s\S]*?\n```)/g)
    
    return parts.map((part, index) => {
      // Check if this part is a code block
      const codeMatch = part.match(/```([a-z]*)\n([\s\S]*?)\n```/)
      
      if (codeMatch) {
        const language = codeMatch[1] || 'jsx'
        const code = codeMatch[2]
        
        return (
          <div key={index} className={`my-3 overflow-hidden rounded-md border ${themeObject.colors.border}`}>
            {/* Code block header */}
            <div className={`flex items-center justify-between px-3 py-2 ${themeObject.colors.secondary} border-b ${themeObject.colors.border}`}>
              {/* Language indicator */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  {/* Macbook-style buttons */}
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className={`text-xs font-medium ml-3 ${themeObject.colors.textMuted}`}>
                  {language}
                </span>
              </div>
              
              {/* Copy button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  // You could add a toast notification here
                }}
                className="h-6 w-6 p-0"
                title="Copy code"
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14.0001 5.5 14.0001H12.5C13.3284 14.0001 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13.0001 12.5 13.0001H5.5C5.22386 13.0001 5 12.7762 5 12.5V5.50002Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
            
            {/* Code content with syntax highlighting */}
            <div className={`p-3 overflow-x-auto ${themeObject.colors.primary} font-mono text-sm`}>
              <pre className="whitespace-pre-wrap break-words">
                {formatCodeWithSyntaxHighlighting(code, language)}
              </pre>
            </div>
          </div>
        )
      }
      
      // Split regular text by line breaks to handle them as paragraphs
      const paragraphs = part.split('\n').filter(p => p.trim())
      
      return paragraphs.map((paragraph, i) => (
        <p key={`${index}-${i}`} className="mb-2">
          {paragraph}
        </p>
      ))
    })
  }
  
  // Add syntax highlighting to code
  const formatCodeWithSyntaxHighlighting = (code: string, language: string) => {
    // For production use, we'll use a more robust approach
    if (['js', 'jsx', 'javascript', 'typescript', 'tsx'].includes(language)) {
      return highlightCodeSafely(code);
    }
    
    // For other languages, just return the code as is
    return code;
  }
  
  // A more robust code highlighting approach
  const highlightCodeSafely = (code: string) => {
    // Define token types and their colors
    type Token = {
      type: string;
      value: string;
      className: string;
    };
    
    // Tokenize the code
    const tokens: Token[] = [];
    let remaining = code;
    let position = 0;
    
    // Define token patterns in order of precedence
    const tokenPatterns = [
      { type: 'comment', pattern: /^(\/\/.*$|\/\*[\s\S]*?\*\/)/m, className: 'text-gray-500 italic' },
      { type: 'string', pattern: /^(['"`])(?:\\.|[^\\])*?\1/, className: 'text-green-500' },
      { type: 'keyword', pattern: /^(new|return|if|else|for|while|function|class|import|export|from|const|let|var|extends|async|await)\b/, className: 'text-purple-500 font-medium' },
      { type: 'constant', pattern: /^(true|false|null|undefined|this)\b/, className: 'text-yellow-600' },
      { type: 'number', pattern: /^(\d+(\.\d+)?)/, className: 'text-orange-500' },
      { type: 'punctuation', pattern: /^(\{|\}|\(|\)|\[|\]|;|,|\.)/, className: 'text-gray-500' },
      { type: 'operator', pattern: /^(\+|\-|\*|\/|\%|\=|\&\&|\|\||\!|\?|\<|\>)/, className: 'text-yellow-500' },
      { type: 'className', pattern: /^([A-Z][a-zA-Z0-9_]*)/, className: 'text-yellow-300' },
      { type: 'property', pattern: /^\.([a-zA-Z][a-zA-Z0-9_]*)/, className: 'text-blue-400' },
      { type: 'function', pattern: /^([a-zA-Z][a-zA-Z0-9_]*)\(/, className: 'text-blue-500' },
      { type: 'identifier', pattern: /^([a-zA-Z][a-zA-Z0-9_]*)/, className: 'text-gray-300' },
      { type: 'whitespace', pattern: /^(\s+)/, className: '' },
      { type: 'other', pattern: /^(.)/, className: '' } // Catch any other character
    ];
    
    // Process the code
    while (remaining.length > 0) {
      let matched = false;
      
      for (const { type, pattern, className } of tokenPatterns) {
        const match = remaining.match(pattern);
        if (match && match[0]) {
          const value = match[0];
          if (type !== 'whitespace' || value.includes('\n')) {
            tokens.push({ type, value, className });
          } else {
            // For non-newline whitespace, just push it without a class
            tokens.push({ type, value, className: '' });
          }
          
          remaining = remaining.slice(value.length);
          position += value.length;
          matched = true;
          break;
        }
      }
      
      // Safety check
      if (!matched) {
        remaining = remaining.slice(1);
        position += 1;
      }
    }
    
    // Render tokens to React elements
    return (
      <React.Fragment>
        {tokens.map((token, index) => {
          if (token.value === '\n') {
            return <br key={index} />;
          }
          
          // Apply syntax highlighting class if present
          return token.className ? (
            <span key={index} className={token.className}>
              {token.value}
            </span>
          ) : (
            token.value
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors ${themeObject.colors.button}`}
        aria-label="Chat with documentation AI"
      >
        {isOpen ? (
         <X className= 'h-6 w-6' />
        ) : (
        <Bot className='h-6 w-6'/>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed right-6 bottom-24 w-full max-w-md z-40 rounded-lg shadow-xl border overflow-hidden transition-all duration-300 flex flex-col ${themeObject.colors.primary} ${themeObject.colors.border} ${
            isMinimized ? 'h-14' : 'h-[42rem] max-h-[calc(100vh-8rem)]'
          }`}
        >
          {/* Chat header */}
          <div 
            className={`p-3 border-b flex items-center justify-between ${themeObject.colors.secondary} ${themeObject.colors.border} cursor-pointer`}
            onClick={minimizeChat}
          >
            <div className="flex items-center">
            <Bot className={`mr-2 h-5 w-5 ${themeObject.colors.text}`} />
              <h3 className={`font-medium ${themeObject.colors.text}`}>React Theme Master AI</h3>
            </div>
            <div className="flex items-center space-x-1">
           
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={minimizeChat}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                 <ChevronDown className={`h-4 w-4 transition-transform ${isMinimized ? 'rotate-180' : ''} ${themeObject.colors.text}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                title="Close"
              >
                <X className={`h-4 w-4 ${themeObject.colors.text}`} />
              </Button>
            </div>
          </div>

          {/* Minimized state - stop rendering the rest */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-3.5rem)] overflow-hidden">
              {/* Chat messages */}
              <ScrollArea className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
                <div className="space-y-4">
                {messages.map((message, index) => (
  <div
    key={index}
    className="w-full mb-4"
  >
    {/* Message alignment wrapper */}
    <div className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Message bubble with fixed positioning */}
      <div
        className={`relative w-4/5 max-w-[80%] px-4 py-2 rounded-lg ${
          message.role === 'user'
            ? `${themeObject.colors.accent}`
            : `${themeObject.colors.secondary} pl-10`
        }`}
      >
        {/* Bot icon for assistant messages */}
        {message.role === 'assistant' && (
          <div className="absolute left-2 top-2 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
            <Bot className="h-4 w-4" />
          </div>
        )}
        
        {/* Message content with word break */}
        <div className={`${themeObject.colors.text} break-words`}>
          {formatMessage(message.content)}
        </div>
        
        {/* Message timestamp */}
        <div className={`text-xs mt-1 text-right ${themeObject.colors.textMuted}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  </div>
))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`relative max-w-[80%] px-4 py-3 rounded-lg ${themeObject.colors.secondary} mr-12 flex items-center`}>
                        <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className={themeObject.colors.textMuted}>Thinking...</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Empty div for scroll reference */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Suggested questions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    <span className={`text-sm font-medium ${themeObject.colors.text}`}>Try asking:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className={`text-sm px-3 py-1 rounded-full ${themeObject.colors.accent} ${themeObject.colors.text} hover:opacity-80 transition-opacity`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat input */}
              <form 
  onSubmit={handleSendMessage}
  className={`p-4 border-t ${themeObject.colors.border} mt-auto`}
>
  <div className="flex items-center space-x-2">
    <textarea
      ref={inputRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask anything about React Theme Master..."
      className={`flex-1 resize-none rounded-md px-3 py-2 min-h-[40px] max-h-[120px] ${themeObject.colors.primary} ${themeObject.colors.border} ${themeObject.colors.text}`}
      disabled={isLoading}
      maxLength={500}
      rows={1}
      onInput={(e) => {
        // Auto resize based on content
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 120)}px`;
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
    />
    <div className="flex flex-col">
      <Button 
        type="submit" 
        className={themeObject.colors.button}
        disabled={isLoading || !input.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
      {input.length > 0 && (
        <div className={`text-xs mt-1 text-right ${themeObject.colors.textMuted}`}>
          {input.length}/500
        </div>
      )}
    </div>
  </div>
  <div className={`text-xs mt-2 text-center ${themeObject.colors.textMuted}`}>
    Powered by AI. Responses may not always be accurate.
  </div>
</form>
            </div>
          )}
        </div>
      )}
    </>
  )
}