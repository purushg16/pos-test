import { useQuery } from "@tanstack/react-query";
import getReport from "../services/report-client";

const useReport = (startDate: Date, endDate: Date) => {
  return useQuery({
    queryKey: ["billing", "transaction"],
    queryFn: () =>
      getReport
        .getWithParams({
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export default useReport;
