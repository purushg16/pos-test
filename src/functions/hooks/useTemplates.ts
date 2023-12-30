import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllTemplates, postTemplate } from "../services/template-services";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

const useGetTemplates = () =>
  useQuery({
    queryKey: ["billing", "importTemplate"],
    queryFn: () => getAllTemplates.getAll().then((res) => res.data),
    retry: 2,
    refetchOnWindowFocus: false,
  });

const usePostTemplates = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: postTemplate.postData,

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

export { useGetTemplates, usePostTemplates };
