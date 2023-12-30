import { CashFlow } from "../../components/entities/CashFlow";
import { APIGetClient } from "./api-client";

export default new APIGetClient<CashFlow>("/party/cashFlow");
