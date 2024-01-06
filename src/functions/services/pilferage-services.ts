import { PostPilferage } from "../../components/entities/Pilferage";
import { PilferageData } from "../../components/entities/Pilferage";
import { APIGetClient, APIPostClient } from "./api-client";

const getPilferage = new APIGetClient<PilferageData>("/inventory/allPilferage");
const postPilferage = new APIPostClient<PostPilferage>(
  "/inventory/addPilferage"
);

export { getPilferage, postPilferage };
