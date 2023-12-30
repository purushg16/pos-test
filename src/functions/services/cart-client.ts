import { Product } from "../../components/entities/Product";
import { APIGetClient, APIPostClient } from "./api-client";

export interface CartProduct {
  productId: Product;
  stock: number;
  selectedUnit: number;
}

export interface Cart {
  product: CartProduct[];
  customerId: string;
}

interface PostCartProduct {
  productId: string;
  stock: number;
  selectedUnit: number;
}

interface PostCart {
  products: PostCartProduct[];
  customer: string;
}

const getCart = new APIGetClient<Cart>("/billing/getCart");
const postCart = new APIPostClient<PostCart>("/billing/addCart");

export { getCart, postCart };
