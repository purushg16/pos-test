import { PayOutType } from "../../components/entities/PayOutType";
import { PayingSupplier } from "../../components/entities/PayingSupplier";
import { APIGetClient, APIPostClient } from "./api-client";

const getPayables = new APIGetClient<PayingSupplier>("/party/acctPayable");
const postPayOut = new APIPostClient<PayOutType>("/party/payOut");

export { getPayables, postPayOut };
