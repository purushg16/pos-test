import { create } from "zustand";
import { CrDrType } from "../services/cr-dr-services";
import { list } from "@chakra-ui/react";

interface CrDrStoreType {
  crdrList: CrDrType[] | undefined;
  setCrDrList: (list: CrDrType[]) => void;

  filteredCrDr: CrDrType[] | undefined;
  filterCrDr: (supplier: boolean, id: string) => void;
}

const crdrStore = create<CrDrStoreType>((set) => ({
  crdrList: undefined,
  filteredCrDr: undefined,

  setCrDrList: (list) => set(() => ({ crdrList: list, filteredCrDr: list })),
  filterCrDr: (supplier, id) =>
    set((store) => ({
      filteredCrDr: store.crdrList
        ?.filter((list) => list.crDr === (supplier ? "cr" : "dr"))
        .filter((list1) =>
          supplier ? list1.supplierId._id === id : list1.customerId._id === id
        ),

      // supplier
      //     ? store.crdrList
      //         ?.filter((list) => list.crDr === "cr")
      //         .filter((list) => list.supplierId._id === id)
      //     : customer
      //     ? store.crdrList
      //         ?.filter((list) => list.crDr === "dr")
      //         ?.filter((list) => list.customerId._id === id)
      //     : undefined,
    })),
}));

export default crdrStore;
