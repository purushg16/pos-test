import { Employee } from "../../components/entities/Employee";
import { APIGetClient, APIPostClient } from "./api-client";

const GetEmployee = new APIGetClient<Employee>("/party/allEmployee");
const PostEmployee = new APIPostClient<Employee>("/party/addEmployee");

export { GetEmployee, PostEmployee };
