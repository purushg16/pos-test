import { useMutation, useQuery } from "@tanstack/react-query";
import { getPayables, postPayOut } from "../services/payOut-services";
import { PayOutType } from "../../components/entities/PayOutType";
import usePayableStore from "../store/payableStore";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

interface Props {
  type: "GET" | "POST";
  party?: PayOutType;
}

const usePostPayOut = (done: (status: boolean) => void, id: string) => {
  const toast = useToast();
  const removePayable = usePayableStore((s) => s.removePayable);

  return useMutation({
    mutationFn: postPayOut.postData,

    onSuccess: (res) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
      removePayable(id);
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

export { usePostPayOut };

const usePayOut = ({ type, party }: Props) => {
  const setPayablesList = usePayableStore((s) => s.setPayablesList);

  if (type === "POST") {
    if (party) {
      return useQuery({
        queryKey: ["party"],
        queryFn: () => postPayOut.postData(party).then((res) => res),
        staleTime: 0,
        enabled: false,
      });
    }
  }

  return useQuery({
    queryKey: ["party"],
    queryFn: () =>
      getPayables.getAll().then((res) => setPayablesList(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default usePayOut;
