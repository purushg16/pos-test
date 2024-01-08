import { useMutation } from "@tanstack/react-query";
import reverseServices from "../services/reverse-services";
import { useToast } from "@chakra-ui/react";
import { AuthError } from "./useAuth";
import { AxiosError } from "axios";

const useReverseBill = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: reverseServices.postData,

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
      console.log(err);

      toast({
        title: err.response?.data.err || err.response?.data.message,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
    },
  });
};

export default useReverseBill;
