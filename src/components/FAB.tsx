import { useState } from 'react';
import { Plus, X, Receipt, Target, MessageCircle, FileText, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'transaction',
    label: 'Add Transaction',
    icon: Receipt,
    action: '/plan?action=add-transaction',
    color: 'bg-secondary',
  },
  {
    id: 'goal',
    label: 'Add Goal',
    icon: Target,
    action: '/goals?action=add-goal',
    color: 'bg-accent',
  },
  {
    id: 'ai',
    label: 'Ask AI',
    icon: MessageCircle,
    action: '/coach',
    color: 'bg-primary',
  },
  {
    id: 'report',
    label: 'Quick Report',
    icon: FileText,
    action: '/plan?action=report',
    color: 'bg-primary-light',
  },
  {
    id: 'investment',
    label: 'Add Investment',
    icon: TrendingUp,
    action: '/invest?action=add-investment',
    color: 'bg-secondary-light',
  },
];

export function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleActionClick = (action: string) => {
    navigate(action);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Quick Actions */}
      {isOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-card rounded-2xl shadow-lg p-4 animate-scale-in">
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.action)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-all group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                      action.color
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-base font-medium text-foreground">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 left-1/2 -translate-x-1/2 z-50",
          "w-14 h-14 rounded-full shadow-emerald",
          "flex items-center justify-center",
          "transition-all duration-300",
          isOpen 
            ? "bg-destructive rotate-45 scale-110" 
            : "bg-gradient-emerald hover:scale-105"
        )}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
}
