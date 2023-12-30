import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts, postProduct } from "../services/inventory-services";
import { Product } from "../../components/entities/Product";
import useProductStore from "../store/ProductStore";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

interface Props {
  type: "GET" | "POST";
  product?: Product;
}

export const postNewProduct = (done: (status: boolean) => void) => {
  const toast = useToast();
  return useMutation({
    mutationFn: postProduct.postData,

    onSuccess: (res) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
    },

    onError: (err: AxiosError<AuthError>) => {
      toast({
        title: err.response?.data.err,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
    },
  });
};

const useProducts = ({ type, product }: Props) => {
  const { setProductList } = useProductStore();

  if (type === "POST") {
    if (product) {
      return useQuery({
        queryKey: ["products"],
        queryFn: () =>
          postProduct.postData(product).then((res) => {
            return res;
          }),
        staleTime: 0,
        enabled: false,
      });
    }
  }

  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getAllProducts.getAll().then((res) => {
        setProductList(res.data);
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
