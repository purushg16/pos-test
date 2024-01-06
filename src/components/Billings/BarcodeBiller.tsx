import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../../functions/store/ProductStore";
import useBillStore from "../../functions/store/billStore";
import convertToBill from "../../functions/conversions/convertToBill";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";

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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        setBarcodeData((prevData) => prevData + event.key);
      } else if (event.key === "Enter") {
        getProductUsingBarCode(parseInt(barcodeData));
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

  return <></>;
};

export default BarcodeScanner;
