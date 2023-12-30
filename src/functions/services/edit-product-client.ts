import { EditProduct } from "../../components/entities/EditProduct";
import { APIPostClient } from "./api-client";

export default new APIPostClient<EditProduct>("/inventory/editItem");
