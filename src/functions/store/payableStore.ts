import { create } from "zustand";
import { PayingSupplier } from "../../components/entities/PayingSupplier";

interface PayableStoreType {
  payablesList: PayingSupplier[] | undefined;
  filteredPayables: PayingSupplier[] | undefined;

  filterPayables: (date: number) => void;
  setPayablesList: (payables: PayingSupplier[]) => void;
  clearFilters: () => void;

  removePayable: (payableId: string) => void;

  selectedParty: PayingSupplier | undefined;
  setPayableParty: (p: PayingSupplier) => void;
}

const usePayableStore = create<PayableStoreType>((set) => ({
  payablesList: undefined,
  filteredPayables: undefined,
  selectedParty: undefined,

  filterPayables: (startDate) =>
    set((store) => ({
      filteredPayables: store.payablesList?.filter(
        (customer) =>
          new Date(customer.createdAt).setHours(0, 0, 0, 0) <= startDate
      ),
    })),

  clearFilters: () =>
    set((store) => ({ filteredPayables: store.payablesList })),

  removePayable: (payableId) =>
    set((store) => ({
      payablesList: store.payablesList?.filter(
        (entry) => entry._id !== payableId
      ),
    })),
  setPayableParty: (party) => set(() => ({ selectedParty: party })),
  setPayablesList: (payables) =>
    set(() => ({ payablesList: payables, filteredPayables: payables })),
}));

export default usePayableStore;
