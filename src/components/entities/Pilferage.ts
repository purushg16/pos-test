import { Product } from "./Product";

export interface PostPilferage {
  productId: string;
  quantity: number;
  reason: string;
}

export interface PilferageData {
  productId: Product;
  reason: string;
  quantity: number;
}
