import { useQuery } from "@tanstack/react-query";
import { Expense } from "../../components/entities/Expense";
import expenseClient from "../services/expense-client";

const useExpense = (expense: Expense) =>
  useQuery({
    queryKey: ["party", "expense"],
    queryFn: () => expenseClient.postData(expense).then((res) => res),
    enabled: false,
  });

export default useExpense;
