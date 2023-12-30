import { create } from "zustand";
import { CashFlow } from "../../components/entities/CashFlow";

type nature = "sale" | "payIn" | "payOut" | "drawing" | "expense";

interface cashflowStore {
  cashflowList: CashFlow[];
  setCashflowList: (list: CashFlow[]) => void;

  currentNarture: nature | undefined;
  filteredCashFlowList: CashFlow[] | undefined;
  filterCashflow: (nature: nature) => void;

  reverse: () => void;
}

const cashFlowStore = create<cashflowStore>((set) => ({
  cashflowList: [],
  filteredCashFlowList: [],
  currentNarture: undefined,

  setCashflowList: (list) =>
    set(() => ({
      cashflowList: list,
      filteredCashFlowList: list,
      currentNarture: undefined,
    })),

  filterCashflow: (nature) =>
    set((store) => ({
      filteredCashFlowList: store.cashflowList.find(
        (entry) => entry.nature === nature
      )
        ? store.cashflowList.filter((entry) => entry.nature === nature)
        : undefined,
      currentNarture: nature,
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
