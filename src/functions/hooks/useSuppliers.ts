import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSuppliers, PostSupplier } from "../services/suppliers-services";
import useSupplierStore from "../store/suppliersStore";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";
import { useToast } from "@chakra-ui/react";

const usePostSupplier = (done: (status: boolean, success: boolean) => void) => {
  const setSuppliers = useSupplierStore((s) => s.setSuppliers);
  const toast = useToast();

  return useMutation({
    mutationFn: PostSupplier.postData,
    onSuccess: (res) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      GetSuppliers.getAll().then((res) => {
        setSuppliers(res.data);
      });
      done(false, true);
    },
    onError: (err: AxiosError<AuthError>) => {
      toast({
        title: err.response?.data.err,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false, false);
    },
  });
};

const useGetSupplier = () => {
  const setSuppliers = useSupplierStore((s) => s.setSuppliers);

  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () =>
      GetSuppliers.getAll().then((res) => {
        setSuppliers(res.data);
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export { useGetSupplier, usePostSupplier };
