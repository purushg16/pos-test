export interface ReportData {
  _id?: string;
  billId: {
    _id: string;
    customer: {
      _id: string;
      name: string;
    };
    billerName: string;
  };
  productId: {
    _id: string;
    itemName: string;
    category: {
      _id: string;
      name: string;
    };
    taxRate: number;
  };
  supplierId: {
    _id: string;
    name: string;
  };
  purchasePrice: number;
  salesPrice: number;
  quantity: number;
  createdAt: string;
}
