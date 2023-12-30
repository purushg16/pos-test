export interface PayInItem {
  _id: string;
  billId: {
    _id: string;
    billNo: number;
  };
  payable: number;
  customer: {
    _id: string;
    name: string;
    phone: number;
    balance: number;
  };
  createdAt: string;
}
