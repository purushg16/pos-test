import { Product } from "../../components/entities/Product";
import { BillingEntry } from "../../components/entities/BillingEntry";

const convertToBill = (product: Product, billType: string) => {
  let salesPrice;
  if (billType === "wholesale") salesPrice = product.salesPriceWholesale;
  else salesPrice = product.salesPriceRetail;

  const priceWithoutTax = parseFloat(
    (salesPrice / (1 + product.taxRate / 100)).toFixed(2)
  );

  const taxPrice = parseFloat((salesPrice - priceWithoutTax).toFixed(2));

  return {
    _id: product._id,
    productId: product.code,
    productName: product.itemName,
    quantity: 1,
    salesPrice: salesPrice,
    billPrice: salesPrice,
    taxApplied: product.taxRate,
    total: salesPrice,
    quantityPrice: salesPrice,
    taxPrice: taxPrice,
    priceWithoutTax: priceWithoutTax,

    mrp: product.mrp,
    salesPriceWholesale: product.salesPriceRetail,
    salesPriceRetail: product.salesPriceRetail,

    unit: product.unit,
    topUnit: product.topUnit,
    unitConv: product.unitConv,
    currentUnit: product.unit,
    currentUnitValue: 1,
  } as BillingEntry;
};

export default convertToBill;
