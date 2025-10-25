# FinMate - Your Personal Financial Advisor

A modern, mobile-first personal finance management app built with React, Vite, TypeScript, and Tailwind CSS. FinMate helps students, young earners, and working professionals manage their finances with AI-powered insights.

## 🎯 Features

### Core Functionality
- **Dashboard (Home)**: Net worth overview, quick stats, AI tips, and recent transactions
- **Plan**: Monthly budget tracking, category-wise spending, and transaction management
- **Invest**: Portfolio overview, holdings tracking, risk analysis, and rebalancing suggestions
- **AI Coach**: Conversational AI assistant with multiple personality modes and insights feed
- **Goals**: Financial goal setting and tracking with progress visualization
- **Profile**: Account settings, AI mode preferences, and notifications

### Key Highlights
- 🎨 **Mobile-First Design**: Optimized for mobile with responsive desktop support
- 🤖 **AI Integration Ready**: Built-in AI service layer for connecting to backend AI models
- 🎭 **5 AI Modes**: Professional, Coach, Neutral, Mentor, and Adaptive personalities
- 💎 **Glassmorphic UI**: Modern design with subtle transparency effects
- 🎯 **FAB Quick Actions**: Floating Action Button with 5 quick-access features
- 📊 **Rich Data Visualization**: Budget progress, portfolio allocation, goal tracking
- 🎨 **Complete Design System**: Consistent colors, shadows, and animations

## 🛠 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **shadcn/ui** - UI Components
- **TanStack Query** - Data fetching

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Git (optional, for cloning)

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd finmate
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
finmate/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── BottomNav.tsx  # Bottom navigation bar
│   │   ├── FAB.tsx        # Floating Action Button
│   │   ├── StatCard.tsx   # Statistics card component
│   │   └── AIModeSwitcher.tsx
│   ├── data/
│   │   └── mockData.ts    # Mock data for demo
│   ├── pages/             # Route pages
│   │   ├── Home.tsx       # Dashboard
│   │   ├── Plan.tsx       # Budget & transactions
│   │   ├── Invest.tsx     # Portfolio
│   │   ├── Coach.tsx      # AI assistant
│   │   ├── Profile.tsx    # Settings
│   │   └── Goals.tsx      # Financial goals
│   ├── services/
│   │   └── aiService.ts   # AI integration layer
│   ├── App.tsx            # Main app component
│   ├── index.css          # Design system & global styles
│   └── main.tsx           # Entry point
├── public/                # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Navy** (#0B2545) - Primary brand color
- **Emerald** (#0DAA8B) - Accent for positive actions
- **Gold** (#D4AF37) - Highlights and achievements
- **Background** (#F7FAFC) - Soft, neutral base

### Typography
- **Font**: Inter (system fallback: -apple-system, BlinkMacSystemFont)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Shadows & Effects
- Custom shadows with color variations
- Glassmorphism with backdrop blur
- Smooth animations and transitions

## 🤖 AI Integration

### Current Implementation
The app includes a **mock AI service** (`src/services/aiService.ts`) that simulates AI responses. This is a placeholder for connecting to a real backend.

### Connecting to Real AI

1. **Set up Supabase** (or your preferred backend):
```bash
# Install Supabase client
npm install @supabase/supabase-js
```

2. **Configure environment**:
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Update AI Service**:
Replace the mock functions in `src/services/aiService.ts` with actual API calls:

```typescript
// Example Supabase Edge Function call
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getAdvice(request: AIAdviceRequest) {
  const { data, error } = await supabase.functions.invoke('ai-advisor', {
    body: request
  });
  
  if (error) throw error;
  return data;
}
```

4. **Create Supabase Edge Function** (example):
```typescript
// supabase/functions/ai-advisor/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { context, mode, message } = await req.json()
  
  // Call your AI model (OpenAI, Anthropic, etc.)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: getSystemPrompt(mode) },
        { role: 'user', content: message }
      ]
    })
  })
  
  return new Response(JSON.stringify(await response.json()))
})
```

### AI Modes

The app supports 5 AI personality modes:
- **Professional & Polite**: Formal financial advice
- **Cool & Smart Coach**: Friendly and motivating
- **Neutral & Analytical**: Data-driven insights
- **Mentor-like Guide**: Experienced wisdom
- **Adaptive**: Learns user's communication style

## 📱 Responsive Design

The app is built mobile-first with:
- **Mobile**: Optimized for 360px - 428px (iPhone SE to iPhone Pro Max)
- **Tablet**: Scales gracefully up to 768px
- **Desktop**: Centered container (max 480px) with subtle desktop enhancements

## 🎯 Key Components

### BottomNav
Persistent 5-tab navigation (Home, Plan, Invest, Coach, Profile)

### FAB (Floating Action Button)
Quick access to:
- Add Transaction
- Add Goal
- Ask AI
- Quick Report
- Add Investment

### AIModeSwitcher
Dropdown to select AI personality mode

### StatCard
Reusable card for displaying key metrics with icons and trends

## 🔒 Security & Privacy

- All sensitive data should be stored server-side
- Use environment variables for API keys
- Implement proper authentication before production
- GDPR-compliant data export functionality included

## 🚧 Future Enhancements

Potential features for v2:
- Real-time transaction sync with bank APIs
- Advanced portfolio analytics
- Bill reminders and subscription tracking
- Multi-currency support
- Family account sharing
- Tax optimization suggestions
- Cryptocurrency integration

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 💬 Support

For questions or issues, please open an issue on GitHub or contact support.

---

**Made with ❤️ for smart savers**
