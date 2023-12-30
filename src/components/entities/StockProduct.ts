export interface StockProduct {
  productId: string;
  purchasePrice: number;
  stock: number;

  productName?: string;
  code?: number;

  unit: string;
  topUnit: string;
  unitConv: number;

  quantity: number;
  currentUnitValue: number | undefined;
  currentUnit: string | undefined;
}
