import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsBackspace } from "react-icons/bs";
import { useLongPress } from "use-long-press";
import useBillStore from "../../functions/store/billStore";

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// type inputs = "bill-quantity" | "bill-price";

const KeyBoard = () => {
  const updateBillEntryQuantity = useBillStore(
    (s) => s.updateBillEntryQuantity
  );
  const updateBillEntryPrice = useBillStore((s) => s.updateBillEntryPrice);
  const entries = useBillStore((s) => s.BillEntries);

  const [value, setValue] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<HTMLInputElement | null>(
    null
  );

  const bind = useLongPress(() => {
    setValue([]);
  });

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLInputElement) {
        event.preventDefault();
        setFocusedInput(event.target);
        const currentElement = event.target as HTMLInputElement;
        const selectedProduct = entries.find(
          (entry) => entry.productId === parseInt(currentElement.ariaLabel!)
        );

        if (currentElement.id === "bill-quantity")
          setValue(selectedProduct?.quantity?.toString().split("") || []);
        if (currentElement.id === "bill-price")
          setValue(selectedProduct?.billPrice?.toString().split("") || []);
      }
    };

    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [entries]);

  const clearState = () => {
    setFocusedInput(null);
    setValue([]);
  };

  const updateValue = (newDigit: number | string) => {
    if (
      focusedInput?.id === "bill-quantity" ||
      focusedInput?.id === "bill-price"
    )
      if (typeof newDigit === "number")
        setValue([...value, newDigit.toString()]);
      else if (typeof newDigit === "string") {
        setValue([...value, newDigit]);
      }
  };

  useEffect(() => {
    if (focusedInput) {
      if (focusedInput.id === "bill-quantity")
        updateBillEntryQuantity(
          parseInt(focusedInput.ariaLabel!),
          parseInt(value.join(""))
        );
      if (focusedInput.id === "bill-price")
        updateBillEntryPrice(
          parseInt(focusedInput.ariaLabel!),
          parseFloat(value.join(""))
        );
    }
  }, [value]);

  return (
    <div>
      <Box
        display={
          !!focusedInput &&
          (focusedInput.id === "bill-price" ||
            focusedInput.id === "bill-quantity")
            ? "block"
            : "none"
        }
        padding={2}
        border="1px solid #80808030"
        borderRadius={7}
        flex={1}
      >
        <SimpleGrid columns={3} spacing={3}>
          {keys.map((key) => (
            <Button key={key} onClick={() => updateValue(key)}>
              {key}
            </Button>
          ))}

          <Button onClick={() => updateValue(0)}>0</Button>
          <Button onClick={() => updateValue(".")}>.</Button>
          <Button onClick={() => updateValue(0)}>0</Button>
          <Box></Box>
          <Button colorScheme="orange" onClick={clearState}>
            <CloseIcon />
          </Button>
          <Button
            colorScheme="red"
            {...bind()}
            onClick={() => setValue(value.slice(0, -1))}
          >
            <BsBackspace />
          </Button>
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default KeyBoard;
