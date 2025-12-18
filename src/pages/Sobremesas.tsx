import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, IceCream, GlassWater, X } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useOrder } from "@/contexts/OrderContext";
import { showToast } from "@/components/Toast";
import { SOBREMESAS, BEBIDAS } from "@/types/order";

export default function Sobremesas() {
  const navigate = useNavigate();
  const { addToCart } = useOrder();

  // Estado para controlar a seleção de sabores
  const [selectedSobremesa, setSelectedSobremesa] = useState<
    (typeof SOBREMESAS)[number] | null
  >(null);
  const [selectedSabor, setSelectedSabor] = useState<string>("");

  const handleAddSobremesa = (
    sobremesa: (typeof SOBREMESAS)[number],
    sabor?: string
  ) => {
    addToCart({
      id: `sobremesa-${Date.now()}`,
      type: "sobremesa",
      name: sabor ? `${sobremesa.name} - ${sabor}` : sobremesa.name,
      description: sobremesa.description,
      price: sobremesa.price,
      quantity: 1,
      sabor,
    });
    showToast(
      sabor
        ? `${sobremesa.name} (${sabor}) adicionada!`
        : `${sobremesa.name} adicionada!`,
      "success"
    );

    // Fecha o modal
    setSelectedSobremesa(null);
    setSelectedSabor("");
  };

  const handleAddBebida = (bebida: (typeof BEBIDAS)[number]) => {
    addToCart({
      id: bebida.id,
      type: "bebida" as const,
      name: bebida.name,
      description: bebida.description,
      price: bebida.price,
      quantity: 1,
    });
    showToast(`${bebida.name} adicionada!`, "success");
  };

  // Função para abrir o modal de sabores
  const openSaboresModal = (sobremesa: (typeof SOBREMESAS)[number]) => {
    setSelectedSobremesa(sobremesa);
    setSelectedSabor(sobremesa.sabores?.[0] || ""); // Seleciona o primeiro sabor por padrão
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Cabeçalho */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <div className="relative">
                  <IceCream className="w-6 h-6 text-primary" />
                  <GlassWater className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Sobremesas & Bebidas
                </h1>
                <p className="text-muted-foreground text-sm">
                  Complete sua refeição com nossas delícias
                </p>
              </div>
            </div>
          </div>

          {/* Banner Informativo */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Escolha seus sabores!</span> Para
              sobremesas com múltiplos sabores, selecione seu preferido.
            </p>
          </div>

          {/* ========== SOBREMESAS ========== */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <IceCream className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Sobremesas Doces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOBREMESAS.map((item) => (
                <div
                  key={item.name}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-4 mb-4">
                    {/* Imagem da Sobremesa - AGORA COM IMAGEM */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Informações da Sobremesa */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-foreground mb-1">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary whitespace-nowrap">
                          R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sabores disponíveis */}
                  {item.sabores && item.sabores.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">
                          Sabores disponíveis:
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.sabores.slice(0, 4).map((sabor) => (
                          <span
                            key={sabor}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {sabor}
                          </span>
                        ))}
                        {item.sabores.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{item.sabores.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botão - Se tiver sabores, abre modal. Se não, adiciona direto */}
                  {item.sabores && item.sabores.length > 0 ? (
                    <button
                      onClick={() => openSaboresModal(item)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Escolher Sabor
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddSobremesa(item)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Adicionar ao Carrinho
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ========== BEBIDAS ========== */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <GlassWater className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Bebidas Geladas
              </h2>
            </div>

            {/* Grid de Bebidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BEBIDAS.map((bebida) => (
                <div
                  key={bebida.id}
                  className="bg-card border border-border rounded-xl p-5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">
                        {bebida.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {bebida.description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center ml-3 flex-shrink-0">
                      <GlassWater className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      R$ {bebida.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddBebida(bebida)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Modal de Seleção de Sabores */}
          {selectedSobremesa && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    Escolha o sabor
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedSobremesa(null);
                      setSelectedSabor("");
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    {selectedSobremesa.name}
                  </h4>

                  <div className="space-y-3">
                    {selectedSobremesa.sabores?.map((sabor) => (
                      <div
                        key={sabor}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedSabor === sabor
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedSabor(sabor)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              selectedSabor === sabor
                                ? "border-primary bg-primary"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedSabor === sabor && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="font-medium">{sabor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSobremesa(null);
                      setSelectedSabor("");
                    }}
                    className="flex-1 border border-border text-foreground py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() =>
                      handleAddSobremesa(selectedSobremesa, selectedSabor)
                    }
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    disabled={!selectedSabor}
                  >
                    Adicionar {selectedSabor && `(${selectedSabor})`}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Botão para voltar - SEM PROMOÇÃO */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={18} />
              <span>Voltar para o início</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
