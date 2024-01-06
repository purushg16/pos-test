import { create } from "zustand";
import { PilferageData } from "../../components/entities/Pilferage";

interface PilferageStore {
  pilferageList: PilferageData[] | undefined;
  filteredPilferageList: PilferageData[] | undefined;
  setPilferageList: (data: PilferageData[]) => void;
}

const usePilferageStore = create<PilferageStore>((set) => ({
  pilferageList: undefined,
  filteredPilferageList: undefined,
  setPilferageList: (list) =>
    set(() => ({ pilferageList: list, filteredPilferageList: list })),
}));

export default usePilferageStore;
