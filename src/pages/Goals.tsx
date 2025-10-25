import { Plus, Target, TrendingUp, Calendar } from 'lucide-react';
import { mockGoals } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

export default function Goals() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateMonthsRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const months = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return months;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/20 text-destructive';
      case 'medium':
        return 'bg-accent/20 text-accent';
      case 'low':
        return 'bg-secondary/20 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Financial Goals</h1>
            <p className="text-muted-foreground">Track and achieve your targets</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-secondary shadow-emerald flex items-center justify-center hover:scale-105 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Goals Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-secondary" />
            <span className="text-sm text-muted-foreground">Active Goals</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockGoals.length}</p>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <span className="text-sm text-muted-foreground">Total Saved</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
          </p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {mockGoals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          const monthsRemaining = calculateMonthsRemaining(goal.targetDate);
          const isOnTrack = percentage >= 50 || monthsRemaining > 6;

          return (
            <div
              key={goal.id}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{goal.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.category}</p>
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${goal.color}20` }}
                >
                  <Target className="w-7 h-7" style={{ color: goal.color }} />
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold text-foreground">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={percentage} className="h-3 mb-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(goal.targetAmount)}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Target Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(goal.targetDate).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="text-sm font-medium text-foreground">
                      {goal.monthlyContribution ? formatCurrency(goal.monthlyContribution) : 'Flexible'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isOnTrack ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                }`}>
                  {isOnTrack ? '✓ On Track' : '⚡ Needs Attention'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Goal Card */}
      <div className="mt-6 bg-gradient-subtle rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Suggested Goal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your savings pattern, you could save ₹50,000 for a health insurance premium by next year.
            </p>
            <button className="text-sm text-secondary font-medium hover:underline">
              Create Goal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lightbulb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
