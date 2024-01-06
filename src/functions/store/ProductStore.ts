import { create } from "zustand";
import { Product } from "../../components/entities/Product";

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  products: Product[] = [];
}

interface Trie {
  root: TrieNode;
  filter(prefix: string): Product[];
}

const searchProduct = (products: Product[], digits: string) => {
  const trie: Trie = buildTrie(products);
  const filtered = digits ? trie.filter(digits) : products;
  return filtered;
};

const buildTrie = (products: Product[]) => {
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

interface ProductStore {
  baseProducts: Product[];
  setProductList: (products: Product[]) => void;
  clearProductFilters: () => void;

  // select single product
  selectedProduct: Product | undefined;
  selectProduct: (product: Product) => void;

  // By Category
  productsList: Product[];
  searchProductsByCategory: (category: string) => void;

  // By id
  searchedProductList: Product[] | undefined;
  searchProductById: (digits: string) => void;

  barcodeProduct: Product | undefined;
  getProductUsingBarCode: (code: string | number) => void;
  deleteBarCodeProduct: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
  baseProducts: [],
  productsList: [],
  searchedProductList: undefined,
  selectedProduct: undefined,

  selectProduct: (product) => set(() => ({ selectedProduct: product })),

  barcodeProduct: undefined,

  getProductUsingBarCode: (code) =>
    set((store) => ({
      barcodeProduct: store.baseProducts.find(
        (product) => product.barCode === code
      ),
    })),

  deleteBarCodeProduct: () => set(() => ({ barcodeProduct: undefined })),

  setProductList: (products) =>
    set(() => ({ baseProducts: products, searchedProductList: products })),

  searchProductsByCategory: (category) => {
    set((store) => ({
      productsList: store.baseProducts.filter(
        (product) => product.category === category
      ),
    }));
  },

  searchProductById: (digits) =>
    set((store) => ({
      searchedProductList:
        parseInt(digits) > 0
          ? searchProduct(store.baseProducts, digits)
          : searchProductByName(store.baseProducts, digits),
      // store.baseProducts.filter((product) => {
      //   const itemDigits = product.code.toString().split("").map(Number);
      //   console.log(product.code.toString().startsWith((2002).toString()));

      //   return itemDigits
      //     ? digits.every((digit, index) => digit === itemDigits[index])
      //     : store.baseProducts;
      // }),
    })),
  clearProductFilters: () => set(() => ({ productsList: [] })),
}));

export default useProductStore;

const searchProductByName = (wordList: Product[], letters: string) =>
  wordList.filter((product) =>
    product.itemName.toLowerCase().includes(letters.toLowerCase())
  ) || wordList;
