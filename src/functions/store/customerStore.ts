import { create } from "zustand";
import { Customer } from "../../components/entities/Customer";

interface CustomerStore {
  customersList: Customer[];
  setCustomers: (customers: Customer[]) => void;
  selectedCustomers: Customer[] | undefined;
  selectCustomers: (name: string) => void;

  addNewCustomer: (customer: Customer) => void;
  currentCustmer: Customer | undefined;
  setCurrentCustomer: (customer: Customer | undefined) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  customersList: [],
  currentCustmer: undefined,
  addNewCustomer: (customer) =>
    set((store) => ({
      selectedCustomers: [...store.selectedCustomers!, customer],
      customersList: [...store.customersList, customer],
    })),

  setCurrentCustomer: (customer) => set(() => ({ currentCustmer: customer })),
  setCustomers: (customers) =>
    set(() => ({ customersList: customers, selectedCustomers: customers })),
  selectedCustomers: [],
  selectCustomers: (name) =>
    set((store) => ({
      selectedCustomers: name
        ? store.customersList.filter(
            (customer) =>
              customer.name.toLowerCase().includes(name.toLowerCase()) // search names by letters.
          )
        : store.customersList,
    })),
}));

export default useCustomerStore;
