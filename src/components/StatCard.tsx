import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl p-6 shadow-sm border border-border",
        "transition-all hover:shadow-md",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-secondary" />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium",
            trend.positive ? "text-secondary" : "text-destructive"
          )}>
            {trend.positive ? '+' : ''}{trend.value}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
