import { Supplier } from "./Supplier";

export interface PayingSupplier {
  _id: string;
  amount: number;
  billNo: number;
  createdAt: string;
  supplierId: Supplier;
  link?: string;
}
