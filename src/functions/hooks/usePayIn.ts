import { useQuery } from "@tanstack/react-query";
import postPayIn, { getPayIn } from "../services/payIn-services";
import { PayInType } from "../../components/entities/PayInType";
import usePayInStore from "../store/payInStore";

const usePayIn = (payIn: PayInType) => {
  if (payIn) {
    return useQuery({
      queryKey: ["categories"],
      queryFn: () => postPayIn.postData(payIn).then((res) => res),
      staleTime: 0,
      enabled: false,
    });
  }
};

export const useGetPayInList = () => {
  const set = usePayInStore((s) => s.setPayInList);
  useQuery({
    queryKey: ["party", "acctReceivable"],
    queryFn: () => getPayIn.getAll().then((res) => set(res.data)),
  });
};
export default usePayIn;
