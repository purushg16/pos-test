import { GST } from "../../components/entities/GST";
import { APIGetClient, APIPostClient } from "./api-client";

const GetGST = new APIGetClient<GST>("/settings/allGstin");
const PostGST = new APIPostClient<GST>("/settings/addGstin");

export { GetGST, PostGST };
