import { BillData } from "../../components/entities/BillData";
import { Customer } from "../../components/entities/Customer";
import { APIGetClient, APIPostClient } from "./api-client";

export interface BillReportProduct {
  productId: {
    _id: string;
    itemName: string;
    code: number;
    unit: string;
    topUnit: string;
    mrp: number;
  };
  selectedUnit: number;
  stock: number;
  salesPrice: number;
  _id: string;
}

export interface BillReport {
  _id: string;
  billNo: number;
  customer: Customer;
  billAmount: number;
  cart: {
    _id: string;
    product: BillReportProduct[];
    __v: 0;
    createdAt: string;
  };
  gstinNo: string;
  billType: string;
  billerName: string;
  itemHandled: boolean;
  handler: string;
  paymentMode: string;
  payment: string;
  partialAmount: number | null;
  createdAt: string;
  reversed?: boolean;
}

const getBills = new APIGetClient<BillReport>("/billing/allBills");
const postBills = new APIPostClient<BillData>("/billing/bill");

export { getBills, postBills };
