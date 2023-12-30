import { useQuery } from "@tanstack/react-query";
import postStock from "../services/stock-client";
import { Stock } from "../../components/entities/Stock";

interface Props {
  stock: Stock;
}

const useStock = ({ stock }: Props) =>
  useQuery({
    queryKey: ["inventory"],
    queryFn: () =>
      postStock.postData(stock).then((res) => {
        return res;
      }),
    staleTime: 0,
    enabled: false,
  });

export default useStock;
