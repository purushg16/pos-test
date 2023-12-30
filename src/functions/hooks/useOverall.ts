import { useQuery } from "@tanstack/react-query";
import overallClient from "../services/overall-client";

const useOverall = () =>
  useQuery({
    queryKey: ["party", "daysCashFlow"],
    queryFn: () => overallClient.getAll().then((res) => res.data),
    refetchOnWindowFocus: false,
  });

export default useOverall;
