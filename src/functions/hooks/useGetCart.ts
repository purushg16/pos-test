import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart-client";
import useBillStore from "../store/billStore";
import convertToBill from "../conversions/convertToBill";

const useGetCart = (customer: string) => {
  const addBillEntry = useBillStore((s) => s.addBillEntries);
  const billType = useBillStore((s) => s.billType);

  return useQuery({
    queryKey: ["billing", "getCart", customer],
    queryFn: () =>
      getCart
        .getWithParams({
          params: {
            customer: customer,
          },
        })
        .then((res) => {
          res.data[0].product.map((product) =>
            addBillEntry(convertToBill(product.productId, billType!))
          );
        }),
    enabled: false,
    retry: 0,
  });
};
export default useGetCart;
