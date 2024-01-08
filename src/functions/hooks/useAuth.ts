import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import postAuth from "../services/auth-services";
import useTokenStore from "../store/token";
import { jwtDecode } from "jwt-decode";

export interface AuthError {
  err: string;
  message: string;
}

const useAuth = (done: (yes: boolean) => void) => {
  const setCurrentUserType = useTokenStore((s) => s.setCurrentUserType);
  const toast = useToast();

  return useMutation({
    mutationFn: postAuth.login,
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      setCurrentUserType(
        (jwtDecode(res.token) as { userName: string }).userName
      );
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

    // enabled: false,
    // staleTime: 0,
    // retry: false,

    // onSuccess: (res) => {
    //   sessionStorage.setItem("token", res.token);
    // },

    // onError: (err: AxiosError<AuthError>) => {
    //   sessionStorage.clear();
    //   setSucces(false);
    // },
  });

  // return useQuery({
  //   queryKey: ["user", userName, password],
  //   queryFn: () => postAuth.postData({ userName, password }).then((res) => res),

  //   enabled: false,
  //   staleTime: 0,
  //   retry: false,

  //   onSuccess: (res) => {
  //     sessionStorage.setItem("token", res.token);
  //   },

  //   onError: (err: AxiosError<AuthError>) => {
  //     sessionStorage.clear();
  //     setSucces(false);
  //   },
  // });
};

export default useAuth;
