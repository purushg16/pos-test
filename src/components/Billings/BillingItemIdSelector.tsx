import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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
import PaginatedWindow from "../Window/Window";
import AudioBiller from "./AudioBiller";
import PaginatedProductResult from "./PaginatedProductResult";

interface Props {
  small?: boolean;
  stock?: boolean;
  pilferage?: boolean;
}

const BillingItemIdSelector = ({
  small = false,
  stock = false,
  pilferage = false,
}: Props) => {
  const addBillEntries = useBillStore((s) => s.addBillEntries);
  const searchProductById = useProductStore((s) => s.searchProductById);
  const searchedProductList = useProductStore((s) => s.searchedProductList);
  const selectProduct = useProductStore((s) => s.selectProduct);
  const selectedProduct = useProductStore((s) => s.selectedProduct);

  const toast = useToast();

  const billType = useBillStore((s) => s.billType);
  const currentBiller = useEmployeStore((s) => s.currentBiller);
  const currentHandler = useEmployeStore((s) => s.currentHandler);
  const currentGstin = useGSTStore((s) => s.currentGstin);
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

  // const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

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
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  const [productSelected, setProductSelected] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    (document.activeElement as HTMLButtonElement).blur();
    if (productSelected) {
      btnRef.current?.click();
      setProductSelected(false);
    }
  }, [productSelected]);

  return (
    <Box>
      <Menu>
        <MenuButton
          ref={btnRef}
          isDisabled={
            !stock &&
            !pilferage &&
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
          {pilferage
            ? selectedProduct
              ? selectedProduct.itemName
              : "Select"
            : small
            ? "Select"
            : "using Product ID"}
        </MenuButton>

        <MenuList>
          <Box paddingX={2} marginY={2}>
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input
                focusBorderColor="gray.300"
                placeholder="Search Products..."
                variant={"filled"}
                borderRadius={7}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    setValue(val);
                    searchProductById(val);
                  }
                }}
                value={value}
              />
              <InputRightElement
                children={<AudioBiller setValue={setValue} />}
              />
            </InputGroup>
          </Box>
          <Box>
            {!searchedProductList ? (
              <Spinner />
            ) : searchedProductList.length > 0 && value ? (
              <PaginatedProductResult
                callback={(item) => {
                  pilferage
                    ? selectProduct(item)
                    : stock
                    ? addStockItem(item)
                    : addBillItem(item);
                  setProductSelected(true);
                }}
                productList={searchedProductList}
              />
            ) : searchedProductList.length === 0 && value ? (
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
