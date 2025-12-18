import { useNavigate } from "react-router-dom";
import { Utensils, ChefHat, IceCream, GlassWater } from "lucide-react";
import Layout from "@/components/Layout";

export default function Cardapio() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Cardápio</h1>
          <p className="text-muted-foreground">
            Escolha uma categoria para ver as opções
          </p>
        </div>

        {/* Grid de Categorias */}
        <div className="space-y-4">
          {/* 1. Marmitas */}
          <button
            onClick={() => navigate("/marmita")}
            className="w-full text-left bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Utensils className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">Marmitas</h3>
                <p className="text-sm text-muted-foreground">
                  Monte sua marmita personalizada
                </p>
              </div>
              <div className="text-primary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* 2. Pratos Extras */}
          <button
            onClick={() => navigate("/pratos")}
            className="w-full text-left bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-4 hover:bg-accent/15 hover:border-accent/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <ChefHat className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">
                  Pratos Extras
                </h3>
                <p className="text-sm text-muted-foreground">
                  Porções especiais do chef
                </p>
              </div>
              <div className="text-accent">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* 3. Sobremesas & Bebidas (AGORA JUNTAS) */}
          <button
            onClick={() => navigate("/sobremesas")}
            className="w-full text-left bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-xl p-4 hover:bg-purple-500/15 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-colors">
                <div className="relative">
                  <IceCream className="w-6 h-6 text-pink-600" />
                  <GlassWater className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">
                  Sobremesas & Bebidas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Doces e bebidas refrescantes
                </p>
              </div>
              <div className="text-purple-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Informação de Entrega */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">📱</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Pedidos via WhatsApp
              </p>
              <p className="text-xs text-muted-foreground">
                Todos os pedidos são enviados diretamente pelo WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
