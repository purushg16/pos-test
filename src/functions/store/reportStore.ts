import { create } from "zustand";
import { ReportData } from "../../components/entities/ReportData";
import { Group, UnifiedReport, groupPurchases } from "../conversions/GPReport";
import { ProductReport } from "../../components/entities/ProductReport";
import { EditProduct } from "../../components/entities/EditProduct";

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  products: ProductReport[] = [];
}

interface Trie {
  root: TrieNode;
  filter(prefix: string): ProductReport[];
}

const searchProduct = (products: ProductReport[], digits: string) => {
  const trie: Trie = buildTrie(products);
  const filtered = digits ? trie.filter(digits) : products;
  return filtered;
};

const buildTrie = (products: ProductReport[]) => {
  const root = new TrieNode();

  for (const product of products) {
    if (product.code) {
      const digits = product.code.toString();
      let currentNode = root;

      for (const digit of digits) {
        if (!currentNode.children[digit]) {
          currentNode.children[digit] = new TrieNode();
        }
        currentNode = currentNode.children[digit];
        currentNode.products.push(product);
      }
    }
  }

  return {
    root,
    filter: (prefix: string) => {
      let currentNode = root;
      for (const digit of prefix) {
        if (!currentNode.children[digit]) {
          return [];
        }
        currentNode = currentNode.children[digit];
      }
      return currentNode.products;
    },
  };
};

interface Report {
  reportsList: ReportData[];
  setReports: (reports: ReportData[]) => void;

  productReportsList: ProductReport[];
  setProductReportList: (list: ProductReport[]) => void;

  critical: boolean;

  searchedProduct: ProductReport[] | undefined;
  searchProductList: (term: string) => void;
  filterCritical: (critical: boolean) => void;
  // edit
  editProduct: (editProduct: EditProduct) => void;

  currentGroupKey: "Product" | "Customer" | "Supplier" | "Category" | "Employe";
  groupedReports: Group;
  setGroupedReports: (
    groupBy: "Product" | "Customer" | "Supplier" | "Category" | "Employe"
  ) => void;

  orderedGroupedReports: UnifiedReport[];
  sortReports: (
    property: "name" | "profit" | "quantity",
    order: 1 | -1
  ) => void;
}

const reportStore = create<Report>((set) => ({
  reportsList: [],
  productReportsList: [],
  searchedProduct: undefined,
  critical: false,

  editProduct: (editProduct) =>
    set((store) => ({
      searchedProduct: store.searchedProduct?.map((product) =>
        product._id === editProduct.productId
          ? {
              ...product,
              itemName: editProduct.itemName,
              unitConv: editProduct.unitConv,
              salesPriceWholesale: editProduct.salesPriceWholesale,
              salesPriceRetail: editProduct.salesPriceRetail,
              taxRate: editProduct.taxRate,
              zone: editProduct.zone,
              mrp: editProduct.mrp,
              critical: editProduct.critical,
            }
          : product
      ),
    })),

  groupedReports: {},
  orderedGroupedReports: [],
  currentGroupKey: "Product",

  setProductReportList: (list) =>
    set(() => ({ productReportsList: list, searchedProduct: list })),

  searchProductList: (digits) =>
    set((store) => ({
      searchedProduct:
        parseInt(digits) > 0
          ? searchProduct(store.productReportsList, digits)
          : searchProductByName(store.productReportsList, digits),
    })),

  filterCritical: (critical) =>
    set((store) => ({
      searchedProduct: critical
        ? store.productReportsList.filter(
            (product) =>
              product.suppliers.reduce((acc, value) => acc + value.stock, 0) <=
              product.critical
          )
        : store.productReportsList,
      critical: critical,
    })),

  setReports: (reports) =>
    set(() => ({
      reportsList: reports,
      groupedReports: groupPurchases(reports, "Product"),
      orderedGroupedReports: Object.keys(
        groupPurchases(reports, "Product")
      ).map((data) => groupPurchases(reports, "Product")[data][0]),
    })),

  setGroupedReports: (groupBy) =>
    set((store) => ({
      groupedReports: groupPurchases(store.reportsList, groupBy),
      currentGroupKey: groupBy,
      orderedGroupedReports: Object.keys(
        groupPurchases(store.reportsList, groupBy)
      ).map((data) => groupPurchases(store.reportsList, groupBy)[data][0]),
    })),

  sortReports: (property, order) =>
    set((store) => ({
      orderedGroupedReports: Object.keys(store.groupedReports)
        .map((data) => store.groupedReports[data][0])
        .slice()
        .sort((a, b) => {
          const aValue = a[property];
          const bValue = b[property];

          if (aValue < bValue) {
            return -1 * order;
          }
          if (aValue > bValue) {
            return 1 * order;
          }
          return 0;
        }),
    })),
}));

export default reportStore;

const searchProductByName = (wordList: ProductReport[], letters: string) =>
  wordList.filter((product) =>
    product.itemName.toLowerCase().includes(letters.toLowerCase())
  ) || wordList;
