export interface CashFlow {
  _id: string;
  inOrOut: "in" | "out";
  amount: number;
  nature: "sale";
  mode: "upi" | "cash";
  description: string;
  createdAt: string;
}
