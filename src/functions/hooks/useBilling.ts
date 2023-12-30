import { useQuery } from "@tanstack/react-query";
import { postBills, getBills } from "../services/billing-services";
import { BillData } from "../../components/entities/BillData";
import useBillStore from "../store/billStore";
import { BillingEntry } from "../../components/entities/BillingEntry";
import useCustomerStore from "../store/customerStore";
import useEmployeStore from "../store/employeStore";
import useGSTStore from "../store/gstStore";

interface Props {
  type: "GET" | "POST";
}

const useGetBills = (startDate: Date, endDate: Date) =>
  useQuery({
    queryKey: ["billings", "allBills"],
    queryFn: () =>
      getBills.getWithParams({
        params: { startDate: startDate, endDate: endDate },
      }),
    refetchOnWindowFocus: false,
  });

export { useGetBills };

const useBilling = ({ type }: Props) => {
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

  const BillEntries = useBillStore((s) => s.BillEntries);

  const gstin = useGSTStore((s) => s.currentGstin);

  const billType = useBillStore((s) => s.billType);
  const biller = useEmployeStore((s) => s.currentBiller);
  const itemHandled = useBillStore((s) => s.itemHandled);
  const handler = useEmployeStore((s) => s.currentHandler);

  const partialAmount = useBillStore((s) => s.partialAmount);
  const partialPayment = useBillStore((s) => s.partialPayment);
  const paymentMode = useBillStore((s) => s.paymentMode);

  const itemDelivered = useBillStore((s) => s.itemDelivered);

  const BillProducts = BillEntries.map((entry) => ({
    productId: entry._id,
    stock: entry.quantity * entry.currentUnitValue!,
    salesPrice: entry.billPrice / entry.currentUnitValue!,
    selectedUnit: entry.currentUnitValue!,
  }));

  const billData: BillData = {
    customer: currentCustomer?._id!,
    billAmount: BillEntries.reduce(
      (acc, entry: BillingEntry) => acc + entry.total,
      0
    ),
    gstinNo: gstin?.gstinNo!,
    billType: billType!,
    billerName: biller?.name!,
    itemHandled: itemHandled,
    handler: handler?.name!,
    paymentMode: paymentMode!,
    payment: partialPayment!,
    partialAmount: partialAmount!,
    products: BillProducts,
    delivery: itemDelivered,
  };

  if (!billData) return;

  if (type === "POST") {
    return useQuery({
      queryKey: ["billing", billData],
      queryFn: () => postBills.postData(billData).then((res) => res),
      enabled: false,
    });
  }

  // return useQuery({
  //   queryKey: ["categories"],
  //   queryFn: () => PostBill.postData(billData).then((res) => res),
  //   staleTime: 0,
  //   refetchOnWindowFocus: false,
  // });
};

export default useBilling;
