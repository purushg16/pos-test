import { create } from "zustand";
import { Supplier } from "../../components/entities/Supplier";

interface SupplierStore {
  suppliersList: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;

  selectSupplier: (name: string) => void;
  selectedSuppliers: Supplier[] | undefined;

  currentSupplier: Supplier | undefined;
  setCurrentSupplier: (supplier: Supplier | undefined) => void;
}

const useSupplierStore = create<SupplierStore>((set) => ({
  suppliersList: [],
  setSuppliers: (suppliers) =>
    set(() => ({ suppliersList: suppliers, selectedSuppliers: suppliers })),

  selectedSuppliers: undefined,
  selectSupplier: (name) =>
    set((store) => ({
      selectedSuppliers: name
        ? store.suppliersList.filter(
            (supplier) =>
              supplier.name.toLowerCase().includes(name.toLowerCase()) // search names by letters.
          )
        : store.suppliersList,
    })),

  currentSupplier: undefined,
  setCurrentSupplier: (supplier) => set(() => ({ currentSupplier: supplier })),
}));

export default useSupplierStore;
