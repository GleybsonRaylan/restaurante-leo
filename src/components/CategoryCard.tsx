import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  color?: 'primary' | 'accent';
  image?: string;
}

export default function CategoryCard({ title, description, icon, onClick, color = 'primary', image }: CategoryCardProps) {
  const gradientClasses = color === 'accent' 
    ? 'from-accent/20 to-accent/5'
    : 'from-primary/20 to-primary/5';

  const iconBgClasses = color === 'accent' 
    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/40'
    : 'bg-primary text-primary-foreground shadow-lg shadow-primary/40';

  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradientClasses} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl group`}
    >
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative p-5 flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBgClasses} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color === 'accent' ? 'bg-accent/20' : 'bg-primary/20'} transition-transform group-hover:translate-x-1`}>
          <ChevronRight size={20} className={color === 'accent' ? 'text-accent' : 'text-primary'} />
        </div>
      </div>
    </button>
  );
}
