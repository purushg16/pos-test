import { PayInType } from "../../components/entities/PayInType";
import { PayInItem } from "./PayInItem";
import { APIGetClient, APIPostClient } from "./api-client";

const postPayIn = new APIPostClient<PayInType>("/party/payIn");
const getPayIn = new APIGetClient<PayInItem>("/party/acctReceivable");
export { getPayIn };

export default postPayIn;
