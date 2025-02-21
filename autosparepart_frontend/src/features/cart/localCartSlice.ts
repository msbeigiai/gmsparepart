import { Cart, LocalCartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "shopping_cart";

const loadCartFromStorage = (): Cart => {
  if (typeof window === "undefined") return { items: [] };
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { items: [] };
};

const saveCartToStorage = (cart: Cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const initialState: Cart = loadCartFromStorage();

const localCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToLocalCart: (
      state,
      action: PayloadAction<{
        product: LocalCartItem["product"];
        quantity: number;
      }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.productId === product.productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId: product.productId, quantity, product });
      }
      saveCartToStorage(state);
    },
    removeFromLocalCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToStorage(state);
    },
    updateLocalQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToStorage(state);
    },
    clearLocalCart: (state) => {
      state.items = [];
      saveCartToStorage(state);
    },
  },
});

export const {
  addToLocalCart,
  removeFromLocalCart,
  updateLocalQuantity,
  clearLocalCart,
} = localCartSlice.actions;
export default localCartSlice.reducer;
