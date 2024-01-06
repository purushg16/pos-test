import { useMutation, useQuery } from "@tanstack/react-query";
import { getPilferage, postPilferage } from "../services/pilferage-services";
import usePilferageStore from "../store/pilferageStore";

const usePostPilferage = () => {
  return useMutation({
    mutationFn: postPilferage.postData,
  });
};

const useGetPilferage = () => {
  const setPilferageList = usePilferageStore((s) => s.setPilferageList);

  return useQuery({
    queryKey: ["inventory", "allPilferage"],
    queryFn: () =>
      getPilferage.getAll().then((res) => setPilferageList(res.data)),
  });
};

export { usePostPilferage, useGetPilferage };
