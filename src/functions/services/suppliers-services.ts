import { Supplier } from "../../components/entities/Supplier";
import { APIGetClient, APIPostClient } from "./api-client";

const GetSuppliers = new APIGetClient<Supplier>("party/allSupplier");
const PostSupplier = new APIPostClient<Supplier>("party/addSupplier");

export { GetSuppliers, PostSupplier };
