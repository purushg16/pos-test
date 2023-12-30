import { APIGetClient } from "./api-client";

interface OverallData {
  _id: {
    nature: string;
    mode: "cash" | "upi";
  };
  totalAmount: number;
}

interface Overall {
  data1: OverallData[];
  data2: {
    totalBillAmount: number;
    salesTotal: number;
    creditTotal: number;
  };
}

export default new APIGetClient<Overall>("/party/daysCashFlow");
