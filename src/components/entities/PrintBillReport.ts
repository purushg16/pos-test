interface Customer {
  _id: string;
  name: string;
}

interface Product {
  productId: {
    _id: string;
    itemName: string;
    code: number;
    unit: string;
    topUnit: string;
    mrp: number;
  };
  stock: number;
  salesPrice: number;
  selectedUnit: number;
  _id: string;
}

interface Cart {
  _id: string;
  product: Product[];
}

interface Bill {
  _id: string;
  billNo: number;
  customer: Customer;
  billAmount: number;
  cart: Cart;
  gstinNo: string;
  billType: string;
  billerName: string;
  itemHandled: boolean;
  handler: string;
  delivery: boolean;
  paymentMode: string;
  payment: string;
  partialAmount: number | null;
  createdAt: string;
  __v: number;
}

interface BillsData {
  data: Bill[];
}

export default BillsData;
