import { create } from "zustand";
import { Cart } from "../services/cart-client";

interface CartStoreType {
  cartItem: Cart | undefined;
  setCartItem: (cart: Cart) => void;
}

const cartStore = create<CartStoreType>((set) => ({
  cartItem: undefined,
  setCartItem: (cart) => set(() => ({ cartItem: cart })),
}));

export default cartStore;
