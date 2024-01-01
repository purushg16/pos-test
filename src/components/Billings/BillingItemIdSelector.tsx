import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useBillStore from "../../functions/store/billStore";
import useProductStore from "../../functions/store/ProductStore";
import convertToBill from "../../functions/conversions/convertToBill";
import { Product } from "../entities/Product";
import useStockStore from "../../functions/store/stockStore";
import { StockProduct } from "../entities/StockProduct";
import useEmployeStore from "../../functions/store/employeStore";
import useGSTStore from "../../functions/store/gstStore";
import useCustomerStore from "../../functions/store/customerStore";

interface Props {
  small?: boolean;
  stock?: boolean;
}

const BillingItemIdSelector = ({ small = false, stock = false }: Props) => {
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const searchProductById = useProductStore((s) => s.searchProductById);
  const searchedProductList = useProductStore((s) => s.searchedProductList);

  const toast = useToast();

  const billType = useBillStore((s) => s.billType);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

  const ref = useRef<HTMLInputElement>(null);

  const addBillItem = (item: Product) => {
    addBillEntries(convertToBill(item, billType!));
    toast({
      title: "Item added to bill",
      // description: desc,
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  const addProduct = useStockStore((s) => s.addProducts);
  const addStockItem = (item: Product) => {
    const newStock: StockProduct = {
      productId: item._id!,
      purchasePrice: 0,
      stock: 1,
      quantity: 1,

      code: item.code,
      productName: item.itemName,

      unit: item.unit,
      topUnit: item.topUnit,
      unitConv: item.unitConv,

      currentUnit: item.unit,
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
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          isDisabled={
            !stock &&
            !(
              currentBiller &&
              currentHandler &&
              currentGstin &&
              billType &&
              currentCustomer
            )
          }
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size={small ? "sm" : "md"}
        >
          {small ? "Select" : "using Product ID"}
        </MenuButton>
        <MenuList>
          <Box paddingX={2} marginY={2}>
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input
                focusBorderColor="gray.300"
                ref={ref}
                placeholder="Search Products..."
                variant={"filled"}
                borderRadius={7}
                onChange={() => {
                  if (ref.current) {
                    searchProductById(ref.current.value);
                  }
                }}
              />
            </InputGroup>
          </Box>

          <Box maxHeight={400} overflowY="scroll" padding={2}>
            {!searchedProductList ? (
              <Spinner />
            ) : searchedProductList.length > 0 && ref.current?.value ? (
              <VStack marginX={3} gap={3}>
                {searchedProductList.map((item: Product) => (
                  <ButtonGroup
                    key={item._id}
                    size="md"
                    isAttached
                    variant="solid"
                    width="100%"
                  >
                    <Button padding={2} fontSize="small">
                      {item.code}
                    </Button>
                    <Button
                      variant="outline"
                      textAlign="left"
                      paddingY={2}
                      width="100%"
                      key={item._id}
                      onClick={() => {
                        stock ? addStockItem(item) : addBillItem(item);
                      }}
                    >
                      {item.itemName}
                    </Button>
                  </ButtonGroup>
                ))}
              </VStack>
            ) : searchedProductList.length === 0 && ref.current?.value ? (
              <Text textAlign="center" fontSize="lg">
                No Products found!
              </Text>
            ) : (
              <Text textAlign="center" fontSize="lg">
                Enter product Name or ID
              </Text>
            )}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default BillingItemIdSelector;
