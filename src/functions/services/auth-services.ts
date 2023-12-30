import { APIPostClient } from "./api-client";

export interface Auth {
  userName: string;
  password: string;
}

const postAuth = new APIPostClient<Auth>("/user/login");
export default postAuth;
