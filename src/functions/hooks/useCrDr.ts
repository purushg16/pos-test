import { useQuery } from "@tanstack/react-query";
import crDrServices from "../services/cr-dr-services";
import crdrStore from "../store/crdrStore";

const useCrDr = (startDate: Date, endDate: Date) => {
  const setCrDrList = crdrStore((s) => s.setCrDrList);

  return useQuery({
    queryKey: ["party", "allCrDr"],
    queryFn: () =>
      crDrServices
        .getWithParams({
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((res) => setCrDrList(res.data)),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};

export default useCrDr;
