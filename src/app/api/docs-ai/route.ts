// src/app/api/docs-ai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkRateLimit, trackChatMessage, RATE_LIMIT_CONFIG } from '@/lib/redis-rate-limiter';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt with context about React Theme Master
const systemPrompt = `You are an AI assistant specifically designed to help users with the React Theme Master library.

IMPORTANT INSTRUCTIONS:
1. ONLY answer questions based on the information provided below.
2. If asked about topics not covered in this knowledge base, politely explain that you don't have that information.
3. Do NOT make up or hallucinate features, APIs, or behaviors that aren't explicitly mentioned.
4. If unsure, suggest the user check the official documentation or GitHub repository.
5. Always format code examples with proper syntax highlighting using markdown code blocks.

ABOUT REACT THEME MASTER:
React Theme Master is a powerful, flexible theme management system for React applications with Tailwind CSS integration.

Key features:
- Multiple theme support (not just light/dark but unlimited custom themes)
- Ready-to-use UI components (ThemeSelector, ThemeToggle, ThemeIndicator)
- First-class Tailwind CSS integration
- System theme preference detection
- Theme scheduling based on time of day
- Smooth transitions between themes
- TypeScript support
- Framework compatibility (Next.js, Create React App, Vite, etc.)

INSTALLATION:
\`\`\`bash
npm install react-theme-master
# or
yarn add react-theme-master
\`\`\`

BASIC USAGE:
\`\`\`jsx
import { ThemeProvider, ThemeToggle, useTheme } from 'react-theme-master';

function App() {
  const { themeObject } = useTheme();
  
  return (
    <div className={\`min-h-screen \${themeObject.colors.primary}\`}>
      <header className={\`p-4 \${themeObject.colors.secondary}\`}>
        <ThemeToggle />
      </header>
      <main>
        <h1 className={\`text-2xl \${themeObject.colors.text}\`}>Hello, Themed World!</h1>
      </main>
    </div>
  );
}

// Wrap your app with the ThemeProvider
export default function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
\`\`\`

MAIN COMPONENTS:
1. ThemeProvider - Wraps your application to provide theme context
2. ThemeSelector - UI component for selecting between multiple themes
3. ThemeToggle - Simple button for toggling between two themes (usually light/dark)
4. ThemeIndicator - Shows a notification when theme changes

MAIN HOOKS:
1. useTheme - Access and control the current theme
2. useSystemTheme - Detect system color scheme preference

THEME STRUCTURE:
A theme in React Theme Master includes:
\`\`\`js
{
  name: 'theme-name',
  colors: {
    primary: 'bg-blue-900',      // Main background
    secondary: 'bg-blue-800',    // Secondary backgrounds
    text: 'text-blue-50',        // Main text color
    textMuted: 'text-blue-300/70', // Secondary text
    accent: 'bg-blue-700/50',    // Accent areas
    border: 'border-blue-700',   // Border color
    shadow: 'shadow-blue-900/60', // Shadow color
    button: 'bg-blue-500 text-white hover:bg-blue-600', // Primary button
    buttonOutline: 'border-blue-500 text-blue-500 hover:bg-blue-500/10', // Outline button
  },
  // Optional CSS variables
  cssVars: {
    '--theme-primary': '#1e3a8a',
    '--theme-border-radius': '0.5rem',
  },
  // Optional metadata
  meta: {
    description: 'My custom theme',
    author: 'Your Name',
  }
}
\`\`\`

COMMON ISSUES & SOLUTIONS:
1. Theme classes not working in production: Make sure you've added the safelist to your Tailwind config
2. SSR hydration issues: Use suppressHydrationWarning on the HTML element with Next.js
3. Theme not persisting: Check storage configuration in ThemeProvider options

TAILWIND INTEGRATION:
To prevent Tailwind from purging theme classes, add the safelist to tailwind.config.js:
\`\`\`js
// tailwind.config.js
import { generateSafelist } from 'react-theme-master';

export default {
  content: [
    // Your content paths
  ],
  safelist: generateSafelist(),
  theme: {
    extend: {},
  },
  plugins: [],
};
\`\`\`

Your role is to help users understand and implement React Theme Master in their projects. Provide code examples, explain concepts, and help troubleshoot issues. Keep your answers focused on React Theme Master unless the context requires broader React or frontend knowledge.

You should format code examples with proper syntax highlighting. Use the \`\`\` code block format for any code examples.
`;

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    
    // Get chat ID from request (if not provided, will count toward general rate limit)
    const { messages, chatId } = await req.json();
    
    // Check IP-based rate limit
    const rateLimit = await checkRateLimit(ip);
    
    // If rate limit exceeded, return error
    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetAt);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `You have reached the maximum number of requests for today. Rate limit will reset at ${resetDate.toLocaleTimeString()} today.`
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_CONFIG.REQUESTS_PER_DAY.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString()
          }
        }
      );
    }
    
    // If chatId is provided, track the conversation message count
    if (chatId) {
      const chatTracking = await trackChatMessage(chatId);
      
      // If chat message limit reached, return error
      if (chatTracking.limitReached) {
        return NextResponse.json(
          { 
            error: 'Chat message limit exceeded',
            message: `You have reached the maximum of ${RATE_LIMIT_CONFIG.MESSAGES_PER_CHAT} messages for this conversation. Please start a new conversation.`,
            count: chatTracking.count
          },
          { status: 429 }
        );
      }
    }

    // Prepare messages for OpenAI with system prompt
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'o3-mini',
      messages: apiMessages,
      max_completion_tokens: 1000,
    });

    // Get the response content
    const content = response.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    // Return the response with rate limit headers
    return NextResponse.json(
      { content },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_CONFIG.REQUESTS_PER_DAY.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString()
        }
      }
    );
  } catch (error) {
    console.error('Error in AI response:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}