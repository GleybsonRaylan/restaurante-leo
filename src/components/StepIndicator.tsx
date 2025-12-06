import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          return (
            <div key={stepNum} className="flex flex-col items-center relative z-10">
              <div 
                className={`step-indicator ${
                  isCompleted ? 'step-indicator-completed' : 
                  isActive ? 'step-indicator-active' : 
                  'step-indicator-inactive'
                }`}
              >
                {isCompleted ? <Check size={16} /> : stepNum}
              </div>
              {labels && labels[i] && (
                <span className={`text-[10px] mt-1 font-medium text-center max-w-[60px] ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
