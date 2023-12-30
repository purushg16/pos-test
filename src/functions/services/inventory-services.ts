import { Product } from "../../components/entities/Product";
import { APIGetClient, APIPostClient } from "./api-client";

const getAllProducts = new APIGetClient<Product>("/inventory/allItems");
const postProduct = new APIPostClient<Product>("/inventory/addItem");

export { getAllProducts, postProduct };
