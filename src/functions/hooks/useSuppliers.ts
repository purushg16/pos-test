import { useQuery } from "@tanstack/react-query";
import { GetSuppliers, PostSupplier } from "../services/suppliers-services";
import useSupplierStore from "../store/suppliersStore";
import { Supplier } from "../../components/entities/Supplier";

interface Props {
  type: "GET" | "POST";
  supplier?: Supplier;
}

const useSuppliers = ({ type, supplier }: Props) => {
  const setSuppliers = useSupplierStore((s) => s.setSuppliers);

  if (type === "POST") {
    if (supplier) {
      return useQuery({
        queryKey: ["suppliers", supplier],
        queryFn: () =>
          PostSupplier.postData(supplier).then((res) => {
            console.log(res);
            return res;
          }),
        staleTime: 0,
        enabled: false,
      });
    }
  }

  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () =>
      GetSuppliers.getAll().then((res) => {
        setSuppliers(res.data);
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useSuppliers;
