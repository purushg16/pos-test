import { Employee } from "./Employee";

export interface Attendace {
  _id: string;
  date: string;
  employee: AttendaceEmployee[];
}

export interface AttendaceEmployee {
  checkIn: boolean;
  employeeId: Employee;
}
