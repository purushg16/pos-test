import { useMutation, useQuery } from "@tanstack/react-query";
import attendenceServices, {
  PostAttendenceData,
} from "../services/attendence-services";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { AuthError } from "./useAuth";

interface Props {
  startDate: Date;
  endDate: Date;
}

const usePostAttendace = (done: (status: boolean) => void) => {
  const toast = useToast();

  return useMutation({
    mutationFn: attendenceServices.postAttendence.postData,
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

export { usePostAttendace };

const useAttendence = ({ startDate, endDate }: Props) =>
  useQuery({
    queryKey: ["party", "attendence", startDate, endDate],
    queryFn: () =>
      attendenceServices.getAttendence.getWithParams({
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      }),
    enabled: false,
  });

export default useAttendence;
