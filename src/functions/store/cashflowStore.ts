import { create } from "zustand";
import { CashFlow } from "../../components/entities/CashFlow";

type nature = "sale" | "payIn" | "payOut" | "drawing" | "expense";
export type mode = "upi" | "cash";

interface cashflowStore {
  cashflowList: CashFlow[] | undefined;
  setCashflowList: (list: CashFlow[]) => void;

  currentNarture: nature | undefined;
  filteredCashFlowList: CashFlow[] | undefined;
  filterCashflow: (nature?: nature, mode?: mode) => void;
  clearFilters: () => void;

  reverse: () => void;
}

const cashFlowStore = create<cashflowStore>((set) => ({
  cashflowList: undefined,
  filteredCashFlowList: undefined,
  currentNarture: undefined,

  setCashflowList: (list) =>
    set(() => ({
      cashflowList: list,
      filteredCashFlowList: list,
      currentNarture: undefined,
    })),

  filterCashflow: (nature, mode) =>
    set((store) => ({
      filteredCashFlowList:
        !!nature && !!mode
          ? store.cashflowList?.find((entry) => entry.nature === nature)
            ? store.cashflowList?.filter(
                (entry) => entry.nature === nature && entry.mode === mode
              )
            : []
          : !!!nature && !!mode
          ? store.cashflowList?.filter((entry) => entry.mode === mode)
          : store.cashflowList?.filter((entry) => entry.nature === nature),
      currentNarture: nature,
    })),

  clearFilters: () =>
    set((store) => ({
      filteredCashFlowList: store.cashflowList,
      currentNarture: undefined,
    })),

  reverse: () =>
    set((store) => ({
      filteredCashFlowList: store.filteredCashFlowList?.map(
        (item, idx) =>
          store.filteredCashFlowList![
            store.filteredCashFlowList!.length - 1 - idx
          ]
      ),
    })),
}));

export default cashFlowStore;
