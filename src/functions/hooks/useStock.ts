import { useMutation } from "@tanstack/react-query";
import postStock from "../services/stock-client";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

const useStock = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: postStock.postData,

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
export default useStock;
