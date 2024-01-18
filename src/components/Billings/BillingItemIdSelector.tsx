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
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  const [productSelected, setProductSelected] = useState(false);
  const itemRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = searchedProductList![index];

    return (
      <ButtonGroup
        key={item._id}
        size="md"
        isAttached
        variant="solid"
        width="100%"
        style={style}
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
            pilferage
              ? selectProduct(item)
              : stock
              ? addStockItem(item)
              : addBillItem(item);
            setProductSelected(true);
          }}
        >
          {item.itemName}
        </Button>
      </ButtonGroup>
    );
  };

  const [menuListMaxHeight, setMenuListMaxHeight] = useState(0);
  useEffect(() => {
    // Calculate available body height and set it as the maxHeight for MenuList
    const calculateMaxHeight = () => {
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const maxHeightPercentage = 0.35;
      setMenuListMaxHeight(windowHeight * maxHeightPercentage);
    };

    // Initial calculation
    calculateMaxHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateMaxHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);

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

        <MenuList maxHeight={`${menuListMaxHeight}px`} overflowY="hidden">
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
          <Box maxHeight="60vh" overflowY="scroll" padding={2} zIndex={1000}>
            {!searchedProductList ? (
              <Spinner />
            ) : searchedProductList.length > 0 && ref.current?.value ? (
              <PaginatedWindow
                children={itemRenderer}
                height={400}
                length={searchedProductList.length}
                width="100%"
                itemSize={50}
              />
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

// Function to simulate a click at specified coordinates
function simulateClick(x: number, y: number) {
  // Create a new mouse event
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
  });

  // Find the element at the specified coordinates
  const element = document.elementFromPoint(x, y);

  // Dispatch the click event on the element
  if (element) {
    element.dispatchEvent(event);
  }
}
