import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { mockBudgets, mockTransactions } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

export default function Plan() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

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
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Monthly Plan</h1>
        <p className="text-muted-foreground">Track your income and expenses</p>
      </header>

      {/* Income vs Expense Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-emerald rounded-2xl p-6 shadow-sm text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm text-white/80">Income</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="bg-gradient-primary rounded-2xl p-6 shadow-sm text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm text-white/80">Expenses</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Category Budgets */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Category Budgets</h2>
          <button className="text-sm text-secondary font-medium">Edit</button>
        </div>

        <div className="space-y-4">
          {mockBudgets.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const isOverBudget = percentage > 90;

            return (
              <div
                key={budget.id}
                className="bg-card rounded-2xl p-5 border border-border shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${budget.color}20` }}
                    >
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: budget.color }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{budget.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      isOverBudget ? 'text-destructive' : 'text-secondary'
                    }`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <Progress
                  value={percentage}
                  className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : '[&>div]:bg-secondary'}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">All Transactions</h2>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-2">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-sm transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  {transaction.recurring && (
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                      Recurring
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              </div>
              <span
                className={`font-bold ${
                  transaction.type === 'income' ? 'text-secondary' : 'text-foreground'
                }`}
              >
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
