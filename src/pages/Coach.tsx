import { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { AIModeSwitcher } from '@/components/AIModeSwitcher';
import { AIMode, mockAIInsights, mockChatMessages } from '@/data/mockData';
import { getChatResponse } from '@/services/aiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode: AIMode;
}

export default function Coach() {
  const [mode, setMode] = useState<AIMode>('professional');
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      mode,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input.trim(), mode, messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        mode,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'How can I save more?',
    'Review my portfolio',
    'Budget advice',
    'Goal suggestions',
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'action':
        return AlertCircle;
      case 'tip':
        return Lightbulb;
      case 'warning':
        return AlertCircle;
      case 'achievement':
        return CheckCircle;
      default:
        return Lightbulb;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-secondary/20 text-secondary';
      case 'tip':
        return 'bg-accent/20 text-accent';
      case 'warning':
        return 'bg-destructive/20 text-destructive';
      case 'achievement':
        return 'bg-secondary/20 text-secondary';
      default:
        return 'bg-secondary/20 text-secondary';
    }
  };

  return (
    <div className="pb-20 pt-6 max-w-md mx-auto flex flex-col h-[calc(100vh-5rem)] animate-fade-in">
      {/* Header */}
      <header className="px-4 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">AI Coach</h1>
            <p className="text-muted-foreground">Your financial advisor</p>
          </div>
          <AIModeSwitcher currentMode={mode} onModeChange={setMode} />
        </div>
      </header>

      {/* AI Insights Feed */}
      <div className="px-4 mb-4 flex-shrink-0">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">AI Insights</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {mockAIInsights.slice(0, 3).map((insight) => {
            const Icon = getInsightIcon(insight.type);
            const colorClass = getInsightColor(insight.type);

            return (
              <div
                key={insight.id}
                className="flex-shrink-0 w-72 bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm mb-1">{insight.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {insight.description}
                    </p>
                    {insight.actionLabel && (
                      <button className="mt-2 text-xs text-secondary font-medium hover:underline">
                        {insight.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-secondary text-white'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === mockChatMessages.length && (
        <div className="px-4 py-3 flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => setInput(reply)}
                className="flex-shrink-0 px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full hover:bg-secondary/20 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-border flex-shrink-0 bg-background">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="bg-secondary hover:bg-secondary-light flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
