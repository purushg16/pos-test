import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../../functions/store/ProductStore";
import useBillStore from "../../functions/store/billStore";
import convertToBill from "../../functions/conversions/convertToBill";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";
import useStockStore from "../../functions/store/stockStore";
import { Product } from "../entities/Product";
import { StockProduct } from "../entities/StockProduct";
import { useToast } from "@chakra-ui/react";

const BarcodeScanner: React.FC = () => {
  const location = useLocation();
  const getProductUsingBarCode = useProductStore(
    (s) => s.getProductUsingBarCode
  );
  const deleteBarCodeProduct = useProductStore((s) => s.deleteBarCodeProduct);
  const [barcodeData, setBarcodeData] = useState<string>("");
  const barcodeProduct = useProductStore((s) => s.barcodeProduct);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);

  const gstin = useGSTStore((s) => s.currentGstin);
  const addProduct = useStockStore((s) => s.addProducts);

  const toast = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        setBarcodeData((prevData) => prevData + event.key);
      } else if (event.key === "Enter") {
        console.log(barcodeData);

        getProductUsingBarCode(barcodeData);
        if (document.getElementById("edit-product-bar-code"))
          (
            document.getElementById("edit-product-bar-code") as HTMLInputElement
          ).value = barcodeData;
        setBarcodeData("");
      }
    };

    // Attach the event listener
    document.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [barcodeData]);

  const addBillEntry = useBillStore((s) => s.addBillEntries);
  const billType = useBillStore((s) => s.billType);

  useEffect(() => {
    if (
      !!barcodeProduct &&
      !!gstin &&
      !!billType &&
      !!currentBiller &&
      !!currentHandler &&
      location.pathname === "/"
    ) {
      addBillEntry(convertToBill(barcodeProduct, billType!));
      deleteBarCodeProduct();
    }
  }, [
    barcodeProduct,
    billType,
    gstin,
    currentBiller,
    currentHandler,
    location,
  ]);

  useEffect(() => {
    if (!!barcodeProduct && location.pathname === "/addStock") {
      const newStock: StockProduct = {
        productId: barcodeProduct._id!,
        purchasePrice: 0,
        stock: 1,
        quantity: 1,

        code: barcodeProduct.code,
        productName: barcodeProduct.itemName,

        unit: barcodeProduct.unit,
        topUnit: barcodeProduct.topUnit,
        unitConv: barcodeProduct.unitConv,

        currentUnit: barcodeProduct.unit,
        currentUnitValue: 1,
      };
      addProduct(newStock);
      toast({
        title: "Item added to Stock List",
        // description: desc,
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  }, [barcodeProduct]);
  return <></>;
};

export default BarcodeScanner;
