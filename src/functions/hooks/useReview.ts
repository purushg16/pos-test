import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  PendingBill,
  getPendingBills,
  postPendingBills,
} from "../services/review-client";
import PendingBillsStore from "../store/pendingBillsStore";
import { AuthError } from "./useAuth";

interface Props {
  type: "GET" | "POST";
  data?: {
    billNo: number;
    itemHandled: boolean;
    delivery: boolean;
  };
}

interface Review {
  msg: string | undefined;
  err: string | undefined;
}

export interface PostPendingBill {
  billNo: number;
  itemHandled: boolean;
  delivery: boolean;
}

const useSettlePending = (
  done: (status: boolean) => void,
  bill: PendingBill,
  postStatus: PostPendingBill
) => {
  const addFailedBill = PendingBillsStore((s) => s.addFailedBill);
  const settleBills = PendingBillsStore((s) => s.settleBills);
  const toast = useToast();

  return useMutation({
    mutationFn: postPendingBills.postData,

    // onMutate: (sentBill: PostPendingBill) => {},

    onSuccess: (res) => {
      toast({
        title: res.msg,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      done(false);
      settleBills(postStatus);
    },

    onError: (err: AxiosError<AuthError>) => {
      toast({
        title: err.response?.data.err,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      addFailedBill(bill);
      done(false);
    },
  });
};

export { useSettlePending };

const useReview = ({ type, data }: Props) => {
  const setPendingBills = PendingBillsStore((s) => s.setPendingBills);

  if (type === "POST" && data)
    return useQuery({
      queryKey: ["billing", data],
      queryFn: () =>
        postPendingBills.postData(data).then((res) => res as Review),
      enabled: false,
    });

  return useQuery({
    queryKey: ["billing", "allPendingBills"],
    queryFn: () =>
      getPendingBills.getAll().then((res) => setPendingBills(res.data)),
    refetchOnWindowFocus: false,
  });
};
export default useReview;
