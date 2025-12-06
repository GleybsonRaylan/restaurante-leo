import { useEffect, useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <Check className="text-accent-foreground" size={20} />,
    error: <X className="text-destructive-foreground" size={20} />,
    info: <AlertCircle className="text-primary-foreground" size={20} />,
  };

  const colors = {
    success: 'bg-accent text-accent-foreground',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-primary text-primary-foreground',
  };

  return (
    <div 
      className={`fixed top-20 left-4 right-4 z-50 ${colors[type]} rounded-lg p-4 flex items-center gap-3 shadow-lg transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0 -translate-y-4'
      }`}
    >
      {icons[type]}
      <span className="font-medium flex-1">{message}</span>
      <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}>
        <X size={18} />
      </button>
    </div>
  );
}

// Toast manager hook
let toastHandler: ((toast: Omit<ToastProps, 'onClose'>) => void) | null = null;

export function setToastHandler(handler: (toast: Omit<ToastProps, 'onClose'>) => void) {
  toastHandler = handler;
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  toastHandler?.({ message, type });
}
