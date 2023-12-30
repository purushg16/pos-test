import { Customer } from "../../components/entities/Customer";
import { APIGetClient, APIPostClient } from "./api-client";

const getAllCustomer = new APIGetClient<Customer>("/party/allCustomer");
const addCustomer = new APIPostClient<Customer>("/party/addCustomer");

export { addCustomer, getAllCustomer };
