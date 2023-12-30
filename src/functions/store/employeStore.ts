import { create } from "zustand";
import { Employee } from "../../components/entities/Employee";

interface EmployeStore {
  employeeList: Employee[];
  setEmployeeList: ([]: Employee[]) => void;
  currentBiller: Employee | null;
  setBiller: (employe: Employee) => void;
  currentHandler: Employee | null;
  setHandler: (employe: Employee) => void;
}

const useEmployeStore = create<EmployeStore>((set) => ({
  employeeList: [],
  currentBiller: null,
  currentHandler: null,
  setEmployeeList: (employee) => set(() => ({ employeeList: employee })),
  setBiller: (employe) => set(() => ({ currentBiller: employe })),
  setHandler: (employe) => set(() => ({ currentHandler: employe })),
}));

export default useEmployeStore;
