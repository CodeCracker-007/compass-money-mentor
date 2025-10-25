// AI Service for FinMate
// This is a placeholder service that will be connected to a real AI backend

import { AIMode, ChatMessage } from '@/data/mockData';

export interface AIAdviceRequest {
  context: {
    type: 'budget' | 'investment' | 'goal' | 'general';
    data?: any;
  };
  mode: AIMode;
  message?: string;
}

export interface AIAdviceResponse {
  message: string;
  action?: string;
  amount?: number;
  rationale?: string;
  suggestions?: string[];
}

// Mock AI responses based on mode
const modePersonalities: Record<AIMode, string> = {
  professional: 'I recommend',
  coach: 'Hey! Let me break this down for you -',
  neutral: 'Based on the data,',
  mentor: 'In my experience,',
  adaptive: 'Considering your situation,',
};

// Store advice logs locally (in production, send to backend)
let adviceLogs: Array<{
  timestamp: string;
  request: AIAdviceRequest;
  response: AIAdviceResponse;
}> = [];

/**
 * Get AI advice based on context and mode
 * TODO: Replace with actual API call to Supabase Edge Function
 */
export async function getAdvice(
  request: AIAdviceRequest
): Promise<AIAdviceResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const personality = modePersonalities[request.mode];
  
  let response: AIAdviceResponse;

  // Generate contextual responses
  switch (request.context.type) {
    case 'budget':
      response = {
        message: `${personality} reviewing your spending patterns, you could save ₹3,500 monthly by reducing dining out expenses and subscription optimization.`,
        action: 'reduce_dining_out',
        amount: 3500,
        rationale: 'Your food & dining expenses are 68% of budget. Cooking at home 2-3 times more per week could save significant amounts.',
        suggestions: [
          'Set weekly meal prep goals',
          'Use discount codes for orders',
          'Review subscription services',
        ],
      };
      break;

    case 'investment':
      response = {
        message: `${personality} your portfolio shows strong growth potential but lacks diversification in large-cap stocks. Consider allocating 15% more to index funds.`,
        action: 'rebalance_portfolio',
        amount: 15000,
        rationale: 'Current allocation: 61% mutual funds, 19% crypto, 13% gold, 7% stocks. Ideal would be 70% equity, 20% debt, 10% gold.',
        suggestions: [
          'Increase index fund allocation by ₹15,000',
          'Consider reducing crypto to 10%',
          'Add debt funds for stability',
        ],
      };
      break;

    case 'goal':
      response = {
        message: `${personality} your emergency fund goal is well-structured. You're on track to complete it ahead of schedule with consistent contributions.`,
        rationale: 'Current progress: 48% complete. Monthly contribution: ₹15,000. Expected completion: Nov 2025.',
        suggestions: [
          'Maintain current contribution rate',
          'Consider increasing by 10% after next increment',
          'Keep funds in liquid savings',
        ],
      };
      break;

    default:
      response = {
        message: `${personality} ${request.message ? processGeneralQuery(request.message, request.mode) : 'your overall financial health looks good. Focus on maintaining consistency in your savings and investment habits.'}`,
        suggestions: [
          'Continue current savings rate',
          'Review goals quarterly',
          'Stay informed about market trends',
        ],
      };
  }

  // Log the interaction
  adviceLogs.push({
    timestamp: new Date().toISOString(),
    request,
    response,
  });

  return response;
}

/**
 * Process general chat queries
 * TODO: Replace with actual AI model call
 */
function processGeneralQuery(message: string, mode: AIMode): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
    return mode === 'coach' 
      ? "You're doing great with savings! Keep that momentum going and you'll hit your goals in no time."
      : "Your current savings rate is healthy. Consider automating your savings to ensure consistency.";
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('portfolio')) {
    return mode === 'coach'
      ? "Your portfolio is looking solid! But hey, let's think about adding some more diversity to balance out that crypto exposure."
      : "Your investment portfolio shows good growth. Consider rebalancing to maintain optimal asset allocation.";
  }
  
  if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
    return mode === 'coach'
      ? "I see you're spending a bit much on dining out. No worries though - small tweaks can make a big difference!"
      : "Your budget utilization is 72% this month. Focus on discretionary spending categories for optimization.";
  }
  
  return "I'm here to help with your financial questions. Feel free to ask about budgets, investments, goals, or savings strategies!";
}

/**
 * Get chat response for conversational interface
 */
export async function getChatResponse(
  message: string,
  mode: AIMode,
  history: ChatMessage[]
): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const request: AIAdviceRequest = {
    context: { type: 'general' },
    mode,
    message,
  };

  const response = await getAdvice(request);
  return response.message;
}

/**
 * Get advice logs
 */
export function getAdviceLogs() {
  return adviceLogs;
}

/**
 * Clear advice logs
 */
export function clearAdviceLogs() {
  adviceLogs = [];
}

// Mock endpoint for future integration
export const AI_ENDPOINT = {
  // Replace with actual Supabase function URL
  chat: '/api/ai/chat',
  advice: '/api/ai/advice',
  insights: '/api/ai/insights',
};
