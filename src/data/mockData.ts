// Mock data for FinMate app

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  defaultAIMode: AIMode;
  theme: 'light' | 'dark' | 'auto';
}

export type AIMode = 
  | 'professional' 
  | 'coach' 
  | 'neutral' 
  | 'mentor' 
  | 'adaptive';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  recurring?: boolean;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  monthlyContribution?: number;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'mutual_fund' | 'crypto' | 'bond' | 'gold';
  amount: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number;
}

export interface AIInsight {
  id: string;
  type: 'action' | 'tip' | 'warning' | 'achievement';
  title: string;
  description: string;
  action?: string;
  actionLabel?: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode: AIMode;
}

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  joinedDate: '2024-01-15',
  defaultAIMode: 'professional',
  theme: 'light',
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-24',
    description: 'Salary Credit',
    category: 'Salary',
    amount: 75000,
    type: 'income',
    recurring: true,
  },
  {
    id: '2',
    date: '2025-10-23',
    description: 'Swiggy Order',
    category: 'Food & Dining',
    amount: -485,
    type: 'expense',
  },
  {
    id: '3',
    date: '2025-10-22',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -499,
    type: 'expense',
    recurring: true,
  },
  {
    id: '4',
    date: '2025-10-22',
    description: 'Metro Card Recharge',
    category: 'Transport',
    amount: -1200,
    type: 'expense',
  },
  {
    id: '5',
    date: '2025-10-21',
    description: 'Amazon Shopping',
    category: 'Shopping',
    amount: -2350,
    type: 'expense',
  },
  {
    id: '6',
    date: '2025-10-20',
    description: 'Book Purchase',
    category: 'Education',
    amount: -850,
    type: 'expense',
  },
  {
    id: '7',
    date: '2025-10-19',
    description: 'Freelance Project',
    category: 'Freelance',
    amount: 15000,
    type: 'income',
  },
  {
    id: '8',
    date: '2025-10-18',
    description: 'Zomato Order',
    category: 'Food & Dining',
    amount: -620,
    type: 'expense',
  },
];

// Mock Budgets
export const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food & Dining',
    allocated: 10000,
    spent: 6850,
    color: '#FF6B6B',
    icon: 'utensils',
  },
  {
    id: '2',
    category: 'Transport',
    allocated: 5000,
    spent: 3200,
    color: '#4ECDC4',
    icon: 'car',
  },
  {
    id: '3',
    category: 'Shopping',
    allocated: 8000,
    spent: 4500,
    color: '#FFD93D',
    icon: 'shopping-bag',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocated: 3000,
    spent: 1850,
    color: '#A78BFA',
    icon: 'film',
  },
  {
    id: '5',
    category: 'Education',
    allocated: 5000,
    spent: 2100,
    color: '#0DAA8B',
    icon: 'book-open',
  },
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 300000,
    currentAmount: 145000,
    targetDate: '2025-12-31',
    category: 'Savings',
    color: '#0DAA8B',
    priority: 'high',
    monthlyContribution: 15000,
  },
  {
    id: '2',
    name: 'Europe Trip',
    targetAmount: 200000,
    currentAmount: 68000,
    targetDate: '2026-06-30',
    category: 'Travel',
    color: '#4ECDC4',
    priority: 'medium',
    monthlyContribution: 10000,
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 120000,
    currentAmount: 95000,
    targetDate: '2025-11-30',
    category: 'Shopping',
    color: '#D4AF37',
    priority: 'medium',
    monthlyContribution: 12500,
  },
  {
    id: '4',
    name: 'Home Down Payment',
    targetAmount: 1000000,
    currentAmount: 220000,
    targetDate: '2027-12-31',
    category: 'Real Estate',
    color: '#0B2545',
    priority: 'high',
    monthlyContribution: 30000,
  },
];

// Mock Investments
export const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Axis Bluechip Fund',
    type: 'mutual_fund',
    amount: 50000,
    currentValue: 58500,
    gainLoss: 8500,
    gainLossPercent: 17.0,
    allocation: 35,
  },
  {
    id: '2',
    name: 'HDFC Index Fund',
    type: 'mutual_fund',
    amount: 40000,
    currentValue: 44200,
    gainLoss: 4200,
    gainLossPercent: 10.5,
    allocation: 26,
  },
  {
    id: '3',
    name: 'Bitcoin',
    type: 'crypto',
    amount: 25000,
    currentValue: 32500,
    gainLoss: 7500,
    gainLossPercent: 30.0,
    allocation: 19,
  },
  {
    id: '4',
    name: 'Gold ETF',
    type: 'gold',
    amount: 20000,
    currentValue: 21800,
    gainLoss: 1800,
    gainLossPercent: 9.0,
    allocation: 13,
  },
  {
    id: '5',
    name: 'TCS Stock',
    type: 'stock',
    amount: 15000,
    currentValue: 11700,
    gainLoss: -3300,
    gainLossPercent: -22.0,
    allocation: 7,
  },
];

// Mock AI Insights
export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'action',
    title: 'Overspending Alert',
    description: "You have spent Rs.6,850 on Food & Dining this month, which is 68% of your Rs.10,000 budget. Consider ordering less frequently to stay within budget.",
    action: 'reduce_dining_out',
    actionLabel: 'Create Savings Plan',
    date: '2025-10-25',
    priority: 'high',
  },
  {
    id: '2',
    type: 'tip',
    title: 'Goal On Track',
    description: 'Your Emergency Fund is 48% complete! At your current pace, you will reach your goal by November 2025, ahead of schedule.',
    date: '2025-10-24',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'action',
    title: 'Investment Opportunity',
    description: 'Your portfolio has low exposure to large-cap stocks. Consider rebalancing with 10% more allocation to reduce risk.',
    action: 'rebalance_portfolio',
    actionLabel: 'View Suggestions',
    date: '2025-10-23',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Milestone Reached!',
    description: 'Congratulations! You have saved Rs.95,000 towards your New Laptop goal. Just Rs.25,000 more to go!',
    date: '2025-10-22',
    priority: 'low',
  },
  {
    id: '5',
    type: 'warning',
    title: 'Crypto Volatility Alert',
    description: 'Bitcoin allocation is at 19% and highly volatile. Consider taking partial profits to secure gains.',
    action: 'review_crypto',
    actionLabel: 'Review Holdings',
    date: '2025-10-21',
    priority: 'high',
  },
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'How am I doing with my emergency fund goal?',
    timestamp: '2025-10-25T10:30:00',
    mode: 'professional',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Your emergency fund is progressing well. You have saved Rs.1,45,000 out of your Rs.3,00,000 target (48% complete). At your current monthly contribution of Rs.15,000, you are on track to reach your goal by November 2025, which is a month ahead of your December target. Keep up the excellent work!',
    timestamp: '2025-10-25T10:30:15',
    mode: 'professional',
  },
  {
    id: '3',
    role: 'user',
    content: 'Should I invest more in crypto?',
    timestamp: '2025-10-25T10:32:00',
    mode: 'professional',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'I would advise caution with crypto investments. Your current Bitcoin holding is up 30%, which is excellent, but crypto represents 19% of your portfolio - higher than the recommended 5-10% for moderate risk profiles. Consider taking partial profits and diversifying into more stable assets like index funds or gold ETFs to balance your risk exposure.',
    timestamp: '2025-10-25T10:32:20',
    mode: 'professional',
  },
];

// Helper to calculate net worth
export const calculateNetWorth = () => {
  const totalInvestments = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGoalSavings = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  return totalInvestments + totalGoalSavings;
};

// Helper to calculate monthly spending
export const calculateMonthlySpending = () => {
  const currentMonth = new Date().getMonth();
  return mockTransactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
};

// Helper to calculate monthly income
export const calculateMonthlyIncome = () => {
  const currentMonth = new Date().getMonth();
  return mockTransactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);
};
