import { createBrowserRouter } from "react-router-dom";
import PayInHome from "../components/AddPayIn/PayInHome";
import AddPayOutTable from "../components/AddPayOut/AddPayOutTable";
import Attendance from "../components/Attendence/Attendance";
import AttendanceReport from "../components/Attendence/AttendanceReport";
import AttendenceForm from "../components/Attendence/AttendenceForm";
import Authentication from "../components/Authentication/Authentication";
import Billing from "../components/Billings/Billing";
import CategoryForm from "../components/Category/CategoryForm";
import CustomerForm from "../components/Customers/CustomerForm";
import DrawingForm from "../components/Drawings/DrawingForm";
import EmployeeForm from "../components/Employee/EmployeeForm";
import { ErrorPage } from "../components/ErrorPage";
import ExpenseForm from "../components/Expense/ExpenseForm";
import Layout from "../components/Layout";
import ProductForm from "../components/Products/ProductForm";
import Reports from "../components/Reports/Reports";
import PendingBills from "../components/ReviewBills/PendingBills";
import StockForm from "../components/Stock/StockForm";
import { SuppliersForm } from "../components/Suppliers/SuppliersForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Billing /> },
      { path: "/addCustomer", element: <CustomerForm /> },
      { path: "/addProduct", element: <ProductForm /> },
      { path: "/addSupplier", element: <SuppliersForm /> },
      { path: "/addEmployee", element: <EmployeeForm /> },
      { path: "/addCategory", element: <CategoryForm /> },
      { path: "/addStock", element: <StockForm /> },
      { path: "/addPayIn", element: <PayInHome /> },
      { path: "/addPayOut", element: <AddPayOutTable /> },
      { path: "/addExpense", element: <ExpenseForm /> },
      { path: "/addDrawings", element: <DrawingForm /> },
      { path: "/attendance", element: <Attendance /> },
      { path: "/postAttendance", element: <AttendenceForm /> },
      { path: "/viewAttendance", element: <AttendanceReport /> },
      { path: "/reports", element: <Reports /> },
      { path: "/reviewBills", element: <PendingBills /> },
    ],
  },
  { path: "/login", element: <Authentication /> },
]);

export default router;
