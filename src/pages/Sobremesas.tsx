import { useNavigate } from 'react-router-dom';
import { ArrowLeft, IceCream } from 'lucide-react';
import Layout from '@/components/Layout';
import ItemCard from '@/components/ItemCard';
import { useOrder } from '@/contexts/OrderContext';
import { showToast } from '@/components/Toast';
import { SOBREMESAS, SobremesaOrder } from '@/types/order';

export default function Sobremesas() {
  const navigate = useNavigate();
  const { addToCart } = useOrder();

  const handleAddSobremesa = (
    sobremesa: typeof SOBREMESAS[number], 
    quantity: number, 
    sabor?: string
  ) => {
    const order: SobremesaOrder = {
      id: `sobremesa-${Date.now()}`,
      type: 'sobremesa',
      name: sobremesa.name,
      description: sobremesa.description,
      price: sobremesa.price,
      quantity,
      sabor,
    };
    addToCart(order);
    showToast(`${sobremesa.name} adicionado!`, 'success');
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
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <IceCream size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sobremesas</h1>
            <p className="text-muted-foreground text-sm">Doces irresistíveis</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Experimente!</span> Nossas sobremesas são feitas artesanalmente com muito carinho.
          </p>
        </div>

        <div className="space-y-4">
          {SOBREMESAS.map((sobremesa) => (
            <ItemCard
              key={sobremesa.name}
              name={sobremesa.name}
              description={sobremesa.description}
              price={sobremesa.price}
              image={sobremesa.image}
              sabores={sobremesa.sabores}
              onAdd={(qty, sabor) => handleAddSobremesa(sobremesa, qty, sabor)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
