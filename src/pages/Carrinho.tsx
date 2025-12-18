import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  GlassWater,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useOrder } from "@/contexts/OrderContext";
import {
  MarmitaOrder,
  PratoOrder,
  SobremesaOrder,
  BebidaOrder,
  CartItem,
} from "@/types/order";

export default function Carrinho() {
  const navigate = useNavigate();
  const { state, removeFromCart, updateQuantity, getSubtotal, getCartCount } =
    useOrder();
  const { cart } = state;

  const renderCartItem = (item: CartItem) => {
    if (item.type === "marmita") {
      const marmita = item as MarmitaOrder;
      return (
        <div key={marmita.id} className="card-item">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">Marmita {marmita.size}</h3>
              <p className="text-sm text-muted-foreground">
                {marmita.carnes.join(", ")}
              </p>
              {marmita.carnesExtras > 0 && (
                <p className="text-xs text-accent">
                  +R${marmita.carnesExtras} extras
                </p>
              )}
            </div>
            <button
              onClick={() => removeFromCart(marmita.id)}
              className="p-2 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 mb-3">
            <p>Porções: {marmita.porcoes.join(", ")}</p>
            <p>Feijão: {marmita.feijao}</p>
            {marmita.acompanhamentos.length > 0 && (
              <p>Acomp: {marmita.acompanhamentos.join(", ")}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(marmita.id, Math.max(1, marmita.quantity - 1))
                }
                className="btn-secondary p-2"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">
                {marmita.quantity}
              </span>
              <button
                onClick={() => updateQuantity(marmita.id, marmita.quantity + 1)}
                className="btn-secondary p-2"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-accent font-bold text-lg">
              R${" "}
              {(marmita.totalPrice * marmita.quantity)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
        </div>
      );
    }

    if (item.type === "prato") {
      const prato = item as PratoOrder;
      return (
        <div key={prato.id} className="card-item">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold">{prato.name}</h3>
              <p className="text-sm text-muted-foreground">
                {prato.description}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(prato.id)}
              className="p-2 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(prato.id, Math.max(1, prato.quantity - 1))
                }
                className="btn-secondary p-2"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">
                {prato.quantity}
              </span>
              <button
                onClick={() => updateQuantity(prato.id, prato.quantity + 1)}
                className="btn-secondary p-2"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-accent font-bold">
              R$ {(prato.price * prato.quantity).toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      );
    }

    if (item.type === "sobremesa") {
      const sobremesa = item as SobremesaOrder;
      return (
        <div key={sobremesa.id} className="card-item">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold">{sobremesa.name}</h3>
              {sobremesa.sabor && (
                <p className="text-sm text-accent">Sabor: {sobremesa.sabor}</p>
              )}
            </div>
            <button
              onClick={() => removeFromCart(sobremesa.id)}
              className="p-2 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(
                    sobremesa.id,
                    Math.max(1, sobremesa.quantity - 1)
                  )
                }
                className="btn-secondary p-2"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">
                {sobremesa.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(sobremesa.id, sobremesa.quantity + 1)
                }
                className="btn-secondary p-2"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-accent font-bold">
              R${" "}
              {(sobremesa.price * sobremesa.quantity)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
        </div>
      );
    }

    if (item.type === "bebida") {
      // ADICIONE ESTE BLOCO PARA BEBIDAS
      const bebida = item as BebidaOrder;
      return (
        <div key={bebida.id} className="card-item">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <GlassWater className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold">{bebida.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {bebida.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(bebida.id)}
              className="p-2 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(bebida.id, Math.max(1, bebida.quantity - 1))
                }
                className="btn-secondary p-2"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">
                {bebida.quantity}
              </span>
              <button
                onClick={() => updateQuantity(bebida.id, bebida.quantity + 1)}
                className="btn-secondary p-2"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-accent font-bold">
              R$ {(bebida.price * bebida.quantity).toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag
              size={64}
              className="mx-auto text-muted-foreground mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Carrinho vazio</h2>
            <p className="text-muted-foreground mb-6">
              Adicione itens para fazer seu pedido
            </p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Ver Cardápio
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Continuar comprando</span>
        </button>

        <h1 className="text-2xl font-bold mb-6">
          Carrinho{" "}
          <span className="text-muted-foreground">({getCartCount()})</span>
        </h1>

        <div className="space-y-4 mb-24">{cart.map(renderCartItem)}</div>

        {/* Bottom bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <div className="container mx-auto max-w-lg">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-xl font-bold text-accent">
                  R$ {getSubtotal().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="btn-accent w-full"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
