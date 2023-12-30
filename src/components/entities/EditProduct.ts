export interface EditProduct {
  productId: string;
  itemName: string;
  unitConv: number;
  salesPriceWholesale: number;
  salesPriceRetail: number;
  taxRate: number;
  mrp: number;
  zone: string;
  critical: number;
}
