import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AIMode } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AIModeSwitcherProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const modeLabels: Record<AIMode, { label: string; description: string }> = {
  professional: {
    label: 'Professional & Polite',
    description: 'Formal financial advice',
  },
  coach: {
    label: 'Cool & Smart Coach',
    description: 'Friendly and motivating',
  },
  neutral: {
    label: 'Neutral & Analytical',
    description: 'Data-driven insights',
  },
  mentor: {
    label: 'Mentor-like Guide',
    description: 'Experienced wisdom',
  },
  adaptive: {
    label: 'Adaptive',
    description: 'Learns your style',
  },
};

export function AIModeSwitcher({ currentMode, onModeChange }: AIModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
          <span className="text-sm font-medium">
            {modeLabels[currentMode].label}
          </span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-card border-border">
        {(Object.keys(modeLabels) as AIMode[]).map((mode) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => onModeChange(mode)}
            className={cn(
              "flex flex-col items-start gap-1 p-3 cursor-pointer",
              mode === currentMode && "bg-secondary/10"
            )}
          >
            <span className="font-medium text-foreground">
              {modeLabels[mode].label}
            </span>
            <span className="text-xs text-muted-foreground">
              {modeLabels[mode].description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
