"use client";

import { createContext, useContext, useReducer } from "react";
import { CartItem } from "app/types/cart";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "TOGGLE_ITEM_SELECTION"; payload: string }
  | { type: "TOGGLE_ALL_SELECTION"; payload: boolean };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.payload.product.id
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.product.id ? action.payload : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    case "TOGGLE_ITEM_SELECTION":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload
            ? { ...item, selected: !item.selected }
            : item
        ),
      };
    case "TOGGLE_ALL_SELECTION":
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          selected: action.payload,
        })),
      };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
