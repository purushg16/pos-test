import { useQuery } from "@tanstack/react-query";
import getProductReport from "../services/product-client";
import reportStore from "../store/reportStore";

const useProductReport = () => {
  const setProductReportList = reportStore((s) => s.setProductReportList);

  useQuery({
    queryKey: ["inventory", "allItemsReport"],
    queryFn: () =>
      getProductReport.getAll().then((res) => setProductReportList(res.data)),
    refetchOnWindowFocus: false,
  });
};
export default useProductReport;
