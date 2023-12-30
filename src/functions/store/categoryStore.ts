import { create } from "zustand";
import { Category } from "../../components/entities/Category";

interface CategoryStore {
  baseCategory: Category[];
  setCategories: (categories: Category[]) => void;
  filteredCategories: Category[] | undefined;
  filterCategory: (categoryId: string) => void;
  reverseCategory: () => void;
  clearCategoriesFilters: () => void;
  currentCategory: Category | undefined;

  findCategory: (id: string) => void;
  singleCategory: Category | undefined;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  baseCategory: [],
  filteredCategories: undefined,
  currentCategory: undefined,
  singleCategory: undefined,

  findCategory: (id) =>
    set((store) => ({
      singleCategory: store.baseCategory.find(
        (category) => category._id === id
      ),
    })),

  setCategories: (categories) =>
    set(() => ({ baseCategory: categories, filteredCategories: categories })),

  filterCategory: (catergoryId) =>
    set((store) => ({
      filteredCategories:
        store.filteredCategories?.find(
          (category) => category._id === catergoryId
        )?.children || [],
      currentCategory: store.filteredCategories?.find(
        (category) => category._id === catergoryId
      ),
    })),
  reverseCategory: () =>
    set((store) => ({
      filteredCategories: store.baseCategory,
      currentCategory: undefined,
    })),
  clearCategoriesFilters: () =>
    set((store) => ({
      filteredCategories: store.baseCategory,
      currentCategory: undefined,
    })),
}));

export default useCategoryStore;
