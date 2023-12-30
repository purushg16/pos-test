import { Expense } from "../../components/entities/Expense";
import { APIPostClient } from "./api-client";

export default new APIPostClient<Expense>("/party/expense");
