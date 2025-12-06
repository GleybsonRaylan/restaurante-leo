import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat } from 'lucide-react';
import Layout from '@/components/Layout';
import ItemCard from '@/components/ItemCard';
import { useOrder } from '@/contexts/OrderContext';
import { showToast } from '@/components/Toast';
import { PRATOS_EXTRAS, PratoOrder } from '@/types/order';

export default function Pratos() {
  const navigate = useNavigate();
  const { addToCart } = useOrder();

  const handleAddPrato = (prato: typeof PRATOS_EXTRAS[number], quantity: number) => {
    const order: PratoOrder = {
      id: `prato-${Date.now()}`,
      type: 'prato',
      name: prato.name,
      description: prato.description,
      price: prato.price,
      quantity,
    };
    addToCart(order);
    showToast(`${prato.name} adicionado!`, 'success');
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/40">
            <ChefHat size={28} className="text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pratos Extras</h1>
            <p className="text-muted-foreground text-sm">Pratos especiais do chef</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Dica:</span> Nossos pratos são preparados na hora com ingredientes frescos e selecionados!
          </p>
        </div>

        <div className="space-y-4">
          {PRATOS_EXTRAS.map((prato) => (
            <ItemCard
              key={prato.name}
              name={prato.name}
              description={prato.description}
              price={prato.price}
              image={prato.image}
              onAdd={(qty) => handleAddPrato(prato, qty)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
