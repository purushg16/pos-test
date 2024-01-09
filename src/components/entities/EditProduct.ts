export interface EditProduct {
  productId: string;
  itemName: string;
  unitConv: number;
  salesPriceWholesale: number;
  salesPriceRetail: number;
  taxRate: number;
  barCode: string;
  mrp: number;
  zone: number;
  critical: number;
}
