import { Customer } from "../../components/entities/Customer";
import { Supplier } from "../../components/entities/Supplier";
import { APIGetClient } from "./api-client";

export interface CrDrCart {
  productId: {
    _id: string;
    itemName: string;
    code: number;
    unit: string;
    topUnit: string;
  };
  stock: number;
  salesPrice?: number;
  purchasePrice?: number;
  selectedUnit?: number;
  _id: string;
}

export interface CrDrType {
  _id: string;
  crDr: "dr" | "cr";
  customerId: Customer;
  supplierId: Supplier;
  amount: number;
  description: string;
  cartId: {
    _id: string;
    product: CrDrCart[];
  } | null;
  money: "pending" | "paid";
  createdAt: string;
  __v: 0;
}

export default new APIGetClient<CrDrType>("/party/allCrDr");
