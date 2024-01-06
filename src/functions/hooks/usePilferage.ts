import { useMutation, useQuery } from "@tanstack/react-query";
import { getPilferage, postPilferage } from "../services/pilferage-services";
import usePilferageStore from "../store/pilferageStore";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

const usePostPilferage = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: postPilferage.postData,
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

const useGetPilferage = () =>
  useQuery({
    queryKey: ["inventory", "allPilferage"],
    queryFn: () => getPilferage.getAll().then((res) => res.data),
  });

export { usePostPilferage, useGetPilferage };
