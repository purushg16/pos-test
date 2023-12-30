export interface BillingEntry {
  _id: string;
  productId: number;
  productName: string;
  salesPrice: number;
  billPrice: number;
  taxApplied: number;
  total: number;
  quantityPrice: number;
  taxPrice: number;
  priceWithoutTax: number;

  mrp: number;
  salesPriceWholesale: number;
  salesPriceRetail: number;

  unit: string;
  topUnit: string;
  unitConv: number;

  quantity: number;
  currentUnitValue: number | undefined;
  currentUnit: string | undefined;
}
