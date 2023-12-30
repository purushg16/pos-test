import { EmployeeAttendence } from "../../components/entities/EmployeeAttendence";
import { Attendace } from "../../components/entities/attendace";
import { APIGetClient, APIPostClient } from "./api-client";

export interface PostAttendenceData {
  employeeData: EmployeeAttendence[];
}

const getAttendence = new APIGetClient<Attendace>("party/viewAttendance");

const postAttendence = new APIPostClient<PostAttendenceData>(
  "party/attendance"
);

export default { getAttendence, postAttendence };
