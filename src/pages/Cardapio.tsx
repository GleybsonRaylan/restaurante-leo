import { useNavigate } from 'react-router-dom';
import { Utensils, ChefHat, IceCream } from 'lucide-react';
import Layout from '@/components/Layout';
import CategoryCard from '@/components/CategoryCard';

export default function Cardapio() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Cardápio</h1>

        <div className="space-y-4">
          <CategoryCard
            title="Marmitas"
            description="Monte sua marmita personalizada"
            icon={<Utensils size={28} />}
            onClick={() => navigate('/marmita')}
            color="primary"
          />
          <CategoryCard
            title="Pratos Extras"
            description="Porções especiais do chef"
            icon={<ChefHat size={28} />}
            onClick={() => navigate('/pratos')}
            color="accent"
          />
          <CategoryCard
            title="Sobremesas"
            description="Doces irresistíveis"
            icon={<IceCream size={28} />}
            onClick={() => navigate('/sobremesas')}
            color="primary"
          />
        </div>
      </div>
    </Layout>
  );
}
