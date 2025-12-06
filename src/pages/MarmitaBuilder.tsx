import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Utensils,
  Scale,
  Users,
} from "lucide-react";
import Layout from "@/components/Layout";
import StepIndicator from "@/components/StepIndicator";
import SelectionChip from "@/components/SelectionChip";
import { useOrder } from "@/contexts/OrderContext";
import { showToast } from "@/components/Toast";
import {
  MARMITA_PRICES,
  MARMITA_INFO,
  CARNES_OPTIONS,
  PORCOES_OPTIONS,
  FEIJAO_OPTIONS,
  ACOMPANHAMENTOS_OPTIONS,
  MarmitaOrder,
} from "@/types/order";

type MarmitaSize = "P" | "M" | "G";

const STEP_LABELS = [
  "Tamanho",
  "Carnes",
  "Porções",
  "Feijão",
  "Acomp.",
  "Resumo",
];

export default function MarmitaBuilder() {
  const navigate = useNavigate();
  const { addToCart } = useOrder();

  const [currentStep, setCurrentStep] = useState(1);
  const [size, setSize] = useState<MarmitaSize | null>(null);
  const [carnes, setCarnes] = useState<string[]>([]);
  const [porcoes, setPorcoes] = useState<string[]>([]);
  const [feijao, setFeijao] = useState<string>("");
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);

  // Calculate extras for carnes
  const carnesExtras = useMemo(() => {
    return carnes.reduce((total, carne) => {
      const option = CARNES_OPTIONS.find((c) => c.name === carne);
      return total + (option?.extra || 0);
    }, 0);
  }, [carnes]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!size) return 0;
    return MARMITA_PRICES[size] + carnesExtras;
  }, [size, carnesExtras]);

  const handleSelectSize = (selectedSize: MarmitaSize) => {
    setSize(selectedSize);
    setCurrentStep(2);
  };

  const toggleCarne = (carne: string) => {
    if (carnes.includes(carne)) {
      setCarnes(carnes.filter((c) => c !== carne));
    } else if (carnes.length < 2) {
      setCarnes([...carnes, carne]);
    }
  };

  const togglePorcao = (porcao: string) => {
    if (porcoes.includes(porcao)) {
      setPorcoes(porcoes.filter((p) => p !== porcao));
    } else {
      setPorcoes([...porcoes, porcao]);
    }
  };

  const toggleAcompanhamento = (acomp: string) => {
    if (acompanhamentos.includes(acomp)) {
      setAcompanhamentos(acompanhamentos.filter((a) => a !== acomp));
    } else {
      setAcompanhamentos([...acompanhamentos, acomp]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return size !== null;
      case 2:
        return carnes.length > 0;
      case 3:
        return porcoes.length > 0;
      case 4:
        return feijao !== "";
      case 5:
        return true; // Acompanhamentos are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      showToast("Selecione pelo menos uma opção para continuar", "error");
      return;
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const handleAddToCart = () => {
    if (!size) return;

    const marmitaOrder: MarmitaOrder = {
      id: `marmita-${Date.now()}`,
      type: "marmita",
      size,
      sizePrice: MARMITA_PRICES[size],
      carnes,
      carnesExtras,
      porcoes,
      feijao,
      acompanhamentos,
      totalPrice,
      quantity: 1,
    };

    addToCart(marmitaOrder);
    showToast("Marmita adicionada ao carrinho!", "success");
    navigate("/carrinho");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Utensils size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Escolha o tamanho</h2>
              <p className="text-muted-foreground">
                Selecione o tamanho ideal para você
              </p>
            </div>

            <div className="space-y-4">
              {(["P", "M", "G"] as MarmitaSize[]).map((s) => {
                const info = MARMITA_INFO[s];
                return (
                  <button
                    key={s}
                    onClick={() => handleSelectSize(s)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 ${
                      size === s
                        ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl ${
                            size === s
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {s}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <Scale
                              size={14}
                              className="text-muted-foreground"
                            />
                            <span className="text-sm text-muted-foreground">
                              {info.peso}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <Users
                              size={14}
                              className="text-muted-foreground"
                            />
                            <span className="text-sm text-muted-foreground">
                              {info.pessoas}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">
                            {info.descricao}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-accent">
                          R$ {MARMITA_PRICES[s].toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Info */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
              <p className="text-sm text-center text-foreground">
                <span className="font-semibold text-accent">Dica:</span> Carnes
                especiais como Carne de Sol e Strogonoff têm acréscimo de R$
                2,00
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Escolha as carnes</h2>
              <p className="text-muted-foreground mt-1">
                Máximo 2 opções • {carnes.length}/2 selecionadas
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CARNES_OPTIONS.map(({ name, extra }) => (
                <SelectionChip
                  key={name}
                  label={name}
                  selected={carnes.includes(name)}
                  onClick={() => toggleCarne(name)}
                  disabled={carnes.length >= 2 && !carnes.includes(name)}
                  extra={extra}
                />
              ))}
            </div>
            {carnesExtras > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-center">
                <p className="text-sm text-foreground">
                  Acréscimo de carnes especiais:{" "}
                  <span className="font-bold text-accent">
                    +R$ {carnesExtras.toFixed(2).replace(".", ",")}
                  </span>
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Escolha as porções</h2>
              <p className="text-muted-foreground mt-1">
                Selecione as que desejar
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PORCOES_OPTIONS.map((porcao) => (
                <SelectionChip
                  key={porcao}
                  label={porcao}
                  selected={porcoes.includes(porcao)}
                  onClick={() => togglePorcao(porcao)}
                />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Escolha o feijão</h2>
              <p className="text-muted-foreground mt-1">Apenas 1 opção</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {FEIJAO_OPTIONS.map((f) => (
                <SelectionChip
                  key={f}
                  label={f}
                  selected={feijao === f}
                  onClick={() => setFeijao(f)}
                  variant="accent"
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Acompanhamentos</h2>
              <p className="text-muted-foreground mt-1">
                Selecione os que desejar (opcional)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ACOMPANHAMENTOS_OPTIONS.map((acomp) => (
                <SelectionChip
                  key={acomp}
                  label={acomp}
                  selected={acompanhamentos.includes(acomp)}
                  onClick={() => toggleAcompanhamento(acomp)}
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Resumo da Marmita</h2>
              <p className="text-muted-foreground">
                Confira seu pedido antes de adicionar
              </p>
            </div>

            <div className="card-item space-y-4">
              {/* Size */}
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {size}
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Tamanho
                    </span>
                    <p className="font-semibold">
                      {size && MARMITA_INFO[size].peso}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-lg">
                  R$ {size && MARMITA_PRICES[size].toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Carnes */}
              <div className="pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground block mb-2">
                  Carnes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {carnes.map((c) => {
                    const option = CARNES_OPTIONS.find((o) => o.name === c);
                    return (
                      <span
                        key={c}
                        className="bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        {c} {option?.extra ? `(+R$${option.extra})` : ""}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Porções */}
              <div className="pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground block mb-2">
                  Porções:
                </span>
                <div className="flex flex-wrap gap-2">
                  {porcoes.map((p) => (
                    <span
                      key={p}
                      className="bg-secondary px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feijão */}
              <div className="pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground block mb-2">
                  Feijão:
                </span>
                <span className="bg-accent/20 text-accent px-3 py-1.5 rounded-lg text-sm font-medium">
                  {feijao}
                </span>
              </div>

              {/* Acompanhamentos */}
              {acompanhamentos.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Acompanhamentos:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {acompanhamentos.map((a) => (
                      <span
                        key={a}
                        className="bg-secondary px-3 py-1.5 rounded-lg text-sm font-medium"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-5 flex justify-between items-center border border-accent/20">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-3xl font-extrabold text-accent">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        {/* Step indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={6}
          labels={STEP_LABELS}
        />

        {/* Current price */}
        {size && currentStep > 1 && currentStep < 6 && (
          <div className="text-center mb-6 bg-card/50 rounded-xl py-3 border border-border">
            <span className="text-muted-foreground">Subtotal: </span>
            <span className="text-accent font-bold text-lg">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
        )}

        {/* Step content */}
        <div className="min-h-[300px] pb-24">{renderStep()}</div>

        {/* Navigation buttons */}
        {currentStep > 1 && (
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
            <div className="container mx-auto max-w-lg">
              {currentStep === 6 ? (
                <button
                  onClick={handleAddToCart}
                  className="btn-accent w-full flex items-center justify-center gap-2 py-4 text-lg shadow-xl shadow-accent/40"
                >
                  <Check size={22} />
                  Adicionar ao Carrinho
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50 shadow-xl shadow-primary/30"
                >
                  Continuar
                  <ArrowRight size={22} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
