import { ProductSupplier } from "./ProductSupplier";

export interface Product {
  _id?: string;
  itemName: string;
  barCode: string;
  code: number;
  unit: string;
  topUnit: string;
  unitConv: number;
  category: string;
  salesPriceRetail: number;
  salesPriceWholesale: number;
  taxRate: number;
  mrp: number;
  zone: string;
  suppliers?: ProductSupplier[];

  critical?: number;
}
