import { useQuery } from "@tanstack/react-query";
import cashflowServices from "../services/cashflow-services";
import cashFlowStore from "../store/cashflowStore";

const useCashFlow = (startDate: Date, endDate: Date) => {
  const setCashflowList = cashFlowStore((s) => s.setCashflowList);

  return useQuery({
    queryKey: ["party", "cashFlow"],
    queryFn: () =>
      cashflowServices
        .getWithParams({
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((res) => setCashflowList(res.data)),
    staleTime: 0,
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
export default useCashFlow;
