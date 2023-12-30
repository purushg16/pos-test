import { create } from "zustand";
import { EmployeeAttendence } from "../../components/entities/EmployeeAttendence";
import { Employee } from "../../components/entities/Employee";

interface AttendenceStore {
  attendenceEntryList: EmployeeAttendence[];

  setAttendenceEntryList: (list: Employee[]) => void;
  performAttendence: (type: boolean, id: string) => void;

  clearAttendence: () => void;
}

const useAttendenceStore = create<AttendenceStore>((set) => ({
  attendenceEntryList: [],
  setAttendenceEntryList: (list) =>
    set(() => ({
      attendenceEntryList: list.map((employee) => {
        return { employeeId: employee._id!, checkIn: false };
      }),
    })),

  performAttendence: (type, id) =>
    set((store) => ({
      attendenceEntryList: store.attendenceEntryList.map((entry) => {
        return id === entry.employeeId ? { ...entry, checkIn: type } : entry;
      }),
    })),

  clearAttendence: () => set(() => ({ attendenceEntryList: [] })),
}));

export default useAttendenceStore;
