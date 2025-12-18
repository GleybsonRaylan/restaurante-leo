import { useNavigate } from "react-router-dom";
import {
  Utensils,
  ChefHat,
  IceCream,
  GlassWater,
  ArrowRight,
  Star,
  Clock,
  Truck,
  Sparkles,
  MapPin,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Index() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/30 via-primary/10 to-accent/20 rounded-3xl p-6 mb-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-xs font-semibold text-accent">
                  Qualidade Premium
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-foreground mb-2 leading-tight">
              Sabor que conquista,{" "}
              <span className="text-primary">qualidade que fideliza!</span>
            </h2>

            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Monte sua marmita personalizada do seu jeito ou escolha nossos
              pratos especiais preparados com carinho.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg">
                <Clock size={16} className="text-accent" />
                <span className="text-xs font-medium">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg">
                <Truck size={16} className="text-accent" />
                <span className="text-xs font-medium">Taxa R$2+</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs font-medium">Comida Caseira</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/marmita")}
              className="btn-accent flex items-center gap-2 text-lg px-8 py-4 shadow-xl shadow-accent/40 hover:shadow-accent/60 transition-all"
            >
              <Sparkles size={20} />
              Começar Pedido
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h3 className="text-xl font-bold text-foreground">
              Nosso Cardápio
            </h3>
          </div>

          <div className="space-y-4">
            {/* Marmitas */}
            <button
              onClick={() => navigate("/marmita")}
              className="w-full text-left bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Utensils className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">
                    Marmitas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Monte sua marmita personalizada com suas escolhas
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

            {/* Pratos Extras */}
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
                    Pratos especiais preparados pelo chef
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

            {/* Sobremesas & Bebidas */}
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
                    Doces irresistíveis e bebidas refrescantes
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
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <p className="font-bold text-foreground text-sm">
              Pedido pelo WhatsApp
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (81) 99761-5125
            </p>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <Clock size={24} className="text-primary" />
            </div>
            <p className="font-bold text-foreground text-sm">
              Horário de Funcionamento
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Seg-Dom • 11h às 14h
            </p>
          </div>
        </div>

        {/* Entrega Banner - ATUALIZADO */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-5 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/30 flex items-center justify-center flex-shrink-0">
              <div className="relative">
                <Truck size={24} className="text-accent" />
                <MapPin
                  size={14}
                  className="text-white absolute -top-1 -right-1"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">
                Entrega para toda cidade
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Taxa base de{" "}
                <span className="text-accent font-bold">R$ 2,00</span>{" "}
                <span className="text-xs text-muted-foreground">
                  (valor pode variar conforme o local)
                </span>
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">
                  Consulte o valor exato durante o pedido
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Observação sobre entrega */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Atenção:</span> O valor da entrega
              pode ser ajustado conforme a distância. O valor final será
              confirmado pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
