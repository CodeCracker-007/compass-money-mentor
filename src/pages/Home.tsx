import { TrendingUp, Target, Lightbulb, ArrowRight, Wallet, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { 
  calculateNetWorth, 
  calculateMonthlySpending, 
  mockTransactions,
  mockGoals,
  mockAIInsights,
} from '@/data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const netWorth = calculateNetWorth();
  const monthlySpending = calculateMonthlySpending();
  const recentTransactions = mockTransactions.slice(0, 5);
  const mainGoal = mockGoals[0];
  const mainInsight = mockAIInsights[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's your financial snapshot
        </p>
      </header>

      {/* Net Worth Card */}
      <div className="mb-6 bg-gradient-emerald rounded-3xl p-8 shadow-emerald text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-2">Total Net Worth</p>
            <h2 className="text-4xl font-bold">{formatCurrency(netWorth)}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/90">↑ +12.5%</span>
          <span className="text-white/70">from last month</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => navigate('/plan')}
          className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-3 mx-auto">
            <Receipt className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">This Month</p>
          <p className="text-base font-bold text-foreground">{formatCurrency(monthlySpending)}</p>
        </button>

        <button
          onClick={() => navigate('/goals')}
          className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3 mx-auto">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{mainGoal.name}</p>
          <p className="text-base font-bold text-foreground">{Math.round((mainGoal.currentAmount / mainGoal.targetAmount) * 100)}%</p>
        </button>

        <button
          onClick={() => navigate('/coach')}
          className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3 mx-auto">
            <Lightbulb className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">AI Tips</p>
          <p className="text-base font-bold text-foreground">{mockAIInsights.length}</p>
        </button>
      </div>

      {/* AI Insight Card */}
      {mainInsight && (
        <div className="mb-6 bg-gradient-subtle rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{mainInsight.title}</h3>
              <p className="text-sm text-muted-foreground">{mainInsight.description}</p>
            </div>
          </div>
          {mainInsight.actionLabel && (
            <button
              onClick={() => navigate('/coach')}
              className="w-full mt-3 py-2 px-4 bg-accent/10 text-accent rounded-xl font-medium text-sm hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
            >
              {mainInsight.actionLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/plan?action=add-transaction')}
            className="p-4 bg-secondary/10 rounded-2xl text-left hover:bg-secondary/20 transition-colors group"
          >
            <Receipt className="w-6 h-6 text-secondary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-foreground">Add Transaction</p>
          </button>
          <button
            onClick={() => navigate('/goals?action=add-goal')}
            className="p-4 bg-accent/10 rounded-2xl text-left hover:bg-accent/20 transition-colors group"
          >
            <Target className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-foreground">New Goal</p>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button
            onClick={() => navigate('/plan')}
            className="text-sm text-secondary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-secondary/10' : 'bg-destructive/10'
                }`}>
                  <Receipt className={`w-5 h-5 ${
                    transaction.type === 'income' ? 'text-secondary' : 'text-destructive'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'income' ? 'text-secondary' : 'text-foreground'
              }`}>
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
