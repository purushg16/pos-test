import { Category } from "../../components/entities/Category";
import { APIGetClient, APIPostClient } from "./api-client";

const GetCategory = new APIGetClient<Category>("/settings/allCategory");
const PostCategory = new APIPostClient<Category>("/settings/addCategory");

export { GetCategory, PostCategory };
