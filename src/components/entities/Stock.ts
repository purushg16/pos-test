interface StockProducts {
  productId: string;
  purchasePrice: number;
  stock: number;
  selectedUnit: number;
}

export interface Stock {
  supplierId: string;
  amount: number;
  billNo: number;
  products: StockProducts[];
  link?: string;
}
