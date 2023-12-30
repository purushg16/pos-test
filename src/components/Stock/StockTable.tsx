import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useStockStore from "../../functions/store/stockStore";
import BillTabContainer from "../Billings/BillTabContainer";
import BillingItemIdSelector from "../Billings/BillingItemIdSelector";

const StockTable = () => {
  const stockProducts = useStockStore((s) => s.stockProducts);
  const updateStockPrice = useStockStore((s) => s.updateStockPrice);
  const setCurrentUnit = useStockStore((s) => s.setCurrentUnit);
  const updateUnitQuantity = useStockStore((s) => s.updateUnitQuantity);
  const removeItem = useStockStore((s) => s.removeStock);

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
            <Th borderRight="0.1px solid #d9d9d9"> # </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Item Code </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Item Name </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Unit </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Qty </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Purchase Price/Unit
              <hr />
              <small> with tax </small>
            </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Remove </Th>
          </Tr>
        </Thead>
        <Tbody>
          {stockProducts.map((entry, index) => (
            <Tr key={index} borderBottom="1px solid #f1f1f1">
              {/* Serial No. */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {index + 1}
              </Td>

              {/* Product Code */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.code} </Td>

              {/* Product Name */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.productName} </Td>

              {/* Unit */}
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
                      onClick={() =>
                        setCurrentUnit(entry.productId, entry.unit!, 1)
                      }
                    >
                      {entry.unit}
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setCurrentUnit(
                          entry.productId,
                          entry.topUnit!,
                          entry.unitConv
                        )
                      }
                    >
                      {entry.topUnit}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>

              {/*  Quantity  */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Editable
                  value={entry.quantity.toString()}
                  onChange={(quantity) => {
                    updateUnitQuantity(entry.productId, parseInt(quantity));
                  }}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>

              {/* Price */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="0.7em"
                    children="Rs."
                  />
                  <Input
                    type="number"
                    value={entry.purchasePrice}
                    onChange={(event) => {
                      updateStockPrice(
                        entry.productId,
                        parseFloat(event.target.value)
                      );
                    }}
                  />
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="0.7em"
                    marginRight={1}
                    children={`/${entry.currentUnit}`}
                  />
                </InputGroup>
              </Td>

              <Td borderRight="0.1px solid #d9d9d9">
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => {
                    removeItem(entry.productId);
                  }}
                >
                  -
                </Button>
              </Td>
            </Tr>
          ))}

          <Tr>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillTabContainer small stock />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillingItemIdSelector small stock />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
