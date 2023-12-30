import { APIPostClient } from "./api-client";

export interface ReverseBill {
  billNo: number;
  mode: string;
}

export default new APIPostClient<ReverseBill>("/billing/billReverse");
