import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useBillStore from "../../functions/store/billStore";
import BillTabContainer from "./BillTabContainer";
import BillingItemIdSelector from "./BillingItemIdSelector";

interface Props {
  stock?: boolean;
}

const gramQuantities: { [key: string]: number } = {
  "50": 0.05,
  "100": 0.1,
  "250 (1/4)": 0.25,
  "500 (1/2)": 0.5,
  "750 (3/4)": 0.75,
};

export const BillingTable = ({ stock = false }: Props) => {
  const { BillEntries, updateBillEntryQuantity, updateBillEntryPrice } =
    useBillStore();

  const removeBillEntry = useBillStore((s) => s.removeBillEntry);
  const updateUnitPrice = useBillStore((s) => s.updateUnitPrice);

  function numberWithCommas(x: number) {
    return parseInt(
      x.toString().split(".")[0].length > 3
        ? x
            .toString()
            .substring(0, x.toString().split(".")[0].length - 3)
            .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
            "," +
            x.toString().substring(x.toString().split(".")[0].length - 3)
        : x.toString()
    ).toFixed(2);
  }

  return (
    <TableContainer>
      <Table
        variant="unstyled"
        size="md"
        border="0.1px solid #d9d9d9"
        borderRadius={7}
        overflow="hidden"
        padding={2}
      >
        <Thead width="100%" background="#7a7a7a21" border="0.1px solid #d9d9d9">
          <Tr width="100%">
            {/* <Th borderRight="0.1px solid #d9d9d9"> # </Th> */}
            {/* <Th borderRight="0.1px solid #d9d9d9"> Code </Th> */}
            <Th borderRight="0.1px solid #d9d9d9">
              Name
              <button id="none" />
            </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Qty </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Unit </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Price/Unit
              <hr />
              <small> with tax </small>
            </Th>
            {/* <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Tax
            </Th> */}
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Total
            </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {BillEntries.map((entry, index) => (
            <Tr key={index} borderBottom="1px solid #f1f1f1">
              {/* Serial No. */}
              {/* <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {index + 1}
              </Td> */}

              {/* Product Code */}
              {/* <Td borderRight="0.1px solid #d9d9d9"> {entry.productId} </Td> */}

              {/* Product Name */}
              <Td
                borderRight="0.1px solid #d9d9d9"
                maxW={60}
                overflowX="auto"
                whiteSpace="pre-line"
                lineHeight={1.4}
              >
                {entry.productName}
              </Td>

              {/*  Quantity  */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <NumberInput
                  min={0}
                  value={entry.quantity}
                  onChange={(event) => {
                    updateBillEntryQuantity(entry.productId, parseFloat(event));
                  }}
                  inputMode="none"
                  id="bill-quantity"
                  aria-label={entry.productId.toString()}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                {/* <InputGroup>
                  <Input
                    min={0}
                    type="number"
                    value={entry.quantity}
                    onChange={(event) => {
                      updateBillEntryQuantity(
                        entry.productId,
                        parseFloat(event.target.value)
                      );
                    }}
                    inputMode="none"
                    id="bill-quantity"
                    aria-label={entry.productId.toString()}
                  />
                </InputGroup> */}

                <Menu>
                  <MenuButton as={Button} size="sm" width="100%">
                    {"Select"}
                  </MenuButton>
                  <MenuList>
                    {Object.keys(gramQuantities).map((q) => (
                      <MenuItem
                        key={q}
                        onClick={() => {
                          (
                            document.getElementById("none") as HTMLElement
                          )?.focus();
                          updateBillEntryQuantity(
                            entry.productId,
                            gramQuantities[q]
                          );
                        }}
                      >
                        {q}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                {/* 
                <Editable
                  value={entry.quantity.toString()}
                  onChange={(quantity) => {
                    updateBillEntryQuantity(
                      entry.productId,
                      parseFloat(quantity)
                    );
                  }}
                >
                  <EditablePreview />
                  <EditableInput
                    type="number"
                    id="bill-quantity"
                    aria-label={entry.productId.toString()}
                  />
                </Editable> */}
              </Td>

              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    size="sm"
                  >
                    {entry.currentUnit}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        (
                          document.getElementById("none") as HTMLElement
                        )?.focus();
                        updateUnitPrice(1, entry.productId, entry.unit);
                      }}
                    >
                      {entry.unit}
                    </MenuItem>
                    {entry.topUnit && (
                      <MenuItem
                        onClick={() => {
                          (
                            document.getElementById("none") as HTMLElement
                          )?.focus();
                          updateUnitPrice(
                            entry.unitConv,
                            entry.productId,
                            entry.topUnit
                          );
                        }}
                      >
                        {entry.topUnit}
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Td>

              {/* Price */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1em"
                    children="Rs."
                  />
                  <Input
                    type="number"
                    value={entry.billPrice}
                    onChange={(event) =>
                      updateBillEntryPrice(
                        entry.productId,
                        parseFloat(event.target.value)
                      )
                    }
                    inputMode="none"
                    id="bill-price"
                    aria-label={entry.productId.toString()}
                  />
                </InputGroup>
              </Td>

              {/* Tax App. */}
              {/* <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {entry.taxApplied + "%"}
              </Td> */}

              {/* Total */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {entry.total}
              </Td>

              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    removeBillEntry(entry.productId);
                  }}
                >
                  -
                </Button>
              </Td>
            </Tr>
          ))}

          <Tr>
            <Td
              borderRight="0.1px solid #d9d9d9"
              background="teal.900"
              maxW="max-content"
            >
              <BillTabContainer small billing />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              <BillingItemIdSelector small />
            </Td>

            <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              -
            </Td>
            {/* <Td borderRight="0.1px solid #d9d9d9" background="teal.900">
              -
            </Td> */}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
