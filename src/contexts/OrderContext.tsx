import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, DeliveryInfo, PaymentInfo, OrderState, DELIVERY_FEE } from '@/types/order';

type OrderAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DELIVERY'; payload: DeliveryInfo }
  | { type: 'SET_PAYMENT'; payload: PaymentInfo }
  | { type: 'SET_OBSERVATIONS'; payload: string }
  | { type: 'LOAD_STATE'; payload: OrderState };

const initialState: OrderState = {
  cart: [],
  delivery: null,
  payment: null,
  observations: '',
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], delivery: null, payment: null, observations: '' };
    case 'SET_DELIVERY':
      return { ...state, delivery: action.payload };
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    case 'SET_OBSERVATIONS':
      return { ...state, observations: action.payload };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface OrderContextType {
  state: OrderState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDelivery: (delivery: DeliveryInfo) => void;
  setPayment: (payment: PaymentInfo) => void;
  setObservations: (observations: string) => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getCartCount: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pizzaria-leo-order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to parse saved order');
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('pizzaria-leo-order', JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id: string, quantity: number) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const setDelivery = (delivery: DeliveryInfo) => dispatch({ type: 'SET_DELIVERY', payload: delivery });
  const setPayment = (payment: PaymentInfo) => dispatch({ type: 'SET_PAYMENT', payload: payment });
  const setObservations = (observations: string) => dispatch({ type: 'SET_OBSERVATIONS', payload: observations });

  const getSubtotal = () => {
    return state.cart.reduce((total, item) => {
      if (item.type === 'marmita') {
        return total + item.totalPrice * item.quantity;
      }
      return total + item.price * item.quantity;
    }, 0);
  };

  const getDeliveryFee = () => {
    return state.delivery?.type === 'entrega' ? DELIVERY_FEE : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const getCartCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setDelivery,
        setPayment,
        setObservations,
        getSubtotal,
        getDeliveryFee,
        getTotal,
        getCartCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
