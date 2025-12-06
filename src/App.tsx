import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from '@/contexts/OrderContext';
import Toast, { setToastHandler } from '@/components/Toast';
import Index from '@/pages/Index';
import Cardapio from '@/pages/Cardapio';
import MarmitaBuilder from '@/pages/MarmitaBuilder';
import Pratos from '@/pages/Pratos';
import Sobremesas from '@/pages/Sobremesas';
import Carrinho from '@/pages/Carrinho';
import Checkout from '@/pages/Checkout';
import Contato from '@/pages/Contato';
import NotFound from '@/pages/NotFound';

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const handleShowToast = useCallback((data: Omit<ToastData, 'id'>) => {
    setToast(data);
  }, []);

  // Set the toast handler globally
  setToastHandler(handleShowToast);

  return (
    <OrderProvider>
      <BrowserRouter>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/marmita" element={<MarmitaBuilder />} />
          <Route path="/pratos" element={<Pratos />} />
          <Route path="/sobremesas" element={<Sobremesas />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
