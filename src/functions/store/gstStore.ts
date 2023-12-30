import { create } from "zustand";
import { Employee } from "../../components/entities/Employee";
import { GST } from "../../components/entities/GST";

interface EmployeStore {
  gstList: GST[];
  setGSTList: ([]: GST[]) => void;
  currentGstin: GST | null;
  setGstin: (gsting: GST) => void;
}

const useGSTStore = create<EmployeStore>((set) => ({
  gstList: [],
  currentGstin: null,
  setGSTList: (gstins) => set(() => ({ gstList: gstins })),
  setGstin: (gstin) => set(() => ({ currentGstin: gstin })),
}));

export default useGSTStore;
