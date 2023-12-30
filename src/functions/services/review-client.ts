import { Customer } from "../../components/entities/Customer";
import { Product } from "../../components/entities/Product";
import { APIGetClient, APIPostClient } from "./api-client";

interface PendingBillProducts {
  _id: string;
  itemName: string;
  stock: number;
  salesPrice: number;
  unit: string;
  topUnit: string;
  selectedUnit: number;
  code: number;
  zone: string;
}

export interface PendingBill {
  _id: string;
  billNo: number;
  billAmount: number;
  itemHandled: boolean;
  delivery: boolean;
  handler: string;
  createdAt: string;
  customer: Customer[];
  cart: [
    {
      _id: number;
      product: PendingBillProducts[];
    }
  ];
}

const getPendingBills = new APIGetClient<PendingBill>(
  "/billing/allPendingBills"
);

const postPendingBills = new APIPostClient("/billing/changeStatus");

export { getPendingBills, postPendingBills };
