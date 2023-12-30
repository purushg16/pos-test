export interface CashFlow {
  _id: string;
  inOrOut: "in" | "out";
  amount: number;
  nature: "sale";
  mode: "UPI" | "Cash";
  description: string;
  createdAt: string;
}
