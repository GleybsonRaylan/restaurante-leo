import { Check } from 'lucide-react';

interface SelectionChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  extra?: number;
  variant?: 'default' | 'accent';
}

export default function SelectionChip({ 
  label, 
  selected, 
  onClick, 
  disabled = false,
  extra,
  variant = 'default'
}: SelectionChipProps) {
  const baseClasses = 'relative p-4 rounded-xl border-2 transition-all duration-200 text-center font-medium min-h-[60px] flex flex-col items-center justify-center';
  
  const getStateClasses = () => {
    if (disabled && !selected) {
      return 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50';
    }
    if (selected) {
      return variant === 'accent'
        ? 'border-accent bg-accent/20 text-accent shadow-lg shadow-accent/20'
        : 'border-primary bg-primary/20 text-primary shadow-lg shadow-primary/20';
    }
    return 'border-border bg-card hover:border-primary/50 cursor-pointer hover:bg-card/80';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={`${baseClasses} ${getStateClasses()}`}
    >
      {selected && (
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
          variant === 'accent' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
        }`}>
          <Check size={14} />
        </div>
      )}
      <span className="text-sm">{label}</span>
      {extra !== undefined && extra > 0 && (
        <span className="text-xs text-accent mt-1 font-semibold">+R$ {extra.toFixed(2).replace('.', ',')}</span>
      )}
    </button>
  );
}
