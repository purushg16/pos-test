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
    _id: "658a93bff5be88d019640a29";
    product: BillReportProduct[];
    __v: 0;
    createdAt: "2023-12-27T10:58:35.463Z";
  };
  gstinNo: string;
  billType: string;
  billerName: string;
  itemHandled: boolean;
  handler: string;
  paymentMode: string;
  payment: string;
  partialAmount: string | null;
  createdAt: string;
  reversed?: boolean;
}

const getBills = new APIGetClient<BillReport>("/billing/allBills");
const postBills = new APIPostClient<BillData>("/billing/bill");

export { getBills, postBills };
