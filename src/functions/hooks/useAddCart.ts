import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { postCart } from "../services/cart-client";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

const useAddCart = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: postCart.postData,
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

export default useAddCart;
