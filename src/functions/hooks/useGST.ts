import { useQuery } from "@tanstack/react-query";
import { GetGST, PostGST } from "../services/gst-client";
import { GST } from "../../components/entities/GST";
import useGSTStore from "../store/gstStore";

interface Props {
  type: "GET" | "POST";
  gstin?: GST;
}

const useGST = ({ type, gstin }: Props) => {
  const setGSTList = useGSTStore((s) => s.setGSTList);

  if (type === "POST") {
    if (gstin)
      return useQuery({
        queryKey: ["settings", gstin],
        queryFn: () => PostGST.postData(gstin).then((res) => res),
        enabled: false,
      });
  }

  return useQuery({
    queryKey: ["settings", "allGstin"],
    queryFn: () => GetGST.getAll().then((res) => setGSTList(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useGST;
