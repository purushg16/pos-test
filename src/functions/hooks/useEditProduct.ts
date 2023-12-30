import { useMutation } from "@tanstack/react-query";
import editProductClient from "../services/edit-product-client";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";
import reportStore from "../store/reportStore";

const useEditProduct = (done: (status: boolean) => void) => {
  const toast = useToast();
  const editProduct = reportStore((s) => s.editProduct);

  return useMutation({
    mutationFn: editProductClient.postData,
    onSuccess: (res, data) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
      editProduct(data);
    },

    onError: (err: AxiosError<AuthError>) => {
      console.log(err);

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

export default useEditProduct;
