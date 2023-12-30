import { ProductReport } from "../../components/entities/ProductReport";
import { APIGetClient } from "./api-client";

const getProductReport = new APIGetClient<ProductReport>(
  "/inventory/allItemsReport"
);

export default getProductReport;
