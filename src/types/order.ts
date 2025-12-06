export interface MarmitaOrder {
  id: string;
  type: "marmita";
  size: "P" | "M" | "G";
  sizePrice: number;
  carnes: string[];
  carnesExtras: number;
  porcoes: string[];
  feijao: string;
  acompanhamentos: string[];
  totalPrice: number;
  quantity: number;
}

export interface PratoOrder {
  id: string;
  type: "prato";
  name: string;
  description: string;
  price: number;
  quantity: number;
  sabor?: string;
}

export interface SobremesaOrder {
  id: string;
  type: "sobremesa";
  name: string;
  description: string;
  price: number;
  quantity: number;
  sabor?: string;
}

export type CartItem = MarmitaOrder | PratoOrder | SobremesaOrder;

export interface DeliveryInfo {
  type: "entrega" | "retirada";
  nome: string;
  rua: string;
  bairro: string;
  referencia: string;
}

export interface PaymentInfo {
  method: "cartao" | "pix" | "dinheiro";
  needsChange: boolean;
  changeAmount: number;
}

export interface OrderState {
  cart: CartItem[];
  delivery: DeliveryInfo | null;
  payment: PaymentInfo | null;
  observations: string;
}

export const MARMITA_PRICES = {
  P: 15,
  M: 18,
  G: 20,
} as const;

export const MARMITA_INFO = {
  P: {
    peso: "400g",
    pessoas: "",
    descricao: "Ideal para uma refeição individual",
  },
  M: {
    peso: "600g",
    pessoas: "",
    descricao: "Porção média, perfeita para compartilhar",
  },
  G: { peso: "800g", pessoas: "", descricao: "Porção generosa para a família" },
} as const;

export const CARNES_OPTIONS = [
  { name: "Frango Assado", extra: 0 },
  { name: "Boi Guisado", extra: 0 },
  { name: "Galinha Guisada", extra: 0 },
  { name: "Fígado Acebolado", extra: 0 },
  { name: "Carne de Sol", extra: 2 },
  { name: "Strogonoff", extra: 2 },
] as const;

export const PORCOES_OPTIONS = ["Arroz", "Macarrão", "Pirão"] as const;

export const FEIJAO_OPTIONS = ["Mulato", "Corda", "Preto"] as const;

export const ACOMPANHAMENTOS_OPTIONS = [
  "Vinagrete",
  "Purê",
  "Legumes",
  "Batata Frita",
  "Salada de Maionese",
] as const;

export const PRATOS_EXTRAS = [
  {
    name: "Macarrão à Bolonhesa",
    price: 20,
    description: "Porção generosa com molho tradicional caseiro.",
    image: "/images/macarrao-bolonhesa.jpg",
  },
  {
    name: "Camarão ao Molho Branco",
    price: 30,
    description: "Creme suave e camarões frescos selecionados.",
    image: "/images/camarao-molho-branco.jpg",
  },
  {
    name: "Parmegiana de Camarão",
    price: 35,
    description: "Camarões empanados com queijo gratinado e molho especial.",
    image: "/images/parmegiana-camarao.jpg",
  },
  {
    name: "Parmegiana de Frango",
    price: 20,
    description: "Filé empanado crocante com molho e queijo derretido.",
    image: "/images/parmegiana-frango.jpg",
  },
] as const;

export const SOBREMESAS = [
  {
    name: "Cone Trufado",
    price: 7,
    description:
      "Cone crocante recheado com trufa cremosa e cobertura especial.",
    image: "/images/cone-trufado.jpg",
    sabores: ["Oreo", "Prestígio", "Ninho com Nutella", "Brigadeiro"],
  },
  {
    name: "Bolo no Pote",
    price: 8,
    description: "Camadas de bolo macio com recheio cremoso no pote.",
    image: "/images/bolo-pote.jpg",
    sabores: [
      "Maracujá",
      "Limão",
      "Morango",
      "Bem Casado",
      "Prestígio",
      "Oreo",
    ],
  },
] as const;

export const DELIVERY_FEE = 2;
