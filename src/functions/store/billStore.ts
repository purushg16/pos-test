import { create } from "zustand";
import { BillingEntry } from "../../components/entities/BillingEntry";

interface BillEntryStore {
  billNo: number | undefined;
  setBillNo: (billNo: number | undefined) => void;
  BillEntries: BillingEntry[];
  addBillEntries: (newBillingEntry: BillingEntry) => void;
  removeBillEntry: (productId: number) => void;
  clearEntries: () => void;
  updateBillEntryQuantity: (productId: number, quantity: number) => void;
  updateBillEntryPrice: (productId: number, price: number) => void;

  // unit changes
  updateUnitPrice: (
    unitValue: number,
    productId: number,
    currentUnit: string
  ) => void;

  paymentMode: string | null;
  partialPayment: string | undefined;
  partialAmount: number | null;

  setPaymentMode: (mode: string) => void;
  setPartialPayment: (partial: string) => void;
  setPartialAmount: (amount: number) => void;

  billType: string | undefined;
  setBillType: (billType: string | undefined) => void;

  itemHandled: boolean;
  setItemHandled: (handled: boolean) => void;

  itemDelivered: boolean;
  setItemDelieverd: (delivered: boolean) => void;
}

const useBillStore = create<BillEntryStore>((set) => ({
  billNo: undefined,
  BillEntries: [],

  itemDelivered: false,
  setItemDelieverd: (delivered) => set(() => ({ itemDelivered: delivered })),

  setBillNo: (billNo) => set(() => ({ billNo: billNo })),

  billType: undefined,
  setBillType: (billType) => set(() => ({ billType: billType })),

  updateUnitPrice: (unitValue, productId, currentUnit) =>
    set((store) => ({
      BillEntries: store.BillEntries.map((entry) =>
        entry.productId === productId
          ? {
              ...entry,
              billPrice: entry.salesPrice * unitValue,
              currentUnit: currentUnit,
              currentUnitValue: unitValue,

              total: entry.salesPrice * unitValue * entry.quantity,

              priceWithoutTax: parseFloat(
                (
                  (entry.salesPrice / (1 + entry.taxApplied / 100)) *
                  entry.quantity *
                  unitValue
                ).toFixed(2)
              ),

              taxPrice: parseFloat(
                (
                  (entry.salesPrice * unitValue -
                    parseFloat(
                      (
                        (entry.salesPrice * unitValue) /
                        (1 + entry.taxApplied / 100)
                      ).toFixed(2)
                    )) *
                  entry.quantity
                ).toFixed(2)
              ),
            }
          : entry
      ),
    })),

  itemHandled: false,
  setItemHandled: (handled) => set(() => ({ itemHandled: handled })),

  paymentMode: null,
  partialPayment: undefined,
  partialAmount: null,

  setPaymentMode: (mode) => set(() => ({ paymentMode: mode })),
  setPartialPayment: (partial) => set(() => ({ partialPayment: partial })),
  setPartialAmount: (amount) => set(() => ({ partialAmount: amount })),

  addBillEntries: (newBillingEntry: BillingEntry) =>
    set((store) => ({
      BillEntries: store.BillEntries.find(
        (entry) => entry.productId === newBillingEntry.productId
      )
        ? store.BillEntries.map((entry) =>
            entry.productId === newBillingEntry.productId
              ? {
                  ...entry,
                  quantity: entry.quantity + 1,
                  quantityPrice: entry.salesPrice * (entry.quantity + 1),

                  // billPrice:
                  //   entry.salesPrice *
                  //   entry.currentUnitValue! *
                  //   (entry.quantity + 1),

                  total:
                    entry.salesPrice *
                    entry.currentUnitValue! *
                    (entry.quantity + 1),

                  priceWithoutTax: parseFloat(
                    (
                      ((entry.salesPrice * entry.currentUnitValue!) /
                        (1 + entry.taxApplied / 100)) *
                      (entry.quantity + 1)
                    ).toFixed(2)
                  ),
                  taxPrice: parseFloat(
                    (
                      (entry.salesPrice * entry.currentUnitValue! -
                        parseFloat(
                          (
                            (entry.salesPrice * entry.currentUnitValue!) /
                            (1 + entry.taxApplied / 100)
                          ).toFixed(2)
                        )) *
                      (entry.quantity + 1)
                    ).toFixed(2)
                  ),
                  // total: parseFloat(
                  //   (
                  //     entry.salePrice * (entry.quantity + 1) +
                  //     entry.taxPrice
                  //   ).toFixed(2)
                  // ),
                  // taxPrice: parseFloat(
                  //   (
                  //     entry.tax *
                  //     entry.purchasePrice *
                  //     (entry.quantity + 1)
                  //   ).toFixed(2)
                  // ),
                }
              : entry
          )
        : [...store.BillEntries, newBillingEntry],
    })),

  removeBillEntry: (productId: number) =>
    set((store) => ({
      BillEntries: store.BillEntries.filter(
        (entry) => entry.productId !== productId
      ),
    })),

  clearEntries: () =>
    set(() => ({
      BillEntries: [],
    })),

  updateBillEntryQuantity: (productId: number, quantity: number) =>
    set((store) => ({
      BillEntries: store.BillEntries.map((entry) =>
        entry.productId === productId
          ? {
              ...entry,
              quantity: quantity || 0,

              quantityPrice:
                entry.billPrice * (quantity || 1) * (quantity || 1),

              priceWithoutTax: parseFloat(
                (
                  (entry.billPrice / (1 + entry.taxApplied / 100)) *
                  quantity
                ).toFixed(2)
              ),

              taxPrice: parseFloat(
                (
                  (entry.billPrice -
                    parseFloat(
                      (entry.billPrice / (1 + entry.taxApplied / 100)).toFixed(
                        2
                      )
                    )) *
                  quantity
                ).toFixed(2)
              ),
              total: parseFloat((entry.billPrice * (quantity || 0)).toFixed(2)),
            }
          : entry
      ),
    })),

  updateBillEntryPrice: (productId: number, price) =>
    set((store) => ({
      BillEntries: store.BillEntries.map((entry) =>
        entry.productId === productId
          ? {
              ...entry,
              billPrice: price,
              quantityPrice: price * entry.quantity,
              total: price * entry.quantity,

              priceWithoutTax: parseFloat(
                (
                  (price / (1 + entry.taxApplied / 100)) *
                  entry.quantity
                ).toFixed(2)
              ),

              taxPrice: parseFloat(
                (
                  (price -
                    parseFloat(
                      (price / (1 + entry.taxApplied / 100)).toFixed(2)
                    )) *
                  entry.quantity
                ).toFixed(2)
              ),
            }
          : entry
      ),
    })),
}));

export default useBillStore;
