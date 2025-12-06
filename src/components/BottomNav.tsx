import { Home, UtensilsCrossed, ShoppingCart, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useOrder();
  const cartCount = getCartCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/cardapio', icon: UtensilsCrossed, label: 'Cardápio' },
    { path: '/carrinho', icon: ShoppingCart, label: 'Carrinho', badge: cartCount },
    { path: '/contato', icon: MessageCircle, label: 'Contato' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border safe-bottom z-50 shadow-2xl shadow-black/30">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, icon: Icon, label, badge }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`bottom-nav-item flex-1 relative ${isActive ? 'bottom-nav-item-active' : ''}`}
            >
              <div className="relative">
                <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/20' : ''}`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in shadow-lg">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-primary' : ''}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
