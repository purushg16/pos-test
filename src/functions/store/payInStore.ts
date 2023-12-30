import { create } from "zustand";
import { PayInItem } from "../services/PayInItem";
import PayInList from "../../components/AddPayIn/PayInList";

interface PayInStore {
  payInList: PayInItem[] | undefined;
  filteredPayIn: PayInItem[] | undefined;

  setPayInList: (items: PayInItem[]) => void;
  filterPayInList: (startDate: Date) => void;
  clearFilters: () => void;
}

const usePayInStore = create<PayInStore>((set) => ({
  payInList: undefined,
  filteredPayIn: undefined,
  setPayInList: (items) =>
    set(() => ({ payInList: items, filteredPayIn: items })),
  filterPayInList: (startDate) =>
    set((store) => ({
      filteredPayIn: store.payInList?.filter(
        (customer) => new Date(customer.createdAt) <= startDate
      ),
    })),
  clearFilters: () => set((store) => ({ filteredPayIn: store.payInList })),
}));

export default usePayInStore;
