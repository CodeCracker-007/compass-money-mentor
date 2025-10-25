import { TrendingUp, AlertCircle, Target } from 'lucide-react';
import { mockInvestments } from '@/data/mockData';

export default function Invest() {
  const totalInvestment = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = ((totalGainLoss / totalInvestment) * 100).toFixed(2);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      stock: '#FF6B6B',
      mutual_fund: '#0DAA8B',
      crypto: '#FFD93D',
      bond: '#4ECDC4',
      gold: '#D4AF37',
    };
    return colors[type] || '#0DAA8B';
  };

  const getTypeName = (type: string) => {
    const names: Record<string, string> = {
      stock: 'Stock',
      mutual_fund: 'Mutual Fund',
      crypto: 'Crypto',
      bond: 'Bond',
      gold: 'Gold',
    };
    return names[type] || type;
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Portfolio</h1>
        <p className="text-muted-foreground">Manage your investments</p>
      </header>

      {/* Portfolio Summary */}
      <div className="mb-6 bg-gradient-primary rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-2">Total Portfolio Value</p>
            <h2 className="text-4xl font-bold mb-2">{formatCurrency(totalCurrentValue)}</h2>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${
                totalGainLoss >= 0 ? 'text-white' : 'text-red-200'
              }`}>
                {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
              </span>
              <span className="text-white/70 text-sm">
                ({totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}%)
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Invested: {formatCurrency(totalInvestment)}
        </p>
      </div>

      {/* Risk Meter */}
      <div className="mb-6 bg-card rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Portfolio Risk: Moderate</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Your portfolio has balanced exposure across asset classes. Consider reviewing crypto allocation.
            </p>
            <div className="flex gap-1 h-2 rounded-full overflow-hidden">
              <div className="flex-1 bg-secondary" />
              <div className="flex-1 bg-secondary" />
              <div className="flex-1 bg-accent" />
              <div className="flex-1 bg-muted" />
              <div className="flex-1 bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Holdings</h2>
          <button className="text-sm text-secondary font-medium">Add New</button>
        </div>

        <div className="space-y-3">
          {mockInvestments.map((investment) => {
            const isProfit = investment.gainLoss >= 0;
            const typeColor = getTypeColor(investment.type);

            return (
              <div
                key={investment.id}
                className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${typeColor}20` }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg"
                        style={{ backgroundColor: typeColor }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{investment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getTypeName(investment.type)} • {investment.allocation}% of portfolio
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatCurrency(investment.currentValue)}</p>
                    <p className={`text-xs font-medium ${
                      isProfit ? 'text-secondary' : 'text-destructive'
                    }`}>
                      {isProfit ? '+' : ''}{formatCurrency(investment.gainLoss)} ({isProfit ? '+' : ''}{investment.gainLossPercent.toFixed(1)}%)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Invested: {formatCurrency(investment.amount)}</span>
                    <button className="text-secondary font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rebalance Suggestion */}
      <div className="bg-gradient-subtle rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Rebalancing Suggestion</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI recommends increasing index fund allocation by 15% and reducing crypto exposure to 10% for better risk-adjusted returns.
            </p>
            <button className="w-full py-2 px-4 bg-secondary/10 text-secondary rounded-xl font-medium text-sm hover:bg-secondary/20 transition-colors">
              View Rebalance Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
