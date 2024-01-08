import { useMutation, useQuery } from "@tanstack/react-query";
import { addCustomer, getAllCustomer } from "../services/customer-services";
import { Customer } from "../../components/entities/Customer";
import useCustomerStore from "../store/customerStore";
import { useToast } from "@chakra-ui/react";
import { AuthError } from "./useAuth";
import { AxiosError } from "axios";

interface Props {
  type: "GET" | "POST";
  customer?: Customer;
}

export const postNewCustomer = (done: (status: boolean) => void) => {
  const toast = useToast();
  const addNewCustomer = useCustomerStore((s) => s.addNewCustomer);

  return useMutation({
    mutationFn: addCustomer.postData,

    onSuccess: (res, data) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      addNewCustomer(data);
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

const useCustomers = ({ type, customer }: Props) => {
  const setCustomers = useCustomerStore((s) => s.setCustomers);

  if (type == "POST") {
    if (customer)
      return useQuery({
        queryKey: ["party", customer],
        queryFn: () => addCustomer.postData(customer).then((res) => res),
        enabled: false,
      });
  }

  return useQuery({
    queryKey: ["party", "allCustomers"],
    queryFn: () =>
      getAllCustomer.getAll().then((res) => setCustomers(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useCustomers;
