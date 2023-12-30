import { create } from "zustand";
import { ProductSuppliers } from "../../components/entities/ProductSuppliers";
import { StockProduct } from "../../components/entities/StockProduct";

interface StockStore {
  supplierId: string | undefined;
  amount: number | null;
  billNo: number | undefined;
  stockProducts: StockProduct[];
  total: number | null;

  setCurrentUnit: (productId: string, unit: string, unitValue: number) => void;
  updateUnitQuantity: (productId: string, quanity: number) => void;

  setSupplier: (supplier: ProductSuppliers) => void;
  setBillNo: (billNo: number) => void;
  addProducts: (products: StockProduct) => void;
  updateStockPrice: (producId: string, amount: number) => void;
  clearStock: () => void;
  removeStock: (producId: string) => void;
}

const useStockStore = create<StockStore>((set) => ({
  supplierId: undefined,
  amount: 0,
  billNo: undefined,
  stockProducts: [],
  total: 0,

  clearStock: () =>
    set(() => ({
      stockProducts: [],
      total: 0,
      supplierId: undefined,
      amount: 0,
      billNo: undefined,
    })),

  removeStock: (productId) =>
    set((store) => ({
      stockProducts: store.stockProducts.filter(
        (product) => product.productId !== productId
      ),

      total: store.stockProducts
        .filter((product) => product.productId !== productId)
        .reduce(
          (acc, product) => acc + product.purchasePrice * product.quantity,
          0
        ),
      // -store.stockProducts.find((product) => product.productId === productId)
      //   ?.purchasePrice!,
    })),

  setCurrentUnit: (productId, unit, unitValue) =>
    set((store) => ({
      stockProducts: store.stockProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              currentUnit: unit,
              currentUnitValue: unitValue,
              stock: unitValue * product.quantity,
            }
          : product
      ),

      total: store.stockProducts.reduce(
        (acc, product) => acc + product.purchasePrice * product.quantity,
        0
      ),

      amount: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId !== productId
            ? product.purchasePrice * product.stock
            : product.purchasePrice * (unitValue * product.quantity)),
        0
      ),
    })),

  setSupplier: (supplier) => set(() => ({ supplierId: supplier._id })),
  setBillNo: (billNo) => set(() => ({ billNo: billNo })),

  addProducts: (newProduct) =>
    set((store) => ({
      stockProducts: store.stockProducts.find(
        (product) => product.productId === newProduct.productId
      )
        ? store.stockProducts.map((product) =>
            product.productId === newProduct.productId
              ? {
                  ...product,
                  productName: product.productName,
                  quantity: product.quantity + 1,
                  stock: product.stock + 1,
                  purchasePrice: product.purchasePrice,
                }
              : product
          )
        : [...store.stockProducts, newProduct],

      total:
        store.stockProducts.reduce(
          (acc, product) => acc + product.purchasePrice * product.quantity,
          0
        ) + newProduct.purchasePrice,

      amount:
        store.stockProducts.reduce(
          (acc, product) => acc + product.purchasePrice * product.stock,
          0
        ) + newProduct.purchasePrice,
    })),

  updateStockPrice: (producId, price) =>
    set((store) => ({
      stockProducts: store.stockProducts.map((product) =>
        product.productId === producId
          ? { ...product, purchasePrice: price }
          : product
      ),

      total: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId !== producId
            ? product.purchasePrice * product.quantity
            : price * product.quantity),
        0
      ),

      amount: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId !== producId
            ? product.purchasePrice * product.stock
            : price * product.stock),
        0
      ),
    })),

  updateUnitQuantity: (productId, quanity) =>
    set((store) => ({
      stockProducts: store.stockProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              quantity: quanity || 0,
              stock: product.currentUnitValue! * (quanity || 0),
            }
          : product
      ),

      total: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId === productId
            ? product.purchasePrice * (quanity || 0)
            : product.purchasePrice * product.quantity),
        0
      ),

      amount: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId === productId
            ? product.purchasePrice * product.currentUnitValue! * quanity
            : product.purchasePrice * product.stock),
        0
      ),
    })),
}));

export default useStockStore;
