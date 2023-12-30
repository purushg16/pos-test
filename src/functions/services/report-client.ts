import { ReportData } from "../../components/entities/ReportData";
import { APIGetClient } from "./api-client";

const getReport = new APIGetClient<ReportData>("/billing/transactions");

export default getReport;
