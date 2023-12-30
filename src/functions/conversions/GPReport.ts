import { ReportData } from "../../components/entities/ReportData";

export interface UnifiedReport {
  name: string;
  profit: number;
}

export interface Group {
  [key: string]: UnifiedReport[];
}

export const calculatePriceWithoutTax = (amount: number, tax: number) =>
  parseFloat((amount / (1 + tax / 100)).toFixed(2));

export const deductProfit = (
  salesPrice: number,
  purchasePrice: number,
  tax: number,
  quantity: number
) => {
  return (
    (calculatePriceWithoutTax(salesPrice, tax) -
      calculatePriceWithoutTax(purchasePrice, tax)) *
    quantity
  );
};

export const groupPurchases = (
  purchases: ReportData[],
  groupBy: "Product" | "Customer" | "Supplier" | "Category" | "Employe"
): Group => {
  const getGroupKey = (purchase: ReportData): string => {
    switch (groupBy) {
      case "Product":
        return purchase.productId._id;
      case "Customer":
        return purchase.billId.customer._id;
      case "Supplier":
        return purchase.supplierId._id;
      case "Category":
        return purchase.productId.category._id;
      case "Employe":
        // Assuming an employee ID exists in the purchase object
        return purchase.billId.billerName;
      default:
        return "";
    }
  };

  const getName = (purchase: ReportData): string => {
    switch (groupBy) {
      case "Product":
        return purchase.productId.itemName;
      case "Customer":
        return purchase.billId.customer.name;
      case "Supplier":
        return purchase.supplierId.name;
      case "Category":
        return purchase.productId.category.name;
      case "Employe":
        // Assuming an employee ID exists in the purchase object
        return purchase.billId.billerName;
      default:
        return "";
    }
  };

  return purchases.reduce((grouped: Group, purchase: ReportData) => {
    const key = getGroupKey(purchase);
    const profit = deductProfit(
      purchase.salesPrice,
      purchase.purchasePrice,
      purchase.productId.taxRate,
      purchase.quantity
    );

    if (!grouped[key]) {
      grouped[key] = [];

      const newReport = {
        name: getName(purchase),
        profit: profit,
      } as UnifiedReport;

      grouped[key].push(newReport);
    } else {
      grouped[key][0].profit = grouped[key][0].profit + profit;
    }

    return grouped;
  }, {});
};
