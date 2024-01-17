import { useMutation, useQuery } from "@tanstack/react-query";
import { addCustomer, getAllCustomer } from "../services/customer-services";
import useCustomerStore from "../store/customerStore";
import { useToast } from "@chakra-ui/react";
import { AuthError } from "./useAuth";
import { AxiosError } from "axios";

export const postNewCustomer = (done: (status: boolean) => void) => {
  const toast = useToast();
  const setCustomers = useCustomerStore((s) => s.setCustomers);

  return useMutation({
    mutationFn: addCustomer.postData,

    onSuccess: (res) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      getAllCustomer.getAll().then((res) => setCustomers(res.data));
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

const useGetCustomers = () => {
  const setCustomers = useCustomerStore((s) => s.setCustomers);

  return useQuery({
    queryKey: ["party", "allCustomers"],
    queryFn: () =>
      getAllCustomer.getAll().then((res) => setCustomers(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useGetCustomers;
