import { create } from "zustand";
import { PendingBill } from "../services/review-client";
import { PostPendingBill } from "../hooks/useReview";

interface PendingBillsStoreType {
  pendingBills: PendingBill[] | undefined;
  setPendingBills: (bills: PendingBill[]) => void;
  settleBills: (bill: PostPendingBill) => void;
  addFailedBill: (bill: PendingBill) => void;

  currentFilter: string | undefined;
  filteredPendingBills: PendingBill[] | undefined;
  filterPendingBills: (handle?: boolean, delivery?: boolean) => void;
  clearFilter: () => void;
}

const PendingBillsStore = create<PendingBillsStoreType>((set) => ({
  pendingBills: undefined,
  filteredPendingBills: undefined,
  currentFilter: undefined,

  setPendingBills: (bills) =>
    set(() => ({ pendingBills: bills, filteredPendingBills: bills })),

  settleBills: (bill) =>
    set((store) => ({
      filteredPendingBills: store.pendingBills
        ?.map((fbill) =>
          bill.billNo === fbill.billNo
            ? {
                ...fbill,
                delivery: bill.delivery,
                itemHandled: bill.itemHandled,
              }
            : fbill
        )
        .filter((fbill) => !fbill.itemHandled || !fbill.delivery),

      pendingBills: store.pendingBills
        ?.map((fbill) =>
          bill.billNo === fbill.billNo
            ? {
                ...fbill,
                delivery: bill.delivery,
                itemHandled: bill.itemHandled,
              }
            : fbill
        )
        .filter((fbill) => !fbill.itemHandled || !fbill.delivery),
    })),

  addFailedBill: (bill) =>
    set((store) => ({
      filteredPendingBills: store.pendingBills?.splice(
        store.filteredPendingBills?.findIndex(
          (fbill) => fbill.createdAt > bill.createdAt
        )! || store.pendingBills.length,
        0,
        bill
      ),
    })),

  filterPendingBills: (handle = false, delivery = false) =>
    set((store) => ({
      filteredPendingBills: handle
        ? store.pendingBills?.filter((bills) => bills.itemHandled === false)
        : store.pendingBills?.filter((bills) => bills.delivery === false),
      currentFilter: handle ? "handle" : delivery ? "delivery" : undefined,
    })),

  clearFilter: () =>
    set((store) => ({
      filteredPendingBills: store.pendingBills,
      currentFilter: undefined,
    })),
}));

export default PendingBillsStore;
