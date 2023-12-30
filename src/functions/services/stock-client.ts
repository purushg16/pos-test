import { Stock } from "../../components/entities/Stock";
import { APIPostClient } from "./api-client";

const postStock = new APIPostClient<Stock>("/inventory/addStock");

export default postStock;
