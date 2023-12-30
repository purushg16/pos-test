import { Drawing } from "../../components/entities/Drawing";
import { APIPostClient } from "./api-client";

export default new APIPostClient<Drawing>("/party/drawing");
