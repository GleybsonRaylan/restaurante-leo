import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  Store,
  CreditCard,
  Smartphone,
  Banknote,
  Send,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useOrder } from "@/contexts/OrderContext";
import { showToast } from "@/components/Toast";
import {
  DeliveryInfo,
  PaymentInfo,
  DELIVERY_FEE,
  MarmitaOrder,
  PratoOrder,
  SobremesaOrder,
  BebidaOrder, // ADICIONE ESTA IMPORT
} from "@/types/order";

export default function Checkout() {
  const navigate = useNavigate();
  const {
    state,
    setDelivery,
    setPayment,
    setObservations,
    getSubtotal,
    getTotal,
    clearCart,
  } = useOrder();
  const { cart, observations } = state;

  const [deliveryType, setDeliveryType] = useState<
    "entrega" | "retirada" | null
  >(null);
  const [nome, setNome] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [referencia, setReferencia] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cartao" | "pix" | "dinheiro" | null
  >(null);
  const [needsChange, setNeedsChange] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  const [obs, setObs] = useState(observations);

  const deliveryFee = deliveryType === "entrega" ? DELIVERY_FEE : 0;
  const total = getSubtotal() + deliveryFee;

  const troco = useMemo(() => {
    if (!needsChange || !changeAmount) return 0;
    const amount = parseFloat(changeAmount.replace(",", "."));
    return Math.max(0, amount - total);
  }, [needsChange, changeAmount, total]);

  const isFormValid = () => {
    if (!deliveryType) return false;
    if (!nome.trim()) return false;
    if (deliveryType === "entrega" && (!rua.trim() || !bairro.trim()))
      return false;
    if (!paymentMethod) return false;
    if (paymentMethod === "dinheiro" && needsChange && !changeAmount)
      return false;
    return true;
  };

  const generateWhatsAppMessage = () => {
    let message = "*Pedido — Pizzaria e Hamburgueria do Léo*\n\n";

    cart.forEach((item, index) => {
      if (item.type === "marmita") {
        const m = item as MarmitaOrder;
        message += `👉 *Marmita ${m.size}* — R$${m.sizePrice
          .toFixed(2)
          .replace(".", ",")}\n`;
        message += `   Carnes: ${m.carnes.join(", ")}`;
        if (m.carnesExtras > 0)
          message += ` (+R$${m.carnesExtras.toFixed(2).replace(".", ",")})`;
        message += "\n";
        message += `   Porções: ${m.porcoes.join(", ")}\n`;
        message += `   Feijão: ${m.feijao}\n`;
        if (m.acompanhamentos.length > 0) {
          message += `   Acompanhamentos: ${m.acompanhamentos.join(", ")}\n`;
        }
        if (m.quantity > 1) message += `   Qtd: ${m.quantity}\n`;
        message += `   *Subtotal: R$${(m.totalPrice * m.quantity)
          .toFixed(2)
          .replace(".", ",")}*\n\n`;
      } else if (item.type === "prato") {
        const p = item as PratoOrder;
        message += `👉 *${p.name}* — R$${p.price.toFixed(2).replace(".", ",")}`;
        if (p.quantity > 1) message += ` x${p.quantity}`;
        message += "\n\n";
      } else if (item.type === "sobremesa") {
        const s = item as SobremesaOrder;
        message += `👉 *${s.name}*`;
        if (s.sabor) message += ` (${s.sabor})`;
        message += ` — R$${s.price.toFixed(2).replace(".", ",")}`;
        if (s.quantity > 1) message += ` x${s.quantity}`;
        message += "\n\n";
      } else if (item.type === "bebida") {
        // ADICIONE ESTE BLOCO
        const b = item as BebidaOrder;
        message += `👉 *${b.name}* — R$${b.price.toFixed(2).replace(".", ",")}`;
        if (b.quantity > 1) message += ` x${b.quantity}`;
        message += `\n   ${b.description}\n\n`;
      }
    });

    if (deliveryType === "entrega") {
      message += `🏍️ *Entrega* — +R$${DELIVERY_FEE.toFixed(2).replace(
        ".",
        ","
      )}\n`;
      message += `Nome: ${nome}\n`;
      message += `Rua: ${rua}\n`;
      message += `Bairro: ${bairro}\n`;
      if (referencia) message += `Ponto de referência: ${referencia}\n`;
    } else {
      message += `🏪 *Retirada no local*\n`;
      message += `Nome: ${nome}\n`;
    }

    message += "\n";

    const paymentLabels = {
      cartao: "Cartão",
      pix: "PIX",
      dinheiro: "Dinheiro",
    };
    message += `💳 *Forma de pagamento:* ${paymentLabels[paymentMethod!]}\n`;

    if (paymentMethod === "pix") {
      message += `_Pagamento via PIX — confirmação será tratada pelo WhatsApp_\n`;
    }

    message += `\n💰 *Total: R$${total.toFixed(2).replace(".", ",")}*\n`;

    if (paymentMethod === "dinheiro" && needsChange) {
      message += `💵 *Precisa de troco:* Sim\n`;
      message += `   Vai pagar com: R$${changeAmount}\n`;
      message += `   Troco: R$${troco.toFixed(2).replace(".", ",")}\n`;
    } else if (paymentMethod === "dinheiro") {
      message += `💵 *Precisa de troco:* Não\n`;
    }

    if (obs.trim()) {
      message += `\n📝 *Observações:* ${obs}\n`;
    }

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }

    // Save delivery info
    const deliveryInfo: DeliveryInfo = {
      type: deliveryType!,
      nome,
      rua,
      bairro,
      referencia,
    };
    setDelivery(deliveryInfo);

    // Save payment info
    const paymentInfo: PaymentInfo = {
      method: paymentMethod!,
      needsChange,
      changeAmount: parseFloat(changeAmount.replace(",", ".")) || 0,
    };
    setPayment(paymentInfo);
    setObservations(obs);

    // Generate message and redirect
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5581997615125?text=${message}`;

    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, "_blank");
    navigate("/");
    showToast("Pedido enviado! Finalize pelo WhatsApp.", "success");
  };

  if (cart.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 pb-32">
        <button
          onClick={() => navigate("/carrinho")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao carrinho</span>
        </button>

        <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>

        {/* Delivery Type */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Tipo de entrega</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeliveryType("entrega")}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                deliveryType === "entrega"
                  ? "border-primary bg-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <Truck
                size={28}
                className={
                  deliveryType === "entrega"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              />
              <span className="font-semibold">Entrega</span>
              <span className="text-xs text-accent">+R$2,00</span>
            </button>
            <button
              onClick={() => setDeliveryType("retirada")}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                deliveryType === "retirada"
                  ? "border-primary bg-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <Store
                size={28}
                className={
                  deliveryType === "retirada"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              />
              <span className="font-semibold">Retirada</span>
              <span className="text-xs text-muted-foreground">Sem taxa</span>
            </button>
          </div>
        </section>

        {/* Customer Info */}
        {deliveryType && (
          <section className="mb-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-3">Seus dados</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Nome completo <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="input-field"
                  placeholder="Seu nome"
                />
              </div>

              {deliveryType === "entrega" && (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Rua <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      className="input-field"
                      placeholder="Rua, número"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Bairro <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className="input-field"
                      placeholder="Bairro"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Ponto de referência
                    </label>
                    <input
                      type="text"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                      className="input-field"
                      placeholder="Opcional"
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Payment Method */}
        {deliveryType && (
          <section className="mb-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-3">Forma de pagamento</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("cartao")}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "cartao"
                    ? "border-primary bg-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <CreditCard
                  size={24}
                  className={
                    paymentMethod === "cartao"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <span className="text-sm font-medium">Cartão</span>
              </button>
              <button
                onClick={() => setPaymentMethod("pix")}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "pix"
                    ? "border-primary bg-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <Smartphone
                  size={24}
                  className={
                    paymentMethod === "pix"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <span className="text-sm font-medium">PIX</span>
              </button>
              <button
                onClick={() => setPaymentMethod("dinheiro")}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "dinheiro"
                    ? "border-primary bg-primary/20"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <Banknote
                  size={24}
                  className={
                    paymentMethod === "dinheiro"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <span className="text-sm font-medium">Dinheiro</span>
              </button>
            </div>

            {/* Change */}
            {paymentMethod === "dinheiro" && (
              <div className="mt-4 p-4 bg-card rounded-xl border border-border animate-fade-in">
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={needsChange}
                    onChange={(e) => setNeedsChange(e.target.checked)}
                    className="w-5 h-5 rounded border-border"
                  />
                  <span>Precisa de troco?</span>
                </label>
                {needsChange && (
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Vai pagar com quanto?
                    </label>
                    <input
                      type="text"
                      value={changeAmount}
                      onChange={(e) => setChangeAmount(e.target.value)}
                      className="input-field"
                      placeholder="Ex: 50,00"
                    />
                    {troco > 0 && (
                      <p className="text-accent font-semibold mt-2">
                        Troco: R$ {troco.toFixed(2).replace(".", ",")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Observations */}
        {deliveryType && paymentMethod && (
          <section className="mb-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-3">Observações</h2>
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="input-field min-h-[100px] resize-none"
              placeholder="Alguma observação sobre o pedido?"
            />
          </section>
        )}

        {/* Summary and Submit */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <div className="container mx-auto max-w-lg">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>R$ {getSubtotal().toFixed(2).replace(".", ",")}</span>
                </div>
                {deliveryType === "entrega" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Taxa de entrega:
                    </span>
                    <span>R$ {DELIVERY_FEE.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                  <span>Total:</span>
                  <span className="text-accent">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={20} />
                Enviar Pedido pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
