export interface ProductReport {
  _id: string;
  itemName: string;
  barCode: number;
  code: number;
  unit: string;
  topUnit: string;
  unitConv: number;
  category: {
    _id: string;
    name: string;
  };
  salesPriceWholesale: number;
  salesPriceRetail: number;
  taxRate: number;
  mrp: number;
  zone: string;
  suppliers: ProductReportSupplier[];
  __v: 0;
  critical: number;
}

interface ProductReportSupplier {
  supplierId: {
    _id: string;
    name: string;
  };
  purchasePrice: number;
  stock: number;
  createdAt: string;
  _id: string;
}
